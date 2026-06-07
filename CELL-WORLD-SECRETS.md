# CELL WORLD SVG — SECRETS (PRIVATE)
**⛔ DO NOT COMMIT TO GIT. DO NOT PASTE INTO PUBLIC CHATS, ISSUES, OR SCREENSHOTS.**

*Companion to `CELL-WORLD-HANDBOOK.md`. Store only in your local `Projects\` folder and the private Claude project. Last updated: June 2026.*

---

## HOW TO KEEP THIS OUT OF GIT

Add this line to `.gitignore` in the project root (`C:\Users\ictcl\Projects\cell-world-web\.gitignore`):

```
CELL-WORLD-SECRETS.md
```

If the file was ever committed before being ignored, also run once:
```powershell
git rm --cached CELL-WORLD-SECRETS.md
git commit -m "Remove secrets file from tracking"
git push origin main
```

> ⚠️ Note: removing from tracking does **not** erase it from past commit history. If any of these values were previously pushed to a **public** repo, treat them as compromised and rotate them (see "If exposed" below).

---

## SECRETS

| What | Value | Notes |
|---|---|---|
| **Valentine admin dashboard password** | `cellworld2026` | Gates the `/order` admin table + CSV export. **Weak — recommend rotating** (see below). Promo currently OFF (`PROMO_ACTIVE=false`). |
| **Google Maps API key** | `AIzaSyB6XxgZF7jeGL6uAv-_E33JWDWg9QsO3wU` | Client-side key — ships in the browser, so it is *visible* to anyone, but should be **restricted by HTTP referrer** in Google Cloud so only cellworldsvg.com can use it. |

---

## SHARED-BILLING WARNING

The Google Maps/Places key above bills to a **Google Cloud account shared with Ranchie Taxi**. A billing lapse or a key compromise (someone abusing the key, running up quota) breaks Maps/Places on **both** cellworldsvg.com **and** ranchietaxisvg.com. Watch quota/billing for both.

---

## SECURITY RECOMMENDATIONS (probabilities + fixes)

1. **Admin password is weak & hardcoded** *(high priority)* — `cellworld2026` is guessable and (likely) sits in source. Fix: move it to a Vercel environment variable (e.g. `ADMIN_PASSWORD`) and read it server-side; pick a stronger value. Even though the promo is off, the `/order` admin route may still be reachable.
2. **Maps key not referrer-locked** *(medium)* — if it isn't already restricted to `cellworldsvg.com/*` (and Ranchie's domain) in Google Cloud → Credentials, anyone can lift it from the page source and burn the shared quota. Fix: add HTTP-referrer restrictions + cap daily quota.
3. **If exposed** (key/password ever pushed public) *(act immediately)* — regenerate the Maps key in Google Cloud and update the env var; change the admin password. Rotating is cheap; a hijacked shared-billing key is not.

---

*Keep this file private. The main handbook references it but contains none of these values.*
