export type Theme = {
  name?: string;
  id?: string;
} & BaseTheme<ColorModeValue>;

export type BaseTheme<T = ColorModeValue | string> = {
  colors: Record<ColorVariant, ColorValue<T>>;
  fonts: Record<FontVariant, FontValue>;
  spacing: number;
  radius: number;
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
  | "caption"
  | string;

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
  | "border"
  | string;

export type ThemeMode = "light" | "dark";

export type FontValue = {
  size: string;
  family: string;
  weight: string | number;
};

export type ColorValue<T> = {
  main: T;
  contrast: T;
};

export type ColorModeValue = {
  light: string;
  dark: string;
};
