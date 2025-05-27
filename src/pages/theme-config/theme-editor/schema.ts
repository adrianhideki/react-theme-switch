import { z } from "zod/v3";

const schema = z.object({
  name: z.string().min(1),
  colors: z.object({
    primary: z.object({
      main: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
      contrast: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
    }),
    secondary: z.object({
      main: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
      contrast: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
    }),
    tertiary: z.object({
      main: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
      contrast: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
    }),
    background: z.object({
      main: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
      contrast: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
    }),
    text: z.object({
      main: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
      contrast: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
    }),
    border: z.object({
      main: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
      contrast: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
    }),
    error: z.object({
      main: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
      contrast: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
    }),
    success: z.object({
      main: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
      contrast: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
    }),
    warning: z.object({
      main: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
      contrast: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
    }),
    info: z.object({
      main: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
      contrast: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
    }),
    paper: z.object({
      main: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
      contrast: z.object({
        light: z.string().startsWith("#", "The color should be a HEX"),
        dark: z.string().startsWith("#", "The color should be a HEX"),
      }),
    }),
  }),
  fonts: z.object({
    h1: z.object({
      size: z.string().endsWith("px").or(z.string().endsWith("rem")),
      family: z.string().min(1),
      weight: z.string().or(z.number().gte(0)),
    }),
    h2: z.object({
      size: z.string().endsWith("px").or(z.string().endsWith("rem")),
      family: z.string().min(1),
      weight: z.string().or(z.number().gte(0)),
    }),
    h3: z.object({
      size: z.string().endsWith("px").or(z.string().endsWith("rem")),
      family: z.string().min(1),
      weight: z.string().or(z.number().gte(0)),
    }),
    h4: z.object({
      size: z.string().endsWith("px").or(z.string().endsWith("rem")),
      family: z.string().min(1),
      weight: z.string().or(z.number().gte(0)),
    }),
    h5: z.object({
      size: z.string().endsWith("px").or(z.string().endsWith("rem")),
      family: z.string().min(1),
      weight: z.string().or(z.number().gte(0)),
    }),
    h6: z.object({
      size: z.string().endsWith("px").or(z.string().endsWith("rem")),
      family: z.string().min(1),
      weight: z.string().or(z.number().gte(0)),
    }),
    subtitle: z.object({
      size: z.string().endsWith("px").or(z.string().endsWith("rem")),
      family: z.string().min(1),
      weight: z.string().or(z.number().gte(0)),
    }),
    "subtitle-secondary": z.object({
      size: z.string().endsWith("px").or(z.string().endsWith("rem")),
      family: z.string().min(1),
      weight: z.string().or(z.number().gte(0)),
    }),
    body: z.object({
      size: z.string().endsWith("px").or(z.string().endsWith("rem")),
      family: z.string().min(1),
      weight: z.string().or(z.number().gte(0)),
    }),
    "body-secondary": z.object({
      size: z.string().endsWith("px").or(z.string().endsWith("rem")),
      family: z.string().min(1),
      weight: z.string().or(z.number().gte(0)),
    }),
    button: z.object({
      size: z.string().endsWith("px").or(z.string().endsWith("rem")),
      family: z.string().min(1),
      weight: z.string().or(z.number().gte(0)),
    }),
    caption: z.object({
      size: z.string().endsWith("px").or(z.string().endsWith("rem")),
      family: z.string().min(1),
      weight: z.string().or(z.number().gte(0)),
    }),
  }),
  spacing: z.number().gt(0),
  radius: z.number().gte(0),
});

export default schema;
