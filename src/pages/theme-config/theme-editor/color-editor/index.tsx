import { useEffect, useState, type ChangeEvent } from "react";
import type { ColorModeValue, ColorValue } from "@theme/types";
import ColorPicker from "../color-picker";
import Typography from "@components/typography";
import { FaMoon, FaSun } from "react-icons/fa";
import { contrastRatio, passesWCAG } from "wcag-contrast-utils";

type ColorEditorProps = {
  name: string;
  onChange: (value: ChangeEvent<{ value: ColorValue<ColorModeValue> }>) => void;
  value?: ColorValue<ColorModeValue>;
  backgroundValue?: ColorValue<ColorModeValue>;
  error?: string;
};

const ColorEditor = ({
  name,
  value,
  backgroundValue,
  onChange,
}: ColorEditorProps) => {
  const [data, setData] = useState<ColorValue<ColorModeValue>>({
    contrast: {
      dark: value?.contrast?.dark ?? "#ffffff",
      light: value?.contrast?.light ?? "#ffffff",
    },
    main: {
      dark: value?.main?.dark ?? "#ffffff",
      light: value?.main?.light ?? "#ffffff",
    },
  });

  useEffect(() => {
    if (!value) return;
    setData(value!);
  }, [value]);

  useEffect(() => {
    const target = { target: { value: data } } as ChangeEvent<{
      value: ColorValue<ColorModeValue>;
    }>;
    onChange(target);
  }, [data, onChange]);

  const handleChange = (
    type: "main" | "contrast",
    mode: "light" | "dark",
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [mode]: value,
      },
    }));
  };

  return (
    <div className="flex gap-2 items-start flex-col p-2 bg-paper rounded-default w-min">
      <Typography variant="h4" className="w-20">
        {name}
      </Typography>
      <div className="flex gap-2 items-center">
        <Typography variant="body" className="w-15">
          Main Color
        </Typography>
        <FaSun />
        <ColorPicker
          color={data.main.light}
          onColorChange={(color) => handleChange("main", "light", color)}
        />
        <FaMoon />
        <ColorPicker
          color={data.main.dark}
          onColorChange={(color) => handleChange("main", "dark", color)}
        />
      </div>
      <div className="flex gap-2 items-center">
        <Typography variant="body" className="w-15">
          Contrast Color
        </Typography>
        <FaSun />
        <ColorPicker
          color={data.contrast.light}
          onColorChange={(color) => handleChange("contrast", "light", color)}
        />
        <FaMoon />
        <ColorPicker
          color={data.contrast.dark}
          onColorChange={(color) => handleChange("contrast", "dark", color)}
        />
      </div>
      <Typography variant="h5">Color x Contrast</Typography>
      <div className="flex gap-2 items-center">
        <FaSun />
        <Typography>
          {passesWCAG(contrastRatio(data.main.light, data.contrast.light))}
        </Typography>
      </div>
      <div className="flex gap-2 items-center">
        <FaMoon />
        <Typography>
          {passesWCAG(contrastRatio(data.main.dark, data.contrast.dark))}
        </Typography>
      </div>
      {backgroundValue && (
        <>
          <Typography variant="h5">Color x Background</Typography>
          <div className="flex gap-2 items-center">
            <FaSun />
            <Typography>
              {passesWCAG(
                contrastRatio(data.main.light, backgroundValue?.main.light)
              )}
            </Typography>
          </div>
          <div className="flex gap-2 items-center">
            <FaMoon />
            <Typography>
              {passesWCAG(
                contrastRatio(data.main.dark, backgroundValue?.main.dark)
              )}
            </Typography>
          </div>
        </>
      )}
    </div>
  );
};

export default ColorEditor;
