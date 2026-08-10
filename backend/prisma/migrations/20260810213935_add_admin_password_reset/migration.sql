-- AlterTable
ALTER TABLE "admin_users" ADD COLUMN     "passwordResetTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "passwordResetTokenHash" TEXT,
ADD COLUMN     "tokenVersion" INTEGER NOT NULL DEFAULT 0;
