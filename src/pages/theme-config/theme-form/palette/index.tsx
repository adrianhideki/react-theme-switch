import z from "zod";
import Select from "@components/select";
import { themePaletteSchema } from "../schema";
import Typography from "@components/typography";
import {
  themePaletteSurfaceTokens,
  themePaletteIconTokens,
  themePaletteTextTokens,
  themePaletteBorderTokens,
  colorScaleStringValuesTokens,
} from "theme-token-manager";
import type {
  ThemePaletteSurfaceValues,
  ThemePaletteBorderValues,
  ThemePaletteIconValues,
  ThemePaletteTextValues,
} from "theme-token-manager/theme/types";

type PaletteSection = "surface" | "text" | "icon" | "border";

type Palette = z.infer<typeof themePaletteSchema>;

type PaletteError = Partial<
  Record<PaletteSection, Partial<Record<string, { message?: string }>>>
>;

type PaletteColorError = Partial<
  Record<
    PaletteSection,
    Partial<Record<string, Record<"color" | "scale", { message?: string }>>>
  >
>;

type PaletteProps = {
  section: PaletteSection;
  colors: string[];
  value: Palette;
  errors?: PaletteError | PaletteColorError;
  onChange: (
    section: PaletteSection,
    theme: string,
    prop: "color" | "scale",
    value: string
  ) => void;
  onColorPreview: (color: string, scale: string) => string;
};

const paletteThemes = {
  surface: Array.from(themePaletteSurfaceTokens),
  icon: Array.from(themePaletteIconTokens),
  text: Array.from(themePaletteTextTokens),
  border: Array.from(themePaletteBorderTokens),
};

const getColorPropFromPalette = (
  section: PaletteSection,
  value: Palette,
  theme: string,
  prop: "color" | "scale"
) => {
  if (section === "surface") {
    return value?.[section]?.[theme as ThemePaletteSurfaceValues]?.[prop];
  }

  if (section === "border") {
    return value?.[section]?.[theme as ThemePaletteBorderValues]?.[prop];
  }

  if (section === "icon") {
    return value?.[section]?.[theme as ThemePaletteIconValues]?.[prop];
  }

  if (section === "text") {
    return value?.[section]?.[theme as ThemePaletteTextValues]?.[prop];
  }

  return "";
};

const Palette = ({
  section,
  colors,
  value,
  onChange,
  onColorPreview,
  errors,
}: PaletteProps) => {
  const colorError = errors as PaletteColorError;
  const paletteError = errors as PaletteError;

  return (
    <div className="flex flex-wrap gap-4">
      {paletteThemes[section].map((theme) => {
        const colorValue = getColorPropFromPalette(
          section,
          value,
          theme,
          "color"
        );

        const scaleValue = getColorPropFromPalette(
          section,
          value,
          theme,
          "scale"
        );

        return (
          <div
            key={theme}
            className="flex flex-col p-2 gap-2 bg-surface-pageAlternative rounded-3xs w-60"
          >
            <span className="capitalize">
              {theme.replace(/([a-z])([A-Z])/g, "$1 $2").replace("-", " ")}
            </span>
            {paletteError?.[section]?.[theme]?.message && (
              <Typography className="text-text-error-default">
                {String(paletteError?.[section]?.[theme]?.message)}
              </Typography>
            )}
            <Select
              className="w-full"
              items={["", ...colors]}
              getKey={(item) => item}
              getLabel={(item) => item}
              value={colorValue}
              onChange={(v) => onChange(section, theme, "color", String(v))}
            />
            <div className="flex gap-2">
              <Select
                className="w-full"
                items={["", ...Array.from(colorScaleStringValuesTokens)]}
                getKey={(item) => item}
                getLabel={(item) => item}
                value={scaleValue}
                onChange={(v) => onChange(section, theme, "scale", String(v))}
                disabled={String(colorValue)?.startsWith("foundation.")}
              />
              <div
                style={{
                  backgroundColor: onColorPreview(
                    String(colorValue),
                    String(scaleValue)
                  ),
                  width: 40,
                  height: 40,
                }}
                className="rounded-3xs"
              ></div>
            </div>
            {colorError?.[section]?.[theme]?.scale?.message && (
              <Typography className="text-text-error-default">
                {String(colorError?.[section]?.[theme]?.scale?.message)}
              </Typography>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Palette;
