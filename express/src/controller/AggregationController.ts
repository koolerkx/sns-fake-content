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

    getPercentagesOfUsersGroupByLabel = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getPercentagesOfUsersGroupByLabel());
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

    getLabelDistributionThroughTime = async (req: Request, res: Response) => {
        res.json(await this.aggregationService.getLabelDistributionThroughTime(req.query.label as any));
    }

    getUserCreatedCountThroughTime = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getUserCreatedCountThroughTime());
    }

    getDataAmountThroughTime = async (req: Request, res: Response) => {
        res.json(await this.aggregationService.getDataAmountThroughTime(req.query.label as any));
    }

    getTop10ContentWordsGroupByLabel = async (req: Request, res: Response) => {
        res.json(await this.aggregationService.getTop10ContentWordsGroupByLabel(req.query.label as any));
    }

    getTop10AnnotationWordsGroupByLabel = async (req: Request, res: Response) => {
        res.json(await this.aggregationService.getTop10AnnotationWordsGroupByLabel(req.query.label as any));
    }
    getTop10UserWordsGroupByLabel = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getTop10UserWordsGroupByLabel());
    }

    getContentLengthWithPublicMetric = async (req: Request, res: Response) => {
        res.json(await this.aggregationService.getContentLengthWithPublicMetric(req.query.label as any));
    }

    getAnnotationTypes = async (req: Request, res: Response) => {
        res.json(await this.aggregationService.getAnnotationTypes(req.query.label as any));
    }

    getDescriptionLengthWithPublicMetric = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getDescriptionLengthWithPublicMetric());
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