import Home from "@pages/home";
import TokenConfig from "@pages/token-config";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/token-config",
      element: <TokenConfig />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
