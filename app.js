let expandedModel = null;
let activeFilter = 'all';

function renderCard(m) {
  const show = activeFilter === 'all' ||
    (activeFilter === 'automatický' && m.type === 'automatický') ||
    (activeFilter === 'pákový' && m.type === 'pákový') ||
    (activeFilter === 'cold' && m.cold);

  const isExpanded = expandedModel === m.model;
  const badgeClass = m.type === 'automatický' ? 'auto' : 'manual';

  let milkLabel;
  if (m.milkAuto) milkLabel = '✓ Auto LatteCrema';
  else if (m.type === 'pákový') milkLabel = '~ Ruční My Latte Art';
  else milkLabel = '~ Ruční parní tryska';

  return `
    <div class="card${isExpanded ? ' expanded' : ''}"
         data-model="${m.model}"
         style="${show ? '' : 'display:none'}"
         onclick="toggleCard('${m.model}')">
      <div class="card-top">
        <div>
          <div class="card-name">${m.name}</div>
          <div class="card-model">${m.model}</div>
          <div class="card-tier">${m.tier}</div>
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          <span class="badge badge-${badgeClass}">${m.type}</span>
          <span class="chevron">▼</span>
        </div>
      </div>
      <div class="tag-row">${m.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="specs-row">${m.specs.slice(0, 3).map(s => `<span class="spec-pill">${s}</span>`).join('')}</div>
      <div class="detail">
        <div class="detail-header">
          <h3>Klíčové informace pro promotéra</h3>
          <button class="close-btn" onclick="event.stopPropagation();closeCard()">zavřít ✕</button>
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
          <span class="feat ${m.cold ? 'feat-yes' : 'feat-no'}">${m.cold ? '✓ Cold Brew' : '✗ Cold Brew'}</span>
          <span class="feat ${m.milkAuto ? 'feat-yes' : 'feat-no'}">${milkLabel}</span>
          <span class="feat ${m.type === 'automatický' ? 'feat-yes' : 'feat-no'}">${m.type === 'automatický' ? '✓ Integrovaný mlýnek' : '✗ Mlýnek nutno dokoupit'}</span>
        </div>
        <div class="promo-box"><strong>Prodejní argument:</strong> ${m.promo}</div>
        <button class="quiz-btn" onclick="event.stopPropagation();openQuiz('${m.model}')">Procvič si ${m.name} →</button>
      </div>
    </div>`;
}

function renderGrid() {
  document.getElementById('grid').innerHTML = machines.map(renderCard).join('');
}

function toggleCard(model) {
  if (expandedModel === model) return;
  expandedModel = model;
  renderGrid();
  setTimeout(() => {
    const card = document.querySelector(`[data-model="${expandedModel}"]`);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

function closeCard() {
  expandedModel = null;
  renderGrid();
}

function filterCards(filter, btn) {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = filter;
  expandedModel = null;
  renderGrid();
}

function openQuiz(model) {
  const m = machines.find(x => x.model === model);
  document.getElementById('quiz-title').textContent = `Kvíz: ${m.name}`;
  document.getElementById('quiz-subtitle').textContent =
    `${m.model} · 5 otázek pro promotéra · Zobraz odpověď až po vlastním přemýšlení`;

  document.getElementById('quiz-questions').innerHTML = m.quiz.map((q, i) => `
    <div class="q-card">
      <div class="q-num">Otázka ${i + 1}</div>
      <div class="q-text">${q.q}</div>
      <button class="reveal-btn" id="rb-${i}" onclick="reveal(${i})">Zobrazit odpověď</button>
      <div class="answer" id="ans-${i}">${q.a}</div>
    </div>
  `).join('');

  const quizSection = document.getElementById('quiz-section');
  quizSection.classList.add('visible');
  setTimeout(() => quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function reveal(i) {
  document.getElementById('ans-' + i).classList.add('visible');
  document.getElementById('rb-' + i).style.display = 'none';
}

function closeQuiz() {
  document.getElementById('quiz-section').classList.remove('visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Recommender ── */

const recQuestions = [
  {
    q: "Jak si zákazník představuje přípravu kávy?",
    options: [
      { text: "Jedním dotykem, plně automaticky", scores: { "ECAM 470.85.MB": 2, "ECAM 310.80.SB": 2, "ECAM 320.70.TB": 2, "ECAM 22.112.B": 1, "ECAM 220.21.BG": 1, "ECAM 630.75.TSM": 2, "EXAM 440.55.G": 2, "EC 890.M": 0 }},
      { text: "Baristický přístup – ruční příprava, kontrola nad výsledkem", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 1, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 0, "EC 890.M": 3 }},
      { text: "Hlavně jednoduše, bez zbytečných komplikací", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 1, "ECAM 320.70.TB": 1, "ECAM 22.112.B": 2, "ECAM 220.21.BG": 3, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 0, "EC 890.M": 1 }}
    ]
  },
  {
    q: "Jak důležité jsou mléčné nápoje (cappuccino, latte)?",
    options: [
      { text: "Nepiji – stačí espresso, lungo", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 2, "ECAM 220.21.BG": 2, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 0, "EC 890.M": 1 }},
      { text: "Občas ano, nevadí mi ruční napěnění", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 2, "ECAM 220.21.BG": 1, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 0, "EC 890.M": 2 }},
      { text: "Piji často, chci automatické napěnění jedním dotykem", scores: { "ECAM 470.85.MB": 3, "ECAM 310.80.SB": 3, "ECAM 320.70.TB": 3, "ECAM 22.112.B": 0, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 3, "EXAM 440.55.G": 3, "EC 890.M": 0 }}
    ]
  },
  {
    q: "Má zákazník zájem o studené kávové nápoje (Cold Brew, ledové latte)?",
    options: [
      { text: "Ano, to je důležité", scores: { "ECAM 470.85.MB": 3, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 0, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 3, "EXAM 440.55.G": 0, "EC 890.M": 2 }},
      { text: "Bylo by fajn, ale není to priorita", scores: { "ECAM 470.85.MB": 1, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 0, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 1, "EXAM 440.55.G": 0, "EC 890.M": 1 }},
      { text: "Ne, stačí teplé nápoje", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 1, "ECAM 320.70.TB": 1, "ECAM 22.112.B": 1, "ECAM 220.21.BG": 1, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 1, "EC 890.M": 0 }}
    ]
  },
  {
    q: "Kolik různých nápojů a funkcí zákazník očekává?",
    options: [
      { text: "Stačí základy – espresso a lungo", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 2, "ECAM 220.21.BG": 3, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 0, "EC 890.M": 2 }},
      { text: "Slušný výběr 10–20 nápojů", scores: { "ECAM 470.85.MB": 1, "ECAM 310.80.SB": 3, "ECAM 320.70.TB": 3, "ECAM 22.112.B": 0, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 1, "EXAM 440.55.G": 3, "EC 890.M": 0 }},
      { text: "Maximum – 30+ receptů, aplikace, chytré funkce", scores: { "ECAM 470.85.MB": 3, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 1, "ECAM 22.112.B": 0, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 3, "EXAM 440.55.G": 1, "EC 890.M": 0 }}
    ]
  },
  {
    q: "Co je pro zákazníka rozhodující?",
    options: [
      { text: "Co nejnižší cena", scores: { "ECAM 470.85.MB": 0, "ECAM 310.80.SB": 1, "ECAM 320.70.TB": 0, "ECAM 22.112.B": 2, "ECAM 220.21.BG": 3, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 0, "EC 890.M": 2 }},
      { text: "Dobrý poměr cena/funkce", scores: { "ECAM 470.85.MB": 1, "ECAM 310.80.SB": 3, "ECAM 320.70.TB": 2, "ECAM 22.112.B": 1, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 0, "EXAM 440.55.G": 2, "EC 890.M": 1 }},
      { text: "Chce to nejlepší – prémiový zážitek", scores: { "ECAM 470.85.MB": 3, "ECAM 310.80.SB": 0, "ECAM 320.70.TB": 1, "ECAM 22.112.B": 0, "ECAM 220.21.BG": 0, "ECAM 630.75.TSM": 3, "EXAM 440.55.G": 1, "EC 890.M": 0 }}
    ]
  }
];

let recStep = 0;
let recScores = {};

function openRecommender() {
  recStep = 0;
  recScores = {};
  machines.forEach(m => recScores[m.model] = 0);
  document.getElementById('recommender').classList.add('visible');
  document.querySelector('.recommend-trigger').style.display = 'none';
  renderRecStep();
  setTimeout(() => document.getElementById('recommender').scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function closeRecommender() {
  document.getElementById('recommender').classList.remove('visible');
  document.querySelector('.recommend-trigger').style.display = 'block';
}

function renderRecStep() {
  const bar = document.getElementById('rec-progress-bar');
  bar.style.width = ((recStep / recQuestions.length) * 100) + '%';

  if (recStep >= recQuestions.length) {
    showRecResult();
    return;
  }

  const q = recQuestions[recStep];
  document.getElementById('rec-body').innerHTML = `
    <div class="q-num">Otázka ${recStep + 1} z 5</div>
    <div class="rec-question">${q.q}</div>
    <div class="rec-options">
      ${q.options.map((o, i) => `
        <button class="rec-option" onclick="pickRecOption(${recStep}, ${i})">${o.text}</button>
      `).join('')}
    </div>
  `;
}

function pickRecOption(step, optIdx) {
  const scores = recQuestions[step].options[optIdx].scores;
  for (const model in scores) {
    recScores[model] += scores[model];
  }
  recStep++;
  renderRecStep();
}

function showRecResult() {
  document.getElementById('rec-progress-bar').style.width = '100%';

  const sorted = Object.entries(recScores).sort((a, b) => b[1] - a[1]);
  const best = machines.find(m => m.model === sorted[0][0]);
  const runner1 = machines.find(m => m.model === sorted[1][0]);
  const runner2 = machines.find(m => m.model === sorted[2][0]);

  document.getElementById('rec-body').innerHTML = `
    <div class="rec-result">
      <div class="q-num">Doporučení</div>
      <div class="rec-result-name">${best.name}</div>
      <div class="rec-result-model">${best.model} · ${best.tier}</div>
      <div class="rec-result-reason"><strong>${best.promo}</strong></div>
      <div class="feature-badges">
        <span class="feat ${best.cold ? 'feat-yes' : 'feat-no'}">${best.cold ? '✓ Cold Brew' : '✗ Cold Brew'}</span>
        <span class="feat ${best.milkAuto ? 'feat-yes' : 'feat-no'}">${best.milkAuto ? '✓ Auto LatteCrema' : '~ Ruční napěnění'}</span>
      </div>
      <div class="rec-runners">
        <div class="rec-runners-title">Další vhodné modely</div>
        <div class="rec-runner"><strong>${runner1.name}</strong> — ${runner1.tier}</div>
        <div class="rec-runner"><strong>${runner2.name}</strong> — ${runner2.tier}</div>
      </div>
    </div>
    <div class="rec-actions">
      <button class="rec-action-btn rec-action-primary" onclick="closeRecommender();toggleCard('${best.model}')">Zobrazit ${best.name}</button>
      <button class="rec-action-btn rec-action-secondary" onclick="openRecommender()">Zkusit znovu</button>
      <button class="rec-action-btn rec-action-secondary" onclick="closeRecommender()">Zavřít</button>
    </div>
  `;
}

renderGrid();
