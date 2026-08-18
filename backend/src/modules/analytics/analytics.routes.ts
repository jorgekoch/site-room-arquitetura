import { Router } from "express";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

import { AnalyticsController } from "./analytics.controller";

const routes = Router();
const controller = new AnalyticsController();

routes.use(ensureAuthenticated);

routes.get("/overview", (request, response) =>
  controller.overview(request, response),
);

export { routes as analyticsRoutes };
