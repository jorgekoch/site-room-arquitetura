import { z } from "zod";

const storageKeySchema = z
  .string()
  .regex(
    /^proposals\/(?:payment-proofs|references)\/[A-Za-z0-9._-]+$/,
    "Chave de armazenamento inválida."
  );

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

  newConstruction: z.any().optional(),
  interiors: z.any().optional(),
  renovation: z.any().optional(),
  consulting: z.any().optional(),

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
        "A chave deve pertencer à pasta de comprovantes.",
    }
  ),
});

export type UpdatePaymentProofInput =
  z.infer<typeof updatePaymentProofSchema>;
