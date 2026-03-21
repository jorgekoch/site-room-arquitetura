import { z } from "zod";

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