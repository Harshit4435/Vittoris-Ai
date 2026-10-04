import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Play, Pause, RotateCcw, FileText, Sparkles, User } from 'lucide-react';

interface VoiceScenario {
  id: string;
  title: string;
  type: 'Inbound' | 'Outbound' | 'Follow-Up';
  caller: string;
  objective: string;
  duration: string;
  transcript: { speaker: 'AI Agent' | 'Prospect'; text: string; time: string }[];
  extractedData: {
    intent: string;
    budget: string;
    timeline: string;
    actionTaken: string;
    sentiment: string;
  };
}

export const VoiceAgentDemo: React.FC = () => {
  const scenarios: VoiceScenario[] = [
    {
      id: 'inbound-qualification',
      title: 'Inbound Call Answering & Qualification',
      type: 'Inbound',
      caller: 'David Ross (Managing Director, Horizon Commercial)',
      objective: 'Screen project budget and book discovery consultation with Senior AE.',
      duration: '01:42',
      transcript: [
        {
          speaker: 'AI Agent',
          text: "Thank you for calling Horizon Services line powered by Vittoris. This is Sarah, the autonomous executive concierge. How may I direct your commercial inquiry today?",
          time: '00:03'
        },
        {
          speaker: 'Prospect',
          text: "Hi Sarah, we're evaluating automated pipeline generation for our commercial leasing team. We currently have 12 brokers chasing cold leads.",
          time: '00:15'
        },
        {
          speaker: 'AI Agent',
          text: "Understood David. To ensure we match you with the right systems architect, what is your team's typical quarterly deployment budget for pipeline systems?",
          time: '00:26'
        },
        {
          speaker: 'Prospect',
          text: "We have budgeted approximately $30,000 for the initial rollout if we can verify appointment quality.",
          time: '00:38'
        },
        {
          speaker: 'AI Agent',
          text: "Excellent. That aligns directly with our Pay-Per-Appointment criteria where you only pay for confirmed, qualified decision-maker meetings. Would Thursday at 10:30 AM EST work for an architecture review?",
          time: '00:52'
        },
        {
          speaker: 'Prospect',
          text: "Thursday 10:30 AM works well for me.",
          time: '01:05'
        },
        {
          speaker: 'AI Agent',
          text: "Perfect. Calendar invitation and executive briefing are dispatched to your email. We look forward to connecting then.",
          time: '01:14'
        }
      ],
      extractedData: {
        intent: 'Commercial Pipeline Automation (12 Brokers)',
        budget: '$30,000 Verified Budget',
        timeline: 'Immediate Q4 Evaluation',
        actionTaken: 'Confirmed Thursday 10:30 AM EST with Senior AE',
        sentiment: 'High Intent / 96% Match'
      }
    },
    {
      id: 'database-reactivation',
      title: 'Aged Database Reactivation',
      type: 'Outbound',
      caller: 'Elena Martinez (VP Marketing, Apex Solutions)',
      objective: 'Methodically contact aged CRM database to revive dormant pipeline.',
      duration: '01:18',
      transcript: [
        {
          speaker: 'AI Agent',
          text: "Good morning Elena, this is Alex from Vittoris. I am following up on your request from last quarter regarding internal document intelligence and sales automation.",
          time: '00:04'
        },
        {
          speaker: 'Prospect',
          text: "Oh hello Alex. Yes, we had put that on pause while reorganizing our ERP system, but we are looking at it again now.",
          time: '00:16'
        },
        {
          speaker: 'AI Agent',
          text: "Glad to hear that. Our custom engineering framework now integrates directly with your active database without system overhauls. We could run a 15-minute operational audit this Friday.",
          time: '00:31'
        },
        {
          speaker: 'Prospect',
          text: "Friday afternoon around 2 PM would be great.",
          time: '00:44'
        },
        {
          speaker: 'AI Agent',
          text: "Locked in for Friday at 2:00 PM EST. The briefing notes are already on their way to your inbox.",
          time: '00:55'
        }
      ],
      extractedData: {
        intent: 'ERP Document Automation Reactivation',
        budget: 'Previously scoped ($20k+)',
        timeline: 'Re-evaluating active now',
        actionTaken: 'Revived dormant lead into Friday 2:00 PM slot',
        sentiment: 'Re-engaged / Warm'
      }
    }
  ];

  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const scenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentLineIndex(prev => {
          if (prev < scenario.transcript.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, scenario]);

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setIsPlaying(false);
    setCurrentLineIndex(0);
  };

  return (
    <div className="w-full bg-[#0B0F1E] border border-blue-900/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-violet-400" /> Human-Grade AI Voice Infrastructure
            </div>
            <h3 className="text-xl font-bold text-white">Autonomous Voice Agent Simulation</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Handles high-volume inbound inquiries and proactive outbound calling sequences with sub-500ms latency, automatic transcription, and CRM injection.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {scenarios.map(s => (
              <button
                key={s.id}
                onClick={() => handleScenarioChange(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedScenarioId === s.id
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {s.title.split(' ')[0]} {s.type}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Player & Waveform Visualizer */}
        <div className="bg-[#070A14] border border-slate-800 rounded-xl p-5 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 flex items-center justify-center text-white shadow-lg shadow-violet-600/30 transition-all"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>{scenario.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400 font-mono">
                    {scenario.type} Call
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-slate-500" />
                  <span>{scenario.caller}</span>
                  <span>•</span>
                  <span>Target: {scenario.duration}</span>
                </div>
              </div>
            </div>

            {/* Simulated Animated Waveform */}
            <div className="flex items-center gap-1 h-8 px-4 bg-slate-900/60 rounded-lg border border-slate-800">
              {[4, 12, 24, 16, 28, 14, 20, 8, 22, 18, 26, 10, 16, 6].map((height, i) => (
                <motion.div
                  key={i}
                  animate={isPlaying ? { height: [4, height, 4] } : { height: 4 }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.05 }}
                  className={`w-1 rounded-full ${isPlaying ? 'bg-gradient-to-t from-blue-500 to-cyan-400' : 'bg-slate-700'}`}
                />
              ))}
            </div>

            <button
              onClick={() => { setIsPlaying(false); setCurrentLineIndex(0); }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Restart simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Synchronized Transcript + Post Call Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Transcript Box */}
          <div className="lg:col-span-7 bg-[#070A14] border border-slate-800 rounded-xl p-4 flex flex-col h-[300px]">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" /> Real-Time Telephony Transcript
              </span>
              <span className="text-[10px] text-slate-500">Audio Latency: 420ms</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {scenario.transcript.slice(0, currentLineIndex + 1).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                    item.speaker === 'AI Agent'
                      ? 'bg-blue-950/30 border border-blue-900/40 text-blue-200'
                      : 'bg-slate-900 border border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span className={`font-semibold ${item.speaker === 'AI Agent' ? 'text-blue-400' : 'text-slate-300'}`}>
                      {item.speaker}
                    </span>
                    <span className="font-mono">{item.time}</span>
                  </div>
                  <p>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Extracted CRM Payload */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" /> Automated CRM Ingestion
              </span>
              <span className="text-emerald-400 font-mono text-[10px]">SYNCED</span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="text-[10px] text-slate-500">Extracted Commercial Intent</div>
                <div className="font-medium text-white">{scenario.extractedData.intent}</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500">Budget Qualification</div>
                <div className="font-medium text-emerald-400">{scenario.extractedData.budget}</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500">Project Timeline</div>
                <div className="font-medium text-cyan-300">{scenario.extractedData.timeline}</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500">Autonomous Action Taken</div>
                <div className="p-2 rounded bg-[#070A14] border border-slate-800 text-white font-medium">
                  {scenario.extractedData.actionTaken}
                </div>
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-500">Sentiment Score:</span>
                <span className="text-xs text-blue-400 font-bold">{scenario.extractedData.sentiment}</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-blue-950/20 border border-blue-900/30 text-[11px] text-slate-400">
              <strong className="text-white">Audit Trail: </strong>
              Call audio recorded, transcribed, and structured into CRM deal stage with zero clerical overhead.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
