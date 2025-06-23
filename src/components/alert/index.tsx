import type { PropsWithChildren } from "react";
import cn from "classnames";

type LevelVariants = "information" | "success" | "error" | "warning";

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
        `bg-surface-${level}-default`,
        `text-text-${level}-default`,
        "rounded-3xs",
        "p-4",
        "border-2",
        `border-${level}-default`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Alert;
