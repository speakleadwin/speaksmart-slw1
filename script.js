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

// ========== TAB SWITCHING ==========
function switchTab(index) {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.panel');
  
  tabs.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
  
  panels.forEach((p, i) => {
    p.classList.toggle('active', i === index);
  });
}

// ========== AGE SELECTION ==========
function setAge(btn) {
  const ageBtns = document.querySelectorAll('.age-btn');
  ageBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  ageGroupSelect.value = btn.dataset.group;
  ensureAgeSelected();
}

// ========== SPEECH TYPE & QUOTE TOPIC ==========
function pickSpeechType(btn) {
  const row = btn.parentElement;
  row.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
}

function pickQuoteTopic(btn) {
  const row = btn.parentElement;
  row.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
}

// ========== OUTLINE GENERATION ==========
function genOutline() {
  if (!ensureAgeSelected()) return;
  
  const activePill = document.querySelector('.pill.active');
  const speechType = activePill ? activePill.dataset.stype : 'informative';
  const outlineCard = document.getElementById('outlineCard');
  const outlineContent = document.getElementById('outlineContent');
  
  const age = ageGroupSelect.value;
  
  const outlines = {
    informative: {
      middle: {
        label: 'Informative Speech',
        intro: 'Start with an interesting fact or question.',
        points: ['Point 1: Explain what it is.', 'Point 2: Give examples.', 'Point 3: Explain why it matters.'],
        conclusion: 'End by reminding them of the main idea.'
      },
      high: {
        label: 'Informative Speech',
        intro: 'Open with an engaging hook or statistic.',
        points: ['Point 1: Define the topic and context.', 'Point 2: Provide key details with evidence.', 'Point 3: Explain real-world applications.'],
        conclusion: 'Summarize key points and leave a lasting impression.'
      },
      college: {
        label: 'Informative Speech',
        intro: 'Begin with a compelling hook and thesis statement.',
        points: ['Point 1: Establish theoretical framework.', 'Point 2: Present comprehensive evidence.', 'Point 3: Analyze implications and applications.'],
        conclusion: 'Synthesize key insights and suggest areas for further exploration.'
      }
    },
    persuasive: {
      middle: {
        label: 'Persuasive Speech',
        intro: 'Start with a problem that needs fixing.',
        points: ['Point 1: Why this is a problem.', 'Point 2: How to solve it.', 'Point 3: Why your solution is best.'],
        conclusion: 'Ask your audience to take action.'
      },
      high: {
        label: 'Persuasive Speech',
        intro: 'Open with a compelling problem statement.',
        points: ['Point 1: Establish credibility and context.', 'Point 2: Present persuasive arguments with evidence.', 'Point 3: Address counterarguments.'],
        conclusion: 'Call to action with memorable closing statement.'
      },
      college: {
        label: 'Persuasive Speech',
        intro: 'Begin with a provocative thesis and logical framework.',
        points: ['Point 1: Establish ethos and present primary arguments.', 'Point 2: Provide empirical evidence and logical reasoning.', 'Point 3: Refute opposing viewpoints with evidence.'],
        conclusion: 'Reinforce persuasive message with strategic call to action.'
      }
    },
    motivational: {
      middle: {
        label: 'Motivational Speech',
        intro: 'Start with an inspiring story or moment.',
        points: ['Point 1: Show the challenge.', 'Point 2: Share how it was overcome.', 'Point 3: Explain what listeners can learn.'],
        conclusion: 'Inspire them to take on their own challenges.'
      },
      high: {
        label: 'Motivational Speech',
        intro: 'Open with a relatable personal story or universal truth.',
        points: ['Point 1: Identify obstacles and common struggles.', 'Point 2: Share transformative insights or strategies.', 'Point 3: Connect message to audience aspirations.'],
        conclusion: 'End with an empowering message and clear action steps.'
      },
      college: {
        label: 'Motivational Speech',
        intro: 'Begin with a powerful narrative or philosophical premise.',
        points: ['Point 1: Examine systemic and psychological barriers.', 'Point 2: Present empirically-supported strategies for resilience.', 'Point 3: Connect personal growth to larger purpose.'],
        conclusion: 'Inspire transformative action aligned with audience values.'
      }
    },
    entertainment: {
      middle: {
        label: 'Entertainment Speech',
        intro: 'Start with something funny or surprising.',
        points: ['Point 1: Tell an engaging story.', 'Point 2: Add humor and surprise moments.', 'Point 3: Keep energy high throughout.'],
        conclusion: 'End on a funny or memorable note.'
      },
      high: {
        label: 'Entertainment Speech',
        intro: 'Open with a witty hook or unexpected statement.',
        points: ['Point 1: Build engaging narrative with relatable moments.', 'Point 2: Use humor strategically with timing.', 'Point 3: Maintain energy with varied pacing.'],
        conclusion: 'Land with a memorable punchline or callback.'
      },
      college: {
        label: 'Entertainment Speech',
        intro: 'Begin with a sophisticated hook blending humor and insight.',
        points: ['Point 1: Construct layered narrative with cultural references.', 'Point 2: Deploy humor with satirical or ironic commentary.', 'Point 3: Maintain sophisticated entertainment value.'],
        conclusion: 'Conclude with witty resolution and audience engagement.'
      }
    }
  };
  
  const ageMap = age === 'middle' ? 'middle' : age.includes('14') ? 'high' : 'college';
  const outline = outlines[speechType][ageMap];
  
  outlineContent.innerHTML = `
    <div class="o-label">${outline.label}</div>
    <div class="o-section">
      <h3>Introduction</h3>
      <p>${outline.intro}</p>
    </div>
    <div class="o-section">
      <h3>Body</h3>
      <ul>
        <li>${outline.points[0]}</li>
        <li>${outline.points[1]}</li>
        <li>${outline.points[2]}</li>
      </ul>
    </div>
    <div class="o-section">
      <h3>Conclusion</h3>
      <p>${outline.conclusion}</p>
    </div>
  `;
  outlineCard.style.display = 'block';
}

// ========== IMPROMPTU TOPIC GENERATION ==========
function genTopic() {
  if (!ensureAgeSelected()) return;
  
  const age = ageGroupSelect.value;
  const ageKey = age === 'middle' ? '10-13' : age === 'high' ? '14-18' : '18+';
  const pool = getPool('impromptu', ageKey, data.impromptu[ageKey]);
  const result = pool.next();
  
  const topicCard = document.getElementById('topicCard');
  const topicText = document.getElementById('topicText');
  const topicNotice = document.getElementById('topicNotice');
  
  topicText.textContent = result.split(':').slice(1).join(':').trim();
  topicCard.style.display = 'block';
  
  if (result.cycled) {
    topicNotice.classList.add('show');
  } else {
    topicNotice.classList.remove('show');
  }
}

// ========== WORD OF THE DAY ==========
function genWord() {
  if (!ensureAgeSelected()) return;
  
  const age = ageGroupSelect.value;
  const ageKey = age === 'middle' ? '10-13' : age === 'high' ? '14-18' : '18+';
  const pool = getPool('words', ageKey, data.words[ageKey]);
  const word = pool.next();
  
  const wordCard = document.getElementById('wordCard');
  const wWord = document.getElementById('wWord');
  const wPron = document.getElementById('wPron');
  const wDef = document.getElementById('wDef');
  const wEx = document.getElementById('wEx');
  const wordNotice = document.getElementById('wordNotice');
  
  wWord.textContent = word.word;
  wPron.textContent = word.pronunciation;
  wDef.textContent = word.definition;
  wEx.textContent = word.example;
  wordCard.style.display = 'block';
  
  if (result.cycled) {
    wordNotice.classList.add('show');
  } else {
    wordNotice.classList.remove('show');
  }
}

// ========== JOKE OF THE DAY ==========
function genJoke() {
  if (!ensureAgeSelected()) return;
  
  const age = ageGroupSelect.value;
  const ageKey = age === 'middle' ? '10-13' : age === 'high' ? '14-18' : '18+';
  const pool = getPool('jokes', ageKey, data.jokes[ageKey]);
  const joke = pool.next();
  
  const jokeCard = document.getElementById('jokeCard');
  const jokeText = document.getElementById('jokeText');
  const jokeNotice = document.getElementById('jokeNotice');
  
  jokeText.textContent = joke.split(':').slice(1).join(':').trim();
  jokeCard.style.display = 'block';
  
  if (joke.cycled) {
    jokeNotice.classList.add('show');
  } else {
    jokeNotice.classList.remove('show');
  }
}

// ========== QUOTE OF THE DAY ==========
function genQuote() {
  if (!ensureAgeSelected()) return;
  
  const activePill = document.querySelector('#quoteTopicRow .pill.active');
  const quoteTopic = activePill ? activePill.dataset.qtopic : 'speaking';
  const topicMap = {
    'speaking': 'publicSpeaking',
    'leadership': 'leadership',
    'confidence': 'confidence',
    'communication': 'publicSpeaking',
    'courage': 'publicSpeaking',
    'success': 'publicSpeaking'
  };
  
  const key = topicMap[quoteTopic] || 'publicSpeaking';
  const pool = getPool('quotes', key, data.quotes[key]);
  const quote = pool.next();
  
  const quoteCard = document.getElementById('quoteCard');
  const qText = document.getElementById('qText');
  const qAuthor = document.getElementById('qAuthor');
  const quoteNotice = document.getElementById('quoteNotice');
  
  qText.textContent = quote.split(':').slice(1).join(':').trim();
  qAuthor.textContent = '— SpeakSmart';
  quoteCard.style.display = 'block';
  
  if (quote.cycled) {
    quoteNotice.classList.add('show');
  } else {
    quoteNotice.classList.remove('show');
  }
}

ageGroupSelect.addEventListener('change', ensureAgeSelected);

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
