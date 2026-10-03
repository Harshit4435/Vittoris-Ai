import type { SolarOwner } from '../types/solar';
import ownerPhoto from '../assets/branding/owner-photo.jpg';

export const ownersData: SolarOwner[] = [
  {
    id: 'udayveer-singh',
    name: 'Udayveer Singh',
    role: 'Founder | Vittoris',
    company: 'Vittoris',
    bio: 'Vittoris is an outcome-driven growth and automation company engineered to deploy bespoke AI operational infrastructure and performance-based client acquisition. Expanding into the clean energy and solar panel sector, Vittoris powers premier solar project visibility—connecting high-intent property owners with advanced solar architectures through automated screening, AI voice agents, and turnkey operational systems.',
    avatar: ownerPhoto,
    verified: true,
    location: 'Remote • Global Matchmaking',
    availability: 'Virtual & On-Site Consultations',
    pricing: 'Direct Consultation via info@vittoris.com',
    specialization: 'Solar Panel Project Visibility & AI-Powered Matchmaking',
    services: [
      'Solar Panel Project Visibility',
      'AI-Powered Appointment Setting',
      '24/7 Conversational AI & Voice Agents',
      'Automated Solar Proposal Intelligence',
      'Commercial Rooftop Feasibility',
      'High-Ticket Client Acquisition',
      'BIPV & Clean Energy Matchmaking',
      'Operational Process Automation'
    ],
    phone: '+91 90159 20523',
    email: 'info@vittoris.com',
    secondaryEmail: 'udayveer@vittoris.com',
    availableMeetingTypes: [
      'Virtual Consultation',
      'On-Site Feasibility Audit',
      'Rooftop Host Leasing Sync',
      'EPC Partnership'
    ]
  }
];
