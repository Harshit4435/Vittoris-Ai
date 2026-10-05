
export interface MeetingSlot {
  id: number;
  label: string;
  date: string;
  time: string;
}

export interface ClientIntakeData {
  fullName: string;
  businessEmail: string;
  companyName: string;
  website: string;
  phone: string;
  selectedService: string;
  currentRevenue: string;
  primaryGoal: string;
  preferredChannel: string;
  notes: string;
}

export interface MeetingRequest {
  id: string;
  createdAt: string;
  client: ClientIntakeData;
  timezone: string;
  timezoneLabel: string;
  proposedSlots: MeetingSlot[];
  status: 'pending_admin_approval' | 'approved' | 'declined';
  approvedSlotId?: number;
  approvedSlot?: MeetingSlot;
  adminDecisionAt?: string;
  adminNotes?: string;
  googleMeetLink: string;
}

export interface LockedSlot {
  id: string;
  date: string;
  time: string;
  timezone: string;
  clientName: string;
  companyName: string;
  requestId: string;
  approvedAt: string;
}

const STORAGE_KEY_REQUESTS = 'vittoris_meeting_requests_v2';
const STORAGE_KEY_LOCKED = 'vittoris_locked_slots_v2';
const EVENT_NAME = 'vittoris_meeting_schedule_changed';

// Initial realistic baseline requests for realistic admin experience
const INITIAL_DEMO_REQUESTS: MeetingRequest[] = [
  {
    id: 'req_001_apex',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    client: {
      fullName: 'Marcus Vance',
      businessEmail: 'mvance@apexholdings.io',
      companyName: 'Apex Capital Holdings',
      website: 'apexholdings.io',
      phone: '+1 (415) 890-2341',
      selectedService: 'pay-per-appointment',
      currentRevenue: '$250k - $1M / mo',
      primaryGoal: 'Scale Qualified Appointments',
      preferredChannel: 'Email',
      notes: 'Evaluating pay-per-meeting acquisition engine for our mid-market B2B portfolio.',
    },
    timezone: 'America/New_York',
    timezoneLabel: 'EST (US Eastern Time)',
    proposedSlots: [
      { id: 1, label: 'Slot 1 (Primary)', date: '2026-10-09', time: '10:00 AM' },
      { id: 2, label: 'Slot 2 (Alternative 1)', date: '2026-10-09', time: '02:00 PM' },
      { id: 3, label: 'Slot 3 (Alternative 2)', date: '2026-10-10', time: '11:30 AM' },
    ],
    status: 'pending_admin_approval',
    googleMeetLink: 'https://meet.google.com/vit-apex-arch',
  },
  {
    id: 'req_002_lumina',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    client: {
      fullName: 'Elena Rostova',
      businessEmail: 'elena@luminabiotech.com',
      companyName: 'Lumina Biotech Labs',
      website: 'luminabiotech.com',
      phone: '+1 (617) 555-0198',
      selectedService: 'document-intelligence',
      currentRevenue: '$1M+ / mo',
      primaryGoal: 'Automate Complex Operations',
      preferredChannel: 'Google Meet',
      notes: 'Need custom document intelligence pipeline for clinical trial data intake.',
    },
    timezone: 'America/New_York',
    timezoneLabel: 'EST (US Eastern Time)',
    proposedSlots: [
      { id: 1, label: 'Slot 1 (Primary)', date: '2026-10-08', time: '03:00 PM' },
      { id: 2, label: 'Slot 2 (Alternative 1)', date: '2026-10-09', time: '04:00 PM' },
      { id: 3, label: 'Slot 3 (Alternative 2)', date: '2026-10-11', time: '10:30 AM' },
    ],
    status: 'approved',
    approvedSlotId: 1,
    approvedSlot: { id: 1, label: 'Slot 1 (Primary)', date: '2026-10-08', time: '03:00 PM' },
    adminDecisionAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    adminNotes: 'High-value enterprise clinical account. Slot 1 approved and locked on company calendar.',
    googleMeetLink: 'https://meet.google.com/vit-lumina-call',
  }
];

const INITIAL_LOCKED_SLOTS: LockedSlot[] = [
  {
    id: 'lock_002_lumina',
    date: '2026-10-08',
    time: '03:00 PM',
    timezone: 'America/New_York',
    clientName: 'Elena Rostova',
    companyName: 'Lumina Biotech Labs',
    requestId: 'req_002_lumina',
    approvedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  }
];

export function getMeetingRequests(): MeetingRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REQUESTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(INITIAL_DEMO_REQUESTS));
      return INITIAL_DEMO_REQUESTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_REQUESTS;
  }
}

export function getLockedSlots(): LockedSlot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOCKED);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_LOCKED, JSON.stringify(INITIAL_LOCKED_SLOTS));
      return INITIAL_LOCKED_SLOTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_LOCKED_SLOTS;
  }
}

export function isSlotLocked(date: string, time: string): boolean {
  if (!date || !time) return false;
  const locked = getLockedSlots();
  return locked.some(slot => slot.date === date && slot.time === time);
}

export function getSlotLockDetails(date: string, time: string): LockedSlot | undefined {
  if (!date || !time) return undefined;
  const locked = getLockedSlots();
  return locked.find(slot => slot.date === date && slot.time === time);
}

export function createMeetingRequest(data: {
  client: ClientIntakeData;
  timezone: string;
  timezoneLabel: string;
  proposedSlots: MeetingSlot[];
}): MeetingRequest {
  const requests = getMeetingRequests();
  const id = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const cleanId = data.client.companyName
    ? data.client.companyName.toLowerCase().replace(/[^a-z0-9]/g, '')
    : 'session';

  const newRequest: MeetingRequest = {
    id,
    createdAt: new Date().toISOString(),
    client: data.client,
    timezone: data.timezone,
    timezoneLabel: data.timezoneLabel,
    proposedSlots: data.proposedSlots,
    status: 'pending_admin_approval',
    googleMeetLink: `https://meet.google.com/vit-${cleanId}-call`,
  };

  const updated = [newRequest, ...requests];
  try {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(updated));
  } catch {
    // fallback
  }

  notifyScheduleChange();
  return newRequest;
}

export function approveMeetingSlot(
  requestId: string,
  slotId: number,
  adminNotes?: string
): MeetingRequest | null {
  const requests = getMeetingRequests();
  const index = requests.findIndex(r => r.id === requestId);
  if (index === -1) return null;

  const targetReq = requests[index];
  const chosenSlot = targetReq.proposedSlots.find(s => s.id === slotId) || targetReq.proposedSlots[0];

  const updatedReq: MeetingRequest = {
    ...targetReq,
    status: 'approved',
    approvedSlotId: chosenSlot.id,
    approvedSlot: chosenSlot,
    adminDecisionAt: new Date().toISOString(),
    adminNotes: adminNotes || `Slot ${chosenSlot.id} (${chosenSlot.date} at ${chosenSlot.time}) verified and locked exclusively for ${targetReq.client.companyName || targetReq.client.fullName}.`,
  };

  requests[index] = updatedReq;
  try {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(requests));
  } catch {
    // fallback
  }

  // Lock this slot permanently on the company master calendar:
  // "there is no other interview will be schedule"
  const lockedSlots = getLockedSlots();
  // Filter out any previous lock for this request if re-approving
  const filteredLocks = lockedSlots.filter(l => l.requestId !== requestId);
  const newLock: LockedSlot = {
    id: `lock_${Date.now()}`,
    date: chosenSlot.date,
    time: chosenSlot.time,
    timezone: targetReq.timezone,
    clientName: targetReq.client.fullName,
    companyName: targetReq.client.companyName,
    requestId: targetReq.id,
    approvedAt: new Date().toISOString(),
  };

  const updatedLocks = [...filteredLocks, newLock];
  try {
    localStorage.setItem(STORAGE_KEY_LOCKED, JSON.stringify(updatedLocks));
  } catch {
    // fallback
  }

  notifyScheduleChange();
  return updatedReq;
}

export function declineMeetingRequest(
  requestId: string,
  reason?: string
): MeetingRequest | null {
  const requests = getMeetingRequests();
  const index = requests.findIndex(r => r.id === requestId);
  if (index === -1) return null;

  const targetReq = requests[index];
  const updatedReq: MeetingRequest = {
    ...targetReq,
    status: 'declined',
    adminDecisionAt: new Date().toISOString(),
    adminNotes: reason || 'Proposed time windows conflict with existing closed-door executive strategy blocks. Please propose alternative slots.',
  };

  requests[index] = updatedReq;
  try {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(requests));
  } catch {
    // fallback
  }

  // If this request had a locked slot, unlock it
  const lockedSlots = getLockedSlots();
  const updatedLocks = lockedSlots.filter(l => l.requestId !== requestId);
  try {
    localStorage.setItem(STORAGE_KEY_LOCKED, JSON.stringify(updatedLocks));
  } catch {
    // fallback
  }

  notifyScheduleChange();
  return updatedReq;
}

export function unlockSlot(lockId: string): boolean {
  const lockedSlots = getLockedSlots();
  const target = lockedSlots.find(l => l.id === lockId);
  if (!target) return false;
  const updatedLocks = lockedSlots.filter(l => l.id !== lockId);
  try {
    localStorage.setItem(STORAGE_KEY_LOCKED, JSON.stringify(updatedLocks));
  } catch {
    // fallback
  }
  notifyScheduleChange();
  return true;
}

export function deleteMeetingRequest(requestId: string): boolean {
  const requests = getMeetingRequests();
  const updatedRequests = requests.filter(r => r.id !== requestId);
  const lockedSlots = getLockedSlots().filter(l => l.requestId !== requestId);
  try {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(updatedRequests));
    localStorage.setItem(STORAGE_KEY_LOCKED, JSON.stringify(lockedSlots));
  } catch {
    // fallback
  }
  notifyScheduleChange();
  return true;
}

export interface SlotValidationResult {
  isValid: boolean;
  error?: string;
  duplicateIndices?: number[];
  lockedIndices?: number[];
}

export function validateProposedSlots(slots: MeetingSlot[]): SlotValidationResult {
  if (!slots || slots.length !== 3) {
    return { isValid: false, error: 'Please choose exactly 3 time slots.' };
  }
  for (let i = 0; i < slots.length; i++) {
    if (!slots[i].date || !slots[i].time) {
      return { isValid: false, error: `Slot ${i + 1} is missing a date or time selection.` };
    }
  }
  // Check duplicates
  for (let i = 0; i < slots.length; i++) {
    for (let j = i + 1; j < slots.length; j++) {
      if (slots[i].date === slots[j].date && slots[i].time === slots[j].time) {
        return {
          isValid: false,
          error: `Slot ${i + 1} and Slot ${j + 1} have the identical time (${slots[i].date} at ${slots[i].time}). Please choose 3 distinct time windows.`,
          duplicateIndices: [i, j],
        };
      }
    }
  }
  // Check if any slot is locked by an already confirmed interview on admin side
  const lockedIndices: number[] = [];
  slots.forEach((s, idx) => {
    if (isSlotLocked(s.date, s.time)) {
      lockedIndices.push(idx);
    }
  });
  if (lockedIndices.length > 0) {
    const conflictSlot = slots[lockedIndices[0]];
    const lockDetails = getSlotLockDetails(conflictSlot.date, conflictSlot.time);
    return {
      isValid: false,
      error: `Slot ${lockedIndices[0] + 1} (${conflictSlot.date} at ${conflictSlot.time}) is already locked on company calendar${lockDetails ? ` for ${lockDetails.companyName || lockDetails.clientName}` : ''}. No other interview can be scheduled at this time. Please pick another slot.`,
      lockedIndices,
    };
  }
  return { isValid: true };
}

export function resetSchedulerToDefaults(): void {
  try {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(INITIAL_DEMO_REQUESTS));
    localStorage.setItem(STORAGE_KEY_LOCKED, JSON.stringify(INITIAL_LOCKED_SLOTS));
    notifyScheduleChange();
  } catch {
    // fallback
  }
}

export function subscribeMeetingUpdates(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY_REQUESTS || e.key === STORAGE_KEY_LOCKED) {
      callback();
    }
  });
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}

function notifyScheduleChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }
}

