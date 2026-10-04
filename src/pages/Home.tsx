import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  ChevronRight,
  Target,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { VITTORIS_SERVICES, VITTORIS_ENGAGEMENT_PHASES } from '../data/vittorisData';

interface HomeProps {
  onOpenConsultation: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenConsultation }) => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient lighting glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/15 via-cyan-500/10 to-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto relative z-10 space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI-Powered Growth and Automation Systems for Modern Businesses</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            Turn AI Into Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400">
              Competitive Advantage.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Vittoris combines AI-powered client acquisition, conversational setters, and custom operational infrastructure to generate qualified sales pipeline while eliminating the friction of chasing cold leads.
          </p>

          {/* CTA Group */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center justify-center gap-2 group"
            >
              <Zap className="w-4 h-4 text-cyan-200" />
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/50 text-slate-200 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>Explore All 10 Services</span>
            </Link>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Strictly Verified Decision-Makers
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Zero Cost on Unqualified Leads
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-violet-400" /> Permanent Asset Ownership
            </span>
          </div>
        </div>

        {/* Hero Architectural Pipeline Graphic */}
        <div className="mt-14 relative z-10">
          <div className="p-1 rounded-3xl bg-gradient-to-b from-blue-500/30 via-slate-800/40 to-transparent">
            <div className="bg-[#0B0F1E] border border-blue-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
              {/* Header bar of console */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <span className="text-xs font-mono font-bold text-white tracking-wider uppercase block">
                      VITTORIS AUTONOMOUS PIPELINE ARCHITECTURE
                    </span>
                    <span className="text-[11px] text-slate-400">
                      End-to-End Client Acquisition & Operational Infrastructure
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#070A14] border border-slate-800 text-xs font-mono text-cyan-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Strict Performance Alignment Model</span>
                </div>
              </div>

              {/* 4 Flow Stages */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {/* Stage 1 */}
                <div className="p-5 rounded-2xl bg-[#070A14] border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-bold">01 / Acquisition</span>
                    <Target className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Targeted Multi-Channel Inbound</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Custom high-converting landers, predictive audience modeling, and intent-driven commercial discovery.
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                    Channels: Meta, Google, Inbound Web
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="p-5 rounded-2xl bg-[#070A14] border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-blue-400 font-bold">02 / Screening</span>
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Multi-Layer AI Screening</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Strict filtration parameters verifying budget thresholds, purchase authority, project timelines, and operational fit.
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                    Criteria: 100% Pre-Vetted Sign-Off
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="p-5 rounded-2xl bg-[#070A14] border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-violet-400 font-bold">03 / Booking</span>
                    <Calendar className="w-4 h-4 text-violet-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Direct Calendar Injection</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Conversational AI setters secure the time slot and immediately inject prospect data into internal CRMs.
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                    Latency: Under 3 Minutes
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="p-5 rounded-2xl bg-[#070A14] border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 font-bold">04 / Attendance</span>
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Show-Up Protection</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Coordinated omnichannel confirmations across SMS, WhatsApp, and voice protocols that eliminate no-shows.
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                    Show-Up Rate: 85%+ Target
                  </div>
                </div>
              </div>

              {/* 4 Commercial Economics Pillars from PDF */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Zero Ad-Spend Risk
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Capital buys concrete pipeline outcomes rather than empty marketing attempts.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Locked Acquisition Costs
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Fixed per-appointment pricing enables reliable financial forecasting.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Pure Closing Focus
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Senior sales closers spend 100% of bandwidth negotiating with qualified buyers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Elastic Scale
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Meeting volume scales from dozens to hundreds without adding internal payroll.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE FRICTION & VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950/20 via-[#0B0F1E] to-slate-900/30 border border-blue-900/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-2">
              The Modern Operational Dilemma
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Across Modern Service & High-Ticket Sectors, Operations Face The Same Friction.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              We don't sell software subscriptions and walk away. We engineer and deploy autonomous systems directly tied to verifiable booked revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#070A14] border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Skyrocketing CAC & Poor Qualification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Advertising costs climb steadily while inbound leads arrive unvetted, unqualified, or without budget authority.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#070A14] border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Squandered Senior Sales Bandwidth</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Top closing talent spends dozens of hours cold-dialing gatekeepers and uneducated prospects instead of closing deals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#070A14] border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-white">High-Margin Pipeline Leaks</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deals drop out of the funnel simply because human teams cannot maintain sub-minute response times and omnichannel reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SERVICES ECOSYSTEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-2">
              Engineered Enterprise Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Complete AI-Powered Business Platform
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Vittoris is not a point tool. We deploy an integrated architecture spanning client acquisition, conversational voice & chat agents, document intelligence, and back-office automations.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wider group"
          >
            <span>View All 10 Service Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Featured Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VITTORIS_SERVICES.slice(0, 6).map((srv) => (
            <div
              key={srv.slug}
              className="bg-[#0B0F1E] border border-blue-900/30 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    Service {srv.number}
                  </span>
                  <span className="text-[11px] text-slate-500">{srv.category}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {srv.shortDesc}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {srv.keyProblemsSolved.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to={`/services/${srv.slug}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 group-hover:bg-blue-600/20 text-slate-300 group-hover:text-white border border-slate-800 group-hover:border-blue-500/40 text-xs font-semibold flex items-center justify-between transition-all"
                >
                  <span>Explore Architecture</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SPEED-TO-LEAD & APPOINTMENT TRANSFORMATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B0F1E] border border-blue-900/40 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
              Zero Lead Leakage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How The Platform Transforms a Lead Into a Qualified Appointment
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              From initial ad click or inbound inquiry to confirmed calendar slot—in under three minutes, without requiring manual sales intervention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#070A14] border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-cyan-400">01 / Instant Contact</div>
              <h3 className="text-base font-bold text-white">Sub-Minute Engagement</h3>
              <p className="text-xs text-slate-400">
                Engages the prospect on WhatsApp, SMS, or inbound phone within seconds while buying intent is highest.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#070A14] border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-blue-400">02 / Deep Screening</div>
              <h3 className="text-base font-bold text-white">Authority & Budget Check</h3>
              <p className="text-xs text-slate-400">
                Vets purchasing authority, minimum budget thresholds, and project rollout dates against contractual rules.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#070A14] border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-violet-400">03 / Direct Injection</div>
              <h3 className="text-base font-bold text-white">Calendar Synchronization</h3>
              <p className="text-xs text-slate-400">
                Locks the consultation date dynamically into your senior sales reps' calendar with CRM deal tracking.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#070A14] border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-emerald-400">04 / Attendance Protocol</div>
              <h3 className="text-base font-bold text-white">Show-Up Protection</h3>
              <p className="text-xs text-slate-400">
                Multi-channel briefing notes and automated confirmations ensure 85%+ meeting show-up rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MANUAL VS AUTOMATED OPERATIONS COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-2">
            The Automation Multiplier
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Manual Administration vs. Automated Processing
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Comparing typical manual clerical overhead with Vittoris bespoke AI operational infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Traditional Manual */}
          <div className="p-6 sm:p-8 rounded-2xl bg-rose-950/10 border border-rose-900/30 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
              <span>Traditional Manual Workflow</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>Leads sit in inbox for 4-12 hours before first contact attempt.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>Sales reps spend 60%+ of their day cold-calling unvetted form fills.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>Clerical copy-pasting across CRM, spreadsheets, and proposal docs causes errors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>No-shows average 45-50% with zero systematic reactivation sequence.</span>
              </li>
            </ul>
          </div>

          {/* Right: Vittoris AI System */}
          <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/10 border border-emerald-900/30 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <span>Vittoris AI-Powered System</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Instant Sub-Minute Response:</strong> Leads engaged within 15 seconds across WhatsApp, SMS, or voice line.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>100% Decision-Maker Focus:</strong> Reps spend all their time negotiating with pre-qualified buyers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Document Intelligence:</strong> Proposals and scopes drafted in seconds directly from intake data.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Show-Up Protection:</strong> Attendance protocols drive meeting show-up rates to 85%+.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. THE 5-PHASE IMPLEMENTATION FRAMEWORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-2">
            Methodical Implementation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Engagements Begin & Scale
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            A 5-phase engineering roadmap ensuring systems solve actual operational bottlenecks rather than burning cash on experimental tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {VITTORIS_ENGAGEMENT_PHASES.map((phase) => (
            <div
              key={phase.step}
              className="p-5 rounded-2xl bg-[#0B0F1E] border border-blue-900/30 space-y-2.5 relative flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 inline-block mb-1">
                  Phase {phase.step}
                </span>
                <h3 className="text-base font-bold text-white">{phase.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  {phase.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Deliverable:</span>
                <span className="text-blue-300 font-medium">{phase.deliverables[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#0B0F1E] to-cyan-950/40 border border-blue-900/50 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Schedule Your Diagnostic
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to Scale Your Sales Pipeline?
            </h2>
            <p className="text-sm text-slate-300">
              Review existing pipeline flow, closing metrics, and quarterly targets with our systems architect. Strictly zero-risk exploratory session.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Book a Discovery Call</span>
            </button>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm uppercase tracking-wider transition-all"
            >
              <span>Contact Systems Desk</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
