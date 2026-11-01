// Express backend: serves the website and proxies chat requests to an LLM API (free: Groq/Gemini/OpenRouter).
// The API key stays on the server (never sent to the browser).
require("dotenv").config();
const express = require("express");
const SYSTEM_PROMPT = require("./knowledge");

const app = express();
const PORT = process.env.PORT || 3000;

// Pick a provider in .env: groq | gemini | openrouter | openai | anthropic
// All except "anthropic" use the OpenAI-compatible /chat/completions format.
const PROVIDERS = {
  groq:       { url: "https://api.groq.com/openai/v1",                          key: "GROQ_API_KEY",       model: "openai/gpt-oss-120b" },
  gemini:     { url: "https://generativelanguage.googleapis.com/v1beta/openai", key: "GEMINI_API_KEY",     model: "gemini-2.5-flash" },
  openrouter: { url: "https://openrouter.ai/api/v1",                            key: "OPENROUTER_API_KEY", model: "google/gemma-3-27b-it:free" },
  openai:     { url: "https://api.openai.com/v1",                               key: "OPENAI_API_KEY",     model: "gpt-4o-mini" },
  anthropic:  { url: "https://api.anthropic.com/v1",                            key: "ANTHROPIC_API_KEY",  model: "claude-haiku-5-5" },
};
const PROVIDER = process.env.PROVIDER || "groq";
const cfg = PROVIDERS[PROVIDER];
if (!cfg) throw new Error("Unknown PROVIDER: " + PROVIDER);
const MODEL = process.env.MODEL || cfg.model;

app.use(express.json({ limit: "20kb" }));
app.use(express.static("public"));

// Tiny in-memory rate limiter: 20 requests / minute / IP
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now(), ip = req.ip;
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60000);
  if (recent.length >= 20) return res.status(429).json({ error: "Too many requests. Please wait a minute." });
  recent.push(now);
  hits.set(ip, recent);
  next();
}

app.post("/api/chat", rateLimit, async (req, res) => {
  const { messages } = req.body || {};
  if (!Array.isArray(messages) || !messages.length)
    return res.status(400).json({ error: "messages array required" });

  // Validate + trim input
  const clean = messages.slice(-9).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 1000),
  }));
  if (clean[0].role !== "user" || clean[clean.length - 1].role !== "user")
    return res.status(400).json({ error: "conversation must start and end with a user message" });

  const apiKey = process.env[cfg.key];
  if (!apiKey) return res.status(500).json({ error: `Server is missing ${cfg.key}` });

  try {
    let r, reply;
    if (PROVIDER === "anthropic") {
      r = await fetch(cfg.url + "/messages", {
        method: "POST",
        headers: { "content-type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: MODEL, max_tokens: 400, system: SYSTEM_PROMPT, messages: clean }),
      });
    } else {
      r = await fetch(cfg.url + "/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: "Bearer " + apiKey },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 400,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...clean],
        }),
      });
    }
    const data = await r.json();
    if (!r.ok) {
      console.error(PROVIDER + " error:", JSON.stringify(data));
      return res.status(502).json({ error: "AI service error" });
    }
    reply = PROVIDER === "anthropic"
      ? (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("")
      : data.choices?.[0]?.message?.content || "";
    res.json({ reply: reply.trim() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Cynbit chatbot running on http://localhost:${PORT}`));
