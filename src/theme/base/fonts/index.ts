import { family } from "./family";
import type { FontFamily } from "./family/types";
import { height } from "./height";
import type { FontHeight } from "./height/types";
import { spacing } from "./spacing";
import type { FontSpacing } from "./spacing/types";
import { paragraphSpacing } from "./paragraph-spacing";
import type { FontParagraphSpacing } from "./paragraph-spacing/types";
import { size } from "./size";
import type { FontSize } from "./size/types";
import { weight } from "./weight";
import type { FontWeight } from "./weight/types";

export default {
  size,
  weight,
  family,
  spacing,
  paragraphSpacing,
  height,
};

export type {
  FontSize,
  FontWeight,
  FontParagraphSpacing,
  FontSpacing,
  FontFamily,
  FontHeight,
};
