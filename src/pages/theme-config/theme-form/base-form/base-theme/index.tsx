import { useEffect, useState, type HTMLInputTypeAttribute } from "react";
import Input from "@components/input";
import Typography from "@components/typography";

type BaseThemeProps<
  TKey extends string | number,
  TResult extends string | number,
> = {
  themes: readonly TKey[];
  data?: Record<TKey, TResult>;
  error?: Record<TKey, { message?: string }>;
  onChange?: (data: Record<TKey, TResult>) => void;
  type?: HTMLInputTypeAttribute;
};

const BaseTheme = <
  TKey extends string | number,
  TResult extends string | number,
>({
  themes,
  data: initialData,
  onChange,
  type = "text",
  error,
}: BaseThemeProps<TKey, TResult>) => {
  const [data, setData] = useState<Record<TKey, TResult>>(
    initialData ?? ({} as Record<TKey, TResult>)
  );

  useEffect(() => {
    if (!onChange) return;

    onChange(data);
  }, [data, onChange]);

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {themes.map((key) => (
        <div key={key}>
          <Typography className="capitalize">{key}</Typography>
          <Input
            type={type}
            placeholder={String(key)}
            value={String(data[key])}
            onChange={(e) =>
              setData((p) => ({
                ...p,
                [key as TKey]:
                  type === "number" ? +e.target.value : e.target.value,
              }))
            }
            error={error?.[key]?.message}
          />
          {error?.[key]?.message && (
            <Typography className="text-text-error-default">
              {String(error?.[key]?.message)}
            </Typography>
          )}
        </div>
      ))}
    </div>
  );
};

export default BaseTheme;
