-- CreateEnum
CREATE TYPE "public"."ProposalStatus" AS ENUM ('NEW', 'REVIEWING', 'AWAITING_PAYMENT', 'PAID', 'SCHEDULED', 'CLOSED', 'CANCELED');

-- CreateTable
CREATE TABLE "public"."proposal_requests" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."ProposalStatus" NOT NULL DEFAULT 'NEW',
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "socialProfile" TEXT,
    "preferredContactMethod" TEXT NOT NULL,
    "preferredContactMethodOther" TEXT,
    "referralSource" TEXT NOT NULL,
    "referralSourceOther" TEXT,
    "desiredWorkStart" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "projectTypeOther" TEXT,
    "taxAgreement" BOOLEAN NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentMethodOther" TEXT,
    "projectDetailsJson" JSONB NOT NULL,

    CONSTRAINT "proposal_requests_pkey" PRIMARY KEY ("id")
);
