import { useContext } from "react";
import { ThemeCollectionContext } from "@context/ThemeCollectionContext";

export const useThemeCollection = () => {
  const context = useContext(ThemeCollectionContext);

  if (!context) {
    throw "ThemeCollectionContext not defined";
  }

  return context;
};
