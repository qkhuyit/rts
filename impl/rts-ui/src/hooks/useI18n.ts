import type { Composer } from 'vue-i18n';
import * as locales from '@/locales';

type I18nGlobalTranslation = Composer['t'];
type I18nTranslationRestParameters = [string, any];

function getKey(namespace: string | undefined, key: string) {
  if (!namespace) {
    return key;
  }
  if (key.startsWith(namespace)) {
    return key;
  }
  return `${namespace}.${key}`;
}

export function useI18n(namespace?: string): {
  t: I18nGlobalTranslation;
} {
  const i18n = locales.i18n;
  const normalFn = {
    t: (key: string) => {
      return getKey(namespace, key);
    },
  };

  if (!i18n) {
    return normalFn;
  }

  const { t } = i18n.global;

  const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
    if (!key) return '';
    if (!key.includes('.') && !namespace) return key;
    return t(getKey(namespace, key), ...(arg as I18nTranslationRestParameters));
  };
  return Object.assign(i18n.global, { t: tFn });
}

/**
 * International conversion tool function, mainly used to process dynamic routing titles
 * @param {string | Title18n} message message
 * @param isI18n The default is true, get the corresponding translation text, otherwise return itself
 * @returns message
 */
export function transformI18n(message: string | Title18n = '', isI18n = true) {
  if (!message) {
    return '';
  }
  const i18n = locales.i18n;

  if (typeof message === 'object') {
    return message[i18n.global?.locale];
  }

  if (isI18n && typeof message === 'string') {
    return i18n.global.t(message);
  }
  return message;
}

// Mainly used to cooperate with vscode i18nn ally plug-in prompts. This feature is only available for routing and menus. Please use useI18n of vue-i18n elsewhere
export const t = (key: string) => key;
