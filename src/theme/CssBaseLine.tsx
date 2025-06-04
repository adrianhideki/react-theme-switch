import { useTheme } from "@hooks/useTheme";
import { useEffect } from "react";
import { injectCssColors, injectCssConfig, injectCssFonts } from "./utils";

/**
 * CssBaseLine
 * Component that injects all css needed from theme
 */
const CssBaseLine = () => {
  const { theme } = useTheme();

  useEffect(() => {
    injectCssColors(theme);
    injectCssFonts(theme);
    injectCssConfig(theme);
  }, [theme]);
  return <></>;
};

export default CssBaseLine;
