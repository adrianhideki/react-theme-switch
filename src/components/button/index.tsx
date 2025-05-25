import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  children,
  className,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`bg-primary text-primary-contrast hover:brightness-120 hover:transition p-1 rounded-default cursor-pointer ${
        disabled && "disabled:cursor-default disabled:brightness-50"
      } ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
