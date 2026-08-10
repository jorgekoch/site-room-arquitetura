const API_URL = import.meta.env.VITE_API_URL;

const TOKEN_KEY = "room_admin_token";

async function request(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const token = localStorage.getItem(TOKEN_KEY);

  const headers = new Headers(init.headers);

  const isFormData = init.body instanceof FormData;

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

async function parseResponse<T>(response: Response, path?: string): Promise<T> {
  if (!response.ok) {
    if (response.status === 401 && path !== "/admin-auth/login") {
      localStorage.removeItem("room_admin_token");

      if (window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login?session=expired";
      }
    }

    let message = "Erro inesperado.";

    let issues: unknown;

    try {
      const data = await response.json();

      message = data?.message || data?.error || message;

      issues = data?.issues;
    } catch {
      try {
        message = await response.text();
      } catch {
        // ignora
      }
    }

    const error = new Error(message) as Error & {
      issues?: unknown;
    };

    error.issues = issues;

    throw error;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function apiFetch(path: string, init?: RequestInit) {
  return request(path, init);
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await request(path);

  return parseResponse<T>(response, path);
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const response = await request(path, {
    method: "POST",
    body: body instanceof FormData ? body : JSON.stringify(body),
  });

  return parseResponse<T>(response, path);
}

export async function apiPut<T>(path: string, body?: unknown): Promise<T> {
  const response = await request(path, {
    method: "PUT",
    body: body instanceof FormData ? body : JSON.stringify(body),
  });

  return parseResponse<T>(response, path);
}

export async function apiPatch<T>(path: string, body?: unknown): Promise<T> {
  const response = await request(path, {
    method: "PATCH",
    body: body instanceof FormData ? body : JSON.stringify(body),
  });

  return parseResponse<T>(response, path);
}

export async function apiDelete<T = void>(path: string): Promise<T> {
  const response = await request(path, {
    method: "DELETE",
  });

  return parseResponse<T>(response, path);
}
