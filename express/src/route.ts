import express from 'express';
import { ModelDetectionController } from './controller/ModelDetectionController';

export const detectionRouter = express.Router();

const controller = new ModelDetectionController();

detectionRouter.post('/detect', controller.detect);
