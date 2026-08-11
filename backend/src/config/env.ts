import "dotenv/config";
import { z } from "zod";

const booleanFromEnv = z
  .string()
  .optional()
  .transform((value) => {
    if (value === undefined) return undefined;

    const normalized = value.trim().toLowerCase();

    if (normalized === "true") return true;
    if (normalized === "false") return false;

    throw new Error(`Valor booleano inválido: ${value}`);
  });

const cleanString = (value: string | undefined) => {
  if (value === undefined) return undefined;
  return value.trim().replace(/^['"]|['"]$/g, "");
};

const envSchema = z.object({
  port: z.coerce.number().default(3333),

  nodeEnv: z.string().default("development"),

  databaseUrl: z.string(),

  frontendUrl: z.string().url(),
  backendUrl: z.string().url(),

  pixKey: z.string().default(""),

  roomNotificationEmail: z
    .string()
    .transform((value) => cleanString(value) ?? "")
    .refine((value) => value.length > 0, "ROOM_NOTIFICATION_EMAIL é obrigatório")
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "ROOM_NOTIFICATION_EMAIL deve ser um e-mail válido"),

  // Resend
  resendApiKey: z.string().min(1),
  mailFrom: z
    .string()
    .transform((value) => cleanString(value) ?? "")
    .refine((value) => value.length > 0, "MAIL_FROM é obrigatório"),

  jwtSecret: z.string(),

  dataEncryptionKey: z
    .string()
    .trim()
    .refine(
      (value) => {
        try {
          return Buffer.from(value, "base64").length === 32;
        } catch {
          return false;
        }
      },
      "DATA_ENCRYPTION_KEY deve ser uma chave Base64 de 32 bytes."
    ),

  ownerApprovalEmail: z
    .string()
    .transform((value) => cleanString(value) ?? "")
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "OWNER_APPROVAL_EMAIL deve ser um e-mail válido"),
  ownerAdminName: z.string(),
  ownerAdminEmail: z
    .string()
    .transform((value) => cleanString(value) ?? "")
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "OWNER_ADMIN_EMAIL deve ser um e-mail válido"),
  ownerAdminPasswordHash: z.string(),

  uploadDir: z.string().default("uploads"),

  r2Bucket: z.string().trim().min(1),

  // Bucket sem acesso público para documentos enviados por clientes.
  r2PrivateBucket: z.string().trim().min(1),

  r2Endpoint: z
    .string()
    .trim()
    .url("R2_ENDPOINT deve ser uma URL válida.")
    .refine(
      (value) =>
        new URL(value).hostname.endsWith(".r2.cloudflarestorage.com"),
      "R2_ENDPOINT deve usar o endpoint S3 do Cloudflare R2."
    ),

  r2PublicUrl: z
    .string()
    .trim()
    .url("R2_PUBLIC_URL deve ser uma URL válida."),

  r2AccessKeyId: z.string().trim().min(1),

  r2SecretAccessKey: z.string().trim().min(1),
});

export const env = envSchema.parse({
  port: process.env.PORT,

  nodeEnv: process.env.NODE_ENV,

  databaseUrl: process.env.DATABASE_URL,

  frontendUrl: process.env.FRONTEND_URL,

  backendUrl: process.env.BACKEND_URL,

  pixKey: process.env.PIX_KEY,

  roomNotificationEmail: process.env.ROOM_NOTIFICATION_EMAIL,

  // Resend
  resendApiKey: process.env.RESEND_API_KEY,

  mailFrom: process.env.MAIL_FROM,

  jwtSecret: process.env.JWT_SECRET,

  dataEncryptionKey: process.env.DATA_ENCRYPTION_KEY,

  ownerApprovalEmail: process.env.OWNER_APPROVAL_EMAIL,

  ownerAdminName: process.env.OWNER_ADMIN_NAME,

  ownerAdminEmail: process.env.OWNER_ADMIN_EMAIL,

  ownerAdminPasswordHash: process.env.OWNER_ADMIN_PASSWORD_HASH,

  uploadDir: process.env.UPLOAD_DIR,

  r2Endpoint: process.env.R2_ENDPOINT,

  r2Bucket: process.env.R2_BUCKET,

  r2PrivateBucket: process.env.R2_PRIVATE_BUCKET,

  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID,

  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY,

  r2PublicUrl: process.env.R2_PUBLIC_URL,
});
