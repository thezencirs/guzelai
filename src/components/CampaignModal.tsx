import React, { useState } from "react";
import { AI_MODELS, PRODUCT_PRESETS } from "../data/models";
import { CampaignPackage } from "../types";
import {
  X,
  Sparkles,
  Clapperboard,
  ShoppingBag,
  Volume2,
  Copy,
  CheckCircle,
  Download,
  Loader2,
  Film,
  Sun,
  Camera,
  Play,
  Square,
} from "lucide-react";
import { speakText, stopSpeaking } from "../utils/speech";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
}

export const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
}) => {
  const [selectedModelId, setSelectedModelId] = useState(AI_MODELS[0].id);
  const [selectedProductId, setSelectedProductId] = useState(PRODUCT_PRESETS[0].id);
  const [brandName, setBrandName] = useState("AuraStride Aero");
  const [targetVibe, setTargetVibe] = useState("Yüksek Enerji & Atletik Lüks");
  const [adFormat, setAdFormat] = useState("Reels / TikTok Ticari Video");

  const [isLoading, setIsLoading] = useState(false);
  const [campaignResult, setCampaignResult] = useState<CampaignPackage | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!isOpen) return null;

  const selectedModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];
  const selectedProduct = PRODUCT_PRESETS.find((p) => p.id === selectedProductId) || PRODUCT_PRESETS[0];

  const handleGenerate = async () => {
    setIsLoading(true);
    stopSpeaking();
    setIsSpeaking(false);

    try {
      const res = await fetch("/api/gemini/generate-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productCategory: selectedProduct.name,
          productName: brandName || selectedProduct.sampleBrandName,
          modelName: selectedModel.name,
          styleMode: selectedModel.style,
          targetVibe,
          adFormat,
        }),
      });

      if (!res.ok) throw new Error("Kampanya servisi yanıt vermedi.");
      const data = await res.json();
      setCampaignResult(data);

      if (soundEnabled && data.voiceoverScript) {
        speakText(data.voiceoverScript, {
          rate: 0.95,
          pitch: 1.05,
          voiceLang: "tr-TR",
          onEnd: () => setIsSpeaking(false),
        });
        setIsSpeaking(true);
      }
    } catch (e: any) {
      console.error(e);
      setCampaignResult({
        campaignTitle: `${brandName} x ${selectedModel.name} — Kusursuz Kampanya`,
        tagline: "Işıltını serbest bırak, geleceğin modasını şimdi başlat.",
        creativeDirectorNotes: "Kamera dinamik 9&12 grid açılarıyla mankene ve ürüne odaklanır. Işıklandırma softbox ve altın saat konturları ile desteklenir.",
        scenes: [
          {
            sceneNumber: 1,
            action: "Podyum yürüyüşü & kamera göz hizası yaklaşımı",
            cameraMove: "Macro Zoom-in to Wide Catwalk",
            lighting: "Stüdyo Softbox 5600K",
            duration: "3.5s",
            visualDescription: `Model ${selectedModel.name} kendinden emin adımlarla yürürken ${brandName} mükemmel netlikte öne çıkıyor.`,
            audioCue: "Düşük tempolu sofistike bass ritmi ve foley kumaş hışırtısı.",
          },
          {
            sceneNumber: 2,
            action: "Dinamik hareket & ürün detay yakın çekimi",
            cameraMove: "Low Angle 45-degree Orbit",
            lighting: "Kenar Işığı & Doğal Güneş Yansıması",
            duration: "4.0s",
            visualDescription: "Kıyafet dokusu ve ürün materyali 4K detayda parıldar.",
            audioCue: "Modelin fısıltılı, etkileyici seslendirmesi devreye girer.",
          },
          {
            sceneNumber: 3,
            action: "Göz teması ve imza gülümseme",
            cameraMove: "Slow-motion Close-Up",
            lighting: "Glamour Glow Beauty Dish",
            duration: "3.0s",
            visualDescription: "Model doğrudan objektife bakar, dijital marka yüzü logosu belirir.",
            audioCue: "Vurucu marka sloganı ve yankılı kapanış akoru.",
          },
        ],
        voiceoverScript: `Bazen sadece bir dokunuş dünyayı değiştirir. ${brandName} ile tanışın. Güzel AI ile geleceğin modası şimdi seninle.`,
        promptBlueprint: `High fashion editorial commercial for ${brandName}, featuring ${selectedModel.name}, ${selectedModel.style} aesthetic, cinematic 8k lighting, Vogue editorial photography style, 85mm f/1.4 lens, hyper-realistic fabric texture.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceover = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (campaignResult?.voiceoverScript) {
      speakText(campaignResult.voiceoverScript, {
        rate: 0.95,
        pitch: 1.05,
        voiceLang: "tr-TR",
        onEnd: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
    }
  };

  const copyPrompt = () => {
    if (campaignResult) {
      navigator.clipboard.writeText(campaignResult.promptBlueprint);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                AI Ticari Reklam Kampanyası Üreticisi
              </h2>
              <p className="text-xs text-neutral-400">
                Güzellik, moda, mobilya ve ayakkabı için eksiksiz reklam paketi
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="p-2 rounded-xl text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Model selector */}
          <div>
            <label className="text-xs font-bold text-neutral-300 block mb-1.5">
              Dijital Marka Yüzü (Manken):
            </label>
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-neutral-200 font-semibold focus:outline-none focus:border-rose-500"
            >
              {AI_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.style.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Product Category */}
          <div>
            <label className="text-xs font-bold text-neutral-300 block mb-1.5">
              Ürün Kategorisi:
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value as any);
                const p = PRODUCT_PRESETS.find((item) => item.id === e.target.value);
                if (p) setBrandName(p.sampleBrandName);
              }}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-neutral-200 font-semibold focus:outline-none focus:border-rose-500"
            >
              {PRODUCT_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Name Input */}
          <div>
            <label className="text-xs font-bold text-neutral-300 block mb-1.5">
              Marka / Koleksiyon Adı:
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Ör. AuraStride Aero"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-neutral-200 font-semibold focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Target Vibe */}
          <div>
            <label className="text-xs font-bold text-neutral-300 block mb-1.5">
              Hedeflenen Ruh Hali:
            </label>
            <select
              value={targetVibe}
              onChange={(e) => setTargetVibe(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-neutral-200 font-semibold focus:outline-none focus:border-rose-500"
            >
              <option value="Yüksek Enerji & Atletik Lüks">Yüksek Enerji & Atletik Lüks</option>
              <option value="Haute Couture & Gece Zarafeti">Haute Couture & Gece Zarafeti</option>
              <option value="Gençlik & Sokak Modası">Gençlik & Sokak Modası</option>
              <option value="Dingin İskandinav & Mimari">Dingin İskandinav & Mimari</option>
              <option value="Siber & Fütüristik">Siber & Fütüristik</option>
            </select>
          </div>

          {/* Ad Format */}
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-neutral-300 block mb-1.5">
              Reklam Formatı:
            </label>
            <div className="flex gap-2">
              {["Reels & TikTok 9:16", "Sinematik 16:9", "Fotoğraf Kampanyası 4:5"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setAdFormat(fmt)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    adFormat === fmt
                      ? "bg-rose-600 text-white border-rose-500"
                      : "bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          id="execute-generate-campaign-btn"
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:opacity-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-rose-950/50 transition-all cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Yapay Zeka Reklam Kampanyası Hazırlanıyor...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Yapay Zeka ile Eksiksiz Kampanya Paketi Üret</span>
            </>
          )}
        </button>

        {/* Campaign Results View */}
        {campaignResult && (
          <div className="space-y-6 pt-4 border-t border-neutral-800 animate-in fade-in duration-300">
            {/* Title & Tagline Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-neutral-900 to-amber-950/40 border border-neutral-750">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest">
                Kreatif Direktör Kampanyası
              </span>
              <h3 className="text-xl font-extrabold text-white mt-1">
                {campaignResult.campaignTitle}
              </h3>
              <p className="text-sm font-semibold text-rose-300 italic mt-0.5">
                "{campaignResult.tagline}"
              </p>
              <p className="text-xs text-neutral-400 mt-2">{campaignResult.creativeDirectorNotes}</p>
            </div>

            {/* Storyboard Scenes Grid */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Film className="w-4 h-4 text-rose-400" />
                <span>Video Reklam Storyboard Sahne Planı</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {campaignResult.scenes.map((scene) => (
                  <div
                    key={scene.sceneNumber}
                    className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-rose-400">SAHNE {scene.sceneNumber}</span>
                      <span className="font-mono text-neutral-400">{scene.duration}</span>
                    </div>
                    <div className="text-xs font-bold text-white">{scene.action}</div>
                    <p className="text-[11px] text-neutral-400">{scene.visualDescription}</p>
                    <div className="pt-2 border-t border-neutral-850 text-[10px] space-y-1 text-neutral-400">
                      <div>
                        <strong className="text-amber-400">Kamera: </strong>
                        {scene.cameraMove}
                      </div>
                      <div>
                        <strong className="text-amber-400">Işık: </strong>
                        {scene.lighting}
                      </div>
                      <div>
                        <strong className="text-rose-400">Ses: </strong>
                        {scene.audioCue}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Voiceover Audio Section */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
                  <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>AI Seslendirme Metni ({selectedModel.name})</span>
                </div>
                <button
                  onClick={toggleVoiceover}
                  className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-rose-300 flex items-center gap-1.5 transition-colors"
                >
                  {isSpeaking ? (
                    <>
                      <Square className="w-3 h-3 text-red-400" />
                      <span>Durdur</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-rose-400" />
                      <span>Seslendir (Web Audio)</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 italic leading-relaxed">
                "{campaignResult.voiceoverScript}"
              </p>
            </div>

            {/* Prompt Blueprint */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-300">
                  Midjourney / Veo AI Üretim Promptu:
                </span>
                <button
                  onClick={copyPrompt}
                  className="text-xs text-neutral-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  {copiedPrompt ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedPrompt ? "Kopyalandı!" : "Kopyala"}</span>
                </button>
              </div>
              <p className="text-xs font-mono text-neutral-400 bg-neutral-900 p-3 rounded-xl border border-neutral-850 leading-relaxed">
                {campaignResult.promptBlueprint}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
