import { signal, computed } from '@preact/signals';
import { CATEGORIES, SORT_OPTIONS } from '../utils/constants.js';

export const PAGE_SIZE = 10;

export const projectsSignal = signal([]);
export const featuredSignal = signal([]);
export const loadingSignal = signal(true);
export const errorSignal = signal(null);
export const pageSignal = signal(1);

export const filterSignal = signal({
  category: 'All',
  language: 'All',
  search: '',
  sort: 'stars-desc'
});

export const uiSignal = signal({
  currentTab: 'ranking',
  theme: localStorage.getItem('theme') || 'dark'
});

export const derivedProjects = computed(() => {
  const projects = projectsSignal.value;
  const filters = filterSignal.value;

  let result = projects.filter(p => {
    if (filters.category !== 'All' && p.category !== filters.category) return false;
    if (filters.language !== 'All' && p.language !== filters.language) return false;
    if (filters.search) {
      const s = filters.search.toLowerCase();
      return p.name.toLowerCase().includes(s) ||
             p.description.toLowerCase().includes(s) ||
             p.owner.toLowerCase().includes(s);
    }
    return true;
  });

  const [sortKey, sortDir] = filters.sort.split('-');
  result = result.slice().sort((a, b) => {
    let av, bv;
    if (sortKey === 'stars') { av = a.stars; bv = b.stars; }
    else if (sortKey === 'updated') { av = new Date(a.updatedAt); bv = new Date(b.updatedAt); }
    else { av = a.name.toLowerCase(); bv = b.name.toLowerCase(); }

    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return result;
});

export function setFilter(key, value) {
  filterSignal.value = { ...filterSignal.value, [key]: value };
  pageSignal.value = 1; // Reset to first page on filter change
}

export function setPage(page) {
  pageSignal.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export const totalPagesSignal = computed(() => {
  return Math.ceil(derivedProjects.value.length / PAGE_SIZE) || 1;
});

export const paginatedProjects = computed(() => {
  const all = derivedProjects.value;
  const page = pageSignal.value;
  const start = (page - 1) * PAGE_SIZE;
  return all.slice(start, start + PAGE_SIZE);
});

export function setTab(tab) {
  uiSignal.value = { ...uiSignal.value, currentTab: tab };
  pageSignal.value = 1;
  window.history.replaceState(null, '', `?tab=${tab}`);
}

export function toggleTheme() {
  const next = uiSignal.value.theme === 'dark' ? 'light' : 'dark';
  uiSignal.value = { ...uiSignal.value, theme: next };
  localStorage.setItem('theme', next);
  document.documentElement.setAttribute('data-theme', next);
}

// Init theme
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', uiSignal.value.theme);
}
