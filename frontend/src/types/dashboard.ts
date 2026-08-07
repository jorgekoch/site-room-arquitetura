import { Project } from "./project";
import { Proposal } from "./proposal";

export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;

  totalProposals: number;
  newProposals: number;
}

export interface DashboardResponse {
  stats: DashboardStats;

  latestProjects: Project[];

  latestProposals: Proposal[];
}