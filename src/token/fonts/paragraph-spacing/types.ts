export const fontParagraphSpacingTokens = ["base"] as const;

export type FontParagraphSpacing = (typeof fontParagraphSpacingTokens)[number];
