import { createContext } from "react";
import type { BaseTheme, Theme } from "../theme/types";

const ThemeContext = createContext<ThemeContextValues | null>(null);

type ThemeContextValues = {
  updateTheme: (theme: Partial<Theme>) => void;
  theme: BaseTheme<string>;
};

export { ThemeContext };
