export const fontParagraphSpacingThemes = ["base"] as const;

export type FontParagraphSpacing = (typeof fontParagraphSpacingThemes)[number];
