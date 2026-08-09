import { z } from "zod";

import { ProjectCategory } from "@prisma/client";

export const projectImageSchema =
  z.object({
    imageUrl: z.string().url(),

    storageKey: z
      .string()
      .trim()
      .min(
        1,
        "A chave de armazenamento é obrigatória."
      ),

    alt: z
      .string()
      .optional()
      .nullable(),

    sortOrder: z
      .number()
      .int()
      .min(0)
      .default(0),
  });

export const createProjectSchema =
  z.object({
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
        1,
        "O slug é obrigatório."
      ),

    category:
      z.nativeEnum(ProjectCategory),

    city: z
      .string()
      .trim()
      .optional()
      .nullable(),

    state: z
      .string()
      .trim()
      .optional()
      .nullable(),

    year: z
      .coerce
      .number()
      .int()
      .min(1900)
      .max(2100)
      .optional()
      .nullable(),

    area: z
      .string()
      .trim()
      .optional()
      .nullable(),

    description: z
      .string()
      .trim()
      .min(
        10,
        "A descrição deve ter pelo menos 10 caracteres."
      ),

    content: z
      .string()
      .optional()
      .nullable(),

    featuredImage: z
      .string()
      .url()
      .optional()
      .nullable(),

    featuredImageStorageKey: z
      .string()
      .trim()
      .min(1)
      .optional()
      .nullable(),

    videoUrl: z
      .string()
      .url(
        "Informe uma URL válida do YouTube."
      )
      .optional()
      .nullable(),

    published: z
      .boolean()
      .default(true),

    featured: z
      .boolean()
      .default(false),

    images: z
      .array(projectImageSchema)
      .default([]),
  });

export const updateProjectSchema =
  createProjectSchema
    .omit({
      images: true,
    })
    .partial();

export type CreateProjectInput =
  z.infer<
    typeof createProjectSchema
  >;

export type UpdateProjectInput =
  z.infer<
    typeof updateProjectSchema
  >;

export const updateFeaturedImageSchema =
  z.object({
    featuredImage: z
      .string()
      .url()
      .nullable(),

    featuredImageStorageKey: z
      .string()
      .trim()
      .min(1)
      .nullable(),
  });