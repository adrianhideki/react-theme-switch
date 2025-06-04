import { ThemeCollectionContext } from "@context/ThemeCollectionContext";
import { useTheme } from "@hooks/useTheme";
import { defaultTheme } from "@theme/index";
import type { Theme } from "@theme/types";
import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

const ThemeCollectionProvider = ({ children }: PropsWithChildren) => {
  const { updateTheme } = useTheme();
  const [themes, setThemes] = useState(
    localStorage.getItem("themes")
      ? (JSON.parse(localStorage.getItem("themes")!) as Theme[])
      : [defaultTheme]
  );
  const [currentTheme, setCurrentTheme] = useState(
    String(localStorage.getItem("currentTheme") ?? themes[0].id)
  );

  useEffect(() => {
    const theme = themes.find((theme) => theme.id === currentTheme);

    if (theme) {
      updateTheme(theme);
      localStorage.setItem("currentTheme", String(currentTheme));
    }
  }, [themes, updateTheme, currentTheme]);

  useEffect(() => {
    localStorage.setItem("themes", JSON.stringify(themes));
  }, [themes]);

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
    <ThemeCollectionContext.Provider
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
    </ThemeCollectionContext.Provider>
  );
};

export default ThemeCollectionProvider;
