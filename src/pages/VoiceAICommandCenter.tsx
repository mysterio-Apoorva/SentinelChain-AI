import React, { useState } from 'react';
import { useSentinel } from '../hooks/useSentinelState';
import { 
  Mic, 
  Square, 
  Volume2, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Compass, 
  History, 
  ShieldAlert,
  ArrowRight,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const VoiceAICommandCenter: React.FC = () => {
  const { isPlayingVoice, activeVoiceBriefing, startVoiceBriefing, stopVoiceBriefing } = useSentinel();
  const [typedPrompt, setTypedPrompt] = useState('');
  const [voiceLogs, setVoiceLogs] = useState<Array<{ id: string; role: 'user' | 'agent'; text: string; time: string }>>([
    { id: '1', role: 'agent', text: 'SentinelChain Voice Intelligence is online. State your logistic security prompt.', time: '12:00 PM' }
  ]);

  const preparedBriefings = [
    {
      title: 'Active High-Priority Severe Forecasts',
      prompt: 'Summarize all weather vectors threatening East Asia semiconductor routes.',
      text: 'Typhoon Gaemi is currently tracking Category 4 status towards Hsinchu, Taiwan. Maritime electronic corridors are closed. Recommended action is to shift raw substrate supply lines to domestic Evergreen Semis Austin.'
    },
    {
      title: 'Commercial Seaports Strike Status',
      prompt: 'Check harbor strike statuses and associated delay days across Western Europe.',
      text: 'A critical general labor lockout strike has frozen offloader actions at Rotterdam. 45 container carriers are delayed by up to 12 days. Rerouting metal castings through Le Havre France is underway.'
    },
    {
      title: 'Current Financial Vulnerability exposures',
      prompt: 'What is our current cumulative financial risk exposure?',
      text: 'Active logistical delay exposures stand at 1.7 million dollars. The highest liability is the Hsinchu chip assembly Leg at 720,000 dollars, followed by Western European casting shipments leg at 480,000 dollars.'
    }
  ];

  const handleSendPrompt = (text: string) => {
    if (!text.trim()) return;

    // Add user question to logs
    const userLog = { id: Date.now().toString(), role: 'user' as const, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setVoiceLogs(prev => [...prev, userLog]);
    setTypedPrompt('');

    // Formulate a response based on keywords
    let responseText = 'Your query has been indexed. The Bedrock Knowledge Base and Amazon Nova Sonic are calculating routing models. Wait for a subsequent diagnostic file dispatch.';
    
    if (text.toLowerCase().includes('typhoon') || text.toLowerCase().includes('weather') || text.toLowerCase().includes('asia')) {
      responseText = 'ALERT TRACED: Typhoon Gaemi approaching Hsinchu Science Park within 36 hours. Assembly outages anticipated. Immediate backup activation to Evergreen Semis is recommended.';
    } else if (text.toLowerCase().includes('strike') || text.toLowerCase().includes('port') || text.toLowerCase().includes('rotterdam')) {
      responseText = 'LOCKOUT ALERT: General workers strike at Rotterdam port is active. Freight transit delayed up to 12 days. Alternatives found: Le Havre, France or convert castings to air cargo.';
    } else if (text.toLowerCase().includes('money') || text.toLowerCase().includes('exposure') || text.toLowerCase().includes('financial')) {
      responseText = 'FINANCIAL LOGISTICS SCORECARD: At-risk container assets total 1.7 million dollars. Moving material lines to secondary suppliers lowers liability index by 82 percent.';
    }

    // Trigger Nova audio simulated playback
    setTimeout(() => {
      const agentLog = { id: (Date.now() + 1).toString(), role: 'agent' as const, text: responseText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setVoiceLogs(prev => [...prev, agentLog]);
      startVoiceBriefing(responseText);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest">
            AWS NOVA SONIC EMBEDDED SPEAKER
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 uppercase">Voice AI Command Center</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Waveform Speaker & Circular Animation */}
        <div className="lg:col-span-5 bg-slate-900/20 rounded-2xl border border-slate-850 p-6 flex flex-col justify-between items-center relative overflow-hidden">
          
          <div className="w-full flex items-center justify-between text-xs text-slate-400 select-none border-b border-slate-900 pb-3 mb-6">
            <span className="font-mono tracking-wider">SPEAKER EMULATION CONTROLS</span>
            <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              NOVA SONIC ENGAGED
            </span>
          </div>

          {/* Glowing Voice Assist Core */}
          <div className="my-8 flex items-center justify-center relative">
            
            {/* Spinning outward rings */}
            <AnimatePresence>
              {isPlayingVoice && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.15, 0.4, 0.15] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="absolute w-44 h-44 rounded-full bg-cyan-500/10 border border-cyan-400/40 pointer-events-none"
                  />
                  <motion.div
                    animate={{ scale: [1, 2.5, 1], opacity: [0.05, 0.2, 0.05] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                    className="absolute w-44 h-44 rounded-full bg-indigo-500/10 border border-indigo-400/20 pointer-events-none"
                  />
                </>
              )}
            </AnimatePresence>

            <button
              id="voice-mic-core"
              onClick={() => {
                if (isPlayingVoice) {
                  stopVoiceBriefing();
                } else {
                  handleSendPrompt("Check harbor strike statuses and associated delay days across Western Europe.");
                }
              }}
              className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center relative z-10 transition-all ${
                isPlayingVoice 
                  ? 'bg-cyan-500 border-cyan-300 text-slate-950 shadow-2xl shadow-cyan-500/20' 
                  : 'bg-slate-955 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 shadow-md'
              }`}
            >
              {isPlayingVoice ? (
                <>
                  <Square className="w-8 h-8 text-slate-950" />
                  <span className="text-[10px] font-bold uppercase mt-2 select-none tracking-wide">Stop Vox</span>
                </>
              ) : (
                <>
                  <Mic className="w-8 h-8 text-cyan-400" />
                  <span className="text-[10px] font-bold uppercase mt-2 select-none tracking-wide text-slate-300">Tap to Ask</span>
                </>
              )}
            </button>
          </div>

          {/* Sound wave horizontal graphs if playing */}
          <div className="w-full space-y-2 mt-4">
            <div className="h-8 flex items-center justify-center gap-1 px-4 bg-slate-950/60 rounded-xl border border-slate-900 overflow-hidden">
              {isPlayingVoice ? (
                [...Array(18)].map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ height: [`4px`, `${Math.sin(i * 0.4) * 16 + 20}px`, '4px'] }}
                    transition={{ repeat: Infinity, duration: 1 + Math.random() * 0.8 }}
                    className="w-1.5 rounded-full bg-cyan-400"
                  />
                ))
              ) : (
                <div className="text-[10px] font-mono text-slate-600 uppercase select-none">
                  SPEAKER STANDBY: TRANSIT PROMPTS READY
                </div>
              )}
            </div>
          </div>

          <div className="w-full text-[10px] font-mono text-slate-500 mt-6 pt-3 border-t border-slate-900 flex justify-between select-none">
            <span>MODEL: NOVA SONIC 1.2</span>
            <span>VOICE: MALE COGNITIVE</span>
          </div>

        </div>

        {/* Right Column: Prepared Briefings & Prompt Terminal Logs */}
        <div className="lg:col-span-7 bg-slate-900/40 rounded-2xl border border-slate-850 p-5 flex flex-col justify-between h-full min-h-[460px]">
          
          <div className="flex-1 flex flex-col justify-between space-y-4">
            
            {/* prepared preset briefs */}
            <div>
              <h3 className="text-xs font-bold text-white pb-2 border-b border-slate-900 uppercase tracking-wide">Voice Brief Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-3.5">
                {preparedBriefings.map((brief, idx) => (
                  <button
                    key={idx}
                    id={`preset-brief-${idx}`}
                    onClick={() => {
                      const userLog = { id: Date.now().toString(), role: 'user' as const, text: brief.prompt, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
                      const agentLog = { id: (Date.now() + 1).toString(), role: 'agent' as const, text: brief.text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
                      
                      setVoiceLogs(prev => [...prev, userLog, agentLog]);
                      startVoiceBriefing(brief.text);
                    }}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-900 hover:border-slate-800 text-left space-y-1.5 group transition-all"
                  >
                    <span className="text-[10px] font-mono font-bold text-cyan-400 block group-hover:underline">
                      {brief.title}
                    </span>
                    <p className="text-[10px] text-slate-400 leading-normal line-clamp-2">
                      "{brief.prompt}"
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Transcript logs scroll */}
            <div className="flex-1 min-h-[160px] bg-slate-950/80 rounded-xl border border-slate-900 p-4 overflow-y-auto space-y-3">
              <span className="text-[8px] font-mono text-cyan-500/60 uppercase tracking-widest block border-b border-slate-900 pb-1 mb-2">
                TRANSCRIPT TIMELINE LOGGER
              </span>
              
              {voiceLogs.map(log => (
                <div key={log.id} className="text-xs space-y-0.5">
                  <div className="flex items-center justify-between text-[9px] font-mono">
                    <span className={log.role === 'user' ? 'text-cyan-400 font-bold' : 'text-purple-400 font-bold'}>
                      {log.role.toUpperCase()}
                    </span>
                    <span className="text-slate-600">{log.time}</span>
                  </div>
                  <p className={log.role === 'user' ? 'text-slate-100 font-mono text-[11px]' : 'text-slate-300 italic text-[11px]'}>
                    "{log.text}"
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Type prompt entry bar */}
          <div className="mt-4 pt-3 border-t border-slate-900 flex items-center gap-3">
            <input
              id="voice-keyboard-input"
              type="text"
              placeholder="Ask SentinelChain (e.g. 'check Rotterdam harbor strike delay')"
              value={typedPrompt}
              onChange={(e) => setTypedPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt(typedPrompt)}
              className="flex-1 bg-slate-950/50 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300 outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              id="send-voice-prompt-btn"
              onClick={() => handleSendPrompt(typedPrompt)}
              className="p-2 bg-cyan-500 text-slate-950 hover:bg-cyan-400 rounded-xl transition flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
