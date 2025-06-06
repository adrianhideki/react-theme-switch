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
        main: theme.colors[key as ColorVariant].main[mode],
        contrast: theme.colors[key as ColorVariant].contrast[mode],
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

export const injectCssColors = (theme: BaseTheme<string>) => {
  const root = document.documentElement;

  (Object.keys(theme.colors) as ColorVariant[]).forEach((item) => {
    root.style.setProperty(`--theme-color-${item}`, theme.colors[item].main);
    root.style.setProperty(
      `--theme-color-${item}-contrast`,
      theme.colors[item].contrast
    );
  });
};

export const injectCssFonts = (theme: BaseTheme<string>) => {
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

export const injectCssConfig = (theme: BaseTheme) => {
  const root = document.documentElement;

  root.style.setProperty("--theme-radius", `${theme.radius}px`);
  root.style.setProperty("--theme-spacing", `${theme.spacing}px`);
};

export const getIsDarkMode = () => {
  const mode = localStorage.getItem("mode");

  if (mode) {
    return mode === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};