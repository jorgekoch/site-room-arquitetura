import { apiGet } from "./api";

import { DashboardResponse } from "../types/dashboard";

export function getDashboard() {
  return apiGet<DashboardResponse>(
    "/dashboard"
  );
}