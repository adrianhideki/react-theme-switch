import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import ModeProvider from "@providers/ModeProvider.tsx";
import ThemeProvider from "@providers/ThemeProvider.tsx";
import ThemeCollectionProvider from "@providers/ThemeCollectionContext.tsx";
import CssBaseLine from "@theme/CssBaseLine";
import TokenProvider from "@token/provider/token";
import { router } from "./routes.tsx";
import { defaultTheme } from "@token/theme/defaultTheme.ts";
import "./index.css";
import TokenCollectionProvider from "@token/provider/token-collection/ThemeCollectionContext.tsx";

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
        <TokenProvider theme={defaultTheme}>
          <CssBaseLine />
          <ThemeCollectionProvider>
            <TokenCollectionProvider>
              <RouterProvider router={router} />
            </TokenCollectionProvider>
          </ThemeCollectionProvider>
        </TokenProvider>
      </ThemeProvider>
    </ModeProvider>
  </StrictMode>
);
