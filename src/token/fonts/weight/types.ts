export const fontWeightTokens = [
  "regular",
  "medium",
  "semiBold",
  "bold",
] as const;

export type FontWeight = (typeof fontWeightTokens)[number];
