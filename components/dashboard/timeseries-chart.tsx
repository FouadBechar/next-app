"use client";

import React from "react";

interface Point {
  date: string; // YYYY-MM-DD
  value: number;
}

interface TimeseriesChartProps {
  data: Point[];
  height?: number;
}

export default function TimeseriesChart({ data, height = 200 }: TimeseriesChartProps) {
  const width = 600; // used for viewBox; svg is responsive
  const padding = 20;

  const values = data.map((d) => d.value);
  const max = Math.max(1, ...values);

  const stepX = (width - padding * 2) / Math.max(1, data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = padding + (1 - d.value / max) * (height - padding * 2);
    return { x, y, value: d.value, date: d.date };
  });

  // build path strings
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x},${height - padding} L ${points[0].x},${height - padding} Z`;

  return (
    <div style={{ width: "100%" }}>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: "100%", height }}>
        <defs>
          <linearGradient id="tsGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* area */}
        <path d={areaPath} fill="url(#tsGrad)" stroke="none" />

        {/* line */}
        <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {/* points */}
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r={3} fill="#fff" stroke="#3b82f6" strokeWidth={1.5} />
          </g>
        ))}
      </svg>
    </div>
  );
}
