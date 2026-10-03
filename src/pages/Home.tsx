import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Calendar, 
  MapPin,
  Mail,
  Phone,
  Bot,
  FileText,
  Zap,
  TrendingUp,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Cpu
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Reveal } from '../components/common/Reveal';
import { VittorisIcon } from '../components/common/VittorisLogo';
import { TelemetryStats } from '../components/solar/TelemetryStats';
import { projectsData } from '../data/projectsData';
import { ownersData } from '../data/ownersData';
import type { SolarProject, SolarOwner } from '../types/solar';

interface HomeProps {
  onOpenConsultation: (owner?: SolarOwner, project?: SolarProject) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenConsultation }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filteredProjects = projectsData.filter(project => {
    if (filterCategory === 'All') return true;
    if (filterCategory === 'Monocrystalline') return project.type.includes('Monocrystalline');
    if (filterCategory === 'BIPV Glass') return project.type.includes('BIPV');
    if (filterCategory === 'Bifacial') return project.type.includes('Bifacial');
    if (filterCategory === 'Commercial') return project.type.includes('Commercial');
    if (filterCategory === 'Roof Shingles') return project.type.includes('Shingles');
    return true;
  });

  const aiCapabilities = [
    {
      icon: <TrendingUp className="text-[#D4AF37]" size={22} />,
      title: 'Pay-Per-Appointment Solar Acquisition',
      subtitle: 'Verified Decision-Maker Pipeline',
      description: 'A pure performance acquisition engine delivering vetted commercial rooftop owners and industrial decision-makers directly to project schedules. Zero ad-spend risk—pricing applies strictly to confirmed, qualified consultations.'
    },
    {
      icon: <FileText className="text-[#A855F7]" size={22} />,
      title: 'Automated Solar Document Intelligence',
      subtitle: 'Instant Scope & Proposal Generation',
      description: 'Proprietary AI systems that instantly extract property dimensions, historical grid tariffs, and engineering quotes to draft client-ready solar proposals, ROI forecasts, and PPA contracts in seconds.'
    },
    {
      icon: <Bot className="text-[#10B981]" size={22} />,
      title: '24/7 Conversational AI & WhatsApp Bots',
      subtitle: 'Sub-Minute Lead Qualification',
      description: 'Dynamic conversational agents embedded across Web and WhatsApp. Vets prospect roof area, structural fit, and power consumption within natural, context-aware dialogues and synchronizes calendar bookings 24/7.'
    },
    {
      icon: <Headphones className="text-[#38BDF8]" size={22} />,
      title: 'Human-Grade AI Voice Agents',
      subtitle: 'Zero-Latency Inbound & Outbound Calling',
      description: 'Inbound answering with zero unanswered lines, database reactivation for legacy commercial inquiries, and proactive quote follow-up sequences that accelerate contract closures without staffing a call center.'
    },
    {
      icon: <Zap className="text-[#F59E0B]" size={22} />,
      title: 'Autonomous Solar Appointment Setters',
      subtitle: 'Speed-to-Lead in Seconds',
      description: 'Multi-channel booking pipeline designed to take raw property inquiries across forms and ads and turn them into confirmed on-site or virtual audits within seconds via automated SMS, WhatsApp, and call workflows.'
    },
    {
      icon: <Cpu className="text-[#EC4899]" size={22} />,
      title: 'End-to-End Business Process Automation',
      subtitle: 'Frictionless Milestone Tracking',
      description: 'Deep architectural integrations connecting CRM pipelines, automated contract generation, DISCOM grid interconnect tracking, and milestone notifications directly to leadership channels.'
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Visual with luxury dark gradient overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Architectural Solar Estate"
            className="w-full h-full object-cover scale-105 filter brightness-[0.45] contrast-[1.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/60 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08090A_95%)] pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center flex flex-col items-center py-24">
          <Reveal direction="down" delay={0.2}>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#A855F7]/40 bg-[#3B0764]/40 mb-8 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.25)]">
              <VittorisIcon size={24} />
              <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#E9D5FF] font-bold">
                AI VITTORIS • ENTERING CLEAN ENERGY & SOLAR ARCHITECTURE
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white font-normal mb-8 leading-[1.12] tracking-tight max-w-5xl">
              Outcome-Driven AI Systems.{' '}
              <br />
              <span className="italic font-light text-[#D4AF37] gold-gradient-text">
                Now Powering Solar Energy.
              </span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <div className="w-28 h-[1px] bg-[#D4AF37] origin-center mb-8 shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
          </Reveal>

          <Reveal direction="up" delay={0.5}>
            <p className="text-sm md:text-base lg:text-lg text-white/80 font-light max-w-2xl leading-relaxed mb-6">
              Vittoris unites enterprise-grade AI automation, automated feasibility pipelines, and 24/7 intelligent screening to provide unmatched visibility for modern solar panel installations. Connect directly with founder <strong className="text-white font-medium">Udayveer Singh</strong> for clean power solutions.
            </p>
          </Reveal>

          {/* Direct CTA Buttons */}
          <Reveal direction="up" delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="mailto:info@vittoris.com?subject=Solar%20Panel%20%26%20Clean%20Energy%20Inquiry%20-%20Vittoris"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 hover:border-[#D4AF37] text-white transition-all text-xs font-semibold font-mono tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              >
                <Mail size={15} className="text-[#D4AF37]" />
                <span>info@vittoris.com</span>
              </a>

              <Button
                variant="gold"
                size="lg"
                onClick={() => onOpenConsultation(ownersData[0])}
                icon={<Calendar size={16} />}
              >
                Schedule Solar Consultation
              </Button>

              <a
                href="#ai-systems"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all text-xs font-medium uppercase tracking-wider"
              >
                <Cpu size={14} className="text-[#A855F7]" />
                <span>Our AI Architecture</span>
              </a>
            </div>
          </Reveal>

          {/* Quick Direct Founder Hotline & WhatsApp */}
          <Reveal direction="up" delay={0.7}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
              <a
                href="tel:+919015920523"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/15 text-white/90 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors font-mono"
              >
                <Phone size={13} className="text-[#D4AF37]" />
                <span>Call Owner: +91 90159 20523</span>
              </a>
              <a
                href="https://wa.me/919015920523?text=Hi%20Udayveer%2C%20I%20would%20like%20to%20consult%20regarding%20solar%20panels."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] hover:bg-[#10B981]/25 transition-colors font-medium"
              >
                <span>WhatsApp Owner Directly →</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. TELEMETRY NUMERICAL COUNTER STATS */}
      <TelemetryStats />

      {/* 3. HERITAGE & VISION (AI + Solar Convergence) */}
      <section className="relative py-24 lg:py-36 px-6 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Large Visual */}
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
              alt="Architectural Solar Glass Integration"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            
            {/* Overlay spec badge */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl border border-white/15 bg-black/60 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#D4AF37] font-semibold tracking-widest uppercase text-[10px]">
                  Bespoke Architectural Engineering
                </span>
                <span className="text-white/60">Tier-1 Certified</span>
              </div>
              <p className="text-xs text-white/80 font-light">
                Zero visible cabling, high-efficiency black cell matrix, and non-penetrative architectural mounts.
              </p>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal direction="up" delay={0.1}>
              <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4 font-semibold">
                OUR PHILOSOPHY & CAPABILITIES
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-serif text-white font-normal leading-tight mb-6">
                Where AI Automation Meets Clean Energy Excellence.
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="text-sm md:text-base leading-relaxed font-light mb-6" style={{ color: 'var(--text-muted)' }}>
                Traditional solar installations often suffer from slow manual feasibility reviews, clerical quoting delays, and opaque matchmaking. Vittoris is entering the solar space to change this permanently.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <p className="text-sm md:text-base leading-relaxed font-light mb-8" style={{ color: 'var(--text-muted)' }}>
                By deploying our proprietary AI growth engines, conversational voice agents, and automated document intelligence, we provide elite visibility for premium photovoltaic estates, BIPV solar glass, and commercial rooftop microgrids.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.5}>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:info@vittoris.com?subject=Solar%20Panel%20Inquiry%20-%20Vittoris"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-mono font-medium transition-colors"
                >
                  <Mail size={14} />
                  <span>Email info@vittoris.com</span>
                </a>
                <Button variant="outline" onClick={() => onOpenConsultation(ownersData[0])}>
                  Consult with Founder
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. NEW: VITTORIS AI SYSTEMS SHOWCASE (Directly from Corporate PDF) */}
      <section id="ai-systems" className="relative py-24 lg:py-36 px-6 lg:px-16 border-t border-b overflow-hidden" style={{ borderColor: 'var(--border-divider)', backgroundColor: 'var(--bg-section-muted)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#A855F7]/30 bg-[#3B0764]/30 text-xs tracking-[0.25em] uppercase text-[#C084FC] mb-4 font-semibold backdrop-blur-md">
                <Cpu size={14} />
                THE VITTORIS PORTFOLIO • AI OPERATIONAL INFRASTRUCTURE
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-serif text-white font-normal mb-6 leading-tight">
                AI-Powered Growth and Automation Systems for Modern Businesses.
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Vittoris is an outcome-driven growth and automation company engineered for one clear objective: generating pre-qualified client pipeline while eliminating operational drag. Now adapted to accelerate solar panel adoption and commercial clean energy projects.
              </p>
            </Reveal>
          </div>

          {/* AI Capabilities 6-Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {aiCapabilities.map((item, idx) => (
              <Reveal key={item.title} direction="up" delay={0.1 * idx}>
                <Card className="p-8 h-full flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-all border border-white/10 bg-white/[0.02]">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold block mb-2">
                      {item.subtitle}
                    </span>
                    <h3 className="text-xl font-serif text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50">
                    <span className="flex items-center gap-1.5 text-[#10B981]">
                      <CheckCircle2 size={12} />
                      Zero Operational Drag
                    </span>
                    <span className="font-mono text-[10px]">Vittoris Proprietary</span>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* High-Impact Engagement Banner */}
          <Reveal direction="up" delay={0.4}>
            <div className="p-8 md:p-10 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-r from-black/80 via-[#1b082e]/60 to-black/80 flex flex-col lg:flex-row items-center justify-between gap-6 backdrop-blur-md">
              <div className="text-center lg:text-left">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-bold block mb-1">
                  OFFICIAL INTAKE CHANNEL
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                  Ready to deploy Vittoris AI or enter into solar consultation?
                </h3>
                <p className="text-xs md:text-sm text-white/70 font-light max-w-xl">
                  Customers, property owners, and commercial partners can email our direct advisory desk anytime. We guarantee rapid, professional evaluation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <a
                  href="mailto:info@vittoris.com?subject=Vittoris%20AI%20%26%20Solar%20Inquiry"
                  className="px-6 py-3.5 rounded-xl bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#e5c158] transition-all flex items-center gap-2 shadow-lg"
                >
                  <Mail size={14} />
                  <span>Email info@vittoris.com</span>
                </a>
                <Button variant="outline" onClick={() => onOpenConsultation(ownersData[0])}>
                  Book Discovery Session
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. CURATED DEVELOPMENTS & INSTALLATIONS (Filtered Showcase of 6 Solar Panel Types) */}
      <section className="relative py-24 lg:py-36 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <Reveal direction="up" delay={0.1}>
                <span className="text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-semibold block mb-2">
                  SOLAR PANEL ARCHITECTURE
                </span>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <h2 className="text-3xl md:text-5xl font-serif text-white font-normal">
                  6 Types of Solar Panel Technologies.
                </h2>
              </Reveal>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Monocrystalline', 'BIPV Glass', 'Bifacial', 'Commercial', 'Roof Shingles'].map(category => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 ${
                    filterCategory === category
                      ? 'bg-[#D4AF37] text-black font-medium shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-white/5 border border-white/10 text-white/70 hover:border-white/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Solar Panel Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.id} direction="up" delay={0.1 * idx}>
                <Card className="group flex flex-col h-full">
                  {/* Visual Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Panel Type Badge */}
                    <div className="absolute top-4 left-4 bg-black/70 border border-white/15 backdrop-blur-md px-3 py-1 rounded text-[10px] tracking-widest text-[#D4AF37] uppercase font-semibold">
                      {project.type}
                    </div>

                    {/* Owner Overlay Badge Directly Over Image */}
                    <div className="absolute top-4 right-4 bg-black/80 border border-white/20 backdrop-blur-md pl-1.5 pr-3 py-1 rounded-full flex items-center gap-1.5 z-10 shadow-lg">
                      <img
                        src={ownersData[0].avatar}
                        alt={ownersData[0].name}
                        className="w-5 h-5 rounded-full object-cover border border-[#D4AF37]"
                      />
                      <span className="text-[10px] text-white/90 font-medium">Owner: {ownersData[0].name}</span>
                    </div>

                    {/* Efficiency Badge */}
                    {project.efficiency && (
                      <div className="absolute bottom-4 left-4 bg-[#D4AF37]/90 text-black px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider">
                        {project.efficiency}
                      </div>
                    )}
                  </div>

                  {/* Card Info */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-semibold mb-2">
                        {project.idealFor}
                      </div>
                      <h3 className="text-xl font-serif text-white group-hover:text-[#D4AF37] transition-colors mb-3">
                        {project.title}
                      </h3>
                      <p className="text-xs font-light line-clamp-3 leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                        {project.description}
                      </p>

                      {/* Specs bullets */}
                      <ul className="space-y-1.5 mb-6 text-[11px] text-white/70">
                        {project.specs.slice(0, 2).map((spec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                            <span className="line-clamp-1">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Owner Detail Box */}
                    <div className="py-2.5 px-3 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={ownersData[0].avatar}
                          alt={ownersData[0].name}
                          className="w-7 h-7 rounded-full object-cover border border-[#D4AF37]"
                        />
                        <div className="text-left leading-tight">
                          <span className="text-[9px] uppercase tracking-wider text-white/40 block">Asset Owner</span>
                          <span className="text-xs text-white font-medium">{ownersData[0].name}</span>
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
                          href={`mailto:info@vittoris.com?subject=${encodeURIComponent(`Solar Panel Inquiry: ${project.title}`)}`}
                          className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1 bg-[#D4AF37]/10 px-2 py-1 rounded border border-[#D4AF37]/20"
                          title="Email info@vittoris.com"
                        >
                          <Mail size={11} />
                          <span>Email</span>
                        </a>
                      </div>
                    </div>

                    {/* Footer meeting trigger */}
                    <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                      <Button
                        variant="gold"
                        size="sm"
                        fullWidth
                        onClick={() => onOpenConsultation(ownersData[0], project)}
                        icon={<Calendar size={13} />}
                      >
                        Consult with Udayveer
                      </Button>
                      <Link to={`/projects/${project.id}`}>
                        <Button variant="outline" size="sm" icon={<ArrowRight size={13} />}>
                          Specs
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VERIFIED SOLAR ASSET OWNER SPOTLIGHT */}
      <section className="relative py-24 lg:py-36 px-6 lg:px-16 overflow-hidden border-t" style={{ borderColor: 'var(--border-divider)', backgroundColor: 'var(--bg-section-muted)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4 font-semibold">
                <ShieldCheck size={14} />
                DIRECT FOUNDER & OWNER VISIBILITY
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-serif text-white font-normal mb-4">
                Meet the Founder & Solar Asset Owner.
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p className="text-xs md:text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                This site is engineered for clean energy visibility and direct matchmaking. Connect directly with Udayveer Singh, Founder of Vittoris, for site audits, commercial rooftop co-development, and custom AI systems without intermediaries.
              </p>
            </Reveal>
          </div>

          {/* Single Owner Spotlight Card */}
          {ownersData[0] && (
            <Reveal direction="up" delay={0.2}>
              <Card className="p-8 md:p-12 border border-[#D4AF37]/30 relative overflow-hidden bg-gradient-to-br from-[#1b082e]/50 via-[var(--bg-card)] to-[#08090A]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                  {/* Photo with luxury ring */}
                  <div className="md:col-span-5 flex flex-col items-center text-center">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#A855F7] to-[#D4AF37] shadow-[0_0_40px_rgba(168,85,247,0.3)] mb-4">
                      <img
                        src={ownersData[0].avatar}
                        alt={ownersData[0].name}
                        className="w-full h-full rounded-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center gap-1 shadow-lg">
                        <ShieldCheck size={14} />
                        Verified Founder
                      </div>
                    </div>
                    <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold">
                      FOUNDER | VITTORIS
                    </span>
                  </div>

                  {/* Bio & Details */}
                  <div className="md:col-span-7 space-y-5 text-left">
                    <div>
                      <h3 className="text-2xl md:text-4xl font-serif text-white font-medium mb-1">
                        {ownersData[0].name}
                      </h3>
                      <p className="text-xs md:text-sm text-[#D4AF37] font-semibold tracking-wider uppercase mb-1">
                        {ownersData[0].role}
                      </p>
                      <p className="text-xs text-white/50 flex items-center gap-1.5">
                        <MapPin size={13} />
                        <span>{ownersData[0].company} • {ownersData[0].location}</span>
                      </p>
                    </div>

                    <p className="text-xs md:text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {ownersData[0].bio}
                    </p>

                    {/* Authentic Attributes Grid */}
                    <div className="grid grid-cols-3 gap-3 p-4 rounded-xl border text-center" style={{ backgroundColor: 'var(--bg-section-muted)', borderColor: 'var(--border-card)' }}>
                      <div>
                        <span className="text-[10px] text-white/40 uppercase block tracking-wider font-medium">Availability</span>
                        <span className="font-serif text-sm md:text-base text-[#D4AF37] font-semibold">Remote</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-white/40 uppercase block tracking-wider font-medium">Pricing</span>
                        <span className="font-serif text-sm md:text-base text-white font-semibold">Direct Desk</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-white/40 uppercase block tracking-wider font-medium">Inquiry Desk</span>
                        <span className="font-serif text-xs md:text-sm text-[#10B981] font-mono font-semibold">info@vittoris.com</span>
                      </div>
                    </div>

                    {/* Direct Contact Desk Box with Phone & Official Email */}
                    <div className="p-4 rounded-xl border bg-black/40 space-y-2.5 text-xs" style={{ borderColor: 'var(--border-card)' }}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-white/50 uppercase tracking-wider text-[10px] font-semibold">Direct Phone Line</span>
                        <a
                          href="tel:+919015920523"
                          className="font-mono text-sm text-[#D4AF37] font-semibold hover:underline flex items-center gap-1.5"
                        >
                          <Phone size={13} />
                          <span>+91 90159 20523</span>
                        </a>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
                        <span className="text-white/50 uppercase tracking-wider text-[10px] font-semibold">Official Corporate Inbox</span>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <a
                            href="mailto:info@vittoris.com?subject=Solar%20Panel%20Consultation%20-%20Vittoris"
                            className="text-[#D4AF37] hover:underline font-mono font-semibold flex items-center gap-1"
                          >
                            <Mail size={12} />
                            <span>info@vittoris.com</span>
                          </a>
                          <span className="text-white/20">•</span>
                          <span className="text-white/50 text-[11px]">Primary Intake</span>
                        </div>
                      </div>
                    </div>

                    {/* Direct Buttons */}
                    <div className="pt-2 flex flex-wrap gap-3">
                      <Button
                        variant="gold"
                        size="md"
                        onClick={() => onOpenConsultation(ownersData[0])}
                        icon={<Calendar size={15} />}
                      >
                        Book Calendar Consultation
                      </Button>
                      <a
                        href="https://wa.me/919015920523?text=Hi%20Udayveer%2C%20I%20would%20like%20to%20consult%20regarding%20solar%20panels."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-5 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <span>WhatsApp Udayveer</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          )}
        </div>
      </section>

      {/* 7. CLEAN DIRECT CONSULTATION & ADVISORY BANNER */}
      <section className="relative py-24 px-6 lg:px-16 text-center border-t border-b overflow-hidden" style={{ borderColor: 'var(--border-divider)', backgroundColor: 'var(--bg-section-muted)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal direction="up" delay={0.1}>
            <span className="text-xs tracking-[0.35em] uppercase text-[#D4AF37] font-semibold block mb-4">
              DIRECT OWNER CONSULTATION
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal mb-6 leading-tight">
              Ready to evaluate solar panels for your estate or commercial property?
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="text-sm md:text-base font-light max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Direct advisory with Udayveer Singh. Consult on Monocrystalline TOPCon, BIPV architectural glass, bifacial modules, and commercial rooftop solarization.
            </p>
          </Reveal>

          {/* Contact shortcuts */}
          <Reveal direction="up" delay={0.35}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <a
                href="mailto:info@vittoris.com?subject=Solar%20Panel%20Consultation%20Inquiry%20-%20Vittoris"
                className="flex items-center gap-2 py-2 px-5 rounded-full bg-black/60 border border-[#D4AF37]/50 text-[#D4AF37] font-mono text-sm font-semibold hover:bg-[#D4AF37]/10 transition-colors"
              >
                <Mail size={14} />
                <span>info@vittoris.com</span>
              </a>
              <a
                href="tel:+919015920523"
                className="flex items-center gap-2 py-2 px-5 rounded-full bg-black/60 border border-white/15 text-white hover:text-[#D4AF37] transition-colors text-sm font-mono"
              >
                <Phone size={14} className="text-[#D4AF37]" />
                <span>+91 90159 20523</span>
              </a>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="lg" onClick={() => onOpenConsultation(ownersData[0])} icon={<Calendar size={15} />}>
                Book Consultation
              </Button>
              <Link to="/projects">
                <Button variant="outline" size="lg">
                  View All Solar Panels
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
