import { apiGet, apiPatch } from "./api";

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