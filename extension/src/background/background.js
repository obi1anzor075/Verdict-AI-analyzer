/* service-worker.js — ShopSage background service worker */
/* Исправлено: улучшенная обработка ошибок и корректная отправка данных */

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
    console.log('ShopSage: received message', message.action, message);

    if (message.action === 'ANALYZE') {
      // Асинхронная обработка анализа
      handleAnalyzeRequest(message, sendResponse);
      return true; // указываем, что ответ будет асинхронным
    }
  } catch (error) {
    console.error('ShopSage: service worker error', error);
    sendResponse({
      ok: false,
      error: 'Service worker error: ' + error.message,
      message: 'Ошибка в service worker'
    });
  }
});

// Обработка запроса на анализ
async function handleAnalyzeRequest(message, sendResponse) {
  try {
    // Получаем настройки из хранилища
    const settings = await chrome.storage.sync.get({
      serverUrl: 'http://localhost:3000',
      maxReviews: 40
    });

    console.log('ShopSage: using settings', settings);

    // Валидация данных
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

    // Подготовка данных для отправки
    const payload = {
      reviews: message.reviews,
      product: message.product || {
        url: '',
        title: '',
        totalReviews: null,
        rating: null
      },
      config: {
        maxReviews: settings.maxReviews
      }
    };

    console.log('ShopSage: sending to server', {
      serverUrl: settings.serverUrl,
      reviewsCount: payload.reviews.length,
      product: payload.product
    });

    // Определяем URL сервера
    let serverUrl = settings.serverUrl || 'http://localhost:3000';
    if (message.serverUrl && message.serverUrl.trim()) {
      serverUrl = message.serverUrl.trim();
    }

    // Убираем trailing slash
    serverUrl = serverUrl.replace(/\/$/, '');

    // Отправляем запрос на сервер
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 секунд таймаут

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
          case 500:
            errorMessage = 'Внутренняя ошибка сервера (500). Попробуйте позже.';
            break;
          case 502:
            errorMessage = 'Сервер недоступен (502). Попробуйте позже.';
            break;
          case 503:
            errorMessage = 'Сервис временно недоступен (503). Попробуйте позже.';
            break;
          case 400:
            errorMessage = 'Некорректный запрос (400). Проверьте данные.';
            break;
          case 429:
            errorMessage = 'Слишком много запросов (429). Подождите и повторите.';
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
        console.log('ShopSage: raw server response', responseText.substring(0, 500));

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

      // Нормализуем данные ответа
      const normalizedData = {
        pros: Array.isArray(data.pros) ? data.pros.slice(0, 5) : [],
        cons: Array.isArray(data.cons) ? data.cons.slice(0, 5) : [],
        verdict: typeof data.verdict === 'string' ? data.verdict : 'Анализ завершен',
        score: typeof data.score === 'number' ? data.score : null,
        confidence: typeof data.confidence === 'number' ? data.confidence : null,
        reviewsAnalyzed: typeof data.reviewsAnalyzed === 'number' ? data.reviewsAnalyzed : message.reviews.length
      };

      console.log('ShopSage: analysis successful', normalizedData);

      sendResponse({
        ok: true,
        data: normalizedData,
        message: 'Анализ успешно завершен'
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error('ShopSage: fetch error', fetchError);

      let errorMessage = 'Не удалось подключиться к серверу';

      if (fetchError.name === 'AbortError') {
        errorMessage = 'Превышено время ожидания ответа от сервера';
      } else if (fetchError.message.includes('fetch')) {
        errorMessage = 'Ошибка сети. Проверьте подключение и URL сервера в настройках.';
      } else if (fetchError.message.includes('CORS')) {
        errorMessage = 'Ошибка CORS. Сервер должен разрешить запросы от расширения.';
      }

      sendResponse({
        ok: false,
        error: fetchError.message,
        message: errorMessage
      });
    }

  } catch (error) {
    console.error('ShopSage: handleAnalyzeRequest error', error);
    sendResponse({
      ok: false,
      error: error.message,
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