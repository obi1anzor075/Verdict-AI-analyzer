// content/extractors/helpers.js
// Общие хелперы для extractors (Yandex + fallback).
// Экспортируемые функции:
// safeQueryAll, clickCandidates, scrollToContainerBottom, expandCollapsedReviews,
// extractReviewsFromScriptsAndDataAttributes, cleanReviewText, extractReviewText,
// isMeaningfulReview, removeDuplicateReviews, selectOptimalReviews

/**
 * Безопасный querySelectorAll — возвращает пустой массив при ошибке.
 */
export function safeQueryAll(selector, root = document) {
    try {
        return Array.from((root || document).querySelectorAll(selector));
    } catch (e) {
        return [];
    }
}

/**
 * Попытаться кликнуть на массиве элементов (или NodeList).
 * Возвращает Set кликнутых элементов.
 */
export function clickCandidates(nodes) {
    const clicked = new Set();
    try {
        const arr = nodes ? (Array.isArray(nodes) ? nodes : Array.from(nodes)) : [];
        arr.forEach(btn => {
            try {
                if (!(btn instanceof HTMLElement)) return;
                const style = window.getComputedStyle(btn);
                if (style.display === 'none' || style.visibility === 'hidden' || btn.disabled) return;
                // text guard is caller responsibility (if needed)
                try { btn.click(); clicked.add(btn); } catch (e) { /* ignore individual */ }
                // попытка ещё раз через небольшой таймаут (для ленивой подгрузки)
                try { setTimeout(() => { try { if (!btn.disabled) btn.click(); } catch (e) { } }, 700); } catch (e) { }
            } catch (e) { /* ignore per-button */ }
        });
    } catch (e) { /* ignore */ }
    return clicked;
}

/**
 * Ищет подходящую контейнерную область отзывов и скроллит её в конец,
 * или скроллит всю страницу вниз если контейнер не найден.
 */
export function scrollToContainerBottom() {
    try {
        const reviewsContainer = document.querySelector('[data-zone-name="reviews"], [data-auto="ugc-section"], .reviews, .n-reviews, .review-list, [data-auto="reviews"]');
        if (reviewsContainer) {
            try {
                reviewsContainer.scrollIntoView({ behavior: 'smooth' });
                reviewsContainer.scrollTop = reviewsContainer.scrollHeight;
                return true;
            } catch (e) { /* ignore */ }
        }
        try {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } catch (e) { /* ignore */ }
    } catch (e) { /* ignore */ }
    return false;
}

/**
 * Кликай на набор предполагаемых кнопок "показать полностью/ещё" по списку селекторов.
 * Возвращает количество попыток/нажатий (приблизительно).
 */
export function expandCollapsedReviews(selectorList = [
    'button[class*="expand"]',
    'button[class*="show-full"]',
    '[data-auto*="expand"]',
    '.review-expand',
    '.opinion-expand',
    '[class*="read-more"]'
]) {
    let attempts = 0;
    try {
        for (const sel of selectorList) {
            try {
                const buttons = safeQueryAll(sel);
                buttons.forEach(button => {
                    try {
                        if (!(button instanceof HTMLElement)) return;
                        if (button.offsetHeight > 0 && !button.disabled) {
                            try { button.click(); attempts++; } catch (e) { /* ignore */ }
                        }
                    } catch (e) { /* ignore per-button */ }
                });
            } catch (e) { /* ignore selector */ }
        }
    } catch (e) { /* ignore */ }
    return attempts;
}

/**
 * Извлечение отзывов/фрагментов текста из <script> тегов и data-* атрибутов (data-bem и т.д.).
 * Возвращает массив строк.
 */
export function extractReviewsFromScriptsAndDataAttributes() {
    const out = [];
    try {
        // 1) search in script tags via several regex patterns
        const scripts = safeQueryAll('script');
        const patterns = [
            /"reviews":\s*\[(.*?)\]/gis,
            /"opinions":\s*\[(.*?)\]/gis,
            /"reviewText":\s*"([^"]{30,})"/gi,
            /"text":\s*"([^"]{30,})"/gi,
            /"comment":\s*"([^"]{30,})"/gi
        ];

        scripts.forEach(script => {
            const txt = script.textContent || '';
            if (!txt) return;
            for (const p of patterns) {
                try {
                    const matches = txt.matchAll(p);
                    for (const m of matches) {
                        try {
                            if (!m) continue;
                            // group 1 can be big JSON chunk (for reviews array) or single capture
                            const candidate = m[1] ? m[1] : (m[0] || '');
                            if (!candidate) continue;
                            // cleanup common escape sequences
                            const cleaned = candidate.replace(/\\n/g, ' ').replace(/\\"/g, '"').replace(/\\\\/g, '\\').trim();
                            if (cleaned.length >= 30) out.push(cleaned);
                        } catch (e) { /* ignore per-match */ }
                    }
                } catch (e) { /* ignore per-pattern */ }
            }
        });

        // 2) parse data-* attributes (e.g., data-bem) — look for JSON with reviews/opinions
        const dataEls = safeQueryAll('[data-bem], [data-state], [data-props], [data-init]');
        dataEls.forEach(el => {
            try {
                const ds = el.dataset || {};
                Object.keys(ds).forEach(k => {
                    const val = ds[k];
                    if (!val || String(val).length < 80) return;
                    try {
                        const parsed = JSON.parse(val);
                        if (!parsed) return;
                        const reviewsCandidate = parsed.reviews || parsed.opinions || parsed.items || parsed.comments;
                        if (Array.isArray(reviewsCandidate)) {
                            reviewsCandidate.forEach(r => {
                                try {
                                    const text = (r && (r.text || r.content || r.comment)) ? String(r.text || r.content || r.comment) : null;
                                    if (text && text.length > 30) out.push(text);
                                } catch (e) { /* ignore per-review */ }
                            });
                        } else {
                            // try to find nested keys that look like reviews
                            const s = JSON.stringify(parsed || {});
                            const m = s.match(/"reviewText"\s*:\s*"([^"]{30,})"/gi);
                            if (m) m.forEach(mm => {
                                try {
                                    const t = mm.replace(/"reviewText"\s*:\s*"/i, '').replace(/"$/, '').trim();
                                    if (t.length > 30) out.push(t);
                                } catch (e) { }
                            });
                        }
                    } catch (e) {
                        // not json — try to extract long text substring as fallback
                        if (val.length > 150) out.push(val);
                    }
                });
            } catch (e) { /* ignore per-element */ }
        });
    } catch (e) { /* ignore overall errors */ }
    return out;
}

/**
 * Очистка текста от служебного шума и лишних символов.
 */
export function cleanReviewText(text) {
    if (!text) return '';
    let t = String(text);

    // normalize line breaks and whitespace
    t = t.replace(/\r\n|\r/g, '\n').replace(/\t/g, ' ').replace(/\u00A0/g, ' ');
    t = t.replace(/\s+/g, ' ').trim();

    // remove long sequences of numbers
    t = t.replace(/\b(?:\d+\s+){3,}\d+\b/g, ' ');
    t = t.replace(/\b\d{3,}\b/g, ' ');
    t = t.replace(/(?:\b\d+\b[\s,.-]*){3,}/g, ' ');

    // try unicode property escape for letters; if not supported, fallback to cyr+lat range
    try {
        t = t.replace(/[^\p{L}\p{N}\s\.,!?\-()«»—:;\/%]/gu, ' ');
    } catch (e) {
        t = t.replace(/[^A-Za-zА-Яа-яЁё0-9\s\.,!?\-()«»—:;\/%]/g, ' ');
    }

    // collapse repeated punctuation and spaces
    t = t.replace(/([,!.?–—\-]){2,}/g, '$1');
    t = t.replace(/\s+/g, ' ').trim();

    return t;
}

/**
 * Попытка найти основной текст отзыва внутри DOM-элемента.
 * Если не находит, возвращает весь текст элемента (очищенный).
 */
export function extractReviewText(element, extraSelectors = null) {
    if (!element) return '';
    const textSelectors = Array.isArray(extraSelectors) && extraSelectors.length
        ? extraSelectors
        : [
            '.review-text',
            '.opinion-text',
            '.review-content',
            '.comment-text',
            '[data-auto="review-text"]',
            '[class*="text"]',
            'p',
            '.content'
        ];

    try {
        for (const sel of textSelectors) {
            try {
                const el = element.querySelector ? element.querySelector(sel) : null;
                if (el && el.innerText && el.innerText.trim().length > 20) return cleanReviewText(el.innerText);
            } catch (e) { /* ignore per-selector */ }
        }
    } catch (e) { /* ignore */ }

    // fallback: whole element text with removal of known service phrases
    let fullText = '';
    try { fullText = element.innerText || element.textContent || ''; } catch (e) { fullText = ''; }

    const servicePatterns = [
        /Достоинства:?\s*/gi,
        /Недостатки:?\s*/gi,
        /Комментарий:?\s*/gi,
        /Опыт использования:?\s*/gi,
        /Рекомендую\s*/gi,
        /Не рекомендую\s*/gi,
        /\d+\s*из\s*\d+\s*считают отзыв полезным/gi,
        /Был ли отзыв полезен\?/gi,
        /Да\s*\d*\s*Нет\s*\d*/gi,
        /\d+\s*звезд[ыа]?/gi,
        /Оценка:\s*\d+/gi
    ];
    servicePatterns.forEach(p => { fullText = fullText.replace(p, ' '); });

    return cleanReviewText(fullText);
}

/**
 * Проверка, что текст достаточно информативен и не является шумом.
 */
export function isMeaningfulReview(text) {
    if (!text) return false;
    const len = text.length;
    if (len < 40) return false;

    const digits = (text.match(/\d/g) || []).length;
    if ((digits / Math.max(1, len)) > 0.30) return false;

    const letters = (text.match(/[A-Za-zА-Яа-яЁё]/g) || []).length;
    if (letters < 12) return false;

    const cyr = (text.match(/[А-Яа-яЁё]/g) || []).length;
    if (cyr < Math.min(10, Math.floor(len * 0.2))) return false;

    if (/^(source|businessId|notEmpty|id|source,)/i.test(text.trim())) return false;

    return true;
}

/**
 * Удаление дубликатов. Принимает массив строк или массив объектов { text: string }.
 * Возвращает массив объектов { text, source?, length? } (если был вход объектов — сохраняет source).
 */
export function removeDuplicateReviews(reviews) {
    const seen = new Set();
    const unique = [];
    try {
        reviews.forEach(r => {
            try {
                const text = (typeof r === 'string') ? r : (r && r.text ? String(r.text) : '');
                if (!text) return;
                const fingerprint = text.toLowerCase().replace(/\s+/g, '').substring(0, 100);
                if (!seen.has(fingerprint)) {
                    seen.add(fingerprint);
                    const obj = (typeof r === 'string') ? { text, length: text.length } : { ...r, text, length: text.length };
                    unique.push(obj);
                }
            } catch (e) { /* ignore per-item */ }
        });
    } catch (e) { /* ignore */ }
    return unique;
}

/**
 * Выбор оптимального набора отзывов под лимит символов.
 * Принимает массив строк, возвращает массив строк (selected).
 */
export function selectOptimalReviews(reviews = [], maxChars = 15000) {
    if (!Array.isArray(reviews)) return [];
    // сортируем по длине (большие — предпочтительнее)
    const sorted = [...reviews].sort((a, b) => (b.length || 0) - (a.length || 0));
    const selected = [];
    let total = 0;
    const sep = '\n\n';
    const sepLen = sep.length;

    for (const r of sorted) {
        if (!r) continue;
        const rl = r.length;
        const need = total === 0 ? rl : rl + sepLen;
        if (total + need <= maxChars) {
            selected.push(r);
            total += need;
        } else if (total === 0) {
            // если даже один отзыв не влезает — обрезаем
            const truncated = r.substring(0, maxChars - 3) + '...';
            selected.push(truncated);
            total += truncated.length;
            break;
        } else {
            const available = maxChars - total - sepLen;
            if (available > 50) {
                const truncated = r.substring(0, available - 3) + '...';
                selected.push(truncated);
                total += truncated.length + sepLen;
            }
            break;
        }
    }

    return selected;
}
