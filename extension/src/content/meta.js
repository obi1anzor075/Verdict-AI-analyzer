// content/meta.js
// Методы для извлечения meta-информации о товаре: число отзывов, средний рейтинг, breakdown.

export function parseNumber(s) {
    if (s == null) return null;
    const str = String(s).trim();
    if (!str) return null;

    // Handle "14K", "4.8K"
    const kMatch = str.match(/([\d.,]+)\s*[Kk]/);
    if (kMatch) {
        const num = parseFloat(kMatch[1].replace(',', '.'));
        if (Number.isFinite(num)) return Math.round(num * 1000);
    }

    // Remove non-numeric except . and ,
    const cleaned = str.replace(/\s+/g, '').replace(/[^0-9\.,]/g, '').replace(',', '.');
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : null;
}

export function extractProductMeta() {
    const meta = { totalReviews: null, rating: null, totalRatings: null, avgRating: null };

    try {
        // 1) meta tags
        try {
            const reviewCountMeta = document.querySelector('meta[itemprop="reviewCount"], meta[name="reviewCount"], meta[name="reviews"]');
            if (reviewCountMeta && reviewCountMeta.content) meta.totalReviews = Math.round(parseNumber(reviewCountMeta.content)) || null;
        } catch (e) { /* ignore */ }

        try {
            const ratingMeta = document.querySelector('meta[itemprop="ratingValue"], meta[name="rating"], meta[itemprop="rating"]');
            if (ratingMeta && ratingMeta.content) meta.rating = Math.round(parseNumber(ratingMeta.content) * 100) / 100 || null;
        } catch (e) { /* ignore */ }

        // 2) visible selectors for counts
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

        // aria-label / text fallback
        if (meta.totalRatings == null) {
            const all = Array.from(document.querySelectorAll('[aria-label]') || []);
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

        // 3) avg rating selectors
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

        // aria/text fallback for avg
        if (meta.avgRating == null) {
            const all = Array.from(document.querySelectorAll('[aria-label]') || []);
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

        // 4) special for Yandex Market blocks with attributes
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

        // 5) try to use global helper if available
        try {
            if (typeof window.extractRatingBreakdown === 'function') {
                const br = window.extractRatingBreakdown();
                if (br) {
                    if (meta.avgRating == null && br.avg != null) meta.avgRating = br.avg;
                    if (meta.totalRatings == null && br.totalRatings != null) meta.totalRatings = br.totalRatings;
                    if (meta.totalReviews == null && br.totalReviews != null) meta.totalReviews = br.totalReviews;
                }
            }
        } catch (e) { /* ignore */ }
    } catch (e) {
        console.warn('extractProductMeta error', e);
    }

    // fallback/norm
    if (meta.totalRatings == null && meta.totalReviews != null) meta.totalRatings = meta.totalReviews;
    if (meta.avgRating == null && meta.rating != null) meta.avgRating = meta.rating;

    meta.totalRatings = (typeof meta.totalRatings === 'number' && Number.isFinite(meta.totalRatings)) ? Math.round(meta.totalRatings) : null;
    meta.avgRating = (typeof meta.avgRating === 'number' && Number.isFinite(meta.avgRating)) ? Math.round(meta.avgRating * 100) / 100 : null;
    meta.totalReviews = meta.totalReviews || null;
    meta.rating = meta.rating || null;

    // debug
    // console.debug('ShopSage: product meta extracted', meta);
    return meta;
}

export function extractRatingBreakdown() {
    const out = { 5: null, 4: null, 3: null, 2: null, 1: null, avg: null, totalRatings: null, totalReviews: null };

    function parseNumLocal(s) {
        if (s == null) return null;
        const cleaned = String(s).trim().replace(/\s+/g, '').replace(/[^0-9\.,Kk]/g, '');
        if (/k$/i.test(cleaned)) {
            return Math.round(parseFloat(cleaned.replace(/k$/i, '')) * 1000);
        }
        const n = parseFloat(cleaned.replace(',', '.'));
        return Number.isFinite(n) ? Math.round(n) : null;
    }

    try {
        const ratingNode = document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');
        if (ratingNode) {
            const rv = ratingNode.getAttribute('ratingvalue') || ratingNode.getAttribute('data-ratingvalue');
            const rc = ratingNode.getAttribute('ratingcount') || ratingNode.getAttribute('data-ratingcount') || ratingNode.getAttribute('raitingcounttext');
            const revc = ratingNode.getAttribute('reviewcount') || ratingNode.getAttribute('data-reviewcount') || ratingNode.getAttribute('reviewcounttext');

            if (rv) out.avg = parseFloat(String(rv).replace(',', '.')) || out.avg;
            if (rc) out.totalRatings = parseNumLocal(rc) || out.totalRatings;
            if (revc) out.totalReviews = parseNumLocal(revc) || out.totalReviews;
        }

        const ratingCountEl = document.querySelector('[data-auto="rating-count-text"], [data-auto="ratingCount"], .rating-count, .ds-text[data-auto="rating-count-text"]');
        const reviewCountEl = document.querySelector('[data-auto="review-count-text"], .review-count, .ds-text[data-auto="review-count-text"]');
        if (ratingCountEl && !out.totalRatings) out.totalRatings = parseNumLocal(ratingCountEl.innerText || ratingCountEl.textContent) || out.totalRatings;
        if (reviewCountEl && !out.totalReviews) out.totalReviews = parseNumLocal(reviewCountEl.innerText || reviewCountEl.textContent) || out.totalReviews;

        // breakdown histogram selectors
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
                const m = txt.match(/^\s*([1-5])\D{0,6}([0-9\s,.Kk]{1,12})\s*$/);
                if (m) {
                    const star = Number(m[1]);
                    const cnt = parseNumLocal(m[2]);
                    if (star >= 1 && star <= 5 && cnt != null) {
                        out[star] = cnt;
                        found++;
                    }
                } else {
                    const maybeStar = txt.match(/^\s*([1-5])\s*$/);
                    if (maybeStar) {
                        const star = Number(maybeStar[1]);
                        let cnt = null;
                        const sibling = n.nextElementSibling || (n.parentElement && n.parentElement.querySelector('.count, .value, .number, .ds-text'));
                        if (sibling) cnt = parseNumLocal(sibling.textContent || sibling.innerText);
                        if (cnt != null) { out[star] = cnt; found++; }
                    }
                }
            }
            if (found > 0) break;
        }

        // fallback: noframes [data-apiary="patch"]
        const noframes = Array.from(document.querySelectorAll('noframes[data-apiary="patch"]') || []);
        for (const nf of noframes) {
            const txt = (nf.textContent || '').trim();
            if (!txt) continue;
            try {
                const j = JSON.parse(txt);
                if (j.collections && j.collections.businessReviewStats) {
                    const ids = Object.keys(j.collections.businessReviewStats);
                    if (ids.length) {
                        const stats = j.collections.businessReviewStats[ids[0]];
                        if (stats) {
                            if (stats.reviewsCount && !out.totalReviews) out.totalReviews = Number(stats.reviewsCount) || out.totalReviews;
                            if (stats.reviewsCountVisualization && !out.totalRatings) {
                                const m = String(stats.reviewsCountVisualization).match(/([\d.,]+)K/i);
                                if (m) out.totalRatings = Math.round(parseFloat(m[1].replace(',', '.')) * 1000);
                            }
                        }
                    }
                }

                const str = txt;
                const mRv = str.match(/"ratingvalue"\s*:\s*"?([0-9.,]+)"?/i);
                const mRc = str.match(/"ratingcount"\s*:\s*(\d+)/i);
                const mRev = str.match(/"reviewcount"\s*:\s*(\d+)/i);
                if (mRv) out.avg = parseFloat(mRv[1].replace(',', '.')) || out.avg;
                if (mRc) out.totalRatings = Number(mRc[1]) || out.totalRatings;
                if (mRev) out.totalReviews = Number(mRev[1]) || out.totalReviews;
            } catch (e) { /* ignore json parse errors */ }
        }
    } catch (e) {
        // ignore
    }

    ['5', '4', '3', '2', '1'].forEach(s => { if (out[s] == null) out[s] = null; });
    if (out.avg != null) out.avg = Math.round(Number(out.avg) * 100) / 100;
    if (out.totalRatings != null) out.totalRatings = Math.round(Number(out.totalRatings));
    if (out.totalReviews != null) out.totalReviews = Math.round(Number(out.totalReviews));

    return out;
}
