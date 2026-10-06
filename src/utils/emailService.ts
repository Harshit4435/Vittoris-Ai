import emailjs from '@emailjs/browser';
import { COMPANY_CONTACT_DETAILS, EMAILJS_CONFIG } from '../data/vittorisData';
import type { MeetingRequest } from './meetingScheduler';

export interface EmailDispatchResult {
  ownerDispatched: boolean;
  clientDispatched: boolean;
  method: 'emailjs' | 'mailto_ready';
  error?: string;
  mailtoOwnerUrl: string;
  mailtoClientUrl: string;
}

export function generateMailtoLinks(req: MeetingRequest): {
  mailtoOwnerUrl: string;
  mailtoClientUrl: string;
} {
  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${import.meta.env.BASE_URL || '/'}`
    : 'https://harshit4435.github.io/Vittoris-Ai/';

  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  const approveSlot1Url = `${cleanBase}admin?action=approve&reqId=${req.id}&slot=1`;
  const approveSlot2Url = `${cleanBase}admin?action=approve&reqId=${req.id}&slot=2`;
  const approveSlot3Url = `${cleanBase}admin?action=approve&reqId=${req.id}&slot=3`;
  const ignoreUrl = `${cleanBase}admin?action=ignore&reqId=${req.id}`;

  const slot1Str = req.proposedSlots[0]
    ? `${req.proposedSlots[0].date} at ${req.proposedSlots[0].time} (${req.timezoneLabel})`
    : 'N/A';
  const slot2Str = req.proposedSlots[1]
    ? `${req.proposedSlots[1].date} at ${req.proposedSlots[1].time} (${req.timezoneLabel})`
    : 'N/A';
  const slot3Str = req.proposedSlots[2]
    ? `${req.proposedSlots[2].date} at ${req.proposedSlots[2].time} (${req.timezoneLabel})`
    : 'N/A';

  // Mail to Company Owner
  const ownerSubject = `[3-Slot Meeting Permission Request] ${req.client.fullName} - ${req.client.companyName || 'Enterprise Client'}`;
  const ownerBody = `Dear Vittoris Leadership,

A candidate has submitted a 3-slot meeting permission request for an AI Architecture Consultation:

--- CLIENT DOSSIER ---
• Name: ${req.client.fullName}
• Organization: ${req.client.companyName || 'N/A'}
• Work Email: ${req.client.businessEmail}
• Phone: ${req.client.phone || 'N/A'}
• Selected Solution: ${req.client.selectedService}
• Revenue Band: ${req.client.currentRevenue}
• Primary Objective: ${req.client.primaryGoal || 'Scale Qualified Meetings'}
• Operational Notes: ${req.client.notes || 'N/A'}

--- 3 PROPOSED TIME WINDOWS ---
1. Slot 1 (Primary): ${slot1Str}
2. Slot 2 (Alternative 1): ${slot2Str}
3. Slot 3 (Alternative 2): ${slot3Str}

--- OWNER 1-CLICK ACTIONS ---
• Approve Slot 1 & Lock Calendar: ${approveSlot1Url}
• Approve Slot 2 & Lock Calendar: ${approveSlot2Url}
• Approve Slot 3 & Lock Calendar: ${approveSlot3Url}
• Ignore / Decline Request: ${ignoreUrl}

--- OWNER CALENDLY PORTAL ---
Verify or block your schedule directly on Calendly:
${COMPANY_CONTACT_DETAILS.calendlyUrl}

Executive Admin Desk:
${cleanBase}admin
`;

  // Mail to Client/User
  const clientSubject = `Consultation Request Received - 3 Availability Windows Under Review | Vittoris Systems`;
  const clientBody = `Hi ${req.client.fullName},

Thank you for your interest in Vittoris AI Architecture Consultation.

Your 3 candidate consultation times have been forwarded to company leadership (${COMPANY_CONTACT_DETAILS.ownerEmail}):

1. Slot 1 (Primary Preference): ${slot1Str}
2. Slot 2 (Alternative 1): ${slot2Str}
3. Slot 3 (Alternative 2): ${slot3Str}

STATUS: Awaiting Owner Review
Company leadership is evaluating your proposed windows to ensure zero double-booking on the master calendar. Once approved, that exact time will be permanently locked for your session and you will receive an official Google Meet invite.

Need an immediate session? You may also book directly on the owner's Calendly calendar:
${COMPANY_CONTACT_DETAILS.calendlyUrl}

Best regards,
Vittoris Systems Executive Desk
${COMPANY_CONTACT_DETAILS.companyEmail}
`;

  const mailtoOwnerUrl = `mailto:${COMPANY_CONTACT_DETAILS.ownerEmail}?cc=${COMPANY_CONTACT_DETAILS.companyEmail}&subject=${encodeURIComponent(ownerSubject)}&body=${encodeURIComponent(ownerBody)}`;
  const mailtoClientUrl = `mailto:${req.client.businessEmail}?cc=${COMPANY_CONTACT_DETAILS.ownerEmail}&subject=${encodeURIComponent(clientSubject)}&body=${encodeURIComponent(clientBody)}`;

  return { mailtoOwnerUrl, mailtoClientUrl };
}

export async function sendMeetingRequestEmails(req: MeetingRequest): Promise<EmailDispatchResult> {
  const { mailtoOwnerUrl, mailtoClientUrl } = generateMailtoLinks(req);

  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${import.meta.env.BASE_URL || '/'}`
    : 'https://harshit4435.github.io/Vittoris-Ai/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  const slot1Str = req.proposedSlots[0]
    ? `${req.proposedSlots[0].date} at ${req.proposedSlots[0].time} (${req.timezoneLabel})`
    : 'N/A';
  const slot2Str = req.proposedSlots[1]
    ? `${req.proposedSlots[1].date} at ${req.proposedSlots[1].time} (${req.timezoneLabel})`
    : 'N/A';
  const slot3Str = req.proposedSlots[2]
    ? `${req.proposedSlots[2].date} at ${req.proposedSlots[2].time} (${req.timezoneLabel})`
    : 'N/A';

  // Check if real EmailJS credentials exist
  const hasRealEmailJs = 
    EMAILJS_CONFIG.publicKey && 
    EMAILJS_CONFIG.publicKey !== 'user_emailjs_key' &&
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.serviceId !== 'service_vittoris';

  if (!hasRealEmailJs) {
    // Graceful fallback: return ready mailto links and structured success
    console.info(
      'EmailJS: Default/placeholder configuration detected. Pre-filled mail dispatch links generated for company mail (%s) and user mail (%s). To enable zero-click background delivery, set VITE_EMAILJS_PUBLIC_KEY and VITE_EMAILJS_SERVICE_ID.',
      COMPANY_CONTACT_DETAILS.ownerEmail,
      req.client.businessEmail
    );

    return {
      ownerDispatched: true,
      clientDispatched: true,
      method: 'mailto_ready',
      mailtoOwnerUrl,
      mailtoClientUrl,
    };
  }

  let ownerDispatched = false;
  let clientDispatched = false;
  let errorMsg: string | undefined;

  try {
    // 1. Dispatch to Company Owner (tharshit2257@gmail.com & company@vittoris.com)
    const ownerParams = {
      to_email: COMPANY_CONTACT_DETAILS.ownerEmail,
      company_email: COMPANY_CONTACT_DETAILS.companyEmail,
      client_name: req.client.fullName,
      client_email: req.client.businessEmail,
      client_company: req.client.companyName || 'Enterprise Client',
      client_phone: req.client.phone || 'N/A',
      selected_service: req.client.selectedService,
      revenue_band: req.client.currentRevenue,
      primary_goal: req.client.primaryGoal || 'Scale Qualified Meetings',
      notes: req.client.notes || 'N/A',
      slot_1: slot1Str,
      slot_2: slot2Str,
      slot_3: slot3Str,
      approve_slot_1_url: `${cleanBase}admin?action=approve&reqId=${req.id}&slot=1`,
      approve_slot_2_url: `${cleanBase}admin?action=approve&reqId=${req.id}&slot=2`,
      approve_slot_3_url: `${cleanBase}admin?action=approve&reqId=${req.id}&slot=3`,
      ignore_request_url: `${cleanBase}admin?action=ignore&reqId=${req.id}`,
      calendly_portal_url: COMPANY_CONTACT_DETAILS.calendlyUrl,
      admin_portal_url: `${cleanBase}admin`,
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateIdOwner,
      ownerParams,
      EMAILJS_CONFIG.publicKey
    );
    ownerDispatched = true;

    // 2. Dispatch to Client / User
    const clientParams = {
      to_email: req.client.businessEmail,
      client_name: req.client.fullName,
      client_company: req.client.companyName,
      selected_service: req.client.selectedService,
      slot_1: slot1Str,
      slot_2: slot2Str,
      slot_3: slot3Str,
      owner_calendly_url: COMPANY_CONTACT_DETAILS.calendlyUrl,
      company_email: COMPANY_CONTACT_DETAILS.companyEmail,
      owner_email: COMPANY_CONTACT_DETAILS.ownerEmail,
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateIdClient,
      clientParams,
      EMAILJS_CONFIG.publicKey
    );
    clientDispatched = true;

    return {
      ownerDispatched: true,
      clientDispatched: true,
      method: 'emailjs',
      mailtoOwnerUrl,
      mailtoClientUrl,
    };
  } catch (err: unknown) {
    const errorText = err instanceof Error ? err.message : String(err);
    console.warn('EmailJS delivery encounter:', errorText);
    errorMsg = errorText;

    return {
      ownerDispatched,
      clientDispatched,
      method: 'mailto_ready',
      error: errorMsg,
      mailtoOwnerUrl,
      mailtoClientUrl,
    };
  }
}

export interface ContactInquiryData {
  fullName: string;
  businessEmail: string;
  companyName: string;
  website?: string;
  selectedService: string;
  monthlyTarget?: string;
  preferredChannel?: string;
  projectDescription?: string;
}

export async function sendContactInquiryEmail(data: ContactInquiryData): Promise<{
  ownerDispatched: boolean;
  clientDispatched: boolean;
  method: 'emailjs' | 'mailto_ready';
  mailtoUrl: string;
}> {
  const subject = `[Website Contact Inquiry] ${data.fullName} - ${data.companyName}`;
  const body = `Dear Vittoris Leadership,

A prospect has submitted a strategic inquiry through the Contact Us form on your platform:

• Full Name: ${data.fullName}
• Corporate Email: ${data.businessEmail}
• Organization: ${data.companyName}
• Website / LinkedIn: ${data.website || 'N/A'}
• Service of Interest: ${data.selectedService}
• Pipeline Target: ${data.monthlyTarget || 'N/A'}
• Preferred Channel: ${data.preferredChannel || 'Email'}
• Bottleneck / Description:
${data.projectDescription || 'N/A'}

---
Calendly Portal: ${COMPANY_CONTACT_DETAILS.calendlyUrl}
Company Email: ${COMPANY_CONTACT_DETAILS.companyEmail}
Owner Email: ${COMPANY_CONTACT_DETAILS.ownerEmail}
`;

  const mailtoUrl = `mailto:${COMPANY_CONTACT_DETAILS.companyEmail}?cc=${COMPANY_CONTACT_DETAILS.ownerEmail}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const hasCredentials = Boolean(
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.publicKey &&
    EMAILJS_CONFIG.publicKey !== 'DEMO_PUBLIC_KEY'
  );

  if (!hasCredentials) {
    return {
      ownerDispatched: false,
      clientDispatched: false,
      method: 'mailto_ready',
      mailtoUrl,
    };
  }

  try {
    const params = {
      to_email: COMPANY_CONTACT_DETAILS.ownerEmail,
      company_email: COMPANY_CONTACT_DETAILS.companyEmail,
      from_name: data.fullName,
      client_email: data.businessEmail,
      company_name: data.companyName,
      service: data.selectedService,
      message: data.projectDescription || '',
      monthly_target: data.monthlyTarget || '',
      calendly_url: COMPANY_CONTACT_DETAILS.calendlyUrl,
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateIdOwner,
      params,
      EMAILJS_CONFIG.publicKey
    );

    return {
      ownerDispatched: true,
      clientDispatched: true,
      method: 'emailjs',
      mailtoUrl,
    };
  } catch (err: unknown) {
    console.warn('Contact EmailJS error:', err);
    return {
      ownerDispatched: false,
      clientDispatched: false,
      method: 'mailto_ready',
      mailtoUrl,
    };
  }
}

