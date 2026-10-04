import React from 'react';
import { Sparkles, ShieldCheck, Cpu, Target, Workflow } from 'lucide-react';
import { WHY_CHOOSE_VITTORIS, COMPANY_CONTACT_DETAILS } from '../data/vittorisData';

interface AboutProps {
  onOpenConsultation: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenConsultation }) => {
  return (
    <div className="pt-32 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Editorial Luxury Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#C7A86D] text-[10px] font-medium uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C788]" />
          <span>Company Positioning & Approach</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
          Engineered for <span className="italic text-[#C7A86D]">Measurable Booked Revenue</span>
        </h1>
        <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-2xl mx-auto">
          Vittoris is an outcome-driven growth and AI services company engineered for one clear objective: generating pre-qualified client pipeline while eliminating the operational drag of chasing cold leads.
        </p>
      </div>

      {/* Core Philosophy / Who We Are */}
      <div className="luxury-card rounded-3xl p-8 sm:p-12 space-y-8 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3 relative z-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D]">
            Our Stated Approach
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white">
            We Don't Sell Software Subscriptions and Walk Away
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
            In modern service and high-ticket sectors, companies spend thousands on disjointed SaaS tools, CRM subscriptions, and cold outbound attempts that fail to produce pipeline.
          </p>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
            Vittoris solves this by uniting performance-based client acquisition with bespoke AI operational infrastructure. We deploy, manage, and continuously optimize systems directly tied to verifiable booked revenue.
          </p>
        </div>

        {/* 4 Foundation Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-[#C7A86D]/15 relative z-10">
          <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 hover:border-[#C7A86D]/50 transition-all space-y-2">
            <Target className="w-5 h-5 text-[#C7A86D]" />
            <h3 className="text-sm font-serif font-normal text-white">Outcome-Driven Acquisition</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Compensation aligned directly with confirmed, pre-qualified sales appointments that satisfy written criteria.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 hover:border-[#C7A86D]/50 transition-all space-y-2">
            <Cpu className="w-5 h-5 text-[#E5C788]" />
            <h3 className="text-sm font-serif font-normal text-white">Permanent Asset Creation</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Businesses own the custom infrastructure deployed rather than renting a recurring black box.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 hover:border-[#C7A86D]/50 transition-all space-y-2">
            <Workflow className="w-5 h-5 text-[#C7A86D]" />
            <h3 className="text-sm font-serif font-normal text-white">Strategy + Engineering</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              High-level strategic pipeline design paired with rigorous, full-stack automation development.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 hover:border-[#C7A86D]/50 transition-all space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#E5C788]" />
            <h3 className="text-sm font-serif font-normal text-white">Zero Platform Disruption</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Automations integrate natively into active software tools without requiring disruptive system overhauls.
            </p>
          </div>
        </div>
      </div>

      {/* Why Businesses Choose Vittoris */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D]">
            Strategic Differentiation
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white">
            Why Businesses Choose <span className="italic text-[#C7A86D]">Vittoris</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_VITTORIS.map((item, idx) => (
            <div
              key={idx}
              className="luxury-card rounded-2xl p-6 space-y-3 relative overflow-hidden group"
            >
              <div className="w-8 h-8 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#E5C788] font-mono font-medium text-xs flex items-center justify-center">
                0{idx + 1}
              </div>
              <h3 className="text-base font-serif font-normal text-white group-hover:text-[#E5C788] transition-colors">{item.title}</h3>
              <p className="text-xs text-stone-300 font-light leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Executive Communication Notice */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14120D] via-[#111111] to-[#14120D] border border-[#C7A86D]/30 text-center space-y-4 shadow-[0_8px_30px_rgba(199,168,109,0.1)]">
        <h3 className="text-2xl font-serif font-normal text-white">
          Direct Executive <span className="italic text-[#C7A86D]">Communication</span>
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto">
          For technical partnership inquiries, platform scoping, or commercial integration reviews, contact our systems desk directly:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#E5C788] pt-2 font-mono">
          <a href={`mailto:${COMPANY_CONTACT_DETAILS.companyEmail}`} className="hover:text-white transition-colors">
            {COMPANY_CONTACT_DETAILS.companyEmail}
          </a>
          <span className="text-[#C7A86D]/40">•</span>
          <a href={`mailto:${COMPANY_CONTACT_DETAILS.ownerEmail}`} className="hover:text-white transition-colors">
            {COMPANY_CONTACT_DETAILS.ownerEmail}
          </a>
        </div>
        <div className="pt-4">
          <button
            onClick={onOpenConsultation}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(199,168,109,0.3)] hover:shadow-[0_4px_25px_rgba(199,168,109,0.5)]"
          >
            Schedule Discovery Diagnostic
          </button>
        </div>
      </div>
    </div>
  );
};
