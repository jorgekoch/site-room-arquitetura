import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeModeProvider } from "./contexts/ThemeModeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeModeProvider>
        <GlobalStyle />
        <App />
      </ThemeModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);