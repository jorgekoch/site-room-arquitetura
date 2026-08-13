const API_URL = import.meta.env.VITE_API_URL;

export const TOKEN_KEY = "room_admin_token";

type FlattenedIssues = {
  formErrors?: string[];
  fieldErrors?: Record<string, string[] | undefined>;
};

function getFirstIssueMessage(issues: unknown) {
  if (!issues || typeof issues !== "object") {
    return undefined;
  }

  const flattenedIssues = issues as FlattenedIssues;
  const formError = flattenedIssues.formErrors?.find(Boolean);

  if (formError) {
    return formError;
  }

  const fieldErrors = flattenedIssues.fieldErrors;

  if (!fieldErrors || typeof fieldErrors !== "object") {
    return undefined;
  }

  for (const messages of Object.values(fieldErrors)) {
    const firstMessage = messages?.find(Boolean);

    if (firstMessage) {
      return firstMessage;
    }
  }

  return undefined;
}

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

export function shouldRedirectToAdminLogin(
  currentPath: string,
  path?: string,
) {
  if (!path || path === "/admin-auth/login") {
    return false;
  }

  return currentPath.startsWith("/admin");
}

async function parseResponse<T>(response: Response, path?: string): Promise<T> {
  if (!response.ok) {
    if (response.status === 401 && path !== "/admin-auth/login") {
      removeAdminToken();

      if (shouldRedirectToAdminLogin(window.location.pathname, path)) {
        window.location.href = "/admin/login?session=expired";
      }
    }

    let message = "Erro inesperado.";
    let issues: unknown;

    try {
      const data = await response.json();
      message = data?.message || data?.error || message;
      issues = data?.issues;

      const issueMessage = getFirstIssueMessage(issues);
      if (issueMessage) {
        message = issueMessage;
      }
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

export function removeAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
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

export async function apiDelete<T = void>(
  path: string,
  body?: unknown,
): Promise<T> {
  const response = await request(path, {
    method: "DELETE",
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  return parseResponse<T>(response, path);
}
