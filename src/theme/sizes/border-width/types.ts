export const borderWidthValuesThemes = ["xs", "sm", "md"] as const;

export type BorderWidthValues = (typeof borderWidthValuesThemes)[number];
