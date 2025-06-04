import { useContext } from "react";
import { ModeContext, type ModeContextValues } from "../context/ModeContext";

export const useMode = (): ModeContextValues => {
  const context = useContext(ModeContext);

  if (!context) {
    return { mode: "light", toggle: () => {} };
  }

  return context;
};
