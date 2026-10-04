import React, { useState } from 'react';
import { Sparkles, Bot, PhoneCall, Zap, BarChart3, FileText } from 'lucide-react';
import { LeadQualificationDemo } from '../components/demos/LeadQualificationDemo';
import { AppointmentWorkflowDemo } from '../components/demos/AppointmentWorkflowDemo';
import { ChatbotDemo } from '../components/demos/ChatbotDemo';
import { VoiceAgentDemo } from '../components/demos/VoiceAgentDemo';
import { DocumentIntelligenceDemo } from '../components/demos/DocumentIntelligenceDemo';
import { ExecutiveDashboardDemo } from '../components/demos/ExecutiveDashboardDemo';

interface DemosProps {
  onOpenConsultation: () => void;
}

export const Demos: React.FC<DemosProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<string>('qualification');

  const demoList = [
    {
      id: 'qualification',
      label: 'AI Lead Qualification',
      icon: Zap,
      serviceContext: 'Service 01 & 09: Pay-Per-Appointment & High-Ticket Sourcing'
    },
    {
      id: 'appointment',
      label: '6-Step Setter Pipeline',
      icon: Sparkles,
      serviceContext: 'Service 05: Autonomous AI Appointment Setters'
    },
    {
      id: 'chatbot',
      label: 'Conversational Inbound Bot',
      icon: Bot,
      serviceContext: 'Service 03: Conversational AI Agents & Inbound Bots'
    },
    {
      id: 'voice',
      label: 'AI Voice Agent Simulator',
      icon: PhoneCall,
      serviceContext: 'Service 04: AI Voice Agents & Telephony'
    },
    {
      id: 'document',
      label: 'Document Intelligence & RFP',
      icon: FileText,
      serviceContext: 'Service 02 & 06: Custom AI & Business Process Automation'
    },
    {
      id: 'dashboard',
      label: 'Executive ROI Modeler',
      icon: BarChart3,
      serviceContext: 'Service 08 & 10: Demand Generation & Executive Dashboards'
    }
  ];

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive AI Systems Lab</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Test-Drive Vittoris Autonomous Infrastructure
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Explore interactive, front-end operational simulations of our qualification filters, appointment sequences, conversational bots, voice agents, and document extraction engines.
        </p>
        <div className="inline-block px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          Simulated Sandbox Environment • Isolated from Production Data
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-[#0B0F1E] border border-blue-900/30 rounded-2xl">
        {demoList.map((d) => {
          const Icon = d.icon;
          const isActive = activeTab === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setActiveTab(d.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{d.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Demo Panel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <span>
            Current Lab: <strong className="text-cyan-400">{demoList.find(d => d.id === activeTab)?.serviceContext}</strong>
          </span>
          <span className="font-mono text-emerald-400">● Sandbox Active</span>
        </div>

        {activeTab === 'qualification' && <LeadQualificationDemo />}
        {activeTab === 'appointment' && <AppointmentWorkflowDemo />}
        {activeTab === 'chatbot' && <ChatbotDemo />}
        {activeTab === 'voice' && <VoiceAgentDemo />}
        {activeTab === 'document' && <DocumentIntelligenceDemo />}
        {activeTab === 'dashboard' && <ExecutiveDashboardDemo />}
      </div>

      {/* Deployment Consultation Callout */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0B0F1E] to-cyan-950/30 border border-blue-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white">Deploy These Systems in Your Company</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Vittoris integrates these capabilities directly into your existing CRM, VoIP telephony, website, and messaging channels without system disruption.
          </p>
        </div>
        <button
          onClick={onOpenConsultation}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 shrink-0"
        >
          Book Architecture Review
        </button>
      </div>
    </div>
  );
};
