import { Outlet } from "react-router-dom";
import MainMenu from "../components/MainMenu";
import ProfileMenu from "../components/ProfileMenu";
import NotificationsMenu from "../components/NotificationsMenu";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#eef5f5]">
      <h1 className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-9xl font-medium tracking-wide z-0 opacity-25 text-[#127475] pointer-events-none">TexTradeOS</h1>
      {/* 🔹 Main Content */}
      <div className="flex-1 p-6">
        {children || <Outlet />}
      </div>
      <div className="fixed bottom-0 left-0 p-5 flex justify-between w-full">
        {/* <AppLogo /> */}
        <MainMenu />

        <div className="flex gap-2">
          <NotificationsMenu />
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}