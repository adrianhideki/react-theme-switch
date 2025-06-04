import { useCallback, useEffect, useMemo, useState } from "react";
import { useMode } from "@hooks/useMode";
import { ThemeContext } from "@context/ThemeContext";
import { getBaseTheme, injectCssColors, injectCssFonts } from "@theme/utils";
import type { BaseTheme, Theme } from "../theme/types";
import { defaultTheme } from "../theme";

type ThemeProviderProps = {
  theme?: Theme;
  children: React.ReactNode;
};

const ThemeProvider = ({
  children,
  theme: initialTheme,
}: ThemeProviderProps) => {
  const { mode } = useMode();
  const [theme, setTheme] = useState<Theme>({
    ...defaultTheme,
    ...initialTheme,
  });

  const baseTheme: BaseTheme<string> = useMemo(
    () => getBaseTheme(theme, mode),
    [theme, mode]
  );

  useEffect(() => {
    injectCssColors(theme, mode);
  }, [mode, theme]);

  useEffect(() => {
    injectCssFonts(theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--theme-radius", `${theme.radius}px`);
    root.style.setProperty("--theme-spacing", `${theme.spacing}px`);
  }, [theme]);

  const updateTheme = useCallback((theme: Partial<Theme>) => {
    setTheme((prev) => ({
      ...prev,
      ...theme,
      colors: {
        ...prev.colors,
        ...theme?.colors,
      },
      fonts: {
        ...prev.fonts,
        ...theme?.fonts,
      },
    }));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        updateTheme,
        theme: baseTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
