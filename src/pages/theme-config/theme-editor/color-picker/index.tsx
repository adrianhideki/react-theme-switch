import Chrome, { ChromeInputType } from "@uiw/react-color-chrome";
import { useRef, useState } from "react";

type ColorPickerProps = {
  color: string;
  onColorChange?: (color: string) => void;
};

const ColorPicker = ({ color, onColorChange }: ColorPickerProps) => {
  const colorRef = useRef<HTMLDivElement>(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (color: string) => {
    if (!onColorChange) {
      return;
    }

    onColorChange(color);
  };

  const getTopPosition = () => {
    const position = colorRef.current?.getBoundingClientRect()!;

    return position.top + position.height;
  };

  const getLeftPosition = () => {
    const position = colorRef.current?.getBoundingClientRect()!;

    return position.left;
  };

  return (
    <>
      <div
        className="w-4 h-4 border-2 text-text cursor-pointer rounded-default"
        style={{
          backgroundColor: color,
        }}
        ref={colorRef}
        onClick={() => setShowPicker((prev) => !prev)}
      ></div>
      {showPicker && (
        <>
          <div
            className="fixed z-10"
            style={{
              top: getTopPosition(),
              left: getLeftPosition(),
            }}
          >
            <Chrome
              inputType={ChromeInputType.RGBA}
              color={color}
              onChange={(color) => handleColorChange(color.hex)}
              className="text-gray-950"
            />
          </div>
          <div
            className="w-full h-full absolute top-0 left-0"
            onClick={() => setShowPicker(false)}
          ></div>
        </>
      )}
    </>
  );
};

export default ColorPicker;
