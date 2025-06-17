import {
  colorScaleStringValuesThemes,
  colorScaleValuesThemes,
} from "@theme/colors/types";
import { fontFamilyThemes } from "@theme/fonts/family/types";
import { fontHeightThemes } from "@theme/fonts/height/types";
import { fontParagraphSpacingThemes } from "@theme/fonts/paragraph-spacing/types";
import { fontSizeThemes } from "@theme/fonts/size/types";
import { fontSpacingThemes } from "@theme/fonts/spacing/types";
import { fontWeightThemes } from "@theme/fonts/weight/types";
import { borderRadiusValuesThemes } from "@theme/sizes/border-radius/types";
import { borderWidthValuesThemes } from "@theme/sizes/border-width/types";
import { dimensionValuesThemes } from "@theme/sizes/dimensions/types";
import { spacingValuesThemes } from "@theme/sizes/spacing/types";
import {
  colorValuesThemes,
  fontValuesThemes,
  themePaletteBorderThemes,
  themePaletteIconThemes,
  themePaletteSurfaceThemes,
  themePaletteTextThemes,
} from "@theme/theme/types";
import z from "zod";

const foundationValues = ["foundation.white", "foundation.black"] as const;

// ThemeColorValue
const themeColorValueSchema = z
  .object({
    color: z
      .enum([...colorValuesThemes, ...foundationValues])
      .refine((item) => String(item) !== "", {
        message: "You need to configure a color",
      }),
    scale: z
      .number()
      .optional()
      .refine(
        (item) => !item || colorScaleValuesThemes.some((v) => v === item)
      ),
  })
  .refine((item) => item?.color?.startsWith("foundation") || item?.scale, {
    message: "Configure a scale when choose a color",
  });

// Palette schemas
const themePaletteSurfaceSchema = z.object(
  Object.fromEntries(
    themePaletteSurfaceThemes.map((theme) => [theme, themeColorValueSchema])
  )
);

const themePaletteTextSchema = z.object(
  Object.fromEntries(
    themePaletteTextThemes.map((theme) => [theme, themeColorValueSchema])
  )
);

const themePaletteIconSchema = z.object(
  Object.fromEntries(
    themePaletteIconThemes.map((theme) => [theme, themeColorValueSchema])
  )
);

const themePaletteBorderSchema = z.object(
  Object.fromEntries(
    themePaletteBorderThemes.map((theme) => [theme, themeColorValueSchema])
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
    .record(z.enum(fontValuesThemes), z.string().min(1))
    .refine((item) => Object.keys(item).length === fontValuesThemes.length, {
      message: "Configure all properties",
    }),
  spacing: z
    .record(z.enum(fontValuesThemes), z.string().min(1))
    .refine((item) => Object.keys(item).length === fontValuesThemes.length, {
      message: "Configure all properties",
    }),
  size: z
    .record(z.enum(fontValuesThemes), z.string().min(1))
    .refine((item) => Object.keys(item).length === fontValuesThemes.length, {
      message: "Configure all properties",
    }),
  height: z
    .record(z.enum(fontValuesThemes), z.string().min(1))
    .refine((item) => Object.keys(item).length === fontValuesThemes.length, {
      message: "Configure all properties",
    }),
  weight: z
    .record(z.enum(fontValuesThemes), z.string().min(1))
    .refine((item) => Object.keys(item).length === fontValuesThemes.length, {
      message: "Configure all properties",
    }),
  paragraphSpacing: z
    .record(z.enum(fontValuesThemes), z.string().min(1))
    .refine((item) => Object.keys(item).length === fontValuesThemes.length, {
      message: "Configure all properties",
    }),
});

// ThemeSize
const themeSizeSchema = z.object({
  border: z.object({
    width: z
      .record(z.string(), z.number())
      .refine(
        (item) => Object.keys(item).length === borderWidthValuesThemes.length,
        {
          message: "Configure all properties",
        }
      ),
    radius: z
      .record(z.string(), z.number())
      .refine(
        (item) => Object.keys(item).length === borderRadiusValuesThemes.length,
        {
          message: "Configure all properties",
        }
      ),
  }),
  spacing: z
    .record(z.string(), z.number())
    .refine((item) => Object.keys(item).length === spacingValuesThemes.length, {
      message: "Configure all properties",
    }),
});

const colorScaleEnum = z.enum(colorScaleStringValuesThemes);

// BaseThemeConfig
export const baseThemeConfigSchema = z.object({
  font: z.object({
    family: z
      .record(z.enum(fontFamilyThemes), z.string().nonempty())
      .refine((obj) => Object.keys(obj).length === fontFamilyThemes.length, {
        message: "Configure all font family properties",
      }),
    spacing: z
      .record(z.enum(fontSpacingThemes), z.number().min(0))
      .refine((obj) => Object.keys(obj).length === fontSpacingThemes.length, {
        message: "Configure all font spacing properties",
      }),
    paragraphSpacing: z
      .record(z.enum(fontParagraphSpacingThemes), z.number().min(0))
      .refine(
        (obj) => Object.keys(obj).length === fontParagraphSpacingThemes.length,
        {
          message: "Configure all font paragraph properties",
        }
      ),
    size: z
      .record(z.enum(fontSizeThemes), z.number().min(0))
      .refine((obj) => Object.keys(obj).length === fontSizeThemes.length, {
        message: "Configure all font size properties",
      }),
    weight: z
      .record(z.enum(fontWeightThemes), z.number().min(0))
      .refine((obj) => Object.keys(obj).length === fontWeightThemes.length, {
        message: "Configure all font weight properties",
      }),
    height: z
      .record(z.enum(fontHeightThemes), z.number().min(0))
      .refine((obj) => Object.keys(obj).length === fontHeightThemes.length, {
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
        z.enum(dimensionValuesThemes.map(String) as [string, ...string[]]),
        z.number().min(0)
      )
      .refine(
        (obj) => Object.keys(obj).length === dimensionValuesThemes.length,
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
