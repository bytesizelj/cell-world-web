# CELL WORLD SVG — MASTER HANDBOOK
**Authoritative project reference. Upload this file as the first message in any new Cell World chat.**

*Maintained by HighMark Business Systems (LJ). Last updated: June 2026.*

---

## 0. HOW TO USE THIS DOCUMENT

When starting a new chat for Cell World:
1. Upload this file as the first message.
2. Tell Claude where we are / what we're working on next.
3. Claude updates the relevant sections (Current Position, Remaining Tasks, etc.) as we progress.
4. Re-export and save the updated version at the end of significant sessions.

> **[CONFIRM] items** = facts Claude reconstructed from past chats that you should verify and correct once, then they're locked in.

> 🔒 **Secrets live in a separate file, `CELL-WORLD-SECRETS.md`.** This handbook holds NO passwords or private keys, so it is safe to commit to Git. Keep `CELL-WORLD-SECRETS.md` out of Git (see its own header for the `.gitignore` line) and store it only in your local `Projects\` folder + the private Claude project.

---

## 1. PROJECT OVERVIEW

| | |
|---|---|
| **Project** | Cell World SVG |
| **Type** | Feature-rich PWA — electronics & retail (category display, **not** full e-commerce) |
| **Client** | Cell World, Kingstown, St. Vincent & the Grenadines |
| **Live URL** | https://cellworldsvg.com |
| **Vercel URL** | https://cellworldsvg.vercel.app |
| **Purpose** | Product catalogue by category, AI assistant, WhatsApp ordering, reviews, promotions |
| **Tagline / positioning** | Electronics retail with 24/7 AI help + WhatsApp ordering |

**What the app does:** browse products by category, ask "Celly" (AI assistant) questions, order via WhatsApp, read Google reviews, multilingual browsing. No cart/checkout/payment — ordering routes to WhatsApp.

---

## 2. TECH STACK

| Layer | Tech |
|---|---|
| Framework | **Next.js 15.4.5** (App Router) |
| Language | **TypeScript** (`page.tsx`) |
| Styling | **Tailwind CSS** |
| Icons | **Lucide React** |
| Hosting | **Vercel** |
| Package manager | **npm** |
| Dev OS | **Windows 11** (VS Code, PowerShell) |
| Config file | **`next.config.js`** (using `.js`, **NOT** `.ts`) — cache headers added; **Turbopack removed** from the dev script |

---

## 3. ACCOUNTS, REPO & URLS

| | |
|---|---|
| **GitHub repo** | `bytesizelj/cell-world-web` |
| **Git branch** | `main` |
| **Backup branch(es)** | `backup-working-dec2024` (+ `backup-[description]` pattern before risky work) |
| **Vercel Dashboard** | https://vercel.com/bytesizeljs-projects/cell-world-web-76w5 |
| **Vercel Dashboard (general)** | https://vercel.com/dashboard |
| **GoDaddy DNS** | https://dcc.godaddy.com/ |
| **Production domain** | cellworldsvg.com |

### DNS (standard HighMark pattern)
**GoDaddy → Vercel direct. No Cloudflare.**
- `A` record: `@` → `76.76.21.21`
- `CNAME` record: `www` → `cname.vercel-dns.com`

---

## 4. PROJECT FILE STRUCTURE

> **✅ CONFIRMED — working path is `C:\Users\ictcl\Projects\cell-world-web`.** Moved off OneDrive (`...\OneDrive\Desktop\...`) because it was constantly buffering/syncing. All `code path\to\file` commands use the `Projects\` base.

```
cell-world-web/
├─ app/
│  ├─ page.tsx                 ← Homepage (hero, language switcher, category cards)
│  ├─ layout.tsx
│  ├─ Categories/
│  │  ├─ phones/page.tsx       ← COMPLETE
│  │  ├─ marine-world/
│  │  │  ├─ page.tsx           ← Marine + fishing + boat-parts
│  │  │  └─ boat-parts/page.tsx ← Dedicated SEO subpage
│  │  ├─ more/page.tsx         ← RETIRED (split into tech-audio + accessories-power) [CONFIRM route names/paths]
│  │  ├─ tech-audio/page.tsx   ← split from "more" — authoritative source for audio prices [CONFIRM]
│  │  ├─ accessories-power/page.tsx ← split from "more" — power/accessories [CONFIRM]
│  │  └─ repair-service/page.tsx ← Phone repair services [CONFIRM exact route name]
│  ├─ contact/
│  ├─ reviews/                 ← Google Reviews
│  └─ order/                   ← Valentine order form (promo — see §8)
├─ components/
│  ├─ CellyAssistant.tsx       ← Celly chat UI (renders only — logic lives in lib/cellyRules.ts)
│  ├─ HeroCarousel.tsx
│  ├─ NavigationMenu.tsx
│  └─ GoogleAnalytics.tsx
├─ lib/
│  └─ cellyRules.ts            ← Celly's brain: CATALOG (~150 items) + REPAIRS + getCellyReply()
└─ public/
   ├─ cell-world-logo.png
   ├─ manifest.json, sitemap.xml, robots.txt
   ├─ images/
   │  ├─ celly/celly-avatar-icon.png
   │  ├─ videos/
   │  └─ Products/
   │     ├─ phones/   (+ /cropped)
   │     ├─ marine/
   │     └─ fishing/
   └─ next.config.js
```

**Helper batch files (project root):**
- `clean-rebuild.bat` — full cache clear + rebuild
- `safe-update.bat` — test build before committing
- `clean-rebuild-enhanced.bat` — adds browser-cache clear

---

## 5. "CELLY" — AI ASSISTANT

| | |
|---|---|
| UI component | `components/CellyAssistant.tsx` (chat window + bubble only) |
| **Logic / brain** | **`lib/cellyRules.ts`** — single source of Celly's answers (rebuilt June 2026). Exports one `getCellyReply()` function. Contains a single `CATALOG` array (~150 items across all categories) + a full `REPAIRS` list. Uses a `CAT_MAP` for category routing, brand matching, and a specific-item lookup that runs **before** category/brand logic (so "fuel clip?" or "jbl flip 6" returns one precise answer, not the whole category). |
| Handoff / fallback | When Celly can't confirm something it returns the `[[CONTACT]]` sentinel, which the chat UI renders as tappable **WhatsApp + Call** buttons. Fallback wording: *"I'm not able to confirm that one from here, but the store team can help you out directly. Tap below:"* |
| Load pattern | `dynamic(() => import('@/components/CellyAssistant'), { ssr: false })` on pages |
| **Appearance (locked / original look)** | Floating orange circular avatar button (`border-4 border-orange-500`, white bg) with a green pulsing "online" dot. Click → 400×600 chat window, orange header, "Celly Assistant • Online • Cell World Expert", quick-question buttons, teal send button. |
| Avatar image | `/images/celly/celly-avatar-icon.png` |
| Knows | Full shop catalog + prices, repairs, store hours, closing time, location, email |
| Editing rule | To change what Celly says, edit `lib/cellyRules.ts` (CATALOG / REPAIRS / rule order) — **not** the component. The component only renders. |
| Known past issues (resolved) | (1) Unknown items ("do you sell drones") were swallowed by an over-broad generic-overview regex — tightened so they fall through to the handoff. (2) "email address" hit the location rule because "address" matched — added a dedicated email handler before location. (3) Specific-item lookup added ahead of all category/brand logic; later stripped category plural words (speakers, chargers, cases…) from token matching so "speakers" no longer resolved to the single BLAUPUNKT item. |

---

## 6. STORE INFO (single source of truth)

| | |
|---|---|
| **WhatsApp / orders** | **1-784-431-0777** (`https://wa.me/17844310777`) |
| **Hours** | Mon–Fri 8AM–5PM · Sat 8AM–2PM · **Sun CLOSED** |
| **Pickup** | In-store only |
| **Location** | Kingstown, St. Vincent & the Grenadines |

---

## 7. CATEGORIES & PRODUCTS

**Phones — COMPLETE.** Image filenames (in `public/images/Products/phones/`):
`blu-a140, ipad-9th-gen, logic-z1l, nokia-110, samsung-a05s, samsung-a06, samsung-a16, samsung-a25, samsung-a26, samsung-f05, samsung-s24fe, zteblad-a72s` (.png)

**Marine World** — marine equipment, boat parts, fishing supplies + dedicated `/boat-parts` SEO subpage. Known boat-parts items:
- Fuel Primer Bulb Pump Assembly — **$75**
- Fuel Clip (Yamaha OEM) — **$60**
- Fuel Line Kit (Yamaha OEM) — **$250**
- Fishing Reels YoYo — $6 (+ other fishing lures)

**"More" — RETIRED.** Split into **tech-audio** and **accessories-power** categories, which are now the **authoritative price sources** (this resolved old price conflicts, e.g. JBL Flip 6 listed at both $299 and $499). [CONFIRM exact routes.]

**Repair Service** — dedicated repairs category page; repair items also live in the `REPAIRS` list inside `lib/cellyRules.ts` so Celly can quote them. [CONFIRM page route + current repair pricing.]

**Celly catalog coverage** — the `CATALOG` in `lib/cellyRules.ts` spans: phones, tablets, laptop, gaming, earbuds, headphones, speakers, watches, microphones, audio interfaces, car audio, car accessories, TV/streaming, keyboards, mouse, selfie/gimbals, chargers, cables, cases, power banks, power/surge, emergency, storage, networking, marine, fishing, and misc — plus REPAIRS.

> Per-page product data still lives inline in each category `page.tsx` as card objects (`id, name, image, price, priceRange, category, availability, description, specs`). **Celly's answers are now separate** — they come from `lib/cellyRules.ts`, not the page files. Keep the two in sync when prices change. Image cache-busting via `?v=N` query suffix is used when swapping images.

---

## 8. VALENTINE'S PROMOTION (built Jan 2026 — **promo period ended Feb 14, 2026**)

Complete promotional order system. **Now historical** — controlled by a `PROMO_ACTIVE` flag.

> **✅ CONFIRMED — `PROMO_ACTIVE` is `false` (promo OFF, banner hidden).** Ended Feb 14, 2026. Do not re-ship active.

| | |
|---|---|
| Order form route | `/order` (a.k.a. `/valentine-order`) |
| Order counter | `localStorage` key `valentineOrderCount` |
| Winner milestones | #25, #50, #100 |
| Prizes | #25 Selfie Stick ($60) · #50 Wireless Earbuds ($99) · #100 Power Pack + Samsung A11 ($519) |
| Submit flow | Builds WhatsApp message → opens `wa.me/17844310777`; winners flagged 🏆 with "show this message to claim" |
| Homepage banner | Red sliding banner, falling-hearts animation, product images, ticker |
| Admin dashboard | Password **→ see `CELL-WORLD-SECRETS.md`**, real-time order table, winner ID, search/filter, **CSV export** |

---

## 9. INTEGRATIONS, KEYS & ANALYTICS

| | |
|---|---|
| **Google Analytics** | `G-E9RDJE166F` (via `GoogleAnalytics.tsx`) — measurement ID, public by nature (ships in client), not a secret |
| **Google Maps API key** | **→ see `CELL-WORLD-SECRETS.md`** (client-side key; restrict by HTTP referrer in Google Cloud) |
| **Google Places** | Autocomplete used (country bias `vc`) |
| **Multilingual** | EN / FR / ES / PT language switcher + Google Translate redirect |
| **Google Reviews** | `/reviews` page |
| ⚠️ **Shared billing** | Cell World shares the **same Google Cloud billing account as Ranchie Taxi.** A billing lapse breaks Maps/Places on **both** apps. |

---

## 10. CURRENT POSITION

> **[CONFIRM] — this is the main thing to update at the start of our next session.**

Reconstructed status: the app is **live and stable** at cellworldsvg.com. The **most recent recorded Cell World work (June 2026)** was the **Celly rebuild** — moving Celly's logic out of `CellyAssistant.tsx` into `lib/cellyRules.ts` (single `CATALOG` of ~150 items + `REPAIRS`, `getCellyReply()`, specific-item lookup, `[[CONTACT]]` WhatsApp/Call handoff). All four post-rebuild fixes tested and confirmed passing. Before that, the **Valentine's promo** (shipped end of Jan 2026; period closed Feb 14, 2026). Other recent build energy has been on Pirates Pub and the HighMark website.

**Tell me at the start of the next chat:** what (if anything) is the current Cell World task — promo teardown, new products, Celly tuning, new category, or something else?

---

## 11. REMAINING / CANDIDATE TASKS

Historical open items + obvious next moves (confirm priority):
1. **Retire the Valentine promo cleanly** — set `PROMO_ACTIVE=false`, hide banner, archive `/order` route (or repurpose as a generic WhatsApp order form). **[CONFIRM]**
2. **Product image 404 audit** — Vercel (Linux) is **case-sensitive**; Windows is not. Verify every image path matches filename case exactly, and that files are actually committed to GitHub (`git ls-files | findstr <name>`).
3. **Cache freshness** — customers historically needed a hard refresh after deploys. Cache headers in `next.config.js` + Turbopack removal help; verify a normal refresh now picks up changes.
4. **PWA polish** — `manifest.json` console warnings are non-critical but worth clearing.
5. **(Optional) Reusable WhatsApp ordering** — generalise the promo order form into a permanent ordering path.

---

## 12. KNOWN QUIRKS & GOTCHAS

- **`next.config.js` not `.ts`** — there were two configs at one point; standardise on `.js`.
- **No Turbopack in dev** — it caused chunk-loading errors; the dev script runs plain `next dev`.
- **Hard-refresh cache issue** — historically required even after CDN purge.
- **Case-sensitive images on Vercel** — #1 cause of "works locally, 404 in production."
- **`metadata` export** — can't export `metadata` from a `'use client'` component (was an error on marine-world). Server components only.
- **Shared Google Cloud billing** with Ranchie Taxi (see §9).
- **Power outages** — LJ sometimes works on a phone hotspot; keep steps resilient to dropped connections.

---

## 13. DEV WORKFLOW & STANDARDS (always apply)

- **One step at a time.** Never bundle commands, find-replaces, or tests. Wait for confirmation before step N+1.
- **Surgical edits only** — never rewrite whole files/blocks unless explicitly replacing that exact block.
- **Always provide `code path\to\file`** (PowerShell) before any find-and-replace, with exact find/replace text — never vague placement.
- **All `.ps1` scripts delivered as downloadable files** (never inline): timestamped backup, LF endings, UTF-8 no-BOM, post-write verification, rollback command. Run: `powershell -ExecutionPolicy Bypass -File "{full path}"`.
- **Request visual verification** (hard-refresh + confirm checklist) only when actually needed for debugging — not after every script.
- **Include direct URLs** when referencing external sites (Vercel, GoDaddy, etc.).
- **Proactively flag improvements/optimizations**; if a request makes the app worse, say why before proceeding.
- **No "why we did it" explanations during coding** unless asked.
- **Give summarized suggestions** — all probabilities + recommended fixes.
- **Ask clarifying questions** before detailed answers.
- **Keep each project in its own chat.**

### Common commands (Windows / PowerShell)
```powershell
# Navigate (confirmed base path — see §4)
cd C:\Users\ictcl\Projects\cell-world-web

# Dev (no turbopack)
npm run dev

# Clean a bad build
rmdir /s /q .next
npm run dev

# Production build
npm run build
npm run start

# Git workflow
git status
git add .
git commit -m "message"
git push origin main

# Safety backup before risky work
git branch backup-<description>
git push origin backup-<description>

# Verify an image is actually in the repo
git ls-files | findstr <name>
```

---

## 14. SISTER PROJECTS (separate chats — shared context)

- **Ranchie Taxi SVG** — ranchietaxisvg.com (`bytesizelj/ranchie-taxi-web`). Transport. Next.js + Firebase + FCM + Twilio SMS, multilingual, flight tracker, driver dashboard. **Shares Cell World's Google Cloud billing.**
- **Pirates Pub SVG** — piratespubsvg.com (`bytesizelj/pirates-pub-web`). Food & beverage. **On Railway with Cloudflare DNS** — the one project where Cloudflare is intentional. AI Menu Bot, kitchen display. Phone: 492-6481.
- **HighMark Business Systems** — highmark-business-systems.com. The studio site. Next.js on Vercel, GoDaddy direct DNS.

---

*End of handbook. Keep this living document current — re-export after significant sessions.*
