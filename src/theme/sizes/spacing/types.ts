export const spacingValuesThemes = [
  "4xs",
  "3xs",
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
] as const;

export type SpacingValues = (typeof spacingValuesThemes)[number];
