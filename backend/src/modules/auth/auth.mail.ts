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
  const approveUrl =
    `${env.backendUrl}/api/admin-auth/approve?token=${rawToken}`;

  const text = `Novo pedido de acesso admin

Nome: ${admin.name}
E-mail: ${admin.email}

Para aprovar o acesso, abra este link:
${approveUrl}
`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111827;">
      <h2>Novo pedido de acesso admin</h2>

      <p>
        <strong>Nome:</strong>
        ${escapeHtml(admin.name)}
      </p>

      <p>
        <strong>E-mail:</strong>
        ${escapeHtml(admin.email)}
      </p>

      <p style="margin-top:18px;">
        <a
          href="${approveUrl}"
          style="display:inline-block;padding:12px 16px;border-radius:999px;background:#4fb286;color:#fff;text-decoration:none;font-weight:700;"
        >
          Aprovar acesso
        </a>
      </p>

      <p style="margin-top:16px;">
        Ou copie e cole este link no navegador:
      </p>

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

export async function sendAdminApprovedEmail(
  admin: AdminUser
) {
  const text = `Olá, ${admin.name}!

Seu acesso ao painel admin da ROOM foi aprovado.

Agora você já pode entrar em:
${env.frontendUrl}/admin/login
`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111827;">
      <h2>Seu acesso foi aprovado</h2>

      <p>
        Olá,
        <strong>${escapeHtml(admin.name)}</strong>!
      </p>

      <p>
        Seu acesso ao painel admin da ROOM foi aprovado.
      </p>

      <p style="margin-top:18px;">
        <a
          href="${env.frontendUrl}/admin/login"
          style="display:inline-block;padding:12px 16px;border-radius:999px;background:#4fb286;color:#fff;text-decoration:none;font-weight:700;"
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

/**
 * Envia o link para recuperação da senha.
 *
 * O token bruto é enviado apenas por e-mail.
 * O banco armazena somente o hash desse token.
 */
export async function sendAdminPasswordResetEmail(
  admin: AdminUser,
  rawToken: string
) {
  const resetUrl =
    `${env.frontendUrl}/admin/redefinir-senha?token=${encodeURIComponent(
      rawToken
    )}`;

  const text = `Olá, ${admin.name}!

Recebemos uma solicitação para redefinir a senha do seu acesso administrativo à ROOM Arquitetura.

Para criar uma nova senha, acesse o link abaixo:

${resetUrl}

Este link é válido por 30 minutos e pode ser utilizado apenas uma vez.

Se você não solicitou a redefinição da sua senha, ignore este e-mail.
`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111827;">
      <h2>Redefinição de senha</h2>

      <p>
        Olá,
        <strong>${escapeHtml(admin.name)}</strong>!
      </p>

      <p>
        Recebemos uma solicitação para redefinir a senha
        do seu acesso administrativo à ROOM Arquitetura.
      </p>

      <p style="margin-top:24px;">
        <a
          href="${resetUrl}"
          style="display:inline-block;padding:12px 18px;border-radius:999px;background:#4fb286;color:#fff;text-decoration:none;font-weight:700;"
        >
          Redefinir minha senha
        </a>
      </p>

      <p style="margin-top:20px;">
        Este link é válido por
        <strong>30 minutos</strong>
        e pode ser utilizado apenas uma vez.
      </p>

      <p>
        Se você não solicitou a redefinição da sua senha,
        ignore este e-mail.
      </p>

      <p style="margin-top:20px;font-size:13px;color:#6b7280;">
        Se o botão não funcionar, copie e cole o endereço abaixo no navegador:
      </p>

      <p style="font-size:13px;word-break:break-all;">
        ${resetUrl}
      </p>
    </div>
  `;

  await sendMail({
    to: admin.email,
    subject: "Redefinição de senha — ROOM Arquitetura",
    html,
    text,
  });
}

/**
 * Confirma que a senha foi alterada.
 */
export async function sendAdminPasswordResetConfirmationEmail(
  admin: AdminUser
) {
  const loginUrl =
    `${env.frontendUrl}/admin/login`;

  const text = `Olá, ${admin.name}!

A senha do seu acesso administrativo à ROOM Arquitetura foi alterada com sucesso.

Você pode entrar novamente no painel em:

${loginUrl}

Se você não realizou essa alteração, entre em contato com a responsável pelo sistema imediatamente.
`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111827;">
      <h2>Senha alterada com sucesso</h2>

      <p>
        Olá,
        <strong>${escapeHtml(admin.name)}</strong>!
      </p>

      <p>
        A senha do seu acesso administrativo à ROOM Arquitetura
        foi alterada com sucesso.
      </p>

      <p style="margin-top:24px;">
        <a
          href="${loginUrl}"
          style="display:inline-block;padding:12px 18px;border-radius:999px;background:#4fb286;color:#fff;text-decoration:none;font-weight:700;"
        >
          Entrar no painel
        </a>
      </p>

      <p style="margin-top:20px;">
        Se você não realizou essa alteração,
        entre em contato com a responsável pelo sistema imediatamente.
      </p>
    </div>
  `;

  await sendMail({
    to: admin.email,
    subject: "Sua senha foi alterada — ROOM",
    html,
    text,
  });
}