import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ArrowUpRight, Phone } from 'lucide-react';
import { Button } from '../common/Button';
import { VittorisLogo } from '../common/VittorisLogo';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  return (
    <footer 
      className="relative border-t pt-20 pb-12 overflow-hidden px-6 lg:px-16"
      style={{ 
        borderColor: 'var(--border-divider)',
        backgroundColor: 'var(--bg-section-muted)'
      }}
    >
      <div className="max-w-8xl mx-auto">
        {/* Top Banner: Direct Connect CTA */}
        <div className="mb-16 p-8 md:p-12 rounded-2xl border bg-gradient-to-r from-black/60 via-[#14171D]/60 to-black/60 border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-md">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold block mb-2">
              EXCLUSIVE VISIBILITY PLATFORM
            </span>
            <h3 className="text-2xl md:text-4xl font-serif text-white mb-3">
              Are you a Solar Asset Owner or Rooftop Host?
            </h3>
            <p className="text-xs md:text-sm font-light" style={{ color: 'var(--text-muted)' }}>
              Feature your operational solar farm or submit your luxury estate rooftop to connect with accredited clean energy developers and institutional co-investors.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <Button variant="gold" onClick={onOpenConsultation}>
              Register Your Solar Asset
            </Button>
            <Link to="/contact">
              <Button variant="outline" fullWidth>
                Speak with EPC Desk
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b" style={{ borderColor: 'var(--border-divider)' }}>
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block select-none">
              <VittorisLogo size="lg" subtitleText="Helping Businesses with AI & Clean Energy Solutions" />
            </Link>
            <p className="text-xs leading-relaxed max-w-sm font-light" style={{ color: 'var(--text-muted)' }}>
              A curated architectural solar visibility exchange connecting high-net-worth estate owners, commercial landlords, and verified solar plant developers across Western India and global corridors.
            </p>
            <div className="flex items-center gap-4 text-white/50 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors p-2 rounded-full border border-white/5 hover:border-[#D4AF37]/30" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors p-2 rounded-full border border-white/5 hover:border-[#D4AF37]/30" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors p-2 rounded-full border border-white/5 hover:border-[#D4AF37]/30" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors p-2 rounded-full border border-white/5 hover:border-[#D4AF37]/30" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase font-semibold text-white mb-4">
              Solar Panel Types
            </h4>
            <ul className="space-y-2.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <li>
                <Link to="/projects" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                  <span>Monocrystalline TOPCon</span>
                  <ArrowUpRight size={12} className="opacity-40" />
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                  <span>Architectural BIPV Glass</span>
                  <ArrowUpRight size={12} className="opacity-40" />
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                  <span>Bifacial Dual-Glass</span>
                  <ArrowUpRight size={12} className="opacity-40" />
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                  <span>Commercial Rooftop PV</span>
                  <ArrowUpRight size={12} className="opacity-40" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Owners & Governance */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase font-semibold text-white mb-4">
              Owner Desk
            </h4>
            <ul className="space-y-2.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <li>
                <Link to="/owners" className="hover:text-[#D4AF37] transition-colors">
                  Project Owner & Founder
                </Link>
              </li>
              <li>
                <button onClick={onOpenConsultation} className="hover:text-[#D4AF37] transition-colors text-left">
                  Book 1-on-1 Consultation
                </button>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">
                  Direct Inquiries & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Headquarters */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase font-semibold text-white mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs" style={{ color: 'var(--text-muted)' }}>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Vittoris • Available: Remote</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#D4AF37] shrink-0" />
                <a href="tel:+919015920523" className="hover:text-[#D4AF37] transition-colors font-mono font-medium">+91 90159 20523</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#D4AF37] shrink-0" />
                <a href="mailto:info@vittoris.com?subject=Solar%20Panel%20%26%20Clean%20Energy%20Inquiry%20-%20Vittoris" className="hover:text-[#D4AF37] font-mono text-white font-medium transition-colors">info@vittoris.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-wider" style={{ color: 'var(--text-muted)' }}>
          <div>
            © {new Date().getFullYear()} AI VITTORIS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>CEA Grid Compliant</span>
            <span>•</span>
            <span>MNRE Tier-1 Standards</span>
            <span>•</span>
            <span>Strict NDA Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
