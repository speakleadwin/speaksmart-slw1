import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const MODEL = "gemini-2.0-flash";

const SYSTEM_RULES = `
You are generating professional, workplace-safe content for a public speaking app.
Hard constraints:
- Output must be safe for all professional audiences.
- No hate, harassment, sexual content, violence, self-harm, illegal activity, political persuasion, religion attacks, profanity, or dark humor.
- Keep tone positive, inclusive, and constructive.
- If unsure, return a neutral motivational option.
- Return STRICT JSON only, no markdown.
`;

function validateSafeText(text = "") {
  const banned = [
    "kill", "suicide", "sex", "racist", "hate", "bomb", "weapon", "drugs", "nsfw", "idiot", "stupid"
  ];
  const lower = String(text).toLowerCase();
  return !banned.some((w) => lower.includes(w));
}

function fallback(type) {
  const safe = {
    topic: { text: "Describe a time you learned from constructive feedback." },
    word: {
      word: "Articulate",
      pronunciation: "ar-TIK-yuh-lit",
      definition: "Able to express ideas clearly and effectively.",
      example: "She gave an articulate summary of the project goals."
    },
    joke: { text: "Why did the speaker bring a pencil? To draw attention." },
    quote: {
      text: "Success is the sum of small efforts repeated day in and day out.",
      author: "Robert Collier"
    },
    speechTitle: { text: "Speak with Clarity: Turning Ideas into Impact" }
  };
  return safe[type] || safe.topic;
}

function parseJsonSafely(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(raw.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

/**
 * Proxy Endpoint: /api/generate
 * Frontend sends requests to this endpoint without exposing the API key.
 * Server attaches GEMINI_API_KEY from .env and calls Gemini API securely.
 */
router.post("/api/generate", async (req, res) => {
  try {
    // Load API key from environment variables (never exposed to client)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY in environment variables");
      return res.status(500).json({ ok: false, error: "Server configuration error" });
    }

    const { type, topic = "" } = req.body || {};

    const promptByType = {
      topic: `Generate 1 impromptu speaking topic. Max 20 words. JSON: {"text":"..."}`,
      word: `Generate 1 professional word-of-the-day with pronunciation, definition, and example. JSON: {"word":"...","pronunciation":"...","definition":"...","example":"..."}`,
      joke: `Generate 1 clean workplace-friendly joke. No sarcasm targeting groups. JSON: {"text":"..."}`,
      quote: `Generate 1 inspirational professional quote about ${topic || "public speaking"}. JSON: {"text":"...","author":"..."}`,
      speechTitle: `Generate 1 professional speech title. Max 12 words. JSON: {"text":"..."}`
    };

    if (!promptByType[type]) {
      return res.status(400).json({ ok: false, error: "Invalid type" });
    }

    // Initialize Gemini API with securely stored API key
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: SYSTEM_RULES
    });

    // Call Gemini API (server-side only)
    const result = await model.generateContent(promptByType[type]);
    const raw = result?.response?.text?.() || "";

    // Parse and validate response
    const parsed = parseJsonSafely(raw);
    if (!parsed) {
      return res.json({ ok: true, data: fallback(type), source: "fallback_json_parse" });
    }

    const joined = Object.values(parsed).join(" ");
    if (!validateSafeText(joined)) {
      return res.json({ ok: true, data: fallback(type), source: "fallback_safety_filter" });
    }

    // Return safe content to frontend
    return res.json({ ok: true, data: parsed, source: "gemini" });
  } catch (err) {
    console.error("Error in /api/generate:", err);
    return res.json({ ok: true, data: fallback(req.body?.type || "topic"), source: "fallback_error" });
  }
});

export default router;
