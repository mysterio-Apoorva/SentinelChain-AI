import React from 'react';
import { 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  CartesianGrid,
  ComposedChart,
  Line
} from 'recharts';
import { 
  mockAnalyticsRiskTrends,
  mockAnalyticsDelays,
  mockAnalyticsSupplierPerformance,
  mockAnalyticsInventoryExposure,
  mockAnalyticsCostComparison
} from '../data/mockData';
import { 
  BarChart2, 
  Activity, 
  Ship, 
  Sparkles, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  Volume2
} from 'lucide-react';
import { useSentinel } from '../hooks/useSentinelState';

export const AnalyticsDeepDive: React.FC = () => {
  const { startVoiceBriefing } = useSentinel();

  return (
    <div className="space-y-6">
      
      {/* HEADER COCKPIT */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest">
            LOGISTICS QUANTITATIVE SUITE
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 uppercase">Analytics Deep Dive</h2>
        </div>

        <button
          onClick={() => startVoiceBriefing("Analyzing historical supply and risk metrics. We note a significant 10.5 day delay spike on ocean freight legs due to the Rotterdam lockout, leading to raw polymers and castings costs rising by 15 percent.")}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold text-xs uppercase font-mono rounded-xl border border-slate-800 transition-all flex items-center gap-2"
        >
          <Volume2 className="w-4 h-4 text-cyan-400" />
          Read Analytics Commentary
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Chart 1: Ocean vs Air vs Rail delays over Months (Bar Chart) */}
        <div className="lg:col-span-6 bg-slate-900/30 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-900">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Ship className="w-4 h-4 text-cyan-400" />
              Ocean, Air, & Rail Shipment Delays
            </h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Average transport lag (in days) compared across primary logistic channels</p>
          </div>

          <div className="h-[260px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalyticsDelays} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.2} />
                <XAxis dataKey="month" stroke="#475569" fontSize={10} fontFamily="monospace" />
                <YAxis stroke="#475569" fontSize={10} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '10px' }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '10px', pt: 10 }} />
                <Bar dataKey="Ocean" name="Ocean Leg" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Air" name="Air Bridge" fill="#818cf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Rail" name="Rail Transit" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Supplier Performance Metrics (Composed: OnTime rate line, Quality score Bar) */}
        <div className="lg:col-span-6 bg-slate-900/30 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-900">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-indigo-400" />
              Supplier Operational scorecard
            </h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Compares vendor on-time delivery rates with processed quality compliance metrics</p>
          </div>

          <div className="h-[260px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={mockAnalyticsSupplierPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.2} />
                <XAxis dataKey="name" stroke="#475569" fontSize={9} fontFamily="monospace" />
                <YAxis stroke="#475569" fontSize={10} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '10px' }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="qualityScore" name="Quality Score (0-100)" fill="#1e1b4b" stroke="#4338ca" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="onTimeRate" name="On-Time Delivery %" stroke="#22d3ee" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Alternative Sourcing Cost comparisons (Horizontal Stacked Bar Chart) */}
        <div className="lg:col-span-12 bg-slate-900/30 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-900 mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Alternative Sourcing Cost Comparison matrices
            </h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Details additional baseline costs, freight surcharges, and secondary liability insurance for swap scenarios</p>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={mockAnalyticsCostComparison} margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.2} />
                <XAxis type="number" stroke="#475569" fontSize={10} fontFamily="monospace" />
                <YAxis type="category" dataKey="supplierName" stroke="#475569" fontSize={9} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '10px' }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="baseCost" name="Base Materials Cost" stackId="a" fill="#1e293b" stroke="#334155" />
                <Bar dataKey="freightCost" name="Freight & Surcharge" stackId="a" fill="#22d3ee" stroke="#0891b2" />
                <Bar dataKey="insuranceCost" name="Liability Premiums" stackId="a" fill="#ef4444" stroke="#b91c1c" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick analysis box */}
          <div className="mt-4 p-3 bg-cyan-950/15 border border-cyan-500/15 rounded-lg text-[10px] flex items-center justify-between text-slate-300 leading-normal">
            <span>
              <strong>Cost Strategy Guide:</strong> Moving semiconductor loads to **Evergreen Semis (Austin)** yields a 12% freight saving compared to deep Europe air bridges, keeping the landed cost margins highly stable for raw EV assemblies.
            </span>
            <span className="font-mono text-cyan-400 font-bold shrink-0 ml-3 uppercase">ESTIMATED LANDED INDEX: Stable</span>
          </div>

        </div>

      </div>

    </div>
  );
};
