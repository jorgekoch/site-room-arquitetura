import { describe, expect, it } from "vitest";

import { shouldRedirectToAdminLogin } from "./api";

describe("shouldRedirectToAdminLogin", () => {
  it("does not redirect from public pages", () => {
    expect(shouldRedirectToAdminLogin("/", "/admin-auth/me")).toBe(false);
    expect(shouldRedirectToAdminLogin("/projetos", "/admin-auth/me")).toBe(false);
  });

  it("redirects only from admin routes", () => {
    expect(shouldRedirectToAdminLogin("/admin", "/admin-auth/me")).toBe(true);
    expect(shouldRedirectToAdminLogin("/admin/propostas", "/admin-auth/me")).toBe(true);
  });

  it("does not redirect from the login endpoint itself", () => {
    expect(shouldRedirectToAdminLogin("/admin/propostas", "/admin-auth/login")).toBe(false);
  });
});
