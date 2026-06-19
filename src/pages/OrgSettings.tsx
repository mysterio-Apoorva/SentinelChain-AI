import React, { useState } from 'react';
import { useSentinel } from '../hooks/useSentinelState';
import { 
  Users, 
  Settings, 
  Cloud, 
  Building, 
  ShieldAlert, 
  CheckCircle2, 
  X, 
  Mail, 
  Plus, 
  Trash2,
  BellRing,
  Volume2,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TeamMember, Supplier } from '../types';

export const OrgSettings: React.FC = () => {
  const { team, suppliers, awsConfig, updateAWSConfig, startVoiceBriefing } = useSentinel();
  const [activeTab, setActiveTab] = useState<'Team' | 'AWS' | 'Notifications' | 'Suppliers'>('Team');
  
  // Dynamic Team member adding inputs
  const [activeTeamMembers, setActiveTeamMembers] = useState<TeamMember[]>(team);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');

  // Sourcing list modifiers
  const [activeSuppliersList, setActiveSuppliersList] = useState<Supplier[]>(suppliers);

  // Notifications checkboxes
  const [notifSMS, setNotifSMS] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSlack, setNotifSlack] = useState(false);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberRole) return;

    const newTm: TeamMember = {
      id: `tm-${Date.now()}`,
      name: newMemberName,
      role: newMemberRole,
      email: newMemberEmail || `${newMemberName.toLowerCase().replace(' ', '')}@sentinelchain.ai`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      status: 'active'
    };

    setActiveTeamMembers(prev => [...prev, newTm]);
    setNewMemberName('');
    setNewMemberRole('');
    setNewMemberEmail('');
  };

  const handleRemoveMember = (id: string) => {
    setActiveTeamMembers(prev => prev.filter(tm => tm.id !== id));
  };

  const toggleTeamStatus = (id: string) => {
    setActiveTeamMembers(prev =>
      prev.map(tm => (tm.id === id ? { ...tm, status: tm.status === 'active' ? 'inactive' : 'active' } : tm))
    );
  };

  const saveAWSChanges = (field: 's3Status' | 'bedrockStatus' | 'sonicStatus') => {
    const currentVal = awsConfig[field];
    const newVal = currentVal === 'connected' ? 'error' : 'connected';
    updateAWSConfig({ [field]: newVal });
    startVoiceBriefing(`Updating Cloud integrations index: ${field.toUpperCase()} status is now set to ${newVal.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER COCKPIT */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest">
            ENTERPRISE ADMINISTRATION
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 uppercase">Organization Settings</h2>
        </div>

        {/* Dynamic settings tabs switcher */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-805 shrink-0 select-none">
          {(['Team', 'AWS', 'Notifications', 'Suppliers'] as const).map(tab => (
            <button
              key={tab}
              id={`setting-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/20 rounded-2xl border border-slate-850 p-5">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: TEAM MEMBERS LIST */}
          {activeTab === 'Team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-500" />
                  Team Membership Directory
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Authorizations ledger for logistics administrative coordinators</p>
              </div>

              {/* Grid layout containing members lists & add Form */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Members list */}
                <div className="lg:col-span-8 space-y-3">
                  {activeTeamMembers.map(tm => (
                    <div key={tm.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-900 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden shrink-0">
                          <img referrerPolicy="no-referrer" src={tm.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white leading-tight">{tm.name}</h4>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{tm.role}</p>
                          <p className="text-[9px] text-slate-500 leading-none mt-1">{tm.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleTeamStatus(tm.id)}
                          className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold leading-normal uppercase ${
                            tm.status === 'active' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {tm.status}
                        </button>
                        <button
                          id={`delete-tm-${tm.id}`}
                          onClick={() => handleRemoveMember(tm.id)}
                          className="p-1 rounded hover:bg-rose-500/15 text-slate-600 hover:text-rose-400 transition"
                          title="Remove Membership"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Adding form */}
                <div className="lg:col-span-4 bg-slate-950/40 p-4 rounded-xl border border-slate-900 space-y-4 h-fit">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Invite Coordinator</h4>
                  
                  <form onSubmit={handleAddMember} className="space-y-4">
                    <div className="space-y-1 text-xs">
                      <label className="text-slate-400 block font-bold">Full Name</label>
                      <input
                        id="new-member-name"
                        type="text"
                        required
                        placeholder="e.g. Klaus Reinhardt"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg outline-none focus:border-cyan-500 text-xs text-slate-200"
                      />
                    </div>

                    <div className="space-y-1 text-xs">
                      <label className="text-slate-400 block font-bold">Role Title</label>
                      <input
                        id="new-member-role"
                        type="text"
                        required
                        placeholder="e.g. EMEA Logistics lead"
                        value={newMemberRole}
                        onChange={(e) => setNewMemberRole(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg outline-none focus:border-cyan-500 text-xs text-slate-200"
                      />
                    </div>

                    <div className="space-y-1 text-xs">
                      <label className="text-slate-400 block font-bold">Email Address</label>
                      <input
                        id="new-member-email"
                        type="email"
                        placeholder="Optional"
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg outline-none focus:border-cyan-500 text-xs text-slate-200"
                      />
                    </div>

                    <button
                      id="save-member-btn"
                      type="submit"
                      className="w-full py-2 bg-cyan-500 text-slate-950 hover:bg-cyan-400 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add to active ledger
                    </button>
                  </form>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: AWS INTEGRATIONS PORTFOLIO */}
          {activeTab === 'AWS' && (
            <motion.div
              key="aws"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-purple-400" />
                  Cloud Integrations Services Control Plane
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5 font-mono">PROVISIONING: AMAZON BEDROCK INFRASTRUCTURE</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* S3 CARD */}
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-900 flex flex-col justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">STORAGE leg</span>
                    <h4 className="text-xs font-bold text-white mt-1 uppercase font-mono">S3 Raw Alert Buckets</h4>
                    <span className="text-[9px] font-mono text-cyan-400 block mt-2">s3://sentinel-chain-raw-alerts/...</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-900 pt-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      awsConfig.s3Status === 'connected' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {awsConfig.s3Status.toUpperCase()}
                    </span>
                    <button
                      id="aws-toggle-s3"
                      onClick={() => saveAWSChanges('s3Status')}
                      className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 hover:text-white px-2 py-1 rounded hover:border-cyan-500/30 transition uppercase font-mono font-bold"
                    >
                      TOGGLE DISCONNECTION
                    </button>
                  </div>
                </div>

                {/* Bedrock CARD */}
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-900 flex flex-col justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">AGENT MODEL ENGINE</span>
                    <h4 className="text-xs font-bold text-white mt-1 uppercase font-mono">Bedrock Agent reasoning</h4>
                    <span className="text-[9px] font-mono text-cyan-400 block mt-2">amazon.nova-pro-v1:0</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-900 pt-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      awsConfig.bedrockStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {awsConfig.bedrockStatus.toUpperCase()}
                    </span>
                    <button
                      id="aws-toggle-bedrock"
                      onClick={() => saveAWSChanges('bedrockStatus')}
                      className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 hover:text-white px-2 py-1 rounded hover:border-cyan-500/30 transition uppercase font-mono font-bold"
                    >
                      TOGGLE DISCONNECTION
                    </button>
                  </div>
                </div>

                {/* Sonic CARD */}
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-900 flex flex-col justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">SPEECH PIPELINE</span>
                    <h4 className="text-xs font-bold text-white mt-1 uppercase font-mono">Nova Sonic TTS Synthesizer</h4>
                    <span className="text-[9px] font-mono text-cyan-400 block mt-2">STREAM-SPEED: 64KBPS CJS</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-900 pt-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      awsConfig.sonicStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {awsConfig.sonicStatus.toUpperCase()}
                    </span>
                    <button
                      id="aws-toggle-sonic"
                      onClick={() => saveAWSChanges('sonicStatus')}
                      className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 hover:text-white px-2 py-1 rounded hover:border-cyan-500/30 transition uppercase font-mono font-bold"
                    >
                      TOGGLE DISCONNECTION
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: NOTIFICATIONS CHECKS */}
          {activeTab === 'Notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 max-w-xl"
            >
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-cyan-400 animate-pulse" />
                  Warning Broadcast parameters settings
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Customizes threshold distributions package releases for critical warnings</p>
              </div>

              <div className="space-y-4 pt-2">
                
                {/* SMS Option */}
                <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-900">
                  <div>
                    <span className="text-xs font-semibold text-white block">Amazon SNS SMS Telemetry</span>
                    <p className="text-[10px] text-slate-400 leading-normal">Publishes instantaneous short messages for Critical anomalies directly to key administrators on command decks.</p>
                  </div>
                  <input
                    id="checkbox-sms-toggle"
                    type="checkbox"
                    checked={notifSMS}
                    onChange={(e) => setNotifSMS(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-800 accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Email Option */}
                <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-900">
                  <div>
                    <span className="text-xs font-semibold text-white block">Hourly digest Email report package</span>
                    <p className="text-[10px] text-slate-400 leading-normal">Compiles hourly threat trends charts, supplier health index breakdowns, and pending container delay estimations.</p>
                  </div>
                  <input
                    id="checkbox-email-toggle"
                    type="checkbox"
                    checked={notifEmail}
                    onChange={(e) => setNotifEmail(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-800 accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Slack Option */}
                <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-900">
                  <div>
                    <span className="text-xs font-semibold text-white block">Slack Developer webhook pipeline</span>
                    <p className="text-[10px] text-slate-400 leading-normal">Pipes active Bedrock warnings cards directly to enterprise security channels.</p>
                  </div>
                  <input
                    id="checkbox-slack-toggle"
                    type="checkbox"
                    checked={notifSlack}
                    onChange={(e) => setNotifSlack(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-800 accent-cyan-400 cursor-pointer"
                  />
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: SUPPLIERS CONFIGURATION LIST */}
          {activeTab === 'Suppliers' && (
            <motion.div
              key="suppliers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Building className="w-4 h-4 text-emerald-400" />
                  Sourcing Supplier Nodes Ledger
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Configure operational lead times and reliability guidelines for external fabrications</p>
              </div>

              <div className="space-y-3">
                {activeSuppliersList.map(sup => (
                  <div key={sup.id} className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white">{sup.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{sup.category} | {sup.location}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-[10px] font-mono shrink-0 w-full sm:w-auto">
                      <div>
                        <span className="text-slate-500 block text-[9.5px]">LEAD TIME</span>
                        <input
                          type="number"
                          value={sup.deliveryLeadTime}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setActiveSuppliersList(list =>
                              list.map(s => (s.id === sup.id ? { ...s, deliveryLeadTime: val } : s))
                            );
                          }}
                          className="w-16 bg-slate-900 border border-slate-800 px-1.5 py-1 text-white rounded text-center font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9.5px]">RELIABILITY</span>
                        <span className="text-white font-bold block mt-1">{sup.reliabilityScore}%</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1 shrink-0 flex items-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold leading-normal uppercase ${
                          sup.riskLevel === 'High' || sup.riskLevel === 'Critical'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/25'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {sup.riskLevel} RISK
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};
