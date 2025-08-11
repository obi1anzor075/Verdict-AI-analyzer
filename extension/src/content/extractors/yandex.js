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
export async function buildPayloadPreview() {
    const max = 20;

    let reviews = [];
    try {
        // Если extractReviews — функция, вызываем её, иначе пустой массив
        if (typeof extractReviews === 'function') {
            reviews = extractReviews(max);
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

// show modal inside shadow — improved
export function showPreviewModal(sr, payload = {}) {
    // Remove old modal if present
    const old = sr.getElementById ? sr.getElementById('ss-preview-modal') : sr.querySelector('#ss-preview-modal');
    if (old) {
        try {
            old.style.animation = 'modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            setTimeout(() => old.remove(), 200);
        } catch (e) {
            old.remove();
        }
    }

    const modal = document.createElement('div');
    modal.id = 'ss-preview-modal';

    // Extract data from payload
    const productTitle = payload.product?.title || document.title || 'Неизвестный товар';
    const productUrl = payload.product?.url || location.href;
    const payloadText = JSON.stringify(payload, null, 2);
    const payloadBytes = new Blob([payloadText]).size;
    const truncated = payload._truncated === true;

    // Helper functions
    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function shortenUrl(url) {
        try {
            const u = new URL(url);
            const path = u.pathname.length > 24 ? u.pathname.slice(0, 21) + '…' : u.pathname;
            return `${u.hostname}${path}`;
        } catch (e) {
            return url.length > 40 ? url.slice(0, 37) + '…' : url;
        }
    }

    function formatBytes(bytes) {
        if (!bytes || bytes < 1024) return `${bytes} Б`;
        if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} КБ`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} МБ`;
    }

    function shortenTitle(title, maxLength = 45) {
        return title.length > maxLength ? title.slice(0, maxLength) + '…' : title;
    }

    // Build modal HTML
    modal.innerHTML = `
        <div class="pm-header">
            <div>
                <div class="pm-title">Предпросмотр отправляемых данных</div>
                <div class="pm-sub">Проверьте информацию перед отправкой на сервер для анализа</div>
            </div>
            <button class="pm-close" title="Закрыть" aria-label="Закрыть модальное окно">×</button>
        </div>

        <div class="pm-body">
            <div class="pm-summary">
                <div class="pm-summary-row">
                    <div style="flex: 1;">
                        <div class="pm-label">Товар</div>
                        <div class="pm-value" title="${escapeHtml(productTitle)}">${escapeHtml(shortenTitle(productTitle))}</div>
                    </div>
                </div>

                <div class="pm-summary-row">
                    <div style="flex: 1;">
                        <div class="pm-label">Ссылка</div>
                        <div class="pm-value">
                            <a href="${escapeHtml(productUrl)}" class="pm-link" target="_blank" rel="noopener noreferrer"
                               title="${escapeHtml(productUrl)}">${escapeHtml(shortenUrl(productUrl))}</a>
                        </div>
                    </div>
                </div>

                <div class="pm-meta">
                    <div class="pm-meta-item">
                        <span class="pm-meta-label">Размер данных:</span>
                        <span class="pm-meta-value">${formatBytes(payloadBytes)}</span>
                    </div>
                    ${payload.rating ? `
                    <div class="pm-meta-item">
                        <span class="pm-meta-label">Рейтинг:</span>
                        <span class="pm-meta-value">${payload.rating}</span>
                    </div>
                    ` : ''}
                </div>

                ${truncated ? `
                <div class="pm-warning">
                    <span>⚠️</span>
                    <span>Данные были усечены до допустимого лимита размера</span>
                </div>
                ` : ''}
            </div>

            <details class="pm-dev">
                <summary>Технические детали (JSON)</summary>
                <pre>${escapeHtml(payloadText)}</pre>
            </details>
        </div>

        <div class="pm-actions">
            <button class="btn-copy" title="Копировать JSON данные">
                <span>📋</span>
                <span class="btn-text">Копировать</span>
            </button>
            <button class="btn-download" title="Скачать JSON файл">
                <span>💾</span>
                <span class="btn-text">Скачать</span>
            </button>
            <button class="btn-close-action" title="Закрыть окно">Закрыть</button>
        </div>
    `;

    // Add to shadow root
    sr.appendChild(modal);

    // Get elements
    const btnClose = modal.querySelector('.pm-close');
    const btnCloseAction = modal.querySelector('.btn-close-action');
    const btnCopy = modal.querySelector('.btn-copy');
    const btnDownload = modal.querySelector('.btn-download');
    const productLink = modal.querySelector('.pm-link');

    // Remove modal function
    function removeModal() {
        try {
            modal.style.animation = 'modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            setTimeout(() => {
                try { modal.remove(); } catch (e) { /* ignore */ }
            }, 200);
        } catch (e) {
            try { modal.remove(); } catch (e2) { /* ignore */ }
        }
        document.removeEventListener('keydown', onKeyDown);
    }

    // Event handlers
    btnClose?.addEventListener('click', removeModal);
    btnCloseAction?.addEventListener('click', removeModal);

    // Copy functionality with visual feedback
    btnCopy?.addEventListener('click', async () => {
        const originalText = btnCopy.querySelector('.btn-text')?.textContent || 'Копировать';
        const textEl = btnCopy.querySelector('.btn-text');

        try {
            await navigator.clipboard.writeText(payloadText);
            btnCopy.classList.add('btn-success');
            if (textEl) textEl.textContent = 'Скопировано!';

            setTimeout(() => {
                btnCopy.classList.remove('btn-success');
                if (textEl) textEl.textContent = originalText;
            }, 1500);
        } catch (e) {
            btnCopy.classList.add('btn-error');
            if (textEl) textEl.textContent = 'Ошибка!';

            setTimeout(() => {
                btnCopy.classList.remove('btn-error');
                if (textEl) textEl.textContent = originalText;
            }, 1500);

            // Fallback: try to select text
            try {
                const pre = modal.querySelector('pre');
                if (pre) {
                    const range = document.createRange();
                    range.selectNodeContents(pre);
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            } catch (e2) { /* ignore */ }
        }
    });

    // Download functionality
    btnDownload?.addEventListener('click', () => {
        const originalText = btnDownload.querySelector('.btn-text')?.textContent || 'Скачать';
        const textEl = btnDownload.querySelector('.btn-text');

        try {
            const blob = new Blob([payloadText], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');

            a.href = url;
            a.download = `shopsage-data-${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}.json`;

            // Temporarily append to document for download
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);

            // Success feedback
            btnDownload.classList.add('btn-success');
            if (textEl) textEl.textContent = 'Скачано!';

            setTimeout(() => {
                btnDownload.classList.remove('btn-success');
                if (textEl) textEl.textContent = originalText;
            }, 1500);

        } catch (e) {
            btnDownload.classList.add('btn-error');
            if (textEl) textEl.textContent = 'Ошибка!';

            setTimeout(() => {
                btnDownload.classList.remove('btn-error');
                if (textEl) textEl.textContent = originalText;
            }, 1500);

            console.error('Download failed:', e);
        }
    });

    // Safe external link opening
    productLink?.addEventListener('click', (ev) => {
        ev.preventDefault();
        try {
            window.open(productUrl, '_blank', 'noopener,noreferrer');
        } catch (e) {
            console.warn('Could not open product URL:', e);
        }
    });

    // Close on ESC key
    function onKeyDown(ev) {
        if (ev.key === 'Escape') {
            removeModal();
        }
    }
    document.addEventListener('keydown', onKeyDown);

    // Close on click outside modal (optional)
    modal.addEventListener('click', (ev) => {
        if (ev.target === modal) {
            removeModal();
        }
    });

    return modal;
}

export function showSettingsModal(sr, settings = {}) {

}


// small helper to escape pre content (so HTML tags in text don't influence)
export function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

