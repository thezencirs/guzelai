import React from "react";
import {
  Compass,
  Film,
  Globe,
  Sparkles,
  User,
  Plus,
  Zap,
} from "lucide-react";
import { UserProfile } from "./AuthOnboardingModal";

export type MobileTabId = "home" | "clips" | "websites" | "create_model" | "profile_auth";

interface MobileInstagramTabBarProps {
  activeTab: MobileTabId;
  onSelectTab: (tab: MobileTabId) => void;
  currentUser?: UserProfile | null;
  onOpenAuthModal?: () => void;
  onOpenModelCreator?: () => void;
  onScrollToClips?: () => void;
  onScrollToWebsites?: () => void;
  onScrollToHome?: () => void;
  onNavigatePage?: (page: "home" | "clips" | "model_creator" | "websites" | "auth" | "studio") => void;
}

export const MobileInstagramTabBar: React.FC<MobileInstagramTabBarProps> = ({
  activeTab,
  onSelectTab,
  currentUser,
  onOpenAuthModal,
  onOpenModelCreator,
  onScrollToClips,
  onScrollToWebsites,
  onScrollToHome,
  onNavigatePage,
}) => {
  const handleNav = (tabId: MobileTabId) => {
    onSelectTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (onNavigatePage) {
      if (tabId === "home") onNavigatePage("home");
      else if (tabId === "clips") onNavigatePage("clips");
      else if (tabId === "create_model") onNavigatePage("model_creator");
      else if (tabId === "websites") onNavigatePage("websites");
      else if (tabId === "profile_auth") onNavigatePage("auth");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#090B10]/95 backdrop-blur-2xl border-t border-white/10 px-3 pt-2 pb-3 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] select-none">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* 1. ANA SAYFA / KEŞFET */}
        <button
          id="mobile-tab-home"
          onClick={() => handleNav("home")}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 text-white transition-all group"
          aria-label="Ana Sayfa"
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activeTab === "home"
                ? "bg-white/15 text-white"
                : "text-white/60 group-hover:text-white"
            }`}
          >
            <Compass className="w-5 h-5 transition-transform group-active:scale-90" />
          </div>
          <span
            className={`text-[10px] font-bold tracking-tight transition-colors ${
              activeTab === "home" ? "text-white font-extrabold" : "text-white/60"
            }`}
          >
            Ana Sayfa
          </span>
        </button>

        {/* 2. 9:16 DİKEY KLİPLER (REELS) */}
        <button
          id="mobile-tab-clips"
          onClick={() => handleNav("clips")}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 text-white transition-all group relative"
          aria-label="9:16 Dikey Klipler"
        >
          <div
            className={`p-1.5 rounded-xl transition-all relative ${
              activeTab === "clips"
                ? "bg-[#E65A7F]/20 text-[#E65A7F]"
                : "text-white/60 group-hover:text-white"
            }`}
          >
            <Film className="w-5 h-5 transition-transform group-active:scale-90" />
            <span className="absolute -top-1 -right-2 text-[8px] font-mono px-1 py-0.2 rounded-full bg-[#E65A7F] text-white font-black shadow-xs">
              9:16
            </span>
          </div>
          <span
            className={`text-[10px] font-bold tracking-tight transition-colors ${
              activeTab === "clips" ? "text-[#E65A7F] font-extrabold" : "text-white/60"
            }`}
          >
            Klipler
          </span>
        </button>

        {/* 3. CENTER CREATE BUTTON: MODEL & INFLUENCER ÜRET (INSTAGRAM STYLE +) */}
        <button
          id="mobile-tab-create-model"
          onClick={() => handleNav("create_model")}
          className="flex flex-col items-center justify-center -mt-5 group"
          aria-label="Model Üret"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E65A7F] via-[#D9496F] to-[#44BDBD] p-0.5 shadow-lg shadow-[#E65A7F]/40 transition-transform group-hover:scale-105 group-active:scale-95 flex items-center justify-center">
            <div className="w-full h-full bg-[#090B10] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
          </div>
          <span className="text-[10px] font-black tracking-tight text-white mt-1">
            Model Üret
          </span>
        </button>

        {/* 4. WEB SİTELERİ (CINEMATIC DIRECTOR) */}
        <button
          id="mobile-tab-websites"
          onClick={() => handleNav("websites")}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 text-white transition-all group relative"
          aria-label="Web Siteleri"
        >
          <div
            className={`p-1.5 rounded-xl transition-all relative ${
              activeTab === "websites"
                ? "bg-[#44BDBD]/20 text-[#44BDBD]"
                : "text-white/60 group-hover:text-white"
            }`}
          >
            <Globe className="w-5 h-5 transition-transform group-active:scale-90" />
            <span className="absolute -top-1 -right-2 text-[8px] font-mono px-1 py-0.2 rounded-full bg-[#44BDBD] text-black font-black">
              3D
            </span>
          </div>
          <span
            className={`text-[10px] font-bold tracking-tight transition-colors ${
              activeTab === "websites" ? "text-[#44BDBD] font-extrabold" : "text-white/60"
            }`}
          >
            Web Siteler
          </span>
        </button>

        {/* 5. GİRİŞ / KAYIT / PROFİL */}
        <button
          id="mobile-tab-profile-auth"
          onClick={() => handleNav("profile_auth")}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 text-white transition-all group relative"
          aria-label="Giriş ve Kayıt"
        >
          <div
            className={`p-1.5 rounded-xl transition-all relative ${
              activeTab === "profile_auth"
                ? "bg-white/20 text-white"
                : "text-white/60 group-hover:text-white"
            }`}
          >
            {currentUser?.isLoggedIn ? (
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#E65A7F] to-[#44BDBD] flex items-center justify-center text-[10px] font-black text-white">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <User className="w-5 h-5 transition-transform group-active:scale-90" />
            )}

            {/* Gift badge if not logged in */}
            {!currentUser?.isLoggedIn && (
              <span className="absolute -top-1 -right-2.5 text-[8px] font-mono px-1.5 py-0.2 rounded-full bg-amber-400 text-black font-black animate-pulse">
                +50
              </span>
            )}
          </div>
          <span
            className={`text-[10px] font-bold tracking-tight transition-colors ${
              activeTab === "profile_auth" ? "text-white font-extrabold" : "text-white/60"
            }`}
          >
            {currentUser?.isLoggedIn ? "Profilim" : "Giriş / Kayıt"}
          </span>
        </button>
      </div>
    </div>
  );
};
