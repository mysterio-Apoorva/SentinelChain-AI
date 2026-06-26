import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrainCircuit, Play, Cpu, CheckCircle, Code, AlignLeft, RefreshCw } from "lucide-react";
import { Disruption } from "../types";

interface AiReasoningProps {
  activeDisruption: Disruption | null;
  isAnalyzing: boolean;
}

export default function AiReasoning({ activeDisruption, isAnalyzing }: AiReasoningProps) {
  const [activeStep, setActiveStep] = useState(1);

  const stepsInfo = [
    { num: 1, title: "Tokenization Mesh", icon: AlignLeft, desc: "Splitting raw text stream into color-coded semantic token indices." },
    { num: 2, title: "Attention Entity Map", icon: BrainCircuit, desc: "Saliency mapping extracts key infrastructure nodes, delay scopes, and metrics." },
    { num: 3, title: "Risk Inference Engine", icon: Cpu, desc: "Executing vector weights calculations to determine operational cascades." },
    { num: 4, title: "Structured JSON Compiler", icon: Code, desc: "Mapping mathematical inference coordinates into valid JSON arrays." }
  ];

  // Default demonstration data if no active disruption has been simulated yet
  const displayDisruption: Disruption = activeDisruption || {
    headline: "Suez Canal Critical Transit Blockage",
    category: "Port",
    severity: "Critical",
    probability: 95,
    affectedNodes: ["Suez Canal Transit Corridor", "Rotterdam Entry Port", "Singapore Terminal Hub"],
    impactInventory: -40,
    impactDeliveries: "Severe backlog. Vessel queues exceeding 120 ships. Alternate Cape of Good Hope routing adds 10-14 days.",
    impactCost: 28,
    reasoning: [
      "Physical bottleneck prevents standard East-West maritime cargo flows.",
      "Vessel redirection forces immediate 3,500nm detours around the African cape.",
      "Empty container repositioning severely delayed, creating severe global equipment deficits."
    ],
    recommendations: []
  };

  const rawParagraph = `ALERT: Critical obstruction reported along the Suez Canal Corridor. Containership vessel grounded sideways, blocking shipping lanes in both directions. Directly affects Rotterdam Entry Port schedules. Risk projection calculates a 95% probability of cascade. Estimated delay: 10-14 days.`;

  // Generate color-coded tokens for Step 1
  const tokens = rawParagraph.split(" ").map((word, i) => {
    const colors = [
      "bg-sky-500/10 text-sky-400 border-sky-500/20",
      "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      "bg-purple-500/10 text-purple-400 border-purple-500/20",
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      "bg-amber-500/10 text-amber-400 border-amber-500/20"
    ];
    const borderCol = colors[i % colors.length];
    return { word, style: borderCol };
  });

  return (
    <section
      id="ai-reasoning"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-slate-950/20 relative"
    >
      <div className="w-full max-w-5xl">
        {/* Title */}
        <div className="text-left mb-12">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2">Stage V — AI Reasoning Engine</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 uppercase">Interactive AI Reasoning Core</h2>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl">
            See how Amazon Bedrock processes logistics threats. Step through the natural language processing pipelines below to demystify LLM reasoning vectors.
          </p>
        </div>

        {/* Outer UI Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Side Navigation steps */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                Pipeline Processing Stages
              </span>
              
              <div className="space-y-2">
                {stepsInfo.map((st) => {
                  const Icon = st.icon;
                  const isActive = activeStep === st.num;
                  return (
                    <button
                      key={st.num}
                      onClick={() => setActiveStep(st.num)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start space-x-3.5 ${
                        isActive
                          ? "bg-slate-900 border-sky-500/60 shadow-lg shadow-sky-950/10"
                          : "bg-slate-900/30 border-slate-800/80 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-sky-500/10 border-sky-500 text-sky-400"
                          : "bg-slate-950 border-slate-800 text-slate-500"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block uppercase">
                          {st.title}
                        </span>
                        <p className="text-[10px] text-slate-500 font-sans mt-1.5 leading-relaxed">
                          {st.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick stats parameters */}
            <div className="bg-slate-900/50 border border-slate-850 rounded-2xl p-4 font-mono text-[10px] text-slate-400 space-y-1.5">
              <div className="flex justify-between">
                <span>Model Alias:</span>
                <span className="text-sky-400 font-bold">gemini-3.5-flash-enterprise</span>
              </div>
              <div className="flex justify-between">
                <span>Embedding Dimensions:</span>
                <span className="text-slate-300">1,536 FLOATS</span>
              </div>
              <div className="flex justify-between">
                <span>Token Execution State:</span>
                <span className="text-emerald-400">SUCCESS</span>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Playground Visualization */}
          <div className="lg:col-span-8 bg-slate-900/35 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              {/* Terminal-like header */}
              <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-5">
                <div className="flex items-center space-x-2 font-mono text-xs text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="ml-1.5">bedrock_reasoning_core.bin</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500">MAPPED MEMORY SECTOR: 0x8F9C</span>
              </div>

              {/* Dynamic Step Viewports */}
              <div className="min-h-[250px] flex flex-col justify-center">
                {/* STEP 1: TOKENIZATION */}
                {activeStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                      Parsed Output Stream (Tokens: {tokens.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5 bg-slate-950/70 p-4 rounded-xl border border-slate-850 font-mono text-[10px] leading-relaxed max-h-[220px] overflow-y-auto">
                      {tokens.map((tok, idx) => (
                        <span key={idx} className={`px-1.5 py-0.5 rounded border ${tok.style}`}>
                          {tok.word}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: ENTITY EXTRACTION */}
                {activeStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                      Saliency Mapping & Vector Extraction
                    </span>
                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-850 text-xs font-sans leading-relaxed space-y-4">
                      <p className="text-slate-400">
                        ALERT: Critical obstruction reported along the <span className="bg-red-500/15 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-mono font-semibold">Suez Canal Corridor [Location]</span>. Containership vessel grounded sideways, blocking shipping lanes in both directions. Directly affects <span className="bg-sky-500/15 text-sky-400 border border-sky-500/30 px-1.5 py-0.5 rounded font-mono font-semibold">Rotterdam Entry Port [Hub]</span> schedules. Risk projection calculates a <span className="bg-purple-500/15 text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded font-mono font-semibold">95% [Probability]</span> probability of cascade. Estimated delay: <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono font-semibold">10-14 days [Timeline]</span>.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: REASONING STEPS */}
                {activeStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                      AI Reasoning Cascades
                    </span>
                    
                    <div className="space-y-2.5">
                      {displayDisruption.reasoning.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-950/60 border border-slate-850 rounded-xl flex items-start space-x-3"
                        >
                          <span className="w-5 h-5 rounded-full bg-sky-950 border border-sky-500/30 text-sky-400 flex items-center justify-center text-[10px] font-mono shrink-0">
                            {idx + 1}
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">{step}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: STRUCTURED OUTPUT GENERATION */}
                {activeStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        Compiled Core State Machine Object
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 uppercase bg-emerald-950/15 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                        ✓ Program Validated
                      </span>
                    </div>

                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-850 font-mono text-[10px] text-sky-400 overflow-x-auto max-h-[180px] overflow-y-auto leading-relaxed tab-size-2">
                      <pre>
{`{
  "headline": "${displayDisruption.headline}",
  "category": "${displayDisruption.category}",
  "severity": "${displayDisruption.severity}",
  "probability": ${displayDisruption.probability},
  "affectedNodes": ${JSON.stringify(displayDisruption.affectedNodes)},
  "impactMetrics": {
    "inventoryDrawdown": ${displayDisruption.impactInventory},
    "costSurge": +${displayDisruption.impactCost}
  }
}`}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Stepper buttons footer */}
            <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-500">
                PROCESSED BY COGNITIVE_LAYER v2
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  disabled={activeStep === 1}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-300 hover:text-slate-100 rounded-lg text-[10px] font-mono uppercase tracking-wider disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  onClick={() => setActiveStep(prev => Math.min(4, prev + 1))}
                  disabled={activeStep === 4}
                  className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
