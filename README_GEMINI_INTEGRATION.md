# SpeakSmart Gemini Integration

## Environment variables

Create a `.env` file in the repo root:

```bash
GEMINI_API_KEY=your_real_key_here
PORT=3000
```

## Install dependencies

```bash
npm install express cors dotenv @google/generative-ai
```

## Run server

```bash
node server/index.js
```

## API endpoint

`POST /api/generate`

Body:

```json
{
  "type": "topic | word | joke | quote | speechTitle",
  "topic": "optional quote topic"
}
```

The frontend in `index.html` calls this endpoint and includes:

- Safe, professional content fallback
- Rate limiting and anti-spam button cooldowns
- Retry with exponential backoff and `Retry-After` support
- Lightweight toast UX: "Please wait…", "Retrying…", "Using safe fallback"
