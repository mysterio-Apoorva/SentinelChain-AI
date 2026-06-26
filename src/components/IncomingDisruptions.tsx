import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, PenSquare, ArrowRight, Sparkles, Send, RefreshCw, AlertTriangle } from "lucide-react";
import { Disruption } from "../types";

interface IncomingDisruptionsProps {
  onAnalyzeDisruption: (disruption: Disruption) => void;
  isAnalyzing: boolean;
}

const TEMPLATE_DISRUPTIONS = [
  {
    id: "suez-blockage",
    headline: "Suez Canal Critical Transit Blockage",
    category: "Port",
    severity: "Critical",
    probability: 95,
    promptText: "A 400m ultra-large container vessel has run aground sideways in the Suez Canal transit corridor, halting all maritime vessel traffic in both directions. Ship queues are climbing past 100 hulls. Salvage operators predict 10-14 days before canal refloating can complete.",
    affectedNodes: ["Suez Canal Corridor", "Rotterdam Entry Port", "Singapore Terminal Hub"]
  },
  {
    id: "typhoon-infa",
    headline: "Cat-4 Typhoon In-Fa Shanghai Port Impact",
    category: "Weather",
    severity: "High",
    probability: 85,
    promptText: "Super Typhoon In-Fa is approaching the East China Sea with sustained winds of 145mph. Offshore wind speeds force the immediate suspension of crane and berthing operations at Shanghai Port Complexes and Ningbo-Zhoushan terminals for at least 5 days.",
    affectedNodes: ["East China Sea Route", "Shanghai Port Complex", "Ningbo-Zhoushan Terminals"]
  },
  {
    id: "la-port-strike",
    headline: "Port Authority Labor Strike & Shutdown",
    category: "Port",
    severity: "High",
    probability: 75,
    promptText: "A contract dispute has led to an immediate labor walkout and strike across Los Angeles and Long Beach terminal complexes. Gantry crane unloading has ground to a complete halt, freezing truck gates and raising container dwell times past 2 weeks.",
    affectedNodes: ["Los Angeles Terminal Port", "Long Beach Transit Corridor"]
  },
  {
    id: "silicon-shortage",
    headline: "Tier-1 Semiconductor Cleanroom Foundry Shortage",
    category: "Supplier",
    severity: "High",
    probability: 80,
    promptText: "Severe pure water shortages and raw silicon wafer shipment deficits in the Hsinchu Science Park force Tier-1 foundries to restrict allocator limits on micro-controllers. Lead times stretch to 48 weeks, creating risk for automotive assembly lines.",
    affectedNodes: ["Hsinchu Science Park", "Taiwan Foundries", "Automotive Assembly Lines"]
  }
];

export default function IncomingDisruptions({ onAnalyzeDisruption, isAnalyzing }: IncomingDisruptionsProps) {
  const [customReport, setCustomReport] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("suez-blockage");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
    const template = TEMPLATE_DISRUPTIONS.find(t => t.id === id);
    if (template) {
      setCustomReport("");
    }
  };

  const handleTriggerAnalysis = async () => {
    setErrorMsg("");
    let textToAnalyze = customReport.trim();
    
    // If no custom report, fetch the active template prompt text
    if (!textToAnalyze) {
      const activeTemplate = TEMPLATE_DISRUPTIONS.find(t => t.id === selectedTemplate);
      if (activeTemplate) {
        textToAnalyze = activeTemplate.promptText;
      }
    }

    if (!textToAnalyze) {
      setErrorMsg("Please provide a disruption scenario to analyze.");
      return;
    }

    try {
      const res = await fetch("/api/analyze-disruption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToAnalyze })
      });

      if (!res.ok) {
        throw new Error("Analysis failed. Server responded with an error.");
      }

      const analyzedDisruption: Disruption = await res.json();
      // Add id/metadata for tracking
      analyzedDisruption.id = `disruption-${Date.now()}`;
      onAnalyzeDisruption(analyzedDisruption);
    } catch (err: any) {
      console.error("Error calling analyze disruption:", err);
      setErrorMsg(err.message || "An unexpected error occurred during analysis.");
    }
  };

  return (
    <section
      id="incoming-disruptions"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-slate-950/20 relative"
    >
      <div className="w-full max-w-5xl">
        {/* Title */}
        <div className="text-left mb-12">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2">Stage III — Ingress Signal Parser</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 uppercase">Incoming Disruption Registry</h2>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl">
            Select one of our active enterprise incident logs or input custom intelligence. SentinelChain AI triggers live Bedrock models to analyze cascades, calculate bottlenecks, and formulate alternate routes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Template incident cards list */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
              Active Incidents (Click to Focus)
            </span>

            <div className="space-y-3">
              {TEMPLATE_DISRUPTIONS.map((item) => {
                const isSelected = selectedTemplate === item.id && !customReport;
                let sevStyle = "bg-sky-500/10 text-sky-400 border-sky-500/20";
                if (item.severity === "Critical") sevStyle = "bg-red-500/10 text-red-400 border-red-500/25";
                if (item.severity === "High") sevStyle = "bg-amber-500/10 text-amber-400 border-amber-500/25";
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTemplate(item.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-sky-950/15 border-sky-500 shadow-lg shadow-sky-950/20"
                        : "bg-slate-900/40 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 pr-2">
                        <span className="text-xs font-bold text-slate-200 block uppercase tracking-wide">
                          {item.headline}
                        </span>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                            {item.category} • {item.probability}% Risk
                          </span>
                        </div>
                      </div>
                      
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${sevStyle}`}>
                        {item.severity}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 mt-3 leading-relaxed font-sans truncate">
                      {item.promptText}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.affectedNodes.map((node) => (
                        <span key={node} className="text-[8px] font-mono bg-slate-950 border border-slate-850 text-slate-500 px-1.5 py-0.5 rounded">
                          {node}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Custom input console or prompt text focus */}
          <div className="lg:col-span-6 bg-slate-900/35 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
                <div className="flex items-center space-x-2">
                  <PenSquare className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold uppercase text-slate-200 tracking-wider">
                    Custom Intel Input Console
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-[9px] text-slate-500">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>Bedrock Llama/Gemini Gateway</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  Incident Intelligence Log (Raw Text)
                </label>
                <textarea
                  value={customReport || TEMPLATE_DISRUPTIONS.find(t => t.id === selectedTemplate)?.promptText || ""}
                  onChange={(e) => {
                    setCustomReport(e.target.value);
                    setSelectedTemplate(""); // clear selection when typing custom
                  }}
                  placeholder="Type a custom supply chain anomaly... (e.g. A fuel spill at the Panama Canal has closed locks for 48 hours, stalling 12 container vessels...)"
                  className="w-full h-44 bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300 font-sans leading-relaxed focus:outline-none focus:border-sky-500/40 focus:ring-1 focus:ring-sky-500/20"
                />
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-400 rounded-xl flex items-start space-x-2 text-[10px]">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between">
              <div className="text-[9px] font-mono text-slate-500 leading-tight">
                {customReport ? (
                  <span className="text-amber-500">CUSTOM INTEL INPUT DETECTED</span>
                ) : (
                  <span>ACTIVE TEMPLATE: {selectedTemplate.toUpperCase()}</span>
                )}
                <span className="block mt-0.5">MODEL PARAM: TEMPERATURE = 0.1</span>
              </div>

              <button
                onClick={handleTriggerAnalysis}
                disabled={isAnalyzing}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Run AI Analysis</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
