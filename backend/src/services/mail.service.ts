import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { env } from "../config/env";

type SendMailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string | string[];
};

function createTransporter() {
  if (!env.smtpHost || !env.smtpUser || !env.smtpPass || !env.mailFrom) {
    console.warn("[mail] SMTP não configurado completamente", {
      hasHost: Boolean(env.smtpHost),
      hasUser: Boolean(env.smtpUser),
      hasPass: Boolean(env.smtpPass),
      hasMailFrom: Boolean(env.mailFrom),
    });

    return null;
  }

  const transportOptions: SMTPTransport.Options = {
    host: env.smtpHost,
    port: Number(env.smtpPort),
    secure: env.smtpSecure ?? Number(env.smtpPort) === 465,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  };

  console.log("[mail] Criando transporter SMTP", {
    host: transportOptions.host,
    port: transportOptions.port,
    secure: transportOptions.secure,
    user: env.smtpUser,
    from: env.mailFrom,
    nodeEnv: env.nodeEnv,
  });

  return nodemailer.createTransport(transportOptions);
}

export async function sendMail({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendMailInput): Promise<void> {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn("[mail] Envio ignorado porque o transporter não foi criado", {
      subject,
      to,
    });
    return;
  }

  const toList = Array.isArray(to) ? to : [to];
  const replyToList = Array.isArray(replyTo)
    ? replyTo
    : replyTo
    ? [replyTo]
    : undefined;

  const payload = {
    from: env.mailFrom,
    to: toList,
    subject,
    html,
    text,
    replyTo: replyToList,
  };

  console.log("[mail] Iniciando envio", {
    from: payload.from,
    to: payload.to,
    subject: payload.subject,
    replyTo: payload.replyTo,
  });

  try {
    const verification = await transporter.verify();
    console.log("[mail] Transporter verificado com sucesso", {
      verification,
    });
  } catch (error) {
    console.error("[mail] Falha ao verificar transporter SMTP", {
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
      user: env.smtpUser,
      error,
    });

    throw error;
  }

  try {
    const info = await transporter.sendMail(payload);

    console.log("[mail] E-mail enviado com sucesso", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
      envelope: info.envelope,
    });
  } catch (error) {
    console.error("[mail] Falha no sendMail", {
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
      user: env.smtpUser,
      error,
    });

    throw error;
  }
}