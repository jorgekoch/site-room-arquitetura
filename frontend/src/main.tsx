import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeModeProvider } from "./contexts/ThemeModeContext";
import { AdminProvider } from "./contexts/AdminContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeModeProvider>
          <AdminProvider>
            <GlobalStyle />
            <App />
          </AdminProvider>
        </ThemeModeProvider>

        <Analytics />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
