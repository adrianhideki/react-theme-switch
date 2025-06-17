import Select from "@components/select";
import Typography from "@components/typography";

type TokenProps<TKey extends string | number, TValue> = {
  keys: Array<TKey>;
  data: Array<TValue>;
  value: Partial<Record<TKey, TValue>>;
  errors?: Partial<Record<TKey, { message?: string }>>;
  onChange: (key: TKey, item: TValue) => void;
};

const Token = <TKey extends string, TValue extends string | number>({
  data,
  keys,
  value,
  onChange,
  errors,
}: TokenProps<TKey, TValue>) => {
  return (
    <div className="flex flex-wrap gap-2">
      {keys.map((key) => (
        <div key={key}>
          <Typography>{key.replace("-", " ")}</Typography>
          <Select
            items={["", ...Array.from(data)]}
            getKey={(item) => item}
            getLabel={(item) => String(item)}
            value={value?.[key]}
            onChange={(item) => onChange(key, item as TValue)}
            className="w-20"
          />
          {errors?.[key]?.message && (
            <Typography className="text-error">
              {String(errors?.[key]?.message)}
            </Typography>
          )}
        </div>
      ))}
    </div>
  );
};

export default Token;
