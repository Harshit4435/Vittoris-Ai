import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Zap, 
  Calendar, 
  Download, 
  ArrowLeft,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Reveal } from '../components/common/Reveal';
import { BrochureModal } from '../components/modals/BrochureModal';
import { projectsData } from '../data/projectsData';
import type { SolarOwner, SolarProject } from '../types/solar';

interface ProjectDetailProps {
  onOpenConsultation: (owner?: SolarOwner, project?: SolarProject) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ onOpenConsultation }) => {
  const { id } = useParams<{ id: string }>();
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const project = projectsData.find(p => p.id === id) || projectsData[0];

  return (
    <div className="min-h-screen pb-32">
      {/* 1. HERO BANNER */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover filter brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-transparent to-black/60" />

        {/* Back Link */}
        <div className="absolute top-28 left-6 lg:left-16 z-20">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/70 hover:text-[#D4AF37] transition-colors py-2 px-4 rounded-full bg-black/40 border border-white/10 backdrop-blur-md"
          >
            <ArrowLeft size={14} />
            <span>Back to Solar Panels</span>
          </Link>
        </div>

        {/* Owner Detail Badge Over Hero */}
        <div className="absolute top-28 right-6 lg:right-16 z-20 flex items-center gap-2.5 py-2 px-4 rounded-full bg-black/50 border border-white/15 backdrop-blur-md">
          <img
            src={project.owner.avatar}
            alt={project.owner.name}
            className="w-6 h-6 rounded-full object-cover border border-[#D4AF37]"
          />
          <span className="text-xs text-white font-light">
            Asset Owner: <strong className="text-[#D4AF37] font-medium">{project.owner.name}</strong> • {project.owner.company}
          </span>
        </div>
      </div>

      {/* 2. FLOATING STATS SUMMARY PANEL (Matching Prapti Buildcon -mt-20 card) */}
      <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20">
        <Reveal direction="up" delay={0.1}>
          <div
            className="p-8 md:p-12 rounded-2xl border shadow-2xl backdrop-blur-xl mb-12"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)'
            }}
          >
            {/* Owner Pre-header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 mb-4">
              <img
                src={project.owner.avatar}
                alt={project.owner.name}
                className="w-4 h-4 rounded-full object-cover border border-[#D4AF37]"
              />
              <span>Technology Curated & Owned by <strong className="text-[#D4AF37]">{project.owner.name}</strong> ({project.owner.role})</span>
            </div>

            {/* Title & Top Action */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b" style={{ borderColor: 'var(--border-divider)' }}>
              <div>
                <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-2">
                  <MapPin size={14} />
                  <span>{project.type} • {project.location}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-serif text-white font-normal">
                  {project.title}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="gold"
                  onClick={() => setIsBrochureOpen(true)}
                  icon={<Download size={15} />}
                >
                  Download Technical Blueprint
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onOpenConsultation(project.owner, project)}
                  icon={<Calendar size={15} />}
                >
                  Consult with Owner
                </Button>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b" style={{ borderColor: 'var(--border-divider)' }}>
              <div>
                <span className="text-[10px] tracking-wider text-white/50 uppercase block mb-1">
                  SYSTEM CAPACITY
                </span>
                <span className="text-2xl font-serif text-[#D4AF37] font-semibold">
                  {project.capacityKWp} <span className="text-xs font-sans text-white/70">kWp</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] tracking-wider text-white/50 uppercase block mb-1">
                  ANNUAL YIELD
                </span>
                <span className="text-2xl font-serif text-white font-semibold">
                  {project.annualGenerationMWh} <span className="text-xs font-sans text-white/70">MWh / yr</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] tracking-wider text-white/50 uppercase block mb-1">
                  CO₂ ELIMINATED
                </span>
                <span className="text-2xl font-serif text-[#10B981] font-semibold">
                  {project.carbonOffsetTons} <span className="text-xs font-sans text-white/70">Tons</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] tracking-wider text-white/50 uppercase block mb-1">
                  PROJECT STATUS
                </span>
                <span className="inline-block mt-1 px-3 py-1 text-xs rounded border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] font-semibold uppercase tracking-wider">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Narrative Description */}
            <p className="text-sm md:text-base font-light leading-relaxed pt-8" style={{ color: 'var(--text-muted)' }}>
              {project.description}
            </p>
          </div>
        </Reveal>

        {/* 3. TECHNICAL SPECIFICATIONS & HIGHLIGHTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Left: Engineering Specifications */}
          <Reveal direction="left" delay={0.2}>
            <Card className="p-8 h-full">
              <h3 className="text-xl font-serif text-white mb-6 pb-3 border-b flex items-center gap-2" style={{ borderColor: 'var(--border-divider)' }}>
                <Zap size={18} className="text-[#D4AF37]" />
                <span>Engineering & Electrical Matrix</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-white/50 block text-[10px] uppercase tracking-wider">Photovoltaic Modules</span>
                  <p className="text-white font-medium mt-0.5">{project.panelTechnology}</p>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px] uppercase tracking-wider">Inverter & Battery Architecture</span>
                  <p className="text-white font-medium mt-0.5">{project.inverterBattery}</p>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px] uppercase tracking-wider">Compliance & Certifications</span>
                  <p className="text-white font-medium mt-0.5">{project.certification}</p>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px] uppercase tracking-wider">Estimated Payback Period</span>
                  <p className="text-[#10B981] font-semibold mt-0.5">~{project.roiPaybackYears} Years (Based on regional high-tension / domestic tariff)</p>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* Right: Structural Highlights */}
          <Reveal direction="right" delay={0.2}>
            <Card className="p-8 h-full">
              <h3 className="text-xl font-serif text-white mb-6 pb-3 border-b flex items-center gap-2" style={{ borderColor: 'var(--border-divider)' }}>
                <ShieldCheck size={18} className="text-[#D4AF37]" />
                <span>Structural & Microgrid Capabilities</span>
              </h3>

              <ul className="space-y-3.5 text-xs">
                {project.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-white/80 font-light leading-relaxed">{spec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>

        {/* 4. VERIFIED OWNER & LEAD ENGINEER SPOTLIGHT CARD */}
        <Reveal direction="up" delay={0.3}>
          <div className="p-8 md:p-12 rounded-2xl border mb-16" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Owner avatar & info */}
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
                <img
                  src={project.owner.avatar}
                  alt={project.owner.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#D4AF37]"
                />
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <h3 className="text-2xl font-serif text-white">{project.owner.name}</h3>
                    {project.owner.verified && (
                      <span className="inline-flex items-center text-[10px] text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                        <ShieldCheck size={12} className="mr-1" /> Verified Owner
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#D4AF37] font-semibold tracking-widest uppercase mb-2">
                    {project.owner.role} • {project.owner.company}
                  </div>
                  <p className="text-xs max-w-lg leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                    {project.owner.bio}
                  </p>
                </div>
              </div>

              {/* Action Column */}
              <div className="shrink-0 flex flex-col items-center lg:items-end gap-3 w-full sm:w-auto">
                <div className="text-xs text-white/60 mb-1">
                  Status: <span className="text-[#D4AF37] font-semibold">Available for Advisory</span> • {project.owner.availability}
                </div>
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <a
                    href="tel:+919015920523"
                    className="flex-1 sm:flex-initial py-2 px-3 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone size={13} />
                    <span>+91 90159 20523</span>
                  </a>
                  <a
                    href={`https://wa.me/919015920523?text=${encodeURIComponent(`Hi Udayveer, I am interested in consulting regarding the ${project.title} solar panels.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-lg bg-[#10B981]/15 hover:bg-[#10B981]/25 border border-[#10B981]/30 text-[#10B981] font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:info@vittoris.com?subject=${encodeURIComponent(`Consultation: ${project.title}`)}`}
                    className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Mail size={13} />
                    <span>Email</span>
                  </a>
                </div>
                <Button
                  variant="gold"
                  size="md"
                  fullWidth
                  onClick={() => onOpenConsultation(project.owner, project)}
                  icon={<Calendar size={14} />}
                >
                  Consult with {project.owner.name.split(' ')[0]}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 5. IMAGE GALLERY */}
        <div className="mb-20">
          <h3 className="text-2xl font-serif text-white mb-6">Installation Visuals & Aerial Views</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery.map((imgUrl, idx) => (
              <div key={idx} className="relative aspect-[16/11] rounded-xl overflow-hidden border border-white/10 group">
                <img
                  src={imgUrl}
                  alt={`${project.title} visual ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brochure Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        projectTitle={project.title}
      />
    </div>
  );
};
