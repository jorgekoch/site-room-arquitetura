import { AppError } from "../../utils/AppError";

import { SettingsRepository } from "./settings.repository";

export interface UpdateSettingsInput {
  whatsapp?: string | null;
  instagram?: string | null;
  maxProjectImages?: number;
  maxProjectImageSizeMb?: number;
}

export class SettingsService {
  private readonly repository =
    new SettingsRepository();

  async get() {
    let settings =
      await this.repository.find();

    if (!settings) {
      settings =
        await this.repository.createDefault();
    }

    return settings;
  }

  async update(
    data: UpdateSettingsInput
  ) {
    const settings =
      await this.get();

    if (
      data.maxProjectImages !==
        undefined &&
      data.maxProjectImages < 1
    ) {
      throw new AppError(
        "O número máximo de imagens deve ser pelo menos 1.",
        400
      );
    }

    if (
      data.maxProjectImageSizeMb !==
        undefined &&
      data.maxProjectImageSizeMb <= 0
    ) {
      throw new AppError(
        "O tamanho máximo da imagem deve ser maior que zero.",
        400
      );
    }

    return this.repository.update(
      settings.id,
      data
    );
  }
}