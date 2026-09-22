export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.status(200).json({
    ok: true,
    platformAiConfigured: Boolean(process.env.GEMINI_API_KEY),
    byokEncryptionReady: Boolean(
      process.env.AI_KEY_ENCRYPTION_SECRET || process.env.GEMINI_API_KEY
    ),
    googleLoginConfigured: Boolean(
      process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID
    ),
    models: {
      text: process.env.GEMINI_TEXT_MODEL || "gemini-3.6-flash",
      image: process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image",
      video: process.env.VEO_MODEL || "veo-3.1-generate-preview",
    },
    appUrl: process.env.APP_URL || null,
  });
}
