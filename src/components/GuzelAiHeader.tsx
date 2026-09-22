import React, { useState } from "react";
import { Language, TranslationSchema, SUPPORTED_LANGUAGES } from "../i18n/translations";
import { GuzelAiLogo } from "./GuzelAiLogo";
import { Sparkles, Globe, ArrowUpRight, Menu, X, Layers, ChevronDown, User, Gamepad2, Gift, Command } from "lucide-react";

export type AppPage = "home" | "clips" | "model_creator" | "websites" | "auth" | "studio";

interface GuzelAiHeaderProps {
  lang: Language;
  t: TranslationSchema;
  currentPage?: AppPage;
  onNavigatePage?: (page: AppPage) => void;
  onToggleLang?: () => void;
  onOpenLangModal?: () => void;
  onOpenContactModal: () => void;
  onOpenFullStudio: () => void;
  onOpenAuthModal?: () => void;
  onOpenModelCreator?: () => void;
  onOpenCommandMenu?: () => void;
  currentUser?: any;
  activeSection?: string;
  isStudioOpen?: boolean;
}

export const GuzelAiHeader: React.FC<GuzelAiHeaderProps> = ({
  lang,
  t,
  currentPage = "home",
  onNavigatePage,
  onToggleLang,
  onOpenLangModal,
  onOpenContactModal,
  onOpenFullStudio,
  onOpenAuthModal,
  onOpenModelCreator,
  onOpenCommandMenu,
  currentUser,
  activeSection = "",
  isStudioOpen = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  const handlePageSelect = (page: AppPage) => {
    setMobileMenuOpen(false);
    if (onNavigatePage) {
      onNavigatePage(page);
    }
  };

  const prefetchPage = (page: AppPage) => {
    try {
      if (page === "home") import("../pages/HomePage");
      else if (page === "clips") import("../pages/ClipsPage");
      else if (page === "model_creator") import("../pages/ModelCreatorPage");
      else if (page === "websites") import("../pages/WebsitesPage");
      else if (page === "auth") import("../pages/AuthPage");
      else if (page === "studio") import("./EasyAdTemplatesView");
    } catch (e) {
      // Ignored
    }
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== "home" && onNavigatePage) {
      onNavigatePage("home");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="guzelai-main-header"
      className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#171717]/8 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: GuzelAI Medya Brand Signature Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageSelect("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onMouseEnter={() => prefetchPage("home")}
          className="flex items-center gap-2 group py-1"
          aria-label="GuzelAI Medya Ana Sayfa"
        >
          <GuzelAiLogo size="md" variant="light-bg" showSubtitle={true} />
        </a>

        {/* Center: Desktop Navigation Links (Editorial Minimalist Web App) */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-5 text-xs lg:text-sm font-semibold text-[#171717]/80">
          <button
            onClick={() => handlePageSelect("home")}
            onMouseEnter={() => prefetchPage("home")}
            className={`transition-all tracking-tight px-3 py-1.5 rounded-full ${
              currentPage === "home"
                ? "bg-[#171717] text-white font-bold shadow-xs"
                : "hover:text-[#171717] hover:bg-[#171717]/5"
            }`}
          >
            Ana Sayfa
          </button>

          <button
            onClick={() => handlePageSelect("clips")}
            onMouseEnter={() => prefetchPage("clips")}
            className={`transition-all tracking-tight px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
              currentPage === "clips"
                ? "bg-[#E65A7F] text-white font-bold shadow-xs shadow-[#E65A7F]/30"
                : "hover:text-[#E65A7F] hover:bg-[#E65A7F]/10"
            }`}
          >
            <span>9:16 Klipler</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                currentPage === "clips" ? "bg-white text-[#E65A7F]" : "bg-[#E65A7F] text-white"
              }`}
            >
              REELS
            </span>
          </button>

          <button
            onClick={() => handlePageSelect("model_creator")}
            onMouseEnter={() => prefetchPage("model_creator")}
            className={`transition-all tracking-tight px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
              currentPage === "model_creator"
                ? "bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white font-bold shadow-xs"
                : "hover:text-amber-500 hover:bg-amber-500/10"
            }`}
          >
            <span>Model Üret</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                currentPage === "model_creator"
                  ? "bg-black/40 text-amber-200"
                  : "bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white"
              }`}
            >
              OYUN / 3D
            </span>
          </button>

          <button
            onClick={() => handlePageSelect("websites")}
            onMouseEnter={() => prefetchPage("websites")}
            className={`transition-all tracking-tight px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
              currentPage === "websites"
                ? "bg-[#44BDBD] text-black font-bold shadow-xs shadow-[#44BDBD]/30"
                : "hover:text-[#44BDBD] hover:bg-[#44BDBD]/10"
            }`}
          >
            <span>Web Siteleri</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                currentPage === "websites"
                  ? "bg-black text-[#44BDBD]"
                  : "bg-[#44BDBD]/20 text-[#1f8787] border border-[#44BDBD]/30"
              }`}
            >
              3D
            </span>
          </button>

          <button
            onClick={() => scrollTo("interactive-formats-section")}
            className="hover:text-[#FB5D2E] transition-colors tracking-tight hidden xl:flex items-center gap-1.5 px-2.5 py-1.5"
          >
            <span>{t.nav.interactiveFormats}</span>
          </button>
        </nav>

        {/* Right: Language Switcher + AI Studio CTA + Contact CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Giriş & Kayıt Ol (+50 Hediye Kredi) / Profil */}
          <button
            id="btn-header-auth-page"
            onClick={() => handlePageSelect("auth")}
            onMouseEnter={() => prefetchPage("auth")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition shadow-xs text-xs font-bold ${
              currentPage === "auth"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-500/20"
                : "border-[#171717]/10 bg-white hover:bg-neutral-50 text-[#171717]"
            }`}
          >
            {currentUser?.isLoggedIn ? (
              <>
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#E65A7F] to-[#44BDBD] flex items-center justify-center text-[9px] font-black text-white">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{currentUser.name.split(" ")[0]}</span>
                <span
                  className={`text-[10px] font-mono px-1 rounded font-black ${
                    currentPage === "auth"
                      ? "bg-white text-emerald-700"
                      : "text-emerald-600 bg-emerald-50"
                  }`}
                >
                  {currentUser.credits}K
                </span>
              </>
            ) : (
              <>
                <User
                  className={`w-3.5 h-3.5 ${
                    currentPage === "auth" ? "text-white" : "text-[#E65A7F]"
                  }`}
                />
                <span className="hidden sm:inline">Giriş & Profil</span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded-full bg-amber-400 text-black font-extrabold">
                  +50
                </span>
              </>
            )}
          </button>

          {/* Language Switcher (12 Global Languages Modal Trigger) */}
          <button
            id="btn-language-toggle"
            onClick={onOpenLangModal || onToggleLang}
            onMouseEnter={() => {
              try { import("./LanguageSelectorModal"); } catch (e) {}
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#171717]/10 bg-white/90 hover:bg-white text-xs font-bold text-[#171717] transition shadow-xs hover:border-[#E65A7F]/40"
            title="Global Dil Seçimi (12 Dil Destekli)"
          >
            <span className="text-base leading-none" role="img" aria-label={activeLangObj.name}>
              {activeLangObj.flag}
            </span>
            <span className="uppercase tracking-wider font-extrabold text-[11px] hidden sm:inline">
              {lang}
            </span>
            <ChevronDown className="w-3 h-3 text-[#171717]/50" />
          </button>

          {/* Command Palette & Quick Search (Cmd/Ctrl + K) */}
          {onOpenCommandMenu && (
            <button
              id="btn-header-command-menu"
              onClick={onOpenCommandMenu}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#171717]/10 bg-white/90 hover:bg-white text-xs font-semibold text-[#171717]/80 hover:text-[#171717] transition shadow-xs group"
              title="Komut Menüsü & Hızlı Arama (⌘K / Ctrl+K)"
            >
              <Command className="w-3.5 h-3.5 text-[#44BDBD]" />
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-neutral-100 text-neutral-600 font-bold border border-neutral-200">
                ⌘K
              </span>
            </button>
          )}

          {/* AI Stüdyo & Modeller Switcher Button */}
          <button
            id="btn-open-ai-studio"
            onClick={onOpenFullStudio}
            onMouseEnter={() => prefetchPage("studio")}
            className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#171717] hover:bg-[#262626] text-white text-xs font-bold transition shadow-xs"
            title="Stüdyo Masasını Aç (Kısayol: S)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#44BDBD]" />
            <span>{t.nav.openStudio}</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/15 text-neutral-300 font-extrabold border border-white/10">
              S
            </span>
          </button>

          {/* Primary Action Button (Pink #E65A7F) */}
          <button
            id="btn-header-start-project"
            onClick={onOpenContactModal}
            onMouseEnter={() => {
              try { import("./ProjectInquiryModal"); } catch (e) {}
            }}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white text-xs sm:text-sm font-bold tracking-tight transition-all transform hover:-translate-y-0.5 shadow-sm shadow-[#E65A7F]/25 flex items-center gap-1.5"
          >
            <span>{t.nav.startProject}</span>
            <ArrowUpRight className="w-4 h-4 text-white/90" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#171717] hover:bg-black/5"
            aria-label="Menüyü aç"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#171717]/10 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col gap-3 font-semibold text-base text-[#171717]">
            <button
              onClick={() => handlePageSelect("home")}
              className={`text-left py-2 border-b border-[#171717]/5 flex items-center justify-between ${
                currentPage === "home" ? "font-black text-[#E65A7F]" : ""
              }`}
            >
              <span>Ana Sayfa</span>
              <span className="text-xs text-[#171717]/40">Dünya & Vitrin</span>
            </button>
            <button
              onClick={() => handlePageSelect("clips")}
              className={`text-left py-2 border-b border-[#171717]/5 flex items-center justify-between ${
                currentPage === "clips" ? "font-black text-[#E65A7F]" : ""
              }`}
            >
              <span className="font-bold text-[#E65A7F]">9:16 Klipler Sayfası</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E65A7F] text-white font-extrabold">
                9:16 REELS
              </span>
            </button>
            <button
              onClick={() => handlePageSelect("model_creator")}
              className={`text-left py-2 border-b border-[#171717]/5 flex items-center justify-between ${
                currentPage === "model_creator" ? "font-black text-amber-500" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-amber-500" />
                <span className="font-bold">Model Üret Sayfası</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white font-extrabold">
                OYUN / 3D
              </span>
            </button>
            <button
              onClick={() => handlePageSelect("websites")}
              className={`text-left py-2 border-b border-[#171717]/5 flex items-center justify-between ${
                currentPage === "websites" ? "font-black text-[#44BDBD]" : ""
              }`}
            >
              <span className="font-bold text-[#171717]">Web Siteleri Sayfası</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#44BDBD]/20 text-[#1f8787] font-bold">
                3D DIRECTOR
              </span>
            </button>
            <button
              onClick={() => handlePageSelect("auth")}
              className={`text-left py-2 border-b border-[#171717]/5 flex items-center justify-between ${
                currentPage === "auth" ? "font-black text-emerald-600" : ""
              }`}
            >
              <span className="font-bold text-emerald-700">Giriş / Profil Portalı</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400 text-black font-black">
                {currentUser?.isLoggedIn ? `${currentUser.credits} Kredi` : "+50 KREDİ"}
              </span>
            </button>
            <button
              onClick={() => scrollTo("interactive-formats-section")}
              className="text-left py-2 border-b border-[#171717]/5 flex items-center justify-between"
            >
              <span>{t.nav.interactiveFormats}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FB5D2E]/15 text-[#FB5D2E] font-bold">
                3D Vitrin
              </span>
            </button>
            <button
              onClick={() => scrollTo("contact-section")}
              className="text-left py-2 border-b border-[#171717]/5"
            >
              {t.nav.contact}
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAuthModal) onOpenAuthModal();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#E65A7F]/15 to-[#44BDBD]/15 border border-[#E65A7F]/30 text-xs font-bold text-[#171717] flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#E65A7F]" />
                <span className="font-extrabold">
                  {currentUser?.isLoggedIn ? `Hesabım (${currentUser.name})` : "Giriş Yap / Ücretsiz Kayıt Ol"}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400 text-black font-extrabold">
                {currentUser?.isLoggedIn ? `${currentUser.credits} Kredi` : "+50 Hediye Kredi"}
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenLangModal) onOpenLangModal();
                else if (onToggleLang) onToggleLang();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#171717]/10 text-xs font-bold text-[#171717] flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{activeLangObj.flag}</span>
                <span>{activeLangObj.nativeName} ({lang.toUpperCase()})</span>
              </div>
              <span className="text-[11px] text-[#E65A7F] font-bold">Dili Değiştir (12 Dil) &rarr;</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFullStudio();
              }}
              className="w-full py-3 rounded-xl bg-[#171717] text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#44BDBD]" />
              <span>{t.nav.openStudio}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContactModal();
              }}
              className="w-full py-3 rounded-xl bg-[#E65A7F] text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              <span>{t.nav.startProject}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
