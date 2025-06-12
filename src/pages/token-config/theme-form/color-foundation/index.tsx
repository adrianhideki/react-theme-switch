import Typography from "@components/typography";
import { useCallback, useEffect, useState } from "react";
import ColorPicker from "../color-picker";

type ColorFoundationProps = {
  white?: string;
  black?: string;
  onChange?: (white?: string, black?: string) => void;
};

const ColorFoundation = ({
  black: initialBlack,
  white: initialWhite,
  onChange,
}: ColorFoundationProps) => {
  const [white, setWhite] = useState<string>(() => initialWhite ?? "");
  const [black, setBlack] = useState<string>(() => initialBlack ?? "");

  useEffect(() => {
    if (!onChange) return;
    onChange(white, black);
  }, [white, black, onChange]);

  const handleBlackChange = useCallback((value: string) => {
    setBlack(value);
  }, []);

  const handleWhiteChange = useCallback((value: string) => {
    setWhite(value);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h3">Base Foundations</Typography>
      <div className="flex gap-2 items-center">
        <Typography>White</Typography>
        <ColorPicker
          className="w-6 h-6"
          color={white ?? ""}
          onColorChange={handleWhiteChange}
        />
        <Typography>Black</Typography>
        <ColorPicker
          className="w-6 h-6"
          color={black ?? ""}
          onColorChange={handleBlackChange}
        />
      </div>
    </div>
  );
};

export default ColorFoundation;
