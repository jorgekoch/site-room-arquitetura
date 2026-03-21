import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3333),
  databaseUrl: process.env.DATABASE_URL || "",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  backendUrl:
    process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3333}`,
  uploadDir: process.env.UPLOAD_DIR || "uploads",

  roomNotificationEmail:
    process.env.ROOM_NOTIFICATION_EMAIL || "manulopes.arq@gmail.com",
  ownerApprovalEmail:
    process.env.OWNER_APPROVAL_EMAIL || "manulopes.arq@gmail.com",

  smtpHost: process.env.SMTP_HOST || "",
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpSecure: process.env.SMTP_SECURE === "true",
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
  mailFrom: process.env.MAIL_FROM || "",

  jwtSecret: process.env.JWT_SECRET || "dev-secret",

  ownerAdminName: process.env.OWNER_ADMIN_NAME || "Owner",
  ownerAdminEmail: process.env.OWNER_ADMIN_EMAIL || "",
  ownerAdminPasswordHash: process.env.OWNER_ADMIN_PASSWORD_HASH || "",
};