let expandedModel = null;
let activeFilter = 'all';

const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

function matchesFilter(m) {
  if (activeFilter === 'all') return true;
  if (activeFilter === 'cold') return m.cold;
  return m.type === activeFilter;
}

function milkLabel(m) {
  if (m.milkAuto) return '\u2713 Auto LatteCrema';
  if (m.type === 'pákový') return '~ Ruční My Latte Art';
  return '~ Ruční parní tryska';
}

function featBadge(ok, yes, no) {
  return `<span class="feat ${ok ? 'feat-yes' : 'feat-no'}">${ok ? yes : no}</span>`;
}

function renderCard(m) {
  const isExpanded = expandedModel === m.model;
  const badgeClass = m.type === 'automatický' ? 'auto' : 'manual';

  return `
    <div class="card${isExpanded ? ' expanded' : ''}"
         data-model="${m.model}"
         style="${matchesFilter(m) ? '' : 'display:none'}">
      <div class="card-top">
        <div>
          <div class="card-name">${m.name}</div>
          <div class="card-model">${m.model}</div>
          <div class="card-tier">${m.tier}</div>
        </div>
        <div class="card-top-right">
          <span class="badge badge-${badgeClass}">${m.type}</span>
          <span class="chevron">\u25BC</span>
        </div>
      </div>
      <div class="tag-row">${m.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="specs-row">${m.specs.slice(0, 3).map(s => `<span class="spec-pill">${s}</span>`).join('')}</div>
      <div class="detail">
        <div class="detail-header">
          <h3>Klíčové informace pro promotéra</h3>
          <button class="close-btn" data-action="close">zavřít \u2715</button>
        </div>
        <div class="detail-cols">
          <div class="detail-section">
            <h4>Co umí &amp; klíčové vlastnosti</h4>
            <ul>${m.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
          </div>
          <div class="detail-section">
            <h4>Technické parametry</h4>
            <ul>${m.specs_detail.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="feature-badges">
          ${featBadge(m.cold, '\u2713 Cold Brew', '\u2717 Cold Brew')}
          ${featBadge(m.milkAuto, milkLabel(m), milkLabel(m))}
          ${featBadge(m.type === 'automatický', '\u2713 Integrovaný mlýnek', '\u2717 Mlýnek nutno dokoupit')}
        </div>
        <div class="promo-box"><strong>Prodejní argument:</strong> ${m.promo}</div>
        <button class="quiz-btn" data-action="quiz" data-model="${m.model}">Procvič si ${m.name} \u2192</button>
      </div>
    </div>`;
}

function renderGrid() {
  $('grid').innerHTML = machines.map(renderCard).join('');
}

function scrollTo(el) {
  setTimeout(() => el && el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function toggleCard(model) {
  if (expandedModel === model) return;
  expandedModel = model;
  renderGrid();
  scrollTo(document.querySelector(`[data-model="${model}"]`));
}

function closeCard() {
  expandedModel = null;
  renderGrid();
}

function filterCards(filter, btn) {
  $$('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = filter;
  expandedModel = null;
  renderGrid();
}

function openQuiz(model) {
  const m = machines.find(x => x.model === model);
  $('quiz-title').textContent = `Kvíz: ${m.name}`;
  $('quiz-subtitle').textContent =
    `${m.model} \u00B7 5 otázek pro promotéra \u00B7 Zobraz odpověď až po vlastním přemýšlení`;

  $('quiz-questions').innerHTML = m.quiz.map((q, i) => `
    <div class="q-card">
      <div class="q-num">Otázka ${i + 1}</div>
      <div class="q-text">${q.q}</div>
      <button class="reveal-btn" data-action="reveal" data-idx="${i}">Zobrazit odpověď</button>
      <div class="answer" id="ans-${i}">${q.a}</div>
    </div>
  `).join('');

  const section = $('quiz-section');
  section.classList.add('visible');
  scrollTo(section);
}

function reveal(i) {
  $('ans-' + i).classList.add('visible');
  const btn = document.querySelector(`[data-action="reveal"][data-idx="${i}"]`);
  if (btn) btn.style.display = 'none';
}

function closeQuiz() {
  $('quiz-section').classList.remove('visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event delegation for #grid and #quiz-section
document.addEventListener('click', e => {
  const action = e.target.dataset.action;

  if (action === 'close') {
    e.stopPropagation();
    closeCard();
    return;
  }

  if (action === 'quiz') {
    e.stopPropagation();
    openQuiz(e.target.dataset.model);
    return;
  }

  if (action === 'reveal') {
    reveal(e.target.dataset.idx);
    return;
  }

  const card = e.target.closest('.card[data-model]');
  if (card && $('grid').contains(card)) {
    toggleCard(card.dataset.model);
  }
});

// -- Recommender: Pomoz mi vybrat kavovar ------------------------------------

function scoreByColdImportant() {
  const s = {};
  machines.forEach(m => { s[m.model] = m.cold ? 12 : -40; });
  return s;
}

const recQuestions = [
  {
    q: "Jak si zákazník představuje přípravu kávy?",
    options: [
      { text: "Jedním dotykem, plně automaticky", scores: { "ECAM 470.85.MB": 3, "ECAM 310.80.SB": 3, "ECAM 320.70.TB": 3, "ECAM 22.112.B": 2, "ECAM 220.21.BG": 2, "ECAM 630.75.TSM": 3, "EXAM 440.55.G": 3, "EC 890.M": -3 }},
      { text: "Baristický přístup – ruční příprava, kontrola nad výsledkem", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 1, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 0, "EC 890.M": 5 }},
      { text: "Hlavně jednoduše, bez zbytečných komplikací", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 2, "ECAM 320.70.TB": 1, "ECAM 22.112.B": 2, "ECAM 220.21.BG": 3, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 0, "EC 890.M": 1 }}
    ]
  },
  {
    q: "Jak důležité jsou mléčné nápoje (cappuccino, latte)?",
    options: [
      { text: "Nepiji – stačí espresso, lungo", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 3, "ECAM 220.21.BG": 3, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 0, "EC 890.M": 2 }},
      { text: "Občas ano, nevadí mi ruční napěnění", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 4, "ECAM 220.21.BG": 1, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 0, "EC 890.M": 3 }},
      { text: "Piji často, chci automatické napěnění jedním dotykem", scores: { "ECAM 470.85.MB": 5, "ECAM 310.80.SB": 5, "ECAM 320.70.TB": 5, "ECAM 22.112.B": -3, "ECAM 220.21.BG": -3, "ECAM 630.75.TSM": 5, "EXAM 440.55.G": 5, "EC 890.M": -3 }}
    ]
  },
  {
    q: "Má zákazník zájem o studené kávové nápoje (Cold Brew, ledové latte)?",
    options: [
      { text: "Ano, to je důležité", scores: scoreByColdImportant() },
      { text: "Bylo by fajn, ale není to priorita", scores: { "ECAM 470.85.MB": 1, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 0, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 1, "EXAM 440.55.G": 0, "EC 890.M": 1 }},
      { text: "Ne, stačí teplé nápoje", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 1, "ECAM 320.70.TB": 1, "ECAM 22.112.B": 1, "ECAM 220.21.BG": 1, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 1, "EC 890.M": 0 }}
    ]
  },
  {
    q: "Kolik různých nápojů a funkcí zákazník očekává?",
    options: [
      { text: "Stačí základy – espresso a lungo", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 2, "ECAM 220.21.BG": 3, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 0, "EC 890.M": 2 }},
      { text: "Slušný výběr 10–20 nápojů", scores: { "ECAM 470.85.MB": 1, "ECAM 310.80.SB": 3, "ECAM 320.70.TB": 3, "ECAM 22.112.B": 0, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 1, "EXAM 440.55.G": 3, "EC 890.M": 0 }},
      { text: "Maximum – 30+ receptů, aplikace, chytré funkce", scores: { "ECAM 470.85.MB": 4, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 1, "ECAM 22.112.B": 0, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 3, "EXAM 440.55.G": 1, "EC 890.M": 0 }}
    ]
  },
  {
    q: "Co je pro zákazníka rozhodující?",
    options: [
      { text: "Co nejnižší cena", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 1, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 3, "ECAM 220.21.BG": 3, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 0, "EC 890.M": 2 }},
      { text: "Dobrý poměr cena/funkce", scores: { "ECAM 470.85.MB": 1, "ECAM 310.80.SB": 3, "ECAM 320.70.TB": 2, "ECAM 22.112.B": 1, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 2, "EC 890.M": 1 }},
      { text: "Chce to nejlepší – prémiový zážitek", scores: { "ECAM 470.85.MB": 3, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 1, "ECAM 22.112.B": 0, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 4, "EXAM 440.55.G": 2, "EC 890.M": 0 }}
    ]
  }
];

let recStep = 0;
let recScores = {};

const MODEL_TIEBREAK_ORDER = [
  "ECAM 630.75.TSM", "ECAM 470.85.MB", "EXAM 440.55.G", "ECAM 320.70.TB",
  "ECAM 310.80.SB", "ECAM 22.112.B", "EC 890.M", "ECAM 220.21.BG"
];

function sortedModelsByScore(totals) {
  return Object.entries(totals).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return MODEL_TIEBREAK_ORDER.indexOf(a[0]) - MODEL_TIEBREAK_ORDER.indexOf(b[0]);
  });
}

function openRecommender() {
  recStep = 0;
  recScores = {};
  machines.forEach(m => recScores[m.model] = 0);
  $('recommender').classList.add('visible');
  document.querySelector('.recommend-trigger').style.display = 'none';
  renderRecStep();
  scrollTo($('recommender'));
}

function closeRecommender() {
  $('recommender').classList.remove('visible');
  document.querySelector('.recommend-trigger').style.display = '';
}

function renderRecStep() {
  const bar = $('rec-progress-bar');
  bar.style.width = ((recStep / recQuestions.length) * 100) + '%';

  if (recStep >= recQuestions.length) {
    showRecResult();
    return;
  }

  const q = recQuestions[recStep];
  $('rec-body').innerHTML = `
    <div class="q-num">Otázka ${recStep + 1} z ${recQuestions.length}</div>
    <div class="rec-question">${q.q}</div>
    <div class="rec-options">
      ${q.options.map((o, i) => `
        <button class="rec-option" data-action="rec-pick" data-step="${recStep}" data-opt="${i}">${o.text}</button>
      `).join('')}
    </div>
    <button class="rec-action-btn rec-action-secondary rec-restart-btn" data-action="rec-restart">Znovu</button>
  `;
}

function pickRecOption(step, optIdx) {
  const scores = recQuestions[step].options[optIdx].scores;
  for (const model in scores) recScores[model] += scores[model];
  recStep++;
  renderRecStep();
}

function showRecResult() {
  $('rec-progress-bar').style.width = '100%';

  const sorted = sortedModelsByScore(recScores);
  const best = machines.find(m => m.model === sorted[0][0]);
  const runner1 = machines.find(m => m.model === sorted[1][0]);
  const runner2 = machines.find(m => m.model === sorted[2][0]);

  $('rec-body').innerHTML = `
    <div class="rec-result">
      <div class="q-num">Doporučení</div>
      <div class="rec-result-name">${best.name}</div>
      <div class="rec-result-model">${best.model} \u00B7 ${best.tier}</div>
      <div class="rec-result-reason"><strong>${best.promo}</strong></div>
      <div class="feature-badges">
        ${featBadge(best.cold, '\u2713 Cold Brew', '\u2717 Cold Brew')}
        ${featBadge(best.milkAuto, '\u2713 Auto LatteCrema', '~ Ruční napěnění')}
      </div>
      <div class="rec-runners">
        <div class="rec-runners-title">Další vhodné modely</div>
        <div class="rec-runner"><strong>${runner1.name}</strong> \u2014 ${runner1.tier}</div>
        <div class="rec-runner"><strong>${runner2.name}</strong> \u2014 ${runner2.tier}</div>
      </div>
    </div>
    <div class="rec-actions">
      <button class="rec-action-btn rec-action-primary" data-action="rec-show" data-model="${best.model}">Zobrazit ${best.name}</button>
      <button class="rec-action-btn rec-action-secondary" data-action="rec-restart">Zkusit znovu</button>
      <button class="rec-action-btn rec-action-secondary" data-action="rec-close">Zavřít</button>
    </div>
  `;
}

// Event delegation for recommender
document.addEventListener('click', e => {
  const action = e.target.dataset.action;
  if (!action) return;

  if (action === 'rec-pick') {
    pickRecOption(+e.target.dataset.step, +e.target.dataset.opt);
  } else if (action === 'rec-restart') {
    openRecommender();
  } else if (action === 'rec-close') {
    closeRecommender();
  } else if (action === 'rec-show') {
    closeRecommender();
    toggleCard(e.target.dataset.model);
  }
});

renderGrid();
