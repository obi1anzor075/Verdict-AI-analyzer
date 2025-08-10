/* utilities for extension */
async function getSettings() {
  return new Promise(resolve => chrome.storage.sync.get({ serverUrl: 'http://localhost:3000', maxReviews: 40 }, resolve));
}


