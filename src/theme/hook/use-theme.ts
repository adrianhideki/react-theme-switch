import { useContext } from "react";
import {
  ThemeContext,
  type ThemeContextValues,
} from "../context/theme-context";
import { transformTheme } from "../theme/transformTheme";
import { defaultTheme } from "../theme/defaultTheme";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return {
      theme: transformTheme(defaultTheme),
      referenceTheme: defaultTheme,
      updateTheme: () => {},
    } as ThemeContextValues;
  }

  return context;
};
