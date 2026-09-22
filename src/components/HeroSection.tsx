import React from "react";
import { TranslationSchema } from "../i18n/translations";
import { GuzelAiLogo } from "./GuzelAiLogo";
import { ArrowUpRight, Sparkles, ShieldCheck, Zap, Play } from "lucide-react";

interface HeroSectionProps {
  t: TranslationSchema;
  onOpenContactModal: () => void;
  onScrollToServices: () => void;
  onOpenStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  onOpenContactModal,
  onScrollToServices,
  onOpenStudio,
}) => {
  return (
    <section
      id="hero-section"
      className="relative bg-[#FAF8F5] pt-12 sm:pt-20 pb-16 sm:pb-28 overflow-hidden border-b border-[#171717]/8"
    >
      {/* Subtle organic ambient backdrop gradients (restrained, <3% saturation) */}
      <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-[#E65A7F]/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#44BDBD]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Big, Powerful Editorial Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Small pill: Brand tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#171717]/8 text-[#171717] text-xs font-bold tracking-wider uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E65A7F] animate-pulse" />
              <span>{t.hero.tagline}</span>
            </div>

            {/* Massive Bold Headline: "Fikirleri güzelleştiriyoruz." */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#171717] tracking-tight leading-[1.05]">
              {t.hero.headlinePart1}{" "}
              <span className="relative inline-block text-[#171717]">
                {t.hero.headlinePart2}
                {/* Subtle, tactile underline in brand pink */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#E65A7F]"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 2 8 C 60 3, 180 3, 298 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Clean, readable body subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#171717]/75 font-normal max-w-2xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              {/* Primary CTA (Pink #E65A7F) */}
              <button
                id="hero-btn-primary"
                onClick={onOpenContactModal}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white font-bold text-sm sm:text-base tracking-tight transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#E65A7F]/30 flex items-center gap-2"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              {/* Secondary CTA (Clean border, Orange hover #FB5D2E) */}
              <button
                id="hero-btn-secondary"
                onClick={onScrollToServices}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white hover:bg-[#FB5D2E]/5 border border-[#171717]/15 hover:border-[#FB5D2E] text-[#171717] hover:text-[#FB5D2E] font-bold text-sm sm:text-base tracking-tight transition-all"
              >
                <span>{t.hero.secondaryCta}</span>
              </button>

              {/* Studio Direct CTA */}
              <button
                id="hero-btn-studio"
                onClick={onOpenStudio}
                className="px-4 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#171717]/70 hover:text-[#44BDBD] flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-4 h-4 text-[#44BDBD]" />
                <span>{t.hero.studioCta}</span>
              </button>
            </div>

            {/* Key Trust & Performance Metrics */}
            <div className="pt-6 sm:pt-8 border-t border-[#171717]/8 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#171717] tracking-tight">100%</div>
                <div className="text-xs text-[#171717]/60 font-medium mt-0.5">{t.hero.metrics.aiModels}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#171717] tracking-tight">0 Telif</div>
                <div className="text-xs text-[#171717]/60 font-medium mt-0.5">{t.hero.metrics.commercialSafe}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#171717] tracking-tight">10x</div>
                <div className="text-xs text-[#171717]/60 font-medium mt-0.5">{t.hero.metrics.speed}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Refined 3D Plush Brand Artifact & Live Model Showcase Preview (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Card with subtle tactile radius and clean border */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#171717]/8 shadow-xl shadow-black/4 space-y-6 relative overflow-hidden">
                {/* Puffy Logo Presentation inside a pristine plush badge */}
                <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#171717]/6 flex flex-col items-center justify-center text-center relative">
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#171717]/40 mb-3">
                    MARKA İMZASI & DİJİTAL KARAKTER
                  </span>
                  <GuzelAiLogo size="lg" variant="light-bg" showSubtitle={true} />
                  <p className="text-xs text-[#171717]/60 mt-4 max-w-xs leading-relaxed">
                    {t.hero.brandStatement}
                  </p>
                </div>

                {/* AI Models Live Thumbnail Strip */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#171717]">Sentetik AI Marka Yüzleri</span>
                    <span className="text-[11px] font-semibold text-[#44BDBD] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Canlı Stüdyo
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { name: "Scarlett", role: "Fashion", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" },
                      { name: "Mei Lin", role: "K-Beauty", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80" },
                      { name: "Elena", role: "High-End", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80" },
                      { name: "Mateo", role: "Streetwear", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" },
                    ].map((m, i) => (
                      <button
                        key={i}
                        onClick={onOpenStudio}
                        className="group relative rounded-xl overflow-hidden aspect-[3/4] border border-[#171717]/8 text-left transition transform hover:scale-105"
                      >
                        <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent opacity-90 group-hover:opacity-100" />
                        <div className="absolute bottom-1.5 left-1.5 right-1.5 text-white">
                          <div className="text-[10px] font-bold leading-tight">{m.name}</div>
                          <div className="text-[8px] text-white/70">{m.role}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Action Bar */}
                <button
                  onClick={onOpenStudio}
                  className="w-full py-3 px-4 rounded-xl bg-[#171717] hover:bg-[#262626] text-white text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <Zap className="w-4 h-4 text-[#FBC056]" />
                  <span>Stüdyo Çekimini & 6 Açıyı Hemen Test Et</span>
                </button>
              </div>

              {/* Floating Soft Badge: Zero Copyright License */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur px-3.5 py-2 rounded-xl border border-[#41631E]/20 text-[#41631E] shadow-lg flex items-center gap-2 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-[#41631E]" />
                <span>%100 Telifsiz Ticari Güvence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
