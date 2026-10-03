import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle2, ShieldCheck, UserCheck, Phone, Mail } from 'lucide-react';
import { Button } from '../common/Button';
import type { SolarOwner, SolarProject } from '../../types/solar';
import { ownersData } from '../../data/ownersData';

interface MeetOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetOwner?: SolarOwner;
  targetProject?: SolarProject;
}

export const MeetOwnerModal: React.FC<MeetOwnerModalProps> = ({
  isOpen,
  onClose,
  targetOwner,
  targetProject
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyType, setPropertyType] = useState('Luxury Villa / Estate');
  const [areaSqFt, setAreaSqFt] = useState('4,500');
  const [meetingType, setMeetingType] = useState('Virtual Architectural Consultation');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedOwner = targetOwner || ownersData[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Dialog Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl my-8 border rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b" style={{ borderColor: 'var(--border-divider)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <Calendar size={18} />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-serif text-[#D4AF37] tracking-wider uppercase">
                    Schedule Private Solar Consultation
                  </h3>
                  <p className="text-[11px] tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Direct Matchmaking • Certified Solar Owners & EPC Engineers
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content area */}
            <div className="p-6 md:p-8 overflow-y-auto">
              {isSubmitted ? (
                <div className="text-center py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-20 h-20 bg-[#D4AF37]/10 border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-[#D4AF37] mx-auto mb-6"
                  >
                    <CheckCircle2 size={42} />
                  </motion.div>
                  <h4 className="text-2xl md:text-3xl font-serif mb-3 text-white">
                    Meeting Requested with {selectedOwner.name}
                  </h4>
                  <p className="text-sm max-w-lg mx-auto mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Your private consultation request has been dispatched. {selectedOwner.name}'s technical team at <span className="text-[#D4AF37]">{selectedOwner.company}</span> will review your estate parameters and confirm the calendar invite within 4 hours.
                  </p>

                  <div className="p-4 rounded-xl border max-w-md mx-auto mb-8 text-left text-xs space-y-2" style={{ backgroundColor: 'var(--bg-section-muted)', borderColor: 'var(--border-card)' }}>
                    {targetProject && (
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--text-muted)' }}>Project of Interest:</span>
                        <span className="font-semibold text-white">{targetProject.title}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--text-muted)' }}>Consultation Mode:</span>
                      <span className="font-semibold text-[#D4AF37]">{meetingType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--text-muted)' }}>Date & Slot:</span>
                      <span className="text-white">{preferredDate || 'Upcoming Window'} • {preferredTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--text-muted)' }}>Property Scope:</span>
                      <span className="text-white">{propertyType} ({areaSqFt} sq ft)</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--text-muted)' }}>Lead Engineer:</span>
                      <span className="text-white">{selectedOwner.name}</span>
                    </div>
                  </div>

                  <Button variant="gold" onClick={handleReset}>
                    Close & Return to Showcase
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Selected Owner Highlight Bar */}
                  <div className="p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: 'var(--bg-section-muted)', borderColor: 'var(--border-card)' }}>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <img
                        src={selectedOwner.avatar}
                        alt={selectedOwner.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/50 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{selectedOwner.name}</span>
                          {selectedOwner.verified && (
                            <span className="flex items-center text-[10px] text-[#D4AF37] gap-0.5">
                              <ShieldCheck size={12} /> Verified Owner
                            </span>
                          )}
                        </div>
                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                          {selectedOwner.company} • Founder Desk • Available: Remote
                        </p>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex flex-wrap items-center justify-between sm:justify-end gap-2 text-[11px]">
                      <a
                        href="tel:+919015920523"
                        className="flex items-center gap-1 text-[#D4AF37] font-mono font-semibold bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 px-2.5 py-1 rounded border border-[#D4AF37]/30 transition-colors"
                        title="Direct Phone Line"
                      >
                        <Phone size={12} />
                        <span>+91 90159 20523</span>
                      </a>
                      <a
                        href="https://wa.me/919015920523?text=Hi%20Udayveer%2C%20I%20would%20like%20to%20consult%20regarding%20solar%20panels."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#10B981] font-semibold bg-[#10B981]/10 hover:bg-[#10B981]/20 px-2.5 py-1 rounded border border-[#10B981]/30 transition-colors"
                      >
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href="mailto:info@vittoris.com?subject=Solar%20Panel%20Consultation%20Inquiry%20-%20Vittoris"
                        className="flex items-center gap-1 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded border border-white/10 transition-colors"
                      >
                        <Mail size={12} />
                        <span>Email</span>
                      </a>
                    </div>
                  </div>

                  {targetProject && (
                    <div className="p-3 rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-between text-xs">
                      <span className="text-[#D4AF37] font-medium">Referenced Panel: {targetProject.title}</span>
                      <span className="text-white/60">{targetProject.type}</span>
                    </div>
                  )}

                  {/* Meeting Type Selection */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] mb-2 font-medium" style={{ color: 'var(--text-body)' }}>
                      Consultation Objective & Mode *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        'Virtual Architectural Consultation',
                        'On-Site Solar Audit',
                        'Owner-Host Co-Development'
                      ].map(mode => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setMeetingType(mode)}
                          className={`p-3 text-left rounded-lg border text-xs transition-all ${
                            meetingType === mode
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                              : 'border-white/10 hover:border-white/20 text-white/70'
                          }`}
                        >
                          <div className="font-semibold mb-1 text-white">{mode.split(' ')[0]} {mode.split(' ')[1]}</div>
                          <div className="text-[10px] text-white/50">{mode}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property & Seeker Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Aditya Rathore"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        Direct Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="aditya@estate.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        Contact Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. Your phone or WhatsApp"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        Property / Asset Category *
                      </label>
                      <select
                        value={propertyType}
                        onChange={e => setPropertyType(e.target.value)}
                        className="w-full px-4 py-3 rounded-md bg-[#121418] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
                      >
                        <option value="Luxury Villa / Estate">Luxury Villa / Estate</option>
                        <option value="Commercial Headquarters">Commercial Headquarters</option>
                        <option value="Industrial Rooftop">Industrial Rooftop</option>
                        <option value="Agricultural Land">Agricultural Farmland (Agri-PV)</option>
                        <option value="BIPV Facade">Architectural BIPV Facade / Glass</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        Estimated Area (Sq. Ft.)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 5,000"
                        value={areaSqFt}
                        onChange={e => setAreaSqFt(e.target.value)}
                        className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={preferredDate}
                          onChange={e => setPreferredDate(e.target.value)}
                          className="w-full px-3 py-3 rounded-md bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                          Preferred Slot
                        </label>
                        <select
                          value={preferredTime}
                          onChange={e => setPreferredTime(e.target.value)}
                          className="w-full px-3 py-3 rounded-md bg-[#121418] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
                        >
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:30 AM">11:30 AM</option>
                          <option value="02:30 PM">02:30 PM</option>
                          <option value="04:30 PM">04:30 PM</option>
                          <option value="06:00 PM">06:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                      Architectural Vision or Specific Technical Demands (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. We require zero roof penetrations, battery storage for off-grid operation during summer, and black aesthetic BIPV glass."
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      variant="gold"
                      fullWidth
                      type="submit"
                      disabled={isSubmitting}
                      icon={<UserCheck size={16} />}
                    >
                      {isSubmitting ? 'Confirming Availability...' : `Confirm Meeting with ${selectedOwner.name}`}
                    </Button>
                    <p className="text-[10px] text-center mt-3 text-white/40 tracking-wider">
                      Zero obligations. Strictly encrypted under NDA. Dedicated exclusively to verified property owners and clean energy partners.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
