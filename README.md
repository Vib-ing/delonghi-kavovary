# De'Longhi — Průvodce kávovary pro promotéry

Czech static web guide for **De'Longhi promoters and sales staff**: overview of **8 models**, expandable details, sales arguments, training quizzes, and a scored recommender.

## What it does

- **Header filters:** Vše / Automaty / Pákové / Cold Brew
- **Card grid:** name, model code, segment, tags, spec pills
- **Expand a card:** full highlights, technical specs, feature badges (Cold Brew, milk system, grinder), sales argument box, quiz button
- **Per-model quiz:** 5 questions with "reveal answer" — for memorization practice
- **"Pomoz mi vybrat kávovar"** recommender: 5 questions about a customer's needs, weighted scoring across all 8 machines, shows best match + 2 runners-up with a link to open the winner's card
- **Responsive:** mobile-first layout with safe-area insets for notched iPhones

## How to run

### Option A — open the file

1. Clone or download the repo.
2. Double-click `index.html` or drag it into a browser.

> External fonts may not load over `file://` in some browsers. Use option B for the full experience.

### Option B — local server (recommended)

```powershell
cd "path\to\delonghi_kavovary"
npx --yes serve .
```

Or any static server (`python -m http.server 8080`, VS Code Live Server, etc.).  
Open the printed URL (e.g. `http://localhost:3000`).

## Deployment

- **GitHub → Netlify** (or GitHub Pages): repo root contains `index.html`, no build command, publish directory `.`
- After `git push` a new deploy triggers automatically.
- Test the deployed URL on mobile (not just `file://`).

## Key features

| Feature | Where in UI | Powered by |
|---------|------------|------------|
| Category filter | Header buttons | `filterCards()` + `activeFilter` |
| Card expand | Click a card | Event delegation → `toggleCard()` |
| Close detail | "zavřít ✕" button | `data-action="close"` → `closeCard()` |
| Model quiz | "Procvič si …" button | `data-action="quiz"` → `openQuiz()` |
| Recommender | "Pomoz mi vybrat kávovar" button | `recQuestions` → `openRecommender()` |
| Back from quiz | "Zpět na přehled" button | `closeQuiz()` |

## Editing content

- **Machine text, quizzes, specs** — edit `data.js`. Each machine has a unique `model` string used as DOM ID (`data-model`). Keep 5 items in `quiz[]`.
- **Recommender questions/scores** — edit `recQuestions` in `app.js`. Each option has a `scores` object keyed by model code.
- **Styles** — `styles.css`. Dark theme colors live in `:root` custom properties.
- **Behavior / new features** — `app.js`.

## Configuration

- No `.env` files, no API keys, no build config.
- Optional: custom domain via Netlify / DNS — managed outside this repo.

## License / usage

Footer says "Pouze pro interní použití" — internal use only. Respect De'Longhi brand guidelines.

## Other docs

| File | Contents |
|------|----------|
| [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) | Goals, decisions, current state |
| [CODE_GUIDE.md](./CODE_GUIDE.md) | File map, function reference, data flow |
| [DEVELOPMENT_LOG.md](./DEVELOPMENT_LOG.md) | Build history, TODOs, gotchas |
