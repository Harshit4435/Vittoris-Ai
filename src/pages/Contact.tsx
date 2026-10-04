import React, { useState } from 'react';
import { Mail, ShieldCheck, CheckCircle2, Zap, ArrowRight, ChevronDown } from 'lucide-react';
import { VITTORIS_SERVICES, COMPANY_CONTACT_DETAILS } from '../data/vittorisData';

interface ContactProps {
  onOpenConsultation: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenConsultation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    companyName: '',
    website: '',
    selectedService: 'pay-per-appointment',
    monthlyTarget: '20 - 50 Qualified Meetings / mo',
    preferredChannel: 'Email',
    phone: '',
    projectDescription: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the Pay-Per-Appointment commercial model work?",
      a: "Pricing is strictly tied to confirmed, pre-qualified appointments that meet mutually agreed criteria (verified decision-maker, budget minimums, project timeline, and explicit attendance). If a prospect fails to satisfy criteria, the booking carries zero billing cost."
    },
    {
      q: "What qualification criteria are standard before launch?",
      a: "Standard criteria verify direct contact details of corporate decision-makers, pre-vetted budget minimums for your service, agreed project scope, and explicit confirmation of a scheduled consultation date and time."
    },
    {
      q: "Does Vittoris require us to switch CRM or VoIP tools?",
      a: "No. Our systems are engineered for zero platform disruption. We integrate natively with your active tech stack—HubSpot, Salesforce, GoHighLevel, Slack, WhatsApp Business, and custom APIs—without requiring painful migrations."
    },
    {
      q: "What is the timeline from discovery to live deployment?",
      a: "In our 5-phase framework, Phase 1 (Operational Audit) and Phase 2 (Architecture) take 3 to 7 business days. Custom engineering and launch (Phases 3-4) typically go live within 2 to 3 weeks."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.businessEmail.trim() || !formData.businessEmail.includes('@')) {
      newErrors.businessEmail = 'Valid business email is required';
    }
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="pt-32 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Editorial Luxury Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#C7A86D] text-[10px] font-medium uppercase tracking-[0.25em]">
          <Mail className="w-3.5 h-3.5 text-[#E5C788]" />
          <span>Operational & Pipeline Scoping</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
          Initiate a Strategic <span className="italic text-[#C7A86D]">AI Architecture Review</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-2xl mx-auto">
          Submit your commercial parameters below for an operational audit or schedule an exploratory diagnostic directly with our systems architects.
        </p>
      </div>

      {/* Main Grid: Form vs Direct Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-7 luxury-card rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl font-serif font-normal text-white">System Scoping & Inquiry Form</h2>
            <p className="text-xs text-stone-400 font-light mt-1">
              Provide your baseline metrics so we can review qualification criteria before our call.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#E5C788] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-normal text-white">Scoping Parameters Received</h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light max-w-md mx-auto">
                Thank you, <strong className="text-white font-medium">{formData.fullName}</strong>. Your parameters for <strong className="text-[#E5C788] font-medium">{formData.selectedService}</strong> have been recorded in our demo intake registry.
              </p>

              <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#C7A86D]/20 text-xs text-stone-300 font-light text-left max-w-lg mx-auto space-y-2">
                <div className="font-medium text-[#E5C788]">Integration Notice:</div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  This form currently runs in front-end preview mode. To route submissions to your production CRM (HubSpot, Salesforce, or webhook), configure your API gateway endpoint in the environment settings.
                </p>
                <div className="text-[11px] text-stone-300 pt-1 font-mono">
                  Direct inquiries can be sent to <strong className="text-[#E5C788]">{COMPANY_CONTACT_DETAILS.companyEmail}</strong> or <strong className="text-[#E5C788]">{COMPANY_CONTACT_DETAILS.ownerEmail}</strong>.
                </div>
              </div>

              <div className="pt-3 flex justify-center gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-full border border-[#C7A86D]/30 hover:border-[#C7A86D] text-stone-300 hover:text-white text-xs font-medium tracking-wider uppercase transition-all"
                >
                  Submit Another Inquiry
                </button>
                <button
                  onClick={onOpenConsultation}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-[0_2px_15px_rgba(199,168,109,0.3)]"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Open Calendar Picker</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g., Victoria Adams"
                    className={`w-full bg-[#0E0E0E] border ${errors.fullName ? 'border-rose-500' : 'border-[#C7A86D]/20 focus:border-[#C7A86D]'} rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none transition-colors`}
                  />
                  {errors.fullName && <p className="text-[10px] text-rose-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleInputChange}
                    placeholder="victoria@enterprise.com"
                    className={`w-full bg-[#0E0E0E] border ${errors.businessEmail ? 'border-rose-500' : 'border-[#C7A86D]/20 focus:border-[#C7A86D]'} rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none transition-colors`}
                  />
                  {errors.businessEmail && <p className="text-[10px] text-rose-400 mt-1">{errors.businessEmail}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Acme Global Ltd"
                    className={`w-full bg-[#0E0E0E] border ${errors.companyName ? 'border-rose-500' : 'border-[#C7A86D]/20 focus:border-[#C7A86D]'} rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none transition-colors`}
                  />
                  {errors.companyName && <p className="text-[10px] text-rose-400 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Website or LinkedIn URL
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://company.com"
                    className="w-full bg-[#0E0E0E] border border-[#C7A86D]/20 focus:border-[#C7A86D] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Service Architecture of Interest *
                  </label>
                  <select
                    name="selectedService"
                    value={formData.selectedService}
                    onChange={handleInputChange}
                    className="w-full bg-[#0E0E0E] border border-[#C7A86D]/20 focus:border-[#C7A86D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                  >
                    {VITTORIS_SERVICES.map(srv => (
                      <option key={srv.slug} value={srv.slug}>
                        {srv.number}. {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Monthly Qualified Pipeline Target
                  </label>
                  <select
                    name="monthlyTarget"
                    value={formData.monthlyTarget}
                    onChange={handleInputChange}
                    className="w-full bg-[#0E0E0E] border border-[#C7A86D]/20 focus:border-[#C7A86D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                  >
                    <option value="10 - 20 Qualified Meetings / mo">10 - 20 Qualified Meetings / mo</option>
                    <option value="20 - 50 Qualified Meetings / mo">20 - 50 Qualified Meetings / mo</option>
                    <option value="50 - 100+ Qualified Meetings / mo">50 - 100+ Qualified Meetings / mo</option>
                    <option value="Custom Internal Automation">Custom Internal Automation Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Preferred Contact Channel
                </label>
                <select
                  name="preferredChannel"
                  value={formData.preferredChannel}
                  onChange={handleInputChange}
                  className="w-full bg-[#0E0E0E] border border-[#C7A86D]/20 focus:border-[#C7A86D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="Email">Email Calendar Link</option>
                  <option value="Virtual Meeting">Executive Video Diagnostic (Google Meet / Zoom)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Describe Your Current Pipeline or Clerical Friction
                </label>
                <textarea
                  name="projectDescription"
                  rows={3}
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Outline your average contract value, closing cycle, or repetitive administrative bottleneck..."
                  className="w-full bg-[#0E0E0E] border border-[#C7A86D]/20 focus:border-[#C7A86D] rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-light">
                  <ShieldCheck className="w-4 h-4 text-[#C7A86D]" />
                  <span>Strict NDA & Data Protection</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(199,168,109,0.3)] hover:shadow-[0_4px_25px_rgba(199,168,109,0.5)] flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Scoping Request</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Direct Channels & Instant Booking */}
        <div className="lg:col-span-5 space-y-6">
          {/* Instant Discovery CTA card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#181510] via-[#111111] to-[#0E0E0E] border border-[#C7A86D]/30 space-y-4 shadow-xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#E5C788] text-[10px] font-medium uppercase tracking-[0.25em]">
              <Zap className="w-3.5 h-3.5 text-[#E5C788]" />
              <span>Fastest Path</span>
            </div>
            <h3 className="text-2xl font-serif font-normal text-white">Book Directly Onto Our Calendar</h3>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Bypass email back-and-forth. Select an available 30-minute diagnostic session with our systems architect.
            </p>
            <button
              onClick={onOpenConsultation}
              className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(199,168,109,0.3)] hover:shadow-[0_4px_25px_rgba(199,168,109,0.5)] flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-black" />
              <span>Book a Discovery Call</span>
            </button>
          </div>

          {/* Direct Contact Coordinates */}
          <div className="luxury-card rounded-2xl p-6 space-y-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D]">
              Corporate Contact Coordinates
            </h4>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3 text-stone-300">
                <Mail className="w-4 h-4 text-[#C7A86D] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-wider">Company Email:</div>
                  <a href={`mailto:${COMPANY_CONTACT_DETAILS.companyEmail}`} className="font-mono text-[#E5C788] hover:text-white transition-colors">
                    {COMPANY_CONTACT_DETAILS.companyEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-stone-300">
                <Mail className="w-4 h-4 text-[#E5C788] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-wider">Owner Email:</div>
                  <a href={`mailto:${COMPANY_CONTACT_DETAILS.ownerEmail}`} className="font-mono text-[#E5C788] hover:text-white transition-colors">
                    {COMPANY_CONTACT_DETAILS.ownerEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="luxury-card rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A86D]">
            Clarity & Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white">
            Frequently Asked <span className="italic text-[#C7A86D]">Questions</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#C7A86D]/20 bg-[#0E0E0E] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-white hover:text-[#E5C788] transition-colors"
                >
                  <span className="font-serif">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C7A86D] transition-transform duration-200 shrink-0 ml-3 ${isOpen ? 'rotate-180 text-[#E5C788]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-stone-300 font-light leading-relaxed border-t border-[#C7A86D]/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
