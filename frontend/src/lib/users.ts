import { apiGet, apiPatch, apiDelete } from "./api";

import type {
  AdminRole,
  AdminUserItem,
} from "../types/admin-users";

export function getAdminUsers() {
  return apiGet<AdminUserItem[]>(
    "/admin-users"
  );
}

export function approveAdmin(
  id: string
) {
  return apiPatch<{
    message: string;
    admin: AdminUserItem;
  }>(
    `/admin-users/${id}/approve`
  );
}

export function activateAdmin(
  id: string
) {
  return apiPatch<{
    message: string;
    admin: AdminUserItem;
  }>(
    `/admin-users/${id}/activate`
  );
}

export function deactivateAdmin(
  id: string
) {
  return apiPatch<{
    message: string;
    admin: AdminUserItem;
  }>(
    `/admin-users/${id}/deactivate`
  );
}

export function updateAdminRole(
  id: string,
  role: AdminRole
) {
  return apiPatch<{
    message: string;
    admin: AdminUserItem;
  }>(
    `/admin-users/${id}/role`,
    { role }
  );
}

export function removeAdmin(
  id: string
) {
  return apiDelete<{
    success: boolean;
  }>(
    `/admin-users/${id}`
  );
}