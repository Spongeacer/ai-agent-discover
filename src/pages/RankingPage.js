import { html } from '../utils/htm.js';
import { paginatedProjects, derivedProjects, loadingSignal, pageSignal, totalPagesSignal, setPage, PAGE_SIZE } from '../state/signals.js';
import { FilterBar } from '../components/Composites.js';
import { ProjectList } from '../components/Domain.js';
import { SkeletonCard } from '../components/Primitives.js';
import { t } from '../i18n/translate.js';

function Pagination() {
  const current = pageSignal.value;
  const total = totalPagesSignal.value;
  if (total <= 1) return null;

  const maxVisible = 5;
  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  let end = Math.min(total, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return html`
    <div class="pagination">
      <button class="page-btn" disabled=${current === 1} onClick=${() => setPage(current - 1)}>
        ${t('prevPage')}
      </button>
      ${start > 1 && html`<button class="page-btn" onClick=${() => setPage(1)}>1</button>`}
      ${start > 2 && html`<span class="page-ellipsis">...</span>`}
      ${pages.map(p => html`
        <button key=${p} class="page-btn ${p === current ? 'active' : ''}" onClick=${() => setPage(p)}>
          ${p}
        </button>
      `)}
      ${end < total - 1 && html`<span class="page-ellipsis">...</span>`}
      ${end < total && html`<button class="page-btn" onClick=${() => setPage(total)}>${total}</button>`}
      <button class="page-btn" disabled=${current === total} onClick=${() => setPage(current + 1)}>
        ${t('nextPage')}
      </button>
    </div>
  `;
}

export function RankingPage() {
  const projects = paginatedProjects.value;
  const allCount = derivedProjects.value.length;
  const loading = loadingSignal.value;
  const currentPage = pageSignal.value;
  const totalPages = totalPagesSignal.value;

  return html`
    <div class="page">
      <${FilterBar} />
      <div style="margin-bottom:16px;font-size:14px;color:var(--text-muted);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <span>${t('foundProjects', { count: allCount })}</span>
        ${totalPages > 1 && html`<span>${t('pageInfo', { current: currentPage, total: totalPages })}</span>`}
      </div>
      ${loading
        ? html`${[1,2,3,4,5].map(i => html`<${SkeletonCard} key=${i} />`)}`
        : html`<${ProjectList} projects=${projects} startIndex=${(currentPage - 1) * PAGE_SIZE} />`
      }
      <${Pagination} />
    </div>
  `;
}
