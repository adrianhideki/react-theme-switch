import Navbar from "@components/navbar";
import type { PropsWithChildren } from "react";

const Page = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full min-h-screen bg-surface-page text-text-default-body pb-2">
      <Navbar />
      <div className="container m-auto flex flex-col gap-4 overflow-y-auto p-2">
        {children}
      </div>
    </div>
  );
};

export default Page;
