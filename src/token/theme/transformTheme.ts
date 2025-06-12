import type { ColorScaleValues } from "../colors";
import type {
  BorderRadiusValues,
  BorderWidthValues,
  DimensionValues,
  SpacingValues,
} from "../sizes";
import type {
  ColorValues,
  FontValues,
  ResultTheme,
  Theme,
  ThemeColorValue,
  ThemePaletteBorder,
  ThemePaletteIcon,
  ThemePaletteSurface,
  ThemePaletteText,
} from "./types";

type FontSelector =
  | "family"
  | "size"
  | "weight"
  | "height"
  | "spacing"
  | "paragraphSpacing";

const findBorderSizeValue = <T extends string>(
  theme: Theme,
  selector: "width" | "radius",
  value: T
) => {
  const dimension = (
    theme.size!.border![selector] as Record<string, DimensionValues>
  )[value];

  return theme.base.size!.dimension![dimension];
};

const getBorderSizeValue = <TProperty extends string>(
  theme: Theme,
  selector: "width" | "radius"
) => {
  return Object.keys(theme.size.border![selector]!).reduce(
    (acc, val) => {
      return {
        ...acc,
        [val]: findBorderSizeValue<TProperty>(
          theme,
          selector,
          val as TProperty
        ),
      };
    },
    {} as Record<TProperty, number>
  );
};

const getSpacingSizeValue = <TProperty extends string>(theme: Theme) => {
  return Object.keys(theme.size!.spacing!).reduce(
    (acc, val) => {
      const value = theme.size.spacing![val as SpacingValues];
      return {
        ...acc,
        [val]: theme.base!.size!.dimension![value],
      };
    },
    {} as Record<TProperty, number>
  );
};

const findColorValue = (theme: Theme, selector: ColorValues) => {
  return theme.base!.color!.collection![theme.color[selector]];
};

const findFontValue = <T>(
  theme: Theme,
  selector: FontSelector,
  value: string
) => {
  const baseFont = theme.base!.font![selector]! as Record<string, T>;
  const prop = (theme.font[selector] as Record<string, T>)![value]! as string;

  return baseFont[prop] as T;
};

const getFontProperty = <TResult, TProperty extends string>(
  theme: Theme,
  selector: FontSelector
) => {
  return Object.keys(theme.font[selector]).reduce(
    (acc, val) => {
      return {
        ...acc,
        [val]: findFontValue<TResult>(theme, selector, val),
      };
    },
    {} as Record<TProperty, TResult>
  );
};

const getColorValue = (theme: Theme, value: string, scale?: number) => {
  if (
    String(value).startsWith("foundation.") &&
    theme.base?.color?.foundations
  ) {
    const picker = value.split(".")[1] as "white" | "black";

    return theme.base.color.foundations[picker];
  }

  if (
    Object.keys(theme.color).some((v) => v === value) &&
    scale &&
    theme?.base?.color?.collection
  ) {
    const picker = theme.color[value as ColorValues];

    return theme?.base?.color?.collection[picker][scale as ColorScaleValues];
  }

  if (
    theme.base?.color?.collection &&
    Object.keys(theme.base?.color?.collection ?? {}).some((v) => v === value)
  ) {
    return theme?.base?.color?.collection[value][scale as ColorScaleValues];
  }

  throw `Invalid color value ${value}.`;
};

const getPaletteValues = (
  surface: Record<string, ThemeColorValue>,
  theme: Theme
) =>
  Object.entries(surface).reduce((prev, [key, value]) => {
    return {
      ...prev,
      [key]: getColorValue(theme, value.color, value.scale),
    };
  }, {});

export function transformTheme(theme: Theme): ResultTheme {
  const font = {
    family: getFontProperty<string, FontValues>(theme, "family"),
    size: getFontProperty<number, FontValues>(theme, "size"),
    height: getFontProperty<number, FontValues>(theme, "height"),
    spacing: getFontProperty<number, FontValues>(theme, "spacing"),
    weight: getFontProperty<number, FontValues>(theme, "weight"),
    paragraphSpacing: getFontProperty<number, FontValues>(
      theme,
      "paragraphSpacing"
    ),
  };

  const color = {
    primary: findColorValue(theme, "primary"),
    secondary: findColorValue(theme, "secondary"),
    accent: findColorValue(theme, "accent"),
    success: findColorValue(theme, "success"),
    error: findColorValue(theme, "error"),
    information: findColorValue(theme, "information"),
    warning: findColorValue(theme, "warning"),
    "neutral-dark": findColorValue(theme, "neutral-dark"),
    "neutral-light": findColorValue(theme, "neutral-light"),
  };

  const size = {
    border: {
      width: getBorderSizeValue<BorderWidthValues>(theme, "width"),
      radius: getBorderSizeValue<BorderRadiusValues>(theme, "radius"),
    },
    spacing: getSpacingSizeValue(theme),
  };

  return {
    base: theme.base,
    font: font,
    color,
    size,
    palette: {
      dark: {
        surface: getPaletteValues(
          theme.palette.dark.surface,
          theme
        ) as ThemePaletteSurface<string>,
        text: getPaletteValues(
          theme.palette.dark.text,
          theme
        ) as ThemePaletteText<string>,
        icon: getPaletteValues(
          theme.palette.dark.icon,
          theme
        ) as ThemePaletteIcon<string>,
        border: getPaletteValues(
          theme.palette.dark.border,
          theme
        ) as ThemePaletteBorder<string>,
      },
      light: {
        surface: getPaletteValues(
          theme.palette.light.surface,
          theme
        ) as ThemePaletteSurface<string>,
        text: getPaletteValues(
          theme.palette.light.text,
          theme
        ) as ThemePaletteText<string>,
        icon: getPaletteValues(
          theme.palette.light.icon,
          theme
        ) as ThemePaletteIcon<string>,
        border: getPaletteValues(
          theme.palette.light.border,
          theme
        ) as ThemePaletteBorder<string>,
      },
    },
  };
}
