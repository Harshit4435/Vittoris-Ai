import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, CheckCircle2, MessageSquare, Calendar, Bell, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

interface Stage {
  id: number;
  name: string;
  subtext: string;
  duration: string;
  channel: string;
  icon: React.ComponentType<{ className?: string }>;
  actionDetails: string;
  payload: {
    event: string;
    target: string;
    verification: string;
  };
}

export const AppointmentWorkflowDemo: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const stages: Stage[] = [
    {
      id: 1,
      name: 'Immediate Lead Ingestion',
      subtext: 'Captures data across forms, ads, chatbots, and inbound lines instantly.',
      duration: '< 1.2s Latency',
      channel: 'Webhook / Meta Graph API',
      icon: Zap,
      actionDetails: 'Inbound high-intent form submission parsed. Contact enriched with corporate domain data.',
      payload: {
        event: 'lead.captured.v1',
        target: 'Enterprise Prospect: Marcus Sterling (CEO, Vantage Logistics)',
        verification: 'Corporate domain & LinkedIn profile authenticated'
      }
    },
    {
      id: 2,
      name: 'Speed-to-Lead Activation',
      subtext: "Initiates contact within seconds on the prospect's native channel (Call, SMS, WhatsApp).",
      duration: '14s Elapsed',
      channel: 'WhatsApp Enterprise & Instant Voice Line',
      icon: MessageSquare,
      actionDetails: 'Conversational AI greets Marcus via WhatsApp with context-specific reference to his logistics fleet inquiry.',
      payload: {
        event: 'outreach.initiated',
        target: 'WhatsApp dispatch + automated voice bridge ready',
        verification: 'Message delivered & read receipt verified'
      }
    },
    {
      id: 3,
      name: 'Dynamic Screening & Objection Handling',
      subtext: 'Vets target requirements, budget minimums, and resolves preliminary objections automatically.',
      duration: '1m 45s Elapsed',
      channel: 'Conversational AI Setter',
      icon: ShieldCheck,
      actionDetails: 'Prospect asks about pricing structure. AI explains performance-based model and qualifies $45k quarterly scope.',
      payload: {
        event: 'criteria.evaluated',
        target: 'Authority: CEO (Verified) | Budget: $45k (Pass) | Need: Q4 Rollout',
        verification: 'Contractual pre-qualification threshold 100% met'
      }
    },
    {
      id: 4,
      name: 'Calendar Confirmation & Injection',
      subtext: 'Synchronizes real-time Account Executive availability and confirms the appointment into CRM.',
      duration: '2m 30s Elapsed',
      channel: 'Google Workspace / HubSpot CRM API',
      icon: Calendar,
      actionDetails: 'AI presents 2 optimal time slots. Marcus selects Thursday 10:00 AM EST. Event injected directly into senior AE calendar.',
      payload: {
        event: 'calendar.slot_locked',
        target: 'Meeting ID #VIT-8841 locked with AE Sarah Lin',
        verification: 'Cal invite dispatched + CRM deal record created'
      }
    },
    {
      id: 5,
      name: 'Attendance & Show-Up Protection',
      subtext: 'Executes automated pre-meeting briefing cadences across SMS, WhatsApp, and voice protocols.',
      duration: 'T-24h & T-1h Cadence',
      channel: 'Omnichannel Protocol Cadence',
      icon: Bell,
      actionDetails: 'Sends 1-page executive brief, agenda overview, and calendar reminder with 1-click confirmation.',
      payload: {
        event: 'showup_protocol.confirmed',
        target: 'Show-up rate probability calculated at 94.2%',
        verification: 'Executive confirmed via WhatsApp quick reply'
      }
    },
    {
      id: 6,
      name: 'No-Show & Drop-Off Reactivation',
      subtext: 'Re-engages drop-offs automatically to reschedule without sales friction.',
      duration: 'Instant Fail-Safe Protocol',
      channel: 'Automated Reactivation Loop',
      icon: RefreshCw,
      actionDetails: 'If a prospect requests reschedule or drops off, autonomous nurture loop reactivates them with alternative times.',
      payload: {
        event: 'loop.standby_ready',
        target: 'Zero lead leakage protocol active',
        verification: 'No sales representative hours squandered'
      }
    }
  ];

  // Auto progression when playing
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev < 6 ? prev + 1 : 1));
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const currentStage = stages.find(s => s.id === activeStep) || stages[0];

  return (
    <div className="w-full bg-[#0B0F1E] border border-blue-900/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Zap className="w-3.5 h-3.5" /> 6-Step Autonomous Sequence
            </div>
            <h3 className="text-xl font-bold text-white">AI Appointment Setter Pipeline</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Turn raw inbound leads into confirmed sales meetings without a single manual touchpoint, slashing response time from hours to seconds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all shadow-md shadow-blue-600/30"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Sequence' : 'Auto Play'}</span>
            </button>

            <button
              onClick={() => { setIsPlaying(false); setActiveStep(1); }}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Reset to step 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6 Step Interactive Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {stages.map((stage) => {
            const isSelected = stage.id === activeStep;
            const isCompleted = stage.id < activeStep;
            const StepIcon = stage.icon;

            return (
              <button
                key={stage.id}
                onClick={() => { setActiveStep(stage.id); setIsPlaying(false); }}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-blue-950/60 border-blue-500 shadow-lg shadow-blue-500/20 text-white'
                    : isCompleted
                    ? 'bg-slate-900/40 border-emerald-500/30 text-slate-300'
                    : 'bg-[#070A14] border-slate-800 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                    isSelected ? 'bg-blue-600 text-white' : isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : stage.id}
                  </div>
                  <StepIcon className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-xs font-semibold truncate">{stage.name}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{stage.channel}</div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive on Selected Step */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-900/60 border border-slate-800 rounded-xl p-5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    Step {currentStage.id} of 6
                  </span>
                  <span className="text-xs text-slate-400">• {currentStage.channel}</span>
                </div>

                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  {currentStage.name}
                </h4>

                <p className="text-sm text-slate-300">
                  {currentStage.subtext}
                </p>

                <div className="p-3 rounded-lg bg-[#070A14] border border-slate-800 text-xs text-slate-400">
                  <strong className="text-white">Active System Action: </strong>
                  {currentStage.actionDetails}
                </div>
              </div>

              {/* Payload & State Inspector */}
              <div className="lg:col-span-5 bg-[#070A14] border border-slate-800 rounded-lg p-4 font-mono text-xs space-y-2">
                <div className="text-[10px] uppercase text-cyan-400 tracking-wider flex justify-between">
                  <span>Pipeline Event Stream</span>
                  <span className="text-emerald-400">● LIVE</span>
                </div>
                <div className="text-slate-500 text-[11px] truncate">
                  event: <span className="text-yellow-400">"{currentStage.payload.event}"</span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  target: <span className="text-blue-300">{currentStage.payload.target}</span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  status: <span className="text-emerald-300">{currentStage.payload.verification}</span>
                </div>
                <div className="text-right text-[10px] text-slate-600 pt-1">
                  Latency: {currentStage.duration}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
