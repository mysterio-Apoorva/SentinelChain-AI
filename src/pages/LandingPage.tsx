import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  ArrowRight, 
  Cpu, 
  Workflow, 
  Mic2, 
  Share2, 
  Clock, 
  TrendingUp, 
  Globe, 
  Database,
  CloudLightning,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';

export const LandingPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const ContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-x-hidden font-sans">
      
      {/* Background grids & custom glows */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-950/25 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute top-[50%] right-[[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Grid Pattern BG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* HEADER NAVBAR */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-900">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 shadow-lg shadow-cyan-500/15">
            <ShieldAlert className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-extrabold text-white text-lg tracking-wider">SENTINELCHAIN</span>
            <span className="text-[10px] block font-mono text-cyan-400 tracking-widest leading-none mt-0.5">AI SUPPLY RISK RISK</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300 font-medium select-none">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#workflow" className="hover:text-white transition">Product Loop</a>
          <a href="#aws" className="hover:text-white transition">AWS Architecture</a>
          <a href="#testimonials" className="hover:text-white transition">Testimonials</a>
          <Link to="/app/team" className="text-cyan-400 hover:text-cyan-300 font-bold transition flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Team
          </Link>
        </nav>

        <div>
          <Link
            to="/app/dashboard"
            id="launch-platform-nav-btn"
            className="px-4.5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-cyan-400/25 transition-all flex items-center gap-2 group"
          >
            Launch Platform
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* HERO LEFT */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-6 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Empowered by Amazon Nova & Bedrock Agents
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            Autonomous <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 animate-gradient-shift">Supply Chain Risk</span> Intelligence Agent
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl">
            SentinelChain AI monitors maritime routes, climate shifts, port closures, and geopolitical data in real time. Predict disruptions before they trigger delays, run automated alternative source simulation, and receive instant AWS Nova Sonic voice briefings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/app/dashboard"
              id="hero-launch-btn"
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
            >
              Enterprise Dashboard
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#aws"
              className="px-6 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-850 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Workflow className="w-4 h-4 text-cyan-400" />
              AWS Architecture Flow
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-9 border-t border-slate-900 pt-8 w-full">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">99.8%</p>
              <p className="text-xs text-slate-400 font-medium">Risk Retrieval Rate</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">&lt; 15m</p>
              <p className="text-xs text-slate-400 font-medium">Detection SLA</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">1.4M+</p>
              <p className="text-xs text-slate-400 font-medium">Nodes Monitored Daily</p>
            </div>
          </div>
        </div>

        {/* HERO RIGHT (Interactive Visual Graphic) */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="w-full max-w-[450px] aspect-square rounded-3xl bg-slate-900/40 border border-slate-800/80 p-6 relative flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl group">
            
            <div className="absolute top-0 right-0 p-3 bg-gradient-to-bl from-cyan-500/10 to-transparent text-[10px] font-mono text-cyan-400 border-l border-b border-slate-800/60 font-semibold">
              SECURE GLOBAL FEED
            </div>

            {/* Glowing Orbs */}
            <span className="absolute top-[40%] left-[20%] w-[12px] h-[12px] rounded-full bg-rose-500 animate-ping" />
            <span className="absolute top-[40%] left-[20%] w-[10px] h-[10px] rounded-full bg-rose-500 shadow-md shadow-rose-500/60" />

            <span className="absolute top-[60%] right-[30%] w-[8px] h-[8px] rounded-full bg-emerald-500" />

            {/* Simulated Radar sweep line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-40 pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-semibold text-slate-400 tracking-wider">THREAT DETECTED</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  CRITICAL
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Rotterdam Port Dockworkers Strike</h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  45 ocean containers impacted. Lead-time delay predicted to escalate from 2 days to 12 days.
                </p>
              </div>
            </div>

            {/* Interactive SVG Connector Line Chart */}
            <div className="my-4 h-24 flex items-center justify-center relative">
              <svg className="w-full h-full stroke-orange-500/40" viewBox="0 0 400 100" fill="none">
                <path d="M 20,80 Q 120,10 200,80 T 380,20" strokeWidth="2" strokeDasharray="6 3" />
                <path d="M 20,80 Q 120,10 200,80 T 380,20" strokeWidth="2" className="stroke-cyan-400 animate-stroke-dash" style={{ strokeDashoffset: 100, strokeDasharray: 200 }} />
                
                {/* Dots at intersection */}
                <circle cx="20" cy="80" r="5" fill="#06b6d4" />
                <circle cx="200" cy="80" r="4" fill="#a855f7" />
                <circle cx="380" cy="20" r="5" fill="#f43f5e" />
              </svg>
              <div className="absolute bottom-1 right-2 hover:bg-slate-800 text-[9px] font-mono text-cyan-400">
                ACTIVE REROUTE PREDICTED
              </div>
            </div>

            {/* AWS NOVA SONIC VOICE PROMPT SIMULATOR */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2 mb-1.5">
                <Mic2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400">AMAZON NOVA SONIC BRIEF:</span>
              </div>
              <p className="text-[10px] text-slate-300 italic">
                "Warning: Striking actions at Rotterdam seaport will delay casting hulls by 12 days. Switching to secondary supplier in Austin recommended."
              </p>
            </div>
            
          </div>
        </div>

      </section>

      {/* CORE CAPABILITIES / FEATURES */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase mb-3">Enterprise Suite</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">Continuous Autonomous Surveillance</p>
          <p className="text-slate-400 mt-4 leading-relaxed text-sm sm:text-base">
            SentinelChain AI combines climate modeling, port logistics APIs, and large language models into a unified risk control plane.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Map */}
          <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 mb-5 border border-cyan-800/40">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2.5">Global Risk Center Mapping</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plot storm vectors, naval blockades, geopolitical closures, and local factory outages directly on a beautiful interactive geographic world tracking matrix.
            </p>
          </div>

          {/* Card 2: Twin */}
          <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 mb-5 border border-cyan-800/40">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2.5">Digital Twin Network Nodes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Model your entire operation—from raw mines and primary fabricators, to consolidation hubs, distribution networks, and gigafactory lines.
            </p>
          </div>

          {/* Card 3: Alternative Recommendation */}
          <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 mb-5 border border-cyan-800/40">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2.5">Smart Backup Recommendations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deploying multi-attribute scoring models to match primary disrupted vendors against qualified backup suppliers, considering pricing, routing limits, and lead times.
            </p>
          </div>

          {/* Card 4: Audio voice briefing */}
          <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 mb-5 border border-cyan-800/40">
              <Mic2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2.5">Simulated Nova Sonic Briefs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Experience lightning fast text-to-speech audio logs. Listen to operational briefs detailing threat profiles, material exposure, and immediate mitigation commands.
            </p>
          </div>

          {/* Card 5: AWS Architecture */}
          <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 mb-5 border border-cyan-800/40">
              <Workflow className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2.5">Deeply Unified AWS Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Visually inspect how Amazon S3, Bedrock Knowledge Bases, EventBridge, AWS Lambda, and SNS coordinate to generate warnings.
            </p>
          </div>

          {/* Card 6: Enterprise Control */}
          <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 mb-5 border border-cyan-800/40">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2.5">Defensive Guardrails</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verify decisions in our advanced Risk Assessment Engine, using confidence multipliers, financial exposures, and impact limits before ordering container rollbacks.
            </p>
          </div>

        </div>
      </section>

      {/* PRODUCT WORKFLOW LOOP */}
      <section id="workflow" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase mb-3">Operational Loop</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">How SentinelChain AI Mitigates Risks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
          
          {/* Connector Line in Background for Desktop */}
          <div className="hidden lg:block absolute top-12 left-24 right-24 h-[1px] bg-slate-850 stroke-[3] z-0" />

          {/* Step 1 */}
          <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl relative z-10">
            <span className="absolute top-4 right-4 text-xs font-mono font-bold text-cyan-500/40">01</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center text-xs font-bold mb-4">
              DET
            </div>
            <h4 className="text-sm font-bold text-white mb-2">1. Detect Threats</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              System flags extreme weather forecasts, shipping logs, labor disputes, or raw metal tariff shifts.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl relative z-10">
            <span className="absolute top-4 right-4 text-xs font-mono font-bold text-cyan-500/40">02</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center text-xs font-bold mb-4">
              MAP
            </div>
            <h4 className="text-sm font-bold text-white mb-2">2. Map Critical Impact</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Traces affected material SKUs, primary suppliers, and delayed ocean vessels back to production twins.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl relative z-10">
            <span className="absolute top-4 right-4 text-xs font-mono font-bold text-cyan-500/40">03</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center text-xs font-bold mb-4">
              ALT
            </div>
            <h4 className="text-sm font-bold text-white mb-2">3. Sourcing Scenarios</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Coordinates alternatives based on geographical proximity, reliability ratings, and pricing profiles.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl relative z-10">
            <span className="absolute top-4 right-4 text-xs font-mono font-bold text-cyan-500/40">04</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center text-xs font-bold mb-4">
              VOX
            </div>
            <h4 className="text-sm font-bold text-white mb-2">4. Disseminate Solutions</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Generates visual risk files, alerts logisticians via SNS, and delivers audio briefings via Nova Sonic speaker.
            </p>
          </div>

        </div>
      </section>

      {/* DETAILED AWS ARCHITECTURE SUMMARY GRID (Landing preview) */}
      <section id="aws" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900 bg-slate-900/10 rounded-3xl my-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-left">
            <h3 className="text-xs font-bold text-purple-400 font-mono tracking-widest uppercase mb-3">Enterprise Infrastructure</h3>
            <h2 className="text-3xl font-extrabold text-white mb-4">Serverless AI Retrieval Plane</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              SentinelChain AI is engineered from the ground up to utilize AWS native serverless tech. Automated schedules scrape news to S3 buckets, trigger embeddings calculations on Amazon Nova Embeddings, query vector indexes on vector databases, construct Bedrock AI Agent chains, and notify coordinators using SNS.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1" />
                <span className="text-xs text-slate-300">Amazon Nova & Bedrock: Autonomous Agent Reasoning</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1" />
                <span className="text-xs text-slate-300">S3 & Knowledge Bases: Safe internal inventory retrieval</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1" />
                <span className="text-xs text-slate-300">SNS & Nova Sonic: Low latency notifications & speech</span>
              </div>
            </div>
            
            <div className="mt-8">
              <Link
                to="/app/aws-architecture"
                id="view-detailed-aws-btn"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 font-semibold text-xs border border-slate-800 transition-all"
              >
                Inspect Detailed AWS Architecture Page
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-900 relative">
            <div className="text-[10px] font-mono text-pink-400 mb-4 tracking-wider">
              [VISUALIZED AWS DATA PIPELINE FLOW]
            </div>

            <div className="flex flex-col gap-4 select-none">
              
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                  <Database className="w-4 h-4 text-cyan-400 mx-auto mb-1.5" />
                  <span className="text-[9px] font-mono font-bold block text-white uppercase">Amazon S3</span>
                  <span className="text-[8px] text-slate-500 block leading-tight">Threat Storage</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-purple-900/50 text-center animate-pulse">
                  <Cpu className="w-4 h-4 text-purple-400 mx-auto mb-1.5" />
                  <span className="text-[9px] font-mono font-bold block text-white uppercase font-sans">Nova Embed</span>
                  <span className="text-[8px] text-slate-500 block leading-tight">Vectors pipeline</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                  <Share2 className="w-4 h-4 text-cyan-400 mx-auto mb-1.5" />
                  <span className="text-[9px] font-mono font-bold block text-white uppercase">Knowledge Base</span>
                  <span className="text-[8px] text-slate-500 block leading-tight">Retrieval Index</span>
                </div>
              </div>

              <div className="text-center text-slate-600 block h-1 relative">
                <span className="block border-t border-slate-800 w-full" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 px-2 font-mono text-[9px] text-slate-500">
                  AGENT EXECUTION
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-slate-900/50 border border-cyan-800/40 text-left">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[10px] font-mono font-bold text-cyan-400">BEDROCK AGENT</span>
                  </div>
                  <p className="text-[9px] text-slate-400 leading-snug">
                    Synthesizes alerts, checks twin nodes, calculates delay exposures, selects alternative suppliers.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-850 text-left">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CloudLightning className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[10px] font-mono font-bold text-white">AWS LAMBDA & SNS</span>
                  </div>
                  <p className="text-[9px] text-slate-400 leading-snug">
                    Serverless functions trigger webhook dispatches, updating local alert registries and logging mobile alerts.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase mb-3">Enterprise Trust</h2>
          <p className="text-3xl font-extrabold text-white">Logisticians in Command</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-6 bg-slate-900/20 rounded-2xl border border-slate-850">
            <p className="text-slate-300 text-xs italic leading-relaxed mb-6">
              "We connected SentinelChain AI to our overseas semiconductor routing manifests. When Typhoon Gaemi was flagged within the Hsinchu corridor, SentinelChain immediately suggested swap scenarios with a domestic Austin producer. We mitigated a high risk assembly delay 5 days before landfall."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden">
                <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Timothy Crane</h5>
                <span className="text-[10px] text-slate-500 font-mono block">VP OF GLOBAL OPERATIONS, AEROMOTIVE</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900/20 rounded-2xl border border-slate-850">
            <p className="text-slate-300 text-xs italic leading-relaxed mb-6">
              "The voice briefing using Nova Sonic is incredibly convenient for our command deck teams. We get scannable, conversational summaries of delayed maritime hulls without combing through complex tracking databases."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden">
                <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Helena Rostova</h5>
                <span className="text-[10px] text-slate-500 font-mono block">DIRECTOR OF INDUSTRIAL FLOW, SOLARO INDUSTRIAL</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FUTURE FOUNDRY TEAM COLLABORATION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900 bg-gradient-to-b from-slate-900/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              Academic Alliance: Future Foundry
            </div>
            <h2 className="text-3xl font-extrabold text-white">DTU & IGDTUW Collaboration</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              SentinelChain AI is developed by <strong>Future Foundry</strong>, a multi-institutional team of student engineers from Delhi Technological University (DTU) and Indira Gandhi Delhi Technological University for Women (IGDTUW).
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Our diverse talent pools cover full-stack React architectures, cloud orchestration logic, Amazon Bedrock automated workflow triggers, and advanced risk scoring algorithms.
            </p>
            <div className="pt-4">
              <Link
                to="/app/team"
                id="landing-view-team-btn"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/10"
              >
                View Live Team Ledger & Milestones
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-900/40 border border-slate-850 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-white uppercase font-mono">Apoorva Kumar Jha</h4>
              <p className="text-[10px] text-cyan-400 font-mono">DTU • Full Stack & Cloud</p>
              <p className="text-[11px] text-slate-400 leading-normal">
                Architected modular React core layout and AWS diagnostic console.
              </p>
            </div>
            <div className="p-5 bg-slate-900/40 border border-slate-850 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-white uppercase font-mono">Siddhi</h4>
              <p className="text-[10px] text-purple-400 font-mono">IGDTUW • AI/ML Pipeline</p>
              <p className="text-[11px] text-slate-400 leading-normal">
                Designed predictive threat metric calculations and supplier index maps.
              </p>
            </div>
            <div className="p-5 bg-slate-900/40 border border-slate-850 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-white uppercase font-mono">Shreya</h4>
              <p className="text-[10px] text-amber-400 font-mono">IGDTUW • Backend & Data</p>
              <p className="text-[11px] text-slate-400 leading-normal">
                Built cloud event brokers and synchronized S3 vectors ingestion stream.
              </p>
            </div>
            <div className="p-5 bg-slate-900/40 border border-slate-850 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-white uppercase font-mono">Shambhavi</h4>
              <p className="text-[10px] text-emerald-400 font-mono">IGDTUW • UI/UX & Design</p>
              <p className="text-[11px] text-slate-400 leading-normal">
                Forged spatial visual styles, responsive vectors, and typography details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA GIGANTIC BANNER */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-950/40 via-indigo-950/20 to-cyan-950/40 p-12 rounded-3xl border border-cyan-500/10 shadow-2xl relative overflow-hidden">
          
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Autonomous Resilience Awaits
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Eliminate reactive logistics. Step into our predictive, AI-driven control deck and safeguard your enterprise shipments globally.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              to="/app/dashboard"
              id="cta-enter-platform-btn"
              className="px-8.5 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold text-xs tracking-wider uppercase hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 group shadow-lg shadow-cyan-500/20"
            >
              Enter Control Deck
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 select-none font-mono">
        <div>
          <span>© 2026 SENTINELCHAIN AI INC. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-300 cursor-pointer">Security Standards</span>
          <span className="text-slate-800">•</span>
          <Link to="/app/team" className="hover:text-cyan-400 text-slate-400 font-bold transition flex items-center gap-1">
            Future Foundry Team
          </Link>
          <span className="text-slate-800">•</span>
          <span className="hover:text-slate-300 cursor-pointer">AWS Shared Model</span>
          <span className="text-slate-800">•</span>
          <span className="hover:text-slate-300 cursor-pointer flex items-center gap-1">
            <Lock className="w-3 h-3 text-cyan-500" />
            System Status: 100% Operational
          </span>
        </div>
      </footer>

    </div>
  );
};
