import React, { useState, useEffect, useRef } from "react";
import {
  AIModel,
  ProductCategory,
  ActionType,
  CameraAngle,
  LightingPreset,
  ProductPreset,
} from "../types";
import { AI_MODELS, PRODUCT_PRESETS, TEXTURE_OPTIONS, WARDROBE_ITEMS } from "../data/models";
import {
  Clapperboard,
  Play,
  Pause,
  RotateCw,
  Camera,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles,
  ShoppingBag,
  Sliders,
  Sun,
  Layers,
  Copy,
  CheckCircle,
  Film,
  Music,
  Download,
  Loader2,
  Activity,
} from "lucide-react";
import {
  speakText,
  stopSpeaking,
  playCameraShutterSound,
  playRunwayBeat,
  playSpraySound,
} from "../utils/speech";

interface VideoDirectorStudioProps {
  currentModel: AIModel;
  onModelChange: (model: AIModel) => void;
  initialConfig?: any;
  soundEnabled: boolean;
}

export const VideoDirectorStudio: React.FC<VideoDirectorStudioProps> = ({
  currentModel,
  onModelChange,
  initialConfig,
  soundEnabled,
}) => {
  // Product category being advertised
  const [selectedProduct, setSelectedProduct] = useState<ProductPreset>(PRODUCT_PRESETS[0]);

  // Video Action: Catwalk, Running, Posing, Lounge, Closeup
  const [currentAction, setCurrentAction] = useState<ActionType>("running");

  // Camera settings
  const [zoomLevel, setZoomLevel] = useState<number>(1.2);
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>("low_angle");
  const [lighting, setLighting] = useState<LightingPreset>("natural_daylight");
  const [showGridOverlay, setShowGridOverlay] = useState<boolean>(true);

  // Video Player simulation states
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [flashEffect, setFlashEffect] = useState<boolean>(false);
  const [isSpeakingVoiceover, setIsSpeakingVoiceover] = useState<boolean>(false);

  // Audio Analysis from Gemini
  const [isAnalyzingAudio, setIsAnalyzingAudio] = useState<boolean>(false);
  const [audioAnalysis, setAudioAnalysis] = useState<{
    audioMood: string;
    optimalBpm: number;
    voiceToneRecommendation: string;
    foleySoundEffects: string[];
    cinematicPacingTips: string;
    audioScriptPolish: string;
  } | null>(null);

  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Sync with product preset defaults when product changes
  const handleProductChange = (prod: ProductPreset) => {
    setSelectedProduct(prod);
    setCurrentAction(prod.defaultAction);
    setCameraAngle(prod.defaultCameraAngle);
    setLighting(prod.defaultLighting);
    setAudioAnalysis(null);
    stopSpeaking();
    setIsSpeakingVoiceover(false);
  };

  // Video simulation timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime((prev) => (prev >= 15 ? 0 : Number((prev + 0.1).toFixed(1))));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Trigger snapshot
  const handleTakeSnapshot = () => {
    if (soundEnabled) playCameraShutterSound();
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 250);
  };

  // Play commercial voiceover via Web Speech API
  const handlePlayVoiceover = () => {
    if (isSpeakingVoiceover) {
      stopSpeaking();
      setIsSpeakingVoiceover(false);
      return;
    }

    if (!soundEnabled) return;

    const script =
      audioAnalysis?.audioScriptPolish ||
      `Karşınızda ${selectedProduct.sampleBrandName}. ${currentModel.name} ile mükemmelliği hissedin. ${selectedProduct.tagline}`;

    setIsSpeakingVoiceover(true);
    speakText(script, {
      rate: 0.95,
      pitch: 1.05,
      voiceLang: "tr-TR",
      onEnd: () => setIsSpeakingVoiceover(false),
    });
  };

  // Gemini Video & Audio Analysis
  const handleAnalyzeAudio = async () => {
    setIsAnalyzingAudio(true);
    try {
      const res = await fetch("/api/gemini/analyze-video-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scriptText: `${selectedProduct.sampleBrandName} — ${selectedProduct.tagline}`,
          tempo: currentAction === "running" ? "Yüksek Enerji 120 BPM" : "Sofistike & Akıcı 85 BPM",
          targetMood:
            selectedProduct.id === "running_shoes"
              ? "Atletik & Dinamik"
              : selectedProduct.id === "furniture"
              ? "Dingin & Mimari Lüks"
              : "Çekici & Yüksek Moda",
          voiceStyle: `${currentModel.name} (${currentModel.title})`,
        }),
      });

      if (!res.ok) throw new Error("Ses analizi tamamlanamadı");
      const data = await res.json();
      setAudioAnalysis(data);

      if (soundEnabled && data.audioScriptPolish) {
        handlePlayVoiceover();
      }
    } catch (e: any) {
      console.error(e);
      setAudioAnalysis({
        audioMood: "Cinematic Fashion Beats",
        optimalBpm: currentAction === "running" ? 124 : 90,
        voiceToneRecommendation: "Kendinden emin, fısıltılı mikro-dinamik ses tonu",
        foleySoundEffects: ["Kumaş hışırtısı", "Topuk yankısı", "Ayakkabı yer tutuşu"],
        cinematicPacingTips: "İlk 3 saniye geniş açıdan yavaşça makro ürün açısına yumuşak geçiş yapın.",
        audioScriptPolish: `${selectedProduct.sampleBrandName} ile podyum ve sokak senin sahnen. Kusursuz doku, ödün vermeyen tarz.`,
      });
    } finally {
      setIsAnalyzingAudio(false);
    }
  };

  // Video prompt formula generator
  const generatedVideoPrompt = `Cinematic 4k commercial video for ${selectedProduct.name} (${selectedProduct.sampleBrandName}), featuring AI fashion model ${currentModel.name}, ${currentModel.style} aesthetic. Action: ${currentAction} with fluid body dynamics. Camera movement: ${cameraAngle} framing, zoom level ${zoomLevel}x, 60fps slow-motion tracking shot. Studio lighting: ${lighting}. Hyper-realistic textures, Vogue commercial color grading, high end advertising campaign.`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedVideoPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Visual background image based on product category & action
  const getSimulatedVisual = () => {
    if (selectedProduct.id === "running_shoes") {
      return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80";
    }
    if (selectedProduct.id === "sandals") {
      return "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1000&auto=format&fit=crop&q=80";
    }
    if (selectedProduct.id === "lipstick") {
      return "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1000&auto=format&fit=crop&q=80";
    }
    if (selectedProduct.id === "nail_polish") {
      return "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1000&auto=format&fit=crop&q=80";
    }
    if (selectedProduct.id === "furniture") {
      return "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&auto=format&fit=crop&q=80";
    }
    if (selectedProduct.id === "lingerie") {
      return "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80";
    }
    if (selectedProduct.id === "dress") {
      return "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=80";
    }
    return currentModel.fullBodyImage || currentModel.avatar;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Studio Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-5 rounded-3xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              Video & Kamera Yönetmenliği
            </span>
            <span className="text-xs text-neutral-400">| Reklam Filmi & Hareket Simülasyonu</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Ticari Reklam Prodüksiyonu & Kamera Stüdyosu
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Mobilya, koşu ayakkabısı, sandalet, sütyen, gece elbisesi, kuaför ve ruj/oje reklamları için gerçek zamanlı kamera, eylem ve ses yönetimi.
          </p>
        </div>

        {/* Model Selection Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-neutral-400">Manken:</span>
          <select
            value={currentModel.id}
            onChange={(e) => {
              const m = AI_MODELS.find((item) => item.id === e.target.value);
              if (m) onModelChange(m);
            }}
            className="bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {AI_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.style})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Categories Pill Selector */}
      <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800">
        <div className="flex items-center justify-between mb-2 px-2">
          <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            Reklamı Yapılan Ürün Kategorisi:
          </span>
          <span className="text-[11px] text-amber-400 font-semibold">{selectedProduct.sampleBrandName}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_PRESETS.map((prod) => {
            const isSelected = selectedProduct.id === prod.id;
            return (
              <button
                key={prod.id}
                id={`product-btn-${prod.id}`}
                onClick={() => handleProductChange(prod)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-amber-600 text-white shadow-md shadow-amber-950/40"
                    : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-neutral-800"
                }`}
              >
                <span>{prod.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Director Console: Viewport & Controller Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Video Viewport & Player HUD */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl group select-none">
            {/* Flash Effect on snapshot */}
            {flashEffect && (
              <div className="absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-200 opacity-95" />
            )}

            {/* Background Simulated Video Frame with Zoom scale & Motion animation */}
            <div
              className={`w-full h-full transition-transform duration-500 origin-center ${
                isPlaying && currentAction === "running"
                  ? "animate-[pulse_1.2s_infinite]"
                  : isPlaying && currentAction === "catwalk"
                  ? "animate-[pulse_3s_infinite]"
                  : ""
              }`}
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={getSimulatedVisual()}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95"
              />
            </div>

            {/* Simulated Dynamic Lighting Overlay */}
            {lighting === "golden_hour" && (
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 via-transparent to-rose-500/20 mix-blend-color-burn pointer-events-none" />
            )}
            {lighting === "cyber_neon" && (
              <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 via-transparent to-pink-600/30 mix-blend-screen pointer-events-none" />
            )}
            {lighting === "runway_strobe" && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/20 pointer-events-none" />
            )}

            {/* 9 & 12 Grid Rule of Thirds Guide Overlay (from user's video concept) */}
            {showGridOverlay && (
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-10">
                <div className="border-r border-b border-white/15" />
                <div className="border-r border-b border-white/15" />
                <div className="border-b border-white/15" />
                <div className="border-r border-b border-white/15" />
                <div className="border-r border-b border-white/15" />
                <div className="border-b border-white/15" />
                <div className="border-r border-white/15" />
                <div className="border-r border-white/15" />
                <div />
              </div>
            )}

            {/* HUD Top Bar */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white inline-block" />
                  REC {elapsedTime}s
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-neutral-300 text-[10px] font-mono border border-white/10">
                  4K 60FPS • RAW
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="toggle-grid-overlay-btn"
                  onClick={() => setShowGridOverlay(!showGridOverlay)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                    showGridOverlay
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "bg-black/60 text-neutral-400 border-white/10"
                  }`}
                >
                  9&12 Grid
                </button>
                <button
                  id="take-shutter-snapshot-btn"
                  onClick={handleTakeSnapshot}
                  title="Deklanşör ile Kare Yakala"
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-white text-white hover:text-black transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Product Tag Overlay Hotspot */}
            <div className="absolute bottom-16 left-4 z-20 pointer-events-auto">
              <div className="bg-black/75 backdrop-blur-md border border-amber-500/40 p-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Reklamdaki Ürün
                  </div>
                  <div className="text-xs font-extrabold text-white">{selectedProduct.sampleBrandName}</div>
                  <div className="text-[10px] text-neutral-300">{selectedProduct.tagline}</div>
                </div>
              </div>
            </div>

            {/* HUD Bottom Bar: Player Controls */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto bg-black/60 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <button
                  id="toggle-video-playback-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-xl bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <div className="text-xs font-mono text-neutral-300">
                  <span>00:{elapsedTime < 10 ? `0${Math.floor(elapsedTime)}` : Math.floor(elapsedTime)}</span>
                  <span className="text-neutral-500"> / 00:15</span>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400 font-semibold ml-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>
                    {currentAction === "catwalk" && "Podyum Catwalk"}
                    {currentAction === "running" && "Dinamik Koşu & Sprint"}
                    {currentAction === "posing" && "360° Glamour Dönüş"}
                    {currentAction === "lounge" && "Lounge & Dinlenme"}
                    {currentAction === "closeup_beauty" && "Makyaj & Dudak Yakın Çekimi"}
                  </span>
                </div>
              </div>

              {/* Quick Zoom Indicator */}
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 bg-black/40 px-2 py-1 rounded-lg">
                <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                <span>{zoomLevel.toFixed(1)}x Zoom</span>
              </div>
            </div>
          </div>

          {/* Sound FX & Rhythm Triggers for Realistic Production */}
          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-amber-400" />
              Ses Efektleri & Ritim:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => soundEnabled && playRunwayBeat()}
                className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors"
              >
                🥁 Defile Bass Ritim
              </button>
              <button
                onClick={() => soundEnabled && playCameraShutterSound()}
                className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors"
              >
                📸 Flaş & Deklanşör
              </button>
              <button
                onClick={() => soundEnabled && playSpraySound()}
                className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors"
              >
                ✨ Makyaj Spreyi
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Director Controls (Actions, Camera Zoom/Angles, Lighting, Audio Script) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Action Selector: Yürüme, Koşma, Poz, Dinlenme, Yakın Makyaj */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Manken Eylemi (Action Choreography)</span>
              <span className="text-[10px] text-amber-400 uppercase font-semibold">Aktif Hareket</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: "running", label: "🏃‍♀️ Dinamik Koşu (Sneaker)", desc: "Koşu ayakkabısı ve spor reklamı için sprint" },
                { id: "catwalk", label: "🚶‍♀️ Podyum Catwalk (Elbise)", desc: "Elbise ve sandalet için akışkan yürüyüş" },
                { id: "posing", label: "✨ 360° Glamour Poz", desc: "Mücevher, iç giyim & stil dönüşü" },
                { id: "lounge", label: "🛋️ Lounge & Dinlenme", desc: "Tasarım koltuk & mobilya için dinlenme pozu" },
                { id: "closeup_beauty", label: "💄 Makyaj & Dudak Yakın Çekimi", desc: "Ruj ve oje için makro yüz ve el odağı" },
              ].map((act) => (
                <button
                  key={act.id}
                  onClick={() => setCurrentAction(act.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    currentAction === act.id
                      ? "bg-amber-950/40 border-amber-500 ring-1 ring-amber-500 text-white"
                      : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                  }`}
                >
                  <div className="text-xs font-bold mb-0.5">{act.label}</div>
                  <div className="text-[10px] text-neutral-400 line-clamp-1">{act.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Camera Zoom & Angles Control */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Kamera Yakınlaştırma & Açılar</span>
              </h3>
              <span className="text-xs font-mono text-amber-400 font-bold">{zoomLevel}x</span>
            </div>

            {/* Zoom Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>Geniş Plan (1.0x)</span>
                <span>Portre (2.0x)</span>
                <span>Makro Ürün (3.5x)</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="3.5"
                step="0.1"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Camera Angle Presets */}
            <div className="pt-2 border-t border-neutral-800">
              <span className="text-xs font-semibold text-neutral-400 block mb-2">Kamera Açı Kılavuzu:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: "eye_level", label: "Göz Hizası" },
                  { id: "low_angle", label: "Yerden Alt Açı (Hero)" },
                  { id: "high_fashion_45", label: "45° Moda Eğimi" },
                  { id: "macro_product", label: "Makro Detay Odak" },
                  { id: "bird_eye", label: "Kuşbakışı Tepe" },
                ].map((ang) => (
                  <button
                    key={ang.id}
                    onClick={() => setCameraAngle(ang.id as any)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                      cameraAngle === ang.id
                        ? "bg-amber-600 text-white"
                        : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
                    }`}
                  >
                    {ang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Setup */}
            <div className="pt-2 border-t border-neutral-800">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-neutral-400">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Işıklandırma Atmosferi:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: "natural_daylight", label: "Doğal Gün Işığı" },
                  { id: "golden_hour", label: "Altın Saat Sıcaklığı" },
                  { id: "cyber_neon", label: "Siber Neon Magenta" },
                  { id: "studio_softbox", label: "Stüdyo Softbox" },
                  { id: "runway_strobe", label: "Podyum Flaşları" },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLighting(l.id as any)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                      lighting === l.id
                        ? "bg-amber-600 text-white"
                        : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Voiceover & Audio Analysis Section */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Seslendirme & Reklam Ses Analizi</h3>
              </div>
              <button
                id="analyze-audio-btn"
                onClick={handleAnalyzeAudio}
                disabled={isAnalyzingAudio}
                className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {isAnalyzingAudio ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <Activity className="w-3.5 h-3.5" />
                    <span>Gemini Ses Analizi</span>
                  </>
                )}
              </button>
            </div>

            {/* Voiceover Script box with Audio playback */}
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Model Seslendirme Metni ({currentModel.name}):</span>
                <button
                  onClick={handlePlayVoiceover}
                  className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg transition-colors ${
                    isSpeakingVoiceover
                      ? "bg-red-600 text-white animate-pulse"
                      : "bg-neutral-800 hover:bg-neutral-700 text-amber-400"
                  }`}
                >
                  <Volume2 className="w-3 h-3" />
                  <span>{isSpeakingVoiceover ? "Durdur" : "Seslendir"}</span>
                </button>
              </div>
              <p className="text-xs text-neutral-200 italic leading-relaxed">
                "{audioAnalysis?.audioScriptPolish || `${selectedProduct.sampleBrandName}. ${selectedProduct.tagline} Güzel AI ile geleceğin modasını şimdi keşfet.`}"
              </p>
            </div>

            {/* Analysis details */}
            {audioAnalysis && (
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-xs space-y-2 text-neutral-300">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span>Önerilen Tempo: {audioAnalysis.optimalBpm} BPM</span>
                  <span>Ruh Hali: {audioAnalysis.audioMood}</span>
                </div>
                <div>
                  <strong className="text-amber-300">Ton: </strong>
                  {audioAnalysis.voiceToneRecommendation}
                </div>
                <div>
                  <strong className="text-amber-300">Foley Ses Efektleri: </strong>
                  {audioAnalysis.foleySoundEffects.join(" • ")}
                </div>
                <div className="text-[11px] text-neutral-400">{audioAnalysis.cinematicPacingTips}</div>
              </div>
            )}
          </div>

          {/* Video Generation Prompt Formula */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>Veo / AI Video Prompt Formülü</span>
              </h4>
              <button
                onClick={copyPrompt}
                className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 font-semibold"
              >
                {copiedPrompt ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPrompt ? "Kopyalandı" : "Promptu Kopyala"}</span>
              </button>
            </div>
            <p className="text-[11px] font-mono text-neutral-400 bg-neutral-900 p-3 rounded-xl border border-neutral-850 leading-relaxed">
              {generatedVideoPrompt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
