
//Anonymize text
export function anonymizeText(text, { maxLength = 2000 } = {}) {
    if (text === null || text === undefined) return '';
    let s = String(text);

    s = s.replace(/^\s*\S+\s+\S+\s*/, '[имя удалено]');

    // 0) Нормализация пробелов
    s = s.replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();

    // 1) Уже заменённые метки — оставляем как есть (немного нормализуем)
    s = s.replace(/\[телефон (удалён|удалено)\]/gi, '[телефон удалён]');
    s = s.replace(/\[email (удалён|удалено)\]/gi, '[email удалён]');
    s = s.replace(/\[url (удалён|удалено)\]/gi, '[url удалён]');

    // 2) Emails (обычные и простые obfuscation)
    s = s.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi, '[email удалён]');
    s = s.replace(/\b([A-Za-z0-9._%+-]+)\s*(?:\[at\]|\(at\)|\sat\s|&#x40;)\s*([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/gi, '[email удалён]');

    // 3) URLs и популярные сокращённые ссылки (telegram / t.me / vk)
    s = s.replace(/https?:\/\/[^\s"']+/gi, '[url удалён]');
    s = s.replace(/\bwww\.[^\s"']+\b/gi, '[url удалён]');
    s = s.replace(/\b(?:t\.me|telegram\.me|telegram|vk\.com|vk)\b[\/:]?[A-Za-z0-9_.-]*/gi, '[url удалён]');

    // 4) Никнеймы и соцхэндлы (@username, username#1234, telegram handles)
    s = s.replace(/@[A-Za-z0-9_.-]{1,80}/g, '[ник удалён]');
    s = s.replace(/\b[A-Za-z0-9._-]{3,}#\d{2,6}\b/g, '[ник удалён]');

    // 5) Телефоны — очень гибкий шаблон
    // покроет +7 (999) 123-45-67, 8 999 1234567, 89991234567, 123-456-7890, 0123456789 и пр.
    s = s.replace(/(?:(?:\+?\d{1,3}[-.\s\/]?)?(?:\(?\d{1,4}\)?[-.\s\/]?){1,6}\d{1,4})(?=(?:\D|$))/g, match => {
        // дополнительная защита: не заменяем год/цену/простые номера менее 6 цифр подряд
        const digits = (match.match(/\d/g) || []).length;
        return digits >= 6 ? '[телефон удалён]' : match;
    });

    // 6) Длинные числовые id (6+ цифр подряд)
    s = s.replace(/\b\d{6,}\b/g, '[id удалён]');

    // 7) Явные плейсхолдеры/анонимы (рус/eng)
    s = s.replace(/\bИмя\s+скрыто\b/gi, '[имя удалено]');
    s = s.replace(/\bИмя\s+удалено\b/gi, '[имя удалено]');
    s = s.replace(/\bПользователь\b/gi, '[пользователь]');
    s = s.replace(/\bПокупатель\b/gi, '[пользователь]');
    s = s.replace(/\bАноним\b/gi, '[пользователь]');
    s = s.replace(/\bGuest\b/gi, '[пользователь]');

    // 8) ФИО / Имя + Фамилия (+Отчество) — гибко для кириллицы и латиницы
    // 8.a ФИО в формате: Имя Фамилия (включая дефисы), с опцией третьего слова (отчество)
    s = s.replace(/\b[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}\s+[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}(?:\s+[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30})?\b/gu, '[имя удалено]');

    // 8.b Имя + инициал(ы), например "Вадим Б." или "Вадим Б" или "Вадим Б. С."
    s = s.replace(/\b[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}\s+[A-ЯA-ZА-ЯЁ]\.(?:\s*[A-ЯA-Z]\.)?\b/gu, '[имя удалено]');
    s = s.replace(/\b[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}\s+[A-ЯA-ZА-ЯЁ]\b/gu, '[имя удалено]'); // без точки

    // 8.c Инициал + Фамилия, например "В. Иванов"
    s = s.replace(/\b[A-ЯA-ZА-ЯЁ]\.\s*[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}\b/gu, '[имя удалено]');

    // 8.d Одиночные имена в начале строки (часто формат отзывов: "имя дата ...")
    // применяем осторожно: только если имя минимум 3 буквы и не слишком короткое
    s = s.replace(/^(?:\s*)([А-ЯЁA-Z][а-яёa-zA-Z-]{2,30})(?=\s+(?:\d{1,2}\s+|[A-Za-zА-Яа-я]))/u, '[имя удалено]');

    // 9) Доп. удаление типичных паттернов "Имя Ф. 27 июня" (имя перед датой)
    s = s.replace(/\b[А-ЯЁA-Z][а-яёa-zA-Z-]{2,30}\s+[A-ЯЁA-Z][а-яёa-zA-Z-]{0,30}(?=\s+\d{1,2}\s+(?:янв|фев|мар|апр|май|июн|июл|авг|сен|окт|ноя|дек|января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря))/giu, '[имя удалено]');

    // 10) Прочая финальная нормализация
    s = s.replace(/\s+/g, ' ').trim();

    // 11) Ограничение длины
    if (s.length > maxLength) s = s.slice(0, maxLength - 1) + '…';

    return s;
}

// ключ в localStorage
const SETTINGS_KEY = 'verdict:userSettings';

export const DEFAULT_SETTINGS = {
    autoAnalyze: false,
    serverSend: false,
    maxReviews: 5,
    language: 'ru',
    analysisDepth: 'medium',
    showRating: true,
    debugMode: false,
    saveHistory: false,
    darkMode: true
};

/**
 * Сохранить настройки в localStorage.
 * @param {Object} settings
 * @returns {Promise<boolean>}
 */
export async function saveUserSettings(settings = {}) {
    try {
        const toSave = { ...settings };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(toSave));
        return true;
    } catch (err) {
        console.error('saveUserSettings error:', err);
        return false;
    }
}

/**
 * Загрузить настройки из localStorage (без применения дефолтов).
 * Возвращает пустой объект если ключа нет или JSON некорректен.
 */
export function loadUserSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) return {};
        return JSON.parse(raw) || {};
    } catch (e) {
        console.warn('Ошибка чтения настроек из localStorage:', e);
        return {};
    }
}

/**
 * Проверяет подписку пользователя. Возвращает Promise<boolean>.
 * Поддерживает: window.isUserSubscribed(), window.APP.user.isSubscribed, localStorage flags.
 */
export async function isUserSubscribed() {
    try {
        console.debug('[utils] isUserSubscribed: probing environment');
        if (typeof window.isUserSubscribed === 'function') {
            const res = window.isUserSubscribed();
            if (res && typeof res.then === 'function') return !!(await res);
            return !!res;
        }
        if (window.APP && window.APP.user && typeof window.APP.user.isSubscribed !== 'undefined') {
            return !!window.APP.user.isSubscribed;
        }
        try {
            const v = localStorage.getItem('IS_SUBSCRIBED') || localStorage.getItem('user_subscribed');
            if (v === '1' || v === 'true') return true;
        } catch (e) { /* ignore */ }
        return false;
    } catch (e) {
        console.warn('[utils] isUserSubscribed error', e);
        return false;
    }
}


/**
 * Возвращает максимальное кол-во отзывов для анализа
 */
export function getMaxReviewsAllowed() {
    const settings = loadUserSettings() || {};
    const raw = settings.maxReviews;

    const num = Number(raw);
    if (Number.isFinite(num) && !Number.isNaN(num)) {
        const intVal = Math.trunc(num);
        return intVal >= 0 ? intVal : DEFAULT_SETTINGS.maxReviews;
    }

    return DEFAULT_SETTINGS.maxReviews;
}




