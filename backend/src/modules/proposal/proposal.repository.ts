import { Prisma } from "@prisma/client";

import { prisma } from "../../database/prisma";

export class ProposalRepository {
  async create(data: Prisma.ProposalRequestCreateInput) {
    return prisma.proposalRequest.create({
      data,
    });
  }

  async findAll(where?: Prisma.ProposalRequestWhereInput) {
    return prisma.proposalRequest.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.proposalRequest.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.ProposalRequestUpdateInput
  ) {
    return prisma.proposalRequest.update({
      where: {
        id,
      },

      data,
    });
  }

  async count() {
    return prisma.proposalRequest.count();
  }

  async countByStatus(status: string) {
    return prisma.proposalRequest.count({
      where: {
        status: status as any,
      },
    });
  }

  async findLatest(limit = 5) {
    return prisma.proposalRequest.findMany({
      take: limit,

      orderBy: {
        createdAt: "desc",
      },
    });
  }
}