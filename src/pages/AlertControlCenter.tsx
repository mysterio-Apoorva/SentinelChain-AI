import React, { useState } from 'react';
import { useSentinel } from '../hooks/useSentinelState';
import { 
  ShieldAlert, 
  CheckCircle, 
  Activity, 
  Filter, 
  Search, 
  MessageSquareCode, 
  X,
  RefreshCw,
  BellRing,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RiskAlert, RiskAlertStatus } from '../types';

export const AlertControlCenter: React.FC = () => {
  const { alerts, resolveAlert, mitigateAlert, startVoiceBriefing } = useSentinel();
  const [activeTab, setActiveTab] = useState<RiskAlertStatus | 'All'>('All');
  const [mitigationNotes, setMitigationNotes] = useState<Record<string, string>>({});

  const filteredAlerts = alerts.filter(alert => {
    if (activeTab === 'All') return true;
    return alert.status === activeTab;
  });

  const handleMitigateAction = (alertId: string) => {
    const customNote = mitigationNotes[alertId] || 'Manual dispatches routed via secondary flight parameters.';
    mitigateAlert(alertId, {
      description: `[MITIGATION ACTIVE: ${customNote}] | ${alerts.find(a => a.id === alertId)?.description}`
    });
    // Clear field
    setMitigationNotes(prev => {
      const copy = { ...prev };
      delete copy[alertId];
      return copy;
    });

    startVoiceBriefing(`Manual mitigation logged for alert ${alertId}. Active countermeasures: ${customNote}`);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest">
            LOGISTICS SAFETY RESPONSE
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 uppercase">Alert Control Center</h2>
        </div>
        
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          {(['All', 'Active', 'Mitigating', 'Resolved'] as const).map(tab => {
            const count = tab === 'All' ? alerts.length : alerts.filter(a => a.status === tab).length;
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                id={`tab-btn-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isSelected 
                    ? 'bg-cyan-500 text-slate-950 shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* DISRUPTIONS LIST BOARD */}
      <div className="space-y-4">
        
        <AnimatePresence mode="popLayout">
          {filteredAlerts.map(alert => (
            <motion.div
              key={alert.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-5 rounded-2xl bg-slate-900/40 border border-slate-850 flex flex-col md:flex-row gap-5 items-start justify-between"
            >
              
              {/* Left Column: Core particulars */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                    alert.severity === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    alert.severity === 'High' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {alert.severity} SEVERITY
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">ID: {alert.code}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white leading-tight uppercase tracking-wide">{alert.event}</h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{alert.region}</p>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed font-sans mt-2">
                  {alert.description}
                </p>
              </div>

              {/* Middle Column: Recalculations / Parameters */}
              <div className="grid grid-cols-2 gap-3.5 shrink-0 w-full md:w-56 text-[10px] font-mono border-t md:border-t-0 md:border-l border-slate-900 pt-3 md:pt-0 md:pl-5">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase leading-none mb-1">Exposure</span>
                  <span className="text-rose-400 font-bold font-mono">${alert.financialExposure.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase leading-none mb-1">Est. delays</span>
                  <span className="text-yellow-400 font-bold font-mono">+{alert.delayDays} Days</span>
                </div>
                
                {/* Active input entry for logging mitigation actions */}
                {alert.status === 'Active' && (
                  <div className="col-span-2 space-y-1.5 pt-2">
                    <span className="text-slate-500 block text-[9px] uppercase leading-none">Mitigation Log:</span>
                    <div className="flex gap-1.5">
                      <select
                        id={`select-mitigate-${alert.id}`}
                        value={mitigationNotes[alert.id] || ''}
                        onChange={(e) => setMitigationNotes(prev => ({ ...prev, [alert.id]: e.target.value }))}
                        className="flex-1 bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] text-slate-300 outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        <option value="">Select countermeasure...</option>
                        <option value="Transition casting loads to Frankfurt air cargo leg">Charge air freight ex-Frankfurt</option>
                        <option value="Redirect manifests to Le Havre seaport clearance channels">Reroute seaport manifests</option>
                        <option value="Place auxiliary Austin electronics foundry on alert standby status">Activate Austin foundry backup</option>
                      </select>
                      <button
                        id={`btn-mitigate-${alert.id}`}
                        onClick={() => handleMitigateAction(alert.id)}
                        className="px-2.5 py-1 text-[10px] text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-bold uppercase rounded-lg transition"
                      >
                        Log
                      </button>
                    </div>
                  </div>
                )}

                {alert.status !== 'Resolved' && (
                  <div className="col-span-2 pt-2">
                    <button
                      id={`btn-resolve-alert-${alert.id}`}
                      onClick={() => resolveAlert(alert.id)}
                      className="w-full py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 transition-[background] font-bold uppercase text-[9px] text-center tracking-wider"
                    >
                      Clear Incident Leg
                    </button>
                  </div>
                )}

              </div>

            </motion.div>
          ))}
        </AnimatePresence>

        {filteredAlerts.length === 0 && (
          <div className="p-12 text-center bg-slate-900/10 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center">
            <CheckCircle className="w-10 h-10 text-emerald-500 mb-3" />
            <p className="text-xs text-slate-400 font-bold">All logged indicators are cleared within this status filter.</p>
          </div>
        )}

      </div>

    </div>
  );
};
