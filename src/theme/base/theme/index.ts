import type { ColorScaleValues } from "../colors";
import type {
  FontFamily,
  FontLetterSpacing,
  FontParagraphSpacing,
  FontSize,
  FontWeight,
} from "../fonts";
import type { FontHeight } from "../fonts/height/types";
import type {
  BorderRadiusValues,
  BorderWidthValues,
  DimensionValues,
  SpacingValues,
} from "../sizes";

export type ColorValues =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "information"
  | "error"
  | "warning";

export type FoundationValues =
  | "white"
  | "black"
  | "accent"
  | "success"
  | "error"
  | "warning";

export type FontValues =
  | "label"
  | "label.long"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "hyperlink"
  | "hyperlink.hover"
  | "caption"
  | "body"
  | "body.short"
  | "body.long";

export type Theme = {
  /**
   * Base values to use on theme customization
   */
  base: {
    font?: {
      family?: Record<FontFamily, string>;
      letterSpacing?: Record<FontLetterSpacing, number>;
      paragraphSpacing?: Record<FontParagraphSpacing, number>;
      size?: Record<FontParagraphSpacing, number>;
      weight?: Record<FontWeight, number>;
      height?: Record<FontHeight, number>;
    };
    color?: {
      collection?: Record<string, Record<ColorScaleValues, string>>;
      foundations?: {
        white?: string;
        black?: string;
      };
    };
    size?: {
      dimension?: Record<DimensionValues, number>;
    };
  };
  color: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    error: string;
    warning: string;
    neutral: { light: string; dark: string };
  };
  font: {
    family: Record<FontValues, FontFamily>;
    spacing: Record<FontValues, FontLetterSpacing>;
    size: Record<FontValues, FontSize>;
    height: Record<FontValues, FontHeight>;
  };
  size: {
    border?: {
      width?: Record<BorderWidthValues, DimensionValues>;
      radius?: Record<BorderRadiusValues, DimensionValues>;
    };
    spacing?: Record<SpacingValues, DimensionValues>;
  };
};
