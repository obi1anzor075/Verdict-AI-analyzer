# Read.md

---
[![GitBook](https://img.shields.io/static/v1?message=Documented%20on%20GitBook&logo=gitbook&logoColor=ffffff&label=%20&labelColor=5c5c5c&color=3F89A1)](https://www.gitbook.com/preview?utm_source=gitbook_readme_badge&utm_medium=organic&utm_campaign=preview_documentation&utm_content=link)
## 🇷🇺 Русский

# Verdict — AI анализатор отзывов (расширение + сервер)

Коротко: проект содержит расширение для браузера и локальный прокси-сервер для отправки запросов к модели. Расширение извлекает отзывы с маркетплейсов, формирует запрос и отправляет на сервер для анализа.

---

### Особенности
- Инжектируемая панель (sidebar) для анализа отзывов на страницах маркетплейсов.
- Локальный прокси-сервер для работы с моделью (ключ OpenAI хранится на сервере).
- Специализированный экстрактор для Яндекс.Маркета и общие правила для других сайтов.
- Небольшая страница опций для указания адреса сервера и лимита отзывов.

---

### Требования
- Node.js (рекомендуется версия 16+ или 18+).
- Доступ в интернет для работы сервера с моделью (если используется OpenAI).
- Браузер Chromium/Chrome/Edge для тестирования расширения.

---

### Быстрый запуск (локально)

#### Сервер
- Перейти в каталог `server`.
- Скопировать пример окружения в `.env` и указать ключ модели (OPENAI_API_KEY).
- Необходимо установить зависимости и запустить сервер:
```bash
cd server
npm install
npm start
```
- По умолчанию сервер слушает `http://localhost:3000` (проверить конфиг внутри `server`).

#### Расширение
- Перейти в каталог `extension`.
- Необходимо установить зависимости и собрать (если сборка настроена):
```bash
cd extension
npm install
npm run build   # если проект использует сборку Vite/crxjs
```
- Для отладки: открыть страницу расширений Chrome (chrome://extensions/), включить режим разработчика и загрузить распакованную папку (`extension` или `extension/dist` после сборки).

---

### Структура (коротко)
```
extension/
  manifest.config.js   # генерация manifest (crxjs/vite)
  src/
    content/
      index.js          # entry content script (иниц. UI)
      content.init.js   # инжект кнопки, инициализация/cleanup
      sidebar.js        # рендер и логика сайдбара
      api.js            # обёртка запросов к локальному серверу
      ui.js             # элементы интерфейса
      utils.js          # утилиты (debounce и пр.)
      extractors/       # логика извлечения отзывов (yandex.js + fallback)
    background/
      background.js     # service worker / background-script
server/
  app / routes / proxy  # прокси для модели, скрытие ключа, throttle/cache
```

---

### Отладка и тестирование
- Логи сервера смотреть в консоли, где запущен `server`.
- В DevTools страницы (F12) проверять ошибки контент-скрипта. Метки в коде содержат `ShopSage` / `Verdict`.
- Service worker расширения смотреть через страницу расширений → background.
- Для проверки работы экстрактора открыть страницу товара на Яндекс.Маркете / Wildberries и нажать кнопку расширения.

---

### Важные замечания
- Файлы `src/content/index.js` и `src/background/background.js` являются точками входа и обязательны для работы расширения. Удаление этих файлов нарушит механизм инжекта и обмена сообщениями.
- В ходе анализа обнаружены исходники, которые выглядят неиспользуемыми в текущих исходниках: например, `extension/src/content/utils.js` экспортирует `createElementFromHTML`, явных вызовов которому в исходниках не найдено. Перед удалением любых файлов или функций рекомендуется:
  1. Создать ветку в git.
  2. Удалять по одному файлу/функции.
  3. Собирать и тестировать расширение на целевых страницах.
- `manifest.config.js` — конфиг сборки manifest, не удалять.

---

### Вклад
- Ветка: `feature/*` или `fix/*`.
- PR должен содержать инструкции по тестированию изменений и минимально возможный пример воспроизведения багов/поведения.
- Код в `src` покрыть комментариями, экстракторы — короткими тестами (если возможно).

---

### Лицензия
- Лицензия не указана по умолчанию. Для публичного размещения рекомендуется добавить `LICENSE` (например, MIT).

---

## 🇬🇧 English

# Verdict — AI Reviews Analyzer (extension + server)

Short summary: the repository contains a browser extension and a local proxy server intended for model requests. The extension extracts product reviews from marketplaces and sends them to the server for analysis.

---

### Features
- Injected sidebar for review analysis on marketplace pages.
- Local proxy server to handle model requests (the API key is stored on the server).
- Dedicated extractor for Yandex.Market and fallback logic for other sites.
- Small options UI for server URL and max reviews setting.

---

### Requirements
- Node.js (recommended v16+ or v18+).
- Internet access for the server to reach the model API (if OpenAI is used).
- Chromium-based browser (Chrome, Edge) for extension testing.

---

### Quick start (local)

#### Server
- Change to `server` directory.
- Copy sample env to `.env` and set the model API key (OPENAI_API_KEY).
- Dependencies must be installed and the server started:
```bash
cd server
npm install
npm start
```
- Default server address is `http://localhost:3000` (check `server` config).

#### Extension
- Change to `extension` directory.
- Dependencies must be installed and the extension built (if build is configured):
```bash
cd extension
npm install
npm run build   # when using Vite/crxjs build flow
```
- For debugging: open Chrome extensions page (chrome://extensions/), enable Developer mode, and load the unpacked folder (`extension` or `extension/dist` after build).

---

### Project layout (short)
```
extension/
  manifest.config.js   # manifest generation (crxjs/vite)
  src/
    content/
      index.js          # content script entry (initializes UI)
      content.init.js   # injects floating button, init/cleanup
      sidebar.js        # sidebar rendering and logic
      api.js            # requests wrapper to local server
      ui.js             # UI helpers
      utils.js          # small utilities (debounce, etc.)
      extractors/       # review extractors (yandex.js + fallback)
    background/
      background.js     # service worker / background script
server/
  app / routes / proxy  # proxy layer, API key concealment, optional throttling/cache
```

---

### Debugging / Testing
- Check server logs in the terminal where `server` runs.
- Inspect the content script console (DevTools) on product pages for errors. Code includes `ShopSage` / `Verdict` markers.
- Inspect extension background/service worker from the Chrome extensions page.
- Test extraction and analysis on Yandex.Market or other supported marketplace pages.

---

### Important notes
- `src/content/index.js` and `src/background/background.js` are critical entry points. Removing them will break content injection and messaging.
- Static analysis found some source files that appear unused; for example, `extension/src/content/utils.js` exports `createElementFromHTML` which was not referenced in other source files. Before removing any file or function:
  1. Create a git branch.
  2. Remove items one by one.
  3. Rebuild and test the extension on target pages.
- `manifest.config.js` is a build manifest config and should remain.

---

### Contributing
- Use branches like `feature/*` or `fix/*`.
- Pull requests must include verification steps and a short test plan.
- Add comments in `src`, and unit tests for extractors when feasible.

---

### License
- No license file present. For public repositories, adding a `LICENSE` (e.g., MIT) is recommended.

---

_End of Read.md_
