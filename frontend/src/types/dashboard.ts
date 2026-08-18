import { Project } from "./project";
import { Proposal } from "./proposal";

export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;

  totalProposals: number;
  newProposals: number;

  pendingAdminRequests: number;
}

export interface AnalyticsDay {
  date: string;
  users: number;
  sessions: number;
  views: number;
}

export interface AnalyticsPage {
  path: string;
  views: number;
}

export interface AnalyticsOverview {
  configured: boolean;
  range: number;
  totals: {
    users: number;
    sessions: number;
    views: number;
  };
  daily: AnalyticsDay[];
  topPages: AnalyticsPage[];
}

export interface DashboardResponse {
  stats: DashboardStats;

  latestProjects: Project[];

  latestProposals: Proposal[];
}
