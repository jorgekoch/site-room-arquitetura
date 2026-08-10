import { z } from "zod";

export const updateSettingsSchema =
  z.object({
    whatsapp: z
      .string()
      .trim()
      .max(
        30,
        "O WhatsApp deve ter no máximo 30 caracteres."
      )
      .optional()
      .nullable(),

    instagram: z
      .string()
      .trim()
      .max(
        100,
        "O Instagram deve ter no máximo 100 caracteres."
      )
      .optional()
      .nullable(),

    maxProjectImages: z
      .number()
      .int(
        "O número máximo de imagens deve ser um número inteiro."
      )
      .min(
        1,
        "O número máximo de imagens deve ser pelo menos 1."
      )
      .max(
        100,
        "O número máximo de imagens não pode ser superior a 100."
      )
      .optional(),

    maxProjectImageSizeMb: z
      .number()
      .int(
        "O tamanho máximo da imagem deve ser um número inteiro."
      )
      .min(
        1,
        "O tamanho máximo da imagem deve ser pelo menos 1 MB."
      )
      .max(
        100,
        "O tamanho máximo da imagem não pode ser superior a 100 MB."
      )
      .optional(),
  })
  .strict();