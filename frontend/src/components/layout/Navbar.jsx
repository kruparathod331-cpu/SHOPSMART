import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Palette,
  Search,
  Menu,
  X,
  User,
  Compass,
  BotMessageSquare,
  Layers,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import DEVELOPER_CONFIG from '../../config/developer';

export const Navbar = ({ onOpenThemeStudio, onOpenAIChat, cartCount = 2, wishlistCount = 3 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const { activeTheme } = useTheme();
  const { user, isAuthenticated, openSignIn, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories', icon: Layers },
    { name: 'Discover', path: '/discover', icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-300">
      {/* Top Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-theme-accent via-theme-primary to-theme-accent text-white py-1.5 px-4 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Created by <strong>{DEVELOPER_CONFIG.name}</strong> • Code: <strong>GENZ10</strong> for 10% off • Free shipping over ₹999</span>
        <Sparkles className="w-3.5 h-3.5 animate-pulse hidden sm:inline" />
      </div>

      {/* Main Navbar */}
      <nav className="glass border-b border-theme-border/70 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-theme-accent to-theme-primary flex items-center justify-center text-white shadow-md shadow-theme-accent/20"
          >
            <ShoppingBag className="w-5 h-5" />
          </motion.div>
          <div>
            <span className="font-editorial text-xl sm:text-2xl font-black tracking-tight text-theme-text flex items-center gap-1">
              ShopSmart <span className="text-theme-accent font-serif italic font-normal text-lg">AI</span>
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-theme-muted -mt-1">
              Curated for Gen Z
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'text-theme-text bg-theme-base shadow-sm'
                    : 'text-theme-muted hover:text-theme-text hover:bg-theme-base/60'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full border border-theme-accent/40 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* AI Shopping Bestie Button in Desktop Nav */}
          <button
            onClick={onOpenAIChat}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-theme-accent/10 hover:bg-theme-accent/20 text-theme-accent border border-theme-accent/30 transition-all shadow-sm group"
          >
            <BotMessageSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>AI Bestie</span>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-theme-accent"></span>
            </span>
          </button>
        </div>

        {/* Search Bar (Mid/Large screens) */}
        <div className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Try: 'cozy oversized hoodie under ₹1500'..."
            className="w-full py-2 pl-9 pr-4 text-xs rounded-full bg-theme-base/80 border border-theme-border focus:border-theme-accent focus:outline-none focus:ring-2 focus:ring-theme-accent/20 transition-all text-theme-text placeholder:text-theme-muted/70"
          />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-theme-muted" />
        </div>

        {/* Right Actions (Theme Studio, Wishlist, Cart, Profile, Hamburger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Studio Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenThemeStudio}
            title="Open Theme Studio"
            className="p-2 sm:px-3 sm:py-2 rounded-full bg-theme-base border border-theme-border hover:border-theme-accent/40 text-theme-text text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <div
              className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-inner"
              style={{ backgroundColor: activeTheme.previewColor }}
            />
            <span className="hidden sm:inline text-[11px]">Theme</span>
          </motion.button>

          {/* Wishlist Button */}
          <Link
            to="/wishlist"
            className="relative p-2 rounded-full hover:bg-theme-base text-theme-muted hover:text-theme-text transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-theme-accent text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-theme-base text-theme-muted hover:text-theme-text transition-colors"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-theme-text text-theme-base text-[10px] font-bold flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Sign In / Profile Dropdown with Animations */}
          {isAuthenticated ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full bg-theme-base border border-theme-border hover:border-theme-accent text-theme-text text-xs font-bold transition-all shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-theme-accent to-theme-primary flex items-center justify-center text-white text-[10px] font-black shadow-inner">
                  {user.name ? user.name.slice(0, 2).toUpperCase() : 'KR'}
                </div>
                <span className="hidden xl:inline max-w-[80px] truncate text-[11px]">
                  {user.name?.split(' ')[0] || 'Krupa'}
                </span>
                <ChevronDown className={`w-3 h-3 text-theme-muted transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="absolute right-0 top-full mt-2 w-48 p-2 rounded-2xl bg-theme-surface border border-theme-border shadow-xl z-50 text-left"
                  >
                    <div className="px-3 py-2 border-b border-theme-border/60">
                      <div className="text-[10px] uppercase font-bold text-theme-accent tracking-wider">
                        {user.tier || 'Member'}
                      </div>
                      <div className="text-xs font-bold text-theme-text truncate">{user.name}</div>
                      <div className="text-[10px] text-theme-muted truncate">{user.email}</div>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-3 py-2 rounded-xl text-xs font-semibold text-theme-text hover:bg-theme-base transition-colors"
                      >
                        My Profile & Rewards
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-3 py-2 rounded-xl text-xs font-semibold text-theme-text hover:bg-theme-base transition-colors"
                      >
                        Order Tracking
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-3 py-2 rounded-xl text-xs font-semibold text-theme-text hover:bg-theme-base transition-colors"
                      >
                        Saved Wishlist
                      </Link>
                    </div>
                    <div className="pt-1 border-t border-theme-border/60">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 flex items-center gap-1.5 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openSignIn}
              className="flex items-center gap-1.5 py-1.5 px-3.5 sm:py-2 sm:px-4 rounded-full bg-theme-primary text-white text-xs font-bold shadow-sm hover:bg-theme-primary-hover transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </motion.button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-theme-base text-theme-text transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-theme-surface border-b border-theme-border px-6 py-5 flex flex-col gap-4 shadow-xl"
          >
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Ask AI or search products..."
                className="w-full py-2.5 pl-9 pr-4 text-xs rounded-full bg-theme-base border border-theme-border focus:border-theme-accent focus:outline-none text-theme-text"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-theme-muted" />
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-xl text-sm font-semibold text-theme-text hover:bg-theme-base transition-colors flex items-center justify-between"
                >
                  {link.name}
                </Link>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAIChat) onOpenAIChat();
                }}
                className="py-2.5 px-3 rounded-xl text-sm font-bold text-theme-accent bg-theme-accent/10 border border-theme-accent/20 flex items-center gap-2 mt-1"
              >
                <BotMessageSquare className="w-4 h-4" />
                <span>Launch AI Shopping Bestie</span>
              </button>
            </div>

            <div className="pt-3 border-t border-theme-border flex items-center justify-between">
              {isAuthenticated ? (
                <div className="flex items-center justify-between w-full">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-xs font-semibold text-theme-text"
                  >
                    <User className="w-4 h-4" /> Hi, {user.name}
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="text-xs text-rose-500 font-bold hover:underline"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openSignIn();
                    }}
                    className="flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-theme-primary text-white text-xs font-bold"
                  >
                    <User className="w-3.5 h-3.5" /> Sign In / Join
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenThemeStudio) onOpenThemeStudio();
                    }}
                    className="text-xs font-semibold text-theme-accent flex items-center gap-1"
                  >
                    <Palette className="w-3.5 h-3.5" /> Customize Theme
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

