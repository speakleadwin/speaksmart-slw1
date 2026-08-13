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
    '14-18': Array.from({ length: 50 }, (_, i) => `Joke ${i + 1}: I told my notes to organize themselves… now they're in a dramatic relationship. (${i + 1})`),
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

// ========== NAME WHEEL FUNCTIONALITY ==========

class NameWheel {
  constructor() {
    this.names = [];
    this.isSpinning = false;
    this.currentRotation = 0;
    this.selectedName = null;
    this.canvas = document.getElementById('wheelCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.wheelRadius = Math.min(this.canvas.width, this.canvas.height) / 2;
    this.wheelCenterX = this.canvas.width / 2;
    this.wheelCenterY = this.canvas.height / 2;

    this.initEventListeners();
    this.drawEmptyWheel();
  }

  initEventListeners() {
    document.getElementById('addNameBtn').addEventListener('click', () => this.addName());
    document.getElementById('nameInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addName();
    });
    document.getElementById('clearAllNamesBtn').addEventListener('click', () => this.clearAllNames());
    document.getElementById('spinWheelBtn').addEventListener('click', () => this.spinWheel());
    document.getElementById('removeNameBtn').addEventListener('click', () => this.removeName());
    document.getElementById('spinAgainBtn').addEventListener('click', () => this.resetResult());
  }

  addName() {
    const input = document.getElementById('nameInput');
    const name = input.value.trim();

    // Validation
    if (!name) {
      alert('Please enter a name.');
      return;
    }

    if (name.length > 50) {
      alert('Name is too long (max 50 characters).');
      return;
    }

    if (this.names.includes(name)) {
      alert('This name is already in the wheel!');
      return;
    }

    if (this.names.length >= 50) {
      alert('Maximum 50 names reached!');
      return;
    }

    // Add name and update UI
    this.names.push(name);
    input.value = '';
    this.updateUI();
  }

  removeName() {
    if (this.selectedName) {
      this.names = this.names.filter(n => n !== this.selectedName);
      this.resetResult();
      this.updateUI();
    }
  }

  clearAllNames() {
    if (this.names.length === 0) {
      alert('No names to clear!');
      return;
    }

    if (confirm('Are you sure you want to clear all names?')) {
      this.names = [];
      this.resetResult();
      this.updateUI();
    }
  }

  updateUI() {
    // Update name counter
    document.getElementById('nameCounter').textContent = `Names added: ${this.names.length}/50`;

    // Update names list
    const namesList = document.getElementById('namesList');
    namesList.innerHTML = '';
    this.names.forEach((name) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${name}</span>
        <button type="button" onclick="nameWheelInstance.removeSingleName('${name}')">Remove</button>
      `;
      namesList.appendChild(li);
    });

    // Enable/disable spin button
    const spinBtn = document.getElementById('spinWheelBtn');
    spinBtn.disabled = this.names.length === 0;

    // Redraw wheel
    this.drawWheel();
  }

  removeSingleName(name) {
    this.names = this.names.filter(n => n !== name);
    this.updateUI();
  }

  drawEmptyWheel() {
    this.ctx.fillStyle = '#1A2F5E';
    this.ctx.beginPath();
    this.ctx.arc(this.wheelCenterX, this.wheelCenterY, this.wheelRadius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.strokeStyle = '#C9A84C';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();

    // Draw "Add names to start" text
    this.ctx.fillStyle = '#C9A84C';
    this.ctx.font = 'bold 16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('Add names to start', this.wheelCenterX, this.wheelCenterY);
  }

  drawWheel() {
    if (this.names.length === 0) {
      this.drawEmptyWheel();
      return;
    }

    const colors = [
      '#C9A84C', '#D4AF86', '#B8973C', '#E5C9A8',
      '#A0823D', '#F5DEB3', '#8B6F47', '#D2B48C',
      '#996633', '#CC9966', '#9966CC', '#6699CC',
      '#66CC99', '#CCCC66', '#FF9966', '#CC66FF'
    ];

    const n = this.names.length;
    const sliceAngle = (2 * Math.PI) / n;

    // Draw slices
    this.names.forEach((name, i) => {
      const startAngle = i * sliceAngle + this.currentRotation;
      const endAngle = startAngle + sliceAngle;

      // Draw slice
      const color = colors[i % colors.length];
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.moveTo(this.wheelCenterX, this.wheelCenterY);
      this.ctx.arc(this.wheelCenterX, this.wheelCenterY, this.wheelRadius, startAngle, endAngle);
      this.ctx.closePath();
      this.ctx.fill();

      // Draw slice border
      this.ctx.strokeStyle = '#071A2F';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Draw text
      const textAngle = startAngle + sliceAngle / 2;
      const textX = this.wheelCenterX + Math.cos(textAngle) * (this.wheelRadius * 0.65);
      const textY = this.wheelCenterY + Math.sin(textAngle) * (this.wheelRadius * 0.65);

      this.ctx.save();
      this.ctx.translate(textX, textY);
      this.ctx.rotate(textAngle + Math.PI / 2);
      this.ctx.fillStyle = '#071A2F';
      this.ctx.font = 'bold 12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      
      // Truncate long names
      let displayName = name;
      if (name.length > 15) {
        displayName = name.substring(0, 12) + '...';
      }
      this.ctx.fillText(displayName, 0, 0);
      this.ctx.restore();
    });

    // Draw center circle
    this.ctx.fillStyle = '#C9A84C';
    this.ctx.beginPath();
    this.ctx.arc(this.wheelCenterX, this.wheelCenterY, 20, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  spinWheel() {
    if (this.isSpinning || this.names.length === 0) return;

    this.isSpinning = true;
    document.getElementById('spinWheelBtn').disabled = true;
    document.getElementById('resultSection').style.display = 'none';

    // Random spin: 5-8 full rotations + random offset
    const fullRotations = 5 + Math.random() * 3;
    const randomOffset = Math.random() * 2 * Math.PI;
    const targetRotation = this.currentRotation + fullRotations * 2 * Math.PI + randomOffset;

    // Animation duration: 3-4 seconds
    const duration = 3000 + Math.random() * 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      this.currentRotation = this.currentRotation + (targetRotation - this.currentRotation) * easeProgress;
      this.drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.currentRotation = targetRotation;
        this.drawWheel();
        this.determineSelection();
        this.playSound();
        this.isSpinning = false;
      }
    };

    requestAnimationFrame(animate);
  }

  determineSelection() {
    const n = this.names.length;
    const sliceAngle = (2 * Math.PI) / n;
    
    // Normalize rotation to 0-2π
    const normalizedRotation = ((this.currentRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    
    // The pointer is at the top (0 degrees), so we check which slice is at the top
    // We need to find which slice contains the angle pointing up
    const pointerAngle = (2 * Math.PI - normalizedRotation) % (2 * Math.PI);
    
    // Determine which slice
    const selectedIndex = Math.floor(pointerAngle / sliceAngle) % n;
    this.selectedName = this.names[selectedIndex];

    // Show result
    document.getElementById('selectedName').textContent = this.selectedName;
    document.getElementById('resultSection').style.display = 'block';
  }

  playSound() {
    // Create a simple beep sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Fallback if Web Audio API is not available
      console.log('Web Audio API not supported');
    }
  }

  resetResult() {
    document.getElementById('resultSection').style.display = 'none';
    this.selectedName = null;
    document.getElementById('spinWheelBtn').disabled = this.names.length === 0;
  }
}

// Initialize Name Wheel
const nameWheelInstance = new NameWheel();
