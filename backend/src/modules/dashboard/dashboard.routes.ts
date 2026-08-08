import { Router } from "express";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

import { DashboardController } from "./dashboard.controller";

const routes = Router();

const controller =
  new DashboardController();

routes.use(
  ensureAuthenticated
);

routes.get(
  "/",
  (request, response) =>
    controller.index(
      request,
      response
    )
);

routes.get(
  "/notifications",
  (request, response) =>
    controller.notifications(
      request,
      response
    )
);

export {
  routes as dashboardRoutes,
};