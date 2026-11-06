import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Play, ArrowLeft, Check, Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find((p) => p.slug === id || p.id === id) || MOCK_PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(product.images?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(product.youtubeVideoUrl);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      {/* Back Link */}
      <Link
        to="/shop"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-theme-muted hover:text-theme-text transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery & Video Player */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square rounded-4xl overflow-hidden bg-theme-base border border-theme-border shadow-soft">
            {showVideo && videoId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0`}
                title="Product Video"
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
                className="absolute bottom-4 left-4 py-2 px-4 rounded-full bg-black/80 hover:bg-black text-white text-xs font-bold backdrop-blur-md flex items-center gap-2 shadow-lg transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                {showVideo ? 'View Image Gallery' : 'Watch Styling & Review Video'}
              </button>
            )}
          </div>

          {/* Thumbnails */}
          {!showVideo && product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === img ? 'border-theme-accent scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details, Selectors, Add to Cart */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-theme-muted mb-2">
              <span className="font-bold uppercase tracking-wider text-theme-accent">{product.brand}</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-theme-muted font-normal">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold text-theme-text leading-tight">
              {product.title}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="font-editorial text-3xl font-black text-theme-text">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-base text-theme-muted line-through font-medium">
                  ₹{product.originalPrice?.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                  Save {product.discountPercentage}%
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-theme-muted mt-4 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Color Selector */}
          {product.colors?.length > 0 && (
            <div>
              <label className="text-xs font-bold text-theme-text uppercase tracking-wider">
                Shade: <span className="text-theme-accent font-semibold">{selectedColor?.name}</span>
              </label>
              <div className="flex items-center gap-2.5 mt-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      selectedColor?.name === color.name
                        ? 'border-theme-text scale-110 shadow-md ring-2 ring-theme-accent/40'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div>
              <label className="text-xs font-bold text-theme-text uppercase tracking-wider">
                Select Fit / Size
              </label>
              <div className="flex flex-wrap gap-2 mt-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 rounded-2xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? 'bg-theme-text text-theme-base border-theme-text shadow-sm'
                        : 'bg-theme-surface border-theme-border text-theme-text hover:border-theme-muted'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="pt-4 flex items-center gap-3">
            <div className="flex items-center rounded-2xl bg-theme-base border border-theme-border p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-theme-surface text-theme-text font-bold"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold text-theme-text">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-theme-surface text-theme-text font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`flex-1 py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                added
                  ? 'bg-emerald-500 text-white'
                  : 'bg-theme-primary text-white hover:bg-theme-primary-hover'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 animate-bounce" /> Added to Shopping Bag
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}
                </>
              )}
            </button>
          </div>

          {/* Guarantees */}
          <div className="p-4 rounded-3xl bg-theme-base/60 border border-theme-border space-y-2.5 text-xs text-theme-muted font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-theme-accent" />
              <span>Free standard delivery in 2-4 business days</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-theme-accent" />
              <span>Easy 14-day return & size exchange guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-theme-accent" />
              <span>100% authentic quality tested materials</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

