export const fontHeightTokens = [
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

export type FontHeight = (typeof fontHeightTokens)[number];
