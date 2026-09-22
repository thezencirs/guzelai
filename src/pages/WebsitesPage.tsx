import React from "react";
import { TranslationSchema } from "../i18n/translations";
import { CinematicWebSitesSection } from "../components/CinematicWebSitesSection";
import {
  ArrowLeft,
  Globe,
  Sparkles,
  Smartphone,
  Monitor,
  Tablet,
  Film,
  Gamepad2,
  Code2,
  Layers,
} from "lucide-react";

interface WebsitesPageProps {
  t: TranslationSchema;
  onNavigateHome: () => void;
  onNavigateClips: () => void;
  onNavigateModelCreator: () => void;
  onNavigateAuth: () => void;
  onOpenContactModal: () => void;
  onOpenFullStudio: (tab?: string) => void;
}

export const WebsitesPage: React.FC<WebsitesPageProps> = ({
  t,
  onNavigateHome,
  onNavigateClips,
  onNavigateModelCreator,
  onNavigateAuth,
  onOpenContactModal,
  onOpenFullStudio,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#171717] transition-all">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#171717]/10 sticky top-20 z-30 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              id="websites-page-back-btn"
              className="px-3.5 py-1.5 rounded-full bg-[#171717]/5 hover:bg-[#171717]/10 text-xs font-bold text-[#171717] flex items-center gap-1.5 transition active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfa</span>
            </button>
            <div className="h-4 w-[1px] bg-[#171717]/20" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#171717]/50">Sayfa /</span>
              <h1 className="text-sm font-black text-[#171717] tracking-tight flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#44BDBD]" />
                <span>Sinematik Tasarım Web Siteleri (3D Director)</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateClips}
              className="px-3 py-1 rounded-full bg-[#171717]/5 hover:bg-[#171717]/10 text-xs font-bold text-[#171717] transition flex items-center gap-1.5"
            >
              <Film className="w-3.5 h-3.5 text-[#E65A7F]" />
              <span>Klipler Sayfası</span>
            </button>
            <button
              onClick={onOpenContactModal}
              className="px-4 py-1.5 rounded-full bg-[#171717] text-white text-xs font-bold hover:bg-[#262626] transition shadow-xs"
            >
              Teklif & Brief Al
            </button>
          </div>
        </div>
      </div>

      {/* Page Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#171717]/10 pb-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#44BDBD]/10 border border-[#44BDBD]/25 text-[#1f8787] text-xs font-extrabold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D İnteraktif & WebGL Mimari</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-[#171717]">
              Sıradan Siteleri Unutun: Sinematik Deneyimler
            </h2>
            <p className="text-sm sm:text-base text-[#171717]/70 mt-2 font-medium">
              3D kamera hareketleri, akıcı parallax geçişler ve WebGL tabanlı lüks marka vitrinleri.
              Kullanıcıların sayfadan çıkmak istemeyeceği ödüllü dijital deneyimler.
            </p>
          </div>

          {/* Device icons preview */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#171717]/10 shadow-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 text-xs font-bold">
              <Monitor className="w-4 h-4 text-[#44BDBD]" />
              <span>Desktop</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 text-xs font-bold">
              <Tablet className="w-4 h-4 text-[#E65A7F]" />
              <span>Tablet</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 text-xs font-bold">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Mobil 3D</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Cinematic Websites Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-24 space-y-12">
        <CinematicWebSitesSection
          t={t}
          onOpenContactModal={onOpenContactModal}
          onOpenFullStudio={onOpenFullStudio}
        />

        {/* Cross Navigation Cards */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#121318] to-[#1E2029] text-white space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#E65A7F]">
                Entegre Prodüksiyon
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Web Sitenize Özel AI Manken & Klipler Ekleyin
              </h3>
              <p className="text-xs text-white/70 mt-1 max-w-xl">
                Web siteniz için tasarladığımız 3D vitrine, doğrudan kendi ürettiğiniz sanal influencer'ı ve 9:16 video klipleri gömün.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateModelCreator}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white text-xs font-black hover:opacity-95 transition shadow-lg flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4 text-amber-300" />
                <span>Model Üret Sayfası</span>
              </button>
              <button
                onClick={onNavigateClips}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
              >
                Klipler Sayfası
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsitesPage;

