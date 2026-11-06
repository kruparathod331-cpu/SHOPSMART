import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/mockProducts';

export const CategoriesPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold text-theme-text">
          Browse by Category
        </h1>
        <p className="text-xs sm:text-sm text-theme-muted mt-1">
          Handpicked departments crafted to match your distinct aesthetic aesthetic.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </div>
  );
};

