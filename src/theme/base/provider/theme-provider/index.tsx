import { ThemeContext } from "@theme/base/context/theme-context";
import type { PartialTheme, Theme } from "@theme/base/theme";
import { defaultTheme } from "@theme/base/theme/defaultTheme";
import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { deepMerge } from "./utils";

type ThemeProviderProps = {
  theme: PartialTheme;
};

const ThemeProvider = ({
  children,
  theme: inputTheme,
}: PropsWithChildren<ThemeProviderProps>) => {
  const [theme, setTheme] = useState<Theme>(
    deepMerge<Theme>(inputTheme, defaultTheme)
  );

  const handleUpdateTheme = useCallback((value: PartialTheme) => {
    setTheme((prev) => deepMerge<Theme>(value, prev));
  }, []);

  useEffect(() => {}, [inputTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        updateTheme: handleUpdateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
