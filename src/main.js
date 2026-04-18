import { render } from 'preact';
import { html } from './utils/htm.js';
import { useEffect } from 'preact/hooks';

import { uiSignal, projectsSignal, featuredSignal, loadingSignal, errorSignal, setTab } from './state/signals.js';
import { t, localeSignal, dirSignal, setLocale } from './i18n/translate.js';
import { fetchProjects, fetchFeatured } from './data/adapter.js';
import { Header, Footer, TabContainer } from './components/Layout.js';
import { RankingPage } from './pages/RankingPage.js';
import { FeaturedPage } from './pages/FeaturedPage.js';
import { SubmitPage } from './pages/SubmitPage.js';

function App() {
  const { currentTab } = uiSignal.value;

  const tabs = [
    { key: 'ranking', label: t('rankingTab') },
    { key: 'featured', label: t('featuredTab') },
    { key: 'submit', label: t('submitTab') }
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && tabs.find(t => t.key === tab)) {
      setTab(tab);
    }

    async function load() {
      loadingSignal.value = true;
      errorSignal.value = null;

      try {
        const projects = await fetchProjects();
        projectsSignal.value = projects;
        console.log('[load] projects', projects.length);
      } catch (err) {
        console.error('[load] projects failed', err);
        errorSignal.value = (errorSignal.value || '') + t('errorPrefix') + err.message + '; ';
      }

      try {
        const featured = await fetchFeatured();
        featuredSignal.value = featured;
        console.log('[load] featured', featured.length);
      } catch (err) {
        console.error('[load] featured failed', err);
        errorSignal.value = (errorSignal.value || '') + t('errorPrefix') + err.message + '; ';
      }

      loadingSignal.value = false;
    }
    load();
  }, []);

  return html`
    <${Header} />
    <main class="main-content">
      ${errorSignal.value && html`
        <div style="background:#7f1d1d20;border:1px solid #f87171;color:#f87171;padding:12px 16px;border-radius:var(--radius);margin-bottom:16px;font-size:13px;">
          <strong>${t('errorPrefix')}</strong>${errorSignal.value}
          <button onClick=${() => { errorSignal.value = null; window.location.reload(); }} style="margin-left:12px;padding:4px 10px;border-radius:6px;border:1px solid #f87171;background:transparent;color:#f87171;cursor:pointer;font-size:12px;">${t('retry')}</button>
        </div>
      `}
      <${TabContainer} currentTab=${currentTab} onChange=${setTab} tabs=${tabs} />
      ${currentTab === 'ranking' && html`<${RankingPage} />`}
      ${currentTab === 'featured' && html`<${FeaturedPage} />`}
      ${currentTab === 'submit' && html`<${SubmitPage} />`}
    </main>
    <${Footer} />
  `;
}

render(html`<${App} />`, document.getElementById('app'));
