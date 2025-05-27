import Home from "@pages/home";
import ThemeConfig from "@pages/theme-config";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/theme-config",
      element: <ThemeConfig />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
