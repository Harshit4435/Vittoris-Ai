import React from 'react';
import { CheckCircle2, Workflow, Sparkles } from 'lucide-react';
import { VITTORIS_ENGAGEMENT_PHASES, VITTORIS_OUTCOMES } from '../data/vittorisData';

interface HowItWorksProps {
  onOpenConsultation: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenConsultation }) => {
  return (
    <div className="pt-32 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Editorial Luxury Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#C7A86D] text-[10px] font-medium uppercase tracking-[0.25em]">
          <Workflow className="w-3.5 h-3.5 text-[#E5C788]" />
          <span>The Client Journey</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
          How Engagements Begin, <span className="italic text-[#C7A86D]">Deploy, and Scale</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-2xl mx-auto">
          A phased, systematic engineering framework engineered to ensure AI deployments solve tangible operational bottlenecks rather than burning capital on experimental tools.
        </p>
      </div>

      {/* 5-Phase RoadMap */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D]">
            Five Sequential Phases
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white">
            The Strategic AI Implementation Framework
          </h2>
        </div>

        <div className="space-y-4">
          {VITTORIS_ENGAGEMENT_PHASES.map((phase) => (
            <div
              key={phase.step}
              className="luxury-card rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-lg group relative overflow-hidden"
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C7A86D]/10 transition-all duration-500" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[#C7A86D]/10 text-[#E5C788] border border-[#C7A86D]/30">
                      {phase.phase} (Step {phase.step})
                    </span>
                    <span className="text-xs text-stone-400 font-mono">{phase.timeline}</span>
                  </div>
                  <h3 className="text-xl font-serif font-normal text-white group-hover:text-[#E5C788] transition-colors">
                    {phase.title}
                  </h3>
                </div>

                <div className="lg:col-span-5 space-y-2">
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {phase.description}
                  </p>
                  <p className="text-xs text-stone-400 font-light">
                    <strong className="text-[#C7A86D] font-medium">Focus: </strong>{phase.outcome}
                  </p>
                </div>

                <div className="lg:col-span-3 p-4 rounded-xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-1.5">
                  <div className="text-[10px] uppercase font-semibold text-[#E5C788] tracking-[0.2em]">
                    Tangible Phase Output
                  </div>
                  <ul className="space-y-1 text-xs font-light text-stone-200">
                    {phase.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A86D] shrink-0 mt-0.5" />
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
      <div className="luxury-card rounded-3xl p-8 sm:p-12 space-y-10 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D]">
            Commercial Return
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white">
            Five Measurable <span className="italic text-[#C7A86D]">Business Outcomes</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-light">
            The verifiable operational shifts achieved when high-ticket client acquisition is united with custom operational infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {VITTORIS_OUTCOMES.map((out, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 hover:border-[#C7A86D]/50 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#E5C788] font-medium">Outcome 0{idx + 1}</span>
                <CheckCircle2 className="w-4 h-4 text-[#C7A86D]" />
              </div>
              <h3 className="text-lg font-serif font-normal text-white">{out.title}</h3>
              <p className="text-xs text-stone-300 font-light leading-relaxed">{out.description}</p>
              <div className="pt-2 text-[11px] text-[#C7A86D] font-medium">
                Metric: {out.metricTag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Action */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14120D] via-[#111111] to-[#14120D] border border-[#C7A86D]/30 text-center space-y-4 shadow-[0_8px_30px_rgba(199,168,109,0.1)]">
        <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white">
          Begin with Step 1: The <span className="italic text-[#C7A86D]">Discovery Diagnostic</span>
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto">
          We review your existing pipeline flow, closing metrics, and quarterly targets in a focused 30-minute diagnostic session.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenConsultation}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(199,168,109,0.3)] hover:shadow-[0_4px_25px_rgba(199,168,109,0.5)] flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Your Discovery Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
