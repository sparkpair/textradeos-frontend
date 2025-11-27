import React, { useState, useEffect } from "react";
import Button from "./Button";

export default function Table({
  columns = [],
  data = [],
  onRowClick,
  contextMenuItems = [],
  emptyText = "No records found.",
  loading = false,
  height = "auto",
  bottomGap = true,
  size = "normal",
  bottomButtonOnclick = null,
  bottomButtonIcon = null,
}) {
  const [contextMenu, setContextMenu] = useState(null);

  // NEW: Sorting State
  const [sortConfig, setSortConfig] = useState({ field: null, direction: null });

  // Sorting Handler
  const handleSort = (col) => {
    if (!col.field) return;

    let direction = "asc";

    if (sortConfig.field === col.field && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.field === col.field && sortConfig.direction === "desc") {
      direction = null; // remove sorting
    }

    setSortConfig({ field: col.field, direction });
  };

  // Apply Sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig.field || !sortConfig.direction) return data;

    const sorted = [...data].sort((a, b) => {
      const valA = a[sortConfig.field];
      const valB = b[sortConfig.field];

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortConfig]);

  // Context Menu Logic
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

  const getAlignClass = (align) => {
    switch (align) {
      case "center": return "text-center justify-center";
      case "right": return "text-right justify-end";
      default: return "text-left justify-start";
    }
  };

  const getMiddleAlignClass = (align) => {
    switch (align) {
      case "center": return "flex items-center";
      case "right": return "flex items-right";
      default: return "flex items-left";
    }
  };

  return (
    <div
      className={`relative border border-gray-300 p-1 shadow-sm grid grid-rows-[auto_1fr] overflow-hidden text-nowrap bg-white ${size === "xs" ? "text-xs rounded-xl" : "rounded-2xl"}`}
      style={{ height }}
    >
      {/* HEADER */}
      <div
        className={`grid bg-[#127475] text-white ${size === "xs" ? "px-2.5 py-1.5 rounded-lg" : "px-4 py-2 rounded-xl"} font-semibold`}
        style={{ gridTemplateColumns }}
      >
        {columns.map((col, idx) => {
          const isSorted = sortConfig.field === col.field;
          const direction = sortConfig.direction;

          return (
            <div
              key={idx}
              onClick={() => handleSort(col)}
              className={`truncate cursor-pointer select-none flex gap-1 ${getAlignClass(col.align)} ${getMiddleAlignClass(col.middleAlign)} ${col.className || ""}`}
            >
              {col.label}

              {/* Sorting Icons */}
              {col.field && (
                <span>
                  {isSorted && direction === "asc" && "▲"}
                  {isSorted && direction === "desc" && "▼"}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* BODY */}
      <div className={`overflow-y-auto max-h-[70vh] ${bottomGap ? "pb-12" : ""}`}>
        {loading ? (
          <div className="p-6 text-center text-gray-500 animate-pulse">Loading...</div>
        ) : sortedData.length === 0 ? (
          <div className="p-6 text-center text-gray-500">{emptyText}</div>
        ) : (
          sortedData.map((row, rowIndex) => (
            <div
              key={row._id || row.id || rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              onContextMenu={(e) => handleRightClick(e, row)}
              className={`grid border-b ${bottomGap ? "" : "last:border-b-0"} border-gray-200 ${size === "xs" ? "px-2.5 py-1.5" : "px-4 py-2"} hover:bg-gray-100 cursor-pointer transition-colors`}
              style={{ gridTemplateColumns }}
            >
              {columns.map((col, colIndex) => (
                <div
                  key={colIndex}
                  className={`truncate ${getAlignClass(col.align)} ${getMiddleAlignClass(col.middleAlign)} ${col.className || ""}`}
                >
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
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${item.danger ? "text-red-600 font-medium" : "text-gray-800"}`}
              onClick={() => { item.onClick(contextMenu.row); setContextMenu(null); }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {bottomButtonOnclick && (
        <Button variant="border-btn" className="absolute bottom-4 right-4" onClick={bottomButtonOnclick}>
          {bottomButtonIcon}
        </Button>
      )}
    </div>
  );
}
