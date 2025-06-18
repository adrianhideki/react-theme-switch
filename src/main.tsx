import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import ModeProvider from "@providers/ModeProvider.tsx";
import { ThemeProvider, ThemeCollectionProvider } from "theme-token-manager";
import { router } from "./routes.tsx";
import "./index.css";
import ErrorBoundary from "@components/error-boundary/index.tsx";
import CssProvider from "@providers/css-provider/index.tsx";
import { defaultTheme } from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ModeProvider>
        <ThemeProvider>
          <CssProvider>
            <ThemeCollectionProvider defaultTheme={defaultTheme}>
              <RouterProvider router={router} />
            </ThemeCollectionProvider>
          </CssProvider>
        </ThemeProvider>
      </ModeProvider>
    </ErrorBoundary>
  </StrictMode>
);
