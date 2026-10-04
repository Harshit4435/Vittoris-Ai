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
    }, 800);
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
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0B0F1E] border border-blue-900/40 rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Header Gradient Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-600" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8">
            {/* Modal Title */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Strategic Discovery Diagnostic
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Schedule a 30-Minute AI Discovery Call
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Review your current sales funnel, examine automation bottlenecks, and evaluate fit for Vittoris outcome-driven systems.
              </p>
            </div>

            {/* Stepper indicators */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              <div className={`flex items-center gap-2 text-xs font-medium ${step >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1</span>
                <span>Business Scoping</span>
              </div>
              <div className="h-0.5 w-12 bg-slate-800" />
              <div className={`flex items-center gap-2 text-xs font-medium ${step >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2</span>
                <span>Select Calendar Time</span>
              </div>
              <div className="h-0.5 w-12 bg-slate-800" />
              <div className={`flex items-center gap-2 text-xs font-medium ${step === 3 ? 'text-blue-400' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>3</span>
                <span>Confirmation</span>
              </div>
            </div>

            {/* Step 1: Scoping Details */}
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
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
                        className="w-full bg-[#070A14] border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
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
                        className="w-full bg-[#070A14] border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
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
                        placeholder="Acme Corp"
                        className="w-full bg-[#070A14] border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
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
                        className="w-full bg-[#070A14] border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Primary AI Solution of Interest *
                    </label>
                    <select
                      name="selectedService"
                      value={formData.selectedService}
                      onChange={handleInputChange}
                      className="w-full bg-[#070A14] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      {VITTORIS_SERVICES.map(srv => (
                        <option key={srv.slug} value={srv.slug}>
                          {srv.number}. {srv.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Current Monthly Revenue Band
                    </label>
                    <select
                      name="currentRevenue"
                      value={formData.currentRevenue}
                      onChange={handleInputChange}
                      className="w-full bg-[#070A14] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="< $50k / mo">Under $50k / mo</option>
                      <option value="$50k - $250k / mo">$50k - $250k / mo</option>
                      <option value="$250k - $1M / mo">$250k - $1M / mo</option>
                      <option value="$1M+ / mo">$1M+ / mo (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Brief Overview of Your Current Operational or Pipeline Challenge
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="e.g., Reps spend too much time chasing unvetted leads; need automated booking & document intelligence."
                      className="w-full bg-[#070A14] border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Strict NDA & Data Privacy Compliant</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-600/30"
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
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> Target Consultation Date
                    </span>
                    <span className="text-xs text-slate-400">Select preferred slot</span>
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
                          className={`py-2 px-3 text-xs rounded-lg border text-center font-medium transition-all ${
                            isDateSelected
                              ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                              : 'bg-[#070A14] border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {dateLabel}
                        </button>
                      );
                    })}
                  </div>

                  <label className="block text-xs font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> Available Time Slot (EST)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timeSlots.map((slot) => {
                      const isSlotPicked = formData.selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, selectedTime: slot }))}
                          className={`py-2 px-3 rounded-lg border text-xs font-mono transition-all text-center ${
                            isSlotPicked
                              ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/40'
                              : 'bg-[#070A14] border-slate-800 text-slate-300 hover:border-slate-700'
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
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Direct Phone / WhatsApp (For Calendar Briefing)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#070A14] border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Preferred Communication Protocol
                    </label>
                    <select
                      name="preferredChannel"
                      value={formData.preferredChannel}
                      onChange={handleInputChange}
                      className="w-full bg-[#070A14] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="Email">Email Calendar Invite (Google Meet / Zoom)</option>
                      <option value="WhatsApp">WhatsApp Executive Briefing</option>
                      <option value="Phone">Direct Phone Call</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/40 text-xs text-blue-300 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Vittoris Commitment:</strong> We strictly review operational fit, qualification criteria, and commercial economics prior to confirmation.
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    Back to Details
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-600/30 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Verifying Availability...</span>
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
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white">Discovery Diagnostic Scheduled</h4>
                  <p className="text-sm text-slate-300 mt-1">
                    A calendar reservation placeholder has been generated for <strong>{formData.selectedDate} at {formData.selectedTime}</strong>.
                  </p>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Organization:</span>
                    <span className="text-white font-medium">{formData.companyName || 'Corporate Client'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Executive Contact:</span>
                    <span className="text-white font-medium">{formData.fullName || 'Lead Executive'} ({formData.businessEmail})</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Focus System:</span>
                    <span className="text-blue-400 font-medium">{formData.selectedService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Protocol:</span>
                    <span className="text-cyan-400 font-medium">{formData.preferredChannel} Delivery</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 text-left max-w-lg mx-auto">
                  <strong>Integration Note:</strong> This is an interactive front-end booking flow. To synchronize with your live enterprise calendar (e.g. Google Calendar, Cal.com or HubSpot), configure your enterprise webhook endpoint in the environment settings. Direct team contacts: <strong>{COMPANY_CONTACT_DETAILS.email}</strong> or <strong>{COMPANY_CONTACT_DETAILS.directSupport}</strong>.
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold tracking-wide uppercase transition-colors"
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
