// VITTORIS Enterprise AI Types

export interface ServiceAdvantage {
  title: string;
  description: string;
}

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  tooling?: string;
}

export interface Service {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDesc: string;
  heroTagline: string;
  category: "Client Acquisition" | "Custom AI & Infrastructure" | "Autonomous Agents" | "Operations & Growth";
  iconName: string;
  fullOverview: string;
  keyProblemsSolved: string[];
  howItWorks: string[];
  qualificationCriteria?: string[];
  keyAdvantages: ServiceAdvantage[];
  coreDeliverables: ServiceDeliverable[];
  workflowSteps: WorkflowStep[];
  pricingModelNotice: string;
  idealFor: string;
}

export interface Solution {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  businessProblem: string;
  proposedAISystem: string;
  howItWorks: string;
  expectedImpact: string;
  metrics: { label: string; value: string }[];
  relevantServiceSlugs: string[];
}

export interface Industry {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  iconName: string;
  overview: string;
  painPoints: string[];
  tailoredAutomations: string[];
  exampleWorkflow: string;
  metricHighlight: string;
}

export interface EngagementPhase {
  step: number;
  phase: string;
  title: string;
  timeline: string;
  description: string;
  deliverables: string[];
  outcome: string;
}

export interface MeasurableOutcome {
  id: string;
  title: string;
  description: string;
  metricTag: string;
}

export interface DiscoveryBookingInput {
  fullName: string;
  businessEmail: string;
  companyName: string;
  website?: string;
  serviceOfInterest: string;
  monthlyRevenue: string;
  projectDescription: string;
  preferredContact: "Email" | "Phone" | "WhatsApp";
  phone?: string;
  selectedDate?: string;
  selectedTimeSlot?: string;
}
