import React, { useState, useMemo } from "react";
import {
  AIModel,
  FramingOption,
  CameraAngleOption,
  LightingOption,
  PhotoStyleOption,
  CameraFilmOption,
  AmbiancePreset,
  MultiAngleResult,
  ProductItemSlot,
  AdTemplateItem,
} from "../types";
import {
  FRAMING_OPTIONS,
  CAMERA_ANGLES_LIST,
  LIGHTING_OPTIONS,
  PHOTO_STYLE_OPTIONS,
  CAMERA_FILM_OPTIONS,
  AMBIANCE_PRESETS,
  SAMPLE_PRODUCT_PRESETS,
} from "../data/photoshootPresets";
import { AD_TEMPLATES } from "../data/adTemplates";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Upload,
  Download,
  RefreshCw,
  Video,
  ShieldCheck,
  Sliders,
  Layers,
  Camera,
  Maximize2,
  Copy,
  FileCheck,
  Zap,
} from "lucide-react";

interface PhotoshootWizardProps {
  models: AIModel[];
  selectedModel: AIModel;
  onSelectModel: (model: AIModel) => void;
  onSendToVideo: (startImg: string, endImg: string, promptText: string) => void;
  onViewLegalLicense: () => void;
  preloadedTemplate?: AdTemplateItem | null;
  initialStep?: number;
  directExecuteShoot?: boolean;
  onOpenTemplatesHub?: () => void;
}

export const PhotoshootWizard: React.FC<PhotoshootWizardProps> = ({
  models,
  selectedModel,
  onSelectModel,
  onSendToVideo,
  onViewLegalLicense,
  preloadedTemplate,
  initialStep = 1,
  directExecuteShoot = false,
  onOpenTemplatesHub,
}) => {
  // Current step in the photoshoot pipeline (1 to 10)
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  // Products (Slot 1, 2, 3)
  const [productSlots, setProductSlots] = useState<{
    item1: { name: string; category: string; image: string };
    item2: { name: string; category: string; image: string };
    item3: { name: string; category: string; image: string };
  }>({
    item1: {
      name: "Siyah Nappa Deri Büstiyer Mini Elbise",
      category: "Ana Kıyafet",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
    },
    item2: {
      name: "Diz Üstü İtalyan Deri Sivri Burun Çizme",
      category: "Tamamlayıcı Parça / Ayakkabı",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80",
    },
    item3: {
      name: "Gümüş Tokalı Dokulu Deri El Çantası",
      category: "Aksesuar / Çanta",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
    },
  });

  // Step selections
  const [selectedFraming, setSelectedFraming] = useState<string>("full_body");
  const [selectedAngle, setSelectedAngle] = useState<string>("three_quarter");
  const [selectedLighting, setSelectedLighting] = useState<string>("studio_softbox");
  const [selectedPhotoStyle, setSelectedPhotoStyle] = useState<string>("high_fashion");
  const [selectedFilmStyle, setSelectedFilmStyle] = useState<string>("medium_format");
  const [selectedAmbiance, setSelectedAmbiance] = useState<string>("white_studio");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("3:4");
  const [isHighQuality, setIsHighQuality] = useState<boolean>(true);

  // Angles to generate multi-angle pack
  const [selectedAnglesToGenerate, setSelectedAnglesToGenerate] = useState<string[]>([
    "Front Angle",
    "Left 45° Angle",
    "Low Angle Full Body",
    "Face Close-up",
    "Three-Quarter Front",
    "Product Detail Angle",
  ]);

  // Generation status
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedResults, setGeneratedResults] = useState<MultiAngleResult[]>([]);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [selectedModalImage, setSelectedModalImage] = useState<MultiAngleResult | null>(null);

  // Handle template preloading
  React.useEffect(() => {
    if (preloadedTemplate) {
      // Find model
      const matchedModel = models.find((m) => m.id === preloadedTemplate.modelId);
      if (matchedModel) {
        onSelectModel(matchedModel);
      }

      // Products
      setProductSlots({
        item1: {
          name: preloadedTemplate.products.item1.title,
          category: preloadedTemplate.products.item1.category,
          image: preloadedTemplate.products.item1.image,
        },
        item2: preloadedTemplate.products.item2
          ? {
              name: preloadedTemplate.products.item2.title,
              category: preloadedTemplate.products.item2.category,
              image: preloadedTemplate.products.item2.image,
            }
          : {
              name: "Tamamlayıcı Çizme / Detay",
              category: "Ayakkabı",
              image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80",
            },
        item3: preloadedTemplate.products.item3
          ? {
              name: preloadedTemplate.products.item3.title,
              category: preloadedTemplate.products.item3.category,
              image: preloadedTemplate.products.item3.image,
            }
          : {
              name: "Lüks Omuz Çantası",
              category: "Aksesuar",
              image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
            },
      });

      // Settings
      if (preloadedTemplate.presetConfiguration) {
        setSelectedFraming(preloadedTemplate.presetConfiguration.framingId || "full_body");
        setSelectedAngle(preloadedTemplate.presetConfiguration.cameraAngleId || "three_quarter");
        setSelectedLighting(preloadedTemplate.presetConfiguration.lightingId || "bounced");
        setSelectedPhotoStyle(preloadedTemplate.presetConfiguration.photoStyleId || "ecommerce");
        setSelectedFilmStyle(preloadedTemplate.presetConfiguration.cameraFilmId || "medium_format");
        setSelectedAmbiance(preloadedTemplate.presetConfiguration.ambianceId || "white_studio");
        setSelectedAspectRatio(preloadedTemplate.presetConfiguration.aspectRatio || "3:4");
      }

      if (directExecuteShoot) {
        handleGenerateShooting();
      } else {
        setCurrentStep(initialStep || 1);
      }
    }
  }, [preloadedTemplate, directExecuteShoot]);

  // Load sample demo on click
  const handleRunSampleDemo = () => {
    const sample = AD_TEMPLATES[0]; // myAIwear leather try-on
    const matchedModel = models.find((m) => m.id === sample.modelId) || models[0];
    onSelectModel(matchedModel);

    setProductSlots({
      item1: {
        name: sample.products.item1.title,
        category: sample.products.item1.category,
        image: sample.products.item1.image,
      },
      item2: {
        name: sample.products.item2?.title || "Siyah Rugan Çizme",
        category: sample.products.item2?.category || "Ayakkabı",
        image: sample.products.item2?.image || "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80",
      },
      item3: {
        name: sample.products.item3?.title || "İtalyan Omuz Çantası",
        category: sample.products.item3?.category || "Aksesuar",
        image: sample.products.item3?.image || "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
      },
    });

    setSelectedFraming("full_body");
    setSelectedAngle("three_quarter");
    setSelectedLighting("bounced");
    setSelectedPhotoStyle("ecommerce");
    setSelectedFilmStyle("medium_format");
    setSelectedAmbiance("white_studio");
    setSelectedAspectRatio("3:4");

    // Immediately execute shooting
    handleGenerateShooting();
  };

  // Active Ambiance Object
  const currentAmbianceObj = useMemo(() => {
    return (
      AMBIANCE_PRESETS.find((a) => a.id === selectedAmbiance) ||
      AMBIANCE_PRESETS[0]
    );
  }, [selectedAmbiance]);

  // Live prompt construction
  const livePromptFormula = useMemo(() => {
    const framingObj = FRAMING_OPTIONS.find((f) => f.id === selectedFraming);
    const angleObj = CAMERA_ANGLES_LIST.find((a) => a.id === selectedAngle);
    const lightingObj = LIGHTING_OPTIONS.find((l) => l.id === selectedLighting);
    const styleObj = PHOTO_STYLE_OPTIONS.find((s) => s.id === selectedPhotoStyle);
    const filmObj = CAMERA_FILM_OPTIONS.find((f) => f.id === selectedFilmStyle);

    return `Commercial photoshoot of 100% AI synthetic fashion model ${selectedModel.name}, wearing ${productSlots.item1.name}, paired with ${productSlots.item2.name} and ${productSlots.item3.name}. Framing: ${framingObj?.name || "Full Body"}. Camera angle: ${angleObj?.name || "Three-Quarter"}. Lighting: ${lightingObj?.name || "Studio Softbox"}. Style: ${styleObj?.name || "High Fashion Editorial"}. Camera & Film: ${filmObj?.name || "Medium Format 100MP"}. Background environment: ${currentAmbianceObj.backgroundPrompt}. Razor sharp textures, pristine color grading, 8k resolution, commercial advertising safe, zero model release needed. --ar ${selectedAspectRatio}`;
  }, [
    selectedModel,
    productSlots,
    selectedFraming,
    selectedAngle,
    selectedLighting,
    selectedPhotoStyle,
    selectedFilmStyle,
    currentAmbianceObj,
    selectedAspectRatio,
  ]);

  // Handle Preset sample product package loading
  const handleLoadSamplePackage = (presetId: string) => {
    const found = SAMPLE_PRODUCT_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setProductSlots({
        item1: found.item1,
        item2: found.item2,
        item3: found.item3,
      });
    }
  };

  // Toggle angle in generation list
  const toggleAngle = (angle: string) => {
    if (selectedAnglesToGenerate.includes(angle)) {
      if (selectedAnglesToGenerate.length > 1) {
        setSelectedAnglesToGenerate(
          selectedAnglesToGenerate.filter((a) => a !== angle)
        );
      }
    } else {
      setSelectedAnglesToGenerate([...selectedAnglesToGenerate, angle]);
    }
  };

  // Run the multi-angle generation
  const handleGenerateShooting = async () => {
    setIsGenerating(true);
    setCurrentStep(10); // Go to results view

    // Simulate the AI processing & multi-angle synthesis
    setTimeout(() => {
      const anglesMock: MultiAngleResult[] = [
        {
          id: "angle-1",
          angleName: "Front Angle",
          label: "Ön Tam Açı (Catalog Frontal)",
          image: selectedModel.fullBodyImage || selectedModel.avatar,
          prompt: `${livePromptFormula} (Front Angle frontal view)`,
          aspectRatio: selectedAspectRatio,
        },
        {
          id: "angle-2",
          angleName: "Left 45° Angle",
          label: "Sol Profil 45° (Three-Quarter)",
          image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80",
          prompt: `${livePromptFormula} (Three-quarter profile left angle)`,
          aspectRatio: selectedAspectRatio,
        },
        {
          id: "angle-3",
          angleName: "Low Angle Full Body",
          label: "Yerden Yukarı Hero Açı (Low Angle)",
          image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80",
          prompt: `${livePromptFormula} (Dramatic low-angle from below)`,
          aspectRatio: selectedAspectRatio,
        },
        {
          id: "angle-4",
          angleName: "Face Close-up",
          label: "Yüz & Makyaj Yakın Çekim (Beauty Close-up)",
          image: selectedModel.avatar,
          prompt: `${livePromptFormula} (Tight macro close up face)`,
          aspectRatio: selectedAspectRatio,
        },
        {
          id: "angle-5",
          angleName: "Three-Quarter Front",
          label: "Dinamik Moda Duruşu (Editorial Pose)",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
          prompt: `${livePromptFormula} (Editorial catwalk pose)`,
          aspectRatio: selectedAspectRatio,
        },
        {
          id: "angle-6",
          angleName: "Product Detail Angle",
          label: "Ürün & Doku Makro Odak (Fabric & Boots Macro)",
          image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80",
          prompt: `${livePromptFormula} (Extreme close up on leather texture and footwear)`,
          aspectRatio: selectedAspectRatio,
        },
      ];

      setGeneratedResults(anglesMock);
      setIsGenerating(false);
    }, 1800);
  };

  const copyPromptText = () => {
    navigator.clipboard.writeText(livePromptFormula);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const stepsList = [
    { num: 1, title: "1. Manken Seçimi" },
    { num: 2, title: "2. Ürünleri Yükleme" },
    { num: 3, title: "3. Kadraj (Framing)" },
    { num: 4, title: "4. Kamera Açısı" },
    { num: 5, title: "5. Işıklandırma" },
    { num: 6, title: "6. Fotoğraf Tarzı" },
    { num: 7, title: "7. Kamera & Film" },
    { num: 8, title: "8. Ambiyans Kurgusu" },
    { num: 9, title: "9. Prompt & Açı Seçimi" },
    { num: 10, title: "10. Çekim Sonuçları" },
  ];

  return (
    <div id="photoshoot-wizard-container" className="flex-1 bg-neutral-950 text-white min-h-screen flex flex-col">
      {/* Top Header & Breadcrumb */}
      <header className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span>Studio</span>
              <ChevronRight className="w-3 h-3 text-neutral-600" />
              <span className="text-white font-medium">AI Virtual Photoshoot & Multi-Angle</span>
            </div>
            <h1 className="text-sm md:text-base font-bold text-white tracking-tight">
              {stepsList[currentStep - 1]?.title || "Photoshoot"}
            </h1>
          </div>
        </div>

        {/* Action buttons & Legal Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onViewLegalLicense}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 text-xs font-semibold hover:bg-emerald-900/40 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>%100 Telifsiz Ticari Lisans</span>
          </button>

          {/* Navigation Controls */}
          {currentStep > 1 && (
            <button
              id="wizard-btn-prev"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1 border border-neutral-700 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Geri</span>
            </button>
          )}

          {currentStep < 9 && (
            <button
              id="wizard-btn-next"
              onClick={() => setCurrentStep((prev) => Math.min(9, prev + 1))}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-900/30 transition"
            >
              <span>İleri</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {currentStep === 9 && (
            <button
              id="wizard-btn-generate-all"
              onClick={handleGenerateShooting}
              disabled={isGenerating}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/40 animate-pulse transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? "Çekim Yapılıyor..." : "Tüm Açıları Üret (6 Açı)"}</span>
            </button>
          )}
        </div>
      </header>

      {/* 1-Click Interactive Example Action Banner (Fulfills 'örnek bir işlemde sen yap her şeyi kategori ve kolay reklam üzerine inşa et') */}
      <div className="bg-gradient-to-r from-purple-950/90 via-neutral-900 to-amber-950/70 border-b border-purple-800/50 px-4 md:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="text-neutral-300 text-[11px] md:text-xs">
            <strong className="text-amber-300 mr-1.5 font-bold">Canlı Örnek İşlem:</strong>
            Videodaki <strong>myAIwear Kahverengi Deri Büstiyer Elbise & Diz Üstü Çizme</strong> kurgusunu tek tıkla yükleyin ve 6 açılı çekimi hemen üretin!
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            id="wizard-quick-demo-btn"
            onClick={handleRunSampleDemo}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white font-bold transition flex items-center gap-1.5 shadow-md shadow-purple-900/40 text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Örnek Reklamı Hemen Başlat</span>
          </button>
          {onOpenTemplatesHub && (
            <button
              onClick={onOpenTemplatesHub}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 text-xs font-semibold transition"
            >
              Tüm Şablonlar
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-neutral-900 h-1 border-b border-neutral-800">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 transition-all duration-300"
          style={{ width: `${(currentStep / 10) * 100}%` }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-24">
        {/* ================= STEP 1: DEFAULT MODELS ================= */}
        {currentStep === 1 && (
          <div id="wizard-step-1" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
              <div>
                <h2 className="text-lg font-bold text-white">Default Models (Sentetik AI Mankenler)</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Teliften ve Model Release zorunluluğundan muaf, stüdyo aydınlatmalı 100% yapay zeka mankenler.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-950/60 border border-purple-800/60 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Seçilen Manken: <strong className="text-white">{selectedModel.name}</strong></span>
              </div>
            </div>

            {/* Models Grid (Clean studio portraits like in the video) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {models.map((model) => {
                const isSelected = selectedModel.id === model.id;
                return (
                  <div
                    key={model.id}
                    id={`model-card-${model.id}`}
                    onClick={() => onSelectModel(model)}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 border ${
                      isSelected
                        ? "border-purple-500 ring-2 ring-purple-500/50 shadow-lg shadow-purple-950"
                        : "border-neutral-800 hover:border-neutral-600 bg-neutral-900"
                    }`}
                  >
                    {/* Model Image */}
                    <div className="aspect-[3/4] relative overflow-hidden bg-neutral-800">
                      <img
                        src={model.avatar}
                        alt={model.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Selected Purple Check Badge (Directly like in video!) */}
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* AI Synthetic Tag */}
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur text-[10px] text-neutral-300 font-medium">
                        100% AI Sentetik
                      </div>
                    </div>

                    {/* Model Info */}
                    <div className="p-3 bg-neutral-900">
                      <h3 className="text-xs font-bold text-white truncate">{model.name}</h3>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">{model.nationalityVibe}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-[10px] bg-neutral-800 text-purple-300 px-1.5 py-0.5 rounded font-mono">
                          {model.height}
                        </span>
                        <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded truncate">
                          {model.skinType.split("(")[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 2: UPLOAD PRODUCTS (1st, 2nd, 3rd items) ================= */}
        {currentStep === 2 && (
          <div id="wizard-step-2" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
              <div>
                <h2 className="text-lg font-bold text-white">Upload Products (Çekimi Yapılacak Ürünler)</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  1. Ürün (Ana Kıyafet), 2. Ürün (İkinci Parça / Çizme / Detay), 3. Ürün (Aksesuar / Çanta).
                </p>
              </div>

              {/* Sample bundle buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-neutral-400 font-medium">Hazır Kombinler:</span>
                <button
                  onClick={() => handleLoadSamplePackage("leather_corset_set")}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs border border-neutral-700"
                >
                  Deri Elbise + Çizme
                </button>
                <button
                  onClick={() => handleLoadSamplePackage("sport_running_set")}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs border border-neutral-700"
                >
                  Koşu Ayakkabısı + Tayt
                </button>
                <button
                  onClick={() => handleLoadSamplePackage("silk_resort_set")}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs border border-neutral-700"
                >
                  İpek Elbise + Sandalet
                </button>
              </div>
            </div>

            {/* 3 Product Slots (Matching video step 2) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Slot 1: Main Garment */}
              <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">1. Ürün: Ana Kıyafet</span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-semibold">Zorunlu</span>
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-800 relative group border border-neutral-700/60 mb-3">
                    <img
                      src={productSlots.item1.image}
                      alt={productSlots.item1.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-white/30">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Görsel Değiştir</span>
                      </button>
                    </div>
                  </div>
                  <label className="block text-xs text-neutral-400 mb-1">Ürün Adı & Tanımı:</label>
                  <input
                    type="text"
                    value={productSlots.item1.name}
                    onChange={(e) =>
                      setProductSlots({
                        ...productSlots,
                        item1: { ...productSlots.item1, name: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Slot 2: Complementary / Detail */}
              <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">2. Ürün: Detay / Ayakkabı</span>
                    <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded font-semibold">İsteğe Bağlı</span>
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-800 relative group border border-neutral-700/60 mb-3">
                    <img
                      src={productSlots.item2.image}
                      alt={productSlots.item2.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-white/30">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Görsel Değiştir</span>
                      </button>
                    </div>
                  </div>
                  <label className="block text-xs text-neutral-400 mb-1">Ürün Adı & Tanımı:</label>
                  <input
                    type="text"
                    value={productSlots.item2.name}
                    onChange={(e) =>
                      setProductSlots({
                        ...productSlots,
                        item2: { ...productSlots.item2, name: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Slot 3: Accessory / Handbag */}
              <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">3. Ürün: Aksesuar / Çanta</span>
                    <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded font-semibold">İsteğe Bağlı</span>
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-800 relative group border border-neutral-700/60 mb-3">
                    <img
                      src={productSlots.item3.image}
                      alt={productSlots.item3.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-white/30">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Görsel Değiştir</span>
                      </button>
                    </div>
                  </div>
                  <label className="block text-xs text-neutral-400 mb-1">Aksesuar Adı & Tanımı:</label>
                  <input
                    type="text"
                    value={productSlots.item3.name}
                    onChange={(e) =>
                      setProductSlots({
                        ...productSlots,
                        item3: { ...productSlots.item3, name: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: FRAMING ================= */}
        {currentStep === 3 && (
          <div id="wizard-step-3" className="space-y-6">
            <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
              <h2 className="text-lg font-bold text-white">Framing (Kadraj & Plan Boyutu)</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Kameranın modele olan uzaklığını ve kadraj planını belirleyin.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FRAMING_OPTIONS.map((opt) => {
                const isSelected = selectedFraming === opt.id;
                return (
                  <div
                    key={opt.id}
                    id={`framing-${opt.id}`}
                    onClick={() => setSelectedFraming(opt.id)}
                    className={`rounded-2xl overflow-hidden cursor-pointer border transition-all ${
                      isSelected
                        ? "border-purple-500 ring-2 ring-purple-500/50 shadow-lg shadow-purple-950"
                        : "border-neutral-800 hover:border-neutral-700 bg-neutral-900"
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="p-3.5 bg-neutral-900">
                      <h3 className="text-sm font-bold text-white">{opt.name}</h3>
                      <p className="text-xs text-neutral-400 mt-1">{opt.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 4: CAMERA ANGLE ================= */}
        {currentStep === 4 && (
          <div id="wizard-step-4" className="space-y-6">
            <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
              <h2 className="text-lg font-bold text-white">Camera Angle (Kamera Çekim Açısı)</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Modelin duruşunu ve ürünün etkisini vurgulayan lens açısını seçin.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {CAMERA_ANGLES_LIST.map((opt) => {
                const isSelected = selectedAngle === opt.id;
                return (
                  <div
                    key={opt.id}
                    id={`angle-${opt.id}`}
                    onClick={() => setSelectedAngle(opt.id)}
                    className={`rounded-2xl overflow-hidden cursor-pointer border transition-all ${
                      isSelected
                        ? "border-purple-500 ring-2 ring-purple-500/50 shadow-lg shadow-purple-950"
                        : "border-neutral-800 hover:border-neutral-700 bg-neutral-900"
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="p-3.5 bg-neutral-900">
                      <h3 className="text-sm font-bold text-white">{opt.name}</h3>
                      <p className="text-xs text-neutral-400 mt-1">{opt.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 5: LIGHTING ================= */}
        {currentStep === 5 && (
          <div id="wizard-step-5" className="space-y-6">
            <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
              <h2 className="text-lg font-bold text-white">Lighting (Işıklandırma & Aydınlatma Tasarımı)</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Kumaş dokularını parlatan, katalog veya sinematik atmosfer oluşturan ışık modu.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {LIGHTING_OPTIONS.map((opt) => {
                const isSelected = selectedLighting === opt.id;
                return (
                  <div
                    key={opt.id}
                    id={`lighting-${opt.id}`}
                    onClick={() => setSelectedLighting(opt.id)}
                    className={`rounded-2xl overflow-hidden cursor-pointer border transition-all ${
                      isSelected
                        ? "border-purple-500 ring-2 ring-purple-500/50 shadow-lg shadow-purple-950"
                        : "border-neutral-800 hover:border-neutral-700 bg-neutral-900"
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-neutral-900">
                      <h3 className="text-xs font-bold text-white">{opt.name}</h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-2">{opt.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 6: PHOTO STYLE & EFFECTS ================= */}
        {currentStep === 6 && (
          <div id="wizard-step-6" className="space-y-6">
            <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
              <h2 className="text-lg font-bold text-white">Filters & Effects / Choose Your Style</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Vogue editoryal, sokak modası veya temiz e-ticaret katalog efekti.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {PHOTO_STYLE_OPTIONS.map((opt) => {
                const isSelected = selectedPhotoStyle === opt.id;
                return (
                  <div
                    key={opt.id}
                    id={`photo-style-${opt.id}`}
                    onClick={() => setSelectedPhotoStyle(opt.id)}
                    className={`rounded-2xl overflow-hidden cursor-pointer border transition-all ${
                      isSelected
                        ? "border-purple-500 ring-2 ring-purple-500/50 shadow-lg shadow-purple-950"
                        : "border-neutral-800 hover:border-neutral-700 bg-neutral-900"
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-neutral-900">
                      <h3 className="text-xs font-bold text-white">{opt.name}</h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-2">{opt.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 7: CAMERA & FILM STYLE ================= */}
        {currentStep === 7 && (
          <div id="wizard-step-7" className="space-y-6">
            <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
              <h2 className="text-lg font-bold text-white">Camera & Film Style (Sensör & Film Emülasyonu)</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                100MP Hasselblad katalog netliği veya 90'lar analog gren estetiği.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {CAMERA_FILM_OPTIONS.map((opt) => {
                const isSelected = selectedFilmStyle === opt.id;
                return (
                  <div
                    key={opt.id}
                    id={`film-style-${opt.id}`}
                    onClick={() => setSelectedFilmStyle(opt.id)}
                    className={`rounded-2xl overflow-hidden cursor-pointer border transition-all ${
                      isSelected
                        ? "border-purple-500 ring-2 ring-purple-500/50 shadow-lg shadow-purple-950"
                        : "border-neutral-800 hover:border-neutral-700 bg-neutral-900"
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="p-3.5 bg-neutral-900">
                      <h3 className="text-sm font-bold text-white">{opt.name}</h3>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{opt.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 8: AMBIANCE & ENVIRONMENT SETTING ================= */}
        {currentStep === 8 && (
          <div id="wizard-step-8" className="space-y-6">
            <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-white">Ambiance & Environment (Reklam Mekanı ve Kurgusu)</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Moda, mobilya, spor ayakkabı veya kozmetik için özel tasarlanmış telifsiz ticari mekan kurguları.
                  </p>
                </div>
                <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-lg font-medium self-start">
                  Teliften Muaf Çevre
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AMBIANCE_PRESETS.map((amb) => {
                const isSelected = selectedAmbiance === amb.id;
                return (
                  <div
                    key={amb.id}
                    id={`ambiance-${amb.id}`}
                    onClick={() => setSelectedAmbiance(amb.id)}
                    className={`rounded-2xl overflow-hidden cursor-pointer border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-purple-500 ring-2 ring-purple-500/50 shadow-lg shadow-purple-950"
                        : "border-neutral-800 hover:border-neutral-700 bg-neutral-900"
                    }`}
                  >
                    <div>
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img src={amb.image} alt={amb.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] text-purple-300 font-semibold">
                          {amb.industry}
                        </div>
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div className="p-3.5">
                        <h3 className="text-sm font-bold text-white">{amb.name}</h3>
                        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{amb.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 9: PROMPT FORMULA, RATIO & ANGLE SELECTION ================= */}
        {currentStep === 9 && (
          <div id="wizard-step-9" className="space-y-6">
            <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
              <h2 className="text-lg font-bold text-white">Prompt Blueprint & Multi Camera Angles</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Kombininiz ve seçilen parametreler tek bir AI fotoğraf çekim formülünde birleşti. Üretilmesini istediğiniz açıları işaretleyin.
              </p>
            </div>

            {/* Live Assembled Prompt Textarea */}
            <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">AI Photoshoot Prompt Formula</span>
                </div>
                <button
                  onClick={copyPromptText}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1.5 border border-neutral-700 transition"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedPrompt ? "Kopyalandı!" : "Promptu Kopyala"}</span>
                </button>
              </div>

              <textarea
                rows={4}
                readOnly
                value={livePromptFormula}
                className="w-full bg-neutral-950 rounded-xl p-3 text-xs text-neutral-300 font-mono border border-neutral-800 focus:outline-none resize-none leading-relaxed"
              />

              {/* Aspect Ratio & Quality Chips (Like in video!) */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-800/80">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-neutral-400 font-medium">Aspect Ratio:</span>
                  {["3:2", "4:3", "5:4", "1:1", "16:9", "21:9", "2:3", "3:4", "4:5", "9:16"].map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setSelectedAspectRatio(ratio)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition ${
                        selectedAspectRatio === ratio
                          ? "bg-purple-600 text-white shadow-sm"
                          : "bg-neutral-800 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isHighQuality}
                    onChange={(e) => setIsHighQuality(e.target.checked)}
                    className="rounded bg-neutral-800 border-neutral-700 text-purple-600 focus:ring-0 w-4 h-4"
                  />
                  <span className="text-xs text-neutral-300 font-medium">High Quality 8K Mode</span>
                </label>
              </div>
            </div>

            {/* Checkbox multi-angle selector (Matching video step 9) */}
            <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Camera Angles you want to generate:</h3>
                <span className="text-xs text-purple-400 font-semibold">{selectedAnglesToGenerate.length} Açı Seçili</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {[
                  "Front Angle",
                  "Back Angle",
                  "Left 45° Angle",
                  "Right 45° Angle",
                  "Low Angle Full Body",
                  "Overhead Diagonal",
                  "Face Close-up",
                  "Three-Quarter Front",
                  "Upper Body Front",
                  "Product Detail Angle",
                ].map((angle) => {
                  const isChecked = selectedAnglesToGenerate.includes(angle);
                  return (
                    <div
                      key={angle}
                      onClick={() => toggleAngle(angle)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium cursor-pointer border flex items-center justify-between transition ${
                        isChecked
                          ? "bg-purple-950/60 border-purple-500 text-white shadow-sm"
                          : "bg-neutral-800/60 border-neutral-700/60 text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      <span>{angle}</span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? "bg-purple-600 border-purple-500 text-white" : "border-neutral-600 bg-neutral-700"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Big Launch Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleGenerateShooting}
                disabled={isGenerating}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95 text-white text-sm font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-purple-900/40 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? "Yapay Zeka Stüdyosu Çekim Yapıyor..." : "Stüdyo Çekimini Başlat (6 Açı Üret)"}</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 10: MULTI-ANGLE RESULTS (The Grid at 0:18 in video!) ================= */}
        {currentStep === 10 && (
          <div id="wizard-step-10" className="space-y-6">
            {/* Loading Indicator */}
            {isGenerating ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-900/50 animate-spin">
                  <RefreshCw className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-base font-bold text-white">Yapay Zeka Çekim Yapıyor...</h3>
                <p className="text-xs text-neutral-400 max-w-sm text-center">
                  Model, kumaş dokusu, {currentAmbianceObj.name} ambiyansı ve 6 farklı kamera açısı senkronize render ediliyor.
                </p>
              </div>
            ) : (
              <>
                {/* Results Header Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-white">Camera Angle Results</h2>
                      <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
                        ✓ 6 Açı Hazır
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {selectedModel.name} &bull; {productSlots.item1.name} &bull; {currentAmbianceObj.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onSendToVideo(
                          generatedResults[0]?.image || selectedModel.fullBodyImage,
                          generatedResults[1]?.image || selectedModel.avatar,
                          livePromptFormula
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold flex items-center gap-2 hover:opacity-90 shadow-md shadow-pink-900/30 transition"
                    >
                      <Video className="w-4 h-4" />
                      <span>Bu Çekimden AI Video Üret</span>
                    </button>
                    <button
                      onClick={handleGenerateShooting}
                      className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
                      title="Yeniden Oluştur"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 6-Angles Grid (Directly matching video at 0:18!) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {generatedResults.map((angleRes, idx) => (
                    <div
                      key={angleRes.id}
                      id={`result-angle-card-${idx}`}
                      className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 group hover:border-purple-500/60 transition-all shadow-md"
                    >
                      {/* Image Preview Container */}
                      <div className="aspect-[3/4] overflow-hidden relative bg-neutral-800">
                        <img
                          src={angleRes.image}
                          alt={angleRes.angleName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Badges */}
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur text-white text-xs font-semibold border border-white/10">
                          {angleRes.angleName}
                        </div>
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 text-[10px] font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>Lisanslı</span>
                        </div>

                        {/* Hover Quick Actions */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedModalImage(angleRes)}
                            className="p-2 rounded-xl bg-white/20 backdrop-blur hover:bg-white/30 text-white"
                            title="Büyüt"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                          <a
                            href={angleRes.image}
                            download={`${angleRes.angleName}.jpg`}
                            className="p-2 rounded-xl bg-white/20 backdrop-blur hover:bg-white/30 text-white"
                            title="İndir"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-3.5 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white">{angleRes.label}</h4>
                          <span className="text-[10px] text-neutral-400">8K HDR &bull; Hasselblad 100MP</span>
                        </div>
                        <button
                          onClick={() =>
                            onSendToVideo(
                              angleRes.image,
                              generatedResults[(idx + 1) % generatedResults.length].image,
                              livePromptFormula
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-800 text-[11px] font-semibold flex items-center gap-1 transition"
                        >
                          <Video className="w-3 h-3" />
                          <span>Video Yap</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Image Modal Lightbox */}
      {selectedModalImage && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedModalImage(null)}
        >
          <div
            className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white">{selectedModalImage.label}</span>
              <button
                onClick={() => setSelectedModalImage(null)}
                className="text-neutral-400 hover:text-white text-xs px-2 py-1 rounded"
              >
                Kapat
              </button>
            </div>
            <div className="aspect-[3/4] max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedModalImage.image}
                alt={selectedModalImage.label}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
