import { prisma } from "../../database/prisma";

import { ProjectRepository } from "../project/project.repository";
import { ProposalRepository } from "../proposal/proposal.repository";

export class DashboardService {
  private projectRepository =
    new ProjectRepository();

  private proposalRepository =
    new ProposalRepository();

  async getDashboard() {
    const [
      totalProjects,
      publishedProjects,
      draftProjects,

      totalProposals,
      newProposals,

      pendingAdminRequests,

      latestProjects,
      latestProposals,
    ] = await Promise.all([
      this.projectRepository.count(),

      this.projectRepository.countPublished(),

      this.projectRepository.countDrafts(),

      this.proposalRepository.count(),

      this.proposalRepository.countByStatus(
        "NEW"
      ),

      prisma.adminUser.count({
        where: {
          approved: false,
          isActive: false,
        },
      }),

      this.projectRepository.findLatestProjects(5),

      this.proposalRepository.findLatest(5),
    ]);

    return {
      stats: {
        totalProjects,

        publishedProjects,

        draftProjects,

        totalProposals,

        newProposals,

        pendingAdminRequests,
      },

      latestProjects,

      latestProposals,
    };
  }

  async getNotifications() {
    const [
      newProposals,
      pendingAdminRequests,
      proposalNotifications,
      adminNotifications,
    ] = await Promise.all([
      this.proposalRepository.countByStatus(
        "NEW"
      ),

      prisma.adminUser.count({
        where: {
          approved: false,
          isActive: false,
        },
      }),

      this.proposalRepository.findByStatus(
        "NEW"
      ),

      prisma.adminUser.findMany({
        where: {
          approved: false,
          isActive: false,
        },

        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    const total =
      newProposals +
      pendingAdminRequests;

    const notifications = [
      ...proposalNotifications.map(
        (proposal) => ({
          id: proposal.id,
          type: "PROPOSAL" as const,
          title: "Nova proposta",
          description:
            `${proposal.fullName} enviou uma solicitação.`,
          referenceId: proposal.id,
          createdAt: proposal.createdAt,
        })
      ),

      ...adminNotifications.map(
        (admin) => ({
          id: admin.id,
          type: "ADMIN_REQUEST" as const,
          title: "Solicitação de acesso",
          description:
            `${admin.name} solicitou acesso ao painel.`,
          referenceId: admin.id,
          createdAt: admin.createdAt,
        })
      ),
    ];

    notifications.sort(
      (a, b) =>
        b.createdAt.getTime() -
        a.createdAt.getTime()
    );

    return {
      total,

      newProposals,

      pendingAdminRequests,

      notifications,
    };
  }

}