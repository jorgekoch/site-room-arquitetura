export type ProposalStatus =
  | "NEW"
  | "REVIEWING"
  | "AWAITING_PAYMENT"
  | "PAID"
  | "SCHEDULED"
  | "CLOSED"
  | "CANCELED";

export type ProposalRequestAdmin = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: ProposalStatus;

  email: string;
  fullName: string;
  cpf: string;
  address: string;
  birthDate: string;
  phone: string;
  socialProfile?: string | null;

  preferredContactMethod: string;
  preferredContactMethodOther?: string | null;

  referralSource: string;
  referralSourceOther?: string | null;

  desiredWorkStart: string;

  projectType: string;
  projectTypeOther?: string | null;

  taxAgreement: boolean;
  paymentMethod: string;
  paymentMethodOther?: string | null;

  projectDetailsJson: Record<string, unknown>;
  internalNotes?: string | null;
  paymentProofUrl?: string | null;
  paymentProofUploadedAt?: string | null;
};