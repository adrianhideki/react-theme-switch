import z from "zod";
import Select from "@components/select";
import { colorScaleStringValuesThemes } from "@theme/colors/types";
import {
  themePaletteBorderThemes,
  themePaletteIconThemes,
  themePaletteSurfaceThemes,
  themePaletteTextThemes,
  type ThemePaletteBorderThemes,
  type ThemePaletteIconThemes,
  type ThemePaletteSurfaceThemes,
  type ThemePaletteTextThemes,
} from "@theme/theme/types";
import { themePaletteSchema } from "../schema";
import Typography from "@components/typography";

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
  surface: Array.from(themePaletteSurfaceThemes),
  icon: Array.from(themePaletteIconThemes),
  text: Array.from(themePaletteTextThemes),
  border: Array.from(themePaletteBorderThemes),
};

const getColorPropFromPalette = (
  section: PaletteSection,
  value: Palette,
  theme: string,
  prop: "color" | "scale"
) => {
  if (section === "surface") {
    return value?.[section]?.[theme as ThemePaletteSurfaceThemes]?.[prop];
  }

  if (section === "border") {
    return value?.[section]?.[theme as ThemePaletteBorderThemes]?.[prop];
  }

  if (section === "icon") {
    return value?.[section]?.[theme as ThemePaletteIconThemes]?.[prop];
  }

  if (section === "text") {
    return value?.[section]?.[theme as ThemePaletteTextThemes]?.[prop];
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
            className="flex flex-col p-2 gap-2 bg-surface-pageAlternative rounded-xs w-60"
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
                items={["", ...Array.from(colorScaleStringValuesThemes)]}
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
