import { Router } from "express";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureOwnerOrDev } from "../../middlewares/ensureOwnerOrDev";

import { SettingsController } from "./settings.controller";

const settingsRoutes = Router();

const controller = new SettingsController();

settingsRoutes.get("/", (request, response) =>
  controller.get(request, response),
);

settingsRoutes.patch(
  "/",
  ensureAuthenticated,
  ensureOwnerOrDev,
  (request, response) => controller.update(request, response),
);

export { settingsRoutes };
