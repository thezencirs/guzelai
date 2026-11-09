import crypto from "node:crypto";
import { neon } from "@neondatabase/serverless";

const plans = new Set(["Başlangıç", "Büyüme", "Marka Stüdyosu"]);
const extrasAllowed = new Set(["E-ticaret ürün görselleri", "Web sitesi tasarımı / yenileme", "Reklam kreatifleri", "Influencer / AI marka yüzü", "SEO içerikleri", "E-posta kampanyası", "Basın ve sunum kiti", "Çok dilli içerik"]);
const clean = (value, max) => String(value ?? "").trim().slice(0, max);

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.DATABASE_URL) return res.status(503).json({ error: "Başvuru kaydı geçici olarak kullanılamıyor." });
  const body = req.body || {};
  if (body.companyFax) return res.status(202).json({ ok: true });
  const brand = clean(body.brand, 100);
  const email = clean(body.email, 254).toLowerCase();
  const website = clean(body.website, 300);
  const goal = clean(body.goal, 3000);
  const plan = clean(body.plan, 60);
  const extras = Array.isArray(body.extras) ? body.extras.filter((value) => extrasAllowed.has(value)).slice(0, 8) : [];
  if (!brand || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || goal.length < 12 || !plans.has(plan)) return res.status(400).json({ error: "Marka, geçerli e-posta, hedef ve paket gerekli." });
  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const ip = forwarded || req.socket?.remoteAddress || "unknown";
  const ipHash = crypto.createHmac("sha256", process.env.DATABASE_URL).update(ip).digest("hex");
  try {
    const sql = neon(process.env.DATABASE_URL);
    const recent = await sql`SELECT count(*)::int AS total FROM inquiries WHERE ip_hash = ${ipHash} AND created_at > now() - interval '1 hour'`;
    if (recent[0].total >= 3) return res.status(429).json({ error: "Bu saat için başvuru sınırına ulaşıldı. Lütfen sonra tekrar deneyin." });
    const id = crypto.randomUUID();
    await sql`INSERT INTO inquiries (id, brand, contact_email, website, goal, plan, extras, ip_hash) VALUES (${id}, ${brand}, ${email}, ${website}, ${goal}, ${plan}, ${JSON.stringify(extras)}::jsonb, ${ipHash})`;
    return res.status(201).json({ ok: true, id });
  } catch (error) {
    console.error("Inquiry create failed", error?.message);
    return res.status(503).json({ error: "Başvuru şu anda kaydedilemedi. Lütfen e-posta ile iletin." });
  }
}
