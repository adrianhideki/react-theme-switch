import {
  useCallback,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type ReactNode,
} from "react";
import cn from "classnames";

type ButtonVariant = "filled" | "text" | "outlined";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({
  children,
  className,
  onClick,
  disabled = false,
  variant = "filled",
  ...props
}: ButtonProps) => {
  const getStyle = useCallback(() => {
    let style = "bg-surface-primary-default text-text-primary-default ";

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
      {...props}
      disabled={disabled}
      className={cn(
        "text-button",
        "rounded-default",
        "cursor-pointer",
        "hover:transition",
        "p-1",
        getStyle(),
        { "hover:brightness-150 hover:transition-all": !disabled },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
