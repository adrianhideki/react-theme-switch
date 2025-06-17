import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import ModeProvider from "@providers/ModeProvider.tsx";
import {
  ThemeProvider,
  ThemeCollectionProvider,
  CssBaseline,
} from "theme-token-manager";
import { router } from "./routes.tsx";
import "./index.css";
import ErrorBoundary from "@components/error-boundary/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ModeProvider>
        <ThemeProvider>
          <CssBaseline mode={"dark"}>
            <ThemeCollectionProvider>
              <RouterProvider router={router} />
            </ThemeCollectionProvider>
          </CssBaseline>
        </ThemeProvider>
      </ModeProvider>
    </ErrorBoundary>
  </StrictMode>
);
