export default async function handler(req, res) {
  const ghPat = process.env.GUZELAI_PAT || process.env.GH_TOKEN || "";
  const gdriveBridgeUrl = process.env.GDRIVE_BRIDGE_URL || "";
  const action = String(req.query?.action || "trigger").toLowerCase();
  const slot = String(req.query?.slot || "otomatik").toLowerCase();

  const statusPayload = {
    system: "GuzelAI.com 7/24 Tam Otonom Bulut Sistemi (Google Drive + GitHub Actions + Vercel)",
    owner_drive: "mehmetzenciir@gmail.com",
    instagram_account: "@guzelaicom",
    prime_time_slots_tsi: ["10:15", "15:15", "20:15"],
    timestamp_utc: new Date().toISOString(),
    engines: {
      vercel_cron: "ACTIVE",
      github_actions: ghPat ? "CONFIGURED" : "PUBLIC_SCHEDULE_ACTIVE",
      google_drive_bridge: gdriveBridgeUrl ? "CONNECTED" : "READY"
    }
  };

  if (action === "status") {
    return res.status(200).json(statusPayload);
  }

  const results = { ...statusPayload, dispatches: {} };

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
          body: JSON.stringify({
            ref: "main",
            inputs: {
              slot_name: slot,
              force_archetype_id: ""
            }
          })
        }
      );
      results.dispatches.github_actions = {
        ok: ghResp.ok,
        status: ghResp.status
      };
    } catch (err) {
      results.dispatches.github_actions = {
        ok: false,
        error: String(err)
      };
    }
  }

  if (gdriveBridgeUrl) {
    try {
      const gdResp = await fetch(`${gdriveBridgeUrl}?action=trigger_now&slot=${encodeURIComponent(slot)}`);
      const gdJson = await gdResp.json().catch(() => ({}));
      results.dispatches.google_drive_cloud = {
        ok: gdResp.ok,
        data: gdJson
      };
    } catch (err) {
      results.dispatches.google_drive_cloud = {
        ok: false,
        error: String(err)
      };
    }
  }

  return res.status(200).json(results);
}
