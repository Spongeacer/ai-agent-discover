import { CONFIG } from '../config.js';

const cache = new Map();

async function fetchJSON(path) {
  if (cache.has(path)) return cache.get(path);
  const url = `${CONFIG.dataBaseUrl}/${path}`;
  console.log('[fetch]', url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status} ${res.statusText}`);
  const data = await res.json();
  cache.set(path, data);
  return data;
}

export async function fetchProjects() {
  return fetchJSON('projects.json');
}

export async function fetchFeatured() {
  return fetchJSON('featured.json');
}

export function clearCache() {
  cache.clear();
}
