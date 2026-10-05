import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, Calendar, Clock, CheckCircle2, XCircle, AlertTriangle, 
  User, Mail, Lock, Unlock, ExternalLink, 
  Trash2, RefreshCw, Check, Sparkles, Search
} from 'lucide-react';
import { 
  getMeetingRequests, 
  getLockedSlots, 
  approveMeetingSlot, 
  declineMeetingRequest, 
  unlockSlot, 
  deleteMeetingRequest, 
  resetSchedulerToDefaults, 
  subscribeMeetingUpdates
} from '../utils/meetingScheduler';
import type { MeetingRequest, LockedSlot } from '../utils/meetingScheduler';

import { COMPANY_CONTACT_DETAILS } from '../data/vittorisData';

interface AdminPortalProps {
  onOpenConsultation?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onOpenConsultation }) => {
  const [requests, setRequests] = useState<MeetingRequest[]>(() => getMeetingRequests());
  const [lockedSlots, setLockedSlots] = useState<LockedSlot[]>(() => getLockedSlots());
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'declined'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDeclineId, setActiveDeclineId] = useState<string | null>(null);
  const [declineReason, setDeclineReason] = useState('');
  const [selectedSlotForApproval, setSelectedSlotForApproval] = useState<{ [reqId: string]: number }>({});
  const [actionSuccessNotice, setActionSuccessNotice] = useState<string | null>(null);

  const showNotification = useCallback((msg: string) => {
    setActionSuccessNotice(msg);
    setTimeout(() => {
      setActionSuccessNotice(null);
    }, 4500);
  }, []);

  useEffect(() => {
    // Process 1-click action links received from owner email (EmailJS or mailto)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const action = params.get('action');
      const reqId = params.get('reqId');
      const slotStr = params.get('slot');

      if (action && reqId) {
        if (action === 'approve') {
          const slotNum = slotStr ? parseInt(slotStr, 10) : 1;
          const updated = approveMeetingSlot(reqId, slotNum);
          if (updated && updated.approvedSlot) {
            const approved = updated.approvedSlot;
            const clientName = updated.client.companyName || updated.client.fullName;
            setTimeout(() => {
              showNotification(
                `✓ Email Action Executed: Slot ${slotNum} (${approved.date} at ${approved.time}) approved & locked exclusively on company calendar for ${clientName}!`
              );
            }, 50);
          }
        } else if (action === 'ignore' || action === 'decline') {
          const updated = declineMeetingRequest(reqId, 'Ignored / declined via owner email 1-click action link.');
          if (updated) {
            setTimeout(() => {
              showNotification('✓ Email Action Executed: Request marked as ignored/declined.');
            }, 50);
          }
        }

        // Clean query params so refresh doesn't re-trigger
        window.history.replaceState({}, '', window.location.pathname);
      }
    }

    const unsubscribe = subscribeMeetingUpdates(() => {
      setRequests(getMeetingRequests());
      setLockedSlots(getLockedSlots());
    });
    return () => unsubscribe();
  }, [showNotification]);

  const handleApprove = (requestId: string, slotId: number) => {
    const updated = approveMeetingSlot(requestId, slotId);
    if (updated && updated.approvedSlot) {
      showNotification(
        `Successfully approved Slot ${slotId} (${updated.approvedSlot.date} at ${updated.approvedSlot.time}) for ${updated.client.companyName || updated.client.fullName}. Slot is now permanently locked on the company calendar.`
      );
    }
  };

  const handleDecline = (requestId: string) => {
    const reason = declineReason.trim() || 'Schedule windows conflict with existing closed-door executive strategy sessions. Please propose alternative time slots.';
    declineMeetingRequest(requestId, reason);
    setActiveDeclineId(null);
    setDeclineReason('');
    showNotification(`Meeting request declined and reschedule notice logged.`);
  };

  const handleUnlock = (lockId: string, company: string, date: string, time: string) => {
    if (window.confirm(`Are you sure you want to unlock ${date} at ${time} for ${company}? This slot will become available again.`)) {
      unlockSlot(lockId);
      showNotification(`Slot (${date} at ${time}) has been unlocked and returned to open availability.`);
    }
  };

  const handleDelete = (requestId: string, clientName: string) => {
    if (window.confirm(`Delete request from ${clientName}? Any associated locked calendar slot will also be released.`)) {
      deleteMeetingRequest(requestId);
      showNotification(`Request from ${clientName} removed.`);
    }
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset schedule requests and locked calendar slots to initial demo baseline?')) {
      resetSchedulerToDefaults();
      showNotification('Scheduler data reset to default demo scenario.');
    }
  };

  // Filter requests
  const filteredRequests = requests.filter(req => {
    const matchesFilter = 
      filterStatus === 'all' ? true :
      filterStatus === 'pending' ? req.status === 'pending_admin_approval' :
      filterStatus === 'approved' ? req.status === 'approved' :
      req.status === 'declined';

    const matchesSearch = 
      !searchQuery.trim() ||
      req.client.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.client.businessEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.client.selectedService.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const pendingCount = requests.filter(r => r.status === 'pending_admin_approval').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const totalLockedCount = lockedSlots.length;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-200 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative Gold Glow */}
      <div className="fixed top-20 right-1/4 w-[500px] h-[500px] bg-[#C7A86D]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-[400px] h-[400px] bg-[#C7A86D]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner Alert if Action Performed */}
        {actionSuccessNotice && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 flex items-center justify-between shadow-2xl animate-fadeIn">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm font-medium">{actionSuccessNotice}</span>
            </div>
            <button 
              onClick={() => setActionSuccessNotice(null)}
              className="text-xs text-emerald-400 hover:text-white px-2 py-1 rounded bg-emerald-900/40"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Executive Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A86D]/15 border border-[#C7A86D]/30 text-[#C7A86D] text-[11px] font-semibold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Company Executive Admin Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight flex items-center gap-3">
              <span>Meeting Permission & Calendar Control</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
              When prospective clients request a discovery meeting, they propose <strong>3 distinct time windows</strong>. Review requests below, approve the optimal slot, or decline. Approved slots are immediately <strong>locked on the company master calendar</strong> so no duplicate or conflicting interviews can ever be scheduled.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={COMPANY_CONTACT_DETAILS.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open Owner Calendly Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C7A86D]" />
                <span>Test Client Booking Form</span>
              </button>
            )}

            <button
              onClick={handleResetDemo}
              className="px-4 py-2.5 rounded-xl bg-[#C7A86D]/10 hover:bg-[#C7A86D]/20 border border-[#C7A86D]/30 text-[#E5C788] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo Scenario</span>
            </button>
          </div>

        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Pending Approvals */}
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#C7A86D]/30 space-y-2 relative overflow-hidden group">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Pending Decisions</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            </div>
            <div className="text-3xl font-serif font-bold text-white flex items-baseline gap-2">
              <span>{pendingCount}</span>
              <span className="text-xs text-amber-400 font-normal">awaiting review</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#C7A86D]" />
              <span>Clients awaiting slot authorization</span>
            </div>
          </div>

          {/* Card 2: Approved & Active */}
          <div className="p-5 rounded-2xl bg-[#141414] border border-emerald-500/25 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Approved Consultations</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-serif font-bold text-emerald-300">
              {approvedCount}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Confirmed with Google Meet links</span>
            </div>
          </div>

          {/* Card 3: Locked Calendar Windows */}
          <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Locked Master Slots</span>
              <Lock className="w-4 h-4 text-[#C7A86D]" />
            </div>
            <div className="text-3xl font-serif font-bold text-white">
              {totalLockedCount}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#C7A86D]" />
              <span>Zero double-booking allowed</span>
            </div>
          </div>

          {/* Card 4: Executive Admin Inbox */}
          <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Admin Endpoint</span>
              <Mail className="w-4 h-4 text-[#C7A86D]" />
            </div>
            <div className="text-sm font-mono text-[#E5C788] truncate">
              {COMPANY_CONTACT_DETAILS.ownerEmail}
            </div>
            <div className="text-[11px] text-slate-400">
              Calendly: <span className="font-mono text-slate-300">tharshit2257/meetings</span>
            </div>
          </div>
        </div>

        {/* Section 1: 3-Slot Permission Requests Queue */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#141414] border border-white/10">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 text-xs">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                  filterStatus === 'all'
                    ? 'bg-[#C7A86D] text-black font-semibold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                All Requests ({requests.length})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
                  filterStatus === 'pending'
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <span>Awaiting Decision</span>
                <span className="px-1.5 py-0.2 rounded-full bg-black/30 text-[10px]">
                  {pendingCount}
                </span>
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                  filterStatus === 'approved'
                    ? 'bg-emerald-500 text-black font-semibold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Approved ({approvedCount})
              </button>
              <button
                onClick={() => setFilterStatus('declined')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                  filterStatus === 'declined'
                    ? 'bg-rose-500 text-white font-semibold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Declined ({requests.filter(r => r.status === 'declined').length})
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search executive, company, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7A86D]"
              />
            </div>
          </div>

          {/* List of Requests */}
          {filteredRequests.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#141414] border border-white/5 text-slate-400 space-y-3">
              <Clock className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-medium">No meeting requests found matching your filter.</p>
              <p className="text-xs text-slate-500">
                Incoming prospective client 3-slot permission submissions will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((req) => {
                const isPending = req.status === 'pending_admin_approval';
                const isApproved = req.status === 'approved';
                const isDeclined = req.status === 'declined';
                const chosenSlotId = selectedSlotForApproval[req.id] || (req.approvedSlotId || 1);

                return (
                  <div
                    key={req.id}
                    className={`p-6 rounded-2xl border transition-all duration-300 space-y-5 ${
                      isPending
                        ? 'bg-[#141414] border-[#C7A86D]/40 shadow-lg shadow-[#C7A86D]/5'
                        : isApproved
                        ? 'bg-[#111613] border-emerald-500/30'
                        : 'bg-[#161213] border-rose-500/25 opacity-85'
                    }`}
                  >
                    {/* Request Top Bar: Status + Client Identity + Actions */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                            isPending
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                              : isApproved
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}>
                            {isPending && <Clock className="w-3 h-3 animate-pulse" />}
                            {isApproved && <CheckCircle2 className="w-3 h-3" />}
                            {isDeclined && <XCircle className="w-3 h-3" />}
                            <span>
                              {isPending ? 'Action Required: Evaluate 3 Proposed Slots' :
                               isApproved ? `Approved & Locked: Slot ${req.approvedSlot?.id || 1}` :
                               'Declined / Reschedule Requested'}
                            </span>
                          </span>

                          <span className="text-[10px] text-slate-500 font-mono">
                            Received {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(req.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                          <h3 className="text-xl font-serif text-white font-semibold">
                            {req.client.companyName || 'Enterprise Prospect'}
                          </h3>
                          <span className="text-xs text-slate-400 font-sans">•</span>
                          <span className="text-xs text-[#E5C788] font-medium flex items-center gap-1">
                            <User className="w-3 h-3 text-[#C7A86D]" />
                            {req.client.fullName}
                          </span>
                        </div>
                      </div>

                      {/* Header Utility Actions */}
                      <div className="flex items-center gap-2">
                        {isApproved && (
                          <a
                            href={req.googleMeetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Join Google Meet</span>
                          </a>
                        )}

                        <a
                          href={`mailto:${req.client.businessEmail}?cc=${COMPANY_CONTACT_DETAILS.ownerEmail}&subject=${encodeURIComponent(`Vittoris Discovery Call: ${req.client.companyName}`)}`}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#C7A86D]" />
                          <span>Email Client</span>
                        </a>

                        <button
                          onClick={() => handleDelete(req.id, req.client.fullName)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Delete Request"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Client Scoping Dossier */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 p-3.5 rounded-xl border border-white/5 text-xs">
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 block font-mono">Work Email:</span>
                        <span className="text-slate-200 truncate block">{req.client.businessEmail}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 block font-mono">Phone / Signal:</span>
                        <span className="text-slate-200 block">{req.client.phone || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 block font-mono">Selected Service:</span>
                        <span className="text-[#C7A86D] font-medium block truncate capitalize">
                          {req.client.selectedService.replace(/-/g, ' ')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 block font-mono">Revenue Band:</span>
                        <span className="text-slate-200 block">{req.client.currentRevenue}</span>
                      </div>

                      {req.client.notes && (
                        <div className="col-span-2 sm:col-span-4 pt-1.5 border-t border-white/5 text-[11px] text-slate-400">
                          <strong className="text-slate-300">Client Strategic Objective:</strong> {req.client.notes}
                        </div>
                      )}
                    </div>

                    {/* The 3 Proposed Slots Grid */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#C7A86D]" />
                          <span>Candidate's 3 Proposed Time Slots ({req.timezoneLabel})</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Select 1 to approve & lock
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {req.proposedSlots.map((slot) => {
                          const isThisApproved = isApproved && req.approvedSlotId === slot.id;
                          const isRadioSelected = chosenSlotId === slot.id;

                          // Check if another client locked this slot
                          const isAlreadyLockedByOther = lockedSlots.some(
                            l => l.date === slot.date && l.time === slot.time && l.requestId !== req.id
                          );

                          return (
                            <div
                              key={slot.id}
                              onClick={() => {
                                if (isPending) {
                                  setSelectedSlotForApproval(prev => ({ ...prev, [req.id]: slot.id }));
                                }
                              }}
                              className={`p-4 rounded-xl border relative transition-all ${
                                isThisApproved
                                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100 shadow-md'
                                  : isPending && isRadioSelected
                                  ? 'bg-[#1F1A12] border-[#C7A86D] text-white shadow-md'
                                  : 'bg-black/40 border-white/5 text-slate-300 hover:border-white/20'
                              } ${isPending ? 'cursor-pointer' : ''}`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  isThisApproved
                                    ? 'bg-emerald-400 text-black'
                                    : slot.id === 1
                                    ? 'bg-[#C7A86D]/20 text-[#E5C788]'
                                    : 'bg-white/10 text-slate-400'
                                }`}>
                                  Slot {slot.id} {slot.id === 1 ? '• Primary' : '• Backup'}
                                </span>

                                {isThisApproved ? (
                                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> Locked
                                  </span>
                                ) : isAlreadyLockedByOther ? (
                                  <span className="text-[9px] text-rose-400 font-mono flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" /> Conflicted
                                  </span>
                                ) : (
                                  <span className="text-[9px] text-slate-500 font-mono">
                                    Available
                                  </span>
                                )}
                              </div>

                              <div className="space-y-1">
                                <div className="text-sm font-semibold text-white font-mono">
                                  {slot.date}
                                </div>
                                <div className="text-lg font-bold text-[#E5C788] font-mono">
                                  {slot.time}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {req.timezoneLabel}
                                </div>
                              </div>

                              {isAlreadyLockedByOther && (
                                <div className="mt-2 p-1.5 rounded bg-rose-950/60 border border-rose-500/30 text-[10px] text-rose-300">
                                  Another client already holds this time window.
                                </div>
                              )}

                              {isPending && (
                                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                                  <span className="text-slate-400">
                                    {isRadioSelected ? 'Selected for approval' : 'Click to select'}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApprove(req.id, slot.id);
                                    }}
                                    className="px-2.5 py-1 rounded-md bg-[#C7A86D] hover:bg-[#D4AF37] text-black font-semibold text-[10px] uppercase tracking-wider transition-all"
                                  >
                                    Approve Slot {slot.id}
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Admin Decision Bar for Pending Requests */}
                    {isPending && (
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#1A1610] p-4 rounded-xl border border-[#C7A86D]/30">
                        <div className="text-xs text-slate-300 space-y-0.5">
                          <strong className="text-[#E5C788] block">Admin Authorization Action:</strong>
                          <span>
                            Approve <strong>Slot {chosenSlotId}</strong> to lock this exact date & time on the company calendar.
                          </span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => handleApprove(req.id, chosenSlotId)}
                            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve Slot {chosenSlotId} & Lock Calendar</span>
                          </button>

                          <button
                            onClick={() => setActiveDeclineId(activeDeclineId === req.id ? null : req.id)}
                            className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 text-rose-300 text-xs font-semibold transition-all cursor-pointer"
                          >
                            Decline...
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Decline Reason Input Accordion */}
                    {activeDeclineId === req.id && (
                      <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-3 animate-fadeIn">
                        <span className="text-xs font-semibold text-rose-300 block">
                          Reason for Declining (Sent to Client):
                        </span>
                        <input
                          type="text"
                          value={declineReason}
                          onChange={(e) => setDeclineReason(e.target.value)}
                          placeholder="e.g. Executive conflict during these times. Please propose alternative days next week."
                          className="w-full bg-black/60 border border-rose-500/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setActiveDeclineId(null)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDecline(req.id)}
                            className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors"
                          >
                            Confirm Decline & Request Reschedule
                          </button>
                        </div>
                      </div>
                    )}

                    {/* If Already Approved: Decision Log & Calendar Links */}
                    {isApproved && req.approvedSlot && (
                      <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Reserved on Master Calendar: {req.approvedSlot.date} at {req.approvedSlot.time} ({req.timezoneLabel})</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-light">
                            {req.adminNotes || 'Confirmed by leadership. No other interview will be scheduled in this block.'}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={req.googleMeetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Meet Room</span>
                          </a>

                          <button
                            onClick={() => handleApprove(req.id, req.approvedSlotId === 1 ? 2 : 1)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs transition-colors cursor-pointer"
                          >
                            Switch Slot
                          </button>
                        </div>
                      </div>
                    )}

                    {/* If Declined: Show reason */}
                    {isDeclined && (
                      <div className="p-3 rounded-xl bg-black/40 border border-rose-500/20 text-xs text-rose-300 flex items-center justify-between">
                        <div>
                          <strong>Declined Notice:</strong> {req.adminNotes}
                        </div>
                        <button
                          onClick={() => handleApprove(req.id, 1)}
                          className="px-3 py-1 rounded bg-[#C7A86D] hover:bg-[#D4AF37] text-black font-semibold text-[11px] transition-colors"
                        >
                          Reopen & Approve Slot 1
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Section 2: Master Locked Calendar & Double-Booking Prevention */}
        <div className="space-y-4 pt-6">
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#C7A86D]/20 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-serif text-xl font-semibold">
                <Lock className="w-5 h-5 text-[#C7A86D]" />
                <span>Master Locked Calendar Registry</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                {lockedSlots.length} Windows Exclusively Locked
              </span>
            </div>
            <p className="text-xs text-slate-400 font-light">
              Any date and time listed here is completely blocked from client scheduling. If any candidate attempts to pick these slots, the booking form automatically flags them as unavailable and blocks submission.
            </p>
          </div>

          {lockedSlots.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#141414] border border-white/5 text-slate-400 text-xs">
              No locked calendar slots currently. Approving a candidate's 3-slot proposal locks their approved window here.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {lockedSlots.map((lock) => (
                <div
                  key={lock.id}
                  className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors space-y-2.5 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      <span>Exclusively Reserved</span>
                    </span>
                    <button
                      onClick={() => handleUnlock(lock.id, lock.companyName, lock.date, lock.time)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                      title="Release / Unlock this slot"
                    >
                      <Unlock className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <div className="text-base font-bold text-white font-mono">
                      {lock.date}
                    </div>
                    <div className="text-lg font-bold text-[#E5C788] font-mono">
                      {lock.time}
                    </div>
                  </div>

                  <div className="text-xs pt-1 border-t border-white/5 space-y-0.5">
                    <div className="text-slate-200 font-medium truncate">
                      {lock.companyName || lock.clientName}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Executive: {lock.clientName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
