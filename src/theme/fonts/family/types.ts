export const fontFamilyThemes = ["headline", "content"] as const;

export type FontFamily = (typeof fontFamilyThemes)[number];
