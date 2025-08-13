import{initContent as Te}from"./content-Bs6sxtKl.js";const te="shopsage-root-v3",pe="shopsage-open-btn-v3",Le="ANALYZE",Me=chrome&&chrome.runtime&&chrome.runtime.getURL?chrome.runtime.getURL("assets/icons/icon.svg"):"/assets/icons/icon.svg";function Y(e){if(e==null)return null;const a=String(e).trim();if(!a)return null;const n=a.match(/([\d.,]+)\s*[Kk]/);if(n){const t=parseFloat(n[1].replace(",","."));if(Number.isFinite(t))return Math.round(t*1e3)}const r=a.replace(/\s+/g,"").replace(/[^0-9\.,]/g,"").replace(",","."),d=parseFloat(r);return Number.isFinite(d)?d:null}function xe(){const e={totalReviews:null,rating:null,totalRatings:null,avgRating:null};try{try{const r=document.querySelector('meta[itemprop="reviewCount"], meta[name="reviewCount"], meta[name="reviews"]');r&&r.content&&(e.totalReviews=Math.round(Y(r.content))||null)}catch{}try{const r=document.querySelector('meta[itemprop="ratingValue"], meta[name="rating"], meta[itemprop="rating"]');r&&r.content&&(e.rating=Math.round(Y(r.content)*100)/100||null)}catch{}const a=['[data-auto="rating-count-text"]',".rating-count",".reviews-count",".votes-count",".ratings-count",".rating__count",".rate__count",".count-ratings",'[data-test="ratings-count"]'];for(const r of a)try{const d=document.querySelector(r);if(d&&(d.innerText||d.textContent)){const t=Y(d.innerText||d.textContent);if(t!=null){e.totalRatings=Math.round(t);break}}}catch{}if(e.totalRatings==null){const r=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const d of r){const x=(d.getAttribute("aria-label")||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голос|голосов|votes|ratings)/i);if(x){e.totalRatings=Math.round(Y(x[1]));break}}}if(e.totalRatings==null){const d=(document.body.innerText||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голосов|votes|ratings)/i);d&&(e.totalRatings=Math.round(Y(d[1])))}const n=['[data-auto="rating"]','[data-auto="rating-value"]',".average-rating",".avg-rating",".rating-value",".rating__value",".product-rating",".ds-text_weight_bold"];for(const r of n)try{const d=document.querySelector(r);if(d&&(d.innerText||d.textContent)){const t=Y(d.innerText||d.textContent);if(t!=null){e.avgRating=Math.round(t*100)/100;break}}}catch{}if(e.avgRating==null){const r=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const d of r){const x=(d.getAttribute("aria-label")||"").match(/([0-5](?:[.,][0-9])?)\s*(зв|звезды|рейтинг|rating)/i);if(x){e.avgRating=Y(x[1]);break}}}if(e.avgRating==null){const d=(document.body.innerText||"").match(/(?:средн(?:ий|ая)\s*рейтинг|рейтинг|rating)[:\s]*([0-5](?:[.,][0-9])?)/i);d&&(e.avgRating=Y(d[1]))}try{const r=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(r){const d=r.getAttribute("ratingvalue")||r.getAttribute("data-ratingvalue"),t=r.getAttribute("ratingcount")||r.getAttribute("data-ratingcount")||r.getAttribute("raitingcounttext")||r.getAttribute("data-ratingcounttext"),x=r.getAttribute("reviewcount")||r.getAttribute("data-reviewcount")||r.getAttribute("reviewcounttext")||r.getAttribute("data-reviewcounttext");if(d&&e.avgRating==null&&(e.avgRating=Y(d)),t&&e.totalRatings==null){const m=String(t).match(/([0-9\s,.Kk]+)/);if(m){const f=m[1].replace(/\s+/g,"");e.totalRatings=Math.round(Y(f))}}if(x&&e.totalReviews==null){const m=String(x).match(/([0-9\s,.Kk]+)/);m&&(e.totalReviews=Math.round(Y(m[1])))}}}catch{}try{if(typeof window.extractRatingBreakdown=="function"){const r=window.extractRatingBreakdown();r&&(e.avgRating==null&&r.avg!=null&&(e.avgRating=r.avg),e.totalRatings==null&&r.totalRatings!=null&&(e.totalRatings=r.totalRatings),e.totalReviews==null&&r.totalReviews!=null&&(e.totalReviews=r.totalReviews))}}catch{}}catch(a){console.warn("extractProductMeta error",a)}return e.totalRatings==null&&e.totalReviews!=null&&(e.totalRatings=e.totalReviews),e.avgRating==null&&e.rating!=null&&(e.avgRating=e.rating),e.totalRatings=typeof e.totalRatings=="number"&&Number.isFinite(e.totalRatings)?Math.round(e.totalRatings):null,e.avgRating=typeof e.avgRating=="number"&&Number.isFinite(e.avgRating)?Math.round(e.avgRating*100)/100:null,e.totalReviews=e.totalReviews||null,e.rating=e.rating||null,e}function ae(){const e={5:null,4:null,3:null,2:null,1:null,avg:null,totalRatings:null,totalReviews:null};try{const a=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(a){const x=a.getAttribute("ratingvalue")||a.getAttribute("data-ratingvalue"),m=a.getAttribute("ratingcount")||a.getAttribute("data-ratingcount")||a.getAttribute("raitingcounttext"),f=a.getAttribute("reviewcount")||a.getAttribute("data-reviewcount")||a.getAttribute("reviewcounttext");x&&(e.avg=parseFloat(String(x).replace(",","."))||e.avg),m&&(e.totalRatings=Y(m)||e.totalRatings),f&&(e.totalReviews=Y(f)||e.totalReviews)}const n=document.querySelector('[data-auto="rating-count-text"], [data-auto="ratingCount"], .rating-count, .ds-text[data-auto="rating-count-text"]'),r=document.querySelector('[data-auto="review-count-text"], .review-count, .ds-text[data-auto="review-count-text"]');n&&!e.totalRatings&&(e.totalRatings=Y(n.innerText||n.textContent)||e.totalRatings),r&&!e.totalReviews&&(e.totalReviews=Y(r.innerText||r.textContent)||e.totalReviews);const d=[".rating-breakdown",".rating-histogram",".rating-list",".rating-distribution",'[data-auto="rating-breakdown"]',".review-stats",".rating-row",".ratingRow",".ds-rating-list"];for(const x of d){const m=document.querySelector(x);if(!m)continue;const f=Array.from(m.querySelectorAll("*"));let b=0;for(const q of f){const S=(q.textContent||"").trim(),L=S.match(/^\s*([1-5])\D{0,6}([0-9\s,.Kk]{1,12})\s*$/);if(L){const E=Number(L[1]),R=Y(L[2]);E>=1&&E<=5&&R!=null&&(e[E]=R,b++)}else{const E=S.match(/^\s*([1-5])\s*$/);if(E){const R=Number(E[1]);let w=null;const i=q.nextElementSibling||q.parentElement&&q.parentElement.querySelector(".count, .value, .number, .ds-text");i&&(w=Y(i.textContent||i.innerText)),w!=null&&(e[R]=w,b++)}}}if(b>0)break}const t=Array.from(document.querySelectorAll('noframes[data-apiary="patch"]')||[]);for(const x of t){const m=(x.textContent||"").trim();if(m)try{const f=JSON.parse(m);if(f.collections&&f.collections.businessReviewStats){const E=Object.keys(f.collections.businessReviewStats);if(E.length){const R=f.collections.businessReviewStats[E[0]];if(R&&(R.reviewsCount&&!e.totalReviews&&(e.totalReviews=Number(R.reviewsCount)||e.totalReviews),R.reviewsCountVisualization&&!e.totalRatings)){const w=String(R.reviewsCountVisualization).match(/([\d.,]+)K/i);w&&(e.totalRatings=Math.round(parseFloat(w[1].replace(",","."))*1e3))}}}const b=m,q=b.match(/"ratingvalue"\s*:\s*"?([0-9.,]+)"?/i),S=b.match(/"ratingcount"\s*:\s*(\d+)/i),L=b.match(/"reviewcount"\s*:\s*(\d+)/i);q&&(e.avg=parseFloat(q[1].replace(",","."))||e.avg),S&&(e.totalRatings=Number(S[1])||e.totalRatings),L&&(e.totalReviews=Number(L[1])||e.totalReviews)}catch{}}}catch{}return["5","4","3","2","1"].forEach(a=>{e[a]==null&&(e[a]=null)}),e.avg!=null&&(e.avg=Math.round(Number(e.avg)*100)/100),e.totalRatings!=null&&(e.totalRatings=Math.round(Number(e.totalRatings))),e.totalReviews!=null&&(e.totalReviews=Math.round(Number(e.totalReviews))),e}function Ie(e=15e3){const a={reviews:[],totalFound:0,charactersUsed:0,extractionMethods:[]};try{let n=function(){const i=['[data-auto="reviews-show-more"]','[data-autotest-id*="show-more"]',".reviews-show-more",".show-more",".load-more","button"],o=new Set;for(const u of i)try{Array.from(document.querySelectorAll(u)).forEach(s=>{try{if(!(s instanceof HTMLElement))return;const c=window.getComputedStyle(s);if(c.display==="none"||c.visibility==="hidden"||s.disabled)return;const k=(s.innerText||s.textContent||"").trim();(/показать|еще|ещё|загрузить|more|show/i.test(k)||u.indexOf("show-more")>=0||u.indexOf("reviews-show-more")>=0)&&!o.has(s)&&(s.click(),o.add(s),setTimeout(()=>{try{s.disabled||s.click()}catch{}},900))}catch{}})}catch{}try{const u=document.querySelector('[data-zone-name="reviews"], [data-auto="ugc-section"], .reviews, .n-reviews, .review-list, [data-auto="reviews"]');if(u)try{u.scrollIntoView({behavior:"smooth"}),u.scrollTop=u.scrollHeight}catch{}else window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})}catch{}},r=function(){const i=['button[class*="expand"]','button[class*="show-full"]','[data-auto*="expand"]',".review-expand",".opinion-expand",'button:contains("Развернуть")','button:contains("Показать полностью")','button:contains("Читать полностью")','[class*="read-more"]'];for(const o of i)try{document.querySelectorAll(o).forEach(h=>{try{h.offsetHeight>0&&h.click()}catch{}})}catch{}},d=function(){const i=[];try{document.querySelectorAll("script").forEach(h=>{if(!h.textContent)return;[/"reviews":\s*\[(.*?)\]/gs,/"opinions":\s*\[(.*?)\]/gs,/"reviewText":\s*"([^"]+)"/g,/"text":\s*"([^"]+)"/g,/"comment":\s*"([^"]+)"/g].forEach(c=>{const k=h.textContent.matchAll(c);for(const y of k)try{if(y[1]&&y[1].length>30){const g=y[1].replace(/\\n/g," ").replace(/\\"/g,'"').replace(/\\\\/g,"\\").trim();g.length>30&&i.push(g)}}catch{}})}),document.querySelectorAll("[data-bem]").forEach(h=>{try{Object.values(h.dataset).forEach(s=>{if(!(!s||s.length<100))try{const c=JSON.parse(s),k=c.reviews||c.opinions;Array.isArray(k)&&k.forEach(y=>{const g=y.text||y.content||y.comment;g&&g.length>30&&i.push(String(g))})}catch{}})}catch{}})}catch{}return i},t=function(i){if(!i)return"";let o=String(i).replace(/\r\n|\r/g,`
`).replace(/\t/g," ").replace(/\u00A0/g," ");o=o.replace(/\s+/g," ").trim(),o=o.replace(/\b(?:\d+\s+){3,}\d+\b/g," "),o=o.replace(/\b\d{3,}\b/g," "),o=o.replace(/(?:\b\d+\b[\s,.-]*){3,}/g," ");try{o=o.replace(/[^\p{L}\p{N}\s\.,!?\-()«»—:;\/%]/gu," ")}catch{o=o.replace(/[^A-Za-zА-Яа-яЁё0-9\s\.,!?\-()«»—:;\/%]/g," ")}return o=o.replace(/([,!.?–—\-]){2,}/g,"$1"),o=o.replace(/\s+/g," ").trim(),o},x=function(i){if(!i)return"";const o=[".review-text",".opinion-text",".review-content",".comment-text",'[data-auto="review-text"]','[class*="text"]',"p",".content"];try{for(const s of o){const c=i.querySelector?i.querySelector(s):null;if(c&&c.innerText&&c.innerText.trim().length>20)return t(c.innerText)}}catch{}let u="";try{u=i.innerText||i.textContent||""}catch{u=""}return[/Достоинства:?\s*/gi,/Недостатки:?\s*/gi,/Комментарий:?\s*/gi,/Опыт использования:?\s*/gi,/Рекомендую\s*/gi,/Не рекомендую\s*/gi,/\d+\s*из\s*\d+\s*считают отзыв полезным/gi,/Был ли отзыв полезен\?/gi,/Да\s*\d*\s*Нет\s*\d*/gi,/\d+\s*звезд[ыа]?/gi,/Оценка:\s*\d+/gi].forEach(s=>{u=u.replace(s," ")}),t(u)},m=function(i){if(!i)return!1;const o=i.length;return!(o<40||(i.match(/\d/g)||[]).length/Math.max(1,o)>.3||(i.match(/[A-Za-zА-Яа-яЁё]/g)||[]).length<12||(i.match(/[А-Яа-яЁё]/g)||[]).length<Math.min(10,Math.floor(o*.2))||/^(source|businessId|notEmpty|id|source,)/i.test(i.trim()))},f=function(i){const o=new Set,u=[];return i.forEach(h=>{const s=h.text.toLowerCase().replace(/\s+/g,"").substring(0,100);o.has(s)||(o.add(s),u.push(h))}),u},b=function(i,o){const u=[];let h=0;const c=`

`.length,k=i.sort((y,g)=>g.length-y.length);for(const y of k){const g=y.length,H=h===0?g:g+c;if(h+H<=o)u.push(y),h+=H;else if(h===0){const D=y.substring(0,o-3)+"...";u.push(D),h=D.length;break}else{const D=o-h-c;if(D>50){const F=y.substring(0,D-3)+"...";u.push(F);break}else break}}return u};n(),r();const q=['[data-auto="review-item"]','[data-zone-name="review"]','[data-autotest-id="review-card"]','[data-tid="review-item"]','[data-auto="OpinionCard"]',".opinion",".review-item",".user-review",'[class*="review"]','[class*="opinion"]','[data-zone*="review"]',".n-review-card",".ProductReview",'iframe[src*="review"] + *','[data-bem*="review"]'],S=new Set;for(const i of q)try{const o=document.querySelectorAll(i);o.forEach(u=>{try{u&&u.innerText&&u.innerText.trim().length>20&&S.add(u)}catch{}}),o.length>0&&a.extractionMethods.push(`${i}: ${o.length} элементов`)}catch{}const L=d(),E=[];S.forEach(i=>{try{const o=x(i),u=t(o);m(u)&&E.push({text:u,source:"dom",length:u.length,element:i})}catch{}}),L.forEach(i=>{try{const o=t(i);m(o)&&E.push({text:o,source:"json",length:o.length})}catch{}});const R=f(E);R.sort((i,o)=>o.length-i.length);const w=b(R.map(i=>i.text),e);return a.reviews=w,a.totalFound=R.length,a.charactersUsed=w.reduce((i,o)=>i+(o?o.length:0),0),a}catch(n){return console.warn("extractYandexMarketReviews error",n),a}}function $e(e){if(!e)return"";let a=String(e);return a=a.replace(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi,"[email]"),a=a.replace(/(\+?\d[\d\-\s()]{6,}\d)/g,"[phone]"),a=a.replace(/https?:\/\/\S+/gi,"[url]"),a=a.replace(/\b\d{6,}\b/g,"[id]"),a.length>2e3&&(a=a.slice(0,2e3)+"…"),a.trim()}async function Ne(e=20){let a=[];try{typeof oe=="function"&&(a=oe(),Array.isArray(a)||(a=[]))}catch(t){console.error("Ошибка при извлечении отзывов:",t),a=[]}const n=a.slice(0,e).map((t,x)=>{const m=typeof t=="string"?t:t.text||"";return{id:x+1,text:$e(m),length:m.length}});let r={};try{typeof extractProductMeta=="function"&&(r=extractProductMeta()||{})}catch(t){console.error("Ошибка при извлечении мета данных продукта:",t),r={}}const d=await chrome.storage.sync.get({serverUrl:""});return{version:"1.0",source:location.hostname,serverUrlPreview:d.serverUrl||"",product:{url:location.href,title:document.title,avgRating:r.avgRating??null,totalRatings:r.totalRatings??null},reviewsCount:n.length,reviewsSample:n}}function he(e,{maxLength:a=2e3}={}){if(e==null)return"";let n=String(e);return n=n.replace(/^\s*\S+\s+\S+\s*/,"[имя удалено]"),n=n.replace(/\u00A0/g," ").replace(/\s+/g," ").trim(),n=n.replace(/\[телефон (удалён|удалено)\]/gi,"[телефон удалён]"),n=n.replace(/\[email (удалён|удалено)\]/gi,"[email удалён]"),n=n.replace(/\[url (удалён|удалено)\]/gi,"[url удалён]"),n=n.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi,"[email удалён]"),n=n.replace(/\b([A-Za-z0-9._%+-]+)\s*(?:\[at\]|\(at\)|\sat\s|&#x40;)\s*([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/gi,"[email удалён]"),n=n.replace(/https?:\/\/[^\s"']+/gi,"[url удалён]"),n=n.replace(/\bwww\.[^\s"']+\b/gi,"[url удалён]"),n=n.replace(/\b(?:t\.me|telegram\.me|telegram|vk\.com|vk)\b[\/:]?[A-Za-z0-9_.-]*/gi,"[url удалён]"),n=n.replace(/@[A-Za-z0-9_.-]{1,80}/g,"[ник удалён]"),n=n.replace(/\b[A-Za-z0-9._-]{3,}#\d{2,6}\b/g,"[ник удалён]"),n=n.replace(/(?:(?:\+?\d{1,3}[-.\s\/]?)?(?:\(?\d{1,4}\)?[-.\s\/]?){1,6}\d{1,4})(?=(?:\D|$))/g,r=>(r.match(/\d/g)||[]).length>=6?"[телефон удалён]":r),n=n.replace(/\b\d{6,}\b/g,"[id удалён]"),n=n.replace(/\bИмя\s+скрыто\b/gi,"[имя удалено]"),n=n.replace(/\bИмя\s+удалено\b/gi,"[имя удалено]"),n=n.replace(/\bПользователь\b/gi,"[пользователь]"),n=n.replace(/\bПокупатель\b/gi,"[пользователь]"),n=n.replace(/\bАноним\b/gi,"[пользователь]"),n=n.replace(/\bGuest\b/gi,"[пользователь]"),n=n.replace(/\b[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}\s+[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}(?:\s+[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30})?\b/gu,"[имя удалено]"),n=n.replace(/\b[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}\s+[A-ЯA-ZА-ЯЁ]\.(?:\s*[A-ЯA-Z]\.)?\b/gu,"[имя удалено]"),n=n.replace(/\b[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}\s+[A-ЯA-ZА-ЯЁ]\b/gu,"[имя удалено]"),n=n.replace(/\b[A-ЯA-ZА-ЯЁ]\.\s*[А-ЯЁA-Z][а-яёa-zA-Z-]{1,30}\b/gu,"[имя удалено]"),n=n.replace(/^(?:\s*)([А-ЯЁA-Z][а-яёa-zA-Z-]{2,30})(?=\s+(?:\d{1,2}\s+|[A-Za-zА-Яа-я]))/u,"[имя удалено]"),n=n.replace(/\b[А-ЯЁA-Z][а-яёa-zA-Z-]{2,30}\s+[A-ЯЁA-Z][а-яёa-zA-Z-]{0,30}(?=\s+\d{1,2}\s+(?:янв|фев|мар|апр|май|июн|июл|авг|сен|окт|ноя|дек|января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря))/giu,"[имя удалено]"),n=n.replace(/\s+/g," ").trim(),n.length>a&&(n=n.slice(0,a-1)+"…"),n}const ke="verdict:userSettings";async function se(e={}){try{const a={...e};return localStorage.setItem(ke,JSON.stringify(a)),!0}catch(a){return console.error("saveUserSettings error:",a),!1}}function ge(){try{const e=localStorage.getItem(ke);return e?JSON.parse(e)||{}:{}}catch(e){return console.warn("Ошибка чтения настроек из localStorage:",e),{}}}async function ye(){try{if(console.debug("[utils] isUserSubscribed: probing environment"),typeof window.isUserSubscribed=="function"){const e=window.isUserSubscribed();return e&&typeof e.then=="function"?!!await e:!!e}if(window.APP&&window.APP.user&&typeof window.APP.user.isSubscribed<"u")return!!window.APP.user.isSubscribed;try{const e=localStorage.getItem("IS_SUBSCRIBED")||localStorage.getItem("user_subscribed");if(e==="1"||e==="true")return!0}catch{}return!1}catch(e){return console.warn("[utils] isUserSubscribed error",e),!1}}function oe(e=10){if(window.location.hostname.includes("market.yandex")||document.title.includes("Яндекс.Маркет")||document.querySelector('[data-baobab-name*="market"]')){const t=Ie(15e3);return(t&&t.reviews?t.reviews:[]).map(m=>{const f=typeof m=="string"?m:m&&(m.text||m.review||"")||"";return{raw:f,anon:he(String(f))}}).filter(m=>m.raw&&m.raw.length>30).map(m=>m.anon).slice(0,e)}const n=['[data-zone-name="review"]','[data-autotest-id="review-card"]',".review__item",".product-review",".review",".comments-item",'[data-test-id*="review"]',".feedback",".pa-review",".review-item",".reviewCard"];let r=[];for(const t of n){const x=document.querySelectorAll(t);if(x&&x.length){r=Array.from(x);break}}const d=r.map(t=>{const m=(t?.textContent||t?.innerText||"").trim();return m?he(m):""}).filter(t=>t&&t.length>30).slice(0,e);return console.debug("ShopSage: Standard extraction found",d.length,"reviews"),d}function we(e){return e==null?"—":`${Math.round(e*10)/10} <svg class="star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.167L12 18.896l-7.336 3.868 1.402-8.167L.132 9.21l8.2-1.192z"/></svg>`}const B={autoAnalyze:!1,serverSend:!1,minReviews:5,language:"ru",analysisDepth:"medium",showRating:!0,debugMode:!1,saveHistory:!1,darkMode:!0};function Be(e,a={}){const n=e.getElementById?e.getElementById("ss-preview-modal"):e.querySelector("#ss-preview-modal");if(n)try{n.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>n.remove(),200)}catch{n.remove()}const r=document.createElement("div");r.id="ss-preview-modal";const d=a.product?.title||document.title||"Неизвестный товар",t=a.product?.url||location.href,x=JSON.stringify(a,null,2),m=new Blob([x]).size,f=a._truncated===!0;function b(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function q(s){try{const c=new URL(s),k=c.pathname.length>24?c.pathname.slice(0,21)+"…":c.pathname;return`${c.hostname}${k}`}catch{return s.length>40?s.slice(0,37)+"…":s}}function S(s){return!s||s<1024?`${s} Б`:s<1024*1024?`${Math.round(s/1024)} КБ`:`${(s/(1024*1024)).toFixed(2)} МБ`}function L(s,c=45){return s.length>c?s.slice(0,c)+"…":s}r.innerHTML=`
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
                        <div class="pm-value" title="${b(d)}">${b(L(d))}</div>
                    </div>
                </div>

                <div class="pm-summary-row">
                    <div style="flex: 1;">
                        <div class="pm-label">Ссылка</div>
                        <div class="pm-value">
                            <a href="${b(t)}" class="pm-link" target="_blank" rel="noopener noreferrer"
                               title="${b(t)}">${b(q(t))}</a>
                        </div>
                    </div>
                </div>

                <div class="pm-meta">
                    <div class="pm-meta-item">
                        <span class="pm-meta-label">Размер данных:</span>
                        <span class="pm-meta-value">${S(m)}</span>
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
    `,e.appendChild(r);const E=r.querySelector(".pm-close"),R=r.querySelector(".btn-close-action"),w=r.querySelector(".btn-copy"),i=r.querySelector(".btn-download"),o=r.querySelector(".pm-link");function u(){try{r.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>{try{r.remove()}catch{}},200)}catch{try{r.remove()}catch{}}document.removeEventListener("keydown",h)}E?.addEventListener("click",u),R?.addEventListener("click",u),w?.addEventListener("click",async()=>{const s=w.querySelector(".btn-text")?.textContent||"Копировать",c=w.querySelector(".btn-text");try{await navigator.clipboard.writeText(x),w.classList.add("btn-success"),c&&(c.textContent="Скопировано!"),setTimeout(()=>{w.classList.remove("btn-success"),c&&(c.textContent=s)},1500)}catch{w.classList.add("btn-error"),c&&(c.textContent="Ошибка!"),setTimeout(()=>{w.classList.remove("btn-error"),c&&(c.textContent=s)},1500);try{const y=r.querySelector("pre");if(y){const g=document.createRange();g.selectNodeContents(y);const H=window.getSelection();H.removeAllRanges(),H.addRange(g)}}catch{}}}),i?.addEventListener("click",()=>{const s=i.querySelector(".btn-text")?.textContent||"Скачать",c=i.querySelector(".btn-text");try{const k=new Blob([x],{type:"application/json;charset=utf-8"}),y=URL.createObjectURL(k),g=document.createElement("a");g.href=y,g.download=`shopsage-data-${new Date().toISOString().slice(0,19).replace(/[:.]/g,"-")}.json`,document.body.appendChild(g),g.click(),g.remove(),URL.revokeObjectURL(y),i.classList.add("btn-success"),c&&(c.textContent="Скачано!"),setTimeout(()=>{i.classList.remove("btn-success"),c&&(c.textContent=s)},1500)}catch(k){i.classList.add("btn-error"),c&&(c.textContent="Ошибка!"),setTimeout(()=>{i.classList.remove("btn-error"),c&&(c.textContent=s)},1500),console.error("Download failed:",k)}}),o?.addEventListener("click",s=>{s.preventDefault();try{window.open(t,"_blank","noopener,noreferrer")}catch(c){console.warn("Could not open product URL:",c)}});function h(s){s.key==="Escape"&&u()}return document.addEventListener("keydown",h),r.addEventListener("click",s=>{s.target===r&&u()}),r}function Oe(e,a={}){const n=typeof ge=="function"?ge():window.__loadedSettings||{},r={...B,...n,...a},d=e.getElementById?e.getElementById("ss-settings-modal"):e.querySelector("#ss-settings-modal");if(d)try{d.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>d.remove(),200)}catch{d.remove()}const t=document.createElement("div");t.id="ss-settings-modal";const x=r.maxReviews??r.minReviews??B.maxReviews??B.minReviews??5;t.innerHTML=`
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
              <input type="checkbox" id="set-auto-analyze" ${r.autoAnalyze?"checked":""}>
              <span>Автоматически анализировать при загрузке страницы</span>
            </label>
            <button type="button" class="feature-lock" data-feature="autoAnalyze" title="Доступно по подписке">🔒</button>
          </div>

          <div class="setting-option">
            <label>
              <input type="checkbox" id="set-server-send" ${r.serverSend?"checked":""}>
              По умолчанию отправлять данные на сервер
            </label>
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
              <input type="radio" name="analysis-depth" value="fast" ${r.analysisDepth==="fast"?"checked":""}>
              <span>Быстрый анализ (поверхностный)</span>
            </label>
            <!-- empty placeholder for alignment -->
            <span style="width:34px"></span>
          </div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="radio" name="analysis-depth" value="medium" ${r.analysisDepth==="medium"?"checked":""}>
              <span>Стандартный анализ (рекомендуется)</span>
            </label>
            <span style="width:34px"></span>
          </div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="radio" name="analysis-depth" value="deep" ${r.analysisDepth==="deep"?"checked":""}>
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

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="checkbox" id="set-debug-mode" ${r.debugMode?"checked":""}>
              <span>Режим отладки (показывать техническую информацию)</span>
            </label>
            <span style="width:34px"></span>
          </div>

          <div class="setting-option feature-row">
            <label style="display:flex; align-items:center; gap:8px; flex:1; cursor: pointer;">
              <input type="checkbox" id="set-save-history" ${r.saveHistory?"checked":""}>
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
    `,e.appendChild(t);const m=t.querySelector(".sm-close"),f=t.querySelector(".btn-close-action"),b=t.querySelector(".btn-save"),q=t.querySelector(".btn-reset"),S=t.querySelector("#set-max-reviews"),L=t.querySelector("#max-reviews-value"),E=t.querySelector("#max-range-lock"),R=t.querySelector("#set-auto-analyze"),w=t.querySelector("#set-save-history"),i=t.querySelector('input[name="analysis-depth"][value="deep"]'),o=t.querySelector('input[name="analysis-depth"][value="medium"]'),u=Array.from(t.querySelectorAll(".feature-lock"));function h(){return typeof Se=="function"?Se:window.__utils&&typeof window.__utils.showSubscriptionModal=="function"?window.__utils.showSubscriptionModal:(p={},l)=>{const v=new CustomEvent("subscriptionRequest",{detail:{reason:"unlock-max-reviews"},bubbles:!0,composed:!0});return document.dispatchEvent(v),()=>{}}}let s=null;function c(){if(s)return;const p=h(),l=t||e||document.body;try{const v=p({message:"Доступ к расширенным функциям доступен только по подписке. Оформить подписку?",onBuy:()=>{const $=new CustomEvent("subscriptionRequest",{detail:{reason:"unlock-max-reviews"},bubbles:!0,composed:!0});document.dispatchEvent($)}},l),M=l instanceof ShadowRoot||l instanceof Element?l.querySelector("#subscription-modal-overlay"):document.getElementById("subscription-modal-overlay");if(typeof v=="function"){let $=null;if(M){const P=l instanceof ShadowRoot||l instanceof Element?l:document.body;$=new MutationObserver(()=>{if(!M.isConnected){s=null;try{$.disconnect()}catch{}}}),$.observe(P,{childList:!0,subtree:!0})}s=()=>{try{v()}catch{}s=null;try{$&&$.disconnect()}catch{}}}else if(M){const $=l instanceof ShadowRoot||l instanceof Element?l:document.body,P=new MutationObserver(()=>{M.isConnected||(s=null,P.disconnect())});P.observe($,{childList:!0,subtree:!0}),s=()=>{try{M.remove()}catch{}s=null;try{P.disconnect()}catch{}}}else s=null}catch{const M=new CustomEvent("subscriptionRequest",{detail:{reason:"unlock-max-reviews"},bubbles:!0,composed:!0});document.dispatchEvent(M),s=null}}let k=!!r.isSubscribed;function y(p){k=!!p,k&&E?(E.style.display="none",E.setAttribute("aria-hidden","true")):E&&(E.style.display="block",E.setAttribute("aria-hidden","false")),u.forEach(l=>{l.getAttribute("data-feature"),k?(l.style.display="none",l.setAttribute("aria-hidden","true")):(l.style.display="block",l.setAttribute("aria-hidden","false"))}),k?(i&&(i.disabled=!1),R&&(R.disabled=!1),w&&(w.disabled=!1)):(i&&(i.checked&&o&&(i.checked=!1,o.checked=!0),i.disabled=!0),R&&(R.checked=!1,R.disabled=!0),w&&(w.checked=!1,w.disabled=!0))}if(typeof ye=="function")try{const p=ye();p&&typeof p.then=="function"?p.then(l=>y(!!l)).catch(()=>y(!!r.isSubscribed)):y(!!p)}catch{y(!!r.isSubscribed)}else y(!!r.isSubscribed);L&&(L.textContent=String(S?.value??x)),u.forEach(p=>{p.addEventListener("click",l=>{l.stopPropagation(),c()})}),t.querySelector('.setting-option .feature-row label[for="set-auto-analyze"]');const g=R?R.closest("label"):null;g&&g.addEventListener("click",p=>{k||(p.preventDefault(),c())});const H=w?w.closest("label"):null;H&&H.addEventListener("click",p=>{k||(p.preventDefault(),c())});const D=i?i.closest("label"):null;D&&D.addEventListener("click",p=>{k||(p.preventDefault(),setTimeout(()=>{i&&(i.checked=!1),o&&(o.checked=!0)},0),c())}),S?.addEventListener("input",p=>{let l=parseInt(p.currentTarget?.value,10)||x;!k&&l>10&&(c(),l=10,S.value="10"),L&&(L.textContent=String(l))}),E?.addEventListener("click",p=>{p.stopPropagation(),!k&&c()});function F(){try{t.style.animation="modalSlideOut 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",setTimeout(()=>{try{t.remove()}catch{}},200)}catch{try{t.remove()}catch{}}document.removeEventListener("keydown",V);try{typeof s=="function"&&s()}catch{}s=null}function le(){const p=parseInt(t.querySelector("#set-max-reviews")?.value,10)||(B.maxReviews??B.minReviews??5),l=!k&&p>10?10:p;return{autoAnalyze:!!t.querySelector("#set-auto-analyze")?.checked,serverSend:!!t.querySelector("#set-server-send")?.checked,maxReviews:l,minReviews:l,language:t.querySelector("#set-language")?.value||"ru",analysisDepth:t.querySelector('input[name="analysis-depth"]:checked')?.value||"medium",showRating:!!t.querySelector("#set-show-rating")?.checked,debugMode:!!t.querySelector("#set-debug-mode")?.checked,saveHistory:!!t.querySelector("#set-save-history")?.checked}}function ce(){t.querySelector("#set-auto-analyze").checked=B.autoAnalyze,t.querySelector("#set-server-send").checked=B.serverSend,t.querySelector("#set-max-reviews").value=B.maxReviews??B.minReviews??5;const p=t.querySelector("#max-reviews-value");p&&(p.textContent=String(B.maxReviews??B.minReviews??5)),t.querySelector("#set-language").value=B.language;const l=t.querySelector(`input[name="analysis-depth"][value="${B.analysisDepth}"]`);l&&(l.checked=!0),t.querySelector("#set-show-rating").checked=B.showRating,t.querySelector("#set-debug-mode").checked=B.debugMode,t.querySelector("#set-save-history").checked=B.saveHistory,!k&&parseInt(t.querySelector("#set-max-reviews").value,10)>10&&(t.querySelector("#set-max-reviews").value="10",p&&(p.textContent="10")),k||(i&&i.checked&&o&&(i.checked=!1,o.checked=!0),R&&(R.checked=!1,R.disabled=!0),w&&(w.checked=!1,w.disabled=!0))}q?.addEventListener("click",async()=>{try{localStorage.removeItem(SETTINGS_KEY),typeof se=="function"&&await se({...B||{},maxReviews:B.maxReviews??B.minReviews??5,minReviews:B.maxReviews??B.minReviews??5})}catch(v){console.warn("Не удалось удалить/сохранить ключ настроек:",v)}ce();const p=q.querySelector(".btn-text")?.textContent||"Сбросить",l=q.querySelector(".btn-text");l&&(l.textContent="Сброшено!"),setTimeout(()=>{l&&(l.textContent=p)},1e3)}),m?.addEventListener("click",F),f?.addEventListener("click",F),b?.addEventListener("click",async()=>{const p=le();try{typeof se=="function"?await se(p):localStorage.setItem(SETTINGS_KEY,JSON.stringify(p))}catch($){console.error("Ошибка при сохранении настроек:",$)}const l=new CustomEvent("settingsChanged",{detail:p,bubbles:!0,composed:!0});try{e.dispatchEvent(l)}catch{t.dispatchEvent(l)}const v=b.querySelector(".btn-text")?.textContent||"Сохранить",M=b.querySelector(".btn-text");b.classList.add("btn-success"),M&&(M.textContent="Сохранено!"),setTimeout(()=>{b.classList.remove("btn-success"),M&&(M.textContent=v),F()},1200)});function V(p){p.key==="Escape"&&F()}return document.addEventListener("keydown",V),setTimeout(()=>{t.addEventListener("click",p=>{p.target===t&&F()})},100),t}function Se(e={},a=document.body){const{title:n="Разблокировать расширенный анализ",message:r="Больше 10 отзывов доступно только по подписке. Хотите оформить подписку?",buyText:d="Купить подписку",cancelText:t="Нет",onBuy:x}=e,m="subscription-modal-overlay";let f=document.body,b=!1;a&&(a instanceof ShadowRoot||a instanceof Element?(f=a,b=!0):(f=document.body,b=!1));try{const g=b?f.querySelector(`#${m}`):document.getElementById(m);if(g)return()=>{try{g.remove()}catch{}}}catch{}function q(g){return String(g).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const S=document.createElement("div");S.id=m,S.className="subscription-modal-overlay";const L=document.createElement("style");L.textContent=`
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
  `,S.appendChild(L),S.innerHTML+=`
    <div class="subscription-modal" role="dialog" aria-modal="true" aria-labelledby="subscription-modal-title">
      <button class="subscription-close" aria-label="Закрыть">&times;</button>
      <div class="subscription-content">
        <h3 id="subscription-modal-title">${q(n)}</h3>
        <p class="subscription-message">${q(r)}</p>
        <div class="subscription-actions">
          <button class="subscription-buy">${q(d)}</button>
          <button class="subscription-cancel">${q(t)}</button>
        </div>
      </div>
    </div>
  `;let E=null;if(b&&f instanceof Element){const g=window.getComputedStyle(f);(!g.position||g.position==="static")&&(E=f.style.position||"",f.style.position="relative")}b?f.appendChild(S):document.body.appendChild(S);const R=document.body.style.overflow;b||(document.body.style.overflow="hidden");const w=S.querySelector(".subscription-buy"),i=S.querySelector(".subscription-cancel"),o=S.querySelector(".subscription-close");let u=!1;function h(){if(!u){u=!0;try{S.remove()}catch{}if(E!==null&&f instanceof Element)try{f.style.position=E}catch{}b||(document.body.style.overflow=R||""),document.removeEventListener("keydown",y)}}function s(g){g.stopPropagation();try{typeof x=="function"?x():document.dispatchEvent(new CustomEvent("subscriptionRequest",{detail:{reason:"unlock-max-reviews"},bubbles:!0,composed:!0}))}catch{}h()}function c(g){g.stopPropagation(),h()}function k(g){g.target===S&&h()}function y(g){g.key==="Escape"&&h()}return w?.addEventListener("click",s),i?.addEventListener("click",c),o?.addEventListener("click",c),S.addEventListener("click",k),document.addEventListener("keydown",y),h}const _e=`<aside\r
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
`,Ye=`:host {\r
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
`;function K(){if(document.getElementById(te)){const v=document.getElementById(te)._hostElement;if(!v)return;v.style.opacity==="1"?ie():(v.style.opacity="1",v.style.transform="translateY(0) scale(1)");return}const e=document.createElement("div");e.id=te,Object.assign(e.style,{all:"initial",position:"fixed",right:"20px",top:"60px",zIndex:"2147483647",pointerEvents:"auto"});const a=e.attachShadow({mode:"open"});e._hostElement=e;const n=document.createElement("style");n.textContent=Ye,a.appendChild(n);const r=document.createElement("div");r.innerHTML=_e,a.appendChild(r);const d=a.querySelector("#ss-logo");d&&(d.src=chrome.runtime.getURL("assets/icons/icon.svg")),document.body.appendChild(e);const t=a,x=t.querySelector(".shopsage-sidebar"),m=t.querySelector(".ss-close"),f=t.querySelector("#ss-analyze"),b=t.querySelector("#ss-loader"),q=t.querySelector("#ss-count"),S=t.querySelector("#ss-result"),L=t.querySelector("#ss-pros"),E=t.querySelector("#ss-cons"),R=t.querySelector("#ss-verdict"),w=t.querySelector("#ss-rating"),i=t.querySelector("#ss-total"),o=t.querySelector("#ss-error"),u=t.querySelector("#ss-score-container"),h=t.querySelector("#ss-score-badge"),s=t.querySelector("#ss-score-bar-inner"),c=t.querySelector("#ss-score-sub"),k=t.querySelector("#ss-send-server"),y=t.querySelector("#ss-preview-payload"),g=t.querySelector("#ss-preview-settings");k&&k.addEventListener("change",l=>{const v=!!l.target.checked;chrome.storage.sync.set({sendToServer:v})}),y&&y.addEventListener("click",async()=>{try{y.disabled=!0;const l=await Ne();Be(t,l)}catch(l){console.error("preview error",l),alert("Ошибка при формировании превью: "+String(l))}finally{y.disabled=!1}}),g&&g.addEventListener("click",async()=>{try{g.disabled=!0;const l=await ge();Oe(t,l)}catch(l){console.error("preview error",l),alert("Ошибка при формировании превью: "+String(l))}finally{g.disabled=!1}}),requestAnimationFrame(()=>{Object.assign(e.style,{opacity:"0",transform:"translateY(8px) scale(.995)",transition:"opacity .28s cubic-bezier(.2,.9,.2,1), transform .36s cubic-bezier(.2,.9,.2,1)"}),setTimeout(()=>{e.style.opacity="1",e.style.transform="translateY(0) scale(1)"},20)}),m&&m.addEventListener("click",ie),f&&f.addEventListener("click",le);const H=oe();q&&(q.innerText=H.length);const D=xe();w&&(w.innerHTML=we(D.avgRating)),i&&(i.innerText=D.totalRatings!=null?D.totalRatings:"—");function F(l){o&&(o.innerText=l,p(o),setTimeout(()=>{V(o)},5e3))}function le(l){f&&(f.disabled=!0),b&&p(b),S&&V(S),u&&V(u),c&&V(c),o&&V(o);const v=15e3,M=`

`;chrome.storage.sync.get({maxReviews:20,serverUrl:""},$=>{const P=Number.isFinite(Number($.maxReviews))&&Number($.maxReviews)>0?Number($.maxReviews):20,j=oe(P);let O=[],U=0;if(Array.isArray(j)?(O=j,U=j.length):j&&typeof j=="object"?(O=j.items||[],U=Number.isFinite(Number(j.found))?j.found:O.length||0):(O=[],U=0),U<P&&console.info(`Verdict: Requested ${P} reviews but only ${U} found on page. Using available reviews.`),!O||O.length===0){b&&V(b),f&&(f.disabled=!1),F("Не найдено отзывов на странице. Попробуйте прокрутить страницу или перейти на страницу с отзывами.");return}const G=[];let X="";for(let T=0;T<O.length;T++){const _=O[T]||"";if(_)if(X.length===0)if(_.length<=v)X=_,G.push(_);else{const C=_.slice(0,v-1)+"…";X=C,G.push(C);break}else if(X.length+M.length+_.length<=v)X=X+M+_,G.push(_);else break}const W=xe();w&&(w.innerHTML=we(D.avgRating)),i&&(i.innerText=W.totalRatings!=null?W.totalRatings:"—");const I=G,Z={url:location.href,title:document.title,totalRatings:W.totalRatings,avgRating:W.avgRating};console.log("ShopSage: Sending analysis request",{reviewCount:I.length,product:Z,serverUrl:$.serverUrl||"default"}),chrome.runtime.sendMessage({action:Le,reviews:I,product:Z,serverUrl:$.serverUrl||""},T=>{if(chrome.runtime.lastError){console.error("Verdict: runtime.lastError",chrome.runtime.lastError),b&&V(b),f&&(f.disabled=!1),F("Ошибка связи с расширением. Перезагрузите страницу и попробуйте снова.");return}if(b&&V(b),f&&(f.disabled=!1),!T){console.error("Verdict: Empty response from background"),F("Не получен ответ от сервера. Проверьте настройки или попробуйте позже.");return}if(!T.ok){console.error("Verdict: Analysis failed",T);let C="Ошибка анализа";T.error?C=T.error:T.message&&(C=T.message),C.includes("fetch failed")||C.includes("Failed to fetch")?C="Не удалось подключиться к серверу. Проверьте URL сервера в настройках.":C.includes("timeout")?C="Превышено время ожидания ответа от сервера.":C.includes("404")?C="Сервер не найден. Проверьте URL в настройках.":(C.includes("500")||C.includes("502")||C.includes("503"))&&(C="Ошибка сервера. Попробуйте позже."),F(C);return}const _=T.data||{};console.info("Verdict: Analysis successful",T),ce(_,Z,I.length)})})}function ce(l,v={},M=0){o&&V(o);const $=Array.isArray(l.pros)?l.pros:[],P=Array.isArray(l.cons)?l.cons:[];L&&(L.innerHTML="",$.forEach((A,N)=>{const z=document.createElement("li");z.innerHTML='<div class="tag">'+(N+1)+'</div><div class="snippet"></div>',z.querySelector(".snippet").innerText=A,L.appendChild(z)})),E&&(E.innerHTML="",P.forEach((A,N)=>{const z=document.createElement("li");z.innerHTML='<div class="tag">'+(N+1)+'</div><div class="snippet"></div>',z.querySelector(".snippet").innerText=A,E.appendChild(z)}));let j=document.querySelector('[data-auto="rating"]');j&&(v.avgRating=parseFloat(j.textContent.trim().replace(",","."))),R&&(R.innerText=l.verdict||"Нет явного вердикта");let O=v&&v.avgRating!=null?Number(v.avgRating):v&&v.rating!=null?Number(v.rating):null,U=v&&v.totalRatings!=null?Number(v.totalRatings):v&&v.totalReviews!=null?Number(v.totalReviews):null;try{if(typeof ae=="function"){const A=ae();A&&(O==null&&A.avg!=null&&(O=A.avg),U==null&&A.totalRatings!=null&&(U=A.totalRatings))}}catch{}const G=typeof ae=="function"?ae():null,X=U||v&&(v.totalReviews||0)||0,W=O??(v&&(v.avgRating||v.rating)?v.avgRating||v.rating:null);let I=Math.max(0,Number(X||0)),Z=0,T=null,_=null,C=null;if(G){const A={};let N=!1;for(let z=1;z<=5;z++){const J=G[String(z)];J!=null&&Number.isFinite(Number(J))&&Number(J)>0?(A[z]=Number(J),N=!0):A[z]=0}N&&(C=A),O==null&&G.avg!=null&&(O=G.avg),U==null&&G.totalRatings!=null&&(U=G.totalRatings)}if(C)Z=Number(C[5]||0)+Number(C[4]||0),I=Object.keys(C).reduce((A,N)=>A+Number(C[N]||0),0),_=I>0?Z/I:null,T=O!=null?O/5:_??.5;else if(I>0&&W!=null){const A=Math.max(0,Math.min(1,(W-1)/4));Z=Math.round(A*I),_=I>0?Z/I:null,T=W/5}else{const A=Array.isArray(l.pros)?l.pros.length:0,N=Array.isArray(l.cons)?l.cons.length:0;if(A+N>0){const z=A/(A+N);I=Math.max(I,A+N),Z=Math.round(z*I),_=z,T=z}else{I=Math.max(I,M||0);const z=.5;Z=Math.round(z*I),_=z,T=T??z}}const Re=2,Ee=2,me=Re+Z,Ae=Ee+(I-Z),re=me/(me+Ae);function ze(A,N,z=1.96){if(N===0)return{low:0,high:1};const J=A/N,ue=z*z,fe=1+ue/N,be=J+ue/(2*N),ve=z*Math.sqrt((J*(1-J)+ue/(4*N))/N),qe=Math.max(0,(be-ve)/fe),Ce=Math.min(1,(be+ve)/fe);return{low:qe,high:Ce}}const de=ze(Z,Math.max(1,I));T==null&&(T=re);const Q=Math.round((re*.6+T*.4)*100);let ee="",ne="";if(Q>=75?(ee="Однозначно стоит выбрать",ne="linear-gradient(90deg,#a3e635,#10b981)"):Q>=60?(ee="В целом рекомендуем",ne="linear-gradient(90deg,#facc15,#84cc16)"):Q>=45?(ee="Стоит взвесить плюсы и минусы",ne="linear-gradient(90deg,#f59e0b,#f97316)"):(ee="Лучше поискать альтернативу",ne="linear-gradient(90deg,#ef4444,#ea580c)"),u&&p(u),h&&(h.innerText=Q+"%",h.style.background=ne),s&&(s.style.width=Q+"%"),c){p(c);const A=Math.round(de.low*100),N=Math.round(de.high*100),z=I>0?I:M||"—",J=O!=null?`${O}`:"—";c.innerText=`${ee} — вероятность успеха ≈ ${Math.round(re*100)}% (интервал ${A}–${N}%), на основе ${z} оценок; положительных (4–5★): ${Z}. Средний рейтинг: ${J}★.`}q&&(M!=null&&M!==0?q.innerText=`${M} из ${U??"—"}`:q.innerText=U??"—"),S&&(p(S),setTimeout(()=>S.classList.add("show"),30)),console.info("ShopSage: stats",{n:I,k:Z,estPosRate:_,posteriorMean:re,wilson:de,composite:Q,rec:ee,pageAvg:O,pageTotalRatings:U,prosCount:$.length,consCount:P.length})}e._shadow=a,e._container=x;function V(l){l.classList.remove("visible"),l.classList.add("hidden")}function p(l){requestAnimationFrame(()=>{l.classList.remove("hidden"),l.classList.add("visible")})}}function ie(){const e=document.getElementById(te);e&&(e.style.opacity="0",e.style.transform="translateY(8px) scale(.995)",setTimeout(()=>{try{const a=document.getElementById(te);a&&a.remove()}catch{}},300))}function Ue(e,a,n){try{const r=e.config||{};if(chrome&&chrome.storage&&chrome.storage.sync)return chrome.storage.sync.set({serverUrl:r.serverUrl||"",maxReviews:r.maxReviews!=null?r.maxReviews:void 0},()=>{try{if(typeof K=="function"){try{K(),n&&n({ok:!0,message:"openSidebar() called"})}catch(t){console.warn("openSidebar call failed",t),n&&n({ok:!1,error:String(t)})}return}if(typeof window.openSidebar=="function")try{window.openSidebar(),n&&n({ok:!0,message:"window.openSidebar() called"});return}catch{}if(typeof window.createSidebar=="function")try{window.createSidebar(),n&&n({ok:!0,message:"window.createSidebar() called"});return}catch{}const d=document.getElementById(pe)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2")||document.getElementById("shopsage-open-btn-v3");if(d)try{d.click(),n&&n({ok:!0,message:"button clicked"});return}catch(t){n&&n({ok:!1,message:"failed to click button",error:String(t)});return}n&&n({ok:!1,message:"no sidebar open API found"})}catch(d){console.error("handleOpenSidebarMessage inner error",d),n&&n({ok:!1,error:String(d)})}}),!0;try{typeof K=="function"?(K(),n&&n({ok:!0,message:"openSidebar() called (no storage)"})):n&&n({ok:!1,message:"storage unavailable and openSidebar missing"})}catch(d){n&&n({ok:!1,error:String(d)})}}catch(r){console.error("handleOpenSidebarMessage error",r);try{n&&n({ok:!1,error:String(r)})}catch{}}return!1}function Ze(e,a,n){try{if(!e||!e.action)return;if(e.action==="OPEN_SIDEBAR")return Ue(e,a,n)}catch(r){console.error("handleRuntimeMessage error",r);try{n&&n({ok:!1,error:String(r)})}catch{}}return!1}try{chrome&&chrome.runtime&&chrome.runtime.onMessage&&chrome.runtime.onMessage.addListener(Ze)}catch{}if(!window.__shopSageInitialized){try{typeof K=="function"&&(window.openSidebar=K),typeof ie=="function"&&(window.closeSidebar=ie),typeof K=="function"&&(window.createSidebar=K)}catch{}try{Te({ROOT_ID:te,BTN_ID:pe,ICON_PATH:Me,onOpenSidebar:typeof K=="function"?K:()=>{const e=document.getElementById(pe)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2");if(e)try{e.click()}catch{}}})}catch(e){console.error("ShopSage: initContent failed",e)}window.__shopSageInitialized=!0}export{ie as closeSidebar,K as openSidebar};
