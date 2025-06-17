export const fontWeightThemes = [
  "regular",
  "medium",
  "semiBold",
  "bold",
] as const;

export type FontWeight = (typeof fontWeightThemes)[number];
