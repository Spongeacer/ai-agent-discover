import { html } from '../utils/htm.js';
import { useState } from 'preact/hooks';
import { CATEGORIES } from '../utils/constants.js';
import { t } from '../i18n/translate.js';

export function SubmitPage() {
  const [form, setForm] = useState({
    name: '',
    url: '',
    category: 'Framework',
    reason: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const generateIssueURL = () => {
    const title = encodeURIComponent(`[推荐] ${form.name}`);
    const body = encodeURIComponent(
      `## 项目信息\n\n` +
      `- **名称**: ${form.name}\n` +
      `- **GitHub URL**: ${form.url}\n` +
      `- **分类**: ${form.category}\n\n` +
      `## 推荐理由\n\n${form.reason}\n`
    );
    return `https://github.com/Significant-Gravitas/AutoGPT/issues/new?title=${title}&body=${body}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return html`
      <div class="page submit-page">
        <div class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <div style="font-size:18px;font-weight:700;color:var(--text);margin-bottom:8px;">${t('submitSuccessTitle')}</div>
          <div style="font-size:14px;color:var(--text-muted);margin-bottom:24px;">${t('submitSuccessDesc')}</div>
          <a href=${generateIssueURL()} target="_blank" rel="noopener">
            <button class="btn-primary">${t('goToGithub')}</button>
          </a>
          <div style="margin-top:16px;">
            <button class="theme-btn" onClick=${() => setSubmitted(false)} style="width:auto;padding:8px 16px;">${t('backToEdit')}</button>
          </div>
        </div>
      </div>
    `;
  }

  return html`
    <div class="page submit-page">
      <h2>${t('submitTitle')}</h2>
      <p>${t('submitDesc')}</p>
      <form onSubmit=${onSubmit}>
        <div class="form-group">
          <label>${t('projectName')}</label>
          <input
            type="text"
            placeholder=${t('projectNamePlaceholder')}
            value=${form.name}
            onInput=${e => update('name', e.target.value)}
            required
          />
        </div>
        <div class="form-group">
          <label>${t('githubUrl')}</label>
          <input
            type="url"
            placeholder=${t('githubUrlPlaceholder')}
            value=${form.url}
            onInput=${e => update('url', e.target.value)}
            required
          />
        </div>
        <div class="form-group">
          <label>${t('categorySelect')}</label>
          <select value=${form.category} onChange=${e => update('category', e.target.value)}>
            ${CATEGORIES.filter(c => c !== 'All').map(c => html`<option key=${c}>${c}</option>`)}
          </select>
        </div>
        <div class="form-group">
          <label>${t('reason')}</label>
          <textarea
            placeholder=${t('reasonPlaceholder')}
            value=${form.reason}
            onInput=${e => update('reason', e.target.value)}
            required
          />
        </div>
        <button type="submit" class="btn-primary">${t('generateIssue')}</button>
      </form>
    </div>
  `;
}
