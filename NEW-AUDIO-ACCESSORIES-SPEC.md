# NEW-AUDIO-ACCESSORIES-SPEC.md

Add new stock to the Tech & Audio and Accessories & Power category pages.
All images are already in place and correctly named — do not rename or move
any image file.

## Rules

- **Surgical edits only.** Do not rewrite whole files or reformat existing code.
- **Do not invent specifications.** Only the price, colour and the few features
  listed below are confirmed by the store. Do NOT add battery life, driver size,
  Bluetooth version, water rating, RAM, screen size or any other spec unless it
  is written in this document. A short `specs` object is correct and preferred
  over guessed data.
- Match the object shape and formatting of the surrounding entries in each file.
- Every product added to a page must also be added to `CATALOG` in
  `lib/cellyRules.ts`, with the same name and price.
- **Do not commit or push.**

## Files to change

1. `app/Categories/tech-audio/page.tsx`
2. `app/Categories/accessories-power/page.tsx`
3. `lib/cellyRules.ts`

---

## PART 1 — Tech & Audio: five new cards

Add to the `products` array in `app/Categories/tech-audio/page.tsx`.
All are `category: 'earbuds'`, `availability: 'In Stock'`.
Images live in `/images/Products/tech-audio/`.

| id | name | price | image | color |
|---|---|---|---|---|
| `belkin-soundform-rhythm` | Belkin SoundForm Rhythm | 175.00 | `belkin-sound-form-white.jpg` | White only |
| `belkin-soundform-anywhere` | Belkin SoundForm Anywhere | 175.00 | `belkin-sound-form-blkngreen.jpg` | Black with green accents |
| `skullcandy-dime-2-xt` | Skullcandy Dime 2 XT | 165.00 | `dime2-earbuds-blue-grey.jpg` | Blue, Green |
| `jbl-vibe-beam-2` | JBL Vibe Beam 2 | 280.00 | `jbl-beam2-earbuds.jpg` | Blue, White |
| `jbl-vibe-buds-2` | JBL Vibe Buds 2 | 260.00 | `jbl-vibe-earbuds-blk.jpg` | Black only |

### JBL Tune Flex — one card, two images

| id | name | price | image | color |
|---|---|---|---|---|
| `jbl-tune-flex` | JBL Tune Flex | 250.00 | `jbl-tune-flex-blk.jpg` | Black, Navy Blue |

This one card gets a second image via the existing `additionalImages` pattern
used elsewhere on this page, so customers can switch colour with the dot
selector:

```
additionalImages: [
  '/images/Products/tech-audio/jbl-tune-flex-earbuds-blue.jpg'
],
```

### Specs

Keep them minimal. For all six above, a `specs` object containing only what is
known is correct — e.g. `type: 'Wireless Earbuds'` and the colour options.
Do not add battery hours, ANC claims, waterproof ratings or Bluetooth versions
unless already present for that exact product elsewhere in the file.

---

## PART 2 — Tech & Audio: update one existing card

### `id: 'jbl-vibe-buds'` (currently $220, In Stock)

- Change `image` to `/images/Products/tech-audio/jbl-vibe-earbuds-white.jpg`
- Change `color` to `'White only'` (it currently says Black & White)
- Price stays `220.00`
- Do not duplicate this product — the new `jbl-vibe-buds-2` above is a
  different, more expensive model.

---

## PART 3 — Accessories & Power: three new cards

Add to the `products` array in `app/Categories/accessories-power/page.tsx`.
All `availability: 'In Stock'`. Images in `/images/Products/accessories-power/`.

### 3a. Emergency category — two new items

| id | name | price | category | image | specs |
|---|---|---|---|---|---|
| `audio-box-emergency-flashlight` | Audio Box Emergency Flashlight | 75.00 | `emergency` | `audio-box-emergency-light.jpg` | Bluetooth, FM Radio, Solar rechargeable |
| `ludger-handy-light-black` | LUDGER Rechargeable Handy Light (Black) | 75.00 | `emergency` | `ludger-handy-light.jpg` | — |

**Name collision warning:** an entry already exists called
`LUDGER Rechargeable Handy Light EL-7005L` at $50 (id
`ludger-rechargeable-handy-light-7005`). The new black one is a **different,
separate product at a different price** — do not merge or overwrite it. Keep
the "(Black)" in the name so the two are distinguishable to customers and to
Celly's lookup.

### 3b. GS Pad 11 Pro — goes on the PHONES page, not this one

This product does **not** go in `app/Categories/accessories-power/page.tsx`.
It is a tablet, so it belongs on `app/Categories/phones/page.tsx` under the
existing `tablet` category, alongside the iPad 9th Generation and FANGOR
Tablet. Do not add a new filter anywhere.

| id | name | price | category | image | color |
|---|---|---|---|---|---|
| `gs-pad-11-pro` | GS Pad 11 Pro | 550.00 | `tablet` | `/images/Products/accessories-power/gs-pad-11-pro.jpg` | Blue, Silver, Black |

- `availability: 'In Stock'`
- Description should mention the add-ons: **wireless keyboard, mouse and stylus
  included**.
- Note the image path points at the `accessories-power` folder — that is where
  the file actually lives. Do not move the file.
- No storage, RAM or screen size is confirmed — do not add any.

---

## PART 4 — Accessories & Power: three photo swaps only

Change **only** the `image` path on these existing cards. Do not change the
name, price, availability, colour or specs on any of them.

| Existing card | New image |
|---|---|
| LUDGER Rechargeable Handy Light EL-7005L ($50) | `ludger-power-handy-light.jpg` |
| LUDGER Lantern EL-1830LED (Cream) ($125) | `ludger-power-light-lantern-yellow.jpg` |
| LUDGER Emergency Lantern EL-536USV (Blue) ($120) | `ludger-power-light-lantern-blue.jpg` |

---

## PART 5 — Update `lib/cellyRules.ts`

Add one CATALOG entry per product using the existing single-line format:

```
{ n: 'Belkin SoundForm Rhythm', p: 175, c: 'earbuds' },
```

To add:
- Belkin SoundForm Rhythm — 175 — earbuds
- Belkin SoundForm Anywhere — 175 — earbuds
- Skullcandy Dime 2 XT — 165 — earbuds
- JBL Vibe Beam 2 — 280 — earbuds
- JBL Vibe Buds 2 — 260 — earbuds
- JBL Tune Flex — 250 — earbuds
- GS Pad 11 Pro — 550 — tablet
- Audio Box Emergency Flashlight — 75 — emergency
- LUDGER Rechargeable Handy Light (Black) — 75 — emergency

Notes:
- None of these are back soon — do **not** set `s: true` on any of them.
- Check for name collisions before adding. In particular `JBL Vibe Buds`
  already exists at 220 — leave it, and add `JBL Vibe Buds 2` as a separate
  entry. Confirm Celly can distinguish the two; if a query for "vibe buds"
  now resolves to nothing because of an ambiguous match, report it rather
  than silently leaving it broken.
- Report any other collisions you find.

---

## PART 6 — Housekeeping

`public/images/Products/accessories-power/jbl-tune-flex-earbuds-blue.jpg` is a
stray duplicate of the file of the same name in `tech-audio/`. The tech-audio
copy is the one referenced by Part 1. Delete the accessories-power copy —
confirm nothing references it first.

---

## PART 7 — Verify

1. Run `npm run build` — must complete with no TypeScript errors.
2. Confirm every image path added matches a real file on disk, exact case.
3. Confirm the new `tablets` filter renders and shows the GS Pad.
4. Test Celly lookups for: "vibe buds", "vibe buds 2", "tune flex",
   "dime 2", "handy light". Report any that resolve to nothing.
5. Report: cards added, cards updated, photo swaps done, collisions found.

Do not commit or push.
