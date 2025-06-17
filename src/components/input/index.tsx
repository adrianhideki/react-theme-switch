import type {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";
import cn from "classnames";

type InputProps = {
  id?: string;
  label?: string;
  multiline?: boolean;
  value?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & Partial<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>;

const Input = ({
  value,
  onChange,
  className,
  disabled,
  label,
  id,
  error = "",
  ...props
}: InputProps) => {
  const style =
    "p-2 min-w-0 text-text border-2 rounded-xs focus:transition-all focus:outline-none focus:border-surface-primary-default border-default";

  const errorStyle = "border-error-default";

  const disableStyle = "cursor-not-allowed bg-gray-500/25";

  return (
    <>
      {label && (
        <label className="relative" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        {...props}
        id={id}
        disabled={disabled}
        className={cn(style, className, {
          [errorStyle]: !!error,
          [disableStyle]: !!disabled,
        })}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default Input;
