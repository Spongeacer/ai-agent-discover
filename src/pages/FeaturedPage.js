import { html } from '../utils/htm.js';
import { featuredSignal, projectsSignal, loadingSignal } from '../state/signals.js';
import { FeaturedGrid } from '../components/Domain.js';
import { SkeletonCard } from '../components/Primitives.js';
import { t } from '../i18n/translate.js';

export function FeaturedPage() {
  const featured = featuredSignal.value;
  const projects = projectsSignal.value;
  const loading = loadingSignal.value;

  const projectsMap = projects.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {});

  return html`
    <div class="page">
      <div style="margin-bottom:20px;">
        <h2 style="font-size:22px;margin-bottom:6px;">${t('ahaTitle')}</h2>
        <p style="color:var(--text-muted);font-size:14px;">${t('ahaDesc')}</p>
      </div>
      ${loading
        ? html`<div class="featured-grid">${[1,2,3].map(i => html`<div key=${i} style="height:200px;"><${SkeletonCard} /></div>`)}</div>`
        : html`<${FeaturedGrid} featuredList=${featured} projectsMap=${projectsMap} />`
      }
    </div>
  `;
}
