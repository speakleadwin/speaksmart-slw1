const ageGroupSelect = document.getElementById('ageGroup');
const ageNotice = document.getElementById('ageNotice');

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function shuffleArray(arr) {
  const cloned = [...arr];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function createNonRepeatPool(list) {
  return {
    original: list,
    shuffled: shuffleArray(list),
    index: 0,
    next() {
      if (!this.shuffled.length) return '';
      if (this.index >= this.shuffled.length) {
        this.shuffled = shuffleArray(this.original);
        this.index = 0;
      }
      const value = this.shuffled[this.index];
      this.index += 1;
      return value;
    }
  };
}

const data = {
  impromptu: {
    '10-13': Array.from({ length: 50 }, (_, i) => `Middle School Topic ${i + 1}: Talk about a fun challenge like inventing a playground game #${i + 1}.`),
    '14-18': Array.from({ length: 50 }, (_, i) => `High School Topic ${i + 1}: Defend a bold idea for life skills teens should learn #${i + 1}.`),
    '18+': Array.from({ length: 50 }, (_, i) => `College/Pro Topic ${i + 1}: Present your take on a modern social trend #${i + 1}.`)
  },
  jokes: {
    '10-13': Array.from({ length: 50 }, (_, i) => `Joke ${i + 1}: Why did the pencil get an award? Because it was on point! (${i + 1})`),
    '14-18': Array.from({ length: 50 }, (_, i) => `Joke ${i + 1}: I told my notes to organize themselves… now they’re in a dramatic relationship. (${i + 1})`),
    '18+': Array.from({ length: 50 }, (_, i) => `Joke ${i + 1}: I practice speeches in the mirror—best audience, toughest critic. (${i + 1})`)
  },
  words: {
    '10-13': Array.from({ length: 50 }, (_, i) => ({
      word: `Brightword ${i + 1}`,
      definition: 'A clear and positive word used to make speaking stronger.',
      pronunciation: 'BRITE-wurd',
      example: `Use Brightword ${i + 1} to make your point memorable.`
    })),
    '14-18': Array.from({ length: 50 }, (_, i) => ({
      word: `PowerTerm ${i + 1}`,
      definition: 'A persuasive term that sharpens communication and impact.',
      pronunciation: 'POW-er-term',
      example: `PowerTerm ${i + 1} can elevate a persuasive speech quickly.`
    })),
    '18+': Array.from({ length: 50 }, (_, i) => ({
      word: `OratorLex ${i + 1}`,
      definition: 'A high-level rhetorical word that improves authority in speaking.',
      pronunciation: 'OR-uh-tor-leks',
      example: `Using OratorLex ${i + 1} correctly can enhance professional presence.`
    }))
  },
  quotes: {
    publicSpeaking: Array.from({ length: 20 }, (_, i) => `Public Speaking Quote ${i + 1}: Your voice can move a room before your feet reach the stage.`),
    leadership: Array.from({ length: 20 }, (_, i) => `Leadership Quote ${i + 1}: Great leaders listen deeply, speak clearly, and serve boldly.`),
    confidence: Array.from({ length: 20 }, (_, i) => `Confidence Quote ${i + 1}: Confidence grows each time courage speaks first.`)
  }
};

const pools = {
  impromptu: {},
  jokes: {},
  words: {},
  quotes: {}
};

function ensureAgeSelected() {
  if (!ageGroupSelect.value) {
    ageNotice.textContent = 'Please select an age group before generating content.';
    return false;
  }
  ageNotice.textContent = `Age group selected: ${ageGroupSelect.options[ageGroupSelect.selectedIndex].text}`;
  return true;
}

function getPool(tool, key, list) {
  if (!pools[tool][key]) {
    pools[tool][key] = createNonRepeatPool(list);
  }
  return pools[tool][key];
}

ageGroupSelect.addEventListener('change', ensureAgeSelected);

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

document.getElementById('generateTitle').addEventListener('click', () => {
  if (!ensureAgeSelected()) return;
  const topic = document.getElementById('speechTopic').value.trim();
  const results = document.getElementById('titleResults');
  results.innerHTML = '';
  if (!topic) {
    results.innerHTML = '<li>Please enter a topic first.</li>';
    return;
  }

  const age = ageGroupSelect.value;
  const starters = age === '10-13'
    ? ['Why', 'How', 'The Cool Truth About', 'What Everyone Should Know About']
    : age === '14-18'
      ? ['The Real Impact of', 'Breaking Myths About', 'The Future of', 'Rethinking']
      : ['A Critical Look at', 'Beyond the Surface of', 'The Case For', 'Redefining'];

  const titles = [
    `${starters[0]} ${topic}?`,
    `${starters[1]} ${topic} Shapes Our Choices`,
    `${starters[2]} ${topic}`,
    `${starters[3]} ${topic}`,
    `${topic}: Problems, Possibilities, and Solutions`
  ];

  titles.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t;
    results.appendChild(li);
  });
});

document.getElementById('generateOutline').addEventListener('click', () => {
  if (!ensureAgeSelected()) return;
  const topic = document.getElementById('outlineTopic').value.trim();
  const output = document.getElementById('outlineResult');

  if (!topic) {
    output.textContent = 'Please enter a topic first.';
    return;
  }

  const age = ageGroupSelect.value;
  const complexity = age === '10-13'
    ? {
      opener: 'Start with a simple question your classmates can answer.',
      body: ['Point 1: Explain the topic in simple words.', 'Point 2: Give one real-life example.', 'Point 3: Share one lesson people can use today.'],
      close: 'End with one clear sentence that repeats your main idea.'
    }
    : age === '14-18'
      ? {
        opener: 'Open with a strong statistic, quote, or short story.',
        body: ['Point 1: Define the issue and why it matters.', 'Point 2: Compare different views or causes.', 'Point 3: Offer a realistic action step.'],
        close: 'Close with a challenge or call to action for your audience.'
      }
      : {
        opener: 'Begin with a compelling hook that establishes urgency and relevance.',
        body: ['Point 1: Present context and key framework.', 'Point 2: Analyze implications with evidence.', 'Point 3: Propose strategic solutions and expected outcomes.'],
        close: 'Conclude by reinforcing significance and inviting informed action.'
      };

  output.innerHTML = `
    <strong>Topic:</strong> ${topic}<br><br>
    <strong>Opening:</strong> ${complexity.opener}<br><br>
    <strong>Body:</strong>
    <ul>
      <li>${complexity.body[0]}</li>
      <li>${complexity.body[1]}</li>
      <li>${complexity.body[2]}</li>
    </ul>
    <strong>Close:</strong> ${complexity.close}
  `;
});

document.getElementById('generateImpromptu').addEventListener('click', () => {
  if (!ensureAgeSelected()) return;
  const age = ageGroupSelect.value;
  const pool = getPool('impromptu', age, data.impromptu[age]);
  document.getElementById('impromptuResult').textContent = pool.next();
});

document.getElementById('generateJoke').addEventListener('click', () => {
  if (!ensureAgeSelected()) return;
  const age = ageGroupSelect.value;
  const pool = getPool('jokes', age, data.jokes[age]);
  document.getElementById('jokeResult').textContent = pool.next();
});

document.getElementById('generateWord').addEventListener('click', () => {
  if (!ensureAgeSelected()) return;
  const age = ageGroupSelect.value;
  const pool = getPool('words', age, data.words[age]);
  const word = pool.next();
  document.getElementById('wordResult').innerHTML = `
    <strong>${word.word}</strong><br>
    Definition: ${word.definition}<br>
    Pronunciation: ${word.pronunciation}<br>
    Example: ${word.example}
  `;
});

document.getElementById('generateQuote').addEventListener('click', () => {
  if (!ensureAgeSelected()) return;
  const topic = document.getElementById('quoteTopic').value;
  const pool = getPool('quotes', topic, data.quotes[topic]);
  document.getElementById('quoteResult').textContent = pool.next();
});

// ── Name Wheel ──────────────────────────────────────────────────────────────
(function () {
  const MAX_NAMES = 50;
  const COLORS = [
    '#C9A84C', '#1A2F5E', '#2E5EA8', '#8B5CF6', '#EC4899',
    '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#14B8A6'
  ];

  let names = [];
  let spinning = false;
  let currentAngle = 0; // radians, tracked across spins

  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const nameInput = document.getElementById('wheelNameInput');
  const addBtn = document.getElementById('wheelAddBtn');
  const nameList = document.getElementById('wheelNameList');
  const countSpan = document.getElementById('wheelCount');
  const spinBtn = document.getElementById('wheelSpinBtn');
  const resultDiv = document.getElementById('wheelResult');
  const resultText = document.getElementById('wheelResultText');
  const removeBtn = document.getElementById('wheelRemoveBtn');
  const keepBtn = document.getElementById('wheelKeepBtn');
  const errorEl = document.getElementById('wheelInputError');

  // ── Audio: generate a short tick using Web Audio API ──────────────────────
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }
  function playTick(freq = 880, duration = 0.04) {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'square';
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) { /* silently ignore if audio unavailable */ }
  }
  function playWinSound() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => setTimeout(() => playTick(freq, 0.12), i * 120));
  }

  // ── Draw wheel ─────────────────────────────────────────────────────────────
  function drawWheel(rotationAngle) {
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const r = Math.min(cx, cy) - 6;
    ctx.clearRect(0, 0, W, H);

    if (names.length === 0) {
      ctx.fillStyle = '#1A2F5E';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#C9A84C';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Add names to spin!', cx, cy);
      return;
    }

    const slice = (Math.PI * 2) / names.length;

    names.forEach((name, i) => {
      const start = rotationAngle + i * slice;
      const end = start + slice;

      // Slice
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = '#071A2F';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + slice / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${names.length > 20 ? 10 : 13}px Arial`;
      ctx.shadowColor = 'rgba(0,0,0,0.7)';
      ctx.shadowBlur = 3;
      const maxLen = 14;
      const label = name.length > maxLen ? name.slice(0, maxLen - 1) + '…' : name;
      ctx.fillText(label, r - 8, 4);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fillStyle = '#071A2F';
    ctx.fill();
    ctx.strokeStyle = '#C9A84C';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // ── Update name list UI ────────────────────────────────────────────────────
  function renderList() {
    nameList.innerHTML = '';
    names.forEach((name, i) => {
      const li = document.createElement('li');
      li.textContent = name;
      const del = document.createElement('button');
      del.textContent = '✕';
      del.title = 'Remove ' + name;
      del.addEventListener('click', () => {
        names.splice(i, 1);
        afterNamesChange();
      });
      li.appendChild(del);
      nameList.appendChild(li);
    });
    countSpan.textContent = names.length;
    spinBtn.disabled = names.length < 2;
    drawWheel(currentAngle);
  }

  function afterNamesChange() {
    resultDiv.hidden = true;
    renderList();
  }

  // ── Add name ───────────────────────────────────────────────────────────────
  function addName() {
    const val = nameInput.value.trim();
    errorEl.textContent = '';
    if (!val) { errorEl.textContent = 'Please enter a name.'; return; }
    if (names.length >= MAX_NAMES) { errorEl.textContent = `Maximum of ${MAX_NAMES} names reached.`; return; }
    if (names.map(n => n.toLowerCase()).includes(val.toLowerCase())) {
      errorEl.textContent = 'That name is already in the list.'; return;
    }
    names.push(val);
    nameInput.value = '';
    nameInput.focus();
    afterNamesChange();
  }

  addBtn.addEventListener('click', addName);
  nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') addName(); });

  // ── Spin ───────────────────────────────────────────────────────────────────
  spinBtn.addEventListener('click', () => {
    if (spinning || names.length < 2) return;
    spinning = true;
    spinBtn.disabled = true;
    resultDiv.hidden = true;

    // Total rotation: 5–10 full rotations + random offset
    const totalRotation = (Math.PI * 2) * (5 + Math.random() * 5);
    const duration = 4000; // ms
    const startAngle = currentAngle;
    const endAngle = startAngle + totalRotation;
    const startTime = performance.now();

    // How many ticks to play (proportional to speed)
    let lastTickSlice = -1;

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      const angle = startAngle + totalRotation * eased;
      currentAngle = angle;
      drawWheel(angle);

      // Tick sound: fire when the pointer crosses a slice boundary
      const slice = (Math.PI * 2) / names.length;
      // Pointer is at top (angle = -Math.PI/2 relative to canvas top)
      // We treat the "pointer position" as the top: normalise current rotation
      const normalised = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const currentSlice = Math.floor(((Math.PI * 2 - normalised) % (Math.PI * 2)) / slice);
      if (currentSlice !== lastTickSlice) {
        // During the fast part of the spin, only play a fraction of ticks to avoid noise overload
        const tickProbability = progress < 0.9 ? 0.3 : 1;
        if (Math.random() < tickProbability) playTick(660 + currentSlice * 30, 0.03);
        lastTickSlice = currentSlice;
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        // Determine winner: pointer at top = angle 0 in our coordinate
        const finalNormalised = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const winnerIndex = Math.floor(((Math.PI * 2 - finalNormalised) % (Math.PI * 2)) / slice) % names.length;
        const winner = names[winnerIndex];
        spinning = false;
        spinBtn.disabled = false;
        resultText.textContent = `🎉 ${winner} is selected!`;
        resultDiv.hidden = false;

        // Store winner index so remove button knows which exact entry to remove
        removeBtn.dataset.winnerIndex = winnerIndex;
        playWinSound();
      }
    }

    requestAnimationFrame(frame);
  });

  // ── After result: Remove or Keep ───────────────────────────────────────────
  removeBtn.addEventListener('click', () => {
    const winnerIndex = parseInt(removeBtn.dataset.winnerIndex, 10);
    names.splice(winnerIndex, 1);
    afterNamesChange();
  });

  keepBtn.addEventListener('click', () => {
    resultDiv.hidden = true;
    spinBtn.disabled = names.length < 2;
  });

  // Initial draw
  drawWheel(currentAngle);
})();
