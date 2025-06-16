import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import ModeProvider from "@providers/ModeProvider.tsx";
import TokenProvider from "@token/provider/token";
import { router } from "./routes.tsx";
import "./index.css";
import TokenCollectionProvider from "@token/provider/token-collection/ThemeCollectionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModeProvider>
      <TokenProvider
      // theme={{ ...defaultTheme, id: "default", name: "default" }}
      >
        <TokenCollectionProvider>
          <RouterProvider router={router} />
        </TokenCollectionProvider>
      </TokenProvider>
    </ModeProvider>
  </StrictMode>
);
