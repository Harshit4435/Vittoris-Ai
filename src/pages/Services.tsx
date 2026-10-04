import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
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
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Complete 10-Service Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          AI Systems & Performance Acquisition Architecture
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          From pay-per-appointment sales pipelines to custom document intelligence and autonomous voice agents, explore every deployment engineered by Vittoris.
        </p>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 bg-[#0B0F1E] border border-blue-900/30 rounded-2xl">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat === 'All' ? 'All 10 Services' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, CRM, voice..."
            className="w-full bg-[#070A14] border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((srv: Service) => (
          <div
            key={srv.slug}
            className="bg-[#0B0F1E] border border-blue-900/30 hover:border-blue-500/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                  Service {srv.number}
                </span>
                <span className="text-xs font-medium text-slate-500">{srv.category}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs font-medium text-blue-300/80 mt-1">
                  {srv.heroTagline}
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {srv.shortDesc}
              </p>

              {/* Problems Solved */}
              <div className="space-y-1.5 pt-3 border-t border-slate-800">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                  Operational Impact:
                </div>
                {srv.keyProblemsSolved.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Commercial Notice */}
              <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/40 text-[11px] text-slate-400">
                <strong className="text-blue-300">Commercial Framework: </strong>
                {srv.pricingModelNotice}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex items-center justify-between gap-3 border-t border-slate-800/80 mt-6">
              <Link
                to={`/services/${srv.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wider group/link"
              >
                <span>Deep Dive Architecture</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => onOpenConsultation(srv.slug)}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500 text-xs font-semibold transition-all shadow-sm"
              >
                Inquire Fit
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16 bg-[#0B0F1E] border border-slate-800 rounded-2xl space-y-3">
          <p className="text-slate-400 text-sm">No services matched your search term.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Discovery Bottom Callout */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0B0F1E] to-cyan-950/30 border border-blue-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white">Need a Multi-Service Solution?</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Vittoris architects custom multi-system deployments combining pay-per-appointment acquisition with internal AI assistants and ERP automations.
          </p>
        </div>
        <button
          onClick={() => onOpenConsultation()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 shrink-0"
        >
          <Zap className="w-4 h-4" />
          <span>Book Architecture Review</span>
        </button>
      </div>
    </div>
  );
};
