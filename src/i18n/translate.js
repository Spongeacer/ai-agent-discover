import { signal, computed } from '@preact/signals';
import { SUPPORTED_LOCALES, LOCALE_META, DEFAULT_LOCALE } from './config.js';
export { SUPPORTED_LOCALES, LOCALE_META };

// UI translations
import zh from './ui/zh.js';
import en from './ui/en.js';
import ar from './ui/ar.js';
import es from './ui/es.js';
import ko from './ui/ko.js';
import ja from './ui/ja.js';

const UI_MAP = { zh, en, ar, es, ko, ja };

function getStoredLocale() {
  try {
    const stored = localStorage.getItem('locale');
    if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;
    const nav = navigator.language.slice(0, 2);
    if (SUPPORTED_LOCALES.includes(nav)) return nav;
  } catch (e) {}
  return DEFAULT_LOCALE;
}

export const localeSignal = signal(getStoredLocale());

export const dirSignal = computed(() => LOCALE_META[localeSignal.value]?.dir || 'ltr');

export function t(key, replacements = {}) {
  const locale = localeSignal.value;
  const dict = UI_MAP[locale] || UI_MAP[DEFAULT_LOCALE];
  let text = dict[key];
  if (text === undefined) {
    // fallback chain
    text = UI_MAP[DEFAULT_LOCALE][key];
  }
  if (text === undefined) return key;
  return text.replace(/\{\{(\w+)\}\}/g, (_, k) => replacements[k] ?? `{{${k}}}`);
}

export function setLocale(loc) {
  if (!SUPPORTED_LOCALES.includes(loc)) return;
  localeSignal.value = loc;
  try {
    localStorage.setItem('locale', loc);
  } catch (e) {}
  // Apply RTL and font
  const meta = LOCALE_META[loc];
  document.documentElement.setAttribute('dir', meta.dir);
  document.documentElement.setAttribute('lang', loc);
  document.body.style.fontFamily = meta.font;
}

// Init on load
if (typeof document !== 'undefined') {
  setLocale(localeSignal.value);
}
