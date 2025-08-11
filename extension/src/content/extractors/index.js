// content/extractors/index.js
// Фолбэк-извлечение отзывов для общих сайтов.
// Возвращает массив строк (текстов отзывов).
import { extractYandexMarketReviews } from './yandex.js';
import { anonymizeText } from '../utils.js';

export function extractReviews(maxItems = 20) {
    const isYandexMarket =
        window.location.hostname.includes('market.yandex') ||
        document.title.includes('Яндекс.Маркет') ||
        document.querySelector('[data-baobab-name*="market"]');

    if (isYandexMarket) {
        const result = extractYandexMarketReviews(15000);
        const reviews = result && result.reviews ? result.reviews : [];

        return reviews
            .map(r => {
                const raw = typeof r === 'string' ? r : (r && (r.text || r.review || '')) || '';
                return { raw, anon: anonymizeText(String(raw)) };
            })
            .filter(x => x.raw && x.raw.length > 30)   // фильтр по оригиналу
            .map(x => x.anon)
            .slice(0, maxItems);
    }

    const selectors = [
        '[data-zone-name="review"]',
        '[data-autotest-id="review-card"]',
        '.review__item',
        '.product-review',
        '.review',
        '.comments-item',
        '[data-test-id*="review"]',
        '.feedback',
        '.pa-review',
        '.review-item',
        '.reviewCard'
    ];

    let nodes = [];
    for (const selector of selectors) {
        const found = document.querySelectorAll(selector);
        if (found && found.length) {
            nodes = Array.from(found);
            break;
        }
    }

    const texts = nodes
        .map(n => {
            const raw = n?.textContent || n?.innerText || '';
            const trimmed = raw.trim();
            return trimmed ? anonymizeText(trimmed) : '';
        })
        .filter(t => t && t.length > 30)
        .slice(0, maxItems);

    console.debug('ShopSage: Standard extraction found', texts.length, 'reviews');
    return texts;
}

export function formatRatingHTML(value) {
    if (value == null) return '—';
    const safe = Math.round(value * 10) / 10; // 1 decimal
    // маленькая SVG-звезда (встроенная)
    const starSVG = `<svg class="star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.167L12 18.896l-7.336 3.868 1.402-8.167L.132 9.21l8.2-1.192z"/></svg>`;
    return `${safe} ${starSVG}`;
}
