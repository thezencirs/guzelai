import React, { useState, useRef } from "react";
import { TranslationSchema } from "../i18n/translations";
import { VERTICAL_CLIPS, VerticalClipAd } from "../data/verticalClips";
import { AI_MODELS } from "../data/models";
import { AIModel } from "../types";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
  Download,
  Share2,
  Sliders,
  Smartphone,
  Video,
  Layers,
  Music,
  Check,
  RotateCcw,
  Camera,
} from "lucide-react";

interface VerticalClipsSectionProps {
  t: TranslationSchema;
  onOpenFullStudio: (tab?: string) => void;
  onSendToVideoStudio?: (startImg: string, endImg: string, promptText: string) => void;
}

export const VerticalClipsSection: React.FC<VerticalClipsSectionProps> = ({
  t,
  onOpenFullStudio,
  onSendToVideoStudio,
}) => {
  // Showcase State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePlayingClipId, setActivePlayingClipId] = useState<string>(VERTICAL_CLIPS[0].id);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Instant Custom Brand Ad Film Generator State
  const [generatorStep, setGeneratorStep] = useState<number>(1); // 1: Model & Look, 2: Hook & Style, 3: Completed Film
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[0]);
  const [selectedLookImage, setSelectedLookImage] = useState<string>(
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80"
  );
  const [isLookApproved, setIsLookApproved] = useState<boolean>(false);
  const [brandName, setBrandName] = useState<string>("myBrand Paris");
  const [hookHeadline, setHookHeadline] = useState<string>("Bu sonbaharın en çok konuşulan parçası yayında!");
  const [ctaButtonText, setCtaButtonText] = useState<string>("Koleksiyonu Keşfet");
  const [selectedMotion, setSelectedMotion] = useState<string>("Runway Steadicam + 360° Dönüş");
  const [selectedMusic, setSelectedMusic] = useState<string>("Luxury Deep House Beat (124 BPM)");
  const [isRenderingFilm, setIsRenderingFilm] = useState<boolean>(false);
  const [isFilmCompleted, setIsFilmCompleted] = useState<boolean>(false);
  const [isFilmPlaying, setIsFilmPlaying] = useState<boolean>(true);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string>("");
  const [renderError, setRenderError] = useState<string>("");
  const [renderProgress, setRenderProgress] = useState<string>("");

  const filteredClips = VERTICAL_CLIPS.filter((clip) => {
    if (selectedCategory === "all") return true;
    return clip.category === selectedCategory;
  });

  const activeClip = VERTICAL_CLIPS.find((c) => c.id === activePlayingClipId) || VERTICAL_CLIPS[0];

  // Preset ready-to-use look options for quick approval
  const lookPresetOptions = [
    {
      id: "look-leather",
      title: "Kahve Deri Büstiyer & Çizme",
      category: "Moda & Try-On",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
      defaultHook: "Bu sonbaharın en çok konuşulan parçası yayında!",
      defaultCta: "Koleksiyonu Keşfet",
    },
    {
      id: "look-kbeauty",
      title: "Cam Ten Aydınlatıcı Serum",
      category: "Kozmetik & Glow",
      img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
      defaultHook: "Işıltılı cam tenin 3 saniyelik sırrı burada.",
      defaultCta: "Işıltıyı Yakala (%25 İndirim)",
    },
    {
      id: "look-sneaker",
      title: "AeroSprint Neon Runner",
      category: "Sneaker & Sokak",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      defaultHook: "Yer çekimini unut. Adımlarını serbest bırak.",
      defaultCta: "Hemen Sipariş Ver",
    },
    {
      id: "look-jewelry",
      title: "Zümrüt & Pırlanta Damla Kolye",
      category: "Lüks Mücevher",
      img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
      defaultHook: "Işığın zarafetle dans ettiği anı keşfet.",
      defaultCta: "Özel Tasarımı İncele",
    },
  ];

  const handleApproveLook = () => {
    setIsLookApproved(true);
    // Smooth transition to next configuration step
    setGeneratorStep(2);
  };

  const handleFinalizeCommercialFilm = async () => {
    setIsRenderingFilm(true);
    setRenderError("");
    setGeneratedVideoUrl("");
    setRenderProgress("Veo 3.1 işi hazırlanıyor...");
    try {
      const prompt = [
        "Create a premium 9:16 vertical social media commercial.",
        `Brand: ${brandName}.`,
        `The SAME synthetic adult model identity must be preserved: ${selectedModel.name}.`,
        `Campaign hook: ${hookHeadline}.`,
        `CTA: ${ctaButtonText}.`,
        `Camera motion: ${selectedMotion}.`,
        `Music / audio mood: ${selectedMusic}.`,
        "Preserve the reference person's face, hair, skin tone, age appearance and body identity. Premium corporate advertising, photorealistic fashion cinematography, clean brand-safe composition, no identity drift, no accidental text mutation. Native sound may be used.",
      ].join(" ");

      const start = await fetch("/api/videos/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          prompt,
          referenceImage:
            selectedModel.fullBodyImage || selectedModel.avatar || selectedLookImage,
          aspectRatio: "9:16",
          resolution: "1080p",
          durationSeconds: 8,
        }),
      });
      const job = await start.json();
      if (!start.ok) throw new Error(job.error || "Veo işi başlatılamadı.");
      if (!job.id) throw new Error("Veo iş kimliği alınamadı.");

      for (let attempt = 0; attempt < 90; attempt += 1) {
        setRenderProgress(`Veo render devam ediyor • kontrol ${attempt + 1}`);
        await new Promise((resolve) => setTimeout(resolve, 8000));
        const statusRes = await fetch(
          `/api/videos/status?id=${encodeURIComponent(job.id)}`
        );
        const status = await statusRes.json();
        if (!statusRes.ok) throw new Error(status.error || "Video durumu alınamadı.");

        if (status.status === "completed") {
          if (!status.url) {
            throw new Error("Video tamamlandı ancak teslim URL'si alınamadı.");
          }
          setGeneratedVideoUrl(status.url);
          setIsFilmCompleted(true);
          setGeneratorStep(3);
          setRenderProgress("Veo 3.1 reklam filmi hazır.");
          return;
        }

        if (status.status === "failed") {
          throw new Error(status.error?.message || status.error || "Veo üretimi başarısız.");
        }
      }

      throw new Error("Video üretimi beklenenden uzun sürdü. Video Stüdyosundan tekrar kontrol edin.");
    } catch (error: any) {
      setRenderError(error?.message || "Reklam filmi oluşturulamadı.");
    } finally {
      setIsRenderingFilm(false);
    }
  };

  const handleResetGenerator = () => {
    setIsLookApproved(false);
    setIsFilmCompleted(false);
    setGeneratedVideoUrl("");
    setRenderError("");
    setRenderProgress("");
    setGeneratorStep(1);
  };

  return (
    <section
      id="clips-section"
      className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#171717]/8 relative overflow-hidden"
    >
      {/* Organic ambient light points */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#E65A7F]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-[#44BDBD]/6 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 max-w-4xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E65A7F]/10 border border-[#E65A7F]/20 text-[#E65A7F] text-xs font-extrabold tracking-wider uppercase">
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16 DİKEY REKLAM FİLMLERİ & CLIPS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight">
              Reels & TikTok İçin Yüksek Dönüşümlü Dikey Klipler
            </h2>
            <p className="text-base text-[#171717]/70 font-normal leading-relaxed">
              Müşterileriniz için hazır 9:16 dikey video reklam örneklerini inceleyin; markanız için modeli ve görseli okeyledikten sonra komple reklam filminizi saniyeler içinde tamamlayın.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenFullStudio("your_videos")}
              className="px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#262626] text-white text-xs sm:text-sm font-bold tracking-tight transition flex items-center gap-2 shadow-xs"
            >
              <Video className="w-4 h-4 text-[#44BDBD]" />
              <span>Video Stüdyosunu Aç</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 1. MÜŞTERİ İÇİN ÖRNEK DİKEY VİDEO KLİPLERİ (SHOWCASE)    */}
        {/* ======================================================== */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#171717]/8 pb-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#FB5D2E]">
                ÖRNEK REKLAM FİLMLERİ
              </span>
              <h3 className="text-xl font-bold text-[#171717]">
                Hazır Dikey Kurgu Örneklerini İzleyin
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: "all", label: "Tümü (9:16)" },
                { id: "fashion", label: "👗 Moda & Try-On" },
                { id: "beauty", label: "💄 Kozmetik & Glow" },
                { id: "sneakers", label: "👟 Sneaker & Spor" },
                { id: "jewelry", label: "💎 Lüks Mücevher" },
                { id: "ugc", label: "🎙️ UGC & Podcast" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap border ${
                    selectedCategory === cat.id
                      ? "bg-[#171717] text-white border-[#171717]"
                      : "bg-white text-[#171717]/70 border-[#171717]/10 hover:bg-[#FAF8F5]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical Clips Grid: 9:16 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredClips.map((clip) => {
              const isSelected = activePlayingClipId === clip.id;
              return (
                <div
                  key={clip.id}
                  onClick={() => setActivePlayingClipId(clip.id)}
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? "border-[#E65A7F] shadow-xl ring-2 ring-[#E65A7F]/40 scale-[1.02]"
                      : "border-[#171717]/10 hover:border-[#171717]/30 shadow-xs hover:shadow-lg"
                  } bg-[#171717] flex flex-col aspect-[9/16]`}
                >
                  {/* Poster / Video Background */}
                  <img
                    src={clip.posterImage}
                    alt={clip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Dark Vignette Overlay for TikTok/Reels readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />

                  {/* Top Header inside 9:16 Frame: Brand + ROAS Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <img
                        src={clip.modelAvatar}
                        alt={clip.modelName}
                        className="w-7 h-7 rounded-full border border-white/40 object-cover"
                      />
                      <div>
                        <div className="text-[11px] font-bold text-white leading-tight">
                          {clip.brandName}
                        </div>
                        <div className="text-[9px] text-white/70 font-semibold">
                          AI: {clip.modelName}
                        </div>
                      </div>
                    </div>

                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-extrabold text-white shadow-xs"
                      style={{ backgroundColor: clip.colorHex }}
                    >
                      {clip.roasStat}
                    </span>
                  </div>

                  {/* Center Play Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#E65A7F] text-white scale-110 shadow-lg shadow-[#E65A7F]/50"
                          : "bg-white/20 backdrop-blur text-white group-hover:scale-110"
                      }`}
                    >
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Content: Hook Headline, Audio & CTA Button */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 space-y-2">
                    {/* Category pill */}
                    <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider text-white/80 bg-white/10 backdrop-blur px-2 py-0.5 rounded-md">
                      {clip.categoryLabel}
                    </span>

                    {/* Hook Headline */}
                    <p className="text-xs sm:text-sm font-bold text-white leading-snug drop-shadow-md">
                      "{clip.hookText}"
                    </p>

                    {/* Audio track tag */}
                    <div className="flex items-center gap-1.5 text-[9px] text-white/70">
                      <Music className="w-3 h-3 text-[#44BDBD]" />
                      <span className="truncate">{clip.musicTrack}</span>
                    </div>

                    {/* CTA Button simulating TikTok/Instagram shopping bar */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Load this clip preset into generator
                        setSelectedLookImage(clip.posterImage);
                        setHookHeadline(clip.hookText);
                        setCtaButtonText(clip.ctaText);
                        const matched = AI_MODELS.find((m) => m.id === clip.modelId) || AI_MODELS[0];
                        setSelectedModel(matched);
                        setIsLookApproved(true);
                        setGeneratorStep(2);
                        const el = document.getElementById("instant-ad-generator-box");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full py-2 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-1.5 shadow-md transition"
                      style={{ backgroundColor: clip.colorHex }}
                    >
                      <span>Bu Kurguyla Reklam Yap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ====================================================================== */}
        {/* 2. ETKİLEŞİMLİ DİKEY REKLAM FİLMİ TAMAMLAYICI (MODELİ OKEYLE -> TAMAMLA) */}
        {/* ====================================================================== */}
        <div
          id="instant-ad-generator-box"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#171717]/10 shadow-xl shadow-black/3 space-y-8"
        >
          {/* Header of Generator */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#171717]/8 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#E65A7F] uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>HIZLI REKLAM FİLMİ OLUŞTURUCU</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                Modeli ve Görseli Okeyleyin &bull; Reklam Filminiz Tamamlansın
              </h3>
              <p className="text-xs sm:text-sm text-[#171717]/70">
                Markanız için modeli seçin, kıyafet veya ürün görselini onaylayın; yapay zeka dikey reklam filminizi tüm açılar, müzik ve sloganla eksiksiz hazırlasın.
              </p>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center gap-2 shrink-0">
              {[
                { step: 1, label: "1. Model & Görsel" },
                { step: 2, label: "2. Slogan & Kurgu" },
                { step: 3, label: "3. Reklam Filmi" },
              ].map((s) => (
                <div
                  key={s.step}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                    generatorStep === s.step
                      ? "bg-[#E65A7F] text-white"
                      : generatorStep > s.step
                      ? "bg-[#41631E] text-white"
                      : "bg-[#FAF8F5] text-[#171717]/50 border border-[#171717]/10"
                  }`}
                >
                  {generatorStep > s.step ? <Check className="w-3 h-3" /> : null}
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: MODEL & GÖRÜNÜMÜ OKEYLE */}
          {generatorStep === 1 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Model Selector & Look Presets (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Select Model */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#171717]/70">
                      1. Markanız İçin AI Modelini Seçin
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {AI_MODELS.slice(0, 4).map((model) => {
                        const isSelected = selectedModel.id === model.id;
                        return (
                          <button
                            key={model.id}
                            type="button"
                            onClick={() => setSelectedModel(model)}
                            className={`p-2.5 rounded-2xl border text-left transition flex items-center gap-2.5 ${
                              isSelected
                                ? "bg-[#171717] text-white border-[#171717] shadow-md"
                                : "bg-[#FAF8F5] text-[#171717] border-[#171717]/10 hover:border-[#171717]/30"
                            }`}
                          >
                            <img
                              src={model.avatar}
                              alt={model.name}
                              className="w-9 h-9 rounded-xl object-cover"
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-bold truncate">{model.name}</div>
                              <div className="text-[10px] opacity-70 truncate">{model.title}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Select Look / Product Image */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#171717]/70">
                      2. Giydirilecek Kıyafet / Ürün Görselini Seçin
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {lookPresetOptions.map((look) => {
                        const isSelected = selectedLookImage === look.img;
                        return (
                          <button
                            key={look.id}
                            type="button"
                            onClick={() => {
                              setSelectedLookImage(look.img);
                              setHookHeadline(look.defaultHook);
                              setCtaButtonText(look.defaultCta);
                            }}
                            className={`rounded-2xl overflow-hidden border text-left transition relative aspect-[3/4] ${
                              isSelected
                                ? "border-[#E65A7F] ring-2 ring-[#E65A7F]/50 shadow-md"
                                : "border-[#171717]/10 hover:border-[#171717]/30"
                            }`}
                          >
                            <img src={look.img} alt={look.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 text-white">
                              <div className="text-[10px] font-bold leading-tight">{look.title}</div>
                              <div className="text-[8px] text-white/70">{look.category}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Approval Action Bar */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#171717]/8 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#171717]">
                        Seçilen Model: <span className="text-[#E65A7F]">{selectedModel.name}</span>
                      </span>
                      <span className="text-[#41631E] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> %100 Telifsiz Ticari Güvence
                      </span>
                    </div>

                    {/* BIG OKEY BUTTON */}
                    <button
                      id="btn-approve-model-look"
                      type="button"
                      onClick={handleApproveLook}
                      className="w-full py-4 rounded-2xl bg-[#E65A7F] hover:bg-[#D9496F] text-white font-extrabold text-sm sm:text-base tracking-tight transition shadow-lg shadow-[#E65A7F]/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                    >
                      <Check className="w-5 h-5 stroke-[3]" />
                      <span>Modeli ve Görseli Markam İçin ONAYLA (Okeyle) &rarr;</span>
                    </button>
                  </div>
                </div>

                {/* Right: Live 9:16 Preview of Model + Look (5 cols) */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-[280px] aspect-[9/16] rounded-[32px] p-2 bg-[#171717] shadow-2xl border-4 border-[#171717] relative flex flex-col justify-between overflow-hidden">
                    {/* Phone Notch */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30" />

                    {/* Image */}
                    <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                      <img
                        src={selectedLookImage}
                        alt="Selected Look"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                      <div className="absolute top-7 left-3 text-white">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#E65A7F]">
                          Canlı Model Eşleşmesi
                        </span>
                        <div className="text-xs font-extrabold mt-1">{selectedModel.name}</div>
                      </div>

                      <div className="absolute bottom-4 left-3 right-3 text-white space-y-1.5 text-center">
                        <div className="text-[11px] font-bold leading-tight">
                          "{hookHeadline}"
                        </div>
                        <div className="py-1.5 px-3 rounded-xl bg-white/20 backdrop-blur text-[10px] font-bold text-white">
                          Onay Bekliyor &bull; 9:16 Dikey Reklam
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SLOGAN, HOOK & REKLAM AYARLARI */}
          {generatorStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  {/* Brand Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#171717]">
                      Marka Adınız &bull; Brand Tag
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="Örn: VOGUE NOIR Paris"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#171717]/10 text-xs sm:text-sm font-semibold text-[#171717] focus:outline-hidden focus:border-[#E65A7F]"
                    />
                  </div>

                  {/* Viral Hook / Slogan */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#171717]">
                      Reklam Sloganı & Kancası (Hook Headline)
                    </label>
                    <input
                      type="text"
                      value={hookHeadline}
                      onChange={(e) => setHookHeadline(e.target.value)}
                      placeholder="Örn: Bu sonbaharın en çok konuşulan parçası yayında!"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#171717]/10 text-xs sm:text-sm font-semibold text-[#171717] focus:outline-hidden focus:border-[#E65A7F]"
                    />
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        "Sonbahar İndirimi Başladı!",
                        "Cam Ten Işıltısının 3 Saniyelik Sırrı",
                        "Sokakta Tüm Bakışlar Üzerinde",
                        "Tükenmeden Şimdi İncele",
                      ].map((preset, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setHookHeadline(preset)}
                          className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#FAF8F5] text-[#171717]/70 border border-[#171717]/10 hover:border-[#E65A7F]"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button Text */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#171717]">
                        Eylem Butonu (CTA Button)
                      </label>
                      <input
                        type="text"
                        value={ctaButtonText}
                        onChange={(e) => setCtaButtonText(e.target.value)}
                        placeholder="Örn: Koleksiyonu Keşfet"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#171717]/10 text-xs text-[#171717] focus:outline-hidden focus:border-[#E65A7F]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#171717]">
                        Kamera Hareketi (9:16 Motion)
                      </label>
                      <select
                        value={selectedMotion}
                        onChange={(e) => setSelectedMotion(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#171717]/10 text-xs font-semibold text-[#171717] focus:outline-hidden focus:border-[#E65A7F]"
                      >
                        <option value="Runway Steadicam + 360° Dönüş">Runway Steadicam + 360° Dönüş</option>
                        <option value="Dinamik Düşük Açı Koşu">Dinamik Düşük Açı Koşu & Takip</option>
                        <option value="Makro Yüz Zoom & Işık Kırılması">Makro Yüz Zoom & Işık Kırılması</option>
                        <option value="Sinematik Yavaş Çekim (Slow-Mo)">Sinematik Yavaş Çekim (Slow-Mo)</option>
                      </select>
                    </div>
                  </div>

                  {/* Soundtrack */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#171717]">
                      Müzik & Ritim (Soundtrack)
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        "Luxury Deep House (124 BPM)",
                        "High-Energy Synthwave",
                        "Lo-Fi Chill & Acoustic",
                      ].map((m, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedMusic(m)}
                          className={`p-2 rounded-xl text-center font-bold text-[10px] transition border ${
                            selectedMusic === m
                              ? "bg-[#171717] text-white border-[#171717]"
                              : "bg-[#FAF8F5] text-[#171717]/70 border-[#171717]/10 hover:border-[#171717]/30"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setGeneratorStep(1)}
                      className="px-5 py-3 rounded-full border border-[#171717]/15 text-xs font-bold text-[#171717] hover:bg-[#FAF8F5] transition"
                    >
                      &larr; Geri
                    </button>

                    <button
                      id="btn-finalize-commercial-film"
                      type="button"
                      onClick={handleFinalizeCommercialFilm}
                      disabled={isRenderingFilm}
                      className="flex-1 py-3.5 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white font-extrabold text-sm tracking-tight transition shadow-lg shadow-[#E65A7F]/30 flex items-center justify-center gap-2"
                    >
                      {isRenderingFilm ? (
                        <>
                          <Sparkles className="w-4 h-4 animate-spin" />
                          <span>Dikey Reklam Filmi Oluşturuluyor...</span>
                        </>
                      ) : (
                        <>
                          <Video className="w-4 h-4" />
                          <span>🚀 Reklam Filmini Tamamla & Oluştur</span>
                        </>
                      )}
                    </button>
                    {(renderProgress || renderError) && (
                      <div className={`text-[11px] p-3 rounded-xl border ${
                        renderError
                          ? "bg-rose-50 border-rose-200 text-rose-700"
                          : "bg-[#44BDBD]/10 border-[#44BDBD]/20 text-[#206f6f]"
                      }`}>
                        {renderError || renderProgress}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Live Dynamic 9:16 Mockup */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-[280px] aspect-[9/16] rounded-[32px] p-2 bg-[#171717] shadow-2xl border-4 border-[#171717] relative flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30" />

                    <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                      <img
                        src={selectedLookImage}
                        alt="Look"
                        className="w-full h-full object-cover animate-pulse duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50" />

                      {/* Top Brand Banner */}
                      <div className="absolute top-8 left-3 right-3 flex items-center justify-between text-white">
                        <div className="text-[11px] font-extrabold tracking-wide uppercase">
                          {brandName}
                        </div>
                        <span className="text-[8px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded">
                          LIVE REC
                        </span>
                      </div>

                      {/* Bottom Ad Film Mockup */}
                      <div className="absolute bottom-4 left-3 right-3 text-white space-y-2">
                        <div className="text-xs font-bold leading-tight">
                          "{hookHeadline}"
                        </div>
                        <div className="text-[9px] text-white/70 flex items-center gap-1">
                          <Music className="w-3 h-3 text-[#44BDBD]" />
                          <span>{selectedMusic}</span>
                        </div>
                        <button
                          type="button"
                          className="w-full py-2 rounded-xl bg-[#E65A7F] text-white text-xs font-bold shadow"
                        >
                          {ctaButtonText} &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: REKLAM FİLMİ TAMAMLANDI! (FINAL COMPLETED REELS/TIKTOK FILM) */}
          {generatorStep === 3 && isFilmCompleted && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="p-4 rounded-2xl bg-[#41631E]/10 border border-[#41631E]/20 text-[#41631E] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#41631E] text-white flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-[#171717]">
                      Reklam Filminiz Başarıyla Tamamlandı!
                    </div>
                    <div className="text-xs text-[#171717]/70">
                      {brandName} &bull; Model: {selectedModel.name} &bull; 9:16 Dikey Ticari Format (1080x1920)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetGenerator}
                    className="px-3 py-1.5 rounded-full bg-white border border-[#171717]/10 text-xs font-bold text-[#171717] hover:bg-[#FAF8F5] transition flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Yeni Reklam Başlat</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: The Playable 9:16 Vertical Smartphone Commercial Player */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-[320px] aspect-[9/16] rounded-[36px] p-2.5 bg-[#171717] shadow-2xl border-4 border-[#262626] relative flex flex-col justify-between overflow-hidden group">
                    {/* Top Phone Notch */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-40" />

                    {/* Video / Animated Simulation Canvas */}
                    <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-black">
                      {generatedVideoUrl ? (
                        <video
                          src={generatedVideoUrl}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          controls
                        />
                      ) : (
                        <img
                          src={selectedLookImage}
                          alt="Completed Ad Film"
                          className={`w-full h-full object-cover transition-transform duration-700 ${
                            isFilmPlaying ? "scale-105" : "scale-100"
                          }`}
                        />
                      )}

                      {/* Cinematic Lighting & Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />

                      {/* Top Header: Brand Name + AI Model Badge */}
                      <div className="absolute top-8 left-3.5 right-3.5 flex items-center justify-between z-20">
                        <div className="flex items-center gap-2">
                          <img
                            src={selectedModel.avatar}
                            alt={selectedModel.name}
                            className="w-7 h-7 rounded-full border border-white/40 object-cover"
                          />
                          <div>
                            <div className="text-xs font-extrabold text-white leading-tight">
                              {brandName}
                            </div>
                            <div className="text-[9px] text-[#44BDBD] font-bold">
                              AI Model: {selectedModel.name}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-1.5 rounded-full bg-black/60 backdrop-blur text-white hover:bg-black"
                          >
                            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          </button>
                          <span className="px-2 py-0.5 rounded-md bg-[#E65A7F] text-white text-[9px] font-extrabold">
                            9:16 HD
                          </span>
                        </div>
                      </div>

                      {/* Play/Pause overlay is only used by the fallback preview. */}
                      {!generatedVideoUrl && (
                        <button
                          onClick={() => setIsFilmPlaying(!isFilmPlaying)}
                          className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:scale-110"
                        >
                          {isFilmPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                        </button>
                      )}

                      {/* Bottom Viral Ad Layer: Kinetic Hook, Sound, and CTA */}
                      <div className="absolute bottom-4 left-3.5 right-3.5 z-20 space-y-2.5">
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-white/20 backdrop-blur text-[9px] font-extrabold uppercase text-white">
                            SPONSORED REELS / TIKTOK
                          </span>
                          <h4 className="text-sm font-extrabold text-white leading-snug drop-shadow-md">
                            "{hookHeadline}"
                          </h4>
                        </div>

                        {/* Music wave simulation */}
                        <div className="flex items-center gap-2 text-[10px] text-white/80">
                          <Music className="w-3.5 h-3.5 text-[#44BDBD]" />
                          <span className="truncate">{selectedMusic}</span>
                          <div className="flex items-center gap-0.5 ml-auto">
                            <span className="w-1 h-3 bg-[#44BDBD] rounded-full animate-bounce" />
                            <span className="w-1 h-4 bg-[#E65A7F] rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1 h-2 bg-[#FBC056] rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button
                          type="button"
                          className="w-full py-2.5 rounded-xl bg-[#E65A7F] hover:bg-[#D9496F] text-white text-xs font-extrabold tracking-tight shadow-lg transition flex items-center justify-center gap-1.5"
                        >
                          <span>{ctaButtonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Export, Sharing & Studio Tools (6 cols) */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#41631E]">
                      REKLAM FİLMİ HAZIR
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                      Dikey Reklamınızı İndirin & Kanallarda Yayınlayın
                    </h3>
                    <p className="text-sm text-[#171717]/75 leading-relaxed">
                      Filminiz TikTok, Instagram Reels ve YouTube Shorts formatlarına uygun olarak 9:16 (1080x1920) çözünürlükte, telifsiz sentetik manken ile derlendi.
                    </p>
                  </div>

                  {/* Specifications Card */}
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#171717]/8 space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#171717]/6">
                      <span className="text-[#171717]/60">Format:</span>
                      <span className="font-bold text-[#171717]">MP4 / H.264 (9:16 Vertical)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#171717]/6">
                      <span className="text-[#171717]/60">Çözünürlük:</span>
                      <span className="font-bold text-[#171717]">1080 x 1920 (FHD 60 FPS)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#171717]/6">
                      <span className="text-[#171717]/60">Kamera Kurgusu:</span>
                      <span className="font-bold text-[#171717]">{selectedMotion}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#171717]/6">
                      <span className="text-[#171717]/60">Ses & Müzik:</span>
                      <span className="font-bold text-[#171717]">{selectedMusic}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#171717]/60">Ticari Lisans:</span>
                      <span className="font-bold text-[#41631E] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> %100 Telifsiz Ticari Hak
                      </span>
                    </div>
                  </div>

                  {/* Export Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        if (generatedVideoUrl) {
                          window.open(generatedVideoUrl, "_blank", "noopener,noreferrer");
                        } else {
                          alert("Henüz gerçek video URL'si oluşmadı.");
                        }
                      }}
                      className="w-full py-3.5 rounded-full bg-[#171717] hover:bg-[#262626] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-md"
                    >
                      <Download className="w-4 h-4 text-[#FBC056]" />
                      <span>9:16 Dikey Reklam Filmini İndir (MP4)</span>
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          if (onSendToVideoStudio) {
                            onSendToVideoStudio(
                              selectedModel.avatar,
                              selectedLookImage,
                              `${brandName} vertical commercial: ${hookHeadline}`
                            );
                          } else {
                            onOpenFullStudio("your_videos");
                          }
                        }}
                        className="py-3 rounded-full border border-[#171717]/15 hover:border-[#171717] text-[#171717] text-xs font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <Sliders className="w-3.5 h-3.5 text-[#E65A7F]" />
                        <span>Stüdyoda İleri Düzey Kurgula</span>
                      </button>

                      <button
                        onClick={() => {
                          alert("TikTok ve Instagram Reels kampanya formatı linki kopyalandı!");
                        }}
                        className="py-3 rounded-full bg-[#E65A7F]/10 hover:bg-[#E65A7F]/20 text-[#E65A7F] text-xs font-bold flex items-center justify-center gap-1.5 transition border border-[#E65A7F]/20"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>TikTok & Reels Paylaş</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
