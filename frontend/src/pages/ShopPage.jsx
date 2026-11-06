import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { MOCK_PRODUCTS, CATEGORIES } from '../data/mockProducts';

export const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const badgeParam = searchParams.get('badge');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  let filtered = MOCK_PRODUCTS;
  if (selectedCategory !== 'all') {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }
  if (badgeParam) {
    filtered = filtered.filter((p) => p.badges?.includes(badgeParam));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold text-theme-text">
          Aesthetic Catalog Drops
        </h1>
        <p className="text-xs sm:text-sm text-theme-muted mt-1">
          Explore our complete collection of Gen Z curated apparel, room decor, and everyday essentials.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-theme-border">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`py-2 px-4 rounded-full text-xs font-bold transition-all ${
            selectedCategory === 'all'
              ? 'bg-theme-text text-theme-base'
              : 'bg-theme-surface border border-theme-border text-theme-muted hover:text-theme-text'
          }`}
        >
          All Drops ({MOCK_PRODUCTS.length})
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`py-2 px-4 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat.slug
                ? 'bg-theme-accent text-white shadow-sm'
                : 'bg-theme-surface border border-theme-border text-theme-muted hover:text-theme-text'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

