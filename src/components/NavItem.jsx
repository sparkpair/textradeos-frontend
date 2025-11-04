export default function NavItem({ icon, label, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full py-2.5 px-3.5 rounded-xl text-sm flex items-center gap-2.5
        ${
          active
            ? "bg-[#127475] text-[#fcffff] hover:bg-[#0c5f60]"
            : "hover:bg-[#d3f0f0] text-gray-700"
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
