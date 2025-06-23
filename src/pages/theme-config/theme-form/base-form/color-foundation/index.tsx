import Typography from "@components/typography";
import { useCallback, useEffect, useState } from "react";
import ColorPicker from "../../color-picker";

type ColorFoundationData = {
  white: string;
  black: string;
};

type ColorFoundationProps = {
  data?: ColorFoundationData;
  onChange?: (data: ColorFoundationData) => void;
};

const ColorFoundation = ({
  data: initialData,
  onChange,
}: ColorFoundationProps) => {
  const [data, setData] = useState<ColorFoundationData>(
    () => initialData as ColorFoundationData
  );

  useEffect(() => {
    if (!onChange) return;
    onChange(data);
  }, [data, onChange]);

  const handleBlackChange = useCallback((value: string) => {
    setData((p) => ({ ...p, black: value }));
  }, []);

  const handleWhiteChange = useCallback((value: string) => {
    setData((p) => ({ ...p, white: value }));
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h5">Base Foundations</Typography>
      <div className="flex gap-2 items-center">
        <Typography>White</Typography>
        <ColorPicker
          className="w-10 h-10 rounded-3xs"
          color={data?.white ?? ""}
          onColorChange={handleWhiteChange}
        />
        <Typography>Black</Typography>
        <ColorPicker
          className="w-10 h-10 rounded-3xs"
          color={data?.black ?? ""}
          onColorChange={handleBlackChange}
        />
      </div>
    </div>
  );
};

export default ColorFoundation;
