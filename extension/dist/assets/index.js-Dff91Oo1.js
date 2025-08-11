import{initContent as vt}from"./content-B4YMLfgP.js";const J="shopsage-root-v3",ot="shopsage-open-btn-v3",bt="ANALYZE",xt=chrome&&chrome.runtime&&chrome.runtime.getURL?chrome.runtime.getURL("assets/icons/icon.svg"):"/assets/icons/icon.svg";function q(t){if(t==null)return null;const s=String(t).trim();if(!s)return null;const i=s.match(/([\d.,]+)\s*[Kk]/);if(i){const r=parseFloat(i[1].replace(",","."));if(Number.isFinite(r))return Math.round(r*1e3)}const e=s.replace(/\s+/g,"").replace(/[^0-9\.,]/g,"").replace(",","."),a=parseFloat(e);return Number.isFinite(a)?a:null}function ct(){const t={totalReviews:null,rating:null,totalRatings:null,avgRating:null};try{try{const e=document.querySelector('meta[itemprop="reviewCount"], meta[name="reviewCount"], meta[name="reviews"]');e&&e.content&&(t.totalReviews=Math.round(q(e.content))||null)}catch{}try{const e=document.querySelector('meta[itemprop="ratingValue"], meta[name="rating"], meta[itemprop="rating"]');e&&e.content&&(t.rating=Math.round(q(e.content)*100)/100||null)}catch{}const s=['[data-auto="rating-count-text"]',".rating-count",".reviews-count",".votes-count",".ratings-count",".rating__count",".rate__count",".count-ratings",'[data-test="ratings-count"]'];for(const e of s)try{const a=document.querySelector(e);if(a&&(a.innerText||a.textContent)){const r=q(a.innerText||a.textContent);if(r!=null){t.totalRatings=Math.round(r);break}}}catch{}if(t.totalRatings==null){const e=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const a of e){const v=(a.getAttribute("aria-label")||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голос|голосов|votes|ratings)/i);if(v){t.totalRatings=Math.round(q(v[1]));break}}}if(t.totalRatings==null){const a=(document.body.innerText||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голосов|votes|ratings)/i);a&&(t.totalRatings=Math.round(q(a[1])))}const i=['[data-auto="rating"]','[data-auto="rating-value"]',".average-rating",".avg-rating",".rating-value",".rating__value",".product-rating",".ds-text_weight_bold"];for(const e of i)try{const a=document.querySelector(e);if(a&&(a.innerText||a.textContent)){const r=q(a.innerText||a.textContent);if(r!=null){t.avgRating=Math.round(r*100)/100;break}}}catch{}if(t.avgRating==null){const e=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const a of e){const v=(a.getAttribute("aria-label")||"").match(/([0-5](?:[.,][0-9])?)\s*(зв|звезды|рейтинг|rating)/i);if(v){t.avgRating=q(v[1]);break}}}if(t.avgRating==null){const a=(document.body.innerText||"").match(/(?:средн(?:ий|ая)\s*рейтинг|рейтинг|rating)[:\s]*([0-5](?:[.,][0-9])?)/i);a&&(t.avgRating=q(a[1]))}try{const e=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(e){const a=e.getAttribute("ratingvalue")||e.getAttribute("data-ratingvalue"),r=e.getAttribute("ratingcount")||e.getAttribute("data-ratingcount")||e.getAttribute("raitingcounttext")||e.getAttribute("data-ratingcounttext"),v=e.getAttribute("reviewcount")||e.getAttribute("data-reviewcount")||e.getAttribute("reviewcounttext")||e.getAttribute("data-reviewcounttext");if(a&&t.avgRating==null&&(t.avgRating=q(a)),r&&t.totalRatings==null){const w=String(r).match(/([0-9\s,.Kk]+)/);if(w){const m=w[1].replace(/\s+/g,"");t.totalRatings=Math.round(q(m))}}if(v&&t.totalReviews==null){const w=String(v).match(/([0-9\s,.Kk]+)/);w&&(t.totalReviews=Math.round(q(w[1])))}}}catch{}try{if(typeof window.extractRatingBreakdown=="function"){const e=window.extractRatingBreakdown();e&&(t.avgRating==null&&e.avg!=null&&(t.avgRating=e.avg),t.totalRatings==null&&e.totalRatings!=null&&(t.totalRatings=e.totalRatings),t.totalReviews==null&&e.totalReviews!=null&&(t.totalReviews=e.totalReviews))}}catch{}}catch(s){console.warn("extractProductMeta error",s)}return t.totalRatings==null&&t.totalReviews!=null&&(t.totalRatings=t.totalReviews),t.avgRating==null&&t.rating!=null&&(t.avgRating=t.rating),t.totalRatings=typeof t.totalRatings=="number"&&Number.isFinite(t.totalRatings)?Math.round(t.totalRatings):null,t.avgRating=typeof t.avgRating=="number"&&Number.isFinite(t.avgRating)?Math.round(t.avgRating*100)/100:null,t.totalReviews=t.totalReviews||null,t.rating=t.rating||null,t}function tt(){const t={5:null,4:null,3:null,2:null,1:null,avg:null,totalRatings:null,totalReviews:null};try{const s=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(s){const v=s.getAttribute("ratingvalue")||s.getAttribute("data-ratingvalue"),w=s.getAttribute("ratingcount")||s.getAttribute("data-ratingcount")||s.getAttribute("raitingcounttext"),m=s.getAttribute("reviewcount")||s.getAttribute("data-reviewcount")||s.getAttribute("reviewcounttext");v&&(t.avg=parseFloat(String(v).replace(",","."))||t.avg),w&&(t.totalRatings=q(w)||t.totalRatings),m&&(t.totalReviews=q(m)||t.totalReviews)}const i=document.querySelector('[data-auto="rating-count-text"], [data-auto="ratingCount"], .rating-count, .ds-text[data-auto="rating-count-text"]'),e=document.querySelector('[data-auto="review-count-text"], .review-count, .ds-text[data-auto="review-count-text"]');i&&!t.totalRatings&&(t.totalRatings=q(i.innerText||i.textContent)||t.totalRatings),e&&!t.totalReviews&&(t.totalReviews=q(e.innerText||e.textContent)||t.totalReviews);const a=[".rating-breakdown",".rating-histogram",".rating-list",".rating-distribution",'[data-auto="rating-breakdown"]',".review-stats",".rating-row",".ratingRow",".ds-rating-list"];for(const v of a){const w=document.querySelector(v);if(!w)continue;const m=Array.from(w.querySelectorAll("*"));let k=0;for(const T of m){const z=(T.textContent||"").trim(),O=z.match(/^\s*([1-5])\D{0,6}([0-9\s,.Kk]{1,12})\s*$/);if(O){const M=Number(O[1]),C=q(O[2]);M>=1&&M<=5&&C!=null&&(t[M]=C,k++)}else{const M=z.match(/^\s*([1-5])\s*$/);if(M){const C=Number(M[1]);let L=null;const o=T.nextElementSibling||T.parentElement&&T.parentElement.querySelector(".count, .value, .number, .ds-text");o&&(L=q(o.textContent||o.innerText)),L!=null&&(t[C]=L,k++)}}}if(k>0)break}const r=Array.from(document.querySelectorAll('noframes[data-apiary="patch"]')||[]);for(const v of r){const w=(v.textContent||"").trim();if(w)try{const m=JSON.parse(w);if(m.collections&&m.collections.businessReviewStats){const M=Object.keys(m.collections.businessReviewStats);if(M.length){const C=m.collections.businessReviewStats[M[0]];if(C&&(C.reviewsCount&&!t.totalReviews&&(t.totalReviews=Number(C.reviewsCount)||t.totalReviews),C.reviewsCountVisualization&&!t.totalRatings)){const L=String(C.reviewsCountVisualization).match(/([\d.,]+)K/i);L&&(t.totalRatings=Math.round(parseFloat(L[1].replace(",","."))*1e3))}}}const k=w,T=k.match(/"ratingvalue"\s*:\s*"?([0-9.,]+)"?/i),z=k.match(/"ratingcount"\s*:\s*(\d+)/i),O=k.match(/"reviewcount"\s*:\s*(\d+)/i);T&&(t.avg=parseFloat(T[1].replace(",","."))||t.avg),z&&(t.totalRatings=Number(z[1])||t.totalRatings),O&&(t.totalReviews=Number(O[1])||t.totalReviews)}catch{}}}catch{}return["5","4","3","2","1"].forEach(s=>{t[s]==null&&(t[s]=null)}),t.avg!=null&&(t.avg=Math.round(Number(t.avg)*100)/100),t.totalRatings!=null&&(t.totalRatings=Math.round(Number(t.totalRatings))),t.totalReviews!=null&&(t.totalReviews=Math.round(Number(t.totalReviews))),t}function wt(t=15e3){const s={reviews:[],totalFound:0,charactersUsed:0,extractionMethods:[]};try{let i=function(){const o=['[data-auto="reviews-show-more"]','[data-autotest-id*="show-more"]',".reviews-show-more",".show-more",".load-more","button"],n=new Set;for(const l of o)try{Array.from(document.querySelectorAll(l)).forEach(c=>{try{if(!(c instanceof HTMLElement))return;const b=window.getComputedStyle(c);if(b.display==="none"||b.visibility==="hidden"||c.disabled)return;const F=(c.innerText||c.textContent||"").trim();(/показать|еще|ещё|загрузить|more|show/i.test(F)||l.indexOf("show-more")>=0||l.indexOf("reviews-show-more")>=0)&&!n.has(c)&&(c.click(),n.add(c),setTimeout(()=>{try{c.disabled||c.click()}catch{}},900))}catch{}})}catch{}try{const l=document.querySelector('[data-zone-name="reviews"], [data-auto="ugc-section"], .reviews, .n-reviews, .review-list, [data-auto="reviews"]');if(l)try{l.scrollIntoView({behavior:"smooth"}),l.scrollTop=l.scrollHeight}catch{}else window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})}catch{}},e=function(){const o=['button[class*="expand"]','button[class*="show-full"]','[data-auto*="expand"]',".review-expand",".opinion-expand",'button:contains("Развернуть")','button:contains("Показать полностью")','button:contains("Читать полностью")','[class*="read-more"]'];for(const n of o)try{document.querySelectorAll(n).forEach(d=>{try{d.offsetHeight>0&&d.click()}catch{}})}catch{}},a=function(){const o=[];try{document.querySelectorAll("script").forEach(d=>{if(!d.textContent)return;[/"reviews":\s*\[(.*?)\]/gs,/"opinions":\s*\[(.*?)\]/gs,/"reviewText":\s*"([^"]+)"/g,/"text":\s*"([^"]+)"/g,/"comment":\s*"([^"]+)"/g].forEach(b=>{const F=d.textContent.matchAll(b);for(const R of F)try{if(R[1]&&R[1].length>30){const A=R[1].replace(/\\n/g," ").replace(/\\"/g,'"').replace(/\\\\/g,"\\").trim();A.length>30&&o.push(A)}}catch{}})}),document.querySelectorAll("[data-bem]").forEach(d=>{try{Object.values(d.dataset).forEach(c=>{if(!(!c||c.length<100))try{const b=JSON.parse(c),F=b.reviews||b.opinions;Array.isArray(F)&&F.forEach(R=>{const A=R.text||R.content||R.comment;A&&A.length>30&&o.push(String(A))})}catch{}})}catch{}})}catch{}return o},r=function(o){if(!o)return"";let n=String(o).replace(/\r\n|\r/g,`
`).replace(/\t/g," ").replace(/\u00A0/g," ");n=n.replace(/\s+/g," ").trim(),n=n.replace(/\b(?:\d+\s+){3,}\d+\b/g," "),n=n.replace(/\b\d{3,}\b/g," "),n=n.replace(/(?:\b\d+\b[\s,.-]*){3,}/g," ");try{n=n.replace(/[^\p{L}\p{N}\s\.,!?\-()«»—:;\/%]/gu," ")}catch{n=n.replace(/[^A-Za-zА-Яа-яЁё0-9\s\.,!?\-()«»—:;\/%]/g," ")}return n=n.replace(/([,!.?–—\-]){2,}/g,"$1"),n=n.replace(/\s+/g," ").trim(),n},v=function(o){if(!o)return"";const n=[".review-text",".opinion-text",".review-content",".comment-text",'[data-auto="review-text"]','[class*="text"]',"p",".content"];try{for(const c of n){const b=o.querySelector?o.querySelector(c):null;if(b&&b.innerText&&b.innerText.trim().length>20)return r(b.innerText)}}catch{}let l="";try{l=o.innerText||o.textContent||""}catch{l=""}return[/Достоинства:?\s*/gi,/Недостатки:?\s*/gi,/Комментарий:?\s*/gi,/Опыт использования:?\s*/gi,/Рекомендую\s*/gi,/Не рекомендую\s*/gi,/\d+\s*из\s*\d+\s*считают отзыв полезным/gi,/Был ли отзыв полезен\?/gi,/Да\s*\d*\s*Нет\s*\d*/gi,/\d+\s*звезд[ыа]?/gi,/Оценка:\s*\d+/gi].forEach(c=>{l=l.replace(c," ")}),r(l)},w=function(o){if(!o)return!1;const n=o.length;return!(n<40||(o.match(/\d/g)||[]).length/Math.max(1,n)>.3||(o.match(/[A-Za-zА-Яа-яЁё]/g)||[]).length<12||(o.match(/[А-Яа-яЁё]/g)||[]).length<Math.min(10,Math.floor(n*.2))||/^(source|businessId|notEmpty|id|source,)/i.test(o.trim()))},m=function(o){const n=new Set,l=[];return o.forEach(d=>{const c=d.text.toLowerCase().replace(/\s+/g,"").substring(0,100);n.has(c)||(n.add(c),l.push(d))}),l},k=function(o,n){const l=[];let d=0;const b=`

`.length,F=o.sort((R,A)=>A.length-R.length);for(const R of F){const A=R.length,X=d===0?A:A+b;if(d+X<=n)l.push(R),d+=X;else if(d===0){const P=R.substring(0,n-3)+"...";l.push(P),d=P.length;break}else{const P=n-d-b;if(P>50){const I=R.substring(0,P-3)+"...";l.push(I);break}else break}}return l};i(),e();const T=['[data-auto="review-item"]','[data-zone-name="review"]','[data-autotest-id="review-card"]','[data-tid="review-item"]','[data-auto="OpinionCard"]',".opinion",".review-item",".user-review",'[class*="review"]','[class*="opinion"]','[data-zone*="review"]',".n-review-card",".ProductReview",'iframe[src*="review"] + *','[data-bem*="review"]'],z=new Set;for(const o of T)try{const n=document.querySelectorAll(o);n.forEach(l=>{try{l&&l.innerText&&l.innerText.trim().length>20&&z.add(l)}catch{}}),n.length>0&&s.extractionMethods.push(`${o}: ${n.length} элементов`)}catch{}const O=a(),M=[];z.forEach(o=>{try{const n=v(o),l=r(n);w(l)&&M.push({text:l,source:"dom",length:l.length,element:o})}catch{}}),O.forEach(o=>{try{const n=r(o);w(n)&&M.push({text:n,source:"json",length:n.length})}catch{}});const C=m(M);C.sort((o,n)=>n.length-o.length);const L=k(C.map(o=>o.text),t);return s.reviews=L,s.totalFound=C.length,s.charactersUsed=L.reduce((o,n)=>o+(n?n.length:0),0),s}catch(i){return console.warn("extractYandexMarketReviews error",i),s}}function ut(t=60){if(window.location.hostname.includes("market.yandex")||document.title.includes("Яндекс.Маркет")||document.querySelector('[data-baobab-name*="market"]'))return console.log("ShopSage: Detected Yandex Market, using enhanced extraction"),wt(15e3).reviews;const i=['[data-zone-name="review"]','[data-autotest-id="review-card"]',".review__item",".product-review",".review",".comments-item",'[data-test-id*="review"]',".feedback",".pa-review",".review-item",".reviewCard"],e=[];for(const r of i){const v=document.querySelectorAll(r);if(v&&v.length){e.push(...Array.from(v));break}}const a=e.map(r=>r.innerText?r.innerText.trim():"").filter(r=>r&&r.length>30).slice(0,t);return console.debug("ShopSage: Standard extraction found",a.length,"reviews"),a}const yt=`<aside class="shopsage-sidebar" role="dialog" aria-label="ShopSage">\r
	<header class="ss-header">\r
		<div class="brand">\r
			<img\r
				src=""\r
				alt="Verdict Logo"\r
				width="32"\r
				height="32"\r
				id="ss-logo"\r
			/>\r
			<div class="title">Вердикт</div>\r
		</div>\r
		<button class="ss-close" title="Закрыть">✕</button>\r
	</header>\r
	<main class="ss-body">\r
		<div class="ss-controls">\r
			<button id="ss-analyze" class="btn-primary">Анализировать отзывы</button>\r
			<div class="ss-info">Выбрано <span id="ss-count">0</span> отзывов</div>\r
			<div class="ss-meta">\r
				<div class="muted">Рейтинг: <strong id="ss-rating">—</strong></div>\r
				<div class="muted">Всего: <strong id="ss-total">—</strong></div>\r
			</div>\r
			<div id="ss-loader" class="ss-loader hidden" aria-hidden="true"></div>\r
		</div>\r
\r
		<div id="ss-error" class="error-msg hidden"></div>\r
\r
		<div class="ss-score hidden" id="ss-score-container">\r
			<div class="score-badge" id="ss-score-badge">—</div>\r
			<div class="score-bar">\r
				<div\r
					class="score-bar-inner"\r
					id="ss-score-bar-inner"\r
					style="width: 0%"\r
				></div>\r
			</div>\r
		</div>\r
		<div class="score-sub hidden" id="ss-score-sub"></div>\r
\r
		<div id="ss-result" class="ss-result hidden" aria-live="polite">\r
			<section>\r
				<h4>Плюсы</h4>\r
				<ul id="ss-pros" class="pros-list"></ul>\r
			</section>\r
			<section>\r
				<h4>Минусы</h4>\r
				<ul id="ss-cons" class="cons-list"></ul>\r
			</section>\r
			<section>\r
				<h4>Итог</h4>\r
				<div id="ss-verdict" class="ss-verdict"></div>\r
			</section>\r
		</div>\r
	</main>\r
</aside>\r
`,Rt=`/* Base styles */\r
.shopsage-sidebar {\r
  width: 380px;\r
  max-height: calc(100vh - 120px);\r
  background: linear-gradient(180deg, #061226, #071431);\r
  color: #e6eef8;\r
  border-radius: 12px;\r
  box-shadow: 0 20px 40px rgba(2, 6, 23, 0.6);\r
  z-index: 999999;\r
  overflow: hidden;\r
  display: flex;\r
  flex-direction: column;\r
  font-family: "Montserrat", sans-serif;\r
  font-optical-sizing: auto;\r
  border: 1px solid rgba(255, 255, 255, 0.03);\r
  backdrop-filter: blur(6px);\r
}\r
@keyframes slideInShadow {\r
  from {\r
    transform: translateY(6px) translateX(6px) scale(0.98);\r
    opacity: 0;\r
  }\r
  to {\r
    transform: none;\r
    opacity: 1;\r
  }\r
}\r
.ss-header {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  padding: 12px 14px;\r
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);\r
}\r
.brand {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
}\r
.brand .title {\r
  font-weight: 700;\r
  color: #eaf2ff;\r
  font-size: 15px;\r
}\r
.ss-close {\r
  background: transparent;\r
  border: 0;\r
  color: rgba(230, 238, 248, 0.85);\r
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
.ss-body {\r
  padding: 12px;\r
  overflow: auto;\r
  max-height: calc(100vh - 160px);\r
  -webkit-overflow-scrolling: touch;\r
}\r
.ss-controls {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  margin-bottom: 12px;\r
  flex-wrap: wrap;\r
}\r
.btn-primary {\r
  background: linear-gradient(90deg, #7c3aed, #4f46e5);\r
  border: 0;\r
  padding: 8px 12px;\r
  border-radius: 8px;\r
  color: white;\r
  font-weight: 700;\r
  cursor: pointer;\r
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.18);\r
}\r
.btn-primary:active {\r
  transform: translateY(1px);\r
}\r
.btn-primary:disabled {\r
  opacity: 0.6;\r
  cursor: not-allowed;\r
}\r
\r
.ss-loader {\r
  width: 28px;\r
  height: 28px;\r
  border-radius: 50%;\r
  border: 3px solid rgba(255, 255, 255, 0.06);\r
  border-top-color: #7c3aed;\r
  animation: spin 0.9s linear infinite;\r
}\r
@keyframes spin {\r
  to {\r
    transform: rotate(360deg);\r
  }\r
}\r
\r
.hidden {\r
  display: none;\r
}\r
\r
.ss-result section {\r
  margin-bottom: 10px;\r
}\r
.ss-result h4 {\r
  margin: 0 0 6px 0;\r
  font-size: 13px;\r
  color: #ffd54f;\r
}\r
.ss-result ul {\r
  margin: 0;\r
  padding-left: 18px;\r
  color: #cfe6ff;\r
}\r
.ss-verdict {\r
  background: rgba(255, 255, 255, 0.02);\r
  padding: 8px;\r
  border-radius: 8px;\r
  color: #e8f4ff;\r
}\r
\r
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
  border-radius: 8px;\r
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.006), rgba(0, 0, 0, 0.01));\r
  transition:\r
    transform 0.12s ease,\r
    background 0.12s;\r
}\r
.pros-list li:hover,\r
.cons-list li:hover {\r
  transform: translateY(-3px);\r
  background: rgba(255, 255, 255, 0.01);\r
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
.ss-meta {\r
  color: rgba(207, 230, 255, 0.9);\r
  font-size: 13px;\r
  margin-left: 6px;\r
  display: flex;\r
  gap: 10px;\r
  align-items: center;\r
}\r
.ss-meta .muted {\r
  color: rgba(154, 164, 178, 0.9);\r
  font-size: 12px;\r
}\r
\r
#ss-result {\r
  opacity: 0;\r
  transform: translateY(6px);\r
  transition:\r
    opacity 0.26s ease,\r
    transform 0.26s ease;\r
}\r
#ss-result.show {\r
  opacity: 1;\r
  transform: translateY(0);\r
}\r
\r
/* Score UI */\r
.ss-score {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  margin: 12px 0;\r
  padding: 10px;\r
  background: rgba(255, 255, 255, 0.02);\r
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\r
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
  color: rgba(207, 230, 255, 0.7);\r
  margin-top: 6px;\r
  line-height: 1.4;\r
}\r
\r
/* Error message */\r
.error-msg {\r
  background: rgba(239, 68, 68, 0.1);\r
  border: 1px solid rgba(239, 68, 68, 0.2);\r
  color: #fca5a5;\r
  padding: 10px;\r
  border-radius: 8px;\r
  margin: 10px 0;\r
  font-size: 13px;\r
}\r
\r
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
`;function $(){if(document.getElementById(J)){const u=document.getElementById(J)._hostElement;if(!u)return;u.style.opacity==="1"?et():(u.style.opacity="1",u.style.transform="translateY(0) scale(1)");return}const t=document.createElement("div");t.id=J,Object.assign(t.style,{all:"initial",position:"fixed",right:"20px",top:"60px",zIndex:"2147483647",pointerEvents:"auto"});const s=t.attachShadow({mode:"open"});t._hostElement=t;const i=document.createElement("style");i.textContent=Rt,s.appendChild(i);const e=document.createElement("div");e.innerHTML=yt,s.appendChild(e);const a=s.querySelector("#ss-logo");a&&(a.src=chrome.runtime.getURL("assets/icons/icon.svg")),document.body.appendChild(t);const r=s,v=r.querySelector(".shopsage-sidebar"),w=r.querySelector(".ss-close"),m=r.querySelector("#ss-analyze"),k=r.querySelector("#ss-loader"),T=r.querySelector("#ss-count"),z=r.querySelector("#ss-result"),O=r.querySelector("#ss-pros"),M=r.querySelector("#ss-cons"),C=r.querySelector("#ss-verdict"),L=r.querySelector("#ss-rating"),o=r.querySelector("#ss-total"),n=r.querySelector("#ss-error"),l=r.querySelector("#ss-score-container"),d=r.querySelector("#ss-score-badge"),c=r.querySelector("#ss-score-bar-inner"),b=r.querySelector("#ss-score-sub");requestAnimationFrame(()=>{Object.assign(t.style,{opacity:"0",transform:"translateY(8px) scale(.995)",transition:"opacity .28s cubic-bezier(.2,.9,.2,1), transform .36s cubic-bezier(.2,.9,.2,1)"}),setTimeout(()=>{t.style.opacity="1",t.style.transform="translateY(0) scale(1)"},20)}),w&&w.addEventListener("click",et),m&&m.addEventListener("click",X);const F=ut();T&&(T.innerText=F.length);const R=ct();L&&(L.innerText=R.avgRating!=null?R.avgRating:"—"),o&&(o.innerText=R.totalRatings!=null?R.totalRatings:"—");function A(I){n&&(n.innerText=I,n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},5e3))}function X(I){m&&(m.disabled=!0),k&&k.classList.remove("hidden"),z&&(z.classList.add("hidden"),z.classList.remove("show")),l&&l.classList.add("hidden"),b&&b.classList.add("hidden"),n&&n.classList.add("hidden");const u=15e3,U=`

`;chrome.storage.sync.get({maxReviews:40,serverUrl:""},Y=>{const G=Number.isFinite(Number(Y.maxReviews))&&Number(Y.maxReviews)>0?Number(Y.maxReviews):40,D=ut(G),N=D.length;if(N===0){k&&k.classList.add("hidden"),m&&(m.disabled=!1),A("Не найдено отзывов на странице. Попробуйте прокрутить страницу или перейти на страницу с отзывами.");return}const E=[];let B="";for(let p=0;p<D.length;p++){const S=D[p]||"";if(S)if(B.length===0)if(S.length<=u)B=S,E.push(S);else{const h=S.slice(0,u-1)+"…";B=h,E.push(h);break}else if(B.length+U.length+S.length<=u)B=B+U+S,E.push(S);else break}T&&(T.innerText=`${E.length} (из ${N})`);const H=ct();L&&(L.innerText=H.avgRating!=null?H.avgRating:"—"),o&&(o.innerText=H.totalRatings!=null?H.totalRatings:"—");const j=E,x={url:location.href,title:document.title,totalRatings:H.totalRatings,avgRating:H.avgRating};console.log("ShopSage: Sending analysis request",{reviewCount:j.length,product:x,serverUrl:Y.serverUrl||"default"}),chrome.runtime.sendMessage({action:bt,reviews:j,product:x,serverUrl:Y.serverUrl||""},p=>{if(chrome.runtime.lastError){console.error("ShopSage: runtime.lastError",chrome.runtime.lastError),k&&k.classList.add("hidden"),m&&(m.disabled=!1),A("Ошибка связи с расширением. Перезагрузите страницу и попробуйте снова.");return}if(k&&k.classList.add("hidden"),m&&(m.disabled=!1),!p){console.error("ShopSage: Empty response from background"),A("Не получен ответ от сервера. Проверьте настройки или попробуйте позже.");return}if(!p.ok){console.error("ShopSage: Analysis failed",p);let h="Ошибка анализа";p.error?h=p.error:p.message&&(h=p.message),h.includes("fetch failed")||h.includes("Failed to fetch")?h="Не удалось подключиться к серверу. Проверьте URL сервера в настройках.":h.includes("timeout")?h="Превышено время ожидания ответа от сервера.":h.includes("404")?h="Сервер не найден. Проверьте URL в настройках.":(h.includes("500")||h.includes("502")||h.includes("503"))&&(h="Ошибка сервера. Попробуйте позже."),A(h);return}const S=p.data||{};console.info("ShopSage: Analysis successful",p),P(S,x,j.length)})})}function P(I,u={},U=0){n&&n.classList.add("hidden");const Y=Array.isArray(I.pros)?I.pros:[],G=Array.isArray(I.cons)?I.cons:[];O&&(O.innerHTML="",Y.forEach((g,y)=>{const f=document.createElement("li");f.innerHTML='<div class="tag">'+(y+1)+'</div><div class="snippet"></div>',f.querySelector(".snippet").innerText=g,O.appendChild(f)})),M&&(M.innerHTML="",G.forEach((g,y)=>{const f=document.createElement("li");f.innerHTML='<div class="tag">'+(y+1)+'</div><div class="snippet"></div>',f.querySelector(".snippet").innerText=g,M.appendChild(f)}));let D=document.querySelector('[data-auto="rating"]');D&&(u.avgRating=parseFloat(D.textContent.trim().replace(",","."))),C&&(C.innerText=I.verdict||"Нет явного вердикта");let N=u&&u.avgRating!=null?Number(u.avgRating):u&&u.rating!=null?Number(u.rating):null,E=u&&u.totalRatings!=null?Number(u.totalRatings):u&&u.totalReviews!=null?Number(u.totalReviews):null;try{if(typeof tt=="function"){const g=tt();g&&(N==null&&g.avg!=null&&(N=g.avg),E==null&&g.totalRatings!=null&&(E=g.totalRatings))}}catch{}L&&(L.innerText=N??"—"),o&&(o.innerText=E??"—");const B=typeof tt=="function"?tt():null,H=E||u&&(u.totalReviews||0)||0,j=N??(u&&(u.avgRating||u.rating)?u.avgRating||u.rating:null);let x=Math.max(0,Number(H||0)),p=0,S=null,h=null,K=null;if(B){const g={};let y=!1;for(let f=1;f<=5;f++){const _=B[String(f)];_!=null&&Number.isFinite(Number(_))&&Number(_)>0?(g[f]=Number(_),y=!0):g[f]=0}y&&(K=g),N==null&&B.avg!=null&&(N=B.avg),E==null&&B.totalRatings!=null&&(E=B.totalRatings)}if(K)p=Number(K[5]||0)+Number(K[4]||0),x=Object.keys(K).reduce((g,y)=>g+Number(K[y]||0),0),h=x>0?p/x:null,S=N!=null?N/5:h??.5;else if(x>0&&j!=null){const g=Math.max(0,Math.min(1,(j-1)/4));p=Math.round(g*x),h=x>0?p/x:null,S=j/5}else{const g=Array.isArray(I.pros)?I.pros.length:0,y=Array.isArray(I.cons)?I.cons.length:0;if(g+y>0){const f=g/(g+y);x=Math.max(x,g+y),p=Math.round(f*x),h=f,S=f}else{x=Math.max(x,U||0);const f=.5;p=Math.round(f*x),h=f,S=S??f}}const dt=2,gt=2,at=dt+p,ft=gt+(x-p),Q=at/(at+ft);function ht(g,y,f=1.96){if(y===0)return{low:0,high:1};const _=g/y,rt=f*f,it=1+rt/y,st=_+rt/(2*y),lt=f*Math.sqrt((_*(1-_)+rt/(4*y))/y),mt=Math.max(0,(st-lt)/it),pt=Math.min(1,(st+lt)/it);return{low:mt,high:pt}}const nt=ht(p,Math.max(1,x));S==null&&(S=Q);const V=Math.round((Q*.6+S*.4)*100);let Z="",W="";if(V>=75?(Z="Однозначно стоит выбрать",W="linear-gradient(90deg,#a3e635,#10b981)"):V>=60?(Z="В целом рекомендуем",W="linear-gradient(90deg,#facc15,#84cc16)"):V>=45?(Z="Стоит взвесить плюсы и минусы",W="linear-gradient(90deg,#f59e0b,#f97316)"):(Z="Лучше поискать альтернативу",W="linear-gradient(90deg,#ef4444,#ea580c)"),l&&l.classList.remove("hidden"),d&&(d.innerText=V+"%",d.style.background=W),c&&(c.style.width=V+"%"),b){b.classList.remove("hidden");const g=Math.round(nt.low*100),y=Math.round(nt.high*100),f=x>0?x:U||"—",_=N!=null?`${N}`:"—";b.innerText=`${Z} — вероятность успеха ≈ ${Math.round(Q*100)}% (интервал ${g}–${y}%), на основе ${f} оценок; положительных (4–5★): ${p}. Средний рейтинг: ${_}.`}T&&(U!=null&&U!==0?T.innerText=`${U} (из ${E??"—"})`:T.innerText=E??"—"),z&&(z.classList.remove("hidden"),setTimeout(()=>z.classList.add("show"),30)),console.info("ShopSage: stats",{n:x,k:p,estPosRate:h,posteriorMean:Q,wilson:nt,composite:V,rec:Z,pageAvg:N,pageTotalRatings:E,prosCount:Y.length,consCount:G.length})}t._shadow=s,t._container=v}function et(){const t=document.getElementById(J);t&&(t.style.opacity="0",t.style.transform="translateY(8px) scale(.995)",setTimeout(()=>{try{const s=document.getElementById(J);s&&s.remove()}catch{}},300))}function St(t,s,i){try{const e=t.config||{};if(chrome&&chrome.storage&&chrome.storage.sync)return chrome.storage.sync.set({serverUrl:e.serverUrl||"",maxReviews:e.maxReviews!=null?e.maxReviews:void 0},()=>{try{if(typeof $=="function"){try{$(),i&&i({ok:!0,message:"openSidebar() called"})}catch(r){console.warn("openSidebar call failed",r),i&&i({ok:!1,error:String(r)})}return}if(typeof window.openSidebar=="function")try{window.openSidebar(),i&&i({ok:!0,message:"window.openSidebar() called"});return}catch{}if(typeof window.createSidebar=="function")try{window.createSidebar(),i&&i({ok:!0,message:"window.createSidebar() called"});return}catch{}const a=document.getElementById(ot)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2")||document.getElementById("shopsage-open-btn-v3");if(a)try{a.click(),i&&i({ok:!0,message:"button clicked"});return}catch(r){i&&i({ok:!1,message:"failed to click button",error:String(r)});return}i&&i({ok:!1,message:"no sidebar open API found"})}catch(a){console.error("handleOpenSidebarMessage inner error",a),i&&i({ok:!1,error:String(a)})}}),!0;try{typeof $=="function"?($(),i&&i({ok:!0,message:"openSidebar() called (no storage)"})):i&&i({ok:!1,message:"storage unavailable and openSidebar missing"})}catch(a){i&&i({ok:!1,error:String(a)})}}catch(e){console.error("handleOpenSidebarMessage error",e);try{i&&i({ok:!1,error:String(e)})}catch{}}return!1}function kt(t,s,i){try{if(!t||!t.action)return;if(t.action==="OPEN_SIDEBAR")return St(t,s,i)}catch(e){console.error("handleRuntimeMessage error",e);try{i&&i({ok:!1,error:String(e)})}catch{}}return!1}try{chrome&&chrome.runtime&&chrome.runtime.onMessage&&chrome.runtime.onMessage.addListener(kt)}catch{}if(!window.__shopSageInitialized){try{typeof $=="function"&&(window.openSidebar=$),typeof et=="function"&&(window.closeSidebar=et),typeof $=="function"&&(window.createSidebar=$)}catch{}try{vt({ROOT_ID:J,BTN_ID:ot,ICON_PATH:xt,onOpenSidebar:typeof $=="function"?$:()=>{const t=document.getElementById(ot)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2");if(t)try{t.click()}catch{}}})}catch(t){console.error("ShopSage: initContent failed",t)}window.__shopSageInitialized=!0}export{et as closeSidebar,$ as openSidebar};
