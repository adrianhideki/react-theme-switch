import type { PropsWithChildren } from "react";
import { MdClose } from "react-icons/md";
import IconButton from "@components/icon-button";
import Typography from "@components/typography";
import { useTheme } from "@theme/hook/use-theme";

type DrawerProps = {
  open: boolean;
  onOpenChange: (e: boolean) => void;
};

const Drawer = ({
  open,
  onOpenChange,
  children,
}: PropsWithChildren<DrawerProps>) => {
  const { theme } = useTheme();

  const handleCloseClick = () => {
    onOpenChange(false);
  };

  return (
    <div
      className={`relative z-10 transition-all ${open ? "w-full" : "w-0"}`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {open && (
        <div
          className={`fixed inset-y-0 right-0 bg-gray-950/75 transition-all ${
            open ? "w-full" : "w-full"
          }`}
          onClick={handleCloseClick}
        ></div>
      )}
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
        <div
          className={`pointer-events-auto relative w-screen transition-all ${
            open ? "max-w-md" : "max-w-0"
          }`}
        >
          <div className="flex h-full flex-col overflow-y-auto bg-background py-6 shadow-xl">
            <div className="px-4 sm:px-6 flex justify-between">
              <Typography variant="h2">React Theme Switcher</Typography>
              <IconButton
                icon={<MdClose size={theme.size.spacing?.md} />}
                onClick={handleCloseClick}
              />
            </div>
            <div className="relative mt-6 flex-1 px-4 sm:px-6 flex flex-col gap-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
