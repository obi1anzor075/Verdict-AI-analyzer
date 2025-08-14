// content/constants.js
export const ROOT_ID = 'shopsage-root-v3';
export const BTN_ID = 'shopsage-open-btn-v3';
export const APP_ACTION = 'ANALYZE';

// иконка (relative to extension root)
export const ICON_PATH = chrome && chrome.runtime && chrome.runtime.getURL
    ? chrome.runtime.getURL('assets/icons/icon.svg')
    : '/assets/icons/icon.svg';

// лимит символов для отправки (тот же, что в старом файле)
export const CHAR_LIMIT = 15000;

// дефолтные значения storage
export const DEFAULT_STORAGE = {
    maxReviews: 40,
    serverUrl: ''
};

// ключ в localStorage
export const SETTINGS_KEY = 'verdict:userSettings';

export const DEFAULT_SETTINGS = {
    autoAnalyze: false,
    maxReviews: 5,
    language: 'ru',
    analysisDepth: 'medium',
    showRating: true,
    debugMode: false,
    saveHistory: false,
    darkMode: true
};
