/* ══════════════════════════════════════════════════════════════
   EXEGETE — State Management + LocalStorage Persistence
══════════════════════════════════════════════════════════════ */

const LS = {
  HIGHLIGHTS:    'ex_hl',
  BOOKMARKS:     'ex_bm',
  NOTES:         'ex_no',
  SETTINGS:      'ex_settings',
  PLAN_PROGRESS: 'ex_plan',
  LAST_POSITION: 'ex_pos',
};

const DEFAULT_SETTINGS = {
  theme:              'light',
  fontSize:           'medium',
  fontFamily:         'garamond',
  textSpacing:        'comfortable',
  defaultTranslation: 'engKJV',
  defaultCommentary:  'matthew-henry',
  verseNumbers:       'inline',
  redLetter:          false,
  anthropicApiKey:    '',
  bibliaApiKey:       '',
};

const AppState = {
  /* Bible reader */
  bookIdx:           0,
  chapter:           1,
  transId:           'engKJV',
  translationAbbr:   'KJV',
  testament:         'OT',
  verses:            [],

  /* Verse selection */
  selectedKey:       null,
  selectedText:      null,

  /* Study pane */
  studyOpen:         true,
  activeStudyTab:    'commentary',
  commentarySource:  'matthew-henry',

  /* Sidebar */
  sidebarOpen:       true,

  /* Navigation */
  activeSection:     'bible',

  /* Persisted */
  highlights:        {},
  bookmarks:         {},
  notes:             {},
  settings:          { ...DEFAULT_SETTINGS },
  planProgress:      {},
};

/* ── Load all persisted state ─────────────────────────────── */
function loadState() {
  function tryParse(key) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch(e) { return null; }
  }

  const hl = tryParse(LS.HIGHLIGHTS);  if (hl) AppState.highlights   = hl;
  const bm = tryParse(LS.BOOKMARKS);   if (bm) AppState.bookmarks    = bm;
  const no = tryParse(LS.NOTES);       if (no) AppState.notes        = no;
  const pp = tryParse(LS.PLAN_PROGRESS); if (pp) AppState.planProgress = pp;

  const st = tryParse(LS.SETTINGS);
  if (st) AppState.settings = { ...DEFAULT_SETTINGS, ...st };

  const pos = tryParse(LS.LAST_POSITION);
  if (pos) {
    if (typeof pos.bookIdx === 'number') AppState.bookIdx  = pos.bookIdx;
    if (typeof pos.chapter  === 'number') AppState.chapter = pos.chapter;
  }

  /* Apply saved translation */
  const t = AppState.settings.defaultTranslation;
  AppState.transId = t;
  const match = TRANSLATIONS.find(tr => tr.id === t);
  AppState.translationAbbr = match ? match.abbr : 'KJV';

  /* Apply saved commentary */
  AppState.commentarySource = AppState.settings.defaultCommentary || 'matthew-henry';

  /* Testament from bookIdx */
  AppState.testament = AppState.bookIdx < 39 ? 'OT' : 'NT';
}

/* ── Save functions ───────────────────────────────────────── */
function saveHighlights()  { _save(LS.HIGHLIGHTS,    AppState.highlights); }
function saveBookmarks()   { _save(LS.BOOKMARKS,     AppState.bookmarks); }
function saveNotes()       { _save(LS.NOTES,         AppState.notes); }
function saveSettings()    { _save(LS.SETTINGS,      AppState.settings); }
function savePlanProgress(){ _save(LS.PLAN_PROGRESS, AppState.planProgress); }
function saveLastPosition(){ _save(LS.LAST_POSITION, { bookIdx: AppState.bookIdx, chapter: AppState.chapter }); }

function _save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch(e) {}
}

/* ── Reset user data ──────────────────────────────────────── */
function resetAllData() {
  AppState.highlights  = {};
  AppState.bookmarks   = {};
  AppState.notes       = {};
  AppState.planProgress= {};
  Object.values(LS).forEach(k => { try { localStorage.removeItem(k); } catch(e) {} });
}
