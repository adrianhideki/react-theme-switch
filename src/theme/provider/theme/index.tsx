import { ThemeContext } from "@theme/context/theme-context";
import type { PartialTheme, Theme } from "@theme/theme";
import { defaultTheme } from "@theme/theme/defaultTheme";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { deepMerge } from "./utils";
import { transformTheme } from "@theme/theme/transformTheme";

type ThemeProviderProps = {
  theme?: PartialTheme;
};

const ThemeProvider = ({
  children,
  theme: inputTheme,
}: PropsWithChildren<ThemeProviderProps>) => {
  const [theme, setTheme] = useState<Theme>(
    deepMerge<Theme>(defaultTheme, inputTheme ?? defaultTheme)
  );

  const handleUpdateTheme = useCallback((value: PartialTheme) => {
    setTheme(value as Theme);
  }, []);

  useEffect(() => {
    if (inputTheme) {
      setTheme(deepMerge<Theme>(defaultTheme, inputTheme));
    }
  }, [inputTheme]);

  const transformedTheme = useMemo(() => transformTheme(theme), [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: transformedTheme,
        referenceTheme: theme,
        updateTheme: handleUpdateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
