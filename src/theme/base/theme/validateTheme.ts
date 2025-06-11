import type { Theme } from ".";

/**
 * Validates that the theme object's color, font, size, and palette properties
 * reference valid keys and structures defined in the base property.
 * Returns an array of error messages, or an empty array if valid.
 */
export function validateTheme(theme: Theme) {
  const errors: string[] = [];

  // Helper to check if a value exists in an object
  const hasKey = (obj: object, key: string) =>
    Object.prototype.hasOwnProperty.call(obj, key);

  // Validate color keys
  if (theme.color && theme.base?.color) {
    const collection = theme.base.color.collection || {};
    const foundations = theme.base.color.foundations || {};
    Object.entries(theme.color).forEach(([key, value]) => {
      if (
        typeof value === "string" &&
        !hasKey(collection, value) &&
        !hasKey(foundations, value)
      ) {
        errors.push(`color.${key} references unknown color "${value}"`);
      }
    });
  }

  // Validate font keys
  if (theme.font && theme.base?.font) {
    const families = theme.base.font.family || {};
    Object.entries(theme.font.family || {}).forEach(([key, value]) => {
      if (typeof value === "string" && !hasKey(families, value)) {
        errors.push(`font.family.${key} references unknown family "${value}"`);
      }
    });
    // You can add similar checks for spacing, height, size, etc.
  }

  // Validate size keys
  if (theme.size && theme.base?.size) {
    const dimensions = theme.base.size.dimension || {};
    // Example: check if spacing values exist in dimensions
    Object.entries(theme.size.spacing || {}).forEach(([key, value]) => {
      if (typeof value === "string" && !hasKey(dimensions, value)) {
        errors.push(
          `size.spacing.${key} references unknown dimension "${value}"`
        );
      }
    });
    // Add more checks for border, radius, etc. as needed
  }

  // Validate palette color references
  function validatePalette(palette: object, path: string[] = []) {
    if (typeof palette !== "object" || palette === null) return;
    Object.entries(palette).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null && "color" in value) {
        const colorRef = value.color as string;
        if (
          colorRef &&
          !hasKey(theme.color || {}, colorRef) &&
          !hasKey(theme.base?.color!.collection || {}, colorRef) &&
          !hasKey(theme.base?.color!.foundations || {}, colorRef)
        ) {
          errors.push(
            `palette.${[...path, key].join(".")}.color references unknown color "${colorRef}"`
          );
        }
      } else if (typeof value === "object" && value !== null) {
        validatePalette(value, [...path, key]);
      }
    });
  }
  if (theme.palette) {
    validatePalette(theme.palette);
  }

  return { isValid: errors.length === 0, errors };
}
