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
import { borderRadiusValuesTokens } from "@token/sizes/border-radius/types";
import { borderWidthValuesTokens } from "@token/sizes/border-width/types";
import { dimensionValuesTokens } from "@token/sizes/dimensions/types";
import { spacingValuesTokens } from "@token/sizes/spacing/types";
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
const themeColorValueSchema = z
  .object({
    color: z
      .enum([...colorValuesTokens, ...foundationValues])
      .refine((item) => String(item) !== "", {
        message: "You need to configure a color",
      }),
    scale: z
      .enum(["", ...colorScaleValuesTokens.map((item) => String(item))])
      .optional(),
  })
  .refine((item) => item?.color?.startsWith("foundation") || item?.scale, {
    message: "Configure a scale when choose a color",
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
const themeColorSchema = z
  .object({
    primary: z.string().nonempty(),
    secondary: z.string().nonempty(),
    accent: z.string().nonempty(),
    success: z.string().nonempty(),
    error: z.string().nonempty(),
    information: z.string().nonempty(),
    warning: z.string().nonempty(),
    "neutral-light": z.string().nonempty(),
    "neutral-dark": z.string().nonempty(),
  })
  .refine((item) => Object.keys(item).length === 9, {
    message: "Configure all properties",
  });

// ThemeFont
const themeFontSchema = z.object({
  family: z
    .record(z.enum(fontValuesTokens), z.string().min(1))
    .refine((item) => Object.keys(item).length === fontValuesTokens.length, {
      message: "Configure all properties",
    }),
  spacing: z
    .record(z.enum(fontValuesTokens), z.string().min(1))
    .refine((item) => Object.keys(item).length === fontValuesTokens.length, {
      message: "Configure all properties",
    }),
  size: z
    .record(z.enum(fontValuesTokens), z.string().min(1))
    .refine((item) => Object.keys(item).length === fontValuesTokens.length, {
      message: "Configure all properties",
    }),
  height: z
    .record(z.enum(fontValuesTokens), z.string().min(1))
    .refine((item) => Object.keys(item).length === fontValuesTokens.length, {
      message: "Configure all properties",
    }),
  weight: z
    .record(z.enum(fontValuesTokens), z.string().min(1))
    .refine((item) => Object.keys(item).length === fontValuesTokens.length, {
      message: "Configure all properties",
    }),
  paragraphSpacing: z
    .record(z.enum(fontValuesTokens), z.string().min(1))
    .refine((item) => Object.keys(item).length === fontValuesTokens.length, {
      message: "Configure all properties",
    }),
});

// ThemeSize
const themeSizeSchema = z.object({
  border: z.object({
    width: z
      .record(z.string(), z.string().nonempty())
      .refine(
        (item) => Object.keys(item).length === borderWidthValuesTokens.length,
        {
          message: "Configure all properties",
        }
      ),
    radius: z
      .record(z.string(), z.string().nonempty())
      .refine(
        (item) => Object.keys(item).length === borderRadiusValuesTokens.length,
        {
          message: "Configure all properties",
        }
      ),
  }),
  spacing: z
    .record(z.string(), z.string().nonempty())
    .refine((item) => Object.keys(item).length === spacingValuesTokens.length, {
      message: "Configure all properties",
    }),
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
  name: z.string().min(3),
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
