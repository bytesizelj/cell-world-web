# CATEGORY-HEADER-BANNER-SPEC.md

Fill the empty middle of the dark category header bar with a rotating product
banner, in the style of Amazon's header banner strip. Also restyle the category
filter row.

## Rules

- Surgical edits only. Change only what is named below. Preserve all
  surrounding code.
- Do not invent brand colours or product data. Read the existing brand tokens
  from the app. If a value you need is not already defined, stop and report it
  rather than picking one.
- Do not change any product data — no names, prices, availability or specs.
- **Do not commit or push.**

---

## Current state

On a category page (confirmed on Accessories & Power):

- A dark purple header bar containing, left to right: `Back to Home` — the Cell
  World logo — **a large empty gap** — a globe + `EN` language pill at the far
  right.
- Below it, a gradient band with the category title and the repeated
  subheading ticker. **Do not touch that band.**
- Below that, a filter row (Part 5 covers this).

The empty gap in the dark bar is what Parts 1–4 fill.

---

## PART 0 — Discovery (report before changing anything)

1. The full list of category routes — expected at `app/Categories/*/page.tsx`.
   Confirm the path pattern and list every slug.
2. Where the dark header bar markup lives: repeated in each `page.tsx`, or a
   shared layout/component? Give the file path. **If shared, make the change
   once there.**
3. The header bar's current height in CSS, and the brand colour tokens
   available (Tailwind `theme.extend.colors` or CSS custom properties in
   `globals.css`). List the tokens you will use. Note the category titles were
   recently set to Cell World orange `#f47b20` — use that as the accent.
4. The shape of the `products` array on a category page — confirm the field
   names for image path, name, availability and in-stock state. Tech & Audio
   uses `id`, `name`, `image`, `price`, `category`, `availability`, and on some
   entries `inStock`. **Report any category that differs.**
5. **Whether the product images have transparent backgrounds or a solid light
   studio background.** Check the alpha channel on at least five images across
   categories. This decides the banner background below — report the answer
   first.

---

## PART 1 — The header bar

- **Keep `Back to Home`** exactly as it is, at the far left.
- **Shrink the Cell World logo** from its current height to roughly **48px**.
  Do not remove it — it is the only Cell World branding above the fold on a
  category page. Do not change it on the main site nav or the homepage.
- **Keep the globe + `EN` pill** at the far right, unchanged in position and
  styling. It must stay keyboard reachable and must not be overlapped by the
  banner or its controls.
- **The banner fills the space between them**, taking the full remaining width.
- **The bar may grow taller.** The reference layout works because the banner
  has real height. Take the bar to roughly **160–180px** so three product
  images sit at a readable size with room for the controls. Keep the existing
  background colour. Report the height you chose and why.
- **Do not touch the gradient band below it.**

---

## PART 2 — `CategoryBanner` component (new)

Create `components/CategoryBanner.tsx`. Client component.

### Props

| prop | type | notes |
|---|---|---|
| `products` | the category's product array | required |
| `categoryName` | string | used for alt text and the accessible label |
| `headline` | `string \| null` | **defaults to `null`** — no text on the banner. Do not render the element at all when null. |

### Background — decided by the PART 0 alpha check

- **Transparent images:** products sit directly on the dark header bar, no band
  behind them.
- **Solid light studio background** (expected — the catalog is produced to a
  light-grey studio template): render the slides inside a **rounded light band**
  that fills the gap, tinted to a light neutral close to the images' own
  background so the image edges disappear into it. This is how the reference
  works — a light band inset into a dark bar. Do not drop light-grey squares
  straight onto the purple.

Report which branch you took.

### Slide composition

- Filter to products that have an image **and** are in stock. Use the page's
  existing in-stock logic — do not write a second definition of "in stock".
- Build slides of **3 products each**.
- Produce **at least 3 slides**. If the in-stock pool is smaller than 9, reuse
  products across slides but never repeat the same product twice within one
  slide.
- If fewer than 3 products qualify, render a **static** band with what is
  available and no rotation controls. Never render an empty banner.

### Layout

- Fits inside the header bar height chosen in Part 1. Reserve the height in CSS
  so there is **no layout shift** on load.
- The 3 product images sit across the band at slightly varied sizes and
  vertical offsets so it reads as a designed arrangement, not a row of
  thumbnails.
- `next/image`, `object-contain`. First slide gets `priority`; the rest do not.
  Set a correct `sizes` attribute.

### Behaviour

- Cross-fade between slides every **5 seconds**.
- **Pause on hover and on keyboard focus.** Resume on leave/blur.
- Previous / next controls at the left and right edges of the banner, as inline
  SVG or CSS chevrons — **not glyph characters, not emoji**. They must not
  collide with `Back to Home` or the `EN` pill.
- Dot indicators showing position; clicking a dot jumps to that slide.
- Clicking a product image scrolls to that product on the page **only if** the
  page already supports anchoring to a product. If it does not, images are not
  clickable — **do not invent a route.**
- `prefers-reduced-motion: reduce` renders the first slide static with no
  auto-rotation. Manual controls stay usable. Scope this to the component, as
  with `TickerStrip` and `.price-drop-badge`.
- Accessible: `aria-roledescription="carousel"`, an `aria-label` of the
  category name, real labels on the controls, and auto-rotation never steals
  focus.

---

## PART 3 — Mobile

At 375px there is not room for three products plus controls beside
`Back to Home` and the `EN` pill.

Choose one and report which:
- Show fewer products per slide on small screens (one or two), or
- Let the banner drop to its own row below the bar's controls on mobile only.

Whichever you pick, the banner must not overflow, must not push the `EN` pill
off screen, and must not introduce a horizontal scrollbar.

---

## PART 4 — Wire it in

For every category route found in PART 0:

1. Render `<CategoryBanner products={products} categoryName="..." />` in the
   header bar, filling the space between the logo and the `EN` pill.
2. Change nothing else. No product data changes, no card changes, no title
   changes, no changes to the subheading ticker.

---

## PART 5 — Restyle the category filter row

The filter row currently uses a heavy dark treatment — a `bg-black/50`
container with dark grey inactive pills and a purple-to-pink gradient on the
active pill. It reads as heavy against the pages and no longer matches the
orange titles.

Apply to **every category page that has a filter row**:

- **Container:** replace the dark `bg-black/50` with a lighter glass treatment —
  a low-opacity white with backdrop blur — so it sits on the page rather than
  blocking it.
- **Active pill:** Cell World orange `#f47b20`, matching the category titles.
  Replace the purple-to-pink gradient.
- **Inactive pills:** lighter than they are now, with a subtle border, and a
  clear hover state. They must stay legible against each page's background.
- **Tighten the vertical spacing** between the subheading ticker and the filter
  row, and between the filter row and the product grid. There is more dead
  space there than the layout needs. Reduce it, but do not make it cramped —
  report the values you changed from and to.

Contrast matters here: each category page has a different background colour.
Check the pills stay readable on all of them, not just one.

---

## PART 6 — Verify and report

1. Run `npm run build` — must complete with no TypeScript errors.
2. Confirm no category renders an empty banner, including any category with
   very few in-stock products.
3. Confirm `Back to Home`, the logo and the `EN` pill are all still visible,
   correctly placed, legible and keyboard reachable, and not overlapped by the
   banner controls.
4. Confirm there is no layout shift on load.
5. Check at 1440px, 768px and 375px — no overflow, no horizontal scrollbar.
6. Confirm that with `prefers-reduced-motion: reduce` the banner is static.
7. Confirm the filter pills are legible on every category page background.
8. Confirm no console errors.
9. Confirm product data is untouched.

**Report:**

- Category slugs found, and whether the header was shared or per-page
- Whether product images had alpha, and which background branch you took
- Brand tokens used, and the header bar height chosen
- The mobile approach chosen in Part 3
- Spacing values changed in Part 5, from and to
- Any category that fell back to the static banner
- Any category whose product array shape differed from Tech & Audio
- Anything that could not be done as specified, and why

Do not commit or push.
