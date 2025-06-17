import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import ModeProvider from "@providers/ModeProvider.tsx";
import ThemeProvider from "@theme/provider/theme";
import { router } from "./routes.tsx";
import "./index.css";
import ThemeCollectionProvider from "@theme/provider/theme-collection";
import CssBaseline from "@theme/css-baseline";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModeProvider>
      <ThemeProvider>
        <CssBaseline>
          <ThemeCollectionProvider>
            <RouterProvider router={router} />
          </ThemeCollectionProvider>
        </CssBaseline>
      </ThemeProvider>
    </ModeProvider>
  </StrictMode>
);
