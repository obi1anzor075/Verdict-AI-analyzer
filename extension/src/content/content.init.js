// content/init.js
import { createFloatingButton } from './ui.js';

/**
 * Инициализация контент-скрипта: инжектим кнопку, регистрируем обработчики.
 */
export function initContent({ ROOT_ID, BTN_ID, ICON_PATH, onOpenSidebar } = {}) {
    // inject button if not exists
    if (!document.getElementById(BTN_ID)) {
        const btn = createFloatingButton({ id: BTN_ID, title: 'Открыть Вердикт', iconPath: ICON_PATH });
        btn.addEventListener('click', () => {
            try {
                if (typeof onOpenSidebar === 'function') onOpenSidebar();
            } catch (e) { console.warn(e); }
        });
        document.body.appendChild(btn);
    }

    setupHotkeys({ ROOT_ID, onOpenSidebar });
    // register runtime listener
    if (chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener(handleRuntimeMessage);
    }

    // cleanup on unload — use safe registration instead of direct `unload`
    registerSafeUnload(cleanupOnUnload);
}

/**
 * Обработчик сообщений от popup/background (вынесен, чтобы не держать inline)
 * ожидает msg.action === 'OPEN_SIDEBAR'
 */
export function handleRuntimeMessage(msg, sender, sendResponse) {
    try {
        if (!msg || !msg.action) return;
        if (msg.action === 'OPEN_SIDEBAR') {
            return handleOpenSidebarMessage(msg, sender, sendResponse);
        }
        // можно добавлять другие действия
    } catch (e) {
        console.error('handleRuntimeMessage error', e);
        try { sendResponse && sendResponse({ ok: false, error: String(e) }); } catch (e2) { }
    }
    // если не асинхронный ответ — ничего не возвращаем
}

/**
 * Обработка OPEN_SIDEBAR: сохраняет cfg в storage и пытается вызвать API
 */
export function handleOpenSidebarMessage(msg, sender, sendResponse) {
    try {
        const cfg = msg.config || {};
        chrome.storage && chrome.storage.sync
            ? chrome.storage.sync.set({
                serverUrl: cfg.serverUrl || '',
                maxReviews: cfg.maxReviews != null ? cfg.maxReviews : undefined
            }, () => {
                // Попытаться вызвать глобальные функции, если они доступны
                if (typeof window.openSidebar === 'function') {
                    window.openSidebar();
                    sendResponse && sendResponse({ ok: true, message: 'openSidebar() called' });
                } else if (typeof window.createSidebar === 'function') {
                    window.createSidebar();
                    sendResponse && sendResponse({ ok: true, message: 'createSidebar() called' });
                } else {
                    // fallback: try to click button by id variants
                    const btn = document.getElementById('shopsage-open-btn') ||
                        document.getElementById('shopsage-open-btn-v2') ||
                        document.getElementById('shopsage-open-btn-v3');
                    if (btn) {
                        try { btn.click(); sendResponse && sendResponse({ ok: true, message: 'button clicked' }); }
                        catch (e) { sendResponse && sendResponse({ ok: false, message: 'failed to call open', error: String(e) }); }
                    } else {
                        sendResponse && sendResponse({ ok: false, message: 'no sidebar open API found' });
                    }
                }
            })
            : (sendResponse && sendResponse({ ok: false, message: 'storage unavailable' }));
        return true; // indicate async sendResponse
    } catch (e) {
        console.error('handleOpenSidebarMessage error', e);
        sendResponse && sendResponse({ ok: false, error: String(e) });
        return true;
    }
}

/**
 * Hotkey S toggler (не активируется в input/textarea)
 */
export function setupHotkeys({ ROOT_ID, onOpenSidebar } = {}) {
    document.addEventListener('keydown', (e) => {
        try {
            if (e.key && e.key.toLowerCase() === 's' && !e.metaKey && !e.ctrlKey && !e.altKey) {
                const tag = (document.activeElement && document.activeElement.tagName) || '';
                const editable = document.activeElement && (document.activeElement.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA');
                if (editable) return;
                if (document.getElementById(ROOT_ID)) {
                    // если уже есть — ожидаем, что closeSidebar доступен глобально
                    if (typeof window.closeSidebar === 'function') window.closeSidebar();
                } else {
                    if (typeof onOpenSidebar === 'function') onOpenSidebar();
                }
            }
        } catch (e) { /* ignore */ }
    });
}

/**
 * Удаление дублей элементов при выгрузке/перезагрузке скрипта
 * NOTE: не деструктурируем event — функция может вызываться из registerSafeUnload без аргументов
 */
export function cleanupOnUnload(event) {
    try {
        const ROOT_ID = 'shopsage-root-v3';
        const BTN_ID = 'shopsage-open-btn-v3';
        const r = document.getElementById(ROOT_ID); if (r) r.remove();
        const b = document.getElementById(BTN_ID); if (b) b.remove();
    } catch (e) { /* ignore */ }
}

/**
 * Safe unload registration:
 * uses pagehide with beforeunload/unload as fallbacks.
 * IMPORTANT: do NOT use visibilitychange to trigger cleanup on "hidden" —
 * that fires on minimize/tab-switch and causes UI to be removed unexpectedly.
 */
function registerSafeUnload(handler) {
    if (typeof handler !== 'function') return;
    let called = false;
    const safeWrapper = (ev) => {
        if (called) return;
        called = true;
        try { handler(ev); } catch (e) { /* ignore */ }
    };

    try {
        if ('onpagehide' in window) {
            window.addEventListener('pagehide', safeWrapper, { passive: true });
        }
    } catch (e) { /* ignore */ }

    // Don't call cleanup on visibilitychange — it fires on minimize/tab switch.
    // If you absolutely need visibility hooks, handle only the "visible" state for restoring UI,
    // not for removing it.

    try {
        window.addEventListener('beforeunload', safeWrapper, { passive: true });
    } catch (e) { /* ignore */ }

    try {
        window.addEventListener('unload', safeWrapper, { passive: true });
    } catch (e) { /* ignore */ }
}

