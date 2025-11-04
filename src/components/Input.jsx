import { useRef } from "react";

export default function Input({ label, type, ...props }) {
  const inputRef = useRef(null);

  const handleFocus = (e) => {
    // Agar type date hai to picker khol do
    if (type === "date" && inputRef.current?.showPicker) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div>
      {label && <label className="block mb-1 text-gray-800">{label}</label>}
      <input
        {...props}
        ref={inputRef}
        type={type}
        onFocus={handleFocus}
        className="w-full bg-[#f8fbfb] border border-gray-300 rounded-xl ps-4 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#127475] text-gray-700"
      />
    </div>
  );
}
