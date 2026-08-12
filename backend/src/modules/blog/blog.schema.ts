import { z } from "zod";

const blogPostStatusValues = ["DRAFT", "PUBLISHED"] as const;

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

  status: z.preprocess((value) => {
    if (typeof value === "string") {
      return value.toUpperCase();
    }

    return value;
  }, z.enum(blogPostStatusValues).default("DRAFT")),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
