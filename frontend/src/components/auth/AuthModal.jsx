import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal = () => {
  const { authModalOpen, closeAuthModal, authMode, setAuthMode, login, register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      if (authMode === 'signin') {
        await login(email, password);
        setSuccess('Welcome back! Signed in successfully.');
      } else {
        await register(name || 'Krupa Rathod', email, password);
        setSuccess('Account created! +100 Welcome Points awarded.');
      }

      setTimeout(() => {
        setLoading(false);
        closeAuthModal();
      }, 1000);
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setEmail('krupa.rathod@shopsmart.ai');
    setPassword('Krupa2026!');
    setName('Krupa Rathod');
    setLoading(true);
    setError('');

    setTimeout(async () => {
      await login('krupa.rathod@shopsmart.ai', 'Krupa2026!');
      setSuccess('Signed in as Krupa Rathod (Creator / Demo Account)! ✨');
      setTimeout(() => {
        setLoading(false);
        closeAuthModal();
      }, 1000);
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative z-10 w-full max-w-md bg-theme-surface rounded-4xl border border-theme-border shadow-2xl p-6 sm:p-8 overflow-hidden"
        >
          {/* Subtle Ambient Glow inside modal */}
          <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-theme-accent/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-theme-primary/10 blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-theme-base text-theme-muted hover:text-theme-text transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header & Logo */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.5, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-theme-accent to-theme-primary flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-theme-accent/25"
            >
              <Sparkles className="w-6 h-6 animate-pulse" />
            </motion.div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-extrabold text-theme-text">
              {authMode === 'signin' ? 'Welcome Back!' : 'Join ShopSmart AI'}
            </h2>
            <p className="text-xs text-theme-muted mt-1">
              {authMode === 'signin'
                ? 'Sign in to access your aesthetic cart, orders & VIP perks'
                : 'Unlock personalized AI styling & member-only drops'}
            </p>
          </div>

          {/* Animated Tab Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-theme-base border border-theme-border mb-6 relative">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setError('');
                setSuccess('');
              }}
              className={`relative py-2.5 text-xs font-bold transition-colors z-10 ${
                authMode === 'signin' ? 'text-theme-text' : 'text-theme-muted hover:text-theme-text'
              }`}
            >
              Sign In
              {authMode === 'signin' && (
                <motion.div
                  layoutId="authTabPill"
                  className="absolute inset-0 bg-theme-surface rounded-xl shadow-sm border border-theme-border/60 -z-10"
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setError('');
                setSuccess('');
              }}
              className={`relative py-2.5 text-xs font-bold transition-colors z-10 ${
                authMode === 'signup' ? 'text-theme-text' : 'text-theme-muted hover:text-theme-text'
              }`}
            >
              Create Account
              {authMode === 'signup' && (
                <motion.div
                  layoutId="authTabPill"
                  className="absolute inset-0 bg-theme-surface rounded-xl shadow-sm border border-theme-border/60 -z-10"
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                />
              )}
            </button>
          </div>

          {/* Quick Demo Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full mb-5 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-theme-accent/15 via-theme-base to-theme-accent/15 border border-theme-accent/30 text-theme-accent text-xs font-bold flex items-center justify-center gap-2 hover:bg-theme-accent/20 transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 fill-theme-accent" />
            <span>Instant Demo Sign In as Krupa Rathod</span>
          </motion.button>

          {/* Feedback messages with shake / reveal animation */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, x: [0, -4, 4, -4, 4, 0] }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 animate-bounce" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1"
              >
                <label className="text-[11px] font-bold uppercase tracking-wider text-theme-muted">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Krupa Rathod"
                    className="w-full py-2.5 pl-10 pr-4 rounded-2xl bg-theme-base border border-theme-border text-xs text-theme-text focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all font-medium"
                  />
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-theme-muted" />
                </div>
              </motion.div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-theme-muted">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full py-2.5 pl-10 pr-4 rounded-2xl bg-theme-base border border-theme-border text-xs text-theme-text focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all font-medium"
                />
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-theme-muted" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-theme-muted">
                  Password
                </label>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => alert('Demo password reset link simulated! Try entering your email.')}
                    className="text-[11px] text-theme-accent hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full py-2.5 pl-10 pr-10 rounded-2xl bg-theme-base border border-theme-border text-xs text-theme-text focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all font-medium"
                />
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-theme-muted" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-theme-muted hover:text-theme-text transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-theme-muted">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-theme-accent focus:ring-theme-accent/20 cursor-pointer"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Submit Action */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-theme-primary text-white text-xs sm:text-sm font-bold shadow-md hover:bg-theme-primary-hover flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <span>{authMode === 'signin' ? 'Sign In' : 'Create Free Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Switch Prompt */}
          <div className="mt-5 text-center text-xs text-theme-muted">
            {authMode === 'signin' ? (
              <span>
                New to ShopSmart?{' '}
                <button
                  onClick={() => setAuthMode('signup')}
                  className="text-theme-accent font-bold hover:underline"
                >
                  Sign up now
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setAuthMode('signin')}
                  className="text-theme-accent font-bold hover:underline"
                >
                  Sign in instead
                </button>
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

