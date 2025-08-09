// server/server.js — GigaChat implementation (ESM, Node 18+)
// Supports two auth modes:
//  - Provide GIGACHAT_ACCESS_TOKEN (Bearer) directly
//  - Provide GIGACHAT_CREDENTIALS (Authorization key from Studio) and the server will exchange it for access_token
//
// Optional env:
//  - GIGACHAT_SCOPE (GIGACHAT_API_PERS | GIGACHAT_API_B2B | GIGACHAT_API_CORP) default: GIGACHAT_API_PERS
//  - GIGACHAT_BASE_URL (defaults to https://gigachat.devices.sberbank.ru/api/v1)
//  - GIGACHAT_TOKEN_URL (defaults to https://ngw.devices.sberbank.ru:9443/api/v2/oauth)
//  - GIGACHAT_MODEL (defaults to "GigaChat")
//  - GIGACHAT_INSECURE = "true"  -> will disable TLS verification (useful only for self-signed / internal setups)
//  - PORT
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { randomUUID } from "node:crypto";
import https from "node:https";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const ACCESS_TOKEN_ENV = process.env.GIGACHAT_ACCESS_TOKEN || "";
const CREDENTIALS = process.env.GIGACHAT_CREDENTIALS || ""; // "Authorization key" shown once in Studio
const SCOPE = process.env.GIGACHAT_SCOPE || "GIGACHAT_API_PERS";
const BASE_URL = process.env.GIGACHAT_BASE_URL || "https://gigachat.devices.sberbank.ru/api/v1";
const TOKEN_URL = process.env.GIGACHAT_TOKEN_URL || "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const MODEL = process.env.GIGACHAT_MODEL || "GigaChat";
const INSECURE = (process.env.GIGACHAT_INSECURE || "").toLowerCase() === "true";

if (!ACCESS_TOKEN_ENV && !CREDENTIALS) {
  console.error("Set either GIGACHAT_ACCESS_TOKEN or GIGACHAT_CREDENTIALS in .env");
  process.exit(1);
}

app.use(cors());
app.use(express.json({ limit: "2mb" }));

// --- helper parsers (JSON fallback / sections)
function tryParseJSON(text) {
  try { return JSON.parse(text); } catch (e) { return null; }
}
function extractJsonBlock(text) {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  return tryParseJSON(m[0]);
}
function parseBySections(text) {
  const res = { pros: [], cons: [], verdict: "" };
  const norm = text.replace(/\r/g, "");
  const prosMatch = norm.match(/Плюс(?:ы)?\s*[:\-–]*\s*([\s\S]*?)(?=(Минус|Минусы|Вердикт|Рекомендация|$))/i);
  const consMatch = norm.match(/Минус(?:ы)?\s*[:\-–]*\s*([\s\S]*?)(?=(Плюс|Плюсы|Вердикт|Рекомендация|$))/i);
  const verdictMatch = norm.match(/(Итог|Вердикт|Рекомендация)\s*[:\-–]*\s*([\s\S]*)/i);

  const sliceToItems = txt => {
    if (!txt) return [];
    const lines = txt.split(/\n+/).map(l => l.trim()).filter(Boolean);
    const items = [];
    for (let L of lines) {
      L = L.replace(/^[-–—•\d\.\)\s]+/, "").trim();
      if (L) items.push(L);
    }
    if (items.length === 1 && items[0].length > 140) {
      return items[0].split(/[\.!?]\s+/).map(s => s.trim()).filter(Boolean);
    }
    return items;
  };

  res.pros = sliceToItems(prosMatch ? prosMatch[1] : "");
  res.cons = sliceToItems(consMatch ? consMatch[1] : "");
  res.verdict = verdictMatch ? verdictMatch[2].trim() : "";
  return res;
}

// --- token management (if using credentials)
let cachedToken = ACCESS_TOKEN_ENV || null;
let tokenExpiresAt = 0; // unix seconds

async function fetchAccessTokenIfNeeded() {
  // If access token was provided by env, just use it
  if (cachedToken && tokenExpiresAt > Math.floor(Date.now() / 1000) + 5) {
    return cachedToken;
  }
  if (process.env.GIGACHAT_ACCESS_TOKEN) {
    // if provided in env but no expiry known, just use it
    cachedToken = process.env.GIGACHAT_ACCESS_TOKEN;
    // no expiry info
    return cachedToken;
  }

  // Need to exchange credentials -> access_token
  if (!CREDENTIALS) {
    throw new Error("GIGACHAT_CREDENTIALS not set and no access token available");
  }

  const form = new URLSearchParams();
  form.append("scope", SCOPE);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json",
    "Authorization": `Basic ${CREDENTIALS}`,
    "RqUID": randomUUID()
  };

  const agent = INSECURE ? new https.Agent({ rejectUnauthorized: false }) : undefined;

  const resp = await fetch(TOKEN_URL, {
    method: "POST",
    headers,
    body: form.toString(),
    // fetch in Node supports "agent" only inside "agent" key inside RequestInit when using node's undici? Node 18 fetch accepts 'dispatcher' not agent.
    // But globalAgent fallback is sufficient for most environments. We'll attach agent via globalAgent for https requests if INSECURE.
    // For simplicity, when INSECURE is true we'll use https.Agent by passing it via "agent" when supported.
    ...(agent ? { agent } : {})
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`Failed to fetch access token: ${resp.status} ${resp.statusText} ${text}`);
  }

  const j = await resp.json();
  // expected: { access_token: "...", expires_at: 1679471442 }
  if (!j.access_token) throw new Error("No access_token in token response");
  cachedToken = j.access_token;
  if (j.expires_at) {
    tokenExpiresAt = Number(j.expires_at);
  } else if (j.expires_in) {
    tokenExpiresAt = Math.floor(Date.now() / 1000) + Number(j.expires_in);
  } else {
    // fallback to 30 minutes
    tokenExpiresAt = Math.floor(Date.now() / 1000) + 30 * 60;
  }
  return cachedToken;
}

// --- main endpoint
app.post("/analyze", async (req, res) => {
  try {
    console.log("--- /analyze called ---");
    const { reviews = [], product = {} } = req.body;
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return res.status(400).json({ error: "No reviews provided" });
    }

    // limit + trim
    const maxToSend = 60;
    const trimmed = reviews.slice(0, maxToSend).map(r => (r || "").replace(/\s+/g, " ").trim()).join("\n\n");
    console.log("Sending reviews length:", trimmed.length);

    // Prompt — жёстко просим вернуть JSON OR даём нормальную выборку текста для парсинга
    const system = "You are an expert that analyzes user reviews. Respond ONLY with JSON in the format: {\"pros\":[...],\"cons\":[...],\"verdict\":\"...\",\"confidence\":0.0}";
    const user = `Analyze the following reviews and return ONLY valid JSON in the format above. Give short bullet-like pros and cons (max 12 each) and a short verdict.\n\nReviews:\n${trimmed}`;

    // Build GigaChat messages (GigaChat expects 'content' field)
    const messages = [
      { role: "system", content: system },
      { role: "user", content: user }
    ];

    // get token
    const accessToken = await fetchAccessTokenIfNeeded();

    const payload = {
      model: MODEL,
      messages,
      // controls — keep deterministic
      temperature: 0.0,
      max_output_tokens: 1000
      // you can add more model specific params here if needed
    };

    const url = `${BASE_URL.replace(/\/+$/, "")}/chat/completions`;
    console.log("Requesting GigaChat...", url);

    const agent = INSECURE ? new https.Agent({ rejectUnauthorized: false }) : undefined;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload),
      ...(agent ? { agent } : {})
    });

    console.log("GigaChat status:", resp.status);
    const j = await resp.json().catch(async () => {
      const txt = await resp.text().catch(() => "");
      throw new Error("Invalid JSON from GigaChat: " + txt);
    });
    console.log("GigaChat raw response keys:", Object.keys(j));

    // try to get text — in SDK examples they use j.choices[0].message.content
    let text = "";
    if (j?.choices && Array.isArray(j.choices) && j.choices.length > 0) {
      text = j.choices[0]?.message?.content || j.choices[0]?.text || "";
      // sometimes response may be in j.choices[0].message.content[0] or other shape — be defensive
      if (!text && typeof j.choices[0]?.message === "string") text = j.choices[0].message;
    } else if (j?.result?.content) {
      text = j.result.content;
    } else if (typeof j === "string") {
      text = j;
    } else {
      // fallback - stringify
      text = JSON.stringify(j);
    }

    // Try parse strict JSON
    let parsed = tryParseJSON(text);
    if (!parsed) parsed = extractJsonBlock(text);
    if (!parsed) {
      console.log("No JSON in response, fallback to section parse");
      parsed = parseBySections(text);
      parsed.confidence = 0;
      parsed._raw = text.slice(0, 2000);
      parsed._warning = "parsed by section fallback (GigaChat didn't return strict JSON)";
    } else {
      parsed.pros = Array.isArray(parsed.pros) ? parsed.pros.slice(0, 12) : [];
      parsed.cons = Array.isArray(parsed.cons) ? parsed.cons.slice(0, 12) : [];
      parsed.verdict = parsed.verdict || "";
      parsed.confidence = typeof parsed.confidence === "number" ? parsed.confidence : 0;
    }

    // also return usage info if present
    if (j?.usage) parsed._usage = j.usage;
    if (j?.cost) parsed._cost = j.cost;

    return res.json(parsed);

  } catch (err) {
    console.error("Analyze error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
});

app.get("/health", (req, res) => res.json({ ok: true }));
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
