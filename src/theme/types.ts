export type Theme = {
  name?: string;
  id?: string;
} & BaseTheme<ColorModeValue>;

export type OptionalTheme = {
  colors: Partial<Color<ColorModeValue>>;
  fonts: Partial<Font>;
  spacing: number;
  radius: number;
};

export type BaseTheme<T = ColorModeValue | string> = {
  colors: Color<T>;
  fonts: Font;
  spacing: number;
  radius: number;
};

export type Color<T> = {
  [p in ColorVariant]: ColorValue<T>;
};

export type Font = {
  [p in FontVariant]: FontValue;
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
