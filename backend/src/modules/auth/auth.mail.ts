import type { AdminUser } from "@prisma/client";
import { env } from "../../config/env";
import { sendMail } from "../../services/mail.service";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendAdminApprovalRequestEmail(
  admin: AdminUser,
  rawToken: string
) {
  const approveUrl = `${env.backendUrl}/api/admin-auth/approve?token=${rawToken}`;

  const text = `Novo pedido de acesso admin

Nome: ${admin.name}
E-mail: ${admin.email}

Para aprovar o acesso, abra este link:
${approveUrl}
`;

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#111827; line-height:1.6;">
      <h1 style="font-size:22px; margin-bottom:12px;">Novo pedido de acesso admin</h1>

      <p><strong>Nome:</strong> ${escapeHtml(admin.name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(admin.email)}</p>

      <p style="margin-top:18px;">
        <a
          href="${approveUrl}"
          style="display:inline-block; padding:12px 16px; border-radius:999px; background:#4fb286; color:#fff; text-decoration:none; font-weight:700;"
        >
          Aprovar acesso
        </a>
      </p>

      <p style="margin-top:16px;">Ou copie e cole este link no navegador:</p>
      <p>${approveUrl}</p>
    </div>
  `;

  await sendMail({
    to: env.ownerApprovalEmail,
    subject: `Solicitação de acesso admin — ${admin.name}`,
    html,
    text,
  });
}

export async function sendAdminApprovedEmail(admin: AdminUser) {
  const text = `Olá, ${admin.name}!

Seu acesso ao painel admin da ROOM foi aprovado.

Agora você já pode entrar em:
${env.frontendUrl}/admin/login
`;

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#111827; line-height:1.6;">
      <h1 style="font-size:22px; margin-bottom:12px;">Seu acesso foi aprovado</h1>

      <p>Olá, <strong>${escapeHtml(admin.name)}</strong>!</p>

      <p>Seu acesso ao painel admin da ROOM foi aprovado.</p>

      <p style="margin-top:18px;">
        <a
          href="${env.frontendUrl}/admin/login"
          style="display:inline-block; padding:12px 16px; border-radius:999px; background:#4fb286; color:#fff; text-decoration:none; font-weight:700;"
        >
          Entrar no painel
        </a>
      </p>
    </div>
  `;

  await sendMail({
    to: admin.email,
    subject: "Acesso admin aprovado — ROOM",
    html,
    text,
  });
}