import React, { useState } from 'react';
import { Mail, Phone, Globe, ShieldCheck, CheckCircle2, Zap, ArrowRight, ChevronDown } from 'lucide-react';
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
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Operational & Pipeline Scoping</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Initiate a Strategic AI Architecture Review
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Submit your commercial parameters below for an operational audit or schedule an exploratory diagnostic directly with our systems architects.
        </p>
      </div>

      {/* Main Grid: Form vs Direct Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-[#0B0F1E] border border-blue-900/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white">System Scoping & Inquiry Form</h2>
            <p className="text-xs text-slate-400 mt-1">
              Provide your baseline metrics so we can review qualification criteria before our call.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Scoping Parameters Received</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. Your parameters for <strong>{formData.selectedService}</strong> have been recorded in our demo intake registry.
              </p>

              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 text-xs text-slate-300 text-left max-w-lg mx-auto space-y-2">
                <div className="font-semibold text-blue-300">Integration Notice:</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  This form currently runs in front-end preview mode. To route submissions to your production CRM (HubSpot, Salesforce, or webhook), configure your API gateway endpoint in the environment settings.
                </p>
                <div className="text-[11px] text-cyan-300">
                  Direct inquiries can be sent to <strong>{COMPANY_CONTACT_DETAILS.email}</strong> or <strong>{COMPANY_CONTACT_DETAILS.phone}</strong>.
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  Submit Another Inquiry
                </button>
                <button
                  onClick={onOpenConsultation}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Open Calendar Picker</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g., Victoria Adams"
                    className={`w-full bg-[#070A14] border ${errors.fullName ? 'border-rose-500' : 'border-slate-700'} rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                  />
                  {errors.fullName && <p className="text-[10px] text-rose-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleInputChange}
                    placeholder="victoria@enterprise.com"
                    className={`w-full bg-[#070A14] border ${errors.businessEmail ? 'border-rose-500' : 'border-slate-700'} rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                  />
                  {errors.businessEmail && <p className="text-[10px] text-rose-400 mt-1">{errors.businessEmail}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Acme Global Ltd"
                    className={`w-full bg-[#070A14] border ${errors.companyName ? 'border-rose-500' : 'border-slate-700'} rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                  />
                  {errors.companyName && <p className="text-[10px] text-rose-400 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Website or LinkedIn URL
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://company.com"
                    className="w-full bg-[#070A14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Service Architecture of Interest *
                  </label>
                  <select
                    name="selectedService"
                    value={formData.selectedService}
                    onChange={handleInputChange}
                    className="w-full bg-[#070A14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {VITTORIS_SERVICES.map(srv => (
                      <option key={srv.slug} value={srv.slug}>
                        {srv.number}. {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Monthly Qualified Pipeline Target
                  </label>
                  <select
                    name="monthlyTarget"
                    value={formData.monthlyTarget}
                    onChange={handleInputChange}
                    className="w-full bg-[#070A14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="10 - 20 Qualified Meetings / mo">10 - 20 Qualified Meetings / mo</option>
                    <option value="20 - 50 Qualified Meetings / mo">20 - 50 Qualified Meetings / mo</option>
                    <option value="50 - 100+ Qualified Meetings / mo">50 - 100+ Qualified Meetings / mo</option>
                    <option value="Custom Internal Automation">Custom Internal Automation Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Direct Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#070A14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Contact Channel
                  </label>
                  <select
                    name="preferredChannel"
                    value={formData.preferredChannel}
                    onChange={handleInputChange}
                    className="w-full bg-[#070A14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Email">Email Calendar Link</option>
                    <option value="WhatsApp">WhatsApp Briefing</option>
                    <option value="Phone">Direct Phone Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Describe Your Current Pipeline or Clerical Friction
                </label>
                <textarea
                  name="projectDescription"
                  rows={3}
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Outline your average contract value, closing cycle, or repetitive administrative bottleneck..."
                  className="w-full bg-[#070A14] border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Strict NDA & Data Protection</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/30 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Scoping Request</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-950/60 via-[#0B0F1E] to-slate-900 border border-blue-900/50 space-y-4 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Fastest Path</span>
            </div>
            <h3 className="text-xl font-bold text-white">Book Directly Onto Our Calendar</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bypass email back-and-forth. Select an available 30-minute diagnostic session with our systems architect.
            </p>
            <button
              onClick={onOpenConsultation}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Book a Discovery Call</span>
            </button>
          </div>

          {/* Direct Contact Channels */}
          <div className="p-6 rounded-2xl bg-[#0B0F1E] border border-blue-900/30 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Corporate Contact Coordinates
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500">Primary Systems Inquiry:</div>
                  <a href={`mailto:${COMPANY_CONTACT_DETAILS.email}`} className="font-mono hover:text-blue-400">
                    {COMPANY_CONTACT_DETAILS.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500">Secondary Desk:</div>
                  <a href={`mailto:${COMPANY_CONTACT_DETAILS.secondaryEmail}`} className="font-mono hover:text-cyan-400">
                    {COMPANY_CONTACT_DETAILS.secondaryEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500">Direct Support Line:</div>
                  <a href={`tel:${COMPANY_CONTACT_DETAILS.phone}`} className="font-mono hover:text-violet-400">
                    {COMPANY_CONTACT_DETAILS.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-[#0B0F1E] border border-blue-900/30 rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Clarity & Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-[#070A14] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
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
