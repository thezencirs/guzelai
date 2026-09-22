import { resolveApiKey } from "../../lib/ai-session.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const resolved = resolveApiKey(req);
  if (!resolved.key) {
    return res.status(400).json({ error: "AI bağlantısı bulunamadı." });
  }

  const id = String(req.query?.id || "").trim();
  if (!id || !/^[A-Za-z0-9._\-/:]+$/.test(id)) {
    return res.status(400).json({ error: "Geçersiz video işi kimliği." });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/openai/videos/${encodeURIComponent(id)}`,
      {
        headers: {
          Authorization: `Bearer ${resolved.key}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || data?.error || "Video durumu alınamadı.",
      });
    }

    return res.status(200).json({
      ok: true,
      id: data.id || id,
      status: data.status || "processing",
      url: data.url || null,
      error: data.error || null,
      progress: data.progress ?? null,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Video durumu alınamadı.",
    });
  }
}
