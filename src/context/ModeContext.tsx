import type { ThemeMode } from "@theme/types";
import { createContext } from "react";

type ModeContextValues = {
  mode: ThemeMode;
  updateMode: (value: ThemeMode) => void;
  toggle: () => void;
};

export const ModeContext = createContext<ModeContextValues | null>(null);
