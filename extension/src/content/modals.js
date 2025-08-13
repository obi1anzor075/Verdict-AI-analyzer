// modals.js
// This file contains the implementation of modal-related functionality
import { saveUserSettings, loadUserSettings, isUserSubscribed } from './utils.js';

const DEFAULT_SETTINGS = {
    autoAnalyze: false,
    serverSend: false,
    maxReviews: 5,
    language: 'ru',
    analysisDepth: 'medium',
    showRating: true,
    debugMode: false,
    saveHistory: false,
    darkMode: true
};

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
    const stored = typeof loadUserSettings === 'function' ? loadUserSettings() : (window.__loadedSettings || {});
    const mergedSettings = { ...DEFAULT_SETTINGS, ...stored, ...settings };

    const old = sr.getElementById ? sr.getElementById('ss-settings-modal') : sr.querySelector('#ss-settings-modal');
    if (old) {
        try {
            old.style.animation = 'modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            setTimeout(() => old.remove(), 200);
        } catch (e) { old.remove(); }
    }

    const modal = document.createElement('div');
    modal.id = 'ss-settings-modal';

    const initialMax = (mergedSettings.maxReviews ?? DEFAULT_SETTINGS.maxReviews ?? 5);

    // Added inline lock buttons for the features we block for free users.
    modal.innerHTML = `
      <div class="sm-header">
        <div>
          <div class="sm-title">Настройки анализатора</div>
          <div class="sm-sub">Настройте параметры анализа отзывов и интерфейса</div>
        </div>
        <button class="sm-close" title="Закрыть" aria-label="Закрыть настройки">×</button>
      </div>

      <div class="sm-body">
        <div class="setting-group">
          <div class="setting-title">Анализ отзывов</div>
          <div class="setting-desc">Параметры автоматического анализа и обработки</div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="checkbox" id="set-auto-analyze" ${mergedSettings.autoAnalyze ? 'checked' : ''}>
              <span>Автоматически анализировать при загрузке страницы</span>
            </label>
            <button type="button" class="feature-lock" data-feature="autoAnalyze" title="Доступно по подписке">🔒</button>
          </div>

          <div class="setting-option">
            <label>
              <input type="checkbox" id="set-server-send" ${mergedSettings.serverSend ? 'checked' : ''}>
              По умолчанию отправлять данные на сервер
            </label>
          </div>

          <div class="setting-option" style="position:relative;">
            <label style="flex-direction: column; align-items: flex-start; gap: 6px; width:100%;">
              <span>Максимальное количество отзывов для анализа: <span class="range-value" id="max-reviews-value">${initialMax}</span></span>
              <div class="range-wrap" style="position:relative; width:100%;">
                <input type="range" id="set-max-reviews" min="1" max="20" value="${initialMax}" style="width: 100%;">
                <button type="button" class="range-lock" id="max-range-lock" title="Требуется подписка, чтобы установить значение выше 10">🔒</button>
              </div>
            </label>
          </div>
        </div>

        <!-- Качество анализа с замочком у deep -->
        <div class="setting-group">
          <div class="setting-title">Качество анализа</div>
          <div class="setting-desc">Выберите глубину анализа отзывов</div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="radio" name="analysis-depth" value="fast" ${mergedSettings.analysisDepth === 'fast' ? 'checked' : ''}>
              <span>Быстрый анализ (поверхностный)</span>
            </label>
            <!-- empty placeholder for alignment -->
            <span style="width:34px"></span>
          </div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="radio" name="analysis-depth" value="medium" ${mergedSettings.analysisDepth === 'medium' ? 'checked' : ''}>
              <span>Стандартный анализ (рекомендуется)</span>
            </label>
            <span style="width:34px"></span>
          </div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="radio" name="analysis-depth" value="deep" ${mergedSettings.analysisDepth === 'deep' ? 'checked' : ''}>
              <span>Глубокий анализ (медленнее, но точнее)</span>
            </label>
            <button type="button" class="feature-lock" data-feature="analysisDepthDeep" title="Доступно по подписке">🔒</button>
          </div>
        </div>

        <div class="setting-group">
          <div class="setting-title">Интерфейс</div>
          <div class="setting-desc">Настройки отображения и языка</div>

          <div class="setting-option">
            <label>
              <input type="checkbox" id="set-show-rating" ${mergedSettings.showRating ? 'checked' : ''}>
              Показывать рейтинг товара
            </label>
          </div>

          <div class="setting-option">
            <label style="flex-direction: column; align-items: flex-start; gap: 6px;">
              <span>Язык интерфейса:</span>
              <select id="set-language" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); color: var(--text); padding: 6px 8px; border-radius: 6px; font-size: 12px;">
                <option value="ru" ${mergedSettings.language === 'ru' ? 'selected' : ''}>Русский</option>
                <option value="en" ${mergedSettings.language === 'en' ? 'selected' : ''}>English</option>
                <option value="auto" ${mergedSettings.language === 'auto' ? 'selected' : ''}>Автоопределение</option>
              </select>
            </label>
          </div>
        </div>

        <div class="setting-group">
          <div class="setting-title">Дополнительно</div>
          <div class="setting-desc">Экспериментальные и расширенные функции</div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="checkbox" id="set-debug-mode" ${mergedSettings.debugMode ? 'checked' : ''}>
              <span>Режим отладки (показывать техническую информацию)</span>
            </label>
            <span style="width:34px"></span>
          </div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="checkbox" id="set-save-history" ${mergedSettings.saveHistory ? 'checked' : ''}>
              <span>Сохранять историю анализов (в памяти браузера)</span>
            </label>
            <button type="button" class="feature-lock" data-feature="saveHistory" title="Доступно по подписке">🔒</button>
          </div>
        </div>
      </div>

      <div class="sm-actions">
        <button class="btn-save" title="Сохранить настройки"><span>💾</span><span class="btn-text">Сохранить</span></button>
        <button class="btn-reset" title="Сбросить к значениям по умолчанию"><span class="btn-text">Сбросить</span></button>
        <button class="btn-close-action" title="Закрыть без сохранения">Отмена</button>
      </div>
    `;

    // append modal into provided shadow root
    sr.appendChild(modal);

    // elements
    const btnClose = modal.querySelector('.sm-close');
    const btnCloseAction = modal.querySelector('.btn-close-action');
    const btnSave = modal.querySelector('.btn-save');
    const btnReset = modal.querySelector('.btn-reset');
    const maxReviewsRange = modal.querySelector('#set-max-reviews');
    const maxReviewsValue = modal.querySelector('#max-reviews-value');
    const rangeLockBtn = modal.querySelector('#max-range-lock');

    // new: feature nodes & lock buttons
    const autoAnalyzeInput = modal.querySelector('#set-auto-analyze');
    const saveHistoryInput = modal.querySelector('#set-save-history');
    const deepRadio = modal.querySelector('input[name="analysis-depth"][value="deep"]');
    const mediumRadio = modal.querySelector('input[name="analysis-depth"][value="medium"]');
    const featureLocks = Array.from(modal.querySelectorAll('.feature-lock'));

    // helper: получить showSubscriptionModal (imported function или window.__utils fallback)
    function getShowSubscriptionModal() {
        if (typeof showSubscriptionModal === 'function') return showSubscriptionModal;
        if (window.__utils && typeof window.__utils.showSubscriptionModal === 'function') return window.__utils.showSubscriptionModal;
        // fallback: просто диспатчим событие и возвращаем noop hide
        return (opts = {}, root) => {
            const evt = new CustomEvent('subscriptionRequest', { detail: { reason: 'unlock-max-reviews' }, bubbles: true, composed: true });
            document.dispatchEvent(evt);
            return () => { };
        };
    }

    // subscription helper: open modal inside settings modal (mountRoot = modal)
    let subscriptionModalHide = null;
    function openSubscriptionModalOnce() {
        // если уже открыт — ничего не делаем
        if (subscriptionModalHide) return;
        const showModal = getShowSubscriptionModal();
        const mountRoot = modal || sr || document.body;
        try {
            const hideFn = showModal({
                message: 'Доступ к расширенным функциям доступен только по подписке. Оформить подписку?',
                onBuy: () => {
                    const evt = new CustomEvent('subscriptionRequest', { detail: { reason: 'unlock-max-reviews' }, bubbles: true, composed: true });
                    document.dispatchEvent(evt);
                }
            }, mountRoot);

            // try to locate overlay in mountRoot to observe its removal (so reopen works)
            const overlay = (mountRoot instanceof ShadowRoot || mountRoot instanceof Element)
                ? mountRoot.querySelector('#subscription-modal-overlay')
                : document.getElementById('subscription-modal-overlay');

            // if hideFn is a function, wrap it so we can reset subscriptionModalHide,
            // and also observe overlay removal (in case user closes via internal button)
            if (typeof hideFn === 'function') {
                let observer = null;
                if (overlay) {
                    const parentToObserve = (mountRoot instanceof ShadowRoot || mountRoot instanceof Element) ? mountRoot : document.body;
                    observer = new MutationObserver(() => {
                        if (!overlay.isConnected) {
                            subscriptionModalHide = null;
                            try { observer.disconnect(); } catch (err) { /* ignore */ }
                        }
                    });
                    observer.observe(parentToObserve, { childList: true, subtree: true });
                }
                subscriptionModalHide = () => {
                    try { hideFn(); } catch (e) { /* ignore */ }
                    subscriptionModalHide = null;
                    try { if (observer) observer.disconnect(); } catch (e) { /* ignore */ }
                };
            } else {
                // fallback: if overlay exists, attach observer to reset state on removal
                if (overlay) {
                    const parentToObserve = (mountRoot instanceof ShadowRoot || mountRoot instanceof Element) ? mountRoot : document.body;
                    const observer = new MutationObserver(() => {
                        if (!overlay.isConnected) {
                            subscriptionModalHide = null;
                            observer.disconnect();
                        }
                    });
                    observer.observe(parentToObserve, { childList: true, subtree: true });
                    subscriptionModalHide = () => {
                        try { overlay.remove(); } catch (e) { /* ignore */ }
                        subscriptionModalHide = null;
                        try { observer.disconnect(); } catch (e) { /* ignore */ }
                    };
                } else {
                    subscriptionModalHide = null;
                }
            }
        } catch (e) {
            const evt = new CustomEvent('subscriptionRequest', { detail: { reason: 'unlock-max-reviews' }, bubbles: true, composed: true });
            document.dispatchEvent(evt);
            subscriptionModalHide = null;
        }
    }

    // определяем подписку (асинхронно) и применяем блокировки
    let isSubscribed = !!mergedSettings.isSubscribed;

    function applySubscriptionState(subscribed) {
        isSubscribed = !!subscribed;
        // range-lock visibility
        if (isSubscribed && rangeLockBtn) {
            rangeLockBtn.style.display = 'none';
            rangeLockBtn.setAttribute('aria-hidden', 'true');
        } else if (rangeLockBtn) {
            rangeLockBtn.style.display = 'block';
            rangeLockBtn.setAttribute('aria-hidden', 'false');
        }

        // Feature locks: show/hide lock buttons and enable/disable inputs
        featureLocks.forEach(btn => {
            const feature = btn.getAttribute('data-feature');
            if (!isSubscribed) {
                btn.style.display = 'block';
                btn.setAttribute('aria-hidden', 'false');
            } else {
                btn.style.display = 'none';
                btn.setAttribute('aria-hidden', 'true');
            }
        });

        // Disable specific inputs for free users
        if (!isSubscribed) {
            if (deepRadio) {
                // if deep is selected, fallback to medium
                if (deepRadio.checked && mediumRadio) {
                    deepRadio.checked = false;
                    mediumRadio.checked = true;
                }
                deepRadio.disabled = true;
            }
            if (autoAnalyzeInput) {
                autoAnalyzeInput.checked = false;
                autoAnalyzeInput.disabled = true;
            }
            if (saveHistoryInput) {
                saveHistoryInput.checked = false;
                saveHistoryInput.disabled = true;
            }
        } else {
            if (deepRadio) deepRadio.disabled = false;
            if (autoAnalyzeInput) autoAnalyzeInput.disabled = false;
            if (saveHistoryInput) saveHistoryInput.disabled = false;
        }
    }

    if (typeof isUserSubscribed === 'function') {
        try {
            const res = isUserSubscribed();
            if (res && typeof res.then === 'function') {
                res.then(v => applySubscriptionState(!!v)).catch(() => applySubscriptionState(!!mergedSettings.isSubscribed));
            } else {
                applySubscriptionState(!!res);
            }
        } catch (e) {
            applySubscriptionState(!!mergedSettings.isSubscribed);
        }
    } else {
        applySubscriptionState(!!mergedSettings.isSubscribed);
    }

    // update UI for the range value
    if (maxReviewsValue) maxReviewsValue.textContent = String(maxReviewsRange?.value ?? initialMax);

    // handlers for locks: clicking a lock opens the subscription modal
    featureLocks.forEach(btn => {
        btn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            openSubscriptionModalOnce();
        });
    });

    // Also attach prevention handlers so user can't toggle disabled inputs via label click:
    // For autoAnalyze and saveHistory, labels surround the inputs — intercept click on label
    const autoRow = modal.querySelector('.setting-option .feature-row label[for="set-auto-analyze"]') || null;
    // safer: attach to closest label parent of the input
    const autoLabel = autoAnalyzeInput ? autoAnalyzeInput.closest('label') : null;
    if (autoLabel) {
        autoLabel.addEventListener('click', (ev) => {
            if (!isSubscribed) {
                ev.preventDefault();
                openSubscriptionModalOnce();
            }
        });
    }
    const saveLabel = saveHistoryInput ? saveHistoryInput.closest('label') : null;
    if (saveLabel) {
        saveLabel.addEventListener('click', (ev) => {
            if (!isSubscribed) {
                ev.preventDefault();
                openSubscriptionModalOnce();
            }
        });
    }

    // For deep radio, intercept change selection attempts
    const deepRadioLbl = deepRadio ? deepRadio.closest('label') : null;
    if (deepRadioLbl) {
        deepRadioLbl.addEventListener('click', (ev) => {
            if (!isSubscribed) {
                ev.preventDefault();
                // keep it unchecked (if it was unchecked) and show modal
                setTimeout(() => {
                    if (deepRadio) deepRadio.checked = false;
                    if (mediumRadio) mediumRadio.checked = true;
                }, 0);
                openSubscriptionModalOnce();
            }
        });
    }

    // Range input logic (unchanged): limit >10 for free users and open modal
    maxReviewsRange?.addEventListener('input', (e) => {
        let val = parseInt(e.currentTarget?.value, 10) || initialMax;
        if (!isSubscribed && val > 10) {
            openSubscriptionModalOnce();
            val = 10;
            maxReviewsRange.value = '10';
        }
        if (maxReviewsValue) maxReviewsValue.textContent = String(val);
    });

    rangeLockBtn?.addEventListener('click', (ev) => {
        ev.stopPropagation();
        if (isSubscribed) return;
        openSubscriptionModalOnce();
    });

    // rest of normal modal logic (remove, save, reset...)

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
        // if subscription popup is open inside modal, close it too
        try { if (typeof subscriptionModalHide === 'function') subscriptionModalHide(); } catch (err) { /* ignore */ }
        subscriptionModalHide = null;
    }

    function getCurrentSettings() {
        const rawVal = parseInt(modal.querySelector('#set-max-reviews')?.value, 10) || (DEFAULT_SETTINGS.maxReviews ?? 5);
        const finalVal = (!isSubscribed && rawVal > 10) ? 10 : rawVal;
        return {
            autoAnalyze: !!modal.querySelector('#set-auto-analyze')?.checked,
            serverSend: !!modal.querySelector('#set-server-send')?.checked,
            maxReviews: finalVal,
            maxReviews: finalVal,
            language: modal.querySelector('#set-language')?.value || 'ru',
            analysisDepth: modal.querySelector('input[name="analysis-depth"]:checked')?.value || 'medium',
            showRating: !!modal.querySelector('#set-show-rating')?.checked,
            debugMode: !!modal.querySelector('#set-debug-mode')?.checked,
            saveHistory: !!modal.querySelector('#set-save-history')?.checked
        };
    }

    function applyDefaultsToForm() {
        modal.querySelector('#set-auto-analyze').checked = DEFAULT_SETTINGS.autoAnalyze;
        modal.querySelector('#set-server-send').checked = DEFAULT_SETTINGS.serverSend;
        modal.querySelector('#set-max-reviews').value = (DEFAULT_SETTINGS.maxReviews ?? 5);
        const vEl = modal.querySelector('#max-reviews-value');
        if (vEl) vEl.textContent = String(DEFAULT_SETTINGS.maxReviews ?? 5);
        modal.querySelector('#set-language').value = DEFAULT_SETTINGS.language;
        const radio = modal.querySelector(`input[name="analysis-depth"][value="${DEFAULT_SETTINGS.analysisDepth}"]`);
        if (radio) radio.checked = true;
        modal.querySelector('#set-show-rating').checked = DEFAULT_SETTINGS.showRating;
        modal.querySelector('#set-debug-mode').checked = DEFAULT_SETTINGS.debugMode;
        modal.querySelector('#set-save-history').checked = DEFAULT_SETTINGS.saveHistory;

        if (!isSubscribed && parseInt(modal.querySelector('#set-max-reviews').value, 10) > 10) {
            modal.querySelector('#set-max-reviews').value = '10';
            if (vEl) vEl.textContent = '10';
        }

        // ensure blocked features remain off for free users
        if (!isSubscribed) {
            if (deepRadio && deepRadio.checked && mediumRadio) { deepRadio.checked = false; mediumRadio.checked = true; }
            if (autoAnalyzeInput) { autoAnalyzeInput.checked = false; autoAnalyzeInput.disabled = true; }
            if (saveHistoryInput) { saveHistoryInput.checked = false; saveHistoryInput.disabled = true; }
        }
    }

    btnReset?.addEventListener('click', async () => {
        try {
            localStorage.removeItem(SETTINGS_KEY);
            if (typeof saveUserSettings === 'function') {
                await saveUserSettings({ ...(DEFAULT_SETTINGS || {}), maxReviews: (DEFAULT_SETTINGS.maxReviews ?? 5), maxReviews: (DEFAULT_SETTINGS.maxReviews ?? 5) });
            }
        } catch (e) {
            console.warn('Не удалось удалить/сохранить ключ настроек:', e);
        }
        applyDefaultsToForm();
        const originalText = btnReset.querySelector('.btn-text')?.textContent || 'Сбросить';
        const textEl = btnReset.querySelector('.btn-text');
        if (textEl) textEl.textContent = 'Сброшено!';
        setTimeout(() => {
            if (textEl) textEl.textContent = originalText;
        }, 1000);
    });

    btnClose?.addEventListener('click', removeModal);
    btnCloseAction?.addEventListener('click', removeModal);

    btnSave?.addEventListener('click', async () => {
        const newSettings = getCurrentSettings();
        try {
            if (typeof saveUserSettings === 'function') {
                await saveUserSettings(newSettings);
            } else {
                localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
            }
        } catch (e) {
            console.error('Ошибка при сохранении настроек:', e);
        }
        const event = new CustomEvent('settingsChanged', { detail: newSettings, bubbles: true, composed: true });
        try { sr.dispatchEvent(event); } catch (e) { modal.dispatchEvent(event); }

        const originalText = btnSave.querySelector('.btn-text')?.textContent || 'Сохранить';
        const textEl = btnSave.querySelector('.btn-text');
        btnSave.classList.add('btn-success');
        if (textEl) textEl.textContent = 'Сохранено!';
        setTimeout(() => {
            btnSave.classList.remove('btn-success');
            if (textEl) textEl.textContent = originalText;
            removeModal();
        }, 1200);
    });

    function onKeyDown(ev) {
        if (ev.key === 'Escape') removeModal();
    }
    document.addEventListener('keydown', onKeyDown);

    setTimeout(() => {
        modal.addEventListener('click', (ev) => {
            if (ev.target === modal) removeModal();
        });
    }, 100);

    return modal;
}


export function showSubscriptionModal(options = {}, root = document.body) {
    const {
        title = 'Разблокировать расширенный анализ',
        message = 'Больше 10 отзывов доступно только по подписке. Хотите оформить подписку?',
        buyText = 'Купить подписку',
        cancelText = 'Нет',
        onBuy
    } = options;

    const id = 'subscription-modal-overlay';

    // normalize mount root: allow ShadowRoot OR Element OR fallback to body
    let mountRoot = document.body;
    let mountInside = false; // true when we mount inside provided root (shadow or element)
    if (root) {
        if (root instanceof ShadowRoot) {
            mountRoot = root;
            mountInside = true;
        } else if (root instanceof Element) {
            mountRoot = root;
            mountInside = true;
        } else {
            mountRoot = document.body;
            mountInside = false;
        }
    }

    // don't duplicate inside same mountRoot
    try {
        const existing = mountInside ? mountRoot.querySelector(`#${id}`) : document.getElementById(id);
        if (existing) {
            // return a hide() that removes the existing overlay (so caller can close it)
            return () => { try { existing.remove(); } catch (e) { /* ignore */ } };
        }
    } catch (e) { /* ignore */ }

    // safe escape
    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // build overlay + scoped styles (so it works inside shadow)
    const overlay = document.createElement('div');
    overlay.id = id;
    overlay.className = 'subscription-modal-overlay';

    const style = document.createElement('style');
    style.textContent = `
    .subscription-modal-overlay {
      ${mountInside ? 'position: absolute; inset: 0;' : 'position: fixed; inset: 0;'}
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px;
      z-index: 2147483650;
      background: ${mountInside ? 'linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.06))' : 'linear-gradient(180deg, rgba(4,6,12,0.55), rgba(4,6,12,0.45))'};
    }
    .subscription-modal {
      width: 420px;
      max-width: calc(100% - 32px);
      border-radius: var(--radius);
      background: linear-gradient(180deg, var(--bg-start), var(--bg-end));
      color: var(--text);
      box-shadow: var(--shadow);
      border: 1px solid var(--glass-border);
      padding: 16px;
      font-family: var(--mono);
      transform-origin: center;
      animation: subsModalIn 180ms cubic-bezier(.2,.9,.2,1);
      backdrop-filter: blur(6px) saturate(110%);
      position: relative;
    }
    @keyframes subsModalIn { from { opacity: 0; transform: translateY(-6px) scale(.994);} to { opacity:1; transform: none; } }
    .subscription-close { position: absolute; right: 10px; top: 8px; background: transparent; border: 0; color: rgba(230,238,248,0.85); font-size: 18px; padding: 6px; border-radius: 8px; cursor: pointer; }
    .subscription-content h3 { margin:0 0 8px 0; font-size:15px; font-weight:700; color:#eaf2ff; }
    .subscription-message { margin:0 0 14px 0; color:var(--muted); font-size:13px; line-height:1.4; }
    .subscription-actions { display:flex; gap:10px; justify-content:flex-end; }
    .subscription-buy { background: linear-gradient(90deg, var(--accentA), var(--accentB)); border:0; padding:9px 14px; border-radius:10px; color:#fff; font-weight:700; cursor:pointer; box-shadow:0 10px 28px var(--accentGlow); }
    .subscription-buy:hover { transform: translateY(-2px); }
    .subscription-cancel { background: transparent; border:1px solid rgba(255,255,255,0.06); padding:9px 12px; border-radius:10px; color:var(--muted); cursor:pointer; }
  `;

    // attach style + markup
    overlay.appendChild(style);
    overlay.innerHTML += `
    <div class="subscription-modal" role="dialog" aria-modal="true" aria-labelledby="subscription-modal-title">
      <button class="subscription-close" aria-label="Закрыть">&times;</button>
      <div class="subscription-content">
        <h3 id="subscription-modal-title">${esc(title)}</h3>
        <p class="subscription-message">${esc(message)}</p>
        <div class="subscription-actions">
          <button class="subscription-buy">${esc(buyText)}</button>
          <button class="subscription-cancel">${esc(cancelText)}</button>
        </div>
      </div>
    </div>
  `;

    // If mounting inside an element, ensure that element allows absolute inset:0
    let prevPosition = null;
    if (mountInside && mountRoot instanceof Element) {
        const cs = window.getComputedStyle(mountRoot);
        if (!cs.position || cs.position === 'static') {
            prevPosition = mountRoot.style.position || '';
            mountRoot.style.position = 'relative';
        }
    }

    // append
    if (mountInside) mountRoot.appendChild(overlay); else document.body.appendChild(overlay);

    // if overlay is global (body) — block body scroll, otherwise don't
    const prevBodyOverflow = document.body.style.overflow;
    if (!mountInside) document.body.style.overflow = 'hidden';

    // handlers
    const btnBuy = overlay.querySelector('.subscription-buy');
    const btnCancel = overlay.querySelector('.subscription-cancel');
    const btnClose = overlay.querySelector('.subscription-close');

    let removed = false;
    function hide() {
        if (removed) return;
        removed = true;
        try { overlay.remove(); } catch (e) { /* ignore */ }
        if (prevPosition !== null && mountRoot instanceof Element) {
            try { mountRoot.style.position = prevPosition; } catch (e) { /* ignore */ }
        }
        if (!mountInside) document.body.style.overflow = prevBodyOverflow || '';
        document.removeEventListener('keydown', onKey);
    }

    function onBuyClick(e) {
        e.stopPropagation();
        try {
            if (typeof onBuy === 'function') onBuy();
            else document.dispatchEvent(new CustomEvent('subscriptionRequest', { detail: { reason: 'unlock-max-reviews' }, bubbles: true, composed: true }));
        } catch (err) { /* ignore */ }
        hide();
    }
    function onCancelClick(e) { e.stopPropagation(); hide(); }
    function onOverlayClick(e) { if (e.target === overlay) hide(); }
    function onKey(ev) { if (ev.key === 'Escape') hide(); }

    btnBuy?.addEventListener('click', onBuyClick);
    btnCancel?.addEventListener('click', onCancelClick);
    btnClose?.addEventListener('click', onCancelClick);
    overlay.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onKey);

    // always return hide() so caller can close and re-open later
    return hide;
}





