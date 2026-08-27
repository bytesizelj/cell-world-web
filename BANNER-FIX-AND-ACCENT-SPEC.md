# BANNER-FIX-AND-ACCENT-SPEC.md

Four changes: fix the banner crop, make slides clickable, restructure the
header bar, and unify the accent colour across all category pages.

## Rules

- Surgical edits only. Do not change product data.
- Do not invent colour values. Use only the ones named here or already in the
  app.
- **Do not commit or push.**

---

## PART 1 — Fix the banner crop

### The problem

The hero images are **square (1024×1024)**. The banner is wide and short.
`object-cover` therefore shows roughly the middle fifth of each image — a strip
of iPhone edge, a fragment of a JBL logo. The product is unrecognisable.

Making the banner taller does not fix this; the aspect mismatch is too large.

### The fix

- Switch the hero image from `object-cover` to **`object-contain`**.
- Anchor the image to the **right** of the banner, sized to the banner's full
  height so the whole product is visible.
- The **left portion** of the banner is header-bar background colour, and the
  headline and subtext sit on it.
- Apply a **soft horizontal gradient** over the image's left edge, in the header
  bar colour, so the image panel dissolves into the text area rather than
  starting with a hard vertical line.
- Fade the image's right edge into the header colour the same way, so it does
  not butt up against the `EN` pill.

The result: text on the left, whole product on the right, no hard edges, no
white card.

### Height

The banner may be taller than the current bar if the products need it to read
clearly. Take it to whatever height makes a square product legible — report the
value you chose and why.

---

## PART 2 — Make slides clickable

Clicking anywhere on a slide (other than the chevrons or dots) should **apply
that group's filter to the page**, then scroll to the product grid.

Each page already holds a `filterCategory` state driving the filter row. Reuse
it — do not add a second filtering mechanism, and do not invent a route.

- Slide 1 on Tech & Audio sets the filter to `speakers`, and so on.
- Where a slide covers several category values (e.g. Everyday phones =
  `budget`, `midrange`, `basic`), pick the one with the most in-stock products
  and report which you chose.
- The slide must be a real button or link — keyboard reachable, with a visible
  focus state and a sensible accessible name such as
  *"View speakers, from $150"*.
- The chevrons and dots must not trigger the click-through.

---

## PART 3 — Restructure the header bar

The banner currently sits in a gap between other elements, so it does not span
the bar.

- **The banner spans the full width of the header bar**, edge to edge.
- **`Back to Home` moves onto the banner**, overlaid at the top-left, above the
  headline. Keep the same label and arrow icon. It must stay legible against
  whatever image is behind it — put it on the scrim side, and add a subtle
  shadow or backdrop if needed.
- **The `EN` pill overlays the banner** at the top-right, keeping its current
  styling. It must remain clearly visible and keyboard reachable over any
  slide.
- **The Cell World logo** moves to the top-left corner, above or beside
  `Back to Home`, at around **40px** — small, present, not competing with the
  banner. If it cannot be placed without crowding, report that rather than
  removing it; it is the only Cell World branding above the fold on a category
  page.

Nothing may overlap the headline text or the chevrons.

---

## PART 4 — Unify the accent colour

The category pages currently use different accents, and two are not working:
the pale orange ticker on Accessories & Power is muddy against the magenta
background, and the near-white filter container washes out on Marine World.

**Use gold `#FFD700` as the single accent on every category page.** It is the
treatment already used on the phones page, and it holds contrast against all
four backgrounds — dark blue, teal, magenta and marine.

Apply consistently across **phones, tech-audio, accessories-power and
marine-world**:

| Element | Treatment |
|---|---|
| Category title | `#FFD700`, with the existing dark text-shadow for legibility |
| Ticker subheading | `#FFD700` at around 85% opacity, semibold |
| Active filter pill | `#FFD700` background, dark text (near-black) for contrast |
| Inactive filter pills | Low-opacity white with a subtle border and a clear hover state |
| Filter container | A **dark** translucent panel with backdrop blur — not near-white. It must read as a panel on every page background, including the lighter marine one. |

Do **not** use per-page accent colours. One accent, four pages.

Check the contrast of the gold title and ticker against each page's actual
background gradient, not just one. Report anything that fails to read clearly.

---

## PART 5 — Verify and report

1. `npm run build` — no TypeScript errors.
2. On every category page, the whole hero product is visible and identifiable —
   not a cropped fragment.
3. Clicking a slide filters the grid and scrolls to it. Keyboard activation
   works. Chevrons and dots do not trigger it.
4. `Back to Home`, the logo and the `EN` pill are all visible and legible over
   every slide, and keyboard reachable.
5. The banner spans the full header width with no gaps at either end.
6. Gold reads clearly on all four page backgrounds.
7. 1440px, 768px, 375px — no overflow, no horizontal scrollbar.
8. `prefers-reduced-motion: reduce` — banner static.
9. No console errors. Product data untouched.

**Report:**
- Banner height chosen and why
- Which filter value each multi-category slide maps to
- Whether the logo could be placed without crowding
- Any page where gold does not read clearly against the background
- Filter container colour value used
- Anything that could not be done as specified, and why

Do not commit or push.
