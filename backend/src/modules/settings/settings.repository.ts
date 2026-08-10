import { prisma } from "../../database/prisma";

export class SettingsRepository {
  async find() {
    return prisma.siteSettings.findFirst();
  }

  async createDefault() {
    return prisma.siteSettings.create({
      data: {},
    });
  }

  async update(
    id: string,
    data: {
      whatsapp?: string | null;
      instagram?: string | null;
      maxProjectImages?: number;
      maxProjectImageSizeMb?: number;
    }
  ) {
    return prisma.siteSettings.update({
      where: {
        id,
      },
      data,
    });
  }
}