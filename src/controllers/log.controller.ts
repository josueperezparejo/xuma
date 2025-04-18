import { Request, Response } from "express";
import { logService } from "../services";

class LogController {
  public async getLogs(req: Request, res: Response): Promise<void> {
    const { level } = req.body;
    try {
      const logs = await logService.getLogs(level);
      res.json(logs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new LogController();
