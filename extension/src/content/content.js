/* content.js — Shadow DOM based ShopSage sidebar (robust + non-invasive) */
/* Исправлено: улучшенная обработка ошибок и корректная отправка данных */

// === popup -> content bridge ===
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  try {
    if (!msg || !msg.action) return;
    if (msg.action === 'OPEN_SIDEBAR') {
      const cfg = msg.config || {};
      // save to storage for later use by content script
      chrome.storage.sync.set({
        serverUrl: cfg.serverUrl || '',
        maxReviews: cfg.maxReviews != null ? cfg.maxReviews : undefined
      }, () => {
        // try to call existing open/create sidebar function
        if (typeof openSidebar === 'function') {
          openSidebar();
          sendResponse({ ok: true, message: 'openSidebar() called' });
        } else if (typeof createSidebar === 'function') {
          createSidebar();
          sendResponse({ ok: true, message: 'createSidebar() called' });
        } else {
          // fallback: attempt to click floating button if it exists
          const btn = document.getElementById('shopsage-open-btn') ||
            document.getElementById('shopsage-open-btn-v2') ||
            document.getElementById('shopsage-open-btn-v3');
          if (btn) {
            try {
              btn.click();
              sendResponse({ ok: true, message: 'button clicked' });
            } catch (e) {
              sendResponse({ ok: false, message: 'failed to call open', error: String(e) });
            }
          } else {
            sendResponse({ ok: false, message: 'no sidebar open API found' });
          }
        }
      });
      // indicate we'll respond asynchronously
      return true;
    }
  } catch (e) {
    console.error('content.js bridge error', e);
    sendResponse({ ok: false, error: String(e) });
    return true;
  }
});

(function () {
  const ROOT_ID = 'shopsage-root-v3';
  const BTN_ID = 'shopsage-open-btn-v3';
  const APP_ACTION = 'ANALYZE';

  function extractYandexMarketReviews(maxCharacters = 15000) {
    console.log('ShopSage: Starting enhanced Yandex Market reviews extraction');

    const results = {
      reviews: [],
      totalFound: 0,
      charactersUsed: 0,
      extractionMethods: []
    };
    function tryAutoLoadMoreReviews() {
      // Попытка кликнуть явные кнопки и кнопки по тексту
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
              // Visible?
              const style = window.getComputedStyle(btn);
              if (style.display === 'none' || style.visibility === 'hidden' || btn.disabled) return;

              const text = (btn.innerText || btn.textContent || '').trim();
              // if selector was generic 'button' accept only if label looks like "Показать", "Ещё", "Загрузить"
              const wantsClick = /показать|еще|ещё|загрузить|more|show/i.test(text) || sel.indexOf('show-more') >= 0 || sel.indexOf('reviews-show-more') >= 0;
              if (wantsClick && !clicked.has(btn)) {
                btn.click();
                clicked.add(btn);
                // попробовать кликнуть ещё раз через небольшой таймаут
                setTimeout(() => { try { if (!btn.disabled) btn.click(); } catch (e) { } }, 900);
              }
            } catch (e) { console.warn('ShopSage: tryAutoLoadMoreReviews button click failed', e); }
          });
        } catch (e) { /* ignore selector errors */ }
      }

      // Также попытка прокрутки области отзывов (lazy load)
      try {
        const reviewsContainer = document.querySelector('[data-zone-name="reviews"], [data-auto="ugc-section"], .reviews, .n-reviews, .review-list, [data-auto="reviews"]');
        if (reviewsContainer) {
          try {
            reviewsContainer.scrollIntoView({ behavior: 'smooth' });
            reviewsContainer.scrollTop = reviewsContainer.scrollHeight;
          } catch (e) { /* ignore */ }
        } else {
          // общая прокрутка страницы в конец — иногда подгружает
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      } catch (e) { /* ignore */ }
    }


    // 1. Попытка автоматической загрузки дополнительных отзывов
    tryAutoLoadMoreReviews();


    // 2. Расширенные селекторы специально для Яндекс.Маркета
    const yandexSelectors = [
      // Основные селекторы для отзывов на ЯМ
      '[data-auto="review-item"]',
      '[data-zone-name="review"]',
      '[data-autotest-id="review-card"]',
      '[data-tid="review-item"]',
      '[data-auto="OpinionCard"]',
      '.opinion',
      '.review-item',
      '.user-review',

      // Дополнительные селекторы для разных версий ЯМ
      '[class*="review"]',
      '[class*="opinion"]',
      '[data-zone*="review"]',
      '.n-review-card',
      '.ProductReview',

      // Селекторы для iframe или вложенных элементов
      'iframe[src*="review"] + *',
      '[data-bem*="review"]'
    ];

    // 3. Поиск отзывов по всем селекторам
    const reviewNodes = new Set();

    for (const selector of yandexSelectors) {
      try {
        const found = document.querySelectorAll(selector);
        found.forEach(node => {
          if (node && node.innerText && node.innerText.trim().length > 20) {
            reviewNodes.add(node);
          }
        });

        if (found.length > 0) {
          results.extractionMethods.push(`${selector}: ${found.length} элементов`);
        }
      } catch (e) {
        console.warn('ShopSage: selector failed', selector, e);
      }
    }
    // Развертывание свернутых отзывов
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
            if (button.offsetHeight > 0) {
              button.click();
            }
          });
        } catch (e) {
          console.warn('ShopSage: Failed to expand review', selector, e);
        }
      }
    }
    // 4. Попытка найти скрытые/свернутые отзывы и развернуть их
    expandCollapsedReviews();

    // Извлечение отзывов из JSON данных на странице
    function extractReviewsFromPageData() {
      const reviews = [];

      try {
        // Поиск в script тегах
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
          if (script.textContent) {
            // Поиск различных паттернов JSON с отзывами
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
                    // Очистка от экранирования
                    const cleanText = match[1]
                      .replace(/\\n/g, ' ')
                      .replace(/\\"/g, '"')
                      .replace(/\\\\/g, '\\')
                      .trim();

                    if (cleanText.length > 30) {
                      reviews.push(cleanText);
                    }
                  }
                } catch (e) {
                  // Игнорируем ошибки парсинга отдельных совпадений
                }
              };
            });
          }
        });

        // Поиск в data-атрибутах
        const dataElements = document.querySelectorAll('[data-bem]');
        dataElements.forEach(el => {
          Object.values(el.dataset).forEach(dataValue => {
            if (dataValue && dataValue.length > 100) {
              try {
                const parsed = JSON.parse(dataValue);
                if (parsed.reviews || parsed.opinions) {
                  const reviewsData = parsed.reviews || parsed.opinions;
                  if (Array.isArray(reviewsData)) {
                    reviewsData.forEach(review => {
                      const text = review.text || review.content || review.comment;
                      if (text && text.length > 30) {
                        reviews.push(text);
                      }
                    });
                  }
                }
              } catch (e) {
                // Игнорируем невалидный JSON
              }
            }
          });
        });

      } catch (e) {
        console.warn('ShopSage: Error extracting from JSON data', e);
      }

      return reviews;
    }

    // 5. Поиск в JSON данных на странице
    const jsonReviews = extractReviewsFromPageData();

    // 6. Обработка найденных элементов с оптимизацией по символам
    const allReviewTexts = [];

    // Очистка текста отзыва
    function cleanReviewText(text) {
      if (!text) return '';

      // base normalize
      let t = String(text).replace(/\r\n|\r/g, '\n').replace(/\t/g, ' ').replace(/\u00A0/g, ' ');
      t = t.replace(/\s+/g, ' ').trim();

      // 1) Удаляем длинные последовательности цифр/идентификаторов (например "0 0 1 1  ...", "123 456 789")
      t = t.replace(/\b(?:\d+\s+){3,}\d+\b/g, ' ');
      // 2) Удаляем одиночные длинные номера/ид (>=3 цифр)
      t = t.replace(/\b\d{3,}\b/g, ' ');
      // 3) Удаляем повторяющиеся группы типа "0 0   1    1" (любые 3+ подряд цифр/групп)
      t = t.replace(/(?:\b\d+\b[\s,.-]*){3,}/g, ' ');

      // 4) Оставляем только буквы (любые Unicode), цифры и базовую пунктуацию
      try {
        t = t.replace(/[^\p{L}\p{N}\s\.,!?\-()«»—:;\/%]/gu, ' ');
      } catch (e) {
        // если окружение не поддерживает \p{L}, используем упрощённый диапазон (кириллица+латиница)
        t = t.replace(/[^A-Za-zА-Яа-яЁё0-9\s\.,!?\-()«»—:;\/%]/g, ' ');
      }

      // 5) Сжать повторную пунктуацию и пробелы
      t = t.replace(/([,!.?–—\-]){2,}/g, '$1'); // "!!" -> "!"
      t = t.replace(/\s+/g, ' ').trim();

      return t;
    }


    // Улучшенная функция извлечения текста отзыва
    function extractReviewText(element) {
      if (!element) return '';

      // Попытка найти основной текст отзыва внутри элемента
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

      // Сначала попробуем найти специфичный селектор для текста
      for (const selector of textSelectors) {
        const textEl = element.querySelector(selector);
        if (textEl && textEl.innerText && textEl.innerText.trim().length > 20) {
          return cleanReviewText(textEl.innerText);
        }
      }

      // Если не нашли, возьмем весь текст элемента, но очистим от служебного
      let fullText = element.innerText || element.textContent || '';

      // Удаляем типичные служебные фразы Яндекс.Маркета
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

      servicePatterns.forEach(pattern => {
        fullText = fullText.replace(pattern, ' ');
      });

      return cleanReviewText(fullText);
    }

    function isMeaningfulReview(text) {
      if (!text) return false;
      const len = text.length;

      // минимальная длина после очистки
      if (len < 40) return false;

      // процент цифр — слишком много цифр = шум
      const digits = (text.match(/\d/g) || []).length;
      if (digits / Math.max(1, len) > 0.30) return false; // если >30% символов — скорее метаданные

      // требует некоторого количества букв (кириллица или латиница)
      const letters = (text.match(/[A-Za-zА-Яа-яЁё]/g) || []).length;
      if (letters < 12) return false;

      // для русских сайтов — предпочтительно наличие кириллицы
      const cyr = (text.match(/[А-Яа-яЁё]/g) || []).length;
      if (cyr < Math.min(10, Math.floor(len * 0.2))) return false;

      // отбросить если текст выглядит как CSV/header
      if (/^(source|businessId|notEmpty|id|source,)/i.test(text.trim())) return false;

      return true;
    }


    // Добавляем отзывы из DOM
    reviewNodes.forEach(node => {
      const text = extractReviewText(node);
      const cleaned = cleanReviewText(text);
      if (isMeaningfulReview(cleaned)) {
        allReviewTexts.push({ text: cleaned, source: 'dom', length: cleaned.length, element: node });
      }
    });

    // Добавляем отзывы из JSON
    jsonReviews.forEach(review => {
      const cleaned = cleanReviewText(review);
      if (isMeaningfulReview(cleaned)) {
        allReviewTexts.push({ text: cleaned, source: 'json', length: cleaned.length });
      }
    });

    // Удаление дубликатов отзывов
    function removeDuplicateReviews(reviews) {
      const seen = new Set();
      const unique = [];

      reviews.forEach(review => {
        // Создаем "отпечаток" отзыва для сравнения
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

    // 7. Удаление дубликатов по содержимому
    const uniqueReviews = removeDuplicateReviews(allReviewTexts);

    // 8. Сортировка по длине (сначала более информативные)
    uniqueReviews.sort((a, b) => b.length - a.length);

    // Оптимальный отбор отзывов под лимит символов
    function selectOptimalReviews(reviews, maxCharacters) {
      const selected = [];
      let totalChars = 0;
      const separator = '\n\n';
      const separatorLength = separator.length;

      // Стратегия: берем максимально информативные отзывы
      // Приоритет: длинные отзывы (более информативные), но не слишком длинные
      const sortedReviews = reviews.sort((a, b) => {
        const aScore = Math.min(a.length, 500) / Math.max(a.length, 500); // предпочитаем отзывы до 500 символов
        const bScore = Math.min(b.length, 500) / Math.max(b.length, 500);
        return bScore - aScore;
      });

      for (const review of sortedReviews) {
        const reviewLength = review.length;
        const neededLength = totalChars === 0 ? reviewLength : reviewLength + separatorLength;

        if (totalChars + neededLength <= maxCharacters) {
          selected.push(review);
          totalChars += neededLength;
        } else if (totalChars === 0) {
          // Если даже первый отзыв не помещается, обрезаем его
          const truncatedText = review.text.substring(0, maxCharacters - 3) + '...';
          selected.push({
            ...review,
            text: truncatedText,
            length: truncatedText.length
          });
          totalChars = truncatedText.length;
          break;
        } else {
          // Пытаемся уместить обрезанную версию
          const availableSpace = maxCharacters - totalChars - separatorLength;
          if (availableSpace > 50) { // минимум 50 символов для осмысленного фрагмента
            const truncatedText = review.text.substring(0, availableSpace - 3) + '...';
            selected.push({
              ...review,
              text: truncatedText,
              length: truncatedText.length
            });
            break;
          } else {
            break; // места больше нет
          }
        }
      }

      return selected;
    }

    // 9. Оптимальный отбор отзывов до лимита символов
    const selectedReviews = selectOptimalReviews(uniqueReviews, maxCharacters);

    results.reviews = selectedReviews.map(r => r.text);
    results.totalFound = uniqueReviews.length;
    results.charactersUsed = selectedReviews.reduce((sum, r) => sum + r.length, 0);

    console.log('ShopSage: Enhanced extraction results', results);
    return results;
  }

  /* Extract product metadata: total reviews and rating (best-effort) */
  function extractProductMeta() {
    const meta = { totalReviews: null, rating: null, totalRatings: null, avgRating: null };

    function parseNumber(s) {
      if (s == null) return null;
      const str = String(s).trim();
      if (!str) return null;
      // handle "14K", "4.8K"
      const kMatch = str.match(/([\d.,]+)\s*[Kk]/);
      if (kMatch) {
        const num = parseFloat(kMatch[1].replace(',', '.'));
        if (Number.isFinite(num)) return Math.round(num * 1000);
      }
      const cleaned = str.replace(/\s+/g, '').replace(/[^0-9\.,]/g, '').replace(',', '.');
      const n = parseFloat(cleaned);
      return Number.isFinite(n) ? n : null;
    }

    // 1) стандартные meta-теги (reviewCount / rating)
    try {
      const reviewCountMeta = document.querySelector('meta[itemprop="reviewCount"], meta[name="reviewCount"], meta[name="reviews"]');
      if (reviewCountMeta && reviewCountMeta.content) meta.totalReviews = Math.round(parseNumber(reviewCountMeta.content)) || null;
    } catch (e) { /* ignore */ }
    try {
      const ratingMeta = document.querySelector('meta[itemprop="ratingValue"], meta[name="rating"], meta[itemprop="rating"]');
      if (ratingMeta && ratingMeta.content) meta.rating = Math.round(parseNumber(ratingMeta.content) * 100) / 100 || null;
    } catch (e) { /* ignore */ }

    // 2) Попытка найти число ОЦЕНОК (votes / оценок / голосов) - видимые селекторы
    try {
      const ratingCountSelectors = [
        '[data-auto="rating-count-text"]', '.rating-count', '.reviews-count', '.votes-count', '.ratings-count',
        '.rating__count', '.rate__count', '.count-ratings', '[data-test="ratings-count"]'
      ];
      for (const sel of ratingCountSelectors) {
        try {
          const el = document.querySelector(sel);
          if (el && (el.innerText || el.textContent)) {
            const n = parseNumber(el.innerText || el.textContent);
            if (n != null) { meta.totalRatings = Math.round(n); break; }
          }
        } catch (e) { /* ignore */ }
      }

      // aria-label / общий текст как запасной вариант
      if (meta.totalRatings == null) {
        const all = Array.from(document.querySelectorAll('[aria-label]'));
        for (const el of all) {
          const lbl = el.getAttribute('aria-label') || '';
          const m = lbl.match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голос|голосов|votes|ratings)/i);
          if (m) { meta.totalRatings = Math.round(parseNumber(m[1])); break; }
        }
      }
      if (meta.totalRatings == null) {
        const body = document.body.innerText || '';
        const m2 = body.match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голосов|votes|ratings)/i);
        if (m2) meta.totalRatings = Math.round(parseNumber(m2[1]));
      }
    } catch (e) { /* ignore */ }

    // 3) Попытка найти средний рейтинг (avg rating) — видимые селекторы
    try {
      const avgSelectors = [
        '[data-auto="rating"]', '[data-auto="rating-value"]', '.average-rating', '.avg-rating', '.rating-value',
        '.rating__value', '.product-rating', '.ds-text_weight_bold'
      ];
      for (const sel of avgSelectors) {
        try {
          const el = document.querySelector(sel);
          if (el && (el.innerText || el.textContent)) {
            const n = parseNumber(el.innerText || el.textContent);
            if (n != null) { meta.avgRating = Math.round(n * 100) / 100; break; }
          }
        } catch (e) { /* ignore */ }
      }

      // aria / текстовый поиск ("рейтинг 4.6")
      if (meta.avgRating == null) {
        const all = Array.from(document.querySelectorAll('[aria-label]'));
        for (const el of all) {
          const lbl = el.getAttribute('aria-label') || '';
          const m = lbl.match(/([0-5](?:[.,][0-9])?)\s*(зв|звезды|рейтинг|rating)/i);
          if (m) { meta.avgRating = parseNumber(m[1]); break; }
        }
      }
      if (meta.avgRating == null) {
        const body = document.body.innerText || '';
        const m2 = body.match(/(?:средн(?:ий|ая)\s*рейтинг|рейтинг|rating)[:\s]*([0-5](?:[.,][0-9])?)/i);
        if (m2) meta.avgRating = parseNumber(m2[1]);
      }
    } catch (e) { /* ignore */ }

    // 4) Специально для ЯМ: data-zone-name="rating" с атрибутами ratingvalue/ratingcount/reviewcount
    try {
      const ratingBlock = document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');
      if (ratingBlock) {
        const rv = ratingBlock.getAttribute('ratingvalue') || ratingBlock.getAttribute('data-ratingvalue');
        const rc = ratingBlock.getAttribute('ratingcount') || ratingBlock.getAttribute('data-ratingcount') || ratingBlock.getAttribute('raitingcounttext') || ratingBlock.getAttribute('data-ratingcounttext');
        const revc = ratingBlock.getAttribute('reviewcount') || ratingBlock.getAttribute('data-reviewcount') || ratingBlock.getAttribute('reviewcounttext') || ratingBlock.getAttribute('data-reviewcounttext');

        if (rv && meta.avgRating == null) meta.avgRating = parseNumber(rv);
        if (rc && meta.totalRatings == null) {
          const m = String(rc).match(/([0-9\s,.Kk]+)/);
          if (m) {
            const cleaned = m[1].replace(/\s+/g, '');
            meta.totalRatings = Math.round(parseNumber(cleaned));
          }
        }
        if (revc && meta.totalReviews == null) {
          const m2 = String(revc).match(/([0-9\s,.Kk]+)/);
          if (m2) meta.totalReviews = Math.round(parseNumber(m2[1]));
        }
      }
    } catch (e) { /* ignore */ }

    // 5) Попытка использовать extractRatingBreakdown() (если доступна) для дозаполнения
    try {
      if (typeof extractRatingBreakdown === 'function') {
        const br = extractRatingBreakdown();
        if (br) {
          if (meta.avgRating == null && br.avg != null) meta.avgRating = br.avg;
          if (meta.totalRatings == null && br.totalRatings != null) meta.totalRatings = br.totalRatings;
          if (meta.totalReviews == null && br.totalReviews != null) meta.totalReviews = br.totalReviews;
        }
      }
    } catch (e) { /* ignore */ }

    // fallback: старые поля
    if (meta.totalRatings == null && meta.totalReviews != null) meta.totalRatings = meta.totalReviews;
    if (meta.avgRating == null && meta.rating != null) meta.avgRating = meta.rating;

    // final normalization
    if (typeof meta.totalRatings === 'number' && Number.isFinite(meta.totalRatings)) meta.totalRatings = Math.round(meta.totalRatings);
    else meta.totalRatings = null;
    if (typeof meta.avgRating === 'number' && Number.isFinite(meta.avgRating)) meta.avgRating = Math.round(meta.avgRating * 100) / 100;
    else meta.avgRating = null;

    // сохраняем совместимость со старыми полями
    meta.totalReviews = meta.totalReviews || null;
    meta.rating = meta.rating || null;

    console.debug('ShopSage: product meta extracted', meta);
    return meta;
  }


  function extractRatingBreakdown() {
    // Возвращает объект {5: n5,4: n4,3: n3,2: n2,1: n1, avg: <число|null>, totalRatings: <число|null>, totalReviews: <число|null>}
    const out = { 5: null, 4: null, 3: null, 2: null, 1: null, avg: null, totalRatings: null, totalReviews: null };

    function parseNumber(s) {
      if (s == null) return null;
      const cleaned = String(s).trim().replace(/\s+/g, '').replace(/[^0-9\.,Kk]/g, '');
      if (/k$/i.test(cleaned)) {
        // "14K" -> 14000 (примерно)
        return Math.round(parseFloat(cleaned.replace(/k$/i, '')) * 1000);
      }
      const n = parseFloat(cleaned.replace(',', '.'));
      return Number.isFinite(n) ? Math.round(n) : null;
    }

    try {
      // 1) основной быстрый путь — блок с атрибутами ratingvalue/ratingcount/reviewcount
      const ratingNode = document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');
      if (ratingNode) {
        const rv = ratingNode.getAttribute('ratingvalue') || ratingNode.getAttribute('data-ratingvalue');
        const rc = ratingNode.getAttribute('ratingcount') || ratingNode.getAttribute('data-ratingcount') || ratingNode.getAttribute('raitingcounttext');
        const revc = ratingNode.getAttribute('reviewcount') || ratingNode.getAttribute('data-reviewcount') || ratingNode.getAttribute('reviewcounttext');

        if (rv) out.avg = parseFloat(String(rv).replace(',', '.')) || out.avg;
        if (rc) out.totalRatings = parseNumber(rc) || out.totalRatings;
        if (revc) out.totalReviews = parseNumber(revc) || out.totalReviews;
      }

      // 2) явный текстовый селектор (как в примере — data-auto="rating-count-text", data-auto="review-count-text")
      const ratingCountEl = document.querySelector('[data-auto="rating-count-text"], [data-auto="ratingCount"], .rating-count, .ds-text[data-auto="rating-count-text"]');
      const reviewCountEl = document.querySelector('[data-auto="review-count-text"], .review-count, .ds-text[data-auto="review-count-text"]');
      if (ratingCountEl && !out.totalRatings) {
        out.totalRatings = parseNumber(ratingCountEl.innerText || ratingCountEl.textContent) || out.totalRatings;
      }
      if (reviewCountEl && !out.totalReviews) {
        out.totalReviews = parseNumber(reviewCountEl.innerText || reviewCountEl.textContent) || out.totalReviews;
      }

      // 3) Попытка собрать breakdown по звёздам — ищем строки/элементы с "5" рядом с числом
      const histSelectors = [
        '.rating-breakdown', '.rating-histogram', '.rating-list', '.rating-distribution',
        '[data-auto="rating-breakdown"]', '.review-stats', '.rating-row', '.ratingRow', '.ds-rating-list'
      ];
      for (const sel of histSelectors) {
        const root = document.querySelector(sel);
        if (!root) continue;
        const nodes = Array.from(root.querySelectorAll('*'));
        let found = 0;
        for (const n of nodes) {
          const txt = (n.textContent || '').trim();
          // шаблон: "5 — 123" или "5 123" или "5 звезд — 123"
          const m = txt.match(/^\s*([1-5])\D{0,6}([0-9\s,.Kk]{1,12})\s*$/);
          if (m) {
            const star = Number(m[1]);
            const cnt = parseNumber(m[2]);
            if (star >= 1 && star <= 5 && cnt != null) {
              out[star] = cnt;
              found++;
            }
          } else {
            // иногда количество находится в соседнем элементе
            const maybeStar = txt.match(/^\s*([1-5])\s*$/);
            if (maybeStar) {
              const star = Number(maybeStar[1]);
              // попытка найти число в соседях
              let cnt = null;
              const sibling = n.nextElementSibling || n.parentElement && n.parentElement.querySelector('.count, .value, .number, .ds-text');
              if (sibling) cnt = parseNumber(sibling.textContent || sibling.innerText);
              if (cnt != null) { out[star] = cnt; found++; }
            }
          }
        }
        if (found > 0) break;
      }

      // 4) fallback: парсим <noframes data-apiary="patch"> JSON, часто там есть ratings/reviews
      const noframes = Array.from(document.querySelectorAll('noframes[data-apiary="patch"]'));
      for (const nf of noframes) {
        const txt = (nf.textContent || '').trim();
        if (!txt) continue;
        try {
          const j = JSON.parse(txt);
          // вероятные места: widgets/... атрибуты или collections.businessReviewStats
          // По примеру: j.collections.businessReviewStats[<id>].reviewsCount
          if (j.collections && j.collections.businessReviewStats) {
            const ids = Object.keys(j.collections.businessReviewStats);
            if (ids.length) {
              const stats = j.collections.businessReviewStats[ids[0]];
              if (stats) {
                if (stats.reviewsCount && !out.totalReviews) out.totalReviews = Number(stats.reviewsCount) || out.totalReviews;
                if (stats.reviewsCountVisualization && !out.totalRatings) {
                  // "4.8K" -> approx
                  const m = String(stats.reviewsCountVisualization).match(/([\d.,]+)K/i);
                  if (m) out.totalRatings = Math.round(parseFloat(m[1].replace(',', '.')) * 1000);
                }
              }
            }
          }
          // ищем в любом месте ключи ratingvalue/ratingcount/reviewcount
          const str = txt;
          const mRv = str.match(/"ratingvalue"\s*:\s*"?(?<rv>[0-9.,]+)"?/i);
          const mRc = str.match(/"ratingcount"\s*:\s*(?<rc>\d+)/i);
          const mRev = str.match(/"reviewcount"\s*:\s*(?<rev>\d+)/i);
          if (mRv && mRv.groups && mRv.groups.rv) out.avg = parseFloat(mRv.groups.rv.replace(',', '.')) || out.avg;
          if (mRc && mRc.groups && mRc.groups.rc) out.totalRatings = Number(mRc.groups.rc) || out.totalRatings;
          if (mRev && mRev.groups && mRev.groups.rev) out.totalReviews = Number(mRev.groups.rev) || out.totalReviews;
        } catch (e) {
          // JSON.parse может падать — игнорируем
        }
      }
    } catch (e) {
      // ничего — возвращаем то, что есть
    }

    // Нормализация: если некоторые значения пусты — ставим null
    ['5', '4', '3', '2', '1'].forEach(s => { if (out[s] == null) out[s] = null; });
    if (out.avg != null) out.avg = Math.round(Number(out.avg) * 100) / 100;
    if (out.totalRatings != null) out.totalRatings = Math.round(Number(out.totalRatings));
    if (out.totalReviews != null) out.totalReviews = Math.round(Number(out.totalReviews));

    return out;
  }



  /* Create visible floating button */
  function injectButton() {
    if (document.getElementById(BTN_ID)) return;
    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.title = 'Открыть Вердикт';
    Object.assign(btn.style, {
      position: 'fixed',
      right: '18px',
      bottom: '80px',
      width: '72px',
      height: '72px',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'rgba(66, 147, 228, 0.36) 0px 12px 36px, rgba(79, 70, 229, 0.12) 0px 2px 6px inset',
      cursor: 'pointer',
      zIndex: '2147483646',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform .18s ease, box-shadow .18s ease',
      padding: '0',
      userSelect: 'none'
    });

    // Устанавливаем картинку
    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('assets/icons/icon.svg');
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.borderRadius = '50%';
    img.style.objectFit = 'cover';
    btn.appendChild(img);

    btn.addEventListener('click', openSidebar);
    btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-6px) scale(1.04)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'none');

    document.body.appendChild(btn);
  }

  /* Create/eject shadow-root sidebar */
  function openSidebar() {
    if (document.getElementById(ROOT_ID)) {
      // if present, toggle visibility
      const root = document.getElementById(ROOT_ID);
      const host = root._hostElement;
      if (!host) return;
      const visible = host.style.opacity === '1';
      if (visible) closeSidebar();
      else host.style.opacity = '1', host.style.transform = 'translateY(0) scale(1)';
      return;
    }

    // Host element appended to body
    const rootWrapper = document.createElement('div');
    rootWrapper.id = ROOT_ID;
    Object.assign(rootWrapper.style, {
      all: 'initial',
      position: 'fixed',
      right: '20px',
      top: '60px',
      zIndex: '2147483647',
      pointerEvents: 'auto'
    });

    // attach shadow root
    const shadow = rootWrapper.attachShadow({ mode: 'open' });

    // store host for future toggles
    rootWrapper._hostElement = rootWrapper;

    // CSS styles
    const css = `
/* Base styles */
.shopsage-sidebar {
  width: 380px;
  max-height: calc(100vh - 120px);
  background: linear-gradient(180deg, #061226, #071431);
  color: #e6eef8;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(2,6,23,0.6);
  z-index: 999999;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  border: 1px solid rgba(255,255,255,0.03);
  backdrop-filter: blur(6px);
}
@keyframes slideInShadow {
  from { transform: translateY(6px) translateX(6px) scale(0.98); opacity: 0; }
  to { transform: none; opacity: 1; }
}
.ss-header {
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:12px 14px;
  border-bottom:1px solid rgba(255,255,255,0.03);
}
.brand { display:flex; align-items:center; gap:10px; }
.brand .title { font-weight:700; color: #eaf2ff; font-size:15px; }
.ss-close {
  background: transparent;
  border: 0;
  color: rgba(230,238,248,0.85);
  cursor: pointer;
  font-size: 16px;
  padding:6px;
  border-radius:8px;
}
.ss-close:hover { background: rgba(255,255,255,0.02); transform:scale(1.03); }

.ss-body { padding:12px; overflow:auto; max-height: calc(100vh - 160px); -webkit-overflow-scrolling: touch; }
.ss-controls { display:flex; align-items:center; gap:8px; margin-bottom:12px; flex-wrap:wrap; }
.btn-primary {
  background: linear-gradient(90deg, #7c3aed, #4f46e5);
  border: 0;
  padding: 8px 12px;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(79,70,229,0.18);
}
.btn-primary:active { transform: translateY(1px); }
.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ss-loader {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.06);
  border-top-color: #7c3aed;
  animation: spin 0.9s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.hidden { display:none; }

.ss-result section { margin-bottom:10px; }
.ss-result h4 {
  margin:0 0 6px 0;
  font-size:13px;
  color:#ffd54f;
}
.ss-result ul {
  margin:0;
  padding-left:18px;
  color:#cfe6ff;
}
.ss-verdict {
  background: rgba(255,255,255,0.02);
  padding:8px;
  border-radius:8px;
  color:#e8f4ff;
}

.pros-list, .cons-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; }
.pros-list li, .cons-list li {
  display:flex; gap:10px; align-items:flex-start;
  padding:8px; border-radius:8px;
  background: linear-gradient(180deg, rgba(255,255,255,0.006), rgba(0,0,0,0.01));
  transition: transform .12s ease, background .12s;
}
.pros-list li:hover, .cons-list li:hover { transform: translateY(-3px); background: rgba(255,255,255,0.01); }
.tag { min-width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:800; background: rgba(124,58,237,0.12); color:#f6f9ff; font-size:12px; }
.snippet { font-size:13px; color:#d7eaff; line-height:1.35; }

.ss-meta { color: rgba(207,230,255,0.9); font-size:13px; margin-left:6px; display:flex; gap:10px; align-items:center; }
.ss-meta .muted { color: rgba(154,164,178,0.9); font-size:12px; }

#ss-result { opacity:0; transform: translateY(6px); transition: opacity .26s ease, transform .26s ease; }
#ss-result.show { opacity:1; transform: translateY(0); }

/* Score UI */
.ss-score {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 0;
  padding: 10px;
  background: rgba(255,255,255,0.02);
  border-radius: 10px;
}
.score-badge {
  min-width: 64px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: #fff;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.score-bar {
  flex: 1;
  height: 14px;
  border-radius: 8px;
  background: rgba(255,255,255,0.05);
  overflow: hidden;
}
.score-bar-inner {
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(90deg, #ef4444, #f59e0b, #10b981);
  transition: width 600ms cubic-bezier(0.2, 0.9, 0.2, 1);
}
.score-sub {
  font-size: 11px;
  color: rgba(207,230,255,0.7);
  margin-top: 6px;
  line-height: 1.4;
}

/* Error message */
.error-msg {
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.2);
  color: #fca5a5;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
  font-size: 13px;
}

@media (max-width:520px) {
  .shopsage-sidebar { right:12px; left:12px; width:auto; top:36px; border-radius:12px; max-height: calc(100vh - 72px); }
}
    `.trim();

    // HTML structure with score UI
    const html = `
<aside class="shopsage-sidebar" role="dialog" aria-label="ShopSage">
  <header class="ss-header">
    <div class="brand">
      <img src="${chrome.runtime.getURL('assets/icons/icon.svg')}" alt="Verdict Logo" width="32" height="32">
      <div class="title">Вердикт</div>
    </div>
    <button class="ss-close" title="Закрыть">✕</button>
  </header>
  <main class="ss-body">
    <div class="ss-controls">
      <button id="ss-analyze" class="btn-primary">Анализировать отзывы</button>
      <div class="ss-info">Выбрано <span id="ss-count">0</span> отзывов</div>
      <div class="ss-meta">
        <div class="muted">Рейтинг: <strong id="ss-rating">—</strong></div>
        <div class="muted">Всего: <strong id="ss-total">—</strong></div>
      </div>
      <div id="ss-loader" class="ss-loader hidden" aria-hidden="true"></div>
    </div>

    <div id="ss-error" class="error-msg hidden"></div>

    <div class="ss-score hidden" id="ss-score-container">
      <div class="score-badge" id="ss-score-badge">—</div>
      <div class="score-bar">
        <div class="score-bar-inner" id="ss-score-bar-inner" style="width: 0%"></div>
      </div>
    </div>
    <div class="score-sub hidden" id="ss-score-sub"></div>

    <div id="ss-result" class="ss-result hidden" aria-live="polite">
      <section><h4>Плюсы</h4><ul id="ss-pros" class="pros-list"></ul></section>
      <section><h4>Минусы</h4><ul id="ss-cons" class="cons-list"></ul></section>
      <section><h4>Итог</h4><div id="ss-verdict" class="ss-verdict"></div></section>
    </div>
  </main>
</aside>
    `.trim();

    // inject style + html into shadow
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    shadow.appendChild(styleEl);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    shadow.appendChild(wrapper);

    // append host to body
    document.body.appendChild(rootWrapper);

    // store references to elements inside shadow
    const sr = shadow;
    const container = sr.querySelector('.shopsage-sidebar');
    const closeBtn = sr.querySelector('.ss-close');
    const analyzeBtn = sr.querySelector('#ss-analyze');
    const loader = sr.querySelector('#ss-loader');
    const countEl = sr.querySelector('#ss-count');
    const resultEl = sr.querySelector('#ss-result');
    const prosEl = sr.querySelector('#ss-pros');
    const consEl = sr.querySelector('#ss-cons');
    const verdictEl = sr.querySelector('#ss-verdict');
    const ratingEl = sr.querySelector('#ss-rating');
    const totalEl = sr.querySelector('#ss-total');
    const errorEl = sr.querySelector('#ss-error');
    const scoreContainer = sr.querySelector('#ss-score-container');
    const scoreBadgeEl = sr.querySelector('#ss-score-badge');
    const scoreBarInner = sr.querySelector('#ss-score-bar-inner');
    const scoreSub = sr.querySelector('#ss-score-sub');

    // show animation
    requestAnimationFrame(() => {
      Object.assign(rootWrapper.style, {
        opacity: '0',
        transform: 'translateY(8px) scale(.995)',
        transition: 'opacity .28s cubic-bezier(.2,.9,.2,1), transform .36s cubic-bezier(.2,.9,.2,1)'
      });
      setTimeout(() => {
        rootWrapper.style.opacity = '1';
        rootWrapper.style.transform = 'translateY(0) scale(1)';
      }, 20);
    });

    // attach behaviors
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (analyzeBtn) analyzeBtn.addEventListener('click', onAnalyzeClick);

    // Интеграция в основную функцию extractReviews
    function extractReviews(maxItems = 60) {
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

    // show count initially
    const initialReviews = extractReviews();
    if (countEl) countEl.innerText = initialReviews.length;

    // show product meta initially
    const metaNow = extractProductMeta();
    if (ratingEl) ratingEl.innerText = metaNow.avgRating != null ? metaNow.avgRating : '—';
    if (totalEl) totalEl.innerText = metaNow.totalRatings != null ? metaNow.totalRatings : '—';

    // Error display helper
    function showError(message) {
      if (errorEl) {
        errorEl.innerText = message;
        errorEl.classList.remove('hidden');
        setTimeout(() => {
          errorEl.classList.add('hidden');
        }, 5000);
      }
    }

    // analyze click handler
    function onAnalyzeClick(e) {
      if (analyzeBtn) analyzeBtn.disabled = true;
      if (loader) loader.classList.remove('hidden');
      if (resultEl) {
        resultEl.classList.add('hidden');
        resultEl.classList.remove('show');
      }
      if (scoreContainer) scoreContainer.classList.add('hidden');
      if (scoreSub) scoreSub.classList.add('hidden');
      if (errorEl) errorEl.classList.add('hidden');

      const CHAR_LIMIT = 15000;
      const SEPARATOR = '\n\n';

      // Get maxReviews from storage
      chrome.storage.sync.get({ maxReviews: 40, serverUrl: '' }, (items) => {
        const maxReviews = (Number.isFinite(Number(items.maxReviews)) && Number(items.maxReviews) > 0)
          ? Number(items.maxReviews) : 40;

        // Extract reviews
        const candidates = extractReviews(maxReviews);
        const originalCount = candidates.length;

        if (originalCount === 0) {
          if (loader) loader.classList.add('hidden');
          if (analyzeBtn) analyzeBtn.disabled = false;
          showError('Не найдено отзывов на странице. Попробуйте прокрутить страницу или перейти на страницу с отзывами.');
          return;
        }

        // Collect reviews within char limit
        const selected = [];
        let assembled = '';

        for (let i = 0; i < candidates.length; i++) {
          const r = candidates[i] || '';
          if (!r) continue;

          if (assembled.length === 0) {
            if (r.length <= CHAR_LIMIT) {
              assembled = r;
              selected.push(r);
            } else {
              const truncated = r.slice(0, CHAR_LIMIT - 1) + '…';
              assembled = truncated;
              selected.push(truncated);
              break;
            }
          } else {
            const potentialLen = assembled.length + SEPARATOR.length + r.length;
            if (potentialLen <= CHAR_LIMIT) {
              assembled = assembled + SEPARATOR + r;
              selected.push(r);
            } else {
              break;
            }
          }
        }

        // Update count
        if (countEl) countEl.innerText = `${selected.length} (из ${originalCount})`;

        // Extract fresh metadata
        const productMeta = extractProductMeta();
        if (ratingEl) ratingEl.innerText = productMeta.avgRating != null ? productMeta.avgRating : '—';
        if (totalEl) totalEl.innerText = productMeta.totalRatings != null ? productMeta.totalRatings : '—';

        // Prepare payload
        const reviewsToSend = selected;
        const product = {
          url: location.href,
          title: document.title,
          totalRatings: productMeta.totalRatings,
          avgRating: productMeta.avgRating
        };


        console.log('ShopSage: Sending analysis request', {
          reviewCount: reviewsToSend.length,
          product: product,
          serverUrl: items.serverUrl || 'default'
        });

        // Send to background script
        chrome.runtime.sendMessage(
          {
            action: APP_ACTION,
            reviews: reviewsToSend,
            product: product,
            serverUrl: items.serverUrl || ''
          },
          (resp) => {
            // Check for runtime errors
            if (chrome.runtime.lastError) {
              console.error('ShopSage: runtime.lastError', chrome.runtime.lastError);
              if (loader) loader.classList.add('hidden');
              if (analyzeBtn) analyzeBtn.disabled = false;
              showError('Ошибка связи с расширением. Перезагрузите страницу и попробуйте снова.');
              return;
            }

            if (loader) loader.classList.add('hidden');
            if (analyzeBtn) analyzeBtn.disabled = false;

            // Check response
            if (!resp) {
              console.error('ShopSage: Empty response from background');
              showError('Не получен ответ от сервера. Проверьте настройки или попробуйте позже.');
              return;
            }

            if (!resp.ok) {
              console.error('ShopSage: Analysis failed', resp);
              let errorMsg = 'Ошибка анализа';

              if (resp.error) {
                errorMsg = resp.error;
              } else if (resp.message) {
                errorMsg = resp.message;
              }

              // Check for specific error types
              if (errorMsg.includes('fetch failed') || errorMsg.includes('Failed to fetch')) {
                errorMsg = 'Не удалось подключиться к серверу. Проверьте URL сервера в настройках.';
              } else if (errorMsg.includes('timeout')) {
                errorMsg = 'Превышено время ожидания ответа от сервера.';
              } else if (errorMsg.includes('404')) {
                errorMsg = 'Сервер не найден. Проверьте URL в настройках.';
              } else if (errorMsg.includes('500') || errorMsg.includes('502') || errorMsg.includes('503')) {
                errorMsg = 'Ошибка сервера. Попробуйте позже.';
              }

              showError(errorMsg);
              return;
            }

            // Success - render result
            const data = resp.data || {};
            console.info('ShopSage: Analysis successful', resp);
            renderResult(data, product, reviewsToSend.length);
          }
        );
      });
    }

    // Render result function
    function renderResult(data, productMeta = {}, reviewsSentCount = 0) {
      // Hide error if showing
      if (errorEl) errorEl.classList.add('hidden');

      const pros = Array.isArray(data.pros) ? data.pros : [];
      const cons = Array.isArray(data.cons) ? data.cons : [];

      if (prosEl) {
        prosEl.innerHTML = '';
        pros.forEach((p, i) => {
          const li = document.createElement('li');
          li.innerHTML = '<div class="tag">' + (i + 1) + '</div><div class="snippet"></div>';
          li.querySelector('.snippet').innerText = p;
          prosEl.appendChild(li);
        });
      }

      if (consEl) {
        consEl.innerHTML = '';
        cons.forEach((c, i) => {
          const li = document.createElement('li');
          li.innerHTML = '<div class="tag">' + (i + 1) + '</div><div class="snippet"></div>';
          li.querySelector('.snippet').innerText = c;
          consEl.appendChild(li);
        });
      }

      let ratingElement = document.querySelector('[data-auto="rating"]');
      if (ratingElement) {
        productMeta.avgRating = parseFloat(ratingElement.textContent.trim().replace(',', '.'));
      }


      // show verdict
      if (verdictEl) verdictEl.innerText = data.verdict || 'Нет явного вердикта';

      // Update meta (учтём avgRating/totalRatings если они есть)
      let pageAvg = (productMeta && productMeta.avgRating != null) ? Number(productMeta.avgRating) :
        (productMeta && productMeta.rating != null) ? Number(productMeta.rating) : null;
      let pageTotalRatings = (productMeta && productMeta.totalRatings != null) ? Number(productMeta.totalRatings) :
        (productMeta && productMeta.totalReviews != null) ? Number(productMeta.totalReviews) : null;

      // если extractRatingBreakdown возвращает avg/totalRatings — подставим, если ещё пусто
      try {
        if (typeof extractRatingBreakdown === 'function') {
          const raw = extractRatingBreakdown();
          if (raw) {
            if (pageAvg == null && raw.avg != null) pageAvg = raw.avg;
            if (pageTotalRatings == null && raw.totalRatings != null) pageTotalRatings = raw.totalRatings;
          }
        }
      } catch (e) { /* ignore */ }

      if (ratingEl) ratingEl.innerText = pageAvg != null ? pageAvg : '—';
      if (totalEl) totalEl.innerText = pageTotalRatings != null ? pageTotalRatings : '—';

      // ========== Повторный блок: считаем по оценкам (биномиальная модель) ==========
      // Попытка использовать разбиение по звёздам (если есть)
      const rawBreak = (typeof extractRatingBreakdown === 'function') ? extractRatingBreakdown() : null;

      // Получаем n (кол-во оценок) и avg (средний рейтинг)
      const nFromMeta = pageTotalRatings || (productMeta && (productMeta.totalReviews || 0)) || 0;
      const avgFromMeta = pageAvg != null ? pageAvg : (productMeta && (productMeta.avgRating || productMeta.rating) ? (productMeta.avgRating || productMeta.rating) : null);

      let n = Math.max(0, Number(nFromMeta || 0));
      let k = 0; // количество "положительных" оценок (4 или 5 звёзд)
      let normalizedRating = null;
      let estPosRate = null;

      // если rawBreak содержит числовые counts для звёзд — используем их
      let starCounts = null;
      if (rawBreak) {
        const counts = {};
        let anyStar = false;
        for (let s = 1; s <= 5; s++) {
          const v = rawBreak[String(s)];
          if (v != null && Number.isFinite(Number(v)) && Number(v) > 0) {
            counts[s] = Number(v);
            anyStar = true;
          } else {
            counts[s] = 0;
          }
        }
        if (anyStar) starCounts = counts;
        // также если rawBreak содержит totalRatings/avg, используем как запасные значения
        if ((pageAvg == null) && rawBreak.avg != null) pageAvg = rawBreak.avg;
        if ((pageTotalRatings == null) && rawBreak.totalRatings != null) pageTotalRatings = rawBreak.totalRatings;
      }

      if (starCounts) {
        k = (Number(starCounts[5] || 0) + Number(starCounts[4] || 0));
        n = Object.keys(starCounts).reduce((s, key) => s + Number(starCounts[key] || 0), 0);
        estPosRate = n > 0 ? (k / n) : null;
        normalizedRating = (pageAvg != null) ? (pageAvg / 5) : (estPosRate != null ? estPosRate : 0.5);
      } else if (n > 0 && avgFromMeta != null) {
        // аппроксимируем k через avg: map avg [1..5] -> positive rate
        const est = Math.max(0, Math.min(1, (avgFromMeta - 1) / 4));
        k = Math.round(est * n);
        estPosRate = n > 0 ? (k / n) : null;
        normalizedRating = avgFromMeta / 5;
      } else {
        // нет явных оценок — fallback на pros/cons или на отправленные reviews
        const prosCount = Array.isArray(data.pros) ? data.pros.length : 0;
        const consCount = Array.isArray(data.cons) ? data.cons.length : 0;
        if (prosCount + consCount > 0) {
          const est = prosCount / (prosCount + consCount);
          n = Math.max(n, prosCount + consCount);
          k = Math.round(est * n);
          estPosRate = est;
          normalizedRating = est;
        } else {
          // совсем ничего — нейтральный приоритет, используем отправленные reviews как n
          n = Math.max(n, reviewsSentCount || 0);
          const est = 0.5;
          k = Math.round(est * n);
          estPosRate = est;
          normalizedRating = normalizedRating != null ? normalizedRating : est;
        }
      }

      // Применим байесовскую модель для биномиальных данных: Beta(priorA, priorB) + k успехов из n
      const priorA = 2, priorB = 2;
      const postA = priorA + k;
      const postB = priorB + (n - k);
      const posteriorMean = postA / (postA + postB);

      // Wilson score (для удобства доверительного интервала)
      function wilsonInterval(k_, n_, z = 1.96) {
        if (n_ === 0) return { low: 0, high: 1 };
        const phat = k_ / n_;
        const z2 = z * z;
        const denom = 1 + z2 / n_;
        const centre = phat + z2 / (2 * n_);
        const margin = z * Math.sqrt((phat * (1 - phat) + z2 / (4 * n_)) / n_);
        const low = Math.max(0, (centre - margin) / denom);
        const high = Math.min(1, (centre + margin) / denom);
        return { low, high };
      }

      const wilson = wilsonInterval(k, Math.max(1, n));
      // normalizedRating уже в [0..1] (avg/5). если null — используем posteriorMean.
      if (normalizedRating == null) normalizedRating = posteriorMean;

      // composite: комбинируем байесовскую долю и нормализованный рейтинг
      const composite = Math.round(((posteriorMean * 0.6) + (normalizedRating * 0.4)) * 100);
      // ========================================================================

      // Recommendation
      let rec = '', recColor = '';
      if (composite >= 75) {
        rec = 'Однозначно стоит выбрать';
        recColor = 'linear-gradient(90deg,#a3e635,#10b981)';
      } else if (composite >= 60) {
        rec = 'В целом рекомендуем';
        recColor = 'linear-gradient(90deg,#facc15,#84cc16)';
      } else if (composite >= 45) {
        rec = 'Стоит взвесить плюсы и минусы';
        recColor = 'linear-gradient(90deg,#f59e0b,#f97316)';
      } else {
        rec = 'Лучше поискать альтернативу';
        recColor = 'linear-gradient(90deg,#ef4444,#ea580c)';
      }


      // Update score UI
      if (scoreContainer) scoreContainer.classList.remove('hidden');
      if (scoreBadgeEl) {
        scoreBadgeEl.innerText = composite + '%';
        scoreBadgeEl.style.background = recColor;
      }
      if (scoreBarInner) {
        scoreBarInner.style.width = composite + '%';
      }
      if (scoreSub) {
        scoreSub.classList.remove('hidden');
        const confLow = Math.round(wilson.low * 100);
        const confHigh = Math.round(wilson.high * 100);
        const nLabel = n > 0 ? n : (reviewsSentCount || '—');
        const avgLabel = pageAvg != null ? `${pageAvg}` : '—';
        scoreSub.innerText = `${rec} — вероятность успеха ≈ ${Math.round(posteriorMean * 100)}% (интервал ${confLow}–${confHigh}%), на основе ${nLabel} оценок; положительных (4–5★): ${k}. Средний рейтинг: ${avgLabel}.`;
      }

      // Update count (показываем число найденных отправленных reviews и/или общий totalRatings)
      if (countEl) {
        if (reviewsSentCount != null && reviewsSentCount !== 0) {
          countEl.innerText = `${reviewsSentCount} (из ${pageTotalRatings != null ? pageTotalRatings : '—'})`;
        } else {
          countEl.innerText = pageTotalRatings != null ? pageTotalRatings : '—';
        }
      }

      // Show result panel
      if (resultEl) {
        resultEl.classList.remove('hidden');
        setTimeout(() => resultEl.classList.add('show'), 30);
      }

      console.info('ShopSage: stats', {
        n, k, estPosRate, posteriorMean, wilson, composite, rec,
        pageAvg, pageTotalRatings, prosCount: pros.length, consCount: cons.length
      });
    }

    // store reference on host so toggles can find and remove later
    rootWrapper._shadow = shadow;
    rootWrapper._container = container;
    // keep in DOM
  }

  function closeSidebar() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    // animate out
    root.style.opacity = '0';
    root.style.transform = 'translateY(8px) scale(.995)';
    setTimeout(() => { try { root.remove() } catch (e) { } }, 300);
  }

  // hotkey S to open/close, but not when typing
  document.addEventListener('keydown', (e) => {
    if (e.key && e.key.toLowerCase() === 's' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      const editable = document.activeElement && (document.activeElement.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA');
      if (editable) return;
      // toggle
      if (document.getElementById(ROOT_ID)) closeSidebar();
      else openSidebar();
    }
  });

  // initialize
  injectButton();

  // best-effort: if extension is reloaded, sometimes old elements remain — cleanup duplicates once more
  window.addEventListener('unload', () => {
    try {
      const r = document.getElementById(ROOT_ID); if (r) r.remove();
      const b = document.getElementById(BTN_ID); if (b) b.remove();
    } catch (e) { }
  });
})();
