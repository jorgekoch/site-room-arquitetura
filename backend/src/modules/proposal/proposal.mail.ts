import type { ProposalRequest } from "@prisma/client";
import { env } from "../../config/env";
import { sendMail } from "../../services/mail.service";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatValueForText(value: unknown, indent = 0): string {
  const prefix = " ".repeat(indent);

  if (value === null || value === undefined || value === "") {
    return `${prefix}-`;
  }

  if (Array.isArray(value)) {
    if (!value.length) return `${prefix}-`;

    return value
      .map((item) => `${prefix}- ${formatValueForText(item, indent + 2).trim()}`)
      .join("\n");
  }

  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, val]) => `${prefix}${key}:\n${formatValueForText(val, indent + 2)}`)
      .join("\n");
  }

  return `${prefix}${String(value)}`;
}

function formatValueForHtml(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "<em>-</em>";
  }

  if (Array.isArray(value)) {
    if (!value.length) return "<em>-</em>";

    return `<ul style="margin:6px 0 0 18px; padding:0;">${value
      .map((item) => `<li>${formatValueForHtml(item)}</li>`)
      .join("")}</ul>`;
  }

  if (typeof value === "object") {
    return `<div style="display:grid; gap:8px; margin-top:6px;">${Object.entries(
      value as Record<string, unknown>
    )
      .map(
        ([key, val]) => `
          <div style="padding:10px 12px; border:1px solid #e5e7eb; border-radius:10px;">
            <strong style="display:block; margin-bottom:4px;">${escapeHtml(key)}</strong>
            <div>${formatValueForHtml(val)}</div>
          </div>
        `
      )
      .join("")}</div>`;
  }

  return escapeHtml(String(value));
}

function buildProposalPayload(proposal: ProposalRequest) {
  const details =
    proposal.projectDetailsJson && typeof proposal.projectDetailsJson === "object"
      ? (proposal.projectDetailsJson as Record<string, unknown>)
      : {};

  return {
    id: proposal.id,
    createdAt: proposal.createdAt.toISOString(),
    status: proposal.status,

    email: proposal.email,
    fullName: proposal.fullName,
    cpf: proposal.cpf,
    address: proposal.address,
    birthDate: proposal.birthDate,
    phone: proposal.phone,
    socialProfile: proposal.socialProfile || "",

    preferredContactMethod: proposal.preferredContactMethod,
    preferredContactMethodOther: proposal.preferredContactMethodOther || "",

    referralSource: proposal.referralSource,
    referralSourceOther: proposal.referralSourceOther || "",

    desiredWorkStart: proposal.desiredWorkStart,

    projectType: proposal.projectType,
    projectTypeOther: proposal.projectTypeOther || "",

    taxAgreement: proposal.taxAgreement ? "true" : "false",
    paymentMethod: proposal.paymentMethod,
    paymentMethodOther: proposal.paymentMethodOther || "",

    projectDetails: details,
    internalNotes: proposal.internalNotes || "",
    paymentProofUrl: proposal.paymentProofUrl || "",
  };
}

export async function sendProposalNotificationEmail(
  proposal: ProposalRequest
): Promise<void> {
  const payload = buildProposalPayload(proposal);

  const text = `Nova solicitação de proposta recebida

${formatValueForText(payload)}
`;

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#111827; line-height:1.6;">
      <h1 style="font-size:22px; margin-bottom:12px;">Nova solicitação de proposta</h1>
      <p style="margin-bottom:16px;">
        Uma nova solicitação foi cadastrada no site da ROOM Arquitetura Sustentável.
      </p>

      <div style="display:grid; gap:10px;">
        ${Object.entries(payload)
          .map(
            ([key, value]) => `
              <div style="padding:12px 14px; border:1px solid #e5e7eb; border-radius:12px;">
                <strong style="display:block; margin-bottom:6px;">${escapeHtml(key)}</strong>
                <div>${formatValueForHtml(value)}</div>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  await sendMail({
    to: env.roomNotificationEmail,
    subject: `Nova solicitação ROOM — ${proposal.fullName}`,
    html,
    text,
  });
}

export async function sendProposalConfirmationEmail(
  proposal: ProposalRequest
): Promise<void> {
  const text = `Olá, ${proposal.fullName}!

Recebemos sua solicitação de proposta na ROOM Arquitetura Sustentável.

Agora a equipe vai analisar as informações enviadas e seguir com os próximos passos do processo.

Resumo:
- Tipo de projeto: ${proposal.projectType}
- Forma de pagamento da taxa: ${proposal.paymentMethod}
- ID da solicitação: ${proposal.id}

Obrigada pela confiança!
ROOM Arquitetura Sustentável
`;

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#111827; line-height:1.6;">
      <h1 style="font-size:22px; margin-bottom:12px;">Recebemos sua solicitação 💚</h1>

      <p>Olá, <strong>${escapeHtml(proposal.fullName)}</strong>!</p>

      <p>
        Sua solicitação de proposta foi recebida com sucesso pela ROOM Arquitetura Sustentável.
      </p>

      <p>
        Agora a equipe vai analisar as informações enviadas e seguir com os próximos passos do processo.
      </p>

      <div style="padding:12px 14px; border:1px solid #e5e7eb; border-radius:12px; margin:16px 0;">
        <p style="margin:0 0 8px;"><strong>Resumo</strong></p>
        <p style="margin:0;">Tipo de projeto: ${escapeHtml(proposal.projectType)}</p>
        <p style="margin:0;">Forma de pagamento da taxa: ${escapeHtml(
          proposal.paymentMethod
        )}</p>
        <p style="margin:0;">ID da solicitação: ${escapeHtml(proposal.id)}</p>
      </div>

      <p>Obrigada pela confiança!</p>
      <p>ROOM Arquitetura Sustentável</p>
    </div>
  `;

  await sendMail({
    to: proposal.email,
    subject: "Recebemos sua solicitação — ROOM Arquitetura Sustentável",
    html,
    text,
  });
}

function getStatusLabel(status: ProposalRequest["status"]) {
  const labels: Record<ProposalRequest["status"], string> = {
    NEW: "Nova",
    REVIEWING: "Em análise",
    AWAITING_PAYMENT: "Aguardando pagamento",
    PAID: "Pago",
    SCHEDULED: "Agendado",
    CLOSED: "Encerrado",
    CANCELED: "Cancelado",
  };

  return labels[status] || status;
}

export async function sendProposalStatusChangedEmail(
  proposal: ProposalRequest
): Promise<void> {
  const label = getStatusLabel(proposal.status);

  const text = `Olá, ${proposal.fullName}!

O status da sua solicitação na ROOM Arquitetura Sustentável foi atualizado.

Novo status: ${label}
ID da solicitação: ${proposal.id}

Em caso de dúvida, responda este e-mail.

ROOM Arquitetura Sustentável
`;

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#111827; line-height:1.6;">
      <h1 style="font-size:22px; margin-bottom:12px;">Atualização da sua solicitação</h1>

      <p>Olá, <strong>${escapeHtml(proposal.fullName)}</strong>!</p>

      <p>O status da sua solicitação foi atualizado.</p>

      <div style="padding:12px 14px; border:1px solid #e5e7eb; border-radius:12px; margin:16px 0;">
        <p style="margin:0;"><strong>Novo status:</strong> ${escapeHtml(label)}</p>
        <p style="margin:0;"><strong>ID:</strong> ${escapeHtml(proposal.id)}</p>
      </div>

      <p>Em caso de dúvida, responda este e-mail.</p>
      <p>ROOM Arquitetura Sustentável</p>
    </div>
  `;

  await sendMail({
    to: proposal.email,
    subject: `Atualização da sua solicitação — ${label}`,
    html,
    text,
  });
}