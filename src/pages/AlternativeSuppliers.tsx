import React, { useState } from 'react';
import { useSentinel } from '../hooks/useSentinelState';
import { 
  Building, 
  ArrowLeftRight, 
  Ship, 
  DollarSign, 
  Award, 
  Sparkles, 
  Leaf, 
  Calendar, 
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AlternativeSuppliers: React.FC = () => {
  const { suppliers, alerts, selectAltSupplier, startVoiceBriefing } = useSentinel();
  const [selectedPrimaryId, setSelectedPrimaryId] = useState<string>('sup-001'); // Default: NeoTek

  // Active primary suppliers
  const primarySuppliers = suppliers.filter(s => !s.id.includes('alt'));
  const currentPrimary = suppliers.find(s => s.id === selectedPrimaryId);

  // Associated alternatives
  const alternatives = suppliers.filter(s => s.id.includes('alt') && s.category === currentPrimary?.category);

  // Associated active alerts to extract risk analysis reasons
  const associatedAlert = alerts.find(a => a.affectedSuppliers.includes(selectedPrimaryId) && a.status === 'Active');

  const executeSwap = (altId: string) => {
    if (currentPrimary) {
      selectAltSupplier(currentPrimary.id, altId);
      startVoiceBriefing(`Executing supply swap directive. Disengaged ${currentPrimary.name} in Taiwanese electronics leg, transferred active orders to alternative supplier, reducing estimated delivery delays to standard domestic levels.`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest">
            MITIGATION BACKUP WORKSPACE
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 uppercase">Alternative Supplier Recommendations</h2>
        </div>
      </div>

      {/* SELECT PRIMARY SUPPLIER UNDER THREAT LEG */}
      <div className="p-4 bg-slate-900/30 rounded-2xl border border-slate-850">
        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-2">Select Active Supplier Node:</span>
        <div className="flex flex-wrap gap-2.5">
          {primarySuppliers.map(sup => {
            const hasAlert = alerts.some(a => a.affectedSuppliers.includes(sup.id) && a.status === 'Active');
            const isSelected = selectedPrimaryId === sup.id;
            return (
              <button
                key={sup.id}
                id={`primary-select-${sup.id}`}
                onClick={() => setSelectedPrimaryId(sup.id)}
                className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${
                  isSelected 
                    ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-sm shadow-cyan-500/5' 
                    : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building className="w-4 h-4 text-slate-400" />
                <span>{sup.name}</span>
                {hasAlert && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Current Threatened Supplier + Associated Threat Analysis */}
        <div className="lg:col-span-4 bg-slate-900/20 rounded-2xl border border-slate-850 p-5 space-y-5">
          
          <div>
            <h3 className="text-xs font-bold text-slate-400 pb-2 border-b border-slate-900 uppercase tracking-wide">Primary Sourcing Leg</h3>
            {currentPrimary ? (
              <div className="pt-3.5 space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-white">{currentPrimary.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">{currentPrimary.category} | {currentPrimary.location}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
                  <div className="p-2 py-1.5 rounded bg-slate-950 border border-slate-900">
                    <span className="text-slate-500 block text-[9px] uppercase leading-none mb-1">REL. SCORE</span>
                    <span className="text-white font-bold">{currentPrimary.reliabilityScore}/100</span>
                  </div>
                  <div className="p-2 py-1.5 rounded bg-slate-950 border border-slate-900">
                    <span className="text-slate-500 block text-[9px] uppercase leading-none mb-1">SUSTAIN. SCORE</span>
                    <span className="text-white font-bold">{currentPrimary.sustainabilityScore}/100</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 pb-2 border-b border-slate-900 uppercase tracking-wide">Threat Exposure Analysis</h3>
            {associatedAlert ? (
              <div className="pt-3.5 space-y-3.5">
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px]">
                  <span className="text-[9px] font-mono font-bold text-rose-400 block mb-1 uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                    {associatedAlert.severity} ACTIVE EXPOSURE
                  </span>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    {associatedAlert.event} in {associatedAlert.region}. Predicted transit lag will escalate lead times by **{associatedAlert.delayDays} days**.
                  </p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 text-[10px] space-y-1">
                  <span className="text-slate-400 block font-bold uppercase font-mono">FINANCIAL FORECAST</span>
                  <p className="text-rose-400 font-mono font-extrabold text-xs">Exposed Materials value: ${associatedAlert.financialExposure.toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <div className="p-4 pt-8 text-center text-slate-500">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs">No active alert affecting this sourcing leg. Operations nominal.</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Recommended Alternatives Comparative table */}
        <div className="lg:col-span-8 bg-slate-900/40 rounded-2xl border border-slate-850 p-5 flex flex-col justify-between">
          
          <div>
            <div className="pb-2 border-b border-slate-900 mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Qualified Sourcing Alternatives</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Scored matches ready for immediate manifest hot-swap routing</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-[9px] font-mono text-cyan-400 font-bold uppercase">
                Amazon Bedrock Scored
              </span>
            </div>

            <div className="space-y-4">
              {alternatives.map(alt => (
                <div key={alt.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-905 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-800 transition">
                  
                  {/* Left Column: Vendor particulars */}
                  <div className="min-w-0 flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/40 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{alt.name}</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{alt.location}</p>
                      
                      <div className="flex items-center gap-3 mt-1 text-[10px]">
                        <span className="flex items-center gap-1 text-slate-400 shrink-0">
                          <Award className="w-3.5 h-3.5 text-cyan-400" />
                          Rel: <span className="text-white font-bold">{alt.reliabilityScore}%</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-400 shrink-0">
                          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                          Sustain: <span className="text-white font-bold">{alt.sustainabilityScore}%</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Comparative Metrics comparison against threatened primary values */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono shrink-0 w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-900 pt-3 md:pt-0 md:pl-4">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase leading-none mb-1">Deliv. Lead</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-0.5 text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {alt.deliveryLeadTime} days
                      </span>
                      {currentPrimary && (
                        <span className="text-[9px] text-slate-500 block">vs {currentPrimary.deliveryLeadTime}d primary</span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase leading-none mb-1">Cost Score</span>
                      <span className="text-white font-bold flex items-center gap-0.5 text-[11px]">
                        <DollarSign className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        {alt.costIndex}/5 avg
                      </span>
                      {currentPrimary && (
                        <span className="text-[9px] text-slate-500 block">vs {currentPrimary.costIndex}/5 primary</span>
                      )}
                    </div>

                    <div className="col-span-2 md:col-span-1 flex items-center justify-end">
                      <button
                        id={`swap-btn-${alt.id}`}
                        onClick={() => executeSwap(alt.id)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 text-slate-950 font-black text-[10px] tracking-wide uppercase shadow-md shadow-cyan-500/10 active:scale-95 transition"
                      >
                        Swap Node Leg
                      </button>
                    </div>
                  </div>

                </div>
              ))}

              {alternatives.length === 0 && (
                <div className="p-8 text-center bg-slate-900/10 border border-dashed border-slate-800 rounded-xl">
                  <span className="text-xs text-slate-500 font-medium">No alternative candidates mapped inside database for this component type.</span>
                </div>
              )}
            </div>

          </div>

          <div className="p-3.5 rounded-xl bg-cyan-950/15 border border-cyan-500/15 mt-5">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Comparative mitigation layout:
            </h4>
            <div className="flex items-center gap-3.5 mt-2 text-[11px] text-slate-300">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Primary leg exposed
              </span>
              <span className="text-slate-500">→</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Bedrock recommendation matches
              </span>
              <span className="text-slate-500">→</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Swap action dispatches manifest clearances
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
