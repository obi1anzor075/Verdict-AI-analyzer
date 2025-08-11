// content/api.js
export function getStorage(defaults = {}) {
    return new Promise((resolve) => {
        try {
            chrome.storage && chrome.storage.sync
                ? chrome.storage.sync.get(defaults, (items) => resolve(items || {}))
                : resolve(defaults);
        } catch (e) {
            console.warn('getStorage error', e);
            resolve(defaults);
        }
    });
}

export function setStorage(obj = {}) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage && chrome.storage.sync
                ? chrome.storage.sync.set(obj, () => {
                    if (chrome.runtime && chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else resolve();
                })
                : resolve();
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * Отправляет сообщение в background и возвращает Promise, который резолвится в ответ.
 * payload: { action, ... }
 */
export function sendAnalysisRequest(payload = {}, timeoutMs = 30000) {
    return new Promise((resolve, reject) => {
        try {
            if (!chrome.runtime || !chrome.runtime.sendMessage) {
                return reject(new Error('chrome.runtime.sendMessage unavailable'));
            }
            let timedOut = false;
            const timer = setTimeout(() => {
                timedOut = true;
                reject(new Error('timeout'));
            }, timeoutMs);

            chrome.runtime.sendMessage(payload, (resp) => {
                if (timedOut) return;
                clearTimeout(timer);
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(resp);
            });
        } catch (e) {
            reject(e);
        }
    });
}
