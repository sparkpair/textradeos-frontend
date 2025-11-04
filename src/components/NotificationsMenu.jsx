import { Bell } from "lucide-react";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";

export default function NotificationMenu() {
  return (
    <Dropdown title="Notifications" icon={<Bell size={20} />}>
      <div className="px-3 py-1.5 hover:bg-[#127475]/15 rounded-lg cursor-pointer">
        Hello
      </div>
      <div className="px-3 py-1.5 hover:bg-[#127475]/15 rounded-lg cursor-pointer">
        Hello
      </div>
      <div className="px-3 py-1.5 hover:bg-[#127475]/15 rounded-lg cursor-pointer">
        Hello
      </div>
    </Dropdown>
  );
}