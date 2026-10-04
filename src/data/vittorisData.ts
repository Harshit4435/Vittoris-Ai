import type { Service, Solution, Industry, EngagementPhase, MeasurableOutcome } from "../types/vittoris";

export const VITTORIS_SERVICES: Service[] = [
  {
    id: "svc_pay_per_appointment",
    slug: "pay-per-appointment",
    number: "01",
    title: "Pay-Per-Appointment Client Acquisition",
    shortDesc: "Pure performance acquisition engine delivering vetted, decision-maker sales meetings directly to calendar schedules. Pricing applies strictly to confirmed, qualified appointments.",
    heroTagline: "Vetted Decision-Maker Meetings Delivered Directly to Your Calendar — Zero Ad-Spend Risk.",
    category: "Client Acquisition",
    iconName: "CalendarCheck",
    fullOverview: "A pure performance acquisition engine delivering vetted, decision-maker sales meetings directly to your calendar schedules. Pricing is never tied to vanity metrics like impressions, clicks, or raw form-fills; billing applies strictly to confirmed, qualified appointments that satisfy collaboratively agreed written criteria.",
    keyProblemsSolved: [
      "Skyrocketing lead acquisition costs paired with poor baseline qualification.",
      "Senior sales talent squandered on dozens of manual cold calls to unvetted prospects.",
      "High-margin commercial pipeline leaking because manual follow-up cannot keep pace."
    ],
    howItWorks: [
      "Market Positioning & Economics: Reverse-engineering target industries, average contract values, and competitive value propositions.",
      "Targeted Campaign Architecture: Custom ad creative, high-converting landers, and dynamic friction funnels aligned with high-ticket commercial buying psychology.",
      "Multi-Channel Acquisition: Scaled deployment across hyper-targeted paid media and inbound discovery channels to capture high-intent buyers.",
      "Multi-Layer AI Screening: Strict filtration parameters verifying budget thresholds, purchase authority, project timelines, and operational fit.",
      "Direct Calendar Injection: Conversational AI setters secure the time slot and immediately inject prospect data into internal CRMs.",
      "Show-Up Protection Sequences: Coordinated omnichannel confirmations across SMS, WhatsApp, and voice protocols that drastically reduce calendar no-shows."
    ],
    qualificationCriteria: [
      "Direct contact details of verified corporate decision-makers (C-suite, VP, Director, Owner)",
      "Pre-vetted budget minimums and project scope explicitly aligned with your commercial economics",
      "Explicit agreement to a set consultation date, time, and structured agenda",
      "Notice: If a prospect fails to satisfy the agreed criteria, the booking carries zero billing cost."
    ],
    keyAdvantages: [
      {
        title: "Zero Ad-Spend Risk",
        description: "Capital buys concrete pipeline outcomes rather than empty marketing attempts or vague agency retainer hours."
      },
      {
        title: "Locked Acquisition Costs",
        description: "Fixed per-appointment pricing enables reliable financial forecasting and predictable customer acquisition costs."
      },
      {
        title: "Pure Closing Focus",
        description: "Senior sales closers spend 100% of their bandwidth negotiating with qualified, motivated buyers."
      },
      {
        title: "Elastic Scale",
        description: "Meeting volume scales smoothly from dozens to hundreds per month without requiring proportional additions to internal sales headcount."
      }
    ],
    coreDeliverables: [
      { title: "Written Qualification Charter", description: "Collaboratively drafted parameters defining decision authority, budget floor, and timeline requirements." },
      { title: "Targeted Multi-Channel Campaign Setup", description: "Bespoke creative, landing pages, and friction vetting funnels deployed across paid media." },
      { title: "Autonomous Calendar Integration", description: "Two-way calendar sync with Google Workspace / Outlook ensuring appointments appear with complete prospect briefing dossiers." },
      { title: "Omnichannel Show-Up Sequence", description: "Automated WhatsApp, SMS, and calendar protocols engineered to protect attendance rates." }
    ],
    workflowSteps: [
      { step: 1, title: "Targeted Campaign Launch", description: "Deploy high-intent paid & inbound campaigns targeting verified commercial segments." },
      { step: 2, title: "Lead Ingestion & Speed-to-Lead", description: "Instant capture and sub-second activation via preferred prospect channels." },
      { step: 3, title: "Multi-Layer AI Screening", description: "Evaluates budget, authority, scope, and timeline against the written criteria." },
      { step: 4, title: "Direct Calendar Booking", description: "Locks confirmed calendar slot based on real-time rep availability." },
      { step: 5, title: "CRM Ingestion & Dossier", description: "Transfers verified lead data, company research, and agenda notes into your CRM." },
      { step: 6, title: "Omnichannel Show-Up Protection", description: "Sends synchronized briefings, calendar invites, and WhatsApp confirmations." }
    ],
    pricingModelNotice: "Performance Billing: Remuneration applies strictly per confirmed qualified appointment. No long-term lock-in retainers for empty metrics.",
    idealFor: "B2B service providers, agencies, consultancies, high-ticket contractors, enterprise solutions, and commercial operators with average deal values > $3,000 / ₹2,50,000."
  },
  {
    id: "svc_custom_ai_systems",
    slug: "custom-ai-systems",
    number: "02",
    title: "Custom AI Systems",
    shortDesc: "Tailored, enterprise-grade AI infrastructure engineered around specific proprietary data, team workflows, and corporate goals, completely avoiding rigid generic templates.",
    heroTagline: "Permanent Enterprise AI Infrastructure Engineered for Your Proprietary Workflows.",
    category: "Custom AI & Infrastructure",
    iconName: "Cpu",
    fullOverview: "Tailored, enterprise-grade AI infrastructure engineered around specific proprietary data, team workflows, and corporate goals, completely avoiding rigid, generic templates. We construct permanent operational assets that integrate natively with your current software stack rather than forcing disruptive platform migrations.",
    keyProblemsSolved: [
      "Critical company knowledge fragmented across email threads, drive folders, and individual employee silos.",
      "Hours wasted on manual extraction of data from PDFs, invoices, quotes, and complex contracts.",
      "Executive blindspots caused by disconnected reporting across ads, CRM, and operational spreadsheets."
    ],
    howItWorks: [
      "Data Architecture Audit: Cataloging data assets, permissions, document repositories, and pipeline flows.",
      "Vector & Knowledge Store Deployment: Implementing secure, private AI repositories trained on catalogs, manuals, and compliance protocols.",
      "Algorithmic Pipeline Engineering: Building proprietary data extraction engines and predictive lead scoring algorithms.",
      "Executive Dashboard Telemetry: Connecting disparate data sources into a unified real-time reporting canvas."
    ],
    keyAdvantages: [
      {
        title: "Fitted to Existing Workflows",
        description: "Integrates natively with your current tools (HubSpot, Salesforce, Slack, Notion, GSuite) instead of disrupting established team habits."
      },
      {
        title: "Compounding Operational Speed",
        description: "Workflows requiring hours of administrative labor resolve in seconds with mathematical precision."
      },
      {
        title: "Error Prevention",
        description: "Eliminates clerical mistakes, misquoted scopes, and missed contracting details across documents."
      },
      {
        title: "Proprietary Asset Ownership",
        description: "Built directly as permanent, enterprise business equity rather than rented software subscriptions that walk away."
      }
    ],
    coreDeliverables: [
      { title: "Automated Document Intelligence", description: "Systems that instantly extract data from invoices, vendor quotes, and contracts to draft client-ready commercial proposals." },
      { title: "Sales Intelligence Engines", description: "Algorithmic lead scoring that evaluates closing probability and alerts sales teams to high-yield opportunities instantly." },
      { title: "Internal Knowledge Repositories", description: "Secure company-wide AI assistants trained on service catalogs, operational manuals, and compliance protocols for instant team answers." },
      { title: "Executive Performance Dashboards", description: "Dynamic reporting engines aggregating real-time analytics from CRM, ad accounts, and operational sheets." }
    ],
    workflowSteps: [
      { step: 1, title: "Document / Data Ingestion", description: "Raw PDFs, scanned contracts, or operational records uploaded to secure processing gateway." },
      { step: 2, title: "Structured AI Extraction", description: "Extracts key line items, pricing tiers, party names, and payment terms." },
      { step: 3, title: "Validation & Cross-Reference", description: "Checks extracted entities against historical pricing models and CRM databases." },
      { step: 4, title: "Output Generation", description: "Generates formatted proposals, updates financial ledgers, and syncs executive dashboards." }
    ],
    pricingModelNotice: "Fixed-Scope Custom Deployment + Ongoing Optimization SLA. You retain 100% intellectual property of proprietary prompts and workflows.",
    idealFor: "Firms handling high paperwork volumes, complex bidding processes, internal knowledge lookups, or fragmented reporting systems."
  },
  {
    id: "svc_conversational_ai_agents",
    slug: "conversational-ai-agents",
    number: "03",
    title: "Conversational AI Agents & Inbound Bots",
    shortDesc: "Dynamic conversational intelligence embedded across Web, WhatsApp, Meta channels, and Google Business profiles to convert inbound web traffic into confirmed appointments 24/7.",
    heroTagline: "Turn Every Visitor Into a Qualified Conversation — 24 Hours a Day, Across All Channels.",
    category: "Autonomous Agents",
    iconName: "Bot",
    fullOverview: "Dynamic conversational intelligence embedded across Web, WhatsApp, Meta channels, and Google Business profiles to convert inbound web traffic into confirmed appointments 24/7. Equipped with deep context awareness and strict guardrails, these agents engage visitors within seconds, qualify intent, resolve objections, and lock calendar slots without human intervention.",
    keyProblemsSolved: [
      "High bounce rates when visitors land outside business hours or on weekends.",
      "Leads cooling off because responses take hours instead of seconds.",
      "Static form-fills failing to answer urgent customer questions before they leave."
    ],
    howItWorks: [
      "Instantaneous Sub-Minute Response: Engages traffic immediately at any hour, preventing interest from drifting to competitors.",
      "Natural Qualification Dialogues: Vets prospect budgets and project scopes within fluent, context-aware conversations.",
      "Automated Calendar Locking: Coordinates availability dynamically to lock bookings without human intervention.",
      "Seamless Staff Handoff: Identifies complex scenarios and escalates conversations to live team members with full contextual history."
    ],
    keyAdvantages: [
      {
        title: "100% Lead Capture Coverage",
        description: "Evenings, weekends, and holidays are monetized and booked instead of lost to voicemail or neglected inboxes."
      },
      {
        title: "Multiplied Website ROI",
        description: "Inbound traffic converts into sales conversations at significantly higher margins compared to static landing pages."
      },
      {
        title: "Organized CRM Ingestion",
        description: "Key customer data points are categorized and automatically updated into system pipelines."
      },
      {
        title: "Brand Consistency",
        description: "Never goes off-brand, forgets key questions, or provides outdated pricing parameters."
      }
    ],
    coreDeliverables: [
      { title: "Website Chat Widget", description: "Custom-styled, low-latency conversational widget with proactive triggers based on scroll depth." },
      { title: "WhatsApp Business API Bridge", description: "Official Meta-verified conversational bot handling direct customer inquiries on WhatsApp." },
      { title: "Meta & Google Chat Connector", description: "Direct routing for Instagram DMs, Facebook Messenger, and Google Business profile messages." },
      { title: "Smart Escalation Protocol", description: "Instant notification system alerting human staff via Slack/SMS when high-value buyers request live interaction." }
    ],
    workflowSteps: [
      { step: 1, title: "Inbound Ping", description: "Visitor sends message on Web, WhatsApp, or Social." },
      { step: 2, title: "Sub-Minute AI Greeting", description: "Under 15-second contextual response matching the visitor's inquiry." },
      { step: 3, title: "Qualifying Dialogue", description: "Naturally gathers budget, project timing, and commercial authority." },
      { step: 4, title: "Direct Booking / Handoff", description: "Embeds interactive calendar selector or alerts human team members." }
    ],
    pricingModelNotice: "Turnkey Implementation & Channel Configuration + Monthly Managed Infrastructure.",
    idealFor: "Companies receiving web traffic, ad traffic, or WhatsApp inquiries that want instant speed-to-lead and round-the-clock booking."
  },
  {
    id: "svc_ai_voice_agents",
    slug: "ai-voice-agents",
    number: "04",
    title: "AI Voice Agents",
    shortDesc: "Human-grade conversational voice infrastructure capable of handling high-volume inbound inquiries and proactive outbound calling sequences with zero latency and natural dialogue.",
    heroTagline: "Human-Grade Conversational Voice Infrastructure for Inbound & Outbound Calling at Scale.",
    category: "Autonomous Agents",
    iconName: "PhoneCall",
    fullOverview: "Human-grade conversational voice infrastructure capable of handling high-volume inbound inquiries and proactive outbound calling sequences with zero latency and natural dialogue. Designed for enterprise reliability, our voice systems handle inquiries, revive dormant databases, confirm consultations, and follow up on commercial bids with full auditability.",
    keyProblemsSolved: [
      "Inbound calls going to voicemail during peak hours or after hours, causing lost revenue.",
      "Valuable legacy client databases sitting dormant because sales reps lack bandwidth to dial.",
      "High no-show rates resulting from manual reminder friction."
    ],
    howItWorks: [
      "Inbound Call Answering: Answers every incoming call, resolves common questions, qualifies scope, and books consultations.",
      "Database Reactivation Campaigns: Methodically dials legacy databases and aged contacts to revive latent revenue opportunities.",
      "Automated Voice Reminders: Personalized voice confirmations that dramatically reinforce appointment attendance rates.",
      "Quote and Proposal Follow-Up: Systematically tracks outstanding commercial bids to accelerate contract signatures."
    ],
    keyAdvantages: [
      {
        title: "Massive Calling Capacity",
        description: "Hundreds of targeted conversations conducted daily without staffing, managing, or training a large call center."
      },
      {
        title: "Zero Lost Revenue Inbound",
        description: "Captures every incoming opportunity before it reaches an unanswered line or rings out."
      },
      {
        title: "Strict Quality Compliance",
        description: "Consistently adheres to proven sales messaging and regulatory standards without fatigue or deviation."
      },
      {
        title: "Full Auditability",
        description: "Every call is automatically recorded, transcribed, and summarized for continuous performance reviews."
      }
    ],
    coreDeliverables: [
      { title: "Inbound Telephony Dispatcher", description: "Configured phone numbers with conversational IVR, natural voice synthesis, and call routing." },
      { title: "Database Reactivation Engine", description: "Automated outbound dialing schedule for cold or historical contact lists with opt-out safeguards." },
      { title: "Call Transcript & Summary Pipeline", description: "Instant CRM sync of call recordings, timestamps, audio snippets, and structured outcome summaries." },
      { title: "Show-Up Voice Confirmation", description: "Personalized voice verification 24 hours prior to scheduled commercial meetings." }
    ],
    workflowSteps: [
      { step: 1, title: "Call Initiation / Ring", description: "Inbound call detected or scheduled outbound cadence triggers." },
      { step: 2, title: "Natural Dialogue", description: "Low-latency voice engine handles natural interruption, accents, and context." },
      { step: 3, title: "Objective Execution", description: "Qualifies intent, answers FAQs, or schedules meeting into designated rep calendar." },
      { step: 4, title: "Audio & Transcript Logging", description: "Audio recording and categorized summary uploaded to CRM in real-time." }
    ],
    pricingModelNotice: "Infrastructure Setup + Per-Minute Telephony & AI Voice Processing Usage.",
    idealFor: "High-ticket services, healthcare, legal, real estate, automotive, finance, and home improvement companies managing inbound calls or dormant contact lists."
  },
  {
    id: "svc_ai_appointment_setters",
    slug: "ai-appointment-setters",
    number: "05",
    title: "AI Appointment Setters",
    shortDesc: "An autonomous, multi-channel booking pipeline designed to take raw inbound leads and turn them into confirmed sales meetings without a single manual touchpoint.",
    heroTagline: "From Raw Inbound Lead to Confirmed Sales Meeting — Completely Hands-Free in Seconds.",
    category: "Autonomous Agents",
    iconName: "Clock",
    fullOverview: "An autonomous, multi-channel booking pipeline designed to take raw inbound leads and turn them into confirmed sales meetings without a single manual touchpoint. By striking within seconds while buyer intent is at its peak, this engine works every contact systematically until converted or definitively disqualified.",
    keyProblemsSolved: [
      "Slow response times (lead decay): 78% of customers buy from the company that responds first.",
      "Leads falling through the cracks when sales reps are busy with existing client deliverables.",
      "Sales reps wasting hours each week coordinating calendar times and rescheduling no-shows."
    ],
    howItWorks: [
      "1. Immediate Lead Ingestion: Captures data across forms, ads, chatbots, and inbound lines instantly.",
      "2. Speed-to-Lead Activation: Initiates contact within seconds on the prospect's native channel (Call, SMS, WhatsApp, Email).",
      "3. Dynamic Screening: Vets target requirements and resolves preliminary objections automatically.",
      "4. Calendar Confirmation: Synchronizes real-time availability and confirms the appointment.",
      "5. Attendance Protocols: Executes automated pre-meeting briefing cadences to guarantee show-ups.",
      "6. No-Show Reactivation: Re-engages drop-offs automatically to reschedule without sales friction."
    ],
    keyAdvantages: [
      {
        title: "Contact Speed Measured in Seconds",
        description: "Strikes while buyer intent and commercial interest are at their absolute peak."
      },
      {
        title: "Zero Lead Leakage",
        description: "Every contact is systematically worked across multichannel cadences until converted or definitively disqualified."
      },
      {
        title: "Prequalified Calendars",
        description: "Sales teams open calendars filled strictly with educated, prepared, decision-ready buyers."
      },
      {
        title: "Autonomous Rescheduling",
        description: "Drop-offs and missed appointments are immediately re-engaged with friendly automated rescheduling links."
      }
    ],
    coreDeliverables: [
      { title: "Instant Ingestion Webhooks", description: "Sub-second intake connecting Meta Lead Ads, Google Ads, website forms, and partner portals." },
      { title: "Multichannel Follow-Up Matrix", description: "Automated sequence incorporating WhatsApp, SMS, conversational email, and optional voice." },
      { title: "Real-Time Calendar Orchestrator", description: "Round-robin distribution matching leads to the right sales reps based on geography or expertise." },
      { title: "No-Show Recovery Cadence", description: "3-touch automated recovery protocol reactivating missed meetings within 30 minutes." }
    ],
    workflowSteps: [
      { step: 1, title: "Immediate Ingestion", description: "Captures lead data from forms or ads within 500 milliseconds." },
      { step: 2, title: "Speed-to-Lead Activation", description: "Sends personalized outreach within 12 seconds on the prospect's preferred channel." },
      { step: 3, title: "Dynamic Screening", description: "Confirms timeline, project requirements, and budget parameters." },
      { step: 4, title: "Calendar Confirmation", description: "Locks time slot, sends calendar invitations, and notifies assigned rep." },
      { step: 5, title: "Attendance Protocols", description: "Dispatches briefing materials and 24h/2h reminders to secure show-up." },
      { step: 6, title: "No-Show Reactivation", description: "Automatically re-engages and reschedules any cancelled or missed sessions." }
    ],
    pricingModelNotice: "Performance-oriented setup linked to qualified meetings or fixed pipeline infrastructure.",
    idealFor: "Companies generating lead volume through paid ads or inbound marketing that need to maximize speed-to-lead and eliminate manual booking overhead."
  },
  {
    id: "svc_business_process_automation",
    slug: "business-process-automation",
    number: "06",
    title: "Business Process Automation",
    shortDesc: "Deep architectural integrations that connect operational tech stacks, completely eliminating clerical data entry, manual cross-posting, and administrative drag.",
    heroTagline: "Dissolve Administrative Drag & Connect Your Tech Stack with Intelligent End-to-End Workflows.",
    category: "Operations & Growth",
    iconName: "Workflow",
    fullOverview: "Deep architectural integrations that connect operational tech stacks, completely eliminating clerical data entry, manual cross-posting, and administrative drag. We connect your CRM, billing software, project management boards, and communication tools into synchronized, oversight-proof pipelines that scale without adding administrative headcount.",
    keyProblemsSolved: [
      "Clerical bottlenecks between sales closing, contract signing, and project fulfillment.",
      "Manual data re-entry between CRM, accounting software, and spreadsheets.",
      "Delayed invoicing and overlooked accounts receivable collection cadences."
    ],
    howItWorks: [
      "Instant Lead Distribution: Routes high-value accounts dynamically based on rep performance, territory, and workload.",
      "Automated Contract Pipelines: Produces formal scopes, proposals, and billing schedules straight from intake data.",
      "Milestone Notifications: Triggers automatic status updates and delivery timelines directly to clients.",
      "Accounts Receivable Workflows: Deploys systematic invoice tracking and automated collection reminders.",
      "Operational Reporting: Delivers daily pipeline summaries and team performance KPIs directly to leadership channels."
    ],
    keyAdvantages: [
      {
        title: "Reclaimed High-Value Capacity",
        description: "Hours of daily busywork are handed back to revenue-generating sales and client delivery teams."
      },
      {
        title: "Accelerated Execution Timelines",
        description: "Bottlenecks between project intake, contracting, and delivery dissolve completely."
      },
      {
        title: "Designed-In Reliability",
        description: "Oversight-proof protocols remove the risk of missed milestones, unbilled work, or duplicate entries."
      },
      {
        title: "Scalable Without Headcount",
        description: "Business operations take on surging contract volumes without requiring additional administrative staff."
      }
    ],
    coreDeliverables: [
      { title: "Dynamic Lead Routing Engine", description: "Rules-based distribution across sales reps based on deal size, territory, and current quota capacity." },
      { title: "Auto-Contract & Invoice Generator", description: "Instant generation of DocuSign/PandaDoc agreements and Stripe/QuickBooks invoices upon deal stage triggers." },
      { title: "Milestone & AR Reminder Cadences", description: "Automated payment reminders and project milestone alerts sent to clients via email and WhatsApp." },
      { title: "Executive KPI Slack/Email Digest", description: "Automated daily and weekly summaries of pipeline value, cash collections, and rep activity." }
    ],
    workflowSteps: [
      { step: 1, title: "Trigger Event", description: "Deal marked Won, invoice due date approaching, or new client onboarded." },
      { step: 2, title: "Cross-System Synchronization", description: "Updates CRM, creates project workspace, and generates billing records." },
      { step: 3, title: "Document Dispatch", description: "Sends signature-ready agreements and onboarding packets to client." },
      { step: 4, title: "Status Tracking & Notifications", description: "Monitors execution and pings team members when action is required." }
    ],
    pricingModelNotice: "Milestone-based integration engineering + Ongoing connector maintenance.",
    idealFor: "Growing businesses where administrative drag, manual invoicing, and cross-tool data entry are slowing down customer fulfillment and team throughput."
  },
  {
    id: "svc_strategic_ai_integration",
    slug: "strategic-ai-integration",
    number: "07",
    title: "Strategic AI Integration",
    shortDesc: "A methodical enterprise consulting and implementation roadmap ensuring AI deployments solve actual operational bottlenecks rather than burning cash on experimental tools.",
    heroTagline: "A Methodical Enterprise Roadmap: Practical AI Architecture Built for Measurable ROI.",
    category: "Operations & Growth",
    iconName: "Compass",
    fullOverview: "A methodical enterprise consulting and implementation roadmap ensuring AI tech deployments solve actual operational bottlenecks rather than burning cash on experimental tools. We audit current operations, identify high-yield leverage points, custom-engineer proprietary workflows, and train internal teams to ensure total organizational adoption.",
    keyProblemsSolved: [
      "Companies subscribing to dozens of fragmented AI tools with zero cohesive workflow or measurable ROI.",
      "Internal staff resisting new software due to steep learning curves or unclear procedures.",
      "Lack of technical architecture connecting AI models with internal databases and legacy systems."
    ],
    howItWorks: [
      "Phase 1: Operational Audit — Mapping daily workflows to pinpoint exact administrative and financial inefficiencies.",
      "Phase 2: Architecture & Roadmap — Prioritizing systems by measurable ROI and speed of deployment.",
      "Phase 3: Custom Engineering — Building and testing robust, proprietary workflows that integrate with existing stacks.",
      "Phase 4: Team Onboarding — Hands-on staff training to guarantee rapid organizational adoption without workflow friction.",
      "Phase 5: Continuous Refinement — Ongoing optimization of prompts, connections, and logic against real performance data."
    ],
    keyAdvantages: [
      {
        title: "Targeted Capital Deployment",
        description: "Every dollar is invested into systems that demonstrably drive operational efficiency or verifiable revenue."
      },
      {
        title: "Seamless Internal Buy-In",
        description: "Staff master the systems through clear, practical onboarding rather than resisting disruptive changes."
      },
      {
        title: "Defensible Market Edge",
        description: "Creates a decisive operational speed advantage while competitors continue to rely on manual procedures."
      },
      {
        title: "Vendor Independence",
        description: "Builds permanent enterprise equity on modular infrastructure that can evolve as underlying AI models advance."
      }
    ],
    coreDeliverables: [
      { title: "Operational Bottleneck Audit Document", description: "Comprehensive analysis of friction points, labor hours lost, and high-impact AI opportunities." },
      { title: "Technical Systems Blueprint", description: "Detailed architecture diagram detailing API endpoints, security protocols, and data schemas." },
      { title: "Custom Workflow Deployment", description: "Engineered, tested, and live operational automations embedded into your tech stack." },
      { title: "Staff Playbooks & Training Sessions", description: "Interactive training workshops and documentation tailored to each department." }
    ],
    workflowSteps: [
      { step: 1, title: "Phase 1: Operational Audit", description: "2-week deep dive into team workflows, repetitive clerical tasks, and pipeline friction." },
      { step: 2, title: "Phase 2: Architecture & Roadmap", description: "Formulates priority matrix ranking systems by ROI potential and implementation velocity." },
      { step: 3, title: "Phase 3: Custom Engineering", description: "Develops, tests, and validates bespoke AI models, integrations, and webhooks." },
      { step: 4, title: "Phase 4: Team Onboarding", description: "Conducts practical training to ensure 100% staff proficiency and process buy-in." },
      { step: 5, title: "Phase 5: Continuous Refinement", description: "Reviews weekly telemetry, refines prompt logic, and expands capabilities." }
    ],
    pricingModelNotice: "Retained Strategic Advisory & Implementation Partnership with Defined Milestones.",
    idealFor: "Established companies, corporate leadership, and enterprise operators seeking a structured, no-fluff roadmap to deploy AI across their organizations."
  },
  {
    id: "svc_ai_demand_generation",
    slug: "ai-demand-generation",
    number: "08",
    title: "AI-Driven Demand Generation",
    shortDesc: "Comprehensive, full-funnel digital marketing deploying artificial intelligence across creative generation, campaign iteration, and predictive targeting.",
    heroTagline: "Predictive Audience Modeling & Algorithmic Campaign Optimization for Predictable Inbound Volume.",
    category: "Client Acquisition",
    iconName: "TrendingUp",
    fullOverview: "Comprehensive, full-funnel digital marketing deploying artificial intelligence across creative generation, campaign iteration, and predictive targeting. By combining rapid high-volume creative testing across Meta, Google Search, and YouTube with intent-driven organic SEO positioning, we build an enduring pipeline asset that continually optimizes customer acquisition costs.",
    keyProblemsSolved: [
      "Ad creative fatigue resulting in soaring customer acquisition costs (CAC) over time.",
      "Subjective, slow marketing iteration cycles that take months to find winning message angles.",
      "Over-reliance on either paid traffic alone or slow organic traffic without a unified engine."
    ],
    howItWorks: [
      "Predictive Audience Modeling: Identifies high-converting demographics and purchase indicators from historical data.",
      "High-Volume Creative Testing: Rapidly deploys and tests dozens of ad hooks, value propositions, and visuals to find top performers.",
      "Omnichannel Strategy: Synchronized acquisition across Meta, Google Search, YouTube, and specialized channels.",
      "Intent-Driven Organic Positioning: SEO architectures designed around high-intent commercial search queries to build enduring pipeline assets.",
      "Automated Retargeting: Behavioral retargeting sequences keeping offers visible to warm prospects."
    ],
    keyAdvantages: [
      {
        title: "Compounding Efficiency",
        description: "Algorithmic machine learning continually optimizes and lowers customer acquisition costs over time."
      },
      {
        title: "Compressed Discovery Periods",
        description: "Winning messaging angles and audiences are isolated in weeks instead of months."
      },
      {
        title: "Dual Acquisition Engine",
        description: "Fast-paced paid customer acquisition paired with long-term organic search discovery."
      },
      {
        title: "Data-Driven Creative Iteration",
        description: "Eliminates guesswork by analyzing retention curves, hook rates, and conversion drop-offs."
      }
    ],
    coreDeliverables: [
      { title: "Predictive Audience Blueprints", description: "Custom lookalikes and intent-driven audience lists based on verified purchasing behaviors." },
      { title: "Dynamic Creative Ad Matrix", description: "Structured creative variations testing messaging hooks, visual angles, and commercial value props." },
      { title: "Commercial Intent SEO Blueprint", description: "High-value keyword mapping targeting buyers actively evaluating solutions in your sector." },
      { title: "Behavioral Retargeting Funnel", description: "Multi-touch retargeting sequences re-engaging landing page visitors with social proof." }
    ],
    workflowSteps: [
      { step: 1, title: "Audience Modeling", description: "Analyzes historical buyers and builds predictive intent profiles." },
      { step: 2, title: "Creative Generation & Launch", description: "Launches structured test matrix across Google Search, Meta, and YouTube." },
      { step: 3, title: "Algorithmic Optimization", description: "Budgets automatically shift toward top-performing hooks and ad formats." },
      { step: 4, title: "Organic Asset Compounding", description: "Deploys targeted content architectures to capture ongoing search demand." }
    ],
    pricingModelNotice: "Performance + Management Structure. Transparent ad spend directly managed in your own ad accounts.",
    idealFor: "Businesses wanting to build a predictable inbound pipeline with data-driven creative testing and unified paid + organic discovery."
  },
  {
    id: "svc_high_ticket_acquisition",
    slug: "high-ticket-acquisition",
    number: "09",
    title: "High-Ticket Client Acquisition",
    shortDesc: "A dedicated, proactive acquisition infrastructure engineered to hunt, qualify, and secure high-value commercial and enterprise contracts.",
    heroTagline: "Proactive Acquisition Infrastructure Engineered to Secure High-Margin Enterprise Accounts.",
    category: "Client Acquisition",
    iconName: "Briefcase",
    fullOverview: "A dedicated, proactive acquisition infrastructure engineered to hunt, qualify, and secure high-value commercial and enterprise contracts. Through ideal client profiling, verified decision-maker sourcing, and hyper-personalized outreach based on industry triggers, we build a structured corporate pipeline that eliminates erratic feast-and-famine cycles.",
    keyProblemsSolved: [
      "Reliance on passive word-of-mouth or unpredictable referrals for commercial revenue.",
      "Difficulty getting past gatekeepers to reach true C-suite corporate decision-makers.",
      "Protracted, messy enterprise sales cycles lacking systematic qualification protocols."
    ],
    howItWorks: [
      "Ideal Client Profiling: Defining exact criteria for high-margin, profitable contract types.",
      "Verified Decision-Maker Sourcing: Building clean, validated contact lists of active corporate decision-makers.",
      "Hyper-Personalized Outreach: Highly contextual communications drafted around relevant industry triggers, company news, and business pain points.",
      "Pipeline Structuring: Streamlining demonstration protocols, proposal formats, and closing workflows to maximize close rates."
    ],
    keyAdvantages: [
      {
        title: "Systematic Revenue Growth",
        description: "Pipeline expansion shifts from erratic word-of-mouth to predictable, proactive corporate targeting."
      },
      {
        title: "Securing Premium Accounts",
        description: "Focuses bandwidth exclusively on high-margin commercial projects matching ideal economic profiles."
      },
      {
        title: "Compressed Sales Velocities",
        description: "Structured discovery protocols and systematic qualification dramatically reduce sales cycle lengths."
      },
      {
        title: "Executive Relationship Equity",
        description: "Establishes direct, peer-to-peer dialogues with key corporate decision-makers in your target vertical."
      }
    ],
    coreDeliverables: [
      { title: "Ideal Customer Profile (ICP) Playbook", description: "Granular firmographic, technographic, and revenue criteria defining target accounts." },
      { title: "Validated Decision-Maker Dossiers", description: "Direct verified email, direct dial, and LinkedIn profiles of C-suite and VP buyers." },
      { title: "Contextual Outreach Campaigns", description: "Hyper-personalized multi-touch email and LinkedIn messaging drafted around real company events." },
      { title: "Enterprise Pipeline CRM Blueprint", description: "Configured deal stages, discovery meeting agendas, and closing scorecards." }
    ],
    workflowSteps: [
      { step: 1, title: "Target Account Mapping", description: "Identifies top 500-2,000 corporate prospects matching exact contract value criteria." },
      { step: 2, title: "Decision-Maker Validation", description: "Verifies direct contact details and current corporate purchasing authority." },
      { step: 3, title: "Contextual Sequence Initiation", description: "Launches hyper-personalized outreach based on specific commercial pain points." },
      { step: 4, title: "Discovery Handoff & Closing", description: "Coordinates confirmed executive consultation with pre-meeting briefing notes." }
    ],
    pricingModelNotice: "Performance-Aligned Deployment + Tiered Account Verification Retainer.",
    idealFor: "Commercial service firms, software vendors, manufacturing partners, and specialized consultancies closing deals valued at $10,000 to $250,000+."
  },
  {
    id: "svc_user_platform_acquisition",
    slug: "user-platform-acquisition",
    number: "10",
    title: "User & Platform Acquisition Services",
    shortDesc: "Specialized digital acquisition and engagement architectures developed for web applications, membership services, and subscription products.",
    heroTagline: "Data-Driven Acquisition & Retention Architectures for SaaS, Apps & Subscription Platforms.",
    category: "Operations & Growth",
    iconName: "Users",
    fullOverview: "Specialized digital acquisition and engagement architectures developed for web applications, membership services, and subscription products. We combine multi-channel user acquisition campaigns with automated onboarding flows, churn reduction sequences, and cohort LTV optimization to build compounding subscription revenue.",
    keyProblemsSolved: [
      "High sign-up volume with low product activation and rapid user drop-off.",
      "High customer acquisition costs (CAC) exceeding customer lifetime value (LTV).",
      "Silent churn where users stop engaging without notifying support or feedback channels."
    ],
    howItWorks: [
      "Targeted Multi-Channel Campaigns: Driving qualified digital sign-ups across paid and partner distribution channels.",
      "Rapid User Onboarding: Streamlining initial account flows so users reach core value metrics instantly.",
      "Churn Reduction Workflows: Automated engagement triggers targeting at-risk users before churn occurs.",
      "Funnel Analytics & Cohort Audits: Precise optimization of Customer Acquisition Cost (CAC) against Lifetime Value (LTV)."
    ],
    keyAdvantages: [
      {
        title: "High-Retention Acquisition",
        description: "Focuses on activating long-term paying users rather than accumulating vanity trial numbers."
      },
      {
        title: "Favorable Unit Economics",
        description: "Marketing spend scales strictly alongside sustainable lifetime value margins and payback periods."
      },
      {
        title: "Continuous Product Refinement",
        description: "Data-backed A/B testing steadily increases onboarding conversion efficiency and feature adoption."
      },
      {
        title: "Automated Lifecycle Triggers",
        description: "Proactive email and in-app messages nudge users toward 'aha' moments automatically."
      }
    ],
    coreDeliverables: [
      { title: "User Sign-Up Acquisition Campaigns", description: "Targeted campaigns driving high-intent trial and freemium account registrations." },
      { title: "Automated Onboarding Journey", description: "Behavior-triggered email and in-app sequences guiding users through initial configuration." },
      { title: "Churn Detection & Re-engagement System", description: "Algorithmic triggers identifying inactive accounts and delivering personalized re-activation incentives." },
      { title: "CAC vs. LTV Cohort Dashboard", description: "Real-time analytics visualizing churn rates, expansion revenue, and customer payback velocity." }
    ],
    workflowSteps: [
      { step: 1, title: "Targeted User Ingestion", description: "Drives qualified trial sign-ups through intent-matched digital campaigns." },
      { step: 2, title: "Activation Sequence", description: "Triggers contextual guidance to ensure the user completes initial setup." },
      { step: 3, title: "Engagement Monitoring", description: "Monitors daily active usage and flags at-risk behavior before churn happens." },
      { step: 4, title: "LTV Expansion", description: "Automates upgrade prompts and annual plan incentives based on usage thresholds." }
    ],
    pricingModelNotice: "Growth Partnership combining Base Campaign Infrastructure with Performance Milestones.",
    idealFor: "SaaS founders, subscription businesses, digital platforms, and web applications seeking scalable user acquisition and durable cohort retention."
  }
];

export const VITTORIS_SOLUTIONS: Solution[] = [
  {
    id: "sol_sales_appointments",
    slug: "qualified-sales-appointments",
    title: "Generate Qualified Sales Appointments",
    tagline: "Fill calendars with pre-vetted corporate decision-makers on a performance pay-per-meeting basis.",
    businessProblem: "Sales teams waste up to 65% of their working hours cold-prospecting, chasing unvetted leads, or suffering through no-show appointments with unqualified contacts.",
    proposedAISystem: "Pay-Per-Appointment Engine + AI Screening & Omnichannel Show-Up Protection.",
    howItWorks: "Deploy targeted paid and inbound acquisition funnels, run prospects through written multi-parameter criteria, lock calendar availability, and maintain automated reminder cadences.",
    expectedImpact: "Eliminates empty prospecting hours, stabilizes calendar flow with educated buyers, and ties customer acquisition spend strictly to verified meetings.",
    metrics: [
      { label: "Target Meeting Show-Up Rate", value: "85%+" },
      { label: "Ad-Spend Risk", value: "Zero (Pay Per Meeting)" }
    ],
    relevantServiceSlugs: ["pay-per-appointment", "ai-appointment-setters", "high-ticket-acquisition"]
  },
  {
    id: "sol_24_7_inbound",
    slug: "24-7-inbound-response",
    title: "Respond to Inbound Leads 24/7",
    tagline: "Sub-minute response times across Web, WhatsApp, Meta channels, and voice.",
    businessProblem: "Inbound leads decay exponentially: contacting a lead within 5 minutes results in 21x higher qualification compared to waiting 30 minutes, yet most businesses lose after-hours traffic to voicemail.",
    proposedAISystem: "Conversational AI Agents & Inbound Bots + 24/7 Web/WhatsApp Infrastructure.",
    howItWorks: "Embeds intelligent conversational agents across websites, messaging platforms, and phone lines to immediately greet, qualify, and book inbound visitors at any hour.",
    expectedImpact: "Captures evening, weekend, and holiday opportunities that were previously abandoned, multiplying website conversion ROI.",
    metrics: [
      { label: "Average Response Time", value: "< 15 Seconds" },
      { label: "Coverage Window", value: "24/7/365 Non-Stop" }
    ],
    relevantServiceSlugs: ["conversational-ai-agents", "ai-voice-agents", "ai-appointment-setters"]
  },
  {
    id: "sol_automate_admin",
    slug: "automate-administrative-work",
    title: "Automate Repetitive Administrative Work",
    tagline: "Dissolve clerical bottlenecks between sales, contracting, delivery, and billing.",
    businessProblem: "High-value employees spend 15+ hours every week manually cross-posting data between forms, CRMs, spreadsheets, and accounting software, leading to clerical errors and project delays.",
    proposedAISystem: "Business Process Automation & Tech Stack Integration Hub.",
    howItWorks: "Establishes webhook and API connections between your core tools to automatically distribute leads, create project workspaces, generate invoices, and send milestone updates.",
    expectedImpact: "Reclaims high-value team capacity for revenue generation, speeds up client execution, and scales operational volume without adding administrative headcount.",
    metrics: [
      { label: "Manual Data Entry Reduction", value: "Up to 80%" },
      { label: "Execution Timeline Speedup", value: "3x to 5x Faster" }
    ],
    relevantServiceSlugs: ["business-process-automation", "custom-ai-systems", "strategic-ai-integration"]
  },
  {
    id: "sol_sales_followup",
    slug: "lead-qualification-and-followup",
    title: "Improve Lead Qualification & Sales Follow-ups",
    tagline: "Algorithmic lead scoring and persistent multi-channel follow-up cadences.",
    businessProblem: "Over 48% of sales reps never make a second follow-up attempt, leaving warm commercial opportunities to drift to competitors, while unvetted inquiries dilute pipeline clarity.",
    proposedAISystem: "Sales Intelligence Lead Scoring + Autonomous Multi-Channel Follow-Up.",
    howItWorks: "Scores leads by closing probability based on firmographic and engagement metrics; triggers persistent automated follow-up cadences via WhatsApp, email, and voice until converted.",
    expectedImpact: "Ensures every single lead is worked systematically, alerts reps to high-yield opportunities, and prevents pipeline leaks permanently.",
    metrics: [
      { label: "Follow-Up Cadence Persistence", value: "100% Systematic" },
      { label: "Lead-to-Meeting Conversion", value: "Measurable Lift" }
    ],
    relevantServiceSlugs: ["ai-appointment-setters", "custom-ai-systems", "ai-voice-agents"]
  },
  {
    id: "sol_knowledge_assistants",
    slug: "internal-ai-knowledge-assistants",
    title: "Build Internal AI Assistants",
    tagline: "Empower staff with instant, secure company-wide AI trained on internal catalogs, SOPs, and manuals.",
    businessProblem: "Staff spend hours searching through folders, intranets, and technical manuals for product specs, compliance rules, or pricing guidelines, interrupting senior team members.",
    proposedAISystem: "Custom AI Systems & Enterprise Vector Knowledge Repositories.",
    howItWorks: "Indexes internal documents, SOPs, service catalogs, and regulatory guidelines into a private, secure AI assistant accessible via web portal or internal Slack/Teams channels.",
    expectedImpact: "Provides immediate, accurate answers to team inquiries in seconds, ensuring operational compliance and slashing staff onboarding times.",
    metrics: [
      { label: "Information Retrieval Time", value: "Under 5 Seconds" },
      { label: "Data Security", value: "Private Enterprise Store" }
    ],
    relevantServiceSlugs: ["custom-ai-systems", "strategic-ai-integration"]
  },
  {
    id: "sol_document_processing",
    slug: "automate-documents-and-proposals",
    title: "Automate Document & Proposal Processing",
    tagline: "Instantly extract data from invoices, quotes, and contracts to draft client-ready commercial proposals.",
    businessProblem: "Preparing commercial bids and complex proposals requires manual transcription from multiple vendor quotes, spreadsheets, and specification sheets, introducing errors and quoting delays.",
    proposedAISystem: "Automated Document Intelligence & Proposal Generation Pipeline.",
    howItWorks: "AI extracts unstructured data from uploaded PDFs, verifies totals, checks historical pricing rules, and formats client-ready proposals in your exact corporate design.",
    expectedImpact: "Reduces proposal drafting turnaround from days to minutes, allowing sales teams to strike while customer buying urgency is highest.",
    metrics: [
      { label: "Drafting Turnaround", value: "Minutes vs Days" },
      { label: "Clerical Error Rate", value: "Near Zero" }
    ],
    relevantServiceSlugs: ["custom-ai-systems", "business-process-automation"]
  },
  {
    id: "sol_marketing_funnels",
    slug: "optimize-marketing-and-acquisition",
    title: "Improve Marketing & Acquisition Funnels",
    tagline: "Continuous AI creative testing, audience modeling, and intent-driven organic discovery.",
    businessProblem: "Marketing campaigns stagnate when creative fatigue sets in, causing cost-per-lead to soar while teams guess at which messaging angle might work next.",
    proposedAISystem: "AI-Driven Demand Generation & Predictive Audience Modeling.",
    howItWorks: "Combines predictive demographic targeting with automated creative hook testing across Google, Meta, and YouTube, supported by commercial intent SEO.",
    expectedImpact: "Systematically drives down customer acquisition costs, isolates winning marketing angles in weeks, and establishes durable pipeline assets.",
    metrics: [
      { label: "Testing Velocity", value: "Dozens of Angles / Mo" },
      { label: "CAC Efficiency", value: "Continuous Algorithmic Optimization" }
    ],
    relevantServiceSlugs: ["ai-demand-generation", "user-platform-acquisition", "pay-per-appointment"]
  },
  {
    id: "sol_executive_dashboards",
    slug: "monitor-performance-dashboards",
    title: "Monitor Performance Through Dashboards",
    tagline: "Real-time executive reporting aggregating CRM, marketing spend, and operational metrics.",
    businessProblem: "Leadership lacks real-time clarity into pipeline health, relying on stale end-of-month spreadsheets that fail to reflect actual sales velocity and customer unit economics.",
    proposedAISystem: "AI-Powered Executive Performance Dashboards & Telemetry.",
    howItWorks: "Aggregates live data streams from ad managers, CRM pipelines, calendar bookings, and invoicing software into intuitive, automated executive reporting views.",
    expectedImpact: "Gives leadership real-time decision clarity, eliminates manual reporting assembly, and surfaces bottleneck alerts immediately.",
    metrics: [
      { label: "Reporting Latency", value: "Live Real-Time" },
      { label: "Manual Report Prep Time", value: "100% Eliminated" }
    ],
    relevantServiceSlugs: ["custom-ai-systems", "business-process-automation", "strategic-ai-integration"]
  }
];

export const VITTORIS_INDUSTRIES: Industry[] = [
  {
    id: "ind_professional_services",
    slug: "professional-business-services",
    title: "Professional & Business Services",
    subtitle: "Legal, Accounting, Advisory & Financial Consultancies",
    iconName: "Scale",
    overview: "High-ticket professional firms require meticulous qualification and white-glove client handling. Vittoris automates intake, screens for case/contract minimums, and schedules verified consultation meetings.",
    painPoints: [
      "Senior partners spending hours reviewing unqualified client inquiries.",
      "Manual drafting of engagement letters and fee agreements.",
      "High no-show rates for initial diagnostic consultations."
    ],
    tailoredAutomations: [
      "Pay-Per-Appointment qualified consultations with verified retainer budgets",
      "Document intelligence extracting financials from uploaded balance sheets and tax files",
      "Internal knowledge assistant trained on firm practice areas and compliance precedents",
      "Show-up voice and WhatsApp confirmation cadences"
    ],
    exampleWorkflow: "Client submits inquiry -> AI checks conflict of interest & budget parameters -> Confirms partner calendar slot -> Dispatches NDA & onboarding questionnaire.",
    metricHighlight: "Reclaims 12+ partner hours weekly from low-tier vetting."
  },
  {
    id: "ind_b2b_saas",
    slug: "b2b-technology-and-saas",
    title: "B2B Technology & SaaS",
    subtitle: "Software Platforms, Cloud Infrastructure & Subscription Products",
    iconName: "Terminal",
    overview: "SaaS companies require rapid speed-to-lead for high-value enterprise tiers and automated onboarding architectures to drive trial activation and prevent early churn.",
    painPoints: [
      "Inbound demo requests sitting unanswered for hours while buyer intent cools.",
      "High sign-up volume with low product activation rates.",
      "Difficulty bridging product-qualified leads (PQLs) to enterprise sales closers."
    ],
    tailoredAutomations: [
      "12-second speed-to-lead chat and call activation on enterprise demo requests",
      "Algorithmic lead scoring matching firmographic data to sales rep capacity",
      "Automated trial onboarding cadences driving users to core 'aha' moments",
      "Churn prediction workflows triggering retention incentives for at-risk accounts"
    ],
    exampleWorkflow: "Visitor clicks 'Request Enterprise Demo' -> AI chats in 10s to verify seat count -> Books AE calendar -> Enriches CRM with LinkedIn & revenue data.",
    metricHighlight: "3.2x increase in speed-to-lead qualification rate."
  },
  {
    id: "ind_real_estate",
    slug: "real-estate-and-commercial",
    title: "Real Estate & Commercial Development",
    subtitle: "Commercial Brokerages, Luxury Developments & Asset Portfolios",
    iconName: "Building2",
    overview: "High-value commercial real estate transactions require strict verification of buyer purchasing authority, proof of capital, and immediate responsiveness to high-intent property inquiries.",
    painPoints: [
      "Brokers overwhelmed by tire-kickers lacking verified capital capacity.",
      "Property listings receiving after-hours inquiries that get lost over weekends.",
      "Complex commercial lease proposals taking days to assemble manually."
    ],
    tailoredAutomations: [
      "24/7 conversational agents answering specific property questions on Web and WhatsApp",
      "Automated verification of purchase authority, timeline, and financing status",
      "Document AI extracting lease terms, square footage, and tenant covenants to draft proposals",
      "Outbound AI voice agents conducting database reactivation on past high-net-worth buyers"
    ],
    exampleWorkflow: "Investor messages on WhatsApp about commercial asset -> Bot verifies investment budget -> Shares teaser deck -> Coordinates private site audit with lead broker.",
    metricHighlight: "100% weekend lead capture with zero broker burnout."
  },
  {
    id: "ind_consulting_agencies",
    slug: "consulting-and-agencies",
    title: "Consulting Firms & Strategic Agencies",
    subtitle: "Management Consultants, Digital Agencies & Brand Strategists",
    iconName: "Briefcase",
    overview: "Consultancies rely on high-margin commercial client engagements. Vittoris builds outbound pipeline engines that secure decision-maker meetings with enterprise VP and C-level prospects.",
    painPoints: [
      "Feast-and-famine pipeline swings when delivery takes priority over prospecting.",
      "Relying on unpredictable word-of-mouth for project acquisition.",
      "Manual assembly of bespoke commercial proposals and scope documents."
    ],
    tailoredAutomations: [
      "Proactive High-Ticket B2B Acquisition targeting verified C-suite corporate decision-makers",
      "Pay-per-appointment discovery meetings with pre-vetted corporate budgets",
      "Automated scope-of-work pipeline converting intake questionnaires into proposals",
      "Milestone tracking and automated accounts receivable billing sequences"
    ],
    exampleWorkflow: "System sources verified corporate CMOs -> Deploys contextual outreach -> AI setter locks calendar slot -> Dispatches strategic briefing before meeting.",
    metricHighlight: "Predictable monthly pipeline replacing erratic referrals."
  },
  {
    id: "ind_high_ticket_services",
    slug: "high-ticket-service-providers",
    title: "High-Ticket Service Providers & Contractors",
    subtitle: "Commercial Contracting, Specialized Engineering & Luxury Services",
    iconName: "Wrench",
    overview: "Contractors and high-ticket service operations need fast, professional quoting and automated customer follow-ups to turn inquiries into closed, high-margin projects.",
    painPoints: [
      "Losing projects to competitors simply due to delayed quote follow-ups.",
      "Manual phone calls taking office staff away from job site management.",
      "Legacy client databases with hundreds of thousands in dormant revenue sitting uncontacted."
    ],
    tailoredAutomations: [
      "AI Voice agents answering every incoming customer call with professional script compliance",
      "Automated quote follow-up system that systematically checks in on open proposals",
      "Database reactivation voice campaigns bringing past customers back for annual service",
      "Instant review and customer satisfaction workflows triggered upon job completion"
    ],
    exampleWorkflow: "Customer calls after hours -> Voice AI answers, answers scope questions, and books an on-site audit -> Sends text confirmation -> Alerts field engineer.",
    metricHighlight: "Zero missed inbound opportunities; 40% reactivation on dormant bids."
  },
  {
    id: "ind_subscription_platforms",
    slug: "subscription-and-membership-businesses",
    title: "Subscription & Membership Businesses",
    subtitle: "Digital Memberships, Subscription Commerce & Masterminds",
    iconName: "CreditCard",
    overview: "Subscription business models succeed on favorable unit economics: keeping customer acquisition costs low while maximizing retention and lifetime value through automated engagement.",
    painPoints: [
      "High subscriber acquisition costs eroding unit margins.",
      "Silent churn where users disengage and cancel without feedback.",
      "Lack of real-time visibility into customer acquisition cost vs lifetime value cohorts."
    ],
    tailoredAutomations: [
      "Omnichannel paid media acquisition optimized for high-retention subscriber cohorts",
      "Automated onboarding email and messaging flows driving feature adoption",
      "Behavioral churn detection triggering re-activation incentives before cancellation",
      "Real-time CAC, LTV, and churn telemetry dashboard"
    ],
    exampleWorkflow: "New subscriber joins -> AI monitors 7-day usage -> If inactive on day 3, sends contextual guide -> If active, offers annual upgrade at optimal milestone.",
    metricHighlight: "Measurable reduction in first-60-day subscriber churn."
  }
];

export const VITTORIS_ENGAGEMENT_PHASES: EngagementPhase[] = [
  {
    step: 1,
    phase: "Phase 1",
    title: "Operational Audit & Diagnostic",
    timeline: "Weeks 1–2",
    description: "A focused diagnostic deep dive mapping daily workflows, existing pipeline flow, closing metrics, and quarterly targets to pinpoint exact administrative and financial inefficiencies.",
    deliverables: [
      "Operational Bottleneck Matrix & Labor Waste Assessment",
      "Current Pipeline Leakage & Speed-to-Lead Audit",
      "Data Asset, Tool Stack & Integration Permissions Map"
    ],
    outcome: "Crystal-clear visibility into high-yield opportunities where AI automation generates immediate financial ROI."
  },
  {
    step: 2,
    phase: "Phase 2",
    title: "Architecture & Strategic Roadmap",
    timeline: "Weeks 2–3",
    description: "A concrete assessment detailing operational bottlenecks, deployment plans, and investment terms. Systems are prioritized strictly by measurable ROI and speed of deployment.",
    deliverables: [
      "Written Qualification Criteria Charter for Client Acquisition",
      "Technical Systems Architecture & API Integration Blueprint",
      "Milestone Deployment Schedule with Clear KPI Benchmarks"
    ],
    outcome: "An agreed, risk-managed engineering roadmap completely avoiding experimental tools or vanity features."
  },
  {
    step: 3,
    phase: "Phase 3",
    title: "Custom Engineering & Rapid Setup",
    timeline: "Weeks 3–5",
    description: "Connecting platform access, defining qualification criteria, locking performance benchmarks, and custom-engineering robust, proprietary workflows that integrate with your existing software stack.",
    deliverables: [
      "Bespoke Conversational & Voice Agent Configurations",
      "Custom Document Intelligence & Lead Scoring Pipelines",
      "Omnichannel Webhook Connections & Calendar Integrations",
      "Multi-Layer Testing in Staging Environment"
    ],
    outcome: "Functional, private AI infrastructure engineered directly around your proprietary business data."
  },
  {
    step: 4,
    phase: "Phase 4",
    title: "Build, Launch & Team Onboarding",
    timeline: "Weeks 5–6",
    description: "Complete configuration, testing, and multi-channel deployment paired with hands-on staff training to guarantee rapid organizational adoption without workflow friction.",
    deliverables: [
      "Production Multi-Channel Deployment (Web, WhatsApp, CRM, Voice)",
      "Interactive Staff Training Sessions & Video Playbooks",
      "Live Pilot Monitoring & Exception Handling Protocols"
    ],
    outcome: "Seamless internal buy-in where staff master the tools to reclaim high-value closing capacity."
  },
  {
    step: 5,
    phase: "Phase 5",
    title: "Continuous Refinement & Scale",
    timeline: "Ongoing",
    description: "Real-time optimization against target metrics, expanding automation coverage as pipeline results compound. Ongoing tuning of prompts, connectors, and algorithmic scoring.",
    deliverables: [
      "Weekly Pipeline & Appointment Telemetry Audits",
      "Continuous Prompt Optimization & Logic Refinement",
      "Expansion into Secondary Automations as ROI Compounds"
    ],
    outcome: "Compounding operational velocity and scalable client acquisition that outpaces competitors permanently."
  }
];

export const VITTORIS_OUTCOMES: MeasurableOutcome[] = [
  {
    id: "out_predictable_pipeline",
    title: "A Predictable Sales Pipeline",
    description: "A stable, continuous flow of pre-qualified meetings replacing feast-and-famine pipeline swings.",
    metricTag: "Predictable Bookings"
  },
  {
    id: "out_sales_productivity",
    title: "Maximum Sales Productivity",
    description: "Account executives and closers spend their hours exclusively closing ready buyers rather than cold prospecting.",
    metricTag: "100% Closing Focus"
  },
  {
    id: "out_overhead_reduction",
    title: "Radical Overhead Reduction",
    description: "Heavy manual data entry, clerical bottlenecks, and tracking overhead drop away permanently.",
    metricTag: "Hours Reclaimed Daily"
  },
  {
    id: "out_brand_responsiveness",
    title: "Continuous Brand Responsiveness",
    description: "Every inquiry across Web, WhatsApp, and phone receives instantaneous, professional handling 24/7/365.",
    metricTag: "Sub-Minute Response"
  },
  {
    id: "out_uncapped_scalability",
    title: "Uncapped Scalability",
    description: "Operational volume multiplies cleanly without requiring proportional additions to internal administrative overhead.",
    metricTag: "Elastic Scale"
  }
];

export const WHY_CHOOSE_VITTORIS = [
  {
    title: "Cross-Niche Systems Architecture",
    description: "Modular frameworks configured around unit economics, sales cycles, and buyer psychology across diverse high-ticket industries.",
    badge: "Tailored Architecture"
  },
  {
    title: "Strict Performance Alignment",
    description: "The pay-per-appointment framework ensures compensation is tied directly to real commercial results rather than vanity metrics.",
    badge: "Risk-Free Alignment"
  },
  {
    title: "Permanent Asset Creation",
    description: "Businesses own the custom infrastructure deployed rather than renting a recurring black box that disappears when subscriptions lapse.",
    badge: "Business Equity"
  },
  {
    title: "Strategy Combined With Engineering",
    description: "High-level strategic pipeline design paired with rigorous, full-stack automation engineering under one roof.",
    badge: "End-to-End Rigor"
  },
  {
    title: "Zero Platform Disruption",
    description: "Automations integrate natively into active software tools (Salesforce, HubSpot, Slack, GSuite) without requiring disruptive system overhauls.",
    badge: "Native Integration"
  }
];

export const COMPANY_CONTACT_DETAILS = {
  brandName: "VITTORIS",
  tagline: "AI-Powered Growth and AI Services for Modern Businesses",
  primaryEmail: "info@vittoris.com",
  email: "info@vittoris.com",
  secondaryEmail: "contact@vittoris.in",
  phoneDisplay: "+91 90159 20523",
  phone: "+91 90159 20523",
  phoneRaw: "+919015920523",
  directSupport: "+91 90159 20523",
  whatsAppUrl: "https://wa.me/919015920523?text=Hello%20Vittoris%20team,%20I%20would%20like%20to%20learn%20more%20about%20your%20growth%20and%20ai%20services."
};
