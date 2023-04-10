import mockTop20TrueTags from '../mock/tag-true-top-20.json';
import mockTop20FalseTags from '../mock/tag-false-top-20.json';
import { prisma } from '../utils/db';

export class AggregationService {

    async getTop20FalseTags() {
        return mockTop20FalseTags;
    }

    async getTop20TrueTags() {
        return mockTop20TrueTags;
    }

    async getLikeCountStats() {
        const raw = await prisma.tweets.aggregateRaw({
            pipeline: [
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                        null_count: {
                            $sum: {
                            $cond: {
                                if: { $eq: ["$like_count", null] },
                                then: 1,
                                else: 0
                            }
                            }
                        },
                        mean: { $avg: "$like_count" },
                        std: { $stdDevSamp: "$like_count" },
                        min: { $min: "$like_count" },
                        max: { $max: "$like_count" },
                    }
                }

            ],
            options: {
                allowDiskUse: true,
            }
        });

        const { _id, ...rest }: {
            _id: null,
            count: number;
            null_count: number;
            mean: number;
            std: number;
            min: number;
            max: number;
        } = (raw as any)[0];

        const ret = {
            ...rest,
            median: 0,
        };

        return Object.keys(ret).map(e => ({
            describe: e,
            like_count: ret[e as keyof typeof ret],
        }));
    }

    async getPercentagesOfTweetsGroupByLabel() {
        return await prisma.tweets.aggregateRaw({
            pipeline: [
                {
                    $group: {
                        _id: "$label",
                        count: { $sum: 1 }
                    }
                },
            ],
            options: {
                allowDiskUse: true,
            }
        });
    }

    async getPercentagesOfUsersGroupByLabel() {
        return await prisma.dummy_users_label.aggregateRaw({
            pipeline: [
                {
                    $group: {
                    _id: { $ifNull: [ "$label", true ] },  // Use true if label is null
                    count: { $sum: "$count" }  // Sum the count field
                    }
                }
            ],
            options: {
                allowDiskUser: true,
            }
        });
    };

    async getPercentagesOfPossibleSensitiveContent() {
        return await prisma.tweets.aggregateRaw({
            pipeline: [
                {
                    $group: {
                        _id: "$possibly_sensitive",
                        count: { $sum: 1 }
                    }
                },
            ],
            options: {
                allowDiskUse: true,
            }
        });
    }

    private uniqueContexts = 0;
    private uniqueHashtags = 0;
    private totalWords = 0;

    getDatasetStatistics = async () => {
        this.uniqueContexts = this.uniqueContexts === 0 ? (await prisma.tweet_context.aggregateRaw({
            pipeline: [
                {
                    $group: {
                    _id: {
                        domain_name: "$domain_name",
                        entity_name: "$entity_name",
                    },
                    count: { $sum: 1 }
                    }
                },
                {
                    $group: {
                    _id: null,
                    unique_contexts: { $sum: 1 },
                    }
                },
                {
                    $project: {
                    _id: 0,
                    unique_contexts: 1,
                    }
                }
            ],
        }) as any)[0].unique_contexts : this.uniqueContexts;
        this.uniqueHashtags = this.uniqueHashtags === 0 ? (await prisma.tweet_hashtags.aggregateRaw({
            pipeline: [
                { $unwind: "$hashtags" },
                { $group: {
                    _id: "$hashtags.tag",
                    tweet_ids: { $addToSet: "$tweet_id" }
                    }
                },
                { $project: {
                    _id: 0,
                    tag: "$_id",
                    unique_tweets: { $size: "$tweet_ids" }
                    }
                },
                { $group: {
                    _id: null,
                    unique_tags: { $sum: 1 },
                    }
                },
                { $project: {
                    _id: 0,
                    unique_tags: 1,
                    }
                }
            ],
            options: {
                allowDiskUse: true,
            }
        }) as any)[0].unique_tags : this.uniqueHashtags;
        this.totalWords = this.totalWords === 0 ? (await prisma.dummy_tweets_text_length.aggregateRaw({
            pipeline: [
                {
                    $group: {
                    _id: null,
                    total_text_length: { $sum: "$text_length" }
                    }
                },
                {
                    $project: {
                    _id: 0,
                    total_text_length: 1
                    }
                }
            ],
            options: {
                allowDiskUse: true,
            }
        }) as any)[0].total_text_length : this.totalWords;

        return {
            tweetsCount: await prisma.tweets.count(),
            usersCount: await prisma.users.count(),
            uniqueContexts: this.uniqueContexts,
            uniqueHashtags: this.uniqueHashtags,
            totalWords: this.totalWords,
        };
    }

    getLabelDistributionThroughTime = async () => {
        return await prisma.dummy_tweets_label_time.findMany({
            select: {
                label: true,
                created_at: true,
                count: true,
            }
        });
    }

    getUserCreatedCountThroughTime = async () => {
        return (await prisma.dummy_users_label.findMany({
            select: {
                label: true,
                year: true,
                count: true,
            },
        })).map(({ year, ...e }) => ({ ...e, label: '' + (e.label ?? 'true'), created_at: year }));
    }

    getDataAmountThroughTime = async () => {
        return await prisma.dummy_tweets_label_time.aggregateRaw({
            pipeline: [
                {
                    $group: {
                    _id: {
                        label: "$label",
                        created_at: "$created_at"
                    },
                    count: { $sum: "$count" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        label: "$_id.label",
                        created_at: "$_id.created_at",
                        count: 1
                    }
                },
            ],
            options: {
                allowDiskUse: true,
            }
        });
    }

    getTweetsStatistic = async () => {
        return await prisma.dummy_tweets_statistic.findFirst();
    }

    async getWordCloud(type: string = "content") {
        const collection = type === 'content' ? prisma.dummy_tweets_content_word
             : type === 'entity' ? prisma.dummy_tweets_entity_word
             : type === 'domain' ? prisma.dummy_tweets_domain_word
             : type === 'annotation' ? prisma.dummy_tweets_annotation_word
             : type === 'hashtag' ? prisma.dummy_tweets_hashtag_word
             : type === 'cashtag' ? prisma.dummy_tweets_cashtag_word
             : type === 'url' ? prisma.dummy_tweets_url_title_word
             : type === 'user' ? prisma.dummy_users_description_word
             : prisma.dummy_tweets_content_word;
        const trueType = type === 'content' ? 'processed_text'
             : type === 'entity' ? 'entity_name'
             : type === 'domain' ? 'domain_name'
             : type === 'annotation' ? 'normalized_text'
             : type === 'hashtag' ? 'tag'
             : type === 'cashtag' ? 'tag'
             : type === 'url' ? 'processed_title'
             : type === 'user' ? 'processed_description'
             : 'processed_text';

        return await collection.aggregateRaw({
            pipeline: [
                // Group by processed_text
                { $group: {
                    _id: `$${trueType}`,
                    count: { $sum: "$count" }
                }},
                // Sort by count in descending order
                { $sort: { count: -1 } },
                // Limit output to first 100 items
                { $limit: 100 },
                // Project output
                { $project: {
                    _id: 0,
                    processed_text: "$_id",
                    count: 1
                }}
            ],
            options: {
                allowDiskUse: true,
            }
        });
    }

    getTop10ContentWordsGroupByLabel = async () => {
        return await prisma.dummy_tweets_content_word.aggregateRaw({
            pipeline: [
                {
                    $group: {
                        _id: "$processed_text",
                        count: { $sum: "$count" },
                        true_count: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$label", "true"] },
                                    then: "$count",
                                    else: 0
                                }
                            }
                        },
                        false_count: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$label", "false"] },
                                    then: "$count",
                                    else: 0
                                }
                            }
                        }
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 10
                },
                {
                    $project: {
                        _id: 0,
                        processed_text: "$_id",
                        count: 1,
                        true_count: 1,
                        false_count: 1,
                    }
                },
            ],
            options: {
                allowDiskUse: true,
            }
        });
    }

    getTop10AnnotationWordsGroupByLabel = async () => {
        return await prisma.dummy_tweets_annotation_word.aggregateRaw({
            pipeline: [
                {
                    $group: {
                        _id: "$normalized_text",
                        count: { $sum: "$count" },
                        true_count: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$label", "true"] },
                                    then: "$count",
                                    else: 0
                                }
                            }
                        },
                        false_count: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$label", "false"] },
                                    then: "$count",
                                    else: 0
                                }
                            }
                        }
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 10
                },
                {
                    $project: {
                        _id: 0,
                        processed_text: "$_id",
                        count: 1,
                        true_count: 1,
                        false_count: 1,
                    }
                },
            ],
            options: {
                allowDiskUse: true,
            }
        });
    }

    getTop10UserWordsGroupByLabel = async () => {
        return await prisma.dummy_users_description_word.aggregateRaw({
            pipeline: [
                {
                    $group: {
                        _id: "$processed_description",
                        count: { $sum: "$count" },
                        true_count: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$label", true] },
                                    then: "$count",
                                    else: 0
                                }
                            }
                        },
                        false_count: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$label", false] },
                                    then: "$count",
                                    else: 0
                                }
                            }
                        }
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 10
                },
                {
                    $project: {
                        _id: 0,
                        processed_text: "$_id",
                        count: 1,
                        true_count: 1,
                        false_count: 1,
                    }
                },
            ],
            options: {
                allowDiskUse: true,
            }
        });
    }

    async getDetectionCount() {
        return await prisma.histories.count();
    }

    async getDatasetCount() {
        return await prisma.tweets.count();
    }

    getContentLengthWithPublicMetric = async () => {
        return await prisma.dummy_tweets_text_length.aggregateRaw({
            pipeline: [
                {
                    $project: {
                    _id: 0,
                    processed_text_length: 1,
                    label: 1,
                    like_count: 1,
                    quote_count: 1,
                    reply_count: 1,
                    retweet_count: 1
                    }
                },
                {
                    $sample: { size: 1000 }
                }
            ]
        });
    }

    getAnnotationTypes = async () => {
        return await prisma.dummy_tweets_annotation_type.aggregateRaw({
            pipeline:[
                {
                    $group: {
                        _id: "$type",
                        count: { $sum: "$count" }
                    }
                },
            ],
            options: {
                allowDiskUse: true,
            }
        });
    };

    getDescriptionLengthWithPublicMetric = async () => {
        return await prisma.dummy_users_description_length.aggregateRaw({
            pipeline: [
                {
                    $project: {
                        _id: 0,
                        processed_description_length: 1,
                        label: 1,
                        tweet_count: 1,
                        followers_count: 1,
                        following_count: 1,
                    }
                },
                {
                    $sample: { size: 1000 }
                }
            ]
        });
    }

}