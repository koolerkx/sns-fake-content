import { Request, Response } from "express";
import { AggregationService } from "../service/AggregationService";

export class AggregationController {

    constructor(
        private aggregationService: AggregationService = new AggregationService(),
    ) { }

    getWordCloud = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getWordCloud());
    }
    
    getPercentagesOfTweetsGroupByLabel = async (_: Request, res: Response) => {
        res.json(await this.aggregationService.getPercentagesOfTweetsGroupByLabel());
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