/* ══════════════════════════════════════════════════════════════
   EXEGETE — Bible Data, API Fetching, Reader, Navigation
══════════════════════════════════════════════════════════════ */

/* ── Translations ─────────────────────────────────────────── */
const TRANSLATIONS = [
  { id:'engKJV', abbr:'KJV', name:'King James Version',         year:'1611' },
  { id:'engWEB', abbr:'WEB', name:'World English Bible',        year:'2000' },
  { id:'engASV', abbr:'ASV', name:'American Standard Version',  year:'1901' },
  { id:'engYLT', abbr:'YLT', name:"Young's Literal Translation",year:'1862' },
  { id:'BSB',    abbr:'BSB', name:'Berean Standard Bible',      year:'2020' },
  { id:'engBBE', abbr:'BBE', name:'Bible in Basic English',     year:'1965' },
];

/* ── Book Data ────────────────────────────────────────────── */
const OT_BOOKS = [
  {name:'Genesis',       abbr:'Gen',   id:'GEN', ch:50},
  {name:'Exodus',        abbr:'Ex',    id:'EXO', ch:40},
  {name:'Leviticus',     abbr:'Lev',   id:'LEV', ch:27},
  {name:'Numbers',       abbr:'Num',   id:'NUM', ch:36},
  {name:'Deuteronomy',   abbr:'Deut',  id:'DEU', ch:34},
  {name:'Joshua',        abbr:'Josh',  id:'JOS', ch:24},
  {name:'Judges',        abbr:'Judg',  id:'JDG', ch:21},
  {name:'Ruth',          abbr:'Ruth',  id:'RUT', ch:4 },
  {name:'1 Samuel',      abbr:'1Sam',  id:'1SA', ch:31},
  {name:'2 Samuel',      abbr:'2Sam',  id:'2SA', ch:24},
  {name:'1 Kings',       abbr:'1Kgs',  id:'1KI', ch:22},
  {name:'2 Kings',       abbr:'2Kgs',  id:'2KI', ch:25},
  {name:'1 Chronicles',  abbr:'1Chr',  id:'1CH', ch:29},
  {name:'2 Chronicles',  abbr:'2Chr',  id:'2CH', ch:36},
  {name:'Ezra',          abbr:'Ezra',  id:'EZR', ch:10},
  {name:'Nehemiah',      abbr:'Neh',   id:'NEH', ch:13},
  {name:'Esther',        abbr:'Est',   id:'EST', ch:10},
  {name:'Job',           abbr:'Job',   id:'JOB', ch:42},
  {name:'Psalms',        abbr:'Ps',    id:'PSA', ch:150},
  {name:'Proverbs',      abbr:'Prov',  id:'PRO', ch:31},
  {name:'Ecclesiastes',  abbr:'Eccl',  id:'ECC', ch:12},
  {name:'Song of Solomon',abbr:'Song', id:'SNG', ch:8 },
  {name:'Isaiah',        abbr:'Isa',   id:'ISA', ch:66},
  {name:'Jeremiah',      abbr:'Jer',   id:'JER', ch:52},
  {name:'Lamentations',  abbr:'Lam',   id:'LAM', ch:5 },
  {name:'Ezekiel',       abbr:'Ezek',  id:'EZK', ch:48},
  {name:'Daniel',        abbr:'Dan',   id:'DAN', ch:12},
  {name:'Hosea',         abbr:'Hos',   id:'HOS', ch:14},
  {name:'Joel',          abbr:'Joel',  id:'JOL', ch:3 },
  {name:'Amos',          abbr:'Amos',  id:'AMO', ch:9 },
  {name:'Obadiah',       abbr:'Obad',  id:'OBA', ch:1 },
  {name:'Jonah',         abbr:'Jon',   id:'JON', ch:4 },
  {name:'Micah',         abbr:'Mic',   id:'MIC', ch:7 },
  {name:'Nahum',         abbr:'Nah',   id:'NAH', ch:3 },
  {name:'Habakkuk',      abbr:'Hab',   id:'HAB', ch:3 },
  {name:'Zephaniah',     abbr:'Zeph',  id:'ZEP', ch:3 },
  {name:'Haggai',        abbr:'Hag',   id:'HAG', ch:2 },
  {name:'Zechariah',     abbr:'Zech',  id:'ZEC', ch:14},
  {name:'Malachi',       abbr:'Mal',   id:'MAL', ch:4 },
];

const NT_BOOKS = [
  {name:'Matthew',        abbr:'Matt',  id:'MAT', ch:28},
  {name:'Mark',           abbr:'Mark',  id:'MRK', ch:16},
  {name:'Luke',           abbr:'Luke',  id:'LUK', ch:24},
  {name:'John',           abbr:'John',  id:'JHN', ch:21},
  {name:'Acts',           abbr:'Acts',  id:'ACT', ch:28},
  {name:'Romans',         abbr:'Rom',   id:'ROM', ch:16},
  {name:'1 Corinthians',  abbr:'1Cor',  id:'1CO', ch:16},
  {name:'2 Corinthians',  abbr:'2Cor',  id:'2CO', ch:13},
  {name:'Galatians',      abbr:'Gal',   id:'GAL', ch:6 },
  {name:'Ephesians',      abbr:'Eph',   id:'EPH', ch:6 },
  {name:'Philippians',    abbr:'Phil',  id:'PHP', ch:4 },
  {name:'Colossians',     abbr:'Col',   id:'COL', ch:4 },
  {name:'1 Thessalonians',abbr:'1Thes', id:'1TH', ch:5 },
  {name:'2 Thessalonians',abbr:'2Thes', id:'2TH', ch:3 },
  {name:'1 Timothy',      abbr:'1Tim',  id:'1TI', ch:6 },
  {name:'2 Timothy',      abbr:'2Tim',  id:'2TI', ch:4 },
  {name:'Titus',          abbr:'Titus', id:'TIT', ch:3 },
  {name:'Philemon',       abbr:'Phm',   id:'PHM', ch:1 },
  {name:'Hebrews',        abbr:'Heb',   id:'HEB', ch:13},
  {name:'James',          abbr:'Jas',   id:'JAS', ch:5 },
  {name:'1 Peter',        abbr:'1Pet',  id:'1PE', ch:5 },
  {name:'2 Peter',        abbr:'2Pet',  id:'2PE', ch:3 },
  {name:'1 John',         abbr:'1Jn',   id:'1JN', ch:5 },
  {name:'2 John',         abbr:'2Jn',   id:'2JN', ch:1 },
  {name:'3 John',         abbr:'3Jn',   id:'3JN', ch:1 },
  {name:'Jude',           abbr:'Jude',  id:'JUD', ch:1 },
  {name:'Revelation',     abbr:'Rev',   id:'REV', ch:22},
];

const ALL_BOOKS = [...OT_BOOKS, ...NT_BOOKS];

/* ── Lookup helpers ───────────────────────────────────────── */
function getBook(idx)          { return ALL_BOOKS[idx]; }
function getBookByName(name)   { return ALL_BOOKS.find(b => b.name === name || b.abbr === name); }
function getBookById(id)       { return ALL_BOOKS.find(b => b.id === id); }
function getBookIndexByName(n) { return ALL_BOOKS.findIndex(b => b.name === n || b.abbr === n); }

/* ── Verse key utilities ──────────────────────────────────── */
function makeVerseKey(bookName, ch, v)  { return `${bookName} ${ch}:${v}`; }

function parseVerseKey(key) {
  const m = key.match(/^(.+?)\s+(\d+):(\d+)$/);
  if (!m) return null;
  return { bookName: m[1], ch: parseInt(m[2]), v: parseInt(m[3]) };
}

function navToRef(refString) {
  const m = refString.trim().match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
  if (!m) return;
  const book = getBookByName(m[1]);
  if (!book) return;
  const idx = getBookIndexByName(book.name);
  AppState.bookIdx  = idx;
  AppState.chapter  = parseInt(m[2]);
  AppState.testament = idx < 39 ? 'OT' : 'NT';
  syncTestamentButtons();
  loadChapter();
  if (AppState.activeSection !== 'bible') navigateTo('bible');
}

/* ── API — fetch chapter ──────────────────────────────────── */
async function fetchChapter(transId, bookId, chapter) {
  const url = `https://bible.helloao.org/api/${transId}/${bookId}/${chapter}.json`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.json();
}

async function fetchChapterFallback(bookName, chapter, transAbbr) {
  const MAP = { KJV:'kjv', WEB:'web', ASV:'asv', YLT:'ylt', BBE:'bbe', BSB:'web' };
  const t = MAP[transAbbr] || 'kjv';
  const ref = encodeURIComponent(`${bookName} ${chapter}`);
  const url = `https://bible-api.com/${ref}?translation=${t}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.json();
}

/* ── Text extraction (helloao format) ────────────────────── */
function extractText(content) {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content.map(extractText).join('');
  if (content.text) return content.text;
  if (content.content) return extractText(content.content);
  return '';
}

/* ── Load & render chapter ────────────────────────────────── */
async function loadChapter() {
  const book = ALL_BOOKS[AppState.bookIdx];
  if (!book) return;

  AppState.chapter = Math.max(1, Math.min(AppState.chapter, book.ch));

  /* Update topbar title */
  const titleBtn = document.getElementById('ch-title');
  if (titleBtn) titleBtn.textContent = `${book.name} ${AppState.chapter}`;

  /* Update translation button */
  const transBtn = document.getElementById('trans-btn');
  if (transBtn) transBtn.textContent = AppState.translationAbbr;

  saveLastPosition();
  renderBookList();

  /* Show spinner */
  const inner = document.getElementById('reader-inner');
  if (!inner) return;
  inner.innerHTML = '<div class="loading-indicator"><div class="spinner"></div></div>';

  let verses = null;
  let format = 'primary';

  try {
    const data = await fetchChapter(AppState.transId, book.id, AppState.chapter);
    verses = data.verses || (data.chapter && data.chapter.verses) || null;
  } catch(e) {
    try {
      const data = await fetchChapterFallback(book.name, AppState.chapter, AppState.translationAbbr);
      verses = data.verses || null;
      format = 'fallback';
    } catch(e2) {
      inner.innerHTML = `<div class="error-msg">
        <strong>Could not load scripture.</strong><br>
        Please check your internet connection and try again.
      </div>`;
      return;
    }
  }

  if (!verses || verses.length === 0) {
    inner.innerHTML = '<div class="error-msg">No verses found for this chapter.</div>';
    return;
  }

  AppState.verses = verses;
  renderChapter(book, verses, format);
}

function renderChapter(book, verses, format) {
  const inner = document.getElementById('reader-inner');
  if (!inner) return;

  const vNumStyle = AppState.settings.verseNumbers || 'inline';

  let html = `
    <div class="ch-heading">
      <div class="ch-heading-book">${escapeHTML(book.name)}</div>
      <div class="ch-heading-num">Chapter ${AppState.chapter}</div>
    </div>
  `;

  verses.forEach((v, i) => {
    const vNum = v.number ?? v.verse ?? (i + 1);
    const raw  = format === 'fallback'
      ? (v.text || '')
      : extractText(v.content || v.text || '');
    const text = raw.trim();
    if (!text) return;

    const key  = makeVerseKey(book.name, AppState.chapter, vNum);
    const hl   = AppState.highlights[key] || '';
    const bm   = AppState.bookmarks[key]  ? 'is-bookmarked' : '';
    const sel  = AppState.selectedKey === key ? 'selected' : '';
    const numCls = vNumStyle === 'superscript' ? 'sup-nums'  :
                   vNumStyle === 'hidden'       ? 'hide-nums' : '';

    html += `
      <div class="verse-block ${hl} ${bm} ${sel} ${numCls}"
           data-key="${key}" data-vnum="${vNum}">
        <span class="verse-num">${vNum}</span>
        <span class="verse-text">${escapeHTML(text)}</span>
        ${bm ? '<span class="bm-dot"></span>' : ''}
      </div>
    `;
  });

  inner.innerHTML = html;
  inner.classList.add('fade-in');
  attachVerseHandlers();
}

/* ── Verse interaction ────────────────────────────────────── */
let _longPressTimer = null;

function attachVerseHandlers() {
  document.querySelectorAll('.verse-block').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.closest('.verse-menu')) return;
      selectVerse(el);
    });

    el.addEventListener('contextmenu', e => {
      e.preventDefault();
      selectVerse(el);
      showVerseMenu(e.clientX, e.clientY, el.dataset.key);
    });

    el.addEventListener('touchstart', e => {
      _longPressTimer = setTimeout(() => {
        selectVerse(el);
        const t = e.touches[0];
        showVerseMenu(t.clientX, t.clientY, el.dataset.key);
      }, 600);
    }, { passive: true });

    el.addEventListener('touchend',  () => clearTimeout(_longPressTimer));
    el.addEventListener('touchmove', () => clearTimeout(_longPressTimer));
  });
}

function selectVerse(el) {
  document.querySelectorAll('.verse-block.selected').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');

  const key  = el.dataset.key;
  const text = el.querySelector('.verse-text')?.textContent.trim() || '';
  AppState.selectedKey  = key;
  AppState.selectedText = text;

  if (AppState.studyOpen) {
    openStudy(key, text);
  }
}

/* ── Chapter navigation ───────────────────────────────────── */
function prevChapter() {
  const book = ALL_BOOKS[AppState.bookIdx];
  if (AppState.chapter > 1) {
    AppState.chapter--;
  } else if (AppState.bookIdx > 0) {
    AppState.bookIdx--;
    AppState.chapter = ALL_BOOKS[AppState.bookIdx].ch;
    AppState.testament = AppState.bookIdx < 39 ? 'OT' : 'NT';
    syncTestamentButtons();
  }
  loadChapter();
}

function nextChapter() {
  const book = ALL_BOOKS[AppState.bookIdx];
  if (AppState.chapter < book.ch) {
    AppState.chapter++;
  } else if (AppState.bookIdx < 65) {
    AppState.bookIdx++;
    AppState.chapter = 1;
    AppState.testament = AppState.bookIdx < 39 ? 'OT' : 'NT';
    syncTestamentButtons();
  }
  loadChapter();
}

function goToBook(idx, ch) {
  AppState.bookIdx  = idx;
  AppState.chapter  = ch || 1;
  AppState.testament = idx < 39 ? 'OT' : 'NT';
  syncTestamentButtons();
  /* Close mobile sidebar */
  document.getElementById('book-sidebar').classList.remove('mobile-open');
  document.getElementById('mobile-backdrop').classList.remove('visible');
  loadChapter();
}

function syncTestamentButtons() {
  document.querySelectorAll('.ts-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.t === AppState.testament)
  );
}

/* ── Book list (sidebar) ──────────────────────────────────── */
function renderBookList() {
  const container = document.getElementById('books-scroll');
  if (!container) return;

  const books  = AppState.testament === 'OT' ? OT_BOOKS : NT_BOOKS;
  const offset = AppState.testament === 'OT' ? 0 : 39;

  let html = '';
  books.forEach((book, i) => {
    const idx    = i + offset;
    const active = idx === AppState.bookIdx ? 'active' : '';
    let chHtml = '<div class="ch-grid">';
    for (let c = 1; c <= book.ch; c++) {
      const ca = (idx === AppState.bookIdx && c === AppState.chapter) ? 'active' : '';
      chHtml += `<button class="ch-num ${ca}" data-book="${idx}" data-ch="${c}">${c}</button>`;
    }
    chHtml += '</div>';

    html += `
      <div class="book-item ${active}" data-idx="${idx}">
        <span class="book-abbr">${book.abbr}</span>
        <span class="book-name">${book.name}</span>
        <span class="book-ch-count">${book.ch}</span>
        <div class="ch-flyout">
          <div class="ch-flyout-title">${book.name}</div>
          ${chHtml}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  /* Book click → ch 1 */
  container.querySelectorAll('.book-item').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.classList.contains('ch-num')) return;
      goToBook(parseInt(el.dataset.idx), 1);
    });
  });

  /* Chapter click */
  container.querySelectorAll('.ch-num').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      goToBook(parseInt(btn.dataset.book), parseInt(btn.dataset.ch));
    });
  });

  /* Sync testament buttons */
  syncTestamentButtons();

  /* Scroll active book into view */
  const activeEl = container.querySelector('.book-item.active');
  if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
}

/* ── Notes / Bookmarks lists ──────────────────────────────── */
function renderNotesList() {
  const el = document.getElementById('notes-list');
  if (!el) return;
  const entries = Object.entries(AppState.notes);
  if (!entries.length) {
    el.innerHTML = '<div class="empty-state">No notes yet.<br>Right-click a verse to add one.</div>';
    return;
  }
  el.innerHTML = entries.map(([key, text]) => `
    <div class="note-card" data-key="${key}">
      <div class="card-ref">${key}</div>
      <div class="card-text">${escapeHTML(text)}</div>
    </div>
  `).join('');
  el.querySelectorAll('.note-card').forEach(c => {
    c.addEventListener('click', () => {
      const ref = c.dataset.key.replace(/:.*/, '');
      navToRef(c.dataset.key);
    });
  });
}

function renderBmList() {
  const el = document.getElementById('bm-list');
  if (!el) return;
  const keys = Object.keys(AppState.bookmarks).filter(k => AppState.bookmarks[k]);
  if (!keys.length) {
    el.innerHTML = '<div class="empty-state">No bookmarks yet.<br>Right-click a verse to bookmark it.</div>';
    return;
  }
  el.innerHTML = keys.map(key => `
    <div class="bm-card" data-key="${key}">
      <div class="card-ref">${key}</div>
    </div>
  `).join('');
  el.querySelectorAll('.bm-card').forEach(c => {
    c.addEventListener('click', () => {
      const parsed = parseVerseKey(c.dataset.key);
      if (!parsed) return;
      const idx = getBookIndexByName(parsed.bookName);
      if (idx < 0) return;
      AppState.bookIdx = idx;
      AppState.chapter = parsed.ch;
      AppState.testament = idx < 39 ? 'OT' : 'NT';
      syncTestamentButtons();
      loadChapter();
    });
  });
}

/* ── Verse context menu ───────────────────────────────────── */
function showVerseMenu(x, y, key) {
  const menu = document.getElementById('verse-menu');
  if (!menu) return;
  menu.dataset.key = key;
  document.getElementById('vmenu-ref').textContent = key;

  const mw = 195, mh = 280;
  const vw = window.innerWidth, vh = window.innerHeight;
  let cx = Math.min(x, vw - mw - 8);
  let cy = Math.min(y, vh - mh - 8);
  cx = Math.max(cx, 8);
  cy = Math.max(cy, 8);
  menu.style.left = cx + 'px';
  menu.style.top  = cy + 'px';
  menu.classList.add('visible');
}

function closeVerseMenu() {
  document.getElementById('verse-menu')?.classList.remove('visible');
}

/* ── Highlight / Bookmark / Note / Copy ──────────────────── */
function applyHighlight(key, cls) {
  const el = document.querySelector(`.verse-block[data-key="${key}"]`);
  if (!el) return;
  const HLS = ['hl-yellow','hl-blue','hl-green','hl-pink'];
  HLS.forEach(h => el.classList.remove(h));
  if (cls && AppState.highlights[key] !== cls) {
    el.classList.add(cls);
    AppState.highlights[key] = cls;
  } else {
    delete AppState.highlights[key];
  }
  saveHighlights();
}

function toggleBookmark(key) {
  const el = document.querySelector(`.verse-block[data-key="${key}"]`);
  if (AppState.bookmarks[key]) {
    delete AppState.bookmarks[key];
    if (el) { el.classList.remove('is-bookmarked'); el.querySelector('.bm-dot')?.remove(); }
  } else {
    AppState.bookmarks[key] = true;
    if (el) {
      el.classList.add('is-bookmarked');
      if (!el.querySelector('.bm-dot')) {
        const dot = document.createElement('span');
        dot.className = 'bm-dot';
        el.appendChild(dot);
      }
    }
  }
  saveBookmarks();
  renderBmList();
}

function openNoteModal(key) {
  const modal = document.getElementById('note-modal');
  if (!modal) return;
  modal.dataset.key = key;

  const verseEl = document.querySelector(`.verse-block[data-key="${key}"] .verse-text`);
  const preview = document.getElementById('note-verse-preview');
  if (preview) {
    const snippet = verseEl ? verseEl.textContent.trim().substring(0, 110) + '…' : '';
    preview.textContent = `${key} — ${snippet}`;
  }

  const ta = document.getElementById('note-textarea');
  if (ta) ta.value = AppState.notes[key] || '';

  modal.classList.add('open');
  if (ta) ta.focus();
}

function saveNote() {
  const modal = document.getElementById('note-modal');
  if (!modal) return;
  const key = modal.dataset.key;
  const ta  = document.getElementById('note-textarea');
  if (!ta || !key) return;
  const text = ta.value.trim();
  if (text) AppState.notes[key] = text;
  else delete AppState.notes[key];
  saveNotes();
  renderNotesList();
  modal.classList.remove('open');
}

function deleteNote() {
  const modal = document.getElementById('note-modal');
  if (!modal) return;
  const key = modal.dataset.key;
  if (key) { delete AppState.notes[key]; saveNotes(); renderNotesList(); }
  modal.classList.remove('open');
}

function copyVerse(key) {
  const el = document.querySelector(`.verse-block[data-key="${key}"] .verse-text`);
  if (!el) return;
  const text = `${key} — ${el.textContent.trim()} (${AppState.translationAbbr})`;
  navigator.clipboard.writeText(text).catch(() => {
    /* Fallback */
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

/* ── Translation picker ───────────────────────────────────── */
function openTransModal() {
  const modal = document.getElementById('trans-modal');
  if (!modal) return;
  const list = document.getElementById('trans-list');
  if (list) {
    list.innerHTML = TRANSLATIONS.map(t => `
      <div class="trans-item ${t.id === AppState.transId ? 'active' : ''}"
           data-id="${t.id}" data-abbr="${t.abbr}">
        <span class="trans-abbr">${t.abbr}</span>
        <span class="trans-name">${t.name}</span>
        <span class="trans-year">${t.year}</span>
        ${t.id === AppState.transId ? '<span class="trans-check">✓</span>' : ''}
      </div>
    `).join('');
    list.querySelectorAll('.trans-item').forEach(el => {
      el.addEventListener('click', () => {
        AppState.transId          = el.dataset.id;
        AppState.translationAbbr  = el.dataset.abbr;
        modal.classList.remove('open');
        loadChapter();
      });
    });
  }
  modal.classList.add('open');
}

/* ── Search ───────────────────────────────────────────────── */
async function doSearch(q) {
  const results = document.getElementById('search-results');
  if (!results) return;
  if (!q || q.length < 2) {
    results.innerHTML = '<div class="search-hint">Type at least 2 characters to search</div>';
    return;
  }

  results.innerHTML = '<div class="search-hint"><div class="spinner" style="margin:0 auto"></div></div>';

  const MAP = { KJV:'kjv', WEB:'web', ASV:'asv', YLT:'ylt', BBE:'bbe', BSB:'web' };
  const t   = MAP[AppState.translationAbbr] || 'kjv';

  try {
    const resp = await fetch(`https://bible-api.com/${encodeURIComponent(q)}?translation=${t}`);
    const data = await resp.json();
    if (!data.verses || !data.verses.length) {
      results.innerHTML = '<div class="search-hint">No results found.</div>';
      return;
    }
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'gi');
    results.innerHTML = data.verses.slice(0, 35).map(v => {
      const highlighted = escapeHTML(v.text || '').replace(re, m => `<mark>${m}</mark>`);
      return `
        <div class="search-result" data-ref="${v.book_name} ${v.chapter}:${v.verse}">
          <div class="search-result-ref">${v.book_name} ${v.chapter}:${v.verse}</div>
          <div class="search-result-text">${highlighted}</div>
        </div>
      `;
    }).join('');
    results.querySelectorAll('.search-result').forEach(el => {
      el.addEventListener('click', () => {
        navToRef(el.dataset.ref);
        document.getElementById('search-modal').classList.remove('open');
      });
    });
  } catch(e) {
    results.innerHTML = '<div class="search-hint">Search failed. Check your connection.</div>';
  }
}

/* ── Utility ──────────────────────────────────────────────── */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
