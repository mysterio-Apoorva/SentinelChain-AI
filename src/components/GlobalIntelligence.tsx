import { motion } from "motion/react";
import { Globe, ShieldAlert, ArrowDown, Key } from "lucide-react";
import { IAMRole } from "../types";

interface GlobalIntelligenceProps {
  activeRole: IAMRole;
  onOpenAuth: () => void;
  onExplore: () => void;
}

export default function GlobalIntelligence({ activeRole, onOpenAuth, onExplore }: GlobalIntelligenceProps) {
  const stats = [
    { label: "Global Nodes Monitored", value: "24,815", change: "Continuous Scan", color: "text-sky-400" },
    { label: "Global Risk Coefficient", value: "1.42", change: "Safe / Low", color: "text-emerald-400" },
    { label: "Active Regional Anomalies", value: "4 Nodes", change: "Mitigations Live", color: "text-amber-500" },
    { label: "Bedrock Engine SLA", value: "99.992%", change: "12ms Ingress", color: "text-purple-400" },
  ];

  const criticalHotspots = [
    { name: "Suez Canal Corridor", status: "WARN", details: "Congestion backlog. Vessel density +18%" },
    { name: "Shanghai Terminal Complex", status: "STABLE", details: "Operating at peak berth throughput" },
    { name: "Los Angeles Terminal", status: "CRITICAL", details: "Labor strike dispute. Gate flow -70%" },
    { name: "Panama Canal Transit", status: "STABLE", details: "Water level constraints stabilized" },
  ];

  return (
    <section
      id="global-intelligence"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center"
    >
      {/* Top Welcome Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-2 bg-sky-950/20 border border-sky-500/30 px-3 py-1 rounded-full text-sky-400 font-mono text-[10px] tracking-widest uppercase mb-6"
      >
        <ShieldAlert className="w-3.5 h-3.5" />
        <span>Enterprise Threat Matrix Active</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="max-w-4xl text-4xl sm:text-6xl font-bold tracking-tight text-slate-100 uppercase"
      >
        SentinelChain <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">AI</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-2xl text-slate-400 text-sm sm:text-base mt-6 leading-relaxed font-sans"
      >
        An AWS Bedrock-engineered global supply chain intelligence system.
        We capture real-time international disruptions early, map structural impacts across multi-tier networks, and deliver automated mitigation playbooks.
      </motion.p>

      {/* Primary Actions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="flex flex-col sm:flex-row items-center gap-4 mt-10"
      >
        <button
          onClick={onExplore}
          className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-sky-500/10 transition-all flex items-center space-x-2 group"
        >
          <span>Initiate Assessment Flow</span>
          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
        </button>

        <button
          onClick={onOpenAuth}
          className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 text-slate-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2"
        >
          <Key className="w-4 h-4 text-sky-400" />
          <span>SSO Federated Portal</span>
        </button>
      </motion.div>

      {/* Active Clearance Tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-[10px] text-slate-500 font-mono"
      >
        Security clearance active: <span className="text-sky-400 underline">{activeRole.title}</span>
      </motion.div>

      {/* Enterprise Statistics Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mt-20"
      >
        {stats.map((st, idx) => (
          <div
            key={idx}
            className="bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-5 text-left flex flex-col justify-between"
          >
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
              {st.label}
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className={`text-2xl font-bold font-mono tracking-tight ${st.color}`}>
                {st.value}
              </span>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded ml-2">
                {st.change}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Interactive Global Threat Map Hotspots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="w-full max-w-5xl mt-8 p-5 bg-slate-950/40 border border-slate-800/50 rounded-2xl text-left"
      >
        <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">
          <Globe className="w-4 h-4 text-sky-400" />
          <span>Real-time Satellite Hotspot Feed</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {criticalHotspots.map((hs, i) => (
            <div
              key={i}
              className="bg-slate-900/35 border border-slate-800/70 rounded-xl p-3.5 hover:bg-slate-900/65 hover:border-slate-700/60 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 truncate max-w-[150px]">{hs.name}</span>
                <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  hs.status === "CRITICAL"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : hs.status === "WARN"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                }`}>
                  {hs.status}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-mono leading-relaxed">{hs.details}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
