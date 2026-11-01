# Cynbit Technologies – Website Prototype + AI Chatbot

A prototype of [cynbit.in](https://www.cynbit.in/) with a floating AI chatbot (bottom-right) that answers questions using knowledge of the company's services, products, BitElevate programme and contact details.

## Architecture

```
Browser (public/index.html)  ──POST /api/chat──▶  Express server (server.js)  ──▶  LLM API
        floating chat widget                      • validates & rate-limits            (Groq / Gemini /
                                                  • keeps API key secret                OpenRouter …)
```

- **Frontend:** single HTML/CSS/JS page, responsive, light/dark mode.
- **Backend:** Node.js + Express. The API key lives in `.env` on the server only.
- **Site knowledge:** `knowledge.js` is the system prompt; edit it to change what the bot knows.

## Run locally

```bash
git clone <your-repo-url> && cd cynbit-chatbot
npm install
cp .env.example .env        # set PROVIDER and paste that provider's API key
npm start                   # http://localhost:3000
```

### Free API options (no credit card)
| Provider | `PROVIDER=` | Get a key |
|---|---|---|
| Groq (fast, generous free tier) | `groq` | https://console.groq.com |
| Google Gemini | `gemini` | https://aistudio.google.com |
| OpenRouter (`:free` models) | `openrouter` | https://openrouter.ai |

Free-tier limits change often – check each provider's dashboard. Paid options (`openai`, `anthropic`) also work.

## Deploy (free options)

Render / Railway: connect the GitHub repo, build command `npm install`, start command `npm start`, add env vars `PROVIDER` and the matching `*_API_KEY`.

## Security notes
- `.env` is git-ignored – never commit your key.
- Input is length-limited, and `/api/chat` is rate-limited (20 req/min/IP).

## Possible improvements
Streaming replies, retrieval over the full site/blog (RAG), conversation storage, lead capture form, analytics.

*Unofficial prototype built for a practical assessment; content belongs to Cynbit Technologies.*
