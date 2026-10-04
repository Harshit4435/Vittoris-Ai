import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowRight, ShieldCheck, Sparkles, Zap, Globe } from 'lucide-react';
import { VittorisLogo } from '../common/VittorisLogo';
import { VITTORIS_SERVICES, VITTORIS_SOLUTIONS, COMPANY_CONTACT_DETAILS } from '../../data/vittorisData';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  return (
    <footer className="relative border-t border-blue-900/30 bg-[#06080F] text-slate-400 pt-16 pb-12 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Callout Banner */}
        <div className="mb-14 p-8 sm:p-10 rounded-2xl border border-blue-900/40 bg-gradient-to-r from-blue-950/40 via-[#0B0F1E] to-violet-950/30 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" /> Outcome-Driven Performance Architecture
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Turn AI Into Your Decisive Commercial Advantage
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Eliminate cold outreach fatigue and clerical drag. Deploy bespoke AI client acquisition engines and custom operational workflows tied directly to booked revenue.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
            >
              <span>Schedule Discovery Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/services"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Explore All 10 Services</span>
            </Link>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <VittorisLogo size="md" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Vittoris is an outcome-driven growth and automation company. We unite performance-based client acquisition with bespoke AI operational infrastructure, deploying permanent enterprise business equity rather than rented black boxes.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${COMPANY_CONTACT_DETAILS.email}`} className="hover:text-blue-400 transition-colors">
                  {COMPANY_CONTACT_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${COMPANY_CONTACT_DETAILS.secondaryEmail}`} className="hover:text-cyan-400 transition-colors">
                  {COMPANY_CONTACT_DETAILS.secondaryEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-violet-400 shrink-0" />
                <a href={`tel:${COMPANY_CONTACT_DETAILS.phone}`} className="hover:text-violet-400 transition-colors">
                  {COMPANY_CONTACT_DETAILS.phone}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strict Performance Alignment • Pre-Vetted Criteria</span>
            </div>
          </div>

          {/* Column 2: All 10 Services (Every service in PDF represented) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> All 10 AI Business Services
            </div>
            <ul className="grid grid-cols-1 gap-1.5 text-xs">
              {VITTORIS_SERVICES.map((srv) => (
                <li key={srv.slug}>
                  <Link
                    to={`/services/${srv.slug}`}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-[10px] font-mono text-slate-600 group-hover:text-cyan-400">{srv.number}.</span>
                    <span className="truncate">{srv.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solutions & Outcomes */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Business Outcomes
            </div>
            <ul className="space-y-1.5 text-xs">
              {VITTORIS_SOLUTIONS.slice(0, 6).map((sol) => (
                <li key={sol.slug}>
                  <Link
                    to="/solutions"
                    className="text-slate-400 hover:text-cyan-400 transition-colors block truncate"
                  >
                    {sol.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/solutions" className="text-blue-400 hover:text-blue-300 font-semibold text-[11px] inline-flex items-center gap-1 pt-1">
                  View all 8 outcomes <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & Architecture */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Exploration & Terms
            </div>
            <ul className="space-y-2 text-xs">

              <li>
                <Link to="/how-it-works" className="text-slate-400 hover:text-white transition-colors">
                  5-Phase Client Roadmap
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-slate-400 hover:text-white transition-colors">
                  Industry Blueprints (6 Verticals)
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  Company Philosophy & Assets
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact & Diagnostic Intake
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Commercial Integrity Notice & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} VITTORIS. All rights reserved. AI-Powered Growth and Automation Systems for Modern Businesses.
          </div>

          <div className="text-center md:text-right text-[10px] text-slate-600 max-w-xl">
            Commercial terms, pre-qualification criteria, and performance benchmarks are defined collaboratively in writing prior to deployment. Unqualified leads carry zero billing cost.
          </div>
        </div>
      </div>
    </footer>
  );
};
