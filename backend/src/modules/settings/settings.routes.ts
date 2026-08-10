import { Router } from "express";

import { ensureOwner } from "../../middlewares/ensureOwner";

import { SettingsController } from "./settings.controller";

const settingsRoutes =
  Router();

const controller =
  new SettingsController();

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
  ensureOwner,
  (request, response) =>
    controller.update(
      request,
      response
    )
);

export { settingsRoutes };