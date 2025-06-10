import { family } from "./family";
import type { FontFamily } from "./family/types";
import { letterSpacing } from "./letter-spacing";
import type { FontLetterSpacing } from "./letter-spacing/types";
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
  letterSpacing,
  paragraphSpacing,
};

export type {
  FontSize,
  FontWeight,
  FontParagraphSpacing,
  FontLetterSpacing,
  FontFamily,
};
