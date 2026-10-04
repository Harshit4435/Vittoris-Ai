import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { VITTORIS_INDUSTRIES } from '../data/vittorisData';

interface IndustriesProps {
  onOpenConsultation: () => void;
}

export const Industries: React.FC<IndustriesProps> = ({ onOpenConsultation }) => {
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Cross-Niche Systems Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Industry Application Blueprints
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          How the same underlying autonomous acquisition, conversational screening, and document intelligence engines adapt to diverse high-ticket and service business models.
        </p>
        <div className="inline-block px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          Illustrative vertical architectures • Configured to proprietary unit economics
        </div>
      </div>

      {/* 6 Industries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {VITTORIS_INDUSTRIES.map((ind) => (
          <div
            key={ind.slug}
            className="bg-[#0B0F1E] border border-blue-900/30 hover:border-violet-500/40 rounded-3xl p-6 sm:p-8 space-y-6 transition-all duration-300 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">
                  Vertical Blueprint
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {ind.title}
                </h2>
                <p className="text-xs font-medium text-blue-300/90 mt-0.5">
                  {ind.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {ind.overview}
              </p>

              {/* Friction solved */}
              <div className="p-4 rounded-xl bg-rose-950/10 border border-rose-900/30 text-xs text-slate-300 space-y-1.5">
                <span className="text-rose-400 font-bold block">Common Sector Friction:</span>
                {ind.painPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-slate-300">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Tailored AI Architecture */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Tailored AI Infrastructure:
                </div>
                <ul className="space-y-2">
                  {ind.tailoredAutomations.map((sys, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{sys}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Shift: <strong className="text-slate-300">{ind.metricHighlight}</strong>
              </span>

              <button
                onClick={onOpenConsultation}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-violet-600 text-slate-300 hover:text-white border border-slate-700 hover:border-violet-500 text-xs font-semibold transition-all"
              >
                Discuss Vertical Fit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cross-Niche Architecture Explanation */}
      <div className="bg-[#0B0F1E] border border-blue-900/30 rounded-3xl p-8 sm:p-12 space-y-6">
        <h3 className="text-2xl font-bold text-white">Why Modular Architecture Transcends Specific Niches</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Whether you run an accounting firm, a B2B SaaS platform, or a commercial real estate brokerage, the mathematical laws of high-ticket sales remain constant: speed-to-lead dictates conversion, unvetted leads waste expensive closer bandwidth, and clerical administrative drag slows down revenue realization.
        </p>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
          Vittoris configures modular parameters—custom qualification criteria, dynamic objection scripts, document extraction models, and calendar injection protocols—around your specific average contract value (ACV) and sales cycle.
        </p>
      </div>
    </div>
  );
};
