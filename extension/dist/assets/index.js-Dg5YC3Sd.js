import{g as ze,a as he,l as pe,D as H,i as ye,s as ae,u as ge,R as te,A as Le,B as me,b as Me,I as Ie}from"./content.init-lE8KZG5m.js";function Y(e){if(e==null)return null;const a=String(e).trim();if(!a)return null;const d=a.match(/([\d.,]+)\s*[Kk]/);if(d){const t=parseFloat(d[1].replace(",","."));if(Number.isFinite(t))return Math.round(t*1e3)}const n=a.replace(/\s+/g,"").replace(/[^0-9\.,]/g,"").replace(",","."),c=parseFloat(n);return Number.isFinite(c)?c:null}function we(){const e={totalReviews:null,rating:null,totalRatings:null,avgRating:null};try{try{const n=document.querySelector('meta[itemprop="reviewCount"], meta[name="reviewCount"], meta[name="reviews"]');n&&n.content&&(e.totalReviews=Math.round(Y(n.content))||null)}catch{}try{const n=document.querySelector('meta[itemprop="ratingValue"], meta[name="rating"], meta[itemprop="rating"]');n&&n.content&&(e.rating=Math.round(Y(n.content)*100)/100||null)}catch{}const a=['[data-auto="rating-count-text"]',".rating-count",".reviews-count",".votes-count",".ratings-count",".rating__count",".rate__count",".count-ratings",'[data-test="ratings-count"]'];for(const n of a)try{const c=document.querySelector(n);if(c&&(c.innerText||c.textContent)){const t=Y(c.innerText||c.textContent);if(t!=null){e.totalRatings=Math.round(t);break}}}catch{}if(e.totalRatings==null){const n=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const c of n){const x=(c.getAttribute("aria-label")||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голос|голосов|votes|ratings)/i);if(x){e.totalRatings=Math.round(Y(x[1]));break}}}if(e.totalRatings==null){const c=(document.body.innerText||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голосов|votes|ratings)/i);c&&(e.totalRatings=Math.round(Y(c[1])))}const d=['[data-auto="rating"]','[data-auto="rating-value"]',".average-rating",".avg-rating",".rating-value",".rating__value",".product-rating",".ds-text_weight_bold"];for(const n of d)try{const c=document.querySelector(n);if(c&&(c.innerText||c.textContent)){const t=Y(c.innerText||c.textContent);if(t!=null){e.avgRating=Math.round(t*100)/100;break}}}catch{}if(e.avgRating==null){const n=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const c of n){const x=(c.getAttribute("aria-label")||"").match(/([0-5](?:[.,][0-9])?)\s*(зв|звезды|рейтинг|rating)/i);if(x){e.avgRating=Y(x[1]);break}}}if(e.avgRating==null){const c=(document.body.innerText||"").match(/(?:средн(?:ий|ая)\s*рейтинг|рейтинг|rating)[:\s]*([0-5](?:[.,][0-9])?)/i);c&&(e.avgRating=Y(c[1]))}try{const n=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(n){const c=n.getAttribute("ratingvalue")||n.getAttribute("data-ratingvalue"),t=n.getAttribute("ratingcount")||n.getAttribute("data-ratingcount")||n.getAttribute("raitingcounttext")||n.getAttribute("data-ratingcounttext"),x=n.getAttribute("reviewcount")||n.getAttribute("data-reviewcount")||n.getAttribute("reviewcounttext")||n.getAttribute("data-reviewcounttext");if(c&&e.avgRating==null&&(e.avgRating=Y(c)),t&&e.totalRatings==null){const m=String(t).match(/([0-9\s,.Kk]+)/);if(m){const f=m[1].replace(/\s+/g,"");e.totalRatings=Math.round(Y(f))}}if(x&&e.totalReviews==null){const m=String(x).match(/([0-9\s,.Kk]+)/);m&&(e.totalReviews=Math.round(Y(m[1])))}}}catch{}try{if(typeof window.extractRatingBreakdown=="function"){const n=window.extractRatingBreakdown();n&&(e.avgRating==null&&n.avg!=null&&(e.avgRating=n.avg),e.totalRatings==null&&n.totalRatings!=null&&(e.totalRatings=n.totalRatings),e.totalReviews==null&&n.totalReviews!=null&&(e.totalReviews=n.totalReviews))}}catch{}}catch(a){console.warn("extractProductMeta error",a)}return e.totalRatings==null&&e.totalReviews!=null&&(e.totalRatings=e.totalReviews),e.avgRating==null&&e.rating!=null&&(e.avgRating=e.rating),e.totalRatings=typeof e.totalRatings=="number"&&Number.isFinite(e.totalRatings)?Math.round(e.totalRatings):null,e.avgRating=typeof e.avgRating=="number"&&Number.isFinite(e.avgRating)?Math.round(e.avgRating*100)/100:null,e.totalReviews=e.totalReviews||null,e.rating=e.rating||null,e}function se(){const e={5:null,4:null,3:null,2:null,1:null,avg:null,totalRatings:null,totalReviews:null};try{const a=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(a){const x=a.getAttribute("ratingvalue")||a.getAttribute("data-ratingvalue"),m=a.getAttribute("ratingcount")||a.getAttribute("data-ratingcount")||a.getAttribute("raitingcounttext"),f=a.getAttribute("reviewcount")||a.getAttribute("data-reviewcount")||a.getAttribute("reviewcounttext");x&&(e.avg=parseFloat(String(x).replace(",","."))||e.avg),m&&(e.totalRatings=Y(m)||e.totalRatings),f&&(e.totalReviews=Y(f)||e.totalReviews)}const d=document.querySelector('[data-auto="rating-count-text"], [data-auto="ratingCount"], .rating-count, .ds-text[data-auto="rating-count-text"]'),n=document.querySelector('[data-auto="review-count-text"], .review-count, .ds-text[data-auto="review-count-text"]');d&&!e.totalRatings&&(e.totalRatings=Y(d.innerText||d.textContent)||e.totalRatings),n&&!e.totalReviews&&(e.totalReviews=Y(n.innerText||n.textContent)||e.totalReviews);const c=[".rating-breakdown",".rating-histogram",".rating-list",".rating-distribution",'[data-auto="rating-breakdown"]',".review-stats",".rating-row",".ratingRow",".ds-rating-list"];for(const x of c){const m=document.querySelector(x);if(!m)continue;const f=Array.from(m.querySelectorAll("*"));let b=0;for(const C of f){const k=(C.textContent||"").trim(),M=k.match(/^\s*([1-5])\D{0,6}([0-9\s,.Kk]{1,12})\s*$/);if(M){const E=Number(M[1]),R=Y(M[2]);E>=1&&E<=5&&R!=null&&(e[E]=R,b++)}else{const E=k.match(/^\s*([1-5])\s*$/);if(E){const R=Number(E[1]);let w=null;const o=C.nextElementSibling||C.parentElement&&C.parentElement.querySelector(".count, .value, .number, .ds-text");o&&(w=Y(o.textContent||o.innerText)),w!=null&&(e[R]=w,b++)}}}if(b>0)break}const t=Array.from(document.querySelectorAll('noframes[data-apiary="patch"]')||[]);for(const x of t){const m=(x.textContent||"").trim();if(m)try{const f=JSON.parse(m);if(f.collections&&f.collections.businessReviewStats){const E=Object.keys(f.collections.businessReviewStats);if(E.length){const R=f.collections.businessReviewStats[E[0]];if(R&&(R.reviewsCount&&!e.totalReviews&&(e.totalReviews=Number(R.reviewsCount)||e.totalReviews),R.reviewsCountVisualization&&!e.totalRatings)){const w=String(R.reviewsCountVisualization).match(/([\d.,]+)K/i);w&&(e.totalRatings=Math.round(parseFloat(w[1].replace(",","."))*1e3))}}}const b=m,C=b.match(/"ratingvalue"\s*:\s*"?([0-9.,]+)"?/i),k=b.match(/"ratingcount"\s*:\s*(\d+)/i),M=b.match(/"reviewcount"\s*:\s*(\d+)/i);C&&(e.avg=parseFloat(C[1].replace(",","."))||e.avg),k&&(e.totalRatings=Number(k[1])||e.totalRatings),M&&(e.totalReviews=Number(M[1])||e.totalReviews)}catch{}}}catch{}return["5","4","3","2","1"].forEach(a=>{e[a]==null&&(e[a]=null)}),e.avg!=null&&(e.avg=Math.round(Number(e.avg)*100)/100),e.totalRatings!=null&&(e.totalRatings=Math.round(Number(e.totalRatings))),e.totalReviews!=null&&(e.totalReviews=Math.round(Number(e.totalReviews))),e}function $e(e=15e3){const a={reviews:[],totalFound:0,charactersUsed:0,extractionMethods:[]};try{let d=function(){const o=['[data-auto="reviews-show-more"]','[data-autotest-id*="show-more"]',".reviews-show-more",".show-more",".load-more","button"],s=new Set;for(const u of o)try{Array.from(document.querySelectorAll(u)).forEach(r=>{try{if(!(r instanceof HTMLElement))return;const l=window.getComputedStyle(r);if(l.display==="none"||l.visibility==="hidden"||r.disabled)return;const S=(r.innerText||r.textContent||"").trim();(/показать|еще|ещё|загрузить|more|show/i.test(S)||u.indexOf("show-more")>=0||u.indexOf("reviews-show-more")>=0)&&!s.has(r)&&(r.click(),s.add(r),setTimeout(()=>{try{r.disabled||r.click()}catch{}},900))}catch{}})}catch{}try{const u=document.querySelector('[data-zone-name="reviews"], [data-auto="ugc-section"], .reviews, .n-reviews, .review-list, [data-auto="reviews"]');if(u)try{u.scrollIntoView({behavior:"smooth"}),u.scrollTop=u.scrollHeight}catch{}else window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})}catch{}},n=function(){const o=['button[class*="expand"]','button[class*="show-full"]','[data-auto*="expand"]',".review-expand",".opinion-expand",'button:contains("Развернуть")','button:contains("Показать полностью")','button:contains("Читать полностью")','[class*="read-more"]'];for(const s of o)try{document.querySelectorAll(s).forEach(h=>{try{h.offsetHeight>0&&h.click()}catch{}})}catch{}},c=function(){const o=[];try{document.querySelectorAll("script").forEach(h=>{if(!h.textContent)return;[/"reviews":\s*\[(.*?)\]/gs,/"opinions":\s*\[(.*?)\]/gs,/"reviewText":\s*"([^"]+)"/g,/"text":\s*"([^"]+)"/g,/"comment":\s*"([^"]+)"/g].forEach(l=>{const S=h.textContent.matchAll(l);for(const y of S)try{if(y[1]&&y[1].length>30){const g=y[1].replace(/\\n/g," ").replace(/\\"/g,'"').replace(/\\\\/g,"\\").trim();g.length>30&&o.push(g)}}catch{}})}),document.querySelectorAll("[data-bem]").forEach(h=>{try{Object.values(h.dataset).forEach(r=>{if(!(!r||r.length<100))try{const l=JSON.parse(r),S=l.reviews||l.opinions;Array.isArray(S)&&S.forEach(y=>{const g=y.text||y.content||y.comment;g&&g.length>30&&o.push(String(g))})}catch{}})}catch{}})}catch{}return o},t=function(o){if(!o)return"";let s=String(o).replace(/\r\n|\r/g,`
`).replace(/\t/g," ").replace(/\u00A0/g," ");s=s.replace(/\s+/g," ").trim(),s=s.replace(/\b(?:\d+\s+){3,}\d+\b/g," "),s=s.replace(/\b\d{3,}\b/g," "),s=s.replace(/(?:\b\d+\b[\s,.-]*){3,}/g," ");try{s=s.replace(/[^\p{L}\p{N}\s\.,!?\-()«»—:;\/%]/gu," ")}catch{s=s.replace(/[^A-Za-zА-Яа-яЁё0-9\s\.,!?\-()«»—:;\/%]/g," ")}return s=s.replace(/([,!.?–—\-]){2,}/g,"$1"),s=s.replace(/\s+/g," ").trim(),s},x=function(o){if(!o)return"";const s=[".review-text",".opinion-text",".review-content",".comment-text",'[data-auto="review-text"]','[class*="text"]',"p",".content"];try{for(const r of s){const l=o.querySelector?o.querySelector(r):null;if(l&&l.innerText&&l.innerText.trim().length>20)return t(l.innerText)}}catch{}let u="";try{u=o.innerText||o.textContent||""}catch{u=""}return[/Достоинства:?\s*/gi,/Недостатки:?\s*/gi,/Комментарий:?\s*/gi,/Опыт использования:?\s*/gi,/Рекомендую\s*/gi,/Не рекомендую\s*/gi,/\d+\s*из\s*\d+\s*считают отзыв полезным/gi,/Был ли отзыв полезен\?/gi,/Да\s*\d*\s*Нет\s*\d*/gi,/\d+\s*звезд[ыа]?/gi,/Оценка:\s*\d+/gi].forEach(r=>{u=u.replace(r," ")}),t(u)},m=function(o){if(!o)return!1;const s=o.length;return!(s<40||(o.match(/\d/g)||[]).length/Math.max(1,s)>.3||(o.match(/[A-Za-zА-Яа-яЁё]/g)||[]).length<12||(o.match(/[А-Яа-яЁё]/g)||[]).length<Math.min(10,Math.floor(s*.2))||/^(source|businessId|notEmpty|id|source,)/i.test(o.trim()))},f=function(o){const s=new Set,u=[];return o.forEach(h=>{const r=h.text.toLowerCase().replace(/\s+/g,"").substring(0,100);s.has(r)||(s.add(r),u.push(h))}),u},b=function(o,s){const u=[];let h=0;const l=`

`.length,S=o.sort((y,g)=>g.length-y.length);for(const y of S){const g=y.length,P=h===0?g:g+l;if(h+P<=s)u.push(y),h+=P;else if(h===0){const D=y.substring(0,s-3)+"...";u.push(D),h=D.length;break}else{const D=s-h-l;if(D>50){const V=y.substring(0,D-3)+"...";u.push(V);break}else break}}return u};d(),n();const C=['[data-auto="review-item"]','[data-zone-name="review"]','[data-autotest-id="review-card"]','[data-tid="review-item"]','[data-auto="OpinionCard"]',".opinion",".review-item",".user-review",'[class*="review"]','[class*="opinion"]','[data-zone*="review"]',".n-review-card",".ProductReview",'iframe[src*="review"] + *','[data-bem*="review"]'],k=new Set;for(const o of C)try{const s=document.querySelectorAll(o);s.forEach(u=>{try{u&&u.innerText&&u.innerText.trim().length>20&&k.add(u)}catch{}}),s.length>0&&a.extractionMethods.push(`${o}: ${s.length} элементов`)}catch{}const M=c(),E=[];k.forEach(o=>{try{const s=x(o),u=t(s);m(u)&&E.push({text:u,source:"dom",length:u.length,element:o})}catch{}}),M.forEach(o=>{try{const s=t(o);m(s)&&E.push({text:s,source:"json",length:s.length})}catch{}});const R=f(E);R.sort((o,s)=>s.length-o.length);const w=b(R.map(o=>o.text),e);return a.reviews=w,a.totalFound=R.length,a.charactersUsed=w.reduce((o,s)=>o+(s?s.length:0),0),a}catch(d){return console.warn("extractYandexMarketReviews error",d),a}}function Be(e){if(!e)return"";let a=String(e);return a=a.replace(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi,"[email]"),a=a.replace(/(\+?\d[\d\-\s()]{6,}\d)/g,"[phone]"),a=a.replace(/https?:\/\/\S+/gi,"[url]"),a=a.replace(/\b\d{6,}\b/g,"[id]"),a.length>2e3&&(a=a.slice(0,2e3)+"…"),a.trim()}async function Ne(e=20){let a=[];try{typeof oe=="function"&&(a=oe(),Array.isArray(a)||(a=[]))}catch(t){console.error("Ошибка при извлечении отзывов:",t),a=[]}const d=a.slice(0,e).map((t,x)=>{const m=typeof t=="string"?t:t.text||"";return{id:x+1,text:Be(m),length:m.length}});let n={};try{typeof extractProductMeta=="function"&&(n=extractProductMeta()||{})}catch(t){console.error("Ошибка при извлечении мета данных продукта:",t),n={}}const c=await chrome.storage.sync.get({serverUrl:""});return{version:"1.0",source:location.hostname,serverUrlPreview:c.serverUrl||"",product:{url:location.href,title:document.title,avgRating:n.avgRating??null,totalRatings:n.totalRatings??null},reviewsCount:d.length,reviewsSample:d}}function oe(e=10){if(e=ze(),window.location.hostname.includes("market.yandex")||document.title.includes("Яндекс.Маркет")||document.querySelector('[data-baobab-name*="market"]')){const t=$e(15e3);return(t&&t.reviews?t.reviews:[]).map(m=>{const f=typeof m=="string"?m:m&&(m.text||m.review||"")||"";return{raw:f,anon:he(String(f))}}).filter(m=>m.raw&&m.raw.length>30).map(m=>m.anon).slice(0,e)}const d=['[data-zone-name="review"]','[data-autotest-id="review-card"]',".review__item",".product-review",".review",".comments-item",'[data-test-id*="review"]',".feedback",".pa-review",".review-item",".reviewCard"];let n=[];for(const t of d){const x=document.querySelectorAll(t);if(x&&x.length){n=Array.from(x);break}}const c=n.map(t=>{const m=(t?.textContent||t?.innerText||"").trim();return m?he(m):""}).filter(t=>t&&t.length>30).slice(0,e);return console.debug("ShopSage: Standard extraction found",c.length,"reviews"),c}function ke(e){return e==null?"—":`${Math.round(e*10)/10} <svg class="star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.167L12 18.896l-7.336 3.868 1.402-8.167L.132 9.21l8.2-1.192z"/></svg>`}function Oe(e,a={}){const d=e.getElementById?e.getElementById("ss-preview-modal"):e.querySelector("#ss-preview-modal");if(d)try{d.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>d.remove(),200)}catch{d.remove()}const n=document.createElement("div");n.id="ss-preview-modal";const c=a.product?.title||document.title||"Неизвестный товар",t=a.product?.url||location.href,x=JSON.stringify(a,null,2),m=new Blob([x]).size,f=a._truncated===!0;function b(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function C(r){try{const l=new URL(r),S=l.pathname.length>24?l.pathname.slice(0,21)+"…":l.pathname;return`${l.hostname}${S}`}catch{return r.length>40?r.slice(0,37)+"…":r}}function k(r){return!r||r<1024?`${r} Б`:r<1024*1024?`${Math.round(r/1024)} КБ`:`${(r/(1024*1024)).toFixed(2)} МБ`}function M(r,l=45){return r.length>l?r.slice(0,l)+"…":r}n.innerHTML=`
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
                        <div class="pm-value" title="${b(c)}">${b(M(c))}</div>
                    </div>
                </div>

                <div class="pm-summary-row">
                    <div style="flex: 1;">
                        <div class="pm-label">Ссылка</div>
                        <div class="pm-value">
                            <a href="${b(t)}" class="pm-link" target="_blank" rel="noopener noreferrer"
                               title="${b(t)}">${b(C(t))}</a>
                        </div>
                    </div>
                </div>

                <div class="pm-meta">
                    <div class="pm-meta-item">
                        <span class="pm-meta-label">Размер данных:</span>
                        <span class="pm-meta-value">${k(m)}</span>
                    </div>
                    ${a.rating?`
                    <div class="pm-meta-item">
                        <span class="pm-meta-label">Рейтинг:</span>
                        <span class="pm-meta-value">${a.rating}</span>
                    </div>
                    `:""}
                </div>

                ${f?`
                <div class="pm-warning">
                    <span>⚠️</span>
                    <span>Данные были усечены до допустимого лимита размера</span>
                </div>
                `:""}
            </div>

            <details class="pm-dev">
                <summary>Технические детали (JSON)</summary>
                <pre>${b(x)}</pre>
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
    `,e.appendChild(n);const E=n.querySelector(".pm-close"),R=n.querySelector(".btn-close-action"),w=n.querySelector(".btn-copy"),o=n.querySelector(".btn-download"),s=n.querySelector(".pm-link");function u(){try{n.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>{try{n.remove()}catch{}},200)}catch{try{n.remove()}catch{}}document.removeEventListener("keydown",h)}E?.addEventListener("click",u),R?.addEventListener("click",u),w?.addEventListener("click",async()=>{const r=w.querySelector(".btn-text")?.textContent||"Копировать",l=w.querySelector(".btn-text");try{await navigator.clipboard.writeText(x),w.classList.add("btn-success"),l&&(l.textContent="Скопировано!"),setTimeout(()=>{w.classList.remove("btn-success"),l&&(l.textContent=r)},1500)}catch{w.classList.add("btn-error"),l&&(l.textContent="Ошибка!"),setTimeout(()=>{w.classList.remove("btn-error"),l&&(l.textContent=r)},1500);try{const y=n.querySelector("pre");if(y){const g=document.createRange();g.selectNodeContents(y);const P=window.getSelection();P.removeAllRanges(),P.addRange(g)}}catch{}}}),o?.addEventListener("click",()=>{const r=o.querySelector(".btn-text")?.textContent||"Скачать",l=o.querySelector(".btn-text");try{const S=new Blob([x],{type:"application/json;charset=utf-8"}),y=URL.createObjectURL(S),g=document.createElement("a");g.href=y,g.download=`shopsage-data-${new Date().toISOString().slice(0,19).replace(/[:.]/g,"-")}.json`,document.body.appendChild(g),g.click(),g.remove(),URL.revokeObjectURL(y),o.classList.add("btn-success"),l&&(l.textContent="Скачано!"),setTimeout(()=>{o.classList.remove("btn-success"),l&&(l.textContent=r)},1500)}catch(S){o.classList.add("btn-error"),l&&(l.textContent="Ошибка!"),setTimeout(()=>{o.classList.remove("btn-error"),l&&(l.textContent=r)},1500),console.error("Download failed:",S)}}),s?.addEventListener("click",r=>{r.preventDefault();try{window.open(t,"_blank","noopener,noreferrer")}catch(l){console.warn("Could not open product URL:",l)}});function h(r){r.key==="Escape"&&u()}return document.addEventListener("keydown",h),n.addEventListener("click",r=>{r.target===n&&u()}),n}function Ye(e,a={}){const d=typeof pe=="function"?pe():window.__loadedSettings||{},n={...H,...d,...a},c=e.getElementById?e.getElementById("ss-settings-modal"):e.querySelector("#ss-settings-modal");if(c)try{c.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>c.remove(),200)}catch{c.remove()}const t=document.createElement("div");t.id="ss-settings-modal";const x=n.maxReviews??H.maxReviews??5;t.innerHTML=`
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
              <input type="checkbox" id="set-auto-analyze" ${n.autoAnalyze?"checked":""}>
              <span>Автоматически анализировать при загрузке страницы</span>
            </label>
            <button type="button" class="feature-lock" data-feature="autoAnalyze" title="Доступно по подписке">🔒</button>
          </div>

          <div class="setting-option" style="position:relative;">
            <label style="flex-direction: column; align-items: flex-start; gap: 6px; width:100%;">
              <span>Максимальное количество отзывов для анализа: <span class="range-value" id="max-reviews-value">${x}</span></span>
              <div class="range-wrap" style="position:relative; width:100%;">
                <input type="range" id="set-max-reviews" min="1" max="20" value="${x}" style="width: 100%;">
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
              <input type="radio" name="analysis-depth" value="fast" ${n.analysisDepth==="fast"?"checked":""}>
              <span>Быстрый анализ (поверхностный)</span>
            </label>
            <!-- empty placeholder for alignment -->
            <span style="width:34px"></span>
          </div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="radio" name="analysis-depth" value="medium" ${n.analysisDepth==="medium"?"checked":""}>
              <span>Стандартный анализ (рекомендуется)</span>
            </label>
            <span style="width:34px"></span>
          </div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="radio" name="analysis-depth" value="deep" ${n.analysisDepth==="deep"?"checked":""}>
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
              <input type="checkbox" id="set-show-rating" ${n.showRating?"checked":""}>
              Показывать рейтинг товара
            </label>
          </div>

          <div class="setting-option">
            <label style="flex-direction: column; align-items: flex-start; gap: 6px;">
              <span>Язык интерфейса:</span>
              <select id="set-language" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); color: var(--text); padding: 6px 8px; border-radius: 6px; font-size: 12px;">
                <option value="ru" ${n.language==="ru"?"selected":""}>Русский</option>
                <option value="en" ${n.language==="en"?"selected":""}>English</option>
                <option value="auto" ${n.language==="auto"?"selected":""}>Автоопределение</option>
              </select>
            </label>
          </div>
        </div>

        <div class="setting-group">
          <div class="setting-title">Дополнительно</div>
          <div class="setting-desc">Экспериментальные и расширенные функции</div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="checkbox" id="set-debug-mode" ${n.debugMode?"checked":""}>
              <span>Режим отладки (показывать техническую информацию)</span>
            </label>
            <span style="width:34px"></span>
          </div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="checkbox" id="set-save-history" ${n.saveHistory?"checked":""}>
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
    `,e.appendChild(t);const m=t.querySelector(".sm-close"),f=t.querySelector(".btn-close-action"),b=t.querySelector(".btn-save"),C=t.querySelector(".btn-reset"),k=t.querySelector("#set-max-reviews"),M=t.querySelector("#max-reviews-value"),E=t.querySelector("#max-range-lock"),R=t.querySelector("#set-auto-analyze"),w=t.querySelector("#set-save-history"),o=t.querySelector('input[name="analysis-depth"][value="deep"]'),s=t.querySelector('input[name="analysis-depth"][value="medium"]'),u=Array.from(t.querySelectorAll(".feature-lock"));function h(){return typeof Se=="function"?Se:window.__utils&&typeof window.__utils.showSubscriptionModal=="function"?window.__utils.showSubscriptionModal:(p={},i)=>{const v=new CustomEvent("subscriptionRequest",{detail:{reason:"unlock-max-reviews"},bubbles:!0,composed:!0});return document.dispatchEvent(v),()=>{}}}let r=null;function l(){if(r)return;const p=h(),i=t||e||document.body;try{const v=p({message:"Доступ к расширенным функциям доступен только по подписке. Оформить подписку?",onBuy:()=>{const z=new CustomEvent("subscriptionRequest",{detail:{reason:"unlock-max-reviews"},bubbles:!0,composed:!0});document.dispatchEvent(z)}},i),I=i instanceof ShadowRoot||i instanceof Element?i.querySelector("#subscription-modal-overlay"):document.getElementById("subscription-modal-overlay");if(typeof v=="function"){let z=null;if(I){const j=i instanceof ShadowRoot||i instanceof Element?i:document.body;z=new MutationObserver(()=>{if(!I.isConnected){r=null;try{z.disconnect()}catch{}}}),z.observe(j,{childList:!0,subtree:!0})}r=()=>{try{v()}catch{}r=null;try{z&&z.disconnect()}catch{}}}else if(I){const z=i instanceof ShadowRoot||i instanceof Element?i:document.body,j=new MutationObserver(()=>{I.isConnected||(r=null,j.disconnect())});j.observe(z,{childList:!0,subtree:!0}),r=()=>{try{I.remove()}catch{}r=null;try{j.disconnect()}catch{}}}else r=null}catch{const I=new CustomEvent("subscriptionRequest",{detail:{reason:"unlock-max-reviews"},bubbles:!0,composed:!0});document.dispatchEvent(I),r=null}}let S=!!n.isSubscribed;function y(p){S=!!p,S&&E?(E.style.display="none",E.setAttribute("aria-hidden","true")):E&&(E.style.display="block",E.setAttribute("aria-hidden","false")),u.forEach(i=>{i.getAttribute("data-feature"),S?(i.style.display="none",i.setAttribute("aria-hidden","true")):(i.style.display="block",i.setAttribute("aria-hidden","false"))}),S?(o&&(o.disabled=!1),R&&(R.disabled=!1),w&&(w.disabled=!1)):(o&&(o.checked&&s&&(o.checked=!1,s.checked=!0),o.disabled=!0),R&&(R.checked=!1,R.disabled=!0),w&&(w.checked=!1,w.disabled=!0))}if(typeof ye=="function")try{const p=ye();p&&typeof p.then=="function"?p.then(i=>y(!!i)).catch(()=>y(!!n.isSubscribed)):y(!!p)}catch{y(!!n.isSubscribed)}else y(!!n.isSubscribed);M&&(M.textContent=String(k?.value??x)),u.forEach(p=>{p.addEventListener("click",i=>{i.stopPropagation(),l()})}),t.querySelector('.setting-option .feature-row label[for="set-auto-analyze"]');const g=R?R.closest("label"):null;g&&g.addEventListener("click",p=>{S||(p.preventDefault(),l())});const P=w?w.closest("label"):null;P&&P.addEventListener("click",p=>{S||(p.preventDefault(),l())});const D=o?o.closest("label"):null;D&&D.addEventListener("click",p=>{S||(p.preventDefault(),setTimeout(()=>{o&&(o.checked=!1),s&&(s.checked=!0)},0),l())}),k?.addEventListener("input",p=>{let i=parseInt(p.currentTarget?.value,10)||x;!S&&i>10&&(l(),i=10,k.value="10"),M&&(M.textContent=String(i))}),E?.addEventListener("click",p=>{p.stopPropagation(),!S&&l()});function V(){try{t.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>{try{t.remove()}catch{}},200)}catch{try{t.remove()}catch{}}document.removeEventListener("keydown",K);try{typeof r=="function"&&r()}catch{}r=null}function le(){const p=parseInt(t.querySelector("#set-max-reviews")?.value,10)||H.maxReviews,i=!S&&p>10?10:p;return{autoAnalyze:!!t.querySelector("#set-auto-analyze")?.checked,maxReviews:i,maxReviews:i,language:t.querySelector("#set-language")?.value||"ru",analysisDepth:t.querySelector('input[name="analysis-depth"]:checked')?.value||"medium",showRating:!!t.querySelector("#set-show-rating")?.checked,debugMode:!!t.querySelector("#set-debug-mode")?.checked,saveHistory:!!t.querySelector("#set-save-history")?.checked}}function ce(){t.querySelector("#set-auto-analyze").checked=H.autoAnalyze,t.querySelector("#set-max-reviews").value=H.maxReviews;const p=t.querySelector("#max-reviews-value");p&&(p.textContent=String(H.maxReviews)),t.querySelector("#set-language").value=H.language;const i=t.querySelector(`input[name="analysis-depth"][value="${H.analysisDepth}"]`);i&&(i.checked=!0),t.querySelector("#set-show-rating").checked=H.showRating,t.querySelector("#set-debug-mode").checked=H.debugMode,t.querySelector("#set-save-history").checked=H.saveHistory,!S&&parseInt(t.querySelector("#set-max-reviews").value,10)>10&&(t.querySelector("#set-max-reviews").value="10",p&&(p.textContent="10")),S||(o&&o.checked&&s&&(o.checked=!1,s.checked=!0),R&&(R.checked=!1,R.disabled=!0),w&&(w.checked=!1,w.disabled=!0))}C?.addEventListener("click",async()=>{try{localStorage.removeItem(SETTINGS_KEY),typeof ae=="function"&&await ae({...H||{},maxReviews:H.maxReviews??5,maxReviews:H.maxReviews??5})}catch(v){console.warn("Не удалось удалить/сохранить ключ настроек:",v)}ce();const p=C.querySelector(".btn-text")?.textContent||"Сбросить",i=C.querySelector(".btn-text");i&&(i.textContent="Сброшено!"),setTimeout(()=>{i&&(i.textContent=p)},1e3)}),m?.addEventListener("click",V),f?.addEventListener("click",V),b?.addEventListener("click",async()=>{const p=le();try{typeof ae=="function"?await ae(p):localStorage.setItem(SETTINGS_KEY,JSON.stringify(p))}catch(z){console.error("Ошибка при сохранении настроек:",z)}const i=new CustomEvent("settingsChanged",{detail:p,bubbles:!0,composed:!0});try{e.dispatchEvent(i)}catch{t.dispatchEvent(i)}try{typeof ge=="function"&&ge()}catch(z){console.warn("Ошибка при обновлении видимости рейтинга:",z)}const v=b.querySelector(".btn-text")?.textContent||"Сохранить",I=b.querySelector(".btn-text");b.classList.add("btn-success"),I&&(I.textContent="Сохранено!"),setTimeout(()=>{b.classList.remove("btn-success"),I&&(I.textContent=v),V()},1200)});function K(p){p.key==="Escape"&&V()}return document.addEventListener("keydown",K),setTimeout(()=>{t.addEventListener("click",p=>{p.target===t&&V()})},100),t}function Se(e={},a=document.body){const{title:d="Разблокировать расширенный анализ",message:n="Больше 10 отзывов доступно только по подписке. Хотите оформить подписку?",buyText:c="Купить подписку",cancelText:t="Нет",onBuy:x}=e,m="subscription-modal-overlay";let f=document.body,b=!1;a&&(a instanceof ShadowRoot||a instanceof Element?(f=a,b=!0):(f=document.body,b=!1));try{const g=b?f.querySelector(`#${m}`):document.getElementById(m);if(g)return()=>{try{g.remove()}catch{}}}catch{}function C(g){return String(g).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const k=document.createElement("div");k.id=m,k.className="subscription-modal-overlay";const M=document.createElement("style");M.textContent=`
    .subscription-modal-overlay {
      ${b?"position: absolute; inset: 0;":"position: fixed; inset: 0;"}
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px;
      z-index: 2147483650;
      background: ${b?"linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.06))":"linear-gradient(180deg, rgba(4,6,12,0.55), rgba(4,6,12,0.45))"};
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
  `,k.appendChild(M),k.innerHTML+=`
    <div class="subscription-modal" role="dialog" aria-modal="true" aria-labelledby="subscription-modal-title">
      <button class="subscription-close" aria-label="Закрыть">&times;</button>
      <div class="subscription-content">
        <h3 id="subscription-modal-title">${C(d)}</h3>
        <p class="subscription-message">${C(n)}</p>
        <div class="subscription-actions">
          <button class="subscription-buy">${C(c)}</button>
          <button class="subscription-cancel">${C(t)}</button>
        </div>
      </div>
    </div>
  `;let E=null;if(b&&f instanceof Element){const g=window.getComputedStyle(f);(!g.position||g.position==="static")&&(E=f.style.position||"",f.style.position="relative")}b?f.appendChild(k):document.body.appendChild(k);const R=document.body.style.overflow;b||(document.body.style.overflow="hidden");const w=k.querySelector(".subscription-buy"),o=k.querySelector(".subscription-cancel"),s=k.querySelector(".subscription-close");let u=!1;function h(){if(!u){u=!0;try{k.remove()}catch{}if(E!==null&&f instanceof Element)try{f.style.position=E}catch{}b||(document.body.style.overflow=R||""),document.removeEventListener("keydown",y)}}function r(g){g.stopPropagation();try{typeof x=="function"?x():document.dispatchEvent(new CustomEvent("subscriptionRequest",{detail:{reason:"unlock-max-reviews"},bubbles:!0,composed:!0}))}catch{}h()}function l(g){g.stopPropagation(),h()}function S(g){g.target===k&&h()}function y(g){g.key==="Escape"&&h()}return w?.addEventListener("click",r),o?.addEventListener("click",l),s?.addEventListener("click",l),k.addEventListener("click",S),document.addEventListener("keydown",y),h}const _e=`<aside\r
	class="shopsage-sidebar"\r
	role="dialog"\r
	aria-label="Verdict — анализ отзывов"\r
>\r
	<header class="ss-header">\r
		<div class="brand" aria-hidden="false">\r
			<img src="" alt="Verdict Logo" width="32" height="32" id="ss-logo" />\r
			<div class="title">Вердикт</div>\r
		</div>\r
		<div style="display: flex; gap: 8px; align-items: center">\r
			<button\r
				id="ss-preview-settings"\r
				class="ss-settings"\r
				title="Настройки"\r
				aria-label="Открыть настройки"\r
			>\r
				⚙️\r
			</button>\r
			<button class="ss-close" title="Закрыть" aria-label="Закрыть">✕</button>\r
		</div>\r
	</header>\r
\r
	<main class="ss-body">\r
		<div class="ss-controls">\r
			<button id="ss-analyze" class="btn-primary" aria-live="polite">\r
				Проанализировать отзывы\r
			</button>\r
\r
			<div class="ss-info" title="Количество выбранных отзывов">\r
				Выбрано <span id="ss-count">0</span>\r
			</div>\r
\r
			<div class="ss-meta" aria-hidden="false">\r
				<div class="muted">Рейтинг: <strong id="ss-rating">—</strong></div>\r
				<div class="muted">Всего: <strong id="ss-total">—</strong></div>\r
			</div>\r
\r
			<div\r
				id="ss-loader"\r
				class="ss-loader hidden"\r
				aria-hidden="true"\r
				role="status"\r
				aria-live="polite"\r
			>\r
				<span class="visually-hidden">Загрузка</span>\r
			</div>\r
\r
			<!-- send-to-server toggle + preview -->\r
			<div class="ss-send-row" aria-hidden="false">\r
				<label\r
					for="ss-send-server"\r
					style="display: flex; gap: 8px; align-items: center; cursor: pointer"\r
				>\r
					<input id="ss-send-server" type="checkbox" />\r
					<span style="font-size: 12px; color: rgba(207, 230, 255, 0.9)">\r
						Отправлять анонимизированные отзывы на сервер\r
					</span>\r
				</label>\r
				<button\r
					id="ss-preview-payload"\r
					class="btn-secondary"\r
					title="Посмотреть что будет отправлено"\r
				>\r
					Просмотреть payload\r
				</button>\r
			</div>\r
		</div>\r
\r
		<div id="ss-error" class="error-msg hidden" role="alert"></div>\r
\r
		<div class="ss-score hidden" id="ss-score-container" aria-hidden="true">\r
			<div class="score-badge" id="ss-score-badge">—</div>\r
			<div class="score-bar" aria-hidden="true">\r
				<div\r
					class="score-bar-inner"\r
					id="ss-score-bar-inner"\r
					style="width: 0%"\r
				></div>\r
			</div>\r
		</div>\r
\r
		<div class="score-sub hidden" id="ss-score-sub" aria-hidden="true"></div>\r
\r
		<div id="ss-result" class="ss-result hidden" aria-live="polite">\r
			<section>\r
				<h4>Преимущества</h4>\r
				<ul id="ss-pros" class="pros-list"></ul>\r
			</section>\r
\r
			<section>\r
				<h4>Недостатки</h4>\r
				<ul id="ss-cons" class="cons-list"></ul>\r
			</section>\r
\r
			<section>\r
				<h4>Заключение</h4>\r
				<div id="ss-verdict" class="ss-verdict"></div>\r
			</section>\r
		</div>\r
	</main>\r
</aside>\r
`,Ue=`:host {\r
  --bg-start: #061226;\r
  --bg-end: #071431;\r
  --glass: rgba(255, 255, 255, 0.03);\r
  --muted: rgba(154, 164, 178, 0.9);\r
  --text: #e6eef8;\r
  --accentA: #7c3aed;\r
  --accentB: #4f46e5;\r
  --accentGlow: rgba(79, 70, 229, 0.14);\r
  --star: #ffd54f;\r
  --card-bg: rgba(255, 255, 255, 0.02);\r
  --radius: 12px;\r
  --shadow: 0 20px 40px rgba(2, 6, 23, 0.6);\r
  --glass-border: rgba(255, 255, 255, 0.03);\r
  --mono: "Inter", "Montserrat", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;\r
}\r
\r
.shopsage-sidebar {\r
  width: 380px;\r
  max-height: calc(100vh - 120px);\r
  background: linear-gradient(180deg, var(--bg-start), var(--bg-end));\r
  color: var(--text);\r
  border-radius: var(--radius);\r
  box-shadow: var(--shadow);\r
  z-index: 999999;\r
  overflow: hidden;\r
  display: flex;\r
  flex-direction: column;\r
  font-family: var(--mono);\r
  border: 1px solid var(--glass-border);\r
  backdrop-filter: blur(8px) saturate(110%);\r
  transform-origin: right top;\r
  animation: slideIn 280ms cubic-bezier(0.2, 0.9, 0.2, 1);\r
}\r
\r
/* subtle entrance */\r
@keyframes slideIn {\r
  from {\r
    transform: translateY(8px) translateX(8px) scale(0.995);\r
    opacity: 0;\r
  }\r
  to {\r
    transform: none;\r
    opacity: 1;\r
  }\r
}\r
\r
.ss-header {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  padding: 12px 14px;\r
  border-bottom: 1px solid var(--glass-border);\r
}\r
.brand {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
}\r
.brand img {\r
  width: 32px;\r
  height: 32px;\r
  border-radius: 8px;\r
  background: linear-gradient(90deg, var(--accentA), var(--accentB));\r
  box-shadow:\r
    0 4px 18px var(--accentGlow),\r
    inset 0 -4px 12px rgba(255, 255, 255, 0.02);\r
}\r
.brand .title {\r
  font-weight: 700;\r
  color: #eaf2ff;\r
  font-size: 15px;\r
  letter-spacing: 0.2px;\r
}\r
\r
/* close button */\r
.ss-close,\r
.ss-settings {\r
  background: transparent;\r
  border: 0;\r
  color: rgba(230, 238, 248, 0.9);\r
  cursor: pointer;\r
  font-size: 16px;\r
  padding: 6px;\r
  border-radius: 8px;\r
}\r
.ss-close:hover {\r
  background: rgba(255, 255, 255, 0.02);\r
  transform: scale(1.03);\r
}\r
\r
/* body */\r
.ss-body {\r
  padding: 12px;\r
  overflow: auto;\r
  max-height: calc(100vh - 160px);\r
  -webkit-overflow-scrolling: touch;\r
}\r
\r
/* controls row */\r
.ss-controls {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  margin-bottom: 12px;\r
  flex-wrap: wrap;\r
}\r
\r
/* primary button refreshed */\r
.btn-primary {\r
  background: linear-gradient(90deg, var(--accentA), var(--accentB));\r
  border: 0;\r
  padding: 10px 14px;\r
  border-radius: 10px;\r
  color: #fff;\r
  font-weight: 700;\r
  cursor: pointer;\r
  box-shadow: 0 10px 28px var(--accentGlow);\r
  transition:\r
    transform 120ms ease,\r
    box-shadow 120ms ease,\r
    opacity 120ms ease;\r
  font-size: 13px;\r
}\r
.btn-primary:hover {\r
  transform: translateY(-2px);\r
}\r
.btn-primary:active {\r
  transform: translateY(0);\r
}\r
.btn-primary:disabled {\r
  opacity: 0.6;\r
  cursor: not-allowed;\r
  box-shadow: none;\r
  transform: none;\r
}\r
\r
/* small info text */\r
.ss-info {\r
  color: rgba(207, 230, 255, 0.9);\r
  font-size: 13px;\r
}\r
.ss-meta {\r
  color: rgba(207, 230, 255, 0.9);\r
  font-size: 13px;\r
  margin-left: 6px;\r
  display: flex;\r
  gap: 12px;\r
  align-items: center;\r
}\r
.ss-meta .muted {\r
  color: var(--muted);\r
  font-size: 12px;\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
}\r
\r
/* rating strong style */\r
#ss-rating {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 6px;\r
  font-weight: 800;\r
  color: #fff;\r
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));\r
  padding: 4px 8px;\r
  border-radius: 8px;\r
  box-shadow: 0 6px 18px rgba(3, 6, 20, 0.45);\r
}\r
\r
/* star icon */\r
#ss-rating .star {\r
  display: inline-block;\r
  color: var(--star);\r
  font-size: 14px;\r
  line-height: 1;\r
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);\r
  transform: translateY(-1px);\r
}\r
\r
/* loader */\r
.ss-loader {\r
  width: 28px;\r
  height: 28px;\r
  border-radius: 50%;\r
  border: 3px solid rgba(255, 255, 255, 0.06);\r
  border-top-color: var(--accentA);\r
  animation: spin 0.9s linear infinite;\r
}\r
@keyframes spin {\r
  to {\r
    transform: rotate(360deg);\r
  }\r
}\r
\r
/* result panels */\r
.ss-result {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 10px;\r
  margin-inline: 10px;\r
}\r
.ss-result h4 {\r
  margin: 0 0 6px 0;\r
  font-size: 13px;\r
  color: #ffd54f;\r
  font-weight: 700;\r
  letter-spacing: 0.2px;\r
}\r
.ss-result ul {\r
  margin: 0;\r
  padding-left: 18px;\r
  color: #cfe6ff;\r
}\r
.ss-verdict {\r
  background: var(--card-bg);\r
  padding: 12px;\r
  border-radius: 10px;\r
  color: #e8f4ff;\r
}\r
\r
/* lists */\r
.pros-list,\r
.cons-list {\r
  list-style: none;\r
  padding: 0;\r
  margin: 0;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 8px;\r
}\r
.pros-list li,\r
.cons-list li {\r
  display: flex;\r
  gap: 10px;\r
  align-items: flex-start;\r
  padding: 8px;\r
  border-radius: 10px;\r
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.006), rgba(0, 0, 0, 0.01));\r
  transition:\r
    transform 0.12s ease,\r
    background 0.12s ease,\r
    box-shadow 0.12s ease;\r
}\r
.pros-list li:hover,\r
.cons-list li:hover {\r
  transform: translateY(-4px);\r
  background: rgba(255, 255, 255, 0.01);\r
  box-shadow: 0 10px 24px rgba(2, 6, 23, 0.35);\r
}\r
.tag {\r
  min-width: 28px;\r
  height: 28px;\r
  border-radius: 8px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-weight: 800;\r
  background: rgba(124, 58, 237, 0.12);\r
  color: #f6f9ff;\r
  font-size: 12px;\r
}\r
.snippet {\r
  font-size: 13px;\r
  color: #d7eaff;\r
  line-height: 1.35;\r
}\r
\r
/* visually hidden (accessibility) */\r
.visually-hidden {\r
  position: absolute !important;\r
  height: 1px;\r
  width: 1px;\r
  overflow: hidden;\r
  clip: rect(1px, 1px, 1px, 1px);\r
  white-space: nowrap;\r
}\r
\r
/* score UI */\r
.ss-score {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  margin: 12px 0;\r
  padding: 10px;\r
  background: var(--card-bg);\r
  border-radius: 10px;\r
}\r
.score-badge {\r
  min-width: 64px;\r
  height: 40px;\r
  border-radius: 10px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-weight: 800;\r
  color: #fff;\r
  font-size: 16px;\r
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);\r
  background: linear-gradient(90deg, #ef4444, #f59e0b, #10b981);\r
}\r
.score-bar {\r
  flex: 1;\r
  height: 14px;\r
  border-radius: 8px;\r
  background: rgba(255, 255, 255, 0.05);\r
  overflow: hidden;\r
}\r
.score-bar-inner {\r
  height: 100%;\r
  border-radius: 8px;\r
  background: linear-gradient(90deg, #ef4444, #f59e0b, #10b981);\r
  transition: width 600ms cubic-bezier(0.2, 0.9, 0.2, 1);\r
}\r
.score-sub {\r
  font-size: 11px;\r
  color: rgba(207, 230, 255, 0.75);\r
  margin-top: 6px;\r
  line-height: 1.4;\r
}\r
\r
.star {\r
  color: var(--star);\r
  width: 14px;\r
  height: 14px;\r
}\r
\r
/* error box */\r
.error-msg {\r
  background: rgba(239, 68, 68, 0.06);\r
  border: 1px solid rgba(239, 68, 68, 0.12);\r
  color: #fca5a5;\r
  padding: 10px;\r
  border-radius: 8px;\r
  margin: 10px 0;\r
  font-size: 13px;\r
}\r
\r
.hidden {\r
  opacity: 0;\r
  position: absolute;\r
  pointer-events: none;\r
}\r
.visibility {\r
  opacity: 1;\r
  position: static;\r
  transition: opacity 0.5s ease;\r
}\r
\r
/* responsive */\r
@media (max-width: 520px) {\r
  .shopsage-sidebar {\r
    right: 12px;\r
    left: 12px;\r
    width: auto;\r
    top: 36px;\r
    border-radius: 12px;\r
    max-height: calc(100vh - 72px);\r
  }\r
}\r
\r
/* Agreement for processing on the server*/\r
/* send row */\r
.ss-send-row {\r
  display: flex;\r
  gap: 8px;\r
  align-items: center;\r
  margin-left: 4px;\r
}\r
\r
/* checkbox + label */\r
#ss-send-server {\r
  width: 18px;\r
  height: 18px;\r
  accent-color: var(--accentA);\r
}\r
.ss-send-row label span {\r
  display: inline-block;\r
  max-width: 220px;\r
  line-height: 1.1;\r
}\r
\r
/* secondary button */\r
.btn-secondary {\r
  background: transparent;\r
  border: 1px solid rgba(255, 255, 255, 0.06);\r
  padding: 8px 10px;\r
  border-radius: 10px;\r
  font-size: 13px;\r
  color: var(--text);\r
  cursor: pointer;\r
}\r
.btn-secondary:hover {\r
  transform: translateY(-2px);\r
  box-shadow: 0 8px 20px var(--accentGlow);\r
}\r
\r
/* Preview Modal Styles */\r
#ss-preview-modal {\r
  position: fixed;\r
  inset: 8% 8% auto auto;\r
  z-index: 2147483648;\r
  width: 520px;\r
  max-height: 84vh;\r
  background: linear-gradient(180deg, var(--bg-start), var(--bg-end));\r
  color: var(--text);\r
  border-radius: var(--radius);\r
  border: 1px solid var(--glass-border);\r
  box-shadow: var(--shadow);\r
  backdrop-filter: blur(12px) saturate(120%);\r
  font-family: var(--mono);\r
  overflow: hidden;\r
  display: flex;\r
  flex-direction: column;\r
  transform-origin: right top;\r
  animation: modalSlideIn 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\r
}\r
\r
@keyframes modalSlideIn {\r
  from {\r
    transform: translateY(-8px) translateX(4px) scale(0.98);\r
    opacity: 0;\r
  }\r
  to {\r
    transform: translateY(0) translateX(0) scale(1);\r
    opacity: 1;\r
  }\r
}\r
\r
@keyframes modalSlideOut {\r
  from {\r
    transform: translateY(0) translateX(0) scale(1);\r
    opacity: 1;\r
  }\r
  to {\r
    transform: translateY(-6px) translateX(3px) scale(0.98);\r
    opacity: 0;\r
  }\r
}\r
\r
#ss-preview-modal .pm-header {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: flex-start;\r
  gap: 12px;\r
  padding: 16px 18px 14px;\r
  border-bottom: 1px solid var(--glass-border);\r
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.005));\r
}\r
\r
#ss-preview-modal .pm-title {\r
  font-size: 16px;\r
  font-weight: 700;\r
  color: #eaf2ff;\r
  margin-bottom: 4px;\r
  letter-spacing: 0.2px;\r
}\r
\r
#ss-preview-modal .pm-sub {\r
  font-size: 12px;\r
  color: var(--muted);\r
  line-height: 1.4;\r
  max-width: 360px;\r
}\r
\r
#ss-preview-modal .pm-close {\r
  background: transparent;\r
  border: 0;\r
  color: rgba(230, 238, 248, 0.8);\r
  cursor: pointer;\r
  font-size: 18px;\r
  padding: 8px;\r
  border-radius: 8px;\r
  transition: all 120ms ease;\r
  line-height: 1;\r
  min-width: 32px;\r
  height: 32px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
#ss-preview-modal .pm-close:hover {\r
  background: rgba(255, 255, 255, 0.06);\r
  color: #fff;\r
  transform: scale(1.05);\r
}\r
\r
#ss-preview-modal .pm-body {\r
  padding: 16px 18px;\r
  overflow-y: auto;\r
  flex: 1;\r
  max-height: calc(84vh - 140px);\r
}\r
\r
#ss-preview-modal .pm-summary {\r
  background: var(--card-bg);\r
  border-radius: 10px;\r
  padding: 14px;\r
  margin-bottom: 14px;\r
  border: 1px solid rgba(255, 255, 255, 0.02);\r
}\r
\r
#ss-preview-modal .pm-summary-row {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: flex-start;\r
  gap: 16px;\r
  margin-bottom: 12px;\r
}\r
\r
#ss-preview-modal .pm-summary-row:last-child {\r
  margin-bottom: 0;\r
}\r
\r
#ss-preview-modal .pm-summary .pm-label {\r
  font-size: 12px;\r
  color: var(--muted);\r
  font-weight: 600;\r
  text-transform: uppercase;\r
  letter-spacing: 0.5px;\r
  margin-bottom: 4px;\r
}\r
\r
#ss-preview-modal .pm-summary .pm-value {\r
  font-size: 14px;\r
  color: #e6eef8;\r
  font-weight: 500;\r
  word-break: break-word;\r
  line-height: 1.3;\r
}\r
\r
#ss-preview-modal .pm-summary .pm-link {\r
  color: var(--accentA);\r
  text-decoration: none;\r
  transition: all 120ms ease;\r
  border-radius: 4px;\r
  padding: 2px 4px;\r
  margin: -2px -4px;\r
}\r
\r
#ss-preview-modal .pm-summary .pm-link:hover {\r
  background: rgba(124, 58, 237, 0.08);\r
  color: #a78bfa;\r
  transform: translateY(-1px);\r
}\r
\r
#ss-preview-modal .pm-meta {\r
  display: flex;\r
  gap: 16px;\r
  align-items: center;\r
  flex-wrap: wrap;\r
}\r
\r
#ss-preview-modal .pm-meta-item {\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
  background: rgba(255, 255, 255, 0.02);\r
  padding: 6px 10px;\r
  border-radius: 8px;\r
  font-size: 12px;\r
}\r
\r
#ss-preview-modal .pm-meta-label {\r
  color: var(--muted);\r
  font-weight: 500;\r
}\r
\r
#ss-preview-modal .pm-meta-value {\r
  color: #fff;\r
  font-weight: 700;\r
}\r
\r
#ss-preview-modal .pm-warning {\r
  background: rgba(239, 68, 68, 0.08);\r
  border: 1px solid rgba(239, 68, 68, 0.2);\r
  color: #fca5a5;\r
  padding: 8px 12px;\r
  border-radius: 8px;\r
  font-size: 12px;\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  margin-top: 8px;\r
  font-weight: 600;\r
}\r
\r
#ss-preview-modal .pm-dev {\r
  margin-top: 12px;\r
}\r
\r
#ss-preview-modal .pm-dev summary {\r
  cursor: pointer;\r
  padding: 10px 0;\r
  font-size: 13px;\r
  font-weight: 600;\r
  color: #cfe6ff;\r
  border-radius: 6px;\r
  transition: all 120ms ease;\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
}\r
\r
#ss-preview-modal .pm-dev summary:hover {\r
  color: #fff;\r
  transform: translateY(-1px);\r
}\r
\r
#ss-preview-modal .pm-dev summary::marker {\r
  content: "";\r
}\r
\r
#ss-preview-modal .pm-dev summary::before {\r
  content: "▶";\r
  font-size: 10px;\r
  transition: transform 200ms ease;\r
  color: var(--accentA);\r
}\r
\r
#ss-preview-modal .pm-dev[open] summary::before {\r
  transform: rotate(90deg);\r
}\r
\r
#ss-preview-modal pre {\r
  white-space: pre-wrap;\r
  word-break: break-word;\r
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;\r
  font-size: 11px;\r
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));\r
  border: 1px solid rgba(255, 255, 255, 0.03);\r
  padding: 12px;\r
  border-radius: 8px;\r
  max-height: 320px;\r
  overflow: auto;\r
  color: #d1d5db;\r
  line-height: 1.4;\r
  margin: 8px 0 0 0;\r
  animation: jsonFadeIn 300ms ease 150ms both;\r
}\r
\r
@keyframes jsonFadeIn {\r
  from {\r
    opacity: 0;\r
    transform: translateY(2px);\r
  }\r
  to {\r
    opacity: 1;\r
    transform: translateY(0);\r
  }\r
}\r
\r
#ss-preview-modal .pm-actions {\r
  display: flex;\r
  gap: 10px;\r
  padding: 14px 18px;\r
  border-top: 1px solid var(--glass-border);\r
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.005), rgba(255, 255, 255, 0.02));\r
  flex-wrap: wrap;\r
}\r
\r
#ss-preview-modal .btn-copy,\r
#ss-preview-modal .btn-download {\r
  background: linear-gradient(90deg, var(--accentA), var(--accentB));\r
  border: 0;\r
  padding: 8px 14px;\r
  border-radius: 8px;\r
  color: #fff;\r
  font-weight: 600;\r
  cursor: pointer;\r
  font-size: 12px;\r
  transition: all 150ms ease;\r
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15);\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
}\r
\r
#ss-preview-modal .btn-copy:hover,\r
#ss-preview-modal .btn-download:hover {\r
  transform: translateY(-2px);\r
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.25);\r
}\r
\r
#ss-preview-modal .btn-copy:active,\r
#ss-preview-modal .btn-download:active {\r
  transform: translateY(0);\r
}\r
\r
#ss-preview-modal .btn-close-action,\r
#ss-settings-modal .btn-close-action {\r
  background: transparent;\r
  border: 1px solid rgba(255, 255, 255, 0.08);\r
  padding: 8px 14px;\r
  border-radius: 8px;\r
  color: var(--text);\r
  font-weight: 600;\r
  cursor: pointer;\r
  font-size: 12px;\r
  transition: all 150ms ease;\r
}\r
\r
#ss-preview-modal .btn-close-action:hover,\r
#ss-settings-modal .btn-close-action:hover {\r
  background: rgba(255, 255, 255, 0.04);\r
  border-color: rgba(255, 255, 255, 0.12);\r
  transform: translateY(-1px);\r
}\r
\r
/* Success/Error states */\r
#ss-preview-modal .btn-success {\r
  background: linear-gradient(90deg, #10b981, #059669) !important;\r
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15) !important;\r
}\r
\r
#ss-preview-modal .btn-error {\r
  background: linear-gradient(90deg, #ef4444, #dc2626) !important;\r
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15) !important;\r
}\r
@media (max-width: 640px) {\r
  #ss-preview-modal {\r
    inset: 5% 12px auto 12px;\r
    width: auto;\r
    max-height: 90vh;\r
  }\r
\r
  #ss-preview-modal .pm-summary-row {\r
    flex-direction: column;\r
    gap: 8px;\r
  }\r
\r
  #ss-preview-modal .pm-actions {\r
    flex-direction: column;\r
  }\r
\r
  #ss-preview-modal .pm-actions > * {\r
    flex: 1;\r
  }\r
}\r
\r
/* Settings Modal Styles */\r
#ss-settings-modal {\r
  position: fixed;\r
  inset: 8% 8% auto auto;\r
  z-index: 2147483648;\r
  width: 480px;\r
  max-height: 84vh;\r
  background: linear-gradient(180deg, var(--bg-start), var(--bg-end));\r
  color: var(--text);\r
  border-radius: var(--radius);\r
  border: 1px solid var(--glass-border);\r
  box-shadow: var(--shadow);\r
  backdrop-filter: blur(12px) saturate(120%);\r
  font-family: var(--mono);\r
  overflow: hidden;\r
  display: flex;\r
  flex-direction: column;\r
  transform-origin: right top;\r
  animation: modalSlideIn 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\r
}\r
\r
#ss-settings-modal .sm-header {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: flex-start;\r
  gap: 12px;\r
  padding: 16px 18px 14px;\r
  border-bottom: 1px solid var(--glass-border);\r
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.005));\r
}\r
\r
#ss-settings-modal .sm-title {\r
  font-size: 16px;\r
  font-weight: 700;\r
  color: #eaf2ff;\r
  margin-bottom: 4px;\r
  letter-spacing: 0.2px;\r
}\r
\r
#ss-settings-modal .sm-sub {\r
  font-size: 12px;\r
  color: var(--muted);\r
  line-height: 1.4;\r
  max-width: 360px;\r
}\r
\r
#ss-settings-modal .sm-close {\r
  background: transparent;\r
  border: 0;\r
  color: rgba(230, 238, 248, 0.8);\r
  cursor: pointer;\r
  font-size: 18px;\r
  padding: 8px;\r
  border-radius: 8px;\r
  transition: all 120ms ease;\r
  line-height: 1;\r
  min-width: 32px;\r
  height: 32px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
#ss-settings-modal .sm-close:hover {\r
  background: rgba(255, 255, 255, 0.06);\r
  color: #fff;\r
  transform: scale(1.05);\r
}\r
\r
#ss-settings-modal .sm-body {\r
  padding: 16px 18px;\r
  overflow-y: auto;\r
  flex: 1;\r
  max-height: calc(84vh - 140px);\r
}\r
\r
#ss-settings-modal .setting-group {\r
  background: var(--card-bg);\r
  border-radius: 10px;\r
  padding: 14px;\r
  margin-bottom: 12px;\r
  border: 1px solid rgba(255, 255, 255, 0.02);\r
}\r
\r
#ss-settings-modal .setting-title {\r
  font-size: 14px;\r
  font-weight: 600;\r
  color: #eaf2ff;\r
  margin-bottom: 8px;\r
  letter-spacing: 0.1px;\r
}\r
\r
#ss-settings-modal .setting-desc {\r
  font-size: 12px;\r
  color: var(--muted);\r
  line-height: 1.4;\r
  margin-bottom: 10px;\r
}\r
\r
#ss-settings-modal .setting-option {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  padding: 8px 0;\r
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);\r
}\r
\r
#ss-settings-modal .setting-option:last-child {\r
  border-bottom: none;\r
}\r
\r
#ss-settings-modal .setting-option label {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  cursor: pointer;\r
  font-size: 13px;\r
  color: #d7eaff;\r
  flex: 1;\r
}\r
\r
#ss-settings-modal .setting-option input[type="checkbox"],\r
#ss-settings-modal .setting-option input[type="radio"] {\r
  width: 16px;\r
  height: 16px;\r
  accent-color: var(--accentA);\r
}\r
\r
#ss-settings-modal .setting-option input[type="range"] {\r
  flex: 1;\r
  height: 4px;\r
  background: rgba(255, 255, 255, 0.05);\r
  border-radius: 2px;\r
  outline: none;\r
  accent-color: var(--accentA);\r
}\r
\r
#ss-settings-modal .setting-option .range-value {\r
  min-width: 30px;\r
  text-align: center;\r
  color: #fff;\r
  font-weight: 600;\r
  font-size: 12px;\r
  background: rgba(255, 255, 255, 0.02);\r
  padding: 2px 6px;\r
  border-radius: 4px;\r
}\r
\r
#ss-settings-modal .sm-actions {\r
  display: flex;\r
  gap: 10px;\r
  padding: 14px 18px;\r
  border-top: 1px solid var(--glass-border);\r
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.005), rgba(255, 255, 255, 0.02));\r
  flex-wrap: wrap;\r
}\r
\r
#ss-settings-modal .btn-save {\r
  background: linear-gradient(90deg, var(--accentA), var(--accentB));\r
  border: 0;\r
  padding: 8px 14px;\r
  border-radius: 8px;\r
  color: #fff;\r
  font-weight: 600;\r
  cursor: pointer;\r
  font-size: 12px;\r
  transition: all 150ms ease;\r
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15);\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
}\r
\r
#ss-settings-modal .btn-save:hover {\r
  transform: translateY(-2px);\r
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.25);\r
}\r
\r
#ss-settings-modal .btn-reset {\r
  background: transparent;\r
  border: 1px solid rgba(255, 255, 255, 0.08);\r
  padding: 8px 14px;\r
  border-radius: 8px;\r
  color: var(--text);\r
  font-weight: 600;\r
  cursor: pointer;\r
  font-size: 12px;\r
  transition: all 150ms ease;\r
}\r
\r
#ss-settings-modal .btn-reset:hover {\r
  background: rgba(255, 255, 255, 0.04);\r
  border-color: rgba(255, 255, 255, 0.12);\r
  transform: translateY(-1px);\r
}\r
\r
/* lock button near range */\r
#ss-settings-modal .range-wrap {\r
  position: relative;\r
  display: block;\r
  width: 100%;\r
}\r
\r
#ss-settings-modal .range-lock {\r
  position: absolute;\r
  right: 42%;\r
  top: 50%;\r
  transform: translateY(-50%);\r
  background: rgba(0, 0, 0, 0.25);\r
  border: 0;\r
  color: #fff;\r
  padding: 6px 8px;\r
  border-radius: 8px;\r
  cursor: pointer;\r
  font-size: 14px;\r
  display: none; /* показываем динамически через JS */\r
  pointer-events: auto;\r
  transition:\r
    transform 160ms ease,\r
    opacity 160ms ease;\r
  opacity: 0.95;\r
}\r
\r
/* небольшое "мигание" при попытке поставить >10, чтобы дать фидбек */\r
#ss-settings-modal .range-lock.lock-flash {\r
  transform: translateY(-50%) scale(1.08);\r
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);\r
}\r
\r
/* маленькая подсказка при наведении (браузер покажет title) */\r
#ss-settings-modal .range-lock[title] {\r
  /* ничего дополнительно не нужно — title используется */\r
}\r
\r
/* если подписан — не показываем (JS скрывает) */\r
#ss-settings-modal .range-lock[aria-hidden="true"] {\r
  display: none;\r
}\r
\r
/* feature lock button used next to checkboxes/radios */\r
#ss-settings-modal .feature-lock {\r
  width: 34px;\r
  height: 34px;\r
  border-radius: 8px;\r
  background: rgba(0, 0, 0, 0.22);\r
  border: 0;\r
  color: #fff;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  cursor: pointer;\r
  margin-left: 8px;\r
  font-size: 14px;\r
  transition:\r
    transform 120ms ease,\r
    box-shadow 120ms ease,\r
    background 120ms ease;\r
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);\r
}\r
\r
/* subtle hover */\r
#ss-settings-modal .feature-lock:hover {\r
  transform: translateY(-2px);\r
  background: rgba(255, 255, 255, 0.03);\r
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);\r
}\r
\r
/* make layout of feature-row align nicely */\r
#ss-settings-modal .feature-row {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 10px;\r
  padding: 8px 0;\r
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);\r
}\r
\r
/* hide .feature-lock when aria-hidden true (JS toggles) */\r
#ss-settings-modal .feature-lock[aria-hidden="true"] {\r
  display: none;\r
}\r
\r
/* ensure range-lock still looks good */\r
#ss-settings-modal .range-lock {\r
  right: 6px;\r
  top: 50%;\r
  transform: translateY(-50%);\r
  display: block; /* JS will hide/show as needed */\r
}\r
\r
/* Subscription modal overlay (новый/заменённый) */\r
.subscription-modal-overlay {\r
  position: fixed;\r
  inset: 0;\r
  z-index: 2147483650;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 20px;\r
  background: linear-gradient(180deg, #061226, var(--bg-end));\r
}\r
\r
/* Модалка — в вашем стиле */\r
.subscription-modal {\r
  width: 440px;\r
  max-width: calc(100% - 48px);\r
  border-radius: var(--radius);\r
  background: linear-gradient(180deg, #061226, #071431);\r
  color: var(--text);\r
  box-shadow: var(--shadow);\r
  padding: 18px;\r
  font-family: var(--mono);\r
  transform-origin: center;\r
  animation: subsModalIn 220ms cubic-bezier(0.2, 0.9, 0.2, 1);\r
  backdrop-filter: blur(8px) saturate(110%);\r
}\r
\r
/* Анимация входа */\r
@keyframes subsModalIn {\r
  from {\r
    opacity: 0;\r
    transform: translateY(-8px) scale(0.992);\r
  }\r
  to {\r
    opacity: 1;\r
    transform: translateY(0) scale(1);\r
  }\r
}\r
\r
/* Заголовок модалки — стиль в духе вашего UI */\r
.subscription-modal .subscription-content h3 {\r
  margin: 0 0 8px 0;\r
  font-size: 16px;\r
  font-weight: 700;\r
  color: #eaf2ff;\r
}\r
\r
/* Текст */\r
.subscription-modal .subscription-message {\r
  margin: 0 0 14px 0;\r
  color: var(--muted);\r
  font-size: 13px;\r
  line-height: 1.4;\r
}\r
\r
/* Кнопки */\r
.subscription-buy {\r
  background: linear-gradient(90deg, var(--accentA), var(--accentB));\r
  border: 0;\r
  padding: 9px 14px;\r
  border-radius: 10px;\r
  color: #fff;\r
  font-weight: 700;\r
  cursor: pointer;\r
  box-shadow: 0 10px 28px var(--accentGlow);\r
  transition: all 150ms ease;\r
}\r
.subscription-buy:hover {\r
  transform: translateY(-2px);\r
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.25);\r
}\r
\r
.subscription-cancel {\r
  background: transparent;\r
  border: 1px solid rgba(255, 255, 255, 0.06);\r
  padding: 9px 12px;\r
  border-radius: 10px;\r
  color: var(--muted);\r
  cursor: pointer;\r
  transition: all 150ms ease;\r
}\r
\r
.subscription-cancel:hover {\r
  background: rgba(255, 255, 255, 0.04);\r
  border-color: rgba(255, 255, 255, 0.12);\r
  transform: translateY(-1px);\r
}\r
\r
.subscription-close {\r
  position: absolute;\r
  right: 10px;\r
  top: 8px;\r
  background: transparent;\r
  border: 0;\r
  color: rgba(230, 238, 248, 0.8);\r
  font-size: 18px;\r
  padding: 8px;\r
  border-radius: 8px;\r
  cursor: pointer;\r
\r
  transition: all 120ms ease;\r
  line-height: 1;\r
  min-width: 32px;\r
  height: 32px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.subscription-close:hover {\r
  background: rgba(255, 255, 255, 0.06);\r
  color: #fff;\r
  transform: scale(1.05);\r
}\r
\r
/*End of Settings Modal Styles */\r
`;function X(){if(document.getElementById(te)){const v=document.getElementById(te)._hostElement;if(!v)return;v.style.opacity==="1"?ie():(v.style.opacity="1",v.style.transform="translateY(0) scale(1)");return}const e=document.createElement("div");e.id=te,Object.assign(e.style,{all:"initial",position:"fixed",right:"20px",top:"60px",zIndex:"2147483647",pointerEvents:"auto"});const a=e.attachShadow({mode:"open"});e._hostElement=e;const d=document.createElement("style");d.textContent=Ue,a.appendChild(d);const n=document.createElement("div");n.innerHTML=_e,a.appendChild(n);const c=a.querySelector("#ss-logo");c&&(c.src=chrome.runtime.getURL("assets/icons/icon.svg")),document.body.appendChild(e),ge();const t=a,x=t.querySelector(".shopsage-sidebar"),m=t.querySelector(".ss-close"),f=t.querySelector("#ss-analyze"),b=t.querySelector("#ss-loader"),C=t.querySelector("#ss-count"),k=t.querySelector("#ss-result"),M=t.querySelector("#ss-pros"),E=t.querySelector("#ss-cons"),R=t.querySelector("#ss-verdict"),w=t.querySelector("#ss-rating"),o=t.querySelector("#ss-total"),s=t.querySelector("#ss-error"),u=t.querySelector("#ss-score-container"),h=t.querySelector("#ss-score-badge"),r=t.querySelector("#ss-score-bar-inner"),l=t.querySelector("#ss-score-sub"),S=t.querySelector("#ss-send-server"),y=t.querySelector("#ss-preview-payload"),g=t.querySelector("#ss-preview-settings");S&&S.addEventListener("change",i=>{const v=!!i.target.checked;chrome.storage.sync.set({sendToServer:v})}),y&&y.addEventListener("click",async()=>{try{y.disabled=!0;const i=await Ne();Oe(t,i)}catch(i){console.error("preview error",i),alert("Ошибка при формировании превью: "+String(i))}finally{y.disabled=!1}}),g&&g.addEventListener("click",async()=>{try{g.disabled=!0;const i=await pe();Ye(t,i)}catch(i){console.error("preview error",i),alert("Ошибка при формировании превью: "+String(i))}finally{g.disabled=!1}}),requestAnimationFrame(()=>{Object.assign(e.style,{opacity:"0",transform:"translateY(8px) scale(.995)",transition:"opacity .28s cubic-bezier(.2,.9,.2,1), transform .36s cubic-bezier(.2,.9,.2,1)"}),setTimeout(()=>{e.style.opacity="1",e.style.transform="translateY(0) scale(1)"},20)}),m&&m.addEventListener("click",ie),f&&f.addEventListener("click",le);const P=oe();C&&(C.innerText=P.length);const D=we();w&&(w.innerHTML=ke(D.avgRating)),o&&(o.innerText=D.totalRatings!=null?D.totalRatings:"—");function V(i){s&&(s.innerText=i,p(s),setTimeout(()=>{K(s)},5e3))}function le(i){f&&(f.disabled=!0),b&&p(b),k&&K(k),u&&K(u),l&&K(l),s&&K(s);const v=15e3,I=`

`;chrome.storage.sync.get({maxReviews:20,serverUrl:""},z=>{const j=Number.isFinite(Number(z.maxReviews))&&Number(z.maxReviews)>0?Number(z.maxReviews):20,F=oe(j);let N=[],_=0;if(Array.isArray(F)?(N=F,_=F.length):F&&typeof F=="object"?(N=F.items||[],_=Number.isFinite(Number(F.found))?F.found:N.length||0):(N=[],_=0),_<j&&console.info(`Verdict: Requested ${j} reviews but only ${_} found on page. Using available reviews.`),!N||N.length===0){b&&K(b),f&&(f.disabled=!1),V("Не найдено отзывов на странице. Попробуйте прокрутить страницу или перейти на страницу с отзывами.");return}const G=[];let Z="";for(let L=0;L<N.length;L++){const O=N[L]||"";if(O)if(Z.length===0)if(O.length<=v)Z=O,G.push(O);else{const T=O.slice(0,v-1)+"…";Z=T,G.push(T);break}else if(Z.length+I.length+O.length<=v)Z=Z+I+O,G.push(O);else break}const W=we();w&&(w.innerHTML=ke(D.avgRating)),o&&(o.innerText=W.totalRatings!=null?W.totalRatings:"—");const $=G,U={url:location.href,title:document.title,totalRatings:W.totalRatings,avgRating:W.avgRating};console.log("ShopSage: Sending analysis request",{reviewCount:$.length,product:U,serverUrl:z.serverUrl||"default"}),chrome.runtime.sendMessage({action:Le,reviews:$,product:U,serverUrl:z.serverUrl||""},L=>{if(chrome.runtime.lastError){console.error("Verdict: runtime.lastError",chrome.runtime.lastError),b&&K(b),f&&(f.disabled=!1),V("Ошибка связи с расширением. Перезагрузите страницу и попробуйте снова.");return}if(b&&K(b),f&&(f.disabled=!1),!L){console.error("Verdict: Empty response from background"),V("Не получен ответ от сервера. Проверьте настройки или попробуйте позже.");return}if(!L.ok){console.error("Verdict: Analysis failed",L);let T="Ошибка анализа";L.error?T=L.error:L.message&&(T=L.message),T.includes("fetch failed")||T.includes("Failed to fetch")?T="Не удалось подключиться к серверу. Проверьте URL сервера в настройках.":T.includes("timeout")?T="Превышено время ожидания ответа от сервера.":T.includes("404")?T="Сервер не найден. Проверьте URL в настройках.":(T.includes("500")||T.includes("502")||T.includes("503"))&&(T="Ошибка сервера. Попробуйте позже."),V(T);return}const O=L.data||{};console.info("Verdict: Analysis successful",L),ce(O,U,$.length)})})}function ce(i,v={},I=0){s&&K(s);const z=Array.isArray(i.pros)?i.pros:[],j=Array.isArray(i.cons)?i.cons:[];M&&(M.innerHTML="",z.forEach((q,B)=>{const A=document.createElement("li");A.innerHTML='<div class="tag">'+(B+1)+'</div><div class="snippet"></div>',A.querySelector(".snippet").innerText=q,M.appendChild(A)})),E&&(E.innerHTML="",j.forEach((q,B)=>{const A=document.createElement("li");A.innerHTML='<div class="tag">'+(B+1)+'</div><div class="snippet"></div>',A.querySelector(".snippet").innerText=q,E.appendChild(A)}));let F=document.querySelector('[data-auto="rating"]');F&&(v.avgRating=parseFloat(F.textContent.trim().replace(",","."))),R&&(R.innerText=i.verdict||"Нет явного вердикта");let N=v&&v.avgRating!=null?Number(v.avgRating):v&&v.rating!=null?Number(v.rating):null,_=v&&v.totalRatings!=null?Number(v.totalRatings):v&&v.totalReviews!=null?Number(v.totalReviews):null;try{if(typeof se=="function"){const q=se();q&&(N==null&&q.avg!=null&&(N=q.avg),_==null&&q.totalRatings!=null&&(_=q.totalRatings))}}catch{}const G=typeof se=="function"?se():null,Z=_||v&&(v.totalReviews||0)||0,W=N??(v&&(v.avgRating||v.rating)?v.avgRating||v.rating:null);let $=Math.max(0,Number(Z||0)),U=0,L=null,O=null,T=null;if(G){const q={};let B=!1;for(let A=1;A<=5;A++){const J=G[String(A)];J!=null&&Number.isFinite(Number(J))&&Number(J)>0?(q[A]=Number(J),B=!0):q[A]=0}B&&(T=q),N==null&&G.avg!=null&&(N=G.avg),_==null&&G.totalRatings!=null&&(_=G.totalRatings)}if(T)U=Number(T[5]||0)+Number(T[4]||0),$=Object.keys(T).reduce((q,B)=>q+Number(T[B]||0),0),O=$>0?U/$:null,L=N!=null?N/5:O??.5;else if($>0&&W!=null){const q=Math.max(0,Math.min(1,(W-1)/4));U=Math.round(q*$),O=$>0?U/$:null,L=W/5}else{const q=Array.isArray(i.pros)?i.pros.length:0,B=Array.isArray(i.cons)?i.cons.length:0;if(q+B>0){const A=q/(q+B);$=Math.max($,q+B),U=Math.round(A*$),O=A,L=A}else{$=Math.max($,I||0);const A=.5;U=Math.round(A*$),O=A,L=L??A}}const Re=2,Ee=2,fe=Re+U,qe=Ee+($-U),re=fe/(fe+qe);function Ae(q,B,A=1.96){if(B===0)return{low:0,high:1};const J=q/B,ue=A*A,be=1+ue/B,ve=J+ue/(2*B),xe=A*Math.sqrt((J*(1-J)+ue/(4*B))/B),Ce=Math.max(0,(ve-xe)/be),Te=Math.min(1,(ve+xe)/be);return{low:Ce,high:Te}}const de=Ae(U,Math.max(1,$));L==null&&(L=re);const Q=Math.round((re*.6+L*.4)*100);let ee="",ne="";if(Q>=85?(ee="Однозначно стоит выбрать",ne="linear-gradient(90deg,#a3e635,#10b981)"):Q>=70?(ee="В целом рекомендуем",ne="linear-gradient(90deg,#facc15,#84cc16)"):Q>=55?(ee="Стоит взвесить плюсы и минусы",ne="linear-gradient(90deg,#f59e0b,#f97316)"):(ee="Лучше поискать альтернативу",ne="linear-gradient(90deg,#ef4444,#ea580c)"),u&&p(u),h&&(h.innerText=Q+"%",h.style.background=ne),r&&(r.style.width=Q+"%"),l){p(l);const q=Math.round(de.low*100),B=Math.round(de.high*100),A=$>0?$:I||"—",J=N!=null?`${N}`:"—";l.innerText=`${ee} — вероятность успеха ≈ ${Math.round(re*100)}% (интервал ${q}–${B}%), на основе ${A} оценок; положительных (4–5★): ${U}. Средний рейтинг: ${J}★.`}C&&(I!=null&&I!==0?C.innerText=`${I} из ${_??"—"}`:C.innerText=_??"—"),k&&(p(k),setTimeout(()=>k.classList.add("show"),30)),console.info("ShopSage: stats",{n:$,k:U,estPosRate:O,posteriorMean:re,wilson:de,composite:Q,rec:ee,pageAvg:N,pageTotalRatings:_,prosCount:z.length,consCount:j.length})}e._shadow=a,e._container=x;function K(i){i.classList.remove("visible"),i.classList.add("hidden")}function p(i){requestAnimationFrame(()=>{i.classList.remove("hidden"),i.classList.add("visible")})}}function ie(){const e=document.getElementById(te);e&&(e.style.opacity="0",e.style.transform="translateY(8px) scale(.995)",setTimeout(()=>{try{const a=document.getElementById(te);a&&a.remove()}catch{}},300))}function je(e,a,d){try{const n=e.config||{};if(chrome&&chrome.storage&&chrome.storage.sync)return chrome.storage.sync.set({serverUrl:n.serverUrl||"",maxReviews:n.maxReviews!=null?n.maxReviews:void 0},()=>{try{if(typeof X=="function"){try{X(),d&&d({ok:!0,message:"openSidebar() called"})}catch(t){console.warn("openSidebar call failed",t),d&&d({ok:!1,error:String(t)})}return}if(typeof window.openSidebar=="function")try{window.openSidebar(),d&&d({ok:!0,message:"window.openSidebar() called"});return}catch{}if(typeof window.createSidebar=="function")try{window.createSidebar(),d&&d({ok:!0,message:"window.createSidebar() called"});return}catch{}const c=document.getElementById(me)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2")||document.getElementById("shopsage-open-btn-v3");if(c)try{c.click(),d&&d({ok:!0,message:"button clicked"});return}catch(t){d&&d({ok:!1,message:"failed to click button",error:String(t)});return}d&&d({ok:!1,message:"no sidebar open API found"})}catch(c){console.error("handleOpenSidebarMessage inner error",c),d&&d({ok:!1,error:String(c)})}}),!0;try{typeof X=="function"?(X(),d&&d({ok:!0,message:"openSidebar() called (no storage)"})):d&&d({ok:!1,message:"storage unavailable and openSidebar missing"})}catch(c){d&&d({ok:!1,error:String(c)})}}catch(n){console.error("handleOpenSidebarMessage error",n);try{d&&d({ok:!1,error:String(n)})}catch{}}return!1}function Fe(e,a,d){try{if(!e||!e.action)return;if(e.action==="OPEN_SIDEBAR")return je(e,a,d)}catch(n){console.error("handleRuntimeMessage error",n);try{d&&d({ok:!1,error:String(n)})}catch{}}return!1}try{chrome&&chrome.runtime&&chrome.runtime.onMessage&&chrome.runtime.onMessage.addListener(Fe)}catch{}if(!window.__shopSageInitialized){try{typeof X=="function"&&(window.openSidebar=X),typeof ie=="function"&&(window.closeSidebar=ie),typeof X=="function"&&(window.createSidebar=X)}catch{}try{Me({ROOT_ID:te,BTN_ID:me,ICON_PATH:Ie,onOpenSidebar:typeof X=="function"?X:()=>{const e=document.getElementById(me)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2");if(e)try{e.click()}catch{}}})}catch(e){console.error("ShopSage: initContent failed",e)}window.__shopSageInitialized=!0}export{ie as closeSidebar,X as openSidebar};
