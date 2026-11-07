 HEAD
# 🛍️ ShopSmart AI — Next-Gen AI-Powered E-Commerce Platform

> A commercial-grade, full-stack, AI-powered e-commerce website designed with an editorial, cozy, Pinterest-inspired Gen Z visual aesthetic and engineered with production standards for top-tier software engineering portfolios and internship presentations.

[![Frontend](https://img.shields.io/badge/Frontend-React_18%2B_Vite_Tailwind-pink)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-FastAPI_Python-blue)](https://fastapi.tiangolo.com/)
[![Database](https://img.shields.io/badge/Database-Supabase_PostgreSQL-emerald)](https://supabase.com/)
[![Machine Learning](https://img.shields.io/badge/AI%2FML-Scikit--learn_TF--IDF-purple)](https://scikit-learn.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 1. Project Overview & Identity

**ShopSmart AI** is not a static landing page or basic demo; it is a full-featured, responsive, production-minded e-commerce ecosystem built from the ground up for Gen Z shoppers.

### Key Highlights:
- **Gen Z Approved & Pinterest-Inspired**: Editorial typography, soft rounded corners, pastel gradients, cozy vibes, and fluid micro-interactions.
- **Theme Customization Studio**: 8 handcrafted dynamic themes (Pastel Pink, Lavender Dream, Matcha Green, Cozy Mocha, Baby Blue, Peach Sunset, Midnight Purple, OLED Dark), live preview, custom accent color picker, light/dark mode, and persistence.
- **Genuinely Integrated AI/ML**: Built with Python & Scikit-learn:
  - Content-based TF-IDF recommendation engine (similar items, personalized feeds).
  - Natural-language shopping assistant ("AI Bestie") that queries the real database without hallucinations.
  - Natural-language search parser (e.g., *"Show me lavender hoodies under ₹1,500"*).
  - AI Gift Finder & AI Review Summarizer.
- **Commercial-Grade E-Commerce**:
  - Multi-variant product catalog (colors, sizes, stock tracking).
  - YouTube product video integration with responsive privacy-enhanced embeds.
  - Slide-out cart drawer, wishlist with animated micro-interactions, multi-attribute filtering & sorting.
  - Checkout flow with coupon engine, simulated order tracking timeline, and order confirmation confetti.
  - Protected Admin Dashboard with inventory control, analytics, and order moderation.
  - Dual-mode database architecture (seamlessly runs with live Supabase PostgreSQL or high-fidelity local demo fallback).

---

## 🏗️ 2. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18/19, Vite, JavaScript, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti |
| **Backend** | Python 3.14+, FastAPI, Pydantic v2, SQLAlchemy, Asyncpg, Uvicorn |
| **Database** | Supabase (PostgreSQL 15+), Row Level Security (RLS), Indexed Foreign Keys |
| **AI / ML** | Scikit-learn (TF-IDF Vectorizer, Cosine Similarity), Rule & NLP Query Parsing |
| **Deployment** | Vercel (Frontend), Render / Railway (Backend), Supabase Cloud (Postgres) |

---

## 📁 3. Project Directory Structure

```
BUSINESS/
├── frontend/                     # React + Vite Client Application
│   ├── public/                   # Static assets, favicon, icons
│   ├── src/
│   │   ├── assets/               # Local images, illustrations, audio
│   │   ├── components/           # Modular reusable UI components
│   │   │   ├── common/           # Buttons, Badges, Modals, Spinners
│   │   │   ├── layout/           # Navbar, Mobile Menu, Footer
│   │   │   ├── product/          # ProductCard, Gallery, VideoEmbed, Filters
│   │   │   ├── cart/             # CartDrawer, CartItem, CheckoutForm
│   │   │   ├── ai/               # AIBestieChat, GiftFinderModal, ReviewSummary
│   │   │   ├── theme/            # ThemeCustomizationStudio, ColorPicker
│   │   │   └── admin/            # AdminAnalytics, ProductTable, OrderManager
│   │   ├── pages/                # Route views (Home, Shop, ProductDetail, Cart, etc.)
│   │   ├── layouts/              # MainLayout, AdminLayout
│   │   ├── hooks/                # Custom React hooks (useTheme, useCart, etc.)
│   │   ├── context/              # React Context Providers (Theme, Auth, Cart, Wishlist)
│   │   ├── services/             # API client calls (Axios/Fetch wrappers)
│   │   ├── utils/                # Formatters, currency, validators
│   │   ├── styles/               # Global CSS & Tailwind theme variables
│   │   ├── config/               # Centralized developer social & portfolio links
│   │   ├── App.jsx               # Application router & provider wrapper
│   │   └── main.jsx              # Vite React entry point
│   ├── .env.example              # Frontend environment variables template
│   └── package.json
│
├── backend/                      # Python FastAPI REST Server
│   ├── app/
│   │   ├── api/v1/               # Modular API routers (auth, products, cart, orders, ai)
│   │   ├── core/                 # App configuration, security, JWT tokens
│   │   ├── models/               # SQLAlchemy ORM database models
│   │   ├── schemas/              # Pydantic v2 request/response validation schemas
│   │   ├── services/             # Business logic (order processing, coupons, loyalty)
│   │   ├── database/             # PostgreSQL connection & high-fidelity seed engine
│   │   └── main.py               # FastAPI application entrypoint
│   ├── tests/                    # Automated unit & integration tests (Pytest)
│   ├── requirements.txt          # Python dependencies
│   └── .env.example              # Backend environment variables template
│
├── ai_engine/                    # Standalone Machine Learning & NLP Subsystem
│   ├── recommendations/          # Content-based recommendation model (TF-IDF)
│   ├── product_matching/         # Cosine similarity matching & variant ranking
│   ├── search/                   # Natural-language query intent parser
│   └── models/                   # Serialized ML models & pre-computed matrices
│
├── docs/                         # Technical Documentation
│   ├── architecture.md           # System architecture & component blueprints
│   ├── database_schema.md        # PostgreSQL DDL, ER diagram, & RLS policies
│   └── api_documentation.md      # Complete REST API endpoint reference
│
├── .gitignore                    # Production git ignore rules
├── README.md                     # Project documentation
└── LICENSE                       # MIT License
```

---

## 🎨 4. Design System & Dynamic Themes

ShopSmart AI features a dynamic Theme Customization Studio allowing instantaneous theme transitions:

| Theme Name | Base Palette | Mood & Vibe |
| :--- | :--- | :--- |
| **Pastel Pink** | Soft Rose, Blush, White Cream | Sweet, chic, warm editorial |
| **Lavender Dream** | Lilac, Soft Violet, Misty White | Calming, dreamy, aesthetic |
| **Matcha Green** | Organic Sage, Tea Green, Earthy Tint | Grounding, fresh, mindful |
| **Cozy Mocha** | Warm Latte, Coffee Bean, Sand | Retro vintage, warm cozy autumn |
| **Baby Blue** | Cloud Sky Blue, Soft Cyan | Clean, airy, refreshing |
| **Peach Sunset** | Apricot Coral, Golden Peach | Radiant golden-hour warmth |
| **Midnight Purple**| Deep Plum, Neon Violet, Slate | Bold Gen Z nightlife aesthetic |
| **OLED Dark** | Pitch Obsidian, Neon Contrast | Minimalist, battery-saving dark mode |

Users can also customize their accent colors and toggle light/dark modes with instant persistence in local storage and database preferences.

---

## 🚀 5. Phased Development Roadmap

- [x] **PHASE 1: Project Inspection & Architecture** *(Current)*
  - System analysis, directory tree creation, technical specifications, and schema definitions.
- [ ] **PHASE 2: Frontend Foundation & Design System**
  - React/Vite initialization, Tailwind CSS semantic variables, 8-theme studio, navbar, footer, and editorial homepage.
- [ ] **PHASE 3: Product Experience**
  - Product catalog, responsive Pinterest grid, product details page, image zoom gallery, YouTube video integration, multi-attribute filters.
- [ ] **PHASE 4: Backend & Database Layer**
  - FastAPI server setup, Supabase PostgreSQL connection, database schema migration, sample seed generator, authentication endpoints.
- [ ] **PHASE 5: Shopping Functionality**
  - Interactive cart drawer, wishlist animations, coupon validation, modular checkout, simulated order timeline tracking.
- [ ] **PHASE 6: AI & Machine Learning Integration**
  - Scikit-learn TF-IDF recommendation engine, AI Shopping Bestie assistant, natural language search parser, gift finder, review summarizer.
- [ ] **PHASE 7: Admin Dashboard & Personalization**
  - Admin metrics, product inventory management, order moderation, loyalty reward tiers, shopping quiz.
- [ ] **PHASE 8: UI/UX Micro-Interactions & Accessibility**
  - Framer motion transitions, order celebration confetti, skeleton loaders, WCAG contrast compliance, responsive audits.
- [ ] **PHASE 9: Testing, Build Verification & Deployment**
  - Pytest backend test suite, Vite production build validation, Vercel/Render deployment guide, portfolio presentation review.

---

## 🔗 6. Developer & Portfolio Links Configuration

All social and portfolio links are centralized in:
`frontend/src/config/developer.js`

To customize your links, simply open this file and update:
```javascript
export const DEVELOPER_CONFIG = {
  socialLinks: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-profile",
    portfolio: "https://yourportfolio.com",
    email: "your.email@example.com",
  }
};
```
No personal links are fabricated or hardcoded into UI components.

---

## 📄 7. License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.


# SHOPSMART
5aecfbf26a4560768a930e0a91cce80ac53d92a2
