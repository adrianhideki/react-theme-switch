import { useCallback, type ReactNode } from "react";
import cn from "classnames";

type ButtonVariant = "filled" | "text" | "outlined";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  children,
  className,
  onClick,
  disabled = false,
  variant = "filled",
}: ButtonProps) => {
  const getStyle = useCallback(() => {
    let style = "bg-primary text-primary-contrast ";

    if (variant === "outlined") {
      style = "bg-transparent text-primary border-2 border-b-primary";
    }

    if (variant === "text") {
      style = "bg-transparent text-primary";
    }

    if (disabled) {
      style =
        "disabled:cursor-not-allowed disabled:hover:none disabled:bg-gray-500/25 disabled:text-text";
    }

    return style;
  }, [disabled, variant]);

  return (
    <button
      disabled={disabled}
      className={cn(
        "rounded-default",
        "cursor-pointer",
        "hover:transition",
        "p-1",
        getStyle(),
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
