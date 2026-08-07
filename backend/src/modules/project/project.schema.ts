import { z } from "zod";
import { ProjectCategory } from "@prisma/client";

export const projectImageSchema = z.object({
  imageUrl: z.string().url(),

  storageKey: z.string(),

  alt: z.string().optional().nullable(),

  sortOrder: z.number().default(0),
});

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Informe o título do projeto."),

  slug: z
    .string()
    .min(3)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug inválido."
    ),

  category: z.nativeEnum(ProjectCategory),

  city: z.string().optional().nullable(),

  state: z.string().optional().nullable(),

  year: z.coerce.number().optional().nullable(),

  area: z.string().optional().nullable(),

  description: z
    .string()
    .min(10),

  content: z.string().optional().nullable(),

  featuredImage: z
  .string()
  .url()
  .or(z.literal(""))
  .optional()
  .nullable(),

  published: z.boolean().default(true),

  featured: z.boolean().default(false),

  images: z
    .array(projectImageSchema)
    .default([]),
});

export const updateProjectSchema =
  createProjectSchema.partial();

export type CreateProjectInput =
  z.infer<typeof createProjectSchema>;

export type UpdateProjectInput =
  z.infer<typeof updateProjectSchema>;