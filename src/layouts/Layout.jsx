import { Outlet } from "react-router-dom";
import MainMenu from "../components/MainMenu";
import ProfileMenu from "../components/ProfileMenu";
import NotificationsMenu from "../components/NotificationsMenu";

export default function Layout({ children }) {
  return (
    <div className="h-screen grid grid-rows-[1fr_auto] bg-[#eef5f5] p-5 gap-5">
      {/* 🔹 Main Content Area (fills remaining space) */}
      <div className="overflow-auto">
        {children || <Outlet />}
      </div>

      {/* 🔹 Bottom Menu (fits content) */}
      <div className="flex justify-between w-full">
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