import {
  clearAiCookies,
  encryptApiKey,
  getAiMode,
  getPersonalApiKey,
  setAiModeCookies,
} from "../../lib/ai-session.js";

async function validateKey(apiKey) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models",
    { headers: { "x-goog-api-key": apiKey } }
  );
  if (!response.ok) {
    let message = "Gemini API anahtarı doğrulanamadı.";
    try {
      const data = await response.json();
      message = data?.error?.message || message;
    } catch {}
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      mode: getAiMode(req),
      platformConfigured: Boolean(process.env.GEMINI_API_KEY),
      personalKeyConnected: Boolean(getPersonalApiKey(req)),
      encryptionReady: Boolean(
        process.env.AI_KEY_ENCRYPTION_SECRET || process.env.GEMINI_API_KEY
      ),
    });
  }

  if (req.method === "DELETE") {
    clearAiCookies(res);
    return res.status(200).json({ ok: true, mode: "platform" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const mode = req.body?.mode === "byok" ? "byok" : "platform";

  if (mode === "platform") {
    setAiModeCookies(res, { mode: "platform" });
    return res.status(200).json({
      ok: true,
      mode: "platform",
      platformConfigured: Boolean(process.env.GEMINI_API_KEY),
    });
  }

  const apiKey = String(req.body?.apiKey || "").trim();
  if (!apiKey || apiKey.length < 20) {
    return res.status(400).json({ error: "Geçerli bir Gemini API anahtarı girin." });
  }

  try {
    await validateKey(apiKey);
    const encryptedKey = encryptApiKey(apiKey);
    setAiModeCookies(res, { mode: "byok", encryptedKey });
    return res.status(200).json({
      ok: true,
      mode: "byok",
      personalKeyConnected: true,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || "API anahtarı kaydedilemedi.",
      code: error.code || null,
    });
  }
}
