import type { PartialTheme, ResultTheme } from "@theme/theme";
import { createContext } from "react";

export type ThemeContextValues = {
  theme: ResultTheme;
  referenceTheme: PartialTheme;
  updateTheme: (value: PartialTheme) => void;
};

export const ThemeContext = createContext<ThemeContextValues | null>(null);
