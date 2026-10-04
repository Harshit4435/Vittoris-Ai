import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Calendar, ShieldCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  interactiveCard?: 'calendar' | 'qualification' | null;
}

export const ChatbotDemo: React.FC = () => {
  const [channel, setChannel] = useState<'web' | 'whatsapp'>('web');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am the Vittoris Autonomous Inbound Assistant. We help businesses deploy outcome-driven AI acquisition engines, voice agents, and custom workflow automation. How can I assist your team today?",
      timestamp: 'Just now',
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCounterRef = useRef(100);

  const samplePrompts = [
    "How does the Pay-Per-Appointment model work?",
    "What CRM platforms do you integrate with?",
    "Can you deploy an inbound AI Voice Agent?",
    "Book an exploratory discovery call"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    messageCounterRef.current += 1;
    const userMsg: ChatMessage = {
      id: String(messageCounterRef.current),
      sender: 'user',
      text: text,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate intelligent response grounded in PDF
    setTimeout(() => {
      let reply = "Our systems integrate directly into your existing infrastructure to eliminate cold prospecting and manual clerical bottlenecks.";
      let card: 'calendar' | 'qualification' | null = null;

      const lower = text.toLowerCase();
      if (lower.includes('pay-per-appointment') || lower.includes('appointment') || lower.includes('pricing')) {
        reply = "In our Pay-Per-Appointment model, pricing is strictly aligned with confirmed, qualified sales meetings that meet agreed criteria (verified decision-maker, budget minimums, project timeline). If a prospect fails to satisfy criteria, the booking carries zero billing cost.";
        card = 'qualification';
      } else if (lower.includes('crm') || lower.includes('integrate') || lower.includes('tools')) {
        reply = "Vittoris integrates natively with your active tech stack—including HubSpot, Salesforce, Close, GoHighLevel, Google Workspace, Slack, and custom PostgreSQL/REST backends—without disruptive overhauls.";
      } else if (lower.includes('voice') || lower.includes('call') || lower.includes('phone')) {
        reply = "Our AI Voice Agents operate with human-grade conversational fluency and sub-500ms latency. They handle inbound call triage, database reactivation sequences, automated pre-meeting reminders, and post-quote follow-ups.";
      } else if (lower.includes('book') || lower.includes('call') || lower.includes('schedule') || lower.includes('meeting')) {
        reply = "I would be glad to reserve a 30-minute diagnostic session with our systems architect. You can select an available time below:";
        card = 'calendar';
      } else {
        reply = `Thank you for asking. Under Vittoris's custom AI engineering framework, we map your daily workflows in Phase 1 (Operational Audit), architect high-ROI solutions in Phase 2, and deploy tested proprietary workflows in Phase 3. Would you like to review sample qualification criteria or reserve a discovery call?`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: String(messageCounterRef.current + 1),
          sender: 'ai',
          text: reply,
          timestamp: 'Just now',
          interactiveCard: card
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="w-full bg-[#0B0F1E] border border-blue-900/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Bot className="w-3.5 h-3.5 text-cyan-400" /> Conversational AI Assistant
            </div>
            <h3 className="text-xl font-bold text-white">Inbound Web & Messaging Intelligence</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Captures web traffic 24/7, qualifies budget and buying authority in natural dialogue, and locks confirmed calendar appointments.
            </p>
          </div>

          {/* Channel selector */}
          <div className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setChannel('web')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                channel === 'web'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Web Concierge
            </button>
            <button
              onClick={() => setChannel('whatsapp')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                channel === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              WhatsApp Setter
            </button>
          </div>
        </div>

        {/* Chat Stream Window */}
        <div className="bg-[#070A14] border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[400px]">
          {/* Chat Stream Header */}
          <div className="px-4 py-3 bg-slate-900/70 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  channel === 'web' ? 'bg-blue-600' : 'bg-emerald-600'
                }`}>
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#070A14] rounded-full" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{channel === 'web' ? 'Vittoris Inbound Concierge' : 'Vittoris WhatsApp Setter'}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 font-mono">AI Active</span>
                </div>
                <div className="text-[10px] text-slate-400">Sub-minute response • Context aware</div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-slate-500">
              Session ID #VIT-CONV-DEMO
            </div>
          </div>

          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs ${
                  msg.sender === 'user' ? 'bg-slate-700 text-white' : channel === 'web' ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30' : 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-2">
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Interactive Calendar Card */}
                  {msg.interactiveCard === 'calendar' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl space-y-2 text-xs"
                    >
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span>Instant Calendar Reservation</span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Select a 30-min discovery slot with our enterprise AI solutions team:
                      </p>
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <button
                          onClick={() => handleSend("I selected Thursday 10:00 AM EST")}
                          className="px-2 py-1.5 rounded bg-blue-600/30 border border-blue-500/40 hover:bg-blue-600 text-white text-[11px] font-mono transition-all text-center"
                        >
                          Thu 10:00 AM EST
                        </button>
                        <button
                          onClick={() => handleSend("I selected Friday 02:00 PM EST")}
                          className="px-2 py-1.5 rounded bg-blue-600/30 border border-blue-500/40 hover:bg-blue-600 text-white text-[11px] font-mono transition-all text-center"
                        >
                          Fri 02:00 PM EST
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {msg.interactiveCard === 'qualification' && (
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1">
                      <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Pre-Vetted Qualification Standard</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        100% decision authority verified • Pre-set budget minimums • Zero cost on unqualified no-shows.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 max-w-[80%] items-center text-xs text-slate-400">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-3 py-2 bg-slate-900/50 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-slate-500 text-[10px] uppercase font-semibold shrink-0">Try:</span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-slate-900/80 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about pay-per-appointment, CRM integrations, or custom AI systems..."
              className="flex-1 bg-[#070A14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
