import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Sparkles, Building2, UserCheck, DollarSign, Calendar, Zap } from 'lucide-react';

interface ProspectData {
  industry: string;
  role: string;
  monthlyBudget: number;
  timeline: string;
  leadSource: string;
}

export const LeadQualificationDemo: React.FC = () => {
  const [prospect, setProspect] = useState<ProspectData>({
    industry: 'Enterprise B2B SaaS',
    role: 'VP of Growth / CRO',
    monthlyBudget: 35000,
    timeline: 'Immediate (0 - 30 days)',
    leadSource: 'AI Inbound Web Funnel',
  });


  // Compute qualification based on PDF criteria
  const isDecisionMaker = ['CEO / Founder', 'VP of Growth / CRO', 'Managing Partner'].includes(prospect.role);
  const isBudgetQualified = prospect.monthlyBudget >= 15000;
  const isTimelineQualified = ['Immediate (0 - 30 days)', '1 - 2 Months'].includes(prospect.timeline);

  const passedCriteriaCount = (isDecisionMaker ? 1 : 0) + (isBudgetQualified ? 1 : 0) + (isTimelineQualified ? 1 : 0);
  
  let qualificationStatus: 'QUALIFIED' | 'REVIEW' | 'DISQUALIFIED' = 'QUALIFIED';
  let score = 92;

  if (passedCriteriaCount === 3) {
    qualificationStatus = 'QUALIFIED';
    score = Math.min(98, 85 + Math.round(prospect.monthlyBudget / 4000));
  } else if (passedCriteriaCount === 2) {
    qualificationStatus = 'REVIEW';
    score = 68;
  } else {
    qualificationStatus = 'DISQUALIFIED';
    score = 34;
  }


  return (
    <div className="w-full bg-[#0B0F1E] border border-blue-900/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Interactive AI Screening Engine
            </div>
            <h3 className="text-xl font-bold text-white">Multi-Layer AI Lead Qualification Simulator</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Demonstrating the exact multi-tier filtration described in the Vittoris Pay-Per-Appointment model. Criteria verify decision authority, budget minimums, and commercial timeline.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
            Simulated Environment • No Live PII
          </div>
        </div>

        {/* Grid: Inputs vs Real-time Evaluation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Input Parameters */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-400" /> Inbound Lead Parameters
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target Industry Vertical
                </label>
                <select
                  value={prospect.industry}
                  onChange={(e) => { setProspect({ ...prospect, industry: e.target.value });  }}
                  className="w-full bg-[#070A14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Enterprise B2B SaaS">Enterprise B2B SaaS</option>
                  <option value="Commercial Real Estate">Commercial Real Estate & Capital</option>
                  <option value="Professional Services / Legal / Accounting">Professional Services / Legal / Accounting</option>
                  <option value="Consulting & High-Ticket Agencies">Consulting & High-Ticket Agencies</option>
                  <option value="Specialized Healthcare & Clinics">Specialized Healthcare & Clinics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                  <span>Prospect Title / Decision Authority</span>
                  <span className="text-[11px] text-blue-400 font-normal">Authority Check</span>
                </label>
                <select
                  value={prospect.role}
                  onChange={(e) => { setProspect({ ...prospect, role: e.target.value });  }}
                  className="w-full bg-[#070A14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="VP of Growth / CRO">VP of Growth / CRO (Verified Decision Maker)</option>
                  <option value="CEO / Founder">CEO / Founder (Ultimate Authority)</option>
                  <option value="Managing Partner">Managing Partner (Budget Sign-Off)</option>
                  <option value="Operations Manager">Operations Manager (Internal Influencer)</option>
                  <option value="Junior Associate / Intern">Junior Associate / Student (Non-Decision Maker)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Monthly Project / Contract Budget</span>
                  <span className="text-cyan-400 font-mono font-bold">${prospect.monthlyBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={3000}
                  max={80000}
                  step={1000}
                  value={prospect.monthlyBudget}
                  onChange={(e) => { setProspect({ ...prospect, monthlyBudget: Number(e.target.value) });  }}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>$3,000 (Low tier)</span>
                  <span className="text-blue-400 font-semibold">Threshold: $15,000</span>
                  <span>$80,000+ (Enterprise)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Project Implementation Timeline
                </label>
                <select
                  value={prospect.timeline}
                  onChange={(e) => { setProspect({ ...prospect, timeline: e.target.value });  }}
                  className="w-full bg-[#070A14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Immediate (0 - 30 days)">Immediate (0 - 30 days) — High Intent</option>
                  <option value="1 - 2 Months">1 - 2 Months — Active Evaluation</option>
                  <option value="3 - 6 Months">3 - 6 Months — Exploratory</option>
                  <option value="Undefined / Browsing">Undefined / Just curious</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right: AI Analysis & Decision Output */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Real-Time AI Verdict
              </span>
              <span className="text-[11px] text-slate-500">Model: Vittoris-Filter-v4</span>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex-grow flex flex-col justify-between space-y-4">
              {/* Score card */}
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#070A14] border border-slate-800">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">AI Qualification Score</div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-white font-mono">{score}</span>
                    <span className="text-xs text-slate-500">/ 100</span>
                  </div>
                </div>

                <div className="text-right">
                  {qualificationStatus === 'QUALIFIED' && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" /> QUALIFIED APPOINTMENT
                    </div>
                  )}
                  {qualificationStatus === 'REVIEW' && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                      <AlertTriangle className="w-4 h-4" /> CONDITIONAL REVIEW
                    </div>
                  )}
                  {qualificationStatus === 'DISQUALIFIED' && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
                      <XCircle className="w-4 h-4" /> DISQUALIFIED — ZERO BILLING
                    </div>
                  )}
                </div>
              </div>

              {/* Verification Checklist */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-[#070A14]/70 border border-slate-800/80">
                  <span className="text-slate-300 flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" /> Decision Authority:
                  </span>
                  <span className={`font-medium ${isDecisionMaker ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isDecisionMaker ? 'Verified Authority' : 'Lacks Sign-Off Power'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-[#070A14]/70 border border-slate-800/80">
                  <span className="text-slate-300 flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Budget Threshold ($15k min):
                  </span>
                  <span className={`font-medium ${isBudgetQualified ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isBudgetQualified ? `Pass ($${prospect.monthlyBudget.toLocaleString()})` : 'Below Threshold'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-[#070A14]/70 border border-slate-800/80">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Buying Velocity:
                  </span>
                  <span className={`font-medium ${isTimelineQualified ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isTimelineQualified ? 'Active Intent' : 'Dormant Timeline'}
                  </span>
                </div>
              </div>

              {/* Vittoris Commercial Rule Explanation */}
              <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/40 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                  <span>Commercial Economics Rule:</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {qualificationStatus === 'QUALIFIED'
                    ? 'Pre-vetted criteria satisfied in full. Injects meeting into Account Executive calendar, triggers WhatsApp/SMS show-up protection sequence, and qualifies for performance billing upon verified attendance.'
                    : qualificationStatus === 'REVIEW'
                    ? 'Partial criteria match. The system initiates automated conversational nurturing on WhatsApp to re-verify budget or route to secondary nurturing sequences.'
                    : 'Fails contractual qualification criteria. In the Vittoris model, unvetted or disqualified leads carry zero billing cost, protecting senior closers from squandering bandwidth.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
