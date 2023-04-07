import mockWordCloud from '../mock/word-cloud.json';
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

    async getWordCloud() {
        return mockWordCloud;

        // return await TweetModel.aggregate([
        //         { $limit: 25000 },
        //         { $project: { content: { $split: ["$content", " "] } } },
        //         { $unwind: "$content" },
        //         { $group: { _id: "$content", total: { "$sum": 1 } } },
        //         { $sort: { total: -1 } },
        //         { $limit: 100 },
        //     ], { allowDiskUse: true });
    }

    async getDetectionCount() {
        return await prisma.histories.count();
    }

    async getDatasetCount() {
        return await prisma.tweets.count();
    }

}