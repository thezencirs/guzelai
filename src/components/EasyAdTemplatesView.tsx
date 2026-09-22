import React, { useState } from "react";
import { AdCategory, AdTemplateItem, StoryboardSceneItem } from "../types";
import { AD_TEMPLATES } from "../data/adTemplates";
import {
  Sparkles,
  Zap,
  Film,
  Camera,
  Play,
  CheckCircle2,
  Layers,
  Music,
  ShieldCheck,
  ChevronRight,
  Clock,
  Volume2,
  ArrowRight,
  Eye,
} from "lucide-react";

interface EasyAdTemplatesViewProps {
  onApplyTemplate: (template: AdTemplateItem, directExecuteShoot?: boolean) => void;
  onSendToVideoStudio: (startImg: string, endImg: string, promptText: string) => void;
  onViewLegalLicense: () => void;
}

export const EasyAdTemplatesView: React.FC<EasyAdTemplatesViewProps> = ({
  onApplyTemplate,
  onSendToVideoStudio,
  onViewLegalLicense,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AdCategory>("all");
  const [activeStoryboardTemplate, setActiveStoryboardTemplate] = useState<AdTemplateItem | null>(null);

  const categories: { id: AdCategory; label: string; icon: string }[] = [
    { id: "all", label: "Tüm Şablonlar", icon: "✨" },
    { id: "fashion_tryon", label: "Moda & Try-On", icon: "👗" },
    { id: "sneaker_sports", label: "Sneaker & Spor", icon: "👟" },
    { id: "ugc_podcast", label: "UGC & Podcast", icon: "🎙️" },
    { id: "cinematic_storyboard", label: "Sinematik Storyboard", icon: "🎬" },
    { id: "beauty_cosmetics", label: "Kozmetik & Cam Ten", icon: "💄" },
    { id: "home_lifestyle", label: "Ev & Mobilya", icon: "🛋️" },
  ];

  const filteredTemplates = AD_TEMPLATES.filter((tpl) => {
    if (selectedCategory === "all") return true;
    return tpl.category === selectedCategory;
  });

  // Highlight sample template (the leather outfit from Video 6)
  const sampleTemplate = AD_TEMPLATES[0];

  return (
    <div id="easy-ad-templates-view" className="flex-1 bg-neutral-950 text-white min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur sticky top-0 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">
              Yapay Zeka Kolay Reklam Şablonları & Storyboard Kütüphanesi
            </h1>
            <p className="text-xs text-neutral-400">
              Kategorize edilmiş hazır reklam şablonları &bull; Tek tıkla manken, ürün ve kurguyu başlatın
            </p>
          </div>
        </div>

        <button
          onClick={onViewLegalLicense}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 text-xs font-semibold hover:bg-emerald-900/40 transition self-start sm:self-auto"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>%100 Telifsiz Ticari Güvence</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* Interactive 1-Click Execution Demo Banner (Fulfilling "örnek bir işlemde sen yap") */}
        <div className="bg-gradient-to-r from-purple-950/70 via-neutral-900 to-indigo-950/70 border-2 border-purple-500/50 rounded-2xl p-5 md:p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>Canlı Örnek İşlem: myAIwear Lookbook & Deri Kıyafet</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Tek Tıkla Örnek Reklamı Çalıştır & Test Et
              </h2>
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                Videodaki kurguyu sizin için hazır getirdik: <strong>Scarlett Vance</strong> mankeni üzerinde{" "}
                <strong>Kahverengi Deri Büstiyer Elbise</strong>, <strong>Siyah Rugan Çizme</strong> ve{" "}
                <strong>İtalyan Omuz Çantası</strong>. Tek tıkla stüdyoya aktarıp 6 farklı açıda katalog çıktısını ve
                robotik kamera videosunu hemen oluşturun!
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-300 pt-1">
                <span className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 6 Kamera Açısı
                </span>
                <span className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Robotic Camera Video
                </span>
                <span className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Sıfır Telif Riski
                </span>
              </div>
            </div>

            {/* Quick Launch Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
              <button
                id="btn-run-interactive-sample"
                onClick={() => onApplyTemplate(sampleTemplate, true)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-purple-900/50 transition transform hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Bu Örnek İşlemi Hemen Başlat</span>
              </button>
              <button
                onClick={() => onApplyTemplate(sampleTemplate, false)}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-neutral-700 transition"
              >
                <span>Stüdyo Adımlarını Kendim İncele</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                  isSelected
                    ? "bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-950"
                    : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const hasStoryboard = !!template.storyboardBreakdown;

            return (
              <div
                key={template.id}
                id={`ad-template-card-${template.id}`}
                className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  {/* Top Image Preview */}
                  <div className="aspect-[16/10] bg-neutral-850 relative overflow-hidden">
                    <img
                      src={template.thumbnail}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur text-[10px] font-bold text-white border border-white/10 uppercase tracking-wider">
                        {template.badge}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-purple-600/80 backdrop-blur text-[10px] font-semibold text-white">
                        {template.categoryLabel}
                      </span>
                    </div>

                    {/* Model Info Tag */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <img
                        src={template.modelAvatar}
                        alt={template.modelName}
                        className="w-7 h-7 rounded-full object-cover border border-purple-400"
                      />
                      <div className="text-left">
                        <div className="text-[11px] font-bold text-white leading-tight">{template.modelName}</div>
                        <div className="text-[9px] text-neutral-300">Yapay Zeka Manken</div>
                      </div>
                    </div>

                    {/* Storyboard pill if present */}
                    {hasStoryboard && (
                      <button
                        onClick={() => setActiveStoryboardTemplate(template)}
                        className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500/90 text-neutral-950 text-[10px] font-bold flex items-center gap-1 shadow hover:bg-amber-400 transition"
                      >
                        <Clock className="w-3 h-3" />
                        <span>15s Storyboard İncele</span>
                      </button>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-sm font-bold text-white leading-snug">{template.title}</h3>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {template.description}
                      </p>
                    </div>

                    {/* Products Included */}
                    <div className="space-y-1 pt-1 border-t border-neutral-800">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                        Hazır Ürün Parçaları:
                      </span>
                      <div className="flex flex-col gap-1">
                        {Object.values(template.products).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-[11px] text-neutral-300 bg-neutral-950 px-2 py-1 rounded-md border border-neutral-800"
                          >
                            <img src={item.image} alt={item.title} className="w-4 h-4 rounded object-cover" />
                            <span className="truncate">{item.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Suggested Music */}
                    <div className="flex items-center gap-1.5 text-[10px] text-purple-300/90 bg-purple-950/40 p-2 rounded-lg border border-purple-900/50">
                      <Music className="w-3 h-3 text-purple-400 shrink-0" />
                      <span className="truncate">Fon Müziği: {template.presetConfiguration.suggestedAudioTrack}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
                  <button
                    id={`btn-apply-template-${template.id}`}
                    onClick={() => onApplyTemplate(template, true)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow transition"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Şablonu Çalıştır</span>
                  </button>

                  <button
                    onClick={() =>
                      onSendToVideoStudio(
                        template.modelAvatar,
                        template.thumbnail,
                        template.fullPrompt
                      )
                    }
                    className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-semibold flex items-center gap-1 transition"
                    title="Video Stüdyosuna Gönder"
                  >
                    <Film className="w-3.5 h-3.5 text-pink-400" />
                    <span>Video</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Storyboard Detail Modal (Specifically for Seedance 2.0 and rich scripts) */}
      {activeStoryboardTemplate && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveStoryboardTemplate(null)}
        >
          <div
            className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between sticky top-0 bg-neutral-900/95 backdrop-blur z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">{activeStoryboardTemplate.title}</h2>
                  <p className="text-xs text-neutral-400">
                    Saniye Saniye Kamera Hareketleri & Foley Ses Planı (Seedance 2.0 Standartı)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveStoryboardTemplate(null)}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold"
              >
                Kapat
              </button>
            </div>

            {/* Modal Timeline Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {activeStoryboardTemplate.storyboardBreakdown?.map((scene, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-14 px-2 py-1 rounded bg-purple-600/20 text-purple-300 border border-purple-500/30 font-mono text-xs font-bold text-center shrink-0">
                        {scene.timeCode}
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{scene.shotType}</span>
                        </div>
                        <p className="text-xs text-neutral-300">{scene.action}</p>
                        <div className="text-[11px] text-amber-400/90 font-medium flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>Görsel İpucu: {scene.visualCue}</span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:max-w-xs shrink-0 text-left sm:text-right text-[11px] text-neutral-400 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                      <div className="text-[10px] uppercase font-bold text-purple-400 mb-0.5 flex items-center sm:justify-end gap-1">
                        <Volume2 className="w-3 h-3" />
                        <span>Foley & Ses Efekti</span>
                      </div>
                      <div>{scene.foleyAudio}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-end gap-3 sticky bottom-0">
              <button
                onClick={() => {
                  onApplyTemplate(activeStoryboardTemplate, true);
                  setActiveStoryboardTemplate(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Bu Şablonla Reklam Üretimini Başlat</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
