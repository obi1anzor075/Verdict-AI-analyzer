// content/extractors/index.js
// Фолбэк-извлечение отзывов для общих сайтов.
// Возвращает массив строк (текстов отзывов).
import { extractYandexMarketReviews } from './yandex.js';

export function extractReviews(maxItems = 60) {
    // Определяем, находимся ли мы на Яндекс.Маркете
    const isYandexMarket = window.location.hostname.includes('market.yandex') ||
        document.title.includes('Яндекс.Маркет') ||
        document.querySelector('[data-baobab-name*="market"]');

    if (isYandexMarket) {
        console.log('ShopSage: Detected Yandex Market, using enhanced extraction');
        const result = extractYandexMarketReviews(15000);

        // Возвращаем в том же формате, что ожидает основной код
        return result.reviews;
    }

    // Fallback на стандартную функцию для других сайтов
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

    const nodes = [];
    for (const selector of selectors) {
        const found = document.querySelectorAll(selector);
        if (found && found.length) {
            nodes.push(...Array.from(found));
            break; // используем первый рабочий селектор
        }
    }

    const texts = nodes
        .map(n => n.innerText ? n.innerText.trim() : '')
        .filter(t => t && t.length > 30)
        .slice(0, maxItems);

    console.debug('ShopSage: Standard extraction found', texts.length, 'reviews');
    return texts;
}
