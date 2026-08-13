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

/* ── Name Wheel ─────────────────────────────────────────── */
(function () {
  const MAX_NAMES = 50;
  const COLORS = [
    '#1a6b8a', '#2e86ab', '#a23b72', '#f18f01', '#c73e1d',
    '#3b1f2b', '#44bba4', '#e94f37', '#393e41', '#d4b483',
    '#3c91e6', '#fa7921', '#9b2335', '#006494', '#6b4226',
    '#7b2d8b', '#1a7a4a', '#c05640', '#5c4033', '#2c5f2e'
  ];

  let names = [];
  let spinning = false;
  let selectedIndex = null;

  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const nameInput = document.getElementById('wheelNameInput');
  const addBtn = document.getElementById('wheelAddBtn');
  const statusEl = document.getElementById('wheelStatus');
  const countEl = document.getElementById('wheelCount');
  const nameList = document.getElementById('wheelNameList');
  const clearAllBtn = document.getElementById('wheelClearAllBtn');
  const spinBtn = document.getElementById('wheelSpinBtn');
  const resultBox = document.getElementById('wheelResult');
  const resultName = document.getElementById('wheelResultName');
  const removeBtn = document.getElementById('wheelRemoveBtn');
  const againBtn = document.getElementById('wheelAgainBtn');

  /* ── Web Audio beep ── */
  function playBeep() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) { /* silently ignore if audio not available */ }
  }

  /* ── Wheel drawing ── */
  function drawWheel(rotationAngle) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = cx - 4;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (names.length === 0) {
      ctx.fillStyle = '#1A2F5E';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#d7dff3';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Add names to spin!', cx, cy);
      return;
    }

    const slice = (2 * Math.PI) / names.length;
    names.forEach((name, i) => {
      const start = rotationAngle + i * slice;
      const end = start + slice;
      /* segment */
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = '#071A2F';
      ctx.lineWidth = 2;
      ctx.stroke();
      /* label */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + slice / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${names.length > 20 ? 10 : 13}px Arial`;
      ctx.textBaseline = 'middle';
      const maxLen = 14;
      const label = name.length > maxLen ? name.slice(0, maxLen - 1) + '…' : name;
      ctx.fillText(label, radius - 8, 0);
      ctx.restore();
    });

    /* center circle */
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fillStyle = '#071A2F';
    ctx.fill();
    ctx.strokeStyle = '#C9A84C';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  /* ── UI helpers ── */
  function updateUI() {
    countEl.textContent = `Names: ${names.length} / ${MAX_NAMES}`;
    spinBtn.disabled = names.length < 2 || spinning;
    nameList.innerHTML = '';
    names.forEach((name, i) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = name;
      const btn = document.createElement('button');
      btn.textContent = '✕';
      btn.className = 'wheel-name-remove';
      btn.title = `Remove ${name}`;
      btn.addEventListener('click', () => removeName(i));
      li.appendChild(span);
      li.appendChild(btn);
      nameList.appendChild(li);
    });
    drawWheel(0);
  }

  function setStatus(msg, isError) {
    statusEl.textContent = msg;
    statusEl.style.color = isError ? '#f7a4a4' : '#f7df9a';
  }

  function removeName(index) {
    names.splice(index, 1);
    hideResult();
    updateUI();
  }

  function hideResult() {
    selectedIndex = null;
    resultBox.hidden = true;
    resultName.textContent = '';
  }

  /* ── Add name ── */
  function addName() {
    const val = nameInput.value.trim();
    if (!val) { setStatus('Please enter a name.', true); return; }
    if (names.length >= MAX_NAMES) { setStatus(`Maximum of ${MAX_NAMES} names reached.`, true); return; }
    if (names.some(n => n.toLowerCase() === val.toLowerCase())) {
      setStatus(`"${val}" is already in the list.`, true); return;
    }
    names.push(val);
    nameInput.value = '';
    setStatus('');
    updateUI();
  }

  addBtn.addEventListener('click', addName);
  nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') addName(); });

  clearAllBtn.addEventListener('click', () => {
    if (names.length === 0) return;
    names = [];
    hideResult();
    updateUI();
  });

  /* ── Spin ── */
  spinBtn.addEventListener('click', () => {
    if (spinning || names.length < 2) return;
    hideResult();
    spinning = true;
    spinBtn.disabled = true;

    /* pick a target index randomly */
    const targetIndex = Math.floor(Math.random() * names.length);
    const slice = (2 * Math.PI) / names.length;

    /* We want the pointer (top = -π/2) to land on the middle of targetIndex's slice.
       targetAngle is the rotation so that segment centers at the top. */
    const extraSpins = (3 + Math.random()) * 2 * Math.PI; /* 3–4 full rotations */
    const targetAngle = -(targetIndex * slice + slice / 2) - Math.PI / 2;
    const totalAngle = extraSpins + ((targetAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    const duration = 3500; /* ms */
    const startTime = performance.now();

    function ease(t) {
      /* cubic ease-out */
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const angle = ease(t) * totalAngle;
      drawWheel(angle);
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        spinning = false;
        selectedIndex = targetIndex;
        playBeep();
        resultName.textContent = `🎉 ${names[targetIndex]}`;
        resultBox.hidden = false;
        spinBtn.disabled = names.length < 2;
      }
    }

    requestAnimationFrame(animate);
  });

  removeBtn.addEventListener('click', () => {
    if (selectedIndex !== null) {
      removeName(selectedIndex);
    }
  });

  againBtn.addEventListener('click', () => {
    hideResult();
    spinBtn.disabled = names.length < 2;
  });

  /* initial draw */
  drawWheel(0);
})();
