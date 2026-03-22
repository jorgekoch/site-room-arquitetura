const API_URL = import.meta.env.VITE_API_URL;

export function publicApiFetch(path: string, init?: RequestInit) {
  const headers = new Headers(init?.headers || {});
  headers.set("Content-Type", "application/json");

  return fetch(`${API_URL}/api${path}`, {
    ...init,
    headers,
  });
}