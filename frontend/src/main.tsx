import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeModeProvider } from "./contexts/ThemeModeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeModeProvider>
        <GlobalStyle />
        <App />
      </ThemeModeProvider>

      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);