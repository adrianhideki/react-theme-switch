import { useCallback, type ChangeEvent } from "react";
import "./styles.css";

type SelectItem = {
  value: string | number;
  description: string;
};

type SelectProps = {
  items: Array<SelectItem>;
  value?: string | number;
  onChange: (value: string) => void;
  className?: string;
};

const Select = ({ items, value, onChange, className = "" }: SelectProps) => {
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
          key={item.value}
          value={item.value}
        >
          {item.description}
        </option>
      ))}
    </select>
  );
};

export default Select;
