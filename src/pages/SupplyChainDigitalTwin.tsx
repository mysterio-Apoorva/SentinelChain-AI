import React, { useState } from 'react';
import { useSentinel } from '../hooks/useSentinelState';
import { 
  Building, 
  Settings, 
  Warehouse, 
  Truck, 
  Server, 
  Activity, 
  Sliders, 
  X,
  Volume2,
  CheckCircle,
  AlertTriangle,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NodeTwin } from '../types';

export const SupplyChainDigitalTwin: React.FC = () => {
  const { digitalTwin, startVoiceBriefing } = useSentinel();
  const [activeNodes, setActiveNodes] = useState<NodeTwin[]>(digitalTwin);
  const [selectedNode, setSelectedNode] = useState<NodeTwin | null>(null);

  const updateNodeInventory = (nodeId: string, level: number) => {
    setActiveNodes(prev =>
      prev.map(node => (node.id === nodeId ? { ...node, inventoryLevel: level } : node))
    );
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(prev => prev ? { ...prev, inventoryLevel: level } : null);
    }
  };

  const toggleNodeStatus = (nodeId: string) => {
    setActiveNodes(prev =>
      prev.map(node => {
        if (node.id === nodeId) {
          const statuses: Array<'operational' | 'disrupted' | 'warning'> = ['operational', 'warning', 'disrupted'];
          const currentIdx = statuses.indexOf(node.status);
          const nextIdx = (currentIdx + 1) % statuses.length;
          const nextStatus = statuses[nextIdx];
          
          const updatedNode = { ...node, status: nextStatus };
          if (selectedNode && selectedNode.id === nodeId) {
            setSelectedNode(updatedNode);
          }
          return updatedNode;
        }
        return node;
      })
    );
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest">
            NODE-FLOW VISUAL TWIN MODEL
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 uppercase font-sans">Supply Chain Digital Twin</h2>
        </div>
        <div className="text-[10px] text-slate-500 font-mono bg-slate-900/40 border border-slate-800 p-2 rounded-lg leading-normal">
          OPERATIONAL CODES: <span className="text-emerald-400">CY-A8</span> | <span className="text-amber-400">CY-W9</span> | <span className="text-rose-500">CY-D4</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SVG Node Diagram Area */}
        <div className="lg:col-span-8 bg-slate-900/20 rounded-2xl border border-slate-850 p-5 relative overflow-hidden flex flex-col">
          
          <div className="border-b border-slate-900 pb-3 mb-4 flex items-center justify-between text-xs text-slate-400 select-none">
            <span className="font-mono tracking-wider">TOPOLOGICAL INFRASTRUCTURE MAPPING</span>
            <span className="font-sans flex items-center gap-1.5 text-[11px] text-cyan-400">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse animate-spin-slow" />
              Interactive Simulation Grid
            </span>
          </div>

          {/* Interactive SVG Connector Node Twin Map */}
          <div className="relative flex-1 min-h-[360px] md:min-h-[440px] bg-slate-950/40 rounded-xl border border-slate-900 flex items-center justify-center">
            
            <svg className="absolute inset-0 w-full h-full select-none" viewBox="0 0 700 400">
              {/* Connected Lines according to node coordinates and connections */}
              {activeNodes.map(node => {
                const startX = ((node.lng + 180) / 360) * 600 + 50;
                const startY = ((90 - node.lat) / 180) * 300 + 50;

                return node.connections.map(connId => {
                  const targetNode = activeNodes.find(n => n.id === connId);
                  if (targetNode) {
                    const endX = ((targetNode.lng + 180) / 360) * 600 + 50;
                    const endY = ((90 - targetNode.lat) / 180) * 300 + 50;
                    
                    return (
                      <g key={`${node.id}-${connId}`}>
                        <line
                          x1={startX}
                          y1={startY}
                          x2={endX}
                          y2={endY}
                          stroke={node.status === 'disrupted' || targetNode.status === 'disrupted' ? '#f43f5e' : '#1e293b'}
                          strokeWidth="2"
                          strokeDasharray="6 4"
                        />
                        {/* Interactive flow dashes */}
                        <line
                          x1={startX}
                          y1={startY}
                          x2={endX}
                          y2={endY}
                          stroke="#06b6d4"
                          strokeWidth="2"
                          strokeDasharray="20 180"
                          strokeDashoffset="10"
                          className="animate-stroke-dash"
                          style={{ strokeDashoffset: '180', strokeDasharray: '25 100' }}
                        />
                      </g>
                    );
                  }
                  return null;
                });
              })}
            </svg>

            {/* Overlaid absolutely positioned HTML Node Elements */}
            {activeNodes.map(node => {
              const x = ((node.lng + 180) / 360) * 600 + 50;
              const y = ((90 - node.lat) / 180) * 300 + 50;

              return (
                <div
                  key={node.id}
                  style={{ top: `${y}px`, left: `${x}px` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedNode(node)}
                    id={`digital-twin-node-${node.id}`}
                    className={`p-2 rounded-xl border relative flex flex-col items-center gap-1.5 shadow-2xl transition-all ${
                      node.status === 'disrupted' ? 'bg-rose-500/90 border-rose-400 text-slate-950' :
                      node.status === 'warning' ? 'bg-amber-400 text-slate-950 border-amber-300' :
                      'bg-slate-900/90 border-slate-800 text-white hover:border-slate-700'
                    }`}
                  >
                    {/* Ring pulsing for warnings */}
                    {node.status !== 'operational' && (
                      <span className="absolute -inset-1 rounded-2xl bg-inherit animate-ping opacity-35" />
                    )}

                    {node.type === 'supplier' && <Settings className="w-3.5 h-3.5" />}
                    {node.type === 'factory' && <Server className="w-3.5 h-3.5" />}
                    {node.type === 'warehouse' && <Warehouse className="w-3.5 h-3.5" />}
                    {node.type === 'distribution' && <Truck className="w-3.5 h-3.5" />}

                    <span className="text-[9px] font-mono font-bold uppercase block px-1 tracking-wider leading-none">
                      {node.name.split(' ')[0]}
                    </span>
                  </motion.button>
                </div>
              );
            })}

            {/* Status overview indicator legend */}
            <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg text-[9px] text-slate-400 space-y-1 select-none">
              <span className="font-bold text-white uppercase block mb-1">Interactive Node Actions</span>
              <p>1. Click on a node to view analytics details.</p>
              <p>2. Double-click or press "Toggle Status" to cycle statuses.</p>
            </div>

          </div>
        </div>

        {/* Right 4 columns - Simulation Panel Sheet */}
        <div className="lg:col-span-4 bg-slate-900/40 rounded-2xl border border-slate-850 p-5 flex flex-col justify-between">
          
          <div className="flex-1 flex flex-col justify-start">
            <h3 className="text-xs font-bold text-white pb-2 border-b border-slate-900 uppercase tracking-wide mb-4">Node Controller Plane</h3>

            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase ${
                      selectedNode.status === 'disrupted' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      selectedNode.status === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {selectedNode.status.toUpperCase()} STATUS
                    </span>
                    <button
                      id="node-toggle-status"
                      onClick={() => toggleNodeStatus(selectedNode.id)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono border border-slate-700 text-slate-300 transition"
                    >
                      Cycle Status
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{selectedNode.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono">Location: {selectedNode.location}</p>
                  </div>

                  {/* Operational details */}
                  <div className="space-y-3 p-3 bg-slate-950/60 rounded-xl border border-slate-850">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500 uppercase font-mono">Nominal Capacity</span>
                      <span className="text-white font-medium">{selectedNode.capacity}</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 uppercase font-mono">Inventory On-hand level</span>
                        <span className={`font-mono font-bold ${
                          selectedNode.inventoryLevel < 40 ? 'text-rose-400' :
                          selectedNode.inventoryLevel < 65 ? 'text-yellow-400' : 'text-emerald-400'
                        }`}>
                          {selectedNode.inventoryLevel}%
                        </span>
                      </div>
                      
                      {/* Interactive inventory glider range slide */}
                      <input
                        id={`glider-${selectedNode.id}`}
                        type="range"
                        min="5"
                        max="100"
                        value={selectedNode.inventoryLevel}
                        onChange={(e) => updateNodeInventory(selectedNode.id, parseInt(e.target.value))}
                        className="w-full bg-slate-800 rounded-lg h-1 accent-cyan-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Summary commentary simulation */}
                  <div className="text-[10px] space-y-1 bg-cyan-950/25 p-3 rounded-lg border border-cyan-500/15">
                    <span className="text-cyan-400 font-bold block uppercase font-mono leading-none">Diagnostic evaluation:</span>
                    <p className="text-slate-300 italic leading-relaxed">
                      {selectedNode.status === 'disrupted' 
                        ? 'CRITICAL EXPOSURE: Maritime port strike blocks all casting hulls. Assembly output predicted to experience linear degradation.'
                        : selectedNode.status === 'warning'
                        ? 'WARN: Local inventories drop below 50% safety thresholds. Place alternative suppliers on standby alerts immediately.'
                        : 'NOMINAL RESPONSE: All microgrid channels streaming within acceptable manufacturing tolerances. Reserves solid.'}
                    </p>
                  </div>

                  <button
                    onClick={() => startVoiceBriefing(`Synthetic evaluation report for ${selectedNode.name} in ${selectedNode.location}. Nominal capacity stands at ${selectedNode.capacity}, current inventory reserve is at ${selectedNode.inventoryLevel} percent.`)}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 font-mono text-[10px] uppercase font-bold flex items-center justify-center gap-2 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    Read Node Briefing
                  </button>

                </motion.div>
              ) : (
                <div className="p-8 text-center text-slate-500 mt-12 md:mt-24">
                  <Sliders className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                  <p className="text-xs font-bold">Node not selected.</p>
                  <p className="text-[10px] text-slate-600 mt-1 leading-normal">
                    Click any element displayed in the digital network diagram to inspect nominal capacities, inventory thresholds, or adjust simulation ranges!
                  </p>
                </div>
              )}
            </AnimatePresence>

          </div>

          <div className="border-t border-slate-900/60 pt-4 mt-4 text-[10px] text-slate-500 font-mono">
            <span>RESERVE HEALTH AVERAGES:</span>
            <div className="flex items-center justify-between mt-1.5">
              <span>ESTIMATED ON-TIME SHIELD:</span>
              <span className="text-emerald-400 font-bold">94.8%</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
