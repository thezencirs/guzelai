import React, { useState } from "react";
import { GeneratedAsset } from "../types";
import { INITIAL_GENERATED_GALLERY } from "../data/photoshootPresets";
import {
  Camera,
  Video,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Search,
  Filter,
  Maximize2,
  ExternalLink,
} from "lucide-react";

interface GalleryViewProps {
  onSendToVideo: (startImg: string, endImg: string, promptText: string) => void;
  onViewLegalLicense: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  onSendToVideo,
  onViewLegalLicense,
}) => {
  const [items, setItems] = useState<GeneratedAsset[]>(INITIAL_GENERATED_GALLERY);
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<GeneratedAsset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ambiance.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="gallery-view-container" className="flex-1 bg-neutral-950 text-white min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur sticky top-0 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">Your Images & Multi-Angle Catalog</h1>
            <p className="text-xs text-neutral-400">Üretilen ticari katalog çekimleri, kamera açıları ve AI videolar</p>
          </div>
        </div>

        {/* Search & Filter pills */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Model, ürün veya ambiyans ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-neutral-850 border border-neutral-750 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 w-48 sm:w-60"
            />
          </div>

          <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setFilterType("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filterType === "all" ? "bg-purple-600 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Tümü ({items.length})
            </button>
            <button
              onClick={() => setFilterType("image")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filterType === "image" ? "bg-purple-600 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Görseller
            </button>
            <button
              onClick={() => setFilterType("video")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filterType === "video" ? "bg-purple-600 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Videolar
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/40 rounded-2xl border border-neutral-800">
            <p className="text-sm text-neutral-400">Aramanızla eşleşen çekim bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((asset) => (
              <div
                key={asset.id}
                id={`gallery-card-${asset.id}`}
                className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition flex flex-col justify-between group shadow-md"
              >
                <div>
                  <div className="aspect-[3/4] bg-neutral-850 relative overflow-hidden">
                    <img
                      src={asset.imageUrl}
                      alt={asset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] font-bold text-white uppercase border border-white/10 flex items-center gap-1">
                        {asset.type === "video" ? <Video className="w-3 h-3 text-pink-400" /> : <Camera className="w-3 h-3 text-purple-400" />}
                        {asset.type}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] font-mono text-neutral-300">
                        {asset.aspectRatio}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <button
                        onClick={onViewLegalLicense}
                        className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 text-[10px] font-bold flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Lisanslı</span>
                      </button>
                    </div>

                    {/* Hover Overlay Controls */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedAsset(asset)}
                        className="p-2 rounded-xl bg-white/20 backdrop-blur hover:bg-white/30 text-white"
                        title="Önizle"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                      <a
                        href={asset.imageUrl}
                        download={`${asset.id}.jpg`}
                        className="p-2 rounded-xl bg-white/20 backdrop-blur hover:bg-white/30 text-white"
                        title="İndir"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="p-3.5 space-y-1">
                    <h3 className="text-xs font-bold text-white line-clamp-1">{asset.title}</h3>
                    <p className="text-[11px] text-neutral-400">{asset.ambiance}</p>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800">
                      <span>Model: <strong className="text-neutral-300">{asset.modelName}</strong></span>
                      <span>{asset.createdAt}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
                  <button
                    onClick={() => handleCopyPrompt(asset.id, asset.prompt)}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-medium flex items-center justify-center gap-1 border border-neutral-700"
                  >
                    {copiedId === asset.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === asset.id ? "Kopyalandı" : "Prompt"}</span>
                  </button>

                  <button
                    onClick={() => onSendToVideo(asset.imageUrl, asset.imageUrl, asset.prompt)}
                    className="py-1.5 px-3 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-800 text-[11px] font-semibold flex items-center gap-1"
                  >
                    <Video className="w-3 h-3" />
                    <span>Video Yap</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Fullscreen Lightbox Modal */}
      {selectedAsset && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:w-1/2 aspect-[3/4] bg-black">
              <img src={selectedAsset.imageUrl} alt={selectedAsset.title} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold uppercase">
                    {selectedAsset.type}
                  </span>
                  <button onClick={() => setSelectedAsset(null)} className="text-xs text-neutral-400 hover:text-white">
                    Kapat
                  </button>
                </div>
                <h3 className="text-base font-bold text-white">{selectedAsset.title}</h3>
                <p className="text-xs text-neutral-400">Ambiyans: {selectedAsset.ambiance}</p>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs text-neutral-300 font-mono max-h-32 overflow-y-auto">
                  {selectedAsset.prompt}
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold">Lisans Kodu: {selectedAsset.licenseId}</div>
                    <div className="text-[10px] text-emerald-400/80">Ticari reklam, billboard ve sosyal medya için %100 onaylıdır.</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-neutral-800">
                <a
                  href={selectedAsset.imageUrl}
                  download="guzelai_highres.jpg"
                  className="flex-1 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-neutral-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Yüksek Çözünürlük İndir</span>
                </a>
                <button
                  onClick={() => {
                    onSendToVideo(selectedAsset.imageUrl, selectedAsset.imageUrl, selectedAsset.prompt);
                    setSelectedAsset(null);
                  }}
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Video className="w-4 h-4" />
                  <span>Video Yap</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
