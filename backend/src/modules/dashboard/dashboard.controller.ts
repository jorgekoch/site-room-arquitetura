import type {
  Request,
  Response,
} from "express";

import { DashboardService } from "./dashboard.service";

const service = new DashboardService();

export class DashboardController {
  async index(
    _request: Request,
    response: Response
  ) {
    const dashboard =
      await service.getDashboard();

    return response.json(dashboard);
  }
}