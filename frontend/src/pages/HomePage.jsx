import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Heart,
  BotMessageSquare,
  Play,
  Flame,
  Clock,
  Compass,
  Star,
  Zap,
} from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { MOCK_PRODUCTS, CATEGORIES, MOODS } from '../data/mockProducts';
import DEVELOPER_CONFIG from '../config/developer';

export const HomePage = ({ onOpenAIChat, onOpenThemeStudio }) => {
  const [selectedMood, setSelectedMood] = useState('cozy');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeVideoModal, setActiveVideoModal] = useState(false);

  // Filter products by mood
  const moodProducts = MOCK_PRODUCTS.filter((p) => p.moods.includes(selectedMood));

  // Trending & New Drops
  const trendingProducts = MOCK_PRODUCTS.filter((p) => p.badges?.includes('HOT') || p.badges?.includes('TRENDING'));
  const newDrops = MOCK_PRODUCTS.filter((p) => p.badges?.includes('NEW'));

  return (
    <div className="w-full overflow-hidden">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-8 py-12 lg:py-20 bg-gradient-to-b from-theme-base via-theme-base/60 to-theme-surface">
        {/* Subtle Floating Ambient Background Blobs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-theme-accent/15 blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-theme-primary/10 blur-3xl pointer-events-none animate-float [animation-delay:2s]" />

        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-theme-accent/10 border border-theme-accent/20 text-theme-accent text-xs font-bold tracking-wide shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin [animation-duration:4s]" />
              <span>Created by <strong className="font-extrabold">{DEVELOPER_CONFIG.name}</strong> • Curated for Gen Z</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-editorial text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-theme-text leading-[1.08]"
            >
              Curated for the{' '}
              <span className="font-serif italic font-normal text-theme-accent underline decoration-wavy decoration-theme-accent/40">
                Aesthetic
              </span>{' '}
              Generation.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-theme-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              ShopSmart AI merges Pinterest-approved fashion, cozy bedroom decor, and tech lifestyle drops
              with a genuine machine-learning shopping assistant tailored to your budget and mood.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
            >
              <Link
                to="/shop"
                className="py-3.5 px-7 rounded-full bg-theme-text text-theme-base font-bold text-xs sm:text-sm hover:bg-theme-accent hover:text-white transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Shop New Drops</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={onOpenAIChat}
                className="py-3.5 px-6 rounded-full bg-theme-surface border border-theme-border text-theme-text font-bold text-xs sm:text-sm hover:border-theme-accent hover:text-theme-accent transition-all shadow-sm flex items-center gap-2 group"
              >
                <BotMessageSquare className="w-4 h-4 text-theme-accent group-hover:scale-110 transition-transform" />
                <span>Ask AI Bestie</span>
              </button>

              <button
                onClick={onOpenThemeStudio}
                className="py-3.5 px-4 rounded-full bg-theme-base border border-theme-border hover:border-theme-accent text-theme-muted hover:text-theme-text transition-all text-xs font-semibold flex items-center gap-1.5"
                title="Change website theme"
              >
                <Sparkles className="w-3.5 h-3.5 text-theme-accent" />
                <span>Themes</span>
              </button>
            </motion.div>

            {/* Trust Metrics Pill */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-theme-muted">
              <div>
                <strong className="text-theme-text font-bold">100%</strong> Verified Fits
              </div>
              <div className="w-1 h-1 rounded-full bg-theme-border" />
              <div>
                <strong className="text-theme-text font-bold">4.9/5</strong> Star Ratings
              </div>
              <div className="w-1 h-1 rounded-full bg-theme-border" />
              <div>
                <strong className="text-theme-text font-bold">0%</strong> Fake Reviews
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Showcase with Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-5xl overflow-hidden shadow-2xl border-4 border-theme-surface"
            >
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
                alt="CloudSoft Fleece Hoodie"
                className="w-full h-full object-cover object-center"
              />

              {/* Floating Pill: AI Match */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute top-6 left-5 glass p-3 rounded-2xl shadow-lg border border-white/40 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-theme-accent text-white flex items-center justify-center font-bold text-xs">
                  98%
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-theme-muted tracking-wider">AI Vibe Match</div>
                  <div className="text-xs font-bold text-theme-text">CloudSoft Fleece Hoodie</div>
                </div>
              </motion.div>

              {/* Floating Pill: Price & Cart */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-6 right-5 glass p-3 rounded-2xl shadow-lg border border-white/40 flex items-center gap-3"
              >
                <div>
                  <div className="text-xs font-black text-theme-text">₹1,499</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Special Drop Price</div>
                </div>
                <button
                  onClick={() => setQuickViewProduct(MOCK_PRODUCTS[0])}
                  className="py-1.5 px-3 rounded-xl bg-theme-accent text-white text-xs font-bold shadow-sm hover:opacity-90"
                >
                  Quick View
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MOOD-BASED SHOPPING (GEN Z APPROVED) */}
      <section className="py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-theme-accent uppercase tracking-wider mb-1">
              <Compass className="w-3.5 h-3.5" /> Mood Discovery
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-extrabold text-theme-text">
              Shop by Your Current Vibe
            </h2>
            <p className="text-xs sm:text-sm text-theme-muted mt-1">
              Select an aesthetic mindset and our tag matching engine serves the perfect fits.
            </p>
          </div>

          {/* Mood Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {MOODS.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`flex items-center gap-1.5 py-2 px-4 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-theme-accent text-white border-theme-accent shadow-sm'
                      : 'bg-theme-surface text-theme-text border-theme-border hover:border-theme-accent/40'
                  }`}
                >
                  <span>{mood.emoji}</span>
                  <span>{mood.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mood Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {moodProducts.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 3. TRENDING THIS WEEK (PINTEREST STYLE GRID) */}
      <section className="py-16 px-4 sm:px-8 bg-theme-surface/50 border-y border-theme-border/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Hot Right Now
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-extrabold text-theme-text">
                Trending This Week
              </h2>
            </div>
            <Link
              to="/shop?badge=HOT"
              className="text-xs font-bold text-theme-accent hover:underline flex items-center gap-1"
            >
              See All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULAR CATEGORIES */}
      <section className="py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-editorial text-2xl sm:text-3xl font-extrabold text-theme-text">
            Explore Curated Categories
          </h2>
          <p className="text-xs sm:text-sm text-theme-muted mt-1">
            Browse our core departments tailored for bedroom upgrades, college fits, and desk setups.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-theme-base border border-theme-border shadow-soft hover:shadow-float transition-all flex flex-col justify-end p-5"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-theme-accent">
                  {cat.itemCount} Items
                </span>
                <h3 className="font-editorial text-lg font-bold leading-tight mt-0.5">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/80 line-clamp-1 mt-1 font-light">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. FEATURED PRODUCT VIDEO INTEGRATION SHOWCASE */}
      <section className="py-16 px-4 sm:px-8 bg-theme-surface border-y border-theme-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-xs font-bold">
              <Play className="w-3.5 h-3.5 fill-red-600" /> Real Unboxing & Styling
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-theme-text leading-tight">
              See the Fit in Motion Before You Drop It in Cart
            </h2>
            <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
              Every major drop includes verified video unboxings and styling breakdowns so you know the exact
              fabric drape, thickness, and tactile feel.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setQuickViewProduct(MOCK_PRODUCTS[0])}
                className="py-3 px-6 rounded-full bg-theme-text text-theme-base text-xs font-bold hover:bg-theme-accent hover:text-white transition-all shadow-md flex items-center gap-2"
              >
                <span>View Featured Product</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-2 border-theme-border bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&mute=1"
                title="Verified YouTube Product Styling"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p) => {}}
      />
    </div>
  );
};

