import { Outlet } from "react-router-dom";
import MainMenu from "../components/MainMenu";
import ProfileMenu from "../components/ProfileMenu";
import NotificationsMenu from "../components/NotificationsMenu";
<<<<<<< HEAD
import Button from "../components/Button";
import { Building2, Truck, Users } from "lucide-react";
=======
import Notifications from "../components/Notifications";
>>>>>>> 2357d1bd62e49def094c910ef51da08bf57d130b

export default function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col bg-[#eef5f5] overflow-hidden relative">
      {/* 🔹 Main Content */}
      <div className="p-5 h-full overflow-y-auto">{children || <Outlet />}</div>

<<<<<<< HEAD
      {/* 🔹 Floating Bottom Bar */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-between space-x-1 bg-[#f8fbfb] shadow-md border border-gray-300 p-1 rounded-2xl">
        <Button
          variant="normal-btn"
          onClick={() => setOpen(true)}
          Icon="Menu"
        />

        {/* 🔹 Separator */}
        <div className="w-px h-5 bg-gray-300" />

        <Button
          variant="normal-btn"
          onClick={() => setOpen(true)}
          Icon="LayoutDashboard"
        />
        <Button
          variant="normal-btn"
          onClick={() => setOpen(true)}
          Icon="Building2"
        />
        <Button
          variant="normal-btn"
          onClick={() => setOpen(true)}
          Icon="Users"
        />

        {/* 🔹 Separator */}
        <div className="w-px h-5 bg-gray-300" />

        <Button
          variant="normal-btn"
          onClick={() => setOpen(true)}
          Icon="Bell"
        />
        <Button
          variant="normal-btn"
          onClick={() => setOpen(true)}
          Icon="User"
        />
=======
        <Notifications />

        <div className="flex gap-2">
          <NotificationsMenu />
          <ProfileMenu />
        </div>
>>>>>>> 2357d1bd62e49def094c910ef51da08bf57d130b
      </div>
    </div>
  );
}
