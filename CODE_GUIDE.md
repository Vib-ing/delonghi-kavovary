# Code guide

How the files connect, what each function does, and where to find things.

## Architecture

```
Browser loads index.html
  ├── styles.css       (all visuals)
  ├── data.js          (defines global `machines` array)
  └── app.js           (reads `machines`, renders UI, calls renderGrid() at end)
```

**Load order matters:** `data.js` creates the global `machines` array; `app.js` consumes it immediately. Swapping the script tags breaks everything.

---

## index.html (60 lines)

| Section | Lines | Purpose |
|---------|-------|---------|
| `<header>` | 12–20 | Logo + 4 filter buttons (`filterCards(...)`) |
| `.hero` | 23–26 | Title + intro paragraph |
| `.game-triggers` | 28–30 | "Pomoz mi vybrat kávovar" button |
| `#recommender` | 32–42 | Recommender panel (hidden by default, shown via `.visible` class) |
| `#grid` | 44 | Empty div — filled by `renderGrid()` in JS |
| `#quiz-section` | 46–51 | Per-model quiz panel (hidden, shown via `.visible`) |
| `<footer>` | 54 | Static footer |
| Scripts | 56–57 | `data.js` then `app.js` — **order matters** |

**Viewport:** `viewport-fit=cover` enables safe-area environment variables for notched phones.

---

## styles.css (783 lines)

| Block | What it styles |
|-------|---------------|
| `:root` | Dark theme: `--bg`, `--card`, `--gold`, `--green`, `--red`, radii |
| Header | Sticky, blurred backdrop, stacked on mobile → row on tablet |
| Cards | `.card`, `.detail`, `.expanded`, gold top-line on hover |
| Quiz | `.q-card`, `.reveal-btn`, `.answer` (green left border on reveal) |
| Recommender | `.recommender`, `.rec-option`, `.rec-result`, progress bar |
| Guess game | `.guess-*` classes — still in CSS, no-op while HTML is absent |
| Responsive | `@media (min-width: 640px)` tablet, `@media (min-width: 1024px)` desktop |
| Safe areas | `env(safe-area-inset-*)` on header, main, footer |

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

**To add a machine:** append an object with the same shape. Ensure `model` is unique. If a new `type` value appears, update filter logic in `app.js` and add a filter button in `index.html`. Also add the model to `recQuestions` scores and `MODEL_TIEBREAK_ORDER`.

---

## app.js — active code (lines 1–271)

### State variables

| Variable | Type | Purpose |
|----------|------|---------|
| `expandedModel` | `string \| null` | Currently expanded card's model code |
| `activeFilter` | string | `'all'`, `'automatický'`, `'pákový'`, or `'cold'` |
| `recStep` | number | Current question index in recommender (0–4) |
| `recScores` | `{[model]: number}` | Accumulated scores during recommender |

### Card & grid functions

| Function | Line | What it does |
|----------|------|-------------|
| `renderCard(m)` | 4 | Returns HTML string for one card including hidden `.detail` |
| `renderGrid()` | 62 | Sets `#grid.innerHTML` from `machines.map(renderCard)` |
| `toggleCard(model)` | 66 | Expands card; ignores click if already expanded (no toggle-off) |
| `closeCard()` | 76 | Clears `expandedModel`, re-renders |
| `filterCards(filter, btn)` | 81 | Sets `activeFilter`, resets expansion, re-renders |

### Quiz functions

| Function | Line | What it does |
|----------|------|-------------|
| `openQuiz(model)` | 89 | Fills `#quiz-section` with 5 Q&A cards, scrolls into view |
| `reveal(i)` | 109 | Shows answer `i`, hides its reveal button |
| `closeQuiz()` | 114 | Hides quiz, scrolls to top |

### Recommender functions

| Function | Line | What it does |
|----------|------|-------------|
| `scoreByColdImportant()` | 121 | Returns scores: +12 if `m.cold`, -40 otherwise |
| `recQuestions` | 127 | Array of 5 questions, each with 3 options and per-model scores |
| `MODEL_TIEBREAK_ORDER` | 173 | Fixed priority list for tie-breaking (premium first) |
| `sortedModelsByScore(totals)` | 184 | Sorts models by score descending, tiebreak by array position |
| `openRecommender()` | 191 | Resets state, shows panel, hides trigger button |
| `closeRecommender()` | 201 | Hides panel, restores trigger button |
| `refreshRecTask()` | 206 | Restarts the current recommender flow |
| `renderRecStep()` | 210 | Renders current question or calls `showRecResult()` when done |
| `pickRecOption(step, optIdx)` | 232 | Adds scores for chosen option, advances step |
| `showRecResult()` | 241 | Shows best match + 2 runners-up with action buttons |

### Boot

Line 463: `renderGrid();` — called once at load, renders the initial card grid.

---

## app.js — disabled code (lines 273–461)

Wrapped in `/* ... */`. Contains the "Doporuč ten správný" guess game:

- `shuffle`, `escapeHtml`, `scoreTotalsFromPicks`, `pickWinningModel`
- `generateScenario`, `generateUniqueScenario`
- `openGuessGame`, `closeGuessGame`, `refreshCurrentGuessRound`
- `renderGuessRound`, `checkGuessFromBtn`, `checkGuess`, `showGuessResult`
- `customerLabels`, `GUESS_ROUNDS`

**To re-enable:** uncomment the JS block, add the guess-game HTML back to `index.html` (trigger button with class `.guess-trigger` + `#guess-game` panel — see git history), verify no ID collisions.

---

## Data flow diagram

```
User loads page
  → data.js defines machines[]
  → app.js renderGrid() fills #grid with 8 cards

User clicks filter button
  → filterCards() updates activeFilter → renderGrid() hides/shows cards

User clicks a card
  → toggleCard() sets expandedModel → renderGrid() (one card gets .expanded)

User clicks "Procvič si"
  → openQuiz() fills #quiz-section, adds .visible class

User clicks "Pomoz mi vybrat kávovar"
  → openRecommender() shows #recommender, renders first question
  → pickRecOption() accumulates scores, advances recStep
  → after 5 answers → showRecResult() displays winner + runners-up
  → "Zobrazit [name]" → closeRecommender() + toggleCard(winner)
```

---

## Where to change what

| Task | File(s) |
|------|---------|
| Machine text, quizzes, specs | `data.js` |
| Colors, spacing, breakpoints | `styles.css` (`:root` vars) |
| Card behavior, quiz wiring | `app.js` (lines 1–117) |
| Recommender questions/weights | `app.js` (`recQuestions`, ~line 127) |
| Page structure, meta, script order | `index.html` |
| Re-enable guess game | `app.js` (uncomment block) + `index.html` (add HTML) |

---

## Security notes

All quiz, promo, and recommender text is **trusted internal content** rendered via `innerHTML`. If user-sourced input is ever introduced, use `escapeHtml()` (pattern exists in the disabled guess-game code) before inserting into the DOM.
