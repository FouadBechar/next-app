"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./placeholder-chart.css";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Variant = "bar" | "line" | "area";

interface PlaceholderChartProps {
  variant?: Variant;
  height?: number; // runtime height in px
  showToggle?: boolean;
}

export function PlaceholderChart({ variant: initial = "line", height = 300, showToggle = true }: PlaceholderChartProps) {
  const [variant, setVariant] = useState<Variant>(initial);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Set CSS variable on container so we avoid inline styles in JSX; keeps markup cleaner
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--hc", `${height}px`);
    }
  }, [height]);

  // Memoize random bar heights so they remain stable across renders
  const barHeights = useMemo(() => Array.from({ length: 12 }).map(() => 30 + Math.random() * 70), []);

  return (
    <div className="w-full">
      {showToggle && (
        <div className="flex justify-end mb-4 space-x-2">
          <Button size="sm" variant={variant === "bar" ? "default" : "outline"} onClick={() => setVariant("bar")}>
            Bar
          </Button>
          <Button size="sm" variant={variant === "line" ? "default" : "outline"} onClick={() => setVariant("line")}>
            Line
          </Button>
          <Button size="sm" variant={variant === "area" ? "default" : "outline"} onClick={() => setVariant("area")}>
            Area
          </Button>
        </div>
      )}

      <div ref={containerRef} className="w-full flex items-center justify-center chart-height">
        <motion.div key={variant} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="w-full h-full flex flex-col justify-end">
          {variant === "bar" && <BarChart barHeights={barHeights} />}
          {variant === "line" && <LineChart />}
          {variant === "area" && <AreaChart />}
        </motion.div>
      </div>
    </div>
  );
}

function BarChart({ barHeights }: { barHeights: number[] }) {
  return (
    <div className="flex items-end justify-between h-full w-full gap-2 pt-10">
      {barHeights.map((h, i) => {
        const opacity = 0.3 + i / 20;
        return (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.55, delay: i * 0.04 }}
            className="bg-blue-500 rounded-t w-full bar-opacity"
            // CSS custom property used by stylesheet for subtle per-bar styling
            style={{ ["--op" as any]: opacity }}
          />
        );
      })}
    </div>
  );
}

function LineChart() {
  return (
    <div className="relative h-full w-full">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          d="M0,50 Q10,30 20,50 T40,50 T60,50 T80,30 T100,40"
          fill="none"
          stroke="#3b82f6"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function AreaChart() {
  return (
    <div className="relative h-full w-full">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          d="M0,80 Q20,70 40,60 T80,40 T100,50 V100 H0 Z"
          fill="url(#blueGradient)"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          d="M0,80 Q20,70 40,60 T80,40 T100,50"
          fill="none"
          stroke="#3b82f6"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
