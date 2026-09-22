import crypto from "node:crypto";

const MODE_COOKIE = "guzelai_ai_mode";
const KEY_COOKIE = "guzelai_byok";

function parseCookies(req) {
  const raw = req.headers?.cookie || "";
  return raw.split(";").reduce((acc, part) => {
    const idx = part.indexOf("=");
    if (idx === -1) return acc;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
}

function encryptionKey() {
  const secret =
    process.env.AI_KEY_ENCRYPTION_SECRET ||
    process.env.GEMINI_API_KEY ||
    "";
  if (!secret) return null;
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptApiKey(apiKey) {
  const key = encryptionKey();
  if (!key) {
    const error = new Error(
      "AI_KEY_ENCRYPTION_SECRET veya platform GEMINI_API_KEY Vercel ortam değişkenine eklenmeli."
    );
    error.code = "ENCRYPTION_SECRET_MISSING";
    throw error;
  }
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(apiKey, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

export function decryptApiKey(token) {
  if (!token) return null;
  const key = encryptionKey();
  if (!key) return null;
  try {
    const payload = Buffer.from(token, "base64url");
    const iv = payload.subarray(0, 12);
    const tag = payload.subarray(12, 28);
    const encrypted = payload.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]).toString("utf8");
  } catch {
    return null;
  }
}

export function getAiMode(req) {
  const cookies = parseCookies(req);
  return cookies[MODE_COOKIE] === "byok" ? "byok" : "platform";
}

export function getPersonalApiKey(req) {
  const cookies = parseCookies(req);
  return decryptApiKey(cookies[KEY_COOKIE]);
}

export function resolveApiKey(req) {
  const mode = getAiMode(req);
  if (mode === "byok") {
    const key = getPersonalApiKey(req);
    if (key) return { key, mode: "byok", source: "personal" };
  }

  if (process.env.GEMINI_API_KEY) {
    return {
      key: process.env.GEMINI_API_KEY,
      mode: "platform",
      source: "platform",
    };
  }

  const personal = getPersonalApiKey(req);
  if (personal) {
    return { key: personal, mode: "byok", source: "personal" };
  }

  return { key: null, mode, source: "none" };
}

function cookieString(name, value, maxAge) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

export function setAiModeCookies(res, { mode, encryptedKey }) {
  const cookies = [
    cookieString(MODE_COOKIE, mode === "byok" ? "byok" : "platform", 60 * 60 * 24 * 30),
  ];
  if (mode === "byok" && encryptedKey) {
    cookies.push(cookieString(KEY_COOKIE, encryptedKey, 60 * 60 * 24 * 30));
  } else {
    cookies.push(cookieString(KEY_COOKIE, "", 0));
  }
  res.setHeader("Set-Cookie", cookies);
}

export function clearAiCookies(res) {
  res.setHeader("Set-Cookie", [
    cookieString(MODE_COOKIE, "platform", 0),
    cookieString(KEY_COOKIE, "", 0),
  ]);
}
