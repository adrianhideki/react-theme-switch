import { useContext } from "react";
import { ThemeCollectionContext } from "../context/theme-collection";

export const useThemeCollection = () => {
  const context = useContext(ThemeCollectionContext);

  if (!context) {
    throw "Invalid context";
  }

  return context;
};
