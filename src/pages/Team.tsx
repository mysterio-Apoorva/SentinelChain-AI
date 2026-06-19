import React from 'react';
import { useSentinel } from '../hooks/useSentinelState';
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  Github, 
  Linkedin, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  Target, 
  Cpu, 
  Database, 
  Layers, 
  Zap, 
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const Team: React.FC = () => {
  const { startVoiceBriefing } = useSentinel();

  // Team stat metrics
  const stats = [
    { label: 'Team Size', value: '4', descriptor: 'Multi-institutional engineers', icon: Users, color: 'text-cyan-400 border-cyan-500/20' },
    { label: 'Universities', value: '2', descriptor: 'DTU & IGDTUW Collaboration', icon: GraduationCap, color: 'text-purple-400 border-purple-500/20' },
    { label: 'AWS Services Used', value: '8+', descriptor: 'Serverless BEDROCK & Cloud Orchestrations', icon: Zap, color: 'text-amber-400 border-amber-500/20' },
    { label: 'Core Modules', value: '10+', descriptor: 'Risk Evaluators & Micro-Views', icon: Layers, color: 'text-emerald-400 border-emerald-500/20' }
  ];

  // Team member information
  const members = [
    {
      id: 'apoorva',
      name: 'Apoorva Kumar Jha',
      institution: 'Delhi Technological University (DTU)',
      role: 'Full Stack Developer & Cloud Engineer',
      skills: ['Frontend Architecture', 'Dashboard Development', 'AWS Integration Planning', 'Product Architecture', 'React.js', 'TypeScript', 'Tailwind CSS', 'Bedrock RAG'],
      bio: 'Architected the modular single-page core, routed low-latency state handlers, mapped the interactive vector digital-twin interfaces, and crafted the AWS pipeline debugger.',
      linkedin: 'https://linkedin.com/in/apoorva-kumar-jha',
      github: 'https://github.com/apoorvajha',
      color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
    },
    {
      id: 'siddhi',
      name: 'Siddhi',
      institution: 'Indira Gandhi Delhi Technological University for Women (IGDTUW)',
      role: 'AI/ML Engineer',
      skills: ['AI/ML Pipeline Design', 'Risk Assessment Logic', 'Recommendation Systems', 'Model Parameterization', 'Python', 'PyTorch', 'Data Modeling', 'Bedrock Agents'],
      bio: 'Designed the underlying threat scoring math algorithms, structured alternate supplier ranking indexes, and tuned intelligence response models for risk evaluations.',
      linkedin: 'https://linkedin.com/in/siddhi-igdtuw',
      github: 'https://github.com/siddhi',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
    },
    {
      id: 'shreya',
      name: 'Shreya',
      institution: 'Indira Gandhi Delhi Technological University for Women (IGDTUW)',
      role: 'Backend & Data Engineer',
      skills: ['Backend Services', 'Data Processing', 'API Design', 'Express', 'Node.js', 'System Integrations', 'REST APIs', 'Cloud databases'],
      bio: 'Developed dynamic data brokers, modeled API schemas for external alerts integration, and synchronized backend-side pipelines with S3 vectors and knowledge indexes.',
      linkedin: 'https://linkedin.com/in/shreya-igdtuw',
      github: 'https://github.com/shreya',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    {
      id: 'shambhavi',
      name: 'Shambhavi',
      institution: 'Indira Gandhi Delhi Technological University for Women (IGDTUW)',
      role: 'UI/UX Designer & Frontend Developer',
      skills: ['UI/UX Design', 'User Research', 'Interface Prototyping', 'Figma Wireframing', 'Typography Design', 'Tailwind Components', 'Framer Motion', 'Visual Continuity'],
      bio: 'Forged the premium dark spatial aesthetic theme, executed high-contrast layout margins, engineered sleek custom vector graphics, and led frontend prototyping sprints.',
      linkedin: 'https://linkedin.com/in/shambhavi-igdtuw',
      github: 'https://github.com/shambhavi',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    }
  ];

  // Development milestones list
  const journeySteps = [
    { phase: '1', title: 'Problem Identification', description: 'Deconstructed modern maritime bottlenecks and regional chokepoints threatening micro-chip and raw materials lines.', status: 'completed' },
    { phase: '2', title: 'Research & Planning', description: 'Evaluated predictive forecasting engines, surveyed routing models, and chose the high-efficiency Amazon Bedrock vector layers.', status: 'completed' },
    { phase: '3', title: 'Architecture Design', description: 'Constructed detailed system dependency maps connecting S3 ingestion, EventBridge cron, Lambda triggers, and Nova Sonic spoken briefs.', status: 'completed' },
    { phase: '4', title: 'Frontend Development', description: 'Programmed the React dashboard layout, fully modular routing structure, global alerts status triggers, and vector-based geographical maps.', status: 'completed' },
    { phase: '5', title: 'AI Pipeline Design', description: 'Calculated mathematical regional threat multipliers and integrated standard Amazon Bedrock recommendations indices for alternate suppliers.', status: 'completed' },
    { phase: '6', title: 'AWS Integration', description: 'Mapped live-synced pipeline payloads, simulated streaming voice synthesis models, and built the visual serverless console probes.', status: 'completed' },
    { phase: '7', title: 'Testing & Validation', description: 'Audited component files for flawless generation, vetted reactive useEffect triggers to block infinite renders, and compiled production runs.', status: 'completed' },
    { phase: '8', title: 'Final Demonstration', description: 'Ready to pitch SentinelChain AI: the ultimate autonomous, real-time supply chain hazard evaluator control deck.', status: 'completed' }
  ];

  const handleVoiceIntroduction = () => {
    startVoiceBriefing("Introducing the engineers of Future Foundry. Lead Full-Stack Architect Apoorva designed the modular layout and AWS architecture probes. AI Engineer Siddhi established the risk scoring math. Data Engineer Shreya organized the backend services, and UI Designer Shambhavi designed the gorgeous cyberpunk-inspired dashboard interface. Future Foundry brings high stakes cloud intelligence to life.");
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest">
            FOUNDATION & TEAM SHOWCASE
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 uppercase">Meet Future Foundry</h2>
        </div>

        <button
          onClick={handleVoiceIntroduction}
          className="px-4 py-2.5 bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-md shadow-cyan-500/10 cursor-pointer"
        >
          <Volume2 className="w-4 h-4 text-slate-950" />
          Play Team Auditory Pitch
        </button>
      </div>

      {/* CORE TEAM MISSION HERO BANNER */}
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-900/40 to-slate-950/80 border border-slate-850 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-300" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-300" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Team Mission Statement</span>
          </div>
          <p className="text-lg md:text-xl font-black text-white leading-normal tracking-tight">
            "Future Foundry is a cross-university team focused on building intelligent systems that solve real-world operational challenges using AI and cloud technologies."
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Academic Alliance: DTU & IGDTUW
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Target Theme: Smart Logistics & Cloud RAG
            </span>
          </div>
        </div>
      </div>

      {/* STATISTICS MODULES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div key={idx} className="p-4 bg-slate-900/20 border border-slate-850 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{st.label}</span>
                <div className={`p-1.5 rounded-lg bg-slate-950 border ${st.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white font-mono tracking-tight">{st.value}</p>
                <p className="text-[10px] text-slate-400 leading-normal mt-0.5">{st.descriptor}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* TEAM PROFILE CARDS */}
      <div className="space-y-4">
        <div className="border-b border-slate-900 pb-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Future Foundry Member Ledgers</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Primary developers, computational designers, and cloud systems architects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map(member => (
            <div 
              key={member.id}
              className="bg-slate-900/30 rounded-2xl border border-slate-850 overflow-hidden flex flex-col justify-between hover:border-slate-800 transition-all p-5 space-y-5"
            >
              <div className="space-y-4">
                {/* Profile Particulars */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs tracking-wider font-mono shrink-0 border ${member.color}`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide leading-snug">{member.name}</h3>
                    
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{member.institution}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-300 font-mono font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{member.role}</span>
                    </div>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-900 font-sans">
                  {member.bio}
                </p>

                {/* Skills custom tags */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Primary Skill Assets</span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((sk, sidx) => (
                      <span 
                        key={sidx}
                        className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-950 text-cyan-300 border border-slate-850"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social profile buttons footer */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-900/80">
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-3 py-1.5 bg-slate-950 hover:bg-slate-900 text-[10px] text-slate-300 border border-slate-800 rounded-lg font-mono font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                  LINKEDIN PROFILE
                </a>
                <a 
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-3 py-1.5 bg-slate-950 hover:bg-slate-900 text-[10px] text-slate-300 border border-slate-800 rounded-lg font-mono font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  GITHUB INDEX
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* VISUAL CONTRIBUTION TIMELINE */}
      <div className="space-y-4">
        <div className="border-b border-slate-900 pb-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Dynamic Contributions Mapping</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Vetted task assignments and feature development vectors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-900 space-y-3.5">
            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-900">
              <div className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 font-bold font-mono text-xs flex items-center justify-center">AK</div>
              <h4 className="text-xs font-bold text-white font-mono shrink-0">Apoorva Kumar</h4>
            </div>
            <ul className="space-y-1.5 text-[10px] text-slate-400 font-mono">
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" /> Frontend Architecture</li>
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" /> Dashboard Development</li>
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" /> AWS Integration Planning</li>
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" /> Product Architecture</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-900 space-y-3.5">
            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-900">
              <div className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-400 font-bold font-mono text-xs flex items-center justify-center">SI</div>
              <h4 className="text-xs font-bold text-white font-mono shrink-0">Siddhi</h4>
            </div>
            <ul className="space-y-1.5 text-[10px] text-slate-400 font-mono">
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-purple-400 shrink-0 mt-0.5" /> AI/ML Pipeline Design</li>
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-purple-400 shrink-0 mt-0.5" /> Risk Assessment Logic</li>
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-purple-400 shrink-0 mt-0.5" /> Recommendation Systems</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-900 space-y-3.5">
            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-900">
              <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 font-bold font-mono text-xs flex items-center justify-center">SH</div>
              <h4 className="text-xs font-bold text-white font-mono shrink-0">Shreya</h4>
            </div>
            <ul className="space-y-1.5 text-[10px] text-slate-400 font-mono">
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" /> Backend Services</li>
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" /> Data Processing</li>
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" /> API Design</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-900 space-y-3.5">
            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-900">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 font-bold font-mono text-xs flex items-center justify-center">SB</div>
              <h4 className="text-xs font-bold text-white font-mono shrink-0">Shambhavi</h4>
            </div>
            <ul className="space-y-1.5 text-[10px] text-slate-400 font-mono">
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" /> UI/UX Design</li>
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" /> User Research</li>
              <li className="flex items-start gap-1"><ChevronRight className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" /> Interface Prototyping</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CORE DEVELOPMENT JOURNEY TIMELINE */}
      <div className="space-y-4">
        <div className="border-b border-slate-900 pb-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Operational Sourcing Milestones</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Chronological execution layers of SentinelChain development cycles</p>
        </div>

        {/* Diagonal or horizontal grid timeline for display sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {journeySteps.map((j, jidx) => (
            <div 
              key={jidx}
              className="p-4 bg-slate-950/50 border border-slate-900 rounded-xl space-y-2.5 hover:border-slate-800 transition relative flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/15 font-bold px-1.5 py-0.5 rounded leading-none">
                    PHASE 0{j.phase}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-xs font-bold text-white uppercase font-mono">{j.title}</h4>
                <p className="text-[10px] text-slate-400 leading-normal">{j.description}</p>
              </div>

              {/* Progress ribbon indicating completion state */}
              <div className="h-0.5 w-full bg-emerald-500/35 rounded-full mt-2.5" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
