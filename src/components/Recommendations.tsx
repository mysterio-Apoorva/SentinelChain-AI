import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckSquare, ArrowUpRight, DollarSign, Activity, Play, CloudLightning, RefreshCw, Check } from "lucide-react";
import { Disruption, Recommendation } from "../types";

interface RecommendationsProps {
  activeDisruption: Disruption | null;
  onDeploySuccess: (reductionValue: number) => void;
}

export default function Recommendations({ activeDisruption, onDeploySuccess }: RecommendationsProps) {
  const [deployedPlaybooks, setDeployedPlaybooks] = useState<string[]>([]);
  const [deployingId, setDeployingId] = useState<string | null>(null);

  const displayDisruption: Disruption = activeDisruption || {
    headline: "Suez Canal Critical Transit Blockage",
    category: "Port",
    severity: "Critical",
    probability: 95,
    affectedNodes: ["Suez Canal Transit Corridor"],
    impactInventory: -40,
    impactDeliveries: "Alternate Cape of Good Hope routing adds 10-14 days.",
    impactCost: 28,
    reasoning: [],
    recommendations: [
      {
        title: "Cape of Good Hope Maritime Reroute",
        reduction: 60,
        cost: "$$$ High",
        description: "Re-manifest all inbound container vessels around South Africa. Secures absolute arrival timelines, bypassing Suez maritime gridlock."
      },
      {
        title: "Intercontinental Rail Pivot",
        reduction: 45,
        cost: "$$ Medium",
        description: "Reroute premium components via Central Asian dry rails. Avoids maritime delays entirely, delivering assemblies to central hubs in 10 days."
      }
    ]
  };

  const handleDeployPlaybook = (title: string, reduction: number) => {
    if (deployedPlaybooks.includes(title)) return;
    
    setDeployingId(title);
    
    // Simulate AWS cloud infrastructure dispatcher trigger
    setTimeout(() => {
      setDeployedPlaybooks(prev => [...prev, title]);
      setDeployingId(null);
      onDeploySuccess(reduction);
    }, 1500);
  };

  return (
    <section
      id="recommendations"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-slate-950/20 relative"
    >
      <div className="w-full max-w-5xl">
        {/* Title */}
        <div className="text-left mb-12">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2">Stage VII — Mitigation Planner</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 uppercase">Operational Mitigation Playbooks</h2>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl">
            SentinelChain AI evaluates alternative logistics pipelines, formulating action routes with calculated cost sitemaps and direct risk mitigations.
          </p>
        </div>

        {/* Display recommendations grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {displayDisruption.recommendations.map((play, index) => {
            const isDeployed = deployedPlaybooks.includes(play.title);
            const isDeploying = deployingId === play.title;
            
            return (
              <div
                key={index}
                className={`bg-slate-900/35 border rounded-2xl p-6 text-left flex flex-col justify-between transition-all ${
                  isDeployed
                    ? "border-emerald-500/40 bg-emerald-950/5 shadow-lg shadow-emerald-950/10"
                    : "border-slate-800 hover:border-slate-700 hover:bg-slate-900/50"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-slate-850 pb-3">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                        {play.title}
                      </h4>
                      <div className="flex items-center space-x-2.5 font-mono text-[9px] text-slate-500">
                        <span className="flex items-center text-emerald-400">
                          <Activity className="w-3.5 h-3.5 mr-1" />
                          Risk Reduction: -{play.reduction}%
                        </span>
                        <span className="text-slate-400">• Budget: {play.cost}</span>
                      </div>
                    </div>
                    
                    <span className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-850 text-sky-400 flex items-center justify-center text-xs">
                      {index + 1}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans min-h-[60px]">
                    {play.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between">
                  <div className="text-[9px] font-mono text-slate-500">
                    {isDeployed ? (
                      <span className="text-emerald-400 font-bold uppercase">ACTIVE STATE: ENFORCED</span>
                    ) : (
                      <span>STANDBY MODE</span>
                    )}
                    <span className="block mt-0.5">TARGET SEC: LOGISTICS_WEBHOOK_ERP</span>
                  </div>

                  <button
                    onClick={() => handleDeployPlaybook(play.title, play.reduction)}
                    disabled={isDeployed || isDeploying}
                    className={`px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shrink-0 ${
                      isDeployed
                        ? "bg-emerald-950/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/10"
                    }`}
                  >
                    {isDeploying ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Deploying...</span>
                      </>
                    ) : isDeployed ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Deployed</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Deploy Playbook</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dispatch Logs summary Console */}
        <div className="mt-8 bg-slate-950/40 border border-slate-800/60 rounded-2xl p-5 text-left font-mono text-[10px]">
          <div className="flex items-center space-x-2 text-[9px] text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-850 pb-2">
            <CloudLightning className="w-4 h-4 text-emerald-400" />
            <span>Active AWS Cloud Execution Ledger</span>
          </div>
          
          <div className="space-y-1.5 text-slate-500">
            <div>[ST-LOG] {new Date().toLocaleDateString()} 05:20:00 Handshake initialized with regional third-party logistics endpoints.</div>
            {deployedPlaybooks.length > 0 ? (
              deployedPlaybooks.map((p, idx) => (
                <div key={idx} className="text-emerald-400">
                  [STS-DISPATCH] {new Date().toLocaleDateString()} 05:20:48 Deployed &apos;{p}&apos;. Transmitted authorization codes to Carrier API Gateway.
                </div>
              ))
            ) : (
              <div>[ST-LOG] System in standby. Select a playbook above to dispatch mitigation procedures.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
