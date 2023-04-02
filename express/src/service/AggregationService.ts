import mockPercentages from '../mock/tweet-sum-group-by-label.json';
import mockWordCloud from '../mock/word-cloud.json';
import { prisma } from '../utils/db';

export class AggregationService {

    async getPercentagesOfTweetsGroupByLabel() {
        return mockPercentages;

        // return await TweetModel.aggregate([
        //     { $limit: 100000 },
        //     { $match: {
        //         label: 'true'
        //     } },
        //     {
        //         $group: {
        //             _id: "$label",
        //             count: { $sum: 1 }
        //         }
        //     },
        // ], { allowDiskUse: true });
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