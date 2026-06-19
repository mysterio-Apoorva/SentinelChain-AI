import React, { useState } from 'react';
import { useSentinel } from '../hooks/useSentinelState';
import { 
  Compass, 
  Filter, 
  MapPin, 
  Info, 
  CloudLightning, 
  ShieldAlert, 
  X,
  Hammer,
  AlertOctagon,
  Anchor,
  Shuffle,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RiskAlertType, RiskAlertSeverity, RiskAlert } from '../types';

export const GlobalRiskCenter: React.FC = () => {
  const { alerts, suppliers, routes, startVoiceBriefing } = useSentinel();
  const [selectedType, setSelectedType] = useState<RiskAlertType | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<RiskAlertSeverity | 'all'>('all');
  const [focusedAlert, setFocusedAlert] = useState<RiskAlert | null>(null);

  // Filter alerts
  const filteredAlerts = alerts.filter(a => {
    const typeMatch = selectedType === 'all' || a.type === selectedType;
    const severityMatch = selectedSeverity === 'all' || a.severity === selectedSeverity;
    return typeMatch && severityMatch && a.status === 'Active';
  });

  // Simple SVG map sizing configurations
  // x: 0 to 800, y: 0 to 450
  const transformCoordinates = (lat: number, lng: number) => {
    // Mercator approximation for SVG box: 800x400
    // lng map: -180 to 180 -> 50 to 750
    // lat map: -90 to 90 -> 350 to 50
    const x = ((lng + 180) / 360) * 700 + 50;
    const y = ((90 - lat) / 180) * 320 + 40;
    return { x, y };
  };

  const getAlertIcon = (type: RiskAlertType) => {
    switch (type) {
      case 'port': return <Anchor className="w-3.5 h-3.5 text-cyan-400" />;
      case 'storm': return <CloudLightning className="w-3.5 h-3.5 text-yellow-400" />;
      case 'factory': return <Hammer className="w-3.5 h-3.5 text-rose-400" />;
      case 'political': return <AlertOctagon className="w-3.5 h-3.5 text-purple-400" />;
      case 'delay': return <Compass className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER COCKPIT */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest">
            GEOGRAPHIC RISK COCKPIT
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 uppercase">Global Risk Center Mapping</h2>
        </div>
        
        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* TYPE FILTER */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <Filter className="w-3 h-3 text-slate-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer text-xs font-medium"
            >
              <option value="all" className="bg-slate-950 text-slate-100">All Vectors</option>
              <option value="port" className="bg-slate-950 text-slate-100">Ports & Docks</option>
              <option value="storm" className="bg-slate-950 text-slate-100">Climate & Storms</option>
              <option value="factory" className="bg-slate-950 text-slate-100">Factory Outages</option>
              <option value="political" className="bg-slate-950 text-slate-100">Geopolitics</option>
            </select>
          </div>

          {/* SEVERITY FILTER */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value as any)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer text-xs font-medium"
            >
              <option value="all" className="bg-slate-950 text-slate-100">All Severities</option>
              <option value="Critical" className="bg-slate-950 text-slate-100">Critical Only</option>
              <option value="High" className="bg-slate-950 text-slate-100 font-mono text-xs">High Severity</option>
              <option value="Medium" className="bg-slate-950 text-slate-100 text-xs">Medium Severity</option>
              <option value="Low" className="bg-slate-950 text-slate-100">Low Severity</option>
            </select>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 columns - Interactive World Map SVG */}
        <div className="lg:col-span-9 bg-slate-900/20 rounded-2xl border border-slate-850 p-4 relative overflow-hidden flex flex-col">
          
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-900 pb-3 mb-4 select-none">
            <span className="font-mono tracking-wider">ACTIVE GEO-BEACONS PLOTTED ({filteredAlerts.length})</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Realtime Positioning System
            </span>
          </div>

          <div className="relative flex-1 min-h-[300px] md:min-h-[420px] bg-slate-950/40 rounded-xl border border-slate-900 overflow-hidden flex items-center justify-center">
            
            {/* SVG STYLED VECTOR WORLD MAP BACKPLATE */}
            <svg className="w-full h-full max-h-[420px] select-none" viewBox="0 0 800 400" fill="none">
              
              {/* Grid Lines */}
              <g stroke="#ffffff" strokeOpacity="0.015" strokeWidth="1">
                {[...Array(16)].map((_, i) => (
                  <line key={`x-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />
                ))}
                {[...Array(8)].map((_, i) => (
                  <line key={`y-${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
                ))}
              </g>

              {/* Decorative stylised countries / regions paths mapped into vectors */}
              {/* North America */}
              <path d="M 100,60 L 220,60 L 240,110 L 225,160 L 200,180 Z" fill="#1e293b" fillOpacity="0.3" stroke="#334155" strokeWidth="1" strokeDasharray="4 2" />
              {/* South America */}
              <path d="M 220,185 L 260,210 L 250,320 L 230,360 L 210,240 Z" fill="#111827" fillOpacity="0.3" stroke="#1f2937" strokeWidth="1" />
              {/* Europe */}
              <path d="M 360,50 L 450,50 L 460,95 L 420,130 L 370,120 Z" fill="#1e293b" fillOpacity="0.3" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
              {/* Africa */}
              <path d="M 375,135 L 450,140 L 485,200 L 435,320 L 400,240 L 365,160 Z" fill="#111827" fillOpacity="0.3" stroke="#1f2937" strokeWidth="1" />
              {/* Asia */}
              <path d="M 460,40 L 740,40 L 720,180 L 680,240 L 590,220 L 550,150 Z" fill="#1e293b" fillOpacity="0.3" stroke="#334155" strokeWidth="1" />
              {/* Australia */}
              <path d="M 680,260 L 750,270 L 740,320 L 670,310 Z" fill="#111827" fillOpacity="0.3" stroke="#1f2937" strokeWidth="1" />

              {/* ACTIVE SHIP ROUTES DRAWN */}
              {routes.map(r => {
                const originPt = transformCoordinates(r.originCoords[0] || 0, r.originCoords[1] || 0);
                const destPt = transformCoordinates(r.destCoords[0] || 0, r.destCoords[1] || 0);
                
                return (
                  <g key={r.id}>
                    {/* Path line connected */}
                    <path
                      d={`M ${originPt.x},${originPt.y} Q ${(originPt.x + destPt.x)/2},${Math.min(originPt.y, destPt.y) - 30} ${destPt.x},${destPt.y}`}
                      fill="none"
                      stroke={r.status === 'Blocked' ? '#f43f5e' : r.status === 'Delayed' ? '#eab308' : '#06b6d4'}
                      strokeWidth="1.5"
                      strokeDasharray={r.status === 'Blocked' ? '2 2' : '4 2'}
                      className={r.status !== 'Normal' ? 'animate-pulse' : ''}
                    />
                  </g>
                );
              })}

              {/* DRAW PRIMARY SUPPLIER BEACONS */}
              {suppliers.map(sup => {
                const pt = transformCoordinates(sup.lat, sup.lng);
                return (
                  <g key={sup.id}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      fill={sup.riskLevel === 'High' || sup.riskLevel === 'Critical' ? '#ef4444' : '#10b981'}
                      className="cursor-pointer"
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="10"
                      fill="none"
                      stroke={sup.riskLevel === 'High' || sup.riskLevel === 'Critical' ? '#ef4444' : '#10b981'}
                      strokeWidth="1"
                      className="animate-ping"
                      style={{ animationDuration: '3s' }}
                    />
                  </g>
                );
              })}

            </svg>

            {/* OVERLAY MAP LABELS / GLOW BUTTONS FOR THREATS */}
            {filteredAlerts.map(alert => {
              // Find matching affected suppliers' coordinates
              const matchesSups = suppliers.filter(s => alert.affectedSuppliers.includes(s.id));
              // Approximate coordinates based on region or associated supplier
              const lat = matchesSups[0] ? matchesSups[0].lat + 3 : 35;
              const lng = matchesSups[0] ? matchesSups[0].lng - 5 : -40;
              const pt = transformCoordinates(lat, lng);

              return (
                <div
                  key={alert.id}
                  style={{ top: `${pt.y}px`, left: `${pt.x}px` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 scale-95 md:scale-100"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setFocusedAlert(alert)}
                    id={`geo-node-${alert.id}`}
                    className={`relative p-2 rounded-xl border flex items-center justify-center shadow-lg transition-all ${
                      alert.severity === 'Critical' 
                        ? 'bg-rose-500/90 border-rose-400 text-slate-950 shadow-rose-500/20' 
                        : 'bg-amber-500/95 border-amber-400 text-slate-950 shadow-amber-500/10'
                    }`}
                  >
                    <span className="absolute -inset-1 rounded-2xl bg-inherit animate-ping opacity-35" />
                    {getAlertIcon(alert.type)}
                  </motion.button>
                </div>
              );
            })}

            {/* Legend card bottom-left corner */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex flex-col gap-1.5 backdrop-blur-md select-none text-[10px]">
              <span className="font-bold text-white mb-1 uppercase font-mono">MAP LEGENDS</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-300">Supplier (Operational/Low Risk)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-slate-300">Supplier (High Risk Vulnerability)</span>
              </div>
              <div className="flex items-center gap-2 mt-1 pt-1.5 border-t border-slate-800">
                <span className="p-0.5 rounded bg-rose-400 text-slate-950 font-bold font-mono text-[8px]">CRIT</span>
                <span className="text-slate-300">Critical Outage beacon (Port/Typhoon)</span>
              </div>
            </div>

            {/* Instructions box top-right corner */}
            <div className="absolute top-3 right-3 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-[10px] text-slate-400 max-w-[200px] select-none leading-relaxed">
              <span className="text-cyan-400 font-bold block mb-0.5 uppercase">Interactive Mode:</span>
              Click on any flashing threat beacon (triangle symbols) to drill down, calculate mitigations, or launch audio files.
            </div>

          </div>
        </div>

        {/* Right 3 columns - Sidebar tracking node detail sheets */}
        <div className="lg:col-span-3 bg-slate-900/40 rounded-2xl border border-slate-850 p-4 flex flex-col justify-between">
          
          <div className="flex-1 flex flex-col justify-start">
            <h3 className="text-xs font-bold text-white pb-2 border-b border-slate-900 uppercase tracking-wide">Threat Drilldown</h3>
            
            <AnimatePresence mode="wait">
              {focusedAlert ? (
                <motion.div
                  key={focusedAlert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 pt-3.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded font-mono text-[9px] bg-rose-500/10 text-rose-400 border border-rose-500/30">
                      {focusedAlert.severity} SEVERITY
                    </span>
                    <button 
                      id="close-drilldown-btn"
                      onClick={() => setFocusedAlert(null)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{focusedAlert.event}</h4>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono">BEACON CODE: {focusedAlert.code}</p>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                    {focusedAlert.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-[10px]">
                    <div className="p-2 rounded bg-slate-900 border border-slate-850">
                      <span className="text-slate-500 block text-[9px] uppercase font-mono">FINANCIAL COST</span>
                      <span className="text-white font-mono font-bold">${focusedAlert.financialExposure.toLocaleString()}</span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-850">
                      <span className="text-slate-500 block text-[9px] uppercase font-mono">CONFIDENCE INDEX</span>
                      <span className="text-cyan-400 font-mono font-bold">{focusedAlert.confidence}%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-cyan-500 block text-[9px] font-mono uppercase tracking-wider">AI MITIGATION ACTION</span>
                    <p className="text-[11.5px] text-slate-300 italic bg-cyan-950/20 border border-cyan-500/15 p-2.5 rounded-lg leading-relaxed">
                      {focusedAlert.mitigationStrategy}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      id="drilldown-play-vox"
                      onClick={() => startVoiceBriefing(`Action update for ${focusedAlert.event}. AI recommended mitigation: ${focusedAlert.mitigationStrategy}`)}
                      className="w-full py-2 bg-gradient-to-r from-cyan-400/20 to-indigo-600/20 hover:from-cyan-400/30 text-cyan-300 border border-cyan-500/25 rounded-xl text-xs font-bold uppercase font-mono transition flex items-center justify-center gap-2"
                    >
                      <Volume2 className="w-4 h-4 text-cyan-400" />
                      Play Voice Directive
                    </button>
                  </div>

                </motion.div>
              ) : (
                <div className="p-8 text-center text-slate-500 mt-6 md:mt-20">
                  <Compass className="w-10 h-10 text-slate-700 mx-auto mb-3 animate-spin-slow" />
                  <p className="text-xs">No active beacon selected.</p>
                  <p className="text-[10px] text-slate-600 mt-1 leading-normal">Click any yellow or red marker on the map to inspect granular exposure, impact levels, and recommended swap routes.</p>
                </div>
              )}
            </AnimatePresence>

          </div>

          <div className="border-t border-slate-900/60 pt-4 mt-4 text-[10px] text-slate-500 font-mono">
            <span>POSITIONING STATS:</span>
            <div className="flex items-center justify-between mt-1.5 text-slate-400">
              <span>SATELLITE SYNC:</span>
              <span className="text-emerald-400 font-bold">100% ONLINE</span>
            </div>
            <div className="flex items-center justify-between mt-1 text-slate-400">
              <span>LATENCY CALC:</span>
              <span>12MS</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
