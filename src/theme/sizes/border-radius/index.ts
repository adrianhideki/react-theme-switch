import type { DimensionValues } from "../dimensions/types";
import type { BorderRadiusValues } from "./types";

export const borderRadius: Record<BorderRadiusValues, DimensionValues> = {
  none: 0,
  "3xs": 50,
  "2xs": 100,
  xs: 150,
  sm: 200,
  md: 300,
  lg: 400,
  xl: 500,
  "2xl": 600,
  "3xl": 700,
  "4xl": 800,
  pill: 1900,
};
