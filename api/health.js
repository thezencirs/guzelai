export default async function handler(req, res) {
  const isCron = String(req.query?.cron || "") === "primetime" || String(req.query?.action || "") === "trigger";
  if (isCron) {
    const ghPat = process.env.GUZELAI_PAT || process.env.GH_TOKEN || "";
    const slot = String(req.query?.slot || "otomatik").toLowerCase();
    let dispatchResult = { ok: false, status: "no_pat" };
    if (ghPat) {
      try {
        const ghResp = await fetch(
          "https://api.github.com/repos/thezencirs/instagram-kombin-bot/actions/workflows/daily_reels.yml/dispatches",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${ghPat}`,
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
              "Content-Type": "application/json",
              "User-Agent": "GuzelAI-Vercel-Cron-Orchestrator"
            },
            body: JSON.stringify({ ref: "main", inputs: { slot_name: slot, force_archetype_id: "" } })
          }
        );
        dispatchResult = { ok: ghResp.ok, status: ghResp.status };
      } catch (err) {
        dispatchResult = { ok: false, error: String(err) };
      }
    }
    return res.status(200).json({ status: "ok", cron: "primetime", dispatch: dispatchResult, time: new Date().toISOString() });
  }

  return res.status(200).json({
    status: "ok",
    service: "guzelai",
    holding_agents: 50,
    holding_agencies: 9,
    time: new Date().toISOString(),
    ai: {
      platformAiConfigured: Boolean(process.env.GEMINI_API_KEY),
      byokEncryptionReady: Boolean(process.env.AI_KEY_ENCRYPTION_SECRET || process.env.GEMINI_API_KEY),
      googleLoginConfigured: Boolean(process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID),
      models: {
        text: process.env.GEMINI_TEXT_MODEL || "gemini-3.6-flash",
        image: process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image",
        video: process.env.VEO_MODEL || "veo-3.1-generate-preview"
      }
    }
  });
}
