# NEW-PHONES-SPEC.md

Add new phone stock to the Cell World phones category. All images are already
in place and correctly named — do not rename or move any image files.

## Rules

- **Surgical edits only.** Do not rewrite whole files or reformat existing code.
- **Do not invent specifications.** Only the storage capacity, price and colour
  below are confirmed by the store. Do NOT add display sizes, camera megapixels,
  battery capacities, processors or any other spec that is not listed here.
  An empty or minimal `specs` object is correct and preferred over guessed data.
- **Do not commit or push.** Leave changes for review.
- Match the existing object shape and formatting used by the surrounding
  product entries in each file.

## Files to change

1. `app/Categories/phones/page.tsx` — the `products` array
2. `lib/cellyRules.ts` — the `CATALOG` array (phones section)

Both must stay in sync. Every phone added to the page must also be added to
`CATALOG` with the same name and price.

---

## PART 1 — Update three existing entries

These products already exist on the page. Update them; do not duplicate them.

### 1a. `id: 'itel-a100c'`
- Change `image` to `/images/Products/phones/new/itel-a100c-64gb.jpg`
- Add `color: 'Green'`
- Price stays `440.00`

### 1b. `id: 'samsung-a42'`
- Change `price` from `600.00` to `550.00`
- Change `image` to `/images/Products/phones/new/samsung-galaxy-a42-5g.jpg`
- Keep `priceDropped: true`
- Also update this item's price in `CATALOG` in `lib/cellyRules.ts`

### 1c. `id: 'samsung-a06'`
- **Remove this entry entirely.** It is replaced by the two new colour-specific
  A06 cards in Part 2 (items 12 and 13), which carry the corrected $530 price.
- Update the existing `Samsung A06` entry in `CATALOG` to price `530`.

---

## PART 2 — Add 13 new product cards

Add these to the `products` array in `app/Categories/phones/page.tsx`.
All are `availability: 'In Stock'`.
All images live in `/images/Products/phones/new/`.

| # | id | name | price | category | image | color |
|---|---|---|---|---|---|---|
| 1 | `iphone-15-pro-max` | iPhone 15 Pro Max | 2800.00 | flagship | `iphone-15-pro-max-256gb.jpg` | — |
| 2 | `iphone-15-pro` | iPhone 15 Pro | 2500.00 | flagship | `iphone-15-pro-128gb.jpg` | — |
| 3 | `iphone-13-pro-max` | iPhone 13 Pro Max | 2250.00 | flagship | `iphone-13-pro-max-128gb.jpg` | — |
| 4 | `iphone-13` | iPhone 13 | 1900.00 | flagship | `iphone-13-256gb.jpg` | — |
| 5 | `samsung-m07` | Samsung Galaxy M07 | 540.00 | budget | `samsung-galaxy-m07-64gb.jpg` | — |
| 6 | `samsung-f07-new` | Samsung Galaxy F07 | 540.00 | budget | `samsung-galaxy-f07-64gb.jpg` | Green only |
| 7 | `alcatel-1041` | Alcatel 1041 | 160.00 | basic | `alcatel-1041.jpg` | — |
| 8 | `techview-s15-pro` | TechView S15 Pro | 430.00 | budget | `techview-s15-pro-64gb.jpg` | — |
| 9 | `techview-s16-pro` | TechView S16 Pro | 499.00 | budget | `techview-s16-pro-128gb.jpg` | White, Navy Blue, Green |
| 10 | `techview-s17-pro-white` | TechView S17 Pro | 499.00 | budget | `techview-s17-pro-white.jpg` | White |
| 11 | `techview-s17-pro-orange` | TechView S17 Pro | 499.00 | budget | `techview-s17-pro-orange.jpg` | Orange |
| 12 | `samsung-a06-black` | Samsung Galaxy A06 | 530.00 | budget | `samsung-galaxy-a06-64gb.jpg` | Black |
| 13 | `samsung-a06-light-blue` | Samsung Galaxy A06 | 530.00 | budget | `samsung-galaxy-a06-light-blue.jpg` | Light Blue |

### Storage — the only confirmed spec

Include storage in the `specs` object where known. Nothing else.

- 256GB: iPhone 15 Pro Max, iPhone 13
- 128GB: iPhone 15 Pro, iPhone 13 Pro Max, TechView S16 Pro, TechView S17 Pro (both)
- 64GB: Samsung M07, Samsung F07, TechView S15 Pro, Samsung A06 (both)
- Alcatel 1041: no storage figure given — omit the field

Example of the expected shape:

```
{
  id: 'iphone-15-pro-max',
  name: 'iPhone 15 Pro Max',
  image: '/images/Products/phones/new/iphone-15-pro-max-256gb.jpg',
  price: 2800.00,
  category: 'flagship',
  availability: 'In Stock',
  specs: {
    storage: '256GB'
  }
},
```

---

## PART 3 — Update `lib/cellyRules.ts`

Add each new phone to the `CATALOG` array in the phones section, using the
existing single-line format:

```
{ n: 'iPhone 15 Pro Max', p: 2800, c: 'phone' },
```

Notes:
- Do **not** set `s: true` on any of these — all are in stock.
- For the two A06 colour cards and the two S17 Pro colour cards, add only
  **one** CATALOG entry per model (not one per colour). Celly answers by
  product name, and duplicate names break its lookup — only the first match
  would ever be returned.
- There are existing `iPhone 13 Pro Max` and `iPhone 12`/`iPhone 14` entries
  marked `s: true` (back soon). The iPhone 13 Pro Max is now in stock at a new
  price — update that existing entry to `p: 2250` and remove its `s: true`
  rather than adding a second entry.
- Check for any other name collisions before adding, and update in place
  rather than duplicating.

---

## PART 4 — Verify

1. Run `npm run build` and confirm it completes with no TypeScript errors.
2. Confirm every `image` path added matches a real file in
   `public/images/Products/phones/new/` — exact lowercase, no spaces.
3. Report back: how many cards were added, which existing entries were changed,
   and any name collisions found in `CATALOG`.

Do not commit or push.
