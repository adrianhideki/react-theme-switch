export const borderWidthValuesTokens = ["xs", "sm", "md"] as const;

export type BorderWidthValues = (typeof borderWidthValuesTokens)[number];
