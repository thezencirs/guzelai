import React from "react";
import { TranslationSchema } from "../i18n/translations";
import { Sparkles, Video, PenTool, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import {
  AtelierTailorLines,
  AtelierIllustratorStamp,
  AtelierCropMarks,
  BotanicalIllustratorFlourish,
} from "./IllustratorFlourishes";

interface ServicesSectionProps {
  t: TranslationSchema;
  onOpenContactModal?: () => void;
  onOpenStudio: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  t,
  onOpenContactModal,
  onOpenStudio,
}) => {
  const servicesData = [
    {
      key: "ai",
      categoryNumber: "01",
      icon: Sparkles,
      iconColor: "#44BDBD", // Turquoise
      iconBg: "rgba(68, 189, 189, 0.12)",
      borderColor: "rgba(68, 189, 189, 0.3)",
      data: t.services.items.ai,
      hasStudioLink: true,
    },
    {
      key: "content",
      categoryNumber: "02",
      icon: Video,
      iconColor: "#E65A7F", // Pink
      iconBg: "rgba(230, 90, 127, 0.12)",
      borderColor: "rgba(230, 90, 127, 0.3)",
      data: t.services.items.content,
      hasStudioLink: false,
    },
    {
      key: "design",
      categoryNumber: "03",
      icon: PenTool,
      iconColor: "#B8A1CF", // Lavender
      iconBg: "rgba(184, 161, 207, 0.18)",
      borderColor: "rgba(184, 161, 207, 0.35)",
      data: t.services.items.design,
      hasStudioLink: false,
    },
    {
      key: "digitalMedia",
      categoryNumber: "04",
      icon: TrendingUp,
      iconColor: "#FB5D2E", // Orange
      iconBg: "rgba(251, 93, 46, 0.12)",
      borderColor: "rgba(251, 93, 46, 0.3)",
      data: t.services.items.digitalMedia,
      hasStudioLink: false,
    },
  ];

  return (
    <section id="services-section" className="relative py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#171717]/8 overflow-hidden">
      {/* Atelier Corner Crop Marks */}
      <AtelierCropMarks className="opacity-25" />

      {/* Decorative Atelier Sketch Lines */}
      <div className="absolute right-8 top-12 hidden lg:block opacity-30 pointer-events-none">
        <AtelierTailorLines />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-3xl">
          <div className="space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#E65A7F]">
              {t.services.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight">
              {t.services.title}
            </h2>
            <p className="text-base text-[#171717]/70 font-normal leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid (Clean, tactile, card bg is #FAF8F5 / white with subtle rgba(23,23,23,0.08) border) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {servicesData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-[#171717]/8 hover:border-[#171717]/20 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-black/3 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  {/* Top Bar inside Card: Subtle Icon with brand color + Number marker */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: item.iconBg }}
                    >
                      <Icon className="w-6 h-6" style={{ color: item.iconColor }} />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#171717]/30">
                      {item.categoryNumber}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight">
                      {item.data.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#171717]/50">
                      {item.data.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#171717]/75 font-normal leading-relaxed">
                    {item.data.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="pt-2 border-t border-[#171717]/6 space-y-2.5">
                    {item.data.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#171717]/85">
                        <CheckCircle2 className="w-4 h-4 text-[#41631E] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-8 flex items-center justify-between border-t border-[#171717]/6 mt-6">
                  {item.hasStudioLink ? (
                    <button
                      onClick={onOpenStudio}
                      className="text-xs sm:text-sm font-bold text-[#171717] hover:text-[#44BDBD] flex items-center gap-2 transition"
                    >
                      <span>AI Model Stüdyosunu Başlat</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={onOpenContactModal}
                      className="text-xs sm:text-sm font-bold text-[#171717] hover:text-[#E65A7F] flex items-center gap-2 transition"
                    >
                      <span>Detaylı Bilgi & Teklif Al</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
