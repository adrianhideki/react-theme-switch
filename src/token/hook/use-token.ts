import { useContext } from "react";
import {
  TokenContext,
  type TokenContextValues,
} from "../context/token-context";
import { transformTheme } from "../theme/transformTheme";
import { defaultTheme } from "../theme/defaultTheme";

export const useToken = () => {
  const context = useContext(TokenContext);

  if (!context) {
    return {
      theme: transformTheme(defaultTheme),
      referenceTheme: defaultTheme,
      updateTheme: () => {},
    } as TokenContextValues;
  }

  return context;
};
