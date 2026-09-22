import React from "react";
import { TranslationSchema } from "../i18n/translations";
import { GuzelAiEarthHero } from "../components/GuzelAiEarthHero";
import { ServicesSection } from "../components/ServicesSection";
import { InteractiveAdFormatsSection } from "../components/InteractiveAdFormatsSection";
import { AiStudioSection } from "../components/AiStudioSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { MagazineSection } from "../components/MagazineSection";
import { GuzelAiFooter } from "../components/GuzelAiFooter";
import {
  Film,
  Gamepad2,
  Globe,
  Sparkles,
  ArrowRight,
  User,
  Zap,
  Layers,
} from "lucide-react";

interface HomePageProps {
  t: TranslationSchema;
  onNavigateClips: () => void;
  onNavigateModelCreator: () => void;
  onNavigateWebsites: () => void;
  onNavigateAuth: () => void;
  onOpenFullStudio: (tab?: string) => void;
  onOpenContactModal: () => void;
  onSelectModelForDressUp: (model: any) => void;
  onSelectModelForPhotoshoot: (model: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  t,
  onNavigateClips,
  onNavigateModelCreator,
  onNavigateWebsites,
  onNavigateAuth,
  onOpenFullStudio,
  onOpenContactModal,
  onSelectModelForDressUp,
  onSelectModelForPhotoshoot,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#171717]">
      {/* 1. Live 3D Earth Hero Entrance (GuzelAI World) */}
      <GuzelAiEarthHero
        t={t}
        onOpenContactModal={onOpenContactModal}
        onOpenStudio={(tab) => {
          if (tab === "model_creator") {
            onNavigateModelCreator();
          } else if (tab === "vertical_clips") {
            onNavigateClips();
          } else if (tab === "cinematic_websites") {
            onNavigateWebsites();
          } else {
            onOpenFullStudio(tab);
          }
        }}
        onScrollToServices={() => scrollTo("services-section")}
        onScrollToInteractive={() => scrollTo("interactive-formats-section")}
        onScrollToStudio={() => scrollTo("ai-studio-section")}
        onScrollToWebsites={onNavigateWebsites}
      />

      {/* 2. Web App Direct Page Launchers Bar (Prominent Portal Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#171717]/10 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#171717]/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E65A7F] font-black">
                GuzelAI Web Uygulama Navigasyonu
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#171717] tracking-tight">
                Özel Sayfaları ve Modülleri Keşfedin
              </h2>
            </div>
            <span className="text-xs text-[#171717]/60 font-medium">
              Her biri bağımsız ve tam donanımlı web sayfalarıdır
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {/* Page 1: 9:16 Dikey Klipler */}
            <div
              id="home-card-clips-page"
              onClick={onNavigateClips}
              className="p-5 rounded-2xl bg-gradient-to-b from-[#FAF8F5] to-white border border-[#171717]/10 hover:border-[#E65A7F] hover:shadow-lg cursor-pointer transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E65A7F]/10 text-[#E65A7F] flex items-center justify-center group-hover:scale-110 transition">
                    <Film className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E65A7F] text-white font-extrabold">
                    9:16 REELS
                  </span>
                </div>
                <h3 className="text-base font-black text-[#171717] mt-3 group-hover:text-[#E65A7F] transition">
                  Klipler Sayfası
                </h3>
                <p className="text-xs text-[#171717]/65 mt-1 leading-relaxed">
                  Editoryal tipografi oynatıcı (Vogue/Modernist), dikey video reklam vitrini ve instant klip üreticisi.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#E65A7F] mt-4 pt-3 border-t border-[#171717]/5">
                <span>Sayfayı Aç</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Page 2: Model Üret (Metaverse & AI) */}
            <div
              id="home-card-model-creator-page"
              onClick={onNavigateModelCreator}
              className="p-5 rounded-2xl bg-gradient-to-b from-[#FAF8F5] to-white border border-[#171717]/10 hover:border-amber-400 hover:shadow-lg cursor-pointer transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white font-extrabold">
                    OYUN / 3D
                  </span>
                </div>
                <h3 className="text-base font-black text-[#171717] mt-3 group-hover:text-amber-500 transition">
                  Model Üret Sayfası
                </h3>
                <p className="text-xs text-[#171717]/65 mt-1 leading-relaxed">
                  Sıfırdan sanal influencer üretimi, Unreal Engine 5 & Unity kemik rig desteği ve 3D indirme.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 mt-4 pt-3 border-t border-[#171717]/5">
                <span>Sayfayı Aç</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Page 3: Sinematik Web Siteleri */}
            <div
              id="home-card-websites-page"
              onClick={onNavigateWebsites}
              className="p-5 rounded-2xl bg-gradient-to-b from-[#FAF8F5] to-white border border-[#171717]/10 hover:border-[#44BDBD] hover:shadow-lg cursor-pointer transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#44BDBD]/10 text-[#44BDBD] flex items-center justify-center group-hover:scale-110 transition">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#44BDBD] text-black font-extrabold">
                    3D DIRECTOR
                  </span>
                </div>
                <h3 className="text-base font-black text-[#171717] mt-3 group-hover:text-[#44BDBD] transition">
                  Web Siteleri Sayfası
                </h3>
                <p className="text-xs text-[#171717]/65 mt-1 leading-relaxed">
                  Ödüllü 3D WebGL web tasarımları, çoklu cihaz simülatörü ve sinematik marka portalları.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1f8787] mt-4 pt-3 border-t border-[#171717]/5">
                <span>Sayfayı Aç</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Page 4: Giriş & Profil */}
            <div
              id="home-card-auth-page"
              onClick={onNavigateAuth}
              className="p-5 rounded-2xl bg-gradient-to-b from-[#FAF8F5] to-white border border-[#171717]/10 hover:border-emerald-500 hover:shadow-lg cursor-pointer transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400 text-black font-black">
                    +50 KREDİ
                  </span>
                </div>
                <h3 className="text-base font-black text-[#171717] mt-3 group-hover:text-emerald-600 transition">
                  Giriş & Profil Sayfası
                </h3>
                <p className="text-xs text-[#171717]/65 mt-1 leading-relaxed">
                  Üye kaydı, bakiye yönetimi, kayıtlı mankenler, API token erişimi ve kullanıcı paneli.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mt-4 pt-3 border-t border-[#171717]/5">
                <span>Giriş / Profil Portalı</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section id="services-section">
        <ServicesSection
          t={t}
          onOpenContactModal={onOpenContactModal}
          onOpenStudio={() => onOpenFullStudio("templates")}
        />
      </section>

      {/* 4. Interactive Ad Formats */}
      <section id="interactive-formats-section">
        <InteractiveAdFormatsSection
          t={t}
          onSelectModel={onSelectModelForDressUp}
          onOpenStudio={() => onOpenFullStudio("dress_up")}
        />
      </section>

      {/* 5. Güzeller AI Modeller Kadrosu */}
      <section id="ai-studio-section">
        <AiStudioSection
          t={t}
          onSelectModel={onSelectModelForPhotoshoot}
          onOpenStudio={() => onOpenFullStudio("photoshoot_wizard")}
        />
      </section>

      {/* 6. Projects Section */}
      <section id="projects-section">
        <ProjectsSection
          t={t}
          onOpenProjectBriefModal={onOpenContactModal}
          onOpenStudio={() => onOpenFullStudio("templates")}
        />
      </section>

      {/* 7. Magazine Section */}
      <section id="magazine-section">
        <MagazineSection
          t={t}
          onOpenStudio={() => onOpenFullStudio("templates")}
        />
      </section>

      {/* 8. Footer */}
      <section id="contact-section">
        <GuzelAiFooter
          t={t}
          onOpenContactModal={onOpenContactModal}
          onOpenStudio={() => onOpenFullStudio("templates")}
        />
      </section>
    </div>
  );
};

export default HomePage;

