# FILTER-DROPDOWN-SPEC.md

Replace the inline row of filter pills on every category page with a single
**Filters** button that opens a dropdown.

## Rules

- Surgical edits only.
- Do not change product data, the filtering logic itself, or any filter's
  behaviour — only how the control is presented.
- **Do not commit or push.**

## Files in scope

All four category pages:

1. `app/Categories/phones/page.tsx`
2. `app/Categories/tech-audio/page.tsx`
3. `app/Categories/accessories-power/page.tsx`
4. `app/Categories/marine-world/page.tsx`

If the filter row markup is duplicated across all four, **extract a shared
component** into `components/` rather than writing the same dropdown four
times. Report which route you took.

---

## Why

Accessories & Power has thirteen filters wrapping onto two rows; Tech & Audio
has eleven. That is a lot of visual weight above the product grid, and it
pushes the products further down the page on mobile.

---

## PART 0 — Discovery (report first)

1. Whether the filter row markup is duplicated per page or already shared.
2. The filter list and translation keys on each page — the labels come from the
   `translations` object, so the dropdown must stay multilingual.
3. How `filterCategory` state is currently set and read on each page.
4. Whether the banner click-through added earlier also sets `filterCategory` —
   if so, the dropdown must reflect a filter set that way, not just clicks on
   itself.

---

## PART 1 — The button

- A single button labelled **Filters**, with a chevron indicating it opens.
- When a filter other than "All" is active, the button shows it —
  e.g. **Filters: Speakers** — so the customer can always see what is applied
  without opening the dropdown.
- Styled to match the gold accent already used on the active filter pill:
  gold background with dark text when a filter is active, and the quieter
  inactive treatment when showing "All".
- Sized as a normal control, not full width. Positioned where the filter row
  currently sits.

---

## PART 2 — The dropdown

- Opens on click, below the button.
- Lists every filter option currently in that page's filter array, in the same
  order, using the same translated labels.
- The active option is clearly marked — a check, or the gold treatment.
- Selecting an option applies the filter and closes the dropdown.
- Closes on: selecting an option, clicking outside, pressing Escape.
- Panel styling matches the existing dark translucent filter container —
  backdrop blur, subtle border. It must read clearly against all four page
  backgrounds.
- Must sit above the product grid in stacking order, not behind it.

### If the list is long

Accessories & Power has thirteen options. If the panel would run off the
bottom of the viewport, give it a max height and scroll internally rather than
extending past the fold.

---

## PART 3 — Keyboard and accessibility

- The button is a real `<button>` with `aria-expanded` and `aria-haspopup`.
- The dropdown is reachable and operable by keyboard: Enter or Space opens it,
  Up and Down move between options, Enter selects, Escape closes and returns
  focus to the button.
- Focus is visible on both the button and each option.
- The active option is conveyed to assistive technology, not only by colour.

---

## PART 4 — Mobile

At 375px the dropdown must not overflow the viewport or cause horizontal
scroll. If a dropdown panel is awkward at that width, a bottom sheet is an
acceptable alternative on small screens — report if you took that route.

---

## PART 5 — Spacing

Removing one or two rows of pills frees vertical space. Tighten the gap between
the subheading ticker and the products grid so the page does not end up with a
larger empty band than before. Report the values changed, from and to.

---

## Verify and report

1. `npm run build` — no TypeScript errors.
2. Every filter that worked before still works, on all four pages.
3. The button shows the active filter when one is applied.
4. Language switching updates both the button label and the dropdown options.
5. If the banner click-through sets a filter, the button reflects it.
6. Dropdown closes on outside click and on Escape.
7. Full keyboard operation works.
8. 1440px, 768px, 375px — no overflow, no horizontal scrollbar.
9. The dropdown reads clearly on all four page backgrounds.
10. No console errors. Product data untouched.

**Report:**
- Whether you extracted a shared component
- How you handled the thirteen-option list on Accessories & Power
- The mobile approach used
- Spacing values changed
- Anything that could not be done as specified, and why

Do not commit or push.
