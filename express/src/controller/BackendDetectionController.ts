import { Request, Response } from "express";
import { HistoryService } from "../service/HistoryService";
import { BackendModelDetectionService } from "../service/BackendModelDetectionService";

export class BackendDetectionController {
  constructor(
    private modelDetectionService: BackendModelDetectionService = new BackendModelDetectionService(),
    private historyService: HistoryService = new HistoryService()
  ) {}

  detect = async (req: Request, res: Response): Promise<void> => {
    const { type, text } = req.body;

    if (!type || !text) {
      throw new Error("Invalid request body");
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
  };
}
