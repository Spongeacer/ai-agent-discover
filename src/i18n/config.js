export const SUPPORTED_LOCALES = ['zh', 'en', 'ar', 'es', 'ko', 'ja'];

export const LOCALE_META = {
  zh: { name: '中文', dir: 'ltr', font: "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif" },
  en: { name: 'English', dir: 'ltr', font: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" },
  ar: { name: 'العربية', dir: 'rtl', font: "'Noto Sans Arabic','Segoe UI',sans-serif" },
  es: { name: 'Español', dir: 'ltr', font: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" },
  ko: { name: '한국어', dir: 'ltr', font: "'Noto Sans KR','Malgun Gothic',sans-serif" },
  ja: { name: '日本語', dir: 'ltr', font: "'Noto Sans JP','Hiragino Kaku Gothic Pro',sans-serif" }
};

export const DEFAULT_LOCALE = 'zh';
