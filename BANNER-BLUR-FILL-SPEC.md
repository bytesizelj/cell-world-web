# BANNER-BLUR-FILL-SPEC.md

Replace the current split-panel banner layout. The image must fill the banner
edge to edge again, while keeping the whole product visible.

## Rules

- Surgical edits only. This changes only how the slide renders — everything
  else stays.
- Do not change product data, the slide groupings, the headlines, the derived
  `From $X`, the click-through, the chevrons, the dots, or the gold accent work.
- **Do not commit or push.**

---

## The problem with the current layout

`object-contain` anchored right left roughly two-thirds of the banner empty,
with a hard vertical edge where the image panel starts. It reads as a boxed-off
thumbnail beside a large blank area, not as a banner.

The underlying constraint has not changed: **the hero images are square
(1024×1024) and the banner is wide and short.** `object-cover` crops away most
of the product; `object-contain` leaves dead space. Neither works alone.

---

## The fix — two layers

Render each slide as **two copies of the same image**, stacked:

### Layer 1 — the fill (behind)

- Same hero image, `object-cover`, filling the **entire banner** edge to edge.
- **Blurred** — around 24–40px — and scaled up slightly (about 110%) so the
  blur does not show soft edges at the banner boundary.
- **Darkened** — a semi-transparent overlay in the header bar colour, or a
  reduced brightness, enough that the headline reads clearly over it.
- This layer exists to fill the space and carry the product's own colours into
  the background. It is decorative — mark it `aria-hidden`.

### Layer 2 — the product (in front)

- Same hero image again, `object-contain`, **sharp**, at full banner height.
- Positioned to the **right**, roughly the right third to right half.
- No panel, no border, no card, no hard edge — it sits directly on the blurred
  fill, and because the blur beneath it comes from the same image, the edges
  blend naturally.
- Add a soft drop shadow beneath it so it lifts off the blurred layer rather
  than looking flat against it.

### Text

- Headline and `From $X` stay on the **left**, over the blurred fill.
- Keep the existing gradient scrim on the left if it is needed for contrast,
  but it should now be subtle — the darkened blur layer is doing most of that
  work. Do not reintroduce a hard-edged panel.

The result: colour and texture fill the whole banner, the product is fully
visible and sharp on the right, and there are no vertical seams.

---

## Height

Keep the banner at whatever height was chosen previously unless the product
still reads too small. If it does, increase it and report the value.

---

## Performance

Both layers use the same source file, so the browser fetches it once. Confirm
that is actually the case — if `next/image` is emitting two separate requests
per slide, adjust so it does not.

Only the first slide's images get `priority`.

---

## Verify and report

1. `npm run build` — no TypeScript errors.
2. The banner is filled edge to edge on every slide — no blank areas, no
   vertical seams, no boxed panel.
3. The whole product is visible and identifiable on every slide.
4. The headline and `From $X` remain clearly legible over the blurred fill on
   every slide — check each one, since the images differ in brightness.
5. `Back to Home`, the logo and the `EN` pill stay legible over every slide.
6. Click-through, chevrons, dots and the gold accent all still work as before.
7. 1440px, 768px, 375px — no overflow, no horizontal scrollbar.
8. `prefers-reduced-motion: reduce` — banner static.
9. Only one network request per slide image.
10. No console errors. Product data untouched.

**Report:**
- Blur radius, scale and darkening values used
- Any slide where the headline is hard to read over the fill
- Whether one request per image was achieved
- Banner height, if changed
- Anything that could not be done as specified, and why

Do not commit or push.
