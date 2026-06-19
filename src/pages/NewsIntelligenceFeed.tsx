import React, { useState } from 'react';
import { useSentinel } from '../hooks/useSentinelState';
import { 
  Newspaper, 
  Search, 
  Filter, 
  Volume2, 
  CheckCircle2, 
  X, 
  Heart, 
  Compass, 
  FileCheck2,
  Trash2,
  Clock,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RiskAlert, RiskAlertSeverity, RiskAlertType } from '../types';

export const NewsIntelligenceFeed: React.FC = () => {
  const { alerts, suppliers, resolveAlert, mitigateAlert, startVoiceBriefing } = useSentinel();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | RiskAlertSeverity>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | RiskAlertType>('all');

  // Search and Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.event.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          alert.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;

    return matchesSearch && matchesSeverity && matchesType;
  });

  return (
    <div className="space-y-6">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest">
            REALTIME LOGISTICS NEWS-WIRE
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 uppercase">News Intelligence Feed</h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/40 rounded-lg border border-slate-800 text-[11px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Polled 3 minutes ago</span>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-900/20 p-4 rounded-xl border border-slate-850">
        
        {/* Search */}
        <div className="md:col-span-6 relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-slate-500" />
          <input
            id="news-search-input"
            type="text"
            placeholder="Search events, regions, impact descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-cyan-500 transition-colors text-slate-200"
          />
        </div>

        {/* Severity */}
        <div className="md:col-span-3">
          <select
            id="news-severity-select"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as any)}
            className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Severity Settings</option>
            <option value="Critical">Severity: Critical</option>
            <option value="High">Severity: High</option>
            <option value="Medium">Severity: Medium</option>
            <option value="Low">Severity: Low</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="md:col-span-3">
          <select
            id="news-type-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Threat Types</option>
            <option value="port">Ports strike & outages</option>
            <option value="storm">Storms & hurricanes</option>
            <option value="factory">Manufacturing breakdowns</option>
            <option value="political">Geopolitical borders</option>
            <option value="delay">Logistical customs delays</option>
          </select>
        </div>

      </div>

      {/* ALERTS FEED CONTAINER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <AnimatePresence>
          {filteredAlerts.map(alert => {
            const matchesSuppliers = suppliers.filter(s => alert.affectedSuppliers.includes(s.id));
            
            return (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-900/30 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition shadow-lg relative group"
              >
                
                {/* Header detail */}
                <div className="flex items-start justify-between min-w-0 mb-3">
                  <div className="truncate pr-4">
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold block uppercase">
                      {alert.region}
                    </span>
                    <h3 className="text-sm font-bold text-white truncate mt-0.5" title={alert.event}>
                      {alert.event}
                    </h3>
                  </div>
                  
                  {/* Severity indicator badge */}
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase shrink-0 leading-normal ${
                    alert.severity === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/35' :
                    alert.severity === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/35' :
                    alert.severity === 'Medium' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/35' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {alert.severity}
                  </span>
                </div>

                {/* Body details */}
                <div className="space-y-3 flex-1 mb-5">
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {alert.description}
                  </p>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 space-y-1.5 text-[10px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 uppercase font-mono text-[9px]">Affected Supplier:</span>
                      <span className="text-white font-medium">
                        {matchesSuppliers.map(s => s.name).join(', ') || 'Global Transit leg'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 uppercase font-mono text-[9px]">Confidence:</span>
                      <span className="text-cyan-400 font-bold font-mono">{alert.confidence}% Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 uppercase font-mono text-[9px]">Financial Exposure:</span>
                      <span className="text-rose-400 font-mono font-semibold">${alert.financialExposure.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-900">
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-slate-500">STATUS:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold leading-none ${
                      alert.status === 'Active' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse' :
                      alert.status === 'Mitigating' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {alert.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Vox briefing trigger */}
                    <button
                      id={`news-vox-${alert.id}`}
                      onClick={() => startVoiceBriefing(`Newsflash from ${alert.region}: ${alert.event}. Confidence score: ${alert.confidence}%. Estimated delay: ${alert.delayDays} days.`)}
                      className="p-1 px-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white transition flex items-center gap-1 font-mono text-[9px]"
                      title="Read Briefing aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                      VOX
                    </button>

                    {alert.status !== 'Resolved' && (
                      <button
                        id={`news-resolve-${alert.id}`}
                        onClick={() => resolveAlert(alert.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 text-[10px] font-bold uppercase transition"
                      >
                        RESOLVE
                      </button>
                    )}
                  </div>

                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredAlerts.length === 0 && (
          <div className="col-span-1 md:col-span-3 p-12 text-center bg-slate-900/10 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center select-none">
            <Newspaper className="w-10 h-10 text-slate-700 mb-3" />
            <p className="text-xs text-slate-400 font-bold">No items found matching filter criteria.</p>
            <p className="text-[10px] text-slate-500 mt-1 max-w-sm">Try resetting the search bar query or adjusting the severity filters.</p>
          </div>
        )}

      </div>

    </div>
  );
};
