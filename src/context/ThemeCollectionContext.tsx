import { useTheme } from "@hooks/useTheme";
import { defaultTheme } from "@theme/index";
import type { Theme } from "@theme/types";
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

type ThemeCollectionContextValues = {
  themes: Array<Theme>;
  addTheme: (theme: Theme) => void;
  updateTheme: (theme: Theme) => void;
  updateCurrentTheme: (index: number) => void;
  deleteTheme: (index: number) => void;
  currentTheme: number;
};

export const ThemeCollectionContext = createContext(
  {} as ThemeCollectionContextValues
);

const ThemeCollectionProvider = ({ children }: PropsWithChildren) => {
  const { updateTheme } = useTheme();
  const [themes, setThemes] = useState(
    !!localStorage.getItem("themes")
      ? (JSON.parse(localStorage.getItem("themes")!) as Theme[])
      : [defaultTheme]
  );
  const [currentTheme, setCurrentTheme] = useState(
    Number(localStorage.getItem("currentTheme") ?? 0)
  );

  useEffect(() => {
    updateTheme(themes[currentTheme]);
    localStorage.setItem("currentTheme", String(currentTheme));
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem("themes", JSON.stringify(themes));
  }, [themes]);

  const handleAddTheme = useCallback(
    (theme: Theme) => setThemes((prev) => [...prev, theme]),
    [themes]
  );

  const handleDelete = useCallback(
    (index: number) => {
      setThemes((prev) => [...prev.filter((_, i) => i !== index)]);
      setCurrentTheme(0);
    },
    [themes]
  );

  const handleUpdate = useCallback(
    (theme: Theme) => {
      setThemes((prev) => {
        return [
          ...prev.filter((_, i) => i < currentTheme),
          theme,
          ...prev.filter((_, i) => i > currentTheme),
        ];
      });

      updateTheme(theme);
    },
    [themes]
  );

  const handleUpdateCurrentTheme = useCallback(
    (index: number) => {
      setCurrentTheme(index);
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
