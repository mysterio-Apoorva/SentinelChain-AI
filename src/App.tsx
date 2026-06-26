import { useState, useEffect } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import Sidebar from "./components/Sidebar";
import AuthModal, { IAM_ROLES } from "./components/AuthModal";
import MetricsOverlay from "./components/MetricsOverlay";
import GlobalIntelligence from "./components/GlobalIntelligence";
import GlobalMonitoring from "./components/GlobalMonitoring";
import IncomingDisruptions from "./components/IncomingDisruptions";
import AwsPipeline from "./components/AwsPipeline";
import AiReasoning from "./components/AiReasoning";
import BusinessImpact from "./components/BusinessImpact";
import Recommendations from "./components/Recommendations";
import Notifications from "./components/Notifications";
import BusinessValue from "./components/BusinessValue";
import Team from "./components/Team";
import { IAMRole, Disruption } from "./types";

export default function App() {
  const [activeRole, setActiveRole] = useState<IAMRole>(IAM_ROLES[0]); // Default: Solutions Architect
  const [showAuth, setShowAuth] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [activeDisruption, setActiveDisruption] = useState<Disruption | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Progress states: idle -> ingest -> processing -> reasoning -> storage -> notification -> done
  const [pipelineStep, setPipelineStep] = useState<"idle" | "ingest" | "processing" | "reasoning" | "storage" | "notification" | "done">("idle");

  // Keyboard shortcut listener to toggle diagnostics console (Ctrl+` or ` key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle metrics using Ctrl + ` (backtick) or single ` key press
      if (e.key === "`" || (e.key === "t" && e.ctrlKey)) {
        setShowMetrics(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sequential data-pipeline animation when a threat scenario is initiated
  const handleAnalyzeDisruption = (disruption: Disruption) => {
    setIsAnalyzing(true);
    setPipelineStep("ingest");

    // Scroll to the pipeline section first so the user can watch the packets travel!
    const pipelineEl = document.getElementById("aws-pipeline");
    if (pipelineEl) {
      pipelineEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Step-by-step progress simulation
    setTimeout(() => {
      setPipelineStep("processing"); // S3 -> Lambda
      setTimeout(() => {
        setPipelineStep("reasoning"); // Lambda -> Bedrock LLM
        setTimeout(() => {
          setPipelineStep("storage"); // Bedrock -> DynamoDB
          setTimeout(() => {
            setPipelineStep("notification"); // DynamoDB -> SNS
            setTimeout(() => {
              setPipelineStep("done"); // SNS -> complete
              setActiveDisruption(disruption);
              setIsAnalyzing(false);

              // Scroll to the detailed AI reasoning segment to inspect extracted tokens
              setTimeout(() => {
                const reasoningEl = document.getElementById("ai-reasoning");
                if (reasoningEl) {
                  reasoningEl.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }, 400);

            }, 900);
          }, 900);
        }, 900);
      }, 900);
    }, 900);
  };

  const handleDeploySuccess = (reductionValue: number) => {
    console.log(`Mitigation playbook deployed. Risk reduced by ${reductionValue}%`);
    // Scroll directly to notifications to see the SNS transmission dispatch!
    setTimeout(() => {
      const snsEl = document.getElementById("notifications");
      if (snsEl) {
        snsEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 1200);
  };

  const handleExplore = () => {
    const el = document.getElementById("incoming-disruptions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-slate-100 overflow-x-hidden antialiased">
      {/* 1. Canvas Background */}
      <AnimatedBackground />

      {/* 2. Glass Left Sidebar */}
      <Sidebar
        activeRole={activeRole}
        onOpenAuth={() => setShowAuth(true)}
        onToggleMetrics={() => setShowMetrics(prev => !prev)}
        showMetrics={showMetrics}
      />

      {/* 3. Main Scroll Container for the Homepage Cinematic Journey */}
      <main className="pl-[68px] sm:pl-20 pr-4 md:pr-10 w-full flex flex-col relative z-10">
        
        {/* Section 1: Global Intelligence (Hero and Hotspots) */}
        <GlobalIntelligence
          activeRole={activeRole}
          onOpenAuth={() => setShowAuth(true)}
          onExplore={handleExplore}
        />

        {/* Section 2: Global Monitoring (S3 Ingestion Signals) */}
        <GlobalMonitoring />

        {/* Section 3: Incoming Disruptions (Template or Custom input Console) */}
        <IncomingDisruptions
          onAnalyzeDisruption={handleAnalyzeDisruption}
          isAnalyzing={isAnalyzing}
        />

        {/* Section 4: AWS Pipeline (Interactive Architecture diagram) */}
        <AwsPipeline currentStep={pipelineStep} />

        {/* Section 5: AI Reasoning (Tokenizing and classification visualizer) */}
        <AiReasoning activeDisruption={activeDisruption} isAnalyzing={isAnalyzing} />

        {/* Section 6: Business Impact (Area stock & cost charts) */}
        <BusinessImpact activeDisruption={activeDisruption} />

        {/* Section 7: Recommendations (Playbook execution controls) */}
        <Recommendations
          activeDisruption={activeDisruption}
          onDeploySuccess={handleDeploySuccess}
        />

        {/* Section 8: Notifications (Amazon SNS Alerts Hub) */}
        <Notifications />

        {/* Section 9: Business Value (Quantitative Commercial ROI) */}
        <BusinessValue />

        {/* Section 10: Team (Architect Governance Profile) */}
        <Team />
      </main>

      {/* 4. Federated IAM / SSO Authorization Portal Modal Overlay */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        activeRole={activeRole}
        onSelectRole={setActiveRole}
      />

      {/* 5. Operations Diagnostics Floating Console Telemetry */}
      <MetricsOverlay
        isOpen={showMetrics}
        onClose={() => setShowMetrics(false)}
      />
    </div>
  );
}
