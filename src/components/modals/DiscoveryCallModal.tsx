import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building, Mail, User, Globe, Phone, FileText } from 'lucide-react';
import { VITTORIS_SERVICES, COMPANY_CONTACT_DETAILS } from '../../data/vittorisData';

interface DiscoveryCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceSlug?: string;
}

export const DiscoveryCallModal: React.FC<DiscoveryCallModalProps> = ({
  isOpen,
  onClose,
  initialServiceSlug,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    companyName: '',
    website: '',
    selectedService: initialServiceSlug || 'pay-per-appointment',
    currentRevenue: '$50k - $250k / mo',
    primaryGoal: 'Scale Qualified Appointments',
    preferredChannel: 'Email',
    phone: '',
    selectedDate: '2026-10-08',
    selectedTime: '10:00 AM EST',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Time slots for demo calendar
  const timeSlots = [
    '09:00 AM EST',
    '10:30 AM EST',
    '01:00 PM EST',
    '02:30 PM EST',
    '04:00 PM EST',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 700);
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-2xl bg-[#0F0F0F] border border-[#C7A86D]/30 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden z-10 my-8"
        >
          {/* Header Gold Line */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C7A86D] to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-[#C7A86D] rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-10">
            {/* Modal Title */}
            <div className="mb-6 space-y-1.5">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C7A86D] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C7A86D]" /> Strategic Discovery Diagnostic
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
                Schedule an AI Architecture Consultation
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                Review your current sales funnel, examine operational bottlenecks, and evaluate fit for Vittoris outcome-driven systems.
              </p>
            </div>

            {/* Stepper indicators */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider font-semibold ${step >= 1 ? 'text-[#C7A86D]' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${step >= 1 ? 'bg-[#C7A86D] text-black font-bold' : 'bg-white/5 text-slate-400'}`}>1</span>
                <span>Scoping</span>
              </div>
              <div className="h-[1px] w-12 bg-white/10" />
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider font-semibold ${step >= 2 ? 'text-[#C7A86D]' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${step >= 2 ? 'bg-[#C7A86D] text-black font-bold' : 'bg-white/5 text-slate-400'}`}>2</span>
                <span>Calendar</span>
              </div>
              <div className="h-[1px] w-12 bg-white/10" />
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider font-semibold ${step === 3 ? 'text-[#C7A86D]' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${step === 3 ? 'bg-[#C7A86D] text-black font-bold' : 'bg-white/5 text-slate-400'}`}>3</span>
                <span>Confirmation</span>
              </div>
            </div>

            {/* Step 1: Scoping Details */}
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g., Alexander Vance"
                        className="w-full bg-[#141414] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7A86D] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                      Corporate Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        name="businessEmail"
                        required
                        value={formData.businessEmail}
                        onChange={handleInputChange}
                        placeholder="alex@company.com"
                        className="w-full bg-[#141414] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7A86D] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                      Company / Organization *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Acme Capital"
                        className="w-full bg-[#141414] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7A86D] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                      Website or LinkedIn
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://company.com"
                        className="w-full bg-[#141414] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7A86D] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                      Primary AI Solution of Interest *
                    </label>
                    <select
                      name="selectedService"
                      value={formData.selectedService}
                      onChange={handleInputChange}
                      className="w-full bg-[#141414] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C7A86D] transition-colors"
                    >
                      {VITTORIS_SERVICES.map(srv => (
                        <option key={srv.slug} value={srv.slug}>
                          {srv.number}. {srv.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                      Monthly Revenue Band
                    </label>
                    <select
                      name="currentRevenue"
                      value={formData.currentRevenue}
                      onChange={handleInputChange}
                      className="w-full bg-[#141414] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C7A86D] transition-colors"
                    >
                      <option value="< $50k / mo">Under $50k / mo</option>
                      <option value="$50k - $250k / mo">$50k - $250k / mo</option>
                      <option value="$250k - $1M / mo">$250k - $1M / mo</option>
                      <option value="$1M+ / mo">$1M+ / mo (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                    Current Operational or Pipeline Challenge
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="e.g., Reps spend too much time chasing unvetted leads; need automated booking & document intelligence."
                      className="w-full bg-[#141414] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7A86D] transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C7A86D]" />
                    <span>Strict NDA & Data Privacy Compliant</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C7A86D]/20 hover:brightness-110 cursor-pointer"
                  >
                    <span>Proceed to Calendar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Time Selection */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-[#141414] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#C7A86D] flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#C7A86D]" /> Consultation Date
                    </span>
                    <span className="text-[11px] text-slate-400">Select preferred slot</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {['2026-10-07 (Wed)', '2026-10-08 (Thu)', '2026-10-09 (Fri)'].map((dateLabel, idx) => {
                      const dateVal = dateLabel.split(' ')[0];
                      const isDateSelected = formData.selectedDate === dateVal;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, selectedDate: dateVal }))}
                          className={`py-2 px-3 text-xs rounded-xl border text-center font-medium transition-all cursor-pointer ${
                            isDateSelected
                              ? 'bg-[#C7A86D]/20 border-[#C7A86D] text-[#E5C788]'
                              : 'bg-[#0B0B0B] border-white/10 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          {dateLabel}
                        </button>
                      );
                    })}
                  </div>

                  <label className="block text-xs font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C7A86D]" /> Available Time Slot (EST)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timeSlots.map((slot) => {
                      const isSlotPicked = formData.selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, selectedTime: slot }))}
                          className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all text-center cursor-pointer ${
                            isSlotPicked
                              ? 'bg-[#C7A86D] text-black font-semibold border-[#C7A86D] shadow-md shadow-[#C7A86D]/25'
                              : 'bg-[#0B0B0B] border-white/10 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                      Direct Phone / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#141414] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7A86D] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                      Preferred Channel
                    </label>
                    <select
                      name="preferredChannel"
                      value={formData.preferredChannel}
                      onChange={handleInputChange}
                      className="w-full bg-[#141414] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C7A86D] transition-colors"
                    >
                      <option value="Email">Email Calendar Invite (Google Meet / Zoom)</option>
                      <option value="WhatsApp">WhatsApp Executive Briefing</option>
                      <option value="Phone">Direct Phone Call</option>
                    </select>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#C7A86D]/10 border border-[#C7A86D]/25 text-xs text-slate-300 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C7A86D] shrink-0 mt-0.5" />
                  <span>
                    <strong>Vittoris Commitment:</strong> We strictly review operational fit, qualification criteria, and commercial economics prior to confirmation.
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Back to Details
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C7A86D]/25 hover:brightness-110 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Discovery Call</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Success Confirmation */}
            {step === 3 && (
              <div className="py-4 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 flex items-center justify-center mx-auto text-[#C7A86D]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                  <h4 className="text-2xl font-serif text-white">Discovery Diagnostic Reserved</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
                    A calendar reservation placeholder has been generated for <strong>{formData.selectedDate} at {formData.selectedTime}</strong>.
                  </p>
                </div>

                <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-400">Organization:</span>
                    <span className="text-white font-medium">{formData.companyName || 'Corporate Client'}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-400">Executive Contact:</span>
                    <span className="text-white font-medium">{formData.fullName || 'Lead Executive'} ({formData.businessEmail})</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-400">Focus System:</span>
                    <span className="text-[#C7A86D] font-medium">{formData.selectedService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Protocol:</span>
                    <span className="text-slate-200 font-medium">{formData.preferredChannel} Delivery</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#141414] border border-[#C7A86D]/20 text-[11px] text-slate-400 text-left max-w-lg mx-auto">
                  Direct team contacts: <strong className="text-white">{COMPANY_CONTACT_DETAILS.email}</strong> or <strong className="text-white">{COMPANY_CONTACT_DETAILS.directSupport}</strong>.
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Done / Return to Platform
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
