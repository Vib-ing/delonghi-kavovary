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

renderGrid();
