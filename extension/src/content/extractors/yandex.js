// content/extractors/yandex.js
// Расширенная логика извлечения отзывов для Яндекс.Маркета
// Возвращает объект:
// { reviews: [...], totalFound: n, charactersUsed: m, extractionMethods: [...] }
import { extractReviews } from './index.js';

export function extractYandexMarketReviews(maxCharacters = 15000) {
    // --- результатная структура
    const results = {
        reviews: [],
        totalFound: 0,
        charactersUsed: 0,
        extractionMethods: []
    };

    try {
        // === helpers ===
        function tryAutoLoadMoreReviews() {
            const candidateSelectors = [
                '[data-auto="reviews-show-more"]',
                '[data-autotest-id*="show-more"]',
                '.reviews-show-more',
                '.show-more',
                '.load-more',
                'button'
            ];
            const clicked = new Set();

            for (const sel of candidateSelectors) {
                try {
                    const buttons = Array.from(document.querySelectorAll(sel));
                    buttons.forEach(btn => {
                        try {
                            if (!(btn instanceof HTMLElement)) return;
                            const style = window.getComputedStyle(btn);
                            if (style.display === 'none' || style.visibility === 'hidden' || btn.disabled) return;

                            const text = (btn.innerText || btn.textContent || '').trim();
                            const wantsClick = /показать|еще|ещё|загрузить|more|show/i.test(text) || sel.indexOf('show-more') >= 0 || sel.indexOf('reviews-show-more') >= 0;
                            if (wantsClick && !clicked.has(btn)) {
                                btn.click();
                                clicked.add(btn);
                                setTimeout(() => { try { if (!btn.disabled) btn.click(); } catch (e) { } }, 900);
                            }
                        } catch (e) { /* ignore per-button errors */ }
                    });
                } catch (e) { /* ignore selector errors */ }
            }

            // scroll to bottom of review container or page
            try {
                const reviewsContainer = document.querySelector('[data-zone-name="reviews"], [data-auto="ugc-section"], .reviews, .n-reviews, .review-list, [data-auto="reviews"]');
                if (reviewsContainer) {
                    try {
                        reviewsContainer.scrollIntoView({ behavior: 'smooth' });
                        reviewsContainer.scrollTop = reviewsContainer.scrollHeight;
                    } catch (e) { /* ignore */ }
                } else {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }
            } catch (e) { /* ignore */ }
        }

        function expandCollapsedReviews() {
            const expandButtons = [
                'button[class*="expand"]',
                'button[class*="show-full"]',
                '[data-auto*="expand"]',
                '.review-expand',
                '.opinion-expand',
                'button:contains("Развернуть")',
                'button:contains("Показать полностью")',
                'button:contains("Читать полностью")',
                '[class*="read-more"]'
            ];
            for (const selector of expandButtons) {
                try {
                    const buttons = document.querySelectorAll(selector);
                    buttons.forEach(button => {
                        try {
                            if (button.offsetHeight > 0) button.click();
                        } catch (e) { /* ignore per-button */ }
                    });
                } catch (e) { /* ignore selector errors */ }
            }
        }

        function extractReviewsFromPageData() {
            const reviews = [];
            try {
                const scripts = document.querySelectorAll('script');
                scripts.forEach(script => {
                    if (!script.textContent) return;
                    const patterns = [
                        /"reviews":\s*\[(.*?)\]/gs,
                        /"opinions":\s*\[(.*?)\]/gs,
                        /"reviewText":\s*"([^"]+)"/g,
                        /"text":\s*"([^"]+)"/g,
                        /"comment":\s*"([^"]+)"/g
                    ];
                    patterns.forEach(pattern => {
                        const matches = script.textContent.matchAll(pattern);
                        for (const match of matches) {
                            try {
                                if (match[1] && match[1].length > 30) {
                                    const cleanText = match[1]
                                        .replace(/\\n/g, ' ')
                                        .replace(/\\"/g, '"')
                                        .replace(/\\\\/g, '\\')
                                        .trim();
                                    if (cleanText.length > 30) reviews.push(cleanText);
                                }
                            } catch (e) { /* ignore */ }
                        }
                    });
                });

                // data-bem attributes
                const dataElements = document.querySelectorAll('[data-bem]');
                dataElements.forEach(el => {
                    try {
                        Object.values(el.dataset).forEach(dataValue => {
                            if (!dataValue || dataValue.length < 100) return;
                            try {
                                const parsed = JSON.parse(dataValue);
                                const reviewsData = parsed.reviews || parsed.opinions;
                                if (Array.isArray(reviewsData)) {
                                    reviewsData.forEach(review => {
                                        const text = review.text || review.content || review.comment;
                                        if (text && text.length > 30) reviews.push(String(text));
                                    });
                                }
                            } catch (e) { /* ignore invalid json */ }
                        });
                    } catch (e) { /* ignore per-element */ }
                });
            } catch (e) { /* ignore */ }
            return reviews;
        }

        function cleanReviewText(text) {
            if (!text) return '';
            let t = String(text).replace(/\r\n|\r/g, '\n').replace(/\t/g, ' ').replace(/\u00A0/g, ' ');
            t = t.replace(/\s+/g, ' ').trim();

            // remove long sequences of numbers
            t = t.replace(/\b(?:\d+\s+){3,}\d+\b/g, ' ');
            t = t.replace(/\b\d{3,}\b/g, ' ');
            t = t.replace(/(?:\b\d+\b[\s,.-]*){3,}/g, ' ');

            try {
                t = t.replace(/[^\p{L}\p{N}\s\.,!?\-()«»—:;\/%]/gu, ' ');
            } catch (e) {
                t = t.replace(/[^A-Za-zА-Яа-яЁё0-9\s\.,!?\-()«»—:;\/%]/g, ' ');
            }

            t = t.replace(/([,!.?–—\-]){2,}/g, '$1');
            t = t.replace(/\s+/g, ' ').trim();
            return t;
        }

        function extractReviewText(element) {
            if (!element) return '';
            const textSelectors = [
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
                for (const selector of textSelectors) {
                    const textEl = element.querySelector ? element.querySelector(selector) : null;
                    if (textEl && textEl.innerText && textEl.innerText.trim().length > 20) {
                        return cleanReviewText(textEl.innerText);
                    }
                }
            } catch (e) { /* ignore */ }

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
            servicePatterns.forEach(pattern => { fullText = fullText.replace(pattern, ' '); });

            return cleanReviewText(fullText);
        }

        function isMeaningfulReview(text) {
            if (!text) return false;
            const len = text.length;
            if (len < 40) return false;
            const digits = (text.match(/\d/g) || []).length;
            if (digits / Math.max(1, len) > 0.30) return false;
            const letters = (text.match(/[A-Za-zА-Яа-яЁё]/g) || []).length;
            if (letters < 12) return false;
            const cyr = (text.match(/[А-Яа-яЁё]/g) || []).length;
            if (cyr < Math.min(10, Math.floor(len * 0.2))) return false;
            if (/^(source|businessId|notEmpty|id|source,)/i.test(text.trim())) return false;
            return true;
        }

        function removeDuplicateReviews(reviews) {
            const seen = new Set();
            const unique = [];
            reviews.forEach(review => {
                const fingerprint = review.text
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .substring(0, 100);
                if (!seen.has(fingerprint)) {
                    seen.add(fingerprint);
                    unique.push(review);
                }
            });
            return unique;
        }

        function selectOptimalReviews(reviews, maxChars) {
            const selected = [];
            let totalChars = 0;
            const separator = '\n\n';
            const separatorLength = separator.length;

            const sortedReviews = reviews.sort((a, b) => b.length - a.length);

            for (const review of sortedReviews) {
                const reviewLength = review.length;
                const neededLength = totalChars === 0 ? reviewLength : reviewLength + separatorLength;

                if (totalChars + neededLength <= maxChars) {
                    selected.push(review);
                    totalChars += neededLength;
                } else if (totalChars === 0) {
                    const truncatedText = review.substring(0, maxChars - 3) + '...';
                    selected.push(truncatedText);
                    totalChars = truncatedText.length;
                    break;
                } else {
                    const availableSpace = maxChars - totalChars - separatorLength;
                    if (availableSpace > 50) {
                        const truncatedText = review.substring(0, availableSpace - 3) + '...';
                        selected.push(truncatedText);
                        break;
                    } else {
                        break;
                    }
                }
            }

            return selected;
        }

        // === extraction flow ===

        // 1) try to auto-load more reviews (click buttons / scroll)
        tryAutoLoadMoreReviews();

        // 2) try to expand collapsed reviews
        expandCollapsedReviews();

        // 3) search with specialized Yandex selectors
        const yandexSelectors = [
            '[data-auto="review-item"]',
            '[data-zone-name="review"]',
            '[data-autotest-id="review-card"]',
            '[data-tid="review-item"]',
            '[data-auto="OpinionCard"]',
            '.opinion',
            '.review-item',
            '.user-review',
            '[class*="review"]',
            '[class*="opinion"]',
            '[data-zone*="review"]',
            '.n-review-card',
            '.ProductReview',
            'iframe[src*="review"] + *',
            '[data-bem*="review"]'
        ];

        const reviewNodes = new Set();
        for (const selector of yandexSelectors) {
            try {
                const found = document.querySelectorAll(selector);
                found.forEach(node => {
                    try {
                        if (node && node.innerText && node.innerText.trim().length > 20) reviewNodes.add(node);
                    } catch (e) { /* ignore per-node */ }
                });
                if (found.length > 0) results.extractionMethods.push(`${selector}: ${found.length} элементов`);
            } catch (e) { /* ignore selector errors */ }
        }

        // 4) extract JSON-like reviews from scripts/data attributes
        const jsonReviews = extractReviewsFromPageData();

        // 5) collect and clean text from DOM nodes
        const allReviewTexts = [];
        reviewNodes.forEach(node => {
            try {
                const text = extractReviewText(node);
                const cleaned = cleanReviewText(text);
                if (isMeaningfulReview(cleaned)) {
                    allReviewTexts.push({ text: cleaned, source: 'dom', length: cleaned.length, element: node });
                }
            } catch (e) { /* ignore per-node */ }
        });

        // 6) append json reviews
        jsonReviews.forEach(review => {
            try {
                const cleaned = cleanReviewText(review);
                if (isMeaningfulReview(cleaned)) {
                    allReviewTexts.push({ text: cleaned, source: 'json', length: cleaned.length });
                }
            } catch (e) { /* ignore */ }
        });

        // 7) dedupe
        const uniqueReviews = removeDuplicateReviews(allReviewTexts);

        // 8) sort by length (more informative first)
        uniqueReviews.sort((a, b) => b.length - a.length);

        // 9) select optimal reviews under char limit
        const selected = selectOptimalReviews(uniqueReviews.map(r => r.text), maxCharacters);

        results.reviews = selected;
        results.totalFound = uniqueReviews.length;
        results.charactersUsed = selected.reduce((sum, r) => sum + (r ? r.length : 0), 0);

        return results;
    } catch (e) {
        console.warn('extractYandexMarketReviews error', e);
        return results;
    }
}

// helper: anonymize text (basic, расширяй при необходимости)
export function anonymizeText(text) {
    if (!text) return '';
    let t = String(text);
    // emails
    t = t.replace(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi, '[email]');
    // phones (простая маска)
    t = t.replace(/(\+?\d[\d\-\s()]{6,}\d)/g, '[phone]');
    // urls
    t = t.replace(/https?:\/\/\S+/gi, '[url]');
    // long numeric ids
    t = t.replace(/\b\d{6,}\b/g, '[id]');
    // trim
    if (t.length > 2000) t = t.slice(0, 2000) + '…';
    return t.trim();
}

// build payload preview (async, т.к. reading from chrome.storage)
export async function buildPayloadPreview(max = 20) {
    let reviews = [];
    try {
        // Если extractReviews — функция, вызываем её, иначе пустой массив
        if (typeof extractReviews === 'function') {
            reviews = extractReviews();
            if (!Array.isArray(reviews)) reviews = [];
        }
    } catch (e) {
        console.error('Ошибка при извлечении отзывов:', e);
        reviews = [];
    }

    // Анонимизация + урезка до max
    const anon = reviews.slice(0, max).map((r, i) => {
        const text = typeof r === 'string' ? r : (r.text || '');
        return {
            id: i + 1,
            text: anonymizeText(text),
            length: text.length
        };
    });

    // Извлечение информации о товаре
    let productMeta = {};
    try {
        if (typeof extractProductMeta === 'function') {
            productMeta = extractProductMeta() || {};
        }
    } catch (e) {
        console.error('Ошибка при извлечении мета данных продукта:', e);
        productMeta = {};
    }

    // Получаем URL сервера из chrome.storage
    const items = await chrome.storage.sync.get({ serverUrl: '' });

    return {
        version: '1.0',
        source: location.hostname,
        serverUrlPreview: items.serverUrl || '',
        product: {
            url: location.href,
            title: document.title,
            avgRating: productMeta.avgRating ?? null,
            totalRatings: productMeta.totalRatings ?? null
        },
        reviewsCount: anon.length,
        reviewsSample: anon
    };
}

// small helper to escape pre content (so HTML tags in text don't influence)
export function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

