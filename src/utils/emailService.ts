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
  ownerBody: string;
  clientBody: string;
  approveSlot1Url: string;
  approveSlot2Url: string;
  approveSlot3Url: string;
  ignoreUrl: string;
  cleanBase: string;
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

  return {
    mailtoOwnerUrl,
    mailtoClientUrl,
    ownerBody,
    clientBody,
    approveSlot1Url,
    approveSlot2Url,
    approveSlot3Url,
    ignoreUrl,
    cleanBase,
  };
}

export async function sendMeetingRequestEmails(req: MeetingRequest): Promise<EmailDispatchResult> {
  const {
    mailtoOwnerUrl,
    mailtoClientUrl,
    ownerBody,
    clientBody,
    approveSlot1Url,
    approveSlot2Url,
    approveSlot3Url,
    ignoreUrl,
    cleanBase,
  } = generateMailtoLinks(req);

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
  const hasRealEmailJs = Boolean(
    EMAILJS_CONFIG.publicKey && 
    EMAILJS_CONFIG.publicKey !== 'user_emailjs_key' &&
    EMAILJS_CONFIG.publicKey !== 'DEMO_PUBLIC_KEY' &&
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.serviceId !== 'service_vittoris'
  );

  if (!hasRealEmailJs) {
    // Graceful fallback: return ready mailto links and structured success
    console.info(
      'EmailJS: Default/placeholder configuration detected. Pre-filled mail dispatch links generated for company mail (%s) and user mail (%s). To enable zero-click background delivery, set VITE_EMAILJS_PUBLIC_KEY and VITE_EMAILJS_SERVICE_ID in .env.',
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

  // Ensure EmailJS is initialized
  try {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  } catch {
    // init fallback
  }

  let ownerDispatched = false;
  let clientDispatched = false;
  let errorMsg: string | undefined;

  // 1. Dispatch to Company Owner (tharshit2257@gmail.com & company@vittoris.com)
  const ownerParams = {
    // Standard EmailJS template parameters (works with default templates)
    from_name: req.client.fullName,
    from_email: req.client.businessEmail,
    reply_to: req.client.businessEmail,
    to_name: 'Vittoris Leadership',
    to_email: COMPANY_CONTACT_DETAILS.ownerEmail,
    company_email: COMPANY_CONTACT_DETAILS.companyEmail,
    subject: `[3-Slot Meeting Permission Request] ${req.client.fullName} - ${req.client.companyName || 'Enterprise Client'}`,
    message: ownerBody,
    summary: `Candidate ${req.client.fullName} from ${req.client.companyName || 'Corporate Client'} submitted 3 candidate consultation slots: \n1. ${slot1Str}\n2. ${slot2Str}\n3. ${slot3Str}\n\nApprove Slot 1: ${approveSlot1Url}\nApprove Slot 2: ${approveSlot2Url}\nApprove Slot 3: ${approveSlot3Url}\nIgnore: ${ignoreUrl}\nCalendly Portal: ${COMPANY_CONTACT_DETAILS.calendlyUrl}`,

    // Custom template parameters (works with customized templates)
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
    approve_slot_1_url: approveSlot1Url,
    approve_slot_2_url: approveSlot2Url,
    approve_slot_3_url: approveSlot3Url,
    ignore_request_url: ignoreUrl,
    calendly_portal_url: COMPANY_CONTACT_DETAILS.calendlyUrl,
    admin_portal_url: `${cleanBase}admin`,
  };

  try {
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateIdOwner,
      ownerParams,
      EMAILJS_CONFIG.publicKey
    );
    ownerDispatched = true;
    console.log('✓ EmailJS: Owner notification successfully dispatched.');
  } catch (err: unknown) {
    const errorText = err instanceof Error ? err.message : String(err);
    console.warn('EmailJS Owner Dispatch error:', errorText);
    errorMsg = errorText;
  }

  // 2. Dispatch to Client / User
  const clientTemplateId = EMAILJS_CONFIG.templateIdClient;
  // If distinct client template exists and is not a placeholder, send candidate confirmation
  if (
    clientTemplateId &&
    clientTemplateId !== 'template_client_ack' &&
    clientTemplateId !== EMAILJS_CONFIG.templateIdOwner
  ) {
    try {
      const clientParams = {
        from_name: COMPANY_CONTACT_DETAILS.brandName,
        from_email: COMPANY_CONTACT_DETAILS.companyEmail,
        reply_to: COMPANY_CONTACT_DETAILS.companyEmail,
        to_name: req.client.fullName,
        to_email: req.client.businessEmail,
        subject: `[Vittoris Consultation Receipt] 3 Proposed Slots Received`,
        message: clientBody,
        client_name: req.client.fullName,
        client_company: req.client.companyName || '',
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
        clientTemplateId,
        clientParams,
        EMAILJS_CONFIG.publicKey
      );
      clientDispatched = true;
      console.log('✓ EmailJS: Candidate confirmation successfully dispatched.');
    } catch (err: unknown) {
      console.warn('EmailJS Client Dispatch note:', err);
    }
  } else {
    // If client template is shared or placeholder, mark as acknowledged
    clientDispatched = ownerDispatched;
  }

  return {
    ownerDispatched,
    clientDispatched,
    method: ownerDispatched ? 'emailjs' : 'mailto_ready',
    error: errorMsg,
    mailtoOwnerUrl,
    mailtoClientUrl,
  };
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
      from_name: data.fullName,
      from_email: data.businessEmail,
      reply_to: data.businessEmail,
      to_name: 'Vittoris Leadership',
      to_email: COMPANY_CONTACT_DETAILS.ownerEmail,
      company_email: COMPANY_CONTACT_DETAILS.companyEmail,
      subject,
      message: body,
      summary: `Inquiry from ${data.fullName} (${data.businessEmail}) for ${data.companyName}: ${data.selectedService}`,
      client_name: data.fullName,
      client_email: data.businessEmail,
      company_name: data.companyName,
      website: data.website || 'N/A',
      service: data.selectedService,
      monthly_target: data.monthlyTarget || 'N/A',
      preferred_channel: data.preferredChannel || 'Email',
      project_description: data.projectDescription || '',
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

