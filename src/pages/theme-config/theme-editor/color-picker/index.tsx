import { HexColorPicker, HexColorInput } from "react-colorful";
import { useRef, useState } from "react";

type ColorPickerProps = {
  color: string;
  onColorChange?: (color: string) => void;
};

const PICKER_WIDTH = 180;

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
    const position = colorRef.current?.getBoundingClientRect();

    if (!position) {
      return 0;
    }

    return position.top + position.height;
  };

  const isComponentOverflowingScreen = () => {
    const position = colorRef.current?.getBoundingClientRect();

    if (!position) {
      return false;
    }

    const result = position.left;
    return result + PICKER_WIDTH > window.innerWidth;
  };

  const getLeftPosition = () => {
    const position = colorRef.current?.getBoundingClientRect();

    if (!position) return 0;

    let result = position.left;

    if (isComponentOverflowingScreen()) {
      result -= PICKER_WIDTH;
    }

    return result;
  };

  return (
    <>
      <div
        className="w-4 h-4 border-2 border-border text-text cursor-pointer rounded-default"
        style={{
          backgroundColor: color,
        }}
        ref={colorRef}
        onClick={() => setShowPicker((prev) => !prev)}
      ></div>
      {showPicker && (
        <>
          <div
            className="fixed z-10 bg-paper rounded-sm"
            style={{
              top: getTopPosition(),
              left: getLeftPosition(),
            }}
          >
            <HexColorPicker
              color={color}
              style={{ width: "auto" }}
              onChange={handleColorChange}
              className="text-gray-950"
              prefix="#"
            />
            <HexColorInput
              className="p-2"
              color={color}
              onChange={handleColorChange}
              prefix="#"
            />
          </div>
          <div
            className="left-0 top-0 fixed w-full h-full"
            onClick={() => setShowPicker(false)}
          ></div>
        </>
      )}
    </>
  );
};

export default ColorPicker;
