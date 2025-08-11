import{initContent as xt}from"./content-B4YMLfgP.js";const Z="shopsage-root-v3",it="shopsage-open-btn-v3",wt="ANALYZE",yt=chrome&&chrome.runtime&&chrome.runtime.getURL?chrome.runtime.getURL("assets/icons/icon.svg"):"/assets/icons/icon.svg";function C(t){if(t==null)return null;const s=String(t).trim();if(!s)return null;const i=s.match(/([\d.,]+)\s*[Kk]/);if(i){const r=parseFloat(i[1].replace(",","."));if(Number.isFinite(r))return Math.round(r*1e3)}const e=s.replace(/\s+/g,"").replace(/[^0-9\.,]/g,"").replace(",","."),o=parseFloat(e);return Number.isFinite(o)?o:null}function ut(){const t={totalReviews:null,rating:null,totalRatings:null,avgRating:null};try{try{const e=document.querySelector('meta[itemprop="reviewCount"], meta[name="reviewCount"], meta[name="reviews"]');e&&e.content&&(t.totalReviews=Math.round(C(e.content))||null)}catch{}try{const e=document.querySelector('meta[itemprop="ratingValue"], meta[name="rating"], meta[itemprop="rating"]');e&&e.content&&(t.rating=Math.round(C(e.content)*100)/100||null)}catch{}const s=['[data-auto="rating-count-text"]',".rating-count",".reviews-count",".votes-count",".ratings-count",".rating__count",".rate__count",".count-ratings",'[data-test="ratings-count"]'];for(const e of s)try{const o=document.querySelector(e);if(o&&(o.innerText||o.textContent)){const r=C(o.innerText||o.textContent);if(r!=null){t.totalRatings=Math.round(r);break}}}catch{}if(t.totalRatings==null){const e=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const o of e){const p=(o.getAttribute("aria-label")||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голос|голосов|votes|ratings)/i);if(p){t.totalRatings=Math.round(C(p[1]));break}}}if(t.totalRatings==null){const o=(document.body.innerText||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голосов|votes|ratings)/i);o&&(t.totalRatings=Math.round(C(o[1])))}const i=['[data-auto="rating"]','[data-auto="rating-value"]',".average-rating",".avg-rating",".rating-value",".rating__value",".product-rating",".ds-text_weight_bold"];for(const e of i)try{const o=document.querySelector(e);if(o&&(o.innerText||o.textContent)){const r=C(o.innerText||o.textContent);if(r!=null){t.avgRating=Math.round(r*100)/100;break}}}catch{}if(t.avgRating==null){const e=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const o of e){const p=(o.getAttribute("aria-label")||"").match(/([0-5](?:[.,][0-9])?)\s*(зв|звезды|рейтинг|rating)/i);if(p){t.avgRating=C(p[1]);break}}}if(t.avgRating==null){const o=(document.body.innerText||"").match(/(?:средн(?:ий|ая)\s*рейтинг|рейтинг|rating)[:\s]*([0-5](?:[.,][0-9])?)/i);o&&(t.avgRating=C(o[1]))}try{const e=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(e){const o=e.getAttribute("ratingvalue")||e.getAttribute("data-ratingvalue"),r=e.getAttribute("ratingcount")||e.getAttribute("data-ratingcount")||e.getAttribute("raitingcounttext")||e.getAttribute("data-ratingcounttext"),p=e.getAttribute("reviewcount")||e.getAttribute("data-reviewcount")||e.getAttribute("reviewcounttext")||e.getAttribute("data-reviewcounttext");if(o&&t.avgRating==null&&(t.avgRating=C(o)),r&&t.totalRatings==null){const w=String(r).match(/([0-9\s,.Kk]+)/);if(w){const h=w[1].replace(/\s+/g,"");t.totalRatings=Math.round(C(h))}}if(p&&t.totalReviews==null){const w=String(p).match(/([0-9\s,.Kk]+)/);w&&(t.totalReviews=Math.round(C(w[1])))}}}catch{}try{if(typeof window.extractRatingBreakdown=="function"){const e=window.extractRatingBreakdown();e&&(t.avgRating==null&&e.avg!=null&&(t.avgRating=e.avg),t.totalRatings==null&&e.totalRatings!=null&&(t.totalRatings=e.totalRatings),t.totalReviews==null&&e.totalReviews!=null&&(t.totalReviews=e.totalReviews))}}catch{}}catch(s){console.warn("extractProductMeta error",s)}return t.totalRatings==null&&t.totalReviews!=null&&(t.totalRatings=t.totalReviews),t.avgRating==null&&t.rating!=null&&(t.avgRating=t.rating),t.totalRatings=typeof t.totalRatings=="number"&&Number.isFinite(t.totalRatings)?Math.round(t.totalRatings):null,t.avgRating=typeof t.avgRating=="number"&&Number.isFinite(t.avgRating)?Math.round(t.avgRating*100)/100:null,t.totalReviews=t.totalReviews||null,t.rating=t.rating||null,t}function nt(){const t={5:null,4:null,3:null,2:null,1:null,avg:null,totalRatings:null,totalReviews:null};try{const s=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(s){const p=s.getAttribute("ratingvalue")||s.getAttribute("data-ratingvalue"),w=s.getAttribute("ratingcount")||s.getAttribute("data-ratingcount")||s.getAttribute("raitingcounttext"),h=s.getAttribute("reviewcount")||s.getAttribute("data-reviewcount")||s.getAttribute("reviewcounttext");p&&(t.avg=parseFloat(String(p).replace(",","."))||t.avg),w&&(t.totalRatings=C(w)||t.totalRatings),h&&(t.totalReviews=C(h)||t.totalReviews)}const i=document.querySelector('[data-auto="rating-count-text"], [data-auto="ratingCount"], .rating-count, .ds-text[data-auto="rating-count-text"]'),e=document.querySelector('[data-auto="review-count-text"], .review-count, .ds-text[data-auto="review-count-text"]');i&&!t.totalRatings&&(t.totalRatings=C(i.innerText||i.textContent)||t.totalRatings),e&&!t.totalReviews&&(t.totalReviews=C(e.innerText||e.textContent)||t.totalReviews);const o=[".rating-breakdown",".rating-histogram",".rating-list",".rating-distribution",'[data-auto="rating-breakdown"]',".review-stats",".rating-row",".ratingRow",".ds-rating-list"];for(const p of o){const w=document.querySelector(p);if(!w)continue;const h=Array.from(w.querySelectorAll("*"));let k=0;for(const N of h){const z=(N.textContent||"").trim(),B=z.match(/^\s*([1-5])\D{0,6}([0-9\s,.Kk]{1,12})\s*$/);if(B){const T=Number(B[1]),M=C(B[2]);T>=1&&T<=5&&M!=null&&(t[T]=M,k++)}else{const T=z.match(/^\s*([1-5])\s*$/);if(T){const M=Number(T[1]);let I=null;const a=N.nextElementSibling||N.parentElement&&N.parentElement.querySelector(".count, .value, .number, .ds-text");a&&(I=C(a.textContent||a.innerText)),I!=null&&(t[M]=I,k++)}}}if(k>0)break}const r=Array.from(document.querySelectorAll('noframes[data-apiary="patch"]')||[]);for(const p of r){const w=(p.textContent||"").trim();if(w)try{const h=JSON.parse(w);if(h.collections&&h.collections.businessReviewStats){const T=Object.keys(h.collections.businessReviewStats);if(T.length){const M=h.collections.businessReviewStats[T[0]];if(M&&(M.reviewsCount&&!t.totalReviews&&(t.totalReviews=Number(M.reviewsCount)||t.totalReviews),M.reviewsCountVisualization&&!t.totalRatings)){const I=String(M.reviewsCountVisualization).match(/([\d.,]+)K/i);I&&(t.totalRatings=Math.round(parseFloat(I[1].replace(",","."))*1e3))}}}const k=w,N=k.match(/"ratingvalue"\s*:\s*"?([0-9.,]+)"?/i),z=k.match(/"ratingcount"\s*:\s*(\d+)/i),B=k.match(/"reviewcount"\s*:\s*(\d+)/i);N&&(t.avg=parseFloat(N[1].replace(",","."))||t.avg),z&&(t.totalRatings=Number(z[1])||t.totalRatings),B&&(t.totalReviews=Number(B[1])||t.totalReviews)}catch{}}}catch{}return["5","4","3","2","1"].forEach(s=>{t[s]==null&&(t[s]=null)}),t.avg!=null&&(t.avg=Math.round(Number(t.avg)*100)/100),t.totalRatings!=null&&(t.totalRatings=Math.round(Number(t.totalRatings))),t.totalReviews!=null&&(t.totalReviews=Math.round(Number(t.totalReviews))),t}function Rt(t=15e3){const s={reviews:[],totalFound:0,charactersUsed:0,extractionMethods:[]};try{let i=function(){const a=['[data-auto="reviews-show-more"]','[data-autotest-id*="show-more"]',".reviews-show-more",".show-more",".load-more","button"],n=new Set;for(const l of a)try{Array.from(document.querySelectorAll(l)).forEach(c=>{try{if(!(c instanceof HTMLElement))return;const b=window.getComputedStyle(c);if(b.display==="none"||b.visibility==="hidden"||c.disabled)return;const $=(c.innerText||c.textContent||"").trim();(/показать|еще|ещё|загрузить|more|show/i.test($)||l.indexOf("show-more")>=0||l.indexOf("reviews-show-more")>=0)&&!n.has(c)&&(c.click(),n.add(c),setTimeout(()=>{try{c.disabled||c.click()}catch{}},900))}catch{}})}catch{}try{const l=document.querySelector('[data-zone-name="reviews"], [data-auto="ugc-section"], .reviews, .n-reviews, .review-list, [data-auto="reviews"]');if(l)try{l.scrollIntoView({behavior:"smooth"}),l.scrollTop=l.scrollHeight}catch{}else window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})}catch{}},e=function(){const a=['button[class*="expand"]','button[class*="show-full"]','[data-auto*="expand"]',".review-expand",".opinion-expand",'button:contains("Развернуть")','button:contains("Показать полностью")','button:contains("Читать полностью")','[class*="read-more"]'];for(const n of a)try{document.querySelectorAll(n).forEach(u=>{try{u.offsetHeight>0&&u.click()}catch{}})}catch{}},o=function(){const a=[];try{document.querySelectorAll("script").forEach(u=>{if(!u.textContent)return;[/"reviews":\s*\[(.*?)\]/gs,/"opinions":\s*\[(.*?)\]/gs,/"reviewText":\s*"([^"]+)"/g,/"text":\s*"([^"]+)"/g,/"comment":\s*"([^"]+)"/g].forEach(b=>{const $=u.textContent.matchAll(b);for(const R of $)try{if(R[1]&&R[1].length>30){const A=R[1].replace(/\\n/g," ").replace(/\\"/g,'"').replace(/\\\\/g,"\\").trim();A.length>30&&a.push(A)}}catch{}})}),document.querySelectorAll("[data-bem]").forEach(u=>{try{Object.values(u.dataset).forEach(c=>{if(!(!c||c.length<100))try{const b=JSON.parse(c),$=b.reviews||b.opinions;Array.isArray($)&&$.forEach(R=>{const A=R.text||R.content||R.comment;A&&A.length>30&&a.push(String(A))})}catch{}})}catch{}})}catch{}return a},r=function(a){if(!a)return"";let n=String(a).replace(/\r\n|\r/g,`
`).replace(/\t/g," ").replace(/\u00A0/g," ");n=n.replace(/\s+/g," ").trim(),n=n.replace(/\b(?:\d+\s+){3,}\d+\b/g," "),n=n.replace(/\b\d{3,}\b/g," "),n=n.replace(/(?:\b\d+\b[\s,.-]*){3,}/g," ");try{n=n.replace(/[^\p{L}\p{N}\s\.,!?\-()«»—:;\/%]/gu," ")}catch{n=n.replace(/[^A-Za-zА-Яа-яЁё0-9\s\.,!?\-()«»—:;\/%]/g," ")}return n=n.replace(/([,!.?–—\-]){2,}/g,"$1"),n=n.replace(/\s+/g," ").trim(),n},p=function(a){if(!a)return"";const n=[".review-text",".opinion-text",".review-content",".comment-text",'[data-auto="review-text"]','[class*="text"]',"p",".content"];try{for(const c of n){const b=a.querySelector?a.querySelector(c):null;if(b&&b.innerText&&b.innerText.trim().length>20)return r(b.innerText)}}catch{}let l="";try{l=a.innerText||a.textContent||""}catch{l=""}return[/Достоинства:?\s*/gi,/Недостатки:?\s*/gi,/Комментарий:?\s*/gi,/Опыт использования:?\s*/gi,/Рекомендую\s*/gi,/Не рекомендую\s*/gi,/\d+\s*из\s*\d+\s*считают отзыв полезным/gi,/Был ли отзыв полезен\?/gi,/Да\s*\d*\s*Нет\s*\d*/gi,/\d+\s*звезд[ыа]?/gi,/Оценка:\s*\d+/gi].forEach(c=>{l=l.replace(c," ")}),r(l)},w=function(a){if(!a)return!1;const n=a.length;return!(n<40||(a.match(/\d/g)||[]).length/Math.max(1,n)>.3||(a.match(/[A-Za-zА-Яа-яЁё]/g)||[]).length<12||(a.match(/[А-Яа-яЁё]/g)||[]).length<Math.min(10,Math.floor(n*.2))||/^(source|businessId|notEmpty|id|source,)/i.test(a.trim()))},h=function(a){const n=new Set,l=[];return a.forEach(u=>{const c=u.text.toLowerCase().replace(/\s+/g,"").substring(0,100);n.has(c)||(n.add(c),l.push(u))}),l},k=function(a,n){const l=[];let u=0;const b=`

`.length,$=a.sort((R,A)=>A.length-R.length);for(const R of $){const A=R.length,Q=u===0?A:A+b;if(u+Q<=n)l.push(R),u+=Q;else if(u===0){const K=R.substring(0,n-3)+"...";l.push(K),u=K.length;break}else{const K=n-u-b;if(K>50){const O=R.substring(0,K-3)+"...";l.push(O);break}else break}}return l};i(),e();const N=['[data-auto="review-item"]','[data-zone-name="review"]','[data-autotest-id="review-card"]','[data-tid="review-item"]','[data-auto="OpinionCard"]',".opinion",".review-item",".user-review",'[class*="review"]','[class*="opinion"]','[data-zone*="review"]',".n-review-card",".ProductReview",'iframe[src*="review"] + *','[data-bem*="review"]'],z=new Set;for(const a of N)try{const n=document.querySelectorAll(a);n.forEach(l=>{try{l&&l.innerText&&l.innerText.trim().length>20&&z.add(l)}catch{}}),n.length>0&&s.extractionMethods.push(`${a}: ${n.length} элементов`)}catch{}const B=o(),T=[];z.forEach(a=>{try{const n=p(a),l=r(n);w(l)&&T.push({text:l,source:"dom",length:l.length,element:a})}catch{}}),B.forEach(a=>{try{const n=r(a);w(n)&&T.push({text:n,source:"json",length:n.length})}catch{}});const M=h(T);M.sort((a,n)=>n.length-a.length);const I=k(M.map(a=>a.text),t);return s.reviews=I,s.totalFound=M.length,s.charactersUsed=I.reduce((a,n)=>a+(n?n.length:0),0),s}catch(i){return console.warn("extractYandexMarketReviews error",i),s}}function gt(t=60){if(window.location.hostname.includes("market.yandex")||document.title.includes("Яндекс.Маркет")||document.querySelector('[data-baobab-name*="market"]'))return console.log("ShopSage: Detected Yandex Market, using enhanced extraction"),Rt(15e3).reviews;const i=['[data-zone-name="review"]','[data-autotest-id="review-card"]',".review__item",".product-review",".review",".comments-item",'[data-test-id*="review"]',".feedback",".pa-review",".review-item",".reviewCard"],e=[];for(const r of i){const p=document.querySelectorAll(r);if(p&&p.length){e.push(...Array.from(p));break}}const o=e.map(r=>r.innerText?r.innerText.trim():"").filter(r=>r&&r.length>30).slice(0,t);return console.debug("ShopSage: Standard extraction found",o.length,"reviews"),o}const St=`<aside\r
	class="shopsage-sidebar"\r
	role="dialog"\r
	aria-label="Verdict — анализ отзывов"\r
>\r
	<header class="ss-header">\r
		<div class="brand" aria-hidden="false">\r
			<img src="" alt="Verdict Logo" width="32" height="32" id="ss-logo" />\r
			<div class="title">Вердикт</div>\r
		</div>\r
		<button class="ss-close" title="Закрыть" aria-label="Закрыть">✕</button>\r
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
`,kt=`:host {\r
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
`;function Y(){if(document.getElementById(Z)){const d=document.getElementById(Z)._hostElement;if(!d)return;d.style.opacity==="1"?rt():(d.style.opacity="1",d.style.transform="translateY(0) scale(1)");return}const t=document.createElement("div");t.id=Z,Object.assign(t.style,{all:"initial",position:"fixed",right:"20px",top:"60px",zIndex:"2147483647",pointerEvents:"auto"});const s=t.attachShadow({mode:"open"});t._hostElement=t;const i=document.createElement("style");i.textContent=kt,s.appendChild(i);const e=document.createElement("div");e.innerHTML=St,s.appendChild(e);const o=s.querySelector("#ss-logo");o&&(o.src=chrome.runtime.getURL("assets/icons/icon.svg")),document.body.appendChild(t);const r=s,p=r.querySelector(".shopsage-sidebar"),w=r.querySelector(".ss-close"),h=r.querySelector("#ss-analyze"),k=r.querySelector("#ss-loader"),N=r.querySelector("#ss-count"),z=r.querySelector("#ss-result"),B=r.querySelector("#ss-pros"),T=r.querySelector("#ss-cons"),M=r.querySelector("#ss-verdict"),I=r.querySelector("#ss-rating"),a=r.querySelector("#ss-total"),n=r.querySelector("#ss-error"),l=r.querySelector("#ss-score-container"),u=r.querySelector("#ss-score-badge"),c=r.querySelector("#ss-score-bar-inner"),b=r.querySelector("#ss-score-sub");requestAnimationFrame(()=>{Object.assign(t.style,{opacity:"0",transform:"translateY(8px) scale(.995)",transition:"opacity .28s cubic-bezier(.2,.9,.2,1), transform .36s cubic-bezier(.2,.9,.2,1)"}),setTimeout(()=>{t.style.opacity="1",t.style.transform="translateY(0) scale(1)"},20)}),w&&w.addEventListener("click",rt),h&&h.addEventListener("click",Q);const $=gt();N&&(N.innerText=$.length);const R=ut();I&&(I.innerHTML=formatRatingHTML(R.avgRating)),a&&(a.innerText=R.totalRatings!=null?R.totalRatings:"—");function A(S){n&&(n.innerText=S,J(n),setTimeout(()=>{O(n)},5e3))}function Q(S){h&&(h.disabled=!0),k&&J(k),z&&O(z),l&&O(l),b&&O(b),n&&O(n);const d=15e3,P=`

`;chrome.storage.sync.get({maxReviews:40,serverUrl:""},F=>{const W=Number.isFinite(Number(F.maxReviews))&&Number(F.maxReviews)>0?Number(F.maxReviews):40,q=gt(W);if(q.length===0){k&&O(k),h&&(h.disabled=!1),A("Не найдено отзывов на странице. Попробуйте прокрутить страницу или перейти на страницу с отзывами.");return}const H=[];let j="";for(let v=0;v<q.length;v++){const E=q[v]||"";if(E)if(j.length===0)if(E.length<=d)j=E,H.push(E);else{const m=E.slice(0,d-1)+"…";j=m,H.push(m);break}else if(j.length+P.length+E.length<=d)j=j+P+E,H.push(E);else break}const D=ut();I&&(I.innerHTML=tt(R.avgRating)),a&&(a.innerText=D.totalRatings!=null?D.totalRatings:"—");const x=H,L={url:location.href,title:document.title,totalRatings:D.totalRatings,avgRating:D.avgRating};console.log("ShopSage: Sending analysis request",{reviewCount:x.length,product:L,serverUrl:F.serverUrl||"default"}),chrome.runtime.sendMessage({action:wt,reviews:x,product:L,serverUrl:F.serverUrl||""},v=>{if(chrome.runtime.lastError){console.error("ShopSage: runtime.lastError",chrome.runtime.lastError),k&&O(k),h&&(h.disabled=!1),A("Ошибка связи с расширением. Перезагрузите страницу и попробуйте снова.");return}if(k&&O(k),h&&(h.disabled=!1),!v){console.error("ShopSage: Empty response from background"),A("Не получен ответ от сервера. Проверьте настройки или попробуйте позже.");return}if(!v.ok){console.error("ShopSage: Analysis failed",v);let m="Ошибка анализа";v.error?m=v.error:v.message&&(m=v.message),m.includes("fetch failed")||m.includes("Failed to fetch")?m="Не удалось подключиться к серверу. Проверьте URL сервера в настройках.":m.includes("timeout")?m="Превышено время ожидания ответа от сервера.":m.includes("404")?m="Сервер не найден. Проверьте URL в настройках.":(m.includes("500")||m.includes("502")||m.includes("503"))&&(m="Ошибка сервера. Попробуйте позже."),A(m);return}const E=v.data||{};console.info("ShopSage: Analysis successful",v),K(E,L,x.length)})});function tt(F){return F==null?"—":`${Math.round(F*10)/10} <svg class="star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.167L12 18.896l-7.336 3.868 1.402-8.167L.132 9.21l8.2-1.192z"/></svg>
`}}function K(S,d={},P=0){n&&O(n);const tt=Array.isArray(S.pros)?S.pros:[],F=Array.isArray(S.cons)?S.cons:[];B&&(B.innerHTML="",tt.forEach((g,y)=>{const f=document.createElement("li");f.innerHTML='<div class="tag">'+(y+1)+'</div><div class="snippet"></div>',f.querySelector(".snippet").innerText=g,B.appendChild(f)})),T&&(T.innerHTML="",F.forEach((g,y)=>{const f=document.createElement("li");f.innerHTML='<div class="tag">'+(y+1)+'</div><div class="snippet"></div>',f.querySelector(".snippet").innerText=g,T.appendChild(f)}));let W=document.querySelector('[data-auto="rating"]');W&&(d.avgRating=parseFloat(W.textContent.trim().replace(",","."))),M&&(M.innerText=S.verdict||"Нет явного вердикта");let q=d&&d.avgRating!=null?Number(d.avgRating):d&&d.rating!=null?Number(d.rating):null,_=d&&d.totalRatings!=null?Number(d.totalRatings):d&&d.totalReviews!=null?Number(d.totalReviews):null;try{if(typeof nt=="function"){const g=nt();g&&(q==null&&g.avg!=null&&(q=g.avg),_==null&&g.totalRatings!=null&&(_=g.totalRatings))}}catch{}const H=typeof nt=="function"?nt():null,j=_||d&&(d.totalReviews||0)||0,D=q??(d&&(d.avgRating||d.rating)?d.avgRating||d.rating:null);let x=Math.max(0,Number(j||0)),L=0,v=null,E=null,m=null;if(H){const g={};let y=!1;for(let f=1;f<=5;f++){const U=H[String(f)];U!=null&&Number.isFinite(Number(U))&&Number(U)>0?(g[f]=Number(U),y=!0):g[f]=0}y&&(m=g),q==null&&H.avg!=null&&(q=H.avg),_==null&&H.totalRatings!=null&&(_=H.totalRatings)}if(m)L=Number(m[5]||0)+Number(m[4]||0),x=Object.keys(m).reduce((g,y)=>g+Number(m[y]||0),0),E=x>0?L/x:null,v=q!=null?q/5:E??.5;else if(x>0&&D!=null){const g=Math.max(0,Math.min(1,(D-1)/4));L=Math.round(g*x),E=x>0?L/x:null,v=D/5}else{const g=Array.isArray(S.pros)?S.pros.length:0,y=Array.isArray(S.cons)?S.cons.length:0;if(g+y>0){const f=g/(g+y);x=Math.max(x,g+y),L=Math.round(f*x),E=f,v=f}else{x=Math.max(x,P||0);const f=.5;L=Math.round(f*x),E=f,v=v??f}}const ft=2,ht=2,st=ft+L,mt=ht+(x-L),et=st/(st+mt);function pt(g,y,f=1.96){if(y===0)return{low:0,high:1};const U=g/y,ot=f*f,lt=1+ot/y,ct=U+ot/(2*y),dt=f*Math.sqrt((U*(1-U)+ot/(4*y))/y),bt=Math.max(0,(ct-dt)/lt),vt=Math.min(1,(ct+dt)/lt);return{low:bt,high:vt}}const at=pt(L,Math.max(1,x));v==null&&(v=et);const V=Math.round((et*.6+v*.4)*100);let G="",X="";if(V>=75?(G="Однозначно стоит выбрать",X="linear-gradient(90deg,#a3e635,#10b981)"):V>=60?(G="В целом рекомендуем",X="linear-gradient(90deg,#facc15,#84cc16)"):V>=45?(G="Стоит взвесить плюсы и минусы",X="linear-gradient(90deg,#f59e0b,#f97316)"):(G="Лучше поискать альтернативу",X="linear-gradient(90deg,#ef4444,#ea580c)"),l&&J(l),u&&(u.innerText=V+"%",u.style.background=X),c&&(c.style.width=V+"%"),b){J(b);const g=Math.round(at.low*100),y=Math.round(at.high*100),f=x>0?x:P||"—",U=q!=null?`${q}`:"—";b.innerText=`${G} — вероятность успеха ≈ ${Math.round(et*100)}% (интервал ${g}–${y}%), на основе ${f} оценок; положительных (4–5★): ${L}. Средний рейтинг: ${U}★.`}N&&(P!=null&&P!==0?N.innerText=`${P} из ${_??"—"}`:N.innerText=_??"—"),z&&(J(z),setTimeout(()=>z.classList.add("show"),30)),console.info("ShopSage: stats",{n:x,k:L,estPosRate:E,posteriorMean:et,wilson:at,composite:V,rec:G,pageAvg:q,pageTotalRatings:_,prosCount:tt.length,consCount:F.length})}t._shadow=s,t._container=p;function O(S){S.classList.remove("visible"),S.classList.add("hidden")}function J(S){requestAnimationFrame(()=>{S.classList.remove("hidden"),S.classList.add("visible")})}}function rt(){const t=document.getElementById(Z);t&&(t.style.opacity="0",t.style.transform="translateY(8px) scale(.995)",setTimeout(()=>{try{const s=document.getElementById(Z);s&&s.remove()}catch{}},300))}function At(t,s,i){try{const e=t.config||{};if(chrome&&chrome.storage&&chrome.storage.sync)return chrome.storage.sync.set({serverUrl:e.serverUrl||"",maxReviews:e.maxReviews!=null?e.maxReviews:void 0},()=>{try{if(typeof Y=="function"){try{Y(),i&&i({ok:!0,message:"openSidebar() called"})}catch(r){console.warn("openSidebar call failed",r),i&&i({ok:!1,error:String(r)})}return}if(typeof window.openSidebar=="function")try{window.openSidebar(),i&&i({ok:!0,message:"window.openSidebar() called"});return}catch{}if(typeof window.createSidebar=="function")try{window.createSidebar(),i&&i({ok:!0,message:"window.createSidebar() called"});return}catch{}const o=document.getElementById(it)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2")||document.getElementById("shopsage-open-btn-v3");if(o)try{o.click(),i&&i({ok:!0,message:"button clicked"});return}catch(r){i&&i({ok:!1,message:"failed to click button",error:String(r)});return}i&&i({ok:!1,message:"no sidebar open API found"})}catch(o){console.error("handleOpenSidebarMessage inner error",o),i&&i({ok:!1,error:String(o)})}}),!0;try{typeof Y=="function"?(Y(),i&&i({ok:!0,message:"openSidebar() called (no storage)"})):i&&i({ok:!1,message:"storage unavailable and openSidebar missing"})}catch(o){i&&i({ok:!1,error:String(o)})}}catch(e){console.error("handleOpenSidebarMessage error",e);try{i&&i({ok:!1,error:String(e)})}catch{}}return!1}function Et(t,s,i){try{if(!t||!t.action)return;if(t.action==="OPEN_SIDEBAR")return At(t,s,i)}catch(e){console.error("handleRuntimeMessage error",e);try{i&&i({ok:!1,error:String(e)})}catch{}}return!1}try{chrome&&chrome.runtime&&chrome.runtime.onMessage&&chrome.runtime.onMessage.addListener(Et)}catch{}if(!window.__shopSageInitialized){try{typeof Y=="function"&&(window.openSidebar=Y),typeof rt=="function"&&(window.closeSidebar=rt),typeof Y=="function"&&(window.createSidebar=Y)}catch{}try{xt({ROOT_ID:Z,BTN_ID:it,ICON_PATH:yt,onOpenSidebar:typeof Y=="function"?Y:()=>{const t=document.getElementById(it)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2");if(t)try{t.click()}catch{}}})}catch(t){console.error("ShopSage: initContent failed",t)}window.__shopSageInitialized=!0}export{rt as closeSidebar,Y as openSidebar};
