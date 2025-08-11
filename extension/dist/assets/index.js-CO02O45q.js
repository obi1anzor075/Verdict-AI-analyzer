import{initContent as Re}from"./content-DMhZNfbp.js";const W="shopsage-root-v3",le="shopsage-open-btn-v3",Ae="ANALYZE",Ee=chrome&&chrome.runtime&&chrome.runtime.getURL?chrome.runtime.getURL("assets/icons/icon.svg"):"/assets/icons/icon.svg";function $(e){if(e==null)return null;const s=String(e).trim();if(!s)return null;const t=s.match(/([\d.,]+)\s*[Kk]/);if(t){const n=parseFloat(t[1].replace(",","."));if(Number.isFinite(n))return Math.round(n*1e3)}const r=s.replace(/\s+/g,"").replace(/[^0-9\.,]/g,"").replace(",","."),l=parseFloat(r);return Number.isFinite(l)?l:null}function pe(){const e={totalReviews:null,rating:null,totalRatings:null,avgRating:null};try{try{const r=document.querySelector('meta[itemprop="reviewCount"], meta[name="reviewCount"], meta[name="reviews"]');r&&r.content&&(e.totalReviews=Math.round($(r.content))||null)}catch{}try{const r=document.querySelector('meta[itemprop="ratingValue"], meta[name="rating"], meta[itemprop="rating"]');r&&r.content&&(e.rating=Math.round($(r.content)*100)/100||null)}catch{}const s=['[data-auto="rating-count-text"]',".rating-count",".reviews-count",".votes-count",".ratings-count",".rating__count",".rate__count",".count-ratings",'[data-test="ratings-count"]'];for(const r of s)try{const l=document.querySelector(r);if(l&&(l.innerText||l.textContent)){const n=$(l.innerText||l.textContent);if(n!=null){e.totalRatings=Math.round(n);break}}}catch{}if(e.totalRatings==null){const r=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const l of r){const f=(l.getAttribute("aria-label")||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голос|голосов|votes|ratings)/i);if(f){e.totalRatings=Math.round($(f[1]));break}}}if(e.totalRatings==null){const l=(document.body.innerText||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голосов|votes|ratings)/i);l&&(e.totalRatings=Math.round($(l[1])))}const t=['[data-auto="rating"]','[data-auto="rating-value"]',".average-rating",".avg-rating",".rating-value",".rating__value",".product-rating",".ds-text_weight_bold"];for(const r of t)try{const l=document.querySelector(r);if(l&&(l.innerText||l.textContent)){const n=$(l.innerText||l.textContent);if(n!=null){e.avgRating=Math.round(n*100)/100;break}}}catch{}if(e.avgRating==null){const r=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const l of r){const f=(l.getAttribute("aria-label")||"").match(/([0-5](?:[.,][0-9])?)\s*(зв|звезды|рейтинг|rating)/i);if(f){e.avgRating=$(f[1]);break}}}if(e.avgRating==null){const l=(document.body.innerText||"").match(/(?:средн(?:ий|ая)\s*рейтинг|рейтинг|rating)[:\s]*([0-5](?:[.,][0-9])?)/i);l&&(e.avgRating=$(l[1]))}try{const r=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(r){const l=r.getAttribute("ratingvalue")||r.getAttribute("data-ratingvalue"),n=r.getAttribute("ratingcount")||r.getAttribute("data-ratingcount")||r.getAttribute("raitingcounttext")||r.getAttribute("data-ratingcounttext"),f=r.getAttribute("reviewcount")||r.getAttribute("data-reviewcount")||r.getAttribute("reviewcounttext")||r.getAttribute("data-reviewcounttext");if(l&&e.avgRating==null&&(e.avgRating=$(l)),n&&e.totalRatings==null){const g=String(n).match(/([0-9\s,.Kk]+)/);if(g){const p=g[1].replace(/\s+/g,"");e.totalRatings=Math.round($(p))}}if(f&&e.totalReviews==null){const g=String(f).match(/([0-9\s,.Kk]+)/);g&&(e.totalReviews=Math.round($(g[1])))}}}catch{}try{if(typeof window.extractRatingBreakdown=="function"){const r=window.extractRatingBreakdown();r&&(e.avgRating==null&&r.avg!=null&&(e.avgRating=r.avg),e.totalRatings==null&&r.totalRatings!=null&&(e.totalRatings=r.totalRatings),e.totalReviews==null&&r.totalReviews!=null&&(e.totalReviews=r.totalReviews))}}catch{}}catch(s){console.warn("extractProductMeta error",s)}return e.totalRatings==null&&e.totalReviews!=null&&(e.totalRatings=e.totalReviews),e.avgRating==null&&e.rating!=null&&(e.avgRating=e.rating),e.totalRatings=typeof e.totalRatings=="number"&&Number.isFinite(e.totalRatings)?Math.round(e.totalRatings):null,e.avgRating=typeof e.avgRating=="number"&&Number.isFinite(e.avgRating)?Math.round(e.avgRating*100)/100:null,e.totalReviews=e.totalReviews||null,e.rating=e.rating||null,e}function re(){const e={5:null,4:null,3:null,2:null,1:null,avg:null,totalRatings:null,totalReviews:null};try{const s=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(s){const f=s.getAttribute("ratingvalue")||s.getAttribute("data-ratingvalue"),g=s.getAttribute("ratingcount")||s.getAttribute("data-ratingcount")||s.getAttribute("raitingcounttext"),p=s.getAttribute("reviewcount")||s.getAttribute("data-reviewcount")||s.getAttribute("reviewcounttext");f&&(e.avg=parseFloat(String(f).replace(",","."))||e.avg),g&&(e.totalRatings=$(g)||e.totalRatings),p&&(e.totalReviews=$(p)||e.totalReviews)}const t=document.querySelector('[data-auto="rating-count-text"], [data-auto="ratingCount"], .rating-count, .ds-text[data-auto="rating-count-text"]'),r=document.querySelector('[data-auto="review-count-text"], .review-count, .ds-text[data-auto="review-count-text"]');t&&!e.totalRatings&&(e.totalRatings=$(t.innerText||t.textContent)||e.totalRatings),r&&!e.totalReviews&&(e.totalReviews=$(r.innerText||r.textContent)||e.totalReviews);const l=[".rating-breakdown",".rating-histogram",".rating-list",".rating-distribution",'[data-auto="rating-breakdown"]',".review-stats",".rating-row",".ratingRow",".ds-rating-list"];for(const f of l){const g=document.querySelector(f);if(!g)continue;const p=Array.from(g.querySelectorAll("*"));let v=0;for(const L of p){const M=(L.textContent||"").trim(),N=M.match(/^\s*([1-5])\D{0,6}([0-9\s,.Kk]{1,12})\s*$/);if(N){const E=Number(N[1]),z=$(N[2]);E>=1&&E<=5&&z!=null&&(e[E]=z,v++)}else{const E=M.match(/^\s*([1-5])\s*$/);if(E){const z=Number(E[1]);let k=null;const o=L.nextElementSibling||L.parentElement&&L.parentElement.querySelector(".count, .value, .number, .ds-text");o&&(k=$(o.textContent||o.innerText)),k!=null&&(e[z]=k,v++)}}}if(v>0)break}const n=Array.from(document.querySelectorAll('noframes[data-apiary="patch"]')||[]);for(const f of n){const g=(f.textContent||"").trim();if(g)try{const p=JSON.parse(g);if(p.collections&&p.collections.businessReviewStats){const E=Object.keys(p.collections.businessReviewStats);if(E.length){const z=p.collections.businessReviewStats[E[0]];if(z&&(z.reviewsCount&&!e.totalReviews&&(e.totalReviews=Number(z.reviewsCount)||e.totalReviews),z.reviewsCountVisualization&&!e.totalRatings)){const k=String(z.reviewsCountVisualization).match(/([\d.,]+)K/i);k&&(e.totalRatings=Math.round(parseFloat(k[1].replace(",","."))*1e3))}}}const v=g,L=v.match(/"ratingvalue"\s*:\s*"?([0-9.,]+)"?/i),M=v.match(/"ratingcount"\s*:\s*(\d+)/i),N=v.match(/"reviewcount"\s*:\s*(\d+)/i);L&&(e.avg=parseFloat(L[1].replace(",","."))||e.avg),M&&(e.totalRatings=Number(M[1])||e.totalRatings),N&&(e.totalReviews=Number(N[1])||e.totalReviews)}catch{}}}catch{}return["5","4","3","2","1"].forEach(s=>{e[s]==null&&(e[s]=null)}),e.avg!=null&&(e.avg=Math.round(Number(e.avg)*100)/100),e.totalRatings!=null&&(e.totalRatings=Math.round(Number(e.totalRatings))),e.totalReviews!=null&&(e.totalReviews=Math.round(Number(e.totalReviews))),e}function ze(e=15e3){const s={reviews:[],totalFound:0,charactersUsed:0,extractionMethods:[]};try{let t=function(){const o=['[data-auto="reviews-show-more"]','[data-autotest-id*="show-more"]',".reviews-show-more",".show-more",".load-more","button"],a=new Set;for(const d of o)try{Array.from(document.querySelectorAll(d)).forEach(i=>{try{if(!(i instanceof HTMLElement))return;const c=window.getComputedStyle(i);if(c.display==="none"||c.visibility==="hidden"||i.disabled)return;const q=(i.innerText||i.textContent||"").trim();(/показать|еще|ещё|загрузить|more|show/i.test(q)||d.indexOf("show-more")>=0||d.indexOf("reviews-show-more")>=0)&&!a.has(i)&&(i.click(),a.add(i),setTimeout(()=>{try{i.disabled||i.click()}catch{}},900))}catch{}})}catch{}try{const d=document.querySelector('[data-zone-name="reviews"], [data-auto="ugc-section"], .reviews, .n-reviews, .review-list, [data-auto="reviews"]');if(d)try{d.scrollIntoView({behavior:"smooth"}),d.scrollTop=d.scrollHeight}catch{}else window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})}catch{}},r=function(){const o=['button[class*="expand"]','button[class*="show-full"]','[data-auto*="expand"]',".review-expand",".opinion-expand",'button:contains("Развернуть")','button:contains("Показать полностью")','button:contains("Читать полностью")','[class*="read-more"]'];for(const a of o)try{document.querySelectorAll(a).forEach(m=>{try{m.offsetHeight>0&&m.click()}catch{}})}catch{}},l=function(){const o=[];try{document.querySelectorAll("script").forEach(m=>{if(!m.textContent)return;[/"reviews":\s*\[(.*?)\]/gs,/"opinions":\s*\[(.*?)\]/gs,/"reviewText":\s*"([^"]+)"/g,/"text":\s*"([^"]+)"/g,/"comment":\s*"([^"]+)"/g].forEach(c=>{const q=m.textContent.matchAll(c);for(const h of q)try{if(h[1]&&h[1].length>30){const y=h[1].replace(/\\n/g," ").replace(/\\"/g,'"').replace(/\\\\/g,"\\").trim();y.length>30&&o.push(y)}}catch{}})}),document.querySelectorAll("[data-bem]").forEach(m=>{try{Object.values(m.dataset).forEach(i=>{if(!(!i||i.length<100))try{const c=JSON.parse(i),q=c.reviews||c.opinions;Array.isArray(q)&&q.forEach(h=>{const y=h.text||h.content||h.comment;y&&y.length>30&&o.push(String(y))})}catch{}})}catch{}})}catch{}return o},n=function(o){if(!o)return"";let a=String(o).replace(/\r\n|\r/g,`
`).replace(/\t/g," ").replace(/\u00A0/g," ");a=a.replace(/\s+/g," ").trim(),a=a.replace(/\b(?:\d+\s+){3,}\d+\b/g," "),a=a.replace(/\b\d{3,}\b/g," "),a=a.replace(/(?:\b\d+\b[\s,.-]*){3,}/g," ");try{a=a.replace(/[^\p{L}\p{N}\s\.,!?\-()«»—:;\/%]/gu," ")}catch{a=a.replace(/[^A-Za-zА-Яа-яЁё0-9\s\.,!?\-()«»—:;\/%]/g," ")}return a=a.replace(/([,!.?–—\-]){2,}/g,"$1"),a=a.replace(/\s+/g," ").trim(),a},f=function(o){if(!o)return"";const a=[".review-text",".opinion-text",".review-content",".comment-text",'[data-auto="review-text"]','[class*="text"]',"p",".content"];try{for(const i of a){const c=o.querySelector?o.querySelector(i):null;if(c&&c.innerText&&c.innerText.trim().length>20)return n(c.innerText)}}catch{}let d="";try{d=o.innerText||o.textContent||""}catch{d=""}return[/Достоинства:?\s*/gi,/Недостатки:?\s*/gi,/Комментарий:?\s*/gi,/Опыт использования:?\s*/gi,/Рекомендую\s*/gi,/Не рекомендую\s*/gi,/\d+\s*из\s*\d+\s*считают отзыв полезным/gi,/Был ли отзыв полезен\?/gi,/Да\s*\d*\s*Нет\s*\d*/gi,/\d+\s*звезд[ыа]?/gi,/Оценка:\s*\d+/gi].forEach(i=>{d=d.replace(i," ")}),n(d)},g=function(o){if(!o)return!1;const a=o.length;return!(a<40||(o.match(/\d/g)||[]).length/Math.max(1,a)>.3||(o.match(/[A-Za-zА-Яа-яЁё]/g)||[]).length<12||(o.match(/[А-Яа-яЁё]/g)||[]).length<Math.min(10,Math.floor(a*.2))||/^(source|businessId|notEmpty|id|source,)/i.test(o.trim()))},p=function(o){const a=new Set,d=[];return o.forEach(m=>{const i=m.text.toLowerCase().replace(/\s+/g,"").substring(0,100);a.has(i)||(a.add(i),d.push(m))}),d},v=function(o,a){const d=[];let m=0;const c=`

`.length,q=o.sort((h,y)=>y.length-h.length);for(const h of q){const y=h.length,D=m===0?y:y+c;if(m+D<=a)d.push(h),m+=D;else if(m===0){const O=h.substring(0,a-3)+"...";d.push(O),m=O.length;break}else{const O=a-m-c;if(O>50){const P=h.substring(0,O-3)+"...";d.push(P);break}else break}}return d};t(),r();const L=['[data-auto="review-item"]','[data-zone-name="review"]','[data-autotest-id="review-card"]','[data-tid="review-item"]','[data-auto="OpinionCard"]',".opinion",".review-item",".user-review",'[class*="review"]','[class*="opinion"]','[data-zone*="review"]',".n-review-card",".ProductReview",'iframe[src*="review"] + *','[data-bem*="review"]'],M=new Set;for(const o of L)try{const a=document.querySelectorAll(o);a.forEach(d=>{try{d&&d.innerText&&d.innerText.trim().length>20&&M.add(d)}catch{}}),a.length>0&&s.extractionMethods.push(`${o}: ${a.length} элементов`)}catch{}const N=l(),E=[];M.forEach(o=>{try{const a=f(o),d=n(a);g(d)&&E.push({text:d,source:"dom",length:d.length,element:o})}catch{}}),N.forEach(o=>{try{const a=n(o);g(a)&&E.push({text:a,source:"json",length:a.length})}catch{}});const z=p(E);z.sort((o,a)=>a.length-o.length);const k=v(z.map(o=>o.text),e);return s.reviews=k,s.totalFound=z.length,s.charactersUsed=k.reduce((o,a)=>o+(a?a.length:0),0),s}catch(t){return console.warn("extractYandexMarketReviews error",t),s}}function Te(e){if(!e)return"";let s=String(e);return s=s.replace(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi,"[email]"),s=s.replace(/(\+?\d[\d\-\s()]{6,}\d)/g,"[phone]"),s=s.replace(/https?:\/\/\S+/gi,"[url]"),s=s.replace(/\b\d{6,}\b/g,"[id]"),s.length>2e3&&(s=s.slice(0,2e3)+"…"),s.trim()}async function qe(){let s=[];try{typeof ae=="function"&&(s=ae(20),Array.isArray(s)||(s=[]))}catch(n){console.error("Ошибка при извлечении отзывов:",n),s=[]}const t=s.slice(0,20).map((n,f)=>{const g=typeof n=="string"?n:n.text||"";return{id:f+1,text:Te(g),length:g.length}});let r={};try{typeof extractProductMeta=="function"&&(r=extractProductMeta()||{})}catch(n){console.error("Ошибка при извлечении мета данных продукта:",n),r={}}const l=await chrome.storage.sync.get({serverUrl:""});return{version:"1.0",source:location.hostname,serverUrlPreview:l.serverUrl||"",product:{url:location.href,title:document.title,avgRating:r.avgRating??null,totalRatings:r.totalRatings??null},reviewsCount:t.length,reviewsSample:t}}function Ce(e,s={}){const t=e.getElementById?e.getElementById("ss-preview-modal"):e.querySelector("#ss-preview-modal");if(t)try{t.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>t.remove(),200)}catch{t.remove()}const r=document.createElement("div");r.id="ss-preview-modal";const l=s.product?.title||document.title||"Неизвестный товар",n=s.product?.url||location.href,f=JSON.stringify(s,null,2),g=new Blob([f]).size,p=s._truncated===!0;function v(i){return String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function L(i){try{const c=new URL(i),q=c.pathname.length>24?c.pathname.slice(0,21)+"…":c.pathname;return`${c.hostname}${q}`}catch{return i.length>40?i.slice(0,37)+"…":i}}function M(i){return!i||i<1024?`${i} Б`:i<1024*1024?`${Math.round(i/1024)} КБ`:`${(i/(1024*1024)).toFixed(2)} МБ`}function N(i,c=45){return i.length>c?i.slice(0,c)+"…":i}r.innerHTML=`
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
                        <div class="pm-value" title="${v(l)}">${v(N(l))}</div>
                    </div>
                </div>

                <div class="pm-summary-row">
                    <div style="flex: 1;">
                        <div class="pm-label">Ссылка</div>
                        <div class="pm-value">
                            <a href="${v(n)}" class="pm-link" target="_blank" rel="noopener noreferrer"
                               title="${v(n)}">${v(L(n))}</a>
                        </div>
                    </div>
                </div>

                <div class="pm-meta">
                    <div class="pm-meta-item">
                        <span class="pm-meta-label">Размер данных:</span>
                        <span class="pm-meta-value">${M(g)}</span>
                    </div>
                    ${s.rating?`
                    <div class="pm-meta-item">
                        <span class="pm-meta-label">Рейтинг:</span>
                        <span class="pm-meta-value">${s.rating}</span>
                    </div>
                    `:""}
                </div>

                ${p?`
                <div class="pm-warning">
                    <span>⚠️</span>
                    <span>Данные были усечены до допустимого лимита размера</span>
                </div>
                `:""}
            </div>

            <details class="pm-dev">
                <summary>Технические детали (JSON)</summary>
                <pre>${v(f)}</pre>
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
    `,e.appendChild(r);const E=r.querySelector(".pm-close"),z=r.querySelector(".btn-close-action"),k=r.querySelector(".btn-copy"),o=r.querySelector(".btn-download"),a=r.querySelector(".pm-link");function d(){try{r.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>{try{r.remove()}catch{}},200)}catch{try{r.remove()}catch{}}document.removeEventListener("keydown",m)}E?.addEventListener("click",d),z?.addEventListener("click",d),k?.addEventListener("click",async()=>{const i=k.querySelector(".btn-text")?.textContent||"Копировать",c=k.querySelector(".btn-text");try{await navigator.clipboard.writeText(f),k.classList.add("btn-success"),c&&(c.textContent="Скопировано!"),setTimeout(()=>{k.classList.remove("btn-success"),c&&(c.textContent=i)},1500)}catch{k.classList.add("btn-error"),c&&(c.textContent="Ошибка!"),setTimeout(()=>{k.classList.remove("btn-error"),c&&(c.textContent=i)},1500);try{const h=r.querySelector("pre");if(h){const y=document.createRange();y.selectNodeContents(h);const D=window.getSelection();D.removeAllRanges(),D.addRange(y)}}catch{}}}),o?.addEventListener("click",()=>{const i=o.querySelector(".btn-text")?.textContent||"Скачать",c=o.querySelector(".btn-text");try{const q=new Blob([f],{type:"application/json;charset=utf-8"}),h=URL.createObjectURL(q),y=document.createElement("a");y.href=h,y.download=`shopsage-data-${new Date().toISOString().slice(0,19).replace(/[:.]/g,"-")}.json`,document.body.appendChild(y),y.click(),y.remove(),URL.revokeObjectURL(h),o.classList.add("btn-success"),c&&(c.textContent="Скачано!"),setTimeout(()=>{o.classList.remove("btn-success"),c&&(c.textContent=i)},1500)}catch(q){o.classList.add("btn-error"),c&&(c.textContent="Ошибка!"),setTimeout(()=>{o.classList.remove("btn-error"),c&&(c.textContent=i)},1500),console.error("Download failed:",q)}}),a?.addEventListener("click",i=>{i.preventDefault();try{window.open(n,"_blank","noopener,noreferrer")}catch(c){console.warn("Could not open product URL:",c)}});function m(i){i.key==="Escape"&&d()}return document.addEventListener("keydown",m),r.addEventListener("click",i=>{i.target===r&&d()}),r}function Le(e,s={}){const r={...{autoAnalyze:!1,serverSend:!1,minReviews:5,language:"ru",analysisDepth:"medium",showRating:!0,debugMode:!1,saveHistory:!1,darkMode:!0},...s},l=e.getElementById?e.getElementById("ss-settings-modal"):e.querySelector("#ss-settings-modal");if(l)try{l.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>l.remove(),200)}catch{l.remove()}const n=document.createElement("div");n.id="ss-settings-modal",n.innerHTML=`
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

                <div class="setting-option">
                    <label>
                        <input type="checkbox" id="set-auto-analyze" ${r.autoAnalyze?"checked":""}>
                        Автоматически анализировать при загрузке страницы
                    </label>
                </div>

                <div class="setting-option">
                    <label>
                        <input type="checkbox" id="set-server-send" ${r.serverSend?"checked":""}>
                        По умолчанию отправлять данные на сервер
                    </label>
                </div>

                <div class="setting-option">
                    <label style="flex-direction: column; align-items: flex-start; gap: 6px;">
                        <span>Минимальное количество отзывов для анализа: <span class="range-value" id="min-reviews-value">${r.minReviews}</span></span>
                        <input type="range" id="set-min-reviews" min="1" max="20" value="${r.minReviews}" style="width: 100%;">
                    </label>
                </div>
            </div>

            <div class="setting-group">
                <div class="setting-title">Качество анализа</div>
                <div class="setting-desc">Выберите глубину анализа отзывов</div>

                <div class="setting-option">
                    <label>
                        <input type="radio" name="analysis-depth" value="fast" ${r.analysisDepth==="fast"?"checked":""}>
                        Быстрый анализ (поверхностный)
                    </label>
                </div>

                <div class="setting-option">
                    <label>
                        <input type="radio" name="analysis-depth" value="medium" ${r.analysisDepth==="medium"?"checked":""}>
                        Стандартный анализ (рекомендуется)
                    </label>
                </div>

                <div class="setting-option">
                    <label>
                        <input type="radio" name="analysis-depth" value="deep" ${r.analysisDepth==="deep"?"checked":""}>
                        Глубокий анализ (медленнее, но точнее)
                    </label>
                </div>
            </div>

            <div class="setting-group">
                <div class="setting-title">Интерфейс</div>
                <div class="setting-desc">Настройки отображения и языка</div>

                <div class="setting-option">
                    <label>
                        <input type="checkbox" id="set-show-rating" ${r.showRating?"checked":""}>
                        Показывать рейтинг товара
                    </label>
                </div>

                <div class="setting-option">
                    <label style="flex-direction: column; align-items: flex-start; gap: 6px;">
                        <span>Язык интерфейса:</span>
                        <select id="set-language" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); color: var(--text); padding: 6px 8px; border-radius: 6px; font-size: 12px;">
                            <option value="ru" ${r.language==="ru"?"selected":""}>Русский</option>
                            <option value="en" ${r.language==="en"?"selected":""}>English</option>
                            <option value="auto" ${r.language==="auto"?"selected":""}>Автоопределение</option>
                        </select>
                    </label>
                </div>
            </div>

            <div class="setting-group">
                <div class="setting-title">Дополнительно</div>
                <div class="setting-desc">Экспериментальные и расширенные функции</div>

                <div class="setting-option">
                    <label>
                        <input type="checkbox" id="set-debug-mode" ${r.debugMode?"checked":""}>
                        Режим отладки (показывать техническую информацию)
                    </label>
                </div>

                <div class="setting-option">
                    <label>
                        <input type="checkbox" id="set-save-history" ${r.saveHistory?"checked":""}>
                        Сохранять историю анализов (в памяти браузера)
                    </label>
                </div>
            </div>
        </div>

        <div class="sm-actions">
            <button class="btn-save" title="Сохранить настройки">
                <span>💾</span>
                <span class="btn-text">Сохранить</span>
            </button>
            <button class="btn-reset" title="Сбросить к значениям по умолчанию">
                <span class="btn-text">Сбросить</span>
            </button>
            <button class="btn-close-action" title="Закрыть без сохранения">Отмена</button>
        </div>
    `,e.appendChild(n);const f=n.querySelector(".sm-close"),g=n.querySelector(".btn-close-action"),p=n.querySelector(".btn-save"),v=n.querySelector(".btn-reset"),L=n.querySelector("#set-min-reviews"),M=n.querySelector("#min-reviews-value");L?.addEventListener("input",o=>{const a=o.currentTarget?.value??r.minReviews;M&&(M.textContent=String(a))});function N(){try{n.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>{try{n.remove()}catch{}},200)}catch{try{n.remove()}catch{}}document.removeEventListener("keydown",k)}function E(){return{autoAnalyze:!!n.querySelector("#set-auto-analyze")?.checked,serverSend:!!n.querySelector("#set-server-send")?.checked,minReviews:parseInt(n.querySelector("#set-min-reviews")?.value,10)||5,language:n.querySelector("#set-language")?.value||"ru",analysisDepth:n.querySelector('input[name="analysis-depth"]:checked')?.value||"medium",showRating:!!n.querySelector("#set-show-rating")?.checked,debugMode:!!n.querySelector("#set-debug-mode")?.checked,saveHistory:!!n.querySelector("#set-save-history")?.checked}}function z(){n.querySelector("#set-auto-analyze").checked=!1,n.querySelector("#set-server-send").checked=!1,n.querySelector("#set-min-reviews").value=5,n.querySelector("#min-reviews-value").textContent="5",n.querySelector("#set-language").value="ru",n.querySelector('input[name="analysis-depth"][value="medium"]').checked=!0,n.querySelector("#set-show-rating").checked=!0,n.querySelector("#set-debug-mode").checked=!1,n.querySelector("#set-save-history").checked=!1}f?.addEventListener("click",N),g?.addEventListener("click",N),v?.addEventListener("click",()=>{z();const o=v.querySelector(".btn-text")?.textContent||"Сбросить",a=v.querySelector(".btn-text");a&&(a.textContent="Сброшено!"),setTimeout(()=>{a&&(a.textContent=o)},1e3)}),p?.addEventListener("click",()=>{const o=E(),a=new CustomEvent("settingsChanged",{detail:o,bubbles:!0,composed:!0});try{e.dispatchEvent(a)}catch{n.dispatchEvent(a)}const d=p.querySelector(".btn-text")?.textContent||"Сохранить",m=p.querySelector(".btn-text");p.classList.add("btn-success"),m&&(m.textContent="Сохранено!"),setTimeout(()=>{p.classList.remove("btn-success"),m&&(m.textContent=d),N()},1200)});function k(o){o.key==="Escape"&&N()}return document.addEventListener("keydown",k),n}function me(e,{maxLength:s=2e3}={}){if(e==null)return"";let t=String(e);return t=t.replace(/^\s*\S+\s+\S+\s*/,"[имя удалено]"),t=t.replace(/\u00A0/g," ").replace(/\s+/g," ").trim(),t=t.replace(/\[телефон (удалён|удалено)\]/gi,"[телефон удалён]"),t=t.replace(/\[email (удалён|удалено)\]/gi,"[email удалён]"),t=t.replace(/\[url (удалён|удалено)\]/gi,"[url удалён]"),t=t.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi,"[email удалён]"),t=t.replace(/\b([A-Za-z0-9._%+-]+)\s*(?:\[at\]|\(at\)|\sat\s|&#x40;)\s*([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/gi,"[email удалён]"),t=t.replace(/https?:\/\/[^\s"']+/gi,"[url удалён]"),t=t.replace(/\bwww\.[^\s"']+\b/gi,"[url удалён]"),t=t.replace(/\b(?:t\.me|telegram\.me|telegram|vk\.com|vk)\b[\/:]?[A-Za-z0-9_.-]*/gi,"[url удалён]"),t=t.replace(/@[A-Za-z0-9_.-]{1,80}/g,"[ник удалён]"),t=t.replace(/\b[A-Za-z0-9._-]{3,}#\d{2,6}\b/g,"[ник удалён]"),t=t.replace(/(?:(?:\+?\d{1,3}[-.\s\/]?)?(?:\(?\d{1,4}\)?[-.\s\/]?){1,6}\d{1,4})(?=(?:\D|$))/g,r=>(r.match(/\d/g)||[]).length>=6?"[телефон удалён]":r),t=t.replace(/\b\d{6,}\b/g,"[id удалён]"),t=t.replace(/\bИмя\s+скрыто\b/gi,"[имя удалено]"),t=t.replace(/\bИмя\s+удалено\b/gi,"[имя удалено]"),t=t.replace(/\bПользователь\b/gi,"[пользователь]"),t=t.replace(/\bПокупатель\b/gi,"[пользователь]"),t=t.replace(/\bАноним\b/gi,"[пользователь]"),t=t.replace(/\bGuest\b/gi,"[пользователь]"),t=t.replace(/\b[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}\s+[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}(?:\s+[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30})?\b/gu,"[имя удалено]"),t=t.replace(/\b[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}\s+[A-ЯA-ZА-ЯЁ]\.(?:\s*[A-ЯA-Z]\.)?\b/gu,"[имя удалено]"),t=t.replace(/\b[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}\s+[A-ЯA-ZА-ЯЁ]\b/gu,"[имя удалено]"),t=t.replace(/\b[A-ЯA-ZА-ЯЁ]\.\s*[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}\b/gu,"[имя удалено]"),t=t.replace(/^(?:\s*)([А-ЯЁA-Z][а-яёa-zA-Z-]{2,30})(?=\s+(?:\d{1,2}\s+|[A-Za-zА-Яа-я]))/u,"[имя удалено]"),t=t.replace(/\b[А-ЯЁA-Z][а-яёa-zA-Z-]{2,30}\s+[A-ЯЁA-Z][а-яёa-zA-Z-]{0,30}(?=\s+\d{1,2}\s+(?:янв|фев|мар|апр|май|июн|июл|авг|сен|окт|ноя|дек|января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря))/giu,"[имя удалено]"),t=t.replace(/\s+/g," ").trim(),t.length>s&&(t=t.slice(0,s-1)+"…"),t}function ae(e=20){if(window.location.hostname.includes("market.yandex")||document.title.includes("Яндекс.Маркет")||document.querySelector('[data-baobab-name*="market"]')){const n=ze(15e3);return(n&&n.reviews?n.reviews:[]).map(g=>{const p=typeof g=="string"?g:g&&(g.text||g.review||"")||"";return{raw:p,anon:me(String(p))}}).filter(g=>g.raw&&g.raw.length>30).map(g=>g.anon).slice(0,e)}const t=['[data-zone-name="review"]','[data-autotest-id="review-card"]',".review__item",".product-review",".review",".comments-item",'[data-test-id*="review"]',".feedback",".pa-review",".review-item",".reviewCard"];let r=[];for(const n of t){const f=document.querySelectorAll(n);if(f&&f.length){r=Array.from(f);break}}const l=r.map(n=>{const g=(n?.textContent||n?.innerText||"").trim();return g?me(g):""}).filter(n=>n&&n.length>30).slice(0,e);return console.debug("ShopSage: Standard extraction found",l.length,"reviews"),l}function fe(e){return e==null?"—":`${Math.round(e*10)/10} <svg class="star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.167L12 18.896l-7.336 3.868 1.402-8.167L.132 9.21l8.2-1.192z"/></svg>`}const Me=`<aside\r
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
				id="ss-settings"\r
				class="ss-close"\r
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
`,Ne=`:host {\r
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
.ss-close {\r
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
#ss-preview-modal .btn-close-action {\r
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
#ss-preview-modal .btn-close-action:hover {\r
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
`,$e={autoAnalyze:!1,serverSend:!1,minReviews:5,language:"ru",analysisDepth:"medium",showRating:!0,debugMode:!1,saveHistory:!1};function _(){if(document.getElementById(W)){const u=document.getElementById(W)._hostElement;if(!u)return;u.style.opacity==="1"?se():(u.style.opacity="1",u.style.transform="translateY(0) scale(1)");return}const e=document.createElement("div");e.id=W,Object.assign(e.style,{all:"initial",position:"fixed",right:"20px",top:"60px",zIndex:"2147483647",pointerEvents:"auto"});const s=e.attachShadow({mode:"open"});e._hostElement=e;const t=document.createElement("style");t.textContent=Ne,s.appendChild(t);const r=document.createElement("div");r.innerHTML=Me,s.appendChild(r);const l=s.querySelector("#ss-logo");l&&(l.src=chrome.runtime.getURL("assets/icons/icon.svg")),document.body.appendChild(e);const n=s,f=n.querySelector(".shopsage-sidebar"),g=n.querySelector(".ss-close"),p=n.querySelector("#ss-analyze"),v=n.querySelector("#ss-loader"),L=n.querySelector("#ss-count"),M=n.querySelector("#ss-result"),N=n.querySelector("#ss-pros"),E=n.querySelector("#ss-cons"),z=n.querySelector("#ss-verdict"),k=n.querySelector("#ss-rating"),o=n.querySelector("#ss-total"),a=n.querySelector("#ss-error"),d=n.querySelector("#ss-score-container"),m=n.querySelector("#ss-score-badge"),i=n.querySelector("#ss-score-bar-inner"),c=n.querySelector("#ss-score-sub"),q=n.querySelector("#ss-send-server"),h=n.querySelector("#ss-preview-payload"),y=n.querySelector("#ss-settings");q&&q.addEventListener("change",b=>{const u=!!b.target.checked;chrome.storage.sync.set({sendToServer:u})}),h&&h.addEventListener("click",async()=>{try{h.disabled=!0;const b=await qe();Ce(n,b)}catch(b){console.error("preview error",b),alert("Ошибка при формировании превью: "+String(b))}finally{h.disabled=!1}}),n.addEventListener("settingsChanged",b=>{try{const u=b?.detail||{};chrome.storage.sync.set({userSettings:u,sendToServer:!!u.serverSend},()=>{console.log("Saved settings from modal:",u)}),q&&(q.checked=!!u.serverSend)}catch(u){console.error("Failed to handle settingsChanged:",u)}}),y&&y.addEventListener("click",async()=>{try{y.disabled=!0,Le(n,$e)}catch(b){console.error("settings modal error",b),alert("Ошибка при открытии настроек: "+String(b))}}),requestAnimationFrame(()=>{Object.assign(e.style,{opacity:"0",transform:"translateY(8px) scale(.995)",transition:"opacity .28s cubic-bezier(.2,.9,.2,1), transform .36s cubic-bezier(.2,.9,.2,1)"}),setTimeout(()=>{e.style.opacity="1",e.style.transform="translateY(0) scale(1)"},20)}),g&&g.addEventListener("click",se),p&&p.addEventListener("click",be);const D=ae();L&&(L.innerText=D.length);const O=pe();k&&(k.innerHTML=fe(O.avgRating)),o&&(o.innerText=O.totalRatings!=null?O.totalRatings:"—");function P(b){a&&(a.innerText=b,Q(a),setTimeout(()=>{Y(a)},5e3))}function be(b){p&&(p.disabled=!0),v&&Q(v),M&&Y(M),d&&Y(d),c&&Y(c),a&&Y(a);const u=15e3,F=`

`;chrome.storage.sync.get({maxReviews:40,serverUrl:""},H=>{const te=Number.isFinite(Number(H.maxReviews))&&Number(H.maxReviews)>0?Number(H.maxReviews):40,G=ae(te);if(G.length===0){v&&Y(v),p&&(p.disabled=!1),P("Не найдено отзывов на странице. Попробуйте прокрутить страницу или перейти на страницу с отзывами.");return}const I=[];let B="";for(let R=0;R<G.length;R++){const C=G[R]||"";if(C)if(B.length===0)if(C.length<=u)B=C,I.push(C);else{const S=C.slice(0,u-1)+"…";B=S,I.push(S);break}else if(B.length+F.length+C.length<=u)B=B+F+C,I.push(C);else break}const K=pe();k&&(k.innerHTML=fe(O.avgRating)),o&&(o.innerText=K.totalRatings!=null?K.totalRatings:"—");const j=I,A={url:location.href,title:document.title,totalRatings:K.totalRatings,avgRating:K.avgRating};console.log("ShopSage: Sending analysis request",{reviewCount:j.length,product:A,serverUrl:H.serverUrl||"default"}),chrome.runtime.sendMessage({action:Ae,reviews:j,product:A,serverUrl:H.serverUrl||""},R=>{if(chrome.runtime.lastError){console.error("ShopSage: runtime.lastError",chrome.runtime.lastError),v&&Y(v),p&&(p.disabled=!1),P("Ошибка связи с расширением. Перезагрузите страницу и попробуйте снова.");return}if(v&&Y(v),p&&(p.disabled=!1),!R){console.error("ShopSage: Empty response from background"),P("Не получен ответ от сервера. Проверьте настройки или попробуйте позже.");return}if(!R.ok){console.error("ShopSage: Analysis failed",R);let S="Ошибка анализа";R.error?S=R.error:R.message&&(S=R.message),S.includes("fetch failed")||S.includes("Failed to fetch")?S="Не удалось подключиться к серверу. Проверьте URL сервера в настройках.":S.includes("timeout")?S="Превышено время ожидания ответа от сервера.":S.includes("404")?S="Сервер не найден. Проверьте URL в настройках.":(S.includes("500")||S.includes("502")||S.includes("503"))&&(S="Ошибка сервера. Попробуйте позже."),P(S);return}const C=R.data||{};console.info("ShopSage: Analysis successful",R),ve(C,A,j.length)})})}function ve(b,u={},F=0){a&&Y(a);const H=Array.isArray(b.pros)?b.pros:[],te=Array.isArray(b.cons)?b.cons:[];N&&(N.innerHTML="",H.forEach((x,T)=>{const w=document.createElement("li");w.innerHTML='<div class="tag">'+(T+1)+'</div><div class="snippet"></div>',w.querySelector(".snippet").innerText=x,N.appendChild(w)})),E&&(E.innerHTML="",te.forEach((x,T)=>{const w=document.createElement("li");w.innerHTML='<div class="tag">'+(T+1)+'</div><div class="snippet"></div>',w.querySelector(".snippet").innerText=x,E.appendChild(w)}));let G=document.querySelector('[data-auto="rating"]');G&&(u.avgRating=parseFloat(G.textContent.trim().replace(",","."))),z&&(z.innerText=b.verdict||"Нет явного вердикта");let Z=u&&u.avgRating!=null?Number(u.avgRating):u&&u.rating!=null?Number(u.rating):null,I=u&&u.totalRatings!=null?Number(u.totalRatings):u&&u.totalReviews!=null?Number(u.totalReviews):null;try{if(typeof re=="function"){const x=re();x&&(Z==null&&x.avg!=null&&(Z=x.avg),I==null&&x.totalRatings!=null&&(I=x.totalRatings))}}catch{}const B=typeof re=="function"?re():null,K=I||u&&(u.totalReviews||0)||0,j=Z??(u&&(u.avgRating||u.rating)?u.avgRating||u.rating:null);let A=Math.max(0,Number(K||0)),R=0,C=null,S=null,V=null;if(B){const x={};let T=!1;for(let w=1;w<=5;w++){const U=B[String(w)];U!=null&&Number.isFinite(Number(U))&&Number(U)>0?(x[w]=Number(U),T=!0):x[w]=0}T&&(V=x),Z==null&&B.avg!=null&&(Z=B.avg),I==null&&B.totalRatings!=null&&(I=B.totalRatings)}if(V)R=Number(V[5]||0)+Number(V[4]||0),A=Object.keys(V).reduce((x,T)=>x+Number(V[T]||0),0),S=A>0?R/A:null,C=Z!=null?Z/5:S??.5;else if(A>0&&j!=null){const x=Math.max(0,Math.min(1,(j-1)/4));R=Math.round(x*A),S=A>0?R/A:null,C=j/5}else{const x=Array.isArray(b.pros)?b.pros.length:0,T=Array.isArray(b.cons)?b.cons.length:0;if(x+T>0){const w=x/(x+T);A=Math.max(A,x+T),R=Math.round(w*A),S=w,C=w}else{A=Math.max(A,F||0);const w=.5;R=Math.round(w*A),S=w,C=C??w}}const he=2,xe=2,ce=he+R,we=xe+(A-R),ne=ce/(ce+we);function ye(x,T,w=1.96){if(T===0)return{low:0,high:1};const U=x/T,ie=w*w,de=1+ie/T,ge=U+ie/(2*T),ue=w*Math.sqrt((U*(1-U)+ie/(4*T))/T),Se=Math.max(0,(ge-ue)/de),ke=Math.min(1,(ge+ue)/de);return{low:Se,high:ke}}const oe=ye(R,Math.max(1,A));C==null&&(C=ne);const J=Math.round((ne*.6+C*.4)*100);let X="",ee="";if(J>=75?(X="Однозначно стоит выбрать",ee="linear-gradient(90deg,#a3e635,#10b981)"):J>=60?(X="В целом рекомендуем",ee="linear-gradient(90deg,#facc15,#84cc16)"):J>=45?(X="Стоит взвесить плюсы и минусы",ee="linear-gradient(90deg,#f59e0b,#f97316)"):(X="Лучше поискать альтернативу",ee="linear-gradient(90deg,#ef4444,#ea580c)"),d&&Q(d),m&&(m.innerText=J+"%",m.style.background=ee),i&&(i.style.width=J+"%"),c){Q(c);const x=Math.round(oe.low*100),T=Math.round(oe.high*100),w=A>0?A:F||"—",U=Z!=null?`${Z}`:"—";c.innerText=`${X} — вероятность успеха ≈ ${Math.round(ne*100)}% (интервал ${x}–${T}%), на основе ${w} оценок; положительных (4–5★): ${R}. Средний рейтинг: ${U}★.`}L&&(F!=null&&F!==0?L.innerText=`${F} из ${I??"—"}`:L.innerText=I??"—"),M&&(Q(M),setTimeout(()=>M.classList.add("show"),30)),console.info("ShopSage: stats",{n:A,k:R,estPosRate:S,posteriorMean:ne,wilson:oe,composite:J,rec:X,pageAvg:Z,pageTotalRatings:I,prosCount:H.length,consCount:te.length})}e._shadow=s,e._container=f;function Y(b){b.classList.remove("visible"),b.classList.add("hidden")}function Q(b){requestAnimationFrame(()=>{b.classList.remove("hidden"),b.classList.add("visible")})}}function se(){const e=document.getElementById(W);e&&(e.style.opacity="0",e.style.transform="translateY(8px) scale(.995)",setTimeout(()=>{try{const s=document.getElementById(W);s&&s.remove()}catch{}},300))}function Ie(e,s,t){try{const r=e.config||{};if(chrome&&chrome.storage&&chrome.storage.sync)return chrome.storage.sync.set({serverUrl:r.serverUrl||"",maxReviews:r.maxReviews!=null?r.maxReviews:void 0},()=>{try{if(typeof _=="function"){try{_(),t&&t({ok:!0,message:"openSidebar() called"})}catch(n){console.warn("openSidebar call failed",n),t&&t({ok:!1,error:String(n)})}return}if(typeof window.openSidebar=="function")try{window.openSidebar(),t&&t({ok:!0,message:"window.openSidebar() called"});return}catch{}if(typeof window.createSidebar=="function")try{window.createSidebar(),t&&t({ok:!0,message:"window.createSidebar() called"});return}catch{}const l=document.getElementById(le)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2")||document.getElementById("shopsage-open-btn-v3");if(l)try{l.click(),t&&t({ok:!0,message:"button clicked"});return}catch(n){t&&t({ok:!1,message:"failed to click button",error:String(n)});return}t&&t({ok:!1,message:"no sidebar open API found"})}catch(l){console.error("handleOpenSidebarMessage inner error",l),t&&t({ok:!1,error:String(l)})}}),!0;try{typeof _=="function"?(_(),t&&t({ok:!0,message:"openSidebar() called (no storage)"})):t&&t({ok:!1,message:"storage unavailable and openSidebar missing"})}catch(l){t&&t({ok:!1,error:String(l)})}}catch(r){console.error("handleOpenSidebarMessage error",r);try{t&&t({ok:!1,error:String(r)})}catch{}}return!1}function Be(e,s,t){try{if(!e||!e.action)return;if(e.action==="OPEN_SIDEBAR")return Ie(e,s,t)}catch(r){console.error("handleRuntimeMessage error",r);try{t&&t({ok:!1,error:String(r)})}catch{}}return!1}try{chrome&&chrome.runtime&&chrome.runtime.onMessage&&chrome.runtime.onMessage.addListener(Be)}catch{}if(!window.__shopSageInitialized){try{typeof _=="function"&&(window.openSidebar=_),typeof se=="function"&&(window.closeSidebar=se),typeof _=="function"&&(window.createSidebar=_)}catch{}try{Re({ROOT_ID:W,BTN_ID:le,ICON_PATH:Ee,onOpenSidebar:typeof _=="function"?_:()=>{const e=document.getElementById(le)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2");if(e)try{e.click()}catch{}}})}catch(e){console.error("ShopSage: initContent failed",e)}window.__shopSageInitialized=!0}export{se as closeSidebar,_ as openSidebar};
