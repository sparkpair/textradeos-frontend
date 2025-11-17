// components/DetailItem.jsx

export default function DetailItem({ label, value, chip }) {
  return (
    <div className="flex justify-between border-b border-gray-100 py-2">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      {chip ? (
        <span
          className={`inline-block px-3 py-1 rounded-xl text-sm font-medium ${
            chip === 'green' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {value}
        </span>
      ) : (
        <span className="text-sm font-semibold text-gray-800">{value}</span>
      )}
    </div>
  );
}
