import Button from "@components/button";
import Input from "@components/input";
import Typography from "@components/typography";
import {
  colorScaleStringValuesTokens,
  colorScaleValuesTokens,
  type ColorScaleStringValues,
} from "@token/colors/types";
import { useCallback, useMemo, useState } from "react";
import ColorPicker from "../color-picker";
import { getContrastColor } from "@token/utils";

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

    setNewColorName("");
    setNewColorScales({});
  }, [newColorName, newColorScales, onColorAdd]);

  const handleSaveEditColor = useCallback(() => {
    if (!onColorEdit) return;
    if (!editingColor) return;

    onColorEdit(editingColor, newColorName, newColorScales);
    setEditingColor(undefined);
    setNewColorName("");
    setNewColorScales({});
  }, [editingColor, newColorName, newColorScales, onColorEdit]);

  const isAddEnable = useMemo(
    () =>
      Object.keys(newColorScales).every((key) =>
        colorScaleStringValuesTokens.find((v) => v === key)
      ) &&
      Object.keys(newColorScales).length > 0 &&
      newColorName,
    [newColorName, newColorScales]
  );

  return (
    <>
      <Typography variant="h3">Base Colors Collection</Typography>
      <table className="w-full border border-border">
        <thead>
          <tr>
            <th className="border border-border px-2 py-1">Color Name</th>
            <th className="border border-border px-2 py-1">Scales</th>
            <th className="border border-border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-border px-2 py-1">
              <Input
                placeholder="Color name"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
              />
            </td>
            <td className="px-2 py-1 flex flex-wrap items-center gap-2">
              {colorScaleValuesTokens.map((scale) => (
                <div key={scale} className="flex flex-row items-center">
                  <ColorPicker
                    text={String(scale)}
                    className="w-6 h-6 flex items-center justify-center"
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
            <td className="border border-border px-2 py-1">
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
              <td className="border border-border px-2 py-1">{name}</td>
              <td className="border border-border px-2 py-1">
                <div className="flex gap-2">
                  {Object.entries(scales).map(([scale, value]) => (
                    <span
                      key={scale}
                      className="flex border border-border flex-col gap-1 w-6 h-6"
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
              <td className="border border-border px-2 py-1">
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
