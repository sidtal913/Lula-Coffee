# Design pack (VPods hire)

Fallback — full skill pack failed to build. Follow CRAFT_UX commerce rules.

# UX craft (VPods hire)

Design Catalog quality bar for Rae (UI/UX Pro Max — local Design Catalog). Ticket-selected styles/palettes live in `.vpods/DESIGN_PACK.md`. This card is the durable checklist that survives the DESIGN_PACK clip.

Never name an external creator. Work Evidence: Design Engineering, Visual Hierarchy, Layout & Composition, Responsive Design, Accessibility, Design Review.

## Fixed design system (checkable)

Do not invent a parallel system. Honor Brand Kit tokens when present; otherwise use these ranges.

### Spacing (8px scale)

`8 / 16 / 24 / 32 / 48 / 64 / 96 / 128` (and micro `4 / 12` only inside controls). Prefer tokens / Tailwind steps that map to this scale — not arbitrary `13px` / `37px`.

### Grid

| Breakpoint | Columns | Content | Margins / padding |
| --- | --- | --- | --- |
| Desktop | 12 | max-width **1440px** | outer **64–80px**, gutters **24–32px** |
| Tablet | 8 | fluid | outer **32–48px** |
| Mobile | 4 | fluid | side padding **16–20px** |

### Typography

- Display: **48–80px** desktop · **36–52px** tablet · **32–42px** mobile
- Body: **16–18px** · product metadata **13–15px**
- At most **2** font families (display/editorial + UI sans). Never Inter/Roboto/Arial/Geist unless the product already uses them.
- One dominant idea per viewport: headline → supporting copy → primary CTA → secondary.

### Color

**60%** neutral base · **30%** supporting tone · **10%** accent. Restrained palettes. No random bright accents or gradient soup unless Brand Kit / brief requires it.

### Components

- Radius **12–20px** on cards / controls (not giant pills on every box)
- Subtle **1px** borders · low-opacity shadows · large product imagery · quiet iconography
- Hover / press **150–250ms** (pair with `.vpods/CRAFT_MOTION.md`)
- Touch targets **≥ 44×44px**

Avoid: glassmorphism soup, floating blobs, excessive cards, dashboard-looking storefronts, overdecorated UI.

## Priority (1 → 10)

| Priority | Category | Must have | Avoid |
|----------|----------|-----------|--------|
| 1 | Accessibility | Contrast 4.5:1, alt text, keyboard nav, aria-labels, visible focus | Removing focus rings; icon-only buttons without labels; color alone |
| 2 | Touch & Interaction | Min 44×44px targets, 8px+ spacing, loading feedback | Hover-only; instant 0ms state changes |
| 3 | Performance | Modern image formats, lazy load, reserve space (CLS) | Layout thrashing |
| 4 | Style Selection | Match product type; SVG icons (no emoji) | Mixing flat & skeuomorphic randomly |
| 5 | Layout & Responsive | Mobile-first, viewport meta, no horizontal scroll; grid above | Fixed px container widths; disable zoom; shrunk-desktop mobile |
| 6 | Typography & Color | Scale above; semantic tokens | Body < 12px; gray-on-gray; raw hex in components |
| 7 | Animation | 150–250ms hover; motion conveys meaning | One duration everywhere; animate width/height; no reduced-motion |
| 8 | Forms & Feedback | Visible labels; errors near fields; helper text | Placeholder-only labels; errors only at top |
| 9 | Navigation | Predictable back; bottom nav ≤5; deep linking; **each label → distinct destination or filter state** | Overloaded nav; broken back; **multiple labels → identical href/anchor** |
| 10 | Charts & Data | Legends, tooltips, accessible colors | Color alone to convey meaning |

## Commerce / storefront baseline (non-negotiable)

Same tier as accessibility and “never Done from source inspection alone.” Platform Critique refuses Done when these fail.

1. **Distinct nav destinations** — Every nav label resolves to a distinct route or filtered view. Identical `href` / `#` / `/` across New / Women / Men / … is a violation, not a stub.
2. **Populated facets** — Every rendered filter group (Color, Size, Category, …) has real options from data. Label + zero options → populate or remove the facet.
3. **Product-card interactions** — Each product grid card: quick-add-to-cart, wishlist toggle wired to state, and at least one hover/micro-interaction (pair with `.vpods/CRAFT_MOTION.md` hover/press). Baseline 2026 ecommerce — not an enhancement.

### Product card anatomy

Imagery occupies **~65–75%** of the card. Keep clutter low. Per card expose when relevant:

- Product image (+ hover image swap on desktop)
- Wishlist control
- Color / variant swatches
- Name · short descriptor · price (sale price clear when applicable)
- Rating / review count when the catalog has them
- Quick-add where the PLP supports it

Grid density: **4–5** products desktop · **2** tablet · **1.2–2** (peek carousel) mobile.

### PDP above-the-fold

Gallery · name · rating · price · variant selector · size selector when relevant · Add to Cart · shipping/returns confidence. Below: benefits, details, materials, reviews, recommendations, FAQ. Mobile: sticky Add to Cart; filters in bottom sheets.

### Homepage section rhythm (ecommerce)

Nav → Hero → Trust strip → Categories → Best sellers → Editorial / brand story → Recommendations → Reviews → Newsletter → Footer. Every section answers at least one of: what is this / why care / why trust / what next.

## Pre-delivery checklist

### Process
- [ ] Applied Design Catalog / DESIGN_PACK for this ticket (or mockup pixels when attached)
- [ ] Opened `.vpods/CRAFT_MOTION.md` on homepage / landing / commerce (or when motion is in scope)
- [ ] Honored Brand Kit tokens when `.vpods/BRAND_KIT.md` is present (token names / CSS vars — never invent hex)
- [ ] Rendered ~1440 and ~375 when the VM allows — never Done from source inspection alone
- [ ] Verified reduced-motion path

### Visual quality
- [ ] No emoji as icons — vector icons only
- [ ] Consistent icon family and stroke
- [ ] Pressed states do not shift layout bounds
- [ ] First viewport is one composition (not a dashboard of cards) unless the product is a dashboard
- [ ] Real photographic imagery on homepage/landing/commerce heroes — not mood-keyword stock fighting the mockup
- [ ] No purple-gradient SaaS chrome / generic card soup unless the brief asks
- [ ] Spacing / type / color follow the fixed system above (or Brand Kit)

### Interaction
- [ ] Primary CTA and nav are clickable and labeled
- [ ] Nav labels each resolve to a distinct destination or filtered view (no duplicate hrefs)
- [ ] Every rendered filter/facet group has populated options (no empty Color/Size rails)
- [ ] Product grid cards include quick-add, wishlist toggle, and hover/micro-interaction
- [ ] Forms have visible labels and nearby errors
- [ ] Focus order matches visual order
- [ ] Touch targets ≥ 44px; hover 150–250ms

## Visual taste exemplars (open-ended — not named-defect checklists)

These are **quality bars**, not templates. Extract composition grammar. Apply Brand Kit + product. Never reproduce a named brand lockup.

### Exemplar A — premium editorial fashion / DTC storefront

One composed hero (lifestyle photography + short headline + one CTA). Controlled nav with distinct destinations. High whitespace. Oversized display type vs quiet commerce UI. Image-to-text ≈ 65:35. Best-sellers early with imagery-dominant cards (wishlist, price, quick-add, hover). Editorial story band with asymmetry. Trust as a thin strip — not three equal feature cards as the page.

**Scene composition prompt (transfer grammar):**
"Full-bleed winter outerwear editorial homepage, warm stone neutrals, monumental serif headline, single Shop CTA, models in coats as the composition plane, generous negative space, quiet category rail beneath, no SaaS card grid, no purple gradient."

### Exemplar B — campaign launch commerce

Campaign hero that feels like a drop event. Fast product rails with visible price + fit/color metadata. Repeated shop actions that stay clear under energy. Urgency without clutter. Merchandising in the first scroll — not a poster-only landing.

**Scene composition prompt:**
"Apparel launch homepage, campaign hero with product urgency in the same first viewport, rapid new-in rail with price and color swatches, sticky shop affordances, high contrast type, no three equal icon feature cards."

### Exemplar C — quiet luxury PDP / PLP craft

Gallery-led PDP: large product photography, name, price, variants, sticky Add to Cart on mobile. PLP cards: ~65–75% imagery, hover swap, wishlist, quick-add. Facets always populated. Typography scale from CRAFT_UX (display 48–80px desktop).

Critique rendered pixels against these exemplars for composition, whitespace, hierarchy, and type scale — not only whether quick-add exists.


## How to use this card

- Open after `.vpods/FRONTEND_AGENT.md`. Then `.vpods/CRAFT_MOTION.md` (homepage / landing / commerce, or when motion is in scope), `.vpods/DESIGN_PACK.md`, `.vpods/BRAND_KIT.md`.
- On Cursor Cloud there is no `design.uxCatalog` tool — DESIGN_PACK + this card are the Design Catalog.
- Mockup attached: match composition from the picture; this card’s commerce / a11y / numeric system still apply.
