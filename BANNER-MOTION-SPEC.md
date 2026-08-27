# BANNER-MOTION-SPEC.md

Replace the static blurred fill with an animated background, and dissolve the
hard edge around the product image.

## Rules

- Surgical edits only.
- Do not change product data, slide groupings, headlines, the derived
  `From $X`, click-through, chevrons, dots, the gold accent, or the banner
  height.
- **Do not commit or push.**

---

## Two problems to fix

### 1. The product has a hard rectangular edge

The hero photos carry their own backgrounds — some are plain white studio
shots, some are lit scenes. Rendered `object-contain` they show as a rectangle
with a visible border against the banner. On the Everyday phones slide this is
a white box.

### 2. The background is dead

The blurred fill is rendering near-black rather than carrying the product's
colours, leaving a large flat empty area to the left of the product.

---

## PART 1 — Dissolve the product's edges

Apply a **CSS mask** to the sharp product layer so its own background fades out
at the edges instead of ending in a straight line.

- A radial mask centred on the product: fully opaque through the middle,
  falling to transparent before it reaches the image boundary.
- Tune it so the product itself is never clipped — only its surrounding
  background fades.
- Use `mask-image` with `-webkit-mask-image` alongside it for Safari.

Remove any remaining panel, border, card or hard-edged container around the
product. The only thing separating it from the background should be the fade.

Report how it looks on both a white-background photo (Everyday phones) and a
scenic one (Gaming, Speakers) — those are the two extremes.

---

## PART 2 — Animated background

Replace the static blurred fill with a moving background that fills the whole
banner. The house style favours noticeable, deliberate motion over subtle
fades.

Build it from **layered CSS gradients in motion** — no video, no canvas, no
image sequence:

- **Two or three large soft radial gradients** in the slide's colours, drifting
  slowly across the banner on different paths and timings, so the composition
  never repeats predictably. Think aurora rather than a spinning gradient.
- **Colours come from the slide**, not one fixed palette. Derive each slide's
  colours from its own hero image, or assign a small palette per slide that
  suits the product — the Gaming slide leaning teal and blue, Speakers warm
  orange, and so on. Report the approach you took.
- **A slow light sweep** passing across the banner every several seconds — a
  soft diagonal highlight, low opacity. This is what stops the space reading as
  dead.
- Keep it dark enough that white headline text stays legible on every slide.

The blurred image layer may stay underneath at low opacity if it adds texture,
or be dropped if the gradients are doing the work. Your call — report which.

---

## PART 3 — Motion on slide change

When the banner advances:

- **The headline and `From $X` enter from the left** with momentum — moving
  and fading in, settling with a slight overshoot rather than a linear fade.
- **The product enters from the right**, similarly, offset slightly later than
  the text so they do not arrive together.
- The outgoing slide leaves rather than simply disappearing.
- Keep the whole transition under about 700ms — deliberate, not sluggish.

---

## PART 4 — Reduced motion

Under `prefers-reduced-motion: reduce`:

- The drifting gradients hold still.
- The light sweep does not run.
- Slides do not auto-advance, and changing slide is an instant swap with no
  entrance animation.
- Everything stays fully legible and usable; manual controls still work.

Scope this to the component, matching `TickerStrip` and `.price-drop-badge`.

---

## PART 5 — Performance

- Animate `transform` and `opacity` only. Do not animate `background-position`,
  `filter`, `width`, `height` or anything else that forces layout or paint on
  every frame.
- The banner is above the fold on every category page — it must not cost
  measurable jank on a mid-range phone.
- Report anything you had to compromise for performance.

---

## Verify and report

1. `npm run build` — no TypeScript errors.
2. No hard rectangular edge around the product on any slide — check the white
   studio shot and a scenic shot specifically.
3. No dead flat area on any slide; the background is moving and filled.
4. Headline and `From $X` legible on every slide.
5. `Back to Home`, the logo and the `EN` pill legible over every slide.
6. Click-through, chevrons and dots still work.
7. 1440px, 768px, 375px — no overflow, no horizontal scrollbar.
8. Reduced motion — everything still, still readable.
9. No console errors. Product data untouched. Banner height unchanged.

**Report:**
- How the mask behaves on the white-background photo versus a scenic one
- How you derived each slide's colours
- Whether you kept the blurred image layer
- Animation timings and easing used
- Anything compromised for performance

Do not commit or push.
