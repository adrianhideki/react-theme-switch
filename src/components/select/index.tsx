import { useCallback, type ChangeEvent } from "react";
import cn from "classnames";
import "./styles.css";

type SelectProps<T> = {
  items: Array<T>;
  getLabel: (item: T) => React.ReactNode;
  getKey: (item: T) => string | number;
  value?: string | number;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

const Select = <T = object,>({
  items,
  getKey,
  getLabel,
  value,
  onChange,
  className = "",
  disabled = false,
}: SelectProps<T>) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <select
      className={cn(
        { "bg-paper": !disabled },
        { "hover:brightness-150": !disabled },
        "text-paper-contrast",
        "p-1",
        { "cursor-pointer": !disabled },
        { "bg-gray-500": disabled },
        { "cursor-not-allowed": disabled },
        "rounded-default",
        "transition-all",
        "border-1",
        "border-border",
        className
      )}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    >
      {items.map((item) => (
        <option
          className="p-1 bg-paper text-paper-contrast hover:bg-primary hover:text-primary-contrast hover:transition-all min-h-6"
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
