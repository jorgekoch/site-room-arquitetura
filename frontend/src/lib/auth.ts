import { apiGet } from "./api";

const TOKEN_KEY = "room_admin_token";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getAdminToken());
}

export function getCurrentAdmin() {
  return apiGet<{ user: AdminUser }>(
    "/admin-auth/me"
  );
}