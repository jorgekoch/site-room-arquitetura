import { Router } from "express";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureOwner } from "../../middlewares/ensureOwner";

import { SettingsController } from "./settings.controller";

const settingsRoutes = Router();

const controller = new SettingsController();

settingsRoutes.get(
  "/",
  (request, response) =>
    controller.get(
      request,
      response
    )
);

settingsRoutes.patch(
  "/",
  ensureAuthenticated,
  ensureOwner,
  (request, response) =>
    controller.update(
      request,
      response
    )
);

export { settingsRoutes };