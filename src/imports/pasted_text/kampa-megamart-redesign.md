# Figma Design Brief — Kampa Megamart (kampamegamart.co.in) Redesign

*Use this as a prompt for Figma AI design generation, or hand directly to a designer/developer as a build brief.*

---

## Project Summary

Redesign and rebuild the e-commerce site **Kampa Megamart** (kampamegamart.co.in). The current live site is a generic template with placeholder content and no working functionality — this is a **full redesign + rebuild**, not a visual refresh. The goal is a production-ready, mobile-responsive Indian e-commerce storefront.

---

## Brand & Positioning

- Name: Kampa Megamart Pvt. Ltd. (KMMPL)
- Category: Multi-category hypermarket — Home Care, Electronics, Personal Care, Health & Nutrition, Herbal Products, Garments, Food & Beverage, Life Style/Accessories (confirm final category scope with stakeholders before locking IA)
- Market: India (Delhi-registered entity) — design should feel trustworthy and mainstream-retail, not template-generic
- Tone: Clean, accessible, "hypermarket" — broad product range, value-oriented, not luxury/boutique

---

## Pages to Design (in priority order)

### 1. Homepage
- Header: logo, search bar (prominent — currently missing entirely on live site), category mega-menu, cart icon with live count, login/account icon
- Hero banner/carousel — real promotional content, not stock template images
- Category tile grid — visual entry points into each top-level category
- "Today's Deals" / "Best Sellers" product rail
- Trust strip: secure payment, shipping info, return policy — icons + short copy
- Real testimonials section (replace Lorem Ipsum placeholders) — or omit until real reviews exist
- Footer: sitemap-style link columns (Company, Customer Service, Policies, Contact, Social)

### 2. Category / Listing Page
- Left sidebar or top filter bar: sub-category, price range, brand, availability
- Sort control (price, popularity, newest)
- Product grid — image, name, price, rating stub, "Add to Cart" quick action
- Pagination or infinite scroll
- Breadcrumb navigation

### 3. Product Detail Page
- Image gallery (multiple angles, zoom)
- Title, price, stock status, quantity selector
- Add to Cart / Buy Now CTAs
- Tabs or accordion: Description, Specifications, Reviews
- Related/recommended products rail

### 4. Cart Page
- Line items with thumbnail, quantity stepper, remove action
- Price summary (subtotal, shipping estimate, tax, total)
- Promo code field
- Clear CTA to Checkout

### 5. Checkout Flow
- Step indicator (Cart → Address → Payment → Confirmation)
- Address form (with saved-address selection for returning users)
- Payment method selection (card, UPI, netbanking — reflect real Indian payment gateway options)
- Order summary sidebar persists throughout

### 6. Login / Register
- Simple form, social login optional
- Password reset flow
- Clear error states (currently no visible validation design on live site)

### 7. Account Dashboard
- Order history with status tracking
- Saved addresses
- Profile/password management

### 8. Static/Legal Pages
- About Us, Contact Us, FAQ, Privacy Policy, Terms & Conditions, Return Policy, Shipping Policy — these currently link to `#` and need real templated layouts (not just body text — need consistent header/footer treatment)

---

## Design System Requirements

Specify as a Figma component library, not one-off screens:

- **Color palette** — primary/secondary/accent, semantic colors (success/error/warning), neutrals for text/borders
- **Typography scale** — headings H1–H6, body, caption, button text
- **Spacing/grid system** — 8pt grid recommended, responsive breakpoints (mobile/tablet/desktop)
- **Component library**:
  - Buttons (primary, secondary, disabled, loading states)
  - Form inputs (text, select, checkbox, radio) with error/focus states
  - Product card (grid + list variants)
  - Navigation (header, mega-menu, mobile hamburger menu)
  - Modal/dialog (Quick View, Add to Cart confirmation)
  - Badges (Sale, New, Sold Out, Best Seller)
  - Rating/review stars
  - Toast/notification for cart actions

---

## States & Edge Cases to Design (developer-critical — these are usually skipped)

- Empty states: empty cart, no search results, empty order history
- Loading states: skeleton loaders for product grids, spinners for checkout submission
- Error states: failed payment, out-of-stock at checkout, form validation errors
- Sold out / low stock product card treatment
- Mobile responsive behavior for every page above — design mobile-first if possible, given Indian traffic skews heavily mobile

---

## Explicit Notes for the Developer

- The current live site (`.co.in`) is a static template with dead links (`#`) and Lorem Ipsum content — **do not treat any existing visual as a source of truth for content**, only as a rough category reference
- All designs should assume a component-based frontend (React) consuming a real backend API — design with real dynamic data in mind (varying title lengths, price formats, stock states), not fixed placeholder text
- Every interactive element (Add to Cart, filters, modals, pagination) needs a **functional spec note** in Figma (e.g., "opens modal," "updates cart count in header," "disabled until quantity > 0") so it's unambiguous what's static vs. functional
- Flag components that map to shared/reusable code (e.g., ProductCard used in homepage, category page, and search results) so the developer builds one component, not three

---

## Suggested Figma File Structure

```
📁 Kampa Megamart
 ┣ 📄 Cover / Brief (this doc, pinned)
 ┣ 📁 Design System (colors, type, components)
 ┣ 📁 Desktop Screens
 ┃ ┣ Homepage
 ┃ ┣ Category Listing
 ┃ ┣ Product Detail
 ┃ ┣ Cart
 ┃ ┣ Checkout (multi-step)
 ┃ ┣ Login/Register
 ┃ ┣ Account Dashboard
 ┃ ┗ Static Pages
 ┣ 📁 Mobile Screens (same structure)
 ┗ 📁 States & Edge Cases (empty/loading/error variants)
```

---

*Paste this brief into Figma (as a cover frame or attached doc) so any designer or developer opening the file understands scope, priorities, and what's currently broken vs. what needs to be designed from scratch.*