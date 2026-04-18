export const CATEGORIES = [
  'All', 'Framework', 'Platform', 'Application', 'Coding', 'Multi-Agent', 'Automation', 'RAG', 'DevTool'
];

export const LANGUAGES = [
  'All', 'Python', 'TypeScript', 'JavaScript', 'Rust', 'Go', 'Java'
];

export const SORT_OPTIONS = [
  { key: 'stars-desc', label: 'Stars 从高到低' },
  { key: 'stars-asc', label: 'Stars 从低到高' },
  { key: 'updated-desc', label: '最近更新' },
  { key: 'name-asc', label: '名称 A-Z' }
];

export const HIGHLIGHT_STYLES = {
  'most-starred': { icon: '⭐', label: '最多 Star', color: '#fbbf24' },
  'trending': { icon: '🔥', label: '趋势热门', color: '#f87171' },
  'editor-pick': { icon: '👑', label: '编辑精选', color: '#c084fc' },
  'minimal': { icon: '🪶', label: '极简主义', color: '#34d399' }
};

export const LANGUAGE_COLORS = {
  'Python': '#3572A5',
  'TypeScript': '#3178C6',
  'JavaScript': '#F1E05A',
  'Rust': '#DEA584',
  'Go': '#00ADD8',
  'Java': '#B07219'
};
