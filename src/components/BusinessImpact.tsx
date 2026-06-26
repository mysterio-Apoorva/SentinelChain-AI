import { useState } from "react";
import { motion } from "motion/react";
import { TrendingDown, TrendingUp, Clock, ShieldAlert, AlertCircle, Calendar } from "lucide-react";
import { Disruption } from "../types";

interface BusinessImpactProps {
  activeDisruption: Disruption | null;
}

export default function BusinessImpact({ activeDisruption }: BusinessImpactProps) {
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);

  // Fallback default values
  const displayDisruption: Disruption = activeDisruption || {
    headline: "Suez Canal Critical Transit Blockage",
    category: "Port",
    severity: "Critical",
    probability: 95,
    affectedNodes: ["Suez Canal Transit Corridor", "Rotterdam Entry Port", "Singapore Terminal Hub"],
    impactInventory: -40,
    impactDeliveries: "Severe backlog. Vessel queues exceeding 120 ships. Alternate Cape of Good Hope routing adds 10-14 days.",
    impactCost: 28,
    reasoning: [],
    recommendations: []
  };

  const inventoryValue = Math.abs(displayDisruption.impactInventory);
  const costValue = displayDisruption.impactCost;

  // Generate a dynamic mock timeline representing safety stock depletion (30 days)
  const generateTimelineData = () => {
    const data = [];
    let stock = 100;
    let cost = 100;
    for (let day = 1; day <= 15; day++) {
      // Simulate faster depletion/surge for higher severity disruptions
      const invDrawdownStep = (inventoryValue / 15) * (1 + 0.1 * Math.sin(day));
      const costSurgeStep = (costValue / 15) * (1 + 0.15 * Math.cos(day));
      
      stock = Math.max(10, Math.round(100 - (invDrawdownStep * day)));
      cost = Math.round(100 + (costSurgeStep * day));
      
      data.push({ day, stock, cost });
    }
    return data;
  };

  const timelineData = generateTimelineData();

  // SVG dimensions for custom chart drawing
  const width = 450;
  const height = 150;
  const padding = 25;

  // Convert timeline coordinates to SVG grid space
  const getCoordinates = (type: "stock" | "cost") => {
    const points: [number, number][] = [];
    const stepX = (width - padding * 2) / (timelineData.length - 1);
    
    timelineData.forEach((d, i) => {
      const x = padding + i * stepX;
      // Map stock (0-100) or cost (100-200) to height
      let y = padding;
      if (type === "stock") {
        y = height - padding - (d.stock / 100) * (height - padding * 2);
      } else {
        // Assume max cost surge displayed is +50% (value 150)
        const maxCost = 150;
        const minCost = 80;
        const range = maxCost - minCost;
        y = height - padding - ((d.cost - minCost) / range) * (height - padding * 2);
      }
      points.push([x, y]);
    });
    return points;
  };

  const stockPoints = getCoordinates("stock");
  const costPoints = getCoordinates("cost");

  // Format points array into SVG path syntax
  const createPathString = (points: [number, number][]) => {
    return points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p[0]} ${p[1]}` : `${acc} L ${p[0]} ${p[1]}`;
    }, "");
  };

  const createAreaPathString = (points: [number, number][]) => {
    if (points.length === 0) return "";
    const startX = points[0][0];
    const endX = points[points.length - 1][0];
    const baselineY = height - padding;
    return `${createPathString(points)} L ${endX} ${baselineY} L ${startX} ${baselineY} Z`;
  };

  return (
    <section
      id="business-impact"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-slate-950/10 relative"
    >
      <div className="w-full max-w-5xl">
        {/* Title */}
        <div className="text-left mb-12">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2">Stage VI — Impact Simulator</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 uppercase">Quantified Business Impact</h2>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl">
            Our diagnostic modules map threat intensities directly into primary supply chain risk metrics. Below is the predicted 15-day cascading impact simulation.
          </p>
        </div>

        {/* Highlight Scorecard Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Inventory drawdown */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Safety Stock Depletion</span>
              <span className="text-2xl font-bold font-mono text-red-400 block">
                {displayDisruption.impactInventory}%
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Warehouse inventory coverage expected to drop to critical margins. Minimum buffers breached.
              </p>
            </div>
          </div>

          {/* Card 2: Cost surge */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Logistics Cost Surge</span>
              <span className="text-2xl font-bold font-mono text-amber-500 block">
                +{displayDisruption.impactCost}%
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Emergency air-charters, spot rate premiums, and detour surcharges inflate unit carriage costs.
              </p>
            </div>
          </div>

          {/* Card 3: Delivery Delays */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Delivery Schedule Delays</span>
              <span className="text-sm font-bold text-sky-300 block truncate max-w-[220px]" title={displayDisruption.impactDeliveries}>
                {displayDisruption.impactDeliveries.split(".")[0]}.
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-1">
                Port dwell times climb, delaying final mile assemblies and contract SLAs.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Charts: Custom SVG graphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart 1: Safety Stock deplete */}
          <div className="bg-slate-900/35 border border-slate-800/80 rounded-2xl p-5 text-left">
            <div className="flex items-center justify-between mb-4 border-b border-slate-850 pb-2">
              <span className="text-xs font-bold uppercase text-slate-300 tracking-wider">
                15-Day Buffer Stock Projection
              </span>
              <span className="text-[9px] font-mono text-red-400 uppercase flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Critical Drawdown</span>
              </span>
            </div>

            {/* SVG area graph */}
            <div className="relative">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                {/* Horizontal grid lines */}
                {[0, 25, 50, 75, 100].map((grid, index) => {
                  const y = height - padding - (grid / 100) * (height - padding * 2);
                  return (
                    <line
                      key={index}
                      x1={padding} y1={y} x2={width - padding} y2={y}
                      stroke="rgba(255, 255, 255, 0.04)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Shaded Area */}
                <path
                  d={createAreaPathString(stockPoints)}
                  fill="url(#stockAreaGradient)"
                  opacity="0.3"
                />

                {/* Highlight line */}
                <path
                  d={createPathString(stockPoints)}
                  stroke="#ef4444"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Dots along path on hover */}
                {stockPoints.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt[0]} cy={pt[1]} r="3"
                    fill="#ef4444"
                    className="cursor-pointer hover:r-5 transition-all"
                    onMouseEnter={() => setHoveredPointIdx(idx)}
                    onMouseLeave={() => setHoveredPointIdx(null)}
                  />
                ))}

                <defs>
                  <linearGradient id="stockAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Float values tooltip overlay on point hover */}
              {hoveredPointIdx !== null && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-[10px] font-mono text-slate-300">
                  Day {timelineData[hoveredPointIdx].day}: Safety Stock at <span className="text-red-400 font-bold">{timelineData[hoveredPointIdx].stock}%</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between font-mono text-[9px] text-slate-500 mt-2">
              <span>DAY 1</span>
              <span>DAY 7</span>
              <span>DAY 15</span>
            </div>
          </div>

          {/* Chart 2: Cost escalation */}
          <div className="bg-slate-900/35 border border-slate-800/80 rounded-2xl p-5 text-left">
            <div className="flex items-center justify-between mb-4 border-b border-slate-850 pb-2">
              <span className="text-xs font-bold uppercase text-slate-300 tracking-wider">
                15-Day Logistics Overhead Surge
              </span>
              <span className="text-[9px] font-mono text-amber-500 uppercase flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Overhead Trend</span>
              </span>
            </div>

            {/* SVG area graph */}
            <div className="relative">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                {/* Horizontal grid lines */}
                {[0, 25, 50, 75, 100].map((grid, index) => {
                  const y = height - padding - (grid / 100) * (height - padding * 2);
                  return (
                    <line
                      key={index}
                      x1={padding} y1={y} x2={width - padding} y2={y}
                      stroke="rgba(255, 255, 255, 0.04)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Shaded Area */}
                <path
                  d={createAreaPathString(costPoints)}
                  fill="url(#costAreaGradient)"
                  opacity="0.3"
                />

                {/* Highlight line */}
                <path
                  d={createPathString(costPoints)}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Dots along path on hover */}
                {costPoints.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt[0]} cy={pt[1]} r="3"
                    fill="#f59e0b"
                    className="cursor-pointer hover:r-5 transition-all"
                    onMouseEnter={() => setHoveredPointIdx(idx)}
                    onMouseLeave={() => setHoveredPointIdx(null)}
                  />
                ))}

                <defs>
                  <linearGradient id="costAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Float values tooltip overlay on point hover */}
              {hoveredPointIdx !== null && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-[10px] font-mono text-slate-300">
                  Day {timelineData[hoveredPointIdx].day}: Cost Index at <span className="text-amber-500 font-bold">{timelineData[hoveredPointIdx].cost}%</span>
                </div>
              )}
            </div>

            <div className="flex justify-between font-mono text-[9px] text-slate-500 mt-2">
              <span>DAY 1</span>
              <span>DAY 7</span>
              <span>DAY 15</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
