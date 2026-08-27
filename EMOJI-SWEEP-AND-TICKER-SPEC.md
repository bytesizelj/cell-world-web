# EMOJI-SWEEP-AND-TICKER-SPEC.md

Two changes: remove emoji from the production UI, and turn the category page
subheadings into animated ticker strips.

## Rules

- **Surgical edits only.** Do not rewrite whole files or reformat existing code.
- Do not change any product data — no names, prices, availability or specs.
- **Do not commit or push.**

## Files in scope

1. `app/Categories/phones/page.tsx`
2. `app/Categories/tech-audio/page.tsx`
3. `app/Categories/accessories-power/page.tsx`
4. `app/page.tsx` — for the emoji sweep only (Part 1)

---

# PART 1 — Remove emoji from the production UI

The studio standard is **no emoji in production UI** — a shared SVG stroke-icon
system or real photos only. Cell World has drifted from this. `lucide-react` is
already the icon library on every page in scope; use it.

## The one exception

**Celly's chat reply text is exempt.** Do not touch emoji inside
`lib/cellyRules.ts` or inside the message strings in
`components/CellyAssistant.tsx`. Natural emoji use in conversational chat text
is deliberate and stays. Only the surrounding UI chrome is in scope.

## Known instances

Sweep for all of them, not only these:

### `app/page.tsx` — mobile navigation menu
Eight nav links carry a leading emoji. Replace each with a `lucide-react` icon
at a size that matches the surrounding text, using `currentColor` so it inherits
the existing hover states:

| Current | Suggested icon |
|---|---|
| Home | `Home` |
| Phones | `Smartphone` |
| Marine World | `Anchor` |
| Tech & Audio | `Headphones` |
| Accessories & Power | `Plug` or `Zap` |
| Reviews | `Star` |
| Contact | `Phone` |
| Order | `ShoppingCart` |

### `app/Categories/phones/page.tsx`
- `BEST SELLER` badge — leading flame emoji. Replace with the `Flame` icon.
- `HOT DEAL` badge — leading explosion emoji. Replace with the `Tag` or `Zap`
  icon.
- Back Soon message in the detail modal — leading package emoji. Replace with
  the `Package` icon.

### `app/Categories/tech-audio/page.tsx` and `accessories-power/page.tsx`
- Back Soon message in the detail modal — leading package emoji. Replace with
  the `Package` icon.

## How to replace

Do not simply delete the emoji and leave the text bare where the emoji was
carrying meaning — put a real icon in its place, vertically aligned with the
text. Where an emoji was purely decorative and the text reads fine alone,
removing it entirely is correct; say which ones you judged that way.

Keep icons small and consistent — match the sizing already used elsewhere on
the same page (`w-4 h-4` / `w-5 h-5`).

## Report

List every emoji found, which file and line, and what you replaced it with.
Flag any you found outside the files listed above, and any you were unsure
whether to treat as UI or as chat text.

---

# PART 2 — Ticker subheadings

On the three category pages, the static subheading under the page title becomes
a horizontally scrolling ticker strip, moving **left to right** across the page.

| Page | Current subheading text |
|---|---|
| Mobile Phones | Latest Smartphones & Tablets |
| Tech & Audio | Speakers, Gaming, Audio Equipment & More |
| Accessories & Power | Cases, Cables, Power Banks & Car Accessories |

## Requirements

**Keep it multilingual.** Each page's subheading comes from `t.subtitle` in the
translations object, and the language switcher swaps EN/FR/ES. The ticker must
render whatever `t.subtitle` currently holds — do not hardcode the English
string.

**Seamless loop.** Render the text content multiple times inside the moving
track so there is no visible gap or jump when it wraps. Animate with
`transform: translateX(...)` — not `left`, `margin` or `background-position` —
so it runs on the GPU and stays smooth on mobile.

**Left to right.** Content should travel toward the right edge. Note in your
report the one-line change that would reverse it, in case the store prefers
right-to-left after seeing it.

**Full width.** The strip spans the page width, with `overflow: hidden` on the
container so text is clipped cleanly at both edges rather than causing
horizontal page scroll. Verify no horizontal overflow is introduced at 320px.

**Dramatic, but readable.** The house style favours noticeable motion over
timid fades. Pick a speed that reads as deliberate movement without making the
text hard to read — around 20–30 seconds for a full cycle is usually right for
a strip this length. Tune it and say what you chose.

**Respect the existing styling.** Each page styles its subheading differently —
tech-audio uses a gradient treatment, phones uses a gold colour with text
shadow. Preserve each page's existing look; only the motion is new.

### `prefers-reduced-motion` is mandatory

Wrap the animation so that under `@media (prefers-reduced-motion: reduce)` the
ticker stops entirely and the subheading renders as static, centred, fully
readable text. This is a studio requirement on every animated component, not a
global utility — it must be scoped to this component.

## Implementation note

Each of these pages already has a `<style jsx>` block at the bottom with
keyframes (`float`, `slide-diagonal` and so on). Add the ticker keyframes there
rather than introducing a new styling approach. If the three implementations
would be identical, consider extracting a small shared component into
`components/` and using it on all three — say which route you took and why.

---

# PART 3 — Verify

1. `npm run build` — must complete with no TypeScript errors.
2. No emoji remain in the four files in scope, outside Celly's chat text.
   Report the grep you used.
3. The ticker renders on all three category pages, loops seamlessly, and
   travels left to right.
4. Switching language to FR and ES updates the ticker text.
5. No horizontal page overflow at 320px width.
6. With `prefers-reduced-motion: reduce` simulated, the ticker is static and
   readable on all three pages.
7. Product data is untouched — confirm no price, name, availability or spec
   changed.

Report: emoji replaced (with file and line), icons chosen, ticker speed and
direction, whether you extracted a shared component, and the reduced-motion
result.

Do not commit or push.
