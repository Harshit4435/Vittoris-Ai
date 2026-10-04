import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Clock, ArrowUpRight, Target } from 'lucide-react';

export const ExecutiveDashboardDemo: React.FC = () => {
  const [inboundVolume, setInboundVolume] = useState(120);
  const [contractValue, setContractValue] = useState(25000);
  const [automationMode, setAutomationMode] = useState<'vittoris' | 'traditional'>('vittoris');

  // Realistic models based on PDF benchmarks
  const qualificationRate = automationMode === 'vittoris' ? 0.32 : 0.14;
  const showUpRate = automationMode === 'vittoris' ? 0.88 : 0.54;
  const closeRate = 0.22;

  const qualifiedLeads = Math.round(inboundVolume * qualificationRate);
  const attendedMeetings = Math.round(qualifiedLeads * showUpRate);
  const projectedDeals = Math.round(attendedMeetings * closeRate);
  const pipelineValue = attendedMeetings * contractValue;
  const projectedRevenue = projectedDeals * contractValue;

  // Bandwidth reclaimed (hours of cold calling / follow up saved)
  const hoursReclaimed = Math.round(inboundVolume * 1.8);

  return (
    <div className="w-full bg-[#0B0F1E] border border-blue-900/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <BarChart3 className="w-3.5 h-3.5" /> Executive Performance Dashboard
            </div>
            <h3 className="text-xl font-bold text-white">Pipeline Velocity & Operational ROI Modeler</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Model how Vittoris pre-qualification filters, sub-minute contact speeds, and show-up protection protocols transform top-line sales capacity.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setAutomationMode('traditional')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                automationMode === 'traditional'
                  ? 'bg-slate-800 text-slate-300'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Manual / Unvetted
            </button>
            <button
              onClick={() => setAutomationMode('vittoris')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                automationMode === 'vittoris'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Vittoris AI System
            </button>
          </div>
        </div>

        {/* Dynamic Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-2">
              <span>Monthly Inbound Volume (Leads / Enquiries)</span>
              <span className="text-cyan-400 font-mono font-bold text-sm">{inboundVolume}</span>
            </div>
            <input
              type="range"
              min={30}
              max={600}
              step={10}
              value={inboundVolume}
              onChange={(e) => setInboundVolume(Number(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>30 / mo</span>
              <span>300 / mo</span>
              <span>600 / mo</span>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-2">
              <span>Average Contract Value (ACV)</span>
              <span className="text-emerald-400 font-mono font-bold text-sm">${contractValue.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={100000}
              step={5000}
              value={contractValue}
              onChange={(e) => setContractValue(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>$5,000</span>
              <span>$50,000</span>
              <span>$100,000+</span>
            </div>
          </div>
        </div>

        {/* 4 Core Executive Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          <div className="bg-[#070A14] border border-slate-800 rounded-xl p-4">
            <div className="text-[10px] uppercase font-semibold text-slate-400 flex items-center justify-between">
              <span>Attended Qualified Meetings</span>
              <Users className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono mt-2">
              {attendedMeetings} <span className="text-xs font-normal text-slate-500">/ mo</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>{Math.round(showUpRate * 100)}% attendance rate</span>
            </div>
          </div>

          <div className="bg-[#070A14] border border-slate-800 rounded-xl p-4">
            <div className="text-[10px] uppercase font-semibold text-slate-400 flex items-center justify-between">
              <span>Active Pipeline Value</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono mt-2">
              ${(pipelineValue / 1000).toFixed(0)}k
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Strictly decision-makers
            </div>
          </div>

          <div className="bg-[#070A14] border border-slate-800 rounded-xl p-4">
            <div className="text-[10px] uppercase font-semibold text-slate-400 flex items-center justify-between">
              <span>Projected Closed Revenue</span>
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-2">
              ${(projectedRevenue / 1000).toFixed(0)}k
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Based on {Math.round(closeRate * 100)}% close rate
            </div>
          </div>

          <div className="bg-[#070A14] border border-slate-800 rounded-xl p-4">
            <div className="text-[10px] uppercase font-semibold text-slate-400 flex items-center justify-between">
              <span>Rep Hours Reclaimed</span>
              <Clock className="w-3.5 h-3.5 text-violet-400" />
            </div>
            <div className="text-2xl font-extrabold text-violet-400 font-mono mt-2">
              {hoursReclaimed}h <span className="text-xs font-normal text-slate-500">/ mo</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              No manual follow-up drag
            </div>
          </div>
        </div>

        {/* Funnel Visualizer */}
        <div className="bg-[#070A14] border border-slate-800 rounded-xl p-5">
          <div className="text-xs font-semibold text-white mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-400" /> End-to-End Pipeline Conversion Architecture
            </span>
            <span className="text-[10px] text-slate-500">Speed: Sub-minute AI vs 4h Manual</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">1. Raw Ingested Leads</div>
              <div className="text-base font-bold text-white font-mono mt-1">{inboundVolume}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Forms, Ads & Web</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">2. Pre-Screened Leads</div>
              <div className="text-base font-bold text-cyan-400 font-mono mt-1">{qualifiedLeads}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Budget & Authority vetted</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">3. Confirmed Meetings</div>
              <div className="text-base font-bold text-blue-400 font-mono mt-1">{attendedMeetings}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Omnichannel Show-Up Protected</div>
            </div>

            <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/60">
              <div className="text-[10px] text-emerald-400 uppercase font-semibold">4. Closed Deals</div>
              <div className="text-base font-bold text-emerald-300 font-mono mt-1">{projectedDeals}</div>
              <div className="text-[10px] text-slate-300 mt-0.5">${(projectedRevenue / 1000).toFixed(0)}k Net Volume</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
