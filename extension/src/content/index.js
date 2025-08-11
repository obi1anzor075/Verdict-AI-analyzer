// content/index.js
// Точка входа контент-скрипта.
// Инициализирует UI/кнопку/горячие клавиши, экспортирует/ставит в window открытие/закрытие сайдбара.

import { initContent } from './content.init.js';
import { ROOT_ID, BTN_ID, ICON_PATH } from './constants.js';
import { openSidebar, closeSidebar } from './sidebar.js'; // должны быть реализованы в sidebar.js
import './bridge.js'; // подключаем bridge (он сам вешает listener)

// защищаем от двойной инициализации при HMR/перезагрузке
if (!window.__shopSageInitialized) {
    // Экспортируем на window для совместимости с существующей логикой (popup пытается вызвать window.openSidebar и т.д.)
    try {
        if (typeof openSidebar === 'function') window.openSidebar = openSidebar;
        if (typeof closeSidebar === 'function') window.closeSidebar = closeSidebar;
        // иногда старые версии ожидают createSidebar
        if (typeof openSidebar === 'function') window.createSidebar = openSidebar;
    } catch (e) {
        /* ignore */
    }

    // инициализация: передаём колбэк открытия сайдбара
    try {
        initContent({
            ROOT_ID,
            BTN_ID,
            ICON_PATH,
            onOpenSidebar: typeof openSidebar === 'function' ? openSidebar : () => {
                // fallback: если openSidebar ещё не доступна — пробуем найти кнопку и кликнуть
                const btn = document.getElementById(BTN_ID) || document.getElementById('shopsage-open-btn') || document.getElementById('shopsage-open-btn-v2');
                if (btn) try { btn.click(); } catch (e) { /* ignore */ }
            }
        });
    } catch (e) {
        console.error('ShopSage: initContent failed', e);
    }

    // метка чтобы не инициализировать дважды
    window.__shopSageInitialized = true;
}

export { openSidebar, closeSidebar };
