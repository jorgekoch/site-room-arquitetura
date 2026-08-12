import { z } from "zod";
import { BlogPostStatus } from "@prisma/client";

export const createBlogPostSchema = z.object({
  title: z.string().trim().min(3, "O título deve ter pelo menos 3 caracteres."),

  slug: z.string().trim().min(1, "O slug é obrigatório."),

  excerpt: z
    .string()
    .trim()
    .min(10, "O resumo deve ter pelo menos 10 caracteres."),

  content: z
    .string()
    .trim()
    .min(20, "O conteúdo deve ter pelo menos 20 caracteres."),

  coverImage: z.preprocess(
    (value) => (typeof value === "string" && !value.trim() ? null : value),
    z
      .string()
      .url("Informe uma URL válida para a imagem de capa.")
      .nullable()
      .optional(),
  ),

  author: z.string().trim().min(2, "O autor deve ter pelo menos 2 caracteres."),

  category: z
    .string()
    .trim()
    .min(2, "A categoria deve ter pelo menos 2 caracteres."),

  publishedAt: z.coerce.date().default(new Date()),

  readingTime: z.coerce
    .number({
      error: "Informe o tempo de leitura em minutos.",
    })
    .int("O tempo de leitura deve ser um número inteiro.")
    .min(1, "O tempo de leitura deve ser maior que zero."),

  status: z.preprocess((value) => {
    if (typeof value === "string") {
      return value.toUpperCase();
    }

    return value;
  }, z.nativeEnum(BlogPostStatus).default(BlogPostStatus.DRAFT)),

  youtubeUrl: z.preprocess(
    (value) => (typeof value === "string" && !value.trim() ? null : value),
    z.string().url("Informe uma URL válida do YouTube.").nullable().optional(),
  ),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
