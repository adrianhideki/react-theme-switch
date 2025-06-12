export const fontSpacingTokens = ["lg", "md", "xs", "base"] as const;
export type FontSpacing = (typeof fontSpacingTokens)[number];
