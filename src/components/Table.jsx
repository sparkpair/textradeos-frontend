// Table.jsx
import React, { useState, useEffect } from "react";

export default function Table({
  columns = [],
  data = [],
  onRowClick,
  contextMenuItems = [], // [{ label: "Edit", onClick: (row) => {} }]
  emptyText = "No records found.",
}) {
  const [contextMenu, setContextMenu] = useState(null);

  const handleRightClick = (e, row) => {
    e.preventDefault();
    if (contextMenuItems.length === 0) return;
    setContextMenu({ x: e.pageX, y: e.pageY, row });
  };

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const gridTemplateColumns = columns.map(col => col.width || "1fr").join(" ");

  return (
    <div className="relative border border-gray-300 rounded-2xl p-1 shadow-sm grid grid-rows-[auto_1fr] overflow-hidden text-nowrap">
      {/* Header */}
      <div
        className="grid bg-[#127475] text-white rounded-xl px-4 py-1.5"
        style={{ gridTemplateColumns }}
      >
        {columns.map((col, idx) => (
          <div key={idx} className={col.className || ""}>
            {col.label}
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="overflow-y-auto pb-12">
        {data.length === 0 ? (
          <div className="p-6 text-center text-gray-500">{emptyText}</div>
        ) : (
          data.map((row, rowIndex) => (
            <div
              key={row._id || row.id || rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              onContextMenu={(e) => handleRightClick(e, row)}
              className="grid border-b border-gray-300 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              style={{ gridTemplateColumns }}
            >
              {columns.map((col, colIndex) => (
                <div key={colIndex}>
                  {typeof col.render === "function"
                    ? col.render(row, rowIndex)
                    : row[col.field]}
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="absolute z-50 bg-white border border-gray-300 rounded-md shadow-lg w-44 py-1"
        >
          {contextMenuItems.map((item, idx) => (
            <button
              key={idx}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                item.danger ? "text-red-600" : ""
              }`}
              onClick={() => {
                item.onClick(contextMenu.row);
                setContextMenu(null);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
