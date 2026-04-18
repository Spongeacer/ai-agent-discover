import { html } from '../utils/htm.js';
import { useCallback } from 'preact/hooks';
import { CATEGORIES, LANGUAGES, SORT_OPTIONS } from '../utils/constants.js';
import { filterSignal, setFilter } from '../state/signals.js';
import { t } from '../i18n/translate.js';

export function FilterBar() {
  const filters = filterSignal.value;

  const onSearch = useCallback((e) => {
    setFilter('search', e.target.value);
  }, []);

  return html`
    <div class="filter-bar">
      <div class="filter-group">
        <label>${t('searchPlaceholder')}</label>
        <input
          class="search-input"
          type="text"
          placeholder=${t('searchPlaceholder')}
          value=${filters.search}
          onInput=${onSearch}
        />
      </div>
      <div class="filter-group">
        <label>${t('categoryLabel')}</label>
        <select class="filter-select" value=${filters.category} onChange=${e => setFilter('category', e.target.value)}>
          ${CATEGORIES.map(c => html`<option key=${c} value=${c}>${c === 'All' ? t('all') : c}</option>`)}
        </select>
      </div>
      <div class="filter-group">
        <label>${t('languageLabel')}</label>
        <select class="filter-select" value=${filters.language} onChange=${e => setFilter('language', e.target.value)}>
          ${LANGUAGES.map(l => html`<option key=${l} value=${l}>${l === 'All' ? t('all') : l}</option>`)}
        </select>
      </div>
      <div class="filter-group">
        <label>${t('sortLabel')}</label>
        <select class="filter-select" value=${filters.sort} onChange=${e => setFilter('sort', e.target.value)}>
          ${SORT_OPTIONS.map(s => html`<option key=${s.key} value=${s.key}>${s.label}</option>`)}
        </select>
      </div>
    </div>
  `;
}
