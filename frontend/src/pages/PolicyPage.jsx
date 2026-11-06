import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, FileText, HelpCircle, ArrowLeft } from 'lucide-react';

export const PolicyPage = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '');

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      icon: ShieldCheck,
      content:
        'At ShopSmart AI, your data privacy is paramount. We only collect necessary information to fulfill your orders, preserve your theme choices, and provide personalized AI shopping recommendations. We never sell your personal information or store sensitive payment credentials.',
    },
    terms: {
      title: 'Terms of Service',
      icon: FileText,
      content:
        'By browsing or shopping on ShopSmart AI, you agree to fair and respectful usage of our platform. All products, media, and dynamic themes are designed for aesthetic e-commerce presentation.',
    },
    returns: {
      title: 'Return & Exchange Policy',
      icon: RotateCcw,
      content:
        'We offer an effortless 14-day return and exchange policy on all unworn clothing items with original tags attached. Room decor and tech items are covered by a 30-day replacement warranty for manufacturing defects.',
    },
    shipping: {
      title: 'Shipping & Delivery Guide',
      icon: Truck,
      content:
        'All orders above ₹999 qualify for Free Standard Delivery. Orders are dispatched from our fulfillment hub within 24 hours, and standard delivery arrives within 2-4 business days across major cities.',
    },
    faq: {
      title: 'Frequently Asked Questions',
      icon: HelpCircle,
      content:
        'Have questions about sizing, payment modes, or AI styling recommendations? Chat with our AI Shopping Bestie using the button on the bottom right, or browse our self-help guides.',
    },
  };

  const activePolicy = policies[path] || policies.privacy;
  const IconComponent = activePolicy.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-theme-muted hover:text-theme-text transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>

      <div className="p-8 rounded-4xl bg-theme-surface border border-theme-border shadow-soft space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-theme-accent/10 text-theme-accent">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold text-theme-text">
              {activePolicy.title}
            </h1>
            <p className="text-xs text-theme-muted">Last updated: Autumn 2026</p>
          </div>
        </div>

        <div className="pt-4 border-t border-theme-border text-sm text-theme-text leading-relaxed">
          <p>{activePolicy.content}</p>
        </div>

        {/* Quick Tabs to Other Policies */}
        <div className="pt-6 border-t border-theme-border flex flex-wrap gap-2 text-xs">
          {Object.entries(policies).map(([key, val]) => (
            <Link
              key={key}
              to={`/${key}`}
              className={`py-1.5 px-3 rounded-xl border transition-colors ${
                path === key
                  ? 'bg-theme-accent text-white border-theme-accent font-bold'
                  : 'bg-theme-base border-theme-border text-theme-muted hover:text-theme-text'
              }`}
            >
              {val.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

