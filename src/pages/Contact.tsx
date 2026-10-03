import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle2, Send, Calendar, ShieldCheck, Phone } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Reveal } from '../components/common/Reveal';

interface ContactProps {
  onOpenConsultation: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenConsultation }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Property Owner Seeking Solar Feasibility',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pb-32">
      <PageHeader
        badge="DIRECT ENGAGEMENT"
        subtitle="AI VITTORIS ADVISORY DESK"
        title="Schedule a Private Solar Consultation."
        description="Connect directly with the team of Udayveer Singh, Founder at Vittoris. Whether you are an estate proprietor evaluating solar panel types or a commercial host seeking direct clean power matchmaking."
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-12">
        {/* Direct consultation quick banner */}
        <div className="mb-12 p-6 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs">
            <Calendar size={20} className="text-[#D4AF37] shrink-0" />
            <span className="text-white/80">
              Need direct technical matchmaking with the solar asset owner?
            </span>
          </div>
          <Button variant="gold" size="sm" onClick={() => onOpenConsultation()}>
            Book 1-on-1 Session
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Left: Contact Info & Address */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal direction="up" delay={0.1}>
              <div className="text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-semibold mb-2">
                FOUNDER & ADVISORY DESK
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
                Let Us Evaluate Your Solar Potential.
              </h2>
              <p className="text-xs md:text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Directly communicate with the team of Udayveer Singh, Founder at Vittoris. We honor strict mutual non-disclosure agreements for all solar panel evaluations and commercial rooftop leaseholds.
              </p>
            </Reveal>

            <div className="space-y-6 text-xs">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif text-white mb-1">Founder Desk</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Udayveer Singh • Founder | Vittoris</p>
                    <p className="text-[11px] text-[#D4AF37] mt-0.5">Available: Remote • Global Matchmaking</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border border-[#D4AF37]/30 bg-gradient-to-br from-[#1b082e]/40 to-black/60">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif text-white mb-1">Direct Phone & WhatsApp</h4>
                    <a
                      href="tel:+919015920523"
                      className="block text-[#D4AF37] hover:underline font-mono text-sm font-semibold transition-colors"
                    >
                      +91 90159 20523
                    </a>
                    <a
                      href="https://wa.me/919015920523?text=Hi%20Udayveer%2C%20I%20would%20like%20to%20consult%20regarding%20solar%20panels."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#10B981] hover:underline mt-1 font-medium"
                    >
                      <span>Open WhatsApp Chat →</span>
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif text-white mb-1">Electronic Correspondence</h4>
                    <a href="mailto:info@vittoris.com?subject=Solar%20Panel%20%26%20Clean%20Energy%20Inquiry%20-%20Vittoris" className="block text-white hover:text-[#D4AF37] font-mono font-semibold transition-colors text-sm">info@vittoris.com</a><span className="block text-white/50 text-[11px] mt-0.5">Monitored 24/7 by Vittoris AI Dispatch</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif text-white mb-1">Pricing & Feasibility</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Contact for pricing and site evaluation</p>
                    <p className="text-[11px] text-white/40 mt-0.5">Direct Owner Engagement • Zero Middlemen</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right: Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 md:p-12">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37] rounded-full flex items-center justify-center text-[#D4AF37] mx-auto mb-5">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">Inquiry Dispatched Successfully</h3>
                  <p className="text-xs leading-relaxed max-w-md mx-auto mb-8" style={{ color: 'var(--text-muted)' }}>
                    Thank you, {formData.name}. Our principal solar technical desk will review your parameters and connect directly via phone and email within 4 business hours.
                  </p>
                  <Button variant="gold" onClick={() => setSubmitted(false)}>
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b pb-4 mb-6" style={{ borderColor: 'var(--border-divider)' }}>
                    <h3 className="text-xl font-serif text-white mb-1">Direct Advisory Inquiry</h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Connect with our engineering specialists or request a private site feasibility assessment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] tracking-wider uppercase font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Vikram Singhania"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] tracking-wider uppercase font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="vikram@estate.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] tracking-wider uppercase font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        Contact Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. Your direct number"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] tracking-wider uppercase font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        Inquiry Archetype *
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={e => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-3 rounded-md bg-[#121418] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Property Owner Seeking Solar Feasibility">Property Owner Seeking Solar Feasibility</option>
                        <option value="Solar Plant Owner Seeking Asset Visibility">Solar Plant Owner Seeking Asset Visibility</option>
                        <option value="Commercial Landlord Offering Rooftop Lease">Commercial Landlord Offering Rooftop Lease</option>
                        <option value="EPC Developer Registration">EPC Developer Registration</option>
                        <option value="Architectural BIPV Specification">Architectural BIPV Specification</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-wider uppercase font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                      Message & Technical Context
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please outline your property area, current monthly grid expenditure, or solar asset capacity..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="pt-2">
                    <Button variant="gold" fullWidth type="submit" icon={<Send size={15} />}>
                      Transmit Confidential Inquiry
                    </Button>
                    <p className="text-[10px] text-center mt-3 text-white/40">
                      Strict NDA adherence • Zero third-party marketing brokers
                    </p>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t pt-20" style={{ borderColor: 'var(--border-divider)' }}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-semibold block mb-2">
              FREQUENTLY ADDRESSED
            </span>
            <h3 className="text-2xl md:text-3xl font-serif text-white">
              Understanding the AI Vittoris Visibility Model.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: 'How does user-owner direct matchmaking work?',
                a: 'Unlike generic aggregate portals, AI Vittoris directly connects verified property owners with accredited solar asset owners and principal EPC license holders. Inquiries trigger direct calendar synchronization for on-site audits or virtual technical briefings.'
              },
              {
                q: 'What is the role of this platform if it is only for visibility?',
                a: 'AI Vittoris serves as a dedicated architectural showroom and credibility index. We showcase real commissioned projects, verified production data, and engineering specs so property seekers can evaluate genuine workmanship without sales middlemen.'
              },
              {
                q: 'How are solar plant owners and developers verified?',
                a: 'Every listed developer must submit proven Tier-1 module supplier contracts, CEA/DISCOM grid interconnect approvals, safety compliance records, and minimum 5 operational megawatts in verified capacity.'
              },
              {
                q: 'Can rooftop owners list their properties for solar leasing?',
                a: 'Yes. Commercial, industrial, and large estate owners can submit their rooftops to our registry. Verified solar asset owners regularly search for viable host rooftops under 20- to 25-year Power Purchase Agreements (PPAs).'
              }
            ].map((faq, i) => (
              <Card key={i} className="p-6">
                <h4 className="text-sm font-serif text-white font-medium mb-2 flex items-center gap-2">
                  <span className="text-[#D4AF37]">Q.</span> {faq.q}
                </h4>
                <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
