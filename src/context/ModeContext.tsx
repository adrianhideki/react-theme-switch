import type { ThemeMode } from "@theme/types";
import { createContext } from "react";

export type ModeContextValues = {
  mode: ThemeMode;
  toggle: () => void;
};

export const ModeContext = createContext<ModeContextValues | null>(null);
