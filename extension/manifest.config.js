// manifest.config.js
import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'Вердикт',
  version: '1.0.0',
  description: 'ИИ помощник для анализа отзывов на Яндекс Маркете.',
  permissions: [
    'activeTab',
    'storage',
    'scripting'
  ],
  host_permissions: [
    '*://market.yandex.ru/*',
    '*://*.wildberries.ru/*',
    '*://*.ozon.ru/*'
  ],
  icons: {
    '16': 'assets/icons/icon16.png',
    '32': 'assets/icons/icon32.png',
    '48': 'assets/icons/icon48.png',
    '128': 'assets/icons/icon128.png'
  },
  action: {
    default_icon: {
      '16': 'assets/icons/icon16.png',
      '32': 'assets/icons/icon32.png',
      '48': 'assets/icons/icon48.png',
      '128': 'assets/icons/icon128.png'
    }
  },
  background: {
    // Для CRXJS/Vite удобно держать service worker в src/
    service_worker: 'src/background/background.js',
    type: 'module'
  },
  content_scripts: [
    {
      matches: [
        '*://market.yandex.ru/*'
      ],
      js: ['src/content/index.js'],
      run_at: 'document_idle'
    }
  ],
  web_accessible_resources: [
    {
      resources: [
        'assets/icons/icon16.png',
        'assets/icons/icon32.png',
        'assets/icons/icon48.png',
        'assets/icons/icon128.png',
        'assets/icons/icon.svg'
      ],
      matches: ['<all_urls>']
    }
  ]
});
