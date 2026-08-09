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
    .trim()
    .min(
      3,
      "O título deve ter pelo menos 3 caracteres."
    ),

  slug: z
    .string()
    .trim()
    .min(
      3,
      "O slug deve ter pelo menos 3 caracteres."
    )
    .regex(
      /^[a-z0-9-]+$/,
      "O slug pode conter apenas letras minúsculas, números e hífens."
    ),

  category: z.nativeEnum(ProjectCategory),

  city: z.string().optional().nullable(),

  state: z.string().optional().nullable(),

  year: z.coerce.number().optional().nullable(),

  area: z.string().optional().nullable(),

  description: z
    .string()
    .trim()
    .min(
      10,
      "A descrição deve ter pelo menos 10 caracteres."
    ),

  content: z.string().optional().nullable(),

  featuredImage: z
  .string()
  .url()
  .optional()
  .nullable(),

  featuredImageStorageKey: z
  .string()
  .optional()
  .nullable(),

  videoUrl: z
  .string()
  .url("Informe uma URL válida do YouTube.")
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