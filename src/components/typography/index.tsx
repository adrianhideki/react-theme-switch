import type { ReactNode } from "react";
import React from "react";
import cn from "classnames";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "hyperlink"
  | "hyperlinkHover"
  | "body"
  | "bodyShort"
  | "bodyLong"
  | "label"
  | "labelLong"
  | "caption";

type TypographyProps = {
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
};

const getElement = (variant: TypographyVariant) => {
  const elements: Record<TypographyVariant, string> = {
    body: "p",
    bodyShort: "p",
    bodyLong: "p",
    hyperlink: "span",
    hyperlinkHover: "span",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    label: "span",
    labelLong: "span",
    caption: "span",
  };

  return elements[variant];
};

const Typography = React.memo(
  ({ variant = "body", children, ...props }: TypographyProps) => {
    const enhancedProps = {
      ...props,
      className: cn(
        `text-${variant}`,
        `font-${variant}`,
        `font-family-${variant}`,
        `font-weight-${variant}`,
        `tracking-${variant}`,
        `${props.className ?? ""}`
      ),
    };

    const element = React.createElement(
      getElement(variant),
      enhancedProps,
      children
    );

    return element;
  }
);

export default Typography;
