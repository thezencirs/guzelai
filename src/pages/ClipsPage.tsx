import React, { useState } from "react";
import { TranslationSchema } from "../i18n/translations";
import { VERTICAL_CLIPS, VerticalClipAd } from "../data/verticalClips";
import { EditorialTypographyVideoPlayer } from "../components/EditorialTypographyVideoPlayer";
import { VerticalClipsSection } from "../components/VerticalClipsSection";
import {
  ArrowLeft,
  Film,
  Sparkles,
  Sliders,
  TrendingUp,
  Share2,
  Download,
  CheckCircle2,
  Smartphone,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

interface ClipsPageProps {
  t: TranslationSchema;
  onNavigateHome: () => void;
  onNavigateModelCreator: () => void;
  onNavigateWebsites: () => void;
  onNavigateAuth: () => void;
  onOpenFullStudio: (tab?: string) => void;
  onSendToVideoStudio?: (startImg: string, endImg: string, promptText: string) => void;
}

export const ClipsPage: React.FC<ClipsPageProps> = ({
  t,
  onNavigateHome,
  onNavigateModelCreator,
  onNavigateWebsites,
  onNavigateAuth,
  onOpenFullStudio,
  onSendToVideoStudio,
}) => {
  const [selectedTab, setSelectedTab] = useState<"editorial_player" | "all_clips" | "ad_generator">(
    "editorial_player"
  );
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Tüm Klipler (8)" },
    { id: "furniture", label: "Editoryal & Tasarım Mobilya" },
    { id: "ugc", label: "Lüks UGC & Supercar" },
    { id: "fashion", label: "Moda & Try-On" },
    { id: "beauty", label: "Kozmetik & Glow" },
    { id: "jewelry", label: "Lüks Mücevher" },
    { id: "sneakers", label: "Sneakers & Streetwear" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#171717] transition-all">
      {/* Top Breadcrumb & Back Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#171717]/10 sticky top-20 z-30 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              id="clips-page-back-btn"
              className="px-3.5 py-1.5 rounded-full bg-[#171717]/5 hover:bg-[#171717]/10 text-xs font-bold text-[#171717] flex items-center gap-1.5 transition active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfa</span>
            </button>
            <div className="h-4 w-[1px] bg-[#171717]/20" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#171717]/50">Sayfa /</span>
              <h1 className="text-sm font-black text-[#171717] tracking-tight flex items-center gap-1.5">
                <Film className="w-4 h-4 text-[#E65A7F]" />
                <span>9:16 Dikey Klipler & Reels</span>
              </h1>
            </div>
          </div>

          {/* Quick Sub-navigation tabs */}
          <div className="flex items-center gap-1.5 bg-[#171717]/5 p-1 rounded-full text-xs font-bold">
            <button
              onClick={() => setSelectedTab("editorial_player")}
              className={`px-3 py-1 rounded-full transition ${
                selectedTab === "editorial_player"
                  ? "bg-[#171717] text-white shadow-xs"
                  : "text-[#171717]/70 hover:text-[#171717]"
              }`}
            >
              Editoryal Tipografi Oynatıcı
            </button>
            <button
              onClick={() => setSelectedTab("all_clips")}
              className={`px-3 py-1 rounded-full transition ${
                selectedTab === "all_clips"
                  ? "bg-[#171717] text-white shadow-xs"
                  : "text-[#171717]/70 hover:text-[#171717]"
              }`}
            >
              Klip Vitrini & Generator
            </button>
          </div>
        </div>
      </div>

      {/* Page Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#171717]/10 pb-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E65A7F]/10 border border-[#E65A7F]/25 text-[#E65A7F] text-xs font-extrabold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dikey Video Prodüksiyon Sayfası</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-[#171717]">
              9:16 Klipler, Reels & Editoryal Reklamlar
            </h2>
            <p className="text-sm sm:text-base text-[#171717]/70 mt-2 font-medium">
              Vogue ve Architectural Digest editoryal estetiğinden lüks supercar UGC ve TikTok reklamlarına kadar;
              telefon ekranını hipnotize eden sinematik dikey video formatları.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-2xl border border-[#171717]/10 shadow-xs text-center min-w-[100px]">
              <div className="text-xl font-black text-[#E65A7F]">5.4x</div>
              <div className="text-[10px] text-[#171717]/60 font-bold uppercase">Ort. ROAS</div>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#171717]/10 shadow-xs text-center min-w-[100px]">
              <div className="text-xl font-black text-[#44BDBD]">%87</div>
              <div className="text-[10px] text-[#171717]/60 font-bold uppercase">İlk 3sn Tutma</div>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#171717]/10 shadow-xs text-center min-w-[100px]">
              <div className="text-xl font-black text-[#171717]">9:16</div>
              <div className="text-[10px] text-[#171717]/60 font-bold uppercase">Dikey Format</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Page Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-24 space-y-12">
        {/* 1. EDITORIAL TYPOGRAPHY SHOWCASE (Matches the user's video directly) */}
        {selectedTab === "editorial_player" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-[#171717] flex items-center gap-2">
                  <span>Editoryal Tipografi Animasyonu & Spotlight Oynatıcı</span>
                  <span className="text-[10px] bg-[#E65A7F] text-white px-2 py-0.5 rounded-full font-black uppercase">
                    Canlı Deneyim
                  </span>
                </h3>
                <p className="text-xs text-[#171717]/60 mt-0.5">
                  Nesnenin ve mankenin arkasından yükselen devasa editoryal tipografi katmanı.
                  Zaman çizgisini sürükleyebilir, tipografi metnini değiştirebilir ve aspect ratio'yu ayarlayabilirsiniz.
                </p>
              </div>
            </div>

            <EditorialTypographyVideoPlayer
              onBack={onNavigateHome}
              onUseInShoot={(preset) => {
                onOpenFullStudio("photoshoot_wizard");
              }}
            />
          </div>
        )}

        {/* 2. THE COMPREHENSIVE CLIPS LIBRARY & AD GENERATOR SECTION */}
        <div className="pt-4">
          <VerticalClipsSection
            t={t}
            onOpenFullStudio={onOpenFullStudio}
            onSendToVideoStudio={onSendToVideoStudio}
          />
        </div>

        {/* 3. Cross Navigation Cards (Web App Architecture) */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#171717] to-[#262626] text-white space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#44BDBD]">
                GuzelAI Web Uygulaması
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Kliplerinizi Kendi Özel AI Modelinizle Çekin
              </h3>
              <p className="text-xs text-white/70 mt-1 max-w-xl">
                Hazır modeller yerine markanızın yüzü olacak özel bir sanal influencer veya metaverse karakteri oluşturun.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateModelCreator}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white text-xs font-black hover:opacity-95 transition shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Model Üret Sayfasına Git</span>
              </button>
              <button
                onClick={onNavigateWebsites}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
              >
                Web Tasarım Sayfasına Git
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClipsPage;

