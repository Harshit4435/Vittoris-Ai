import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { VITTORIS_SERVICES } from '../data/vittorisData';
import type { Service } from '../types/vittoris';

interface ServicesProps {
  onOpenConsultation: (serviceSlug?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Client Acquisition', 'Custom AI & Infrastructure', 'Autonomous Agents', 'Operations & Growth'];

  const filteredServices = useMemo(() => {
    return VITTORIS_SERVICES.filter((srv) => {
      const matchesCategory = selectedCategory === 'All' || srv.category === selectedCategory;
      const matchesSearch =
        srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.keyProblemsSolved.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pt-32 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Editorial Luxury Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#C7A86D] text-[10px] font-medium uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C788]" />
          <span>Complete 10-Service Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
          AI Systems & <span className="italic text-[#C7A86D]">Performance Acquisition</span> Architecture
        </h1>
        <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-2xl mx-auto">
          From pay-per-appointment sales pipelines to custom document intelligence and autonomous voice agents, explore every deployment engineered by Vittoris.
        </p>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 bg-[#111111]/80 backdrop-blur-md border border-[#C7A86D]/20 rounded-2xl">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold shadow-[0_2px_15px_rgba(199,168,109,0.25)]'
                  : 'text-stone-400 hover:text-white hover:bg-white/5 font-normal'
              }`}
            >
              {cat === 'All' ? 'All 10 Services' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, CRM, voice..."
            className="w-full bg-[#0E0E0E] border border-[#C7A86D]/20 rounded-full pl-10 pr-4 py-2 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#C7A86D] transition-colors"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredServices.map((srv: Service) => (
          <div
            key={srv.slug}
            className="luxury-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden"
          >
            {/* Subtle Gold Ambient Glow on Hover */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C7A86D]/15 transition-all duration-500" />

            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-[#E5C788] px-3 py-1 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/25">
                  Service {srv.number}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-stone-500 font-medium">
                  {srv.category}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-normal text-white group-hover:text-[#E5C788] transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs font-medium text-[#C7A86D]/90 mt-1">
                  {srv.heroTagline}
                </p>
              </div>

              <p className="text-xs text-stone-300 font-light leading-relaxed">
                {srv.shortDesc}
              </p>

              {/* Problems Solved */}
              <div className="space-y-2 pt-4 border-t border-[#C7A86D]/15">
                <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                  Operational Impact:
                </div>
                {srv.keyProblemsSolved.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-300 font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A86D] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Commercial Notice */}
              <div className="p-3.5 rounded-xl bg-[#C7A86D]/5 border border-[#C7A86D]/20 text-[11px] text-stone-300 font-light">
                <strong className="text-[#E5C788] font-medium">Commercial Framework: </strong>
                {srv.pricingModelNotice}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex items-center justify-between gap-3 border-t border-[#C7A86D]/15 mt-6 relative z-10">
              <Link
                to={`/services/${srv.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C7A86D] hover:text-[#E5C788] uppercase tracking-[0.15em] transition-colors group/link"
              >
                <span>Architecture Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => onOpenConsultation(srv.slug)}
                className="px-4 py-2 rounded-full border border-[#C7A86D]/35 hover:border-[#C7A86D] hover:bg-[#C7A86D]/10 text-stone-300 hover:text-white text-xs font-medium tracking-wider uppercase transition-all shadow-sm"
              >
                Inquire Fit
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16 luxury-card rounded-3xl space-y-3">
          <p className="text-stone-400 text-sm">No services matched your search term.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C7A86D] to-[#B39355] text-black text-xs font-semibold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Discovery Bottom Callout */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14120D] via-[#111111] to-[#14120D] border border-[#C7A86D]/30 shadow-[0_8px_30px_rgba(199,168,109,0.1)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white">
            Need a <span className="italic text-[#C7A86D]">Multi-Service</span> Solution?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl">
            Vittoris architects custom multi-system deployments combining pay-per-appointment acquisition with internal AI assistants and ERP automations.
          </p>
        </div>
        <button
          onClick={() => onOpenConsultation()}
          className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(199,168,109,0.3)] hover:shadow-[0_4px_25px_rgba(199,168,109,0.5)] flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Book Architecture Review</span>
        </button>
      </div>
    </div>
  );
};
