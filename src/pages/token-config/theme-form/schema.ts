import z from "zod";

// --- Helper Enums and Schemas based on Theme types ---

// ColorValues and FoundationValues
const colorValues = [
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
const foundationValues = ["foundation.white", "foundation.black"] as const;

// ThemeColorValue
const themeColorValueSchema = z.object({
  color: z.enum([...colorValues, ...foundationValues]),
  scale: z.number().optional(),
});

// ThemePaletteSurface
const themePaletteSurfaceSchema = z.object({
  primary: z.object({
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
    defaultSubtleHoverAlt: themeColorValueSchema,
  }),
  secondary: z.object({
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
  }),
  disabled: z.object({
    default: themeColorValueSchema,
  }),
  error: z.object({
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
  }),
  success: z.object({
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
  }),
  information: z.object({
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
  }),
  warning: z.object({
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
  }),
  default: z.object({
    default: themeColorValueSchema,
  }),
  page: z.object({
    default: themeColorValueSchema,
  }),
  pageAlternative: z.object({
    default: themeColorValueSchema,
  }),
  alternative: z.object({
    default: themeColorValueSchema,
  }),
});

// ThemePaletteText
const themePaletteTextSchema = z.object({
  primary: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
  }),
  secondary: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
  }),
  disabled: z.object({
    default: themeColorValueSchema,
    onColor: themeColorValueSchema,
  }),
  error: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
  }),
  success: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
  }),
  information: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
  }),
  warning: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
  }),
  default: z.object({
    body: themeColorValueSchema,
    hero: themeColorValueSchema,
    heading: themeColorValueSchema,
    caption: themeColorValueSchema,
    placeholder: themeColorValueSchema,
  }),
  onColor: z.object({
    hero: themeColorValueSchema,
    heading: themeColorValueSchema,
    body: themeColorValueSchema,
    caption: themeColorValueSchema,
    placeholder: themeColorValueSchema,
  }),
  accent: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
  }),
});

// ThemePaletteIcon
const themePaletteIconSchema = z.object({
  primary: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
  }),
  secondary: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
  }),
  disabled: z.object({
    default: themeColorValueSchema,
    onColor: themeColorValueSchema,
  }),
  error: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
  }),
  success: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
  }),
  information: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
  }),
  warning: z.object({
    onColor: themeColorValueSchema,
    onColorHover: themeColorValueSchema,
    onColorSubtle: themeColorValueSchema,
    onColorSubtleHover: themeColorValueSchema,
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
  }),
});

// ThemePaletteBorder
const themePaletteBorderSchema = z.object({
  primary: z.object({
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
    focus: themeColorValueSchema,
  }),
  error: z.object({
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
    focus: themeColorValueSchema,
  }),
  success: z.object({
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
    focus: themeColorValueSchema,
  }),
  information: z.object({
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
    focus: themeColorValueSchema,
  }),
  warning: z.object({
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
    focus: themeColorValueSchema,
  }),
  secondary: z.object({
    default: themeColorValueSchema,
    defaultHover: themeColorValueSchema,
    defaultSubtle: themeColorValueSchema,
    defaultSubtleHover: themeColorValueSchema,
    focus: themeColorValueSchema,
  }),
  disabled: z.object({
    default: themeColorValueSchema,
    onColor: themeColorValueSchema,
  }),
  default: z.object({
    default: themeColorValueSchema,
    onColor: themeColorValueSchema,
  }),
});

// ThemePalette
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

// FontValues
const fontValues = [
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

// ThemeFont
const themeFontSchema = z.object({
  family: z.record(z.enum(fontValues), z.string()),
  spacing: z.record(z.enum(fontValues), z.number()),
  size: z.record(z.enum(fontValues), z.number()),
  height: z.record(z.enum(fontValues), z.number()),
  weight: z.record(z.enum(fontValues), z.number()),
  paragraphSpacing: z.record(z.enum(fontValues), z.number()),
});

// ThemeSize
const themeSizeSchema = z.object({
  border: z
    .object({
      width: z.record(z.string(), z.number()).optional(),
      radius: z.record(z.string(), z.number()).optional(),
    })
    .optional(),
  spacing: z.record(z.string(), z.number()).optional(),
});

// BaseThemeConfig
const baseThemeConfigSchema = z.object({
  font: z
    .object({
      family: z.record(z.string()).optional(),
      spacing: z.record(z.number()).optional(),
      paragraphSpacing: z.record(z.number()).optional(),
      size: z.record(z.number()).optional(),
      weight: z.record(z.number()).optional(),
      height: z.record(z.number()).optional(),
    })
    .optional(),
  color: z
    .object({
      collection: z.record(z.record(z.string())).optional(),
      foundations: z
        .object({
          white: z.string().optional(),
          black: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  size: z
    .object({
      dimension: z.record(z.number()).optional(),
    })
    .optional(),
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
