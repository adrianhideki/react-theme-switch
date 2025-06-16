import Drawer from "@components/drawer";
import { useMode } from "@hooks/useMode";
import { useToken } from "@token/hook/use-token";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { toggle, mode } = useMode();
  const { theme } = useToken();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfigureTokenClick = () => {
    navigate("/token-config");
  };

  const handleConfigureThemeClick = () => {
    navigate("/theme-config");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="top-0 right-0 left-0 w-full min-h-8 bg-primary mb-2 p-2 flex gap-2 justify-between items-center text-primary-contrast">
        <div className="flex gap-2 items-center flex-1">
          <FaBars
            className="cursor-pointer transition-all"
            onClick={() => {
              setOpen(true);
            }}
            size={theme.size.spacing?.md}
          />
          <span
            className="text-primary-contrast text-h2 cursor-pointer"
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
        <a
          className="text-text cursor-pointer flex w-full transition-all hover:text-secondary"
          onClick={handleConfigureTokenClick}
        >
          Configure token
        </a>
      </Drawer>
    </>
  );
};

export default Navbar;
