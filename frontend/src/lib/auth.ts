import { apiGet, apiPatch } from "./api";
import { TOKEN_KEY, removeAdminToken } from "./api";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UpdateAdminProfileInput {
  name: string;
  email: string;
}

export interface ChangeAdminPasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export { removeAdminToken };

export function isAuthenticated() {
  return Boolean(getAdminToken());
}

export function getCurrentAdmin() {
  return apiGet<{
    user: AdminUser;
  }>("/admin-auth/me");
}

export function updateAdminProfile(data: UpdateAdminProfileInput) {
  return apiPatch<{
    user: AdminUser;
  }>("/admin-auth/me", data);
}

export function changeAdminPassword(data: ChangeAdminPasswordInput) {
  return apiPatch<{
    message: string;
  }>("/admin-auth/password", data);
}
