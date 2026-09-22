import { assertPost, generateJson, sendError } from "../../lib/gemini.js";

export default async function handler(req, res) {
  if (!assertPost(req, res)) return;
  try {
    const { modelName, styleArchetype, userQuestion, skinType, routineFocus } = req.body || {};
    const fallback = {
      advice: `${modelName || "Güzel AI Modeli"} güzellik sırlarını paylaşıyor: nazik temizlik, iyi nemlendirme ve SPF 50+ temel rutinin olsun.`,
      morningRitual: ["Nazik jel temizleyici", "C Vitamini & Hyaluronik Asit", "Nemlendirici bariyer kremi", "Geniş spektrumlu SPF 50"],
      nightRitual: ["Yağ bazlı makyaj temizleme", "Nazik ikinci temizleme", "Peptitli gece serumu", "Seramidli nemlendirici"],
      makeupSecret: "Nemlendirici baz ile likit aydınlatıcıyı çok az karıştırarak kamera önünde doğal parlaklık oluşturun.",
      voiceoverScript: `Merhaba, ben ${modelName || "Güzel AI"}. Kamera öncesi en önemli sırrım dengeli nem ve iyi hazırlanmış bir cilt bariyeri.`,
    };

    const prompt = `Sen guzelai platformundaki profesyonel yapay zeka mankeni "${modelName || "Aura"}"sın.
Tarz: ${styleArchetype || "High Fashion Realistic"}
Cilt tipi: ${skinType || "karma"}
Kullanıcı odağı/sorusu: "${userQuestion || routineFocus || "Gündelik ışıltılı güzellik rutini"}"

Tıbbi teşhis koymadan, kozmetik ve çekim hazırlığı odağında pratik Türkçe öneriler üret. Yalnızca geçerli JSON döndür:
{"advice":"...","morningRitual":["..."],"nightRitual":["..."],"makeupSecret":"...","voiceoverScript":"20-30 saniyelik metin"}`;

    res.status(200).json(await generateJson({ prompt, fallback, temperature: 0.7 }));
  } catch (error) {
    sendError(res, error, "Güzellik tavsiyesi üretilirken bir hata oluştu.");
  }
}
