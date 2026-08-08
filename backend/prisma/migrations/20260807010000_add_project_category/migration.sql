-- CreateEnum
CREATE TYPE "public"."ProjectCategory" AS ENUM (
  'RESIDENTIAL',
  'INTERIORS',
  'COMMERCIAL',
  'LANDSCAPE',
  'CONSULTING',
  'OTHER'
);

-- AlterTable
ALTER TABLE "public"."projects"
ALTER COLUMN "category"
TYPE "public"."ProjectCategory"
USING "category"::text::"public"."ProjectCategory";