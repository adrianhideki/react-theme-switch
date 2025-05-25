import Drawer from "@components/drawer";
import { useTheme } from "@hooks/useTheme";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
  const { mode, toggleMode, getSpacing } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="top-0 right-0 left-0 w-full min-h-8 bg-primary mb-2 p-2 flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center flex-1">
          <FaBars
            onClick={() => {
              setOpen(true);
            }}
            size={getSpacing(3)}
          />
          <span className="text-primary-contrast text-h2">
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
      <Drawer open={open} onOpenChange={(v) => setOpen(v)} />
    </>
  );
};

export default Navbar;
