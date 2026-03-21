-- AlterTable
ALTER TABLE "public"."proposal_requests" ADD COLUMN     "internalNotes" TEXT,
ADD COLUMN     "paymentProofUploadedAt" TIMESTAMP(3),
ADD COLUMN     "paymentProofUrl" TEXT;
