// content/bridge.js
// Обработчик сообщений от popup/background.
// Экспортирует handleRuntimeMessage / handleOpenSidebarMessage и регистрирует chrome.runtime.onMessage listener.

import { ROOT_ID, BTN_ID } from './constants.js';
import { openSidebar } from './sidebar.js';

/**
 * Обработчик OPEN_SIDEBAR:
 * - сохраняет конфиг в chrome.storage.sync
 * - пытается вызвать openSidebar / createSidebar / клик по кнопке
 *
 * Возвращает true, если будет отправлен асинхронный ответ (sendResponse вызовется позже).
 */
export function handleOpenSidebarMessage(msg, sender, sendResponse) {
    try {
        const cfg = msg.config || {};

        if (chrome && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set({
                serverUrl: cfg.serverUrl || '',
                maxReviews: cfg.maxReviews != null ? cfg.maxReviews : undefined
            }, () => {
                try {
                    // если доступна функция openSidebar — вызываем её
                    if (typeof openSidebar === 'function') {
                        try { openSidebar(); sendResponse && sendResponse({ ok: true, message: 'openSidebar() called' }); }
                        catch (e) { console.warn('openSidebar call failed', e); sendResponse && sendResponse({ ok: false, error: String(e) }); }
                        return;
                    }

                    // fallback: глобальные функции на window
                    if (typeof window.openSidebar === 'function') {
                        try { window.openSidebar(); sendResponse && sendResponse({ ok: true, message: 'window.openSidebar() called' }); return; }
                        catch (e) { /* continue to other fallbacks */ }
                    }
                    if (typeof window.createSidebar === 'function') {
                        try { window.createSidebar(); sendResponse && sendResponse({ ok: true, message: 'window.createSidebar() called' }); return; }
                        catch (e) { /* continue */ }
                    }

                    // fallback: нажать на кнопку по id
                    const btn = document.getElementById(BTN_ID) ||
                        document.getElementById('shopsage-open-btn') ||
                        document.getElementById('shopsage-open-btn-v2') ||
                        document.getElementById('shopsage-open-btn-v3');

                    if (btn) {
                        try { btn.click(); sendResponse && sendResponse({ ok: true, message: 'button clicked' }); return; }
                        catch (e) { sendResponse && sendResponse({ ok: false, message: 'failed to click button', error: String(e) }); return; }
                    }

                    // ничего не найдено
                    sendResponse && sendResponse({ ok: false, message: 'no sidebar open API found' });
                } catch (e) {
                    console.error('handleOpenSidebarMessage inner error', e);
                    sendResponse && sendResponse({ ok: false, error: String(e) });
                }
            });

            // indicate we'll respond asynchronously
            return true;
        } else {
            // storage unavailable — всё равно пытаемся открыть
            try {
                if (typeof openSidebar === 'function') { openSidebar(); sendResponse && sendResponse({ ok: true, message: 'openSidebar() called (no storage)' }); }
                else sendResponse && sendResponse({ ok: false, message: 'storage unavailable and openSidebar missing' });
            } catch (e) {
                sendResponse && sendResponse({ ok: false, error: String(e) });
            }
        }
    } catch (e) {
        console.error('handleOpenSidebarMessage error', e);
        try { sendResponse && sendResponse({ ok: false, error: String(e) }); } catch (e2) { /* ignore */ }
    }
    return false;
}

/**
 * Универсальный runtime message handler.
 * Можно расширять под новые действия.
 */
export function handleRuntimeMessage(msg, sender, sendResponse) {
    try {
        if (!msg || !msg.action) return;
        if (msg.action === 'OPEN_SIDEBAR') {
            // делегируем
            return handleOpenSidebarMessage(msg, sender, sendResponse);
        }
        // поддержка других действий если потребуется
        // if (msg.action === 'SOME_OTHER_ACTION') { ... }
    } catch (e) {
        console.error('handleRuntimeMessage error', e);
        try { sendResponse && sendResponse({ ok: false, error: String(e) }); } catch (e2) { /* ignore */ }
    }
    return false;
}

// Регистрируем listener один раз при импорте файла
try {
    if (chrome && chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener(handleRuntimeMessage);
    }
} catch (e) {
    // в окружениях без chrome — тихо молчим
}
