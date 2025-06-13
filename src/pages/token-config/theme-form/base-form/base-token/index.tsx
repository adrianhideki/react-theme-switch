import { useEffect, useState, type HTMLInputTypeAttribute } from "react";
import Input from "@components/input";
import Typography from "@components/typography";

type BaseTokenProps<
  TKey extends string | number,
  TResult extends string | number,
> = {
  tokens: readonly TKey[];
  data?: Record<TKey, TResult>;
  error?: Record<TKey, { message?: string }>;
  onChange?: (data: Record<TKey, TResult>) => void;
  type?: HTMLInputTypeAttribute;
};

const BaseToken = <
  TKey extends string | number,
  TResult extends string | number,
>({
  tokens,
  data: initialData,
  onChange,
  type = "text",
  error,
}: BaseTokenProps<TKey, TResult>) => {
  const [data, setData] = useState<Record<TKey, TResult>>(
    () => initialData ?? ({} as Record<TKey, TResult>)
  );

  useEffect(() => {
    if (!onChange) return;

    onChange(data);
  }, [data, onChange]);

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {tokens.map((key) => (
        <div key={key}>
          <Typography className="capitalize">{key}</Typography>
          <Input
            placeholder={String(key)}
            onChange={(e) =>
              setData((p) => ({
                ...p,
                [key as TKey]:
                  type === "number" ? +e.target.value : e.target.value,
              }))
            }
            type={type}
            error={error?.[key]?.message}
          />
          {error?.[key]?.message && (
            <Typography className="text-error">
              {String(error?.[key]?.message)}
            </Typography>
          )}
        </div>
      ))}
    </div>
  );
};

export default BaseToken;
