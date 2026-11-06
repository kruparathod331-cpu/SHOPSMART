import React from 'react';
import { User, Award, Heart, ShoppingBag, Palette, MapPin, Sparkles, LogOut, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import DEVELOPER_CONFIG from '../config/developer';

export const ProfilePage = () => {
  const { activeTheme } = useTheme();
  const { user, isAuthenticated, openSignIn, logout } = useAuth();

  const displayName = user?.name || DEVELOPER_CONFIG.name;
  const displayEmail = user?.email || 'krupa.rathod@shopsmart.ai';
  const displayTier = user?.tier || 'VIP Star Creator';
  const displayPoints = user?.loyaltyPoints || 650;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-4xl bg-theme-surface border border-theme-border shadow-soft flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-theme-accent to-theme-primary flex items-center justify-center text-white text-2xl font-black shadow-lg">
          {displayName.slice(0, 2).toUpperCase()}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/15 text-amber-600 text-[11px] font-bold mb-1">
            <Award className="w-3.5 h-3.5" /> {displayTier} ({displayPoints} Pts)
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold text-theme-text">
            {displayName}
          </h1>
          <p className="text-xs text-theme-muted mt-0.5">{displayEmail} • Verified Member</p>
        </div>

        <div className="flex sm:flex-col gap-2">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="py-2 px-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold hover:bg-rose-500/20 transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          ) : (
            <button
              onClick={openSignIn}
              className="py-2 px-4 rounded-xl bg-theme-primary text-white text-xs font-bold hover:bg-theme-primary-hover transition-colors flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </button>
          )}
          <Link
            to="/orders"
            className="py-2 px-4 rounded-xl bg-theme-base border border-theme-border text-theme-text text-xs font-bold hover:border-theme-accent transition-colors text-center"
          >
            My Orders
          </Link>
        </div>
      </div>

      {/* Loyalty & Perks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-theme-surface border border-theme-border">
          <div className="text-xs font-bold text-theme-muted uppercase tracking-wider">Available Points</div>
          <div className="text-2xl font-black text-theme-text mt-1">480 pts</div>
          <p className="text-[11px] text-theme-muted mt-1">Worth ₹240 off your next drop</p>
        </div>

        <div className="p-5 rounded-3xl bg-theme-surface border border-theme-border">
          <div className="text-xs font-bold text-theme-muted uppercase tracking-wider">Loyalty Tier</div>
          <div className="text-2xl font-black text-amber-500 mt-1">Gold Star</div>
          <p className="text-[11px] text-theme-muted mt-1">Free express shipping enabled</p>
        </div>

        <div className="p-5 rounded-3xl bg-theme-surface border border-theme-border">
          <div className="text-xs font-bold text-theme-muted uppercase tracking-wider">Active Aesthetic</div>
          <div className="text-2xl font-black text-theme-accent mt-1">{activeTheme.name}</div>
          <p className="text-[11px] text-theme-muted mt-1">Synced to your profile</p>
        </div>
      </div>
    </div>
  );
};

