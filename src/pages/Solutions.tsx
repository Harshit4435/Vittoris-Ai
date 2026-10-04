import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { VITTORIS_SOLUTIONS, VITTORIS_SERVICES } from '../data/vittorisData';

interface SolutionsProps {
  onOpenConsultation: () => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ onOpenConsultation }) => {
  return (
    <div className="pt-32 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Editorial Luxury Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#C7A86D] text-[10px] font-medium uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C788]" />
          <span>Outcome-Driven Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
          Business Solutions Grouped by <span className="italic text-[#C7A86D]">Commercial Outcomes</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-2xl mx-auto">
          Explore how Vittoris pairs autonomous acquisition engines with custom AI infrastructure to eliminate specific operational and pipeline bottlenecks.
        </p>
      </div>

      {/* 8 Solutions List */}
      <div className="space-y-8">
        {VITTORIS_SOLUTIONS.map((sol, index) => (
          <div
            key={sol.slug}
            id={sol.slug}
            className="luxury-card rounded-3xl p-6 sm:p-10 transition-all duration-300 shadow-xl space-y-6 relative overflow-hidden group"
          >
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C7A86D]/10 transition-all duration-500" />

            {/* Title & Tagline */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C7A86D]/15 pb-5 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-medium text-[#E5C788] px-3 py-0.5 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/25">
                    Outcome 0{index + 1}
                  </span>
                  <span className="text-xs text-stone-400 font-light">{sol.tagline}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white group-hover:text-[#E5C788] transition-colors">
                  {sol.title}
                </h2>
              </div>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C7A86D]/40 hover:border-[#C7A86D] hover:bg-[#C7A86D]/10 text-stone-300 hover:text-white text-xs font-medium tracking-wider uppercase transition-all self-start md:self-auto shrink-0 shadow-sm"
              >
                <span>Scoping Session</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C7A86D]" />
              </button>
            </div>

            {/* Problem vs System Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
              <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-400/90">
                  The Underlying Operational Friction
                </div>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  {sol.businessProblem}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#C7A86D]/5 border border-[#C7A86D]/20 space-y-2">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E5C788]">
                  The Proposed Vittoris AI System
                </div>
                <p className="text-xs sm:text-sm text-stone-200 font-light leading-relaxed">
                  {sol.proposedAISystem}
                </p>
              </div>
            </div>

            {/* How It Works & Expected Benefit */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 relative z-10">
              <div className="space-y-2">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                  Operational Mechanics
                </div>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {sol.howItWorks}
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                  Expected Nature of Commercial Benefit
                </div>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {sol.expectedImpact}
                </p>
                <div className="text-[11px] text-stone-500 italic pt-1 font-light">
                  *Note: Benefits describe system capabilities and efficiency shifts; exact metrics vary by client scope and baseline operations.
                </div>
              </div>
            </div>

            {/* Connected Services */}
            <div className="pt-4 border-t border-[#C7A86D]/15 flex flex-wrap items-center gap-2 text-xs relative z-10">
              <span className="text-stone-500 font-semibold text-[10px] uppercase tracking-wider">Engineered With:</span>
              {sol.relevantServiceSlugs.map((serviceSlug) => {
                const srv = VITTORIS_SERVICES.find(s => s.slug === serviceSlug);
                if (!srv) return null;
                return (
                  <Link
                    key={serviceSlug}
                    to={`/services/${serviceSlug}`}
                    className="px-3 py-1.5 rounded-full bg-[#141414] hover:bg-[#C7A86D]/10 text-stone-300 hover:text-[#E5C788] border border-[#C7A86D]/20 text-[11px] transition-all"
                  >
                    {srv.number}. {srv.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Discovery Callout */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14120D] via-[#111111] to-[#14120D] border border-[#C7A86D]/30 text-center space-y-4 shadow-[0_8px_30px_rgba(199,168,109,0.1)]">
        <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white">
          Have a Unique <span className="italic text-[#C7A86D]">Operational Workflow</span>?
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto">
          In Phase 1 of our implementation framework, we conduct an in-depth Operational Audit to map your current processes and pinpoint exact automation leverage.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenConsultation}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(199,168,109,0.3)] hover:shadow-[0_4px_25px_rgba(199,168,109,0.5)]"
          >
            Schedule Operational Audit
          </button>
        </div>
      </div>
    </div>
  );
};
