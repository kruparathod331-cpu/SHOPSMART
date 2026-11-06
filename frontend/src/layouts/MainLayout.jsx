import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BotMessageSquare, Sparkles } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ThemeCustomizationStudio } from '../components/theme/ThemeCustomizationStudio';
import { AIBestieModal } from '../components/ai/AIBestieModal';
import { AuthModal } from '../components/auth/AuthModal';

export const MainLayout = () => {
  const [themeStudioOpen, setThemeStudioOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-theme-base text-theme-text font-sans antialiased selection:bg-theme-accent selection:text-white">
      {/* Navbar */}
      <Navbar
        onOpenThemeStudio={() => setThemeStudioOpen(true)}
        onOpenAIChat={() => setAiChatOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <Outlet context={{ onOpenAIChat: () => setAiChatOpen(true), onOpenThemeStudio: () => setThemeStudioOpen(true) }} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Bestie Trigger Button (bottom right) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setAiChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-tr from-theme-accent to-theme-primary text-white shadow-xl shadow-theme-accent/25 flex items-center gap-2 group border border-white/20"
        title="Open AI Shopping Bestie"
      >
        <BotMessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-bold text-xs tracking-wide">AI Bestie</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </motion.button>

      {/* Theme Studio Modal / Drawer */}
      <ThemeCustomizationStudio
        isOpen={themeStudioOpen}
        onClose={() => setThemeStudioOpen(false)}
      />

      {/* AI Bestie Modal */}
      <AIBestieModal
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
      />

      {/* Auth Sign In / Sign Up Animated Modal */}
      <AuthModal />
    </div>
  );
};

