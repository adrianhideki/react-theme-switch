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
      <table className="p-2 border-1 border-default">
        <thead className="border-1 border-default">
          <tr>
            <th className="border-1 border-default px-2 py-1">Theme</th>
            <th className="border-1 border-default px-2 py-1">Color</th>
            <th className="border-1 border-default px-2 py-1">Scale</th>
            <th className="border-1 border-default px-2 py-1">Preview</th>
          </tr>
        </thead>
        <tbody>
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
              <tr key={theme}>
                <td className="border-1 border-default px-2 py-1">
                  <span>{theme}</span>
                  {paletteError?.[section]?.[theme]?.message && (
                    <Typography className="text-text-error-default">
                      {String(paletteError?.[section]?.[theme]?.message)}
                    </Typography>
                  )}
                </td>
                <td className="border-1 border-default px-2 py-1">
                  <Select
                    className="w-40"
                    items={["", ...colors]}
                    getKey={(item) => item}
                    getLabel={(item) => item}
                    value={colorValue}
                    onChange={(v) =>
                      onChange(section, theme, "color", String(v))
                    }
                  />
                  {colorError?.[section]?.[theme]?.color?.message && (
                    <Typography className="text-text-error-default">
                      {String(colorError?.[section]?.[theme]?.color?.message)}
                    </Typography>
                  )}
                </td>
                <td className="border-1 border-default px-2 py-1">
                  <Select
                    className="w-20"
                    items={["", ...Array.from(colorScaleStringValuesThemes)]}
                    getKey={(item) => item}
                    getLabel={(item) => item}
                    value={scaleValue}
                    onChange={(v) =>
                      onChange(section, theme, "scale", String(v))
                    }
                    disabled={String(colorValue)?.startsWith("foundation.")}
                  />
                  {colorError?.[section]?.[theme]?.scale?.message && (
                    <Typography className="text-text-error-default">
                      {String(colorError?.[section]?.[theme]?.scale?.message)}
                    </Typography>
                  )}
                </td>
                <td className="border-1 border-default px-2 py-1">
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Palette;
