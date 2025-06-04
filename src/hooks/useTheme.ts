import { useContext } from "react";
import { defaultTheme } from "@theme/index";
import { getBaseTheme, getIsDarkMode } from "@theme/utils";
import { ThemeContext } from "@context/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return {
      updateTheme: () => undefined,
      theme: getBaseTheme(defaultTheme, getIsDarkMode() ? "dark" : "light"),
    };
  }

  return context;
};
