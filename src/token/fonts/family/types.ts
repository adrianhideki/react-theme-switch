export const fontFamilyTokens = ["headline", "content"] as const;

export type FontFamily = (typeof fontFamilyTokens)[number];
