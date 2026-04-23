import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { TiltWrapper } from '../App';

const API_URL = '/api/chat';

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    "Hi there! 👋 I'm Gnanadeep's AI assistant. Ask me anything about his skills, projects, education, or experience!",
};

/* ─────────────────────────────────────────────────────────────
   BOT CHARACTER  — Lottie robot with speech bubble
───────────────────────────────────────────────────────────── */
function BotCharacter({ onClick, isOpen }) {
  const [showBubble, setShowBubble] = useState(false);

  // First bubble after 2.5s, then every 8s
  useEffect(() => {
    if (isOpen) { setShowBubble(false); return; }
    const initial = setTimeout(() => setShowBubble(true), 2500);
    const interval = setInterval(() => {
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 3500);
    }, 8000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, [isOpen]);

  // Auto-hide bubble after 3.5s
  useEffect(() => {
    if (!showBubble) return;
    const t = setTimeout(() => setShowBubble(false), 3500);
    return () => clearTimeout(t);
  }, [showBubble]);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end select-none">
      {/* Speech bubble — on top of the bot, extending left */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, scale: 0.7, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 8 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            className="relative mb-1 mr-6"
          >
            <div
              className="px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-xl whitespace-nowrap bg-[#FB923C] text-[#141413]"
            >
              Ask me about him
            </div>
            {/* Tail pointing down toward the bot */}
            <div
              className="absolute -bottom-2 w-0 h-0"
              style={{
                right: 86,
                borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent',
                borderTop: '10px solid #FB923C',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lottie bot — click to open chat */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Open AI chat assistant"
        className="focus:outline-none"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          /* Force GPU layer to prevent rasterization blur */
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      >
        <TiltWrapper tiltStrength={25} scale={1.05}>
          <motion.div
            className="relative"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Lottie bot, crisp 4K rendering */}
            <div
              className="relative z-10 flex items-center justify-center drop-shadow-[0_15px_30px_rgba(251,146,60,0.3)] filter"
              style={{ width: 220, height: 220 }}
            >
              <DotLottieReact
                src="/qntm.lottie"
                loop
                autoplay
                autoResizeCanvas={true}
                renderConfig={{
                  devicePixelRatio: Math.max(window.devicePixelRatio || 1, 4),
                  autoResize: true,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </motion.div>
        </TiltWrapper>
      </motion.button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN CHATBOT COMPONENT
───────────────────────────────────────────────────────────── */
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const apiMessages = next
        .filter((_, i) => i > 0)
        .map(({ role, content }) => ({ role, content }));

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error('Server error');

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't connect right now. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Lottie Bot Character (hidden when chat is open) ── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="bot-char"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          >
            <BotCharacter onClick={() => setOpen(true)} isOpen={open} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: 15, rotateY: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.8, rotateX: 15, rotateY: -10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="fixed bottom-6 right-6 z-[9999] w-[370px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-[#545454] bg-[rgba(37,37,37,0.85)] flex flex-col overflow-hidden backdrop-blur-xl transform-style-3d perspective-1500"
            style={{ height: 520, transformOrigin: 'bottom right' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 text-[#CFCFCF] flex-shrink-0 bg-[#252525] border-b border-[#545454]"
            >
              <div className="flex items-center gap-3">
                {/* Mini lottie in header */}
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  <DotLottieReact
                    src="/qntm.lottie"
                    loop
                    autoplay
                    autoResizeCanvas={true}
                    renderConfig={{
                      devicePixelRatio: Math.max(window.devicePixelRatio || 1, 4),
                      autoResize: true,
                    }}
                    style={{ width: 40, height: 40 }}
                  />
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight text-[#CFCFCF]">Ask about Gnanadeep</p>
                  <p className="text-[11px] text-[#7D7D7D]">AI Assistant · Online</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[rgba(37,37,37,0.5)] text-[#7D7D7D] hover:text-[#FB923C] transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chatbot-scroll">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 bg-[#FB923C]/10 border border-[#FB923C]/20">
                      <Bot size={14} className="text-[#FB923C]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl ${msg.role === 'user'
                        ? 'bg-[#FB923C] text-[#141413] rounded-br-md font-medium'
                        : 'bg-[#252525] text-[#CFCFCF] rounded-bl-md border border-[#545454]'
                      }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 bg-[rgba(37,37,37,0.5)] border border-[#545454]">
                      <User size={14} className="text-[#CFCFCF]" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-[#FB923C]/10 border border-[#FB923C]/20">
                    <Bot size={14} className="text-[#FB923C]" />
                  </div>
                  <div className="bg-[#252525] border border-[#545454] px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#FB923C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#FB923C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#FB923C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 border-t border-[#545454] px-4 py-3 bg-[rgba(37,37,37,0.4)]">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-[#252525] border border-[#545454] text-[#CFCFCF] placeholder-[#7D7D7D] focus:outline-none focus:border-[#FB923C] focus:ring-2 focus:ring-[#FB923C]/20 transition-all"
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="p-2.5 rounded-xl text-[#141413] bg-[#FB923C] disabled:opacity-40 transition-opacity"
                  aria-label="Send message"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </motion.button>
              </div>
              <p className="text-[10px] text-[#7D7D7D] text-center mt-2">
                AI-powered · May not always be accurate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
