import React, { useState } from 'react';
import { 
  Database, 
  Cpu, 
  Server, 
  Workflow, 
  Layers, 
  Compass, 
  Network, 
  MessageSquareCode, 
  Play,
  Volume2,
  WorkflowIcon,
  ChevronsRight,
  Sparkles,
  RefreshCw,
  BellRing
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AWSArchitecture: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isTestSyncing, setIsTestSyncing] = useState(false);

  const steps = [
    {
      id: 1,
      name: 'Amazon S3',
      subtitle: 'Structured Logistics & Alerts Raw bucket',
      type: 'Storage Plane',
      details: 'Stores raw JSON news-wire feeds, shipping container manifests, custom supplier updates, and climate APIs scraped globally.',
      payload: 's3://sentinel-chain-raw-alerts/2026/06-19/strike.json',
      icon: Database,
      color: 'text-cyan-400'
    },
    {
      id: 2,
      name: 'Amazon Nova Embeddings',
      subtitle: 'Multimodal Vector Generation',
      type: 'Model Inference',
      details: 'Tokenizes threat messages and maps geopolitical parameters into a high-dimensional vector space using Amazon Nova Embeddings model.',
      payload: 'embeddings_dims: 1024, model: amazon.nova-embeddings-v1',
      icon: Cpu,
      color: 'text-purple-400 font-sans'
    },
    {
      id: 3,
      name: 'S3 Vectors',
      subtitle: 'Vectorized Indices Stores',
      type: 'Indexed Database',
      details: 'Serves as the low-latency vector cache storage, preserving high-speed lookups of maritime bottlenecks and port historical outages database vectors.',
      payload: 's3://sentinel-chain-vectors/indices/0x91b2c/',
      icon: Layers,
      color: 'text-green-400'
    },
    {
      id: 4,
      name: 'Bedrock Knowledge Base',
      subtitle: 'Indexed Retrieval Augments',
      type: 'RAG Pipeline Integration',
      details: 'Links processed S3 vectors chunks into a searchable system index, enabling real-time context retrieval during Bedrock Agent instructions evaluation.',
      payload: 'kb_id: kb-802n81-sentinel, retrieval_latency: <45ms',
      icon: Server,
      color: 'text-yellow-400'
    },
    {
      id: 5,
      name: 'Bedrock Agent Reasoning',
      subtitle: 'Autonomous LLM Core',
      type: 'Cognitive Engine',
      details: 'Executes advanced reasoning over retrieves threats data, associates impacted supplier coordinates, calculates delay days and triggers mitigation policies.',
      payload: 'modelId: amazon.nova-pro-v1:0, agent_role: LogisticsRiskOfficer',
      icon: Network,
      color: 'text-blue-400'
    },
    {
      id: 6,
      name: 'EventBridge Scheduler',
      subtitle: 'Continuous Cron Dispatcher',
      type: 'Scheduler Bridge',
      details: 'Triggers Lambda orchestrators hourly or upon detecting critical webhook warnings, ensuring risk control states remain constantly synchronized.',
      payload: 'schedule_cron: 0 */1 * * * ?, trigger_type: EventBridgeTarget',
      icon: Compass,
      color: 'text-amber-400'
    },
    {
      id: 7,
      name: 'AWS Lambda Functions',
      subtitle: 'Serverless Risk Trigger Logic',
      type: 'Computing Engine',
      details: 'Validates Bedrock output payloads, compares alternative suppliers scores, updates database alerts status, and dispatches SMS alerts packages.',
      payload: 'function: sentinel-RiskTriggerEngine, duration: <650ms',
      icon: MessageSquareCode,
      color: 'text-rose-400'
    },
    {
      id: 8,
      name: 'Amazon SNS Broker',
      subtitle: 'Critical Alert Broadcasting',
      type: 'Notification Publisher',
      details: 'Publishes instantaneous alerts warnings down communication channels, notifying global managers, and syncing logs dashboards.',
      payload: 'sns_topic: arn:aws:sns:us-east-1:SentinelChain-Critical-Alerts',
      icon: BellRing,
      color: 'text-orange-400'
    },
    {
      id: 9,
      name: 'Amazon Nova Sonic AI',
      subtitle: 'Streaming Voice Speech',
      type: 'Speech Synthesizer',
      details: 'Invokes low latency neural Text-to-Speech models, converting resolved risk assessments summaries into briefings spoken on user command consoles.',
      payload: 'voice_engine: Nova-Sonic, stream_rate: 64kbps CJS',
      icon: Volume2,
      color: 'text-pink-400'
    }
  ];

  const runTriggerTest = () => {
    setIsTestSyncing(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setActiveStep(steps[i].id);
        i++;
      } else {
        clearInterval(interval);
        setActiveStep(null);
        setIsTestSyncing(false);
      }
    }, 1200); // Step light changes every 1.2 seconds
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest">
            INFRASTRUCTURE MAP & DEEP INTEGRATIONS
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 uppercase">AWS Architecture Visualization</h2>
        </div>

        <button
          id="aws-sync-trigger"
          onClick={runTriggerTest}
          disabled={isTestSyncing}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95 disabled:opacity-50 transition-all cursor-pointer shadow-md shadow-cyan-500/10"
        >
          <RefreshCw className={`w-4 h-4 ${isTestSyncing ? 'animate-spin' : ''}`} />
          Trigger Pipeline Diagnostics Test
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Visual Flow Paths list */}
        <div className="lg:col-span-8 bg-slate-900/20 rounded-2xl border border-slate-850 p-5 relative overflow-hidden flex flex-col justify-between">
          
          <div className="pb-2 border-b border-slate-900 flex items-center justify-between select-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AWS Serverless Pipeline Path</span>
            <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive diagnostics map
            </span>
          </div>

          {/* Connective pipeline lists */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isHighlight = activeStep === step.id;
              
              return (
                <div
                  key={step.id}
                  id={`aws-card-step-${step.id}`}
                  onMouseEnter={() => !isTestSyncing && setActiveStep(step.id)}
                  onMouseLeave={() => !isTestSyncing && setActiveStep(null)}
                  className={`p-3.5 rounded-xl border relative flex flex-col justify-between gap-2 transition-all cursor-pointer select-none ${
                    isHighlight 
                      ? 'bg-cyan-500/[0.04] border-cyan-400/80 shadow-lg shadow-cyan-500/5 translate-y-[-2px]' 
                      : 'bg-slate-950/40 border-slate-900'
                  }`}
                >
                  {/* Glowing index number tag */}
                  <span className={`absolute top-2.5 right-2.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isHighlight ? 'bg-cyan-400 text-slate-950' : 'bg-slate-900 text-slate-500'
                  }`}>
                    0{step.id}
                  </span>

                  <div className="space-y-1.5">
                    <Icon className={`w-5 h-5 ${step.color} ${isHighlight ? 'animate-pulse' : ''}`} />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">{step.name}</h4>
                      <p className="text-[9px] text-slate-400 font-mono leading-none">{step.type}</p>
                    </div>
                  </div>

                  {/* Connecting arrow indicators below nodes except final */}
                  {step.id < steps.length && (
                    <div className="hidden sm:flex absolute right-[-10px] top-1/2 -translate-y-1/2 text-slate-850 z-20 pointer-events-none">
                      <ChevronsRight className="w-4 h-4 text-slate-800" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Console Terminal Detail inspection panel */}
        <div className="lg:col-span-4 bg-slate-900/40 rounded-2xl border border-slate-850 p-5 flex flex-col justify-between">
          
          <div className="flex-1 flex flex-col justify-start">
            <h3 className="text-xs font-bold text-white pb-2 border-b border-slate-900 uppercase tracking-wide">Infrastructure Debugger</h3>

            <AnimatePresence mode="wait">
              {activeStep && steps.find(s => s.id === activeStep) ? (
                (() => {
                  const currentStepObj = steps.find(s => s.id === activeStep)!;
                  return (
                    <motion.div
                      key={currentStepObj.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      className="space-y-4 pt-3.5"
                    >
                      <div>
                        <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
                          {currentStepObj.type}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-2 uppercase tracking-wide">
                          {currentStepObj.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-0.5 font-mono">{currentStepObj.subtitle}</p>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-900 font-sans">
                        {currentStepObj.details}
                      </p>

                      {/* Simulated live payload code */}
                      <div className="space-y-1 font-mono">
                        <span className="text-[9px] text-slate-500 uppercase leading-none block">DIAGNOSTIC DATASTREAM PAYLOAD:</span>
                        <div className="p-3 bg-slate-950 text-[10px] text-cyan-400 rounded-lg border border-slate-900 max-h-[110px] overflow-y-auto leading-normal">
                          <code>{currentStepObj.payload}</code>
                        </div>
                      </div>

                    </motion.div>
                  );
                })()
              ) : (
                <div className="p-8 text-center text-slate-500 mt-12 md:mt-24">
                  <WorkflowIcon className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                  <p className="text-xs">Console Probe Idle.</p>
                  <p className="text-[10px] text-slate-600 mt-1 leading-normal">
                    Hover on any pipeline stage displayed in the architecture graph to probe nominal parameters and JSON API payloads!
                  </p>
                </div>
              )}
            </AnimatePresence>

          </div>

          <div className="border-t border-slate-900/60 pt-4 mt-4 text-[10px] text-slate-500 font-mono">
            <span>DIAGNOSTIC STATUS SUMMARY:</span>
            <div className="flex items-center justify-between mt-1.5 text-slate-400">
              <span>S3 BUCKET SYNC:</span>
              <span className="text-emerald-400 font-bold">STABLE</span>
            </div>
            <div className="flex items-center justify-between mt-1 text-slate-400">
              <span>BEDROCK INFERENCE RATE:</span>
              <span>1120 T/S</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
