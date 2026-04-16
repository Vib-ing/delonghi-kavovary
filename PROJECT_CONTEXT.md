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

### What "disabled" means for the guess game

- The HTML for its trigger button and `#guess-game` panel was **removed** from `index.html` (no comment, just gone).
- The JS code is preserved inside a `/* ... */` block comment at the bottom of `app.js` (lines ~273–461).
- CSS classes for the guess game (`.guess-*`) remain in `styles.css` — harmless and ready if re-enabled.
- To re-enable: add the HTML panel back to `index.html`, uncomment the JS block, and verify no duplicate IDs.

## Key decisions and rationale

1. **Static HTML/CSS/JS (no framework, no build)**  
   Minimal hosting, fast loads, easy for non-developers to edit copy in `data.js`. Open `index.html` in a browser or use any static server.

2. **`index.html` as entry file**  
   Standard for GitHub Pages / Netlify default document.

3. **Split into 4 files:** `index.html`, `styles.css`, `data.js`, `app.js`  
   Separation of structure, presentation, data, and behavior. **Load order matters:** `data.js` must run before `app.js` because `app.js` references the global `machines` array.

4. **Card expand/collapse UX**  
   Clicking the same expanded card does **not** collapse it (prevents accidental closes on mobile). Only clicking a different card or the explicit "zavřít" button closes.

5. **Recommender scoring**  
   Each answer adds/subtracts per-model scores. Cold Brew question uses `scoreByColdImportant()` which gives +12 to cold-capable machines and -40 to others — prevents absurd recommendations. Tie-break uses `MODEL_TIEBREAK_ORDER` (premium models win ties).

6. **Guess game disabled, recommender kept**  
   With only 8 machines the guess game felt redundant. The recommender is useful as a training tool. Decision can be reversed since the code is preserved.

## Problems solved (historical)

| Problem | Solution |
|---------|----------|
| Monolithic single file | Split into CSS / data / app JS |
| Cards hard to use on mobile | Mobile-first CSS, larger touch targets, full-width buttons on small screens |
| Dynamic Island / notch overlapping UI | `viewport-fit=cover` + `env(safe-area-inset-*)` on header, main, footer |
| Cold-drink question giving wrong recommendation | `scoreByColdImportant()` with strong -40 penalty for non-cold machines |
| Score ties producing random winners | Fixed `MODEL_TIEBREAK_ORDER` array |
| `/* */` comment breaking mid-file | Inner section headers use `//` only, no nested `/* */` |

## Tech stack and dependencies

| Layer | Choice |
|-------|--------|
| Markup | HTML5 (`lang="cs"`) |
| Styling | Plain CSS, custom properties, mobile-first + `min-width` breakpoints |
| Fonts | Google Fonts: Playfair Display + DM Sans (external stylesheet) |
| Logic | Vanilla JS, no npm packages, no modules |
| Data | Single global `const machines = [...]` in `data.js` |

**Runtime:** Any modern browser. No `package.json`, no transpilation, no Node required.

## File structure

```
delonghi_kavovary/
├── index.html          # Page shell: header, hero, recommender trigger + panel, grid mount, quiz section
├── styles.css          # All visuals: dark theme, cards, recommender, guess-game (CSS kept), responsive
├── data.js             # 8 machine objects with nested quiz Q&A
├── app.js              # UI logic: cards, filters, quiz, recommender (active), guess game (commented)
├── PROJECT_CONTEXT.md  # This file
├── README.md           # Setup & usage
├── CODE_GUIDE.md       # Function map & file connections
└── DEVELOPMENT_LOG.md  # Build history, TODOs, gotchas
```
