import nodemailer from "nodemailer";
import { env } from "../config/env";

function createTransporter() {
  if (!env.smtpHost || !env.smtpUser || !env.smtpPass || !env.mailFrom) {
    return null;
  }

  return nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass,
    },
  });
}

type SendMailParams = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export async function sendMail({
  to,
  subject,
  html,
  text,
}: SendMailParams): Promise<void> {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn(
      "⚠️ SMTP não configurado. E-mail não enviado, mas a aplicação continua funcionando."
    );
    return;
  }

  await transporter.sendMail({
    from: env.mailFrom,
    to,
    subject,
    html,
    text,
  });
}