import { createContext } from "react";

export type ModeContextValues = {
  mode: "light" | "dark";
  toggle: () => void;
};

export const ModeContext = createContext<ModeContextValues | null>(null);
