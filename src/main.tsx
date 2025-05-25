import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ThemeProvider from "./context/ThemeContext.tsx";
import ThemeCollectionProvider from "@context/ThemeCollectionContext.tsx";
import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ThemeCollectionProvider>
        <RouterProvider router={router} />
      </ThemeCollectionProvider>
    </ThemeProvider>
  </StrictMode>
);
