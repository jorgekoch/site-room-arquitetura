-- AlterTable
ALTER TABLE "public"."proposal_requests" ADD COLUMN     "pixKeySnapshot" TEXT,
ADD COLUMN     "referenceFilesJson" JSONB;
