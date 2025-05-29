import type { PropsWithChildren, ReactNode } from "react";
import cn from "classnames";

type CardProps = {
  title: string;
  image?: { url: string; className?: string };
  actions?: ReactNode;
  className?: string;
};

const Card = ({
  children,
  title,
  image,
  actions,
  className,
}: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={cn(
        "bg-paper max-w-sm rounded-default overflow-hidden",
        className
      )}
    >
      {image && (
        <img
          className={cn("w-full", image.className)}
          src={image?.url}
          alt="Sunset in the mountains"
        />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-h4 mb-2">{title}</div>
        {children}
      </div>
      {actions && <div className="px-6 pt-4 pb-2">{actions}</div>}
    </div>
  );
};

export default Card;
