import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  Activity, 
  Flame, 
  Cpu, 
  BrainCircuit, 
  TrendingUp, 
  CheckSquare, 
  BellRing, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Settings,
  Terminal
} from "lucide-react";
import { IAMRole } from "../types";

interface SidebarProps {
  activeRole: IAMRole;
  onOpenAuth: () => void;
  onToggleMetrics: () => void;
  showMetrics: boolean;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
}

export default function Sidebar({ activeRole, onOpenAuth, onToggleMetrics, showMetrics }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("global-intelligence");

  const navItems: NavItem[] = [
    { id: "global-intelligence", label: "Global Intelligence", icon: Globe },
    { id: "global-monitoring", label: "Global Monitoring", icon: Activity },
    { id: "incoming-disruptions", label: "Incoming Disruptions", icon: Flame },
    { id: "aws-pipeline", label: "AWS Processing Pipeline", icon: Cpu },
    { id: "ai-reasoning", label: "AI Reasoning", icon: BrainCircuit },
    { id: "business-impact", label: "Business Impact", icon: TrendingUp },
    { id: "recommendations", label: "Recommendations", icon: CheckSquare },
    { id: "notifications", label: "Notifications", icon: BellRing },
    { id: "business-value", label: "Business Value", icon: DollarSign },
    { id: "team", label: "Team", icon: Users },
  ];

  // Watch scrolling position to highlight correct navigation item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once at start
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      id="left-glass-sidebar"
      className="fixed left-5 top-1/2 -translate-y-1/2 h-[90vh] z-40 flex flex-col justify-between bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl rounded-2xl py-6 select-none shadow-2xl"
      animate={{ width: isExpanded ? 240 : 68 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Top Brand Logo */}
      <div className="px-4 flex items-center space-x-3 overflow-hidden">
        <div className="min-w-[36px] h-9 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col whitespace-nowrap"
            >
              <span className="text-sm font-bold tracking-wider text-slate-100 uppercase">
                SentinelChain
              </span>
              <span className="text-[9px] text-sky-400 font-mono tracking-widest uppercase">
                AI / Version 2.0
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation List */}
      <nav className="flex flex-col space-y-1 px-2.5 mt-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative flex items-center w-full rounded-xl py-2.5 px-3 transition-all group ${
                isActive 
                  ? "text-sky-400 bg-sky-950/20 border-l-2 border-sky-500 pl-2.5" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 border-l-2 border-transparent"
              }`}
            >
              <div className="flex items-center justify-center min-w-[20px]">
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-sky-400" : "text-slate-400 group-hover:text-sky-300"}`} />
              </div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    className="ml-3.5 text-xs font-medium tracking-wide whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Tooltip for unexpanded sidebar */}
              {!isExpanded && (
                <div className="absolute left-16 bg-slate-950 border border-slate-800 text-slate-200 text-[10px] py-1 px-2.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-sans font-medium shadow-xl">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Identity & Diagnostics Control */}
      <div className="px-2.5 flex flex-col space-y-2">
        {/* Toggle Diagnostics Console */}
        <button
          onClick={onToggleMetrics}
          className={`relative flex items-center w-full rounded-xl py-2 px-3 transition-all ${
            showMetrics 
              ? "text-emerald-400 bg-emerald-950/15 border border-emerald-500/20" 
              : "text-slate-400 hover:bg-slate-900/30"
          }`}
        >
          <div className="flex items-center justify-center min-w-[20px]">
            <Terminal className="w-4 h-4" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                className="ml-3.5 text-[10px] font-mono tracking-wider uppercase whitespace-nowrap"
              >
                Telemetry [CTRL+`]
              </motion.span>
            )}
          </AnimatePresence>
          {!isExpanded && (
            <div className="absolute left-16 bg-slate-950 border border-slate-800 text-slate-200 text-[10px] py-1 px-2.5 rounded-md opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-mono shadow-xl">
              Telemetry Diagnostics
            </div>
          )}
        </button>

        {/* AWS IAM Role Picker Profile */}
        <button
          onClick={onOpenAuth}
          className="relative flex items-center w-full rounded-xl p-1.5 transition-all bg-slate-900/40 border border-slate-800/40 hover:border-sky-500/30 hover:bg-slate-900/60"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 text-sky-400 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                className="ml-3 flex flex-col items-start overflow-hidden whitespace-nowrap text-left"
              >
                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">
                  Active IAM Role
                </span>
                <span className="text-[11px] font-semibold text-slate-200 truncate max-w-[140px]">
                  {activeRole.title}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          {!isExpanded && (
            <div className="absolute left-16 bg-slate-950 border border-slate-800 text-slate-200 text-[10px] py-1 px-2.5 rounded-md opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-sans shadow-xl">
              SSO: {activeRole.title}
            </div>
          )}
        </button>
      </div>
    </motion.div>
  );
}
