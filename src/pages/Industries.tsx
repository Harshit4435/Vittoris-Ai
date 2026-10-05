import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { VITTORIS_INDUSTRIES } from '../data/vittorisData';

interface IndustriesProps {
  onOpenConsultation: () => void;
}

export const Industries: React.FC<IndustriesProps> = ({ onOpenConsultation }) => {
  return (
    <div className="pt-32 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Editorial Luxury Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#C7A86D] text-[10px] font-medium uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C788]" />
          <span>Cross-Niche Systems Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
          Industry Application <span className="italic text-[#C7A86D]">Blueprints</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-2xl mx-auto">
          How the same underlying autonomous acquisition, conversational screening, and document intelligence engines adapt to diverse high-ticket and service business models.
        </p>
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#111111]/80 border border-[#C7A86D]/20 text-[11px] text-stone-400 font-light">
          Illustrative vertical architectures • Configured to proprietary unit economics
        </div>
      </div>

      {/* 6 Industries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {VITTORIS_INDUSTRIES.map((ind) => (
          <div
            key={ind.slug}
            className="luxury-card rounded-3xl p-6 sm:p-8 space-y-6 transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C7A86D]/10 transition-all duration-500" />

            <div className="space-y-4 relative z-10">
              <div>
                <span className="text-xs font-mono font-medium text-[#E5C788] uppercase tracking-[0.2em]">
                  Vertical Blueprint
                </span>
                <h2 className="text-2xl font-serif font-normal text-white mt-1 group-hover:text-[#E5C788] transition-colors">
                  {ind.title}
                </h2>
                <p className="text-xs font-medium text-[#C7A86D]/90 mt-0.5">
                  {ind.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                {ind.overview}
              </p>

              {/* Friction solved */}
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 text-xs text-stone-300 font-light space-y-1.5 friction-card">
                <span className="text-rose-400/90 font-medium block uppercase tracking-wider text-[10px]">Common Sector Friction:</span>
                {ind.painPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-stone-300">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Tailored AI Architecture */}
              <div className="space-y-2 pt-2">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E5C788]">
                  Tailored AI Infrastructure:
                </div>
                <ul className="space-y-2">
                  {ind.tailoredAutomations.map((sys, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-300 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#C7A86D] shrink-0 mt-0.5" />
                      <span>{sys}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#C7A86D]/15 flex items-center justify-between relative z-10">
              <span className="text-xs text-stone-500 font-light">
                Shift: <strong className="text-[#E5C788] font-medium">{ind.metricHighlight}</strong>
              </span>

              <button
                onClick={onOpenConsultation}
                className="px-4 py-2 rounded-full border border-[#C7A86D]/40 hover:border-[#C7A86D] hover:bg-[#C7A86D]/10 text-stone-300 hover:text-white text-xs font-medium tracking-wider uppercase transition-all shadow-sm"
              >
                Discuss Vertical Fit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cross-Niche Architecture Explanation */}
      <div className="luxury-card rounded-3xl p-8 sm:p-12 space-y-6 relative overflow-hidden">
        <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white">
          Why Modular Architecture Transcends <span className="italic text-[#C7A86D]">Specific Niches</span>
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-3xl">
          Whether you run an accounting firm, a B2B SaaS platform, or a commercial real estate brokerage, the mathematical laws of high-ticket sales remain constant: speed-to-lead dictates conversion, unvetted leads waste expensive closer bandwidth, and clerical administrative drag slows down revenue realization.
        </p>
        <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-3xl">
          Vittoris configures modular parameters—custom qualification criteria, dynamic objection scripts, document extraction models, and calendar injection protocols—around your specific average contract value (ACV) and sales cycle.
        </p>
      </div>
    </div>
  );
};
