import { CONTINENTAL_MODELS, type ContinentalModel } from "./continentalModels";
import { EXPANDED_MODELS, type ExpandedModel } from "./expandedModels";

export type AtlasModel = ContinentalModel & Partial<Pick<ExpandedModel, "identityLockTR" | "identityLockPrompt" | "videoPrompt" | "negativePrompt" | "wardrobeRuleTR">>;

export const ATLAS_MODELS: AtlasModel[] = CONTINENTAL_MODELS.flatMap((original) => [
  original,
  ...EXPANDED_MODELS.filter((model) => model.continent === original.continent),
]);

const existingIdentity: Record<string, string> = {
  africa: "Ama Mensah: koyu kahverengi ten, sıcak kahverengi gözler, örgülü toplu saç, sakin bakış ve doğal cilt dokusu.",
  asia: "Yuna Sato: koyu düz saç, koyu gözler, doğal sıcak ten, yumuşak yüz hatları ve sakin ifade.",
  europe: "Tiago Moreira: dalgalı koyu saç, sıcak ten, göz ve gülüş çevresinde doğal çizgiler, hafif sakal.",
  "north-america": "Lucía Serrano: koyu dalgalı saç, sıcak orta ten, koyu gözler, doğal kaş ve yüz asimetrisi.",
  "south-america": "Mateo Rojas: koyu kıvırcık saç, sıcak orta ten, koyu gözler, hafif sakal ve doğal yüz çizgileri.",
  oceania: "Amara Ellis: koyu kıvırcık saç, sıcak orta ten, yüzünde doğal çiller, sakin güçlü ifade.",
  antarctica: "Noor Rahman: orta kahverengi ten, koyu gözler, doğal yüz hatları; kapüşon ve kutup ekipmanı çekimler boyunca işlevsel kalır.",
};

export const identityRuleFor = (model: AtlasModel) => model.identityLockTR ?? existingIdentity[model.id] ?? `${model.name}: onaylanan portredeki yüz geometrisi, ten tonu, göz rengi, saç çizgisi ve ayırt edici izler sabit kalır.`;

export const anglePromptFor = (model: AtlasModel, angle: "front" | "three-quarter" | "profile" | "full-body") => {
  const views = {
    front: "straight-on front view, eye-level, neutral expression, shoulders visible",
    "three-quarter": "three-quarter view turned 45 degrees, eye-level, relaxed expression",
    profile: "true side profile view, eye-level, ear and nose silhouette visible",
    "full-body": "head-to-toe full-body view, standing naturally, both hands and feet visible",
  };
  return `Use the approved master reference portrait of ${model.name} as the image identity anchor. Preserve the exact same fictional adult person across angles: ${model.identityLockPrompt ?? identityRuleFor(model)} Create one photorealistic ${views[angle]}. Keep age, facial geometry, eye color, skin tone, hairline, distinguishing marks and body proportions unchanged. Contemporary clothing consistent with the master portrait. Natural light, 50mm documentary photography, realistic skin and anatomy, no beauty smoothing, no face swap, no extra people, no text, no logo, no watermark.`;
};

export const videoPromptFor = (model: AtlasModel) => model.videoPrompt ?? `Use the approved master reference portrait of ${model.name} as the identity anchor. Preserve the exact same face geometry, eye color, skin tone, hairline, age and distinctive marks in every frame. ${model.name} turns toward camera, pauses and gives a natural microexpression in one continuous six-second shot. Keep realistic hands, fabric physics and consistent lighting. No face morphing, identity swap, beauty filter, text, logo or watermark.`;

export const consistencyNegativePromptFor = (model: AtlasModel) => model.negativePrompt ?? "No identity drift, changed facial geometry, altered eye color, changed hairline, erased natural marks, plastic skin, extra fingers, cloned people, text, logos or watermarks.";
