import Input from "@components/input";
import Typography from "@components/typography";
import type { FontValue } from "@theme/types";
import { useEffect, useState, type ChangeEvent } from "react";

export type FontEditorValue = { weight: number | string } & Omit<
  FontValue,
  "weight"
>;

type FontEditorProps = {
  name: string;
  value?: FontEditorValue;
  error?: string;
  onChange?: (value: ChangeEvent<{ value: FontEditorValue }>) => void;
};

const FontEditor = ({ name, value, onChange, error }: FontEditorProps) => {
  const [data, setData] = useState<FontEditorValue>(
    value ?? { family: "", size: "", weight: "" }
  );

  useEffect(() => {
    if (!value) return;

    setData(value!);
  }, [value]);

  useEffect(() => {
    if (!onChange) return;

    const target = { target: { value: data } } as ChangeEvent<{
      value: FontEditorValue;
    }>;

    onChange(target);
  }, [data, onChange]);

  const handleChange = (property: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({
        ...prev,
        [property]: e.target.value,
      }));
    };
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h4">{name}</Typography>
      <div className="flex gap-2 items-start flex-col bg-paper p-2">
        <Typography>Family</Typography>
        <Input
          type="text"
          value={data?.family}
          onChange={handleChange("family")}
          error={error}
        />
        <Typography>Size</Typography>
        <Input
          type="text"
          onChange={handleChange("size")}
          min={1}
          value={data?.size}
          error={error}
        />
        <Typography>Weight</Typography>
        <Input
          type="number"
          value={String(data?.weight)}
          onChange={handleChange("weight")}
          error={error}
        />
      </div>
    </div>
  );
};

export default FontEditor;
