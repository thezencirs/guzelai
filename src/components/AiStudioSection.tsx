import React, { useState } from "react";
import { TranslationSchema } from "../i18n/translations";
import { AIModel } from "../types";
import { AI_MODELS } from "../data/models";
import {
  Sparkles,
  ShieldCheck,
  Camera,
  Layers,
  Video,
  ArrowRight,
  Zap,
  CheckCircle2,
  Maximize2,
} from "lucide-react";

interface AiStudioSectionProps {
  t: TranslationSchema;
  onSelectModelAndLaunch?: (model: AIModel) => void;
  onOpenFullStudio?: () => void;
  onSelectModel?: (model: AIModel) => void;
  onOpenStudio?: () => void;
}

export const AiStudioSection: React.FC<AiStudioSectionProps> = ({
  t,
  onSelectModelAndLaunch,
  onOpenFullStudio,
  onSelectModel,
  onOpenStudio,
}) => {
  const [activeModel, setActiveModel] = useState<AIModel>(AI_MODELS[0]);
  const [activeTab, setActiveTab] = useState<"catalog" | "angles" | "video">("catalog");

  const handleSelectModel = (model: AIModel) => {
    if (onSelectModelAndLaunch) onSelectModelAndLaunch(model);
    else if (onSelectModel) onSelectModel(model);
  };

  const handleOpenStudio = () => {
    if (onOpenFullStudio) onOpenFullStudio();
    else if (onOpenStudio) onOpenStudio();
  };

  // Sample 6 camera angles preview for active model
  const cameraAnglePreviews = activeModel.galleryImages && activeModel.galleryImages.length > 1 ? [
    { name: "1. Ferrari 360 Kapı Eşiği (Candid Reel)", img: activeModel.galleryImages[1] || activeModel.fullBodyImage },
    { name: "2. Günbatımı Sahil Yolu Kaput Çekimi", img: activeModel.galleryImages[2] || activeModel.fullBodyImage },
    { name: "3. Portre & Kırmızı Fiyonk (Headshot)", img: activeModel.galleryImages[0] || activeModel.avatar },
    { name: "4. Lüks Lifestyle & Ayak Detay", img: activeModel.galleryImages[1] || activeModel.fullBodyImage },
    { name: "5. Akdeniz Altın Saat Işıltısı", img: activeModel.galleryImages[2] || activeModel.fullBodyImage },
    { name: "6. Kırmızı Mini Elbise & Süper Otomobil", img: activeModel.galleryImages[1] || activeModel.avatar },
  ] : [
    { name: "1. Ön Katalog (Frontal)", img: activeModel.fullBodyImage || activeModel.avatar },
    { name: "2. Sol Profil 45°", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80" },
    { name: "3. Low Angle Hero", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80" },
    { name: "4. Yüz & Makyaj Makro", img: activeModel.avatar },
    { name: "5. Podyum Duruşu", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80" },
    { name: "6. Doku & Detay Odak", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80" },
  ];

  return (
    <section
      id="ai-studio-section"
      className="py-20 sm:py-28 bg-[#171717] text-white relative overflow-hidden border-b border-white/10"
    >
      {/* Controlled subtle ambient lighting in Turquoise (#44BDBD) and Lavender (#B8A1CF) */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#44BDBD]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#B8A1CF]/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#44BDBD]/15 border border-[#44BDBD]/30 text-[#44BDBD] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.aiSection.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t.aiSection.title}
            </h2>
            <p className="text-base text-white/70 font-normal leading-relaxed">
              {t.aiSection.subtitle}
            </p>
          </div>

          <button
            onClick={handleOpenStudio}
            className="self-start md:self-auto px-6 py-3 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white text-xs sm:text-sm font-bold tracking-tight transition shadow-lg shadow-[#E65A7F]/30 flex items-center gap-2 shrink-0"
          >
            <span>{t.aiSection.ctaLaunchFullStudio}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Feature Badges (Restrained styling) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#41631E]/30 text-[#6db333] border border-[#41631E]/40 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">{t.aiSection.features.zeroCopyright.title}</h4>
            <p className="text-xs text-white/60 leading-relaxed">{t.aiSection.features.zeroCopyright.desc}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#44BDBD]/20 text-[#44BDBD] border border-[#44BDBD]/30 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">{t.aiSection.features.multiAngle.title}</h4>
            <p className="text-xs text-white/60 leading-relaxed">{t.aiSection.features.multiAngle.desc}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#FB5D2E]/20 text-[#FB5D2E] border border-[#FB5D2E]/30 flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">{t.aiSection.features.roboticVideo.title}</h4>
            <p className="text-xs text-white/60 leading-relaxed">{t.aiSection.features.roboticVideo.desc}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#B8A1CF]/20 text-[#B8A1CF] border border-[#B8A1CF]/30 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">{t.aiSection.features.virtualTryOn.title}</h4>
            <p className="text-xs text-white/60 leading-relaxed">{t.aiSection.features.virtualTryOn.desc}</p>
          </div>
        </div>

        {/* Interactive AI Model Studio Preview (Live Interaction) */}
        <div className="bg-[#1F1F1F] rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#44BDBD]">
                {t.aiSection.rosterBadge}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {t.aiSection.rosterTitle}
              </h3>
            </div>

            {/* Model Roster Quick Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {AI_MODELS.slice(0, 8).map((model) => {
                const isSelected = activeModel.id === model.id;
                return (
                  <button
                    key={model.id}
                    onClick={() => setActiveModel(model)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                      isSelected
                        ? "bg-[#E65A7F] border-[#E65A7F] text-white shadow-md shadow-[#E65A7F]/30"
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-white/70"
                    }`}
                  >
                    <img src={model.avatar} alt={model.name} className="w-5 h-5 rounded-full object-cover" />
                    <span>{model.name}</span>
                    {model.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/20 text-white font-mono">
                        {model.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Model Spotlight & 6-Angle Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Model Profile Card (4 cols) */}
            <div className="lg:col-span-4 bg-[#171717] rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <img
                  src={activeModel.fullBodyImage || activeModel.avatar}
                  alt={activeModel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur text-[10px] font-bold text-[#44BDBD] border border-white/10">
                    100% Sentetik AI
                  </span>
                  {activeModel.isBrandCollabReady && (
                    <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-rose-500 to-amber-500 text-[9px] font-extrabold text-white shadow">
                      ★ MARKA İŞBİRLİĞİ
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-black/80 backdrop-blur">
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>{activeModel.name}</span>
                    {activeModel.stats && (
                      <span className="text-[10px] text-amber-400 font-medium">
                        {activeModel.stats.engagementRate} Etkileşim
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-white/70">{activeModel.niche || activeModel.title} &bull; {activeModel.ethnicity || activeModel.nationalityVibe}</div>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-white/40 uppercase font-bold text-[10px]">Stil & Uzmanlık</div>
                <div className="text-white/80">{activeModel.bio}</div>
              </div>

              <button
                onClick={() => handleSelectModel(activeModel)}
                className="w-full py-2.5 rounded-xl bg-[#E65A7F] hover:bg-[#D9496F] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
              >
                <Zap className="w-3.5 h-3.5 text-[#FBC056]" />
                <span>{t.aiSection.useModelBtn}</span>
              </button>
            </div>

            {/* 6 Camera Angles Synchronized Output (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#44BDBD]" />
                  <span>Tek Çekimde Senkronize 6 Kamera Açısı:</span>
                </div>
                <span className="text-[11px] text-white/50">8K Commercial Ultra-Sharp</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cameraAnglePreviews.map((angle, idx) => (
                  <div
                    key={idx}
                    className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-black border border-white/10"
                  >
                    <img
                      src={angle.img}
                      alt={angle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-white leading-tight">
                      {angle.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
