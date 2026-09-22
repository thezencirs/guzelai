import React, { useState } from "react";
import { AIModel, TextureOption, WardrobeOption, AccessoryItem } from "../types";
import {
  AI_MODELS,
  WARDROBE_ITEMS,
  TEXTURE_OPTIONS,
  HAIR_STYLES,
  HAIR_COLORS,
  MAKEUP_PRESETS,
  ACCESSORIES_LIST,
} from "../data/models";
import {
  Sparkles,
  Camera,
  Layers,
  Wand2,
  Clapperboard,
  Check,
  RotateCcw,
  Copy,
  CheckCircle,
  Scissors,
  Palette,
  Glasses,
  Gem,
  ShoppingBag,
  Crown,
  Watch,
  Eye,
  Loader2,
} from "lucide-react";
import { playCameraShutterSound, playSpraySound } from "../utils/speech";

interface DressUpStudioProps {
  currentModel: AIModel;
  onModelChange: (model: AIModel) => void;
  onSendToDirector: (styledConfig: any) => void;
  soundEnabled: boolean;
}

export const DressUpStudio: React.FC<DressUpStudioProps> = ({
  currentModel,
  onModelChange,
  onSendToDirector,
  soundEnabled,
}) => {
  // Styling States
  const [selectedOutfit, setSelectedOutfit] = useState<WardrobeOption>(WARDROBE_ITEMS[0]);
  const [selectedTexture, setSelectedTexture] = useState<TextureOption>(TEXTURE_OPTIONS[0]);
  const [selectedHairStyle, setSelectedHairStyle] = useState(HAIR_STYLES[0]);
  const [selectedHairColor, setSelectedHairColor] = useState(HAIR_COLORS[0]);
  const [selectedMakeup, setSelectedMakeup] = useState(MAKEUP_PRESETS[0]);
  const [activeAccessories, setActiveAccessories] = useState<string[]>(["gold_choker"]);

  // Studio Subtab
  const [activeStudioTab, setActiveStudioTab] = useState<"wardrobe" | "hair" | "makeup" | "accessories">("wardrobe");

  // Gemini Prompt Generation State
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [promptResult, setPromptResult] = useState<{
    prompt: string;
    negativePrompt: string;
    stylingTips: string;
  } | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [snapFlash, setSnapFlash] = useState(false);

  const toggleAccessory = (accId: string) => {
    setActiveAccessories((prev) =>
      prev.includes(accId) ? prev.filter((id) => id !== accId) : [...prev, accId]
    );
    if (soundEnabled) playSpraySound();
  };

  const handleSnapPhoto = () => {
    if (soundEnabled) playCameraShutterSound();
    setSnapFlash(true);
    setTimeout(() => setSnapFlash(false), 300);
  };

  const handleGeneratePrompt = async () => {
    setIsGeneratingPrompt(true);
    try {
      const res = await fetch("/api/gemini/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelName: currentModel.name,
          style: currentModel.style,
          outfit: selectedOutfit.name,
          texture: selectedTexture.name,
          hairStyle: selectedHairStyle.name,
          hairColor: selectedHairColor.name,
          makeup: `${selectedMakeup.name} (Ruj: ${selectedMakeup.lipstick}, Oje: ${selectedMakeup.nailPolish})`,
          accessory: activeAccessories
            .map((id) => ACCESSORIES_LIST.find((a) => a.id === id)?.name)
            .filter(Boolean)
            .join(", ") || "Minimalist, accessories none",
          cameraAngle: "45-degree High Fashion Editorial",
          zoomLevel: "Full body to 3/4 beauty view",
          lighting: "Commercial Softbox & Golden Highlights",
          product: selectedOutfit.name,
        }),
      });

      if (!res.ok) throw new Error("Prompt servisi yanıt vermedi.");
      const data = await res.json();
      setPromptResult(data);
    } catch (e: any) {
      console.error(e);
      setPromptResult({
        prompt: `High fashion editorial of ${currentModel.name}, ${currentModel.style} aesthetic, wearing ${selectedOutfit.name} with ${selectedTexture.name} fabric finish, ${selectedHairColor.name} ${selectedHairStyle.name}, ${selectedMakeup.name}, wearing ${activeAccessories.join(", ")}, cinematic lighting, 8k render, Vogue cover style.`,
        negativePrompt: "deformed, blurry, bad anatomy, flat lighting",
        stylingTips: `${selectedTexture.name} dokusu modelin ten ışıltısıyla kusursuz bir tezat oluşturuyor.`,
      });
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Studio Header & Model Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/90 border border-neutral-800 p-4 sm:p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
              Oyun & Giydirme Stüdyosu
            </span>
            <span className="text-xs text-neutral-400">| Dokular, Saç, Ruj & Aksesuarlar</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Manken Giydirme & Doku Laboratuvarı
          </h2>
        </div>

        {/* Model Switcher Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-neutral-400">Aktif Manken:</span>
          <select
            value={currentModel.id}
            onChange={(e) => {
              const m = AI_MODELS.find((item) => item.id === e.target.value);
              if (m) onModelChange(m);
            }}
            className="bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            {AI_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.style.toUpperCase()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Studio Workspace: Left Mannequin Stage, Right Control Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Mannequin Stage */}
        <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-2xl">
          {/* Flash animation */}
          {snapFlash && (
            <div className="absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-300 opacity-90" />
          )}

          {/* Model Canvas Staging Area */}
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center justify-center group">
            {/* Background Model Layer */}
            <img
              src={currentModel.fullBodyImage || currentModel.avatar}
              alt={currentModel.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top filter brightness-95"
            />

            {/* Dynamic Texture & Outfit Tone Lighting Overlay */}
            <div
              className="absolute inset-0 mix-blend-overlay opacity-35 pointer-events-none transition-all duration-700"
              style={{ background: selectedTexture.cssPattern }}
            />

            {/* Simulated Shimmer & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

            {/* Equipped Badges Overlay on Stage */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-purple-300 border border-purple-500/30">
                {currentModel.style}
              </span>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-neutral-700 text-xs text-neutral-200">
                <span
                  className="w-3 h-3 rounded-full border border-white/30"
                  style={{ background: selectedTexture.cssPattern }}
                />
                <span className="text-[11px] font-semibold">{selectedTexture.name}</span>
              </div>
            </div>

            {/* Top Right: Makeup Quick Indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-neutral-700 text-[11px]">
              <span className="text-neutral-400">Ruj:</span>
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/40"
                style={{ backgroundColor: selectedMakeup.lipstickHex }}
              />
              <span className="text-neutral-400 ml-1">Oje:</span>
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/40"
                style={{ backgroundColor: selectedMakeup.nailHex }}
              />
            </div>

            {/* Equipped Accessories Pills */}
            <div className="absolute bottom-16 left-3 right-3 flex flex-wrap gap-1.5 z-10">
              {activeAccessories.map((accId) => {
                const item = ACCESSORIES_LIST.find((a) => a.id === accId);
                if (!item) return null;
                return (
                  <span
                    key={accId}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-200 border border-purple-500/40 backdrop-blur-sm flex items-center gap-1"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                    {item.name}
                  </span>
                );
              })}
            </div>

            {/* Bottom Bar: Model & Outfit Summary */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
              <div>
                <p className="text-xs text-neutral-300 font-bold">{currentModel.name}</p>
                <p className="text-[11px] text-neutral-400 truncate">{selectedOutfit.name}</p>
              </div>
              <button
                id="snap-studio-photo-btn"
                onClick={handleSnapPhoto}
                title="Poz Fotoğrafı Çek (Deklanşör Sesi)"
                className="p-2.5 rounded-xl bg-white/90 hover:bg-white text-neutral-900 shadow-lg transition-transform active:scale-95"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Stage Actions */}
          <div className="mt-4 flex gap-2">
            <button
              id="send-to-director-studio-btn"
              onClick={() =>
                onSendToDirector({
                  model: currentModel,
                  outfit: selectedOutfit,
                  texture: selectedTexture,
                  hair: selectedHairStyle,
                  hairColor: selectedHairColor,
                  makeup: selectedMakeup,
                  accessories: activeAccessories,
                })
              }
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40 transition-all"
            >
              <Clapperboard className="w-4 h-4" />
              <span>Bu Kombinle Video Yönetmenine Geç</span>
            </button>
          </div>
        </div>

        {/* Right: Wardrobe, Texture, Hair, Makeup & Accessories Studio */}
        <div className="lg:col-span-7 space-y-5">
          {/* Studio Tab Buttons */}
          <div className="grid grid-cols-4 gap-2 bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800">
            {[
              { id: "wardrobe", label: "👗 Kıyafet & Doku" },
              { id: "hair", label: "💇‍♀️ Saç & Renk" },
              { id: "makeup", label: "💄 Ruj & Oje" },
              { id: "accessories", label: "✨ Aksesuar" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveStudioTab(tab.id as any)}
                className={`py-2 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all truncate text-center ${
                  activeStudioTab === tab.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Wardrobe Outfits & Fabric Textures */}
          {activeStudioTab === "wardrobe" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-6">
              {/* Outfits selection */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span>Kıyafet & Silüet Seçimi</span>
                  <span className="text-[10px] text-neutral-400 font-normal">({WARDROBE_ITEMS.length} seçenek)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {WARDROBE_ITEMS.map((item) => {
                    const isSelected = selectedOutfit.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedOutfit(item)}
                        className={`cursor-pointer p-3 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-purple-950/40 border-purple-500 ring-1 ring-purple-500 text-white"
                            : "bg-neutral-950 border-neutral-800 hover:border-neutral-700 text-neutral-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm">{item.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-1">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Texture & Fabric Shading Options */}
              <div className="pt-4 border-t border-neutral-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Kumaş Dokusu & Materyal Finişi</span>
                  </h3>
                  <span className="text-xs text-purple-300 font-semibold">{selectedTexture.name}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TEXTURE_OPTIONS.map((texture) => {
                    const isSelected = selectedTexture.id === texture.id;
                    return (
                      <button
                        key={texture.id}
                        onClick={() => setSelectedTexture(texture)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                          isSelected
                            ? "border-purple-500 ring-2 ring-purple-500/40 bg-neutral-850"
                            : "border-neutral-800 hover:border-neutral-700 bg-neutral-950"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span
                            className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                            style={{ background: texture.cssPattern }}
                          />
                          {isSelected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                        </div>
                        <span className="text-xs font-bold text-neutral-200 truncate">{texture.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Hair Style & Hair Color */}
          {activeStudioTab === "hair" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-6">
              {/* Hairstyle selector */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-purple-400" />
                  <span>Saç Kesimi & Modeli</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {HAIR_STYLES.map((style) => {
                    const isSelected = selectedHairStyle.id === style.id;
                    return (
                      <button
                        key={style.id}
                        onClick={() => setSelectedHairStyle(style)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-purple-950/40 border-purple-500 ring-1 ring-purple-500"
                            : "bg-neutral-950 border-neutral-800 hover:border-neutral-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase font-bold text-neutral-400">{style.category}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                        </div>
                        <span className="text-xs font-bold text-white block">{style.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hair Color Palette */}
              <div className="pt-4 border-t border-neutral-800">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-rose-400" />
                  <span>Saç Rengi & Tonu ({selectedHairColor.name})</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {HAIR_COLORS.map((col) => {
                    const isSelected = selectedHairColor.id === col.id;
                    return (
                      <button
                        key={col.id}
                        onClick={() => setSelectedHairColor(col)}
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? "bg-purple-950/30 border-purple-500 ring-1 ring-purple-500 text-white"
                            : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: col.colorHex }}
                        />
                        <span className="text-xs font-semibold truncate">{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Makeup, Lipstick (Ruj) & Nail Polish (Oje) */}
          {activeStudioTab === "makeup" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-3">İkonik Makyaj & Kozmetik Paletleri</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MAKEUP_PRESETS.map((mu) => {
                    const isSelected = selectedMakeup.id === mu.id;
                    return (
                      <div
                        key={mu.id}
                        onClick={() => setSelectedMakeup(mu)}
                        className={`cursor-pointer p-3.5 rounded-2xl border transition-all ${
                          isSelected
                            ? "bg-rose-950/30 border-rose-500 ring-1 ring-rose-500"
                            : "bg-neutral-950 border-neutral-800 hover:border-neutral-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-white">{mu.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-rose-400" />}
                        </div>
                        <div className="space-y-1.5 text-[11px] text-neutral-300">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full border border-white/30 shrink-0"
                              style={{ backgroundColor: mu.lipstickHex }}
                            />
                            <span>
                              <strong className="text-neutral-400">Ruj: </strong>
                              {mu.lipstick}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full border border-white/30 shrink-0"
                              style={{ backgroundColor: mu.nailHex }}
                            />
                            <span>
                              <strong className="text-neutral-400">Oje: </strong>
                              {mu.nailPolish}
                            </span>
                          </div>
                          <div className="text-[10px] text-neutral-400 italic">Allık: {mu.blush}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Accessories */}
          {activeStudioTab === "accessories" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white">Lüks Aksesuar & Mücevher Seçimi</h3>
              <p className="text-xs text-neutral-400">
                Gözlük, mücevher, çanta veya saat ekleyerek marka çekiminin zarafetini tamamla.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ACCESSORIES_LIST.map((acc) => {
                  const isEquipped = activeAccessories.includes(acc.id);
                  return (
                    <button
                      key={acc.id}
                      onClick={() => toggleAccessory(acc.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        isEquipped
                          ? "bg-purple-950/40 border-purple-500 ring-1 ring-purple-500 text-white"
                          : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="p-1.5 rounded-lg bg-neutral-800 text-purple-300">
                          <Gem className="w-4 h-4" />
                        </span>
                        <span className="text-xs font-semibold">{acc.name}</span>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          isEquipped ? "bg-purple-600 text-white" : "bg-neutral-800 text-neutral-400"
                        }`}
                      >
                        {isEquipped ? "Takılı" : "+ Ekle"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Live Prompt Formula & Gemini Generator Box */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-purple-400" />
                <h4 className="text-sm font-bold text-white">AI Fotoğraf & Video Prompt Formülü</h4>
              </div>
              <button
                id="generate-gemini-prompt-btn"
                onClick={handleGeneratePrompt}
                disabled={isGeneratingPrompt}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {isGeneratingPrompt ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Gemini ile Geliştir</span>
                  </>
                )}
              </button>
            </div>

            {/* Prompt Display */}
            <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 leading-relaxed relative group">
              <p>
                {promptResult
                  ? promptResult.prompt
                  : `Editorial fashion photo of ${currentModel.name}, ${currentModel.style} style, wearing ${selectedOutfit.name} with ${selectedTexture.name} texture, ${selectedHairColor.name} ${selectedHairStyle.name} hair, ${selectedMakeup.name}, accessories: [${activeAccessories.join(", ")}], 8k resolution, cinematic commercial lighting.`}
              </p>
              <button
                onClick={() =>
                  copyToClipboard(
                    promptResult
                      ? promptResult.prompt
                      : `Editorial fashion photo of ${currentModel.name}, ${currentModel.style} style, wearing ${selectedOutfit.name} with ${selectedTexture.name} texture, ${selectedHairColor.name} ${selectedHairStyle.name} hair, ${selectedMakeup.name}, accessories: [${activeAccessories.join(", ")}], 8k resolution, cinematic commercial lighting.`
                  )
                }
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity"
              >
                {copiedPrompt ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPrompt ? "Kopyalandı" : "Kopyala"}</span>
              </button>
            </div>

            {promptResult?.stylingTips && (
              <div className="text-xs text-neutral-400 bg-purple-950/20 border border-purple-900/30 p-3 rounded-xl">
                <strong className="text-purple-300">Kreatif Stilist Notu: </strong>
                {promptResult.stylingTips}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
