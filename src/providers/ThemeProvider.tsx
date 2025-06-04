import { useCallback, useMemo, useState } from "react";
import { useMode } from "@hooks/useMode";
import { ThemeContext } from "@context/ThemeContext";
import { getBaseTheme } from "@theme/utils";
import type { BaseTheme, OptionalTheme, Theme } from "../theme/types";
import { defaultTheme } from "../theme";

type ThemeProviderProps = {
  theme?: Partial<OptionalTheme>;
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
    colors: { ...defaultTheme.colors, ...initialTheme?.colors },
    fonts: { ...defaultTheme.fonts, ...initialTheme?.fonts },
  });

  const baseTheme: BaseTheme<string> = useMemo(
    () => getBaseTheme(theme, mode),
    [theme, mode]
  );

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
