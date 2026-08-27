# CATEGORY-BANNER-REDESIGN-SPEC.md

Rebuild the category header banner. The current version — small product
thumbnails on a white rounded card — is replaced by full-bleed hero slides with
overlaid text.

## Rules

- Surgical edits only. Change only what is named below.
- Do not change any product data — no names, prices, availability or specs.
- Do not invent prices. Every price shown must be derived from the live product
  array at runtime, not typed in.
- **Do not commit or push.**

---

## Why this is changing

The product photography has **scenic backgrounds** — lit studio scenes, colour
gradients, staged environments — not plain white cut-outs. The current design
puts those images in small frames on a white card, which reads as a row of
thumbnails on a white box floating in a dark bar.

Full-bleed fixes it: one product image fills the banner, text sits on top, and
a gradient ties the image into the header bar colour so there are no hard
edges. No white card, no floating frames.

**Do not attempt background removal on these images.** There is no uniform
background to remove.

---

## PART 0 — Discovery (report before changing anything)

1. Confirm the current `CategoryBanner` component path and every page that
   renders it.
2. The header bar's current height, and its exact background colour value.
3. For each category page, list the product `category` values actually present
   in its `products` array, with a count of in-stock items in each. This
   decides which groups can support a banner.
4. Report the pixel dimensions and aspect ratio of the proposed hero images
   listed in Part 2. A tall or square image cropped to a wide banner may lose
   the product — flag any that look risky.

---

## PART 1 — Slide structure

**Exactly 3 slides per page.** Not one per product, not one per filter
category — three, each representing a group of products.

Each slide is:

- **One hero product image**, full-bleed across the whole banner area
  (`object-cover`), with a focal position chosen so the product stays in frame.
- **A gradient scrim** running from the left, in the header bar's own
  background colour, fading to transparent by roughly 60% across. This makes
  the text legible and dissolves the image's left edge into the bar.
- **A right-edge fade** in the same colour, so the image doesn't cut off
  abruptly against the `EN` pill.
- **Headline and subtext** overlaid on the left, over the scrim.

No white card. No rounded frames around individual products. No inner borders.

### Text

Two lines, in the style of a retail hero banner:

- **Headline** — the group name. Large, bold, white.
- **Subtext** — smaller, lighter. A price entry point.

The subtext price must be **derived at runtime** from the cheapest in-stock
product in that group — `From $X`. Do not hardcode a number. If a group has no
in-stock products, that slide is skipped entirely (see Part 3).

---

## PART 2 — The three slides per page

Group each slide by matching against the `category` field on the products
array. Hero image is named per slide; if that product is out of stock at
runtime, fall back to the highest-priced in-stock product in the same group.

### `app/Categories/phones/page.tsx`

| # | Headline | Group (category values) | Hero image |
|---|---|---|---|
| 1 | Flagship phones | `flagship` | `/images/Products/phones/new/iphone-15-pro-max-256gb.jpg` |
| 2 | Everyday phones | `budget`, `midrange`, `basic` | `/images/Products/phones/new/itel-a100c-64gb.jpg` |
| 3 | Tablets | `tablet` | `/images/Products/accessories-power/gs-pad-11-pro.jpg` |

### `app/Categories/tech-audio/page.tsx`

| # | Headline | Group | Hero image |
|---|---|---|---|
| 1 | Speakers | `speakers` | `/images/Products/more/jbl-boombox3-black.png` |
| 2 | Earbuds & headphones | `earbuds`, `headphones` | `/images/Products/tech-audio/jbl-beam2-earbuds.jpg` |
| 3 | Gaming | `gaming` | `/images/Products/tech-audio/ps5-disc.png` |

### `app/Categories/accessories-power/page.tsx`

| # | Headline | Group | Hero image |
|---|---|---|---|
| 1 | Power banks | `powerbanks` | `/images/Products/accessories-power/anker-power-bank.png` |
| 2 | Cables & adapters | `cables` | pick the most visually striking in-stock item in that group and report your choice |
| 3 | Emergency lights | `emergency` | `/images/Products/more/ludger-power-light-rechargeable-fan.png` |

### `app/Categories/marine-world/page.tsx`

Not specified — its product structure differs. From the Part 0 discovery,
propose three sensible groups and heroes, and **report them for approval
before building that page's slides**. Do not guess and ship.

---

## PART 3 — Behaviour

- **Auto-advance every 5 seconds**, cross-fading between slides.
- **Pause on hover and on keyboard focus.** Resume on leave/blur.
- **Previous / next chevrons** at the banner's left and right edges — inline
  SVG, not glyphs or emoji. They must not collide with `Back to Home`, the
  logo, or the `EN` pill.
- **Dot indicators** showing position; clicking a dot jumps to that slide.
- If a group has **no in-stock products**, skip that slide. If fewer than two
  slides survive, render the remaining one static with no controls. Never
  render an empty banner.
- `prefers-reduced-motion: reduce` — first slide static, no auto-advance,
  manual controls still usable. Scope this to the component, as with
  `TickerStrip` and `.price-drop-badge`.
- Accessible: `aria-roledescription="carousel"`, an `aria-label` naming the
  category, real labels on controls, auto-rotation never steals focus.

---

## PART 4 — Layout

- The banner fills the space between the logo and the `EN` pill, at the full
  height of the header bar.
- `next/image` with `fill` and `object-cover`. First slide `priority`, the rest
  not. Correct `sizes`.
- Reserve the height in CSS — no layout shift on load.
- The bar may be taller than its original height if the hero images need it;
  report what you used.

### Mobile

At 375px there is not room for the banner beside the other header elements.
Choose one and report which:
- Hide the banner below a breakpoint, or
- Drop it to its own full-width row beneath the header controls.

Either way: no overflow, no horizontal scrollbar, `EN` pill stays on screen.
Headline text must stay legible at that size — reduce it rather than letting it
wrap awkwardly over the product.

---

## PART 5 — Verify and report

1. `npm run build` — no TypeScript errors.
2. Each page shows exactly three slides (or fewer, per the Part 3 rule), each
   with a hero image, headline and a derived `From $X`.
3. Confirm every `From $X` matches the cheapest in-stock item in that group.
4. No white card, no inner frames, no visible hard edge between image and bar.
5. `Back to Home`, the logo and the `EN` pill all still visible, correctly
   placed and keyboard reachable.
6. 1440px, 768px, 375px — no overflow, no horizontal scrollbar.
7. `prefers-reduced-motion: reduce` — banner static.
8. No console errors. Product data untouched.

**Report:**
- Header bar height used, and the scrim colour value
- Any hero image that cropped badly at banner aspect ratio
- The cables & adapters hero you chose, and why
- Your proposed Marine World groups and heroes — **for approval, not built yet**
- The mobile approach chosen
- Any slide skipped for lack of in-stock products
- Anything that could not be done as specified, and why

Do not commit or push.
