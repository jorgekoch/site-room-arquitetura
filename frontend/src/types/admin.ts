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
  updatedAt?: string;
  status: string;

  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  address: string;
  birthDate: string;
  socialProfile?: string | null;

  preferredContactMethod: string;
  preferredContactMethodOther?: string | null;

  referralSource: string;
  referralSourceOther?: string | null;

  desiredWorkStart: string;

  projectType: string;
  projectTypeOther?: string | null;

  paymentMethod: string;
  paymentMethodOther?: string | null;

  projectDetailsJson: unknown;
  internalNotes?: string | null;

  paymentProofUrl?: string | null;
  paymentProofUploadedAt?: string | null;
  pixKeySnapshot?: string | null;

  referenceFilesJson?: Array<{
    originalName: string;
    fileName?: string;
    mimeType?: string;
    size?: number;
    url: string;
  }> | null;
};