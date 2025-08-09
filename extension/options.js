const serverUrlEl = document.getElementById('serverUrl');
const maxEl = document.getElementById('maxReviews');
const status = document.getElementById('status');
document.addEventListener('DOMContentLoaded', async () => {
  const s = await chrome.storage.sync.get({ serverUrl: 'http://localhost:3000', maxReviews: 40 });
  serverUrlEl.value = s.serverUrl;
  maxEl.value = s.maxReviews;
});
document.getElementById('save').addEventListener('click', async () => {
  const url = serverUrlEl.value.trim();
  const max = Number(maxEl.value) || 40;
  await chrome.storage.sync.set({ serverUrl: url, maxReviews: max });
  status.innerText = 'Сохранено';
  setTimeout(()=>status.innerText='', 2000);
});
