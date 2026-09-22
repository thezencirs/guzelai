import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  Layers,
  Sliders,
  Maximize2,
  Download,
  Share2,
  Eye,
  Zap,
} from "lucide-react";

interface EditorialPreset {
  id: string;
  title: string;
  brand: string;
  bigText: string;
  category: string;
  image: string;
  tagline: string;
  subTagline: string;
  quoteLeft: string;
  spotlightText: string;
  creatorText: string;
  accentColor: string;
  bgTone: string;
}

const EDITORIAL_PRESETS: EditorialPreset[] = [
  {
    id: "chair",
    title: "Mid-Century Modern Chair",
    brand: "Arve Brand 2025",
    bigText: "Chair",
    category: "TYPOGRAPHY AILERON / FURNITURE",
    image: "https://images.unsplash.com/photo-1580481077190-736135653307?w=1000&auto=format&fit=crop&q=85",
    tagline: "A SEAMLESS BLEND OF MID-CENTURY MODERN AESTHETICS",
    subTagline: "Designed for those who appreciate the art of time",
    quoteLeft: "BETWEEN SUCCESS AND SELF-CARE IS A VERY THIN LINE",
    spotlightText: "Spotlight",
    creatorText: "GuzelAI Editorial 2025",
    accentColor: "#C59A68",
    bgTone: "from-[#E6DFD5] to-[#D5CBC0]",
  },
  {
    id: "supercar",
    title: "Ferrari 360 Riviera Spider",
    brand: "Valentina Cruz & Atelier",
    bigText: "Spider",
    category: "HIGH LUXURY / AUTOMOTIVE",
    image: "/assets/valentina_supercar.jpg",
    tagline: "SPEED, PASSION & TIMELESS MEDITERRANEAN CHARM",
    subTagline: "Capturing the golden sunset glow along the French Riviera",
    quoteLeft: "EXTRAORDINARY JOURNEYS DEMAND UNCOMPROMISED BEAUTY",
    spotlightText: "Riviera",
    creatorText: "GuzelAI Supercar 2025",
    accentColor: "#E65A7F",
    bgTone: "from-[#F2E8DF] to-[#E3D0C1]",
  },
  {
    id: "jewelry",
    title: "Aura Royale Diamond Solitaire",
    brand: "Maison d'Or Milano",
    bigText: "Royal",
    category: "HAUTE JOAILLERIE",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&auto=format&fit=crop&q=85",
    tagline: "WHERE CELESTIAL LIGHT MEETS EXQUISITE CRAFTSMANSHIP",
    subTagline: "Hand-cut 18k emerald brilliance reflected on black velvet",
    quoteLeft: "PURE ELEGANCE WHISPERS, IT NEVER SHOUTS",
    spotlightText: "Solitaire",
    creatorText: "Maison d'Or 2025",
    accentColor: "#D4AF37",
    bgTone: "from-[#EADECB] to-[#D8C7B0]",
  },
  {
    id: "fashion",
    title: "Autumn Capsule Nappa Leather",
    brand: "myAIwear Paris",
    bigText: "Vogue",
    category: "EDITORIAL PRÊT-À-PORTER",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=85",
    tagline: "ARCHITECTURAL TAILORING FOR THE CONTEMPORARY ERA",
    subTagline: "Sculpted silhouettes handcrafted in French atelier leather",
    quoteLeft: "CONFIDENCE IS THE ULTIMATE LUXURY ACCESSORY",
    spotlightText: "Couture",
    creatorText: "myAIwear Studio",
    accentColor: "#E65A7F",
    bgTone: "from-[#EBE3DC] to-[#D9CDC2]",
  },
];

interface EditorialTypographyVideoPlayerProps {
  onBack?: () => void;
  onUseInShoot?: (preset: EditorialPreset) => void;
}

export const EditorialTypographyVideoPlayer: React.FC<EditorialTypographyVideoPlayerProps> = ({
  onBack,
  onUseInShoot,
}) => {
  const [activePreset, setActivePreset] = useState<EditorialPreset>(EDITORIAL_PRESETS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "4:5" | "16:9">("9:16");
  const [customBigText, setCustomBigText] = useState<string>(EDITORIAL_PRESETS[0].bigText);
  const [isEditingText, setIsEditingText] = useState<boolean>(false);
  const totalDuration = 5.0; // 5 seconds loop matching user's video

  // Playback timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            return 0;
          }
          return Math.min(totalDuration, Number((prev + 0.05).toFixed(2)));
        });
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const handleSelectPreset = (preset: EditorialPreset) => {
    setActivePreset(preset);
    setCustomBigText(preset.bigText);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const progressPercent = (currentTime / totalDuration) * 100;
  const formattedTime = `0:0${Math.floor(currentTime)} / 0:05`;

  // Animation progress factor (0 to 1)
  const animProgress = currentTime / totalDuration;
  // Typography translation: slides up from behind product
  const textTranslateY = Math.max(0, (1 - animProgress * 2.2) * 50);
  const textOpacity = Math.min(1, animProgress * 3);

  return (
    <div className="bg-[#121318] text-white rounded-3xl p-4 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: activePreset.accentColor }}
      />

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              id="editorial-player-back-btn"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/10 group"
              title="Geri Dön"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest uppercase text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Editoryal Tipografi & Hareketli Video
              </span>
              <span className="text-xs text-white/50 hidden sm:inline">Vogue & Architectural Digest Format</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
              {activePreset.title}
            </h2>
          </div>
        </div>

        {/* Aspect ratio toggles & Actions */}
        <div className="flex items-center gap-2">
          <div className="bg-black/40 p-1 rounded-xl border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setAspectRatio("9:16")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                aspectRatio === "9:16"
                  ? "bg-white text-black shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              9:16 Reels
            </button>
            <button
              onClick={() => setAspectRatio("4:5")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                aspectRatio === "4:5"
                  ? "bg-white text-black shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              4:5 Post
            </button>
            <button
              onClick={() => setAspectRatio("16:9")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                aspectRatio === "16:9"
                  ? "bg-white text-black shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              16:9 Banner
            </button>
          </div>

          {onUseInShoot && (
            <button
              onClick={() => onUseInShoot(activePreset)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white text-xs font-black hover:opacity-95 transition shadow-lg shadow-[#E65A7F]/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bu Formatı Uyarla</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
        {/* Left Column: Interactive Presets & Controls */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <span className="text-xs font-mono uppercase text-white/50 tracking-wider">
              Editoryal Şablon Seç
            </span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {EDITORIAL_PRESETS.map((preset) => {
                const isSelected = preset.id === activePreset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-left p-3 rounded-2xl border transition-all relative overflow-hidden group ${
                      isSelected
                        ? "bg-white/10 border-white/40 shadow-lg"
                        : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={preset.image}
                        alt={preset.title}
                        className="w-10 h-10 rounded-lg object-cover border border-white/20"
                        crossOrigin="anonymous"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-black truncate text-white">
                          {preset.title}
                        </div>
                        <div className="text-[10px] text-white/60 truncate font-mono">
                          {preset.brand}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Typography Customization Input */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/80 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-300" />
                <span>Tipografi Kelimesini Değiştir</span>
              </span>
              <span className="text-[10px] font-mono text-white/40">Canlı Katman</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customBigText}
                onChange={(e) => setCustomBigText(e.target.value)}
                maxLength={12}
                placeholder="Örn: Chair, Vogue, Luxury..."
                className="flex-1 bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-sm text-white font-serif font-black focus:outline-hidden focus:border-[#E65A7F]"
              />
              <button
                onClick={() => setCustomBigText(activePreset.bigText)}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition"
              >
                Sıfırla
              </button>
            </div>
          </div>

          {/* Creative Specs Card */}
          <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between text-white/70">
              <span>Tipografi Ailesi:</span>
              <span className="font-mono text-white font-bold">Playfair / Didot Serif Display</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span>Katman Derinliği:</span>
              <span className="font-mono text-emerald-400 font-bold">Z-Index Parallax (Arka Plan)</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span>Kamera Hareketi:</span>
              <span className="font-mono text-amber-300 font-bold">Spotlight Slow Pan + Motion Reveal</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span>Kullanım Alanı:</span>
              <span className="font-mono text-white/90">Instagram Reels, TikTok Luxury Ads, DOOH</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Video Player Simulation (Matching user's video) */}
        <div className="lg:col-span-7 flex justify-center">
          <div
            className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 select-none ${
              aspectRatio === "9:16"
                ? "w-[330px] sm:w-[380px] h-[586px] sm:h-[675px]"
                : aspectRatio === "4:5"
                ? "w-[380px] sm:w-[440px] h-[475px] sm:h-[550px]"
                : "w-full max-w-[620px] h-[348px]"
            }`}
            style={{
              boxShadow: "0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(197, 154, 104, 0.15)",
            }}
          >
            {/* The Magazine Page Canvas (Warm vintage off-white background) */}
            <div
              className={`w-full h-full bg-gradient-to-b ${activePreset.bgTone} text-[#1A1815] relative p-5 sm:p-7 flex flex-col justify-between overflow-hidden`}
            >
              {/* Subtle film grain & lighting glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.8) 0%, rgba(0,0,0,0.2) 100%)",
                }}
              />

              {/* TOP ROW: Back Arrow (inside video canvas) + Metadata Header */}
              <div className="relative z-20 flex items-start justify-between">
                {/* Back Arrow button (as seen in user video) */}
                <button
                  onClick={onBack}
                  className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md text-[#171717] hover:bg-white flex items-center justify-center transition shadow-sm border border-black/10 active:scale-95"
                  title="Geri"
                >
                  <ArrowLeft className="w-5 h-5 text-[#171717]" />
                </button>

                {/* Top Center-Right Editorial Tagline */}
                <div className="text-right max-w-[190px] sm:max-w-[220px]">
                  <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#1A1815] leading-tight">
                    {activePreset.tagline}
                  </div>
                  <div className="text-[8px] text-[#1A1815]/60 mt-0.5 leading-snug">
                    {activePreset.subTagline}
                  </div>
                </div>

                {/* Top Far Right Brand Monogram & Year */}
                <div className="text-right">
                  <div className="text-[10px] sm:text-xs font-extrabold tracking-tight text-[#1A1815] leading-none">
                    {activePreset.brand.split(" ")[0]}
                  </div>
                  <div className="text-[8px] font-mono tracking-widest text-[#1A1815]/70 uppercase">
                    Brand 2025
                  </div>
                  <div className="text-[7px] font-mono tracking-wider text-[#1A1815]/50 uppercase mt-0.5">
                    TYPOG
                  </div>
                </div>
              </div>

              {/* MIDDLE SECTION: Huge Typography Layer + Cutout Product Image Layer */}
              <div className="relative flex-1 flex items-center justify-center my-auto">
                {/* 1. BIG TYPOGRAPHY BEHIND PRODUCT (Animating smoothly) */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-75"
                  style={{
                    transform: `translateY(${textTranslateY}px)`,
                    opacity: textOpacity,
                  }}
                >
                  <span
                    className="font-serif font-black text-[96px] sm:text-[128px] tracking-tight text-[#2B2723] select-none leading-none scale-y-110"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      letterSpacing: "-0.04em",
                      textShadow: "0 10px 30px rgba(0,0,0,0.06)",
                    }}
                  >
                    {customBigText || activePreset.bigText}
                  </span>
                </div>

                {/* Left Side Editorial Quote */}
                <div className="absolute left-0 top-1/3 max-w-[120px] text-left pointer-events-none z-10">
                  <div className="text-[8px] font-bold uppercase tracking-wider leading-tight text-[#1A1815]/80">
                    {activePreset.quoteLeft}
                  </div>
                  <div className="w-6 h-[1px] bg-[#1A1815]/30 my-1" />
                  <div className="text-[7px] text-[#1A1815]/60 leading-tight">
                    Designed for those who appreciate the art of timeless
                  </div>
                </div>

                {/* Right Side Editorial Tag */}
                <div className="absolute right-0 top-1/2 pointer-events-none z-10 text-right">
                  <span className="text-[10px] font-mono tracking-widest text-[#1A1815]/80 uppercase">
                    {activePreset.spotlightText}
                  </span>
                </div>

                {/* 2. THE HERO PRODUCT / OBJECT IMAGE (In front of big typography) */}
                <div className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] transition-transform duration-300">
                  <img
                    src={activePreset.image}
                    alt={activePreset.title}
                    className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] mix-blend-multiply"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>

              {/* BOTTOM SECTION: Creator credits & Video Player Controls */}
              <div className="relative z-20 space-y-2">
                {/* Made by attribution */}
                <div className="flex items-center justify-end text-[8px] text-[#1A1815]/60 font-mono">
                  <span>Made by {activePreset.creatorText}</span>
                </div>

                {/* Real-time Video Scrubber & Play/Pause Controls (Matching video) */}
                <div className="bg-black/60 backdrop-blur-md rounded-2xl p-2.5 text-white flex flex-col gap-1.5 border border-white/10 shadow-lg">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:text-amber-300 transition"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 fill-current" />
                        )}
                      </button>
                      <span className="font-bold">{formattedTime}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-amber-300 transition"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-white/70" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-amber-300" />
                        )}
                      </button>
                      <button
                        onClick={() => setCurrentTime(0)}
                        className="hover:text-amber-300 transition"
                        title="Baştan Oynat"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-white/70" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Progress Bar */}
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                      setCurrentTime(Number((ratio * totalDuration).toFixed(2)));
                    }}
                    className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden relative"
                  >
                    <div
                      className="h-full bg-white rounded-full transition-all duration-75 relative"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
