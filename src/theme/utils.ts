import type {
  BaseTheme,
  ColorValue,
  ColorVariant,
  FontVariant,
  Theme,
  ThemeMode,
} from "./types";

export const getBaseTheme = (
  theme: Theme,
  mode: ThemeMode
): BaseTheme<string> => {
  const themeColors = Object.keys(theme.colors).reduce(
    (prev, key) => ({
      ...prev,
      [key]: {
        main: theme.colors[key].main[mode],
        contrast: theme.colors[key].contrast[mode],
      },
    }),
    {} as Record<ColorVariant, ColorValue<string>>
  );

  return {
    ...theme,
    colors: {
      ...themeColors,
    },
  };
};

export const injectCssColors = (theme: Theme, mode: ThemeMode) => {
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
};

export const injectCssFonts = (theme: Theme) => {
  const root = document.documentElement;

  (Object.keys(theme.fonts) as FontVariant[]).forEach((item) => {
    if (!theme.fonts[item]) {
      return;
    }

    root.style.setProperty(
      `--theme-font-family-${item}`,
      theme.fonts[item].family
    );
    root.style.setProperty(`--theme-font-size-${item}`, theme.fonts[item].size);
    root.style.setProperty(
      `--theme-font-weight-${item}`,
      String(theme.fonts[item].weight)
    );
  });
};

export const getIsDarkMode = () => {
  const mode = localStorage.getItem("mode");

  if (mode) {
    return mode === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
