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

export interface AnalyticsChannel {
  channel: string;
  sessions: number;
}

export interface AnalyticsSource {
  source: string;
  medium: string;
  sessions: number;
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
  channels: AnalyticsChannel[];
  sources: AnalyticsSource[];
}

export interface DashboardResponse {
  stats: DashboardStats;

  latestProjects: Project[];

  latestProposals: Proposal[];
}
