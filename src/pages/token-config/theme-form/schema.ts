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

export const themePaletteSchema = z.object({
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
  family: z.record(z.enum(fontValuesTokens), z.string().min(1)),
  spacing: z.record(z.enum(fontValuesTokens), z.string().min(1)),
  size: z.record(z.enum(fontValuesTokens), z.string().min(1)),
  height: z.record(z.enum(fontValuesTokens), z.string().min(1)),
  weight: z.record(z.enum(fontValuesTokens), z.string().min(1)),
  paragraphSpacing: z.record(z.enum(fontValuesTokens), z.string().min(1)),
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
export const baseThemeConfigSchema = z.object({
  font: z.object({
    family: z
      .record(z.enum(fontFamilyTokens), z.string().nonempty())
      .refine((obj) => Object.keys(obj).length === fontFamilyTokens.length, {
        message: "Configure all font family properties",
      }),
    spacing: z
      .record(z.enum(fontSpacingTokens), z.number().min(0))
      .refine((obj) => Object.keys(obj).length === fontSpacingTokens.length, {
        message: "Configure all font spacing properties",
      }),
    paragraphSpacing: z
      .record(z.enum(fontParagraphSpacingTokens), z.number().min(0))
      .refine(
        (obj) => Object.keys(obj).length === fontParagraphSpacingTokens.length,
        {
          message: "Configure all font paragraph properties",
        }
      ),
    size: z
      .record(z.enum(fontSizeTokens), z.number().min(0))
      .refine((obj) => Object.keys(obj).length === fontSizeTokens.length, {
        message: "Configure all font size properties",
      }),
    weight: z
      .record(z.enum(fontWeightTokens), z.number().min(0))
      .refine((obj) => Object.keys(obj).length === fontWeightTokens.length, {
        message: "Configure all font weight properties",
      }),
    height: z
      .record(z.enum(fontHeightTokens), z.number().min(0))
      .refine((obj) => Object.keys(obj).length === fontHeightTokens.length, {
        message: "Configure all font height properties",
      }),
  }),
  color: z.object({
    collection: z
      .record(
        z.string(),
        z.record(
          colorScaleEnum,
          z.string().startsWith("#", "Color must be a HEX starting with #.")
        ),
        {
          message: "Configure at least one color!",
        }
      )
      .refine(
        (obj): obj is Record<string, Record<string, string>> => {
          return !Object.keys(obj).find((key) =>
            colorScaleEnum.options.some((scale) => obj[key][scale] == null)
          );
        },
        {
          message: "You must configure all scales for a color!",
        }
      )
      .refine(
        (obj): obj is Record<string, Record<string, string>> => {
          return Object.keys(obj).length > 0;
        },
        {
          message: "You must configure at least one color!",
        }
      ),
    foundations: z.object(
      {
        white: z
          .string()
          .nonempty("Configure a white color!")
          .startsWith("#", "White color must be a HEX starting with #."),
        black: z
          .string()
          .nonempty("Configure a black color!")
          .startsWith("#", "Black color must be a HEX starting with #."),
      },
      {
        message: "Configure all foundation colors properties!",
      }
    ),
  }),
  size: z.object({
    dimension: z
      .record(
        z.enum(dimensionValuesTokens.map(String) as [string, ...string[]]),
        z.number().min(0)
      )
      .refine(
        (obj) => Object.keys(obj).length === dimensionValuesTokens.length,
        {
          message: "Configure all dimension properties",
        }
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
