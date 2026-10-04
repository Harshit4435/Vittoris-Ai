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
        <h2 className="text-2xl font-bold text-white">Service Not Found</h2>
        <p className="text-slate-400 text-sm">The requested AI service architecture does not exist.</p>
        <Link to="/services" className="inline-block px-6 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold">
          Return to All Services
        </Link>
      </div>
    );
  }

  const prevService = serviceIndex > 0 ? VITTORIS_SERVICES[serviceIndex - 1] : VITTORIS_SERVICES[VITTORIS_SERVICES.length - 1];
  const nextService = serviceIndex < VITTORIS_SERVICES.length - 1 ? VITTORIS_SERVICES[serviceIndex + 1] : VITTORIS_SERVICES[0];

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-4">
        <Link to="/services" className="flex items-center gap-1.5 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All 10 Services</span>
        </Link>
        <span className="font-mono text-cyan-400">
          Service {service.number} of 10
        </span>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{service.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-xl text-cyan-300 font-light leading-relaxed">
            {service.heroTagline}
          </p>

          <p className="text-sm text-slate-300 leading-relaxed pt-2">
            {service.fullOverview}
          </p>
        </div>

        {/* Action Callout Box */}
        <div className="lg:col-span-4 bg-[#0B0F1E] border border-blue-900/40 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            Commercial Deployment
          </div>

          <div className="p-3.5 rounded-xl bg-[#070A14] border border-slate-800 text-xs text-slate-300 space-y-1">
            <div className="font-semibold text-blue-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Commercial Terms:</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {service.pricingModelNotice}
            </p>
          </div>

          <div className="text-xs text-slate-400">
            <strong>Ideal Fit: </strong> {service.idealFor}
          </div>

          <button
            onClick={() => onOpenConsultation(service.slug)}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Book Discovery Session</span>
          </button>
        </div>
      </div>

      {/* Architectural System Execution Blueprint Card */}
      <div className="bg-[#0B0F1E] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" /> Technical System Topology
            </div>
            <h3 className="text-lg font-bold text-white">How Information & Data Move Across This System</h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Native API & Webhook Layer</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#070A14] border border-slate-800 space-y-2">
            <div className="text-[10px] font-mono uppercase text-blue-400 font-bold flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" /> 1. Intake / Ingestion
            </div>
            <p className="text-slate-300">
              Captures structured and unstructured data across forms, telephony, documents, or messaging channels.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#070A14] border border-slate-800 space-y-2">
            <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> 2. AI Processing
            </div>
            <p className="text-slate-300">
              Evaluates criteria, scores buying probability, extracts document clauses, or conducts natural dialogues.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#070A14] border border-slate-800 space-y-2">
            <div className="text-[10px] font-mono uppercase text-violet-400 font-bold flex items-center gap-1">
              <Database className="w-3.5 h-3.5" /> 3. System Sync
            </div>
            <p className="text-slate-300">
              Synchronizes validated payloads directly into active CRM deals, calendars, and operational tables.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#070A14] border border-slate-800 space-y-2">
            <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5" /> 4. Outcome Delivery
            </div>
            <p className="text-slate-300">
              Produces booked sales meetings, signed proposals, or executive reporting without manual clerical lag.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works & Qualification Criteria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Operational Flow */}
        <div className="bg-[#0B0F1E] border border-blue-900/30 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-blue-400" />
            <span>Operational Mechanics</span>
          </h2>
          <ul className="space-y-3">
            {service.howItWorks.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Qualification Criteria or Problems Solved */}
        <div className="bg-[#0B0F1E] border border-blue-900/30 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <span>
              {service.qualificationCriteria ? 'Contractual Qualification Standard' : 'Operational Bottlenecks Solved'}
            </span>
          </h2>

          {service.qualificationCriteria ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Defined collaboratively in writing before launch. Standard criteria verify:
              </p>
              <ul className="space-y-2">
                {service.qualificationCriteria.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300">
                <strong>Zero Billing Cost Guarantee:</strong> If a prospect fails to satisfy the agreed criteria, the booking carries zero billing cost.
              </div>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {service.keyProblemsSolved.map((prob, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Step by Step Workflow Sequence */}
      <div className="bg-[#0B0F1E] border border-blue-900/30 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Execution Cadence</span>
            <h3 className="text-xl font-bold text-white mt-1">End-to-End Workflow Architecture</h3>
          </div>
          <span className="text-xs font-mono text-slate-500">{service.workflowSteps.length} Stages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {service.workflowSteps.map((ws) => (
            <div key={ws.step} className="p-4 rounded-xl bg-[#070A14] border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="w-6 h-6 rounded-md bg-blue-600/30 text-blue-400 font-mono font-bold flex items-center justify-center text-xs">
                  {ws.step}
                </span>
                {ws.tooling && <span className="text-[10px] text-slate-500 font-mono truncate">{ws.tooling}</span>}
              </div>
              <div className="text-xs font-bold text-white">{ws.title}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{ws.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Advantages Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Commercial & Operational Advantages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.keyAdvantages.map((adv, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#0B0F1E] border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white text-blue-300">{adv.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Deliverables */}
      <div className="bg-[#0B0F1E] border border-blue-900/30 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-white">Included System Deliverables</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.coreDeliverables.map((del, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#070A14] border border-slate-800/80 space-y-1">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{del.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-5">{del.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next / Previous Service Footer Navigation */}
      <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to={`/services/${prevService.slug}`}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: {prevService.number}. {prevService.title}</span>
        </Link>

        <Link
          to={`/services/${nextService.slug}`}
          className="flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>Next: {nextService.number}. {nextService.title}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
