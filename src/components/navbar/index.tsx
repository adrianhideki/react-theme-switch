import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router";
import cn from "classnames";
import Drawer from "@components/drawer";
import { useMode } from "@hooks/useMode";
import { useTheme } from "@theme/hook/use-theme";

const Navbar = () => {
  const { toggle, mode } = useMode();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfigureThemeClick = () => {
    navigate("/theme-config");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className={cn(
          "top-0",
          "right-0",
          "left-0",
          "w-full",
          "min-h-8",
          "bg-surface-primary-default",
          "mb-2",
          "p-2",
          "flex",
          "gap-2",
          "justify-between",
          "items-center"
        )}
      >
        <div className="flex gap-2 items-center flex-1">
          <FaBars
            className="cursor-pointer transition-all"
            onClick={() => {
              setOpen(true);
            }}
            size={theme.size.spacing?.md}
          />
          <span
            className="text-text-primary-default text-h2 cursor-pointer"
            onClick={handleHomeClick}
          >
            React Theme Switcher
          </span>
        </div>
        <div className="cursor-pointer" onClick={toggle}>
          {mode === "dark" ? (
            <FaSun size={theme.size.spacing?.md} />
          ) : (
            <FaMoon size={theme.size.spacing?.md} />
          )}
        </div>
      </div>
      <Drawer open={open} onOpenChange={(v) => setOpen(v)}>
        <a
          className="text-text cursor-pointer flex w-full transition-all hover:text-secondary"
          onClick={handleHomeClick}
        >
          Home
        </a>
        <a
          className="text-text cursor-pointer flex w-full transition-all hover:text-secondary"
          onClick={handleConfigureThemeClick}
        >
          Configure theme
        </a>
      </Drawer>
    </>
  );
};

export default Navbar;
