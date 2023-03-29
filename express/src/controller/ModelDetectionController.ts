import { Request, Response } from 'express';
import { HistoryService } from '../service/HistoryService';
import { ModelDetectionService } from '../service/ModelDetectionService';

export class ModelDetectionController {
    constructor(
        private modelDetectionService: ModelDetectionService = new ModelDetectionService(),
        private historyService: HistoryService = new HistoryService(),
    ) { }

    detect = async (req: Request, res: Response): Promise<void> => {
        const { type, text } = req.body;

        if (!type || !text) {
            throw new Error('Invalid request body');
        }

        const ret = await this.modelDetectionService.detect(type, text);

        // database
        await this.historyService.addHistory({
            type,
            text,
            score: ret.data,
        });

        res.json({
            ...ret,
        });
    }
}
