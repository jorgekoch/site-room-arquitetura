import { apiGet } from "./api";

import { DashboardResponse } from "../types/dashboard";

export function getDashboard() {
  return apiGet<DashboardResponse>(
    "/dashboard"
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