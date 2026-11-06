import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BotMessageSquare, X, Send, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../data/mockProducts';

export const AIBestieModal = ({ isOpen, onClose, onQuickView }) => {
  if (!isOpen) return null;

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Hey bestie! ✨ What's the vibe today? Looking for a cozy college fit, room makeover, or a cute gift under a specific budget?",
      products: [],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    'Cozy hoodie under ₹2000',
    'Aesthetic desk setup upgrades',
    'Streetwear cargo pants',
    'Cute gifts under ₹1000',
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Natural-language product filtering logic
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matched = MOCK_PRODUCTS.filter((p) => {
        const matchesTag = p.tags.some((t) => lower.includes(t));
        const matchesMood = p.moods.some((m) => lower.includes(m));
        const matchesTitle = p.title.toLowerCase().includes(lower);
        return matchesTag || matchesMood || matchesTitle;
      });

      // Budget extraction (e.g., "under 2000" or "under 1000")
      const budgetMatch = lower.match(/(?:under|below|less than)\s*₹?\s*(\d+)/);
      if (budgetMatch) {
        const maxBudget = parseInt(budgetMatch[1], 10);
        matched = matched.filter((p) => p.price <= maxBudget);
      }

      if (matched.length === 0) {
        matched = MOCK_PRODUCTS.slice(0, 2); // sensible fallback
      }

      const aiReply = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: `I got you covered! Here are handpicked aesthetic items from our catalog matching your vibe:`,
        products: matched.slice(0, 3),
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          className="relative z-10 w-full max-w-xl h-[85vh] sm:h-[640px] bg-theme-surface rounded-t-4xl sm:rounded-4xl border border-theme-border shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-theme-border flex items-center justify-between bg-theme-base/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-theme-accent to-theme-primary flex items-center justify-center text-white shadow-md">
                <BotMessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-editorial text-base font-bold text-theme-text flex items-center gap-1.5">
                  AI Shopping Bestie <Sparkles className="w-3.5 h-3.5 text-theme-accent" />
                </h3>
                <p className="text-[11px] text-theme-muted">
                  Powered by real catalog search & style matching
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-theme-base text-theme-muted hover:text-theme-text transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-3xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-theme-primary text-white rounded-br-none shadow-sm'
                      : 'bg-theme-base border border-theme-border text-theme-text rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Attached Products Cards */}
                {msg.products?.length > 0 && (
                  <div className="mt-3 w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {msg.products.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-2.5 rounded-2xl bg-theme-card border border-theme-border shadow-sm flex items-center gap-3"
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.title}
                          className="w-14 h-14 object-cover rounded-xl border border-theme-border"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-theme-text truncate">{prod.title}</h4>
                          <span className="text-xs font-extrabold text-theme-accent block mt-0.5">
                            ₹{prod.price?.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => {
                              onClose();
                              if (onQuickView) onQuickView(prod);
                            }}
                            className="text-[10px] font-semibold text-theme-muted hover:text-theme-text flex items-center gap-1 mt-1"
                          >
                            View Fit <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-theme-base border border-theme-border max-w-[120px]">
                <span className="w-2 h-2 rounded-full bg-theme-accent animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-theme-accent animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-theme-accent animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 border-t border-theme-border/60 overflow-x-auto flex gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-theme-base hover:bg-theme-accent/10 border border-theme-border text-theme-muted hover:text-theme-accent text-[11px] font-medium transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-theme-border bg-theme-surface">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 bg-theme-base p-1.5 rounded-full border border-theme-border focus-within:border-theme-accent focus-within:ring-2 focus-within:ring-theme-accent/20"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything: fits, gifts, budget recommendations..."
                className="w-full bg-transparent px-4 py-2 text-xs text-theme-text focus:outline-none placeholder:text-theme-muted"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-theme-accent text-white shadow-sm hover:opacity-95 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

