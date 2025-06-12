import { useCallback, type ChangeEvent } from "react";
import "./styles.css";

type SelectProps<T> = {
  items: Array<T>;
  getLabel: (item: T) => string;
  getKey: (item: T) => string | number;
  value?: string | number;
  onChange: (value: string) => void;
  className?: string;
};

const Select = <T=object,>({
  items,
  getKey,
  getLabel,
  value,
  onChange,
  className = "",
}: SelectProps<T>) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <select
      className={`bg-paper hover:brightness-150 text-paper-contrast p-1 cursor-pointer rounded-default transition-all border-2 border-border ${className}`}
      value={value}
      onChange={handleChange}
    >
      {items.map((item) => (
        <option
          className="p-1 bg-paper text-paper-contrast hover:bg-primary hover:text-primary-contrast hover:transition-all"
          key={getKey(item)}
          value={getKey(item)}
        >
          {getLabel(item as T)}
        </option>
      ))}
    </select>
  );
};

export default Select;
