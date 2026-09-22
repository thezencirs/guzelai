import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "guzelai-server" });
  });

  // 1. Beauty Advice & Skincare Routine endpoint
  app.post("/api/gemini/beauty-advice", async (req, res) => {
    try {
      const { modelName, styleArchetype, userQuestion, skinType, routineFocus } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          advice: `${modelName || "Güzel AI Modeli"} güzellik sırlarını paylaşıyor: Cildinizi her zaman çift aşamalı temizleyin, hyaluronik asit serumu ve SPF 50+ güneş koruyucuyu eksik etmeyin!`,
          morningRitual: ["Nazik jel temizleyici", "Gül suyu toniği", "C Vitamini & Hyaluronik Asit", "Nemlendirici bariyer kremi", "Geniş spektrumlu SPF 50"],
          nightRitual: ["Yağ bazlı makyaj temizleme", "Peptitli gece serumu", "Retinol / Bakuchiol", "Göz çevresi seramid kremi", "Dudak besleyici maske"],
          makeupSecret: "Fondöten yerine nemlendirici renkli serum ve likit aydınlatıcıyı karıştırıp uygulayarak 'Glass Skin' parlaklığı yakalayın.",
          voiceoverScript: `Merhaba! Ben ${modelName || "Güzel AI"}. Bugün sana podyum ve çekim günlerinde cildimi nasıl ışıltılı tuttuğumu fısıldamak istiyorum. İlk kural: asla nemsiz kalma!`,
        });
      }

      const prompt = `Sen "guzelai" platformundaki profesyonel yapay zeka mankeni "${modelName || "Aura"}" (Tarz: ${styleArchetype || "High Fashion Realistic"}).
Kullanıcı ${skinType || "karma"} cilt tipine sahip ve şu soruyu soruyor / odaklanıyor: "${userQuestion || routineFocus || "Gündelik ışıltılı güzellik rutini"}".

Lütfen Türkçe dilinde, profesyonel mankenlik ve güzellik perspektifinden ilham verici, pratik ve uzman bir tavsiye paketi oluştur.
Yanıtını TAM OLARAK şu JSON formatında ver:
{
  "advice": "Kişisel felsefe ve samimi manken tavsiyesi",
  "morningRitual": ["Adım 1", "Adım 2", "Adım 3", "Adım 4"],
  "nightRitual": ["Adım 1", "Adım 2", "Adım 3", "Adım 4"],
  "makeupSecret": "Özel makyaj veya bakım hilesi",
  "voiceoverScript": "Modelin seslendireceği 20-30 saniyelik samimi, çekici seslendirme metni"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (error: any) {
      console.error("Beauty advice error:", error);
      res.status(500).json({
        error: "Güzellik tavsiyesi üretilirken bir hata oluştu.",
        details: error?.message,
      });
    }
  });

  // 2. Commercial Campaign & Storyboard Generator
  app.post("/api/gemini/generate-campaign", async (req, res) => {
    try {
      const {
        productCategory,
        productName,
        modelName,
        styleMode,
        targetVibe,
        adFormat,
      } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          campaignTitle: `${productName || "Lüks Ürün"} x ${modelName || "Güzel AI"} — Kusursuz Çekim`,
          tagline: "Işıltını serbest bırak, podyumu sokağa taşı.",
          creativeDirectorNotes: "Kamera dinamik açılarla (9 & 12 grid açısı) ürüne ve modele odaklanır. Işıklandırma softbox ve altın saat konturları ile desteklenir.",
          scenes: [
            {
              sceneNumber: 1,
              action: "Podyum yürüyüşü & kamera göz hizası yaklaşımı",
              cameraMove: "Macro Zoom-in to Wide Catwalk",
              lighting: "Stüdyo Softbox 5600K",
              duration: "3.5s",
              visualDescription: `Model ${modelName} kendinden emin adımlarla yürürken ${productName || "ürün"} mükemmel netlikte öne çıkıyor.`,
              audioCue: "Düşük tempolu sofistike bass ritmi ve foley kumaş hışırtısı.",
            },
            {
              sceneNumber: 2,
              action: "Dinamik poz & ürün detay yakın çekimi",
              cameraMove: "Low Angle 45-degree Orbit",
              lighting: "Kenar Işığı & Doğal Güneş Yansıması",
              duration: "4.0s",
              visualDescription: "Kıyafet dokusu ve ürün materyali 4K detayda parıldar.",
              audioCue: "Modelin fısıltılı, etkileyici seslendirmesi devreye girer.",
            },
            {
              sceneNumber: 3,
              action: "Göz teması ve imza gülümseme",
              cameraMove: "Slow-motion Close-Up",
              lighting: "Glamour Glow Beauty Dish",
              duration: "3.0s",
              visualDescription: "Model doğrudan objektife bakar, dijital marka yüzü logosu belirir.",
              audioCue: "Vurucu marka sloganı ve yankılı kapanış akoru.",
            },
          ],
          voiceoverScript: `Bazen sadece bir dokunuş dünyayı değiştirir. ${productName || "Bu tasarım"} ile tanışın. Güzel AI ile geleceğin modası şimdi seninle.`,
          promptBlueprint: `High fashion editorial commercial for ${productName}, featuring ${modelName}, ${styleMode} aesthetic, cinematic 8k lighting, Vogue editorial photography style, 85mm f/1.4 lens, hyper-realistic fabric texture, commercial color grading.`,
        });
      }

      const prompt = `Sen "guzelai" medya ve yapay zeka mankenlik ajansının Baş Kreatif Direktörüsün.
Markalar, içerik üreticileri ve reklam sektörü için dijital marka yüzü modellerle video/fotoğraf reklam kampanyaları hazırlıyorsun.

Kampanya Parametreleri:
- Ürün Kategorisi: ${productCategory || "Moda / Kozmetik / Ayakkabı / Mobilya"}
- Ürün Adı / Açıklaması: ${productName || "Özel Koleksiyon"}
- Seçilen Manken: ${modelName || "Aura"}
- Model Tarzı: ${styleMode || "Gerçekçi / Ultra-Realistic"} (Pixel, Anime, Gerçekçi, 3D Editorial olabilir)
- İstenen Ruh Hali (Vibe): ${targetVibe || "Lüks, Çekici, Dinamik"}
- Format: ${adFormat || "Reels / TikTok / Ticari Video"}

Lütfen reklam videosunun sahne sahne planını (yürüme, koşma, kıyafet sergileme, kamera zoom/açı hareketleri), seslendirme metnini ve görsel prompt tarifini içeren eksiksiz bir reklam paketi üret.
Yanıtını TAM OLARAK şu JSON formatında ver:
{
  "campaignTitle": "Kampanya Başlığı",
  "tagline": "Vurucu Reklam Sloganı",
  "creativeDirectorNotes": "Yönetmen notu",
  "scenes": [
    {
      "sceneNumber": 1,
      "action": "Mankenin eylemi (ör. podyum catwalk yürüyüşü, koşu, poz)",
      "cameraMove": "Kamera hareketi (ör. Macro zoom, 360 orbit, low-angle)",
      "lighting": "Işık atmosferi (ör. Golden hour, Cyberpunk neon, Studio softbox)",
      "duration": "Ör. 3.5s",
      "visualDescription": "Görsel sahne detayı",
      "audioCue": "Ses efekti ve müzik ipucu"
    }
  ],
  "voiceoverScript": "Mankenin veya dış sesin okuyacağı reklam metni (Türkçe)",
  "promptBlueprint": "Midjourney / Veo / AI Image-Video için İngilizce profesyonel prompt formülü"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.8,
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (error: any) {
      console.error("Campaign generation error:", error);
      res.status(500).json({
        error: "Kampanya oluşturulurken bir hata oluştu.",
        details: error?.message,
      });
    }
  });

  // 3. Audio & Video Analysis Endpoint
  app.post("/api/gemini/analyze-video-audio", async (req, res) => {
    try {
      const { scriptText, tempo, targetMood, voiceStyle } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          audioMood: targetMood || "Sensual & Luxury ASMR",
          optimalBpm: 88,
          voiceToneRecommendation: "Derin, pürüzsüz ve fısıltılı mikro-dinamik ses tonu",
          foleySoundEffects: ["Kumaş hışırtısı (ipek)", "Makyaj kapağı tıkırtısı", "Yankılı topuk vuruşu", "Derin nefes"],
          cinematicPacingTips: "İlk 2 saniyede göz temasıyla kancayı (hook) atın, 5. saniyede ürün detayına odaklanın.",
          audioScriptPolish: scriptText ? `${scriptText} (Güzel AI ses filtresi ile optimize edildi)` : "Kusursuz güzellik, dijital zarafetle buluşuyor.",
        });
      }

      const prompt = `Sen "guzelai" stüdyosunun Ses ve Video Analiz Yapay Zekasısın.
Şu reklam metnini ve video konseptini analiz et:
- Metin: "${scriptText || "Doğal ışıltını keşfet."}"
- Tempo: "${tempo || "Orta / Akıcı"}"
- Hedeflenen Ruh Hali: "${targetMood || "Lüks & Modern"}"
- İstenen Ses Karakteri: "${voiceStyle || "Kadın manken, kendinden emin ve sıcak"}"

Yanıtını TAM OLARAK şu JSON formatında ver:
{
  "audioMood": "Ses ve müzik atmosferi",
  "optimalBpm": 90,
  "voiceToneRecommendation": "Ses tonu ve nefes yönetimi tavsiyesi",
  "foleySoundEffects": ["Efekt 1", "Efekt 2", "Efekt 3"],
  "cinematicPacingTips": "Görsel ve ses senkronizasyon tavsiyeleri",
  "audioScriptPolish": "Maksimum reklam etkisi için revize edilmiş akıcı seslendirme metni"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (error: any) {
      console.error("Audio analysis error:", error);
      res.status(500).json({
        error: "Ses analizi yapılırken bir hata oluştu.",
        details: error?.message,
      });
    }
  });

  // 4. Prompt Generator based on Wardrobe, Texture, Accessories & Camera
  app.post("/api/gemini/generate-prompt", async (req, res) => {
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
      } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          prompt: `Ultra-photorealistic fashion editorial of ${modelName}, ${style} style, wearing ${outfit} made of ${texture} texture, ${hairColor} ${hairStyle} hair, ${makeup} makeup, wearing ${accessory}, advertising ${product || "luxury fashion"}, shot from ${cameraAngle} with ${zoomLevel} framing, ${lighting} lighting, 8k resolution, Kodak Portra 400 color science, masterpiece.`,
          negativePrompt: "blurry, low quality, deformed anatomy, plastic skin, oversaturated, bad proportions",
          stylingTips: `${texture} dokusu ile ${accessory} aksesuarı harika bir kontrast oluşturuyor. Reklam çekiminde ${lighting} ışığı dokunun ışıltısını öne çıkaracaktır.`,
        });
      }

      const prompt = `Yapay zeka moda editörü olarak şu parametrelerden birinci sınıf, fotoğraf/video üretimi için (Midjourney v6 / Veo / Flux / SDXL) İngilizce prompt ve stil ipucu üret:
Manken: ${modelName}
Stil Türü: ${style} (Realistic, Anime, Pixel, Futuristic)
Kıyafet: ${outfit}
Kumaş Dokusu: ${texture}
Saç: ${hairStyle}, Renk: ${hairColor}
Makyaj: ${makeup}
Aksesuarlar: ${accessory}
Kamera Açısı: ${cameraAngle}
Zoom/Kadraj: ${zoomLevel}
Işıklandırma: ${lighting}
Reklamı Yapılan Ürün: ${product}

Yanıtını TAM OLARAK şu JSON formatında ver:
{
  "prompt": "Tam İngilizce prompt formülü (detaylı doku, kamera merceği ve aydınlatma bilgileri dahil)",
  "negativePrompt": "Negatif prompt formülü",
  "stylingTips": "Türkçe kreatif stil ve reklam tavsiyesi"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (error: any) {
      console.error("Prompt generation error:", error);
      res.status(500).json({
        error: "Prompt üretilirken hata oluştu.",
        details: error?.message,
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[guzelai] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
