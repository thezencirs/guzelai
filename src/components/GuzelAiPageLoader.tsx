import React from "react";
import { GuzelAiLogo } from "./GuzelAiLogo";
import { Sparkles } from "lucide-react";

interface GuzelAiPageLoaderProps {
  label?: string;
  variant?: "page" | "studio" | "inline";
}

export const GuzelAiPageLoader: React.FC<GuzelAiPageLoaderProps> = ({
  label = "GuzelAI Medya Hazırlanıyor...",
  variant = "page",
}) => {
  if (variant === "inline") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-center p-8 text-neutral-400 space-x-3 text-xs font-mono"
      >
        <div className="w-4 h-4 rounded-full border-2 border-[#E65A7F] border-t-transparent animate-spin" />
        <span>{label}</span>
      </div>
    );
  }

  if (variant === "studio") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="min-h-[500px] w-full flex flex-col items-center justify-center p-8 bg-[#0F0F0F] rounded-2xl border border-white/5 space-y-6 text-center"
      >
        {/* Animated Brand Emblem */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#E65A7F]/20 to-[#44BDBD]/20 border border-white/10 flex items-center justify-center backdrop-blur-md animate-pulse">
            <Sparkles className="w-7 h-7 text-[#E65A7F]" />
          </div>
          <div className="absolute -inset-2 rounded-2xl border border-[#E65A7F]/30 animate-ping opacity-25 pointer-events-none" />
        </div>

        <div className="space-y-2 max-w-xs">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#44BDBD] font-bold">
            Studio Engine &bull; Code Splitting
          </span>
          <p className="text-sm font-semibold text-white/90 tracking-tight">
            {label}
          </p>
          <p className="text-xs text-neutral-400 font-normal">
            Bileşen dinamik olarak ayrıştırılıyor ve yükleniyor.
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#E65A7F] via-[#44BDBD] to-[#E65A7F] animate-[shimmer_1.5s_infinite_linear] w-[60%] rounded-full" />
        </div>
      </div>
    );
  }

  // Default "page" variant
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6 bg-[#FAF8F5]"
    >
      <div className="transform hover:scale-105 transition-transform duration-300">
        <GuzelAiLogo size="md" variant="light-bg" showSubtitle={true} />
      </div>

      <div className="space-y-2 max-w-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E65A7F]/10 text-[#E65A7F] text-[10px] font-mono font-bold uppercase tracking-widest">
          <Sparkles className="w-3 h-3 animate-spin" />
          <span>Hızlı Yükleme &bull; Kod Ayrıştırma</span>
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-[#171717] tracking-tight">
          {label}
        </h3>
        <p className="text-xs text-[#171717]/60 leading-relaxed font-medium">
          Daha hızlı bir deneyim için modül isteğe bağlı olarak yükleniyor.
        </p>
      </div>

      {/* Luxury Loading Line */}
      <div className="w-56 h-1 bg-[#171717]/10 rounded-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E65A7F] to-transparent animate-pulse" />
      </div>
    </div>
  );
};
