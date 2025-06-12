import type { PartialTheme, Theme } from "@theme/base/theme";
import { createContext } from "react";

type ThemeContextValues = {
  theme: Theme;
  updateTheme: (value: PartialTheme) => void;
};

export const ThemeContext = createContext<ThemeContextValues | null>(null);
