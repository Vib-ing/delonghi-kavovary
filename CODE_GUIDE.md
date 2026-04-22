# Code guide

How the files connect, what each function does, and where to find things.

## Architecture

```
Browser loads index.html
  ├── styles.css       (all visuals, CSS variables for theming)
  ├── data.js          (defines global `machines` array)
  └── app.js           (reads `machines`, event delegation, calls renderGrid() at end)
```

**Load order matters:** `data.js` creates the global `machines` array; `app.js` consumes it immediately. Swapping the script tags breaks everything.

---

## index.html (62 lines)

| Section | Purpose |
|---------|---------|
| `<head>` | Meta, `preconnect` for Google Fonts, stylesheet |
| `<header>` | Logo + 4 filter buttons (`filterCards(...)` — only remaining inline `onclick`) |
| `.hero` | Title + intro paragraph |
| `.game-triggers` | "Pomoz mi vybrat kávovar" button |
| `#recommender` | Recommender panel (hidden by default, shown via `.visible` class) |
| `#grid` | Empty div — filled by `renderGrid()` in JS |
| `#quiz-section` | Per-model quiz panel (hidden, shown via `.visible`) |
| `<footer>` | Static footer |
| Scripts | `data.js` then `app.js` — **order matters** |

**Viewport:** `viewport-fit=cover` enables safe-area environment variables for notched phones.

---

## styles.css (~540 lines)

| Block | What it styles |
|-------|---------------|
| `:root` | Dark theme vars: colors, fonts (`--font`, `--font-display`), radii, gold-border |
| `button` | Shared base: `font-family`, tap-highlight reset |
| Header | Sticky, blurred backdrop, stacked on mobile → row on tablet |
| Cards | `.card`, `.card-top-right`, `.detail`, `.expanded`, gold top-line on hover |
| Quiz | `.q-card`, `.reveal-btn`, `.answer` (green left border on reveal) |
| Recommender | `.recommender`, `.rec-option`, `.rec-result`, progress bar |
| Responsive | `@media (min-width: 640px)` tablet, `@media (min-width: 1024px)` desktop |
| Safe areas | `env(safe-area-inset-*)` on header, main, footer |

**Note:** Guess-game CSS (`.guess-*`) was removed. Restore from git history if re-enabling.

---

## data.js (222 lines)

Single global:

```js
const machines = [ /* 8 objects */ ];
```

Each machine object:

| Field | Type | Used for |
|-------|------|----------|
| `name` | string | Display name ("Eletta Ultra") |
| `model` | string | Unique ID, `data-model`, scoring keys ("ECAM 470.85.MB") |
| `type` | `"automatický"` or `"pákový"` | Badge, filter logic |
| `tier` | string | Subtitle ("Premium vlajková loď") |
| `tags` | string[] | Chip row on card face |
| `specs` | string[] | First 3 shown as spec pills |
| `highlights` | string[] | Detail column "Co umí" |
| `specs_detail` | string[] | Detail column "Technické parametry" |
| `promo` | string | Gold sales-argument box |
| `cold` | boolean | Cold Brew badge + filter + scoring |
| `milk` | boolean | Has any milk system |
| `milkAuto` | boolean | Has automatic LatteCrema |
| `quiz` | `{q, a}[]` | 5 Q&A; `a` may contain `<strong>` HTML |

**To add a machine:** append an object with the same shape. Ensure `model` is unique. Update `recQuestions` scores and `MODEL_TIEBREAK_ORDER` in `app.js`.

---

## app.js — active code

### Utilities

| Function/const | Purpose |
|----------------|---------|
| `$(id)` | Shorthand for `document.getElementById(id)` |
| `$$(sel)` | Shorthand for `document.querySelectorAll(sel)` |
| `matchesFilter(m)` | Returns true if machine `m` passes `activeFilter` |
| `milkLabel(m)` | Returns appropriate milk badge text |
| `featBadge(ok, yes, no)` | Returns feature badge HTML span |
| `scrollTo(el)` | Smooth-scrolls to element after 50ms delay |

### State variables

| Variable | Type | Purpose |
|----------|------|---------|
| `expandedModel` | `string \| null` | Currently expanded card's model code |
| `activeFilter` | string | `'all'`, `'automatický'`, `'pákový'`, or `'cold'` |
| `recStep` | number | Current question index in recommender (0–4) |
| `recScores` | `{[model]: number}` | Accumulated scores during recommender |

### Card & grid functions

| Function | What it does |
|----------|-------------|
| `renderCard(m)` | Returns HTML string for one card (uses `data-action` attributes, no inline onclick) |
| `renderGrid()` | Sets `$('grid').innerHTML` from `machines.map(renderCard)` |
| `toggleCard(model)` | Expands card; ignores click if already expanded |
| `closeCard()` | Clears `expandedModel`, re-renders |
| `filterCards(filter, btn)` | Sets `activeFilter`, resets expansion, re-renders |

### Quiz functions

| Function | What it does |
|----------|-------------|
| `openQuiz(model)` | Fills `#quiz-section` with 5 Q&A cards |
| `reveal(i)` | Shows answer `i`, hides its reveal button |
| `closeQuiz()` | Hides quiz, scrolls to top |

### Recommender functions

| Function | What it does |
|----------|-------------|
| `scoreByColdImportant()` | Returns scores: +12 if `m.cold`, -40 otherwise |
| `recQuestions` | Array of 5 questions with per-model scores |
| `MODEL_TIEBREAK_ORDER` | Fixed priority for tie-breaking (premium first) |
| `sortedModelsByScore(totals)` | Sorts models by score descending, tiebreak by array position |
| `openRecommender()` | Resets state, shows panel, hides trigger button |
| `closeRecommender()` | Hides panel, restores trigger button |
| `renderRecStep()` | Renders current question or shows result when done |
| `pickRecOption(step, optIdx)` | Adds scores for chosen option, advances step |
| `showRecResult()` | Shows best match + 2 runners-up with action buttons |

### Event delegation

Two `document.addEventListener('click', ...)` handlers at module level:

1. **Card/quiz handler:** Dispatches on `data-action` values: `close`, `quiz`, `reveal`. Falls through to `.card[data-model]` click for card expansion.
2. **Recommender handler:** Dispatches on `data-action` values: `rec-pick`, `rec-restart`, `rec-close`, `rec-show`.

### Boot

Last line: `renderGrid();` — called once at load.

---

## app.js — disabled code (bottom of file)

Wrapped in `/* ... */`. Contains the "Doporuč ten správný" guess game. Uses `//` for section headers inside the block (no nested `/* */`).

**To re-enable:** uncomment JS block, add guess-game HTML back to `index.html`, restore `.guess-*` CSS from git history.

---

## Data flow diagram

```
User loads page
  → data.js defines machines[]
  → app.js renderGrid() fills #grid with 8 cards

User clicks filter button
  → filterCards() updates activeFilter → renderGrid()

User clicks a card
  → event delegation → toggleCard() → renderGrid() with one .expanded

User clicks "Procvič si"
  → data-action="quiz" → openQuiz() fills #quiz-section

User clicks "Pomoz mi vybrat kávovar"
  → openRecommender() → renderRecStep() loop
  → data-action="rec-pick" → pickRecOption() accumulates scores
  → after 5 answers → showRecResult()
  → data-action="rec-show" → closeRecommender() + toggleCard(winner)
```

---

## Where to change what

| Task | File(s) |
|------|---------|
| Machine text, quizzes, specs | `data.js` |
| Colors, spacing, breakpoints | `styles.css` (`:root` vars) |
| Card behavior, quiz wiring | `app.js` (top section) |
| Recommender questions/weights | `app.js` (`recQuestions`) |
| Page structure, meta, script order | `index.html` |
| Re-enable guess game | `app.js` (uncomment) + `index.html` (add HTML) + `styles.css` (restore `.guess-*` from git) |
