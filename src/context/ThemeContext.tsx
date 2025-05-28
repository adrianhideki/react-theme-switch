import { createContext, useCallback, useEffect, useState } from "react";
import type {
  ColorVariant,
  FontValue,
  FontVariant,
  Theme,
} from "../theme/types";
import { defaultTheme } from "../theme";

const ThemeContext = createContext({} as ThemeContextValues);

type ThemeContextValues = {
  getFontStyle: (variant: FontVariant) => FontValue;
  getColor: (variant: ColorVariant) => { main: string; contrast: string };
  toggleMode: () => void;
  updateTheme: (theme: Partial<Theme>) => void;
  getSpacing: (size: number) => number;
  getRadius: () => number;
  mode: "dark" | "light";
};

type ThemeProviderProps = {
  theme?: Theme;
  mode?: "light" | "dark";
  children: React.ReactNode;
};

const getIsDarkMode = () => {
  const mode = localStorage.getItem("mode");

  if (!!mode) {
    return mode === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const ThemeProvider = ({
  children,
  theme: initialTheme,
}: ThemeProviderProps) => {
  const [mode, setMode] = useState<"light" | "dark">(
    getIsDarkMode() ? "dark" : "light"
  );
  const [theme, setTheme] = useState<Theme>(initialTheme ?? defaultTheme);

  useEffect(() => {
    localStorage.setItem("mode", mode);

    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;

    (Object.keys(theme.colors) as ColorVariant[]).forEach((item) => {
      root.style.setProperty(
        `--theme-color-${item}`,
        theme.colors[item].main[mode]
      );
      root.style.setProperty(
        `--theme-color-${item}-contrast`,
        theme.colors[item].contrast[mode]
      );
    });
  }, [mode, theme]);

  useEffect(() => {
    const root = document.documentElement;

    (Object.keys(theme.fonts) as FontVariant[]).forEach((item) => {
      if (!theme.fonts[item]) {
        return;
      }

      root.style.setProperty(
        `--theme-font-family-${item}`,
        theme.fonts[item].family
      );
      root.style.setProperty(
        `--theme-font-size-${item}`,
        theme.fonts[item].size
      );
      root.style.setProperty(
        `--theme-font-weight-${item}`,
        String(theme.fonts[item].weight)
      );
    });
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--theme-radius", `${theme.radius}px`);
    root.style.setProperty("--theme-spacing", `${theme.spacing}px`);
  }, [theme]);

  const getFontStyle = useCallback(
    (variant: FontVariant) => {
      const value = theme.fonts[variant];

      return value;
    },
    [theme]
  );

  const getColor = useCallback(
    (variant: ColorVariant) => {
      const value = theme.colors[variant];

      return {
        main: value.main[mode],
        contrast: value.contrast[mode],
      };
    },
    [theme, mode]
  );

  const updateTheme = useCallback(
    (theme: Partial<Theme>) => {
      setTheme((prev) => ({
        ...prev,
        colors: {
          ...prev.colors,
          ...theme?.colors,
        },
        fonts: {
          ...prev.fonts,
          ...theme?.fonts,
        },
      }));
    },
    [theme]
  );

  const toggleMode = useCallback(() => {
    setMode((mode) => (mode === "dark" ? "light" : "dark"));
  }, [mode]);

  const getSpacing = useCallback(
    (size: number) => theme.spacing * size,
    [theme.spacing]
  );

  const getRadius = useCallback(() => theme.radius, [theme.radius]);

  return (
    <ThemeContext.Provider
      value={{
        getFontStyle,
        getColor,
        toggleMode,
        updateTheme,
        getSpacing,
        getRadius,
        mode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
export default ThemeProvider;
