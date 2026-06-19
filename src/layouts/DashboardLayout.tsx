import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSentinel } from '../hooks/useSentinelState';
import { 
  LayoutDashboard, 
  Map, 
  Newspaper, 
  Share2, 
  Cpu, 
  Award, 
  Mic2, 
  Workflow, 
  BarChart2, 
  BellRing, 
  Settings, 
  Menu, 
  X, 
  Globe, 
  Play, 
  Square,
  ShieldAlert,
  Sliders,
  Sparkles,
  ExternalLink,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { 
    alerts, 
    awsConfig, 
    isPlayingVoice, 
    activeVoiceBriefing, 
    stopVoiceBriefing 
  } = useSentinel();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeAlertsCount = alerts.filter(a => a.status === 'Active').length;
  const criticalAlertsCount = alerts.filter(a => a.status === 'Active' && a.severity === 'Critical').length;

  const menuItems = [
    { path: '/app/dashboard', name: 'Executive Dashboard', icon: LayoutDashboard },
    { path: '/app/risk-center', name: 'Global Risk Center', icon: Map },
    { path: '/app/news-feed', name: 'News Intelligence', icon: Newspaper },
    { path: '/app/digital-twin', name: 'Digital Twin', icon: Share2 },
    { path: '/app/risk-engine', name: 'Risk Assessment', icon: Sliders },
    { path: '/app/alternatives', name: 'Alternative Sourcing', icon: Award },
    { path: '/app/voice-ai', name: 'Voice AI Comm Center', icon: Mic2 },
    { path: '/app/aws-architecture', name: 'AWS Architecture', icon: Workflow },
    { path: '/app/analytics', name: 'Analytics Deep Dive', icon: BarChart2 },
    { path: '/app/alerts', name: 'Alert Control Center', icon: BellRing, badge: activeAlertsCount },
    { path: '/app/settings', name: 'Settings & Orgs', icon: Settings },
    { path: '/app/team', name: 'Team & Contributors', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-slate-900">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(15,23,42,0.85)_0%,rgba(3,7,18,1)_100%)] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none z-0" />
      
      {/* MAIN LAYOUT */}
      <div className="flex flex-1 z-10">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-64 bg-slate-900/60 backdrop-blur-xl border-r border-slate-800/80 p-4 sticky top-0 h-screen transition-all duration-300">
          
          {/* BRAND LOGO */}
          <div className="flex items-center gap-3 px-2 py-4 border-b border-slate-800/60 mb-6">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-md shadow-cyan-500/20">
              <ShieldAlert className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white uppercase">SentinelChain</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-cyan-400 tracking-wider">AI AGENT ENGINE</span>
              </div>
            </div>
          </div>

          {/* MAIN MENU LINKS */}
          <nav className="flex-1 space-y-1 overflow-y-auto pr-1 select-none">
            {menuItems.map(item => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  id={`nav-link-${item.path.split('/').pop()}`}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/10 to-indigo-500/5 border-l-2 border-cyan-400 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border-l-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${isActive ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* SIDEBAR FOOTER */}
          <div className="border-t border-slate-800/60 pt-4 mt-auto">
            <Link 
              to="/" 
              id="sidebar-landing-link"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800/50 hover:border-slate-700 hover:bg-slate-950/80 transition-all text-xs group"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span className="text-slate-300 font-medium">Public Landing Page</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <div className="mt-3 flex items-center justify-between px-2 text-[10px] font-mono text-slate-500">
              <span>VERSION 4.2.0</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                AWS NORTH VIRGINIA
              </span>
            </div>
          </div>
        </aside>

        {/* MOBILE HEADER */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 flex items-center justify-between z-30">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-500">
              <ShieldAlert className="w-4 h-4 text-slate-950" />
            </div>
            <span className="font-bold text-white tracking-wider text-sm">SENTINELCHAIN</span>
          </Link>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="lg:hidden fixed inset-y-0 left-0 w-64 bg-slate-950 border-r border-slate-800 p-4 z-20 pt-20 flex flex-col"
            >
              <nav className="flex-1 space-y-1.5 overflow-y-auto">
                {menuItems.map(item => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-cyan-500/10 border-l-2 border-cyan-400 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
              <div className="border-t border-slate-900 pt-4 mt-auto">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900 hover:bg-slate-800 transition text-xs"
                >
                  <span className="text-slate-300">Public Landing Page</span>
                  <Globe className="w-4 h-4 text-cyan-400" />
                </Link>
                <p className="mt-3 text-center text-[10px] font-mono text-slate-500">
                  SENTINELCHAIN AI • AWS ENGINE
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTENT & TOPBAR CONTAINER */}
        <div className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
          
          {/* HEADER TOPBAR */}
          <header className="h-16 border-b border-slate-800/40 bg-slate-950/40 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
            
            {/* SEARCH / PAGE STATUS */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800/60 text-xs">
                <span className="text-slate-400">Environment:</span>
                <span className="text-emerald-400 font-mono font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  AWS PRODUCTION LIVE
                </span>
              </div>
              
              {criticalAlertsCount > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 animate-pulse">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{criticalAlertsCount} Critical Risks Detected</span>
                </div>
              )}
            </div>

            {/* AWS LIVE STATUS PILLS */}
            <div className="flex items-center gap-4 ml-auto">
              
              {/* CLOUD CONNECTIONS STATUSES */}
              <div className="hidden xl:flex items-center gap-3 bg-slate-900/30 p-1.5 rounded-xl border border-slate-800/40">
                
                {/* S3 */}
                <span className="flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] bg-slate-950/60 border border-slate-800">
                  <span className={`w-1.5 h-1.5 rounded-full ${awsConfig.s3Status === 'connected' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <span className="text-slate-400">AMAZON S3</span>
                </span>

                {/* Bedrock */}
                <span className="flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] bg-slate-950/60 border border-slate-800">
                  <span className={`w-1.5 h-1.5 rounded-full ${awsConfig.bedrockStatus === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="text-slate-400">AWS BEDROCK</span>
                </span>

                {/* Nova Sonic */}
                <span className="flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] bg-slate-950/60 border border-slate-800">
                  <span className={`w-1.5 h-1.5 rounded-full ${awsConfig.sonicStatus === 'connected' ? 'bg-cyan-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="text-slate-400">NOVA SONIC AI</span>
                </span>

              </div>

              {/* USER PROFILE */}
              <div className="flex items-center gap-3 pl-3 border-l border-slate-800/40">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold text-white">Vance Administration</p>
                  <p className="text-[10px] text-slate-400 font-mono">GLOBAL MANAGER</p>
                </div>
                <div className="w-9 h-9 rounded-full ring-2 ring-cyan-500/30 overflow-hidden bg-slate-800">
                  <img
                    referrerPolicy="no-referrer"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>

          </header>

          {/* MAIN PAGE CONTAINER WITH AN ENTRY TRANSITION */}
          <main className="flex-1 p-6 relative overflow-y-auto">
            {children}
          </main>

        </div>

      </div>

      {/* FLOAT BRIEFING VOICE CONTROLLER (simulating amazon nova sonic speaker) */}
      <AnimatePresence>
        {isPlayingVoice && activeVoiceBriefing && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            id="voice-briefing-toast"
            className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl rounded-2xl p-4 shadow-2xl shadow-cyan-500/10 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/25 border border-cyan-400/40 text-cyan-400 animate-pulse">
                  <Mic2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide uppercase">Nova Sonic Voice Assistant</h4>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[9px] font-mono text-cyan-300">STREAMING EMBEDDED BRIEFING</span>
                  </div>
                </div>
              </div>
              <button 
                id="stop-voice-btn"
                onClick={stopVoiceBriefing}
                className="p-1 px-2 rounded-md bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700/50 text-[10px] font-mono transition-all flex items-center gap-1"
              >
                <Square className="w-2.5 h-2.5" />
                STOP
              </button>
            </div>

            <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/40">
              <p className="text-[11px] text-slate-300 italic leading-relaxed">
                "{activeVoiceBriefing}"
              </p>
            </div>

            {/* Simulated sound waveform overlay */}
            <div className="flex items-center justify-center gap-1.5 h-7 px-2">
              {[...Array(24)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={{
                    height: [
                      '4px', 
                      `${Math.sin(i * 0.5) * 16 + 18}px`, 
                      `${Math.cos(i * 0.3) * 12 + 10}px`,
                      '4px'
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1 + Math.random() * 0.8,
                    ease: 'easeInOut'
                  }}
                  className="w-1 rounded-full bg-cyan-400/80"
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between text-[8px] font-mono text-slate-500">
              <span>VOICE ENGINE: NOVA-SONIC-2026</span>
              <span>LATENCY: 142MS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
