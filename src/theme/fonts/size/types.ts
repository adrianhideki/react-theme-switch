export const fontSizeThemes = [
  "4xl",
  "3xl",
  "2xl",
  "xl",
  "lg",
  "md",
  "base",
  "sm",
  "xs",
] as const;

export type FontSize = (typeof fontSizeThemes)[number];
