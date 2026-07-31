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

const envSchema = z.object({
  port: z.coerce.number().default(3333),

  nodeEnv: z.string().default("development"),

  databaseUrl: z.string(),

  frontendUrl: z.string(),
  backendUrl: z.string(),
  pixKey: z.string().default(""),

  roomNotificationEmail: z.string().email(),

  smtpHost: z.string().optional(),
  smtpPort: z.coerce.number().optional(),
  smtpSecure: booleanFromEnv,
  smtpUser: z.string().optional(),
  smtpPass: z.string().optional(),
  mailFrom: z.string().optional(),

  jwtSecret: z.string(),

  ownerApprovalEmail: z.string().email(),
  ownerAdminName: z.string(),
  ownerAdminEmail: z.string().email(),
  ownerAdminPasswordHash: z.string(),

  uploadDir: z.string().default("uploads"),

  r2Bucket: z.string(),
  r2Endpoint: z.string(),
  r2PublicUrl: z.string(),
  r2AccessKeyId: z.string(),
  r2SecretAccessKey: z.string(),
});

export const env = envSchema.parse({
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,

  databaseUrl: process.env.DATABASE_URL,

  frontendUrl: process.env.FRONTEND_URL,
  backendUrl: process.env.BACKEND_URL,
  pixKey: process.env.PIX_KEY,

  roomNotificationEmail: process.env.ROOM_NOTIFICATION_EMAIL,

  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpSecure: process.env.SMTP_SECURE,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  mailFrom: process.env.MAIL_FROM,

  jwtSecret: process.env.JWT_SECRET,

  ownerApprovalEmail: process.env.OWNER_APPROVAL_EMAIL,
  ownerAdminName: process.env.OWNER_ADMIN_NAME,
  ownerAdminEmail: process.env.OWNER_ADMIN_EMAIL,
  ownerAdminPasswordHash: process.env.OWNER_ADMIN_PASSWORD_HASH,

  uploadDir: process.env.UPLOAD_DIR,

  r2Endpoint: process.env.R2_ENDPOINT,
  r2Bucket: process.env.R2_BUCKET,
  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID,
  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  r2PublicUrl: process.env.R2_PUBLIC_URL,
});