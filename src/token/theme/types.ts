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

export type DashToObj<
  T,
  K extends string = ThemePaletteBorderTokens,
> = K extends `${infer Outer}-${infer Rest}`
  ? { [O in Outer]: DashToObj<T, Rest> }
  : { [O in K]: T };

export const colorValuesTokens = [
  "primary",
  "secondary",
  "accent",
  "success",
  "information",
  "error",
  "warning",
  "neutral-dark",
  "neutral-light",
] as const;

export type ColorValues = (typeof colorValuesTokens)[number];

export type FoundationValues = "foundation.white" | "foundation.black";

export const fontValuesTokens = [
  "label",
  "labelLong",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hyperlink",
  "hyperlinkHover",
  "caption",
  "body",
  "bodyShort",
  "bodyLong",
] as const;

export type FontValues = (typeof fontValuesTokens)[number];

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

export const themePaletteSurfaceTokens = [
  "primary-default",
  "primary-defaultHover",
  "primary-defaultSubtle",
  "primary-defaultSubtleHover",
  "primary-defaultSubtleHoverAlt",
  "secondary-default",
  "secondary-defaultHover",
  "secondary-defaultSubtle",
  "secondary-defaultSubtleHover",
  "disabled-default",
  "error-default",
  "error-defaultHover",
  "error-defaultSubtle",
  "error-defaultSubtleHover",
  "success-default",
  "success-defaultHover",
  "success-defaultSubtle",
  "success-defaultSubtleHover",
  "information-default",
  "information-defaultHover",
  "information-defaultSubtle",
  "information-defaultSubtleHover",
  "warning-default",
  "warning-defaultHover",
  "warning-defaultSubtle",
  "warning-defaultSubtleHover",
  "default",
  "page",
  "pageAlternative",
  "alternative",
] as const;

export type ThemePaletteSurfaceTokens =
  (typeof themePaletteSurfaceTokens)[number];

export type ThemePaletteSurface<Value> = Record<
  ThemePaletteSurfaceTokens,
  Value
>;

export const themePaletteTextTokens = [
  "primary-onColor",
  "primary-onColorHover",
  "primary-onColorSubtle",
  "primary-onColorSubtleHover",
  "primary-default",
  "primary-defaultHover",
  "secondary-onColor",
  "secondary-onColorHover",
  "secondary-onColorSubtle",
  "secondary-onColorSubtleHover",
  "secondary-default",
  "secondary-defaultHover",
  "disabled-default",
  "disabled-onColor",
  "error-onColor",
  "error-onColorHover",
  "error-onColorSubtle",
  "error-onColorSubtleHover",
  "error-default",
  "error-defaultHover",
  "success-onColor",
  "success-onColorHover",
  "success-onColorSubtle",
  "success-onColorSubtleHover",
  "success-default",
  "success-defaultHover",
  "information-onColor",
  "information-onColorHover",
  "information-onColorSubtle",
  "information-onColorSubtleHover",
  "information-default",
  "information-defaultHover",
  "warning-onColor",
  "warning-onColorHover",
  "warning-onColorSubtle",
  "warning-onColorSubtleHover",
  "warning-default",
  "warning-defaultHover",
  "default-body",
  "default-hero",
  "default-heading",
  "default-caption",
  "default-placeholder",
  "onColor-hero",
  "onColor-heading",
  "onColor-body",
  "onColor-caption",
  "onColor-placeholder",
  "accent-onColor",
  "accent-onColorHover",
  "accent-onColorSubtle",
  "accent-onColorSubtleHover",
  "accent-default",
  "accent-defaultHover",
] as const;

export type ThemePaletteTextTokens = (typeof themePaletteTextTokens)[number];

export type ThemePaletteText<Value> = Record<ThemePaletteTextTokens, Value>;

export const themePaletteIconTokens = [
  "primary-onColor",
  "primary-onColorHover",
  "primary-onColorSubtle",
  "primary-onColorSubtleHover",
  "primary-default",
  "primary-defaultHover",
  "primary-defaultSubtle",
  "primary-defaultSubtleHover",
  "secondary-onColor",
  "secondary-onColorHover",
  "secondary-onColorSubtle",
  "secondary-onColorSubtleHover",
  "secondary-default",
  "secondary-defaultHover",
  "disabled-default",
  "disabled-onColor",
  "error-onColor",
  "error-onColorHover",
  "error-onColorSubtle",
  "error-onColorSubtleHover",
  "error-default",
  "error-defaultHover",

  "success-onColor",
  "success-onColorHover",
  "success-onColorSubtle",
  "success-onColorSubtleHover",
  "success-default",
  "success-defaultHover",

  "information-onColor",
  "information-onColorHover",
  "information-onColorSubtle",
  "information-onColorSubtleHover",
  "information-default",
  "information-defaultHover",

  "warning-onColor",
  "warning-onColorHover",
  "warning-onColorSubtle",
  "warning-onColorSubtleHover",
  "warning-default",
  "warning-defaultHover",
] as const;

export type ThemePaletteIconTokens = (typeof themePaletteIconTokens)[number];

export type ThemePaletteIcon<Value> = Record<ThemePaletteIconTokens, Value>;

export const themePaletteBorderTokens = [
  "primary-default",
  "primary-defaultHover",
  "primary-defaultSubtle",
  "primary-defaultSubtleHover",
  "primary-focus",
  "error-default",
  "error-defaultHover",
  "error-defaultSubtle",
  "error-defaultSubtleHover",
  "error-focus",
  "success-default",
  "success-defaultHover",
  "success-defaultSubtle",
  "success-defaultSubtleHover",
  "success-focus",
  "warning-default",
  "warning-defaultHover",
  "warning-defaultSubtle",
  "warning-defaultSubtleHover",
  "warning-focus",
  "information-default",
  "information-defaultHover",
  "information-defaultSubtle",
  "information-defaultSubtleHover",
  "information-focus",
  "secondary-default",
  "secondary-defaultHover",
  "secondary-defaultSubtle",
  "secondary-defaultSubtleHover",
  "secondary-focus",
  "disabled",
  "disabled-onColor",
  "default",
  "default-onColor",
] as const;

export type ThemePaletteBorderTokens =
  (typeof themePaletteBorderTokens)[number];

export type ThemePaletteBorder<Value> = Record<ThemePaletteBorderTokens, Value>;

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
