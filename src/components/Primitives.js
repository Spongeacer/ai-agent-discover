import { html } from '../utils/htm.js';
import { LANGUAGE_COLORS } from '../utils/constants.js';
import { formatStars } from '../utils/formatters.js';

export function Badge({ children, type = 'default' }) {
  return html`<span class="badge ${type}">${children}</span>`;
}

export function LangBadge({ language }) {
  const color = LANGUAGE_COLORS[language] || '#888';
  return html`
    <span class="badge lang" style=${{ borderLeft: `3px solid ${color}` }}>
      ${language}
    </span>
  `;
}

export function StarCount({ stars }) {
  return html`
    <span class="badge stars">
      ⭐ ${formatStars(stars)}
    </span>
  `;
}

export function Skeleton({ height = '60px', style = {} }) {
  return html`<div class="skeleton" style=${{ height, ...style }} />`;
}

export function SkeletonCard() {
  return html`
    <div style="padding:20px;background:var(--surface);border-radius:var(--radius);border:1px solid var(--border);margin-bottom:12px;">
      <div class="skeleton" style="height:20px;width:40%;margin-bottom:12px;" />
      <div class="skeleton" style="height:14px;width:100%;margin-bottom:8px;" />
      <div class="skeleton" style="height:14px;width:70%;" />
    </div>
  `;
}
