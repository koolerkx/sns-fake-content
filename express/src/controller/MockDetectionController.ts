import { Request, Response } from "express";
import { HistoryService } from "../service/HistoryService";

export class MockDetectionController {
  constructor(private historyService: HistoryService = new HistoryService()) {}

  detect = async (req: Request, res: Response): Promise<void> => {
    const { type, text } = req.body;

    if (!type || !text) {
      throw new Error("Invalid request body");
    }

    const score = Math.random();

    await this.historyService.addHistory({
      type,
      text,
      score,
    });

    res.json({
      result: true,
      data: score,
    });
  };
}
