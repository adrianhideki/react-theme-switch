import type { PartialTheme, ResultTheme } from "@token/theme";
import { createContext } from "react";

export type TokenContextValues = {
  theme: ResultTheme;
  updateTheme: (value: PartialTheme) => void;
};

export const TokenContext = createContext<TokenContextValues | null>(null);
