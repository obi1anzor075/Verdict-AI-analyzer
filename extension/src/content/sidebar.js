// content/sidebar.js
import { ROOT_ID, APP_ACTION, CHAR_LIMIT, ICON_PATH } from './constants.js';
import { extractProductMeta, extractRatingBreakdown } from './meta.js';
import { extractReviews, formatRatingHTML } from './extractors/index.js';
import { buildPayloadPreview } from './extractors/yandex.js';
import { showPreviewModal, showSettingsModal } from './modals.js';
import { loadUserSettings, getAnalysisDepth } from './utils.js';
import { updateRatingVisibility } from './ui.js';
import sidebarHTML from './sidebar/sidebar.html?raw';
import sidebarCSS from './sidebar/sidebar.css?raw';

/**
 * Открывает sidebar (создаёт host с shadow-root и вставляет html+css).
 * Экспортируется как глобальная функция (index.js выставляет в window).
 */
export function openSidebar() {
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

    // inject style + html into shadow
    const styleEl = document.createElement('style');
    styleEl.textContent = sidebarCSS;
    shadow.appendChild(styleEl);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = sidebarHTML;
    shadow.appendChild(wrapper);

    const logoImg = shadow.querySelector('#ss-logo');
    if (logoImg) {
        logoImg.src = chrome.runtime.getURL('assets/icons/icon.svg');
    }

    // append host to body
    document.body.appendChild(rootWrapper);

    //update visibility rating
    updateRatingVisibility();

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

    // --- Modal logic ---
    const sendToggle = sr.querySelector('#ss-send-server');
    const previewPayloadBtn = sr.querySelector('#ss-preview-payload');
    const previewSettingBtn = sr.querySelector('#ss-preview-settings');

    // persist change (old behavior kept)
    if (sendToggle) {
        sendToggle.addEventListener('change', (e) => {
            const val = !!e.target.checked;
            chrome.storage.sync.set({ sendToServer: val });
        });
    }

    if (previewPayloadBtn) {
        previewPayloadBtn.addEventListener('click', async () => {
            try {
                previewPayloadBtn.disabled = true;
                const payload = await buildPayloadPreview();
                showPreviewModal(sr, payload);
            } catch (err) {
                console.error('preview error', err);
                alert('Ошибка при формировании превью: ' + String(err));
            } finally {
                previewPayloadBtn.disabled = false;
            }
        });
    }

    if (previewSettingBtn) {
        previewSettingBtn.addEventListener('click', async () => {
            try {
                previewSettingBtn.disabled = true;
                const settings = await loadUserSettings();
                showSettingsModal(sr, settings);
            } catch (err) {
                console.error('preview error', err);
                alert('Ошибка при формировании превью: ' + String(err));
            } finally {
                previewSettingBtn.disabled = false;
            }
        });
    }
    // --- End modal logic ---

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

    // show count initially
    const initialReviews = extractReviews();
    if (countEl) countEl.innerText = initialReviews.length;

    // show product meta initially
    const metaNow = extractProductMeta();
    if (ratingEl) { ratingEl.innerHTML = formatRatingHTML(metaNow.avgRating); }
    if (totalEl) totalEl.innerText = metaNow.totalRatings != null ? metaNow.totalRatings : '—';

    // Error display helper
    function showError(message) {
        if (errorEl) {
            errorEl.innerText = message;
            showElement(errorEl);

            setTimeout(() => {
                hideElement(errorEl);
            }, 5000);
        }
    }

    // analyze click handler
    function onAnalyzeClick(e) {
        if (analyzeBtn) analyzeBtn.disabled = true;
        if (loader) {
            showElement(loader);
        }

        if (resultEl) {
            hideElement(resultEl);
        }
        if (scoreContainer) {
            hideElement(scoreContainer);
        }
        if (scoreSub) {
            hideElement(scoreSub);
        }
        if (errorEl) {
            hideElement(errorEl);
        }

        const CHAR_LIMIT = 15000;
        const SEPARATOR = '\n\n';



        // Get maxReviews
        chrome.storage.sync.get({ maxReviews: 20, serverUrl: '' }, (items) => {
            const maxReviews = (Number.isFinite(Number(items.maxReviews)) && Number(items.maxReviews) > 0)
                ? Number(items.maxReviews) : 20;

            // get analysis depth from settings (expects "fast" | "medium" | "deep" or numeric fallback)
            const rawDepth = (typeof getAnalysisDepth === 'function') ? String(getAnalysisDepth()).trim().toLowerCase() : 'medium';
            const allowed = ['fast', 'medium', 'deep'];
            let analysisDepth = 'medium';

            // accept textual modes or numeric fallbacks (1->fast,2->medium,3->deep)
            if (allowed.includes(rawDepth)) {
                analysisDepth = rawDepth;
            } else if (rawDepth === '1' || rawDepth === 'fast') {
                analysisDepth = 'fast';
            } else if (rawDepth === '3' || rawDepth === 'deep') {
                analysisDepth = 'deep';
            } else {
                analysisDepth = 'medium';
            }

            // Extract reviews
            const extraction = extractReviews(maxReviews);
            let candidates = [];
            let originalCount = 0;

            if (Array.isArray(extraction)) {
                // backward compatibility: someone might still return array
                candidates = extraction;
                originalCount = extraction.length;
            } else if (extraction && typeof extraction === 'object') {
                candidates = extraction.items || [];
                originalCount = Number.isFinite(Number(extraction.found)) ? extraction.found : (candidates.length || 0);
            } else {
                candidates = [];
                originalCount = 0;
            }

            // If the page has fewer reviews than user requested — inform in console and proceed with what we have
            if (originalCount < maxReviews) {
                console.info(`Verdict: Requested ${maxReviews} reviews but only ${originalCount} found on page. Using available reviews.`);
                // optional UX: show a non-blocking notice to user
                // showError(`Найдено только ${originalCount} отзывов — будет проанализировано меньше, чем в настройках.`);
            }

            // If no candidates found
            if (!candidates || candidates.length === 0) {
                if (loader) hideElement(loader);
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

            // Extract fresh metadata
            const productMeta = extractProductMeta();
            if (ratingEl) { ratingEl.innerHTML = formatRatingHTML(metaNow.avgRating); }
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
                    serverUrl: items.serverUrl || '',
                    analysisDepth: analysisDepth
                },
                (resp) => {
                    // Check for runtime errors
                    if (chrome.runtime.lastError) {
                        console.error('Verdict: runtime.lastError', chrome.runtime.lastError);
                        if (loader) {
                            hideElement(loader);
                        }
                        if (analyzeBtn) analyzeBtn.disabled = false;
                        showError('Ошибка связи с расширением. Перезагрузите страницу и попробуйте снова.');
                        return;
                    }

                    if (loader) {
                        hideElement(loader);
                    }

                    if (analyzeBtn) analyzeBtn.disabled = false;

                    // Check response
                    if (!resp) {
                        console.error('Verdict: Empty response from background');
                        showError('Не получен ответ от сервера. Проверьте настройки или попробуйте позже.');
                        return;
                    }

                    if (!resp.ok) {
                        console.error('Verdict: Analysis failed', resp);
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
                    console.info('Verdict: Analysis successful', resp);
                    renderResult(data, product, reviewsToSend.length, analysisDepth);
                }
            );
        });
    }

    // Render result function
    function renderResult(data, productMeta = {}, reviewsSentCount = 0, depth = 'standard') {
        // Hide error if showing
        if (errorEl) {
            hideElement(errorEl);
        }

        const depthMap = {
            fast: 3,
            medium: 5,
            deep: 7
        };
        const limit = depthMap[depth] || 5;

        const pros = Array.isArray(data.pros) ? data.pros.slice(0, limit) : [];
        const cons = Array.isArray(data.cons) ? data.cons.slice(0, limit) : [];

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
        if (composite >= 85) {
            rec = 'Однозначно стоит выбрать';
            recColor = 'linear-gradient(90deg,#a3e635,#10b981)';
        } else if (composite >= 70) {
            rec = 'В целом рекомендуем';
            recColor = 'linear-gradient(90deg,#facc15,#84cc16)';
        } else if (composite >= 55) {
            rec = 'Стоит взвесить плюсы и минусы';
            recColor = 'linear-gradient(90deg,#f59e0b,#f97316)';
        } else {
            rec = 'Лучше поискать альтернативу';
            recColor = 'linear-gradient(90deg,#ef4444,#ea580c)';
        }


        // Update score UI
        if (scoreContainer) {
            showElement(scoreContainer);
        }
        if (scoreBadgeEl) {
            scoreBadgeEl.innerText = composite + '%';
            scoreBadgeEl.style.background = recColor;
        }
        if (scoreBarInner) {
            scoreBarInner.style.width = composite + '%';
        }
        if (scoreSub) {
            showElement(scoreSub);
            const confLow = Math.round(wilson.low * 100);
            const confHigh = Math.round(wilson.high * 100);
            const nLabel = n > 0 ? n : (reviewsSentCount || '—');
            const avgLabel = pageAvg != null ? `${pageAvg}` : '—';

            scoreSub.innerText = `${rec} — вероятность успеха ≈ ${Math.round(posteriorMean * 100)}% (интервал ${confLow}–${confHigh}%), на основе ${nLabel} оценок; положительных (4–5★): ${k}. Средний рейтинг: ${avgLabel}★.`;
        }

        // Update count (показываем число найденных отправленных reviews и/или общий totalRatings)
        if (countEl) {
            if (reviewsSentCount != null && reviewsSentCount !== 0) {
                countEl.innerText = `${reviewsSentCount} из ${pageTotalRatings != null ? pageTotalRatings : '—'}`;
            } else {
                countEl.innerText = pageTotalRatings != null ? pageTotalRatings : '—';
            }
        }

        // Show result panel
        if (resultEl) {
            showElement(resultEl);

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

    function hideElement(el) {
        el.classList.remove('visible');
        el.classList.add('hidden');
    }

    function showElement(el) {
        requestAnimationFrame(() => {
            el.classList.remove('hidden');
            el.classList.add('visible');
        });
    }

}

/**
 * Закрывает и удаляет sidebar
 */
export function closeSidebar() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    root.style.opacity = '0';
    root.style.transform = 'translateY(8px) scale(.995)';
    setTimeout(() => {
        try {
            const el = document.getElementById(ROOT_ID);
            if (el) el.remove();
        } catch (e) { /* ignore */ }
    }, 300);
}
