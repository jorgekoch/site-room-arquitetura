import { z } from "zod";

const projectCategoryValues = [
  "RESIDENTIAL",
  "INTERIORS",
  "COMMERCIAL",
  "LANDSCAPE",
  "CONSULTING",
  "OTHER",
] as const;

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
      z.enum(projectCategoryValues),

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

    year: z.coerce
      .number({
        error: "Informe um ano válido.",
      })
      .int("Informe um ano válido.")
      .min(1900, "Informe um ano válido.")
      .max(2100, "Informe um ano válido."),

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

    videoUrl: z.preprocess(
      (value) =>
        typeof value === "string" &&
        !value.trim()
          ? null
          : value,
      z
        .string()
        .url(
          "Informe uma URL válida do YouTube."
        )
        .optional()
        .nullable()
    ),

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
