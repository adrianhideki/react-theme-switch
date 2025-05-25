import { Chrome } from "@uiw/react-color";
import { useEffect, useState } from "react";
import type { ColorValue } from "@theme/types";

type ColorEditorProps = {
  name: string;
  onChange: (value: ColorValue) => void;
  value?: ColorValue;
};

const ColorEditor = ({ name, value, onChange }: ColorEditorProps) => {
  const [data, setData] = useState<ColorValue>({
    contrast: {
      dark: value?.contrast?.dark ?? "",
      light: value?.contrast?.dark ?? "",
    },
    main: {
      dark: value?.main?.dark ?? "",
      light: value?.main?.dark ?? "",
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
        ...prev.main,
        [mode]: value,
      },
    }));
  };

  return (
    <>
      <label htmlFor={`color-${name}-main.light`}>Cor principal</label>
      <Chrome
        id={`color-${name}-main.light`}
        defaultValue={data?.main.light}
        onChange={(color) => handleChange("main", "light", color.hex)}
      />
      <Chrome
        id={`color-${name}-main.dark`}
        onChange={(color) => handleChange("main", "dark", color.hex)}
      />
      <label htmlFor={`color-${name}-contrast.light`}>Cor de contraste</label>
      <Chrome
        id={`color-${name}-contrast.light`}
        defaultValue={data?.contrast.light}
        onChange={(color) => handleChange("contrast", "light", color.hex)}
      />
      <Chrome
        id={`color-${name}-contrast.dark`}
        onChange={(color) => handleChange("contrast", "dark", color.hex)}
      />
    </>
  );
};

export default ColorEditor;
