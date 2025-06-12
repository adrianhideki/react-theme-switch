import type { ColorScaleValues } from "../colors";

import type {
  FontFamily,
  FontSpacing,
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
  | "warning"
  | "neutral-dark"
  | "neutral-light";

export type FoundationValues = "foundation.white" | "foundation.black";

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
  color: ColorValues | FoundationValues;
  scale?: ColorScaleValues;
};

export type BaseThemeConfig = {
  font?: {
    family?: Record<FontFamily, string>;
    spacing?: Record<FontSpacing, number>;
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

export type ThemePaletteSurface<Value> = {
  primary: {
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
    defaultSubtleHoverAlt: Value;
  };
  secondary: {
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
  };
  disabled: {
    default: Value;
  };
  error: {
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
  };
  success: {
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
  };
  information: {
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
  };
  warning: {
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
  };
  default: {
    default: Value;
  };
  page: {
    default: Value;
  };
  pageAlternative: {
    default: Value;
  };
  alternative: {
    default: Value;
  };
};

export type ThemePaletteText<Value> = {
  primary: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
  };
  secondary: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
  };
  disabled: {
    default: Value;
    onColor: Value;
  };
  error: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
  };
  success: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
  };
  information: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
  };
  warning: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
  };
  default: {
    body: Value;
    hero: Value;
    heading: Value;
    caption: Value;
    placeholder: Value;
  };
  onColor: {
    hero: Value;
    heading: Value;
    body: Value;
    caption: Value;
    placeholder: Value;
  };
  accent: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
  };
};

export type ThemePaletteIcon<Value> = {
  primary: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
  };
  secondary: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
  };
  disabled: {
    default: Value;
    onColor: Value;
  };
  error: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
  };
  success: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
  };
  information: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
  };
  warning: {
    onColor: Value;
    onColorHover: Value;
    onColorSubtle: Value;
    onColorSubtleHover: Value;
    default: Value;
    defaultHover: Value;
  };
};

export type ThemePaletteBorder<Value> = {
  primary: {
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
    focus: Value;
  };
  error: {
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
    focus: Value;
  };
  success: {
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
    focus: Value;
  };
  information: {
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
    focus: Value;
  };
  warning: {
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
    focus: Value;
  };
  secondary: {
    default: Value;
    defaultHover: Value;
    defaultSubtle: Value;
    defaultSubtleHover: Value;
    focus: Value;
  };
  disabled: {
    default: Value;
    onColor: Value;
  };
  default: {
    default: Value;
    onColor: Value;
  };
};

export type ThemePalette<Value> = {
  surface: ThemePaletteSurface<Value>;
  text: ThemePaletteText<Value>;
  icon: ThemePaletteIcon<Value>;
  border: ThemePaletteBorder<Value>;
};

type ThemeFont<Family, Spacing, Size, Height, Weight, Paragraph> = {
  family: Record<FontValues, Family>;
  spacing: Record<FontValues, Spacing>;
  size: Record<FontValues, Size>;
  height: Record<FontValues, Height>;
  weight: Record<FontValues, Weight>;
  paragraphSpacing: Record<FontValues, Paragraph>;
};

type ThemeSize<Value> = {
  border?: {
    width?: Record<BorderWidthValues, Value>;
    radius?: Record<BorderRadiusValues, Value>;
  };
  spacing?: Record<SpacingValues, Value>;
};

type ThemeColor<T> = {
  primary: T;
  secondary: T;
  accent: T;
  success: T;
  error: T;
  information: T;
  warning: T;
  "neutral-light": T;
  "neutral-dark": T;
};

export type Theme = {
  /**
   * Base values to use on theme customization
   */
  id?: string;
  name?: string;
  base: BaseThemeConfig;
  color: ThemeColor<string>;
  font: ThemeFont<
    FontFamily,
    FontSpacing,
    FontSize,
    FontHeight,
    FontWeight,
    FontParagraphSpacing
  >;
  size: ThemeSize<DimensionValues>;
  palette: {
    light: ThemePalette<ThemeColorValue>;
    dark: ThemePalette<ThemeColorValue>;
  };
};

/**
 * Theme with the values translated based on base theme property
 * ```ts
 * base: {
 *   font: {
 *     family: {
 *       heading: 'Inter'
 *     },
 *   }
 * }
 * font: {
 *   family: {
 *     h1: 'heading'
 *   }
 * }
 * // Results
 * theme.font.family.h1 => 'Inter'
 * ```
 */
export type ResultTheme = {
  base: BaseThemeConfig;
  color: ThemeColor<Record<ColorScaleValues, string>>;
  font: ThemeFont<string, number, number, number, number, number>;
  size: ThemeSize<number>;
  palette: { light: ThemePalette<string>; dark: ThemePalette<string> };
};

type NestedOptional<T> = {
  [P in keyof T]?: NestedOptional<T[P]>;
};

export type PartialTheme = NestedOptional<Theme>;
