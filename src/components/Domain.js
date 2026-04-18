import { html } from '../utils/htm.js';
import { useState } from 'preact/hooks';
import { HIGHLIGHT_STYLES } from '../utils/constants.js';
import { formatStars, formatDate } from '../utils/formatters.js';
import { LangBadge, StarCount } from './Primitives.js';
import { localeSignal } from '../i18n/translate.js';
import { t } from '../i18n/translate.js';

function getProjectI18n(project) {
  const loc = localeSignal.value;
  return project.i18n?.[loc] || project;
}

export function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const rank = index; // global rank passed from parent
  const url = `https://github.com/${project.owner}/${project.name}`;
  const info = getProjectI18n(project);

  return html`
    <div class="project-card" onClick=${() => setExpanded(!expanded)}>
      <div class="project-rank ${rank <= 3 ? 'top3' : ''}">${rank}</div>
      <div class="project-info">
        <div class="project-header">
          <span class="project-name">
            <a href=${url} target="_blank" rel="noopener" onClick=${e => e.stopPropagation()}>
              ${project.owner} / ${project.name}
            </a>
          </span>
          <${LangBadge} language=${project.language} />
        </div>
        <div class="project-desc">${info.description}</div>
        ${info.oneLiner && html`
          <div style="margin-top:8px;font-size:13px;color:var(--accent);font-weight:500;">
            💡 ${info.oneLiner}
          </div>
        `}
        <div class="project-meta">
          <${StarCount} stars=${project.stars} />
          <span class="badge">📁 ${project.category}</span>
          <span class="badge">🕒 ${formatDate(project.updatedAt)}</span>
          ${project.topics.slice(0, 3).map(t => html`<span key=${t} class="badge">#${t}</span>`)}
        </div>
      </div>
    </div>
  `;
}

export function ProjectList({ projects, startIndex = 0 }) {
  if (!projects.length) {
    return html`
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div>${t('noResults')}</div>
        <div style="font-size:14px;margin-top:8px;">${t('noResultsTip')}</div>
      </div>
    `;
  }

  return html`
    <div class="project-list">
      ${projects.map((p, i) => html`<${ProjectCard} key=${p.id} project=${p} index=${startIndex + i + 1} />`)}
    </div>
  `;
}

export function FeaturedCard({ featured, project }) {
  if (!project) return null;
  const style = HIGHLIGHT_STYLES[featured.highlight] || HIGHLIGHT_STYLES['editor-pick'];
  const url = `https://github.com/${project.owner}/${project.name}`;
  const info = getProjectI18n(project);
  const featInfo = featured.i18n?.[localeSignal.value] || featured;

  return html`
    <div class="featured-card">
      <div class="featured-highlight" style=${{ color: style.color, border: `1px solid ${style.color}30` }}>
        <span>${style.icon}</span>
        <span>${t('editorPick')}</span>
      </div>
      <div class="project-header" style="margin-bottom:8px;">
        <span class="project-name">
          <a href=${url} target="_blank" rel="noopener">${project.owner} / ${project.name}</a>
        </span>
      </div>
      <div class="project-desc">${info.description}</div>
      ${info.oneLiner && html`
        <div style="margin-top:8px;font-size:13px;color:var(--accent);font-weight:500;">
          💡 ${info.oneLiner}
        </div>
      `}
      <div class="featured-reason">"${featInfo.reason}"</div>
      <div class="featured-footer">
        <div class="project-meta">
          <${LangBadge} language=${project.language} />
          <${StarCount} stars=${project.stars} />
        </div>
        <span style="font-size:12px;color:var(--text-muted);">👤 ${featured.editor}</span>
      </div>
    </div>
  `;
}

export function FeaturedGrid({ featuredList, projectsMap }) {
  return html`
    <div class="featured-grid">
      ${featuredList.map(f => html`
        <${FeaturedCard} key=${f.projectId} featured=${f} project=${projectsMap[f.projectId]} />
      `)}
    </div>
  `;
}
