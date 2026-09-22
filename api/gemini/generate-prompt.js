import { assertPost, generateJson, sendError } from "../../lib/gemini.js";

export default async function handler(req, res) {
  if (!assertPost(req, res)) return;
  try {
    const {
      modelName,
      style,
      outfit,
      texture,
      hairStyle,
      hairColor,
      makeup,
      accessory,
      cameraAngle,
      zoomLevel,
      lighting,
      product,
    } = req.body || {};

    const fallback = {
      prompt: `Ultra-photorealistic fashion editorial of ${modelName || "Aura"}, ${style || "realistic"} style, wearing ${outfit || "couture outfit"} made of ${texture || "premium fabric"}, ${hairColor || "natural"} ${hairStyle || "editorial"} hair, ${makeup || "glam"} makeup, wearing ${accessory || "minimal accessories"}, advertising ${product || "luxury fashion"}, shot from ${cameraAngle || "editorial eye level"} with ${zoomLevel || "medium"} framing, ${lighting || "cinematic"} lighting, 8k resolution, premium color science, masterpiece.`,
      negativePrompt: "blurry, low quality, deformed anatomy, plastic skin, oversaturated, bad proportions",
      stylingTips: `${texture || "Seçilen doku"} ile ${accessory || "aksesuar"} arasında dengeli bir kontrast kurun; ${lighting || "sinematik"} ışık dokuyu öne çıkaracaktır.`,
    };

    const prompt = `Yapay zeka moda editörü olarak aşağıdaki parametrelerden görsel/video üretimi için profesyonel İngilizce prompt üret:
Manken: ${modelName || "Aura"}
Stil: ${style || "Realistic"}
Kıyafet: ${outfit || "Couture"}
Doku: ${texture || "Premium fabric"}
Saç: ${hairStyle || "Editorial"}, Renk: ${hairColor || "Natural"}
Makyaj: ${makeup || "Glam"}
Aksesuar: ${accessory || "Minimal"}
Kamera: ${cameraAngle || "Eye level"}
Kadraj: ${zoomLevel || "Medium"}
Işık: ${lighting || "Cinematic"}
Ürün: ${product || "Luxury product"}

Yalnızca geçerli JSON döndür:
{"prompt":"detaylı İngilizce prompt","negativePrompt":"negatif prompt","stylingTips":"Türkçe kreatif stil tavsiyesi"}`;

    res.status(200).json(await generateJson({ req, prompt, fallback, temperature: 0.7 }));
  } catch (error) {
    sendError(res, error, "Prompt üretilirken hata oluştu.");
  }
}
