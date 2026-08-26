# NEW-ADAPTERS-POWERBANKS-SPEC.md

Add 14 new products to the Accessories & Power category page. All images are
already in place — do not rename or move any image file.

## Rules

- **Surgical edits only.** Do not rewrite whole files or reformat existing code.
- **Do not invent specifications.** Only the price and the features written in
  this document are confirmed by the store. Do NOT add capacity, wattage,
  speed, compatibility, dimensions or materials unless listed here. A short
  `specs` object is correct and preferred over guessed data.
- Match the object shape and formatting of the surrounding entries.
- Every product must also be added to `CATALOG` in `lib/cellyRules.ts` with the
  same name and price.
- All are `availability: 'In Stock'`.
- **Do not commit or push.**

## Files to change

1. `app/Categories/accessories-power/page.tsx`
2. `lib/cellyRules.ts`

Images all live in `/images/Products/accessories-power/`.

---

## PART 1 — Adapters (category: `cables`)

| id | name | price | image | specs |
|---|---|---|---|---|
| `otg-usb-to-typec-adapter` | OTG USB (Male) to Type-C (Female) Adapter | 25.00 | `fashion-usb2usbc-adapter.png` | type: 'OTG Adapter', connection: 'USB Male to Type-C Female' |
| `yesido-otg-2in1-adapter` | YESIDO OTG 2-in-1 Adapter | 35.00 | `yesido-otg-2in1-adapter.png` | type: 'OTG Adapter', feature: '2-in-1' |
| `yesido-otg-adapter` | YESIDO OTG Adapter | 25.00 | `yesido-otg-adapter.png` | type: 'OTG Adapter' |
| `yesido-otg-male-to-female-adapter` | YESIDO OTG Adapter USB-L Male to USB-A Female | 40.00 | `yesido-otg-male-to-female-2.0-adapter.png` | type: 'OTG Adapter', connection: 'USB-L Male to USB-A Female' |
| `yesido-ip-to-typec-adapter` | YESIDO IP to Type-C Adapter | 30.00 | `yesido-ip-to-typec-adapter.png` | type: 'Adapter', connection: 'IP to Type-C' |

---

## PART 2 — Card readers (category: `storage`)

| id | name | price | image | specs |
|---|---|---|---|---|
| `otg-tfcard-sd-reader` | OTG Type-C (Male) to USB, TF Card and SD Card Reader (Female) | 50.00 | `otg-tfcard-sd-reader.png` | type: 'Card Reader', supports: 'USB, TF Card, SD Card', connection: 'Type-C Male' |
| `yesido-g18-card-reader` | YESIDO G18 Card Reader | 40.00 | `yesido-g18-card-reader.png` | type: 'Card Reader' |
| `yesido-g19-card-reader` | YESIDO G19 Card Reader | 40.00 | `yesido-g19-card-reader.png` | type: 'Card Reader' |
| `yesido-card-reader-typec-2` | YESIDO Type-C and 2.0 Card Reader | 40.00 | `yesido-card-reader-2.0.png` | type: 'Card Reader', connection: 'Type-C and USB 2.0' |

### GS37 Card Reader — check before adding

A **YESIDO GS37 Card Reader at $40** was also listed, with the filename
`yesido-gs37-card-reader.png`. That file was **not present** in the folder when
this spec was written.

- If the file now exists, add it: id `yesido-gs37-card-reader`, category
  `storage`, specs `type: 'Card Reader'`.
- If it does not exist, **skip it** and say so in your report. Do not
  substitute another image.

---

## PART 3 — Power banks (category: `powerbanks`)

| id | name | price | image | specs |
|---|---|---|---|---|
| `wireless-magnetic-power-bank-10000` | Wireless Fast Charging Power Bank 10,000mAh | 130.00 | `wireless-power-bank.png` | capacity: '10,000mAh', charging: 'Magnetic wireless, 120W', cables: '2-in-1 built-in Lightning and Type-C' |
| `samsung-galaxy-battery-pack` | Samsung Galaxy Battery Pack | 160.00 | `samsung-galaxy-power-bank.png` | type: 'Battery Pack' |
| `anker-power-bank-20000` | Anker Power Bank 20,000mAh | 200.00 | `anker-power-bank.png` | capacity: '20,000mAh', compatibility: 'Apple, Samsung, Google and more' |
| `jimzy-power-bank-10000` | Jimzy Power Bank 10,000mAh | 150.00 | `jimzy-power-bank.png` | capacity: '10,000mAh', features: 'Solar charging, LED light', cables: '4 built-in cords' |

### Deliberately excluded

**EVO Power Bank P21 (`evo-power-bank.png`)** — no price confirmed by the
store yet. Do not add it. The page renders `selectedProduct.price.toFixed(2)`,
so a card without a price would throw when a customer opens the detail modal.
It will be added once the store supplies the price.

---

## PART 4 — Update `lib/cellyRules.ts`

Add one CATALOG entry per product added, using the existing single-line format
and matching the page name and price exactly:

```
{ n: 'YESIDO OTG 2-in-1 Adapter', p: 35, c: 'cables' },
```

Categories to use: `cables` for the adapters, `storage` for the card readers,
`powerbanks` for the power banks.

- None are back soon — do **not** set `s: true` on any of them.
- Check for name collisions before adding. Note two Anker power banks already
  exist (`Anker Pocket-Sized 10000mAh` $75 and `Anker PowerCore Select
  10000mAh` $85, both back soon) — the new 20,000mAh at $200 is a **different
  product**. Add it, do not merge.
- Report any collisions you find, and test these queries afterwards, reporting
  any that resolve to nothing where they previously resolved to something:
  `otg`, `otg adapter`, `yesido otg adapter`, `card reader`, `g18`, `g19`,
  `anker`, `power bank`, `samsung battery pack`, `jimzy`.

It is expected and acceptable that a broad query like `otg adapter` or
`card reader` falls through to the category listing rather than picking one
product — that is the right answer for a genuinely ambiguous query. Only report
it as a problem if a query that previously resolved to a specific product now
returns the generic "I can't confirm that one" fallback.

---

## PART 5 — Verify

1. Run `npm run build` — must complete with no TypeScript errors.
2. Confirm every image path added matches a real file on disk, exact case.
3. Confirm no duplicate ids on the page.
4. Confirm the new items appear under the correct existing filters
   (`cables`, `storage`, `powerbanks`) — do not add any new filter.
5. Report: cards added, any skipped and why, collisions found, and the results
   of the Celly query tests above.

Do not commit or push.
