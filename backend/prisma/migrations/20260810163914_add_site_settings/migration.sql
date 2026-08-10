-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "whatsapp" TEXT,
    "instagram" TEXT,
    "maxProjectImages" INTEGER NOT NULL DEFAULT 20,
    "maxProjectImageSizeMb" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);
