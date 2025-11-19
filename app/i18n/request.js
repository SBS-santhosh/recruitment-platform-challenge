import { locales, defaultLocale } from './config';

export function getTranslations(locale = defaultLocale) {
  const messages = locales[locale] || locales[defaultLocale];
  
  return (key) => {
    const keys = key.split('.');
    let value = messages;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
}