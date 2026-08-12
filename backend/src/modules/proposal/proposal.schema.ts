import { z } from "zod";

const storageKeySchema = z
  .string()
  .regex(
    /^proposals\/(?:payment-proofs|references)\/[A-Za-z0-9._-]+$/,
    "Chave de armazenamento inválida."
  );

const optionalText = z.string().trim().max(5000).optional();

export const newConstructionSchema = z.object({
  terrainSize: optionalText,
  terrainSlope: optionalText,
  terrainSlopeOther: optionalText,
  terrainZone: optionalText,
  terrainZoneOther: optionalText,
  terrainAddress: optionalText,
  scopeDescription: optionalText,
  floors: optionalText,
  floorsOther: optionalText,
  desiredArea: optionalText,
  definedBudget: optionalText,
  wantsEngineeringPartnership: optionalText,
  referencesLinks: optionalText,
  observations: optionalText,
  projectMode: optionalText,
});

export const interiorsSchema = z.object({
  includedItems: z.array(z.string().trim().min(1).max(100)).max(50).optional(),
  includedItemsOther: optionalText,
  environments: optionalText,
  referencesLinks: optionalText,
  observations: optionalText,
  projectMode: optionalText,
});

export const renovationSchema = z.object({
  projectDescription: optionalText,
  locationAddress: optionalText,
  referencesLinks: optionalText,
  observations: optionalText,
  projectMode: optionalText,
});

export const consultingSchema = z.object({
  requestDescription: optionalText,
});

export const uploadUrlSchema = z.object({
  fileName: z.string().trim().min(1).max(120),
  fileType: z.enum([
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
  ]),
  kind: z.enum(["payment-proof", "reference"]).default("reference"),
});

export const createProposalSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(3),
  cpf: z.string().min(11),
  address: z.string().min(5),
  birthDate: z.string().min(1),
  phone: z.string().min(8),
  socialProfile: z.string().optional().nullable(),

  preferredContactMethod: z.string().min(1),
  preferredContactMethodOther: z.string().optional().nullable(),

  referralSource: z.string().min(1),
  referralSourceOther: z.string().optional().nullable(),

  desiredWorkStart: z.string().min(1),

  projectType: z.string().min(1),
  projectTypeOther: z.string().optional().nullable(),

  newConstruction: newConstructionSchema.optional(),
  interiors: interiorsSchema.optional(),
  renovation: renovationSchema.optional(),
  consulting: consultingSchema.optional(),

  taxAgreement: z.boolean(),
  paymentMethod: z.string().min(1),
  paymentMethodOther: z.string().optional().nullable(),

  // A URL recebida em versões antigas é ignorada; documentos ficam privados.
  paymentProofUrl: z.string().url().nullable().optional(),
  paymentProofStorageKey: storageKeySchema.nullable().optional(),
  referenceFilesJson: z
    .array(
      z.object({
        originalName: z.string(),
        fileName: z.string(),
        mimeType: z.string(),
        size: z.number(),
        url: z.string().url().optional(),
        storageKey: storageKeySchema,
      })
    )
    .optional()
    .default([]),
});

export const updateProposalStatusSchema = z.object({
  status: z.enum([
    "NEW",
    "REVIEWING",
    "AWAITING_PAYMENT",
    "PAID",
    "SCHEDULED",
    "CLOSED",
    "CANCELED",
  ]),
});

export const updateProposalNotesSchema = z.object({
  internalNotes: z.string().optional().default(""),
});

export const deleteProposalSchema = z.object({
  confirmation: z.literal("excluir", {
    error: 'Digite "excluir" para confirmar a exclusão da proposta.',
  }),
});

export type CreateProposalInput = z.infer<typeof createProposalSchema>;
export type UpdateProposalStatusInput = z.infer<typeof updateProposalStatusSchema>;
export type UpdateProposalNotesInput = z.infer<typeof updateProposalNotesSchema>;
export const updatePaymentProofSchema = z.object({
  storageKey: storageKeySchema.refine(
    (value) =>
      value.startsWith(
        "proposals/payment-proofs/"
      ),
    {
      message:
        "A chave deve pertencer à pasta de comprovantes."
    }
  ),
});

export type UpdatePaymentProofInput =
  z.infer<typeof updatePaymentProofSchema>;
