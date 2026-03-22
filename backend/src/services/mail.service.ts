import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { env } from "../config/env";

function createTransporter() {
  if (!env.smtpHost || !env.smtpUser || !env.smtpPass || !env.mailFrom) {
    console.warn("SMTP não configurado");
    return null;
  }

  const transportOptions: SMTPTransport.Options = {
    host: env.smtpHost,
    port: Number(env.smtpPort),
    secure: env.smtpSecure,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  };

  return nodemailer.createTransport(transportOptions);
}

export { createTransporter };

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