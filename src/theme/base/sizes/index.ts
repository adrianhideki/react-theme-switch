import { borderRadius } from "./border-radius";
import type { BorderRadiusValues } from "./border-radius/types";
import { borderWidth } from "./border-width";
import type { BorderWidthValues } from "./border-width/types";
import { dimensions } from "./dimensions";
import type { DimensionValues } from "./dimensions/types";
import { spacing } from "./spacing";
import type { SpacingValues } from "./spacing/types";

export default {
  dimensions,
  borderWidth,
  borderRadius,
  spacing,
};

export type {
  DimensionValues,
  BorderWidthValues,
  BorderRadiusValues,
  SpacingValues,
};
