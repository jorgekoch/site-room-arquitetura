import { prisma } from "../database/prisma";
import { encryptPersonalData } from "../utils/dataEncryption";

async function main() {
  const proposals = await prisma.proposalRequest.findMany({
    select: {
      id: true,
      email: true,
      fullName: true,
      cpf: true,
      address: true,
      birthDate: true,
      phone: true,
      socialProfile: true,
    },
  });

  let migrated = 0;

  for (const proposal of proposals) {
    const encryptedEmail = encryptPersonalData(proposal.email);
    const encryptedFullName = encryptPersonalData(proposal.fullName);
    const encryptedCpf = encryptPersonalData(proposal.cpf);
    const encryptedAddress = encryptPersonalData(proposal.address);
    const encryptedBirthDate = encryptPersonalData(proposal.birthDate);
    const encryptedPhone = encryptPersonalData(proposal.phone);
    const encryptedSocialProfile = proposal.socialProfile
      ? encryptPersonalData(proposal.socialProfile)
      : null;

    const changed =
      encryptedEmail !== proposal.email ||
      encryptedFullName !== proposal.fullName ||
      encryptedCpf !== proposal.cpf ||
      encryptedAddress !== proposal.address ||
      encryptedBirthDate !== proposal.birthDate ||
      encryptedPhone !== proposal.phone ||
      encryptedSocialProfile !== proposal.socialProfile;

    if (!changed) continue;

    await prisma.proposalRequest.update({
      where: { id: proposal.id },
      data: {
        email: encryptedEmail,
        fullName: encryptedFullName,
        cpf: encryptedCpf,
        address: encryptedAddress,
        birthDate: encryptedBirthDate,
        phone: encryptedPhone,
        socialProfile: encryptedSocialProfile,
      },
    });

    migrated += 1;
  }

  console.log(`Propostas criptografadas: ${migrated}`);
}

main()
  .catch((error) => {
    console.error("Falha ao criptografar dados das propostas.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
