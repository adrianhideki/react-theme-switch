import { useToken } from "@token/hook/use-token";
import { defaultTheme } from "@token/theme/defaultTheme";
import type { Theme } from "@token/theme";
import { TokenCollectionContext } from "@token/context/token-collection";
import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

const TokenCollectionProvider = ({ children }: PropsWithChildren) => {
  const { updateTheme } = useToken();
  const [themes, setThemes] = useState(
    localStorage.getItem("tokens")
      ? (JSON.parse(localStorage.getItem("tokens")!) as Theme[])
      : [{ ...defaultTheme, id: "default", name: "default" }]
  );
  const [currentTheme, setCurrentTheme] = useState(
    String(localStorage.getItem("currentToken") ?? themes[0].id)
  );

  useEffect(() => {
    const theme = themes.find((theme) => theme.id === currentTheme);

    if (theme) {
      updateTheme(theme);
    }
  }, [themes, updateTheme, currentTheme]);

  useEffect(() => {
    localStorage.setItem("tokens", JSON.stringify(themes));
  }, [themes]);

  useEffect(() => {
    localStorage.setItem("currentToken", String(currentTheme));
  }, [currentTheme]);

  const handleAddTheme = useCallback(
    (theme: Theme) => setThemes((prev) => [...prev, theme]),
    []
  );

  const handleDelete = useCallback(
    (id: string) => {
      setThemes((prev) => [...prev.filter((t) => t.id !== id)]);

      const theme = themes.find((t) => t.id !== id);

      if (theme) {
        setCurrentTheme(theme.id!);
      }
    },
    [themes]
  );

  const handleUpdate = useCallback(
    (theme: Theme) => {
      setThemes((prev) =>
        prev.map((item) => {
          if (item.id === theme.id) {
            return theme;
          }

          return item;
        })
      );

      updateTheme(theme);
    },
    [updateTheme]
  );

  const handleUpdateCurrentTheme = useCallback(
    (id: string) => {
      setCurrentTheme(id);
    },
    [setCurrentTheme]
  );

  return (
    <TokenCollectionContext.Provider
      value={{
        themes,
        addTheme: handleAddTheme,
        updateCurrentTheme: handleUpdateCurrentTheme,
        deleteTheme: handleDelete,
        updateTheme: handleUpdate,
        currentTheme,
      }}
    >
      {children}
    </TokenCollectionContext.Provider>
  );
};

export default TokenCollectionProvider;
