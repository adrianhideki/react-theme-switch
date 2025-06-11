import Home from "@pages/home";
import ThemeConfig from "@pages/theme-config";
import ThemeV2 from "@pages/theme-v2";
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
    {
      path: "/theme-v2",
      element: <ThemeV2 />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
