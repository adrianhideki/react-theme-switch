import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import ModeProvider from "@providers/ModeProvider.tsx";
import ThemeCollectionProvider from "@providers/ThemeCollectionContext.tsx";
import { router } from "./routes.tsx";
import "./index.css";
import "./theme.css";
import ThemeProvider from '@providers/ThemeProvider.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModeProvider>
      <ThemeProvider>
      <ThemeCollectionProvider>
        <RouterProvider router={router} />
      </ThemeCollectionProvider>
      </ThemeProvider>
    </ModeProvider>
  </StrictMode>
);
