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
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 sm:pt-44 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient champagne gold glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#C7A86D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto relative z-10 space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#C7A86D] text-[10px] font-medium tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C788]" />
            <span>AI-Powered Growth and AI Services for Modern Businesses</span>
          </div>

          {/* Main Title in Playfair Display serif */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-white tracking-tight leading-[1.08]">
            Turn AI Into Your <br />
            <span className="italic text-[#C7A86D]">
              Competitive Advantage.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Vittoris combines AI-powered client acquisition, conversational setters, and custom operational infrastructure to generate qualified sales pipeline while eliminating the friction of chasing cold leads.
          </p>

          {/* CTA Group */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(199,168,109,0.3)] hover:shadow-[0_4px_25px_rgba(199,168,109,0.5)] flex items-center justify-center gap-2 group"
            >
              <Zap className="w-4 h-4 text-black" />
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#111111]/80 hover:bg-[#111111] border border-[#C7A86D]/30 hover:border-[#C7A86D] text-stone-300 hover:text-white font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <span>Explore All 10 Services</span>
            </Link>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400 font-light">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C7A86D]" /> Strictly Verified Decision-Makers
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#E5C788]" /> Zero Cost on Unqualified Leads
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#C7A86D]" /> Permanent Asset Ownership
            </span>
          </div>
        </div>

        {/* Hero Architectural Pipeline Console */}
        <div className="mt-16 relative z-10">
          <div className="luxury-card rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header bar of console */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#C7A86D]/15 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C7A86D] animate-pulse" />
                <div>
                  <span className="text-xs font-mono font-medium text-white tracking-[0.18em] uppercase block">
                    VITTORIS AUTONOMOUS PIPELINE ARCHITECTURE
                  </span>
                  <span className="text-[11px] text-stone-400 font-light">
                    End-to-End Client Acquisition & Operational Infrastructure
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/25 text-xs font-mono text-[#E5C788]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C7A86D]" />
                <span>Strict Performance Alignment Model</span>
              </div>
            </div>

            {/* 4 Flow Stages */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
              {/* Stage 1 */}
              <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#E5C788] font-medium">01 / Acquisition</span>
                  <Target className="w-4 h-4 text-[#C7A86D]" />
                </div>
                <h3 className="text-base font-serif font-normal text-white">Targeted Multi-Channel Inbound</h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Custom high-converting landers, predictive audience modeling, and intent-driven commercial discovery.
                </p>
                <div className="pt-2 border-t border-[#C7A86D]/10 text-[11px] text-stone-500 font-mono">
                  Channels: Meta, Google, Inbound Web
                </div>
              </div>

              {/* Stage 2 */}
              <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#E5C788] font-medium">02 / Screening</span>
                  <ShieldCheck className="w-4 h-4 text-[#C7A86D]" />
                </div>
                <h3 className="text-base font-serif font-normal text-white">Multi-Layer AI Screening</h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Strict filtration parameters verifying budget thresholds, purchase authority, project timelines, and operational fit.
                </p>
                <div className="pt-2 border-t border-[#C7A86D]/10 text-[11px] text-stone-500 font-mono">
                  Criteria: 100% Pre-Vetted Sign-Off
                </div>
              </div>

              {/* Stage 3 */}
              <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#E5C788] font-medium">03 / Booking</span>
                  <Calendar className="w-4 h-4 text-[#C7A86D]" />
                </div>
                <h3 className="text-base font-serif font-normal text-white">Direct Calendar Injection</h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Conversational AI setters secure the time slot and immediately inject prospect data into internal CRMs.
                </p>
                <div className="pt-2 border-t border-[#C7A86D]/10 text-[11px] text-stone-500 font-mono">
                  Latency: Under 3 Minutes
                </div>
              </div>

              {/* Stage 4 */}
              <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#E5C788] font-medium">04 / Attendance</span>
                  <MessageSquare className="w-4 h-4 text-[#C7A86D]" />
                </div>
                <h3 className="text-base font-serif font-normal text-white">Show-Up Protection</h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Coordinated omnichannel confirmations across SMS, WhatsApp, and voice protocols that eliminate no-shows.
                </p>
                <div className="pt-2 border-t border-[#C7A86D]/10 text-[11px] text-stone-500 font-mono">
                  Show-Up Rate: 85%+ Target
                </div>
              </div>
            </div>

            {/* 4 Commercial Economics Pillars from PDF */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#C7A86D]/15 relative z-10">
              <div className="p-4 rounded-xl bg-[#0E0E0E]/80 border border-[#C7A86D]/15 space-y-1">
                <span className="text-xs font-medium text-white flex items-center gap-1.5 font-serif">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A86D]" /> Zero Ad-Spend Risk
                </span>
                <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                  Capital buys concrete pipeline outcomes rather than empty marketing attempts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E0E0E]/80 border border-[#C7A86D]/15 space-y-1">
                <span className="text-xs font-medium text-white flex items-center gap-1.5 font-serif">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E5C788]" /> Locked Acquisition Costs
                </span>
                <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                  Fixed per-appointment pricing enables reliable financial forecasting.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E0E0E]/80 border border-[#C7A86D]/15 space-y-1">
                <span className="text-xs font-medium text-white flex items-center gap-1.5 font-serif">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A86D]" /> Pure Closing Focus
                </span>
                <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                  Senior sales closers spend 100% of bandwidth negotiating with qualified buyers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E0E0E]/80 border border-[#C7A86D]/15 space-y-1">
                <span className="text-xs font-medium text-white flex items-center gap-1.5 font-serif">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E5C788]" /> Elastic Scale
                </span>
                <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                  Meeting volume scales from dozens to hundreds without adding internal payroll.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE FRICTION & VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="luxury-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-10 relative z-10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D] block mb-2">
              The Modern Operational Dilemma
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white tracking-tight">
              Across Modern Service & High-Ticket Sectors, Operations Face The Same <span className="italic text-[#C7A86D]">Friction.</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-300 font-light mt-3 leading-relaxed">
              We don't sell software subscriptions and walk away. We engineer and deploy autonomous systems directly tied to verifiable booked revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-3">
              <div className="w-9 h-9 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-mono font-medium text-xs">
                01
              </div>
              <h3 className="text-lg font-serif font-normal text-white">Skyrocketing CAC & Poor Qualification</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Advertising costs climb steadily while inbound leads arrive unvetted, unqualified, or without budget authority.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#C7A86D]/15 border border-[#C7A86D]/30 text-[#E5C788] flex items-center justify-center font-mono font-medium text-xs">
                02
              </div>
              <h3 className="text-lg font-serif font-normal text-white">Squandered Senior Sales Bandwidth</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Top closing talent spends dozens of hours cold-dialing gatekeepers and uneducated prospects instead of closing deals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#C7A86D]/15 border border-[#C7A86D]/30 text-[#E5C788] flex items-center justify-center font-mono font-medium text-xs">
                03
              </div>
              <h3 className="text-lg font-serif font-normal text-white">High-Margin Pipeline Leaks</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
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
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D] block mb-2">
              Engineered Enterprise Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
              A Complete <span className="italic text-[#C7A86D]">AI-Powered</span> Business Platform
            </h2>
            <p className="text-sm text-stone-400 font-light mt-2 max-w-2xl">
              Vittoris is not a point tool. We deploy an integrated architecture spanning client acquisition, conversational voice & chat agents, document intelligence, and back-office automations.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#C7A86D] hover:text-[#E5C788] uppercase tracking-[0.18em] group transition-colors"
          >
            <span>View All 10 Service Categories</span>
            <ArrowRight className="w-4 h-4 text-[#C7A86D] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Featured Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VITTORIS_SERVICES.slice(0, 6).map((srv) => (
            <div
              key={srv.slug}
              className="luxury-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden transition-all duration-300"
            >
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#E5C788] px-3 py-1 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/25">
                    Service {srv.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">{srv.category}</span>
                </div>

                <h3 className="text-xl font-serif font-normal text-white group-hover:text-[#E5C788] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {srv.shortDesc}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-[#C7A86D]/15">
                  {srv.keyProblemsSolved.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-stone-400 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A86D] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <Link
                  to={`/services/${srv.slug}`}
                  className="w-full py-2.5 px-4 rounded-full bg-[#141414] hover:bg-[#C7A86D]/10 text-stone-300 hover:text-white border border-[#C7A86D]/20 hover:border-[#C7A86D]/50 text-xs font-medium flex items-center justify-between transition-all"
                >
                  <span className="tracking-wider uppercase text-[11px]">Explore Architecture</span>
                  <ChevronRight className="w-4 h-4 text-[#C7A86D] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SPEED-TO-LEAD & APPOINTMENT TRANSFORMATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="luxury-card rounded-3xl p-8 sm:p-12 space-y-8 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D] block mb-2">
              Zero Lead Leakage
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
              How The Platform Transforms a Lead Into a <span className="italic text-[#C7A86D]">Qualified Appointment</span>
            </h2>
            <p className="text-sm text-stone-300 font-light mt-2">
              From initial ad click or inbound inquiry to confirmed calendar slot—in under three minutes, without requiring manual sales intervention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-2">
              <div className="text-xs font-mono text-[#E5C788]">01 / Instant Contact</div>
              <h3 className="text-base font-serif font-normal text-white">Sub-Minute Engagement</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Engages the prospect on WhatsApp, SMS, or inbound phone within seconds while buying intent is highest.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-2">
              <div className="text-xs font-mono text-[#E5C788]">02 / Deep Screening</div>
              <h3 className="text-base font-serif font-normal text-white">Authority & Budget Check</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Vets purchasing authority, minimum budget thresholds, and project rollout dates against contractual rules.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-2">
              <div className="text-xs font-mono text-[#E5C788]">03 / Direct Injection</div>
              <h3 className="text-base font-serif font-normal text-white">Calendar Synchronization</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Locks the consultation date dynamically into your senior sales reps' calendar with CRM deal tracking.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#C7A86D]/20 space-y-2">
              <div className="text-xs font-mono text-[#E5C788]">04 / Attendance Protocol</div>
              <h3 className="text-base font-serif font-normal text-white">Show-Up Protection</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Multi-channel briefing notes and automated confirmations ensure 85%+ meeting show-up rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MANUAL VS AUTOMATED OPERATIONS COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D] block mb-2">
            The Automation Multiplier
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
            Manual Administration vs. <span className="italic text-[#C7A86D]">Automated Processing</span>
          </h2>
          <p className="text-sm text-stone-400 font-light mt-2">
            Comparing typical manual clerical overhead with Vittoris bespoke AI operational infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Traditional Manual */}
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-400/90 flex items-center gap-2">
              <span>Traditional Manual Workflow</span>
            </div>
            <ul className="space-y-3 text-xs text-stone-300 font-light">
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
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0E0E] border border-[#C7A86D]/30 space-y-4 shadow-[0_4px_25px_rgba(199,168,109,0.08)]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E5C788] flex items-center gap-2">
              <span>Vittoris AI-Powered System</span>
            </div>
            <ul className="space-y-3 text-xs text-stone-200 font-light">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C7A86D] shrink-0 mt-0.5" />
                <span><strong className="text-white font-medium">Instant Sub-Minute Response:</strong> Leads engaged within 15 seconds across WhatsApp, SMS, or voice line.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C7A86D] shrink-0 mt-0.5" />
                <span><strong className="text-white font-medium">100% Decision-Maker Focus:</strong> Reps spend all their time negotiating with pre-qualified buyers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C7A86D] shrink-0 mt-0.5" />
                <span><strong className="text-white font-medium">Document Intelligence:</strong> Proposals and scopes drafted in seconds directly from intake data.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C7A86D] shrink-0 mt-0.5" />
                <span><strong className="text-white font-medium">Show-Up Protection:</strong> Attendance protocols drive meeting show-up rates to 85%+.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. THE 5-PHASE IMPLEMENTATION FRAMEWORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D] block mb-2">
            Methodical Implementation
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
            How Engagements <span className="italic text-[#C7A86D]">Begin & Scale</span>
          </h2>
          <p className="text-sm text-stone-400 font-light mt-2">
            A 5-phase engineering roadmap ensuring systems solve actual operational bottlenecks rather than burning cash on experimental tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {VITTORIS_ENGAGEMENT_PHASES.map((phase) => (
            <div
              key={phase.step}
              className="luxury-card rounded-2xl p-5 space-y-2.5 relative flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs font-mono font-medium text-[#E5C788] px-2.5 py-0.5 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/25 inline-block mb-1">
                  Phase {phase.step}
                </span>
                <h3 className="text-base font-serif font-normal text-white group-hover:text-[#E5C788] transition-colors">{phase.title}</h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed mt-1">
                  {phase.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#C7A86D]/15 text-[11px] text-stone-400 font-light">
                <span className="text-stone-500 block text-[10px] uppercase font-semibold">Deliverable:</span>
                <span className="text-[#C7A86D] font-medium">{phase.deliverables[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#14120D] via-[#111111] to-[#14120D] border border-[#C7A86D]/30 text-center space-y-6 relative overflow-hidden shadow-[0_8px_30px_rgba(199,168,109,0.12)]">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D]">
              Schedule Your Diagnostic
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
              Ready to Scale Your <span className="italic text-[#C7A86D]">Sales Pipeline</span>?
            </h2>
            <p className="text-sm text-stone-300 font-light">
              Review existing pipeline flow, closing metrics, and quarterly targets with our systems architect. Strictly zero-risk exploratory session.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(199,168,109,0.3)] hover:shadow-[0_4px_25px_rgba(199,168,109,0.5)] flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-black" />
              <span>Book a Discovery Call</span>
            </button>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#111111]/80 hover:bg-[#111111] border border-[#C7A86D]/30 hover:border-[#C7A86D] text-stone-300 hover:text-white font-medium text-xs tracking-wider uppercase transition-all"
            >
              <span>Contact Systems Desk</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
