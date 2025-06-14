import z from "zod";
import Select from "@components/select";
import { colorScaleStringValuesTokens } from "@token/colors/types";
import {
  themePaletteBorderTokens,
  themePaletteIconTokens,
  themePaletteSurfaceTokens,
  themePaletteTextTokens,
  type ThemePaletteBorderTokens,
  type ThemePaletteIconTokens,
  type ThemePaletteSurfaceTokens,
  type ThemePaletteTextTokens,
} from "@token/theme/types";
import { themePaletteSchema } from "../schema";

type PaletteSection = "surface" | "text" | "icon" | "border";

type Palette = z.infer<typeof themePaletteSchema>;

type PaletteProps = {
  section: PaletteSection;
  colors: string[];
  value: Palette;
  onChange: (
    section: PaletteSection,
    token: string,
    prop: "color" | "scale",
    value: string
  ) => void;
  onColorPreview: (color: string, scale: string) => string;
};

const paletteTokens = {
  surface: Array.from(themePaletteSurfaceTokens),
  icon: Array.from(themePaletteIconTokens),
  text: Array.from(themePaletteTextTokens),
  border: Array.from(themePaletteBorderTokens),
};

const getColorPropFromPalette = (
  section: PaletteSection,
  value: Palette,
  token: string,
  prop: "color" | "scale"
) => {
  if (section === "surface") {
    return value?.[section]?.[token as ThemePaletteSurfaceTokens]?.[prop];
  }

  if (section === "border") {
    return value?.[section]?.[token as ThemePaletteBorderTokens]?.[prop];
  }

  if (section === "icon") {
    return value?.[section]?.[token as ThemePaletteIconTokens]?.[prop];
  }

  if (section === "text") {
    return value?.[section]?.[token as ThemePaletteTextTokens]?.[prop];
  }

  return "";
};

const Palette = ({
  section,
  colors,
  value,
  onChange,
  onColorPreview,
}: PaletteProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <table className="p-2 border-1 border-border">
        <thead className="border-1 border-border">
          <tr>
            <th className="border-1 border-border px-2 py-1">Token</th>
            <th className="border-1 border-border px-2 py-1">Color</th>
            <th className="border-1 border-border px-2 py-1">Scale</th>
            <th className="border-1 border-border px-2 py-1">Preview</th>
          </tr>
        </thead>
        <tbody>
          {paletteTokens[section].map((token) => {
            const colorValue = getColorPropFromPalette(
              section,
              value,
              token,
              "color"
            );

            const scaleValue = getColorPropFromPalette(
              section,
              value,
              token,
              "scale"
            );

            return (
              <tr key={token}>
                <td className="border-1 border-border px-2 py-1">
                  <span>{token}</span>
                </td>
                <td className="border-1 border-border px-2 py-1">
                  <Select
                    className="w-20"
                    items={["", ...colors]}
                    getKey={(item) => item}
                    getLabel={(item) => item}
                    value={colorValue}
                    onChange={(v) =>
                      onChange(section, token, "color", String(v))
                    }
                  />
                </td>
                <td className="border-1 border-border px-2 py-1">
                  <Select
                    className="w-14"
                    items={["", ...Array.from(colorScaleStringValuesTokens)]}
                    getKey={(item) => item}
                    getLabel={(item) => item}
                    value={scaleValue}
                    onChange={(v) =>
                      onChange(section, token, "scale", String(v))
                    }
                    disabled={String(colorValue)?.startsWith("foundation.")}
                  />
                </td>
                <td className="border-1 border-border px-2 py-1">
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
