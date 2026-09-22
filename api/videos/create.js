import { resolveApiKey } from "../../lib/ai-session.js";

async function normalizeReference(referenceImage) {
  if (!referenceImage) return null;
  if (String(referenceImage).startsWith("data:image/")) {
    return String(referenceImage).split(",")[1] || null;
  }

  if (/^https?:\/\//i.test(String(referenceImage))) {
    const response = await fetch(referenceImage);
    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") || "image/jpeg";
    if (!contentType.startsWith("image/")) return null;
    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer.toString("base64");
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const resolved = resolveApiKey(req);
  if (!resolved.key) {
    return res.status(400).json({
      error:
        "AI bağlantısı yok. Profil > AI Bağlantısı bölümünden bir Gemini API bağlantısı seçin.",
    });
  }

  const prompt = String(req.body?.prompt || "").trim();
  if (!prompt) {
    return res.status(400).json({ error: "Video promptu gerekli." });
  }

  try {
    const reference = await normalizeReference(req.body?.referenceImage);

    const form = new FormData();
    form.append("model", process.env.VEO_MODEL || "veo-3.1-generate-preview");
    form.append("prompt", prompt);

    const extra = {
      aspect_ratio: req.body?.aspectRatio || "9:16",
      resolution: req.body?.resolution || "1080p",
      duration_seconds: Number(req.body?.durationSeconds || 8),
      style: "creative",
      person_generation: "allow_adult",
      negative_prompt:
        "identity drift, different face, deformed anatomy, extra fingers, shaky camera, unreadable text, logo mutation",
    };

    if (reference) {
      extra.image = reference;
      extra.reference_images = [reference];
    }

    form.append("extra_body", JSON.stringify(extra));

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/openai/videos",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resolved.key}`,
        },
        body: form,
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || data?.error || "Veo işi başlatılamadı.",
        details: data,
      });
    }

    return res.status(200).json({
      ok: true,
      id: data.id,
      status: data.status || "processing",
      mode: resolved.mode,
      engine: process.env.VEO_MODEL || "veo-3.1-generate-preview",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Video işi başlatılamadı.",
    });
  }
}
