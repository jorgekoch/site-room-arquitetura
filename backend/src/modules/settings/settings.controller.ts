import type {
  Request,
  Response,
} from "express";

import { updateSettingsSchema } from "./settings.schema";
import { SettingsService } from "./settings.service";

const service =
  new SettingsService();

export class SettingsController {
  async get(
    _request: Request,
    response: Response
  ) {
    const settings =
      await service.get();

    return response.json({
      settings,
    });
  }

  async update(
    request: Request,
    response: Response
  ) {
    const data =
      updateSettingsSchema.parse(
        request.body
      );

    const settings =
      await service.update(data);

    return response.json({
      message:
        "Configurações atualizadas com sucesso.",
      settings,
    });
  }
}