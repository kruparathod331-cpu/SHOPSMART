import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, RotateCcw, Check, Sun, Moon, Monitor, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeCustomizationStudio = ({ isOpen, onClose }) => {
  const {
    themes,
    activeTheme,
    themeId,
    customAccent,
    colorMode,
    selectTheme,
    setAccent,
    setColorMode,
    resetDefaultTheme,
    previewTheme,
    clearPreview,
  } = useTheme();

  const [customHexInput, setCustomHexInput] = useState(customAccent || '#FF758C');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="relative z-10 w-full max-w-md h-full bg-theme-surface border-l border-theme-border shadow-2xl p-6 overflow-y-auto flex flex-col justify-between"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-theme-border">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-theme-accent/15 text-theme-accent">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-editorial text-xl font-bold text-theme-text flex items-center gap-1.5">
                    Theme Studio <Sparkles className="w-4 h-4 text-theme-accent" />
                  </h2>
                  <p className="text-xs text-theme-muted">Tailor your aesthetic universe</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-theme-base text-theme-muted hover:text-theme-text transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher (Light / Dark / System) */}
            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-theme-muted">
                Display Mode
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2 p-1 bg-theme-base rounded-2xl border border-theme-border">
                <button
                  onClick={() => setColorMode('light')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                    colorMode === 'light'
                      ? 'bg-theme-surface text-theme-text shadow-sm'
                      : 'text-theme-muted hover:text-theme-text'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" /> Light
                </button>
                <button
                  onClick={() => setColorMode('dark')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                    colorMode === 'dark'
                      ? 'bg-theme-surface text-theme-text shadow-sm'
                      : 'text-theme-muted hover:text-theme-text'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" /> Dark
                </button>
                <button
                  onClick={() => setColorMode('system')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                    colorMode === 'system'
                      ? 'bg-theme-surface text-theme-text shadow-sm'
                      : 'text-theme-muted hover:text-theme-text'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Auto
                </button>
              </div>
            </div>

            {/* Preset Themes List */}
            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-theme-muted">
                Curated Aesthetics (8 Presets)
              </label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {themes.map((theme) => {
                  const isSelected = themeId === theme.id;
                  return (
                    <motion.button
                      key={theme.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => previewTheme(theme.id)}
                      onMouseLeave={clearPreview}
                      onClick={() => selectTheme(theme.id)}
                      className={`relative p-3 rounded-2xl text-left border transition-all flex flex-col justify-between h-28 ${
                        isSelected
                          ? 'border-theme-accent bg-theme-accent/5 ring-2 ring-theme-accent/20'
                          : 'border-theme-border hover:border-theme-muted/40 bg-theme-card'
                      }`}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div
                          className="w-7 h-7 rounded-full shadow-inner flex items-center justify-center border border-white/20"
                          style={{ backgroundColor: theme.previewColor }}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                        </div>
                        {theme.isDark && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-black/40 text-purple-200">
                            Dark
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="font-semibold text-xs text-theme-text">{theme.name}</div>
                        <div className="text-[11px] text-theme-muted truncate mt-0.5">
                          {theme.description}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Custom Accent Color Picker */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-theme-muted">
                  Custom Accent Color
                </label>
                {customAccent && (
                  <button
                    onClick={() => setAccent(null)}
                    className="text-[11px] text-theme-accent hover:underline"
                  >
                    Reset to Theme Default
                  </button>
                )}
              </div>

              {/* Quick Accent Swatches */}
              <div className="flex items-center gap-2 mt-3">
                {activeTheme.accentOptions?.map((accentHex) => (
                  <button
                    key={accentHex}
                    onClick={() => {
                      setAccent(accentHex);
                      setCustomHexInput(accentHex);
                    }}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      (customAccent || activeTheme.defaultAccent) === accentHex
                        ? 'border-theme-text scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: accentHex }}
                  />
                ))}

                {/* Native HTML Color Input */}
                <div className="relative flex items-center">
                  <input
                    type="color"
                    value={customHexInput}
                    onChange={(e) => {
                      setCustomHexInput(e.target.value);
                      setAccent(e.target.value);
                    }}
                    className="w-8 h-8 rounded-full cursor-pointer opacity-0 absolute inset-0 z-10"
                    title="Choose custom color"
                  />
                  <div
                    className="w-8 h-8 rounded-full border-2 border-dashed border-theme-border flex items-center justify-center text-xs font-bold text-theme-muted hover:border-theme-accent transition-colors"
                    style={{ backgroundColor: customHexInput }}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>

            {/* Live Interactive Preview Card */}
            <div className="mt-6 p-4 rounded-3xl bg-theme-base border border-theme-border">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-theme-muted mb-2">
                Live Theme Preview
              </div>
              <div className="p-3 rounded-2xl bg-theme-surface border border-theme-border shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-theme-text">CloudSoft Fleece Hoodie</span>
                  <span className="text-xs font-semibold text-theme-accent">₹1,499</span>
                </div>
                <p className="text-[11px] text-theme-muted mt-1">
                  Experience your aesthetic in real time.
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 py-1.5 px-3 rounded-xl bg-theme-accent text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-opacity">
                    Shop Now
                  </button>
                  <button className="py-1.5 px-3 rounded-xl bg-theme-base border border-theme-border text-theme-text text-xs font-medium">
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-theme-border mt-6 flex items-center gap-3">
            <button
              onClick={resetDefaultTheme}
              className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-2xl bg-theme-base border border-theme-border text-theme-muted hover:text-theme-text text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-2xl bg-theme-text text-theme-base text-xs font-bold shadow-md hover:opacity-90 transition-opacity"
            >
              Apply & Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

