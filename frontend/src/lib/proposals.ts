import { apiDelete, apiGet, apiPatch, apiPost } from "./api";

import type {
  ProposalRequestAdmin,
  ProposalStatus,
} from "../types/proposal";

export function getProposals(params?: {
  status?: string;
  projectType?: string;
  search?: string;
}) {
  const query = new URLSearchParams();

  if (params?.status) {
    query.set("status", params.status);
  }

  if (params?.projectType) {
    query.set("projectType", params.projectType);
  }

  if (params?.search) {
    query.set("search", params.search);
  }

  const queryString = query.toString();

  return apiGet<ProposalRequestAdmin[]>(
    `/proposal-requests${
      queryString ? `?${queryString}` : ""
    }`
  );
}

export function getProposalById(id: string) {
  return apiGet<ProposalRequestAdmin>(
    `/proposal-requests/${id}`
  );
}

export function updateProposalStatus(
  id: string,
  status: ProposalStatus
) {
  return apiPatch<ProposalRequestAdmin>(
    `/proposal-requests/${id}/status`,
    { status }
  );
}

export function updateProposalNotes(
  id: string,
  internalNotes: string
) {
  return apiPatch<ProposalRequestAdmin>(
    `/proposal-requests/${id}/notes`,
    { internalNotes }
  );
}

export function deleteProposal(id: string) {
  return apiDelete(
    `/proposal-requests/${id}`,
    { confirmation: "excluir" }
  );
}

export function getProposalUploadUrl(data: {
  fileName: string;
  fileType:
    | "application/pdf"
    | "image/jpeg"
    | "image/png"
    | "image/webp";
  kind: "payment-proof" | "reference";
}) {
  return apiPost<{
    uploadUrl: string;
    storageKey: string;
  }>(
    "/proposal-requests/upload-url",
    data
  );
}

export function saveProposalPaymentProof(
  id: string,
  storageKey: string
) {
  return apiPatch<{
    message: string;
    proposal: unknown;
  }>(
    `/proposal-requests/${id}/payment-proof`,
    {
      storageKey,
    }
  );
}

export function getProposalPaymentProofDownloadUrl(id: string) {
  return apiGet<{ url: string }>(
    `/proposal-requests/${id}/payment-proof/download`
  );
}

export function getProposalReferenceFileDownloadUrl(
  id: string,
  index: number
) {
  return apiGet<{ url: string }>(
    `/proposal-requests/${id}/reference-files/${index}/download`
  );
}
