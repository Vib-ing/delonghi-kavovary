# Project context — De'Longhi promoter guide

Everything a new AI agent needs to understand and continue this project.

## Project overview and goals

**What:** A static, Czech-language web guide for De'Longhi field promoters and sales staff.  
It presents **8 coffee machine models** from a fixed portfolio with:

- Filterable card grid (All / Automaty / Pákové / Cold Brew)
- Expandable detail per machine: highlights, technical specs, feature badges, sales pitch
- Per-model **training quiz** (5 Q&A with reveal-on-click answers)
- **"Pomoz mi vybrat kávovar"** recommender — 5 weighted questions, shows best match + 2 runners-up

**Primary goal:** One place to learn and rehearse product knowledge on a phone or laptop during prep or on the shop floor.

**Non-goals:** Not an e-commerce site, not a customer-facing configurator. Content is curated for these 8 SKUs only.

## Current project state

| Feature | Status |
|---------|--------|
| Card grid + 4 filters | **Active** |
| Per-model detail panel + promoter quiz | **Active** |
| "Pomoz mi vybrat kávovar" recommender (5-question scoring) | **Active** |
| Mobile-first responsive layout + safe-area insets | **Active** |
| "Doporuč ten správný" guess-the-model game | **Disabled** — JS in `/* */` block in `app.js`, no HTML in DOM |
| Code optimizations (event delegation, CSS cleanup) | **Done** |

### What "disabled" means for the guess game

- The HTML for its trigger button and `#guess-game` panel was removed from `index.html`.
- The JS code is preserved inside a `/* ... */` block comment at the bottom of `app.js`.
- CSS classes for the guess game were **removed** in the optimization pass.
- To re-enable: add HTML panel back to `index.html`, uncomment JS block, restore `.guess-*` CSS classes from git history.

## Key decisions and rationale

1. **Static HTML/CSS/JS (no framework, no build)**  
   Minimal hosting, fast loads, easy for non-developers to edit copy in `data.js`. Open `index.html` in a browser or use any static server.

2. **`index.html` as entry file**  
   Standard for GitHub Pages / Netlify default document.

3. **Split into 4 files:** `index.html`, `styles.css`, `data.js`, `app.js`  
   Separation of structure, presentation, data, and behavior. **Load order matters:** `data.js` must run before `app.js` because `app.js` references the global `machines` array.

4. **Event delegation instead of inline onclick**  
   Cards, quiz reveal buttons, and recommender actions all use `data-action` attributes handled by two delegated `click` listeners on `document`. Removes string-interpolated `onclick` handlers. Header filters still use `onclick` because they pass `this`.

5. **Card expand/collapse UX**  
   Clicking the same expanded card does **not** collapse it (prevents accidental closes on mobile). Only clicking a different card or the explicit "zavřít" button closes.

6. **Recommender scoring**  
   Each answer adds/subtracts per-model scores. Cold Brew question uses `scoreByColdImportant()` which gives +12 to cold-capable machines and -40 to others. Tie-break uses `MODEL_TIEBREAK_ORDER` (premium models win ties).

7. **CSS custom properties for theming**  
   Colors, fonts, and radii in `:root`. `--font` and `--font-display` variables eliminate repeated `font-family` declarations.

## Problems solved (historical)

| Problem | Solution |
|---------|----------|
| Monolithic single file | Split into CSS / data / app JS |
| Cards hard to use on mobile | Mobile-first CSS, larger touch targets, full-width buttons on small screens |
| Dynamic Island / notch overlapping UI | `viewport-fit=cover` + `env(safe-area-inset-*)` on header, main, footer |
| Cold-drink question giving wrong recommendation | `scoreByColdImportant()` with strong -40 penalty for non-cold machines |
| Score ties producing random winners | Fixed `MODEL_TIEBREAK_ORDER` array |
| Inline onclick strings fragile with model codes | Event delegation via `data-action` / `data-model` attributes |
| Repeated font-family declarations | CSS custom properties `--font` and `--font-display` |
| Dead CSS bloat from disabled guess game | Removed ~115 lines of `.guess-*` rules |
| Slow Google Fonts load | Added `preconnect` hints in `<head>` |

## Tech stack and dependencies

| Layer | Choice |
|-------|--------|
| Markup | HTML5 (`lang="cs"`) |
| Styling | Plain CSS, custom properties, mobile-first + `min-width` breakpoints |
| Fonts | Google Fonts: Playfair Display + DM Sans (with `preconnect`) |
| Logic | Vanilla JS, no npm packages, no modules |
| Data | Single global `const machines = [...]` in `data.js` |

**Runtime:** Any modern browser. No `package.json`, no transpilation, no Node required.

## File structure

```
delonghi_kavovary/
├── index.html          # Page shell: header, hero, recommender, grid mount, quiz section
├── styles.css          # Dark theme, cards, recommender, responsive (no guess-game CSS)
├── data.js             # 8 machine objects with nested quiz Q&A
├── app.js              # UI logic with event delegation; guess game commented at bottom
├── PROJECT_CONTEXT.md  # This file
├── README.md           # Setup & usage
├── CODE_GUIDE.md       # Function map & file connections
└── DEVELOPMENT_LOG.md  # Build history, TODOs, gotchas
```
