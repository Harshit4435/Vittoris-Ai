import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Building, Mail, User, Globe, FileText, 
  ExternalLink, Calendar, Clock, Check, Send, AlertCircle, XCircle, 
  Download, CalendarPlus, Lock, CalendarCheck, AlertTriangle
} from 'lucide-react';
import { VITTORIS_SERVICES, COMPANY_CONTACT_DETAILS } from '../../data/vittorisData';
import { 
  createMeetingRequest, 
  getMeetingRequests, 
  isSlotLocked, 
  getSlotLockDetails, 
  validateProposedSlots, 
  subscribeMeetingUpdates 
} from '../../utils/meetingScheduler';
import type { MeetingSlot, MeetingRequest } from '../../utils/meetingScheduler';
import { sendMeetingRequestEmails } from '../../utils/emailService';
import type { EmailDispatchResult } from '../../utils/emailService';

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

const getFutureDate = (daysAhead: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

interface DiscoveryCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceSlug?: string;
  initialClientData?: {
    fullName?: string;
    businessEmail?: string;
    companyName?: string;
  };
}

export const DiscoveryCallModal: React.FC<DiscoveryCallModalProps> = ({
  isOpen,
  onClose,
  initialServiceSlug,
  initialClientData,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isReviewingStep1, setIsReviewingStep1] = useState(false);
  const [isConfirmingSlots, setIsConfirmingSlots] = useState(false);
  const [bookingMode, setBookingMode] = useState<'propose_slots' | 'instant_calendly'>('propose_slots');
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    COMPANY_CONTACT_DETAILS.defaultTimezone || 'America/New_York'
  );

  // 3 distinct candidate slots
  const [proposedSlots, setProposedSlots] = useState<MeetingSlot[]>([
    { id: 1, label: 'Slot 1 (Primary Preference)', date: getFutureDate(2), time: '10:00 AM' },
    { id: 2, label: 'Slot 2 (Alternative 1)', date: getFutureDate(3), time: '02:00 PM' },
    { id: 3, label: 'Slot 3 (Alternative 2)', date: getFutureDate(5), time: '11:30 AM' },
  ]);

  // Request & Schedule State
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  const [activeRequest, setActiveRequest] = useState<MeetingRequest | null>(null);
  const [, setScheduleTick] = useState<number>(0);
  const [slotValidationError, setSlotValidationError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [emailResult, setEmailResult] = useState<EmailDispatchResult | null>(null);

  const [formData, setFormData] = useState({
    fullName: initialClientData?.fullName || '',
    businessEmail: initialClientData?.businessEmail || '',
    companyName: initialClientData?.companyName || '',
    website: '',
    selectedService: initialServiceSlug || 'pay-per-appointment',
    currentRevenue: '$50k - $250k / mo',
    primaryGoal: 'Scale Qualified Appointments',
    preferredChannel: 'Email',
    phone: '',
    notes: '',
  });

  // Sync locked slots and active request updates when schedule changes
  useEffect(() => {
    const unsub = subscribeMeetingUpdates(() => {
      setScheduleTick(t => t + 1);
      if (currentRequestId) {
        const allReqs = getMeetingRequests();
        const match = allReqs.find(r => r.id === currentRequestId);
        if (match) {
          setActiveRequest(match);
        }
      }
    });
    return () => unsub();
  }, [currentRequestId]);

  const handleSlotChange = (id: number, field: 'date' | 'time', value: string) => {
    setSlotValidationError(null);
    setProposedSlots(prev =>
      prev.map(slot => (slot.id === id ? { ...slot, [field]: value } : slot))
    );
  };

  const getCalendlyUrl = (specificDate?: string) => {
    const raw = COMPANY_CONTACT_DETAILS.calendlyUrl || 'https://calendly.com/tharshit2257/meetings';
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
    setCurrentRequestId(null);
    setActiveRequest(null);
    setSlotValidationError(null);
    setIsSending(false);
    setEmailResult(null);
    onClose();
  };

  // Helper variables
  const tzLabel = TIMEZONE_OPTIONS.find(t => t.value === selectedTimezone)?.label.split('—')[0].trim() || 'EST';
  const selectedServiceObj = VITTORIS_SERVICES.find(s => s.slug === formData.selectedService) || VITTORIS_SERVICES[0];

  // Validate slots before proceeding to checkpoint
  const handleProceedToSlotConfirm = () => {
    const val = validateProposedSlots(proposedSlots);
    if (!val.isValid) {
      setSlotValidationError(val.error || 'Please resolve slot conflicts before proceeding.');
      return;
    }
    setSlotValidationError(null);
    setIsConfirmingSlots(true);
  };

  // Submit request to company admin and dispatch EmailJS emails
  const handleDispatchThreeSlots = async () => {
    const val = validateProposedSlots(proposedSlots);
    if (!val.isValid) {
      setSlotValidationError(val.error || 'Please resolve slot conflicts before submitting.');
      setIsConfirmingSlots(false);
      return;
    }

    setSlotValidationError(null);
    setIsConfirmingSlots(false);
    setIsSending(true);

    const newReq = createMeetingRequest({
      client: formData,
      timezone: selectedTimezone,
      timezoneLabel: tzLabel,
      proposedSlots: proposedSlots,
    });

    setCurrentRequestId(newReq.id);
    setActiveRequest(newReq);
    setIsSending(false);
    setStep(3);

    // Asynchronously dispatch EmailJS emails (owner & client)
    try {
      const emailRes = await sendMeetingRequestEmails(newReq);
      setEmailResult(emailRes);
    } catch (err) {
      console.warn('Email dispatch encounter:', err);
    }
  };

  // Calendar Helpers
  const confirmedSlot = activeRequest?.approvedSlot || proposedSlots[0];
  const isApproved = activeRequest?.status === 'approved';
  const isDeclined = activeRequest?.status === 'declined';

  const getGoogleCalendarUrl = (slot: MeetingSlot) => {
    const title = `Confirmed: Vittoris AI Consultation - ${formData.companyName || 'Executive Session'}`;
    const details = `Confirmed AI Diagnostic Consultation with ${formData.fullName || 'Candidate'}.\n\nConfirmed Slot: ${slot.date} at ${slot.time} (${tzLabel})\nPlatform: Google Meet (${activeRequest?.googleMeetLink || 'https://meet.google.com/vit-session-call'})\nCompany Admin: ${COMPANY_CONTACT_DETAILS.ownerEmail}\nClient Email: ${formData.businessEmail}\nDouble-Booking Status: Exclusively Locked on Master Calendar`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent('Google Meet')}`;
  };

  const handleDownloadIcs = (slot: MeetingSlot) => {
    const title = `Vittoris Consultation - ${formData.companyName || 'Client'}`;
    const description = `Vittoris AI Architecture Consultation with ${formData.fullName || 'Candidate'}.\nConfirmed Time: ${slot.date} at ${slot.time} (${tzLabel}).\nGoogle Meet: ${activeRequest?.googleMeetLink || 'https://meet.google.com/vit-session-call'}\nCompany Admin: ${COMPANY_CONTACT_DETAILS.ownerEmail}\nLocked: Exclusive Session`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Vittoris//AI Consultation//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      'LOCATION:Google Meet',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vittoris-meeting-${slot.date}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

        {/* Modal Window */}
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
                Choose 3 preferred time slots. Company leadership verifies calendar availability to prevent double-booking, then confirms and locks your session.
              </p>
            </div>

            {/* Stepper indicators */}
            <div className="flex items-center justify-between pt-1">
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider font-semibold ${step >= 1 ? 'text-[#C7A86D]' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step >= 1 ? 'bg-[#C7A86D] text-black font-bold' : 'bg-white/5 text-slate-400'}`}>1</span>
                <span>1. Scoping</span>
              </div>
              <div className="h-[1px] w-8 sm:w-16 bg-white/10" />
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider font-semibold ${step >= 2 ? 'text-[#C7A86D]' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step >= 2 ? 'bg-[#C7A86D] text-black font-bold' : 'bg-white/5 text-slate-400'}`}>2</span>
                <span>2. Choose 3 Slots</span>
              </div>
              <div className="h-[1px] w-8 sm:w-16 bg-white/10" />
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider font-semibold ${step === 3 ? 'text-[#C7A86D]' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step === 3 ? 'bg-[#C7A86D] text-black font-bold' : 'bg-white/5 text-slate-400'}`}>3</span>
                <span>3. Request Dispatched</span>
              </div>
            </div>
          </div>

          {/* Scrollable Modal Content */}
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
                      placeholder="e.g., Need bespoke pay-per-meeting acquisition system and AI document ingestion pipeline."
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
                    <span>Proceed to 3-Slot Selection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 1 Checkpoint: Review Scoping Details */}
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
                    Please confirm that your scoping parameters are accurate before proceeding to the 3-slot availability selection:
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
                      <span>Confirm & Choose 3 Slots</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Choose 3 Time Slots (Company Admin Permission Flow) */}
            {step === 2 && !isConfirmingSlots && (
              <div className="space-y-5 animate-fadeIn">
                {/* Mode Selector & Timezone Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#141414] border border-[#C7A86D]/25">
                  {/* Mode switcher tabs */}
                  <div className="flex items-center gap-1.5 p-1 bg-black/50 rounded-xl border border-white/5 text-[11px]">
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
                      <span>Choose 3 Slots (Owner Review & Calendar Lock)</span>
                    </button>
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
                      <span>Direct Calendly</span>
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
                    <div className="p-3.5 rounded-xl bg-[#C7A86D]/10 border border-[#C7A86D]/25 text-xs text-slate-300 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#C7A86D] shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="text-white">Double-Booking Prevention Protocol:</strong> Please select <strong>3 distinct time windows</strong>. These slots will be transmitted directly to the company owner (<strong className="text-[#E5C788]">{COMPANY_CONTACT_DETAILS.ownerEmail}</strong>) via automated email. Once the owner approves 1 slot, that exact time is locked on the master calendar so <strong>no other interview will be scheduled</strong> during that time.
                      </div>
                    </div>

                    {/* Validation Error Banner */}
                    {slotValidationError && (
                      <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/60 text-rose-200 text-xs flex items-center gap-2.5 animate-fadeIn">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{slotValidationError}</span>
                      </div>
                    )}

                    {/* 3 Slot Selection Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      {proposedSlots.map((slot) => {
                        const isConflict = isSlotLocked(slot.date, slot.time);
                        const lockInfo = isConflict ? getSlotLockDetails(slot.date, slot.time) : undefined;

                        return (
                          <div
                            key={slot.id}
                            className={`p-4 rounded-2xl bg-[#141414] border transition-colors space-y-3 relative overflow-hidden ${
                              isConflict
                                ? 'border-rose-500/70 bg-rose-950/20'
                                : 'border-white/10 hover:border-[#C7A86D]/40'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-semibold tracking-wider uppercase text-[#C7A86D] flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Slot {slot.id}
                              </span>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 font-mono">
                                {slot.id === 1 ? 'Primary Preference' : slot.id === 2 ? 'Backup 1' : 'Backup 2'}
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
                                  {TIME_SLOT_OPTIONS.map((timeOpt) => {
                                    const optionLocked = isSlotLocked(slot.date, timeOpt);
                                    return (
                                      <option 
                                        key={timeOpt} 
                                        value={timeOpt} 
                                        className={optionLocked ? 'bg-[#2A1010] text-rose-300' : 'bg-[#141414] text-white'}
                                      >
                                        {timeOpt} {optionLocked ? '(Locked by Interview)' : ''}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>

                            {/* Collision Alert Indicator */}
                            {isConflict ? (
                              <div className="p-2 rounded-lg bg-rose-950/70 border border-rose-500/50 text-[10px] text-rose-200 space-y-0.5">
                                <div className="font-semibold flex items-center gap-1 text-rose-300">
                                  <Lock className="w-3 h-3 text-rose-400" />
                                  <span>Slot Unavailable</span>
                                </div>
                                <div>
                                  Confirmed interview already locked {lockInfo?.companyName ? `for ${lockInfo.companyName}` : ''}. Please pick another time.
                                </div>
                              </div>
                            ) : (
                              <div className="text-[10px] text-emerald-400/80 font-mono flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                <span>Window currently available</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
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
                        onClick={handleProceedToSlotConfirm}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C7A86D]/25 hover:brightness-110 cursor-pointer"
                      >
                        <span>Review & Submit 3 Slots</span>
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
                        <span>Admin Live Calendar Sync • Formatted for <strong>{tzLabel}</strong></span>
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

            {/* Step 2 Checkpoint: Confirm the 3 Selected Slots */}
            {step === 2 && isConfirmingSlots && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-[#181510] border border-[#C7A86D]/50 text-left space-y-3.5 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#C7A86D]/20 pb-2.5">
                    <div className="flex items-center gap-2 text-[#E5C788] font-semibold text-xs uppercase tracking-wider">
                      <CalendarCheck className="w-4 h-4 text-[#C7A86D]" />
                      <span>Step 2 Confirmation: Confirm 3 Availability Windows ({tzLabel})</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Transmission Checkpoint</span>
                  </div>

                  <p className="text-xs text-slate-300 font-light">
                    You are transmitting these 3 proposed consultation times to company leadership (<strong className="text-[#E5C788]">{COMPANY_CONTACT_DETAILS.ownerEmail}</strong>) via automated email dispatch:
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
                    <div><strong>Notification Target:</strong> {COMPANY_CONTACT_DETAILS.ownerEmail} & {COMPANY_CONTACT_DETAILS.companyEmail}</div>
                    <div><strong>Client / Organization:</strong> {formData.fullName} • {formData.companyName} ({formData.businessEmail})</div>
                    <div><strong>Automated Email:</strong> Dispatched via EmailJS to company and candidate inboxes.</div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setIsConfirmingSlots(false)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Modify Slots</span>
                    </button>

                    <button
                      type="button"
                      disabled={isSending}
                      onClick={handleDispatchThreeSlots}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C7A86D]/20 hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Yes, Transmit 3 Slots to Company Leadership</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Success Confirmation (Client-Facing Receipt: Admin is NOT on this screen) */}
            {step === 3 && (
              <div className="py-2 text-center space-y-6 animate-fadeIn">
                {/* Status Icon */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto transition-all ${
                  isApproved
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400'
                    : isDeclined
                    ? 'bg-rose-500/15 border border-rose-500/40 text-rose-400'
                    : 'bg-[#C7A86D]/15 border border-[#C7A86D]/40 text-[#C7A86D]'
                }`}>
                  {isApproved ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : isDeclined ? (
                    <XCircle className="w-7 h-7" />
                  ) : (
                    <Clock className="w-7 h-7 animate-pulse" />
                  )}
                </div>

                {/* Status Heading */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-2 border">
                    {isApproved ? (
                      <span className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Status: Approved & Exclusively Locked on Master Calendar
                      </span>
                    ) : isDeclined ? (
                      <span className="bg-rose-500/20 text-rose-300 border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Status: Reschedule Requested by Leadership
                      </span>
                    ) : (
                      <span className="bg-[#C7A86D]/20 text-[#E5C788] border-[#C7A86D]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Status: Transmitted to Leadership • Awaiting Slot Review
                      </span>
                    )}
                  </div>

                  <h4 className="text-2xl font-serif text-white">
                    {isApproved
                      ? 'Consultation Officially Approved & Locked!'
                      : isDeclined
                      ? 'Reschedule Requested by Leadership'
                      : '3 Availability Windows Dispatched to Company Leadership'}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-light max-w-lg mx-auto leading-relaxed">
                    {isApproved
                      ? `Your session is locked for ${confirmedSlot.date} at ${confirmedSlot.time} (${tzLabel}). No other interview can be scheduled at this time. Calendar invites and meeting credentials have been generated.`
                      : isDeclined
                      ? `Leadership was unable to accommodate these 3 proposed slots. ${activeRequest?.adminNotes || 'Please propose alternative dates or times.'}`
                      : `Your 3 candidate slots have been submitted to company leadership (${COMPANY_CONTACT_DETAILS.ownerEmail}). An automated email notification with 1-click Approve / Ignore controls has been sent, and once approved, that exact time will be locked exclusively on the company master calendar.`}
                  </p>
                </div>

                {/* Candidate & Request Overview Card */}
                <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 text-left text-xs space-y-2.5 max-w-lg mx-auto shadow-md">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-400">Organization:</span>
                    <span className="text-white font-medium">{formData.companyName || 'Corporate Client'}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-400">Executive Contact:</span>
                    <span className="text-white font-medium">{formData.fullName || 'Lead Executive'} ({formData.businessEmail || 'email@company.com'})</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-400">Timezone:</span>
                    <span className="text-[#C7A86D] font-mono">{TIMEZONE_OPTIONS.find(t => t.value === selectedTimezone)?.label}</span>
                  </div>

                  <div className="pt-1 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                      Submitted Availability Windows:
                    </span>
                    {proposedSlots.map((slot) => {
                      const isThisSlotApproved = isApproved && activeRequest?.approvedSlotId === slot.id;
                      return (
                        <div
                          key={slot.id}
                          className={`p-2 rounded-xl border text-[11px] flex items-center justify-between transition-all ${
                            isThisSlotApproved
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-sm'
                              : 'bg-black/40 border-white/5 text-slate-300'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                              isThisSlotApproved ? 'bg-emerald-400 text-black' : 'bg-white/10 text-slate-300'
                            }`}>
                              {slot.id}
                            </span>
                            <span className="font-mono">{slot.date} at {slot.time}</span>
                          </span>

                          {isThisSlotApproved ? (
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Approved & Locked
                            </span>
                          ) : (
                            <span className="text-[9px] text-[#C7A86D] uppercase tracking-wider font-mono">
                              Awaiting Owner Review
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* EmailJS & Dispatch Confirmation Card (Client View) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#181510] to-[#121212] border border-[#C7A86D]/30 text-left text-xs space-y-3.5 max-w-lg mx-auto shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <div className="flex items-center gap-2 text-[#E5C788] font-semibold uppercase tracking-wider text-[11px]">
                      <Mail className="w-4 h-4 text-[#C7A86D]" />
                      <span>Email Transmission Status</span>
                    </div>
                    {emailResult?.ownerDispatched ? (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                        ✓ Dispatched via EmailJS
                      </span>
                    ) : (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                        Mail Ready (Manual Dispatch)
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-[11px] text-slate-300 font-light">
                    {emailResult?.ownerDispatched ? (
                      <>
                        <div className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <strong>Company Leadership Notified:</strong> Request transmitted to <strong>{COMPANY_CONTACT_DETAILS.ownerEmail}</strong> with 1-click Approve / Ignore controls.
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <strong>Candidate Receipt:</strong> Confirmation dispatched to <strong>{formData.businessEmail}</strong>.
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5 text-amber-200">
                        <div className="font-semibold text-xs flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Gmail Permission Scope Notice:</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-amber-300/90 font-light">
                          Your EmailJS Gmail service needs the <em>"Send email on your behalf"</em> scope enabled in the EmailJS dashboard. In the meantime, your request is ready to send in 1 click below:
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Double-Booking Guarantee Notice */}
                  <div className="p-2.5 rounded-xl bg-black/60 border border-[#C7A86D]/20 text-[11px] text-slate-300 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C7A86D] shrink-0 mt-0.5" />
                    <div>
                      <strong>Calendar Lock Guarantee:</strong> As soon as the owner approves 1 of your 3 slots, that window is immediately locked on the master calendar so <strong>no other interview will be scheduled</strong> during that time.
                    </div>
                  </div>

                  {/* Quick Action Buttons for Client */}
                  <div className="pt-1 flex flex-col sm:flex-row gap-2">
                    <a
                      href={COMPANY_CONTACT_DETAILS.calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#C7A86D]/20 hover:bg-[#C7A86D]/30 border border-[#C7A86D]/40 text-[#E5C788] text-xs font-semibold transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#C7A86D]" />
                      <span>Book Instantly on Calendly</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {emailResult?.mailtoOwnerUrl && (
                      <a
                        href={emailResult.mailtoOwnerUrl}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          !emailResult?.ownerDispatched
                            ? 'bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold shadow-[0_2px_15px_rgba(199,168,109,0.3)]'
                            : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300'
                        }`}
                      >
                        <Mail className={`w-3.5 h-3.5 ${!emailResult?.ownerDispatched ? 'text-black' : 'text-[#C7A86D]'}`} />
                        <span>{!emailResult?.ownerDispatched ? 'Send Email to Owner Now' : 'Open in Mail Client'}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* APPROVED DETAILS: Google Meet, Calendar, ICS (Shown once approved by owner) */}
                {isApproved && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#121915] to-[#121212] border border-emerald-500/50 text-left text-xs space-y-3.5 max-w-lg mx-auto shadow-xl animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <div className="flex items-center gap-2 text-emerald-300 font-semibold uppercase tracking-wider text-[11px]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Exclusive Meeting Time Confirmed & Locked</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                        Zero Double-Booking
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                      Confirmed for <strong>{confirmedSlot.date} at {confirmedSlot.time} ({tzLabel})</strong>. This session is locked on the master schedule for <strong>{formData.fullName || 'Candidate'}</strong> and <strong>{COMPANY_CONTACT_DETAILS.ownerEmail}</strong>.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={activeRequest?.googleMeetLink || 'https://meet.google.com/vit-session-call'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Join Google Meet</span>
                      </a>

                      <a
                        href={getGoogleCalendarUrl(confirmedSlot)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
                      >
                        <CalendarPlus className="w-3.5 h-3.5 text-[#E5C788]" />
                        <span>Add to Google Cal</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDownloadIcs(confirmedSlot)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>.ICS File</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* DECLINED NOTICE */}
                {isDeclined && (
                  <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-left text-xs space-y-3 max-w-lg mx-auto animate-fadeIn">
                    <div className="flex items-center gap-2 font-semibold text-rose-300">
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>Reschedule Notice from Leadership</span>
                    </div>
                    <p className="text-[11px] text-rose-100 font-light">
                      {activeRequest?.adminNotes || 'Executive leadership is engaged in closed-door sessions during these windows.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Choose 3 Different Slots</span>
                    </button>
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
