import{g as $e,a as ke,l as fe,D as F,i as Se,s as ce,u as be,R as re,b as Re,A as Be,B as ve,c as Ne,I as Oe}from"./content.init-C6zUo1iM.js";function Y(e){if(e==null)return null;const r=String(e).trim();if(!r)return null;const c=r.match(/([\d.,]+)\s*[Kk]/);if(c){const t=parseFloat(c[1].replace(",","."));if(Number.isFinite(t))return Math.round(t*1e3)}const n=r.replace(/\s+/g,"").replace(/[^0-9\.,]/g,"").replace(",","."),l=parseFloat(n);return Number.isFinite(l)?l:null}function Ee(){const e={totalReviews:null,rating:null,totalRatings:null,avgRating:null};try{try{const n=document.querySelector('meta[itemprop="reviewCount"], meta[name="reviewCount"], meta[name="reviews"]');n&&n.content&&(e.totalReviews=Math.round(Y(n.content))||null)}catch{}try{const n=document.querySelector('meta[itemprop="ratingValue"], meta[name="rating"], meta[itemprop="rating"]');n&&n.content&&(e.rating=Math.round(Y(n.content)*100)/100||null)}catch{}const r=['[data-auto="rating-count-text"]',".rating-count",".reviews-count",".votes-count",".ratings-count",".rating__count",".rate__count",".count-ratings",'[data-test="ratings-count"]'];for(const n of r)try{const l=document.querySelector(n);if(l&&(l.innerText||l.textContent)){const t=Y(l.innerText||l.textContent);if(t!=null){e.totalRatings=Math.round(t);break}}}catch{}if(e.totalRatings==null){const n=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const l of n){const y=(l.getAttribute("aria-label")||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голос|голосов|votes|ratings)/i);if(y){e.totalRatings=Math.round(Y(y[1]));break}}}if(e.totalRatings==null){const l=(document.body.innerText||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голосов|votes|ratings)/i);l&&(e.totalRatings=Math.round(Y(l[1])))}const c=['[data-auto="rating"]','[data-auto="rating-value"]',".average-rating",".avg-rating",".rating-value",".rating__value",".product-rating",".ds-text_weight_bold"];for(const n of c)try{const l=document.querySelector(n);if(l&&(l.innerText||l.textContent)){const t=Y(l.innerText||l.textContent);if(t!=null){e.avgRating=Math.round(t*100)/100;break}}}catch{}if(e.avgRating==null){const n=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const l of n){const y=(l.getAttribute("aria-label")||"").match(/([0-5](?:[.,][0-9])?)\s*(зв|звезды|рейтинг|rating)/i);if(y){e.avgRating=Y(y[1]);break}}}if(e.avgRating==null){const l=(document.body.innerText||"").match(/(?:средн(?:ий|ая)\s*рейтинг|рейтинг|rating)[:\s]*([0-5](?:[.,][0-9])?)/i);l&&(e.avgRating=Y(l[1]))}try{const n=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(n){const l=n.getAttribute("ratingvalue")||n.getAttribute("data-ratingvalue"),t=n.getAttribute("ratingcount")||n.getAttribute("data-ratingcount")||n.getAttribute("raitingcounttext")||n.getAttribute("data-ratingcounttext"),y=n.getAttribute("reviewcount")||n.getAttribute("data-reviewcount")||n.getAttribute("reviewcounttext")||n.getAttribute("data-reviewcounttext");if(l&&e.avgRating==null&&(e.avgRating=Y(l)),t&&e.totalRatings==null){const m=String(t).match(/([0-9\s,.Kk]+)/);if(m){const b=m[1].replace(/\s+/g,"");e.totalRatings=Math.round(Y(b))}}if(y&&e.totalReviews==null){const m=String(y).match(/([0-9\s,.Kk]+)/);m&&(e.totalReviews=Math.round(Y(m[1])))}}}catch{}try{if(typeof window.extractRatingBreakdown=="function"){const n=window.extractRatingBreakdown();n&&(e.avgRating==null&&n.avg!=null&&(e.avgRating=n.avg),e.totalRatings==null&&n.totalRatings!=null&&(e.totalRatings=n.totalRatings),e.totalReviews==null&&n.totalReviews!=null&&(e.totalReviews=n.totalReviews))}}catch{}}catch(r){console.warn("extractProductMeta error",r)}return e.totalRatings==null&&e.totalReviews!=null&&(e.totalRatings=e.totalReviews),e.avgRating==null&&e.rating!=null&&(e.avgRating=e.rating),e.totalRatings=typeof e.totalRatings=="number"&&Number.isFinite(e.totalRatings)?Math.round(e.totalRatings):null,e.avgRating=typeof e.avgRating=="number"&&Number.isFinite(e.avgRating)?Math.round(e.avgRating*100)/100:null,e.totalReviews=e.totalReviews||null,e.rating=e.rating||null,e}function de(){const e={5:null,4:null,3:null,2:null,1:null,avg:null,totalRatings:null,totalReviews:null};try{const r=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(r){const y=r.getAttribute("ratingvalue")||r.getAttribute("data-ratingvalue"),m=r.getAttribute("ratingcount")||r.getAttribute("data-ratingcount")||r.getAttribute("raitingcounttext"),b=r.getAttribute("reviewcount")||r.getAttribute("data-reviewcount")||r.getAttribute("reviewcounttext");y&&(e.avg=parseFloat(String(y).replace(",","."))||e.avg),m&&(e.totalRatings=Y(m)||e.totalRatings),b&&(e.totalReviews=Y(b)||e.totalReviews)}const c=document.querySelector('[data-auto="rating-count-text"], [data-auto="ratingCount"], .rating-count, .ds-text[data-auto="rating-count-text"]'),n=document.querySelector('[data-auto="review-count-text"], .review-count, .ds-text[data-auto="review-count-text"]');c&&!e.totalRatings&&(e.totalRatings=Y(c.innerText||c.textContent)||e.totalRatings),n&&!e.totalReviews&&(e.totalReviews=Y(n.innerText||n.textContent)||e.totalReviews);const l=[".rating-breakdown",".rating-histogram",".rating-list",".rating-distribution",'[data-auto="rating-breakdown"]',".review-stats",".rating-row",".ratingRow",".ds-rating-list"];for(const y of l){const m=document.querySelector(y);if(!m)continue;const b=Array.from(m.querySelectorAll("*"));let h=0;for(const T of b){const k=(T.textContent||"").trim(),z=k.match(/^\s*([1-5])\D{0,6}([0-9\s,.Kk]{1,12})\s*$/);if(z){const E=Number(z[1]),R=Y(z[2]);E>=1&&E<=5&&R!=null&&(e[E]=R,h++)}else{const E=k.match(/^\s*([1-5])\s*$/);if(E){const R=Number(E[1]);let w=null;const i=T.nextElementSibling||T.parentElement&&T.parentElement.querySelector(".count, .value, .number, .ds-text");i&&(w=Y(i.textContent||i.innerText)),w!=null&&(e[R]=w,h++)}}}if(h>0)break}const t=Array.from(document.querySelectorAll('noframes[data-apiary="patch"]')||[]);for(const y of t){const m=(y.textContent||"").trim();if(m)try{const b=JSON.parse(m);if(b.collections&&b.collections.businessReviewStats){const E=Object.keys(b.collections.businessReviewStats);if(E.length){const R=b.collections.businessReviewStats[E[0]];if(R&&(R.reviewsCount&&!e.totalReviews&&(e.totalReviews=Number(R.reviewsCount)||e.totalReviews),R.reviewsCountVisualization&&!e.totalRatings)){const w=String(R.reviewsCountVisualization).match(/([\d.,]+)K/i);w&&(e.totalRatings=Math.round(parseFloat(w[1].replace(",","."))*1e3))}}}const h=m,T=h.match(/"ratingvalue"\s*:\s*"?([0-9.,]+)"?/i),k=h.match(/"ratingcount"\s*:\s*(\d+)/i),z=h.match(/"reviewcount"\s*:\s*(\d+)/i);T&&(e.avg=parseFloat(T[1].replace(",","."))||e.avg),k&&(e.totalRatings=Number(k[1])||e.totalRatings),z&&(e.totalReviews=Number(z[1])||e.totalReviews)}catch{}}}catch{}return["5","4","3","2","1"].forEach(r=>{e[r]==null&&(e[r]=null)}),e.avg!=null&&(e.avg=Math.round(Number(e.avg)*100)/100),e.totalRatings!=null&&(e.totalRatings=Math.round(Number(e.totalRatings))),e.totalReviews!=null&&(e.totalReviews=Math.round(Number(e.totalReviews))),e}function Ye(e=15e3){const r={reviews:[],totalFound:0,charactersUsed:0,extractionMethods:[]};try{let c=function(){const i=['[data-auto="reviews-show-more"]','[data-autotest-id*="show-more"]',".reviews-show-more",".show-more",".load-more","button"],s=new Set;for(const d of i)try{Array.from(document.querySelectorAll(d)).forEach(a=>{try{if(!(a instanceof HTMLElement))return;const o=window.getComputedStyle(a);if(o.display==="none"||o.visibility==="hidden"||a.disabled)return;const A=(a.innerText||a.textContent||"").trim();(/показать|еще|ещё|загрузить|more|show/i.test(A)||d.indexOf("show-more")>=0||d.indexOf("reviews-show-more")>=0)&&!s.has(a)&&(a.click(),s.add(a),setTimeout(()=>{try{a.disabled||a.click()}catch{}},900))}catch{}})}catch{}try{const d=document.querySelector('[data-zone-name="reviews"], [data-auto="ugc-section"], .reviews, .n-reviews, .review-list, [data-auto="reviews"]');if(d)try{d.scrollIntoView({behavior:"smooth"}),d.scrollTop=d.scrollHeight}catch{}else window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})}catch{}},n=function(){const i=['button[class*="expand"]','button[class*="show-full"]','[data-auto*="expand"]',".review-expand",".opinion-expand",'button:contains("Развернуть")','button:contains("Показать полностью")','button:contains("Читать полностью")','[class*="read-more"]'];for(const s of i)try{document.querySelectorAll(s).forEach(p=>{try{p.offsetHeight>0&&p.click()}catch{}})}catch{}},l=function(){const i=[];try{document.querySelectorAll("script").forEach(p=>{if(!p.textContent)return;[/"reviews":\s*\[(.*?)\]/gs,/"opinions":\s*\[(.*?)\]/gs,/"reviewText":\s*"([^"]+)"/g,/"text":\s*"([^"]+)"/g,/"comment":\s*"([^"]+)"/g].forEach(o=>{const A=p.textContent.matchAll(o);for(const S of A)try{if(S[1]&&S[1].length>30){const g=S[1].replace(/\\n/g," ").replace(/\\"/g,'"').replace(/\\\\/g,"\\").trim();g.length>30&&i.push(g)}}catch{}})}),document.querySelectorAll("[data-bem]").forEach(p=>{try{Object.values(p.dataset).forEach(a=>{if(!(!a||a.length<100))try{const o=JSON.parse(a),A=o.reviews||o.opinions;Array.isArray(A)&&A.forEach(S=>{const g=S.text||S.content||S.comment;g&&g.length>30&&i.push(String(g))})}catch{}})}catch{}})}catch{}return i},t=function(i){if(!i)return"";let s=String(i).replace(/\r\n|\r/g,`
`).replace(/\t/g," ").replace(/\u00A0/g," ");s=s.replace(/\s+/g," ").trim(),s=s.replace(/\b(?:\d+\s+){3,}\d+\b/g," "),s=s.replace(/\b\d{3,}\b/g," "),s=s.replace(/(?:\b\d+\b[\s,.-]*){3,}/g," ");try{s=s.replace(/[^\p{L}\p{N}\s\.,!?\-()«»—:;\/%]/gu," ")}catch{s=s.replace(/[^A-Za-zА-Яа-яЁё0-9\s\.,!?\-()«»—:;\/%]/g," ")}return s=s.replace(/([,!.?–—\-]){2,}/g,"$1"),s=s.replace(/\s+/g," ").trim(),s},y=function(i){if(!i)return"";const s=[".review-text",".opinion-text",".review-content",".comment-text",'[data-auto="review-text"]','[class*="text"]',"p",".content"];try{for(const a of s){const o=i.querySelector?i.querySelector(a):null;if(o&&o.innerText&&o.innerText.trim().length>20)return t(o.innerText)}}catch{}let d="";try{d=i.innerText||i.textContent||""}catch{d=""}return[/Достоинства:?\s*/gi,/Недостатки:?\s*/gi,/Комментарий:?\s*/gi,/Опыт использования:?\s*/gi,/Рекомендую\s*/gi,/Не рекомендую\s*/gi,/\d+\s*из\s*\d+\s*считают отзыв полезным/gi,/Был ли отзыв полезен\?/gi,/Да\s*\d*\s*Нет\s*\d*/gi,/\d+\s*звезд[ыа]?/gi,/Оценка:\s*\d+/gi].forEach(a=>{d=d.replace(a," ")}),t(d)},m=function(i){if(!i)return!1;const s=i.length;return!(s<40||(i.match(/\d/g)||[]).length/Math.max(1,s)>.3||(i.match(/[A-Za-zА-Яа-яЁё]/g)||[]).length<12||(i.match(/[А-Яа-яЁё]/g)||[]).length<Math.min(10,Math.floor(s*.2))||/^(source|businessId|notEmpty|id|source,)/i.test(i.trim()))},b=function(i){const s=new Set,d=[];return i.forEach(p=>{const a=p.text.toLowerCase().replace(/\s+/g,"").substring(0,100);s.has(a)||(s.add(a),d.push(p))}),d},h=function(i,s){const d=[];let p=0;const o=`

`.length,A=i.sort((S,g)=>g.length-S.length);for(const S of A){const g=S.length,U=p===0?g:g+o;if(p+U<=s)d.push(S),p+=U;else if(p===0){const H=S.substring(0,s-3)+"...";d.push(H),p=H.length;break}else{const H=s-p-o;if(H>50){const W=S.substring(0,H-3)+"...";d.push(W);break}else break}}return d};c(),n();const T=['[data-auto="review-item"]','[data-zone-name="review"]','[data-autotest-id="review-card"]','[data-tid="review-item"]','[data-auto="OpinionCard"]',".opinion",".review-item",".user-review",'[class*="review"]','[class*="opinion"]','[data-zone*="review"]',".n-review-card",".ProductReview",'iframe[src*="review"] + *','[data-bem*="review"]'],k=new Set;for(const i of T)try{const s=document.querySelectorAll(i);s.forEach(d=>{try{d&&d.innerText&&d.innerText.trim().length>20&&k.add(d)}catch{}}),s.length>0&&r.extractionMethods.push(`${i}: ${s.length} элементов`)}catch{}const z=l(),E=[];k.forEach(i=>{try{const s=y(i),d=t(s);m(d)&&E.push({text:d,source:"dom",length:d.length,element:i})}catch{}}),z.forEach(i=>{try{const s=t(i);m(s)&&E.push({text:s,source:"json",length:s.length})}catch{}});const R=b(E);R.sort((i,s)=>s.length-i.length);const w=h(R.map(i=>i.text),e);return r.reviews=w,r.totalFound=R.length,r.charactersUsed=w.reduce((i,s)=>i+(s?s.length:0),0),r}catch(c){return console.warn("extractYandexMarketReviews error",c),r}}function _e(e){if(!e)return"";let r=String(e);return r=r.replace(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi,"[email]"),r=r.replace(/(\+?\d[\d\-\s()]{6,}\d)/g,"[phone]"),r=r.replace(/https?:\/\/\S+/gi,"[url]"),r=r.replace(/\b\d{6,}\b/g,"[id]"),r.length>2e3&&(r=r.slice(0,2e3)+"…"),r.trim()}async function Ue(e=20){let r=[];try{typeof ue=="function"&&(r=ue(),Array.isArray(r)||(r=[]))}catch(t){console.error("Ошибка при извлечении отзывов:",t),r=[]}const c=r.slice(0,e).map((t,y)=>{const m=typeof t=="string"?t:t.text||"";return{id:y+1,text:_e(m),length:m.length}});let n={};try{typeof extractProductMeta=="function"&&(n=extractProductMeta()||{})}catch(t){console.error("Ошибка при извлечении мета данных продукта:",t),n={}}const l=await chrome.storage.sync.get({serverUrl:""});return{version:"1.0",source:location.hostname,serverUrlPreview:l.serverUrl||"",product:{url:location.href,title:document.title,avgRating:n.avgRating??null,totalRatings:n.totalRatings??null},reviewsCount:c.length,reviewsSample:c}}function ue(e=10){if(e=$e(),window.location.hostname.includes("market.yandex")||document.title.includes("Яндекс.Маркет")||document.querySelector('[data-baobab-name*="market"]')){const t=Ye(15e3);return(t&&t.reviews?t.reviews:[]).map(m=>{const b=typeof m=="string"?m:m&&(m.text||m.review||"")||"";return{raw:b,anon:ke(String(b))}}).filter(m=>m.raw&&m.raw.length>30).map(m=>m.anon).slice(0,e)}const c=['[data-zone-name="review"]','[data-autotest-id="review-card"]',".review__item",".product-review",".review",".comments-item",'[data-test-id*="review"]',".feedback",".pa-review",".review-item",".reviewCard"];let n=[];for(const t of c){const y=document.querySelectorAll(t);if(y&&y.length){n=Array.from(y);break}}const l=n.map(t=>{const m=(t?.textContent||t?.innerText||"").trim();return m?ke(m):""}).filter(t=>t&&t.length>30).slice(0,e);return console.debug("ShopSage: Standard extraction found",l.length,"reviews"),l}function qe(e){return e==null?"—":`${Math.round(e*10)/10} <svg class="star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.167L12 18.896l-7.336 3.868 1.402-8.167L.132 9.21l8.2-1.192z"/></svg>`}function je(e,r={}){const c=e.getElementById?e.getElementById("ss-preview-modal"):e.querySelector("#ss-preview-modal");if(c)try{c.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>c.remove(),200)}catch{c.remove()}const n=document.createElement("div");n.id="ss-preview-modal";const l=r.product?.title||document.title||"Неизвестный товар",t=r.product?.url||location.href,y=JSON.stringify(r,null,2),m=new Blob([y]).size,b=r._truncated===!0;function h(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function T(a){try{const o=new URL(a),A=o.pathname.length>24?o.pathname.slice(0,21)+"…":o.pathname;return`${o.hostname}${A}`}catch{return a.length>40?a.slice(0,37)+"…":a}}function k(a){return!a||a<1024?`${a} Б`:a<1024*1024?`${Math.round(a/1024)} КБ`:`${(a/(1024*1024)).toFixed(2)} МБ`}function z(a,o=45){return a.length>o?a.slice(0,o)+"…":a}n.innerHTML=`
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
                        <div class="pm-value" title="${h(l)}">${h(z(l))}</div>
                    </div>
                </div>

                <div class="pm-summary-row">
                    <div style="flex: 1;">
                        <div class="pm-label">Ссылка</div>
                        <div class="pm-value">
                            <a href="${h(t)}" class="pm-link" target="_blank" rel="noopener noreferrer"
                               title="${h(t)}">${h(T(t))}</a>
                        </div>
                    </div>
                </div>

                <div class="pm-meta">
                    <div class="pm-meta-item">
                        <span class="pm-meta-label">Размер данных:</span>
                        <span class="pm-meta-value">${k(m)}</span>
                    </div>
                    ${r.rating?`
                    <div class="pm-meta-item">
                        <span class="pm-meta-label">Рейтинг:</span>
                        <span class="pm-meta-value">${r.rating}</span>
                    </div>
                    `:""}
                </div>

                ${b?`
                <div class="pm-warning">
                    <span>⚠️</span>
                    <span>Данные были усечены до допустимого лимита размера</span>
                </div>
                `:""}
            </div>

            <details class="pm-dev">
                <summary>Технические детали (JSON)</summary>
                <pre>${h(y)}</pre>
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
    `,e.appendChild(n);const E=n.querySelector(".pm-close"),R=n.querySelector(".btn-close-action"),w=n.querySelector(".btn-copy"),i=n.querySelector(".btn-download"),s=n.querySelector(".pm-link");function d(){try{n.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>{try{n.remove()}catch{}},200)}catch{try{n.remove()}catch{}}document.removeEventListener("keydown",p)}E?.addEventListener("click",d),R?.addEventListener("click",d),w?.addEventListener("click",async()=>{const a=w.querySelector(".btn-text")?.textContent||"Копировать",o=w.querySelector(".btn-text");try{await navigator.clipboard.writeText(y),w.classList.add("btn-success"),o&&(o.textContent="Скопировано!"),setTimeout(()=>{w.classList.remove("btn-success"),o&&(o.textContent=a)},1500)}catch{w.classList.add("btn-error"),o&&(o.textContent="Ошибка!"),setTimeout(()=>{w.classList.remove("btn-error"),o&&(o.textContent=a)},1500);try{const S=n.querySelector("pre");if(S){const g=document.createRange();g.selectNodeContents(S);const U=window.getSelection();U.removeAllRanges(),U.addRange(g)}}catch{}}}),i?.addEventListener("click",()=>{const a=i.querySelector(".btn-text")?.textContent||"Скачать",o=i.querySelector(".btn-text");try{const A=new Blob([y],{type:"application/json;charset=utf-8"}),S=URL.createObjectURL(A),g=document.createElement("a");g.href=S,g.download=`shopsage-data-${new Date().toISOString().slice(0,19).replace(/[:.]/g,"-")}.json`,document.body.appendChild(g),g.click(),g.remove(),URL.revokeObjectURL(S),i.classList.add("btn-success"),o&&(o.textContent="Скачано!"),setTimeout(()=>{i.classList.remove("btn-success"),o&&(o.textContent=a)},1500)}catch(A){i.classList.add("btn-error"),o&&(o.textContent="Ошибка!"),setTimeout(()=>{i.classList.remove("btn-error"),o&&(o.textContent=a)},1500),console.error("Download failed:",A)}}),s?.addEventListener("click",a=>{a.preventDefault();try{window.open(t,"_blank","noopener,noreferrer")}catch(o){console.warn("Could not open product URL:",o)}});function p(a){a.key==="Escape"&&d()}return document.addEventListener("keydown",p),n.addEventListener("click",a=>{a.target===n&&d()}),n}function De(e,r={}){const c=typeof fe=="function"?fe():window.__loadedSettings||{},n={...F,...c,...r},l=e.getElementById?e.getElementById("ss-settings-modal"):e.querySelector("#ss-settings-modal");if(l)try{l.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>l.remove(),200)}catch{l.remove()}const t=document.createElement("div");t.id="ss-settings-modal";const y=n.maxReviews??F.maxReviews??5;t.innerHTML=`
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

          <div class="setting-option" style="position:relative;">
            <label style="flex-direction: column; align-items: flex-start; gap: 6px; width:100%;">
              <span>Максимальное количество отзывов для анализа: <span class="range-value" id="max-reviews-value">${y}</span></span>
              <div class="range-wrap" style="position:relative; width:100%;">
                <input type="range" id="set-max-reviews" min="1" max="20" value="${y}" style="width: 100%;">
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
    `,e.appendChild(t);const m=t.querySelector(".sm-close"),b=t.querySelector(".btn-close-action"),h=t.querySelector(".btn-save"),T=t.querySelector(".btn-reset"),k=t.querySelector("#set-max-reviews"),z=t.querySelector("#max-reviews-value"),E=t.querySelector("#max-range-lock"),R=t.querySelector("#set-save-history"),w=t.querySelector('input[name="analysis-depth"][value="deep"]'),i=t.querySelector('input[name="analysis-depth"][value="medium"]'),s=Array.from(t.querySelectorAll(".feature-lock"));function d(){return typeof Ce=="function"?Ce:window.__utils&&typeof window.__utils.showSubscriptionModal=="function"?window.__utils.showSubscriptionModal:(v={},u)=>{const j=new CustomEvent("subscriptionRequest",{detail:{reason:"unlock-max-reviews"},bubbles:!0,composed:!0});return document.dispatchEvent(j),()=>{}}}let p=null;function a(){if(p)return;const v=d(),u=t||e||document.body;try{const j=v({message:"Доступ к расширенным функциям доступен только по подписке. Оформить подписку?",onBuy:()=>{const f=new CustomEvent("subscriptionRequest",{detail:{reason:"unlock-max-reviews"},bubbles:!0,composed:!0});document.dispatchEvent(f)}},u),x=u instanceof ShadowRoot||u instanceof Element?u.querySelector("#subscription-modal-overlay"):document.getElementById("subscription-modal-overlay");if(typeof j=="function"){let f=null;if(x){const O=u instanceof ShadowRoot||u instanceof Element?u:document.body;f=new MutationObserver(()=>{if(!x.isConnected){p=null;try{f.disconnect()}catch{}}}),f.observe(O,{childList:!0,subtree:!0})}p=()=>{try{j()}catch{}p=null;try{f&&f.disconnect()}catch{}}}else if(x){const f=u instanceof ShadowRoot||u instanceof Element?u:document.body,O=new MutationObserver(()=>{x.isConnected||(p=null,O.disconnect())});O.observe(f,{childList:!0,subtree:!0}),p=()=>{try{x.remove()}catch{}p=null;try{O.disconnect()}catch{}}}else p=null}catch{const x=new CustomEvent("subscriptionRequest",{detail:{reason:"unlock-max-reviews"},bubbles:!0,composed:!0});document.dispatchEvent(x),p=null}}let o=!!n.isSubscribed;function A(v){o=!!v,o&&E?(E.style.display="none",E.setAttribute("aria-hidden","true")):E&&(E.style.display="block",E.setAttribute("aria-hidden","false")),s.forEach(u=>{u.getAttribute("data-feature"),o?(u.style.display="none",u.setAttribute("aria-hidden","true")):(u.style.display="block",u.setAttribute("aria-hidden","false"))}),o?(w&&(w.disabled=!1),R&&(R.disabled=!1)):(w&&(w.checked&&i&&(w.checked=!1,i.checked=!0),w.disabled=!0),R&&(R.checked=!1,R.disabled=!0))}if(typeof Se=="function")try{const v=Se();v&&typeof v.then=="function"?v.then(u=>A(!!u)).catch(()=>A(!!n.isSubscribed)):A(!!v)}catch{A(!!n.isSubscribed)}else A(!!n.isSubscribed);z&&(z.textContent=String(k?.value??y)),s.forEach(v=>{v.addEventListener("click",u=>{u.stopPropagation(),a()})}),t.querySelector('.setting-option .feature-row label[for="set-auto-analyze"]');const S=R?R.closest("label"):null;S&&S.addEventListener("click",v=>{o||(v.preventDefault(),a())});const g=w?w.closest("label"):null;g&&g.addEventListener("click",v=>{o||(v.preventDefault(),setTimeout(()=>{w&&(w.checked=!1),i&&(i.checked=!0)},0),a())}),k?.addEventListener("input",v=>{let u=parseInt(v.currentTarget?.value,10)||y;!o&&u>10&&(a(),u=10,k.value="10"),z&&(z.textContent=String(u))}),E?.addEventListener("click",v=>{v.stopPropagation(),!o&&a()});function U(){try{t.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>{try{t.remove()}catch{}},200)}catch{try{t.remove()}catch{}}document.removeEventListener("keydown",se);try{typeof p=="function"&&p()}catch{}p=null}function H(){const v=parseInt(t.querySelector("#set-max-reviews")?.value,10)||F.maxReviews,u=!o&&v>10?10:v;return{maxReviews:u,maxReviews:u,language:t.querySelector("#set-language")?.value||"ru",analysisDepth:t.querySelector('input[name="analysis-depth"]:checked')?.value||"medium",showRating:!!t.querySelector("#set-show-rating")?.checked,debugMode:!!t.querySelector("#set-debug-mode")?.checked,saveHistory:!!t.querySelector("#set-save-history")?.checked}}function W(){t.querySelector("#set-max-reviews").value=F.maxReviews;const v=t.querySelector("#max-reviews-value");v&&(v.textContent=String(F.maxReviews)),t.querySelector("#set-language").value=F.language;const u=t.querySelector(`input[name="analysis-depth"][value="${F.analysisDepth}"]`);u&&(u.checked=!0),t.querySelector("#set-show-rating").checked=F.showRating,t.querySelector("#set-debug-mode").checked=F.debugMode,t.querySelector("#set-save-history").checked=F.saveHistory,!o&&parseInt(t.querySelector("#set-max-reviews").value,10)>10&&(t.querySelector("#set-max-reviews").value="10",v&&(v.textContent="10")),o||(w&&w.checked&&i&&(w.checked=!1,i.checked=!0),R&&(R.checked=!1,R.disabled=!0))}T?.addEventListener("click",async()=>{try{localStorage.removeItem(SETTINGS_KEY),typeof ce=="function"&&await ce({...F||{},maxReviews:F.maxReviews??5,maxReviews:F.maxReviews??5})}catch(j){console.warn("Не удалось удалить/сохранить ключ настроек:",j)}W();const v=T.querySelector(".btn-text")?.textContent||"Сбросить",u=T.querySelector(".btn-text");u&&(u.textContent="Сброшено!"),setTimeout(()=>{u&&(u.textContent=v)},1e3)}),m?.addEventListener("click",U),b?.addEventListener("click",U),h?.addEventListener("click",async()=>{const v=H();try{typeof ce=="function"?await ce(v):localStorage.setItem(SETTINGS_KEY,JSON.stringify(v))}catch(f){console.error("Ошибка при сохранении настроек:",f)}const u=new CustomEvent("settingsChanged",{detail:v,bubbles:!0,composed:!0});try{e.dispatchEvent(u)}catch{t.dispatchEvent(u)}try{typeof be=="function"&&be()}catch(f){console.warn("Ошибка при обновлении видимости рейтинга:",f)}const j=h.querySelector(".btn-text")?.textContent||"Сохранить",x=h.querySelector(".btn-text");h.classList.add("btn-success"),x&&(x.textContent="Сохранено!"),setTimeout(()=>{h.classList.remove("btn-success"),x&&(x.textContent=j),U()},1200)});function se(v){v.key==="Escape"&&U()}return document.addEventListener("keydown",se),setTimeout(()=>{t.addEventListener("click",v=>{v.target===t&&U()})},100),t}function Ce(e={},r=document.body){const{title:c="Разблокировать расширенный анализ",message:n="Больше 10 отзывов доступно только по подписке. Хотите оформить подписку?",buyText:l="Купить подписку",cancelText:t="Нет",onBuy:y}=e,m="subscription-modal-overlay";let b=document.body,h=!1;r&&(r instanceof ShadowRoot||r instanceof Element?(b=r,h=!0):(b=document.body,h=!1));try{const g=h?b.querySelector(`#${m}`):document.getElementById(m);if(g)return()=>{try{g.remove()}catch{}}}catch{}function T(g){return String(g).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const k=document.createElement("div");k.id=m,k.className="subscription-modal-overlay";const z=document.createElement("style");z.textContent=`
    .subscription-modal-overlay {
      ${h?"position: absolute; inset: 0;":"position: fixed; inset: 0;"}
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px;
      z-index: 2147483650;
      background: ${h?"linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.06))":"linear-gradient(180deg, rgba(4,6,12,0.55), rgba(4,6,12,0.45))"};
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
  `,k.appendChild(z),k.innerHTML+=`
    <div class="subscription-modal" role="dialog" aria-modal="true" aria-labelledby="subscription-modal-title">
      <button class="subscription-close" aria-label="Закрыть">&times;</button>
      <div class="subscription-content">
        <h3 id="subscription-modal-title">${T(c)}</h3>
        <p class="subscription-message">${T(n)}</p>
        <div class="subscription-actions">
          <button class="subscription-buy">${T(l)}</button>
          <button class="subscription-cancel">${T(t)}</button>
        </div>
      </div>
    </div>
  `;let E=null;if(h&&b instanceof Element){const g=window.getComputedStyle(b);(!g.position||g.position==="static")&&(E=b.style.position||"",b.style.position="relative")}h?b.appendChild(k):document.body.appendChild(k);const R=document.body.style.overflow;h||(document.body.style.overflow="hidden");const w=k.querySelector(".subscription-buy"),i=k.querySelector(".subscription-cancel"),s=k.querySelector(".subscription-close");let d=!1;function p(){if(!d){d=!0;try{k.remove()}catch{}if(E!==null&&b instanceof Element)try{b.style.position=E}catch{}h||(document.body.style.overflow=R||""),document.removeEventListener("keydown",S)}}function a(g){g.stopPropagation();try{typeof y=="function"?y():document.dispatchEvent(new CustomEvent("subscriptionRequest",{detail:{reason:"unlock-max-reviews"},bubbles:!0,composed:!0}))}catch{}p()}function o(g){g.stopPropagation(),p()}function A(g){g.target===k&&p()}function S(g){g.key==="Escape"&&p()}return w?.addEventListener("click",a),i?.addEventListener("click",o),s?.addEventListener("click",o),k.addEventListener("click",A),document.addEventListener("keydown",S),p}const Fe=`<aside\r
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
`,He=`:host {\r
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
`;function J(){if(document.getElementById(re)){const f=document.getElementById(re)._hostElement;if(!f)return;f.style.opacity==="1"?pe():(f.style.opacity="1",f.style.transform="translateY(0) scale(1)");return}const e=document.createElement("div");e.id=re,Object.assign(e.style,{all:"initial",position:"fixed",right:"20px",top:"60px",zIndex:"2147483647",pointerEvents:"auto"});const r=e.attachShadow({mode:"open"});e._hostElement=e;const c=document.createElement("style");c.textContent=He,r.appendChild(c);const n=document.createElement("div");n.innerHTML=Fe,r.appendChild(n);const l=r.querySelector("#ss-logo");l&&(l.src=chrome.runtime.getURL("assets/icons/icon.svg")),document.body.appendChild(e),be();const t=r,y=t.querySelector(".shopsage-sidebar"),m=t.querySelector(".ss-close"),b=t.querySelector("#ss-analyze"),h=t.querySelector("#ss-loader"),T=t.querySelector("#ss-count"),k=t.querySelector("#ss-result"),z=t.querySelector("#ss-pros"),E=t.querySelector("#ss-cons"),R=t.querySelector("#ss-verdict"),w=t.querySelector("#ss-rating"),i=t.querySelector("#ss-total"),s=t.querySelector("#ss-error"),d=t.querySelector("#ss-score-container"),p=t.querySelector("#ss-score-badge"),a=t.querySelector("#ss-score-bar-inner"),o=t.querySelector("#ss-score-sub"),A=t.querySelector("#ss-send-server"),S=t.querySelector("#ss-preview-payload"),g=t.querySelector("#ss-preview-settings");A&&A.addEventListener("change",x=>{const f=!!x.target.checked;chrome.storage.sync.set({sendToServer:f})}),S&&S.addEventListener("click",async()=>{try{S.disabled=!0;const x=await Ue();je(t,x)}catch(x){console.error("preview error",x),alert("Ошибка при формировании превью: "+String(x))}finally{S.disabled=!1}}),g&&g.addEventListener("click",async()=>{try{g.disabled=!0;const x=await fe();De(t,x)}catch(x){console.error("preview error",x),alert("Ошибка при формировании превью: "+String(x))}finally{g.disabled=!1}}),requestAnimationFrame(()=>{Object.assign(e.style,{opacity:"0",transform:"translateY(8px) scale(.995)",transition:"opacity .28s cubic-bezier(.2,.9,.2,1), transform .36s cubic-bezier(.2,.9,.2,1)"}),setTimeout(()=>{e.style.opacity="1",e.style.transform="translateY(0) scale(1)"},20)}),m&&m.addEventListener("click",pe),b&&b.addEventListener("click",se);const U=ue();T&&(T.innerText=U.length);const H=Ee();w&&(w.innerHTML=qe(H.avgRating)),i&&(i.innerText=H.totalRatings!=null?H.totalRatings:"—");function W(x){s&&(s.innerText=x,j(s),setTimeout(()=>{u(s)},5e3))}function se(x){b&&(b.disabled=!0),h&&j(h),k&&u(k),d&&u(d),o&&u(o),s&&u(s);const f=15e3,O=`

`;chrome.storage.sync.get({maxReviews:20,serverUrl:""},K=>{const oe=Number.isFinite(Number(K.maxReviews))&&Number(K.maxReviews)>0?Number(K.maxReviews):20,X=typeof Re=="function"?String(Re()).trim().toLowerCase():"medium",ie=["fast","medium","deep"];let Z="medium";ie.includes(X)?Z=X:X==="1"||X==="fast"?Z="fast":X==="3"||X==="deep"?Z="deep":Z="medium";const P=ue(oe);let B=[],_=0;if(Array.isArray(P)?(B=P,_=P.length):P&&typeof P=="object"?(B=P.items||[],_=Number.isFinite(Number(P.found))?P.found:B.length||0):(B=[],_=0),_<oe&&console.info(`Verdict: Requested ${oe} reviews but only ${_} found on page. Using available reviews.`),!B||B.length===0){h&&u(h),b&&(b.disabled=!1),W("Не найдено отзывов на странице. Попробуйте прокрутить страницу или перейти на страницу с отзывами.");return}const V=[];let Q="";for(let M=0;M<B.length;M++){const N=B[M]||"";if(N)if(Q.length===0)if(N.length<=f)Q=N,V.push(N);else{const L=N.slice(0,f-1)+"…";Q=L,V.push(L);break}else if(Q.length+O.length+N.length<=f)Q=Q+O+N,V.push(N);else break}const ee=Ee();w&&(w.innerHTML=qe(H.avgRating)),i&&(i.innerText=ee.totalRatings!=null?ee.totalRatings:"—");const I=V,D={url:location.href,title:document.title,totalRatings:ee.totalRatings,avgRating:ee.avgRating};console.log("ShopSage: Sending analysis request",{reviewCount:I.length,product:D,serverUrl:K.serverUrl||"default"}),chrome.runtime.sendMessage({action:Be,reviews:I,product:D,serverUrl:K.serverUrl||"",analysisDepth:Z},M=>{if(chrome.runtime.lastError){console.error("Verdict: runtime.lastError",chrome.runtime.lastError),h&&u(h),b&&(b.disabled=!1),W("Ошибка связи с расширением. Перезагрузите страницу и попробуйте снова.");return}if(h&&u(h),b&&(b.disabled=!1),!M){console.error("Verdict: Empty response from background"),W("Не получен ответ от сервера. Проверьте настройки или попробуйте позже.");return}if(!M.ok){console.error("Verdict: Analysis failed",M);let L="Ошибка анализа";M.error?L=M.error:M.message&&(L=M.message),L.includes("fetch failed")||L.includes("Failed to fetch")?L="Не удалось подключиться к серверу. Проверьте URL сервера в настройках.":L.includes("timeout")?L="Превышено время ожидания ответа от сервера.":L.includes("404")?L="Сервер не найден. Проверьте URL в настройках.":(L.includes("500")||L.includes("502")||L.includes("503"))&&(L="Ошибка сервера. Попробуйте позже."),W(L);return}const N=M.data||{};console.info("Verdict: Analysis successful",M),v(N,D,I.length,Z)})})}function v(x,f={},O=0,K="standard"){s&&u(s);const X={fast:3,medium:5,deep:7}[K]||5,ie=Array.isArray(x.pros)?x.pros.slice(0,X):[],Z=Array.isArray(x.cons)?x.cons.slice(0,X):[];z&&(z.innerHTML="",ie.forEach((q,$)=>{const C=document.createElement("li");C.innerHTML='<div class="tag">'+($+1)+'</div><div class="snippet"></div>',C.querySelector(".snippet").innerText=q,z.appendChild(C)})),E&&(E.innerHTML="",Z.forEach((q,$)=>{const C=document.createElement("li");C.innerHTML='<div class="tag">'+($+1)+'</div><div class="snippet"></div>',C.querySelector(".snippet").innerText=q,E.appendChild(C)}));let P=document.querySelector('[data-auto="rating"]');P&&(f.avgRating=parseFloat(P.textContent.trim().replace(",","."))),R&&(R.innerText=x.verdict||"Нет явного вердикта");let B=f&&f.avgRating!=null?Number(f.avgRating):f&&f.rating!=null?Number(f.rating):null,_=f&&f.totalRatings!=null?Number(f.totalRatings):f&&f.totalReviews!=null?Number(f.totalReviews):null;try{if(typeof de=="function"){const q=de();q&&(B==null&&q.avg!=null&&(B=q.avg),_==null&&q.totalRatings!=null&&(_=q.totalRatings))}}catch{}const V=typeof de=="function"?de():null,Q=_||f&&(f.totalReviews||0)||0,ee=B??(f&&(f.avgRating||f.rating)?f.avgRating||f.rating:null);let I=Math.max(0,Number(Q||0)),D=0,M=null,N=null,L=null;if(V){const q={};let $=!1;for(let C=1;C<=5;C++){const G=V[String(C)];G!=null&&Number.isFinite(Number(G))&&Number(G)>0?(q[C]=Number(G),$=!0):q[C]=0}$&&(L=q),B==null&&V.avg!=null&&(B=V.avg),_==null&&V.totalRatings!=null&&(_=V.totalRatings)}if(L)D=Number(L[5]||0)+Number(L[4]||0),I=Object.keys(L).reduce((q,$)=>q+Number(L[$]||0),0),N=I>0?D/I:null,M=B!=null?B/5:N??.5;else if(I>0&&ee!=null){const q=Math.max(0,Math.min(1,(ee-1)/4));D=Math.round(q*I),N=I>0?D/I:null,M=ee/5}else{const q=Array.isArray(x.pros)?x.pros.length:0,$=Array.isArray(x.cons)?x.cons.length:0;if(q+$>0){const C=q/(q+$);I=Math.max(I,q+$),D=Math.round(C*I),N=C,M=C}else{I=Math.max(I,O||0);const C=.5;D=Math.round(C*I),N=C,M=M??C}}const Te=2,Ae=2,xe=Te+D,Le=Ae+(I-D),le=xe/(xe+Le);function Me(q,$,C=1.96){if($===0)return{low:0,high:1};const G=q/$,me=C*C,he=1+me/$,ye=G+me/(2*$),we=C*Math.sqrt((G*(1-G)+me/(4*$))/$),ze=Math.max(0,(ye-we)/he),Ie=Math.min(1,(ye+we)/he);return{low:ze,high:Ie}}const ge=Me(D,Math.max(1,I));M==null&&(M=le);const te=Math.round((le*.6+M*.4)*100);let ne="",ae="";if(te>=85?(ne="Однозначно стоит выбрать",ae="linear-gradient(90deg,#a3e635,#10b981)"):te>=70?(ne="В целом рекомендуем",ae="linear-gradient(90deg,#facc15,#84cc16)"):te>=55?(ne="Стоит взвесить плюсы и минусы",ae="linear-gradient(90deg,#f59e0b,#f97316)"):(ne="Лучше поискать альтернативу",ae="linear-gradient(90deg,#ef4444,#ea580c)"),d&&j(d),p&&(p.innerText=te+"%",p.style.background=ae),a&&(a.style.width=te+"%"),o){j(o);const q=Math.round(ge.low*100),$=Math.round(ge.high*100),C=I>0?I:O||"—",G=B!=null?`${B}`:"—";o.innerText=`${ne} — вероятность успеха ≈ ${Math.round(le*100)}% (интервал ${q}–${$}%), на основе ${C} оценок; положительных (4–5★): ${D}. Средний рейтинг: ${G}★.`}T&&(O!=null&&O!==0?T.innerText=`${O} из ${_??"—"}`:T.innerText=_??"—"),k&&(j(k),setTimeout(()=>k.classList.add("show"),30)),console.info("ShopSage: stats",{n:I,k:D,estPosRate:N,posteriorMean:le,wilson:ge,composite:te,rec:ne,pageAvg:B,pageTotalRatings:_,prosCount:ie.length,consCount:Z.length})}e._shadow=r,e._container=y;function u(x){x.classList.remove("visible"),x.classList.add("hidden")}function j(x){requestAnimationFrame(()=>{x.classList.remove("hidden"),x.classList.add("visible")})}}function pe(){const e=document.getElementById(re);e&&(e.style.opacity="0",e.style.transform="translateY(8px) scale(.995)",setTimeout(()=>{try{const r=document.getElementById(re);r&&r.remove()}catch{}},300))}function Pe(e,r,c){try{const n=e.config||{};if(chrome&&chrome.storage&&chrome.storage.sync)return chrome.storage.sync.set({serverUrl:n.serverUrl||"",maxReviews:n.maxReviews!=null?n.maxReviews:void 0},()=>{try{if(typeof J=="function"){try{J(),c&&c({ok:!0,message:"openSidebar() called"})}catch(t){console.warn("openSidebar call failed",t),c&&c({ok:!1,error:String(t)})}return}if(typeof window.openSidebar=="function")try{window.openSidebar(),c&&c({ok:!0,message:"window.openSidebar() called"});return}catch{}if(typeof window.createSidebar=="function")try{window.createSidebar(),c&&c({ok:!0,message:"window.createSidebar() called"});return}catch{}const l=document.getElementById(ve)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2")||document.getElementById("shopsage-open-btn-v3");if(l)try{l.click(),c&&c({ok:!0,message:"button clicked"});return}catch(t){c&&c({ok:!1,message:"failed to click button",error:String(t)});return}c&&c({ok:!1,message:"no sidebar open API found"})}catch(l){console.error("handleOpenSidebarMessage inner error",l),c&&c({ok:!1,error:String(l)})}}),!0;try{typeof J=="function"?(J(),c&&c({ok:!0,message:"openSidebar() called (no storage)"})):c&&c({ok:!1,message:"storage unavailable and openSidebar missing"})}catch(l){c&&c({ok:!1,error:String(l)})}}catch(n){console.error("handleOpenSidebarMessage error",n);try{c&&c({ok:!1,error:String(n)})}catch{}}return!1}function Ve(e,r,c){try{if(!e||!e.action)return;if(e.action==="OPEN_SIDEBAR")return Pe(e,r,c)}catch(n){console.error("handleRuntimeMessage error",n);try{c&&c({ok:!1,error:String(n)})}catch{}}return!1}try{chrome&&chrome.runtime&&chrome.runtime.onMessage&&chrome.runtime.onMessage.addListener(Ve)}catch{}if(!window.__shopSageInitialized){try{typeof J=="function"&&(window.openSidebar=J),typeof pe=="function"&&(window.closeSidebar=pe),typeof J=="function"&&(window.createSidebar=J)}catch{}try{Ne({ROOT_ID:re,BTN_ID:ve,ICON_PATH:Oe,onOpenSidebar:typeof J=="function"?J:()=>{const e=document.getElementById(ve)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2");if(e)try{e.click()}catch{}}})}catch(e){console.error("ShopSage: initContent failed",e)}window.__shopSageInitialized=!0}export{pe as closeSidebar,J as openSidebar};
