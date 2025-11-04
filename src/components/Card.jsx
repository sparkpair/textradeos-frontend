import { motion } from "framer-motion";

export default function Card({ title, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl border border-gray-300 overflow-hidden mx-auto ${className}`}
    >
      {title && (
        <div className="w-full p-1">
          <div className="text-center text-white py-1 rounded-xl bg-[#055F6E]">{title}</div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </motion.div>
  );
}
