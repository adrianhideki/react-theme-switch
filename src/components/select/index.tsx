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
      className={`bg-background brightness-95 dark:brightness-75 hover:brightness-150 text-body p-1 cursor-pointer rounded-default transition-all ${className}`}
      value={value}
      onChange={handleChange}
    >
      {items.map((item) => (
        <option
          className="p-1 bg-background brightness-95 dark:brightness-75 text-text hover:bg-primary hover:text-primary-contrast hover:transition-all"
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
