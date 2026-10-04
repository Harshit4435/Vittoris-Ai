import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { VittorisLogo } from '../common/VittorisLogo';
import { VITTORIS_SERVICES, VITTORIS_SOLUTIONS, COMPANY_CONTACT_DETAILS } from '../../data/vittorisData';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  return (
    <footer className="relative border-t border-[#C7A86D]/15 bg-[#0B0B0B] text-slate-400 pt-16 pb-12 overflow-hidden">
      {/* Background subtle gold glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Callout Banner */}
        <div className="mb-14 p-8 sm:p-12 rounded-3xl border border-[#C7A86D]/25 bg-gradient-to-r from-[#141414] via-[#0F0F0F] to-[#141414] backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl text-center lg:text-left space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C7A86D] font-semibold block">
              Outcome-Driven Commercial Architecture
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
              Turn AI Into Your Decisive Commercial Advantage
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Eliminate cold outreach fatigue and clerical drag. Deploy bespoke AI client acquisition engines and custom operational workflows tied directly to booked revenue.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-[#C7A86D]/20 hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/services"
              className="px-6 py-3.5 rounded-full bg-transparent hover:bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-white hover:text-[#C7A86D] text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C7A86D]" />
              <span>Explore All 10 Services</span>
            </Link>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <VittorisLogo size="md" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-light">
              Vittoris is an outcome-driven growth and AI services company. We unite performance-based client acquisition with bespoke AI operational infrastructure, deploying permanent enterprise business equity rather than rented black boxes.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#C7A86D] shrink-0" />
                <span className="text-slate-400">Company:</span>
                <a href={`mailto:${COMPANY_CONTACT_DETAILS.companyEmail}`} className="hover:text-[#C7A86D] transition-colors">
                  {COMPANY_CONTACT_DETAILS.companyEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#C7A86D] shrink-0" />
                <span className="text-slate-400">Owner:</span>
                <a href={`mailto:${COMPANY_CONTACT_DETAILS.ownerEmail}`} className="hover:text-[#C7A86D] transition-colors">
                  {COMPANY_CONTACT_DETAILS.ownerEmail}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[10px] text-slate-500 tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C7A86D]" />
              <span>Performance Aligned • Written Qualification Standards</span>
            </div>
          </div>

          {/* Column 2: All 10 Services */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-serif font-bold text-[#C7A86D] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7A86D]" /> All 10 AI Services
            </div>
            <ul className="grid grid-cols-1 gap-1.5 text-xs">
              {VITTORIS_SERVICES.map((srv) => (
                <li key={srv.slug}>
                  <Link
                    to={`/services/${srv.slug}`}
                    className="text-slate-400 hover:text-[#C7A86D] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-[10px] font-mono text-[#C7A86D]/60 group-hover:text-[#C7A86D]">{srv.number}.</span>
                    <span className="truncate">{srv.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solutions & Outcomes */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-serif font-bold text-[#C7A86D] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7A86D]" /> Outcomes
            </div>
            <ul className="space-y-1.5 text-xs">
              {VITTORIS_SOLUTIONS.slice(0, 6).map((sol) => (
                <li key={sol.slug}>
                  <Link
                    to="/solutions"
                    className="text-slate-400 hover:text-[#C7A86D] transition-colors block truncate"
                  >
                    {sol.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/solutions" className="text-[#C7A86D] hover:text-[#E5C788] text-[11px] uppercase tracking-wider font-semibold inline-flex items-center gap-1 pt-1">
                  View All 8 Outcomes <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & Architecture */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-serif font-bold text-[#C7A86D] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7A86D]" /> Architecture
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/how-it-works" className="text-slate-400 hover:text-[#C7A86D] transition-colors">
                  5-Phase Client Roadmap
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-slate-400 hover:text-[#C7A86D] transition-colors">
                  Industry Blueprints (6 Verticals)
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-[#C7A86D] transition-colors">
                  Company Philosophy & Assets
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-[#C7A86D] transition-colors">
                  Contact & Diagnostic Intake
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Commercial Integrity Notice & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-light">
          <div>
            © {new Date().getFullYear()} VITTORIS. All rights reserved. AI-Powered Growth and AI Services.
          </div>

          <div className="text-center md:text-right text-[10px] text-slate-500 max-w-xl">
            Commercial terms, pre-qualification criteria, and performance benchmarks are defined collaboratively in writing prior to deployment. Unqualified leads carry zero billing cost.
          </div>
        </div>
      </div>
    </footer>
  );
};
