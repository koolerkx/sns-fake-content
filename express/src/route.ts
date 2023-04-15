import express, { Response } from "express";
import { AggregationController } from "./controller/AggregationController";
import { HistoryController } from "./controller/HistoryController";
import { MockDetectionController } from "./controller/MockDetectionController";
import { ModelDetectionController } from "./controller/ModelDetectionController";
import { BackendDetectionController } from "./controller/BackendDetectionController";

const ErrorHandlingProxy = ((controller: { [key: string]: (_: unknown, response: Response, ...rest: unknown[]) => Promise<void> }) => {
  for (const key in controller) {
    if (typeof controller[key] === 'function') {
      const originalFunc = controller[key];
      controller[key] = async function (_: unknown, response: Response, ...rest: unknown[]) {
        try {
          return await originalFunc.apply(this, [_, response, ...rest]);
        } catch (error) {
          try {
            response.json({
              result: 'false',
              message: (error as Error).message,
            });
          } catch {
            response.json({
              result: 'false',
              message: (error || "").toString(),
            });
          }
        }
      };
    }
  }
  return controller;
}) as <T,>(arg: T) => T;

// aggregation router
export const aggregationRouter = express.Router();
const aggregationController = ErrorHandlingProxy(new AggregationController());
aggregationRouter.get("/getWordCloud", aggregationController.getWordCloud);
aggregationRouter.get(
  "/getPercentagesOfTweetsGroupByLabel",
  aggregationController.getPercentagesOfTweetsGroupByLabel
);
aggregationRouter.get(
  "/getPercentagesOfPossibleSensitiveContent",
  aggregationController.getPercentagesOfPossibleSensitiveContent
);
aggregationRouter.get(
  "/getDatasetStatistics",
  aggregationController.getDatasetStatistics
);
aggregationRouter.get(
  "/getLabelDistributionThroughTime",
  aggregationController.getLabelDistributionThroughTime
);
aggregationRouter.get(
  "/getDataAmountThroughTime",
  aggregationController.getDataAmountThroughTime
);
aggregationRouter.get(
  "/getTweetsStatistic",
  aggregationController.getTweetsStatistic
);
aggregationRouter.get(
  "/getTop10ContentWordsGroupByLabel",
  aggregationController.getTop10ContentWordsGroupByLabel
);
aggregationRouter.get(
  "/getTop10AnnotationWordsGroupByLabel",
  aggregationController.getTop10AnnotationWordsGroupByLabel
);
aggregationRouter.get(
  "/getContentLengthWithPublicMetric",
  aggregationController.getContentLengthWithPublicMetric
);
aggregationRouter.get(
  "/getAnnotationTypes",
  aggregationController.getAnnotationTypes
);
aggregationRouter.get(
  "/getDescriptionLengthWithPublicMetric",
  aggregationController.getDescriptionLengthWithPublicMetric
);
aggregationRouter.get(
  "/getTop10UserWordsGroupByLabel",
  aggregationController.getTop10UserWordsGroupByLabel
);
aggregationRouter.get(
  "/getUserCreatedCountThroughTime",
  aggregationController.getUserCreatedCountThroughTime
);
aggregationRouter.get(
  "/getPercentagesOfUsersGroupByLabel",
  aggregationController.getPercentagesOfUsersGroupByLabel
);
aggregationRouter.get(
  "/getDetectionCount",
  aggregationController.getDetectionCount
);
aggregationRouter.get(
  "/getDatasetCount",
  aggregationController.getDatasetCount
);
aggregationRouter.get(
  "/getLikeCountStats",
  aggregationController.getLikeCountStats
);
aggregationRouter.get(
  "/getTop20TrueTags",
  aggregationController.getTop20TrueTags
);
aggregationRouter.get(
  "/getTop20FalseTags",
  aggregationController.getTop20FalseTags
);

// history router
export const historyRouter = express.Router();
const historyController = ErrorHandlingProxy(new HistoryController());
historyRouter.get("/getHistoryList", historyController.getHistoryList);
historyRouter.post("/:id/remove", historyController.removeHistory);
historyRouter.post("/resetHistoryList", historyController.resetHistoryList);

// real functional api
export const detectionRouter = express.Router();
const detectionController = ErrorHandlingProxy(new ModelDetectionController());
detectionRouter.post("/detect", detectionController.detect);
detectionRouter.use("/history", historyRouter);
detectionRouter.use("/aggregation", aggregationRouter);

// mock data api
export const mockDetectionRouter = express.Router();
const mockController = ErrorHandlingProxy(new MockDetectionController());
mockDetectionRouter.post("/detect", mockController.detect);
mockDetectionRouter.use("/history", historyRouter);
mockDetectionRouter.use("/aggregation", aggregationRouter);

export const backendDetectionRouter = express.Router();
const backendController = ErrorHandlingProxy(new BackendDetectionController());
backendDetectionRouter.post("/detect", backendController.detect);
backendDetectionRouter.use("/history", historyRouter);
backendDetectionRouter.use("/aggregation", aggregationRouter);
