export type Theme = {
  colors: Record<ColorVariant, ColorValue>;
  fonts: Record<FontVariant, FontValue>;
  spacing: number;
  radius: number;
  name?: string;
};

export type FontVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle"
  | "subtitle-secondary"
  | "body"
  | "body-secondary"
  | "button"
  | "caption";

export type ColorVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "background"
  | "paper"
  | "text"
  | "border";

export type ThemeMode = "light" | "dark";

export type FontValue = {
  size: string;
  family: string;
  weight: string;
};

export type ColorValue = {
  main: ColorModeValue;
  contrast: ColorModeValue;
};

export type ColorModeValue = {
  light: string;
  dark: string;
};
