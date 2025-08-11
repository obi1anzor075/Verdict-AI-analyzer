// content/utils.js

/**
 * Безопасный querySelectorAll: возвращает [] при ошибках
 */
export function safeQueryAll(selector, root = document) {
  try {
    return Array.from((root || document).querySelectorAll(selector));
  } catch (e) {
    return [];
  }
}

/**
 * Превращает строку HTML в элемент (первый элемент)
 */
export function createElementFromHTML(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

/**
 * Простая debounce утилита
 */
export function debounce(fn, wait = 200) {
  let t = null;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
