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
    return result + 200 > window.innerWidth;
  };

  const getLeftPosition = () => {
    const position = colorRef.current?.getBoundingClientRect();

    if (!position) return 0;

    let result = position.left;

    if (isComponentOverflowingScreen()) {
      result -= 200;
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
            className="fixed z-10 overflow-clip"
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
            className="left-0 top-0 fixed w-full h-full"
            onClick={() => setShowPicker(false)}
          ></div>
        </>
      )}
    </>
  );
};

export default ColorPicker;
