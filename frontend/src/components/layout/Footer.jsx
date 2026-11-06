import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowUp,
  Heart,
  Globe,
  Mail,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import DEVELOPER_CONFIG from '../../config/developer';

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <footer className="w-full bg-theme-surface border-t border-theme-border text-theme-text transition-colors duration-300">
      {/* Newsletter Section */}
      <div className="border-b border-theme-border/70 py-12 px-6 sm:px-12 bg-theme-base/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-accent/10 text-theme-accent text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Join the Vibe Club
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get 15% off new drops & aesthetic inspo
            </h3>
            <p className="text-xs sm:text-sm text-theme-muted mt-1 max-w-md">
              No spam, ever. Only cozy drops, secret flash sales, and AI style recommendations.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're in! Welcome to the ShopSmart family.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-theme-surface p-1.5 rounded-full border border-theme-border shadow-sm focus-within:border-theme-accent focus-within:ring-2 focus-within:ring-theme-accent/20 transition-all">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-transparent px-4 py-2 text-xs text-theme-text focus:outline-none placeholder:text-theme-muted"
                />
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-full bg-theme-primary text-white text-xs font-bold hover:bg-theme-primary-hover shadow-sm transition-all"
                >
                  Join
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-theme-accent to-theme-primary flex items-center justify-center text-white shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-editorial text-2xl font-black text-theme-text">
              ShopSmart <span className="text-theme-accent font-serif italic font-normal text-xl">AI</span>
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-theme-muted mt-3 leading-relaxed max-w-sm">
            Curating cozy, aesthetic Gen Z fashion, room decor, and everyday essentials powered by
            genuine machine learning and editorial styling.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs text-theme-muted font-medium">
            <span>Created with</span>
            <Heart className="w-3.5 h-3.5 text-theme-accent fill-theme-accent inline animate-pulse" />
            <span>by <strong className="text-theme-text font-bold hover:text-theme-accent transition-colors">{DEVELOPER_CONFIG.name}</strong></span>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-theme-text mb-4">
            Shop Catalog
          </h4>
          <ul className="space-y-2.5 text-xs text-theme-muted font-medium">
            <li><Link to="/shop?category=hoodies" className="hover:text-theme-accent transition-colors">Oversized Hoodies</Link></li>
            <li><Link to="/shop?category=aesthetic-decor" className="hover:text-theme-accent transition-colors">Cozy Room Decor</Link></li>
            <li><Link to="/shop?category=streetwear" className="hover:text-theme-accent transition-colors">Streetwear Fits</Link></li>
            <li><Link to="/shop?category=accessories" className="hover:text-theme-accent transition-colors">Y2K Accessories</Link></li>
            <li><Link to="/shop?badge=NEW" className="hover:text-theme-accent transition-colors">New Drops</Link></li>
            <li><Link to="/shop?badge=HOT" className="hover:text-theme-accent transition-colors">Trending Now</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-theme-text mb-4">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-xs text-theme-muted font-medium">
            <li><Link to="/orders" className="hover:text-theme-accent transition-colors">Track Order</Link></li>
            <li><Link to="/returns" className="hover:text-theme-accent transition-colors">Return Policy</Link></li>
            <li><Link to="/shipping" className="hover:text-theme-accent transition-colors">Shipping Guide</Link></li>
            <li><Link to="/faq" className="hover:text-theme-accent transition-colors">Help Center & FAQ</Link></li>
            <li><Link to="/terms" className="hover:text-theme-accent transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-theme-accent transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Developer & Portfolio Showcase Section */}
        <div>
          <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-theme-accent mb-4 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Created by {DEVELOPER_CONFIG.name}
          </h4>
          <p className="text-xs text-theme-muted leading-relaxed mb-4">
            A full-stack portfolio & internship showcase project engineered by <strong className="text-theme-text">{DEVELOPER_CONFIG.name}</strong> demonstrating React, FastAPI, & Scikit-learn AI.
          </p>

          <div className="flex flex-col gap-2">
            <a
              href={DEVELOPER_CONFIG.getSafeUrl('github')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-theme-text hover:text-theme-accent transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Profile</span>
              <ExternalLink className="w-3 h-3 text-theme-muted ml-auto" />
            </a>

            <a
              href={DEVELOPER_CONFIG.getSafeUrl('linkedin')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-theme-text hover:text-theme-accent transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3 h-3 text-theme-muted ml-auto" />
            </a>

            <a
              href={DEVELOPER_CONFIG.getSafeUrl('portfolio')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-theme-text hover:text-theme-accent transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Portfolio Website</span>
              <ExternalLink className="w-3 h-3 text-theme-muted ml-auto" />
            </a>

            {DEVELOPER_CONFIG.isConfigured('email') && (
              <a
                href={`mailto:${DEVELOPER_CONFIG.socialLinks.email}`}
                className="flex items-center gap-2 text-xs font-semibold text-theme-text hover:text-theme-accent transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Email</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar & Back to top */}
      <div className="border-t border-theme-border/60 py-6 px-6 sm:px-12 bg-theme-base/30">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-muted">
          <div>
            &copy; {new Date().getFullYear()} ShopSmart AI. Created by <strong className="text-theme-text font-bold">{DEVELOPER_CONFIG.name}</strong>. Built for Gen Z. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-theme-surface border border-theme-border text-[11px] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              AI Recommender Online
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-theme-surface border border-theme-border hover:border-theme-accent hover:text-theme-accent text-theme-muted transition-all flex items-center gap-1 text-[11px] font-semibold"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" /> Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
