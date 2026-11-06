import React from 'react';
import { Compass, Sparkles, Flame } from 'lucide-react';
import { MOODS, MOCK_PRODUCTS } from '../data/mockProducts';
import { ProductCard } from '../components/product/ProductCard';

export const DiscoverPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-theme-accent uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" /> Curated Playlists
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold text-theme-text">
          Discover The Aesthetic Feed
        </h1>
        <p className="text-xs sm:text-sm text-theme-muted mt-1">
          Visual mood boards, staff picks, and AI-predicted trending drops for your wardrobe and living space.
        </p>
      </div>

      {/* Mood Boards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {MOODS.map((mood) => (
          <div
            key={mood.id}
            className="p-4 rounded-3xl bg-theme-surface border border-theme-border text-center shadow-sm hover:border-theme-accent transition-all cursor-pointer"
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <div className="text-xs font-bold text-theme-text">{mood.label}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div>
        <h2 className="font-editorial text-2xl font-bold text-theme-text mb-6">
          Staff Picks & Editorial Favorites
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PRODUCTS.slice(0, 3).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};

