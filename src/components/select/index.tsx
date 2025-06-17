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
        { "bg-surface-page": !disabled },
        { "hover:brightness-150": !disabled },
        "text-text-default-body",
        "p-1",
        { "cursor-pointer": !disabled },
        { "bg-gray-500": disabled },
        { "cursor-not-allowed": disabled },
        "rounded-xs",
        "transition-all",
        "border-1",
        "p-2",
        "border-default",
        className
      )}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    >
      {items.map((item) => (
        <option
          className={cn(
            "bg-surface-pageAlternative",
            "text-text-default-body",
            "p-2"
          )}
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
