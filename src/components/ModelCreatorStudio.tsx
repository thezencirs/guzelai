import React, { useState } from "react";
import {
  Sparkles,
  Gamepad2,
  Box,
  Download,
  Copy,
  Check,
  Zap,
  Sliders,
  RotateCcw,
  CheckCircle2,
  Camera,
  Layers,
  Flame,
  Globe,
  Share2,
  Eye,
  Film,
  Maximize2,
  Volume2,
  Music,
  ChevronRight,
  ShieldCheck,
  User,
} from "lucide-react";
import { AIModel, ModelStyle } from "../types";
import { TranslationSchema } from "../i18n/translations";

interface ModelCreatorStudioProps {
  t?: TranslationSchema;
  onDeployModelToRoster: (newModel: AIModel) => void;
  onNavigateToClips?: () => void;
  onNavigateToDressUp?: () => void;
}

interface CharacterPreset {
  id: string;
  name: string;
  handle: string;
  archetype: string;
  vibe: string;
  avatar: string;
  fullBody: string;
  hair: string;
  eyes: string;
  skin: string;
  body: string;
  outfit: string;
  voice: string;
  tags: string[];
}

const PRESET_INFLUENCERS: CharacterPreset[] = [
  {
    id: "preset-aura-paris",
    name: "Aura Delacroix",
    handle: "@aura.delacroix",
    archetype: "Haute Podyum & İpek Zarafet",
    vibe: "Paris Haute Couture & Fransız Zarafeti",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=85",
    fullBody: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&auto=format&fit=crop&q=85",
    hair: "Kumral İpek Dalgalı",
    eyes: "Zümrüt Yeşili",
    skin: "8K Glass Skin & Fransız Işıltısı",
    body: "1.80m Podyum İnce & Zarif",
    outfit: "Altın Saten İpek Dekolte Elbise",
    voice: "Lüks Fısıltılı Fransız Aksanı (İngilizce/Türkçe)",
    tags: ["Haute Couture", "Chanel Vibe", "Podyum", "Lüks Mücevher"],
  },
  {
    id: "preset-kira-cyber",
    name: "Kira Neon-9",
    handle: "@kira_neon9",
    archetype: "Cyberpunk Metaverse & VTuber",
    vibe: "Tokyo Shinjuku & Unreal Engine Metahuman",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&q=85",
    fullBody: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=85",
    hair: "Neon Turkuaz & Mor Örgü",
    eyes: "Sibernetik Amber Glow",
    skin: "Porselen Siber Dövme & LED Işıltı",
    body: "Kıvrımlı Sibernetik Kum Saati",
    outfit: "Holografik Şeffaf Zırh Ceket & Sneaker",
    voice: "Dinamik Enerjik Gamer & Streamer Tonu",
    tags: ["Metaverse", "Unreal Engine 5", "Gamer", "Cyberpunk", "VTuber"],
  },
  {
    id: "preset-valentina-monaco",
    name: "Valentina Riviera",
    handle: "@valentina.riviera",
    archetype: "Dark Luxury & Supercar Siren",
    vibe: "Monaco Casino & Ferrari Spider Glamour",
    avatar: "/assets/valentina_avatar.jpg",
    fullBody: "/assets/valentina_supercar.jpg",
    hair: "Kestane Dalgalı Rüzgar Hacmi",
    eyes: "Derin Safir Mavisi",
    skin: "Akdeniz Güneş Bronzluğu",
    body: "Kum Saati Çekici & İtalyan Eğrileri",
    outfit: "Kırmızı Mini Saten Elbise & İnce Topuk",
    voice: "Kadife Derin Lüks İtalyan Aksanı",
    tags: ["Supercar", "Monaco", "Ferrari", "Femme Fatale", "VIP"],
  },
  {
    id: "preset-maya-fitness",
    name: "Maya Cruz",
    handle: "@maya.fitcruz",
    archetype: "Athletic UGC & TikTok Fitness",
    vibe: "Miami Sahili & Enerjik Yaşam Tarzı",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=85",
    fullBody: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=85",
    hair: "Güneşten Açılmış Bal Sarısı At Kuyruğu",
    eyes: "Sıcak Fındık Kahvesi",
    skin: "Işıltılı Sporcu Bronzluğu",
    body: "Fit & Şekilli Atletik Vücut",
    outfit: "Ten Rengi Spor Tayt & Seamless Büstiyer",
    voice: "Pozitif Güler Yüzlü TikTok UGC Tonu",
    tags: ["Fitness", "TikTok UGC", "Reels", "Sağlıklı Yaşam"],
  },
];

export const ModelCreatorStudio: React.FC<ModelCreatorStudioProps> = ({
  t,
  onDeployModelToRoster,
  onNavigateToClips,
  onNavigateToDressUp,
}) => {
  // Active Preset or Custom
  const [selectedPresetId, setSelectedPresetId] = useState<string>("preset-aura-paris");

  // Character Identity State
  const [charName, setCharName] = useState<string>("Aura Delacroix");
  const [charHandle, setCharHandle] = useState<string>("@aura.delacroix");
  const [charAge, setCharAge] = useState<number>(23);
  const [ethnicityVibe, setEthnicityVibe] = useState<string>("Akdeniz & Paris Haute Couture");
  const [archetype, setArchetype] = useState<string>("Haute Podyum & İpek Zarafet");

  // Morphological Traits
  const [faceShape, setFaceShape] = useState<string>("Keskin Çene & Belirgin Elmacık Kemikleri");
  const [eyeColor, setEyeColor] = useState<string>("Zümrüt Yeşili");
  const [hairStyle, setHairStyle] = useState<string>("Kumral İpek Dalgalı");
  const [skinTone, setSkinTone] = useState<string>("8K Glass Skin & Fransız Işıltısı");
  const [bodyType, setBodyType] = useState<string>("1.80m Podyum İnce & Zarif");
  const [outfitStyle, setOutfitStyle] = useState<string>("Altın Saten İpek Dekolte Elbise");
  const [voiceTone, setVoiceTone] = useState<string>("Lüks Fısıltılı Fransız Aksanı");

  // Viewport simulator states
  const [previewPose, setPreviewPose] = useState<"catwalk" | "selfie" | "tpose" | "portrait">("catwalk");
  const [previewEnvironment, setPreviewEnvironment] = useState<"studio" | "monaco" | "tokyo" | "paris">("paris");
  const [isCopiedApi, setIsCopiedApi] = useState<boolean>(false);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployedSuccess, setDeployedSuccess] = useState<boolean>(false);
  const [createdModel, setCreatedModel] = useState<AIModel | null>(null);

  // Apply Preset
  const handleApplyPreset = (preset: CharacterPreset) => {
    setSelectedPresetId(preset.id);
    setCharName(preset.name);
    setCharHandle(preset.handle);
    setArchetype(preset.archetype);
    setEthnicityVibe(preset.vibe);
    setHairStyle(preset.hair);
    setEyeColor(preset.eyes);
    setSkinTone(preset.skin);
    setBodyType(preset.body);
    setOutfitStyle(preset.outfit);
    setVoiceTone(preset.voice);
  };

  // Get current preview image
  const getCurrentPreviewImage = () => {
    const matchedPreset = PRESET_INFLUENCERS.find((p) => p.id === selectedPresetId);
    if (previewPose === "portrait") {
      return matchedPreset?.avatar || PRESET_INFLUENCERS[0].avatar;
    }
    return matchedPreset?.fullBody || PRESET_INFLUENCERS[0].fullBody;
  };

  // Copy API endpoint for Game Engines (Unreal / Unity)
  const handleCopyApiCode = () => {
    const slug = charName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const codeSnippet = `// GuzelAI Metaverse & Unreal Engine 5 Character API
const characterUrl = "https://api.guzelai.art/v1/metaverse/characters/${slug}.glb";
const config = {
  riggedMesh: true,
  format: "GLB / FBX (Metahuman compatible)",
  blendshapes: "ARKit 52 Face Morph Targets",
  clothingTexture4K: true
};
// Unreal Engine Metahuman LiveLink / Unity URP humanoid import ready`;
    navigator.clipboard.writeText(codeSnippet);
    setIsCopiedApi(true);
    setTimeout(() => setIsCopiedApi(false), 2000);
  };

  // Generate a real synthetic character with Gemini Image, then lock it into the live roster.
  const handleDeployToLife = async () => {
    setIsDeploying(true);
    setDeployedSuccess(false);
    try {
      const response = await fetch("/api/images/generate-model", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: charName,
          handle: charHandle,
          archetype,
          vibe: ethnicityVibe,
          faceShape,
          eyeColor,
          hairStyle,
          skinTone,
          bodyType,
          outfitStyle,
          voiceTone,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Model üretimi başarısız.");
      }

      const newModel: AIModel = {
        id: `created-${Date.now()}`,
        name: charName,
        title: `${archetype} & Character Lock AI Influencer`,
        avatar: data.masterPortrait,
        fullBodyImage: data.fullBody,
        style: "realistic",
        nationalityVibe: ethnicityVibe,
        height: bodyType.includes("1.80m") ? "1.80m" : "1.76m",
        skinType: skinTone,
        hairDefault: hairStyle,
        bio: `${charHandle} • Gemini Image ile üretilmiş ve iki ana referansla Character Lock uygulanmış sentetik AI influencer. ${ethnicityVibe}. Aynı karakter sonraki fotoğraf ve Veo reklamlarında referans olarak kullanılmaya hazır.`,
        tags: [archetype, "CHARACTER LOCK", data.engine || "Gemini Image", "9:16 Viral", "Commercial"],
        beautyRoutine: {
          morningSteps: ["Buzlu masaj silindiri", "Hyalüronik asit serum", "Glow nemlendirici"],
          nightSteps: ["Çift aşamalı temizleme", "Retinol bakım", "İpek yastık kılıfı"],
          signatureSecret: "Master Identity referanslarıyla yüz tutarlılığı",
          skincareFavorite: "Botanik Nemlendirici İksir",
          makeupLook: "Kurumsal kampanyaya göre dinamik",
          fragranceNotes: "Marka kitine göre dinamik",
          dietWaterTip: "Sentetik karakter profili",
        },
        voiceSampleText: `Merhaba! Ben ${charName}. GüzelAI Character Lock ile aynı kimliğimi koruyarak kampanyalarda ve 9:16 reklamlarda yer alıyorum.`,
        commercialNiches: ["Lüks Moda", "Kozmetik", "E-ticaret", "Otomotiv", "Sosyal Medya"],
        stats: {
          campaignsCount: 0,
          engagementRate: "%0",
          popularity: 80,
        },
        badge: "CHARACTER LOCK • AI GENERATED",
        isBrandCollabReady: true,
        isPremium: true,
      };

      setCreatedModel(newModel);
      setDeployedSuccess(true);
      onDeployModelToRoster(newModel);
    } catch (error: any) {
      alert(
        error?.message ||
          "Model üretilemedi. Profil > AI Bağlantısı bölümünden Gemini Image erişimini test edin."
      );
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="w-full bg-[#090B10] text-white min-h-screen relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#E65A7F]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] rounded-full bg-[#44BDBD]/10 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* ========================================================================= */}
        {/* HEADER: INFLUENCER & METAVERSE CREATOR MANIFESTO                          */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold tracking-widest uppercase text-[#44BDBD] backdrop-blur shadow-lg">
              <Gamepad2 className="w-4 h-4 text-[#E65A7F]" />
              <span>GUZELAI MODEL & INFLUENCER CREATOR STUDIO</span>
              <span className="text-white/40">&bull;</span>
              <span className="text-white/90">METAVERSE & GAMING ENGINE READY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Kendi AI Influencer'ını Yarat;{" "}
              <span className="bg-gradient-to-r from-white via-white/90 to-[#E65A7F] bg-clip-text text-transparent">
                Metaverse ve Oyunlar Buradan Karakter Çeksin.
              </span>
            </h1>

            <p className="text-xs sm:text-base text-white/75 leading-relaxed">
              Yüz hatlarından ten ışıltısına, ses tonundan podyum yürüyüşüne kadar kişiselleştirin. Tek tıkla <strong>9:16 viral kliplerde oynatın</strong> veya <strong>Unreal Engine 5 / Unity / Roblox</strong> için 3D Rigged karakter olarak çekin!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="btn-deploy-model-top"
              onClick={handleDeployToLife}
              disabled={isDeploying}
              className="px-6 py-3.5 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white text-xs sm:text-sm font-black tracking-tight transition shadow-xl shadow-[#E65A7F]/30 flex items-center gap-2"
            >
              {isDeploying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Master Identity & Full Body Üretiliyor...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Gemini ile Modeli Üret, Kilitle & Stüdyoya Aktar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PRESET INFLUENCER PICKER ROW                                              */}
        {/* ========================================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono uppercase tracking-wider text-white/60 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E65A7F]" />
              <span>Hızlı Başlangıç Karakter Presetleri:</span>
            </span>
            <span className="text-white/40 text-[11px] hidden sm:inline">
              Bir preset seçip detayları dilediğiniz gibi özelleştirebilirsiniz.
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PRESET_INFLUENCERS.map((preset) => {
              const isSelected = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex items-center gap-3 ${
                    isSelected
                      ? "bg-white/15 border-[#E65A7F] shadow-lg shadow-[#E65A7F]/20 scale-[1.02]"
                      : "bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
                  }`}
                >
                  <img
                    src={preset.avatar}
                    alt={preset.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/20"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-white truncate">{preset.name}</div>
                    <div className="text-[10px] font-mono text-[#44BDBD] truncate">{preset.handle}</div>
                    <div className="text-[10px] text-white/60 truncate">{preset.archetype}</div>
                  </div>
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E65A7F] animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* WORKSPACE: LEFT CONTROLS (7 Cols) & RIGHT LIVE 3D VIEWPORT (5 Cols)       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Customization Suite (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Kimlik & Bio */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E65A7F] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>1. KARAKTER KİMLİĞİ & SOSYAL MEDYA</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
                  Instagram / TikTok
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold block">Karakter Adı:</label>
                  <input
                    type="text"
                    value={charName}
                    onChange={(e) => setCharName(e.target.value)}
                    placeholder="Örn: Layla Vega"
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#E65A7F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold block">Instagram / Metaverse Handle:</label>
                  <input
                    type="text"
                    value={charHandle}
                    onChange={(e) => setCharHandle(e.target.value)}
                    placeholder="Örn: @layla.meta"
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-[#44BDBD] font-mono placeholder-white/40 focus:outline-none focus:border-[#44BDBD]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold block">Karakter Arketipi:</label>
                  <select
                    value={archetype}
                    onChange={(e) => setArchetype(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#E65A7F]"
                  >
                    <option value="Haute Podyum & İpek Zarafet">Haute Podyum & İpek Zarafet</option>
                    <option value="Dark Luxury & Supercar Siren">Dark Luxury & Supercar Siren</option>
                    <option value="Cyberpunk Metaverse & VTuber">Cyberpunk Metaverse & VTuber</option>
                    <option value="Athletic UGC & TikTok Fitness">Athletic UGC & TikTok Fitness</option>
                    <option value="Yüksek Mücevher & Zümrüt Kraliçesi">Yüksek Mücevher & Zümrüt Kraliçesi</option>
                    <option value="Gaming & Sci-Fi Metahuman">Gaming & Sci-Fi Metahuman</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold block">Etnik Vibe / Coğrafya:</label>
                  <input
                    type="text"
                    value={ethnicityVibe}
                    onChange={(e) => setEthnicityVibe(e.target.value)}
                    placeholder="Örn: Akdeniz & İtalyan Riviera"
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#E65A7F]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Yüz, Ten & Morfoloji */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#44BDBD] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>2. YÜZ HATTI, TEN VE SAÇ MORFOLOJİSİ</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#44BDBD]/20 text-[#44BDBD]">
                  8K Fotogerçekçi
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold block">Yüz Kemik Yapısı:</label>
                  <select
                    value={faceShape}
                    onChange={(e) => setFaceShape(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#44BDBD]"
                  >
                    <option value="Keskin Çene & Belirgin Elmacık Kemikleri">Keskin Çene & Belirgin Elmacık Kemikleri</option>
                    <option value="Kalp Yüz & İnce Zarif Burun">Kalp Yüz & İnce Zarif Burun</option>
                    <option value="Oval Podyum & Yüksek Simetri">Oval Podyum & Yüksek Simetri</option>
                    <option value="Kuzeyli Kemikli & Derin Bakışlar">Kuzeyli Kemikli & Derin Bakışlar</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold block">Göz Rengi & Bakış:</label>
                  <select
                    value={eyeColor}
                    onChange={(e) => setEyeColor(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#44BDBD]"
                  >
                    <option value="Zümrüt Yeşili">Zümrüt Yeşili</option>
                    <option value="Derin Safir Mavisi">Derin Safir Mavisi</option>
                    <option value="Sıcak Fındık & Amber">Sıcak Fındık & Amber</option>
                    <option value="Sibernetik Amber Glow">Sibernetik Amber Glow</option>
                    <option value="Karanlık Obsidyen">Karanlık Obsidyen</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold block">Saç Stili & Rengi:</label>
                  <select
                    value={hairStyle}
                    onChange={(e) => setHairStyle(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#44BDBD]"
                  >
                    <option value="Kumral İpek Dalgalı">Kumral İpek Dalgalı</option>
                    <option value="Kestane Dalgalı Rüzgar Hacmi">Kestane Dalgalı Rüzgar Hacmi</option>
                    <option value="Neon Turkuaz & Mor Örgü">Neon Turkuaz & Mor Örgü</option>
                    <option value="Platin Sarı Düz Bob Kesim">Platin Sarı Düz Bob Kesim</option>
                    <option value="Güneşten Açılmış Bal Sarısı At Kuyruğu">Güneşten Açılmış Bal Sarısı At Kuyruğu</option>
                    <option value="Zifiri Siyah Islak Gerim">Zifiri Siyah Islak Gerim</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold block">Ten Dokusu & Işıltı:</label>
                  <select
                    value={skinTone}
                    onChange={(e) => setSkinTone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#44BDBD]"
                  >
                    <option value="8K Glass Skin & Fransız Işıltısı">8K Glass Skin & Fransız Işıltısı</option>
                    <option value="Akdeniz Güneş Bronzluğu">Akdeniz Güneş Bronzluğu</option>
                    <option value="Porselen Siber Dövme & LED Işıltı">Porselen Siber Dövme & LED Işıltı</option>
                    <option value="Işıltılı Sporcu Bronzluğu">Işıltılı Sporcu Bronzluğu</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Vücut, Kıyafet & Ses */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>3. VÜCUT HATTI, İMZA KIYAFET & SES TONU</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                  Haute Stylist
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold block">Vücut Formu & Boy:</label>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="1.80m Podyum İnce & Zarif">1.80m Podyum İnce & Zarif</option>
                    <option value="Kum Saati Çekici & İtalyan Eğrileri">Kum Saati Çekici & İtalyan Eğrileri</option>
                    <option value="Kıvrımlı Sibernetik Kum Saati">Kıvrımlı Sibernetik Kum Saati</option>
                    <option value="Fit & Şekilli Atletik Vücut">Fit & Şekilli Atletik Vücut</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold block">İmza Kıyafet Stili:</label>
                  <select
                    value={outfitStyle}
                    onChange={(e) => setOutfitStyle(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Altın Saten İpek Dekolte Elbise">Altın Saten İpek Dekolte Elbise</option>
                    <option value="Kırmızı Mini Saten Elbise & İnce Topuk">Kırmızı Mini Saten Elbise & İnce Topuk</option>
                    <option value="Holografik Şeffaf Zırh Ceket & Sneaker">Holografik Şeffaf Zırh Ceket & Sneaker</option>
                    <option value="Ten Rengi Spor Tayt & Seamless Büstiyer">Ten Rengi Spor Tayt & Seamless Büstiyer</option>
                    <option value="Siyah Kadife Gece Tulumu">Siyah Kadife Gece Tulumu</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-white/70 font-semibold block flex items-center justify-between">
                    <span>Ses Karakteri & Konuşma Aksanı:</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Doğal TTS Entegre</span>
                  </label>
                  <div className="p-3 rounded-xl bg-black/50 border border-white/15 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                      <Volume2 className="w-4 h-4 text-[#E65A7F]" />
                      <span className="font-medium">{voiceTone}</span>
                    </div>
                    <button
                      onClick={() => alert(`"${charName}" ses örneği çalınıyor: "Merhaba, ben ${charName}. GuzelAI ile hem podyumda hem de metaverse oyunlarındayım."`)}
                      className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] transition"
                    >
                      Ses Dinle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Live 3D / AI Viewport + Metaverse Export Engine (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Viewport Frame */}
            <div className="w-full rounded-3xl bg-[#121620] border border-white/20 shadow-2xl overflow-hidden relative flex flex-col">
              {/* Top Viewport Header */}
              <div className="bg-[#1A1F2C] border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-xs select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[11px] font-bold text-white">SIMULATED 3D RIG VIEW</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewPose("catwalk")}
                    className={`px-2 py-1 rounded text-[10px] font-mono transition ${
                      previewPose === "catwalk" ? "bg-[#E65A7F] text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Podyum
                  </button>
                  <button
                    onClick={() => setPreviewPose("portrait")}
                    className={`px-2 py-1 rounded text-[10px] font-mono transition ${
                      previewPose === "portrait" ? "bg-[#E65A7F] text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Portre
                  </button>
                  <button
                    onClick={() => setPreviewPose("tpose")}
                    className={`px-2 py-1 rounded text-[10px] font-mono transition ${
                      previewPose === "tpose" ? "bg-[#44BDBD] text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    3D Rig
                  </button>
                </div>
              </div>

              {/* Viewport Image Display */}
              <div className="relative aspect-[3/4] bg-black overflow-hidden group">
                <img
                  src={getCurrentPreviewImage()}
                  alt={charName}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Director HUD Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 p-5 flex flex-col justify-between pointer-events-none">
                  <div className="flex items-center justify-between">
                    <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/20 text-[10px] font-mono text-[#44BDBD] font-bold">
                      {charHandle}
                    </div>

                    <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/20 text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Metahuman Ready
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <div className="text-xl font-black text-white drop-shadow-md">{charName}</div>
                    <div className="text-xs text-white/80 font-medium drop-shadow-md">{archetype}</div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/20 text-white backdrop-blur">
                        {faceShape}
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#E65A7F]/40 text-white backdrop-blur">
                        {outfitStyle}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Viewport Bottom Action Bar */}
              <div className="p-4 bg-[#121620] border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={handleDeployToLife}
                  disabled={isDeploying}
                  className="flex-1 py-3 rounded-xl bg-[#E65A7F] hover:bg-[#D9496F] text-white font-extrabold text-xs transition shadow-lg shadow-[#E65A7F]/30 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Hayata Geçir & Stüdyoya Aktar</span>
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* METAVERSE & GAMING EXPORT ENGINE (Unreal Engine, Unity, Roblox)            */}
            {/* ========================================================================= */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#121620] via-black to-[#0c1017] border border-[#44BDBD]/40 backdrop-blur-xl space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#44BDBD] font-mono text-xs font-bold uppercase tracking-wider">
                  <Gamepad2 className="w-4 h-4" />
                  <span>METAVERSE & OYUN ENTEGRASYON KARTI</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#44BDBD]/20 text-[#44BDBD] font-mono border border-[#44BDBD]/30">
                  v1.8 Unreal/Unity
                </span>
              </div>

              <p className="text-xs text-white/80 leading-relaxed">
                Bu karakteri oyun motorunuza (Unreal Engine 5 Metahuman, Unity URP veya Roblox) doğrudan 3D Rigged model olarak bağlayın:
              </p>

              {/* Formats Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <div className="font-mono font-bold text-white">.GLB / .USDZ</div>
                  <div className="text-[9px] text-white/50">WebGL & Metaverse</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <div className="font-mono font-bold text-[#44BDBD]">.FBX Rigged</div>
                  <div className="text-[9px] text-white/50">Unreal & Unity Humanoid</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <div className="font-mono font-bold text-amber-300">52 ARKit</div>
                  <div className="text-[9px] text-white/50">Mimik & VTuber Yüz</div>
                </div>
              </div>

              {/* API Endpoint Copy Box */}
              <div className="p-3 rounded-xl bg-black/80 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                  <span>Oyun & API Çekim Endpoint'i:</span>
                  <button
                    onClick={handleCopyApiCode}
                    className="text-[#44BDBD] hover:text-white flex items-center gap-1 font-bold"
                  >
                    {isCopiedApi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopiedApi ? "Kopyalandı!" : "Kodu Kopyala"}</span>
                  </button>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 truncate select-all">
                  GET https://api.guzelai.art/v1/metaverse/characters/{charName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.glb
                </div>
              </div>

              {/* Download Mesh Package Button */}
              <button
                onClick={() => {
                  alert(`"${charName}" 3D Rigged Karakter Paketi (.GLB + 4K PBR Kaplamalar + ARKit 52 Blendshapes) indiriliyor.`);
                }}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/15 flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-[#44BDBD]" />
                <span>3D Karakter Paketini İndir (.GLB / .FBX)</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DEPLOYED SUCCESS MODAL / BANNER                                           */}
        {/* ========================================================================= */}
        {deployedSuccess && createdModel && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-[#E65A7F]/20 to-[#44BDBD]/20 border border-emerald-500/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-4">
              <img
                src={createdModel.avatar}
                alt={createdModel.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400 shrink-0"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-extrabold text-white text-base">
                    Tebrikler! "{createdModel.name}" Başarıyla Hayata Geçirildi!
                  </span>
                </div>
                <p className="text-xs text-white/80">
                  Modeliniz GuzelAI canlı manken kadrosuna ve 9:16 Dikey Klipler stüdyosuna eklendi.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {onNavigateToClips && (
                <button
                  onClick={onNavigateToClips}
                  className="px-4 py-2.5 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white font-bold text-xs transition shadow-md flex items-center gap-1.5"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Klip Çek</span>
                </button>
              )}
              {onNavigateToDressUp && (
                <button
                  onClick={onNavigateToDressUp}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/15"
                >
                  Giydirme Stüdyosu
                </button>
              )}
              <button
                onClick={() => setDeployedSuccess(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 text-xs transition"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
