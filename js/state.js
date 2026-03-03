/* ══════════════════════════════════════════════════════════════════
   EXEGETE — State Management + LocalStorage Persistence
══════════════════════════════════════════════════════════════════ */

const LS = {
  HIGHLIGHTS:    'ex_hl',
  BOOKMARKS:     'ex_bm',
  NOTES:         'ex_no',
  SETTINGS:      'ex_settings',
  PLAN_PROGRESS: 'ex_plan_progress',
  LAST_POSITION: 'ex_last_pos',
};

const DEFAULT_SETTINGS = {
  theme:             'light',
  fontSize:          'medium',
  fontFamily:        'garamond',
  textSpacing:       'comfortable',
  defaultTranslation:'engKJV',
  defaultCommentary: 'matthew-henry',
  verseNumbers:      'inline',
  redLetter:         false,
  crossRefDisplay:   'panel',
  anthropicApiKey:   '',
  bibliaApiKey:      '',
};

const AppState = {
  /* ── Bible reader ── */
  bookIdx:        0,
  chapter:        1,
  transId:        'engKJV',
  translationAbbr:'KJV',
  verses:         [],

  /* ── Verse selection ── */
  selectedKey:    null,
  selectedText:   null,

  /* ── Study pane ── */
  studyOpen:      true,
  activeStudyTab: 'commentary',
  commentarySource: 'matthew-henry',

  /* ── Sidebar ── */
  sidebarOpen:    true,
  sidebarTab:     'books',
  testament:      'OT',

  /* ── Section routing ── */
  activeSection:  'bible',   // 'bible' | 'plans' | 'confessions' | 'settings'

  /* ── Active confession/plan ── */
  activeConfession: null,
  activePlan:       null,
  activePlanDay:    null,

  /* ── Persisted (loaded from localStorage) ── */
  highlights:    {},   // { 'Genesis 1:1': 'hl-yellow' }
  bookmarks:     {},   // { 'Genesis 1:1': true }
  notes:         {},   // { 'Genesis 1:1': 'note text' }
  settings:      { ...DEFAULT_SETTINGS },
  planProgress:  {},   // { planId: { startDate, completedDays:[] } }
};

/* ─────────────────────────────────
   Load all persisted state
───────────────────────────────── */
function loadState() {
  try {
    const hl = localStorage.getItem(LS.HIGHLIGHTS);
    if (hl) AppState.highlights = JSON.parse(hl);
  } catch(e) {}

  try {
    const bm = localStorage.getItem(LS.BOOKMARKS);
    if (bm) AppState.bookmarks = JSON.parse(bm);
  } catch(e) {}

  try {
    const no = localStorage.getItem(LS.NOTES);
    if (no) AppState.notes = JSON.parse(no);
  } catch(e) {}

  try {
    const st = localStorage.getItem(LS.SETTINGS);
    if (st) AppState.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(st) };
  } catch(e) {}

  try {
    const pp = localStorage.getItem(LS.PLAN_PROGRESS);
    if (pp) AppState.planProgress = JSON.parse(pp);
  } catch(e) {}

  try {
    const lp = localStorage.getItem(LS.LAST_POSITION);
    if (lp) {
      const pos = JSON.parse(lp);
      if (typeof pos.bookIdx === 'number') AppState.bookIdx = pos.bookIdx;
      if (typeof pos.chapter  === 'number') AppState.chapter  = pos.chapter;
    }
  } catch(e) {}

  /* Apply saved translation setting */
  const t = AppState.settings.defaultTranslation;
  AppState.transId = t;
  const match = TRANSLATIONS.find(tr => tr.id === t);
  AppState.translationAbbr = match ? match.abbr : 'KJV';

  /* Apply saved commentary source */
  AppState.commentarySource = AppState.settings.defaultCommentary || 'matthew-henry';
}

/* ─────────────────────────────────
   Individual save functions — call
   immediately after any mutation
───────────────────────────────── */
function saveHighlights() {
  try { localStorage.setItem(LS.HIGHLIGHTS, JSON.stringify(AppState.highlights)); } catch(e) {}
}

function saveBookmarks() {
  try { localStorage.setItem(LS.BOOKMARKS, JSON.stringify(AppState.bookmarks)); } catch(e) {}
}

function saveNotes() {
  try { localStorage.setItem(LS.NOTES, JSON.stringify(AppState.notes)); } catch(e) {}
}

function saveSettings() {
  try { localStorage.setItem(LS.SETTINGS, JSON.stringify(AppState.settings)); } catch(e) {}
}

function savePlanProgress() {
  try { localStorage.setItem(LS.PLAN_PROGRESS, JSON.stringify(AppState.planProgress)); } catch(e) {}
}

function saveLastPosition() {
  try {
    localStorage.setItem(LS.LAST_POSITION, JSON.stringify({
      bookIdx: AppState.bookIdx,
      chapter: AppState.chapter,
    }));
  } catch(e) {}
}

/* ─────────────────────────────────
   Clear all user data
───────────────────────────────── */
function resetAllData() {
  AppState.highlights  = {};
  AppState.bookmarks   = {};
  AppState.notes       = {};
  AppState.planProgress= {};
  Object.values(LS).forEach(k => { try { localStorage.removeItem(k); } catch(e) {} });
}
