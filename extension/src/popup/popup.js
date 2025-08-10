// popup.js
(function () {
  const $ = id => document.getElementById(id);
  const statusEl = $('status');
  const previewEl = $('preview');

  // elements
  const openBtn = $('openSidebar');
  const toggleSettingsBtn = $('toggleSettings');
  const settingsPanel = $('settings');
  const saveBtn = $('saveSettings');
  const cancelBtn = $('cancelSettings');
  const settingsStatus = $('settingsStatus');
  const resetBtn = $('resetDefaults');

  const maxReviewsMain = $('maxReviewsMain');
  const maxReviewsInput = $('maxReviews');
  const serverUrlInput = $('serverUrl');

  const DEFAULTS = {
    serverUrl: '',
    maxReviews: 40
  };

  function setStatus(text, short = false) {
    statusEl.innerText = text;
    if (!short) console.log('[popup] ' + text);
  }

  // load stored settings into UI
  function loadSettingsToUI() {
    chrome.storage.sync.get(DEFAULTS, (items) => {
      serverUrlInput.value = items.serverUrl || DEFAULTS.serverUrl;
      maxReviewsInput.value = items.maxReviews != null ? items.maxReviews : DEFAULTS.maxReviews;
      maxReviewsMain.value = items.maxReviews != null ? items.maxReviews : DEFAULTS.maxReviews;
      setStatus('Настройки загружены', true);
    });
  }

  // save settings from UI
  function saveSettingsFromUI() {
    const serverUrl = serverUrlInput.value.trim();
    let maxReviews = parseInt(maxReviewsInput.value, 10);
    if (Number.isNaN(maxReviews) || maxReviews < 5) maxReviews = DEFAULTS.maxReviews;
    if (maxReviews > 200) maxReviews = 200;

    chrome.storage.sync.set({ serverUrl, maxReviews }, () => {
      settingsStatus.innerText = 'Сохранено';
      // also update the main control
      maxReviewsMain.value = maxReviews;
      setTimeout(() => (settingsStatus.innerText = ''), 1500);
      // quick notify background (optional)
      chrome.runtime.sendMessage({ action: 'SETTINGS_UPDATED', settings: { serverUrl, maxReviews } }, () => { });
    });
  }

  // reset to defaults
  function resetDefaults() {
    chrome.storage.sync.set(DEFAULTS, () => {
      loadSettingsToUI();
      setStatus('Сброшено к настройкам по умолчанию');
    });
  }

  // toggle settings panel
  function toggleSettings() {
    const visible = settingsPanel.style.display !== 'none';
    if (visible) {
      settingsPanel.style.display = 'none';
      $('mainControls').style.display = 'flex';
      toggleSettingsBtn.innerText = 'Настройки';
    } else {
      settingsPanel.style.display = 'block';
      $('mainControls').style.display = 'none';
      toggleSettingsBtn.innerText = 'Назад';
    }
  }

  // Send OPEN command to content script on active tab
  function openSidebarInActiveTab() {
    setStatus('Запрос на открытие панели...');
    // read current settings
    chrome.storage.sync.get(DEFAULTS, (items) => {
      const payload = {
        action: 'OPEN_SIDEBAR',
        config: {
          serverUrl: items.serverUrl || '',
          maxReviews: items.maxReviews != null ? items.maxReviews : DEFAULTS.maxReviews
        }
      };
      // send to active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs || !tabs[0]) {
          setStatus('Ошибка: не найдена активная вкладка');
          return;
        }
        chrome.tabs.sendMessage(tabs[0].id, payload, (resp) => {
          if (chrome.runtime.lastError) {
            // likely content script not injected -> inform user
            setStatus('Контент-скрипт не отвечает на вкладке. Проверьте, открыт ли сайт и перезагрузите страницу.', false);
            previewEl.innerText = chrome.runtime.lastError.message || 'Ошибка связи';
            return;
          }
          setStatus('Панель открыта', true);
          previewEl.innerText = resp && resp.message ? resp.message : 'Панель должна быть открыта на вкладке';
        });
      });
    });
  }

  // init
  document.addEventListener('DOMContentLoaded', () => {
    loadSettingsToUI();

    openBtn.addEventListener('click', () => {
      setStatus('Отправляю запрос...');
      openSidebarInActiveTab();
    });

    toggleSettingsBtn.addEventListener('click', toggleSettings);
    saveBtn.addEventListener('click', saveSettingsFromUI);
    cancelBtn.addEventListener('click', () => {
      toggleSettings();
      loadSettingsToUI();
    });
    resetBtn.addEventListener('click', () => {
      if (!confirm('Сбросить настройки к умолчанию?')) return;
      resetDefaults();
    });

    // Live sync: update main input when user edits inner settings value
    maxReviewsInput.addEventListener('input', () => {
      let v = parseInt(maxReviewsInput.value, 10);
      if (!Number.isFinite(v)) v = DEFAULTS.maxReviews;
      if (v < 5) v = 5;
      if (v > 200) v = 200;
      maxReviewsMain.value = v;
    });
  });
})();
