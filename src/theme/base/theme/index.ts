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
  | "labelLong"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "hyperlink"
  | "hyperlinkHover"
  | "caption"
  | "body"
  | "bodyShort"
  | "bodyLong";

export type ThemeColorValue = {
  color: string;
  scale?: ColorScaleValues;
};

export type BaseThemeConfig = {
  font?: {
    family?: Record<FontFamily, string>;
    letterSpacing?: Record<FontLetterSpacing, number>;
    paragraphSpacing?: Record<FontParagraphSpacing, number>;
    size?: Record<FontParagraphSpacing, number>;
    weight?: Record<FontWeight, number>;
    height?: Record<FontHeight, number>;
  };
  color?: {
    /** Collection of colors to reference in theme */
    collection?: Record<string, Record<ColorScaleValues, string>>;
    /** basic foundations colors */
    foundations?: {
      white?: string;
      black?: string;
    };
  };
  size?: {
    dimension?: Record<DimensionValues, number>;
  };
};

export type ThemePalette = {
  surface: {
    primary: {
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
      defaultSubtleHoverAlt: ThemeColorValue;
    };
    secondary: {
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
    };
    disabled: {
      default: ThemeColorValue;
    };
    error: {
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
    };
    success: {
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
    };
    information: {
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
    };
    warning: {
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
    };
    default: {
      default: ThemeColorValue;
    };
    page: {
      default: ThemeColorValue;
    };
    pageAlternative: {
      default: ThemeColorValue;
    };
    alternative: {
      default: ThemeColorValue;
    };
  };
  text: {
    primary: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
    };
    secondary: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
    };
    disabled: {
      default: ThemeColorValue;
      onColor: ThemeColorValue;
    };
    error: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
    };
    success: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
    };
    information: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
    };
    warning: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
    };
    default: {
      body: ThemeColorValue;
      hero: ThemeColorValue;
      heading: ThemeColorValue;
      caption: ThemeColorValue;
      placeholder: ThemeColorValue;
    };
    onColor: {
      hero: ThemeColorValue;
      heading: ThemeColorValue;
      body: ThemeColorValue;
      caption: ThemeColorValue;
      placeholder: ThemeColorValue;
    };
    accent: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
    };
  };
  icon: {
    primary: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
    };
    secondary: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
    };
    disabled: {
      default: ThemeColorValue;
      onColor: ThemeColorValue;
    };
    error: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
    };
    success: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
    };
    information: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
    };
    warning: {
      onColor: ThemeColorValue;
      onColorHover: ThemeColorValue;
      onColorSubtle: ThemeColorValue;
      onColorSubtleHover: ThemeColorValue;
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
    };
  };
  border: {
    primary: {
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
      focus: ThemeColorValue;
    };
    error: {
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
      focus: ThemeColorValue;
    };
    success: {
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
      focus: ThemeColorValue;
    };
    information: {
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
      focus: ThemeColorValue;
    };
    warning: {
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
      focus: ThemeColorValue;
    };
    secondary: {
      default: ThemeColorValue;
      defaultHover: ThemeColorValue;
      defaultSubtle: ThemeColorValue;
      defaultSubtleHover: ThemeColorValue;
      focus: ThemeColorValue;
    };
    disabled: {
      default: ThemeColorValue;
      onColor: ThemeColorValue;
    };
    default: ThemeColorValue;
    onColor: ThemeColorValue;
  };
};

export type Theme = {
  /**
   * Base values to use on theme customization
   */
  base: BaseThemeConfig;
  color: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    error: string;
    warning: string;
    neutralLight: string;
    neutralDark: string;
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
  palette: { light: ThemePalette; dark: ThemePalette };
};
