# ShopSmart AI — REST API Documentation (v1)

Base URL: `http://localhost:8000/api/v1`

---

## 1. System & Health Check

### `GET /health`
Returns system status, active database mode (Supabase Live vs High-Fidelity Demo Fallback), and AI model status.

**Response (200 OK):**
```json
{
  "status": "online",
  "version": "1.0.0",
  "database_mode": "demo_fallback",
  "ai_engine": {
    "recommendations": "ready",
    "search_parser": "ready"
  }
}
```

---

## 2. Authentication & User Profile

### `POST /auth/register`
Creates a new customer account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "full_name": "Aarav Sharma"
}
```

**Response (201 Created):**
```json
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "user": {
    "id": "c1f7a0b3-...",
    "email": "user@example.com",
    "role": "customer",
    "full_name": "Aarav Sharma"
  }
}
```

### `POST /auth/login`
Authenticates user and returns JWT bearer token.

### `GET /auth/me`
Retrieves current authenticated user's profile, theme preferences, and loyalty tier. Requires Bearer Token.

### `PATCH /auth/preferences`
Updates user's theme selection, custom accent color, or mood preferences.

---

## 3. Product Catalog

### `GET /products`
Retrieves paginated product list with multi-facet filtering.

**Query Parameters:**
- `category` (string, optional)
- `brand` (string, optional)
- `min_price` (float, optional)
- `max_price` (float, optional)
- `rating` (float, optional)
- `mood` (string, optional) e.g. `cozy`, `minimal`, `streetwear`
- `badge` (string, optional) e.g. `NEW`, `HOT`, `TRENDING`
- `sort` (string, optional) e.g. `price_asc`, `price_desc`, `rating`, `newest`
- `page` (int, default: 1)
- `limit` (int, default: 20)

### `GET /products/{product_id_or_slug}`
Retrieves full details of a product, including high-res image gallery, variants, specs, YouTube video link, and related items.

### `GET /categories`
Returns all product categories with image banners and product counts.

### `GET /brands`
Returns all featured brand partners.

---

## 4. Shopping Cart & Checkout

### `GET /cart`
Retrieves items in the active cart, computed subtotal, discount, and tax. Works for both authenticated users and guests (via session header).

### `POST /cart/items`
Adds an item/variant to the cart.

**Request Body:**
```json
{
  "product_id": "9b1deb4d-...",
  "variant_id": "4a2c1f90-...",
  "quantity": 1
}
```

### `PATCH /cart/items/{item_id}`
Updates quantity of a cart item.

### `DELETE /cart/items/{item_id}`
Removes an item from cart.

### `POST /cart/apply-coupon`
Validates a coupon code and calculates active discount.

---

## 5. Orders & Tracking

### `POST /orders/checkout`
Submits checkout order with address and test payment confirmation. Emits confetti trigger in frontend response.

**Request Body:**
```json
{
  "shipping_address": {
    "recipient_name": "Aarav Sharma",
    "phone": "+91 98765 43210",
    "street_address": "42 Cyber City, Sector 5",
    "city": "Bengaluru",
    "state": "Karnataka",
    "postal_code": "560001",
    "country": "India"
  },
  "coupon_code": "GENZ10",
  "payment_method": "test_payment"
}
```

### `GET /orders`
Lists all orders for the current user.

### `GET /orders/{order_id_or_number}`
Retrieves order details, purchased items, price snapshot, and live timeline statuses (`placed`, `confirmed`, `packed`, `shipped`, `out_for_delivery`, `delivered`).

---

## 6. AI & Machine Learning Endpoints

### `POST /ai/chat`
Conversational AI Shopping Bestie endpoint. Answers questions, recommends products from real catalog, and suggests outfits within budget.

**Request Body:**
```json
{
  "message": "I need a cozy oversized hoodie for college under 2000 rupees",
  "history": []
}
```

**Response (200 OK):**
```json
{
  "reply": "I found just the vibe for you! Check out our CloudSoft Fleece Oversized Hoodie in Lavender Dream—super cozy and right inside your budget.",
  "recommended_products": [
    {
      "id": "...",
      "title": "CloudSoft Fleece Oversized Hoodie",
      "price": 1499.00,
      "rating": 4.9,
      "thumbnail": "..."
    }
  ],
  "suggested_actions": ["View Details", "Add to Cart", "Show more colors"]
}
```

### `POST /ai/recommendations`
Returns content-based Scikit-learn TF-IDF recommendations based on:
- A specific `product_id` (similar products)
- User's recent browsing history and wishlist items

### `POST /ai/search`
Natural language search query parser. Converts free-form text queries into structured database queries.

### `POST /ai/gift-finder`
Guided gift finder matching recipient, budget, occasion, and lifestyle interests to verified catalog items.

### `POST /ai/review-summary`
Generates a structured review consensus (Top Pros, Top Cons, General Sentiment) based on real database reviews for a product.

---

## 7. Admin Dashboard Endpoints (Protected: role = 'admin')

### `GET /admin/analytics`
Returns aggregate revenue, total orders, active inventory counts, and top selling items.

### `POST /admin/products`
Creates a new product with images, variants, tags, and moods.

### `PATCH /admin/products/{id}`
Updates product specifications, pricing, discounts, or inventory.

### `DELETE /admin/products/{id}`
Soft-deletes or archives a product.

### `GET /admin/orders`
Retrieves all customer orders with filtering by status.

### `PATCH /admin/orders/{id}/status`
Updates order timeline stage (`confirmed`, `packed`, `shipped`, etc.).

