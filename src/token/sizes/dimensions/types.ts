export const dimensionValuesTokens = [
  0, 25, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
  1300, 1400, 1500, 1600, 1700, 1800, 1900,
] as const;

export type DimensionValues = (typeof dimensionValuesTokens)[number];
