import { GoogleGenAI } from "@google/genai";
import { resolveApiKey } from "../../lib/ai-session.js";

function extractImage(response) {
  const parts = response?.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((part) => part.inlineData?.data);
  if (!imagePart) throw new Error("Görsel çıktısı alınamadı.");
  return {
    data: imagePart.inlineData.data,
    mimeType: imagePart.inlineData.mimeType || "image/png",
  };
}

async function generate(ai, contents, aspectRatio) {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image",
    contents,
    config: {
      responseModalities: ["IMAGE"],
      responseFormat: {
        image: {
          aspectRatio,
          imageSize: "1K",
        },
      },
    },
  });
  return extractImage(response);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const resolved = resolveApiKey(req);
  if (!resolved.key) {
    return res.status(400).json({
      error:
        "AI bağlantısı yok. Profil > AI Bağlantısı bölümünden platform veya kendi Gemini API anahtarınızı etkinleştirin.",
    });
  }

  const body = req.body || {};
  const name = String(body.name || "GuzelAI Model").slice(0, 80);
  const identityPrompt = [
    "Create a completely synthetic adult fashion model for a commercial brand campaign.",
    `Character name: ${name}.`,
    `Archetype: ${body.archetype || "premium editorial fashion"}.`,
    `Geographic/style vibe: ${body.vibe || "Mediterranean luxury"}.`,
    `Face: ${body.faceShape || "balanced editorial features"}.`,
    `Eyes: ${body.eyeColor || "natural expressive eyes"}.`,
    `Hair: ${body.hairStyle || "editorial styled hair"}.`,
    `Skin: ${body.skinTone || "natural realistic skin texture"}.`,
    `Body: ${body.bodyType || "adult fashion model proportions"}.`,
    `Outfit: ${body.outfitStyle || "premium contemporary fashion"}.`,
    "The person must be clearly adult, photorealistic, brand-safe, non-celebrity, non-identifiable, consistent facial identity, realistic anatomy, natural skin pores, premium commercial photography, no text, no watermark.",
  ].join(" ");

  try {
    const ai = new GoogleGenAI({ apiKey: resolved.key });

    const portrait = await generate(
      ai,
      `${identityPrompt} MASTER IDENTITY PORTRAIT. Head-and-shoulders, neutral expression, soft daylight studio, clean neutral background, 85mm editorial portrait, front-facing, identity reference image.`,
      "4:5"
    );

    const fullBody = await generate(
      ai,
      [
        {
          inlineData: {
            mimeType: portrait.mimeType,
            data: portrait.data,
          },
        },
        {
          text:
            `${identityPrompt} Use the attached master portrait as the exact character identity reference. Generate the SAME PERSON full body, standing naturally, fashion campaign pose, neutral premium studio, visible hands and feet, realistic proportions. Preserve face, hair, skin tone and age appearance exactly.`,
        },
      ],
      "9:16"
    );

    return res.status(200).json({
      ok: true,
      engine: process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image",
      mode: resolved.mode,
      identityPrompt,
      masterPortrait: `data:${portrait.mimeType};base64,${portrait.data}`,
      fullBody: `data:${fullBody.mimeType};base64,${fullBody.data}`,
      characterLock: {
        enabled: true,
        references: 2,
        instruction:
          "Yeni çekimlerde masterPortrait ve fullBody görsellerini referans olarak kullanın.",
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Model oluşturulamadı.",
    });
  }
}
