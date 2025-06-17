export const borderRadiusValuesThemes = [
  "none",
  "3xs",
  "2xs",
  "xs",
  "sm",
  "lg",
  "md",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "pill",
] as const;

export type BorderRadiusValues = (typeof borderRadiusValuesThemes)[number];
