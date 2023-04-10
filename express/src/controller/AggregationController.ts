import { Request, Response } from "express";
import { AggregationService } from "../service/AggregationService";

export class AggregationController {

    constructor(
        private aggregationService: AggregationService = new AggregationService(),
    ) { }

    getTop20FalseTags = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getTop20FalseTags());
    }

    getTop20TrueTags = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getTop20TrueTags());
    }

    getLikeCountStats = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getLikeCountStats());
    }

    getWordCloud = async (req: Request, res: Response) => {
        res.json(await this.aggregationService.getWordCloud(req.query.type as string));
    }
    
    getPercentagesOfTweetsGroupByLabel = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getPercentagesOfTweetsGroupByLabel());
    }

    getPercentagesOfPossibleSensitiveContent = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getPercentagesOfPossibleSensitiveContent());
    }

    getDatasetStatistics = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getDatasetStatistics());
    }

    getTweetsStatistic = async  (_: Request, res: Response) => {
        res.json(await this.aggregationService.getTweetsStatistic());
    }

    getLabelDistributionThroughTime = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getLabelDistributionThroughTime());
    }

    getDataAmountThroughTime = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getDataAmountThroughTime());
    }

    getTop10ContentWordsGroupByLabel = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getTop10ContentWordsGroupByLabel());
    }

    getTop10AnnotationWordsGroupByLabel = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getTop10AnnotationWordsGroupByLabel());
    }

    getContentLengthWithPublicMetric = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getContentLengthWithPublicMetric());
    }

    getAnnotationTypes = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getAnnotationTypes());
    }

    getDetectionCount = async (_: Request, res: Response) => {
        res.json({
            result: true,
            data: await this.aggregationService.getDetectionCount(),
        });
    }

    getDatasetCount = async (_: Request, res: Response) => {
        res.json({
            result: true,
            data: await this.aggregationService.getDatasetCount(),
        });
    }

}