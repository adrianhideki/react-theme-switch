import Navbar from "@components/navbar";
import type { PropsWithChildren } from "react";

const Page = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full bg-background text-text">
      <Navbar />
      <div className="container m-auto flex flex-col gap-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Page;
