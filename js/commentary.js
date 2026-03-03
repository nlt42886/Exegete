/* ══════════════════════════════════════════════════════════════════
   EXEGETE — Study Pane: Commentary, Cross-References, Strong's, Dictionary

   Commentary Sources:
   1. Biblia.com API  — real public-domain texts (Calvin, Matthew Henry,
                         Gill, JFB, Poole) — requires free Biblia API key
   2. Tyndale Notes   — free, no key, via helloao.org
   3. Anthropic Claude — AI commentary in scholar's style (fallback when
                         Biblia key not set, or for AI tab)
══════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────
   Commentary source registry
   bibliaId = Biblia.com content ID
───────────────────────────────── */
const COMMENTARY_SOURCES = [
  {
    id:        'matthew-henry',
    label:     'Matthew Henry',
    bibliaId:  'mhc',
    aiPersona: 'Matthew Henry (1662–1714)',
    aiStyle:   'Provide a rich devotional and practical commentary in the style of Matthew Henry. ' +
               'Emphasize the harmony of Old and New Testaments, the glory of Christ in all Scripture, ' +
               'practical piety, heartfelt applications, and thorough verse-by-verse exposition. ' +
               'Use warm, pastoral language. Write 3–4 substantial paragraphs.',
  },
  {
    id:        'calvin',
    label:     "Calvin's Commentaries",
    bibliaId:  'calvin',
    aiPersona: 'John Calvin (1509–1564)',
    aiStyle:   'Provide a commentary in the style of John Calvin. Emphasize the sovereignty of God, ' +
               'careful grammatical and historical exegesis, faithful adherence to the plain meaning of ' +
               'Scripture, and Reformed theological insights. Engage with the original Hebrew or Greek ' +
               'where relevant. Be scholarly but clear. Write 3–4 substantive paragraphs.',
  },
  {
    id:        'gill',
    label:     "Gill's Exposition",
    bibliaId:  'gill',
    aiPersona: 'John Gill (1697–1771)',
    aiStyle:   'Provide a commentary in the style of John Gill\'s "Exposition of the Entire Bible." ' +
               'Include extensive lexical analysis of original Hebrew and Greek terms, Talmudic and ' +
               'Rabbinical references where appropriate, careful attention to doctrinal implications, ' +
               'and thorough, detailed exposition. Be meticulous and thorough.',
  },
  {
    id:        'jfb',
    label:     'Jamieson-Fausset-Brown',
    bibliaId:  'jfb',
    aiPersona: 'Jamieson, Fausset & Brown (1871)',
    aiStyle:   'Provide a commentary in the style of the Jamieson-Fausset-Brown Bible Commentary. ' +
               'Be concise but informative, providing critical and explanatory notes verse-by-verse, ' +
               'attending to the original languages, historical background, and cross-references. ' +
               'Write in a scholarly but accessible tone.',
  },
  {
    id:        'poole',
    label:     'Matthew Poole',
    bibliaId:  'poole',
    aiPersona: 'Matthew Poole (1624–1679)',
    aiStyle:   'Provide a commentary in the style of Matthew Poole\'s "Synopsis Criticorum" / "Annotations." ' +
               'Offer a thorough critical and practical exposition, noting different interpretations, ' +
               'engaging with the text\'s difficulties, and drawing out doctrinal and practical implications. ' +
               'Be scholarly and precise.',
  },
  {
    id:        'tyndale',
    label:     'Tyndale Study Notes',
    bibliaId:  null,
    aiPersona: null,
    aiStyle:   null,
  },
  {
    id:        'ai',
    label:     'AI Commentary',
    bibliaId:  null,
    aiPersona: 'Reformed exegete',
    aiStyle:   'Provide a thorough scholarly Reformed commentary on this passage. Include the theological ' +
               'meaning, historical context, original language insights, cross-references to related ' +
               'Scripture, and pastoral application. Write in a clear, scholarly tone. 3–4 paragraphs.',
  },
];

function getCommentarySource(id) {
  return COMMENTARY_SOURCES.find(s => s.id === id) || COMMENTARY_SOURCES[0];
}

/* ─────────────────────────────────
   Main entry — open study pane
───────────────────────────────── */
function openStudy(key, text) {
  AppState.selectedKey  = key;
  AppState.selectedText = text;
  refreshStudyTab();
}

function refreshStudyTab() {
  const tab = AppState.activeStudyTab;
  if      (tab === 'commentary')  loadCommentary(AppState.selectedKey, AppState.selectedText);
  else if (tab === 'crossrefs')   loadCrossRefs(AppState.selectedKey);
  else if (tab === 'strongs')     loadStrongs(AppState.selectedKey, AppState.selectedText);
  else if (tab === 'dictionary')  loadDictionary(null);
}

function setStudyTab(tab) {
  AppState.activeStudyTab = tab;
  document.querySelectorAll('.study-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  refreshStudyTab();
}

/* ─────────────────────────────────
   Commentary loader
───────────────────────────────── */
async function loadCommentary(key, text) {
  const body = document.getElementById('study-body');
  if (!body) return;

  if (!key) {
    body.innerHTML = studyPlaceholder();
    return;
  }

  /* Update source selector UI */
  const sel = document.getElementById('commentary-source-select');
  if (sel) sel.value = AppState.commentarySource;

  body.innerHTML = spinnerHTML();

  const source = getCommentarySource(AppState.commentarySource);

  /* Try Biblia API first (real text) */
  const bibliaKey = AppState.settings.bibliaApiKey;
  if (source.bibliaId && bibliaKey) {
    try {
      const html = await fetchBibliaCommentary(source.bibliaId, key, bibliaKey);
      if (html) {
        body.innerHTML = renderCommentaryBlock(source.label, key, html);
        return;
      }
    } catch(e) { /* fall through */ }
  }

  /* Tyndale notes (free, no key) */
  if (source.id === 'tyndale') {
    try {
      const html = await fetchTyndaleNotes(key);
      body.innerHTML = renderCommentaryBlock('Tyndale Study Notes', key, html || '<p><em>No notes for this verse.</em></p>');
      return;
    } catch(e) {
      body.innerHTML = '<div class="error-text">Could not load study notes.</div>';
      return;
    }
  }

  /* AI Commentary via Anthropic */
  const aiKey = AppState.settings.anthropicApiKey;
  if (source.aiPersona && aiKey) {
    try {
      const html = await fetchAICommentary(key, text, source);
      body.innerHTML = renderCommentaryBlock(source.label, key, html);
      return;
    } catch(e) {
      body.innerHTML = `<div class="error-text">${escapeHTML(e.message || 'AI commentary failed.')}</div>`;
      return;
    }
  }

  /* No keys configured */
  body.innerHTML = noKeyNotice(source);
}

/* ─────────────────────────────────
   Biblia.com API — REAL commentary text
   Free key: https://biblia.com/api/signup
   Endpoint: https://api.biblia.com/v1/bible/content/{ID}.html
───────────────────────────────── */
async function fetchBibliaCommentary(bibliaId, verseKey, apiKey) {
  const parsed = parseVerseKey(verseKey);
  if (!parsed) return null;
  /* Biblia reference format: "Genesis.1.1" */
  const ref = `${parsed.bookName}.${parsed.ch}.${parsed.v}`;
  const url = `https://api.biblia.com/v1/bible/content/${bibliaId}.html?passage=${encodeURIComponent(ref)}&key=${apiKey}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Biblia API error ${resp.status}`);
  const text = await resp.text();
  return text || null;
}

/* ─────────────────────────────────
   Tyndale Notes — free via helloao.org
───────────────────────────────── */
async function fetchTyndaleNotes(verseKey) {
  const parsed = parseVerseKey(verseKey);
  if (!parsed) return null;
  const book = getBookByName(parsed.bookName);
  if (!book) return null;

  const url = `https://bible.helloao.org/api/c/tyndale/${book.id}/${parsed.ch}.json`;
  const resp = await fetch(url);
  if (!resp.ok) return null;
  const data = await resp.json();

  /* Find notes for this verse */
  const notes = data.notes || data;
  const vNotes = notes[String(parsed.v)] || notes[parsed.v];
  if (!vNotes) return null;

  if (Array.isArray(vNotes)) {
    return vNotes.map(n => `<p>${escapeHTML(typeof n === 'string' ? n : (n.text || ''))}</p>`).join('');
  }
  return `<p>${escapeHTML(typeof vNotes === 'string' ? vNotes : JSON.stringify(vNotes))}</p>`;
}

/* ─────────────────────────────────
   Anthropic AI Commentary
   FIXED: includes all required headers
───────────────────────────────── */
async function fetchAICommentary(verseKey, verseText, source) {
  const apiKey = AppState.settings.anthropicApiKey;
  if (!apiKey) throw new Error('No Anthropic API key configured.');

  const prompt =
    `You are ${source.aiPersona}.\n\n` +
    source.aiStyle + '\n\n' +
    `Passage: ${verseKey}\n` +
    `Text: "${verseText}"\n\n` +
    `Write your commentary now:`;

  const resp = await callAnthropicAPI(prompt, 600);
  const raw = resp.content[0].text;

  /* Convert plain text paragraphs to HTML */
  return raw.split(/\n\n+/).map(p => `<p>${escapeHTML(p.trim())}</p>`).join('');
}

/* ─────────────────────────────────
   Core Anthropic API call
   All three required headers are included
───────────────────────────────── */
async function callAnthropicAPI(prompt, maxTokens = 500) {
  const apiKey = AppState.settings.anthropicApiKey;
  if (!apiKey) throw new Error('No Anthropic API key.');

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

/* ─────────────────────────────────
   Cross-References
───────────────────────────────── */
async function loadCrossRefs(key) {
  const body = document.getElementById('study-body');
  if (!body) return;

  if (!key) { body.innerHTML = studyPlaceholder(); return; }

  body.innerHTML = spinnerHTML();
  const parsed = parseVerseKey(key);
  if (!parsed) { body.innerHTML = '<div class="error-text">Invalid reference.</div>'; return; }

  const book = getBookByName(parsed.bookName);
  if (!book) { body.innerHTML = '<div class="error-text">Book not found.</div>'; return; }

  try {
    const url = `https://bible.helloao.org/api/d/open-cross-ref/${book.id}/${parsed.ch}.json`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Not found');
    const data = await resp.json();

    const verseRefs = data[String(parsed.v)] || data[parsed.v] || [];
    const refs = Array.isArray(verseRefs) ? verseRefs : (verseRefs.refs || []);

    if (!refs.length) {
      body.innerHTML = '<div class="loading-text">No cross-references found for this verse.</div>';
      return;
    }

    /* Fetch text for each ref (up to 15) */
    const limited = refs.slice(0, 15);
    const texts = await Promise.allSettled(limited.map(r => fetchRefText(r)));

    let html = `
      <div class="com-source">Cross-References <span style="color:var(--text-faint);font-size:0.85em;font-family:var(--font-ui);letter-spacing:0">${refs.length} found</span></div>
      <div class="xref-list">
    `;
    limited.forEach((ref, i) => {
      const refStr = formatRef(ref);
      const t = texts[i].status === 'fulfilled' ? texts[i].value : '—';
      html += `
        <div class="xref-item" data-ref="${refStr}">
          <div class="xref-ref">${refStr}</div>
          <div class="xref-text">${escapeHTML(t)}</div>
        </div>
      `;
    });
    html += '</div>';
    body.innerHTML = html;

    body.querySelectorAll('.xref-item').forEach(el => {
      el.addEventListener('click', () => navToRef(el.dataset.ref));
    });

  } catch(e) {
    body.innerHTML = '<div class="error-text">Could not load cross-references.</div>';
  }
}

async function fetchRefText(ref) {
  const refStr = formatRef(ref);
  const parts = refStr.match(/^(.+?)\s+(\d+):(\d+)$/);
  if (!parts) return '';
  const book = getBookByName(parts[1]);
  if (!book) return '';
  try {
    const url = `https://bible.helloao.org/api/${AppState.transId}/${book.id}/${parts[2]}.json`;
    const resp = await fetch(url);
    if (!resp.ok) return '';
    const data = await resp.json();
    const verses = data.verses || (data.chapter && data.chapter.verses) || [];
    const v = verses.find(vv => (vv.number ?? vv.verse) === parseInt(parts[3]));
    return v ? extractText(v.content || v.text || '').trim() : '';
  } catch(e) { return ''; }
}

function formatRef(ref) {
  /* ref may be a string like "GEN.1.1" or an object {book, chapter, verse} */
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

/* ─────────────────────────────────
   Strong's Numbers
───────────────────────────────── */
async function loadStrongs(key, text) {
  const body = document.getElementById('study-body');
  if (!body) return;

  if (!key || !text) { body.innerHTML = studyPlaceholder(); return; }

  const aiKey = AppState.settings.anthropicApiKey;
  if (!aiKey) {
    body.innerHTML = noKeyNotice({ id: 'strongs', label: "Strong's Analysis" });
    return;
  }

  body.innerHTML = spinnerHTML();

  const prompt =
    `Analyze the verse "${key}: ${text}" for a Bible student studying the original languages.\n\n` +
    `For each significant word, provide:\n` +
    `1. The English word\n` +
    `2. The original Hebrew or Greek word (transliterated)\n` +
    `3. The Strong's number (e.g., H1254 or G3056)\n` +
    `4. A brief definition (1-2 sentences)\n\n` +
    `Format your response as a JSON array like this:\n` +
    `[{"word":"created","original":"bara","number":"H1254","definition":"To create, to bring into existence..."}]\n` +
    `Return only the JSON array, nothing else.`;

  try {
    const resp = await callAnthropicAPI(prompt, 600);
    let raw = resp.content[0].text.trim();
    /* Strip any markdown code blocks */
    raw = raw.replace(/^```[\w]*\n?/,'').replace(/\n?```$/,'');
    const entries = JSON.parse(raw);

    let html = '<div class="com-source">Strong\'s Concordance</div><div class="strongs-list">';
    entries.forEach(e => {
      html += `
        <div class="strongs-entry">
          <div class="strongs-word">${escapeHTML(e.word)}</div>
          <div class="strongs-orig">${escapeHTML(e.original)}</div>
          <div class="strongs-num">${escapeHTML(e.number)}</div>
          <div class="strongs-def">${escapeHTML(e.definition)}</div>
        </div>
      `;
    });
    html += '</div>';
    body.innerHTML = html;
  } catch(e) {
    body.innerHTML = '<div class="error-text">Could not load Strong\'s analysis.</div>';
  }
}

/* ─────────────────────────────────
   Dictionary
───────────────────────────────── */
async function loadDictionary(word) {
  const body = document.getElementById('study-body');
  if (!body) return;

  /* If no word, show search UI */
  if (!word) {
    body.innerHTML = `
      <div class="com-source">Bible Dictionary</div>
      <div style="display:flex;gap:8px;margin-bottom:16px">
        <input id="dict-input" type="text" placeholder="Enter a word or topic…"
               style="flex:1;padding:7px 10px;font-size:0.88rem;border-radius:5px">
        <button onclick="loadDictionary(document.getElementById('dict-input').value)"
                class="btn-primary" style="padding:7px 14px;font-size:0.82rem">Look up</button>
      </div>
      ${AppState.selectedText ? `<div class="loading-text" style="font-style:italic;font-size:0.85rem">Or click a word in the verse you selected.</div>` : ''}
    `;
    const inp = document.getElementById('dict-input');
    if (inp) inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') loadDictionary(inp.value);
    });
    return;
  }

  if (!word.trim()) return;

  const aiKey = AppState.settings.anthropicApiKey;
  if (!aiKey) {
    body.innerHTML = noKeyNotice({ id: 'dict', label: 'Bible Dictionary' });
    return;
  }

  body.innerHTML = spinnerHTML();

  const prompt =
    `You are a Reformed Bible dictionary. Provide a thorough, scholarly dictionary entry for the term: "${word}"\n\n` +
    `Include:\n` +
    `- The word's meaning in biblical usage\n` +
    `- Hebrew or Greek origins (if applicable)\n` +
    `- Key biblical passages where it appears\n` +
    `- Theological significance from a Reformed perspective\n\n` +
    `Write 2-4 clear paragraphs. Be scholarly but accessible.`;

  try {
    const resp = await callAnthropicAPI(prompt, 500);
    const raw = resp.content[0].text;
    const paragraphs = raw.split(/\n\n+/).map(p => `<p>${escapeHTML(p.trim())}</p>`).join('');

    body.innerHTML = `
      <div class="com-source">Bible Dictionary</div>
      <div class="dict-entry">
        <div class="dict-word">${escapeHTML(word)}</div>
        <div class="dict-def">${paragraphs}</div>
      </div>
    `;
  } catch(e) {
    body.innerHTML = '<div class="error-text">Could not load dictionary entry.</div>';
  }
}

/* ─────────────────────────────────
   Render helpers
───────────────────────────────── */
function renderCommentaryBlock(sourceLabel, key, contentHtml) {
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

function studyPlaceholder() {
  return `
    <div class="study-placeholder">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
      <h3>Study Tools</h3>
      <p>Click any verse to see commentary, cross-references, and word studies.</p>
    </div>
  `;
}

function noKeyNotice(source) {
  const hasBiblia = !!AppState.settings.bibliaApiKey;
  const hasAI     = !!AppState.settings.anthropicApiKey;

  if (!hasBiblia && !hasAI) {
    return `
      <div class="api-key-notice">
        <strong>Enable Commentary</strong><br><br>
        To view <em>${escapeHTML(source.label)}</em>, add one or both API keys in
        <a href="#" onclick="navigateTo('settings');return false">Settings</a>:<br><br>
        <strong>• Biblia.com API key</strong> — Get the <em>real text</em> of Calvin,
        Matthew Henry, Gill, JFB, and Poole.
        <a href="https://biblia.com/api/signup" target="_blank">Free signup →</a><br><br>
        <strong>• Anthropic API key</strong> — AI-powered commentary in any scholar's style.
        <a href="https://console.anthropic.com" target="_blank">Get key →</a>
      </div>
    `;
  }

  if (!hasBiblia) {
    return `
      <div class="api-key-notice">
        To view the <em>actual text</em> of ${escapeHTML(source.label)}, add a
        free <strong>Biblia.com API key</strong> in
        <a href="#" onclick="navigateTo('settings');return false">Settings</a>.
        <a href="https://biblia.com/api/signup" target="_blank">Sign up free →</a>
      </div>
    `;
  }

  return `
    <div class="api-key-notice">
      Add an <strong>Anthropic API key</strong> in
      <a href="#" onclick="navigateTo('settings');return false">Settings</a>
      to enable AI commentary.
      <a href="https://console.anthropic.com" target="_blank">Get key →</a>
    </div>
  `;
}
