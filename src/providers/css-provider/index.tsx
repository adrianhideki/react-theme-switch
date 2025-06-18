import { useMode } from "@hooks/useMode";
import type { PropsWithChildren } from "react";
import { CssBaseline } from "theme-token-manager";

const CssProvider = ({ children }: PropsWithChildren) => {
  const { mode } = useMode();

  return <CssBaseline mode={mode}>{children}</CssBaseline>;
};

export default CssProvider;
