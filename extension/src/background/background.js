/* service-worker.js — ShopSage background service worker */
/* Обновлено: поддержка analysisDepth (fast|medium|deep), динамический maxReviews, улучшенная логика и валидация */

self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('ShopSage Service worker installed');
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  console.log('ShopSage Service worker activated');
});

// Обработчик сообщений от content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    console.log('ShopSage: received message', message && message.action, message);

    if (message && message.action === 'ANALYZE') {
      // Асинхронная обработка анализа
      handleAnalyzeRequest(message, sendResponse);
      return true; // указываем, что ответ будет асинхронным
    }

  } catch (error) {
    console.error('ShopSage: service worker error', error);
    sendResponse({
      ok: false,
      error: 'Service worker error: ' + (error && error.message),
      message: 'Ошибка в service worker'
    });
  }
});

// Вспомогательная функция — нормализовать depth
function normalizeDepth(d) {
  if (!d && d !== '') return 'medium';
  const s = String(d).trim().toLowerCase();
  if (['fast', 'medium', 'deep'].includes(s)) return s;
  // numeric fallbacks
  if (s === '1' || s === '0') return 'fast';
  if (s === '2') return 'medium';
  if (s === '3') return 'deep';
  return 'medium';
}

// Обработка запроса на анализ
async function handleAnalyzeRequest(message, sendResponse) {
  try {
    // Получаем настройки из хранилища (включая возможный дефолтный analysisDepth)
    const settings = await chrome.storage.sync.get({
      serverUrl: 'http://localhost:3000',
      maxReviews: 40,
      analysisDepth: 'medium' // fallback, если клиент не передал
    });

    console.log('ShopSage: using settings', settings);

    // Валидация данных отзывов
    if (!message.reviews || !Array.isArray(message.reviews)) {
      sendResponse({
        ok: false,
        error: 'Invalid reviews data',
        message: 'Некорректные данные отзывов'
      });
      return;
    }

    if (message.reviews.length === 0) {
      sendResponse({
        ok: false,
        error: 'No reviews to analyze',
        message: 'Нет отзывов для анализа'
      });
      return;
    }

    // Определяем analysisDepth: из сообщения, иначе из настроек
    const incomingDepth = message.analysisDepth ?? settings.analysisDepth;
    const depth = normalizeDepth(incomingDepth);
    console.log('ShopSage: analysisDepth resolved to', depth);

    // Map depth -> target max reviews to send (server may also limit)
    const depthToMax = { fast: 10, medium: 30, deep: 60 };
    const targetForDepth = depthToMax[depth] || depthToMax.medium;

    // Respect user settings.maxReviews as an upper bound if it's smaller than targetForDepth
    const userMaxReviews = Number.isFinite(Number(settings.maxReviews)) && Number(settings.maxReviews) > 0
      ? Number(settings.maxReviews)
      : undefined;

    const finalMaxToSend = (typeof userMaxReviews === 'number')
      ? Math.min(userMaxReviews, targetForDepth)
      : targetForDepth;

    // Подготовка данных для отправки — обрезаем отзывы до finalMaxToSend
    const reviewsToSend = message.reviews.slice(0, finalMaxToSend).map(r => (r || '').replace(/\s+/g, ' ').trim());

    const payload = {
      reviews: reviewsToSend,
      product: message.product || {
        url: '',
        title: '',
        totalReviews: null,
        rating: null
      },
      // отправляем конфиг, который сервер может использовать для выбора поведения
      config: {
        // максимальное количество отзывов (по факту отправлено)
        maxReviewsRequested: finalMaxToSend,
        // текущий режим анализа
        analysisDepth: depth
      }
    };

    console.log('ShopSage: sending to server', {
      serverUrl: settings.serverUrl,
      reviewsCount: payload.reviews.length,
      requestedMax: finalMaxToSend,
      product: payload.product,
      depth: depth
    });

    // Определяем URL сервера (приоритет — message.serverUrl, затем settings.serverUrl)
    let serverUrl = (message.serverUrl && String(message.serverUrl).trim()) ? String(message.serverUrl).trim() : (settings.serverUrl || 'http://localhost:3000');
    serverUrl = serverUrl.replace(/\/+$/, ''); // убираем trailing slashes

    // Отправляем запрос на сервер
    const controller = new AbortController();
    const timeoutMs = 30000; // 30 секунд таймаут
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${serverUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('ShopSage: server response status', response.status, response.statusText);

      if (!response.ok) {
        let errorMessage = `Ошибка сервера: ${response.status}`;

        switch (response.status) {
          case 404:
            errorMessage = 'Сервер не найден (404). Проверьте URL в настройках.';
            break;
          case 400:
            errorMessage = 'Некорректный запрос (400). Проверьте данные.';
            break;
          case 429:
            errorMessage = 'Слишком много запросов (429). Подождите и повторите.';
            break;
          case 500:
            errorMessage = 'Внутренняя ошибка сервера (500). Попробуйте позже.';
            break;
          case 502:
            errorMessage = 'Сервер недоступен (502). Попробуйте позже.';
            break;
          case 503:
            errorMessage = 'Сервис временно недоступен (503). Попробуйте позже.';
            break;
          default:
            if (response.status >= 500) {
              errorMessage = 'Ошибка сервера. Попробуйте позже.';
            } else if (response.status >= 400) {
              errorMessage = 'Ошибка запроса. Проверьте настройки.';
            }
        }

        sendResponse({
          ok: false,
          error: `HTTP ${response.status}`,
          message: errorMessage
        });
        return;
      }

      // Парсим ответ
      let data;
      try {
        const responseText = await response.text();
        console.log('ShopSage: raw server response', responseText && responseText.substring ? responseText.substring(0, 1000) : String(responseText));
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('ShopSage: failed to parse response', parseError);
        sendResponse({
          ok: false,
          error: 'Invalid JSON response',
          message: 'Сервер вернул некорректный ответ'
        });
        return;
      }

      // Валидация структуры ответа
      if (!data || typeof data !== 'object') {
        sendResponse({
          ok: false,
          error: 'Invalid response structure',
          message: 'Некорректная структура ответа от сервера'
        });
        return;
      }

      // Нормализуем данные ответа — позволяем до 12 пунктов (сервер обычно ограничивает)
      const normalizedData = {
        pros: Array.isArray(data.pros) ? data.pros.slice(0, 12) : [],
        cons: Array.isArray(data.cons) ? data.cons.slice(0, 12) : [],
        verdict: typeof data.verdict === 'string' ? data.verdict : 'Анализ завершен',
        score: typeof data.score === 'number' ? data.score : null,
        confidence: typeof data.confidence === 'number' ? data.confidence : null,
        reviewsAnalyzed: typeof data.reviewsAnalyzed === 'number' ? data.reviewsAnalyzed : payload.reviews.length
      };

      // Также прикладываем исходный depth и config для диагностики в UI
      const meta = {
        analysisDepth: depth,
        requestedMaxReviews: finalMaxToSend
      };

      console.log('ShopSage: analysis successful', normalizedData, meta);

      sendResponse({
        ok: true,
        data: normalizedData,
        meta,
        message: 'Анализ успешно завершен'
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error('ShopSage: fetch error', fetchError);

      let errorMessage = 'Не удалось подключиться к серверу';

      if (fetchError && fetchError.name === 'AbortError') {
        errorMessage = 'Превышено время ожидания ответа от сервера';
      } else if (fetchError && fetchError.message && fetchError.message.includes('CORS')) {
        errorMessage = 'Ошибка CORS. Сервер должен разрешить запросы от расширения.';
      } else if (fetchError && fetchError.message && fetchError.message.includes('NetworkError')) {
        errorMessage = 'Ошибка сети. Проверьте подключение и URL сервера в настройках.';
      }

      sendResponse({
        ok: false,
        error: fetchError && fetchError.message ? fetchError.message : String(fetchError),
        message: errorMessage
      });
    }

  } catch (error) {
    console.error('ShopSage: handleAnalyzeRequest error', error);
    sendResponse({
      ok: false,
      error: error && error.message ? error.message : String(error),
      message: 'Внутренняя ошибка при обработке запроса'
    });
  }
}

// Обработка ошибок service worker
self.addEventListener('error', (event) => {
  console.error('ShopSage: Service worker error', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('ShopSage: Service worker unhandled rejection', event.reason);
});

// Опциональный обработчик для очистки при установке новой версии
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
