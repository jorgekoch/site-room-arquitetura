import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "styled-components";

import { shouldRedirectToAdminLogin } from "./api";
import { resolveHomeSectionHref } from "../config/navigation";
import Home from "../pages/public/Home";
import { darkTheme } from "../styles/theme";

describe("resolveHomeSectionHref", () => {
  it("always redirects section links back to the home page hash", () => {
    expect(resolveHomeSectionHref("/projetos", "#portfolio")).toBe("/#portfolio");
    expect(resolveHomeSectionHref("/blog", "#contato")).toBe("/#contato");
    expect(resolveHomeSectionHref("/", "#portfolio")).toBe("#portfolio");
  });
});

describe("Home portfolio section", () => {
  it("exposes the portfolio hash target on the home page", () => {
    const html = renderToStaticMarkup(
      React.createElement(
        MemoryRouter,
        null,
        React.createElement(
          ThemeProvider,
          { theme: darkTheme },
          React.createElement(Home),
        ),
      ),
    );

    expect(html).toContain('id="portfolio"');
  });
});

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
