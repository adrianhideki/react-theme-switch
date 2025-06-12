import {
  colorScaleStringValuesTokens,
  colorScaleValuesTokens,
} from "@token/colors/types";
import { fontFamilyTokens } from "@token/fonts/family/types";
import { fontHeightTokens } from "@token/fonts/height/types";
import { fontParagraphSpacingTokens } from "@token/fonts/paragraph-spacing/types";
import { fontSizeTokens } from "@token/fonts/size/types";
import { fontSpacingTokens } from "@token/fonts/spacing/types";
import { fontWeightTokens } from "@token/fonts/weight/types";
import { dimensionValuesTokens } from "@token/sizes/dimensions/types";
import {
  colorValuesTokens,
  fontValuesTokens,
  themePaletteBorderTokens,
  themePaletteIconTokens,
  themePaletteSurfaceTokens,
  themePaletteTextTokens,
} from "@token/theme/types";
import z from "zod";
// --- Helper Enums and Schemas based on Theme types ---

// ColorValues and FoundationValues
const foundationValues = ["foundation.white", "foundation.black"] as const;

// ThemeColorValue
const themeColorValueSchema = z.object({
  color: z.enum([...colorValuesTokens, ...foundationValues]),
  scale: z
    .enum(
      colorScaleValuesTokens.map((item) => String(item)) as [
        string,
        ...string[],
      ]
    )
    .optional(),
});

// Palette schemas
const themePaletteSurfaceSchema = z.object(
  Object.fromEntries(
    themePaletteSurfaceTokens.map((token) => [token, themeColorValueSchema])
  )
);

const themePaletteTextSchema = z.object(
  Object.fromEntries(
    themePaletteTextTokens.map((token) => [token, themeColorValueSchema])
  )
);

const themePaletteIconSchema = z.object(
  Object.fromEntries(
    themePaletteIconTokens.map((token) => [token, themeColorValueSchema])
  )
);

const themePaletteBorderSchema = z.object(
  Object.fromEntries(
    themePaletteBorderTokens.map((token) => [token, themeColorValueSchema])
  )
);

const themePaletteSchema = z.object({
  surface: themePaletteSurfaceSchema,
  text: themePaletteTextSchema,
  icon: themePaletteIconSchema,
  border: themePaletteBorderSchema,
});

// ThemeColor<string>
const themeColorSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
  success: z.string(),
  error: z.string(),
  information: z.string(),
  warning: z.string(),
  "neutral-light": z.string(),
  "neutral-dark": z.string(),
});

// ThemeFont
const themeFontSchema = z.object({
  family: z.record(z.enum(fontValuesTokens), z.string()),
  spacing: z.record(z.enum(fontValuesTokens), z.string()),
  size: z.record(z.enum(fontValuesTokens), z.string()),
  height: z.record(z.enum(fontValuesTokens), z.string()),
  weight: z.record(z.enum(fontValuesTokens), z.string()),
  paragraphSpacing: z.record(z.enum(fontValuesTokens), z.string()),
});

// ThemeSize
const themeSizeSchema = z.object({
  border: z.object({
    width: z.record(z.string(), z.string()),
    radius: z.record(z.string(), z.string()),
  }),
  spacing: z.record(z.string(), z.string()),
});

const colorScaleEnum = z.enum(colorScaleStringValuesTokens);

// BaseThemeConfig
const baseThemeConfigSchema = z.object({
  font: z.object({
    family: z.record(z.enum(fontFamilyTokens), z.string()),
    spacing: z.record(z.enum(fontSpacingTokens), z.number()),
    paragraphSpacing: z.record(z.enum(fontParagraphSpacingTokens), z.number()),
    size: z.record(z.enum(fontSizeTokens), z.number()),
    weight: z.record(z.enum(fontWeightTokens), z.number()),
    height: z.record(z.enum(fontHeightTokens), z.number()),
  }),
  color: z.object({
    collection: z
      .record(z.string(), z.record(colorScaleEnum, z.string()))
      .refine((obj): obj is Record<string, Record<string, string>> =>
        colorScaleEnum.options.every((key) => obj[key] != null)
      ),
    foundations: z.object({
      white: z.string().optional(),
      black: z.string().optional(),
    }),
  }),
  size: z.object({
    dimension: z.record(
      z.enum(dimensionValuesTokens.map(String) as [string, ...string[]]),
      z.number()
    ),
  }),
});

// --- Main Theme Schema ---
export const schema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  base: baseThemeConfigSchema,
  color: themeColorSchema,
  font: themeFontSchema,
  size: themeSizeSchema,
  palette: z.object({
    light: themePaletteSchema,
    dark: themePaletteSchema,
  }),
});

export default schema;
