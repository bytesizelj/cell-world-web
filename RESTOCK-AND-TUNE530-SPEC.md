# RESTOCK-AND-TUNE530-SPEC.md

Three changes to Tech & Audio: two products back in stock, one price drop, one
new product. The new image is already in place — do not rename or move it.

## Rules

- **Surgical edits only.** Change only the fields named below.
- **Do not invent specifications.** Only what is written here is confirmed by
  the store.
- Page and `CATALOG` in `lib/cellyRules.ts` must stay in sync.
- **Do not commit or push.**

## Files to change

1. `app/Categories/tech-audio/page.tsx`
2. `lib/cellyRules.ts`

---

## PART 1 — RCA HoloSound: back in stock

### Page: `id: 'rca-holosound-speaker'`
- Change `availability` from `'Back Soon'` to `'In Stock'`
- **Price stays at 599.00** — the store confirmed it is unchanged.
- Change nothing else.

### CATALOG: `{ n: 'RCA HoloSound', p: 599, c: 'speakers', s: true }`
- Remove `s: true`. Price unchanged.

---

## PART 2 — PS5 Console Disc Drive: back in stock, price drop

### Page: `id: 'ps5-console-disc'`
- Change `availability` from `'Back Soon'` to `'In Stock'`
- Change `inStock` from `false` to `true` (this entry carries both fields)
- Change `price` from `2900.00` to `2500.00`
- Add `priceDropped: true` — this page already uses that flag (see
  `rca-tws-gamerbeat-speaker`) and it renders the PRICE DROP badge.
- Change nothing else.

### CATALOG: `{ n: 'PS5 Console Disc Drive', p: 2900, c: 'gaming', s: true }`
- Change `p` to `2500` and remove `s: true`.

---

## PART 3 — New product: JBL Tune 530

Add to the `products` array in `app/Categories/tech-audio/page.tsx`, in the
headphones group alongside the existing JBL TUNE 520 and 525.

| field | value |
|---|---|
| id | `jbl-tune-530` |
| name | JBL Tune 530 |
| image | `/images/Products/tech-audio/jbl-tune-530.png` |
| price | 220.00 |
| category | `headphones` |
| availability | `In Stock` |
| color | Black, Purple, Navy Blue, White |

Specs: keep minimal. Only `type: 'Wireless Headphones'` and the colour options.
Do **not** add battery hours, driver size, Bluetooth version or any feature
claim — none were confirmed by the store.

### CATALOG
Add to the headphones section:

```
{ n: 'JBL Tune 530', p: 220, c: 'headphones' },
```

Note the existing `JBL TUNE 525` ($225) and `JBL TUNE 520` ($199) are both
`s: true` (back soon). Leave them exactly as they are — the 530 is a separate
product, not a replacement.

---

## PART 4 — Celly: fix the "Best Camera" answer

The **Best Camera** quick-question button sends *"Which phone has the best
camera?"*. Celly currently falls through to the generic phones rule and lists
every phone in stock, which is not an answer.

Add a dedicated rule in `getCellyReply()` in `lib/cellyRules.ts`, placed
**immediately before the `// SPECIFIC ITEM lookup` block** so it runs ahead of
the generic phones rule.

### Trigger
Match camera-quality questions, e.g.
`/(best|good|top|great).{0,15}camera|camera.{0,15}(best|good|quality)|photography/`
Make sure it does not fire on unrelated camera words such as
"camera slide case" or "selfie stick".

### The answer — curated, but self-maintaining

Do **not** rank by megapixels. Megapixel count is not camera quality: the
Samsung A06 at $530 has a 50MP main camera while the iPhone 15 Pro Max at
$2800 has 48MP, so a numeric sort would give a wrong answer.

Instead hardcode a ranked preference list by product name, then filter it
against `inStock('phone')` at runtime so any phone that sells out drops out of
the answer automatically:

1. **iPhone 15 Pro Max** — best overall
2. **iPhone 15 Pro** — same main sensor, 3x telephoto instead of 5x
3. **iPhone 13 Pro Max** — best value flagship camera
4. **Samsung A16** — best camera under $700
5. **Samsung A42 5G** — best camera under $600

Reply with the **top three that are currently in stock**, each with its price
and a short reason, then the `[[CONTACT]]` sentinel. If fewer than three of
the listed phones are in stock, show whatever is available. If none are, fall
back to the existing generic phones listing rather than returning nothing.

Keep the reasons short and factual — draw them from the `specs` already on the
phones page. Do not invent camera claims.

---

## PART 5 — Verify

1. Run `npm run build` — must complete with no TypeScript errors.
2. Confirm `jbl-tune-530.png` resolves on disk, exact case.
3. Confirm no duplicate ids.
4. Confirm the two restocked items no longer show the BACK SOON overlay, and
   that the PS5 shows the PRICE DROP badge at $2500.
5. Test these Celly queries and report the result of each: `holosound`,
   `ps5`, `ps5 disc`, `jbl tune 530`, `tune 530`, `jbl tune`.
   Report anything that resolves to nothing, and flag if `jbl tune` has become
   ambiguous now that a third Tune model exists.
6. Test the Best Camera rule with the exact quick-question text
   *"Which phone has the best camera?"* plus `best camera`, `good camera`,
   `which phone takes the best pictures`. Confirm it returns the curated top
   three and not the full phone listing. Also confirm it does **not** fire on
   `camera slide case` or `selfie stick`.
7. If the JBL Tune 530 image is large (over ~500 KB), compress it with the same
   sharp pass used on previous batches, checking for an alpha channel first.
   It must go in the same commit as the code.

Report: what changed, image size before/after, Celly query results, and any
collisions.

Do not commit or push.
