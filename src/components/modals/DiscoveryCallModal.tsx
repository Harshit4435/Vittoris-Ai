import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Building, Mail, User, Globe, FileText, 
  ExternalLink, Calendar, Clock, Check, Send, AlertCircle, RefreshCw, UserCheck, XCircle, 
  Download, CalendarPlus, ChevronRight, CheckSquare, Square, Lock, CalendarCheck
} from 'lucide-react';
import { VITTORIS_SERVICES, COMPANY_CONTACT_DETAILS } from '../../data/vittorisData';

const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'EST / EDT — US Eastern Time' },
  { value: 'America/Chicago', label: 'CST / CDT — US Central Time' },
  { value: 'America/Denver', label: 'MST / MDT — US Mountain Time' },
  { value: 'America/Los_Angeles', label: 'PST / PDT — US Pacific Time' },
  { value: 'Europe/London', label: 'GMT / BST — London Time' },
  { value: 'Asia/Kolkata', label: 'IST — India Standard Time' },
  { value: 'UTC', label: 'UTC — Coordinated Universal Time' },
];

const TIME_SLOT_OPTIONS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM'
];

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
  const [isReviewingStep1, setIsReviewingStep1] = useState(false);
  const [isConfirmingSlots, setIsConfirmingSlots] = useState(false);
  const [bookingMode, setBookingMode] = useState<'instant_calendly' | 'propose_slots'>('instant_calendly');
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    COMPANY_CONTACT_DETAILS.defaultTimezone || 'America/New_York'
  );

  const [proposedSlots, setProposedSlots] = useState([
    { id: 1, label: 'Slot 1 (Primary Preference)', date: '2026-10-08', time: '10:00 AM' },
    { id: 2, label: 'Slot 2 (Alternative 1)', date: '2026-10-09', time: '02:00 PM' },
    { id: 3, label: 'Slot 3 (Alternative 2)', date: '2026-10-10', time: '11:30 AM' },
  ]);

  // Owner Decision States:
  const [selectedSlotForDecision, setSelectedSlotForDecision] = useState<number | null>(null);
  const [ownerDecisionStatus, setOwnerDecisionStatus] = useState<'pending' | 'confirming' | 'confirmed' | 'declined'>('pending');
  const [ownerPermissionGranted, setOwnerPermissionGranted] = useState(false);
  const [isSending, setIsSending] = useState(false);

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
    notes: '',
  });


  const handleSlotChange = (id: number, field: 'date' | 'time', value: string) => {
    setProposedSlots(prev =>
      prev.map(slot => (slot.id === id ? { ...slot, [field]: value } : slot))
    );
  };

  const getCalendlyUrl = (specificDate?: string) => {
    const raw = COMPANY_CONTACT_DETAILS.calendlyUrl || 'https://calendly.com/udayzayn/meetings';
    try {
      const url = new URL(raw);
      url.searchParams.set('hide_landing_page_details', '1');
      url.searchParams.set('hide_gdpr_banner', '1');
      url.searchParams.set('background_color', '0e0e0e');
      url.searchParams.set('text_color', 'ffffff');
      url.searchParams.set('primary_color', 'c7a86d');
      url.searchParams.set('timezone', selectedTimezone);
      if (formData.fullName.trim()) {
        url.searchParams.set('name', formData.fullName.trim());
      }
      if (formData.businessEmail.trim()) {
        url.searchParams.set('email', formData.businessEmail.trim());
      }
      if (specificDate) {
        url.searchParams.set('date', specificDate);
        url.searchParams.set('month', specificDate.slice(0, 7));
      }
      return url.toString();
    } catch {
      return raw;
    }
  };

  useEffect(() => {
    const handleCalendlyMessage = (e: MessageEvent) => {
      if (e.data && typeof e.data.event === 'string' && e.data.event.indexOf('calendly.event_scheduled') === 0) {
        setBookingMode('instant_calendly');
        setOwnerDecisionStatus('confirmed');
        setStep(3);
      }
    };
    window.addEventListener('message', handleCalendlyMessage);
    return () => window.removeEventListener('message', handleCalendlyMessage);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleResetAndClose = () => {
    setStep(1);
    setIsReviewingStep1(false);
    setIsConfirmingSlots(false);
    setOwnerDecisionStatus('pending');
    setSelectedSlotForDecision(null);
    setOwnerPermissionGranted(false);
    setIsSending(false);
    onClose();
  };

  // Helper variables
  const tzLabel = TIMEZONE_OPTIONS.find(t => t.value === selectedTimezone)?.label.split('—')[0].trim() || 'EST';
  const currentSlot = proposedSlots.find(s => s.id === selectedSlotForDecision) || proposedSlots[0];
  const selectedServiceObj = VITTORIS_SERVICES.find(s => s.slug === formData.selectedService) || VITTORIS_SERVICES[0];

  const getGoogleCalendarUrl = (slot: { date: string; time: string }) => {
    const title = `Vittoris AI Architecture Consultation - ${formData.companyName || 'Corporate Client'}`;
    const details = `Confirmed AI Architecture Diagnostic Session with ${formData.fullName || 'Candidate'}.\n\nConfirmed Time: ${slot.date} at ${slot.time} (${tzLabel})\nPlatform: Google Meet (https://meet.google.com/vit-arch-call)\nOwner Email: ${COMPANY_CONTACT_DETAILS.ownerEmail}\nClient Email: ${formData.businessEmail}\nCalendly: ${COMPANY_CONTACT_DETAILS.calendlyUrl}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent('Google Meet (https://meet.google.com/vit-arch-call)')}`;
  };

  const handleDownloadIcs = (slot: { date: string; time: string }) => {
    const title = `Vittoris Consultation - ${formData.companyName || 'Client'}`;
    const description = `Vittoris AI Architecture Consultation with ${formData.fullName || 'Candidate'}.\nConfirmed: ${slot.date} at ${slot.time} (${tzLabel}).\nGoogle Meet: https://meet.google.com/vit-arch-call\nOwner: ${COMPANY_CONTACT_DETAILS.ownerEmail}`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Vittoris//AI Consultation//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      'LOCATION:Google Meet: https://meet.google.com/vit-arch-call',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vittoris-discovery-${slot.date}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleConfirmSchedule = () => {
    if (!ownerPermissionGranted) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setOwnerDecisionStatus('confirmed');
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5"
        data-lenis-prevent
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window: Fixed max height & flex col so header/close button never disappear */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className={`relative w-full ${step === 2 && bookingMode === 'instant_calendly' ? 'max-w-4xl' : 'max-w-2xl'} max-h-[90vh] flex flex-col bg-[#0F0F0F] border border-[#C7A86D]/30 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden z-10 transition-all duration-300`}
          data-lenis-prevent
        >
          {/* Header Gold Line */}
          <div className="h-1 w-full shrink-0 bg-gradient-to-r from-transparent via-[#C7A86D] to-transparent" />

          {/* Fixed Modal Header */}
          <div className="p-5 sm:p-6 pb-3 border-b border-white/5 shrink-0 relative bg-[#0F0F0F]">
            {/* Close button */}
            <button
              onClick={handleResetAndClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#C7A86D] rounded-full hover:bg-white/5 transition-colors cursor-pointer z-20"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="mb-3 space-y-1 pr-8">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C7A86D] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C7A86D]" /> Strategic Discovery Diagnostic
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight">
                Schedule an AI Architecture Consultation
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Review your current sales funnel, examine operational bottlenecks, and evaluate fit for Vittoris outcome-driven systems.
              </p>
            </div>

            {/* Stepper indicators */}
            <div className="flex items-center justify-between pt-1">
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider font-semibold ${step >= 1 ? 'text-[#C7A86D]' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step >= 1 ? 'bg-[#C7A86D] text-black font-bold' : 'bg-white/5 text-slate-400'}`}>1</span>
                <span>Scoping</span>
              </div>
              <div className="h-[1px] w-8 sm:w-16 bg-white/10" />
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider font-semibold ${step >= 2 ? 'text-[#C7A86D]' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step >= 2 ? 'bg-[#C7A86D] text-black font-bold' : 'bg-white/5 text-slate-400'}`}>2</span>
                <span>Calendar (EST)</span>
              </div>
              <div className="h-[1px] w-8 sm:w-16 bg-white/10" />
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider font-semibold ${step === 3 ? 'text-[#C7A86D]' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step === 3 ? 'bg-[#C7A86D] text-black font-bold' : 'bg-white/5 text-slate-400'}`}>3</span>
                <span>Owner Permission</span>
              </div>
            </div>
          </div>

          {/* Scrollable Modal Content (data-lenis-prevent and overscroll-contain) */}
          <div 
            className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-6"
            data-lenis-prevent
          >

            {/* Step 1 Form: Scoping Details */}
            {step === 1 && !isReviewingStep1 && (
              <form onSubmit={(e) => { e.preventDefault(); setIsReviewingStep1(true); }} className="space-y-4">
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

            {/* Step 1 Checkpoint: Explicit Confirmation of Scoping Details */}
            {step === 1 && isReviewingStep1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-[#181510] border border-[#C7A86D]/50 text-left space-y-3.5 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#C7A86D]/20 pb-2.5">
                    <div className="flex items-center gap-2 text-[#E5C788] font-semibold text-xs uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 text-[#C7A86D]" />
                      <span>Step 1 Confirmation: Review Scoping Details</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Verification Checkpoint</span>
                  </div>

                  <p className="text-xs text-slate-300 font-light">
                    Please confirm that your scoping parameters are accurate before proceeding to the availability calendar:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-black/60 p-3.5 rounded-xl border border-white/5 text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-mono">Executive:</span>
                      <strong className="text-white">{formData.fullName || 'Candidate'}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-mono">Corporate Email:</span>
                      <strong className="text-[#E5C788]">{formData.businessEmail}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-mono">Organization:</span>
                      <span className="text-white">{formData.companyName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-mono">Selected Solution:</span>
                      <span className="text-[#C7A86D]">{selectedServiceObj.title}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-mono">Revenue Band:</span>
                      <span className="text-white">{formData.currentRevenue}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-mono">Website / LinkedIn:</span>
                      <span className="text-slate-300 truncate block">{formData.website || 'N/A'}</span>
                    </div>
                  </div>

                  {formData.notes && (
                    <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 text-xs">
                      <span className="text-[10px] uppercase text-slate-400 block font-mono">Operational Focus:</span>
                      <span className="text-slate-300">{formData.notes}</span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setIsReviewingStep1(false)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Edit Scoping Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsReviewingStep1(false);
                        setStep(2);
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C7A86D]/20 hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Confirm Details & Select Slots</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Scheduling (3-Slot Proposal or Instant Calendly) */}
            {step === 2 && !isConfirmingSlots && (
              <div className="space-y-5 animate-fadeIn">
                {/* Mode Selector & Timezone Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#141414] border border-[#C7A86D]/25">
                  {/* Mode switcher tabs */}
                  <div className="flex items-center gap-1.5 p-1 bg-black/50 rounded-xl border border-white/5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setBookingMode('instant_calendly')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                        bookingMode === 'instant_calendly'
                          ? 'bg-[#C7A86D] text-black font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Instant Calendly Sync (Live Confirmation)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingMode('propose_slots')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                        bookingMode === 'propose_slots'
                          ? 'bg-[#C7A86D] text-black font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Propose 3 Slots (Owner Review)</span>
                    </button>
                  </div>

                  {/* Timezone picker */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <Globe className="w-3.5 h-3.5 text-[#C7A86D] shrink-0" />
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">TZ:</span>
                    <select
                      value={selectedTimezone}
                      onChange={(e) => setSelectedTimezone(e.target.value)}
                      className="bg-black/60 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-[#E5C788] focus:outline-none focus:border-[#C7A86D] cursor-pointer"
                    >
                      {TIMEZONE_OPTIONS.map((tz) => (
                        <option key={tz.value} value={tz.value} className="bg-[#141414] text-white">
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sub-view A: Propose 3 Slots */}
                {bookingMode === 'propose_slots' && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-[#C7A86D]/10 border border-[#C7A86D]/25 text-xs text-slate-300 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#C7A86D] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Owner Decision Protocol:</strong> Please provide 3 convenient time windows. These will be forwarded directly to the owner (<strong className="text-[#E5C788]">{COMPANY_CONTACT_DETAILS.ownerEmail}</strong>). The owner selects one of your 3 slots and grants booking permission, and both parties immediately receive the official calendar invite & meeting credentials.
                      </div>
                    </div>

                    {/* 3 Slot Input Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      {proposedSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="p-4 rounded-2xl bg-[#141414] border border-white/10 hover:border-[#C7A86D]/40 transition-colors space-y-3 relative overflow-hidden"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold tracking-wider uppercase text-[#C7A86D] flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Slot {slot.id}
                            </span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 font-mono">
                              {slot.id === 1 ? 'Primary' : slot.id === 2 ? 'Backup 1' : 'Backup 2'}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                                Date
                              </label>
                              <input
                                type="date"
                                value={slot.date}
                                onChange={(e) => handleSlotChange(slot.id, 'date', e.target.value)}
                                className="w-full bg-black/60 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C7A86D]"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                                Time ({tzLabel})
                              </label>
                              <select
                                value={slot.time}
                                onChange={(e) => handleSlotChange(slot.id, 'time', e.target.value)}
                                className="w-full bg-black/60 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C7A86D]"
                              >
                                {TIME_SLOT_OPTIONS.map((timeOpt) => (
                                  <option key={timeOpt} value={timeOpt} className="bg-[#141414] text-white">
                                    {timeOpt}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        ← Back to Scoping
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsConfirmingSlots(true)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C7A86D]/25 hover:brightness-110 cursor-pointer"
                      >
                        <span>Submit 3 Slots for Owner Review</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Sub-view B: Instant Calendly */}
                {bookingMode === 'instant_calendly' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-[#141414] border border-[#C7A86D]/20 text-xs">
                      <div className="flex items-center gap-2 text-stone-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        <span>Owner Live Calendar Sync • Formatted for <strong>{tzLabel}</strong></span>
                      </div>
                      <a
                        href={getCalendlyUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] text-[#C7A86D] hover:text-[#E5C788] underline underline-offset-2 shrink-0 font-medium"
                      >
                        <span>Open in new tab</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Embedded Calendly Frame */}
                    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0E0E0E] relative shadow-inner">
                      <iframe
                        src={getCalendlyUrl()}
                        width="100%"
                        height="620"
                        frameBorder="0"
                        title="Owner Calendly Scheduling"
                        className="w-full bg-[#0E0E0E]"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        ← Back to Scoping
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C7A86D]/25 hover:brightness-110 cursor-pointer"
                      >
                        <span>I've Scheduled on Calendly</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2 Checkpoint: Explicit Confirmation of the 3 Selected Slots */}
            {step === 2 && isConfirmingSlots && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-[#181510] border border-[#C7A86D]/50 text-left space-y-3.5 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#C7A86D]/20 pb-2.5">
                    <div className="flex items-center gap-2 text-[#E5C788] font-semibold text-xs uppercase tracking-wider">
                      <CalendarCheck className="w-4 h-4 text-[#C7A86D]" />
                      <span>Step 2 Confirmation: Confirm 3 Availability Windows ({tzLabel})</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Dispatch Checkpoint</span>
                  </div>

                  <p className="text-xs text-slate-300 font-light">
                    Are you ready to send these 3 proposed consultation times to the owner (<strong className="text-[#E5C788]">{COMPANY_CONTACT_DETAILS.ownerEmail}</strong>) for review and permission approval?
                  </p>

                  <div className="space-y-2 bg-black/60 p-3.5 rounded-xl border border-white/5 text-xs">
                    {proposedSlots.map((slot) => (
                      <div key={slot.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                        <span className="flex items-center gap-2 font-mono">
                          <span className="w-5 h-5 rounded-full bg-[#C7A86D]/20 text-[#E5C788] flex items-center justify-center text-[10px] font-bold">
                            {slot.id}
                          </span>
                          <span className="text-white">{slot.date}</span>
                          <span className="text-slate-400">at</span>
                          <strong className="text-[#E5C788]">{slot.time}</strong>
                          <span className="text-slate-500 font-sans text-[10px]">({tzLabel})</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                          {slot.id === 1 ? 'Primary Preference' : `Alternative ${slot.id - 1}`}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-300 space-y-1">
                    <div><strong>Recipient:</strong> {COMPANY_CONTACT_DETAILS.ownerEmail}</div>
                    <div><strong>Calendly Account:</strong> {COMPANY_CONTACT_DETAILS.calendlyUrl}</div>
                    <div><strong>Client / Candidate:</strong> {formData.fullName} ({formData.businessEmail})</div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setIsConfirmingSlots(false)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Modify Proposed Slots</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsConfirmingSlots(false);
                        setStep(3);
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C7A86D]/20 hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Yes, Confirm & Send to Owner</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Success Confirmation & Interactive Owner Action */}
            {step === 3 && (
              <div className="py-2 text-center space-y-6 animate-fadeIn">
                {/* Status Icon */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto transition-all ${
                  ownerDecisionStatus === 'confirmed'
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400'
                    : ownerDecisionStatus === 'declined'
                    ? 'bg-rose-500/15 border border-rose-500/40 text-rose-400'
                    : 'bg-[#C7A86D]/15 border border-[#C7A86D]/40 text-[#C7A86D]'
                }`}>
                  {ownerDecisionStatus === 'confirmed' ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : ownerDecisionStatus === 'declined' ? (
                    <XCircle className="w-7 h-7" />
                  ) : (
                    <Clock className="w-7 h-7 animate-pulse" />
                  )}
                </div>

                {/* Status Heading */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-2 border">
                    {ownerDecisionStatus === 'confirmed' ? (
                      <span className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" /> Status: Schedule Confirmed & Authorized by Owner
                      </span>
                    ) : ownerDecisionStatus === 'declined' ? (
                      <span className="bg-rose-500/20 text-rose-300 border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <X className="w-3 h-3" /> Status: Schedule Proposal Declined
                      </span>
                    ) : (
                      <span className="bg-[#C7A86D]/20 text-[#E5C788] border-[#C7A86D]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Status: Transmitted • Awaiting Owner Permission
                      </span>
                    )}
                  </div>

                  <h4 className="text-2xl font-serif text-white">
                    {ownerDecisionStatus === 'confirmed'
                      ? 'Meeting Officially Confirmed!'
                      : ownerDecisionStatus === 'declined'
                      ? 'Schedule Request Declined'
                      : bookingMode === 'propose_slots'
                      ? '3 Availability Windows Transmitted to Owner'
                      : 'Discovery Diagnostic Reserved'}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-light max-w-lg mx-auto leading-relaxed">
                    {ownerDecisionStatus === 'confirmed'
                      ? `The meeting is locked for ${currentSlot.date} at ${currentSlot.time} (${tzLabel}). Calendar invites have been prepared for ${formData.businessEmail || 'candidate'} and ${COMPANY_CONTACT_DETAILS.ownerEmail}.`
                      : ownerDecisionStatus === 'declined'
                      ? 'The owner was unable to accept these 3 time slots and has requested new availability windows.'
                      : bookingMode === 'propose_slots'
                      ? `Your 3 candidate slots have been submitted to the owner (${COMPANY_CONTACT_DETAILS.ownerEmail}). Review the decision console below to approve or decline the schedule.`
                      : "Your session is coordinated directly with the owner's Calendly. A calendar invitation and video link have been dispatched to your email."}
                  </p>
                </div>

                {/* Candidate & Request Overview Card */}
                <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 text-left text-xs space-y-2.5 max-w-lg mx-auto shadow-md">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-400">Organization:</span>
                    <span className="text-white font-medium">{formData.companyName || 'Corporate Client'}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-400">Candidate / Executive:</span>
                    <span className="text-white font-medium">{formData.fullName || 'Lead Executive'} ({formData.businessEmail || 'email@company.com'})</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-400">Timezone:</span>
                    <span className="text-[#C7A86D] font-mono">{TIMEZONE_OPTIONS.find(t => t.value === selectedTimezone)?.label}</span>
                  </div>

                  {bookingMode === 'propose_slots' && (
                    <div className="pt-1 space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                        Proposed Candidate Slots:
                      </span>
                      {proposedSlots.map((slot) => {
                        const isConfirmed = ownerDecisionStatus === 'confirmed' && selectedSlotForDecision === slot.id;
                        return (
                          <div
                            key={slot.id}
                            className={`p-2 rounded-xl border text-[11px] flex items-center justify-between transition-all ${
                              isConfirmed
                                ? 'bg-emerald-950/50 border-emerald-500/70 text-emerald-200 shadow-sm'
                                : 'bg-black/40 border-white/5 text-slate-300'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                isConfirmed ? 'bg-emerald-400 text-black' : 'bg-white/10 text-slate-300'
                              }`}>
                                {slot.id}
                              </span>
                              <span className="font-mono">{slot.date} at {slot.time}</span>
                            </span>
                            {isConfirmed ? (
                              <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                                <Check className="w-3 h-3" /> Selected Slot
                              </span>
                            ) : (
                              <span className="text-[9px] text-slate-500 uppercase tracking-wider">
                                {slot.id === 1 ? 'Primary' : 'Alternative'}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* THE OWNER DECISION CONSOLE */}
                {bookingMode === 'propose_slots' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1C1812] to-[#121212] border border-[#C7A86D]/40 text-left text-xs space-y-4 max-w-lg mx-auto shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <div className="flex items-center gap-2 text-[#C7A86D] font-semibold uppercase tracking-wider text-[11px]">
                        <UserCheck className="w-4 h-4 text-[#C7A86D]" />
                        <span>Owner Decision & Permission Console</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#C7A86D]/20 text-[#E5C788] font-mono">
                        {COMPANY_CONTACT_DETAILS.ownerEmail}
                      </span>
                    </div>

                    {/* Owner Calendly Live Availability Portal Link */}
                    <div className="p-3 rounded-xl bg-black/60 border border-[#C7A86D]/25 flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-wider text-[#C7A86D] font-semibold block flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Owner Calendly System
                        </span>
                        <span className="text-[11px] text-slate-300 font-mono">calendly.com/udayzayn/meetings</span>
                      </div>
                      <a
                        href={COMPANY_CONTACT_DETAILS.calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#C7A86D]/20 hover:bg-[#C7A86D]/30 border border-[#C7A86D]/40 text-[#E5C788] text-[11px] font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                      >
                        <span>Verify / Block</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* STATE 1: PENDING DECISION (Owner picks which slot to accept or decline) */}
                    {ownerDecisionStatus === 'pending' && (
                      <div className="space-y-3">
                        <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                          As the owner (<strong className="text-white">{COMPANY_CONTACT_DETAILS.ownerEmail}</strong>), select which candidate slot you wish to approve and grant booking permission for:
                        </p>

                        <div className="space-y-2">
                          {proposedSlots.map((slot) => (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => {
                                setSelectedSlotForDecision(slot.id);
                                setOwnerDecisionStatus('confirming');
                                setOwnerPermissionGranted(false);
                              }}
                              className="w-full p-2.5 rounded-xl border border-white/10 bg-black/50 text-slate-300 hover:border-[#C7A86D] hover:bg-[#C7A86D]/10 hover:text-white transition-all flex items-center justify-between cursor-pointer group"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-[#C7A86D]/20 text-[#C7A86D] group-hover:bg-[#C7A86D] group-hover:text-black transition-colors">
                                  {slot.id}
                                </span>
                                <span>Slot {slot.id}: <strong>{slot.date} at {slot.time}</strong> ({tzLabel})</span>
                              </div>
                              <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-white/5 text-[#E5C788] group-hover:bg-[#C7A86D] group-hover:text-black transition-all flex items-center gap-1">
                                <span>Review & Permit</span>
                                <ChevronRight className="w-3 h-3" />
                              </span>
                            </button>
                          ))}
                        </div>

                        <div className="pt-1 text-center">
                          <button
                            type="button"
                            onClick={() => setOwnerDecisionStatus('declined')}
                            className="text-[11px] text-rose-400/80 hover:text-rose-300 underline underline-offset-2 transition-colors cursor-pointer"
                          >
                            Decline All Proposed Slots & Request New Times
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STATE 2: CONFIRMING DIALOG (Explicit Owner Permission & Send Schedule Confirmation) */}
                    {ownerDecisionStatus === 'confirming' && (
                      <div className="p-4 rounded-xl bg-[#231E16] border border-[#C7A86D]/60 space-y-3.5 animate-fadeIn">
                        <div className="flex items-center gap-2 text-[#E5C788] font-semibold text-xs">
                          <Lock className="w-4 h-4 text-[#C7A86D]" />
                          <span>Owner Authorization & Permission Checkpoint</span>
                        </div>

                        <div className="p-3 rounded-lg bg-black/60 border border-white/5 text-[11px] text-slate-300 space-y-1.5 font-mono">
                          <div><strong>Selected Slot {currentSlot.id}:</strong> {currentSlot.date} at {currentSlot.time} ({tzLabel})</div>
                          <div><strong>Candidate:</strong> {formData.fullName || 'Candidate'} ({formData.businessEmail || 'Email'})</div>
                          <div><strong>Owner Account:</strong> {COMPANY_CONTACT_DETAILS.ownerEmail}</div>
                          <div><strong>Calendly Account:</strong> {COMPANY_CONTACT_DETAILS.calendlyUrl}</div>
                          <div><strong>Video Link:</strong> Google Meet (https://meet.google.com/vit-arch-call)</div>
                        </div>

                        {/* Explicit Owner Permission Toggle */}
                        <div 
                          onClick={() => setOwnerPermissionGranted(!ownerPermissionGranted)}
                          className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-colors ${
                            ownerPermissionGranted 
                              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200' 
                              : 'bg-black/50 border-white/10 text-slate-300 hover:border-[#C7A86D]/50'
                          }`}
                        >
                          <div className="mt-0.5 text-[#C7A86D]">
                            {ownerPermissionGranted ? (
                              <CheckSquare className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                          <div className="text-xs space-y-0.5">
                            <span className="font-semibold block text-white">Grant Owner Permission</span>
                            <span className="text-[11px] text-slate-400 font-light block">
                              I authorize this meeting time on my schedule and permit sending official calendar invites and notifications to both inboxes.
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            disabled={!ownerPermissionGranted || isSending}
                            onClick={handleConfirmSchedule}
                            className={`flex-1 py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                              ownerPermissionGranted && !isSending
                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black shadow-emerald-500/20'
                                : 'bg-white/10 text-slate-500 border border-white/5 cursor-not-allowed'
                            }`}
                          >
                            {isSending ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Sending Schedule...</span>
                              </>
                            ) : (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Grant Permission & Send Schedule</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setOwnerDecisionStatus('pending');
                              setSelectedSlotForDecision(null);
                              setOwnerPermissionGranted(false);
                            }}
                            className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STATE 3: CONFIRMED SUCCESS (Official confirmation actions) */}
                    {ownerDecisionStatus === 'confirmed' && (
                      <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs space-y-3 animate-fadeIn">
                        <div className="flex items-center gap-2 font-semibold text-emerald-300 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Schedule Confirmed for {currentSlot.date} at {currentSlot.time} ({tzLabel})</span>
                        </div>

                        <p className="text-[11px] text-emerald-100/90 font-light leading-relaxed">
                          The schedule has been authorized and locked. Both <strong>{COMPANY_CONTACT_DETAILS.ownerEmail}</strong> and <strong>{formData.businessEmail || 'candidate'}</strong> have been notified.
                        </p>

                        {/* Calendar & Email Actions */}
                        <div className="pt-2 flex flex-col sm:flex-row gap-2">
                          <a
                            href={getCalendlyUrl(currentSlot.date)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs hover:brightness-110 transition-all shadow-md"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Lock on Calendly (Creates Real Event)</span>
                          </a>

                          <a
                            href={`mailto:${formData.businessEmail || 'candidate@company.com'}?cc=${COMPANY_CONTACT_DETAILS.ownerEmail}&subject=${encodeURIComponent(`Confirmed: Vittoris AI Architecture Consultation - ${formData.companyName || 'Corporate Client'}`)}&body=${encodeURIComponent(`Hi ${formData.fullName || 'there'},\n\nYour discovery meeting with Vittoris has been confirmed:\n\nDate & Time: ${currentSlot.date} at ${currentSlot.time} (${tzLabel})\nMeeting Link: https://meet.google.com/vit-arch-call\n\nLooking forward to our session.\n\nBest regards,\nUday | Vittoris Systems\n${COMPANY_CONTACT_DETAILS.ownerEmail}`)}`}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors shadow-sm"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Send Notification Email</span>
                          </a>

                          <a
                            href={getGoogleCalendarUrl(currentSlot)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
                          >
                            <CalendarPlus className="w-3.5 h-3.5 text-[#E5C788]" />
                            <span>Add to Google Cal</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDownloadIcs(currentSlot)}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>.ICS File</span>
                          </button>
                        </div>

                        {/* Calendly Automated Notification Note */}
                        <div className="p-3 rounded-xl bg-black/60 border border-[#C7A86D]/30 text-[11px] text-slate-300 space-y-1 text-left">
                          <div className="flex items-center gap-1.5 text-[#E5C788] font-semibold text-[10px] uppercase tracking-wider">
                            <AlertCircle className="w-3.5 h-3.5 text-[#C7A86D]" />
                            <span>How Calendly Automated Notifications Work:</span>
                          </div>
                          <p className="font-light text-slate-300 leading-relaxed">
                            Calendly's servers only generate automatic emails to <strong>{COMPANY_CONTACT_DETAILS.ownerEmail}</strong> when an appointment is booked through their booking system. Click <strong>"Lock on Calendly"</strong> above to register the event in 1 click, or click <strong>"Send Notification Email"</strong> to dispatch the confirmation directly.
                          </p>
                        </div>

                        <div className="pt-1 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setOwnerDecisionStatus('pending');
                              setSelectedSlotForDecision(null);
                              setOwnerPermissionGranted(false);
                            }}
                            className="text-[10px] text-emerald-300/70 hover:text-emerald-200 underline transition-colors cursor-pointer"
                          >
                            Change Selection / Re-test
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STATE 4: DECLINED */}
                    {ownerDecisionStatus === 'declined' && (
                      <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs space-y-2.5 animate-fadeIn">
                        <div className="flex items-center gap-1.5 font-semibold text-rose-300">
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span>Schedule Proposal Declined</span>
                        </div>
                        <p className="text-[11px] text-rose-100/90 font-light">
                          Candidate has been notified that these slots cannot be accommodated.
                        </p>
                        <button
                          type="button"
                          onClick={() => setOwnerDecisionStatus('pending')}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] transition-colors cursor-pointer"
                        >
                          Pick a Slot Instead
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Instant Calendly Confirmation Actions */}
                {bookingMode === 'instant_calendly' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#121915] to-[#121212] border border-emerald-500/40 text-left text-xs space-y-3.5 max-w-lg mx-auto shadow-xl animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <div className="flex items-center gap-2 text-emerald-300 font-semibold uppercase tracking-wider text-[11px]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Direct Calendly Event Synced</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                        calendly.com/udayzayn/meetings
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                      Your appointment has been registered directly on Uday's Calendly calendar. Calendly has dispatched the official confirmation email with Google Meet access credentials to <strong>{formData.businessEmail || 'candidate'}</strong> and <strong>{COMPANY_CONTACT_DETAILS.ownerEmail}</strong>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <a
                        href={COMPANY_CONTACT_DETAILS.calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View on Calendly</span>
                      </a>

                      <a
                        href={`mailto:${formData.businessEmail || 'candidate@company.com'}?cc=${COMPANY_CONTACT_DETAILS.ownerEmail}&subject=${encodeURIComponent(`Confirmed: Vittoris AI Architecture Consultation - ${formData.companyName || 'Corporate Client'}`)}&body=${encodeURIComponent(`Hi ${formData.fullName || 'there'},\n\nYour discovery session with Uday (Vittoris Systems) is scheduled through Calendly.\n\nOwner: ${COMPANY_CONTACT_DETAILS.ownerEmail}\nCalendly: ${COMPANY_CONTACT_DETAILS.calendlyUrl}\n\nLooking forward to meeting with you!`)}`}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Follow-up Email</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Return to Platform */}
                <div className="pt-2 pb-2">
                  <button
                    onClick={handleResetAndClose}
                    className="px-7 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer shadow-md"
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

