import{initContent as vt}from"./content-B4YMLfgP.js";const J="shopsage-root-v3",ot="shopsage-open-btn-v3",bt="ANALYZE",xt=chrome&&chrome.runtime&&chrome.runtime.getURL?chrome.runtime.getURL("assets/icons/icon.svg"):"/assets/icons/icon.svg";function F(t){if(t==null)return null;const l=String(t).trim();if(!l)return null;const r=l.match(/([\d.,]+)\s*[Kk]/);if(r){const i=parseFloat(r[1].replace(",","."));if(Number.isFinite(i))return Math.round(i*1e3)}const e=l.replace(/\s+/g,"").replace(/[^0-9\.,]/g,"").replace(",","."),a=parseFloat(e);return Number.isFinite(a)?a:null}function ct(){const t={totalReviews:null,rating:null,totalRatings:null,avgRating:null};try{try{const e=document.querySelector('meta[itemprop="reviewCount"], meta[name="reviewCount"], meta[name="reviews"]');e&&e.content&&(t.totalReviews=Math.round(F(e.content))||null)}catch{}try{const e=document.querySelector('meta[itemprop="ratingValue"], meta[name="rating"], meta[itemprop="rating"]');e&&e.content&&(t.rating=Math.round(F(e.content)*100)/100||null)}catch{}const l=['[data-auto="rating-count-text"]',".rating-count",".reviews-count",".votes-count",".ratings-count",".rating__count",".rate__count",".count-ratings",'[data-test="ratings-count"]'];for(const e of l)try{const a=document.querySelector(e);if(a&&(a.innerText||a.textContent)){const i=F(a.innerText||a.textContent);if(i!=null){t.totalRatings=Math.round(i);break}}}catch{}if(t.totalRatings==null){const e=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const a of e){const k=(a.getAttribute("aria-label")||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голос|голосов|votes|ratings)/i);if(k){t.totalRatings=Math.round(F(k[1]));break}}}if(t.totalRatings==null){const a=(document.body.innerText||"").match(/([0-9\s,.Kk]{1,10})\s*(оценок|оценили|оценка|голосов|votes|ratings)/i);a&&(t.totalRatings=Math.round(F(a[1])))}const r=['[data-auto="rating"]','[data-auto="rating-value"]',".average-rating",".avg-rating",".rating-value",".rating__value",".product-rating",".ds-text_weight_bold"];for(const e of r)try{const a=document.querySelector(e);if(a&&(a.innerText||a.textContent)){const i=F(a.innerText||a.textContent);if(i!=null){t.avgRating=Math.round(i*100)/100;break}}}catch{}if(t.avgRating==null){const e=Array.from(document.querySelectorAll("[aria-label]")||[]);for(const a of e){const k=(a.getAttribute("aria-label")||"").match(/([0-5](?:[.,][0-9])?)\s*(зв|звезды|рейтинг|rating)/i);if(k){t.avgRating=F(k[1]);break}}}if(t.avgRating==null){const a=(document.body.innerText||"").match(/(?:средн(?:ий|ая)\s*рейтинг|рейтинг|rating)[:\s]*([0-5](?:[.,][0-9])?)/i);a&&(t.avgRating=F(a[1]))}try{const e=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(e){const a=e.getAttribute("ratingvalue")||e.getAttribute("data-ratingvalue"),i=e.getAttribute("ratingcount")||e.getAttribute("data-ratingcount")||e.getAttribute("raitingcounttext")||e.getAttribute("data-ratingcounttext"),k=e.getAttribute("reviewcount")||e.getAttribute("data-reviewcount")||e.getAttribute("reviewcounttext")||e.getAttribute("data-reviewcounttext");if(a&&t.avgRating==null&&(t.avgRating=F(a)),i&&t.totalRatings==null){const A=String(i).match(/([0-9\s,.Kk]+)/);if(A){const p=A[1].replace(/\s+/g,"");t.totalRatings=Math.round(F(p))}}if(k&&t.totalReviews==null){const A=String(k).match(/([0-9\s,.Kk]+)/);A&&(t.totalReviews=Math.round(F(A[1])))}}}catch{}try{if(typeof window.extractRatingBreakdown=="function"){const e=window.extractRatingBreakdown();e&&(t.avgRating==null&&e.avg!=null&&(t.avgRating=e.avg),t.totalRatings==null&&e.totalRatings!=null&&(t.totalRatings=e.totalRatings),t.totalReviews==null&&e.totalReviews!=null&&(t.totalReviews=e.totalReviews))}}catch{}}catch(l){console.warn("extractProductMeta error",l)}return t.totalRatings==null&&t.totalReviews!=null&&(t.totalRatings=t.totalReviews),t.avgRating==null&&t.rating!=null&&(t.avgRating=t.rating),t.totalRatings=typeof t.totalRatings=="number"&&Number.isFinite(t.totalRatings)?Math.round(t.totalRatings):null,t.avgRating=typeof t.avgRating=="number"&&Number.isFinite(t.avgRating)?Math.round(t.avgRating*100)/100:null,t.totalReviews=t.totalReviews||null,t.rating=t.rating||null,t}function tt(){const t={5:null,4:null,3:null,2:null,1:null,avg:null,totalRatings:null,totalReviews:null};function l(r){if(r==null)return null;const e=String(r).trim().replace(/\s+/g,"").replace(/[^0-9\.,Kk]/g,"");if(/k$/i.test(e))return Math.round(parseFloat(e.replace(/k$/i,""))*1e3);const a=parseFloat(e.replace(",","."));return Number.isFinite(a)?Math.round(a):null}try{const r=document.querySelector('[data-zone-name="rating"], [data-auto="ugc-section"]');if(r){const A=r.getAttribute("ratingvalue")||r.getAttribute("data-ratingvalue"),p=r.getAttribute("ratingcount")||r.getAttribute("data-ratingcount")||r.getAttribute("raitingcounttext"),x=r.getAttribute("reviewcount")||r.getAttribute("data-reviewcount")||r.getAttribute("reviewcounttext");A&&(t.avg=parseFloat(String(A).replace(",","."))||t.avg),p&&(t.totalRatings=l(p)||t.totalRatings),x&&(t.totalReviews=l(x)||t.totalReviews)}const e=document.querySelector('[data-auto="rating-count-text"], [data-auto="ratingCount"], .rating-count, .ds-text[data-auto="rating-count-text"]'),a=document.querySelector('[data-auto="review-count-text"], .review-count, .ds-text[data-auto="review-count-text"]');e&&!t.totalRatings&&(t.totalRatings=l(e.innerText||e.textContent)||t.totalRatings),a&&!t.totalReviews&&(t.totalReviews=l(a.innerText||a.textContent)||t.totalReviews);const i=[".rating-breakdown",".rating-histogram",".rating-list",".rating-distribution",'[data-auto="rating-breakdown"]',".review-stats",".rating-row",".ratingRow",".ds-rating-list"];for(const A of i){const p=document.querySelector(A);if(!p)continue;const x=Array.from(p.querySelectorAll("*"));let M=0;for(const C of x){const B=(C.textContent||"").trim(),z=B.match(/^\s*([1-5])\D{0,6}([0-9\s,.Kk]{1,12})\s*$/);if(z){const q=Number(z[1]),y=l(z[2]);q>=1&&q<=5&&y!=null&&(t[q]=y,M++)}else{const q=B.match(/^\s*([1-5])\s*$/);if(q){const y=Number(q[1]);let o=null;const n=C.nextElementSibling||C.parentElement&&C.parentElement.querySelector(".count, .value, .number, .ds-text");n&&(o=l(n.textContent||n.innerText)),o!=null&&(t[y]=o,M++)}}}if(M>0)break}const k=Array.from(document.querySelectorAll('noframes[data-apiary="patch"]')||[]);for(const A of k){const p=(A.textContent||"").trim();if(p)try{const x=JSON.parse(p);if(x.collections&&x.collections.businessReviewStats){const q=Object.keys(x.collections.businessReviewStats);if(q.length){const y=x.collections.businessReviewStats[q[0]];if(y&&(y.reviewsCount&&!t.totalReviews&&(t.totalReviews=Number(y.reviewsCount)||t.totalReviews),y.reviewsCountVisualization&&!t.totalRatings)){const o=String(y.reviewsCountVisualization).match(/([\d.,]+)K/i);o&&(t.totalRatings=Math.round(parseFloat(o[1].replace(",","."))*1e3))}}}const M=p,C=M.match(/"ratingvalue"\s*:\s*"?([0-9.,]+)"?/i),B=M.match(/"ratingcount"\s*:\s*(\d+)/i),z=M.match(/"reviewcount"\s*:\s*(\d+)/i);C&&(t.avg=parseFloat(C[1].replace(",","."))||t.avg),B&&(t.totalRatings=Number(B[1])||t.totalRatings),z&&(t.totalReviews=Number(z[1])||t.totalReviews)}catch{}}}catch{}return["5","4","3","2","1"].forEach(r=>{t[r]==null&&(t[r]=null)}),t.avg!=null&&(t.avg=Math.round(Number(t.avg)*100)/100),t.totalRatings!=null&&(t.totalRatings=Math.round(Number(t.totalRatings))),t.totalReviews!=null&&(t.totalReviews=Math.round(Number(t.totalReviews))),t}function wt(t=15e3){const l={reviews:[],totalFound:0,charactersUsed:0,extractionMethods:[]};try{let r=function(){const o=['[data-auto="reviews-show-more"]','[data-autotest-id*="show-more"]',".reviews-show-more",".show-more",".load-more","button"],n=new Set;for(const s of o)try{Array.from(document.querySelectorAll(s)).forEach(c=>{try{if(!(c instanceof HTMLElement))return;const v=window.getComputedStyle(c);if(v.display==="none"||v.visibility==="hidden"||c.disabled)return;const O=(c.innerText||c.textContent||"").trim();(/показать|еще|ещё|загрузить|more|show/i.test(O)||s.indexOf("show-more")>=0||s.indexOf("reviews-show-more")>=0)&&!n.has(c)&&(c.click(),n.add(c),setTimeout(()=>{try{c.disabled||c.click()}catch{}},900))}catch{}})}catch{}try{const s=document.querySelector('[data-zone-name="reviews"], [data-auto="ugc-section"], .reviews, .n-reviews, .review-list, [data-auto="reviews"]');if(s)try{s.scrollIntoView({behavior:"smooth"}),s.scrollTop=s.scrollHeight}catch{}else window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})}catch{}},e=function(){const o=['button[class*="expand"]','button[class*="show-full"]','[data-auto*="expand"]',".review-expand",".opinion-expand",'button:contains("Развернуть")','button:contains("Показать полностью")','button:contains("Читать полностью")','[class*="read-more"]'];for(const n of o)try{document.querySelectorAll(n).forEach(d=>{try{d.offsetHeight>0&&d.click()}catch{}})}catch{}},a=function(){const o=[];try{document.querySelectorAll("script").forEach(d=>{if(!d.textContent)return;[/"reviews":\s*\[(.*?)\]/gs,/"opinions":\s*\[(.*?)\]/gs,/"reviewText":\s*"([^"]+)"/g,/"text":\s*"([^"]+)"/g,/"comment":\s*"([^"]+)"/g].forEach(v=>{const O=d.textContent.matchAll(v);for(const S of O)try{if(S[1]&&S[1].length>30){const E=S[1].replace(/\\n/g," ").replace(/\\"/g,'"').replace(/\\\\/g,"\\").trim();E.length>30&&o.push(E)}}catch{}})}),document.querySelectorAll("[data-bem]").forEach(d=>{try{Object.values(d.dataset).forEach(c=>{if(!(!c||c.length<100))try{const v=JSON.parse(c),O=v.reviews||v.opinions;Array.isArray(O)&&O.forEach(S=>{const E=S.text||S.content||S.comment;E&&E.length>30&&o.push(String(E))})}catch{}})}catch{}})}catch{}return o},i=function(o){if(!o)return"";let n=String(o).replace(/\r\n|\r/g,`
`).replace(/\t/g," ").replace(/\u00A0/g," ");n=n.replace(/\s+/g," ").trim(),n=n.replace(/\b(?:\d+\s+){3,}\d+\b/g," "),n=n.replace(/\b\d{3,}\b/g," "),n=n.replace(/(?:\b\d+\b[\s,.-]*){3,}/g," ");try{n=n.replace(/[^\p{L}\p{N}\s\.,!?\-()«»—:;\/%]/gu," ")}catch{n=n.replace(/[^A-Za-zА-Яа-яЁё0-9\s\.,!?\-()«»—:;\/%]/g," ")}return n=n.replace(/([,!.?–—\-]){2,}/g,"$1"),n=n.replace(/\s+/g," ").trim(),n},k=function(o){if(!o)return"";const n=[".review-text",".opinion-text",".review-content",".comment-text",'[data-auto="review-text"]','[class*="text"]',"p",".content"];try{for(const c of n){const v=o.querySelector?o.querySelector(c):null;if(v&&v.innerText&&v.innerText.trim().length>20)return i(v.innerText)}}catch{}let s="";try{s=o.innerText||o.textContent||""}catch{s=""}return[/Достоинства:?\s*/gi,/Недостатки:?\s*/gi,/Комментарий:?\s*/gi,/Опыт использования:?\s*/gi,/Рекомендую\s*/gi,/Не рекомендую\s*/gi,/\d+\s*из\s*\d+\s*считают отзыв полезным/gi,/Был ли отзыв полезен\?/gi,/Да\s*\d*\s*Нет\s*\d*/gi,/\d+\s*звезд[ыа]?/gi,/Оценка:\s*\d+/gi].forEach(c=>{s=s.replace(c," ")}),i(s)},A=function(o){if(!o)return!1;const n=o.length;return!(n<40||(o.match(/\d/g)||[]).length/Math.max(1,n)>.3||(o.match(/[A-Za-zА-Яа-яЁё]/g)||[]).length<12||(o.match(/[А-Яа-яЁё]/g)||[]).length<Math.min(10,Math.floor(n*.2))||/^(source|businessId|notEmpty|id|source,)/i.test(o.trim()))},p=function(o){const n=new Set,s=[];return o.forEach(d=>{const c=d.text.toLowerCase().replace(/\s+/g,"").substring(0,100);n.has(c)||(n.add(c),s.push(d))}),s},x=function(o,n){const s=[];let d=0;const v=`

`.length,O=o.sort((S,E)=>E.length-S.length);for(const S of O){const E=S.length,X=d===0?E:E+v;if(d+X<=n)s.push(S),d+=X;else if(d===0){const P=S.substring(0,n-3)+"...";s.push(P),d=P.length;break}else{const P=n-d-v;if(P>50){const N=S.substring(0,P-3)+"...";s.push(N);break}else break}}return s};r(),e();const M=['[data-auto="review-item"]','[data-zone-name="review"]','[data-autotest-id="review-card"]','[data-tid="review-item"]','[data-auto="OpinionCard"]',".opinion",".review-item",".user-review",'[class*="review"]','[class*="opinion"]','[data-zone*="review"]',".n-review-card",".ProductReview",'iframe[src*="review"] + *','[data-bem*="review"]'],C=new Set;for(const o of M)try{const n=document.querySelectorAll(o);n.forEach(s=>{try{s&&s.innerText&&s.innerText.trim().length>20&&C.add(s)}catch{}}),n.length>0&&l.extractionMethods.push(`${o}: ${n.length} элементов`)}catch{}const B=a(),z=[];C.forEach(o=>{try{const n=k(o),s=i(n);A(s)&&z.push({text:s,source:"dom",length:s.length,element:o})}catch{}}),B.forEach(o=>{try{const n=i(o);A(n)&&z.push({text:n,source:"json",length:n.length})}catch{}});const q=p(z);q.sort((o,n)=>n.length-o.length);const y=x(q.map(o=>o.text),t);return l.reviews=y,l.totalFound=q.length,l.charactersUsed=y.reduce((o,n)=>o+(n?n.length:0),0),l}catch(r){return console.warn("extractYandexMarketReviews error",r),l}}function ut(t=60){if(window.location.hostname.includes("market.yandex")||document.title.includes("Яндекс.Маркет")||document.querySelector('[data-baobab-name*="market"]'))return console.log("ShopSage: Detected Yandex Market, using enhanced extraction"),wt(15e3).reviews;const r=['[data-zone-name="review"]','[data-autotest-id="review-card"]',".review__item",".product-review",".review",".comments-item",'[data-test-id*="review"]',".feedback",".pa-review",".review-item",".reviewCard"],e=[];for(const i of r){const k=document.querySelectorAll(i);if(k&&k.length){e.push(...Array.from(k));break}}const a=e.map(i=>i.innerText?i.innerText.trim():"").filter(i=>i&&i.length>30).slice(0,t);return console.debug("ShopSage: Standard extraction found",a.length,"reviews"),a}const yt=`<aside class="shopsage-sidebar" role="dialog" aria-label="ShopSage">\r
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
`,St=`/* Base styles */\r
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
`;function $(){if(document.getElementById(J)){const u=document.getElementById(J)._hostElement;if(!u)return;u.style.opacity==="1"?et():(u.style.opacity="1",u.style.transform="translateY(0) scale(1)");return}const t=document.createElement("div");t.id=J,Object.assign(t.style,{all:"initial",position:"fixed",right:"20px",top:"60px",zIndex:"2147483647",pointerEvents:"auto"});const l=t.attachShadow({mode:"open"});t._hostElement=t;const r=document.createElement("style");r.textContent=St,l.appendChild(r);const e=document.createElement("div");e.innerHTML=yt,l.appendChild(e);const a=l.querySelector("#ss-logo");a&&(a.src=chrome.runtime.getURL("assets/icons/icon.svg")),document.body.appendChild(t);const i=l,k=i.querySelector(".shopsage-sidebar"),A=i.querySelector(".ss-close"),p=i.querySelector("#ss-analyze"),x=i.querySelector("#ss-loader"),M=i.querySelector("#ss-count"),C=i.querySelector("#ss-result"),B=i.querySelector("#ss-pros"),z=i.querySelector("#ss-cons"),q=i.querySelector("#ss-verdict"),y=i.querySelector("#ss-rating"),o=i.querySelector("#ss-total"),n=i.querySelector("#ss-error"),s=i.querySelector("#ss-score-container"),d=i.querySelector("#ss-score-badge"),c=i.querySelector("#ss-score-bar-inner"),v=i.querySelector("#ss-score-sub");requestAnimationFrame(()=>{Object.assign(t.style,{opacity:"0",transform:"translateY(8px) scale(.995)",transition:"opacity .28s cubic-bezier(.2,.9,.2,1), transform .36s cubic-bezier(.2,.9,.2,1)"}),setTimeout(()=>{t.style.opacity="1",t.style.transform="translateY(0) scale(1)"},20)}),A&&A.addEventListener("click",et),p&&p.addEventListener("click",X);const O=ut();M&&(M.innerText=O.length);const S=ct();y&&(y.innerText=S.avgRating!=null?S.avgRating:"—"),o&&(o.innerText=S.totalRatings!=null?S.totalRatings:"—");function E(N){n&&(n.innerText=N,n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},5e3))}function X(N){p&&(p.disabled=!0),x&&x.classList.remove("hidden"),C&&(C.classList.add("hidden"),C.classList.remove("show")),s&&s.classList.add("hidden"),v&&v.classList.add("hidden"),n&&n.classList.add("hidden");const u=15e3,U=`

`;chrome.storage.sync.get({maxReviews:40,serverUrl:""},Y=>{const G=Number.isFinite(Number(Y.maxReviews))&&Number(Y.maxReviews)>0?Number(Y.maxReviews):40,D=ut(G),L=D.length;if(L===0){x&&x.classList.add("hidden"),p&&(p.disabled=!1),E("Не найдено отзывов на странице. Попробуйте прокрутить страницу или перейти на страницу с отзывами.");return}const T=[];let I="";for(let m=0;m<D.length;m++){const R=D[m]||"";if(R)if(I.length===0)if(R.length<=u)I=R,T.push(R);else{const h=R.slice(0,u-1)+"…";I=h,T.push(h);break}else if(I.length+U.length+R.length<=u)I=I+U+R,T.push(R);else break}M&&(M.innerText=`${T.length} (из ${L})`);const H=ct();y&&(y.innerText=H.avgRating!=null?H.avgRating:"—"),o&&(o.innerText=H.totalRatings!=null?H.totalRatings:"—");const j=T,b={url:location.href,title:document.title,totalRatings:H.totalRatings,avgRating:H.avgRating};console.log("ShopSage: Sending analysis request",{reviewCount:j.length,product:b,serverUrl:Y.serverUrl||"default"}),chrome.runtime.sendMessage({action:bt,reviews:j,product:b,serverUrl:Y.serverUrl||""},m=>{if(chrome.runtime.lastError){console.error("ShopSage: runtime.lastError",chrome.runtime.lastError),x&&x.classList.add("hidden"),p&&(p.disabled=!1),E("Ошибка связи с расширением. Перезагрузите страницу и попробуйте снова.");return}if(x&&x.classList.add("hidden"),p&&(p.disabled=!1),!m){console.error("ShopSage: Empty response from background"),E("Не получен ответ от сервера. Проверьте настройки или попробуйте позже.");return}if(!m.ok){console.error("ShopSage: Analysis failed",m);let h="Ошибка анализа";m.error?h=m.error:m.message&&(h=m.message),h.includes("fetch failed")||h.includes("Failed to fetch")?h="Не удалось подключиться к серверу. Проверьте URL сервера в настройках.":h.includes("timeout")?h="Превышено время ожидания ответа от сервера.":h.includes("404")?h="Сервер не найден. Проверьте URL в настройках.":(h.includes("500")||h.includes("502")||h.includes("503"))&&(h="Ошибка сервера. Попробуйте позже."),E(h);return}const R=m.data||{};console.info("ShopSage: Analysis successful",m),P(R,b,j.length)})})}function P(N,u={},U=0){n&&n.classList.add("hidden");const Y=Array.isArray(N.pros)?N.pros:[],G=Array.isArray(N.cons)?N.cons:[];B&&(B.innerHTML="",Y.forEach((g,w)=>{const f=document.createElement("li");f.innerHTML='<div class="tag">'+(w+1)+'</div><div class="snippet"></div>',f.querySelector(".snippet").innerText=g,B.appendChild(f)})),z&&(z.innerHTML="",G.forEach((g,w)=>{const f=document.createElement("li");f.innerHTML='<div class="tag">'+(w+1)+'</div><div class="snippet"></div>',f.querySelector(".snippet").innerText=g,z.appendChild(f)}));let D=document.querySelector('[data-auto="rating"]');D&&(u.avgRating=parseFloat(D.textContent.trim().replace(",","."))),q&&(q.innerText=N.verdict||"Нет явного вердикта");let L=u&&u.avgRating!=null?Number(u.avgRating):u&&u.rating!=null?Number(u.rating):null,T=u&&u.totalRatings!=null?Number(u.totalRatings):u&&u.totalReviews!=null?Number(u.totalReviews):null;try{if(typeof tt=="function"){const g=tt();g&&(L==null&&g.avg!=null&&(L=g.avg),T==null&&g.totalRatings!=null&&(T=g.totalRatings))}}catch{}y&&(y.innerText=L??"—"),o&&(o.innerText=T??"—");const I=typeof tt=="function"?tt():null,H=T||u&&(u.totalReviews||0)||0,j=L??(u&&(u.avgRating||u.rating)?u.avgRating||u.rating:null);let b=Math.max(0,Number(H||0)),m=0,R=null,h=null,K=null;if(I){const g={};let w=!1;for(let f=1;f<=5;f++){const _=I[String(f)];_!=null&&Number.isFinite(Number(_))&&Number(_)>0?(g[f]=Number(_),w=!0):g[f]=0}w&&(K=g),L==null&&I.avg!=null&&(L=I.avg),T==null&&I.totalRatings!=null&&(T=I.totalRatings)}if(K)m=Number(K[5]||0)+Number(K[4]||0),b=Object.keys(K).reduce((g,w)=>g+Number(K[w]||0),0),h=b>0?m/b:null,R=L!=null?L/5:h??.5;else if(b>0&&j!=null){const g=Math.max(0,Math.min(1,(j-1)/4));m=Math.round(g*b),h=b>0?m/b:null,R=j/5}else{const g=Array.isArray(N.pros)?N.pros.length:0,w=Array.isArray(N.cons)?N.cons.length:0;if(g+w>0){const f=g/(g+w);b=Math.max(b,g+w),m=Math.round(f*b),h=f,R=f}else{b=Math.max(b,U||0);const f=.5;m=Math.round(f*b),h=f,R=R??f}}const dt=2,gt=2,at=dt+m,ft=gt+(b-m),Q=at/(at+ft);function ht(g,w,f=1.96){if(w===0)return{low:0,high:1};const _=g/w,rt=f*f,it=1+rt/w,st=_+rt/(2*w),lt=f*Math.sqrt((_*(1-_)+rt/(4*w))/w),mt=Math.max(0,(st-lt)/it),pt=Math.min(1,(st+lt)/it);return{low:mt,high:pt}}const nt=ht(m,Math.max(1,b));R==null&&(R=Q);const V=Math.round((Q*.6+R*.4)*100);let Z="",W="";if(V>=75?(Z="Однозначно стоит выбрать",W="linear-gradient(90deg,#a3e635,#10b981)"):V>=60?(Z="В целом рекомендуем",W="linear-gradient(90deg,#facc15,#84cc16)"):V>=45?(Z="Стоит взвесить плюсы и минусы",W="linear-gradient(90deg,#f59e0b,#f97316)"):(Z="Лучше поискать альтернативу",W="linear-gradient(90deg,#ef4444,#ea580c)"),s&&s.classList.remove("hidden"),d&&(d.innerText=V+"%",d.style.background=W),c&&(c.style.width=V+"%"),v){v.classList.remove("hidden");const g=Math.round(nt.low*100),w=Math.round(nt.high*100),f=b>0?b:U||"—",_=L!=null?`${L}`:"—";v.innerText=`${Z} — вероятность успеха ≈ ${Math.round(Q*100)}% (интервал ${g}–${w}%), на основе ${f} оценок; положительных (4–5★): ${m}. Средний рейтинг: ${_}.`}M&&(U!=null&&U!==0?M.innerText=`${U} (из ${T??"—"})`:M.innerText=T??"—"),C&&(C.classList.remove("hidden"),setTimeout(()=>C.classList.add("show"),30)),console.info("ShopSage: stats",{n:b,k:m,estPosRate:h,posteriorMean:Q,wilson:nt,composite:V,rec:Z,pageAvg:L,pageTotalRatings:T,prosCount:Y.length,consCount:G.length})}t._shadow=l,t._container=k}function et(){const t=document.getElementById(J);t&&(t.style.opacity="0",t.style.transform="translateY(8px) scale(.995)",setTimeout(()=>{try{const l=document.getElementById(J);l&&l.remove()}catch{}},300))}function Rt(t,l,r){try{const e=t.config||{};if(chrome&&chrome.storage&&chrome.storage.sync)return chrome.storage.sync.set({serverUrl:e.serverUrl||"",maxReviews:e.maxReviews!=null?e.maxReviews:void 0},()=>{try{if(typeof $=="function"){try{$(),r&&r({ok:!0,message:"openSidebar() called"})}catch(i){console.warn("openSidebar call failed",i),r&&r({ok:!1,error:String(i)})}return}if(typeof window.openSidebar=="function")try{window.openSidebar(),r&&r({ok:!0,message:"window.openSidebar() called"});return}catch{}if(typeof window.createSidebar=="function")try{window.createSidebar(),r&&r({ok:!0,message:"window.createSidebar() called"});return}catch{}const a=document.getElementById(ot)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2")||document.getElementById("shopsage-open-btn-v3");if(a)try{a.click(),r&&r({ok:!0,message:"button clicked"});return}catch(i){r&&r({ok:!1,message:"failed to click button",error:String(i)});return}r&&r({ok:!1,message:"no sidebar open API found"})}catch(a){console.error("handleOpenSidebarMessage inner error",a),r&&r({ok:!1,error:String(a)})}}),!0;try{typeof $=="function"?($(),r&&r({ok:!0,message:"openSidebar() called (no storage)"})):r&&r({ok:!1,message:"storage unavailable and openSidebar missing"})}catch(a){r&&r({ok:!1,error:String(a)})}}catch(e){console.error("handleOpenSidebarMessage error",e);try{r&&r({ok:!1,error:String(e)})}catch{}}return!1}function kt(t,l,r){try{if(!t||!t.action)return;if(t.action==="OPEN_SIDEBAR")return Rt(t,l,r)}catch(e){console.error("handleRuntimeMessage error",e);try{r&&r({ok:!1,error:String(e)})}catch{}}return!1}try{chrome&&chrome.runtime&&chrome.runtime.onMessage&&chrome.runtime.onMessage.addListener(kt)}catch{}if(!window.__shopSageInitialized){try{typeof $=="function"&&(window.openSidebar=$),typeof et=="function"&&(window.closeSidebar=et),typeof $=="function"&&(window.createSidebar=$)}catch{}try{vt({ROOT_ID:J,BTN_ID:ot,ICON_PATH:xt,onOpenSidebar:typeof $=="function"?$:()=>{const t=document.getElementById(ot)||document.getElementById("shopsage-open-btn")||document.getElementById("shopsage-open-btn-v2");if(t)try{t.click()}catch{}}})}catch(t){console.error("ShopSage: initContent failed",t)}window.__shopSageInitialized=!0}export{et as closeSidebar,$ as openSidebar};
