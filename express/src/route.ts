import express from 'express';
import { AggregationController } from './controller/AggregationController';
import { HistoryController } from './controller/HistoryController';
import { MockDetectionController } from './controller/MockDetectionController';
import { ModelDetectionController } from './controller/ModelDetectionController';

// aggregation router
export const aggregationRouter = express.Router();
const aggregationController = new AggregationController();
aggregationRouter.get('/getWordCloud', aggregationController.getWordCloud);
aggregationRouter.get('/getPercentagesOfTweetsGroupByLabel', aggregationController.getPercentagesOfTweetsGroupByLabel);
aggregationRouter.get('/getDetectionCount', aggregationController.getDetectionCount);
aggregationRouter.get('/getDatasetCount', aggregationController.getDatasetCount);
aggregationRouter.get('/getLikeCountStats', aggregationController.getLikeCountStats);
aggregationRouter.get('/getTop20TrueTags', aggregationController.getTop20TrueTags);
aggregationRouter.get('/getTop20FalseTags', aggregationController.getTop20FalseTags);

// history router
export const historyRouter = express.Router();
const historyController = new HistoryController();
historyRouter.get('/getHistoryList', historyController.getHistoryList);
historyRouter.post('/:id/remove', historyController.removeHistory);
historyRouter.post('/resetHistoryList', historyController.resetHistoryList);

// real functional api
export const detectionRouter = express.Router();
const detectionController = new ModelDetectionController();
detectionRouter.post('/detect', detectionController.detect);
detectionRouter.use('/history', historyRouter);
detectionRouter.use('/aggregation', aggregationRouter);

// mock data api
export const mockDetectionRouter = express.Router();
const mockController = new MockDetectionController();
mockDetectionRouter.post('/detect', mockController.detect);
mockDetectionRouter.use('/history', historyRouter);
mockDetectionRouter.use('/aggregation', aggregationRouter);
