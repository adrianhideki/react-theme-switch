import { colorScaleValuesTokens } from "@token/colors/types";

/**
 * Calculates whether black or white has better contrast with the given background color.
 * @param hexColor - The background color in hex format (e.g. "#ffffff" or "#fff").
 * @returns "#000000" for black or "#ffffff" for white.
 */
export function getContrastColor(hexColor: string): "#000000" | "#ffffff" {
  // Remove hash if present
  let hex = hexColor.replace(/^#/, "");
  // Expand shorthand form (e.g. "fff") to full form ("ffffff")
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }
  if (hex.length !== 6) return "#000000"; // fallback

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light backgrounds, white for dark backgrounds
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

/**
 * Generates a color scale (shades) from a base hex color.
 * Returns an object with keys 100, 200, ..., 1200.
 * Uses HSL lightness to generate the scale.
 * @param hex - The base color in hex format (e.g. "#3498db")
 */
export function generateColorScale(hex: string): Record<number, string> {
  // Helper: hex to RGB
  function hexToRgb(hex: string) {
    let h = hex.replace(/^#/, "");
    if (h.length === 3)
      h = h
        .split("")
        .map((x) => x + x)
        .join("");
    const num = parseInt(h, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }

  // Helper: RGB to HSL
  function rgbToHsl({ r, g, b }: { r: number; g: number; b: number }) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0;

    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, l };
  }

  // Helper: HSL to hex
  function hslToHex(h: number, s: number, l: number) {
    let r: number, g: number, b: number;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (x: number) => {
      const hex = Math.round(x * 255)
        .toString(16)
        .padStart(2, "0");
      return hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  const rgb = hexToRgb(hex);
  const { h, s } = rgbToHsl(rgb);

  // Lightness values for 100-1200 (customizable)
  const scaleKeys = colorScaleValuesTokens;
  // Example: lightest (100) to darkest (1200)
  const lightnesses = scaleKeys.map(
    (_, index) => ((scaleKeys.length - (index + 1)) * 100) / scaleKeys.length / 100
  );

  const scale: Record<number, string> = {};
  scaleKeys.forEach((key, i) => {
    scale[key] = hslToHex(h, s, lightnesses[i]);
  });

  return scale;
}
