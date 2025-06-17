export const fontSpacingThemes = ["lg", "md", "xs", "base"] as const;
export type FontSpacing = (typeof fontSpacingThemes)[number];
