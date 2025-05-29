import type { PropsWithChildren } from "react";
import cn from "classnames";

type LevelVariants = "info" | "success" | "error" | "warning";

type AlertProps = {
  level: LevelVariants;
  className?: string;
};

const Alert = ({
  level,
  children,
  className,
}: PropsWithChildren<AlertProps>) => {
  return (
    <div
      className={cn(
        `bg-${level}`,
        `text-${level}-contrast`,
        "rounded-default",
        "p-4",
        "border-2",
        "border-border",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Alert;
