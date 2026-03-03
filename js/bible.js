/* ══════════════════════════════════════════════════════════════════
   EXEGETE — Bible Data, API, and Reader
══════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────
   Translations
───────────────────────────────── */
const TRANSLATIONS = [
  { id: 'engKJV', abbr: 'KJV',  name: 'King James Version',           year: '1611' },
  { id: 'engWEB', abbr: 'WEB',  name: 'World English Bible',           year: '2000' },
  { id: 'engASV', abbr: 'ASV',  name: 'American Standard Version',     year: '1901' },
  { id: 'engYLT', abbr: 'YLT',  name: "Young's Literal Translation",   year: '1862' },
  { id: 'BSB',    abbr: 'BSB',  name: 'Berean Standard Bible',         year: '2020' },
  { id: 'engBBE', abbr: 'BBE',  name: 'Bible in Basic English',        year: '1965' },
];

/* ─────────────────────────────────
   Book Data — OT 39 + NT 27 = 66
───────────────────────────────── */
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
  {name:'1 Kings',       abbr:'1Ki',   id:'1KI', ch:22},
  {name:'2 Kings',       abbr:'2Ki',   id:'2KI', ch:25},
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
  {name:'Matthew',       abbr:'Matt',  id:'MAT', ch:28},
  {name:'Mark',          abbr:'Mark',  id:'MRK', ch:16},
  {name:'Luke',          abbr:'Luke',  id:'LUK', ch:24},
  {name:'John',          abbr:'John',  id:'JHN', ch:21},
  {name:'Acts',          abbr:'Acts',  id:'ACT', ch:28},
  {name:'Romans',        abbr:'Rom',   id:'ROM', ch:16},
  {name:'1 Corinthians', abbr:'1Cor',  id:'1CO', ch:16},
  {name:'2 Corinthians', abbr:'2Cor',  id:'2CO', ch:13},
  {name:'Galatians',     abbr:'Gal',   id:'GAL', ch:6 },
  {name:'Ephesians',     abbr:'Eph',   id:'EPH', ch:6 },
  {name:'Philippians',   abbr:'Phil',  id:'PHP', ch:4 },
  {name:'Colossians',    abbr:'Col',   id:'COL', ch:4 },
  {name:'1 Thessalonians',abbr:'1Thes',id:'1TH', ch:5 },
  {name:'2 Thessalonians',abbr:'2Thes',id:'2TH', ch:3 },
  {name:'1 Timothy',     abbr:'1Tim',  id:'1TI', ch:6 },
  {name:'2 Timothy',     abbr:'2Tim',  id:'2TI', ch:4 },
  {name:'Titus',         abbr:'Titus', id:'TIT', ch:3 },
  {name:'Philemon',      abbr:'Phm',   id:'PHM', ch:1 },
  {name:'Hebrews',       abbr:'Heb',   id:'HEB', ch:13},
  {name:'James',         abbr:'Jas',   id:'JAS', ch:5 },
  {name:'1 Peter',       abbr:'1Pet',  id:'1PE', ch:5 },
  {name:'2 Peter',       abbr:'2Pet',  id:'2PE', ch:3 },
  {name:'1 John',        abbr:'1John', id:'1JN', ch:5 },
  {name:'2 John',        abbr:'2John', id:'2JN', ch:1 },
  {name:'3 John',        abbr:'3John', id:'3JN', ch:1 },
  {name:'Jude',          abbr:'Jude',  id:'JUD', ch:1 },
  {name:'Revelation',    abbr:'Rev',   id:'REV', ch:22},
];

const ALL_BOOKS = [...OT_BOOKS, ...NT_BOOKS];

/* Lookup helpers */
function getBook(idx)          { return ALL_BOOKS[idx]; }
function getBookByName(name)   { return ALL_BOOKS.find(b => b.name === name || b.abbr === name); }
function getBookById(id)       { return ALL_BOOKS.find(b => b.id === id); }
function getBookIndexByName(n) { return ALL_BOOKS.findIndex(b => b.name === n || b.abbr === n); }

/* ─────────────────────────────────
   Verse key helpers
───────────────────────────────── */
function verseKey(bookName, ch, v)  { return `${bookName} ${ch}:${v}`; }

function parseVerseKey(key) {
  /* "Song of Solomon 3:1"  ->  {bookName, ch, v} */
  const m = key.match(/^(.+?)\s+(\d+):(\d+)$/);
  if (!m) return null;
  return { bookName: m[1], ch: parseInt(m[2]), v: parseInt(m[3]) };
}

function navToRef(refString) {
  /* Accepts "Genesis 1", "Genesis 1:1", "Gen 1", "Gen 1:1" */
  const m = refString.trim().match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
  if (!m) return;
  const book = getBookByName(m[1]);
  if (!book) return;
  const idx = getBookIndexByName(book.name);
  AppState.bookIdx = idx;
  AppState.chapter = parseInt(m[2]);
  AppState.testament = idx < 39 ? 'OT' : 'NT';
  loadChapter();
  /* Switch to bible section if not already there */
  if (AppState.activeSection !== 'bible') navigateTo('bible');
}

/* ─────────────────────────────────
   API — Fetch chapter text
───────────────────────────────── */
async function fetchChapterPrimary(transId, bookId, chapter) {
  const url = `https://bible.helloao.org/api/${transId}/${bookId}/${chapter}.json`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.json();
}

async function fetchChapterFallback(bookName, chapter, transAbbr) {
  const MAP = { KJV:'kjv', WEB:'web', ASV:'asv', YLT:'ylt', BBE:'bbe', BSB:'kjv' };
  const t = MAP[transAbbr] || 'kjv';
  const ref = encodeURIComponent(`${bookName} ${chapter}`);
  const url = `https://bible-api.com/${ref}?translation=${t}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.json();
}

/* ─────────────────────────────────
   Content extraction (helloao.org format)
───────────────────────────────── */
function extractText(content) {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content.map(extractText).join('');
  if (content.text) return content.text;
  if (content.content) return extractText(content.content);
  return '';
}

/* ─────────────────────────────────
   Load & render chapter
───────────────────────────────── */
async function loadChapter() {
  const book = ALL_BOOKS[AppState.bookIdx];
  if (!book) return;

  /* Clamp chapter */
  AppState.chapter = Math.max(1, Math.min(AppState.chapter, book.ch));

  /* Update UI immediately */
  const titleEl = document.getElementById('ch-title');
  if (titleEl) titleEl.textContent = `${book.name} ${AppState.chapter}`;

  const btn = document.getElementById('translation-btn');
  if (btn) btn.textContent = AppState.translationAbbr;

  /* Update sidebar active state */
  syncSidebar();
  saveLastPosition();

  /* Show loading */
  const inner = document.getElementById('reader-inner');
  if (!inner) return;
  inner.innerHTML = '<div class="loading-text">Loading…</div>';

  let parsed = null;
  let format = 'primary';

  try {
    const data = await fetchChapterPrimary(AppState.transId, book.id, AppState.chapter);
    if (data && data.verses) {
      parsed = data.verses;
    } else if (data && data.chapter && data.chapter.verses) {
      parsed = data.chapter.verses;
    }
  } catch(e) {
    /* Try fallback */
    try {
      const data = await fetchChapterFallback(book.name, AppState.chapter, AppState.translationAbbr);
      if (data && data.verses) {
        parsed = data.verses;
        format = 'fallback';
      }
    } catch(e2) {
      inner.innerHTML = '<div class="error-text">Could not load chapter. Please check your connection.</div>';
      return;
    }
  }

  if (!parsed || parsed.length === 0) {
    inner.innerHTML = '<div class="error-text">No verses found for this chapter.</div>';
    return;
  }

  AppState.verses = parsed;
  renderChapter(book, parsed, format);
}

function renderChapter(book, verses, format) {
  const inner = document.getElementById('reader-inner');
  if (!inner) return;

  const verseNumStyle = AppState.settings.verseNumbers || 'inline';

  /* Build heading */
  let html = `
    <div class="book-chapter-heading">
      <span class="book-title-main">${book.name}</span>
      <span class="book-chapter-num">Chapter ${AppState.chapter}</span>
    </div>
    <div class="chapter-ornament">✦</div>
  `;

  verses.forEach((v, i) => {
    const vNum   = v.number ?? v.verse ?? (i + 1);
    const rawText = format === 'fallback' ? (v.text || '') : extractText(v.content || v.text || '');
    const text   = rawText.trim();
    if (!text) return;

    const key = verseKey(book.name, AppState.chapter, vNum);
    const hl  = AppState.highlights[key] || '';
    const isBm = AppState.bookmarks[key] ? 'is-bookmarked' : '';
    const isSel = AppState.selectedKey === key ? 'selected' : '';
    const numClass = verseNumStyle === 'superscript' ? 'superscript-nums' :
                     verseNumStyle === 'hidden'       ? 'hide-nums' : '';

    html += `
      <div class="verse-block ${hl} ${isBm} ${isSel} ${numClass}"
           data-key="${key}" data-vnum="${vNum}">
        <span class="verse-num">${vNum}</span>
        <span class="verse-text">${escapeHTML(text)}</span>
      </div>
    `;
  });

  inner.innerHTML = html;
  attachVerseHandlers();
}

/* ─────────────────────────────────
   Verse interaction handlers
───────────────────────────────── */
let longPressTimer = null;

function attachVerseHandlers() {
  const blocks = document.querySelectorAll('.verse-block');

  blocks.forEach(el => {
    /* Desktop: click to select, right-click for menu */
    el.addEventListener('click', (e) => {
      if (e.target.closest('#verse-menu')) return;
      selectVerse(el);
    });

    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      selectVerse(el);
      showVerseMenu(e.clientX, e.clientY, el.dataset.key);
    });

    /* Mobile: long press */
    el.addEventListener('touchstart', (e) => {
      longPressTimer = setTimeout(() => {
        selectVerse(el);
        const t = e.touches[0];
        showVerseMenu(t.clientX, t.clientY, el.dataset.key);
      }, 600);
    }, { passive: true });

    el.addEventListener('touchend',  () => clearTimeout(longPressTimer));
    el.addEventListener('touchmove', () => clearTimeout(longPressTimer));
  });
}

function selectVerse(el) {
  /* Deselect previous */
  document.querySelectorAll('.verse-block.selected').forEach(b => b.classList.remove('selected'));

  el.classList.add('selected');
  const key = el.dataset.key;
  const text = el.querySelector('.verse-text').textContent.trim();
  AppState.selectedKey  = key;
  AppState.selectedText = text;

  /* Open study pane with this verse */
  if (AppState.studyOpen) {
    openStudy(key, text);
  }
}

/* ─────────────────────────────────
   Navigation
───────────────────────────────── */
function prevChapter() {
  const book = ALL_BOOKS[AppState.bookIdx];
  if (AppState.chapter > 1) {
    AppState.chapter--;
    loadChapter();
  } else if (AppState.bookIdx > 0) {
    AppState.bookIdx--;
    AppState.chapter = ALL_BOOKS[AppState.bookIdx].ch;
    AppState.testament = AppState.bookIdx < 39 ? 'OT' : 'NT';
    loadChapter();
  }
}

function nextChapter() {
  const book = ALL_BOOKS[AppState.bookIdx];
  if (AppState.chapter < book.ch) {
    AppState.chapter++;
    loadChapter();
  } else if (AppState.bookIdx < 65) {
    AppState.bookIdx++;
    AppState.chapter = 1;
    AppState.testament = AppState.bookIdx < 39 ? 'OT' : 'NT';
    loadChapter();
  }
}

function goToBook(idx, ch) {
  AppState.bookIdx  = idx;
  AppState.chapter  = ch || 1;
  AppState.testament = idx < 39 ? 'OT' : 'NT';
  /* Close mobile sidebar */
  closeMobileSidebar();
  loadChapter();
}

/* ─────────────────────────────────
   Sidebar — book list
───────────────────────────────── */
function renderBookList() {
  const container = document.getElementById('books-scroll');
  if (!container) return;

  const books = AppState.testament === 'OT' ? OT_BOOKS : NT_BOOKS;
  const offset = AppState.testament === 'OT' ? 0 : 39;

  let html = '';
  books.forEach((book, i) => {
    const idx = i + offset;
    const active = idx === AppState.bookIdx ? 'active' : '';

    /* Build chapter grid */
    let chHtml = '<div class="ch-grid">';
    for (let c = 1; c <= book.ch; c++) {
      const ca = (idx === AppState.bookIdx && c === AppState.chapter) ? 'active' : '';
      chHtml += `<div class="ch-num ${ca}" data-book="${idx}" data-ch="${c}">${c}</div>`;
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

  /* Attach events */
  container.querySelectorAll('.book-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('ch-num')) return;
      const idx = parseInt(el.dataset.idx);
      /* Toggle flyout */
      const wasOpen = el.classList.contains('flyout-open');
      container.querySelectorAll('.book-item.flyout-open').forEach(b => b.classList.remove('flyout-open'));
      if (!wasOpen) el.classList.add('flyout-open');
    });
  });

  container.querySelectorAll('.ch-num').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      goToBook(parseInt(el.dataset.book), parseInt(el.dataset.ch));
    });
  });

  /* Sync OT/NT buttons */
  document.querySelectorAll('.ts-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.t === AppState.testament);
  });
}

function syncSidebar() {
  renderBookList();
  renderNotesList();
  renderBmList();
}

/* ─────────────────────────────────
   Notes & Bookmarks lists
───────────────────────────────── */
function renderNotesList() {
  const el = document.getElementById('notes-list');
  if (!el) return;
  const entries = Object.entries(AppState.notes);
  if (!entries.length) {
    el.innerHTML = '<div class="empty-state"><p>No notes yet.<br>Right-click a verse to add one.</p></div>';
    return;
  }
  el.innerHTML = entries.map(([key, text]) => `
    <div class="note-card" data-key="${key}">
      <div class="card-ref">${key}</div>
      <div class="card-text">${escapeHTML(text)}</div>
    </div>
  `).join('');
  el.querySelectorAll('.note-card').forEach(c => {
    c.addEventListener('click', () => navToRef(c.dataset.key.replace(/:.*/, '')));
  });
}

function renderBmList() {
  const el = document.getElementById('bm-list');
  if (!el) return;
  const entries = Object.keys(AppState.bookmarks);
  if (!entries.length) {
    el.innerHTML = '<div class="empty-state"><p>No bookmarks yet.<br>Right-click a verse to bookmark it.</p></div>';
    return;
  }
  el.innerHTML = entries.map(key => `
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
      loadChapter();
    });
  });
}

/* ─────────────────────────────────
   Verse Context Menu
───────────────────────────────── */
function showVerseMenu(x, y, key) {
  const menu = document.getElementById('verse-menu');
  if (!menu) return;

  menu.dataset.key = key;

  const parsed = parseVerseKey(key);
  const refText = parsed ? key : key;
  menu.querySelector('.vmenu-ref').textContent = refText;

  menu.classList.add('visible');

  /* Position smartly */
  const mw = 210, mh = 280;
  const vw = window.innerWidth, vh = window.innerHeight;
  let cx = x, cy = y;
  if (cx + mw > vw - 10) cx = vw - mw - 10;
  if (cy + mh > vh - 10) cy = vh - mh - 10;
  if (cx < 10) cx = 10;
  if (cy < 10) cy = 10;
  menu.style.left = cx + 'px';
  menu.style.top  = cy + 'px';
}

function closeVerseMenu() {
  const menu = document.getElementById('verse-menu');
  if (menu) menu.classList.remove('visible');
}

function applyHighlight(cls) {
  const menu = document.getElementById('verse-menu');
  if (!menu) return;
  const key = menu.dataset.key;
  if (!key) return;

  const el = document.querySelector(`.verse-block[data-key="${key}"]`);
  if (!el) return;

  const HLS = ['hl-yellow','hl-blue','hl-green','hl-pink'];
  const current = AppState.highlights[key];

  if (current === cls) {
    /* Toggle off */
    el.classList.remove(cls);
    delete AppState.highlights[key];
  } else {
    HLS.forEach(h => el.classList.remove(h));
    el.classList.add(cls);
    AppState.highlights[key] = cls;
  }
  saveHighlights();
  closeVerseMenu();
}

function toggleBookmark() {
  const menu = document.getElementById('verse-menu');
  if (!menu) return;
  const key = menu.dataset.key;
  if (!key) return;

  const el = document.querySelector(`.verse-block[data-key="${key}"]`);

  if (AppState.bookmarks[key]) {
    delete AppState.bookmarks[key];
    if (el) el.classList.remove('is-bookmarked');
  } else {
    AppState.bookmarks[key] = true;
    if (el) el.classList.add('is-bookmarked');
  }
  saveBookmarks();
  renderBmList();
  closeVerseMenu();
}

function copyVerse() {
  const menu = document.getElementById('verse-menu');
  if (!menu) return;
  const key = menu.dataset.key;
  const el = document.querySelector(`.verse-block[data-key="${key}"] .verse-text`);
  if (!el) return;
  const text = `${key} — ${el.textContent.trim()}`;
  navigator.clipboard.writeText(text).catch(() => {});
  closeVerseMenu();
}

/* ─────────────────────────────────
   Note modal
───────────────────────────────── */
function openNoteModal(key) {
  const modal = document.getElementById('note-modal');
  if (!modal) return;
  modal.dataset.key = key;

  const verseEl = document.querySelector(`.verse-block[data-key="${key}"] .verse-text`);
  const preview = modal.querySelector('.note-verse-preview');
  if (preview && verseEl) {
    preview.textContent = `${key} — ${verseEl.textContent.trim().substring(0, 120)}…`;
  }

  const ta = document.getElementById('note-textarea');
  if (ta) ta.value = AppState.notes[key] || '';

  modal.classList.add('open');
  if (ta) ta.focus();
  closeVerseMenu();
}

function saveNote() {
  const modal = document.getElementById('note-modal');
  if (!modal) return;
  const key = modal.dataset.key;
  const ta = document.getElementById('note-textarea');
  if (!ta || !key) return;

  const text = ta.value.trim();
  if (text) {
    AppState.notes[key] = text;
  } else {
    delete AppState.notes[key];
  }
  saveNotes();
  renderNotesList();
  modal.classList.remove('open');
}

/* ─────────────────────────────────
   Search
───────────────────────────────── */
let searchTimeout = null;

function openSearch() {
  const modal = document.getElementById('search-modal');
  if (!modal) return;
  modal.classList.add('open');
  const input = document.getElementById('search-input');
  if (input) { input.value = ''; input.focus(); }
  document.getElementById('search-results').innerHTML = '';
}

async function doSearch(q) {
  if (!q || q.length < 2) return;
  const results = document.getElementById('search-results');
  if (!results) return;
  results.innerHTML = '<div class="loading-text">Searching…</div>';

  const MAP = { KJV:'kjv', WEB:'web', ASV:'asv', YLT:'ylt', BBE:'bbe', BSB:'kjv' };
  const t = MAP[AppState.translationAbbr] || 'kjv';
  const url = `https://bible-api.com/?q=${encodeURIComponent(q)}&translation=${t}`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data.verses || !data.verses.length) {
      results.innerHTML = '<div class="loading-text">No results found.</div>';
      return;
    }

    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'gi');
    results.innerHTML = data.verses.slice(0, 30).map(v => {
      const highlighted = escapeHTML(v.text).replace(re, m => `<mark>${m}</mark>`);
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
    results.innerHTML = '<div class="error-text">Search failed. Check your connection.</div>';
  }
}

/* ─────────────────────────────────
   Translation picker
───────────────────────────────── */
function openTransModal() {
  const modal = document.getElementById('trans-modal');
  if (!modal) return;

  const list = modal.querySelector('.trans-list');
  if (list) {
    list.innerHTML = TRANSLATIONS.map(t => `
      <div class="trans-item ${t.id === AppState.transId ? 'active' : ''}" data-id="${t.id}" data-abbr="${t.abbr}">
        <span class="trans-abbr">${t.abbr}</span>
        <span class="trans-name">${t.name} <span style="color:var(--text-faint);font-size:0.78em">(${t.year})</span></span>
      </div>
    `).join('');

    list.querySelectorAll('.trans-item').forEach(el => {
      el.addEventListener('click', () => {
        AppState.transId         = el.dataset.id;
        AppState.translationAbbr = el.dataset.abbr;
        modal.classList.remove('open');
        loadChapter();
      });
    });
  }

  modal.classList.add('open');
}

/* ─────────────────────────────────
   Sidebar tab switching
───────────────────────────────── */
function activateSidebarTab(name) {
  AppState.sidebarTab = name;
  document.querySelectorAll('.sidebar-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === name);
  });
  document.querySelectorAll('.sidebar-panel').forEach(p => {
    p.classList.toggle('active', p.dataset.panel === name);
  });
}

/* ─────────────────────────────────
   Mobile sidebar helpers
───────────────────────────────── */
function openMobileSidebar() {
  document.getElementById('book-sidebar').classList.add('mobile-open');
  document.getElementById('mobile-backdrop').classList.add('visible');
}

function closeMobileSidebar() {
  document.getElementById('book-sidebar').classList.remove('mobile-open');
  checkBackdrop();
}

function toggleStudyPane() {
  AppState.studyOpen = !AppState.studyOpen;
  const pane = document.getElementById('study-pane');
  if (!pane) return;
  if (window.innerWidth <= 768) {
    pane.classList.toggle('mobile-open', AppState.studyOpen);
    document.getElementById('mobile-backdrop').classList.toggle('visible', AppState.studyOpen);
  } else {
    pane.classList.toggle('collapsed', !AppState.studyOpen);
  }
}

function checkBackdrop() {
  const anyOpen =
    document.getElementById('book-sidebar').classList.contains('mobile-open') ||
    document.getElementById('study-pane').classList.contains('mobile-open');
  document.getElementById('mobile-backdrop').classList.toggle('visible', anyOpen);
}

/* ─────────────────────────────────
   Utility
───────────────────────────────── */
function escapeHTML(str) {
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}
