import { PrismaClient, AdminRole } from "@prisma/client";
import { env } from "../src/config/env";

const prisma = new PrismaClient();

async function main() {
  if (!env.ownerAdminEmail || !env.ownerAdminPasswordHash) {
    throw new Error("OWNER_ADMIN_EMAIL e OWNER_ADMIN_PASSWORD_HASH são obrigatórios no .env");
  }

  await prisma.adminUser.upsert({
    where: {
      email: env.ownerAdminEmail.toLowerCase(),
    },
    update: {
      name: env.ownerAdminName,
      passwordHash: env.ownerAdminPasswordHash,
      role: AdminRole.OWNER,
      approved: true,
      isActive: true,
      approvalToken: null,
      approvalTokenExpiresAt: null,
    },
    create: {
      name: env.ownerAdminName,
      email: env.ownerAdminEmail.toLowerCase(),
      passwordHash: env.ownerAdminPasswordHash,
      role: AdminRole.OWNER,
      approved: true,
      isActive: true,
    },
  });

  console.log("✅ Owner admin pronto");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });