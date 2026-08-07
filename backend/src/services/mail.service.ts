import { resend } from "../lib/resend";
import { env } from "../config/env";

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type SendMailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string | string[];
};

export async function sendMail({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendMailInput): Promise<void> {
  const toList = Array.isArray(to) ? to : [to];

  if (!env.mailFrom) {
    throw new Error("MAIL_FROM não configurado.");
  }

  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const { data, error } = await resend.emails.send({
        from: env.mailFrom,
        to: toList,
        subject,
        html,
        text,
        replyTo,
      });

      if (error) {
        throw error;
      }

      console.log("[mail] E-mail enviado com sucesso.", data?.id ?? "");
      return;
    } catch (error) {
      const isLastAttempt = attempt === maxAttempts;

      console.error(`[mail] Falha ao enviar e-mail (tentativa ${attempt}/${maxAttempts})`, error);

      if (isLastAttempt) {
        throw error;
      }

      await wait(1500 * attempt);
    }
  }
}