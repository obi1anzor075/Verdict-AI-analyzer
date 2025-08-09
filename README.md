# ShopSage — Market AI Assistant (Production-ready starter)

This package contains a polished, animated Chrome extension (ShopSage) and a local Node.js server that proxies requests to OpenAI.

## Quickstart

1. Server:
   - cd server
   - copy `.env.example` to `.env` and add `OPENAI_API_KEY=sk-...`
   - npm install
   - npm start

2. Extension:
   - Open chrome://extensions
   - Enable Developer mode
   - Load unpacked and select the `extension` folder

3. Usage:
   - Open a product page on marketplaces (Yandex Market, Ozon, Wildberries)
   - Click floating 'SS' button or press 'S' to open the ShopSage sidebar
   - Click Analyze to get pros/cons and verdict

Notes:
- Server includes rate-limiting and caching.
- Settings available in extension Options (server URL, max reviews to analyze).
