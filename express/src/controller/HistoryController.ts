import { Request, Response } from "express";
import { HistoryService } from "../service/HistoryService";

export class HistoryController {
    constructor(
        private historyService: HistoryService = new HistoryService(),
    ) { }

    getHistoryList = async (_: Request, res: Response) => {
        res.json(await this.historyService.getAllHistory());
    }

    resetHistoryList = async (_: Request, res: Response) => {
        res.json(await this.historyService.resetHistoryList());
    }

    removeHistory = async (req: Request, res: Response) => {
        const { id } = req.params;
        res.json(await this.historyService.removeHistory(id));
    }

}