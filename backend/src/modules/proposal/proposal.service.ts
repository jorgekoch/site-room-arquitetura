import { prisma } from "../../database/prisma";
import type { CreateProposalInput } from "./proposal.schema";

export class ProposalService {
  async create(data: CreateProposalInput) {
    const projectDetails = {
      newConstruction: data.newConstruction ?? null,
      interiors: data.interiors ?? null,
      renovation: data.renovation ?? null,
      consulting: data.consulting ?? null,
    };

    const proposal = await prisma.proposalRequest.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        cpf: data.cpf,
        address: data.address,
        birthDate: data.birthDate,
        phone: data.phone,
        socialProfile: data.socialProfile || null,
        preferredContactMethod: data.preferredContactMethod,
        referralSource: data.referralSource,
        desiredWorkStart: data.desiredWorkStart,
        projectType: data.projectType,
        taxAgreement: data.taxAgreement,
        paymentMethod: data.paymentMethod,
        paymentMethodOther: data.paymentMethodOther || null,
        projectDetailsJson: projectDetails,
      },
    });

    return proposal;
  }

  async list() {
    return prisma.proposalRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.proposalRequest.findUnique({
      where: { id },
    });
  }
}