import React from 'react';
import { Sparkles, ShieldCheck, Cpu, Target, Workflow } from 'lucide-react';
import { WHY_CHOOSE_VITTORIS, COMPANY_CONTACT_DETAILS } from '../data/vittorisData';

interface AboutProps {
  onOpenConsultation: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenConsultation }) => {
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Company Positioning & Approach</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineered for Measurable Booked Revenue
        </h1>
        <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
          Vittoris is an outcome-driven growth and automation company engineered for one clear objective: generating pre-qualified client pipeline while eliminating the operational drag of chasing cold leads.
        </p>
      </div>

      {/* Core Philosophy / Who We Are */}
      <div className="bg-[#0B0F1E] border border-blue-900/30 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Our Stated Approach
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            We Don't Sell Software Subscriptions and Walk Away
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In modern service and high-ticket sectors, companies spend thousands on disjointed SaaS tools, CRM subscriptions, and cold outbound attempts that fail to produce pipeline.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Vittoris solves this by uniting performance-based client acquisition with bespoke AI operational infrastructure. We deploy, manage, and continuously optimize systems directly tied to verifiable booked revenue.
          </p>
        </div>

        {/* 4 Foundation Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="p-5 rounded-2xl bg-[#070A14] border border-slate-800 space-y-2">
            <Target className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Outcome-Driven Acquisition</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compensation aligned directly with confirmed, pre-qualified sales appointments that satisfy written criteria.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#070A14] border border-slate-800 space-y-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Permanent Asset Creation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Businesses own the custom infrastructure deployed rather than renting a recurring black box.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#070A14] border border-slate-800 space-y-2">
            <Workflow className="w-5 h-5 text-violet-400" />
            <h3 className="text-sm font-bold text-white">Strategy + Engineering</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-level strategic pipeline design paired with rigorous, full-stack automation development.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#070A14] border border-slate-800 space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Zero Platform Disruption</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automations integrate natively into active software tools without requiring disruptive system overhauls.
            </p>
          </div>
        </div>
      </div>

      {/* Why Businesses Choose Vittoris */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Strategic Differentiation
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Why Businesses Choose Vittoris
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_VITTORIS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0B0F1E] border border-blue-900/30 hover:border-blue-500/40 transition-all space-y-2.5"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-mono font-bold text-xs flex items-center justify-center">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Communications Notice */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/50 border border-slate-800 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Direct Executive Communication</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          For technical partnership inquiries, platform scoping, or commercial integration reviews, contact our systems desk directly:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-blue-400 pt-2 font-mono">
          <span>{COMPANY_CONTACT_DETAILS.email}</span>
          <span>•</span>
          <span>{COMPANY_CONTACT_DETAILS.secondaryEmail}</span>
          <span>•</span>
          <span>{COMPANY_CONTACT_DETAILS.phone}</span>
        </div>
        <div className="pt-4">
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30"
          >
            Schedule Discovery Diagnostic
          </button>
        </div>
      </div>
    </div>
  );
};
