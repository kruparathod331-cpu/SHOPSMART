import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { ProductCard } from '../components/product/ProductCard';

export const WishlistPage = () => {
  const wishlisted = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
      <div className="flex items-center gap-2 mb-2">
        <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
        <h1 className="font-editorial text-3xl font-extrabold text-theme-text">My Wishlist</h1>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 ml-2">
          {wishlisted.length} Saved Fits
        </span>
      </div>
      <p className="text-xs sm:text-sm text-theme-muted mb-8">
        Keep track of items you love. You'll get instant notifications if anything goes on flash sale!
      </p>

      {wishlisted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlisted.map((product) => (
            <ProductCard key={product.id} product={product} isWishlisted={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-theme-surface rounded-4xl border border-theme-border p-8">
          <Heart className="w-12 h-12 text-theme-muted mx-auto mb-3" />
          <h3 className="font-editorial text-lg font-bold text-theme-text">Your wishlist is empty</h3>
          <p className="text-xs text-theme-muted mt-1">Explore our aesthetic drops and tap the heart icon to save your favorites.</p>
          <Link
            to="/shop"
            className="mt-4 inline-flex items-center gap-2 py-2.5 px-6 rounded-full bg-theme-primary text-white text-xs font-bold hover:bg-theme-primary-hover"
          >
            Start Exploring <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

