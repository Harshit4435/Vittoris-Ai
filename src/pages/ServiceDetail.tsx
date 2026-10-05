import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Workflow,
  Target,
  Layers,
  Cpu,
  Database,
  BarChart3
} from 'lucide-react';
import { VITTORIS_SERVICES } from '../data/vittorisData';

interface ServiceDetailProps {
  onOpenConsultation: (serviceSlug?: string) => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ onOpenConsultation }) => {
  const { slug } = useParams<{ slug: string }>();

  const serviceIndex = VITTORIS_SERVICES.findIndex((s) => s.slug === slug);
  const service = VITTORIS_SERVICES[serviceIndex];

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="pt-40 pb-20 text-center space-y-4 max-w-lg mx-auto">
        <h2 className="text-2xl font-serif font-normal text-white">Service Not Found</h2>
        <p className="text-stone-400 text-sm font-light">The requested AI service architecture does not exist.</p>
        <Link to="/services" className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black text-xs font-semibold tracking-wider uppercase">
          Return to All Services
        </Link>
      </div>
    );
  }

  const prevService = serviceIndex > 0 ? VITTORIS_SERVICES[serviceIndex - 1] : VITTORIS_SERVICES[VITTORIS_SERVICES.length - 1];
  const nextService = serviceIndex < VITTORIS_SERVICES.length - 1 ? VITTORIS_SERVICES[serviceIndex + 1] : VITTORIS_SERVICES[0];

  return (
    <div className="pt-32 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs text-stone-400 border-b border-[#C7A86D]/15 pb-4">
        <Link to="/services" className="flex items-center gap-1.5 hover:text-[#E5C788] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Explore Services</span>
        </Link>
        <span className="font-mono text-[#E5C788]">
          Service {service.number}
        </span>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#C7A86D] text-[10px] font-medium uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C788]" />
            <span>{service.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-xl text-[#C7A86D] italic font-serif leading-relaxed">
            {service.heroTagline}
          </p>

          <p className="text-sm text-stone-300 font-light leading-relaxed pt-2">
            {service.fullOverview}
          </p>
        </div>

        {/* Action Callout Box */}
        <div className="lg:col-span-4 luxury-card rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-[#C7A86D]/30 relative overflow-hidden">
          <div className="text-[10px] uppercase font-semibold text-[#C7A86D] tracking-[0.25em]">
            Commercial Deployment
          </div>

          <div className="p-3.5 rounded-xl bg-[#0E0E0E] border border-[#C7A86D]/20 text-xs text-stone-300 font-light space-y-1">
            <div className="font-medium text-[#E5C788] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C7A86D]" />
              <span>Commercial Terms:</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              {service.pricingModelNotice}
            </p>
          </div>

          <div className="text-xs text-stone-400 font-light">
            <strong className="text-stone-300 font-medium">Ideal Fit: </strong> {service.idealFor}
          </div>

          <button
            onClick={() => onOpenConsultation(service.slug)}
            className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(199,168,109,0.3)] hover:shadow-[0_4px_25px_rgba(199,168,109,0.5)] flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-black" />
            <span>Book Discovery Session</span>
          </button>
        </div>
      </div>

      {/* Architectural System Execution Blueprint Card */}
      <div className="luxury-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#C7A86D]/15">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-medium text-[#E5C788] uppercase tracking-[0.2em] mb-1">
              <Layers className="w-3.5 h-3.5 text-[#C7A86D]" /> Technical System Topology
            </div>
            <h3 className="text-xl font-serif font-normal text-white">How Information & Data Move Across This System</h3>
          </div>
          <span className="text-xs font-mono text-stone-500">Native API & Webhook Layer</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-2">
            <div className="text-[10px] font-mono uppercase text-[#E5C788] font-medium flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#C7A86D]" /> 1. Intake / Ingestion
            </div>
            <p className="text-stone-300 font-light leading-relaxed">
              Captures structured and unstructured data across forms, telephony, documents, or messaging channels.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-2">
            <div className="text-[10px] font-mono uppercase text-[#E5C788] font-medium flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#C7A86D]" /> 2. AI Processing
            </div>
            <p className="text-stone-300 font-light leading-relaxed">
              Evaluates criteria, scores buying probability, extracts document clauses, or conducts natural dialogues.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-2">
            <div className="text-[10px] font-mono uppercase text-[#E5C788] font-medium flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#C7A86D]" /> 3. System Sync
            </div>
            <p className="text-stone-300 font-light leading-relaxed">
              Synchronizes validated payloads directly into active CRM deals, calendars, and operational tables.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-2">
            <div className="text-[10px] font-mono uppercase text-[#E5C788] font-medium flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-[#C7A86D]" /> 4. Outcome Delivery
            </div>
            <p className="text-stone-300 font-light leading-relaxed">
              Produces booked sales meetings, signed proposals, or executive reporting without manual clerical lag.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works & Qualification Criteria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Operational Flow */}
        <div className="luxury-card rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-serif font-normal text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-[#C7A86D]" />
            <span>Operational Mechanics</span>
          </h2>
          <ul className="space-y-3">
            {service.howItWorks.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-300 font-light">
                <span className="w-5 h-5 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#E5C788] flex items-center justify-center text-[10px] font-mono font-medium shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Qualification Criteria or Problems Solved */}
        <div className="luxury-card rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-serif font-normal text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-[#E5C788]" />
            <span>
              {service.qualificationCriteria ? 'Contractual Qualification Standard' : 'Operational Bottlenecks Solved'}
            </span>
          </h2>

          {service.qualificationCriteria ? (
            <div className="space-y-3">
              <p className="text-xs text-stone-400 font-light">
                Defined collaboratively in writing before launch. Standard criteria verify:
              </p>
              <ul className="space-y-2">
                {service.qualificationCriteria.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-200 font-light">
                    <CheckCircle2 className="w-4 h-4 text-[#C7A86D] shrink-0 mt-0.5" />
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3.5 rounded-xl bg-[#C7A86D]/5 border border-[#C7A86D]/20 text-xs text-stone-300 font-light">
                <strong className="text-[#E5C788] font-medium">Zero Billing Cost Guarantee: </strong>
                If a prospect fails to satisfy the agreed criteria, the booking carries zero billing cost.
              </div>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {service.keyProblemsSolved.map((prob, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300 font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#C7A86D] shrink-0 mt-0.5" />
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Step by Step Workflow Sequence */}
      <div className="luxury-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D]">Execution Cadence</span>
            <h3 className="text-xl font-serif font-normal text-white mt-1">End-to-End Workflow Architecture</h3>
          </div>
          <span className="text-xs font-mono text-stone-500">{service.workflowSteps.length} Stages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {service.workflowSteps.map((ws) => (
            <div key={ws.step} className="p-4 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/15 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="w-6 h-6 rounded-full bg-[#C7A86D]/15 border border-[#C7A86D]/30 text-[#E5C788] font-mono font-medium flex items-center justify-center text-xs">
                  {ws.step}
                </span>
                {ws.tooling && <span className="text-[10px] text-stone-500 font-mono truncate">{ws.tooling}</span>}
              </div>
              <div className="text-xs font-medium text-white">{ws.title}</div>
              <p className="text-[11px] text-stone-400 font-light leading-relaxed">{ws.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Advantages Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-normal text-white">Commercial & Operational Advantages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.keyAdvantages.map((adv, idx) => (
            <div key={idx} className="p-5 rounded-2xl luxury-card space-y-2">
              <h3 className="text-sm font-serif font-normal text-[#E5C788]">{adv.title}</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Deliverables */}
      <div className="luxury-card rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-serif font-normal text-white">Included System Deliverables</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.coreDeliverables.map((del, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/15 space-y-1">
              <div className="text-xs font-medium text-white flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A86D]" />
                <span>{del.title}</span>
              </div>
              <p className="text-[11px] text-stone-400 font-light pl-5">{del.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next / Previous Service Footer Navigation */}
      <div className="pt-8 border-t border-[#C7A86D]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to={`/services/${prevService.slug}`}
          className="flex items-center gap-2 text-xs font-medium text-stone-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: {prevService.number}. {prevService.title}</span>
        </Link>

        <Link
          to={`/services/${nextService.slug}`}
          className="flex items-center gap-2 text-xs font-medium text-[#C7A86D] hover:text-[#E5C788] transition-colors"
        >
          <span>Next: {nextService.number}. {nextService.title}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
