import { resolveApiKey } from "../../lib/ai-session.js";

function nameOf(model) {
  return String(model?.name || "").replace(/^models\//, "");
}

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const resolved = resolveApiKey(req);
  if (!resolved.key) {
    return res.status(400).json({
      error: "Aktif Gemini API bağlantısı bulunamadı.",
      mode: resolved.mode,
    });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models",
      { headers: { "x-goog-api-key": resolved.key } }
    );
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "Google AI bağlantısı test edilemedi.",
      });
    }

    const models = Array.isArray(data.models) ? data.models.map(nameOf) : [];
    const has = (id) => models.includes(id) || models.some((m) => m.startsWith(id));

    return res.status(200).json({
      ok: true,
      mode: resolved.mode,
      source: resolved.source,
      capabilities: {
        text: {
          ready:
            has(process.env.GEMINI_TEXT_MODEL || "gemini-3.6-flash") ||
            models.some((m) => m.startsWith("gemini-") && !m.includes("image")),
          model: process.env.GEMINI_TEXT_MODEL || "gemini-3.6-flash",
        },
        image: {
          ready: has(process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image"),
          model: process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image",
        },
        video: {
          ready:
            has(process.env.VEO_MODEL || "veo-3.1-generate-preview") ||
            models.some((m) => m.startsWith("veo-3.1")),
          model: process.env.VEO_MODEL || "veo-3.1-generate-preview",
          note:
            "Model görünür olsa bile Veo kullanımı Google projenizde ücretli erişim/kota gerektirebilir.",
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "AI bağlantı testi başarısız.",
    });
  }
}
