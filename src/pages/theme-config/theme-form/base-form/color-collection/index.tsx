import Button from "@components/button";
import Input from "@components/input";
import {
  colorScaleStringValuesThemes,
  colorScaleValuesThemes,
  type ColorScaleStringValues,
} from "@theme/colors/types";
import { useCallback, useMemo, useState } from "react";
import ColorPicker from "../../color-picker";
import { generateColorScale, getContrastColor } from "@theme/utils";

type ColorCollectionProps = {
  collection?: Record<string, Record<ColorScaleStringValues, string>>;
  onColorAdd?: (
    name: string,
    scale: Record<ColorScaleStringValues, string>
  ) => void;
  onColorEdit?: (
    oldName: string,
    name: string,
    scale: Record<ColorScaleStringValues, string>
  ) => void;
  onColorRemove?: (name: string) => void;
};

const ColorCollection = ({
  collection,
  onColorAdd,
  onColorEdit,
  onColorRemove,
}: ColorCollectionProps) => {
  const [baseColor, setBaseColor] = useState<string>("");
  const [editingColor, setEditingColor] = useState<string>();
  const [newColorName, setNewColorName] = useState("");
  const [newColorScales, setNewColorScales] = useState<
    Record<number | string, string>
  >({});

  const handleEditColor = useCallback(
    (name: string) => {
      setEditingColor(name);
      setNewColorName(name);

      if (!collection) return;

      setNewColorScales(collection[name]);
    },
    [collection]
  );

  const handleRemoveColor = useCallback(
    (name: string) => {
      if (!onColorRemove) return;

      onColorRemove(name);
    },
    [onColorRemove]
  );

  const handleAddColor = useCallback(() => {
    if (!onColorAdd) return;

    onColorAdd(newColorName, newColorScales);

    setBaseColor("");
    setNewColorName("");
    setNewColorScales({});
  }, [newColorName, newColorScales, onColorAdd]);

  const handleSaveEditColor = useCallback(() => {
    if (!onColorEdit) return;
    if (!editingColor) return;

    onColorEdit(editingColor, newColorName, newColorScales);
    setEditingColor(undefined);
    setNewColorName("");
    setBaseColor("");
    setNewColorScales({});
  }, [editingColor, newColorName, newColorScales, onColorEdit]);

  const isAddEnable = useMemo(
    () =>
      Object.keys(newColorScales).every((key) =>
        colorScaleStringValuesThemes.find((v) => v === key)
      ) &&
      Object.keys(newColorScales).length > 0 &&
      newColorName,
    [newColorName, newColorScales]
  );

  return (
    <>
      <table className="w-full border border-default">
        <thead>
          <tr>
            <th className="border border-default px-2 py-1">Color Name</th>
            <th className="border border-default px-2 py-1">Scales</th>
            <th className="border border-default px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-default px-2 py-1">
              <Input
                placeholder="Color name"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
              />
            </td>
            <td className="px-2 py-1 flex flex-wrap items-center gap-2">
              <ColorPicker
                text={"base"}
                className="w-10 h-10 flex items-center justify-center"
                color={baseColor}
                onColorChange={(color) => {
                  setBaseColor(color);
                  setNewColorScales((s) => ({
                    ...s,
                    ...(generateColorScale(color) as Record<number, string>),
                  }));
                }}
              />
              {colorScaleValuesThemes.map((scale) => (
                <div key={scale} className="flex flex-row items-center">
                  <ColorPicker
                    text={String(scale)}
                    className="w-10 h-10 flex items-center justify-center"
                    color={newColorScales[scale] || ""}
                    onColorChange={(color) =>
                      setNewColorScales((s) => ({
                        ...s,
                        [scale]: color,
                      }))
                    }
                  />
                </div>
              ))}
            </td>
            <td className="border border-default px-2 py-1">
              {editingColor ? (
                <Button
                  type="button"
                  onClick={handleSaveEditColor}
                  disabled={!isAddEnable}
                >
                  Save
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleAddColor}
                  disabled={!isAddEnable}
                >
                  Add
                </Button>
              )}
            </td>
          </tr>

          {Object.entries(collection ?? {}).map(([name, scales]) => (
            <tr key={name}>
              <td className="border border-default px-2 py-1">{name}</td>
              <td className="border border-default px-2 py-1">
                <div className="flex gap-2">
                  {Object.entries(scales).map(([scale, value]) => (
                    <span
                      key={scale}
                      className="flex border border-default flex-col gap-1 w-10 h-10"
                      style={{
                        background: value,
                        display: "inline-block",
                      }}
                      title={value}
                    >
                      <span
                        key={scale}
                        className="flex flex-col items-center justify-center w-full h-full"
                        style={{
                          color: value ? getContrastColor(value) : undefined,
                        }}
                      >
                        <b>{scale}</b>
                      </span>
                    </span>
                  ))}
                </div>
              </td>
              <td className="border border-default px-2 py-1">
                <div className="flex gap-2 items-center justify-center">
                  <Button type="button" onClick={() => handleEditColor(name)}>
                    Edit
                  </Button>
                  <Button type="button" onClick={() => handleRemoveColor(name)}>
                    Remove
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ColorCollection;
