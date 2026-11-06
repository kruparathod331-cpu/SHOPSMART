# ShopSmart AI — System Architecture & Technical Specification

## 1. Executive Summary

**ShopSmart AI** is a commercial-grade, full-stack, AI-powered e-commerce platform designed with an editorial, cozy, Pinterest-inspired Gen Z visual aesthetic. The platform blends state-of-the-art web engineering with real Python/Scikit-learn powered machine learning models for personalized product recommendations, natural-language search, and an interactive AI shopping assistant.

---

## 2. System Architecture Diagram

```
+-------------------------------------------------------------------------------+
|                                CLIENT LAYER                                   |
|  React (Vite) + Tailwind CSS + Framer Motion + Lucide Icons                   |
|                                                                               |
|  +--------------------+  +--------------------+  +-------------------------+  |
|  |   Theme Studio     |  |   Shopping Hub     |  |   AI Bestie Assistant   |  |
|  | (8 Dynamic Themes, |  | (Catalog, Filters, |  | (Natural Lang Queries,  |  |
|  |  Accent Pickers)   |  |  Cart, Checkout)   |  |  Gifts, Mood Discovery) |  |
|  +--------------------+  +--------------------+  +-------------------------+  |
|                                     |                                         |
|                               REST / JSON                                     |
+-------------------------------------|-----------------------------------------+
                                      v
+-------------------------------------------------------------------------------+
|                                BACKEND LAYER                                  |
|  FastAPI (Python 3.14+) + Pydantic v2 + SQLAlchemy (Async)                    |
|                                                                               |
|  +---------------+ +---------------+ +---------------+ +--------------------+  |
|  | Auth & Users  | | Products/Cats | | Orders & Cart | | Admin & Analytics  |  |
|  | (JWT, Bcrypt) | | (Query, Filter| | (Checkout,    | | (Inventory, Sales,  |  |
|  |               | |  Pagination)  | |  Tracking)    | |  Moderation)       |  |
|  +---------------+ +---------------+ +---------------+ +--------------------+  |
|                                     |                                         |
+-------------------------------------|-----------------------------------------+
                    |                 |                |
                    v                 v                v
+-----------------------+ +---------------------+ +----------------------------+
|      DATA LAYER       | |     AI / ML LAYER   | |     INTEGRATIONS LAYER     |
| Supabase (PostgreSQL) | | Scikit-learn Engine | | - YouTube Embeds (Privacy) |
| - 23 Normalized Tables| | - TF-IDF Vectorizer | | - Modular Test Payment     |
| - Row Level Security  | | - Cosine Similarity | | - Optional LLM Hook        |
| - High-Fidelity Demo  | | - Natural Lang NLP  | | - Email / Newsletter      |
|   Fallback Mode       | | - Mood Matching     | |                            |
+-----------------------+ +---------------------+ +----------------------------+
```

---

## 3. Frontend Architecture

### 3.1 Technology Rationale
- **React (Vite)**: Lightning-fast HMR (Hot Module Replacement) and optimized production rollup builds.
- **Tailwind CSS**: Utility-first CSS configured with custom theme CSS variables (`--color-primary`, `--color-accent`, `--color-bg-base`, etc.) allowing seamless instant theme transitions.
- **Framer Motion**: Hardware-accelerated fluid layout animations, page transitions, drawer slides, and reduced-motion compliance.
- **Lucide Icons**: Consistent, clean iconography fitting the minimalist editorial Gen Z aesthetic.
- **React Router v6/v7**: Declarative client-side routing, protected auth routes, and route-based code splitting.

### 3.2 State Management Strategy
Instead of bloated external libraries, the app utilizes targeted, modular React Contexts:
1. `ThemeContext`: Controls active theme (8 presets), custom accent color, light/dark mode, system preference sync, and persistence in `localStorage` + Supabase `user_preferences`.
2. `AuthContext`: Manages current user session, JWT storage, login/logout, and RBAC (Customer vs Admin).
3. `CartContext`: Handles slide-out cart drawer, item addition/updates/removal, coupons, guest persistence, and backend sync.
4. `WishlistContext`: Real-time wishlist state with animated heart transitions and backend sync.
5. `AIAssistantContext`: Controls conversational drawer/modal state, message history, streaming feedback, and product payload cards.

### 3.3 Theme Customization Studio Architecture
The application features 8 handcrafted themes engineered via semantic CSS variables:
1. **Pastel Pink** (Soft rose, blush hues, warm editorial)
2. **Lavender Dream** (Calming lilac, violet accents, ethereal)
3. **Matcha Green** (Organic sage, tea tones, grounding)
4. **Cozy Mocha** (Warm latte, earth tones, vintage aesthetic)
5. **Baby Blue** (Crisp sky, pastel cyan, refreshing)
6. **Peach Sunset** (Warm apricot, coral tones, golden hour)
7. **Midnight Purple** (Deep plum, neon violet accents, dark mode)
8. **OLED Dark** (Pure pitch black, high contrast, battery friendly)

Each theme defines a complete palette:
- Background base & surface cards
- Foreground text hierarchy (primary, secondary, muted)
- Primary brand accent & hover states
- Border and shadow definitions
- Custom user-selected accent color override

---

## 4. Backend Architecture (FastAPI)

### 4.1 Modularity & Design
- **API Versioning**: Clean `/api/v1` namespace.
- **Authentication**: Stateless JWT Bearer tokens with bcrypt password hashing.
- **Validation**: Pydantic v2 models validating all request payloads, price decimals, and response serialization.
- **CORS**: Configurable origins with secure headers.
- **Error Handling**: Global exception handler returning standardized JSON errors (`{ error: string, detail: any, code: string }`).

### 4.2 Data Access Layer: Dual-Mode Architecture
To ensure immediate usability during grading and portfolio review without requiring third-party credentials:
- **Mode A (Live Supabase PostgreSQL)**: Uses async SQLAlchemy or direct Supabase client when `DATABASE_URL` / `SUPABASE_KEY` are provided.
- **Mode B (High-Fidelity Demo/Seed Fallback)**: Automatically falls back to an in-memory/SQLite seeded repository if remote credentials are not yet configured. The frontend displays a clear badge indicating "Demo Mode (Local Data)" vs "Connected to Supabase".

---

## 5. AI / Machine Learning Engine Architecture

### 5.1 Content-Based Product Recommendation Engine
- **Framework**: Python `scikit-learn`.
- **Methodology**:
  - Feature extraction: Combines product title, category, description, tags, brand, and target moods into unified text corpus.
  - TF-IDF Vectorization: Computes term frequency-inverse document frequency matrices.
  - Similarity Metric: Cosine similarity matrix calculated on-the-fly or cached upon product updates.
  - Top-N Recommendations: Returns related items matching product characteristics with similarity scores.
- **Cold-Start Strategy**: Fallback to category bestsellers and trending items when user interaction history is sparse.

### 5.2 Natural Language Search & Query Intent Parser
- Parses queries like *"Show me lavender hoodies under ₹1,500"* or *"cozy aesthetic room decor"* into structured database filters:
  - Price constraint extraction (regex + numeric boundaries)
  - Color extraction (`lavender`, `black`, `sage`, etc.)
  - Mood & tag matching (`cozy`, `minimal`, `streetwear`, etc.)
  - Category mapping
- Always resolves against real product inventory — never returns non-existent hallucinated products.

### 5.3 AI Shopping Bestie Assistant
- Conversational endpoint `/api/v1/ai/chat`.
- Configurable hybrid backend:
  1. Built-in Local NLP Rule & Vector Matcher (requires zero external API keys).
  2. Optional external LLM provider hook (Gemini / OpenAI) via environment variables `AI_PROVIDER_KEY` for open-ended conversational flair.

### 5.4 AI Review Summaries
- Aggregates actual verified customer reviews for a given product.
- Extracts pros, cons, and consensus sentiment using NLP text frequency and rating distributions.
- Displays a prominent empty state if fewer than 3 reviews exist.

---

## 6. Security & Performance Specifications

1. **Zero Secret Leaks**:
   - Strictly separate client environment variables (`VITE_*`) from backend secrets.
   - Frontend never imports or holds Supabase service role keys or database master credentials.
2. **Input Sanitization**:
   - Pydantic models validate all strings, emails, IDs, and numeric bounds.
   - YouTube URLs validated via strict regex matching valid YouTube video IDs (`(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})`).
3. **Checkout Security**:
   - Test payment flow explicitly labeled with a test watermark.
   - Zero storage of payment card numbers or CVVs.
4. **Admin Protection**:
   - Backend RBAC middleware checks `user.role == "admin"` before serving `/api/v1/admin/*` endpoints.

---

## 7. Centralized Portfolio & Developer Registry

To ensure maintainability and eliminate fake links, all developer links are concentrated in:
- `frontend/src/config/developer.js`
- `backend/app/core/config.py`

Placeholders:
- GitHub: `[INSERT YOUR GITHUB PROFILE URL]`
- LinkedIn: `[INSERT YOUR LINKEDIN PROFILE URL]`
- Portfolio: `[INSERT YOUR PORTFOLIO WEBSITE URL]`
- Email: `[INSERT YOUR PROFESSIONAL EMAIL]`
All components cleanly read from this single source of truth.

