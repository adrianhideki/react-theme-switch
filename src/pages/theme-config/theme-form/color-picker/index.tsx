import { HexColorPicker, HexColorInput } from "react-colorful";
import { useRef, useState } from "react";
import cn from "classnames";
import { getContrastColor } from "theme-token-manager";

type ColorPickerProps = {
  color: string;
  onColorChange?: (color: string) => void;
  text?: string;
  className?: string;
};

const PICKER_WIDTH = 180;

const ColorPicker = ({
  color,
  onColorChange,
  text,
  className,
}: ColorPickerProps) => {
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

  const contrastColor = color ? getContrastColor(color) : undefined;

  return (
    <>
      <div
        className={cn(
          "w-4 h-4 border-1 border-default text-text cursor-pointer rounded-default",
          className
        )}
        style={{
          backgroundColor: color,
        }}
        ref={colorRef}
        onClick={() => setShowPicker((prev) => !prev)}
      >
        {text && (
          <div style={{ color: contrastColor }}>
            <strong>{text}</strong>
          </div>
        )}
      </div>
      {showPicker && (
        <>
          <div
            className="fixed z-10 bg-surface-page border-default border-2 rounded-3xs"
            style={{
              top: getTopPosition(),
              left: getLeftPosition(),
            }}
          >
            <HexColorPicker
              color={color}
              style={{ width: "auto", borderRadius: 0 }}
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
