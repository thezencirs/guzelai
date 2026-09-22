import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { AIModel, MoodboardCard, AdTemplateItem } from "./types";
import { AI_MODELS } from "./data/models";
import { Language, translations, SUPPORTED_LANGUAGES } from "./i18n/translations";
import { GuzelAiHeader, AppPage } from "./components/GuzelAiHeader";
import { MobileInstagramTabBar, MobileTabId } from "./components/MobileInstagramTabBar";
import type { UserProfile } from "./components/AuthOnboardingModal";
import { Sidebar, NavTabId } from "./components/Sidebar";
import { GuzelAiPageLoader } from "./components/GuzelAiPageLoader";
import { ArrowLeft, BarChart3, Command } from "lucide-react";
import { useStudioAnalytics } from "./hooks/useStudioAnalytics";
import { useGlobalKeyboardShortcuts } from "./hooks/useGlobalKeyboardShortcuts";

// Code-Splitting: Lazy-Loaded Independent Web App Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ClipsPage = lazy(() => import("./pages/ClipsPage"));
const ModelCreatorPage = lazy(() => import("./pages/ModelCreatorPage"));
const WebsitesPage = lazy(() => import("./pages/WebsitesPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));

// Code-Splitting: Lazy-Loaded Studio Views
const EasyAdTemplatesView = lazy(() =>
  import("./components/EasyAdTemplatesView").then((m) => ({ default: m.EasyAdTemplatesView }))
);
const PhotoshootWizard = lazy(() =>
  import("./components/PhotoshootWizard").then((m) => ({ default: m.PhotoshootWizard }))
);
const GalleryView = lazy(() =>
  import("./components/GalleryView").then((m) => ({ default: m.GalleryView }))
);
const VideoStudioView = lazy(() =>
  import("./components/VideoStudioView").then((m) => ({ default: m.VideoStudioView }))
);
const ModelRoster = lazy(() =>
  import("./components/ModelRoster").then((m) => ({ default: m.ModelRoster }))
);
const DressUpStudio = lazy(() =>
  import("./components/DressUpStudio").then((m) => ({ default: m.DressUpStudio }))
);
const MoodboardFeed = lazy(() =>
  import("./components/MoodboardFeed").then((m) => ({ default: m.MoodboardFeed }))
);
const LegalLicenseView = lazy(() =>
  import("./components/LegalLicenseView").then((m) => ({ default: m.LegalLicenseView }))
);
const ModelCreatorStudio = lazy(() =>
  import("./components/ModelCreatorStudio").then((m) => ({ default: m.ModelCreatorStudio }))
);

// Code-Splitting: Lazy-Loaded Heavy Modals
const AuthOnboardingModal = lazy(() =>
  import("./components/AuthOnboardingModal").then((m) => ({ default: m.AuthOnboardingModal }))
);
const LanguageSelectorModal = lazy(() =>
  import("./components/LanguageSelectorModal").then((m) => ({ default: m.LanguageSelectorModal }))
);
const ProjectInquiryModal = lazy(() =>
  import("./components/ProjectInquiryModal").then((m) => ({ default: m.ProjectInquiryModal }))
);
const CampaignModal = lazy(() =>
  import("./components/CampaignModal").then((m) => ({ default: m.CampaignModal }))
);
const StudioAnalyticsModal = lazy(() =>
  import("./components/StudioAnalyticsModal").then((m) => ({ default: m.StudioAnalyticsModal }))
);
const CommandMenuModal = lazy(() =>
  import("./components/CommandMenuModal").then((m) => ({ default: m.CommandMenuModal }))
);

export default function App() {
  // Navigation State: Multi-page web app routing
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash === "clips") return "clips";
      if (hash === "model_creator" || hash === "model-creator" || hash === "model") return "model_creator";
      if (hash === "websites" || hash === "web") return "websites";
      if (hash === "auth" || hash === "profile" || hash === "login") return "auth";
      if (hash === "studio") return "studio";
    }
    return "home";
  });

  // Mobile Bottom Tab Bar State
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTabId>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash === "clips") return "clips";
      if (hash === "model_creator" || hash === "model-creator") return "create_model";
      if (hash === "websites" || hash === "web") return "websites";
      if (hash === "auth" || hash === "profile") return "profile_auth";
    }
    return "home";
  });

  // Dynamic models roster (includes user-created models)
  const [modelsList, setModelsList] = useState<AIModel[]>(AI_MODELS);

  // User Auth State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem("guzelai_user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Language: Turkish default ("tr"), 12 Global languages fully supported
  const [currentLang, setCurrentLang] = useState<Language>("tr");
  const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);

  // Contact / Project Inquiry Modal
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  // Studio internal state
  const [activeStudioTab, setActiveStudioTab] = useState<NavTabId>("templates");
  const [currentModel, setCurrentModel] = useState<AIModel>(AI_MODELS[0]);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState<boolean>(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState<boolean>(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState<boolean>(false);
  const [creditsRemaining, setCreditsRemaining] = useState<number>(() => {
    return currentUser?.credits || 50;
  });

  // Custom Analytics Tracking Hook: tracks view durations for different studio modules
  const {
    events: analyticsEvents,
    stats: analyticsStats,
    totalStudioTimeSeconds,
    currentLiveSeconds,
    activeModuleName,
    clearAnalytics,
    exportAnalyticsJson,
  } = useStudioAnalytics({
    activeModule: activeStudioTab,
    isStudioActive: currentPage === "studio",
  });

  // Template preloading for photoshoot wizard
  const [preloadedTemplateForWizard, setPreloadedTemplateForWizard] = useState<AdTemplateItem | null>(null);
  const [directExecuteShootForWizard, setDirectExecuteShootForWizard] = useState<boolean>(false);

  // Cross-studio data transfer for Video generation
  const [videoStudioData, setVideoStudioData] = useState<{
    startImage?: string;
    endImage?: string;
    prompt?: string;
  }>({});

  const t = translations[currentLang];

  // Hash synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash === "clips") {
        setCurrentPage("clips");
        setActiveMobileTab("clips");
      } else if (hash === "model_creator" || hash === "model-creator" || hash === "model") {
        setCurrentPage("model_creator");
        setActiveMobileTab("create_model");
      } else if (hash === "websites" || hash === "web") {
        setCurrentPage("websites");
        setActiveMobileTab("websites");
      } else if (hash === "auth" || hash === "profile" || hash === "login") {
        setCurrentPage("auth");
        setActiveMobileTab("profile_auth");
      } else if (hash === "studio") {
        setCurrentPage("studio");
      } else {
        setCurrentPage("home");
        setActiveMobileTab("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Main Page Transition Function
  const navigateToPage = (page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update hash
    let hashValue = "";
    if (page === "clips") hashValue = "clips";
    else if (page === "model_creator") hashValue = "model-creator";
    else if (page === "websites") hashValue = "websites";
    else if (page === "auth") hashValue = "auth";
    else if (page === "studio") hashValue = "studio";

    if (hashValue) {
      window.location.hash = hashValue;
    } else {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }

    // Update mobile tab
    if (page === "home") setActiveMobileTab("home");
    else if (page === "clips") setActiveMobileTab("clips");
    else if (page === "model_creator") setActiveMobileTab("create_model");
    else if (page === "websites") setActiveMobileTab("websites");
    else if (page === "auth") setActiveMobileTab("profile_auth");
  };

  // Auth actions
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCreditsRemaining(user.credits);
    localStorage.setItem("guzelai_user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("guzelai_user");
  };

  // Deploy newly created model to live roster
  const handleDeployModelToRoster = (newModel: AIModel) => {
    setModelsList((prev) => [newModel, ...prev]);
    setCurrentModel(newModel);
    if (!AI_MODELS.some((m) => m.id === newModel.id)) {
      AI_MODELS.unshift(newModel);
    }
  };

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === "tr" ? "en" : "tr"));
  };

  // Launch Studio workspace
  const handleOpenFullStudio = (tab: string = "templates", model?: AIModel) => {
    if (model) {
      setCurrentModel(model);
    }
    setActiveStudioTab((tab as NavTabId) || "templates");
    navigateToPage("studio");
  };

  // Global Keyboard Shortcuts Handlers
  const handleToggleStudio = useCallback(() => {
    if (currentPage === "studio") {
      navigateToPage("home");
    } else {
      handleOpenFullStudio();
    }
  }, [currentPage]);

  const handleCloseAllModals = useCallback((): boolean => {
    if (isCommandMenuOpen) {
      setIsCommandMenuOpen(false);
      return true;
    }
    if (isContactModalOpen) {
      setIsContactModalOpen(false);
      return true;
    }
    if (isAuthModalOpen) {
      setIsAuthModalOpen(false);
      return true;
    }
    if (isLangModalOpen) {
      setIsLangModalOpen(false);
      return true;
    }
    if (isCampaignModalOpen) {
      setIsCampaignModalOpen(false);
      return true;
    }
    if (isAnalyticsModalOpen) {
      setIsAnalyticsModalOpen(false);
      return true;
    }
    // If inside studio and no modals open, pressing Esc exits back to home
    if (currentPage === "studio") {
      navigateToPage("home");
      return true;
    }
    return false;
  }, [
    isCommandMenuOpen,
    isContactModalOpen,
    isAuthModalOpen,
    isLangModalOpen,
    isCampaignModalOpen,
    isAnalyticsModalOpen,
    currentPage,
  ]);

  useGlobalKeyboardShortcuts({
    onToggleCommandMenu: () => setIsCommandMenuOpen((prev) => !prev),
    onToggleStudio: handleToggleStudio,
    onCloseAllModals: handleCloseAllModals,
  });

  // Apply template from EasyAdTemplatesView
  const handleApplyTemplate = (template: AdTemplateItem, directExecuteShoot: boolean = false) => {
    const matchedModel = modelsList.find((m) => m.id === template.modelId) || modelsList[0];
    setCurrentModel(matchedModel);
    setPreloadedTemplateForWizard(template);
    setDirectExecuteShootForWizard(directExecuteShoot);
    setActiveStudioTab("photoshoot_wizard");
    navigateToPage("studio");
  };

  // Video studio transition
  const handleSendToVideo = (startImg: string, endImg: string, promptText: string) => {
    setVideoStudioData({
      startImage: startImg,
      endImage: endImg,
      prompt: promptText,
    });
    setActiveStudioTab("your_videos");
    navigateToPage("studio");
  };

  // Select model for photoshoot
  const handleSelectModelForPhotoshoot = (model: AIModel) => {
    setCurrentModel(model);
    setActiveStudioTab("photoshoot_wizard");
    navigateToPage("studio");
  };

  // Select model for Dress-up
  const handleSelectModelForDressUp = (model: AIModel) => {
    setCurrentModel(model);
    setActiveStudioTab("dress_up");
    navigateToPage("studio");
  };

  const handleLoadMoodboardIntoStudio = (_card: MoodboardCard) => {
    setActiveStudioTab("photoshoot_wizard");
    navigateToPage("studio");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#171717] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#E65A7F] selection:text-white">
      {/* MODE: FULL COMMERCIAL AI STUDIO */}
      {currentPage === "studio" ? (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-[#E65A7F] selection:text-white">
          {/* Top Quick Bar to return to GuzelAI Medya agency pages */}
          <div className="bg-[#171717] border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-xs sticky top-0 z-50">
            <button
              id="btn-return-agency-site"
              onClick={() => navigateToPage("home")}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition shadow-xs group"
              title="Ana Sayfaya Dön (Kısayol: Esc veya S)"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#E65A7F]" />
              <span>&larr; Ana Sayfaya Dön</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-neutral-300 border border-white/10">
                Esc
              </span>
            </button>

            <div className="flex items-center gap-3">
              {/* Studio Command Palette Trigger */}
              <button
                id="btn-studio-command-menu"
                onClick={() => setIsCommandMenuOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 hover:bg-neutral-750 text-neutral-200 font-bold text-[11px] transition border border-neutral-700 shadow-xs group"
                title="Komut Menüsü & Hızlı Geçiş (⌘K / Ctrl+K)"
              >
                <Command className="w-3.5 h-3.5 text-[#44BDBD]" />
                <span className="hidden sm:inline">Komutlar</span>
                <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                  ⌘K
                </span>
              </button>

              <button
                id="btn-studio-analytics-modal"
                onClick={() => setIsAnalyticsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 hover:bg-neutral-750 text-neutral-200 font-bold text-[11px] transition border border-neutral-700 shadow-xs"
                title="Stüdyo Kullanım & Süre Analitiği"
              >
                <BarChart3 className="w-3.5 h-3.5 text-[#44BDBD]" />
                <span className="hidden sm:inline">Analitik:</span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {Math.floor(currentLiveSeconds / 60)}m {currentLiveSeconds % 60}s
                </span>
              </button>

              <span className="text-white/60 hidden lg:inline text-[11px]">
                GuzelAI Commercial Studio Engine &bull; %100 Telifsiz Ticari Lisans
              </span>
              <button
                id="btn-studio-language-modal"
                onClick={() => setIsLangModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] transition border border-white/10"
                title="Dili Değiştir (12 Dil)"
              >
                <span>{SUPPORTED_LANGUAGES.find((l) => l.code === currentLang)?.flag || "🌐"}</span>
                <span>{currentLang.toUpperCase()}</span>
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-row min-w-0">
            {/* Studio Sidebar */}
            <Sidebar
              activeTab={activeStudioTab}
              onSelectTab={(tab) => {
                setActiveStudioTab(tab);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              creditsRemaining={creditsRemaining}
              onOpenCampaignModal={() => setIsCampaignModalOpen(true)}
              onBackToAgencyHome={() => navigateToPage("home")}
              onOpenAnalyticsModal={() => setIsAnalyticsModalOpen(true)}
              onOpenCommandMenu={() => setIsCommandMenuOpen(true)}
            />

            {/* Studio Main Workspace */}
            <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden pb-20 md:pb-0">
              <Suspense fallback={<GuzelAiPageLoader variant="studio" label="Stüdyo Bileşeni Yükleniyor..." />}>
                {/* View: Model Üretim Yeri (AI & Metaverse Influencer Creator) */}
                {activeStudioTab === "model_creator" && (
                  <ModelCreatorStudio
                    t={t}
                    onDeployModelToRoster={handleDeployModelToRoster}
                    onNavigateToClips={() => navigateToPage("clips")}
                    onNavigateToDressUp={() => {
                      setActiveStudioTab("dress_up");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                )}

                {/* View 0: Kolay Reklam Şablonları */}
                {activeStudioTab === "templates" && (
                  <EasyAdTemplatesView
                    onApplyTemplate={handleApplyTemplate}
                    onSendToVideoStudio={handleSendToVideo}
                    onViewLegalLicense={() => setActiveStudioTab("legal_license")}
                  />
                )}

                {/* View 1: Photoshoot Wizard */}
                {activeStudioTab === "photoshoot_wizard" && (
                  <PhotoshootWizard
                    models={modelsList}
                    selectedModel={currentModel}
                    onSelectModel={setCurrentModel}
                    onSendToVideo={handleSendToVideo}
                    onViewLegalLicense={() => setActiveStudioTab("legal_license")}
                    preloadedTemplate={preloadedTemplateForWizard}
                    directExecuteShoot={directExecuteShootForWizard}
                    onOpenTemplatesHub={() => setActiveStudioTab("templates")}
                  />
                )}

                {/* View 2: Your Images & Multi-Angle Catalog */}
                {activeStudioTab === "your_images" && (
                  <GalleryView
                    onSendToVideo={handleSendToVideo}
                    onViewLegalLicense={() => setActiveStudioTab("legal_license")}
                  />
                )}

                {/* View 3: Create Your Video */}
                {activeStudioTab === "your_videos" && (
                  <VideoStudioView
                    initialStartImage={videoStudioData.startImage}
                    initialEndImage={videoStudioData.endImage}
                    initialPrompt={videoStudioData.prompt}
                    selectedModel={currentModel}
                    onViewLegalLicense={() => setActiveStudioTab("legal_license")}
                  />
                )}

                {/* View 4: Default Models (100% AI Kadrosu & Güzellik Rutinleri) */}
                {activeStudioTab === "models" && (
                  <ModelRoster
                    onSelectModelForDressUp={handleSelectModelForDressUp}
                    onSelectModelForVideo={handleSelectModelForPhotoshoot}
                    onOpenModelCreator={() => setActiveStudioTab("model_creator")}
                    soundEnabled={true}
                  />
                )}

                {/* View 5: Virtual Try-On & Doku Düzenleyici */}
                {activeStudioTab === "dress_up" && (
                  <DressUpStudio
                    currentModel={currentModel}
                    onModelChange={setCurrentModel}
                    onSendToDirector={(styledConfig) => {
                      handleSendToVideo(
                        currentModel.avatar,
                        currentModel.fullBodyImage,
                        `Commercial editorial of ${currentModel.name} wearing ${styledConfig.outfit} with ${styledConfig.texture} texture.`
                      );
                    }}
                    soundEnabled={true}
                  />
                )}

                {/* View 6: Moodboard */}
                {activeStudioTab === "moodboard" && (
                  <MoodboardFeed onLoadIntoStudio={handleLoadMoodboardIntoStudio} />
                )}

                {/* View 7: Legal License */}
                {activeStudioTab === "legal_license" && (
                  <LegalLicenseView onBackToStudio={() => setActiveStudioTab("photoshoot_wizard")} />
                )}
              </Suspense>
            </div>
          </div>

          {/* Campaign Modal */}
          {isCampaignModalOpen && (
            <Suspense fallback={null}>
              <CampaignModal
                isOpen={isCampaignModalOpen}
                onClose={() => setIsCampaignModalOpen(false)}
                soundEnabled={true}
              />
            </Suspense>
          )}
        </div>
      ) : (
        /* MODE: DEDICATED INDEPENDENT WEB PAGES */
        <div className="flex flex-col min-h-screen">
          {/* Universal Sticky Header */}
          <GuzelAiHeader
            lang={currentLang}
            t={t}
            currentPage={currentPage}
            onNavigatePage={navigateToPage}
            onToggleLang={handleToggleLang}
            onOpenLangModal={() => setIsLangModalOpen(true)}
            onOpenContactModal={() => setIsContactModalOpen(true)}
            onOpenFullStudio={() => handleOpenFullStudio("templates")}
            onOpenAuthModal={() => navigateToPage("auth")}
            onOpenModelCreator={() => navigateToPage("model_creator")}
            onOpenCommandMenu={() => setIsCommandMenuOpen(true)}
            currentUser={currentUser}
          />

          {/* Dynamic Page Router */}
          <div className="flex-1 pb-20 md:pb-0">
            <Suspense fallback={<GuzelAiPageLoader variant="page" label="GuzelAI &bull; Sayfa Hazırlanıyor..." />}>
              {/* PAGE 1: ANA SAYFA (HOME PAGE) */}
              {currentPage === "home" && (
                <HomePage
                  t={t}
                  onNavigateClips={() => navigateToPage("clips")}
                  onNavigateModelCreator={() => navigateToPage("model_creator")}
                  onNavigateWebsites={() => navigateToPage("websites")}
                  onNavigateAuth={() => navigateToPage("auth")}
                  onOpenFullStudio={handleOpenFullStudio}
                  onOpenContactModal={() => setIsContactModalOpen(true)}
                  onSelectModelForDressUp={handleSelectModelForDressUp}
                  onSelectModelForPhotoshoot={handleSelectModelForPhotoshoot}
                />
              )}

              {/* PAGE 2: 9:16 KLİPLER SAYFASI (CLIPS PAGE) */}
              {currentPage === "clips" && (
                <ClipsPage
                  t={t}
                  onNavigateHome={() => navigateToPage("home")}
                  onNavigateModelCreator={() => navigateToPage("model_creator")}
                  onNavigateWebsites={() => navigateToPage("websites")}
                  onNavigateAuth={() => navigateToPage("auth")}
                  onOpenFullStudio={handleOpenFullStudio}
                  onSendToVideoStudio={handleSendToVideo}
                />
              )}

              {/* PAGE 3: MODEL ÜRET SAYFASI (MODEL CREATOR PAGE) */}
              {currentPage === "model_creator" && (
                <ModelCreatorPage
                  t={t}
                  onNavigateHome={() => navigateToPage("home")}
                  onNavigateClips={() => navigateToPage("clips")}
                  onNavigateWebsites={() => navigateToPage("websites")}
                  onNavigateAuth={() => navigateToPage("auth")}
                  onDeployModelToRoster={handleDeployModelToRoster}
                  onOpenFullStudio={handleOpenFullStudio}
                />
              )}

              {/* PAGE 4: TASARIM WEB SİTELERİ SAYFASI (WEBSITES PAGE) */}
              {currentPage === "websites" && (
                <WebsitesPage
                  t={t}
                  onNavigateHome={() => navigateToPage("home")}
                  onNavigateClips={() => navigateToPage("clips")}
                  onNavigateModelCreator={() => navigateToPage("model_creator")}
                  onNavigateAuth={() => navigateToPage("auth")}
                  onOpenContactModal={() => setIsContactModalOpen(true)}
                  onOpenFullStudio={handleOpenFullStudio}
                />
              )}

              {/* PAGE 5: GİRİŞ & PROFİL PORTALI (AUTH PAGE) */}
              {currentPage === "auth" && (
                <AuthPage
                  t={t}
                  currentUser={currentUser}
                  onLoginSuccess={handleLoginSuccess}
                  onLogout={handleLogout}
                  onNavigateHome={() => navigateToPage("home")}
                  onNavigateClips={() => navigateToPage("clips")}
                  onNavigateModelCreator={() => navigateToPage("model_creator")}
                  onNavigateWebsites={() => navigateToPage("websites")}
                  onOpenFullStudio={handleOpenFullStudio}
                />
              )}
            </Suspense>
          </div>
        </div>
      )}

      {/* Mobile Instagram-Style Bottom Navigation Bar (Always active on mobile screens) */}
      <MobileInstagramTabBar
        activeTab={activeMobileTab}
        onSelectTab={(tab) => {
          setActiveMobileTab(tab);
        }}
        currentUser={currentUser}
        onNavigatePage={navigateToPage}
        onOpenAuthModal={() => navigateToPage("auth")}
        onOpenModelCreator={() => navigateToPage("model_creator")}
        onScrollToClips={() => navigateToPage("clips")}
        onScrollToWebsites={() => navigateToPage("websites")}
        onScrollToHome={() => navigateToPage("home")}
      />

      {/* Lazy-Loaded Modals with Suspense */}
      <Suspense fallback={null}>
        {/* Interactive Project Inquiry Modal */}
        {isContactModalOpen && (
          <ProjectInquiryModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
            t={t}
          />
        )}

        {/* User Auth & Onboarding Modal (For quick popups) */}
        {isAuthModalOpen && (
          <AuthOnboardingModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            t={t}
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            onOpenModelCreator={() => {
              setIsAuthModalOpen(false);
              navigateToPage("model_creator");
            }}
            onExploreClips={() => {
              setIsAuthModalOpen(false);
              navigateToPage("clips");
            }}
          />
        )}

        {/* Global 12-Language Selector Modal */}
        {isLangModalOpen && (
          <LanguageSelectorModal
            isOpen={isLangModalOpen}
            onClose={() => setIsLangModalOpen(false)}
            currentLang={currentLang}
            onSelectLang={(newLang) => {
              setCurrentLang(newLang);
              const langItem = SUPPORTED_LANGUAGES.find((l) => l.code === newLang);
              if (langItem) {
                document.documentElement.lang = newLang;
                document.documentElement.dir = langItem.dir || "ltr";
              }
            }}
          />
        )}

        {/* Private Studio Analytics Dashboard Modal */}
        {isAnalyticsModalOpen && (
          <StudioAnalyticsModal
            isOpen={isAnalyticsModalOpen}
            onClose={() => setIsAnalyticsModalOpen(false)}
            stats={analyticsStats}
            events={analyticsEvents}
            totalStudioTimeSeconds={totalStudioTimeSeconds}
            currentLiveSeconds={currentLiveSeconds}
            activeModuleName={activeModuleName}
            onClearAnalytics={clearAnalytics}
            onExportAnalytics={exportAnalyticsJson}
          />
        )}

        {/* Universal Quick Command Menu (Cmd/Ctrl + K, ?, S) */}
        {isCommandMenuOpen && (
          <CommandMenuModal
            isOpen={isCommandMenuOpen}
            onClose={() => setIsCommandMenuOpen(false)}
            onNavigatePage={navigateToPage}
            onSelectStudioTab={(tab) => {
              setActiveStudioTab(tab);
              navigateToPage("studio");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onOpenStudio={() => handleOpenFullStudio()}
            onOpenContactModal={() => setIsContactModalOpen(true)}
            onOpenAuthModal={() => navigateToPage("auth")}
            onOpenLangModal={() => setIsLangModalOpen(true)}
            onOpenAnalyticsModal={() => setIsAnalyticsModalOpen(true)}
            onOpenCampaignModal={() => setIsCampaignModalOpen(true)}
            currentPage={currentPage}
          />
        )}
      </Suspense>
    </div>
  );
}
