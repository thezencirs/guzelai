import React from "react";
import { Sparkles, Video, Wand2, Compass, Clapperboard, Layers, Volume2, VolumeX } from "lucide-react";

interface HeaderProps {
  activeTab: "roster" | "dressup" | "director" | "moodboard";
  setActiveTab: (tab: "roster" | "dressup" | "director" | "moodboard") => void;
  onOpenCampaignModal: () => void;
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCampaignModal,
  soundEnabled,
  setSoundEnabled,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("roster")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-amber-400 p-[1.5px] shadow-lg shadow-rose-950/50">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-rose-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-rose-200 via-purple-200 to-amber-200 bg-clip-text text-transparent">
                guzelai
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Media & Model Agency
              </span>
            </div>
            <p className="text-xs text-neutral-400 hidden sm:block">
              Yapay Zeka Mankenlik, Güzellik Rutinleri & Video Reklam Stüdyosu
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-neutral-900/80 p-1 rounded-xl border border-neutral-800 overflow-x-auto">
          <button
            id="tab-roster-btn"
            onClick={() => setActiveTab("roster")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "roster"
                ? "bg-rose-600 text-white shadow-md shadow-rose-900/40"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Mankenler & Güzellik</span>
          </button>

          <button
            id="tab-dressup-btn"
            onClick={() => setActiveTab("dressup")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "dressup"
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>Giydirme & Stil Laboratuvarı</span>
          </button>

          <button
            id="tab-director-btn"
            onClick={() => setActiveTab("director")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "director"
                ? "bg-amber-600 text-white shadow-md shadow-amber-900/40"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Clapperboard className="w-4 h-4" />
            <span>Video & Kamera Yönetmeni</span>
          </button>

          <button
            id="tab-moodboard-btn"
            onClick={() => setActiveTab("moodboard")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "moodboard"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>İlham Panosu</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="toggle-sound-btn"
            onClick={() => setSoundEnabled((prev) => !prev)}
            title={soundEnabled ? "Sesi Kapat" : "Sesi Aç"}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-200 bg-neutral-900 border border-neutral-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-rose-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            id="open-campaign-generator-btn"
            onClick={onOpenCampaignModal}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white shadow-lg shadow-rose-950/40 hover:opacity-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Yeni Reklam Üret</span>
          </button>
        </div>
      </div>
    </header>
  );
};
