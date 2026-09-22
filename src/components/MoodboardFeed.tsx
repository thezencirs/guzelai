import React, { useState } from "react";
import { MoodboardCard } from "../types";
import { MOODBOARD_CARDS } from "../data/moodboard";
import {
  Compass,
  Search,
  Copy,
  CheckCircle,
  Clapperboard,
  Heart,
  Sparkles,
  Layers,
  Camera,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";

interface MoodboardFeedProps {
  onLoadIntoStudio: (card: MoodboardCard) => void;
}

export const MoodboardFeed: React.FC<MoodboardFeedProps> = ({ onLoadIntoStudio }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedCardId, setCopiedCardId] = useState<string | null>(null);
  const [likedCards, setLikedCards] = useState<string[]>([]);
  const [selectedModalCard, setSelectedModalCard] = useState<MoodboardCard | null>(null);

  const categories = [
    { id: "all", label: "Tüm İlhamlar" },
    { id: "dress", label: "Elbise & Podyum" },
    { id: "running_shoes", label: "Koşu Ayakkabısı" },
    { id: "sandals", label: "Sandalet" },
    { id: "lipstick", label: "Ruj & Kozmetik" },
    { id: "nail_polish", label: "Oje & Tırnak" },
    { id: "furniture", label: "Mobilya & Yaşam" },
    { id: "lingerie", label: "İç Giyim & Sütyen" },
    { id: "camera_guide", label: "Kamera & Açı Rehberi" },
  ];

  const filteredCards = MOODBOARD_CARDS.filter((card) => {
    const matchesCat = activeCategory === "all" || card.category === activeCategory;
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyPrompt = (id: string, prompt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt);
    setCopiedCardId(id);
    setTimeout(() => setCopiedCardId(null), 2000);
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Search and Hero Filter Header */}
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Görsel İlham Panosu
              </span>
              <span className="text-xs text-neutral-400">| Pinterest & Moodboard Akışı</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Moda, Kamera Açıları & Reklam İlhamları
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Panoda ara (ör. açı, doku, oje, ayakkabı)..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40"
                  : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry / Bento Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCards.map((card) => {
          const isLiked = likedCards.includes(card.id);
          const isCopied = copiedCardId === card.id;

          return (
            <div
              key={card.id}
              onClick={() => setSelectedModalCard(card)}
              className="group cursor-pointer rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Image Container with dynamic aspect ratio */}
              <div className={`relative w-full ${card.aspectRatio} overflow-hidden bg-neutral-950`}>
                <img
                  src={card.image}
                  alt={card.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Badge (e.g. NANO BANANA, 1 MODEL 4 FITS, CAMERA ANGLES) */}
                <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                  {card.badge}
                </span>

                {/* Like button */}
                <button
                  onClick={(e) => toggleLike(card.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-rose-400 transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                </button>

                {/* Bottom Overlay Info on Image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-sm font-extrabold leading-snug drop-shadow-md">{card.title}</h3>
                  <p className="text-[11px] text-neutral-300 line-clamp-1 mt-0.5">{card.subtitle}</p>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-3.5 space-y-2.5 bg-neutral-900">
                {/* Camera & Lens metadata */}
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <Camera className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{card.cameraSettings}</span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800">
                  <button
                    onClick={(e) => handleCopyPrompt(card.id, card.promptSnippet, e)}
                    className="py-1.5 px-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-bold text-neutral-300 flex items-center justify-center gap-1 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Prompt</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLoadIntoStudio(card);
                    }}
                    className="py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors shadow-md shadow-emerald-950/40"
                  >
                    <Clapperboard className="w-3 h-3" />
                    <span>Stüdyo</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Detail View when clicking on a moodboard card */}
      {selectedModalCard && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedModalCard(null)}
        >
          <div
            className="bg-neutral-900 border border-neutral-800 max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={selectedModalCard.image}
                alt={selectedModalCard.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-black px-3 py-1 rounded-lg bg-black/80 text-emerald-400 border border-emerald-500/30">
                  {selectedModalCard.badge}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-white">{selectedModalCard.title}</h3>
                <p className="text-xs text-neutral-400 mt-1">{selectedModalCard.subtitle}</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Üretim Prompt Formülü:</span>
                  <button
                    onClick={(e) => handleCopyPrompt(selectedModalCard.id, selectedModalCard.promptSnippet, e)}
                    className="text-xs text-neutral-300 hover:text-white flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopyala</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-neutral-300 leading-relaxed">
                  {selectedModalCard.promptSnippet}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                <span>Kamera Düzeni: {selectedModalCard.cameraSettings}</span>
                <button
                  onClick={() => {
                    const card = selectedModalCard;
                    setSelectedModalCard(null);
                    onLoadIntoStudio(card);
                  }}
                  className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
                >
                  Bu Konseptle Stüdyoya Geç
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
