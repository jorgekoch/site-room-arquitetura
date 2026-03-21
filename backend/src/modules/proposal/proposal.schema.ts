import { z } from "zod";

export const createProposalSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(3),
  cpf: z.string().min(11),
  address: z.string().min(10),
  birthDate: z.string().min(1),
  phone: z.string().min(8),
  socialProfile: z.string().optional().nullable(),
  preferredContactMethod: z.string().min(1),
  referralSource: z.string().min(1),
  desiredWorkStart: z.string().min(1),
  projectType: z.string().min(1),

  newConstruction: z.any().optional(),
  interiors: z.any().optional(),
  renovation: z.any().optional(),
  consulting: z.any().optional(),

  taxAgreement: z.boolean(),
  paymentMethod: z.string().min(1),
  paymentMethodOther: z.string().optional().nullable(),
});

export type CreateProposalInput = z.infer<typeof createProposalSchema>;