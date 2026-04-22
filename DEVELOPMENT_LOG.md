# Development log

Chronological build history, challenges, patterns, and next steps.

## Timeline

### Phase 1 — Initial single-file guide
- One large HTML file with embedded CSS, JS, and inline `machines` data.
- Card grid, expand/collapse, per-model promoter quiz, header filters.

### Phase 2 — Multi-file refactor
- Split into `styles.css`, `data.js`, `app.js`, slim `index.html`.

### Phase 3 — GitHub + static hosting
- Renamed entry to `index.html` for Netlify / GitHub Pages default document.

### Phase 4 — Mobile-first CSS
- Base styles for small screens; `@media (min-width: 640px)` for tablet, `1024px` for desktop.

### Phase 5 — iPhone safe areas
- `viewport-fit=cover` + `env(safe-area-inset-*)` on header, main, footer.

### Phase 6 — Card UX refinement
- Clicking an already-expanded card no longer toggles it closed.

### Phase 7 — Recommender ("Pomoz mi vybrat kávovar")
- 5 questions with weighted per-model scores. Winner + 2 runners-up.
- Cold Brew scoring: `scoreByColdImportant()` (+12 / -40). Tie-break: `MODEL_TIEBREAK_ORDER`.

### Phase 8 — Guess game ("Doporuč ten správný")
- Random customer profile, pick 1 of 4 machines. Tie-break, `escapeHtml`, `data-correct-model`.

### Phase 9 — Disable guess game, keep recommender
- Guess game HTML removed, JS wrapped in `/* */`.

### Phase 10 — Code optimization
Key changes:

**app.js:**
- `$()` / `$$()` helpers replace repeated `document.getElementById` / `querySelectorAll`
- `matchesFilter(m)` replaces duplicated filter conditionals
- `milkLabel(m)` and `featBadge()` extract repeated template logic
- `scrollTo(el)` centralizes the 50ms-delayed smooth scroll pattern
- **Event delegation:** Two `document.addEventListener('click')` handlers replace all inline `onclick` on cards, quiz buttons, and recommender actions. Cards use `data-action` / `data-model` attributes. Header filter buttons keep `onclick` (they pass `this`).
- `closeRecommender()` uses `style.display = ''` instead of `'block'` (respects CSS default)
- `refreshRecTask()` removed — `openRecommender()` used directly for restart
- Hardcoded `"z 5"` replaced with `recQuestions.length`

**styles.css:**
- CSS custom properties `--font`, `--font-display`, `--gold-border` eliminate repeated values
- Shared `button` base rule sets `font-family` and tap-highlight once
- `.card-top-right` class replaces inline `style="display:flex;gap:6px;align-items:center"`
- `.filter-btn` and `.mode-btn` merged into single ruleset
- ~115 lines of dead `.guess-*` CSS removed
- Duplicate hover/active rules consolidated

**index.html:**
- `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com`
- Removed unused `data-filter` attributes from header buttons
- Recommender close button uses `data-action="rec-close"` instead of `onclick`

## Challenges and solutions

| Challenge | Solution |
|-----------|----------|
| Monolithic file hard to maintain | Split into 4 files |
| Inline onclick strings fragile with model codes | Event delegation via `data-action` / `data-model` |
| Repeated DOM lookups | `$()` / `$$()` shorthand helpers |
| Repeated filter logic | `matchesFilter(m)` function |
| Repeated font-family declarations | CSS `--font` / `--font-display` variables |
| Dead CSS from disabled feature | Removed `.guess-*` rules (~115 lines saved) |
| Slow font loading | `preconnect` hints |
| Cold-important question giving wrong result | -40 penalty for non-cold machines |
| Score ties | `MODEL_TIEBREAK_ORDER` |

## Code patterns and conventions

- **Global `machines`** array from `data.js` — no modules, no imports.
- **Event delegation:** Cards, quiz, and recommender clicks handled via `data-action` attributes on two document-level listeners.
- **Template literals** for HTML generation.
- **State-driven re-render:** change `expandedModel` or `activeFilter`, then `renderGrid()`.
- **CSS custom properties** for all theme values in `:root`.
- **IDs:** `grid`, `quiz-section`, `quiz-questions`, `recommender`, `rec-body`, `rec-progress-bar`.
- **Czech UI copy.** Quiz answers may contain `<strong>` HTML.

## TODOs and next steps

- [ ] **Re-enable guess game** if product approves: uncomment JS, add HTML, restore `.guess-*` CSS from git.
- [ ] **Footer year** — currently hardcoded "2025".
- [ ] **Accessibility:** `aria-expanded` on cards, keyboard navigation for filters and quiz.
- [ ] **Content updates:** edit `data.js` when portfolio changes; update `recQuestions` scores.
- [ ] **Optional:** Service Worker for offline use on the shop floor.

## Gotchas

1. **Disabled JS block in `app.js`** uses `/* ... */`. No nested `/* */` inside — use `//` only.

2. **Model codes contain spaces and dots** (e.g. `"ECAM 22.112.B"`) — always access via `dataset.model`.

3. **No build step** — CI should not expect `npm run build`.

4. **Browser caching** — users may need hard refresh after deploy.

5. **`recQuestions` and `machines` must stay aligned** — every model must appear in every `scores` object and in `MODEL_TIEBREAK_ORDER`.

6. **Guess-game CSS was removed** — if re-enabling, restore `.guess-*` classes from git history (commit `1cda4ae` or earlier).

7. **Header filters still use inline `onclick`** — they pass `this` which event delegation can't easily replicate. This is intentional.

---

*Append dated entries below when shipping meaningful changes.*

### Template

```markdown
## YYYY-MM-DD — Short title
- What changed
- Files touched
- Breaking / migration notes
```
