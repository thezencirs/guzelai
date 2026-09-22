import { GoogleGenAI } from "@google/genai";
import { resolveApiKey } from "./ai-session.js";

export function assertPost(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return false;
  }
  return true;
}

function getClient(req) {
  const resolved = resolveApiKey(req);
  if (!resolved.key) return null;
  return new GoogleGenAI({
    apiKey: resolved.key,
    httpOptions: { headers: { "User-Agent": "guzelai-vercel" } },
  });
}

function cleanJson(text) {
  const raw = String(text || "{}").trim();
  const unfenced = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  return JSON.parse(unfenced || "{}");
}

export async function generateJson({ req, prompt, fallback, temperature = 0.7 }) {
  const ai = getClient(req);
  if (!ai) return fallback;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_TEXT_MODEL || process.env.GEMINI_MODEL || "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature,
    },
  });

  return cleanJson(response.text);
}

export function sendError(res, error, message) {
  console.error("[guzelai-api]", error);
  res.status(500).json({
    error: message,
    details: error?.message || String(error),
  });
}
