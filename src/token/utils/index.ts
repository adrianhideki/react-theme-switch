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
