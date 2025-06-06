import type { PropsWithChildren } from "react";
import cn from "classnames";

export type TagProps = {
  className?: string;
};

const Tag = ({ children, className }: PropsWithChildren<TagProps>) => {
  return (
    <span
      className={cn(
        "text-paper",
        "text-body2",
        "inline-block",
        "bg-paper",
        "rounded-default",
        "px-3",
        "py-1",
        "font-semibold",
        "mr-2 mb-2",
        className
      )}
    >
      #{children}
    </span>
  );
};

export default Tag;
