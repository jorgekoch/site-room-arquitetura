const API_URL = import.meta.env.VITE_API_URL;

export function publicApiFetch(path: string, init?: RequestInit) {
  const headers = new Headers(init?.headers || {});
  const isFormData = init?.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${API_URL}/api${path}`, {
    ...init,
    headers,
  });
}