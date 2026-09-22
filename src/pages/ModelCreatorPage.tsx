import React from "react";
import { TranslationSchema } from "../i18n/translations";
import { ModelCreatorStudio } from "../components/ModelCreatorStudio";
import { AIModel } from "../types";
import {
  ArrowLeft,
  Gamepad2,
  Sparkles,
  Zap,
  Globe,
  Film,
  Download,
  Share2,
  Layers,
} from "lucide-react";

interface ModelCreatorPageProps {
  t: TranslationSchema;
  onNavigateHome: () => void;
  onNavigateClips: () => void;
  onNavigateWebsites: () => void;
  onNavigateAuth: () => void;
  onDeployModelToRoster: (model: AIModel) => void;
  onOpenFullStudio: (tab?: string) => void;
}

export const ModelCreatorPage: React.FC<ModelCreatorPageProps> = ({
  t,
  onNavigateHome,
  onNavigateClips,
  onNavigateWebsites,
  onNavigateAuth,
  onDeployModelToRoster,
  onOpenFullStudio,
}) => {
  return (
    <div className="min-h-screen bg-[#090B10] text-white transition-all">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-[#090B10]/90 backdrop-blur-md border-b border-white/10 sticky top-20 z-30 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              id="model-creator-page-back-btn"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfa</span>
            </button>
            <div className="h-4 w-[1px] bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-white/50">Sayfa /</span>
              <h1 className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4 text-amber-400" />
                <span>Model Üret (AI & Metaverse Influencer Stüdyosu)</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-gradient-to-r from-[#E65A7F]/30 to-[#44BDBD]/30 text-amber-200 border border-white/15 font-black">
              UNREAL ENGINE 5 & UNITY RIG READY
            </span>
            <button
              onClick={onNavigateClips}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition flex items-center gap-1.5"
            >
              <Film className="w-3.5 h-3.5 text-[#E65A7F]" />
              <span>Klipler Sayfası</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Sub-header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#E65A7F]/20 to-[#44BDBD]/20 border border-white/20 text-amber-300 text-xs font-extrabold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D Karakter Laboratuvarı</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white">
              Yapay Zeka Manken & Metaverse Karakteri Üret
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-2 font-medium">
              Yüz hatlarından etnik kökene, mimik blendshape'lerinden Unreal Engine ve Unity
              kemik sistemine kadar sıfırdan marka elçisi oluşturun.
            </p>
          </div>

          {/* Supported Engines Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {["Unreal Engine 5", "Unity Humanoid", "Roblox VRM", ".GLB / .FBX 4K"].map((engine) => (
              <div
                key={engine}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono font-bold text-white/80"
              >
                {engine}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Model Creator Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-24">
        <ModelCreatorStudio
          t={t}
          onDeployModelToRoster={(model) => {
            onDeployModelToRoster(model);
          }}
          onNavigateToClips={onNavigateClips}
          onNavigateToDressUp={() => {
            onOpenFullStudio("dress_up");
          }}
        />

        {/* Quick Navigation Footer Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={onNavigateClips}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E65A7F]/40 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between">
              <Film className="w-6 h-6 text-[#E65A7F]" />
              <span className="text-[10px] font-mono text-white/50">9:16 REELS</span>
            </div>
            <h4 className="font-bold text-white mt-3 group-hover:text-[#E65A7F] transition">
              Klipler Sayfasına Git
            </h4>
            <p className="text-xs text-white/60 mt-1">
              Ürettiğin karakterle anında viral 9:16 Instagram Reels ve TikTok reklam filmi çek.
            </p>
          </div>

          <div
            onClick={onNavigateWebsites}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#44BDBD]/40 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between">
              <Globe className="w-6 h-6 text-[#44BDBD]" />
              <span className="text-[10px] font-mono text-white/50">3D WEB</span>
            </div>
            <h4 className="font-bold text-white mt-3 group-hover:text-[#44BDBD] transition">
              Sinematik Web Tasarımları
            </h4>
            <p className="text-xs text-white/60 mt-1">
              Karakterini 3D interaktif WebGL vitrinine veya lüks marka web sitesine yerleştir.
            </p>
          </div>

          <div
            onClick={onNavigateAuth}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span className="text-[10px] font-mono text-amber-400 font-bold">+50 KREDİ</span>
            </div>
            <h4 className="font-bold text-white mt-3 group-hover:text-amber-400 transition">
              Hesabım & Kredilerim
            </h4>
            <p className="text-xs text-white/60 mt-1">
              Ürettiğin karakterleri ve modelleri kalıcı olarak profilinde sakla.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelCreatorPage;

