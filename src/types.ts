export type ModelStyle = "realistic" | "anime" | "pixel" | "editorial" | "cyberpunk";

export interface BeautyRoutine {
  morningSteps: string[];
  nightSteps: string[];
  signatureSecret: string;
  skincareFavorite: string;
  makeupLook: string;
  fragranceNotes: string;
  dietWaterTip: string;
}

export interface AIModel {
  id: string;
  name: string;
  title: string;
  avatar: string;
  fullBodyImage: string;
  videoPreviewUrl?: string;
  style: ModelStyle;
  nationalityVibe: string;
  height: string;
  skinType: string;
  hairDefault: string;
  bio: string;
  tags: string[];
  beautyRoutine: BeautyRoutine;
  voiceSampleText: string;
  commercialNiches: string[];
  stats: {
    campaignsCount: number;
    engagementRate: string;
    popularity: number;
  };
  // Premium & Brand Collaborations fields
  isBrandCollabReady?: boolean;
  isPremium?: boolean;
  badge?: string;
  galleryImages?: string[];
  exactPromptSnippet?: string;
  niche?: string;
  ethnicity?: string;
}

export interface WardrobeOption {
  id: string;
  name: string;
  category: "dress" | "athleisure" | "lingerie" | "streetwear" | "shoes" | "accessories";
  imageOverlay: string;
  description: string;
  compatibleTextures: string[];
}

export interface TextureOption {
  id: string;
  name: string;
  colorHex: string;
  finish: "silk" | "leather" | "velvet" | "latex" | "cotton" | "metallic" | "denim";
  cssPattern: string;
  roughness: number;
}

export interface AccessoryItem {
  id: string;
  name: string;
  type: "glasses" | "jewelry" | "hat" | "bag" | "watch";
  iconName: string;
}

export type ActionType = "catwalk" | "running" | "posing" | "lounge" | "closeup_beauty";

export type CameraAngle = "eye_level" | "low_angle" | "high_fashion_45" | "macro_product" | "bird_eye";

export type LightingPreset = "studio_softbox" | "golden_hour" | "cyber_neon" | "runway_strobe" | "natural_daylight";

export type ProductCategory = 
  | "running_shoes"
  | "sandals"
  | "lingerie"
  | "dress"
  | "furniture"
  | "lipstick"
  | "nail_polish"
  | "hair_care";

export interface ProductPreset {
  id: ProductCategory;
  name: string;
  tagline: string;
  defaultAction: ActionType;
  defaultCameraAngle: CameraAngle;
  defaultLighting: LightingPreset;
  sampleBrandName: string;
  suggestedPrompt: string;
}

export interface MoodboardCard {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory | "camera_guide" | "texture_study";
  aspectRatio: string;
  image: string;
  badge: string;
  promptSnippet: string;
  cameraSettings: string;
  likes: number;
}

export interface CampaignScene {
  sceneNumber: number;
  action: string;
  cameraMove: string;
  lighting: string;
  duration: string;
  visualDescription: string;
  audioCue: string;
}

export interface CampaignPackage {
  campaignTitle: string;
  tagline: string;
  creativeDirectorNotes: string;
  scenes: CampaignScene[];
  voiceoverScript: string;
  promptBlueprint: string;
}

// Visual Photoshoot Wizard Types (matching myAIwear SaaS video)
export interface FramingOption {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

export interface CameraAngleOption {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

export interface LightingOption {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

export interface PhotoStyleOption {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

export interface CameraFilmOption {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

export interface AmbiancePreset {
  id: string;
  name: string;
  industry: string;
  description: string;
  backgroundPrompt: string;
  image: string;
  recommendedLighting: string;
}

export interface ProductItemSlot {
  id: "item_1" | "item_2" | "item_3";
  title: string;
  label: string;
  placeholder: string;
  uploadedImageUrl?: string;
  name: string;
  category: string;
}

export interface MultiAngleResult {
  id: string;
  angleName: string;
  label: string;
  image: string;
  prompt: string;
  aspectRatio: string;
}

export interface VideoPresetItem {
  id: string;
  title: string;
  description: string;
  cameraMotion: string;
  duration: string;
  creditsRequired: number;
  iconName: string;
  sampleVideoUrl?: string;
  previewThumbnail: string;
}

export interface GeneratedAsset {
  id: string;
  title: string;
  type: "image" | "video";
  modelName: string;
  productName: string;
  ambiance: string;
  imageUrl: string;
  videoUrl?: string;
  aspectRatio: string;
  prompt: string;
  createdAt: string;
  isCommercialLicensed: boolean;
  licenseId: string;
}

export interface CommercialLicenseCert {
  licenseId: string;
  issuedTo: string;
  creationDate: string;
  modelType: "100% Synthetic AI (Zero Model Release Required)";
  commercialUsePermitted: boolean;
  territory: "Worldwide / Global";
  industriesCovered: string[];
  declaration: string;
  verificationHash: string;
}

// Commercial Ad Template Categories & Storyboards
export type AdCategory =
  | "all"
  | "fashion_tryon"
  | "sneaker_sports"
  | "ugc_podcast"
  | "cinematic_storyboard"
  | "beauty_cosmetics"
  | "home_lifestyle";

export interface StoryboardSceneItem {
  timeCode: string;
  shotType: string;
  action: string;
  foleyAudio: string;
  visualCue: string;
}

export interface AdTemplateItem {
  id: string;
  title: string;
  category: AdCategory;
  categoryLabel: string;
  badge: string;
  tagline: string;
  description: string;
  modelId: string;
  modelName: string;
  modelAvatar: string;
  thumbnail: string;
  previewVideoUrl?: string;
  products: {
    item1: { title: string; image: string; category: string };
    item2?: { title: string; image: string; category: string };
    item3?: { title: string; image: string; category: string };
  };
  presetConfiguration: {
    framingId: string;
    cameraAngleId: string;
    lightingId: string;
    photoStyleId: string;
    cameraFilmId: string;
    ambianceId: string;
    aspectRatio: string;
    videoPresetId: string;
    suggestedAudioTrack: string;
  };
  fullPrompt: string;
  storyboardBreakdown?: StoryboardSceneItem[];
  commercialBenefits: string[];
  idealFor: string[];
}
