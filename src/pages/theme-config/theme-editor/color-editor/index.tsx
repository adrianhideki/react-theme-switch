import { useEffect, useState, type ChangeEvent } from "react";
import type { ColorValue } from "@theme/types";
import ColorPicker from "../color-picker";
import Typography from "@components/typography";

type ColorEditorProps = {
  name: string;
  onChange: (value: ChangeEvent<{ value: ColorValue }>) => void;
  value?: ColorValue;
  error?: string;
};

const ColorEditor = ({ name, value, onChange }: ColorEditorProps) => {
  const [data, setData] = useState<ColorValue>({
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
      value: ColorValue;
    }>;
    onChange(target);
  }, [data]);

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
    <div className="flex gap-2 items-center flex-col lg:flex-row">
      <Typography variant="h4" className="w-20">
        {name}
      </Typography>
      <div className="flex gap-2 items-center">
        <Typography variant="body" className="w-15">
          Main Color
        </Typography>
        <ColorPicker
          color={data.main.light}
          onColorChange={(color) => handleChange("main", "light", color)}
        />
        <ColorPicker
          color={data.main.dark}
          onColorChange={(color) => handleChange("main", "dark", color)}
        />
      </div>
      <div className="flex gap-2 items-center">
        <Typography variant="body" className="w-15">
          Contrast Color
        </Typography>
        <ColorPicker
          color={data.contrast.light}
          onColorChange={(color) => handleChange("contrast", "light", color)}
        />
        <ColorPicker
          color={data.contrast.dark}
          onColorChange={(color) => handleChange("contrast", "dark", color)}
        />
      </div>
    </div>
  );
};

export default ColorEditor;
