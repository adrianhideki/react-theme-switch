import type { Theme } from "@theme/types";
import { createContext } from "react";

type ThemeCollectionContextValues = {
  themes: Array<Theme>;
  addTheme: (theme: Theme) => void;
  updateTheme: (theme: Theme) => void;
  updateCurrentTheme: (id: string) => void;
  deleteTheme: (id: string) => void;
  currentTheme: string;
};

export const ThemeCollectionContext =
  createContext<ThemeCollectionContextValues | null>(null);
