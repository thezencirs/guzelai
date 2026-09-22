import React from "react";
import { GuzelAiLogo } from "./GuzelAiLogo";
import {
  Sparkles,
  Camera,
  Video,
  Users,
  Shirt,
  Compass,
  ShieldCheck,
  PlusCircle,
  HelpCircle,
  CheckCircle2,
  Sliders,
  ArrowLeft,
  Film,
  Globe,
  Gamepad2,
  BarChart3,
} from "lucide-react";

export type NavTabId =
  | "vertical_clips"
  | "cinematic_websites"
  | "model_creator"
  | "templates"
  | "photoshoot_wizard"
  | "your_images"
  | "your_videos"
  | "models"
  | "dress_up"
  | "moodboard"
  | "legal_license";

interface SidebarProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  creditsRemaining?: number;
  onOpenCampaignModal?: () => void;
  onBackToAgencyHome?: () => void;
  onOpenAnalyticsModal?: () => void;
  onOpenCommandMenu?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  creditsRemaining = 40,
  onOpenCampaignModal,
  onBackToAgencyHome,
  onOpenAnalyticsModal,
  onOpenCommandMenu,
}) => {
  return (
    <aside
      id="app-main-sidebar"
      className="w-64 bg-neutral-900 text-white flex flex-col justify-between border-r border-neutral-800 shrink-0 h-screen sticky top-0 select-none z-30"
    >
      {/* Top Branding */}
      <div className="p-4 border-b border-neutral-800 space-y-3">
        {onBackToAgencyHome && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={onBackToAgencyHome}
              className="flex-1 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[11px] font-semibold transition"
              title="Ana Sayfaya Dön (Kısayol: Esc veya S)"
            >
              <div className="flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 text-[#E65A7F]" />
                <span>Web Sitesi</span>
              </div>
              <span className="text-[9px] font-mono px-1 rounded bg-white/10 text-neutral-400">Esc / S</span>
            </button>
            {onOpenCommandMenu && (
              <button
                onClick={onOpenCommandMenu}
                className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-[10px] font-mono transition border border-white/5"
                title="Komut Menüsü & Arama (⌘K / Ctrl+K)"
              >
                ⌘K
              </button>
            )}
          </div>
        )}

        <div className="flex items-center justify-center py-1">
          <GuzelAiLogo size="sm" variant="dark-bg" showSubtitle={true} />
        </div>

        {/* Big CTA: + Generate New Image / Start Shoot */}
        <button
          id="sidebar-btn-new-generation"
          onClick={() => onSelectTab("photoshoot_wizard")}
          className={`w-full py-2.5 px-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
            activeTab === "photoshoot_wizard"
              ? "bg-gradient-to-r from-[#E65A7F] via-[#FB5D2E] to-[#44BDBD] text-white shadow-pink-600/30 ring-2 ring-pink-400/50"
              : "bg-[#E65A7F] hover:bg-[#D9496F] text-white shadow-pink-900/30"
          }`}
        >
          <PlusCircle className="w-4 h-4 text-white" />
          <span>+ Yeni AI Çekim Başlat</span>
        </button>
      </div>

      {/* Main Navigation List */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-3 mb-2">
          Dikey Klipler & Reklamlar
        </div>

        <button
          id="sidebar-nav-vertical-clips"
          onClick={() => onSelectTab("vertical_clips")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "vertical_clips"
              ? "bg-gradient-to-r from-[#E65A7F]/30 to-[#FB5D2E]/20 text-white border border-[#E65A7F]/50 shadow-sm"
              : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <Video className={`w-4 h-4 ${activeTab === "vertical_clips" ? "text-[#E65A7F]" : "text-[#E65A7F]/80"}`} />
            <span className="font-bold">Dikey Klipler (9:16)</span>
          </div>
          <span className="text-[10px] bg-[#E65A7F]/20 text-[#E65A7F] border border-[#E65A7F]/30 px-1.5 py-0.5 rounded font-extrabold">
            REELS
          </span>
        </button>

        <button
          id="sidebar-nav-cinematic-websites"
          onClick={() => onSelectTab("cinematic_websites")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "cinematic_websites"
              ? "bg-gradient-to-r from-[#44BDBD]/30 to-[#E65A7F]/20 text-white border border-[#44BDBD]/50 shadow-sm"
              : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <Film className={`w-4 h-4 ${activeTab === "cinematic_websites" ? "text-[#44BDBD]" : "text-[#44BDBD]/80"}`} />
            <span className="font-bold">Tasarım Web Siteleri</span>
          </div>
          <span className="text-[10px] bg-[#44BDBD]/20 text-[#44BDBD] border border-[#44BDBD]/30 px-1.5 py-0.5 rounded font-extrabold">
            DIRECTOR
          </span>
        </button>

        <button
          id="sidebar-nav-model-creator"
          onClick={() => onSelectTab("model_creator")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "model_creator"
              ? "bg-gradient-to-r from-[#E65A7F]/30 via-purple-600/30 to-[#44BDBD]/30 text-white border border-[#E65A7F]/50 shadow-sm"
              : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <Gamepad2 className={`w-4 h-4 ${activeTab === "model_creator" ? "text-amber-300" : "text-amber-400"}`} />
            <span className="font-bold">Model Üretim Yeri</span>
          </div>
          <span className="text-[10px] bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white px-1.5 py-0.5 rounded font-black">
            METAVERSE
          </span>
        </button>

        <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-3 pt-3 mb-2">
          Stüdyo & Şablonlar
        </div>

        <button
          id="sidebar-nav-templates"
          onClick={() => onSelectTab("templates")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "templates"
              ? "bg-gradient-to-r from-amber-500/20 to-purple-600/20 text-white border border-amber-500/40 shadow-sm"
              : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <Sparkles className={`w-4 h-4 ${activeTab === "templates" ? "text-amber-400" : "text-amber-400/80"}`} />
            <span className="font-bold">Kolay Reklam Şablonları</span>
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">
            7 HAZIR
          </span>
        </button>

        <button
          id="sidebar-nav-photoshoot"
          onClick={() => onSelectTab("photoshoot_wizard")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "photoshoot_wizard"
              ? "bg-neutral-800 text-white border border-neutral-700 shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
          }`}
        >
          <Camera className={`w-4 h-4 ${activeTab === "photoshoot_wizard" ? "text-purple-400" : "text-neutral-400"}`} />
          <span>Photoshoot Studio (AI Çekim)</span>
        </button>

        <button
          id="sidebar-nav-your-images"
          onClick={() => onSelectTab("your_images")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "your_images"
              ? "bg-neutral-800 text-white border border-neutral-700 shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <Camera className={`w-4 h-4 ${activeTab === "your_images" ? "text-purple-400" : "text-neutral-400"}`} />
            <span>Your Images (Açılar & Katalog)</span>
          </div>
          <span className="text-[10px] bg-neutral-800 text-neutral-400 border border-neutral-700 px-1.5 py-0.2 rounded font-mono">
            6
          </span>
        </button>

        <button
          id="sidebar-nav-your-videos"
          onClick={() => onSelectTab("your_videos")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "your_videos"
              ? "bg-neutral-800 text-white border border-neutral-700 shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <Video className={`w-4 h-4 ${activeTab === "your_videos" ? "text-pink-400" : "text-neutral-400"}`} />
            <span>Create Your Video (AI Video)</span>
          </div>
          <span className="text-[10px] bg-pink-500/20 text-pink-300 border border-pink-500/30 px-1.5 py-0.5 rounded font-bold">
            PRO
          </span>
        </button>

        <div className="pt-3 pb-1">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-3 mb-2">
            Mankenler & Araçlar
          </div>
        </div>

        <button
          id="sidebar-nav-models"
          onClick={() => onSelectTab("models")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "models"
              ? "bg-neutral-800 text-white border border-neutral-700 shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
          }`}
        >
          <Users className={`w-4 h-4 ${activeTab === "models" ? "text-purple-400" : "text-neutral-400"}`} />
          <span>Default Models (100% AI Kadro)</span>
        </button>

        <button
          id="sidebar-nav-dress-up"
          onClick={() => onSelectTab("dress_up")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "dress_up"
              ? "bg-neutral-800 text-white border border-neutral-700 shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
          }`}
        >
          <Shirt className={`w-4 h-4 ${activeTab === "dress_up" ? "text-purple-400" : "text-neutral-400"}`} />
          <span>Virtual Try-On & Doku Editor</span>
        </button>

        <button
          id="sidebar-nav-moodboard"
          onClick={() => onSelectTab("moodboard")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "moodboard"
              ? "bg-neutral-800 text-white border border-neutral-700 shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
          }`}
        >
          <Compass className={`w-4 h-4 ${activeTab === "moodboard" ? "text-purple-400" : "text-neutral-400"}`} />
          <span>Moodboard & Reklam Akışı</span>
        </button>

        <div className="pt-3 pb-1">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-3 mb-2">
            Hukuki & Telif Güvencesi
          </div>
        </div>

        <button
          id="sidebar-nav-legal"
          onClick={() => onSelectTab("legal_license")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "legal_license"
              ? "bg-emerald-950/50 text-emerald-300 border border-emerald-800/60"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ticari Lisans & Sertifika</span>
          </div>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      </div>

      {/* Bottom Footer / Plan & Credits info */}
      <div className="p-4 border-t border-neutral-800 space-y-3 bg-neutral-900/90">
        {/* Credits Pill */}
        <div className="bg-neutral-800/80 rounded-xl p-3 border border-neutral-700/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-neutral-400 font-medium">Kalan AI Kredisi</span>
            <span className="text-white font-bold font-mono">{creditsRemaining} / 50</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              style={{ width: `${(creditsRemaining / 50) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-2">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ticari Kullanıma Açık
            </span>
            <span className="text-purple-400 hover:underline cursor-pointer">Kredi Yükle</span>
          </div>
        </div>

        {/* Direct Campaign Modal Trigger */}
        {onOpenCampaignModal && (
          <button
            id="sidebar-btn-campaign-modal"
            onClick={onOpenCampaignModal}
            className="w-full py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold flex items-center justify-center gap-2 border border-neutral-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>AI Kampanya Paketi Üret</span>
          </button>
        )}

        {/* Private Studio Analytics Dashboard Trigger */}
        {onOpenAnalyticsModal && (
          <button
            id="sidebar-btn-analytics-modal"
            onClick={onOpenAnalyticsModal}
            className="w-full py-2 px-3 rounded-lg bg-neutral-950/60 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold flex items-center justify-between border border-neutral-800 hover:border-neutral-700 transition group"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-3.5 h-3.5 text-[#44BDBD]" />
              <span>Stüdyo Analitiği</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 group-hover:text-emerald-400">
              Private
            </span>
          </button>
        )}
      </div>
    </aside>
  );
};
