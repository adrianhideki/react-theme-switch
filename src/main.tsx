import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import ModeProvider from "@providers/ModeProvider.tsx";
import ThemeProvider from "@providers/ThemeProvider.tsx";
import ThemeCollectionProvider from "@providers/ThemeCollectionContext.tsx";
import CssBaseLine from "@theme/CssBaseLine";
import { router } from "./routes.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModeProvider>
      <ThemeProvider
        theme={{
          colors: {
            primary: {
              main: { dark: "#f1f1f1", light: "#000" },
              contrast: { dark: "#000", light: "#fff" },
            },
          },
        }}
      >
        <CssBaseLine />
        <ThemeCollectionProvider>
          <RouterProvider router={router} />
        </ThemeCollectionProvider>
      </ThemeProvider>
    </ModeProvider>
  </StrictMode>
);
