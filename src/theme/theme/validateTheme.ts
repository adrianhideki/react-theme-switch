import type { Theme } from "./types";

/**
 * Validates that the theme object's color, font, size, and palette properties
 * reference valid keys and structures defined in the base property.
 * Returns an array of error messages, or an empty array if valid.
 */
export function validateTheme(theme: Theme) {
  const errors: string[] = [];

  const colorCollection = Object.keys(theme?.base?.color?.collection || {});
  const colorFoundations = Object.keys(
    theme?.base?.color?.foundations || {}
  ).map((item) => `foundation.${item}`);
  const colorTheme = Object.keys(theme?.color || {});

  const allColors = [...colorCollection, ...colorFoundations, ...colorTheme];

  // Helper to check if a value exists in an object
  const hasKey = (obj: object, key: string) =>
    Object.prototype.hasOwnProperty.call(obj, key);

  const validatePropertyValue = (
    object: object,
    possibleValues: Array<string>,
    errorCallback: (key: string, value: string) => string
  ) => {
    Object.entries(object || {}).forEach(([key, value]) => {
      if (
        typeof value === "string" &&
        !possibleValues.some((v) => v === value)
      ) {
        errors.push(errorCallback(key, value));
      }
    });
  };

  // Validate color keys
  if (theme.color && theme.base?.color) {
    validatePropertyValue(
      theme.color,
      [...colorCollection, ...colorFoundations],
      (key, value) => `color.${key} references unknown color "${value}"`
    );
  }

  if (theme.font && theme.base?.font) {
    validatePropertyValue(
      theme.font.family,
      Object.keys(theme.base.font.family || {}),
      (key, value) => `font.family.${key} references unknown family "${value}"`
    );
  }

  if (theme.font && theme.base?.font) {
    validatePropertyValue(
      theme.font.size,
      Object.keys(theme.base.font.size || {}),
      (key, value) => `font.size.${key} references unknown size "${value}"`
    );
  }

  if (theme.font && theme.base?.font) {
    validatePropertyValue(
      theme.font.height,
      Object.keys(theme.base.font.height || {}),
      (key, value) => `font.height.${key} references unknown height "${value}"`
    );
  }

  if (theme.font && theme.base?.font) {
    validatePropertyValue(
      theme.font.spacing,
      Object.keys(theme.base.font.spacing || {}),
      (key, value) =>
        `font.spacing.${key} references unknown spacing "${value}"`
    );
  }

  if (theme.size && theme.base?.size) {
    const dimensions = theme.base.size.dimension || {};
    Object.entries(theme.size.spacing || {}).forEach(([key, value]) => {
      if (typeof value === "string" && !hasKey(dimensions, value)) {
        errors.push(
          `size.spacing.${key} references unknown dimension "${value}"`
        );
      }
    });
  }

  function validatePalette(palette: object, path: string[] = []) {
    if (typeof palette !== "object" || palette === null) return;

    Object.entries(palette).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null && "color" in value) {
        const colorRef = value.color as string;

        if (!allColors.some((v) => v === colorRef)) {
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
