import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Heart, Check, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickViewModal = ({ product, isOpen, onClose, onAddToCart, onToggleWishlist, isWishlisted }) => {
  if (!isOpen || !product) return null;

  const [activeImage, setActiveImage] = useState(product.images?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Extract YouTube ID safely
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(product.youtubeVideoUrl);

  const handleAddToCart = () => {
    setAdded(true);
    if (onAddToCart) {
      onAddToCart(product, selectedColor, selectedSize, quantity);
    }
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-theme-surface rounded-4xl border border-theme-border shadow-2xl p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-theme-base text-theme-muted hover:text-theme-text transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Gallery & Video Embed */}
            <div>
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-theme-base border border-theme-border shadow-inner">
                {showVideo && videoId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0`}
                    title="Product Demonstration"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={activeImage || product.images?.[0]}
                    alt={product.title}
                    className="w-full h-full object-cover object-center"
                  />
                )}

                {videoId && (
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="absolute bottom-4 left-4 py-1.5 px-3 rounded-full bg-black/75 hover:bg-black text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    {showVideo ? 'View Photos' : 'Watch Video Demo'}
                  </button>
                )}
              </div>

              {/* Thumbnail strip */}
              {!showVideo && product.images?.length > 1 && (
                <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImage === img ? 'border-theme-accent scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info, Selectors, Add to Cart */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-theme-accent">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs ml-auto">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-theme-muted font-normal">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h2 className="font-editorial text-xl sm:text-2xl font-black text-theme-text leading-tight">
                  {product.title}
                </h2>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="font-editorial text-2xl font-black text-theme-text">
                    ₹{product.price?.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-theme-muted line-through">
                      ₹{product.originalPrice?.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                      Save {product.discountPercentage}%
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-theme-muted mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Colors */}
                {product.colors?.length > 0 && (
                  <div className="mt-5">
                    <label className="text-xs font-semibold text-theme-text uppercase tracking-wider">
                      Selected Shade: <span className="text-theme-accent">{selectedColor?.name}</span>
                    </label>
                    <div className="flex items-center gap-2 mt-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`w-7 h-7 rounded-full border-2 transition-transform ${
                            selectedColor?.name === color.name
                              ? 'border-theme-text scale-110 shadow-md'
                              : 'border-black/20 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes?.length > 0 && (
                  <div className="mt-5">
                    <label className="text-xs font-semibold text-theme-text uppercase tracking-wider">
                      Select Size
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-1.5 px-3.5 rounded-xl text-xs font-bold border transition-all ${
                            selectedSize === size
                              ? 'bg-theme-text text-theme-base border-theme-text'
                              : 'bg-theme-base border-theme-border text-theme-text hover:border-theme-muted'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 pt-5 border-t border-theme-border flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center rounded-2xl bg-theme-base border border-theme-border p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded-xl hover:bg-theme-surface text-theme-text font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-theme-text">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-xl hover:bg-theme-surface text-theme-text font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-1 py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                    added
                      ? 'bg-emerald-500 text-white'
                      : 'bg-theme-primary text-white hover:bg-theme-primary-hover'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 animate-bounce" /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag (₹{(product.price * quantity).toLocaleString('en-IN')})
                    </>
                  )}
                </button>

                {/* View Details Link */}
                <Link
                  to={`/products/${product.slug || product.id}`}
                  onClick={onClose}
                  className="p-3 rounded-2xl border border-theme-border hover:bg-theme-base text-theme-muted hover:text-theme-text transition-colors"
                  title="Full Details Page"
                >
                  <Sparkles className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

