import { useContext } from "react";
import {
  ThemeContext,
  type TokenContextValues,
} from "../context/token-context";
import { transformTheme } from "../theme/transformTheme";
import { defaultTheme } from "../theme/defaultTheme";

export const useToken = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return {
      theme: transformTheme(defaultTheme),
      updateTheme: () => {},
    } as TokenContextValues;
  }

  return context;
};
