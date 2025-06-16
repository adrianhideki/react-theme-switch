import { TokenContext } from "@token/context/token-context";
import type { PartialTheme, Theme } from "@token/theme";
import { defaultTheme } from "@token/theme/defaultTheme";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { deepMerge } from "./utils";
import { transformTheme } from "@token/theme/transformTheme";

type ThemeProviderProps = {
  theme?: PartialTheme;
};

const TokenProvider = ({
  children,
  theme: inputTheme,
}: PropsWithChildren<ThemeProviderProps>) => {
  const [theme, setTheme] = useState<Theme>(
    deepMerge<Theme>(defaultTheme, inputTheme ?? defaultTheme)
  );

  const handleUpdateTheme = useCallback(
    (value: PartialTheme) => {
      if (value?.id === theme?.id) {
        return;
      }

      setTheme(value as Theme);
      console.log("name", value.name);
    },
    [theme?.id]
  );

  useEffect(() => {
    if (inputTheme) {
      setTheme(deepMerge<Theme>(defaultTheme, inputTheme));
    }
  }, [inputTheme]);

  const transformedTheme = useMemo(() => transformTheme(theme), [theme]);

  return (
    <TokenContext.Provider
      value={{
        theme: transformedTheme,
        referenceTheme: theme,
        updateTheme: handleUpdateTheme,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
