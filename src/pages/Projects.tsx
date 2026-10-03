import React, { useState } from 'react';
import { Search, Zap, Calendar, ShieldCheck, Mail, Phone } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Reveal } from '../components/common/Reveal';
import { projectsData } from '../data/projectsData';
import { ownersData } from '../data/ownersData';
import type { SolarOwner, SolarProject } from '../types/solar';

interface ProjectsProps {
  onOpenConsultation: (owner?: SolarOwner, project?: SolarProject) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenConsultation }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projectsData.filter(project => {
    const matchesFilter =
      activeFilter === 'All'
        ? true
        : activeFilter === 'Monocrystalline'
        ? project.type.includes('Monocrystalline')
        : activeFilter === 'BIPV Glass'
        ? project.type.includes('BIPV')
        : activeFilter === 'Bifacial'
        ? project.type.includes('Bifacial')
        : activeFilter === 'Commercial'
        ? project.type.includes('Commercial')
        : activeFilter === 'Roof Shingles'
        ? project.type.includes('Shingles')
        : true;

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.panelTechnology.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.idealFor ? project.idealFor.toLowerCase().includes(searchQuery.toLowerCase()) : false);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-28">
      <PageHeader
        badge="SOLAR PANEL SHOWCASE"
        subtitle="PHOTO SHOWCASE & TECHNOLOGY SPECIFICATIONS"
        title="Types of Solar Panels."
        description="Explore leading solar panel categories—including Monocrystalline TOPCon cells, Building-Integrated Photovoltaic Glass (BIPV), Bifacial dual-glass arrays, commercial rooftop systems, and architectural solar shingles. Connect directly with the team of Udayveer Singh to evaluate the best fit for your property."
      />

      {/* Verified Asset Owner Spotlight Banner Over the Showcase */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-10">
        <Reveal direction="up" delay={0.1}>
          <div
            className="p-6 md:p-8 rounded-2xl border bg-gradient-to-r from-black/80 via-[#1b082e]/40 to-black/80 backdrop-blur-md shadow-2xl relative overflow-hidden"
            style={{ borderColor: 'var(--border-card)' }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Owner Info & Avatar */}
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#A855F7] to-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                    <img
                      src={ownersData[0].avatar}
                      alt={ownersData[0].name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#D4AF37] text-black p-1 rounded-full shadow-md">
                    <ShieldCheck size={12} />
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                    <h2 className="text-xl md:text-2xl font-serif text-white font-normal">
                      {ownersData[0].name}
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold tracking-wider uppercase">
                      Solar Asset Owner
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/10 font-mono">
                      {ownersData[0].role}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 max-w-2xl font-light leading-relaxed mb-3">
                    Curator and principal representative for these photovoltaic systems. Connect directly for solar panel technology consultation, architectural integration, and commercial rooftop feasibility.
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs">
                    <a
                      href="tel:+919015920523"
                      className="font-mono text-[#D4AF37] font-semibold hover:underline flex items-center gap-1.5 bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30"
                    >
                      <Phone size={12} />
                      <span>+91 90159 20523</span>
                    </a>
                    <a
                      href={`mailto:${ownersData[0].email}`}
                      className="text-white/90 hover:text-[#D4AF37] flex items-center gap-1.5 font-medium"
                    >
                      <Mail size={12} className="text-[#D4AF37]" />
                      <span>{ownersData[0].email}</span>
                    </a>
                    <a
                      href={`mailto:${ownersData[0].secondaryEmail}`}
                      className="text-white/60 hover:text-white flex items-center gap-1.5"
                    >
                      <Mail size={12} />
                      <span>{ownersData[0].secondaryEmail}</span>
                    </a>
                    <span className="text-white/40">• {ownersData[0].location}</span>
                  </div>
                </div>
              </div>

              {/* Consultation trigger */}
              <div className="shrink-0 w-full sm:w-auto">
                <Button
                  variant="gold"
                  size="md"
                  fullWidth
                  onClick={() => onOpenConsultation(ownersData[0])}
                  icon={<Calendar size={14} />}
                >
                  Consult with {ownersData[0].name.split(' ')[0]}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-8 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b pb-8" style={{ borderColor: 'var(--border-divider)' }}>
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Monocrystalline', 'BIPV Glass', 'Bifacial', 'Commercial', 'Roof Shingles'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`text-xs tracking-[0.2em] uppercase py-2 px-4 rounded-full border transition-all ${
                  activeFilter === tab
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37] font-semibold'
                    : 'border-white/10 text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by panel type, technology..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-[11px] tracking-wider text-white/50 my-6">
          Showing {filteredProjects.length} Solar Panel Technologies
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} direction="up" delay={0.08 * idx}>
              <Card className="group flex flex-col h-full">
                {/* Visual */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Panel Type Badge */}
                  <div className="absolute top-4 left-4 bg-black/75 border border-white/15 backdrop-blur-md px-3 py-1 rounded text-[10px] tracking-widest text-[#D4AF37] uppercase font-semibold">
                    {project.type}
                  </div>

                  {/* Owner Overlay Badge Directly Over The Image */}
                  <div className="absolute top-4 right-4 bg-black/80 border border-white/20 backdrop-blur-md pl-1.5 pr-3 py-1 rounded-full flex items-center gap-1.5 z-10 shadow-lg">
                    <img
                      src={project.owner.avatar}
                      alt={project.owner.name}
                      className="w-5 h-5 rounded-full object-cover border border-[#D4AF37]"
                    />
                    <span className="text-[10px] text-white/90 font-medium">Owner: {project.owner.name}</span>
                  </div>

                  {/* Efficiency */}
                  {project.efficiency && (
                    <div className="absolute bottom-4 left-4 bg-[#D4AF37] text-black px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider">
                      {project.efficiency}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    {project.idealFor && (
                      <div className="text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-semibold mb-2">
                        {project.idealFor}
                      </div>
                    )}

                    <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-[#D4AF37] transition-colors mb-3">
                      {project.title}
                    </h3>

                    <p className="text-xs font-light line-clamp-3 leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                      {project.description}
                    </p>

                    <div className="p-4 rounded-lg border text-[11px] space-y-2 mb-6" style={{ backgroundColor: 'var(--bg-section-muted)', borderColor: 'var(--border-card)' }}>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider block text-white/40">Module Technology</span>
                        <span className="font-medium text-white">{project.panelTechnology}</span>
                      </div>
                      <div className="pt-1.5 border-t border-white/5 flex justify-between">
                        <span style={{ color: 'var(--text-muted)' }}>Certification:</span>
                        <span className="text-white/80">{project.certification || 'Tier-1 Certified'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Owner Detail Box */}
                  <div className="py-2.5 px-3 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={project.owner.avatar}
                        alt={project.owner.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#D4AF37]"
                      />
                      <div className="text-left leading-tight">
                        <span className="text-[9px] uppercase tracking-wider text-white/40 block">Asset Owner</span>
                        <span className="text-xs text-white font-medium">{project.owner.name}</span>
                        <span className="text-[10px] text-[#D4AF37] block font-mono">Founder • Vittoris</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="tel:+919015920523"
                        className="text-[11px] text-white/90 hover:text-[#D4AF37] flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10"
                        title="Call 9015920523"
                      >
                        <Phone size={11} className="text-[#D4AF37]" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`mailto:${project.owner.email}`}
                        className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1 bg-[#D4AF37]/10 px-2 py-1 rounded border border-[#D4AF37]/20"
                        title="Direct Founder Email"
                      >
                        <Mail size={11} />
                        <span>Email</span>
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                    <Button
                      variant="gold"
                      size="sm"
                      fullWidth
                      onClick={() => onOpenConsultation(project.owner, project)}
                      icon={<Calendar size={13} />}
                    >
                      Consult with Owner on this Panel
                    </Button>
                    <a
                      href={`https://wa.me/919015920523?text=${encodeURIComponent(`Hi Udayveer, I would like to consult regarding the ${project.title} solar panels.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-[#10B981]/15 hover:bg-[#10B981]/25 border border-[#10B981]/30 text-[#10B981] font-semibold text-xs transition-colors shrink-0 flex items-center gap-1"
                      title="WhatsApp Udayveer"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border rounded-xl" style={{ borderColor: 'var(--border-divider)' }}>
            <Zap size={36} className="text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">No matching solar projects found</h3>
            <p className="text-xs max-w-sm mx-auto mb-6" style={{ color: 'var(--text-muted)' }}>
              Try adjusting your search criteria or filter tags to discover other estate installations.
            </p>
            <Button variant="gold" onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
