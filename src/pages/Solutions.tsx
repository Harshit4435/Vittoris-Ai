import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { VITTORIS_SOLUTIONS, VITTORIS_SERVICES } from '../data/vittorisData';

interface SolutionsProps {
  onOpenConsultation: () => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ onOpenConsultation }) => {
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Outcome-Driven Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Business Solutions Grouped by Commercial Outcomes
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Explore how Vittoris pairs autonomous acquisition engines with custom AI infrastructure to solve specific operational and pipeline bottlenecks.
        </p>
      </div>

      {/* 8 Solutions List */}
      <div className="space-y-8">
        {VITTORIS_SOLUTIONS.map((sol, index) => (
          <div
            key={sol.slug}
            id={sol.slug}
            className="bg-[#0B0F1E] border border-blue-900/30 hover:border-blue-500/40 rounded-3xl p-6 sm:p-10 transition-all duration-300 shadow-xl space-y-6"
          >
            {/* Title & Tagline */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    Outcome 0{index + 1}
                  </span>
                  <span className="text-xs text-slate-400">{sol.tagline}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {sol.title}
                </h2>
              </div>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500 text-xs font-bold uppercase tracking-wider transition-all self-start md:self-auto shrink-0"
              >
                <span>Scoping Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Problem vs System Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-rose-950/10 border border-rose-900/30 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  The Underlying Operational Friction
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {sol.businessProblem}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-900/40 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  The Proposed Vittoris AI System
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {sol.proposedAISystem}
                </p>
              </div>
            </div>

            {/* How It Works & Expected Benefit */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Operational Mechanics
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {sol.howItWorks}
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Expected Nature of Commercial Benefit
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {sol.expectedImpact}
                </p>
                <div className="text-[11px] text-slate-500 italic pt-1">
                  *Note: Benefits describe system capabilities and efficiency shifts; exact metrics vary by client scope and baseline operations.
                </div>
              </div>
            </div>

            {/* Connected Services */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold text-[11px] uppercase">Engineered With:</span>
              {sol.relevantServiceSlugs.map((serviceSlug) => {
                const srv = VITTORIS_SERVICES.find(s => s.slug === serviceSlug);
                if (!srv) return null;
                return (
                  <Link
                    key={serviceSlug}
                    to={`/services/${serviceSlug}`}
                    className="px-2.5 py-1 rounded-lg bg-[#070A14] hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 border border-slate-800 hover:border-blue-500/40 text-[11px] transition-all"
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
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0B0F1E] to-cyan-950/30 border border-blue-900/40 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Have a Unique Operational Workflow?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          In Phase 1 of our implementation framework, we conduct an in-depth Operational Audit to map your current processes and pinpoint exact automation leverage.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30"
          >
            Schedule Operational Audit
          </button>
        </div>
      </div>
    </div>
  );
};
