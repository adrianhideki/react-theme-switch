import type { ReactNode } from "react";
import React from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle"
  | "subtitle-secondary"
  | "body"
  | "body-secondary"
  | "button"
  | "caption";

type TypographyProps = {
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
};

const getElement = (variant: TypographyVariant) => {
  const elements: Record<TypographyVariant, string> = {
    body: "p",
    "body-secondary": "p",
    subtitle: "span",
    "subtitle-secondary": "span",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    button: "span",
    caption: "span",
  };

  return elements[variant];
};

const Typography = React.memo(
  ({ variant = "body", children, ...props }: TypographyProps) => {
    const enhancedProps = {
      ...props,
      className: `text-${variant} font-${variant} font-w${variant} ${
        props.className ?? ""
      }`,
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
