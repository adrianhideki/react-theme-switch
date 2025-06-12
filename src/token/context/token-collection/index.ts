import type { Theme } from "@token/theme";
import { createContext } from "react";

type TokenCollectionContextValues = {
  themes: Array<Theme>;
  addTheme: (theme: Theme) => void;
  updateTheme: (theme: Theme) => void;
  updateCurrentTheme: (id: string) => void;
  deleteTheme: (id: string) => void;
  currentTheme: string;
};

export const TokenCollectionContext =
  createContext<TokenCollectionContextValues | null>(null);
