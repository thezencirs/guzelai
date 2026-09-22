import React, { useState } from "react";
import { AIModel, ModelStyle } from "../types";
import { AI_MODELS } from "../data/models";
import {
  Sparkles,
  Sun,
  Moon,
  Heart,
  Droplets,
  Volume2,
  Square,
  MessageSquare,
  CheckCircle2,
  Wand2,
  Clapperboard,
  Loader2,
  Send,
  HelpCircle,
  Copy,
  Check,
  Flame,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { speakText, stopSpeaking } from "../utils/speech";

interface ModelRosterProps {
  onSelectModelForDressUp: (model: AIModel) => void;
  onSelectModelForVideo: (model: AIModel) => void;
  onOpenModelCreator?: () => void;
  soundEnabled: boolean;
}

export const ModelRoster: React.FC<ModelRosterProps> = ({
  onSelectModelForDressUp,
  onSelectModelForVideo,
  onOpenModelCreator,
  soundEnabled,
}) => {
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[0]);
  const [activeFilter, setActiveFilter] = useState<"all" | "collab" | ModelStyle>("all");
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Gemini consultation state
  const [userQuestion, setUserQuestion] = useState("");
  const [isAskingGemini, setIsAskingGemini] = useState(false);
  const [consultationResponse, setConsultationResponse] = useState<{
    advice?: string;
    morningRitual?: string[];
    nightRitual?: string[];
    makeupSecret?: string;
    voiceoverScript?: string;
  } | null>(null);

  const filteredModels = AI_MODELS.filter((m) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "collab") return m.isBrandCollabReady === true;
    return m.style === activeFilter;
  });

  const handlePlayVoice = (text: string) => {
    if (isPlayingVoice) {
      stopSpeaking();
      setIsPlayingVoice(false);
      return;
    }

    if (!soundEnabled) return;

    setIsPlayingVoice(true);
    speakText(text, {
      rate: 0.95,
      pitch: 1.05,
      voiceLang: "tr-TR",
      onEnd: () => setIsPlayingVoice(false),
    });
  };

  const handleAskAdvice = async (customPrompt?: string) => {
    const query = customPrompt || userQuestion;
    if (!query.trim()) return;

    setIsAskingGemini(true);
    setConsultationResponse(null);

    try {
      const res = await fetch("/api/gemini/beauty-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelName: selectedModel.name,
          styleArchetype: selectedModel.title,
          userQuestion: query,
          skinType: selectedModel.skinType,
          routineFocus: selectedModel.tags.join(", "),
        }),
      });

      if (!res.ok) throw new Error("Güzellik danışmanı yanıt veremedi.");
      const data = await res.json();
      setConsultationResponse(data);

      if (soundEnabled && data.voiceoverScript) {
        handlePlayVoice(data.voiceoverScript);
      }
    } catch (err: any) {
      console.error(err);
      setConsultationResponse({
        advice: `${selectedModel.name} diyor ki: Cildinizin doğal bariyerini korumak için sabahları bol su ve antioksidan serum kullanın!`,
        morningRitual: ["Buz masajı", "Nem toniği", "C Vitamini", "Güneş kremi"],
        nightRitual: ["Çift aşamalı temizlik", "Peptit serum", "Onarıcı nemlendirici"],
        makeupSecret: "Fondötene bir damla yüz yağı katarak doğal Glass Skin ışıltısı yakalayın.",
        voiceoverScript: `Güzellik aceleye gelmez tatlım. Her sabah kendine ayırdığın 5 dakika gününü aydınlatır!`,
      });
    } finally {
      setIsAskingGemini(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Intro Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-rose-950/40 to-neutral-900 border border-neutral-800 p-6 sm:p-8">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Yapay Zeka Mankenlik Ajansı & Kişiselleştirilmiş Güzellik Deneyimi
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Dijital Marka Yüzleri & İkonik Güzellik Rutinleri
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            İçerik üreticileri, reklamcılar ve markalar için gerçekçi, anime ve siber estetiklerde geliştirilen AI modelleri. Her modelin kendine has cilt sırları, podyum hazırlıkları ve seslendirmeleri keşfedilmeyi bekliyor.
          </p>
        </div>

        {/* Style Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-neutral-800/80">
          <span className="text-xs font-semibold text-neutral-400 mr-2">Model Stili:</span>
          {[
            { id: "all", label: "Tüm Modeller" },
            { id: "collab", label: "🔥 Marka İşbirlikleri & Glamour" },
            { id: "realistic", label: "Ultra-Gerçekçi (Realistic)" },
            { id: "editorial", label: "High Fashion & Lifestyle" },
            { id: "anime", label: "Anime & Pastel" },
            { id: "pixel", label: "Pixel & Siber 8-Bit" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === tab.id
                  ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-900/30"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}

          {onOpenModelCreator && (
            <button
              onClick={onOpenModelCreator}
              className="ml-auto px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white hover:opacity-95 transition shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>+ Model Üret (Metaverse / Oyun)</span>
              <span className="text-[10px] bg-black/40 px-1.5 rounded text-amber-200 font-mono">3D / GLB</span>
            </button>
          )}
        </div>
      </div>

      {/* Model Cards Horizontal Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {filteredModels.map((model) => {
          const isSelected = selectedModel.id === model.id;
          return (
            <div
              key={model.id}
              id={`model-card-${model.id}`}
              onClick={() => {
                setSelectedModel(model);
                setActiveGalleryIndex(0);
                setConsultationResponse(null);
                stopSpeaking();
                setIsPlayingVoice(false);
              }}
              className={`group cursor-pointer rounded-2xl p-2.5 transition-all border ${
                isSelected
                  ? "bg-neutral-800 border-rose-500 ring-2 ring-rose-500/40 shadow-xl shadow-rose-950/30"
                  : "bg-neutral-900/90 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850"
              }`}
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-2">
                <img
                  src={model.avatar}
                  alt={model.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-neutral-200 border border-white/10">
                    {model.style}
                  </span>
                  {model.isBrandCollabReady && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-rose-600 text-white shadow">
                      MARKA YÜZÜ
                    </span>
                  )}
                </div>
                <span className="absolute bottom-2 left-2 text-xs font-extrabold text-white truncate max-w-[90%]">
                  {model.name}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 truncate">{model.nationalityVibe}</p>
            </div>
          );
        })}
      </div>

      {/* Selected Model Deep Dive Spotlight */}
      <div className="bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Model Visual & Quick Stats */}
          <div className="lg:col-span-4 p-6 sm:p-8 bg-neutral-950/60 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg border border-neutral-800 mb-3 group">
                <img
                  src={
                    selectedModel.galleryImages && selectedModel.galleryImages[activeGalleryIndex]
                      ? selectedModel.galleryImages[activeGalleryIndex]
                      : selectedModel.fullBodyImage || selectedModel.avatar
                  }
                  alt={selectedModel.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                
                {/* Brand Collab Top Badge */}
                {selectedModel.isBrandCollabReady && (
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] font-black tracking-wider uppercase shadow-lg flex items-center gap-1">
                      <Flame className="w-3 h-3 text-yellow-300" />
                      MARKA İŞBİRLİĞİNE HAZIR
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-neutral-300 text-[10px] font-medium border border-white/10">
                      100% Telifsiz
                    </span>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-xs text-neutral-300 mb-1">
                    <span className="font-semibold uppercase tracking-wider text-rose-400">{selectedModel.style} MODEL</span>
                    <span>Boy: {selectedModel.height}</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white">{selectedModel.name}</h2>
                  <p className="text-xs text-neutral-300 mt-0.5">{selectedModel.title}</p>
                </div>
              </div>

              {/* Gallery Thumbnails if Available */}
              {selectedModel.galleryImages && selectedModel.galleryImages.length > 1 && (
                <div className="mb-4 space-y-1.5">
                  <div className="text-[11px] font-bold text-neutral-400 flex items-center justify-between">
                    <span>Çekim & Lifestyle Kareleri:</span>
                    <span className="text-[10px] text-rose-400 font-semibold">{activeGalleryIndex + 1} / {selectedModel.galleryImages.length}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedModel.galleryImages.map((imgUrl, gIdx) => (
                      <button
                        key={gIdx}
                        onClick={() => setActiveGalleryIndex(gIdx)}
                        className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition ${
                          activeGalleryIndex === gIdx
                            ? "border-rose-500 ring-2 ring-rose-500/40"
                            : "border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={imgUrl} alt={`Açı ${gIdx + 1}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] font-bold text-white text-center py-0.5">
                          {gIdx === 0 ? "Portre" : gIdx === 1 ? "Ferrari" : "Günbatımı"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Voice Sample Audio Card */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                    AI Ses & Güzellik Fısıltısı
                  </span>
                  <span className="text-[10px] text-neutral-400">Türkçe Seslendirme</span>
                </div>
                <p className="text-xs text-neutral-300 italic mb-3">"{selectedModel.voiceSampleText}"</p>
                <button
                  id="model-voice-sample-btn"
                  onClick={() => handlePlayVoice(selectedModel.voiceSampleText)}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isPlayingVoice
                      ? "bg-rose-600 text-white animate-pulse"
                      : "bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                  }`}
                >
                  {isPlayingVoice ? (
                    <>
                      <Square className="w-3.5 h-3.5" />
                      <span>Sesi Durdur</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>Sesi Dinle</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tags & Niches */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedModel.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 border border-neutral-700/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Studio Jump Actions */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-neutral-800">
              <button
                id="jump-to-dressup-btn"
                onClick={() => onSelectModelForDressUp(selectedModel)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-lg shadow-purple-950/50"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Giydir & Tasarla</span>
              </button>
              <button
                id="jump-to-video-btn"
                onClick={() => onSelectModelForVideo(selectedModel)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors shadow-lg shadow-amber-950/50"
              >
                <Clapperboard className="w-3.5 h-3.5" />
                <span>Reklamını Çek</span>
              </button>
            </div>
          </div>

          {/* Middle & Right: Beauty Routines & AI Consultation */}
          <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
            {/* Header description */}
            <div className="border-b border-neutral-800 pb-5">
              <h3 className="text-xl font-bold text-white mb-2">Güzellik Rutinleri & Cilt Sırları</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{selectedModel.bio}</p>
            </div>

            {/* Daily Rituals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Morning Ritual */}
              <div className="p-5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                <div className="flex items-center gap-2 mb-3 text-amber-400">
                  <Sun className="w-4 h-4" />
                  <h4 className="text-sm font-bold text-neutral-200">Sabah Işıltı Ritüeli</h4>
                </div>
                <ul className="space-y-2">
                  {selectedModel.beautyRoutine.morningSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Night Ritual */}
              <div className="p-5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                <div className="flex items-center gap-2 mb-3 text-indigo-400">
                  <Moon className="w-4 h-4" />
                  <h4 className="text-sm font-bold text-neutral-200">Gece Onarım & Detoks</h4>
                </div>
                <ul className="space-y-2">
                  {selectedModel.beautyRoutine.nightSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Signature Beauty Secret & Makeup Look */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/30 to-purple-950/30 border border-rose-900/30 space-y-3">
              <div className="flex items-center gap-2 text-rose-400">
                <Sparkles className="w-4 h-4" />
                <h4 className="text-sm font-bold text-white">İmza Güzellik Hilesi</h4>
              </div>
              <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
                {selectedModel.beautyRoutine.signatureSecret}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-rose-900/30 text-xs">
                <div>
                  <span className="text-neutral-400 font-semibold block mb-0.5">Favori Makyaj İmzası:</span>
                  <span className="text-neutral-200">{selectedModel.beautyRoutine.makeupLook}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-semibold block mb-0.5">İmza Parfüm Notaları:</span>
                  <span className="text-neutral-200">{selectedModel.beautyRoutine.fragranceNotes}</span>
                </div>
              </div>
            </div>

            {/* Lüks Marka İşbirlikleri & UGC Reels Formülü (Supercar & Luxury Brand Collab) */}
            {selectedModel.isBrandCollabReady && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-neutral-900 to-rose-950/40 border border-amber-500/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                      <Flame className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Lüks Marka İşbirlikleri & UGC Reels Vitrini</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500 text-black">
                          PREMIUM
                        </span>
                      </h4>
                      <p className="text-xs text-amber-200/70">
                        Süper otomobil, resort moda ve yüksek dönüşümlü marka sponsorlukları için hazır sentetik identity-lock.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1 font-semibold text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      100% Ticari Telifsiz
                    </span>
                  </div>
                </div>

                {/* Supercar Prompt Snippet Box */}
                {selectedModel.exactPromptSnippet && (
                  <div className="p-3.5 rounded-xl bg-black/70 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-neutral-300 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Orijinal UGC Çekim Prompt Formülü (Ferrari 360 & Kırmızı Mini Elbise)
                      </span>
                      <button
                        onClick={() => {
                          if (selectedModel.exactPromptSnippet) {
                            navigator.clipboard.writeText(selectedModel.exactPromptSnippet);
                            setCopiedPrompt(true);
                            setTimeout(() => setCopiedPrompt(false), 2500);
                          }
                        }}
                        className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center gap-1.5 transition"
                      >
                        {copiedPrompt ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Kopyalandı!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-neutral-300" />
                            <span>Prompt'u Kopyala</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-neutral-300 font-mono bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 leading-relaxed break-words selection:bg-rose-600 selection:text-white">
                      {selectedModel.exactPromptSnippet}
                    </p>
                  </div>
                )}

                {/* Brand Collab Quick Launch Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => onSelectModelForVideo(selectedModel)}
                    className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-900/40"
                  >
                    <Clapperboard className="w-4 h-4 text-black" />
                    <span>Bu Model ile 15s Dikey Video Reklamı Çek</span>
                  </button>

                  <button
                    onClick={() => onSelectModelForDressUp(selectedModel)}
                    className="py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition border border-neutral-700"
                  >
                    <Wand2 className="w-4 h-4 text-rose-400" />
                    <span>Marka Kıyafetini / Ürününü Giydir (Try-On)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Interactive Gemini Beauty Consultation */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-400">
                  <MessageSquare className="w-4 h-4" />
                  <h4 className="text-sm font-bold text-white">
                    {selectedModel.name} ile Kişiselleştirilmiş Güzellik Sohbeti
                  </h4>
                </div>
                <span className="text-[10px] font-semibold text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  Gemini AI Powered
                </span>
              </div>

              <p className="text-xs text-neutral-400">
                Cilt endişeni, podyum hazırlıklarını veya çekim günleri makyaj sırlarımızı sor; modelin tarzına özel yanıt ve seslendirme al.
              </p>

              {/* Preset quick question pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Podyum öncesi sabah şişkinliğini nasıl giderirsin?",
                  "Mat rujun dudakları kurutmaması için taktiğin ne?",
                  "Koşudan sonra cildi sivilcesiz tutmanın sırrı?",
                  "Glass Skin parlaklığı için hangi adımları önerirsin?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setUserQuestion(q);
                      handleAskAdvice(q);
                    }}
                    className="text-[11px] px-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 hover:border-neutral-700 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input field */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAskAdvice()}
                  placeholder={`${selectedModel.name}'e cildin veya makyajın hakkında bir soru sor...`}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                />
                <button
                  id="ask-gemini-advice-btn"
                  onClick={() => handleAskAdvice()}
                  disabled={isAskingGemini || !userQuestion.trim()}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {isAskingGemini ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Danış</span>
                    </>
                  )}
                </button>
              </div>

              {/* Consultation Response Card */}
              {consultationResponse && (
                <div className="p-4 rounded-xl bg-neutral-900/90 border border-rose-500/30 space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {selectedModel.name}'in Sana Özel Tavsiyesi:
                    </span>
                    {consultationResponse.voiceoverScript && (
                      <button
                        onClick={() => handlePlayVoice(consultationResponse.voiceoverScript!)}
                        className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
                      >
                        <Volume2 className="w-3 h-3" />
                        Sesli Dinle
                      </button>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    {consultationResponse.advice}
                  </p>

                  {consultationResponse.makeupSecret && (
                    <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
                      <strong className="text-rose-400">Makyaj Hilesi: </strong>
                      {consultationResponse.makeupSecret}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
