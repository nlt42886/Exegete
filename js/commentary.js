/* ══════════════════════════════════════════════════════════════
   EXEGETE — Study Pane: Commentary, Cross-Refs, Strong's, Dictionary
══════════════════════════════════════════════════════════════ */

/* ── Commentary sources ───────────────────────────────────── */
const COMMENTARY_SOURCES = [
  {
    id:       'matthew-henry',
    label:    'Matthew Henry',
    bibliaId: 'mhc',
    persona:  'Matthew Henry (1662–1714)',
    style:    'Provide a rich devotional and practical commentary in the style of Matthew Henry. ' +
              'Emphasize the harmony of Scripture, the glory of Christ, practical piety, heartfelt ' +
              'application, and thorough verse-by-verse exposition. Warm, pastoral language. 3–4 paragraphs.',
  },
  {
    id:       'calvin',
    label:    "Calvin's Commentaries",
    bibliaId: 'calvin',
    persona:  'John Calvin (1509–1564)',
    style:    'Provide a commentary in the style of John Calvin. Emphasize the sovereignty of God, ' +
              'careful grammatical and historical exegesis, the plain meaning of Scripture, and Reformed ' +
              'theological insights. Engage with original Hebrew or Greek where relevant. 3–4 paragraphs.',
  },
  {
    id:       'gill',
    label:    "Gill's Exposition",
    bibliaId: 'gill',
    persona:  'John Gill (1697–1771)',
    style:    "Provide a commentary in the style of John Gill's Exposition of the Entire Bible. Include " +
              'lexical analysis of original Hebrew and Greek terms, Talmudic references where appropriate, ' +
              'careful attention to doctrinal implications, and thorough detailed exposition.',
  },
  {
    id:       'jfb',
    label:    'Jamieson-Fausset-Brown',
    bibliaId: 'jfb',
    persona:  'Jamieson, Fausset & Brown (1871)',
    style:    'Provide a commentary in the style of the Jamieson-Fausset-Brown Bible Commentary. ' +
              'Concise but informative, verse-by-verse critical and explanatory notes, original languages, ' +
              'historical background, and cross-references. Scholarly but accessible.',
  },
  {
    id:       'poole',
    label:    'Matthew Poole',
    bibliaId: 'poole',
    persona:  'Matthew Poole (1624–1679)',
    style:    "Provide a commentary in the style of Matthew Poole's Annotations upon the Holy Bible. " +
              'Thorough critical and practical exposition, noting different interpretations, engaging ' +
              'with textual difficulties, drawing out doctrinal and practical implications.',
  },
  {
    id:       'tyndale',
    label:    'Tyndale Study Notes',
    bibliaId: null,
    persona:  null,
    style:    null,
  },
  {
    id:       'ai',
    label:    'AI Commentary (Anthropic)',
    bibliaId: null,
    persona:  'Reformed biblical scholar',
    style:    'Provide a thorough scholarly Reformed commentary on this passage. Include the theological ' +
              'meaning, historical context, original language insights, cross-references to related ' +
              'Scripture, and pastoral application. 3–4 clear, substantive paragraphs.',
  },
];

function getCommentarySource(id) {
  return COMMENTARY_SOURCES.find(s => s.id === id) || COMMENTARY_SOURCES[0];
}

/* ── Main entry ───────────────────────────────────────────── */
function openStudy(key, text) {
  AppState.selectedKey  = key;
  AppState.selectedText = text;
  refreshStudyTab();
}

function setStudyTab(tab) {
  AppState.activeStudyTab = tab;
  document.querySelectorAll('.study-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tab)
  );
  /* Show/hide source bar only for commentary tab */
  const bar = document.getElementById('study-source-bar');
  if (bar) bar.style.display = tab === 'commentary' ? '' : 'none';
  refreshStudyTab();
}

function refreshStudyTab() {
  const tab = AppState.activeStudyTab;
  if      (tab === 'commentary') loadCommentary(AppState.selectedKey, AppState.selectedText);
  else if (tab === 'xrefs')      loadCrossRefs(AppState.selectedKey);
  else if (tab === 'strongs')    loadStrongs(AppState.selectedKey, AppState.selectedText);
  else if (tab === 'dict')       loadDictionary(null);
}

/* ── Commentary loader ────────────────────────────────────── */
async function loadCommentary(key, text) {
  const body = document.getElementById('study-body');
  if (!body) return;

  if (!key) {
    body.innerHTML = studyPlaceholderHTML();
    return;
  }

  /* Sync source selector */
  const sel = document.getElementById('commentary-source-select');
  if (sel) sel.value = AppState.commentarySource;

  body.innerHTML = spinnerHTML();
  const source    = getCommentarySource(AppState.commentarySource);
  const bibliaKey = AppState.settings.bibliaApiKey;
  const aiKey     = AppState.settings.anthropicApiKey;

  /* 1. Biblia API (real text) */
  if (source.bibliaId && bibliaKey) {
    try {
      const html = await fetchBibliaCommentary(source.bibliaId, key, bibliaKey);
      if (html) { body.innerHTML = commentaryBlock(source.label, key, html); return; }
    } catch(e) { /* fall through */ }
  }

  /* 2. Tyndale notes (free) */
  if (source.id === 'tyndale') {
    try {
      const html = await fetchTyndaleNotes(key);
      body.innerHTML = commentaryBlock('Tyndale Study Notes', key, html || '<p><em>No notes available for this verse.</em></p>');
      return;
    } catch(e) {
      body.innerHTML = '<div class="api-notice">Could not load Tyndale notes.</div>';
      return;
    }
  }

  /* 3. AI commentary */
  if (source.persona && aiKey) {
    try {
      const html = await fetchAICommentary(key, text, source);
      body.innerHTML = commentaryBlock(source.label, key, html);
      return;
    } catch(e) {
      body.innerHTML = `<div class="api-notice"><strong>AI commentary error:</strong> ${escapeHTML(e.message || 'Unknown error.')}</div>`;
      return;
    }
  }

  /* 4. No keys */
  body.innerHTML = noKeyNoticeHTML(source);
}

/* ── Biblia.com API ───────────────────────────────────────── */
async function fetchBibliaCommentary(bibliaId, verseKey, apiKey) {
  const parsed = parseVerseKey(verseKey);
  if (!parsed) return null;
  const ref = `${parsed.bookName}.${parsed.ch}.${parsed.v}`;
  const url = `https://api.biblia.com/v1/bible/content/${bibliaId}.html?passage=${encodeURIComponent(ref)}&key=${apiKey}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Biblia API error ${resp.status}`);
  const text = await resp.text();
  return text || null;
}

/* ── Tyndale notes ────────────────────────────────────────── */
async function fetchTyndaleNotes(verseKey) {
  const parsed = parseVerseKey(verseKey);
  if (!parsed) return null;
  const book = getBookByName(parsed.bookName);
  if (!book) return null;
  const url  = `https://bible.helloao.org/api/c/tyndale/${book.id}/${parsed.ch}.json`;
  const resp = await fetch(url);
  if (!resp.ok) return null;
  const data = await resp.json();
  const notes = data.notes || data;
  const vNotes = notes[String(parsed.v)] || notes[parsed.v];
  if (!vNotes) return null;
  if (Array.isArray(vNotes)) {
    return vNotes.map(n => `<p>${escapeHTML(typeof n === 'string' ? n : (n.text || ''))}</p>`).join('');
  }
  return `<p>${escapeHTML(typeof vNotes === 'string' ? vNotes : JSON.stringify(vNotes))}</p>`;
}

/* ── Anthropic AI ─────────────────────────────────────────── */
async function fetchAICommentary(verseKey, verseText, source) {
  const prompt =
    `You are ${source.persona}.\n\n` +
    source.style + '\n\n' +
    `Passage: ${verseKey}\n` +
    `"${verseText}"\n\n` +
    `Write your commentary:`;
  const resp = await callAnthropicAPI(prompt, 700);
  return resp.content[0].text.split(/\n\n+/).map(p => `<p>${escapeHTML(p.trim())}</p>`).join('');
}

async function callAnthropicAPI(prompt, maxTokens = 500) {
  const apiKey = AppState.settings.anthropicApiKey;
  if (!apiKey) throw new Error('No Anthropic API key configured.');
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':                           'application/json',
      'x-api-key':                              apiKey,
      'anthropic-version':                      '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model:      'claude-sonnet-4-6',
      max_tokens: maxTokens,
      messages:   [{ role: 'user', content: prompt }],
    }),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${resp.status}`);
  }
  return resp.json();
}

/* ── Cross-references ─────────────────────────────────────── */
async function loadCrossRefs(key) {
  const body = document.getElementById('study-body');
  if (!body) return;
  if (!key) { body.innerHTML = studyPlaceholderHTML(); return; }

  body.innerHTML = spinnerHTML();
  const parsed = parseVerseKey(key);
  if (!parsed) { body.innerHTML = '<div class="api-notice">Invalid reference.</div>'; return; }
  const book = getBookByName(parsed.bookName);
  if (!book)  { body.innerHTML = '<div class="api-notice">Book not found.</div>'; return; }

  try {
    const url  = `https://bible.helloao.org/api/d/open-cross-ref/${book.id}/${parsed.ch}.json`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Not found');
    const data = await resp.json();
    const raw  = data[String(parsed.v)] || data[parsed.v] || [];
    const refs = Array.isArray(raw) ? raw : (raw.refs || []);

    if (!refs.length) {
      body.innerHTML = `<div class="com-source">Cross-References</div><div class="api-notice">No cross-references found for ${key}.</div>`;
      return;
    }

    const limited = refs.slice(0, 15);
    const texts   = await Promise.allSettled(limited.map(r => fetchRefText(r)));

    let html = `<div class="com-source">Cross-References <span style="font-family:var(--font-ui);font-size:0.75em;color:var(--text-faint)">${refs.length} found</span></div><div class="xref-list">`;
    limited.forEach((ref, i) => {
      const refStr = formatRef(ref);
      const t      = texts[i].status === 'fulfilled' ? texts[i].value : '—';
      html += `
        <div class="xref-item" data-ref="${refStr}">
          <div class="xref-ref">${refStr}</div>
          <div class="xref-text">${escapeHTML(t)}</div>
        </div>
      `;
    });
    html += '</div>';
    body.innerHTML = html;
    body.querySelectorAll('.xref-item').forEach(el =>
      el.addEventListener('click', () => navToRef(el.dataset.ref))
    );
  } catch(e) {
    body.innerHTML = '<div class="api-notice">Could not load cross-references. Check your connection.</div>';
  }
}

async function fetchRefText(ref) {
  const refStr = formatRef(ref);
  const parts  = refStr.match(/^(.+?)\s+(\d+):(\d+)$/);
  if (!parts) return '';
  const book = getBookByName(parts[1]);
  if (!book) return '';
  try {
    const url  = `https://bible.helloao.org/api/${AppState.transId}/${book.id}/${parts[2]}.json`;
    const resp = await fetch(url);
    if (!resp.ok) return '';
    const data = await resp.json();
    const verses = data.verses || (data.chapter && data.chapter.verses) || [];
    const v = verses.find(vv => (vv.number ?? vv.verse) === parseInt(parts[3]));
    return v ? extractText(v.content || v.text || '').trim() : '';
  } catch(e) { return ''; }
}

function formatRef(ref) {
  if (typeof ref === 'string') {
    const parts = ref.split('.');
    if (parts.length >= 3) {
      const book = getBookById(parts[0]);
      if (book) return `${book.name} ${parts[1]}:${parts[2]}`;
    }
    return ref;
  }
  if (ref.book && ref.chapter && ref.verse) {
    const book = getBookById(ref.book) || getBookByName(ref.book);
    if (book) return `${book.name} ${ref.chapter}:${ref.verse}`;
  }
  return String(ref);
}

/* ── Strong's ─────────────────────────────────────────────── */
async function loadStrongs(key, text) {
  const body = document.getElementById('study-body');
  if (!body) return;
  if (!key || !text) { body.innerHTML = studyPlaceholderHTML(); return; }

  if (!AppState.settings.anthropicApiKey) {
    body.innerHTML = noKeyNoticeHTML({ id:'strongs', label:"Strong's Analysis" });
    return;
  }

  body.innerHTML = spinnerHTML();
  const prompt =
    `Analyze the verse "${key}: ${text}" for a Bible student.\n\n` +
    `For each significant word, provide:\n` +
    `1. English word\n2. Original Hebrew/Greek (transliterated)\n3. Strong's number (H#### or G####)\n4. Brief definition\n\n` +
    `Return ONLY a JSON array: [{"word":"...","original":"...","number":"...","definition":"..."}]`;

  try {
    const resp = await callAnthropicAPI(prompt, 700);
    let raw = resp.content[0].text.trim().replace(/^```[\w]*\n?/,'').replace(/\n?```$/,'');
    const entries = JSON.parse(raw);
    let html = `<div class="com-source">Strong's Concordance</div><div class="strongs-list">`;
    entries.forEach(e => {
      html += `
        <div class="strongs-entry">
          <div class="strongs-word">${escapeHTML(e.word)}</div>
          <div class="strongs-orig">${escapeHTML(e.original || '')}</div>
          <div class="strongs-num">${escapeHTML(e.number || '')}</div>
          <div class="strongs-def">${escapeHTML(e.definition || '')}</div>
        </div>
      `;
    });
    html += '</div>';
    body.innerHTML = html;
  } catch(e) {
    body.innerHTML = `<div class="api-notice">Could not load Strong's analysis. ${escapeHTML(e.message || '')}</div>`;
  }
}

/* ── Dictionary ───────────────────────────────────────────── */
async function loadDictionary(word) {
  const body = document.getElementById('study-body');
  if (!body) return;

  if (!word) {
    body.innerHTML = `
      <div class="com-source">Bible Dictionary</div>
      <div style="display:flex;gap:8px;margin:0 0 12px">
        <input id="dict-input" type="text" placeholder="Look up a word or topic…"
               style="flex:1;padding:7px 10px;font-size:0.86rem;border:1px solid var(--border);
                      border-radius:var(--radius);background:var(--bg-card);color:var(--text);outline:none">
        <button onclick="loadDictionary(document.getElementById('dict-input').value.trim())"
                class="btn-primary" style="font-size:0.78rem;padding:7px 12px">Look up</button>
      </div>
      ${AppState.selectedText ? `<div style="font-size:0.8rem;color:var(--text-faint);font-style:italic">Currently selected: <em>${escapeHTML(AppState.selectedKey || '')}</em></div>` : ''}
    `;
    const inp = document.getElementById('dict-input');
    if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') loadDictionary(inp.value.trim()); });
    return;
  }

  if (!AppState.settings.anthropicApiKey) {
    body.innerHTML = noKeyNoticeHTML({ id:'dict', label:'Bible Dictionary' });
    return;
  }

  body.innerHTML = spinnerHTML();
  const prompt =
    `You are a Reformed Bible dictionary. Write a thorough, scholarly entry for: "${word}"\n\n` +
    `Include: biblical meaning, Hebrew/Greek origins, key passages, Reformed theological significance.\n` +
    `Write 2–4 clear paragraphs. Be scholarly but accessible.`;

  try {
    const resp = await callAnthropicAPI(prompt, 600);
    const paragraphs = resp.content[0].text.split(/\n\n+/).map(p => `<p>${escapeHTML(p.trim())}</p>`).join('');
    body.innerHTML = `
      <div class="com-source">Bible Dictionary</div>
      <div style="font-family:var(--font-display);font-size:1rem;color:var(--text);margin-bottom:0.6rem">${escapeHTML(word)}</div>
      <div class="com-text">${paragraphs}</div>
    `;
  } catch(e) {
    body.innerHTML = `<div class="api-notice">Dictionary lookup failed. ${escapeHTML(e.message || '')}</div>`;
  }
}

/* ── Commentary Browser (Commentary section tab) ─────────── */
function renderCommentaryBrowser() {
  const container = document.getElementById('commentary-browser');
  if (!container) return;

  const currentRef = AppState.selectedKey
    ? AppState.selectedKey
    : (ALL_BOOKS[AppState.bookIdx]?.name + ' ' + AppState.chapter + ':1');

  container.innerHTML = `
    <div class="commentary-sources-grid">
      ${COMMENTARY_SOURCES.filter(s => s.id !== 'tyndale').map(s => `
        <div class="commentary-source-card" data-id="${s.id}">
          <div class="cs-card-title">${escapeHTML(s.label)}</div>
          <div class="cs-card-author">${escapeHTML(s.persona || 'Study Notes')}</div>
          <div class="cs-card-desc">${getSourceDesc(s.id)}</div>
        </div>
      `).join('')}
    </div>
    <div id="commentary-viewer" style="padding:1.5rem 1.75rem;max-width:760px;margin:0 auto;display:none">
      <div id="commentary-viewer-header" style="margin-bottom:1rem"></div>
      <div id="commentary-viewer-body" class="com-text"></div>
    </div>
  `;

  container.querySelectorAll('.commentary-source-card').forEach(card => {
    card.addEventListener('click', async () => {
      const id   = card.dataset.id;
      const src  = getCommentarySource(id);
      AppState.commentarySource = id;
      /* Switch to Bible section study pane */
      navigateTo('bible');
      AppState.studyOpen = true;
      document.getElementById('study-pane').classList.remove('collapsed');
      /* Set study tab to commentary */
      setStudyTab('commentary');
      /* Load for current verse or current chapter:1 */
      const key  = AppState.selectedKey || currentRef;
      const text = AppState.selectedText || '';
      openStudy(key, text);
    });
  });
}

function getSourceDesc(id) {
  const descs = {
    'matthew-henry': 'Warm devotional expositions with practical application. Complete, whole-Bible commentary.',
    'calvin':        'Rigorous exegesis from the father of the Reformed faith. Scholarly and theological.',
    'gill':          "Detailed lexical and doctrinal exposition covering the entire Bible. Highly detailed.",
    'jfb':           'Classic critical and explanatory notes. Concise scholarly commentary on every verse.',
    'poole':         'Thorough annotations noting different interpretations and doctrinal implications.',
    'ai':            'AI-generated commentary in the style of Reformed scholars using Anthropic Claude.',
  };
  return descs[id] || '';
}

/* ── HTML helpers ─────────────────────────────────────────── */
function commentaryBlock(sourceLabel, key, contentHtml) {
  return `
    <div class="com-block">
      <div class="com-source">${escapeHTML(sourceLabel)}</div>
      <div class="com-ref">${escapeHTML(key)}</div>
      <div class="com-text">${contentHtml}</div>
    </div>
  `;
}

function spinnerHTML() {
  return '<div class="spinner-wrap"><div class="spinner"></div></div>';
}

function studyPlaceholderHTML() {
  return `
    <div class="study-placeholder">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
      <p>Click any verse to see commentary, cross-references, and more.</p>
    </div>
  `;
}

function noKeyNoticeHTML(source) {
  const hasBiblia = !!AppState.settings.bibliaApiKey;
  const hasAI     = !!AppState.settings.anthropicApiKey;

  if (!hasBiblia && !hasAI) {
    return `
      <div class="api-notice">
        <strong>Enable Commentary</strong><br><br>
        To read <em>${escapeHTML(source.label)}</em>, add an API key in
        <a href="#" onclick="navigateTo('settings');return false">Settings</a>:<br><br>
        <strong>Biblia.com API key</strong> — Access the real texts of Calvin, Matthew Henry, Gill, JFB & Poole.
        <a href="https://biblia.com/api/signup" target="_blank">Free signup →</a><br><br>
        <strong>Anthropic API key</strong> — AI commentary in any scholar's style.
        <a href="https://console.anthropic.com" target="_blank">Get key →</a>
      </div>
    `;
  }
  if (!hasBiblia) {
    return `
      <div class="api-notice">
        To view the actual text of <em>${escapeHTML(source.label)}</em>, add a
        free <strong>Biblia.com API key</strong> in
        <a href="#" onclick="navigateTo('settings');return false">Settings</a>.
        <a href="https://biblia.com/api/signup" target="_blank">Free signup →</a>
      </div>
    `;
  }
  return `
    <div class="api-notice">
      Add an <strong>Anthropic API key</strong> in
      <a href="#" onclick="navigateTo('settings');return false">Settings</a>
      to enable AI commentary.
      <a href="https://console.anthropic.com" target="_blank">Get key →</a>
    </div>
  `;
}
