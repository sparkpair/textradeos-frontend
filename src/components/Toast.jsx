"use client";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";

const icons = {
  success: <CheckCircle2 className="text-green-500" size={19} />,
  error: <XCircle className="text-red-500" size={19} />,
  info: <Info className="text-blue-500" size={19} />,
  warning: <AlertTriangle className="text-yellow-500" size={19} />,
};

const bgStyles = {
  success: "bg-green-100 border border-green-200",
  error: "bg-red-100 border border-red-200",
  info: "bg-blue-100 border border-blue-200",
  warning: "bg-yellow-100 border border-yellow-200",
};

const iconStyle = {
  success: "bg-green-200",
  error: "bg-red-200",
  info: "bg-blue-200",
  warning: "bg-yellow-200",
};

export default function Toast({ message, type = "info" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`shadow-md rounded-2xl p-0.5 flex items-center w-fit max-w-sm ${bgStyles[type]}`}
    >
      <div className={`${iconStyle[type]} p-2 rounded-xl`}>
        {icons[type]}
      </div>
      <div className="text-sm text-gray-700 tracking-wide ms-2.5 me-3.5">
        {message}
      </div>
    </motion.div>
  );
}
