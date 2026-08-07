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

      latestProjects,
      latestProposals,
    ] = await Promise.all([
      this.projectRepository.count(),

      this.projectRepository.countPublished(),

      this.projectRepository.countDrafts(),

      this.proposalRepository.count(),

      this.proposalRepository.countByStatus("NEW"),

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
      },

      latestProjects,

      latestProposals,
    };
  }
}