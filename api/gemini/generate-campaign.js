import { assertPost, generateJson, sendError } from "../../lib/gemini.js";

export default async function handler(req, res) {
  if (!assertPost(req, res)) return;
  try {
    const {
      productCategory,
      productName,
      modelName,
      styleMode,
      targetVibe,
      adFormat,
    } = req.body || {};

    const fallback = {
      campaignTitle: `${productName || "Lüks Ürün"} x ${modelName || "Güzel AI"} — Kusursuz Çekim`,
      tagline: "Işıltını serbest bırak, podyumu sokağa taşı.",
      creativeDirectorNotes: "Kamera dinamik açılarla ürüne ve modele odaklanır. Işıklandırma softbox ve altın saat konturları ile desteklenir.",
      scenes: [
        {
          sceneNumber: 1,
          action: "Podyum yürüyüşü & kamera göz hizası yaklaşımı",
          cameraMove: "Macro Zoom-in to Wide Catwalk",
          lighting: "Stüdyo Softbox 5600K",
          duration: "3.5s",
          visualDescription: `Model ${modelName || "Aura"} kendinden emin adımlarla yürürken ${productName || "ürün"} öne çıkıyor.`,
          audioCue: "Düşük tempolu sofistike bass ritmi ve kumaş foley sesi.",
        },
        {
          sceneNumber: 2,
          action: "Dinamik poz & ürün detay yakın çekimi",
          cameraMove: "Low Angle 45-degree Orbit",
          lighting: "Kenar ışığı & doğal güneş yansıması",
          duration: "4.0s",
          visualDescription: "Kıyafet dokusu ve ürün materyali 4K detayda parıldar.",
          audioCue: "Etkileyici seslendirme devreye girer.",
        },
        {
          sceneNumber: 3,
          action: "Göz teması ve imza gülümseme",
          cameraMove: "Slow-motion Close-Up",
          lighting: "Glamour Glow Beauty Dish",
          duration: "3.0s",
          visualDescription: "Model objektife bakar ve marka imzası belirir.",
          audioCue: "Vurucu marka sloganı ve kapanış akoru.",
        },
      ],
      voiceoverScript: `Bazen sadece bir dokunuş dünyayı değiştirir. ${productName || "Bu tasarım"} ile tanışın. Güzel AI ile geleceğin kreatifi şimdi seninle.`,
      promptBlueprint: `High fashion editorial commercial for ${productName || "luxury product"}, featuring ${modelName || "Aura"}, ${styleMode || "ultra realistic"} aesthetic, cinematic 8k lighting, editorial photography, 85mm f/1.4 lens, hyper-realistic texture, premium commercial color grading.`,
    };

    const prompt = `Sen guzelai medya ve yapay zeka mankenlik ajansının Baş Kreatif Direktörüsün.
Kampanya Parametreleri:
- Ürün Kategorisi: ${productCategory || "Moda / Kozmetik / Ayakkabı / Mobilya"}
- Ürün Adı / Açıklaması: ${productName || "Özel Koleksiyon"}
- Seçilen Manken: ${modelName || "Aura"}
- Model Tarzı: ${styleMode || "Ultra-Realistic"}
- İstenen Ruh Hali: ${targetVibe || "Lüks, Çekici, Dinamik"}
- Format: ${adFormat || "Reels / TikTok / Ticari Video"}

Türkçe, uygulanabilir, premium bir reklam paketi üret. Yalnızca geçerli JSON döndür:
{
  "campaignTitle": "Kampanya Başlığı",
  "tagline": "Vurucu Reklam Sloganı",
  "creativeDirectorNotes": "Yönetmen notu",
  "scenes": [{"sceneNumber":1,"action":"...","cameraMove":"...","lighting":"...","duration":"3.5s","visualDescription":"...","audioCue":"..."}],
  "voiceoverScript": "Türkçe reklam metni",
  "promptBlueprint": "İngilizce profesyonel image/video prompt"
}`;

    res.status(200).json(await generateJson({ req, prompt, fallback, temperature: 0.8 }));
  } catch (error) {
    sendError(res, error, "Kampanya oluşturulurken bir hata oluştu.");
  }
}
