import { ReactNode } from "react";
import AuthNavBar from "./AuthNavBar";
import SideMenu from "./SideMenu";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <AuthNavBar />

      <div className="flex min-h-screen z-0">
        <div
          className="transform translate-x-[-1000%] lg:transform-none fixed h-screen w-[13.275rem] z-0 transition-transform duration-300 overflow-hidden bg-white px-5 border-r-[0.25px]"
          id="side-menu"
        >
          <div className="flex h-full justify-between flex-col">
            <SideMenu />
          </div>
        </div>
        <div className="flex-1 overflow-x-auto ml-0 lg:ml-[13.275rem] px-4 lg:px-8 mt-28 mb-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
