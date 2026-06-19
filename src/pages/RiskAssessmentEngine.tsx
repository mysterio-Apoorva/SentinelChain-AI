import React, { useState } from 'react';
import { useSentinel } from '../hooks/useSentinelState';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Sliders, 
  ShieldAlert, 
  Sparkles,
  HelpCircle,
  Play,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { motion } from 'motion/react';

export const RiskAssessmentEngine: React.FC = () => {
  const { startVoiceBriefing, flights = [] } = useSentinel(); // Grab any available contexts
  const [regionMultiplier, setRegionMultiplier] = useState(1.2); // 0.5 to 2.0
  const [climateIntensity, setClimateIntensity] = useState(1.4); // 0.8 to 2.5
  const [laborStrikeProbability, setLaborStrikeProbability] = useState(65); // percentage
  const [exposureThreshold, setExposureThreshold] = useState(250000); // USD base

  // Recalculations driven by inputs
  const calculatedRiskScore = Math.min(
    100,
    Math.round(
      (regionMultiplier * 25 + climateIntensity * 30 + (laborStrikeProbability / 100) * 45)
    )
  );

  const calculatedFinancialExposure = Math.round(
    exposureThreshold * regionMultiplier * (1 + climateIntensity * 0.15)
  );

  const calculatedDelayPrediction = Math.round(
    calculatedRiskScore * 0.18 * (laborStrikeProbability > 50 ? 1.5 : 1)
  );

  const getRiskLabel = (score: number) => {
    if (score >= 80) return { label: 'CRITICAL', color: 'text-rose-400 bg-rose-500/15 border-rose-500/30' };
    if (score >= 60) return { label: 'HIGH', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' };
    if (score >= 40) return { label: 'MEDIUM', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' };
    return { label: 'LOW', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
  };

  const currentRiskBadge = getRiskLabel(calculatedRiskScore);

  const resetEngine = () => {
    setRegionMultiplier(1.2);
    setClimateIntensity(1.4);
    setLaborStrikeProbability(65);
    setExposureThreshold(250000);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest">
            PREDICTIVE HAZARD EVALUATOR
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 uppercase">Risk Assessment Engine</h2>
        </div>
        
        <button
          id="assessment-reset"
          onClick={resetEngine}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold font-mono border border-slate-800 text-slate-300 transition-all flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Parameters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Parameter Sliders Simulator */}
        <div className="lg:col-span-7 bg-slate-900/20 rounded-2xl border border-slate-850 p-5 space-y-6">
          
          <div className="pb-3 border-b border-slate-900 flex items-center justify-between text-xs text-slate-400 select-none">
            <span className="font-bold uppercase tracking-wider">Dynamic Risk Factors</span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Sliders className="w-3.5 h-3.5" />
              Recalculating live
            </span>
          </div>

          <div className="space-y-5.5">
            
            {/* Slider 1: Region Multiplier */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Geopolitical Region Risk Index</span>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/25">
                  {regionMultiplier}x multiplier
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Includes naval chokepoint transit delays, territorial customs tariffs, and local regulatory changes.</p>
              <input
                id="region-risk-slider"
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={regionMultiplier}
                onChange={(e) => setRegionMultiplier(parseFloat(e.target.value))}
                className="w-full bg-slate-800 rounded-lg h-1 accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Slider 2: Climate Intensity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Climate & Storm Intensity Vector</span>
                <span className="text-xs font-mono font-bold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/25">
                  {climateIntensity}x severity
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Models tropical typhoon forecasts, river low-water levels (Rhine, Panama), and airport weather closures.</p>
              <input
                id="climate-risk-slider"
                type="range"
                min="0.8"
                max="3.0"
                step="0.1"
                value={climateIntensity}
                onChange={(e) => setClimateIntensity(parseFloat(e.target.value))}
                className="w-full bg-slate-800 rounded-lg h-1 accent-yellow-400 cursor-pointer"
              />
            </div>

            {/* Slider 3: Labor strike */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Dockworker & Labor Strike Probability</span>
                <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/25">
                  {laborStrikeProbability}% probability
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Assesses local union contracts negotiations status, docker wildcat strike histories, and railway union arbitrations.</p>
              <input
                id="labor-risk-slider"
                type="range"
                min="0"
                max="100"
                value={laborStrikeProbability}
                onChange={(e) => setLaborStrikeProbability(parseInt(e.target.value))}
                className="w-full bg-slate-800 rounded-lg h-1 accent-rose-400 cursor-pointer"
              />
            </div>

            {/* Slider 4: Financial Value */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Baseline Sourced Material Exposure Value</span>
                <span className="text-xs font-mono font-bold text-white bg-slate-850 px-2 py-0.5 rounded border border-slate-700">
                  ${exposureThreshold.toLocaleString()}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Total dollar value of inventory shipments currently in transit or scheduled inside affected regions.</p>
              <input
                id="financial-risk-slider"
                type="range"
                min="50000"
                max="1000000"
                step="25000"
                value={exposureThreshold}
                onChange={(e) => setExposureThreshold(parseInt(e.target.value))}
                className="w-full bg-slate-800 rounded-lg h-1 accent-indigo-500 cursor-pointer"
              />
            </div>

          </div>

        </div>

        {/* Right Column: Predictive Recalculations Display */}
        <div className="lg:col-span-5 bg-slate-900/40 rounded-2xl border border-slate-850 p-5 flex flex-col justify-between">
          
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-white pb-2 border-b border-slate-900 uppercase tracking-wide">Predictive Analytics Assessment</h3>

            {/* Assessment Score Ring */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-855">
              
              <div className="w-18 h-18 rounded-full border-4 border-slate-800 flex items-center justify-center relative shrink-0">
                <svg className="absolute inset-0 w-full h-full rotate-270" viewBox="0 0 36 36">
                  <path
                    className="stroke-slate-950"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={calculatedRiskScore >= 70 ? 'stroke-rose-500' : 'stroke-cyan-400'}
                    strokeDasharray={`${calculatedRiskScore}, 100`}
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="text-lg font-black font-mono text-white">{calculatedRiskScore}</span>
              </div>

              <div>
                <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold border block mb-1 ${currentRiskBadge.color}`}>
                  {currentRiskBadge.label} RISK LEVEL
                </span>
                <span className="text-xs text-slate-400 block max-w-[200px]">
                  Based on dynamic geopolitical, environmental, and labor algorithms.
                </span>
              </div>

            </div>

            {/* Calculated Exposure values */}
            <div className="grid grid-cols-2 gap-4">
              
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-900">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Exposure Forecast</span>
                <p className="text-base font-black text-white font-mono mt-1">${calculatedFinancialExposure.toLocaleString()}</p>
                <span className="text-[9px] text-slate-400 mt-0.5 block">Adjusted financial liability</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-900">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Delay Days Forecast</span>
                <p className="text-base font-black text-yellow-400 font-mono mt-1">+{calculatedDelayPrediction} Days</p>
                <span className="text-[9px] text-slate-400 mt-0.5 block">Cumulative maritime delay</span>
              </div>

            </div>

            {/* Confidence metric indicator */}
            <div className="p-3 bg-indigo-950/20 border border-indigo-500/15 rounded-xl">
              <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Amazon Bedrock Evaluation
              </span>
              <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
                The Bedrock agent indicates **{(98 - calculatedRiskScore / 10).toFixed(0)}% confidence** on these recalculations. High labor strike probability ({laborStrikeProbability}%) remains the dominant risk driver. Rerouting ocean legs should commence within 24 hours.
              </p>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-900">
            <button
              id="assessment-vox-trigger"
              onClick={() => startVoiceBriefing(`Assessment evaluation completed. Calculated risk exposure is ${calculatedFinancialExposure.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}, and shipment delays of up to ${calculatedDelayPrediction} days are predicted.`)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-300 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider transition-all shadow-md shadow-cyan-500/10 flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-slate-950 animate-pulse" />
              Synthesize Diagnostic Report
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
