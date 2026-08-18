import type { Request, Response } from "express";

import { AnalyticsService } from "./analytics.service";

const service = new AnalyticsService();

export class AnalyticsController {
  async overview(request: Request, response: Response) {
    try {
      const requestedRange = Number(request.query.range ?? 30);
      const range = Number.isFinite(requestedRange) ? requestedRange : 30;

      const analytics = await service.getOverview(range);

      return response.json(analytics);
    } catch (error) {
      console.error("Erro ao consultar Google Analytics:", error);

      return response.status(502).json({
        message: "Não foi possível consultar os dados do Google Analytics.",
      });
    }
  }
}
