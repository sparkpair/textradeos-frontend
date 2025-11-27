import { useState } from "react";
import { formatAmount } from "../../utils";

export default function SalesChart({ data }) {
  const width = 800;
  const height = 300;
  const padding = 40;

  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 rounded-xl bg-gray-50 border border-dashed border-gray-300">
        No sales data available for the selected date range.
      </div>
    );
  }

  // --- 1. Data Scaling and Bounds ---
  const amounts = data.map(d => Number(d.amount) || 0);
  const minAmount = Math.min(...amounts) * 0.95;
  const maxAmount = Math.max(...amounts) * 1.05;
  const rangeAmount = maxAmount - minAmount || 1; // Avoid division by zero
  const avgAmount = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;

  const getX = (index) =>
    data.length > 1
      ? padding + (index / (data.length - 1)) * (width - 2 * padding)
      : width / 2; // Single point in middle

  const getY = (amount) =>
    height - padding - ((amount - minAmount) / rangeAmount) * (height - 2 * padding);

  // --- 2. SVG Paths ---
  const linePathData = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(Number(d.amount) || 0)}`)
    .join(" ");

  const areaPathData =
    linePathData +
    ` L ${getX(data.length - 1)} ${height - padding}` +
    ` L ${getX(0)} ${height - padding} Z`;

  const yAxisTicks = [minAmount, avgAmount, maxAmount].map((n) => ({
    value: n,
    y: getY(n),
  }));

  // --- 3. X-axis label interval ---
  let labelInterval = 1;
  if (data.length > 30) labelInterval = 5;
  else if (data.length > 15) labelInterval = 3;

  return (
    <div className="relative min-w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ minWidth: `${width}px` }}>
        {/* --- Gradients --- */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#127475", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: "#ffffff", stopOpacity: 0.1 }} />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#127475" />
            <stop offset="100%" stopColor="#127475" />
          </linearGradient>
        </defs>

        {/* --- Area Fill --- */}
        <path d={areaPathData} fill="url(#areaGradient)" />

        {/* --- Y-axis lines and labels --- */}
        {yAxisTicks.map((tick, index) => (
          <g key={index}>
            <line
              x1={padding}
              y1={tick.y}
              x2={width - padding}
              y2={tick.y}
              stroke={index === 1 ? "#127475" : "#e5e7eb"}
              strokeWidth={index === 1 ? "1.5" : "1"}
              strokeDasharray={index === 1 ? "5 5" : "0"}
              opacity={index === 0 || index === 2 ? 0.7 : 1}
            />
            <text x={padding - 10} y={tick.y + 4} fontSize="12" fill="#6b7280" textAnchor="end">
              {formatAmount(tick.value)}
            </text>
            {index === 1 && (
              <text x={width - padding - 5} y={tick.y - 6} fontSize="10" fill="#127475" textAnchor="end">
                Average
              </text>
            )}
          </g>
        ))}

        {/* --- Line Path --- */}
        <path d={linePathData} fill="none" stroke="url(#lineGradient)" strokeWidth="3.5" strokeLinecap="round" />

        {/* --- X-axis Labels and Points --- */}
        {data.map((d, i) => {
          const x = getX(i);
          const y = getY(Number(d.amount) || 0);
          const showLabel = i === 0 || i === data.length - 1 || (i % labelInterval === 0 && i !== 0);

          return (
            <g
              key={i}
              onMouseEnter={() => setHoveredDataPoint({ x, y, data: d })}
              onMouseLeave={() => setHoveredDataPoint(null)}
            >
              {showLabel && (
                <text x={x} y={height - padding + 15} fontSize="12" fill="#6b7280" textAnchor="middle">
                  {d.date?.substring(5).replace("-", "/")}
                </text>
              )}
              <circle
                cx={x}
                cy={y}
                r={hoveredDataPoint?.data?.date === d.date ? 6 : 4}
                fill="#127475"
                stroke="#fff"
                strokeWidth="2"
              />
            </g>
          );
        })}
      </svg>

      {/* --- Tooltip --- */}
      {hoveredDataPoint && (
        <div
          className="absolute z-50 p-2 bg-gray-800 text-gray-300 text-xs rounded-lg shadow-xl pointer-events-none text-nowrap"
          style={{
            left: `${hoveredDataPoint.x / width * 100}%`,
            top: `${hoveredDataPoint.y}px`,
            transform: "translate(-50%, -120%)",
          }}
        >
          <div className="font-semibold">{hoveredDataPoint.data.date}</div>
          <div>{`PKR ${Number(hoveredDataPoint.data.amount || 0).toLocaleString()}`}</div>
        </div>
      )}
    </div>
  );
}
