import { html } from '../utils/htm.js';
import { uiSignal, toggleTheme } from '../state/signals.js';
import { t, setLocale, localeSignal, LOCALE_META, SUPPORTED_LOCALES } from '../i18n/translate.js';

export function Header() {
  const theme = uiSignal.value.theme;
  const currentLoc = localeSignal.value;

  return html`
    <header class="app-header">
      <div class="header-inner">
        <div class="logo">
          <span>🤖</span>
          <span>${t('appName')}</span>
        </div>
        <div class="header-actions">
          <select
            class="filter-select"
            style="min-width:auto;padding-right:28px;font-size:13px;"
            value=${currentLoc}
            onChange=${e => setLocale(e.target.value)}
            title=${t('langSwitcher')}
          >
            ${SUPPORTED_LOCALES.map(loc => html`
              <option key=${loc} value=${loc}>${LOCALE_META[loc].name}</option>
            `)}
          </select>
          <button class="theme-btn" onClick=${toggleTheme} title=${theme === 'dark' ? t('themeLight') : t('themeDark')}>
            ${theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  `;
}

export function Footer() {
  return html`
    <footer class="app-footer">
      <div>${t('footerSlogan')}</div>
      <div style="margin-top:4px;opacity:0.7;">${t('footerSource')}</div>
    </footer>
  `;
}

export function TabContainer({ currentTab, onChange, tabs }) {
  return html`
    <div style="margin-bottom:24px;">
      <div class="tab-bar">
        ${tabs.map(t => html`
          <button
            key=${t.key}
            class=${`tab-btn ${currentTab === t.key ? 'active' : ''}`}
            onClick=${() => onChange(t.key)}
          >
            ${t.label}
          </button>
        `)}
      </div>
    </div>
  `;
}
