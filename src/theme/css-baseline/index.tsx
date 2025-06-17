import { useMemo, type PropsWithChildren } from "react";
import { useMode } from "@hooks/useMode";
import { useTheme } from "@theme/hook/use-theme";
import { injectColorCss, injectFontCss, injectSpacingCss } from "@theme/utils";
import "./styles.css";

const CssBaseline = ({ children }: PropsWithChildren) => {
  const { mode } = useMode();
  const { theme } = useTheme();

  const colorCss = useMemo(() => injectColorCss(theme, mode), [theme, mode]);
  const fontCss = useMemo(() => injectFontCss(theme), [theme]);
  const spacingCss = useMemo(() => injectSpacingCss(theme), [theme]);

  return (
    <div
      style={{
        ...colorCss,
        ...fontCss,
        ...spacingCss,
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default CssBaseline;
