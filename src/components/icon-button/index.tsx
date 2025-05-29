import type { ReactNode } from "react";
import cn from "classnames";

type IconButtonProps = {
  onClick?: () => void;
  icon: ReactNode;
  className?: string;
};

const IconButton = ({ onClick, icon, className }: IconButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "relative",
        "cursor-pointer",
        "focus:border-0",
        "focus:outline-hidden",
        "hover:brightness-125",
        "hover:transition-all",
        "dark:hover:brightness-50",
        "dark:hover:transition-all",
        className
      )}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
