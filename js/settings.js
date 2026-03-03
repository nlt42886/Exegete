/* ══════════════════════════════════════════════════════════════════
   EXEGETE — Settings Page
══════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────
   Apply all saved settings to DOM
───────────────────────────────── */
function applyAllSettings() {
  const s = AppState.settings;

  /* Theme */
  const theme = s.theme || 'light';
  document.documentElement.dataset.theme = theme === 'light' ? '' : theme;

  /* Font size */
  document.documentElement.dataset.fontsize = s.fontSize || 'medium';

  /* Font family */
  document.documentElement.dataset.fontfamily = s.fontFamily || 'garamond';

  /* Text spacing */
  document.documentElement.dataset.spacing = s.textSpacing || 'comfortable';

  /* Red letter */
  document.documentElement.dataset.redletter = s.redLetter ? 'true' : 'false';

  /* Verse numbers */
  applyVerseNumbers(s.verseNumbers || 'inline');
}

function applyTheme(theme) {
  AppState.settings.theme = theme;
  document.documentElement.dataset.theme = theme === 'light' ? '' : theme;
  saveSettings();
  /* Update swatch active state */
  document.querySelectorAll('.theme-swatch').forEach(s => {
    s.classList.toggle('active', s.dataset.theme === theme);
  });
}

function applyFontSize(size) {
  AppState.settings.fontSize = size;
  document.documentElement.dataset.fontsize = size;
  saveSettings();
}

function applyFontFamily(family) {
  AppState.settings.fontFamily = family;
  document.documentElement.dataset.fontfamily = family;
  saveSettings();
}

function applySpacing(spacing) {
  AppState.settings.textSpacing = spacing;
  document.documentElement.dataset.spacing = spacing;
  saveSettings();
}

function applyVerseNumbers(style) {
  AppState.settings.verseNumbers = style;
  /* Re-render if bible is visible */
  const blocks = document.querySelectorAll('.verse-block');
  blocks.forEach(b => {
    b.classList.remove('hide-nums', 'superscript-nums');
    if (style === 'hidden')      b.classList.add('hide-nums');
    if (style === 'superscript') b.classList.add('superscript-nums');
  });
  saveSettings();
}

function applyRedLetter(on) {
  AppState.settings.redLetter = on;
  document.documentElement.dataset.redletter = on ? 'true' : 'false';
  saveSettings();
}

/* ─────────────────────────────────
   Render settings page HTML
───────────────────────────────── */
function renderSettingsPage() {
  const main = document.getElementById('settings-content');
  if (!main) return;

  const s = AppState.settings;

  main.innerHTML = `
    <div class="settings-page">
      <div class="settings-page-title">Settings</div>
      <div class="settings-page-sub">Customize your study environment. All changes apply instantly.</div>

      <!-- APPEARANCE -->
      <div class="settings-group">
        <div class="settings-group-title">Appearance</div>

        <div class="setting-row">
          <div class="setting-label">
            <div class="setting-label-text">Color Theme</div>
            <div class="setting-label-desc">Choose the overall look of the app</div>
          </div>
          <div class="setting-control">
            <div class="theme-swatches">
              <div class="theme-swatch swatch-light ${s.theme === 'light' ? 'active' : ''}"
                   data-theme="light" onclick="applyTheme('light')" title="Reformed Light"></div>
              <div class="theme-swatch swatch-sepia ${s.theme === 'sepia' ? 'active' : ''}"
                   data-theme="sepia" onclick="applyTheme('sepia')" title="Sepia"></div>
              <div class="theme-swatch swatch-dark ${s.theme === 'dark' ? 'active' : ''}"
                   data-theme="dark" onclick="applyTheme('dark')" title="Dark Night"></div>
            </div>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-label">
            <div class="setting-label-text">Font Size</div>
            <div class="setting-label-desc">Verse text size</div>
          </div>
          <div class="setting-control">
            <div class="pill-group">
              ${['small','medium','large','xlarge'].map(sz => `
                <button class="pill-btn ${s.fontSize === sz ? 'active' : ''}"
                        onclick="applyFontSize('${sz}');updatePills(this)">${sz.charAt(0).toUpperCase() + sz.slice(1).replace('xlarge','X-Large')}</button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-label">
            <div class="setting-label-text">Font Family</div>
            <div class="setting-label-desc">Typeface for Bible text</div>
          </div>
          <div class="setting-control">
            <div class="pill-group">
              <button class="pill-btn ${s.fontFamily === 'garamond' ? 'active' : ''}"
                      style="font-family:'EB Garamond',serif"
                      onclick="applyFontFamily('garamond');updatePills(this)">Garamond</button>
              <button class="pill-btn ${s.fontFamily === 'crimson' ? 'active' : ''}"
                      style="font-family:'Crimson Pro',serif"
                      onclick="applyFontFamily('crimson');updatePills(this)">Crimson</button>
              <button class="pill-btn ${s.fontFamily === 'georgia' ? 'active' : ''}"
                      style="font-family:Georgia,serif"
                      onclick="applyFontFamily('georgia');updatePills(this)">Georgia</button>
              <button class="pill-btn ${s.fontFamily === 'system' ? 'active' : ''}"
                      onclick="applyFontFamily('system');updatePills(this)">System</button>
            </div>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-label">
            <div class="setting-label-text">Text Spacing</div>
            <div class="setting-label-desc">Line height between verses</div>
          </div>
          <div class="setting-control">
            <div class="pill-group">
              ${['compact','comfortable','spacious'].map(sp => `
                <button class="pill-btn ${s.textSpacing === sp ? 'active' : ''}"
                        onclick="applySpacing('${sp}');updatePills(this)">${sp.charAt(0).toUpperCase() + sp.slice(1)}</button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- READING -->
      <div class="settings-group">
        <div class="settings-group-title">Reading</div>

        <div class="setting-row">
          <div class="setting-label">
            <div class="setting-label-text">Default Translation</div>
            <div class="setting-label-desc">Used on first load and new sessions</div>
          </div>
          <div class="setting-control">
            <select class="settings-select" id="setting-trans" onchange="saveSetting('defaultTranslation',this.value);loadChapter()">
              ${TRANSLATIONS.map(t => `
                <option value="${t.id}" ${s.defaultTranslation === t.id ? 'selected' : ''}>${t.abbr} — ${t.name}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-label">
            <div class="setting-label-text">Verse Numbers</div>
            <div class="setting-label-desc">How verse numbers are displayed</div>
          </div>
          <div class="setting-control">
            <div class="pill-group">
              ${[['inline','Inline'],['superscript','Super'],['hidden','Hidden']].map(([v,l]) => `
                <button class="pill-btn ${s.verseNumbers === v ? 'active' : ''}"
                        onclick="applyVerseNumbers('${v}');updatePills(this)">${l}</button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-label">
            <div class="setting-label-text">Red Letter Text</div>
            <div class="setting-label-desc">Words of Christ in red (when available)</div>
          </div>
          <div class="setting-control">
            <label class="toggle-switch">
              <input type="checkbox" ${s.redLetter ? 'checked' : ''}
                     onchange="applyRedLetter(this.checked)">
              <div class="toggle-track"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- COMMENTARY -->
      <div class="settings-group">
        <div class="settings-group-title">Commentary &amp; Study Tools</div>

        <div class="setting-row">
          <div class="setting-label">
            <div class="setting-label-text">Default Commentary</div>
            <div class="setting-label-desc">Opens when you click a verse</div>
          </div>
          <div class="setting-control">
            <select class="settings-select" onchange="saveSetting('defaultCommentary',this.value);AppState.commentarySource=this.value">
              ${COMMENTARY_SOURCES.map(c => `
                <option value="${c.id}" ${s.defaultCommentary === c.id ? 'selected' : ''}>${c.label}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-label">
            <div class="setting-label-text">Cross-Reference Display</div>
            <div class="setting-label-desc">Where cross-references appear</div>
          </div>
          <div class="setting-control">
            <div class="pill-group">
              ${[['panel','Panel'],['inline','Inline'],['hidden','Hidden']].map(([v,l]) => `
                <button class="pill-btn ${s.crossRefDisplay === v ? 'active' : ''}"
                        onclick="saveSetting('crossRefDisplay','${v}');updatePills(this)">${l}</button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- API KEYS -->
      <div class="settings-group">
        <div class="settings-group-title">API Keys</div>

        <!-- Biblia.com API Key -->
        <div class="setting-row" style="flex-direction:column;align-items:stretch;gap:10px">
          <div class="setting-label">
            <div class="setting-label-text">Biblia.com API Key</div>
            <div class="setting-label-desc">
              Enables the <em>real text</em> of Calvin's Commentaries, Matthew Henry, Gill's Exposition,
              Jamieson-Fausset-Brown, and Matthew Poole. All are free, public-domain texts.<br>
              <a href="https://biblia.com/api/signup" target="_blank" style="color:var(--accent)">Get a free key at biblia.com →</a>
            </div>
          </div>
          <div class="api-key-field">
            <input type="password" id="biblia-key-input" class="api-key-input"
                   placeholder="Paste your Biblia API key here"
                   value="${s.bibliaApiKey || ''}">
            <button class="api-key-save-btn" onclick="saveBibliaKey()">Save</button>
          </div>
          <div id="biblia-key-status" class="api-key-status" style="display:none">
            ✓ Key saved
          </div>
        </div>

        <!-- Anthropic API Key -->
        <div class="setting-row" style="flex-direction:column;align-items:stretch;gap:10px;margin-top:12px">
          <div class="setting-label">
            <div class="setting-label-text">Anthropic API Key</div>
            <div class="setting-label-desc">
              Enables AI-powered commentary in the style of historical Reformed scholars, as well as
              Strong's number analysis and Bible dictionary lookups. Small cost per use.<br>
              <a href="https://console.anthropic.com" target="_blank" style="color:var(--accent)">Get a key at console.anthropic.com →</a>
              <br><small style="color:var(--text-faint)">Your key is stored locally in your browser and never shared.</small>
            </div>
          </div>
          <div class="api-key-field">
            <input type="password" id="anthropic-key-input" class="api-key-input"
                   placeholder="sk-ant-..."
                   value="${s.anthropicApiKey || ''}">
            <button class="api-key-save-btn" onclick="saveAnthropicKey()">Save</button>
          </div>
          <div id="anthropic-key-status" class="api-key-status" style="display:none">
            ✓ Key saved
          </div>
        </div>
      </div>

      <!-- DATA -->
      <div class="settings-group">
        <div class="settings-group-title">Data</div>

        <div class="setting-row">
          <div class="setting-label">
            <div class="setting-label-text">Clear All Data</div>
            <div class="setting-label-desc">
              Removes all highlights, bookmarks, notes, and reading plan progress.
              Settings are preserved. This cannot be undone.
            </div>
          </div>
          <div class="setting-control">
            <button class="danger-btn" onclick="confirmClearData()">Clear Data</button>
          </div>
        </div>
      </div>

      <!-- KEYBOARD SHORTCUTS -->
      <div class="settings-group">
        <div class="settings-group-title">Keyboard Shortcuts</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;font-size:0.82rem">
          ${[
            ['← →', 'Previous / Next chapter'],
            ['[ ]', 'Previous / Next chapter (alt)'],
            ['/ or F', 'Open search'],
            ['Escape', 'Close modals & menus'],
          ].map(([k,d]) => `
            <span style="font-family:monospace;background:var(--bg-tag);padding:2px 8px;border-radius:4px;display:inline-block">${k}</span>
            <span style="color:var(--text-secondary)">${d}</span>
          `).join('')}
        </div>
      </div>

    </div><!-- end settings-page -->
  `;
}

/* ─────────────────────────────────
   Setting helpers
───────────────────────────────── */
function saveSetting(key, value) {
  AppState.settings[key] = value;
  saveSettings();
}

function saveBibliaKey() {
  const input = document.getElementById('biblia-key-input');
  if (!input) return;
  AppState.settings.bibliaApiKey = input.value.trim();
  saveSettings();
  const status = document.getElementById('biblia-key-status');
  if (status) { status.style.display = 'block'; setTimeout(() => status.style.display = 'none', 2500); }
}

function saveAnthropicKey() {
  const input = document.getElementById('anthropic-key-input');
  if (!input) return;
  AppState.settings.anthropicApiKey = input.value.trim();
  saveSettings();
  const status = document.getElementById('anthropic-key-status');
  if (status) { status.style.display = 'block'; setTimeout(() => status.style.display = 'none', 2500); }
}

/* Update sibling pill buttons so only the clicked one is active */
function updatePills(btn) {
  btn.closest('.pill-group').querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function confirmClearData() {
  if (confirm('This will permanently delete all your highlights, bookmarks, notes, and reading plan progress. This cannot be undone.\n\nContinue?')) {
    resetAllData();
    alert('All study data has been cleared.');
  }
}
