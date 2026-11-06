import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Sparkles, Check, ShieldCheck } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      product: MOCK_PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Lavender Dream',
      selectedSize: 'M',
    },
    {
      product: MOCK_PRODUCTS[1],
      quantity: 1,
      selectedColor: 'Golden Hour Orange',
      selectedSize: 'One Size',
    },
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'GENZ10') {
      setCouponApplied(true);
    }
  };

  const handleRemove = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
          <Check className="w-8 h-8" />
        </div>
        <h1 className="font-editorial text-3xl font-extrabold text-theme-text">Order Confirmed! 🎉</h1>
        <p className="text-xs sm:text-sm text-theme-muted">
          Your test order has been received. You can track its live timeline anytime in your order dashboard.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link
            to="/orders"
            className="py-2.5 px-6 rounded-full bg-theme-primary text-white text-xs font-bold hover:bg-theme-primary-hover"
          >
            Track Order
          </Link>
          <Link
            to="/shop"
            className="py-2.5 px-6 rounded-full bg-theme-surface border border-theme-border text-theme-text text-xs font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingBag className="w-6 h-6 text-theme-accent" />
        <h1 className="font-editorial text-3xl font-extrabold text-theme-text">Your Shopping Bag</h1>
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-theme-base border border-theme-border text-theme-muted">
          {cartItems.length} Items
        </span>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Items List */}
          <div className="lg:col-span-7 space-y-4">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-3xl bg-theme-surface border border-theme-border shadow-soft flex items-center gap-4 sm:gap-6"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-theme-border"
                />

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase font-bold text-theme-accent tracking-wider">
                    {item.product.brand}
                  </div>
                  <h3 className="font-editorial text-sm sm:text-base font-bold text-theme-text truncate">
                    {item.product.title}
                  </h3>
                  <div className="text-xs text-theme-muted mt-1">
                    {item.selectedColor} • Size: {item.selectedSize}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-black text-theme-text">
                      ₹{item.product.price?.toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() => handleRemove(idx)}
                      className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Checkout Card */}
          <div className="lg:col-span-5 p-6 rounded-4xl bg-theme-surface border border-theme-border shadow-soft space-y-6">
            <h3 className="font-editorial text-lg font-bold text-theme-text">Order Summary</h3>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Promo code (try: GENZ10)"
                className="w-full py-2 px-3.5 rounded-2xl bg-theme-base border border-theme-border text-xs text-theme-text uppercase font-semibold focus:outline-none focus:border-theme-accent"
              />
              <button
                type="submit"
                className="py-2 px-4 rounded-2xl bg-theme-text text-theme-base text-xs font-bold hover:bg-theme-accent hover:text-white transition-colors"
              >
                Apply
              </button>
            </form>

            {couponApplied && (
              <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Check className="w-3.5 h-3.5" /> 10% Gen Z Discount Applied!
              </div>
            )}

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs text-theme-muted border-t border-theme-border pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-theme-text font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="border-t border-theme-border pt-3 flex justify-between text-sm sm:text-base font-extrabold text-theme-text">
                <span>Total Amount</span>
                <span className="text-theme-accent">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => setOrderPlaced(true)}
              className="w-full py-3.5 px-6 rounded-2xl bg-theme-primary text-white text-xs sm:text-sm font-bold shadow-md hover:bg-theme-primary-hover flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Test Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-theme-muted">
              <ShieldCheck className="w-4 h-4 text-theme-accent" />
              <span>Simulated Sandbox Environment • No real card needed</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-theme-surface rounded-4xl border border-theme-border p-8">
          <ShoppingBag className="w-12 h-12 text-theme-muted mx-auto mb-3" />
          <h3 className="font-editorial text-lg font-bold text-theme-text">Your shopping bag is empty</h3>
          <p className="text-xs text-theme-muted mt-1">Discover drops and add your favorites to cart.</p>
          <Link
            to="/shop"
            className="mt-4 inline-flex items-center gap-2 py-2.5 px-6 rounded-full bg-theme-primary text-white text-xs font-bold hover:bg-theme-primary-hover"
          >
            Browse Products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

