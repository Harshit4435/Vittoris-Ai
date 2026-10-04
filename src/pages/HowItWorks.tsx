import React from 'react';
import { CheckCircle2, Workflow, Zap } from 'lucide-react';
import { VITTORIS_ENGAGEMENT_PHASES, VITTORIS_OUTCOMES } from '../data/vittorisData';

interface HowItWorksProps {
  onOpenConsultation: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenConsultation }) => {
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Workflow className="w-3.5 h-3.5 text-cyan-400" />
          <span>The Client Journey</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How Engagements Begin, Deploy, and Scale
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          A phased, systematic engineering framework engineered to ensure AI deployments solve tangible operational bottlenecks rather than burning capital on experimental tools.
        </p>
      </div>

      {/* 5-Phase RoadMap */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Five Sequential Phases</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            The Strategic AI Implementation Framework
          </h2>
        </div>

        <div className="space-y-4">
          {VITTORIS_ENGAGEMENT_PHASES.map((phase) => (
            <div
              key={phase.step}
              className="bg-[#0B0F1E] border border-blue-900/30 hover:border-blue-500/40 rounded-2xl p-6 sm:p-8 transition-all duration-200 shadow-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {phase.phase} (Step {phase.step})
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{phase.timeline}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                </div>

                <div className="lg:col-span-5 space-y-2">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {phase.description}
                  </p>
                  <p className="text-xs text-slate-400">
                    <strong>Focus: </strong>{phase.outcome}
                  </p>
                </div>

                <div className="lg:col-span-3 p-4 rounded-xl bg-[#070A14] border border-slate-800 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                    Tangible Phase Output
                  </div>
                  <ul className="space-y-1 text-xs font-medium text-white">
                    {phase.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5 Measurable Outcomes */}
      <div className="bg-[#0B0F1E] border border-blue-900/40 rounded-3xl p-8 sm:p-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Commercial Return
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Five Measurable Business Outcomes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            The verifiable operational shifts achieved when high-ticket client acquisition is united with custom operational infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VITTORIS_OUTCOMES.map((out, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#070A14] border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">Outcome 0{idx + 1}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">{out.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{out.description}</p>
              <div className="pt-2 text-[11px] text-blue-300 font-medium">
                Metric: {out.metricTag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Action */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0B0F1E] to-cyan-950/30 border border-blue-900/40 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Begin with Step 1: The Discovery Diagnostic</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          We review your existing pipeline flow, closing metrics, and quarterly targets in a focused 30-minute diagnostic session.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 mx-auto"
          >
            <Zap className="w-4 h-4" />
            <span>Book Your Discovery Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
