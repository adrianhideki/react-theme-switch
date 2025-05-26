import Drawer from "@components/drawer";
import { useTheme } from "@hooks/useTheme";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { mode, toggleMode, getSpacing } = useTheme();
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
      <div className="top-0 right-0 left-0 w-full min-h-8 bg-primary mb-2 p-2 flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center flex-1">
          <FaBars
            className="cursor-pointer transition-all"
            onClick={() => {
              setOpen(true);
            }}
            size={getSpacing(3)}
          />
          <span
            className="text-primary-contrast text-h2 cursor-pointer"
            onClick={handleHomeClick}
          >
            React Theme Switcher
          </span>
        </div>
        <div className="cursor-pointer" onClick={toggleMode}>
          {mode === "dark" ? (
            <FaMoon size={getSpacing(3)} />
          ) : (
            <FaSun size={getSpacing(3)} />
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
