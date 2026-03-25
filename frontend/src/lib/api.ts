import { getAdminToken } from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const token = getAdminToken();

  const headers = new Headers(init?.headers || {});
  const isFormData = init?.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${API_URL}/api${path}`, {
    ...init,
    headers,
  });
}