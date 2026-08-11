import { apiDelete, apiGet, apiPatch, apiPost } from "./api";

import type { ProposalRequestAdmin, ProposalStatus } from "../types/proposal";

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
    `/proposal-requests${queryString ? `?${queryString}` : ""}`,
  );
}

export function getProposalById(id: string) {
  return apiGet<ProposalRequestAdmin>(`/proposal-requests/${id}`);
}

export function updateProposalStatus(id: string, status: ProposalStatus) {
  return apiPatch<ProposalRequestAdmin>(`/proposal-requests/${id}/status`, {
    status,
  });
}

export function updateProposalNotes(id: string, internalNotes: string) {
  return apiPatch<ProposalRequestAdmin>(`/proposal-requests/${id}/notes`, {
    internalNotes,
  });
}

export function deleteProposal(id: string) {
  return apiDelete(`/proposal-requests/${id}`, { confirmation: "excluir" });
}

export function getProposalUploadUrl(data: {
  fileName: string;
  fileType: "application/pdf" | "image/jpeg" | "image/png" | "image/webp";
  kind: "payment-proof" | "reference";
}) {
  return apiPost<{
    uploadUrl: string;
    storageKey: string;
  }>("/proposal-requests/upload-url", data);
}

export function saveProposalPaymentProof(id: string, storageKey: string) {
  return apiPatch<{
    message: string;
    proposal: unknown;
  }>(`/proposal-requests/${id}/payment-proof`, {
    storageKey,
  });
}

export function getProposalPaymentProofDownloadUrl(id: string) {
  return apiGet<{ url: string }>(
    `/proposal-requests/${id}/payment-proof/download`,
  );
}

export function getProposalReferenceFileDownloadUrl(id: string, index: number) {
  return apiGet<{ url: string }>(
    `/proposal-requests/${id}/reference-files/${index}/download`,
  );
}

export async function exportProposals(params?: {
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

  const token = localStorage.getItem("room_admin_token");

  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(
    `${apiUrl}/api/proposal-requests/export${
      queryString ? `?${queryString}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    let message = "Não foi possível exportar as propostas.";

    try {
      const data = await response.json();

      message = data?.message || data?.error || message;
    } catch {
      // mantém mensagem padrão
    }

    throw new Error(message);
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `propostas-${new Date().toISOString().slice(0, 10)}.xlsx`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
}
