# Development log

Chronological build history, challenges, patterns, and next steps.

## Timeline

### Phase 1 — Initial single-file guide
- One large HTML file with embedded CSS, JS, and inline `machines` data.
- Card grid, expand/collapse, per-model promoter quiz, header filters.

### Phase 2 — Multi-file refactor
- Split into `styles.css`, `data.js`, `app.js`, slim `index.html`.
- Easier diffs and maintenance.

### Phase 3 — GitHub + static hosting
- Renamed entry to `index.html` for Netlify / GitHub Pages default document.
- Push-to-deploy workflow.

### Phase 4 — Mobile-first CSS
- Base styles for small screens; `@media (min-width: 640px)` for tablet, `1024px` for desktop.
- Stacked header on mobile, horizontal filter chip scroll, full-width quiz buttons.

### Phase 5 — iPhone safe areas
- Added `viewport-fit=cover` to meta tag.
- `env(safe-area-inset-*)` padding on header, main, footer.

### Phase 6 — Card UX refinement
- Clicking an already-expanded card no longer toggles it closed.
- Only clicking a different card or "zavřít" closes the current one.

### Phase 7 — Recommender ("Pomoz mi vybrat kávovar")
- 5 questions with weighted per-model scores.
- Result shows winner + 2 runners-up with feature badges and action buttons.
- Cold Brew scoring: `scoreByColdImportant()` gives +12 to cold machines, -40 to others.
- Tie-break: `MODEL_TIEBREAK_ORDER` array (premium models win).

### Phase 8 — Guess game ("Doporuč ten správný")
- Random "customer profile" from same 5 questions; pick 1 of 4 machines.
- Fixes applied: tie-break list, `escapeHtml`, `data-correct-model` on container instead of fragile `onclick` strings.
- "Znovu" button refreshes current round only.

### Phase 9 — Disable guess game, keep recommender
- Product decision: guess game not needed with only 8 machines.
- Guess game HTML removed from `index.html`, JS wrapped in `/* */` in `app.js`.
- Recommender remains fully active.
- Shared utilities (`MODEL_TIEBREAK_ORDER`, `sortedModelsByScore`) moved to active code since the recommender uses them.

## Challenges and solutions

| Challenge | Solution |
|-----------|----------|
| Monolithic file hard to maintain | Split into 4 files |
| Cards awkward on mobile | Mobile-first CSS, larger touch targets, full-width buttons on small screens |
| Dynamic Island overlapping header | `viewport-fit=cover` + safe-area padding |
| Cold-important question recommending wrong machine | Strong -40 penalty for non-cold machines in `scoreByColdImportant()` |
| Score ties producing random winners | `MODEL_TIEBREAK_ORDER` gives deterministic premium-first ordering |
| `/* */` comment breaking mid-file | No nested `/* */` inside the disabled block; use `//` for section headers |
| Model codes with spaces in HTML attributes | Always use `data-model` + `dataset`, not raw string concatenation |

## Code patterns and conventions

- **Global `machines`** array from `data.js` — no modules, no imports.
- **Template literals** for HTML generation (`renderCard`, `renderRecStep`, etc.).
- **State-driven re-render:** change `expandedModel` or `activeFilter`, then call `renderGrid()` to rebuild the entire grid.
- **IDs:** `grid`, `quiz-section`, `quiz-questions`, `recommender`, `rec-body`, `rec-progress-bar`. Avoid duplicates.
- **Czech UI copy** throughout. Quiz answers may contain `<strong>` HTML tags.
- **onclick handlers** on HTML strings — standard for this no-framework approach. Use `event.stopPropagation()` on buttons inside clickable cards.

## TODOs and next steps

- [ ] **Re-enable guess game** if product approves: add HTML back to `index.html` + uncomment JS block in `app.js`.
- [ ] **Footer year** — currently hardcoded "2025"; verify against current year.
- [ ] **Accessibility:** add `aria-expanded` on cards, keyboard navigation for filters and quiz.
- [ ] **Content updates:** edit `data.js` when the machine portfolio changes. Update `recQuestions` scores in `app.js` if models are added/removed.
- [ ] **Optional:** Service Worker for offline use on the shop floor (out of scope unless requested).
- [ ] **Optional:** `lang` attribute audit — some UI text uses shorthand that could benefit from `hreflang` if multi-language is ever needed.

## Gotchas

1. **Disabled JS block in `app.js`**  
   Lines ~273–461 are inside `/* ... */`. Do not put `/* */` comments inside this block — use `//` only. The first `*/` ends the entire comment.

2. **Model codes contain spaces and dots**  
   e.g. `"ECAM 22.112.B"` — always access via `dataset.model` or quote properly. Never build `onclick="fn('ECAM 22.112.B')"` with unescaped dots in fragile contexts.

3. **No build step**  
   CI/CD should not expect `npm run build`. Deploy static files directly.

4. **Browser caching after deploy**  
   Users may need a hard refresh to pick up new `app.js` / `data.js`. Consider adding cache-busting query params if this becomes an issue.

5. **`recQuestions` and `machines` must stay aligned**  
   Every model's `model` string must appear in every `scores` object in `recQuestions`. Adding or removing a machine requires updating all score tables **and** `MODEL_TIEBREAK_ORDER`.

6. **CSS for guess game is still present**  
   `.guess-*` classes exist in `styles.css` even though the game HTML is removed. They're harmless and ready for re-enable.

---

*Append dated entries below when shipping meaningful changes.*

### Template

```markdown
## YYYY-MM-DD — Short title
- What changed
- Files touched
- Breaking / migration notes
```
