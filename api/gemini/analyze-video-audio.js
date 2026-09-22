import { assertPost, generateJson, sendError } from "../../lib/gemini.js";

export default async function handler(req, res) {
  if (!assertPost(req, res)) return;
  try {
    const { scriptText, tempo, targetMood, voiceStyle } = req.body || {};
    const fallback = {
      audioMood: targetMood || "Sensual & Luxury",
      optimalBpm: 88,
      voiceToneRecommendation: voiceStyle || "Derin, pürüzsüz ve kontrollü mikro-dinamik ses tonu",
      foleySoundEffects: ["Kumaş hışırtısı", "Yankılı topuk vuruşu", "Yumuşak ürün foley sesi", "Derin nefes"],
      cinematicPacingTips: "İlk 2 saniyede güçlü görsel kanca, 5. saniyede ürün detayı, finalde net marka imzası kullanın.",
      audioScriptPolish: scriptText || "Kusursuz estetik, dijital yaratıcılıkla buluşuyor.",
    };

    const prompt = `Sen guzelai stüdyosunun Ses ve Video Analiz Yapay Zekasısın.
Metin: "${scriptText || "Doğal ışıltını keşfet."}"
Tempo: "${tempo || "Orta / Akıcı"}"
Ruh Hali: "${targetMood || "Lüks & Modern"}"
Ses Karakteri: "${voiceStyle || "Kendinden emin ve sıcak"}"

Yalnızca geçerli JSON döndür:
{"audioMood":"...","optimalBpm":90,"voiceToneRecommendation":"...","foleySoundEffects":["..."],"cinematicPacingTips":"...","audioScriptPolish":"..."}`;

    res.status(200).json(await generateJson({ req, prompt, fallback, temperature: 0.7 }));
  } catch (error) {
    sendError(res, error, "Ses analizi yapılırken bir hata oluştu.");
  }
}
