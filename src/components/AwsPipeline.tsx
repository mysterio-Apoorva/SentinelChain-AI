import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Database, Cpu, Key, HelpCircle, HardDrive, 
  BellRing, ShieldCheck, Eye, EyeOff, Lock, AlertCircle 
} from "lucide-react";

interface AwsPipelineProps {
  currentStep: "idle" | "ingest" | "processing" | "reasoning" | "storage" | "notification" | "done";
}

export default function AwsPipeline({ currentStep }: AwsPipelineProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Translate the current active step into numerical progress for SVG alignment
  const getProgressPercentage = () => {
    switch (currentStep) {
      case "idle": return 0;
      case "ingest": return 20;
      case "processing": return 40;
      case "reasoning": return 60;
      case "storage": return 80;
      case "notification": return 100;
      case "done": return 100;
    }
  };

  const steps = [
    {
      id: "sources",
      name: "1. Data Sources",
      icon: "📡",
      arn: "feeds::logistics-hotspots",
      desc: "Aggregated unstructured news crawls, NOAA bulletins, and AIS transponder coordinates.",
      details: "Raw scraping microservices poll external rest points every 5 minutes."
    },
    {
      id: "s3",
      name: "2. Amazon S3",
      icon: "🪣",
      arn: "arn:aws:s3:::sentinelchain-raw-data-store",
      desc: "Highly durable secure object storage serving as the landing zone for unstructured raw intel.",
      details: "Bucket configured with SSE-S3 default encryption, Lifecycle transition to Glacier Instant Retrieval after 30 days."
    },
    {
      id: "lambda",
      name: "3. AWS Lambda",
      icon: "λ",
      arn: "arn:aws:lambda:us-east-1:1234:function:SignalParser",
      desc: "Serverless Node.js computing. Cleans, tokenizes, and strips noise from inbound raw text logs.",
      details: "Memory: 512MB, Timeout: 15s. Dynamically triggered on S3:ObjectCreated:* events."
    },
    {
      id: "bedrock",
      name: "4. Amazon Bedrock",
      icon: "🧠",
      arn: "bedrock::model/gemini-3.5-flash",
      desc: "Enterprise Generative AI layer. Formulates cascade risks, affected lanes, and coordinates playbooks.",
      details: "Leverages temperature = 0.1, topP = 0.9. Authenticates via IAM role-based execution policies."
    },
    {
      id: "dynamodb",
      name: "5. Amazon DynamoDB",
      icon: "⚡",
      arn: "arn:aws:dynamodb:us-east-1:1234:table/IncidentHistory",
      desc: "Fast, fully-managed NoSQL database storing structured analyzed outcomes, timelines, and mitigations.",
      details: "Partition Key: incident_id (String). On-demand capacity billing enabled. DynamoDB streams attached."
    },
    {
      id: "sns",
      name: "6. Amazon SNS",
      icon: "📢",
      arn: "arn:aws:sns:us-east-1:1234:SentinelChainAlerts",
      desc: "Simple Notification Service. Automatically dispatches multi-channel SMS, Email, and Slack topics.",
      details: "Standard SNS topic with SQS subscriptions to absorb throttling. Endpoints receive alerts instantly."
    }
  ];

  const supportingServices = [
    { id: "cloudwatch", name: "Amazon CloudWatch", icon: "👁️", desc: "Monitors CPU, RAM, Lambda execution timeouts, and collects central application log streams." },
    { id: "iam", name: "AWS IAM", icon: "🔑", desc: "Coordinates access policies across all pipeline services. Restricts cross-service communication." },
    { id: "quicksight", name: "Amazon QuickSight", icon: "📊", desc: "Builds real-time Business Intelligence dashboards reading direct analytical records." },
    { id: "secrets", name: "AWS Secrets Manager", icon: "🔒", desc: "Secures sensitive operational tokens, credential paths, and platform connection keys." }
  ];

  return (
    <section
      id="aws-pipeline"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-slate-950/10 relative"
    >
      <div className="w-full max-w-5xl">
        {/* Title */}
        <div className="text-left mb-12">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2">Stage IV — Cloud Architecture</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 uppercase">AWS Processing Pipeline</h2>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl">
            SentinelChain AI is built entirely on serverless cloud frameworks. Watch data flow dynamically through the integrated nodes below as our threat matrix runs.
          </p>
        </div>

        {/* Centerpiece: Interactive SVG Pipeline */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Interactive Node Grid (HTML Representation on top of SVG Connections) */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative z-10">
            {steps.map((node, index) => {
              const isHovered = hoveredNode === node.id;
              
              // Map steps to determine node status
              let stepStatus: "pending" | "active" | "completed" = "pending";
              const stepIndex = ["idle", "ingest", "processing", "reasoning", "storage", "notification", "done"];
              const currentStepIdx = stepIndex.indexOf(currentStep);
              
              if (currentStep === "done") {
                stepStatus = "completed";
              } else if (index < currentStepIdx) {
                stepStatus = "completed";
              } else if (index === currentStepIdx - 1) {
                stepStatus = "active";
              }

              return (
                <div
                  key={node.id}
                  className="flex flex-col items-center text-center relative group"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Outer Pulsing Indicator for Active Stage */}
                  {stepStatus === "active" && (
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 opacity-60 blur-md animate-pulse" />
                  )}

                  {/* Node Circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all border relative z-10 cursor-pointer ${
                      stepStatus === "completed"
                        ? "bg-sky-950/40 border-sky-500 text-sky-400 shadow-md shadow-sky-950/50"
                        : stepStatus === "active"
                          ? "bg-slate-900 border-sky-400 text-sky-300 scale-105"
                          : "bg-slate-950/80 border-slate-850 text-slate-500 group-hover:border-slate-700"
                    }`}
                  >
                    <span>{node.icon}</span>

                    {/* Step complete checkmark marker */}
                    {stepStatus === "completed" && (
                      <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center text-[9px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-semibold text-slate-200 mt-4 tracking-wide group-hover:text-sky-300 transition-colors">
                    {node.name}
                  </span>
                  
                  <span className="text-[9px] text-slate-500 font-mono mt-1 uppercase tracking-wider block">
                    {node.id.toUpperCase()}
                  </span>

                  {/* Tooltip Hover Overlay */}
                  {isHovered && (
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-slate-950 border border-slate-800 rounded-xl p-4 text-left z-30 shadow-2xl font-sans text-xs space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-850 pb-1.5">
                        <span className="font-bold text-slate-100">{node.name}</span>
                        <span className="text-[8px] font-mono text-sky-500">ACTIVE HANDLER</span>
                      </div>
                      <div className="text-slate-400 text-[11px] leading-relaxed">
                        {node.desc}
                      </div>
                      <div className="p-1.5 bg-slate-900/80 border border-slate-800 rounded text-[9px] font-mono text-slate-500 break-all leading-tight">
                        <div className="text-orange-400 font-bold uppercase text-[7px] mb-0.5">Resource ARN:</div>
                        {node.arn}
                      </div>
                      <div className="text-[10px] text-slate-500 italic font-mono leading-relaxed pt-1">
                        {node.details}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SVG Pipeline Connection Overlay underneath */}
          <div className="absolute top-[82px] left-14 right-14 h-1 pointer-events-none hidden md:block">
            <svg className="w-full h-8 overflow-visible" xmlns="http://www.w3.org/2000/svg">
              {/* Main Line */}
              <line
                x1="0" y1="4" x2="100%" y2="4"
                stroke="rgba(30, 41, 59, 0.4)"
                strokeWidth="2"
              />
              {/* Progress Line */}
              <motion.line
                x1="0" y1="4" x2={`${getProgressPercentage()}%`} y2="4"
                stroke="url(#skyGradient)"
                strokeWidth="2.5"
                initial={{ x2: "0%" }}
                animate={{ x2: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Moving data-packet particle along the pipeline */}
              {currentStep !== "idle" && (
                <circle r="4" fill="#38bdf8" filter="url(#glow)">
                  <animateMotion 
                    dur="3s" 
                    repeatCount="indefinite" 
                    path="M 0,4 L 800,4" 
                  />
                </circle>
              )}

              <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>

          {/* Supporting Services Row */}
          <div className="mt-14 pt-8 border-t border-slate-800/60">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-4 text-center">
              Supporting Infrastructure & Auditing Services
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {supportingServices.map((serv) => (
                <div
                  key={serv.id}
                  className="bg-slate-950/40 border border-slate-850 rounded-xl p-4 hover:border-slate-750 transition-all text-left flex items-start space-x-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-sm shrink-0 group-hover:scale-105 transition-transform">
                    {serv.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                      {serv.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed font-sans">
                      {serv.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
