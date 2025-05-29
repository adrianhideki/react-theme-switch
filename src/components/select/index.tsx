import { useCallback, type ChangeEvent } from "react";
import "./styles.css";

type SelectProps = {
  items: Array<Record<string, unknown>>;
  keyField: string;
  getLabel: (item: Record<string, unknown>) => string;
  value?: string | number;
  onChange: (value: string) => void;
  className?: string;
};

const Select = ({
  items,
  keyField,
  getLabel,
  value,
  onChange,
  className = "",
}: SelectProps) => {
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
          key={String(item[keyField])}
          value={String(item[keyField])}
        >
          {getLabel(item)}
        </option>
      ))}
    </select>
  );
};

export default Select;
