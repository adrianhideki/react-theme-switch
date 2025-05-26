import { useEffect, useState } from "react";
import type { ColorValue } from "@theme/types";
import ColorPicker from "../color-picker";
import Typography from "@components/typography";

type ColorEditorProps = {
  name: string;
  onChange: (value: ColorValue) => void;
  value?: ColorValue;
};

const ColorEditor = ({ name, value, onChange }: ColorEditorProps) => {
  const [data, setData] = useState<ColorValue>({
    contrast: {
      dark: value?.contrast?.dark ?? "#ffffff",
      light: value?.contrast?.dark ?? "#ffffff",
    },
    main: {
      dark: value?.main?.dark ?? "#ffffff",
      light: value?.main?.dark ?? "#ffffff",
    },
  });

  useEffect(() => {
    onChange(data);
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
    <div className="flex gap-2 items-center">
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
