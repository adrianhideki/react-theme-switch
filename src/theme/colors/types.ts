export const colorScaleValuesThemes = [
  100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
] as const;

export const colorScaleStringValuesThemes = [
  "100",
  "150",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "1000",
  "1100",
  "1200",
] as const;

export type ColorScaleValues = (typeof colorScaleValuesThemes)[number];

export type ColorScaleStringValues =
  (typeof colorScaleStringValuesThemes)[number];
