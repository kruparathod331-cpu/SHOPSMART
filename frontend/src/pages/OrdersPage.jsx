import React from 'react';
import { Package, Truck, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrdersPage = () => {
  const sampleOrder = {
    orderNumber: 'ORD-2026-89412',
    date: 'Today, 2:45 PM',
    status: 'packed',
    total: 2398,
    items: [
      { title: 'CloudSoft Oversized Fleece Hoodie in Lavender', qty: 1, price: 1499 },
      { title: 'Sunset Ambient Glow Lamp', qty: 1, price: 899 },
    ],
    timeline: [
      { status: 'Order Placed', time: '2:45 PM', completed: true },
      { status: 'Confirmed', time: '2:50 PM', completed: true },
      { status: 'Packed in Aesthetic Bag', time: '3:15 PM', completed: true },
      { status: 'Shipped via Express', time: 'Pending', completed: false },
      { status: 'Delivered', time: 'Est. in 2 days', completed: false },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-theme-accent uppercase tracking-wider mb-1">
          <Truck className="w-3.5 h-3.5" /> Order Fulfillment
        </div>
        <h1 className="font-editorial text-3xl font-extrabold text-theme-text">Track Your Orders</h1>
        <p className="text-xs sm:text-sm text-theme-muted mt-1">
          Real-time order stage visualization and purchase receipt history.
        </p>
      </div>

      {/* Active Order Card */}
      <div className="p-6 sm:p-8 rounded-4xl bg-theme-surface border border-theme-border shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-theme-border">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">Order ID</span>
            <div className="font-mono text-sm font-bold text-theme-text">{sampleOrder.orderNumber}</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">Order Total</span>
            <div className="text-sm font-black text-theme-accent">₹{sampleOrder.total.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-theme-text mb-4">
            Live Tracking Timeline
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {sampleOrder.timeline.map((step, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  step.completed
                    ? 'bg-theme-accent/10 border-theme-accent text-theme-text shadow-sm'
                    : 'bg-theme-base border-theme-border text-theme-muted opacity-60'
                }`}
              >
                <div className="flex justify-center mb-1.5">
                  {step.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-theme-accent" />
                  ) : (
                    <Clock className="w-4 h-4 text-theme-muted" />
                  )}
                </div>
                <div className="text-[11px] font-bold leading-tight">{step.status}</div>
                <div className="text-[10px] text-theme-muted mt-1">{step.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Items Summary */}
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-theme-text mb-3">
            Items in this Delivery
          </h4>
          <div className="space-y-2">
            {sampleOrder.items.map((item, i) => (
              <div key={i} className="flex justify-between text-xs py-2 border-b border-theme-border/60">
                <span className="text-theme-text font-semibold">{item.title} × {item.qty}</span>
                <span className="text-theme-text font-bold">₹{item.price.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

