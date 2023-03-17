import { Request, Response } from 'express';
import { ModelDetectionService } from '../service/ModelDetectionService';

export class ModelDetectionController {
    constructor(
        private modelDetectionService: ModelDetectionService = new ModelDetectionService(),
    ) {
        this.detect = this.detect.bind(this);
    }

    async detect(req: Request, res: Response): Promise<void> {
        const { type, text } = req.body;

        if (!type || !text) {
            throw new Error('Invalid request body');
        }

        const delegate = this.modelDetectionService.convertTypeToModelNames(type);

        if (!delegate) {
            throw new Error('Invalid type');
        }

        const ret = await delegate(text);

        res.json({
            ...ret,
        });
    }
}
