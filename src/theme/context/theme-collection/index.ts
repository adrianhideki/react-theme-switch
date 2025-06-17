import type { Theme } from "@theme/theme";
import { createContext } from "react";

export type ThemeCollectionContextValues = {
  themes: Array<Theme>;
  addTheme: (theme: Theme) => void;
  updateTheme: (theme: Theme) => void;
  updateCurrentTheme: (id: string) => void;
  deleteTheme: (id: string) => void;
  currentTheme: string;
};

export const ThemeCollectionContext =
  createContext<ThemeCollectionContextValues | null>(null);
