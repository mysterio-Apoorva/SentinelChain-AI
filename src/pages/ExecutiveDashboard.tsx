import React from 'react';
import { useSentinel } from '../hooks/useSentinelState';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Clock, 
  HardHat, 
  HelpCircle, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Play, 
  CheckCircle2, 
  Flame, 
  ArrowRight,
  TrendingDown,
  Building,
  Volume2,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { 
  mockAnalyticsRiskTrends, 
  mockAnalyticsInventoryExposure 
} from '../data/mockData';

export const ExecutiveDashboard: React.FC = () => {
  const { 
    alerts, 
    suppliers, 
    routes, 
    startVoiceBriefing,
    isPlayingVoice,
    resolveAlert
  } = useSentinel();

  // CALCULATE ACTIVE KPIs
  const activeAlerts = alerts.filter(a => a.status === 'Active');
  const criticalAlerts = activeAlerts.filter(a => a.severity === 'Critical');
  const highAlerts = activeAlerts.filter(a => a.severity === 'High');

  const delayedRoutes = routes.filter(r => r.status !== 'Normal');
  const totalDelayDays = delayedRoutes.reduce((sum, r) => sum + r.delayDays, 0);

  const averageReliability = Math.round(
    suppliers.reduce((sum, s) => sum + s.reliabilityScore, 0) / suppliers.length
  );

  const totalFinancialExposure = activeAlerts.reduce((sum, a) => sum + a.financialExposure, 0);

  const COLORS = ['#22d3ee', '#312e81', '#f43f5e', '#fbbf24', '#a855f7'];

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Active Real-time Intelligence Plane
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 uppercase">SentinelChain AI Executive Dashboard</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Nova Sonic Audio Highlights trigger */}
          <button
            id="play-briefing-all"
            onClick={() => startVoiceBriefing(`Executive Briefing Summary: There are currently ${activeAlerts.length} active risks, with a total financial exposure of ${totalFinancialExposure.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}. The critical threat is the Rotterdam dock strike affecting castings, and Typhoon Gaemi approaching Hsinchu electronics corridor.`)}
            disabled={isPlayingVoice}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 font-bold text-xs text-slate-950 uppercase tracking-wide flex items-center gap-2 active:scale-95 disabled:opacity-50 transition-all cursor-pointer shadow-md shadow-cyan-500/10"
          >
            <Volume2 className="w-4 h-4 text-slate-950 animate-pulse" />
            Synthesize Voice Briefing
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-slate-905-900 p-4 rounded-2xl bg-slate-900/40 border border-slate-850 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>ACTIVE RISKS</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-black text-rose-400 font-mono">{activeAlerts.length}</p>
            <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-rose-500 font-bold">+{criticalAlerts.length}</span> Critical severe
            </p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-905-900 p-4 rounded-2xl bg-slate-900/40 border border-slate-850 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>CRITICAL ALERTS</span>
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-black text-orange-400 font-mono">{criticalAlerts.length}</p>
            <p className="text-[10px] text-slate-500 mt-1">
              Immediate swap required
            </p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-905-900 p-4 rounded-2xl bg-slate-900/40 border border-slate-850 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>SHIPMENT DELAYS</span>
            <Clock className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-black text-yellow-400 font-mono">+{totalDelayDays} Days</p>
            <p className="text-[10px] text-slate-500 mt-1">
              Across {delayedRoutes.length} critical ocean legs
            </p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-905-900 p-4 rounded-2xl bg-slate-900/40 border border-slate-850 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>SUPPLIER HEALTH</span>
            <Building className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-black text-emerald-400 font-mono">{averageReliability}%</p>
            <p className="text-[10px] text-slate-500 mt-1">
              On-time performance avg
            </p>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-slate-905-900 p-4 rounded-2xl bg-slate-900/40 border border-slate-850 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>FINANCIAL EXPOSURE</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-black text-white font-mono">${(totalFinancialExposure/1000).toFixed(0)}k</p>
            <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-rose-500" /> 
              At-risk material cost
            </p>
          </div>
        </div>

        {/* Metric 6 */}
        <div className="bg-slate-905-900 p-4 rounded-2xl bg-slate-900/40 border border-slate-850 flex flex-col justify-between bg-gradient-to-b from-cyan-950/20 to-transparent">
          <div className="flex items-center justify-between text-xs font-semibold text-cyan-400">
            <span>SYSTEM HEALTH</span>
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-4">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold">
              ACTIVE AGENT
            </span>
            <p className="text-[9px] text-slate-500 mt-1.5 font-mono">
              AWS BEDROCK LOGGED
            </p>
          </div>
        </div>

      </div>

      {/* MIDDLE SECTION - TRENDS CHART & THREAT ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Columns - Real-time Risk Exposure Trend */}
        <div className="lg:col-span-8 bg-slate-900/30 border border-slate-850 rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-900">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">AI Predictive Risk Exposure Progression</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Calculated financial liability index over last seven periods</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400" />
                EXPOSURE ($k)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-indigo-600" />
                ACTIVE THREATS
              </span>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockAnalyticsRiskTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorExposure" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#475569" fontSize={10} fontFamily="monospace" />
                <YAxis stroke="#475569" fontSize={10} fontFamily="monospace" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '11px' }}
                  labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="financialExposure" name="Exposure ($k)" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorExposure)" />
                <Area type="monotone" dataKey="activeRisks" name="Active Threats" stroke="#6366f1" strokeWidth={1.5} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 4 Columns - Inventory Exposure by Category */}
        <div className="lg:col-span-4 bg-slate-900/30 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-900 mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Inventory Exposure Vulnerability</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Proportion of material hand-on reserves exposed to critical risk zones</p>
          </div>

          <div className="h-[180px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockAnalyticsInventoryExposure}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="unsafeExposure"
                  nameKey="category"
                >
                  {mockAnalyticsInventoryExposure.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center select-none pointer-events-none">
              <span className="text-[9px] font-mono font-semibold text-slate-500 uppercase block leading-none">EXPOSED</span>
              <span className="text-xl font-bold font-mono text-cyan-400 block mt-0.5">38.4%</span>
            </div>
          </div>

          <div className="space-y-1.5 mt-2">
            {mockAnalyticsInventoryExposure.map((item, index) => (
              <div key={item.category} className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-slate-300 truncate">{item.category}</span>
                </div>
                <span className="font-mono text-cyan-400 font-semibold shrink-0">{item.unsafeExposure}% Risk</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* LOWER SECTION - ACTIVE RISK ALERTS WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Active Disruptions Feed */}
        <div className="lg:col-span-7 bg-slate-900/30 border border-slate-850 rounded-2xl p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-900 mb-4">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Urgent Action Required</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Active risk events affecting manufacturing flow rates</p>
            </div>
            <Link to="/app/news-feed" className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-mono">
              Intelligence Feed <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
            {activeAlerts.map(alert => {
              const matchesSuppliers = suppliers.filter(s => alert.affectedSuppliers.includes(s.id));
              return (
                <div key={alert.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition flex flex-col gap-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase mr-2 ${
                        alert.severity === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        alert.severity === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs font-bold text-slate-100">{alert.event}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC</span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-normal">{alert.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 pt-2 border-t border-slate-900/60 text-[10px]">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-mono">AFFECTED SUPPLIER</span>
                      <span className="text-white font-medium truncate block">{matchesSuppliers.map(s => s.name).join(', ') || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-mono">ESTIMATED DELAY</span>
                      <span className="text-yellow-400 font-bold">+{alert.delayDays} Days</span>
                    </div>
                    <div className="col-span-2 md:col-span-1 flex items-center justify-end gap-1.5">
                      <button
                        id={`brief-btn-${alert.id}`}
                        onClick={() => startVoiceBriefing(`Disruption advisory for ${alert.event} in ${alert.region}. Delay forecast is ${alert.delayDays} days, affecting ${matchesSuppliers.map(s => s.name).join(', ')}. Exposure totals ${alert.financialExposure.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.`)}
                        className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/30 transition flex items-center gap-1 font-mono text-[9px]"
                      >
                        <Volume2 className="w-3 h-3 text-cyan-400" />
                        VOX
                      </button>
                      <button
                        id={`resolve-btn-${alert.id}`}
                        onClick={() => resolveAlert(alert.id)}
                        className="px-2 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition text-[9px]"
                      >
                        RESOLVE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {activeAlerts.length === 0 && (
              <div className="p-8 text-center bg-slate-900/10 border border-dashed border-slate-800 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs text-slate-400">All risk vectors cleared. Supply chains operational.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Key Suppliers Under Threat */}
        <div className="lg:col-span-5 bg-slate-900/30 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-900 mb-4">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">High Risk Sourcing Nodes</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Active monitoring of external manufacturing partners</p>
              </div>
              <Link to="/app/settings" className="text-[10px] text-cyan-400 hover:underline font-mono">
                Sourcing list
              </Link>
            </div>

            <div className="space-y-3">
              {suppliers.slice(0, 5).map(sup => (
                <div key={sup.id} className="p-2.5 rounded-xl bg-slate-950/35 border border-slate-900 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{sup.name}</p>
                    <p className="text-[10px] text-slate-400">{sup.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold leading-normal uppercase ${
                      sup.riskLevel === 'High' || sup.riskLevel === 'Critical'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {sup.riskLevel} RISK
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                      Lead: {sup.deliveryLeadTime}d | Rel: {sup.reliabilityScore}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/15">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              AI Recommendation Agent Suggests
            </h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Typhoon Gaemi threatening NeoTek (Hsinchu). The alternative sourcing engine recommends **Evergreen Semis** (Austin, USA) to reduce physical lead time by 10 days and bypass maritime storm vectors completely.
            </p>
            <Link
              to="/app/alternatives"
              id="dashboard-recommendation-link"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-400 hover:underline mt-2.5 uppercase font-mono"
            >
              Analyze Swap Scenarios <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
