import { ModeContext } from "@context/ModeContext";
import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { getIsDarkMode } from "theme-token-manager/theme";

const ModeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<"dark" | "light">(
    getIsDarkMode() ? "dark" : "light"
  );

  useEffect(() => {
    localStorage.setItem("mode", mode);

    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const handleToggle = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ModeContext.Provider value={{ mode, toggle: handleToggle }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
