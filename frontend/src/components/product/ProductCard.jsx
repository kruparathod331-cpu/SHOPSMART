import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Eye, Check } from 'lucide-react';

export const ProductCard = ({ product, onQuickView, onAddToCart, onToggleWishlist, isWishlisted = false }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [added, setAdded] = useState(false);
  const [wish, setWish] = useState(isWishlisted);

  const handleAddCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    if (onAddToCart) {
      onAddToCart(product, selectedColor);
    }
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !wish;
    setWish(nextState);
    if (onToggleWishlist) {
      onToggleWishlist(product.id, nextState);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative bg-theme-card rounded-3xl border border-theme-border/80 shadow-soft hover:shadow-float transition-all overflow-hidden flex flex-col justify-between"
    >
      {/* Image Container with Badges & Action Overlays */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-theme-base/60 rounded-t-3xl">
        <Link to={`/products/${product.slug || product.id}`}>
          <img
            src={product.images?.[activeImageIndex] || product.images?.[0]}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Badges (NEW / HOT / TRENDING) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {product.badges?.map((badge) => {
            const isHot = badge === 'HOT';
            const isNew = badge === 'NEW';
            return (
              <span
                key={badge}
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm ${
                  isHot
                    ? 'bg-rose-500 text-white'
                    : isNew
                    ? 'bg-theme-accent text-white'
                    : 'bg-amber-400 text-stone-900'
                }`}
              >
                {badge}
              </span>
            );
          })}
          {product.discountPercentage > 0 && (
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500 text-white shadow-sm">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleWishlist}
          title={wish ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 shadow-sm ${
            wish
              ? 'bg-rose-50 text-rose-500 fill-rose-500'
              : 'bg-white/80 hover:bg-white text-stone-700 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${wish ? 'fill-rose-500 text-rose-500' : ''}`} />
        </motion.button>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 py-1.5 px-4 rounded-full bg-white/90 text-stone-900 text-xs font-semibold backdrop-blur-md shadow-md flex items-center gap-1.5 z-10 hover:bg-white"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        )}

        {/* Multiple Image Preview Indicators */}
        {product.images?.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1 z-10">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveImageIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  activeImageIndex === idx ? 'bg-white w-4' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating Row */}
          <div className="flex items-center justify-between text-xs text-theme-muted mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-theme-muted">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-theme-muted font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/products/${product.slug || product.id}`}>
            <h3 className="font-editorial text-sm sm:text-base font-bold text-theme-text line-clamp-2 hover:text-theme-accent transition-colors leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Color Swatches */}
          {product.colors?.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(color);
                  }}
                  title={color.name}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                    selectedColor?.name === color.name
                      ? 'border-theme-text scale-125 ring-1 ring-theme-accent/50'
                      : 'border-black/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              <span className="text-[10px] text-theme-muted ml-1">
                {selectedColor?.name || `${product.colors.length} shades`}
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-theme-border/60 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-editorial text-base sm:text-lg font-black text-theme-text">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-theme-muted line-through font-medium">
                  ₹{product.originalPrice?.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">In Stock</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddCart}
            disabled={added}
            className={`py-2 px-3.5 rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              added
                ? 'bg-emerald-500 text-white'
                : 'bg-theme-text text-theme-base hover:bg-theme-accent hover:text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 animate-bounce" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Drop in Cart
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

