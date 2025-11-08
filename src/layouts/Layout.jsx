import { Outlet } from "react-router-dom";
import MainMenu from "../components/MainMenu";
import ProfileMenu from "../components/ProfileMenu";
import NotificationsMenu from "../components/NotificationsMenu";
import Notifications from "../components/Notifications";

export default function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col bg-[#eef5f5] overflow-hidden">
      {/* <h1 className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-[8rem] blur-xs font-medium tracking-wide z-0 opacity-25 text-[#127475] pointer-events-none">TexTradeOS</h1> */}
      {/* 🔹 Main Content */}
      <div className="p-5 h-full">
        {children || <Outlet />}
      </div>
      <div className="fixed bottom-0 left-0 p-8 pt-0 flex justify-between w-full">
        <MainMenu />

        <Notifications />

        <div className="flex gap-2">
          <NotificationsMenu />
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}