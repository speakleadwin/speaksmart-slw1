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
