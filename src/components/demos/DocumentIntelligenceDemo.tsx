import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, CheckCircle2, FileCheck, Cpu } from 'lucide-react';

interface SampleDoc {
  id: string;
  name: string;
  sourceType: string;
  rawSnippet: string;
  extractedItems: { label: string; value: string }[];
  draftProposal: {
    client: string;
    scopeSummary: string;
    deliverables: string[];
    billingSchedule: string;
    governanceRisk: string;
  };
}

export const DocumentIntelligenceDemo: React.FC = () => {
  const sampleDocs: SampleDoc[] = [
    {
      id: 'vendor-quote',
      name: 'Subcontractor Infrastructure Quote (PDF)',
      sourceType: 'Vendor Quote & SLA',
      rawSnippet: "QUOTE #VQ-9921\nVendor: Nexus Cloud DevOps Ltd\nScope: Migrating 14 on-premise clusters to AWS EKS. Estimated 160 engineering hours @ $175/hr. Backup disaster recovery protocol included. Completion window 60 calendar days from MSA execution. Total quote: $28,000 net 30.",
      extractedItems: [
        { label: 'Vendor Entity', value: 'Nexus Cloud DevOps Ltd' },
        { label: 'Core Technical Scope', value: '14 Clusters to AWS EKS Migration' },
        { label: 'Engineering Hours', value: '160 Billable Hours' },
        { label: 'Hourly Commercial Rate', value: '$175.00 / hour' },
        { label: 'Total Contract Value', value: '$28,000.00 USD' },
        { label: 'Payment Terms', value: 'Net 30 post-delivery' }
      ],
      draftProposal: {
        client: 'Enterprise Client Infrastructure Proposal',
        scopeSummary: 'Managed AWS EKS Cluster Migration & Disaster Recovery Deployment',
        deliverables: [
          'Full migration of 14 production clusters to managed AWS EKS with zero downtime',
          'Automated multi-region failover and SLA compliance monitoring',
          'Post-migration performance verification and engineering handoff documentation'
        ],
        billingSchedule: '40% Upon Project Kickoff, 40% Milestone Completion, 20% Net 30 Final Handoff',
        governanceRisk: 'Zero clerical discrepancy. Vendor quote line items mapped with 100% margin alignment.'
      }
    },
    {
      id: 'commercial-rfp',
      name: 'Corporate Commercial RFP Intake Brief',
      sourceType: 'Intake RFP & Scope Matrix',
      rawSnippet: "REQUEST FOR PROPOSAL - B2B PIPELINE MODERNIZATION\nTarget: High-Ticket Financial Advisory Services\nCurrent Problem: SDR team dials 80 cold leads daily with < 1.4% booking rate. Need automated qualification for individuals with $1M+ liquid net worth.\nTimeline: Deployment needed in 4 weeks.\nBudget authorization: Approved up to $60,000 annually.",
      extractedItems: [
        { label: 'Client Sector', value: 'Wealth Advisory & Capital Services' },
        { label: 'Primary Friction', value: 'Cold outbound fatigue & unvetted lead leakage' },
        { label: 'Qualification Requirement', value: '$1M+ Liquid Net Worth Verification' },
        { label: 'Authorized Budget', value: '$60,000 Annual System Allocation' },
        { label: 'Deployment Velocity', value: '4-Week Turnaround Window' }
      ],
      draftProposal: {
        client: 'Bespoke AI Inbound Screening & Appointment System',
        scopeSummary: 'High-Ticket Financial Lead Intake with Automated Net Worth Verification',
        deliverables: [
          'Multi-channel inbound qualification funnel verifying liquid asset thresholds',
          'Conversational AI setter for instant WhatsApp/SMS booking verification',
          'Show-up protection sequences integrated directly into wealth advisors calendars'
        ],
        billingSchedule: 'Pay-Per-Qualified Appointment commercial model with zero billing for unvetted leads',
        governanceRisk: 'Full compliance with wealth advisory communication standards and encrypted intake.'
      }
    }
  ];

  const [activeDocId, setActiveDocId] = useState(sampleDocs[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasExtracted, setHasExtracted] = useState(true);

  const doc = sampleDocs.find(d => d.id === activeDocId) || sampleDocs[0];

  const handleProcess = () => {
    setIsProcessing(true);
    setHasExtracted(false);
    setTimeout(() => {
      setIsProcessing(false);
      setHasExtracted(true);
    }, 600);
  };

  return (
    <div className="w-full bg-[#0B0F1E] border border-blue-900/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Automated Document Intelligence
            </div>
            <h3 className="text-xl font-bold text-white">Unstructured Document & Proposal Automation</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Instantly extract data from invoices, vendor quotes, and complex contracts to draft client-ready proposals in seconds, completely eliminating clerical errors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {sampleDocs.map(d => (
              <button
                key={d.id}
                onClick={() => { setActiveDocId(d.id); handleProcess(); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeDocId === d.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {d.sourceType}
              </button>
            ))}
          </div>
        </div>

        {/* Processing Simulation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Raw Document Input */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-400" /> Intake Document Sample
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Unstructured Text</span>
            </div>

            <div className="bg-[#070A14] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 h-[260px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {doc.rawSnippet}
            </div>

            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Extracting Entities & Clauses...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Re-Analyze & Generate Client Proposal</span>
                </>
              )}
            </button>
          </div>

          {/* Right: Structured Output & Draft Proposal */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <FileCheck className="w-4 h-4" /> AI-Drafted Client Proposal
              </span>
              <span className="text-emerald-400 font-mono text-[10px]">Zero Clerical Error Guarantee</span>
            </div>

            {hasExtracted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4 text-xs"
              >
                {/* Extracted Key Attributes Grid */}
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-400 mb-2">Structured Entity Extraction</div>
                  <div className="grid grid-cols-2 gap-2">
                    {doc.extractedItems.map((item, idx) => (
                      <div key={idx} className="p-2 rounded bg-[#070A14] border border-slate-800/80">
                        <div className="text-[10px] text-slate-500">{item.label}</div>
                        <div className="text-xs text-white font-medium truncate mt-0.5">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Draft Proposal Details */}
                <div className="p-3.5 rounded-lg bg-blue-950/20 border border-blue-900/40 space-y-2">
                  <div className="font-bold text-white text-sm">{doc.draftProposal.client}</div>
                  <div className="text-[11px] text-slate-300 font-medium">{doc.draftProposal.scopeSummary}</div>
                  
                  <div className="space-y-1 pt-1">
                    {doc.draftProposal.deliverables.map((del, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] flex justify-between items-center text-slate-400">
                    <span>Billing Framework: <strong className="text-cyan-300">{doc.draftProposal.billingSchedule}</strong></span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-[260px] bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500 text-xs">
                Extracting entities...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
