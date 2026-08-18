import { apiGet } from "./api";

import {
  AnalyticsOverview,
  DashboardResponse,
} from "../types/dashboard";

export function getDashboard() {
  return apiGet<DashboardResponse>(
    "/dashboard"
  );
}

export function getDashboardAnalytics(range = 30) {
  return apiGet<AnalyticsOverview>(
    `/analytics/overview?range=${range}`
  );
}

export interface DashboardNotification {
  id: string;

  type:
    | "PROPOSAL"
    | "ADMIN_REQUEST";

  title: string;

  description: string;

  referenceId: string;

  createdAt: string;
}

export interface DashboardNotifications {
  total: number;

  newProposals: number;

  pendingAdminRequests: number;

  notifications: DashboardNotification[];
}

export function getDashboardNotifications() {
  return apiGet<DashboardNotifications>(
    "/dashboard/notifications"
  );
}
