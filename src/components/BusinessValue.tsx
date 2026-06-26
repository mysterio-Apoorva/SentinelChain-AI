import { motion } from "motion/react";
import { DollarSign, ShieldAlert, Zap, Globe, Target, BarChart2 } from "lucide-react";

export default function BusinessValue() {
  const valueMetrics = [
    {
      title: "Average Incident Response",
      before: "36.5 Hours",
      after: "12.8 Minutes",
      pct: 99.4,
      desc: "Real-time satellite ingestion bypasses legacy administrative chains.",
      icon: Zap,
      color: "from-sky-500/20 to-sky-600/10 text-sky-400"
    },
    {
      title: "Logistics Losses Avoided",
      before: "$1.4M / Anomaly",
      after: "$85K / Anomaly",
      pct: 93.9,
      desc: "Early diversion prevents premium air-charter surcharges.",
      icon: DollarSign,
      color: "from-emerald-500/20 to-emerald-600/10 text-emerald-400"
    },
    {
      title: "Customer SLA Preservation",
      before: "88.2% Fill-Rate",
      after: "99.82% Fill-Rate",
      pct: 13.1,
      desc: "Active inventory buffers insulate assembly plants from regional transit shocks.",
      icon: Target,
      color: "from-indigo-500/20 to-indigo-600/10 text-indigo-400"
    }
  ];

  return (
    <section
      id="business-value"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-slate-950/20 relative"
    >
      <div className="w-full max-w-5xl">
        {/* Title */}
        <div className="text-left mb-12">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2">Stage IX — Business Impact Metrics</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 uppercase">Enterprise Commercial Value</h2>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl">
            SentinelChain AI reduces risk into measurable balance sheet savings. See the validated performance profiles of our integrated networks.
          </p>
        </div>

        {/* Big KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {valueMetrics.map((met, index) => {
            const Icon = met.icon;
            return (
              <div
                key={index}
                className="bg-slate-900/35 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-slate-700 hover:bg-slate-900/50"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${met.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/15 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                      -{met.pct}% Change
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                      {met.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                      {met.desc}
                    </p>
                  </div>
                </div>

                {/* Horizontal Comparison Line Bar */}
                <div className="mt-6 pt-5 border-t border-slate-850 space-y-3 font-mono">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500 uppercase">Pre-SentinelChain:</span>
                    <span className="text-red-400 font-bold">{met.before}</span>
                  </div>
                  {/* Visual Bar pre */}
                  <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: "95%" }} />
                  </div>

                  <div className="flex justify-between text-[10px] pt-1">
                    <span className="text-slate-500 uppercase">Post-SentinelChain:</span>
                    <span className="text-emerald-400 font-bold">{met.after}</span>
                  </div>
                  {/* Visual Bar post */}
                  <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: "12%" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Certification Seal block */}
        <div className="mt-8 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                ISO 27001 & SOC-2 Certified AI Infrastructure
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xl font-sans">
                Our services undergo rigorous auditing procedures matching federal supply standards. All Bedrock connections operate within secure VPC endpoints protecting trade telemetry.
              </p>
            </div>
          </div>
          
          <div className="text-[9px] font-mono text-slate-500 text-right shrink-0 uppercase tracking-wider leading-relaxed border-t md:border-t-0 md:border-l border-slate-850 pt-3 md:pt-0 md:pl-6">
            <div>AUDITOR ID: SG-995C</div>
            <div>VERIFIED PORTION: FULL DOMAIN</div>
            <div>SLA ASSURED: 99.98% CORE</div>
          </div>
        </div>
      </div>
    </section>
  );
}
