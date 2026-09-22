export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const credential = String(req.body?.credential || "").trim();
  if (!credential) {
    return res.status(400).json({ error: "Google kimlik belirteci eksik." });
  }

  try {
    const response = await fetch(
      "https://oauth2.googleapis.com/tokeninfo?id_token=" +
        encodeURIComponent(credential)
    );
    const profile = await response.json();

    if (!response.ok || !profile?.email) {
      return res.status(401).json({ error: "Google oturumu doğrulanamadı." });
    }

    const expectedAudience =
      process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;
    if (expectedAudience && profile.aud !== expectedAudience) {
      return res.status(401).json({ error: "Google istemci kimliği uyuşmuyor." });
    }

    return res.status(200).json({
      ok: true,
      user: {
        id: "google-" + profile.sub,
        name: profile.name || profile.email.split("@")[0],
        email: profile.email,
        role: "creator",
        brandName: "",
        plan: "free",
        credits: 50,
        createdModelsCount: 0,
        renderedClipsCount: 0,
        isLoggedIn: true,
        joinDate: new Date().toLocaleDateString("tr-TR", {
          month: "long",
          year: "numeric",
        }),
        googleVerified: true,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Google ile giriş başarısız.",
    });
  }
}
