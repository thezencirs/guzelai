import React, { useState, useRef, useEffect } from "react";
import { TranslationSchema } from "../i18n/translations";
import { AI_MODELS } from "../data/models";
import { AIModel } from "../types";
import {
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sliders,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Check,
  Zap,
  ArrowRight,
  Flame,
  MousePointerClick,
  Share2,
  Car,
  Footprints,
  Wine,
  Utensils,
  Plane,
  Eye,
  Film,
  Maximize2,
  X,
  Compass,
  Sparkle,
  Radio,
  Clock,
  Gauge,
  Weight,
  Scissors,
  CheckCircle2,
} from "lucide-react";
import {
  AtelierCropMarks,
  AtelierIllustratorStamp,
  AtelierTailorLines,
  CoutureSilhouetteSketch,
  BotanicalIllustratorFlourish,
} from "./IllustratorFlourishes";

interface InteractiveAdFormatsSectionProps {
  t: TranslationSchema;
  onOpenFullStudio?: (tab?: string, model?: AIModel) => void;
  onOpenStudio?: (tab?: string, model?: AIModel) => void;
  onSelectModel?: (model: AIModel) => void;
  onSendToVideoStudio?: (startImg: string, endImg: string, promptText: string) => void;
}

// ---------------------------------------------------------------------------
// DATA: 6 REFERENCE FORMATS UPDATED WITH GUZELAI MODELS & CORPORATE PALETTE
// ---------------------------------------------------------------------------

// FORMAT 1: Classic Microcars & Vintage Roadsters (Video 1 Inspiration)
interface MicrocarItem {
  id: string;
  name: string;
  yearSpan: string;
  country: string;
  colorName: string;
  colorHex: string;
  bgTone: string;
  textColor: string;
  accentColor: string;
  tagline: string;
  description: string;
  specs: {
    engine: string;
    power: string;
    speed: string;
    weight: string;
    length: string;
    productionCount: string;
  };
  features: string[];
  modelPair: AIModel;
  modelRole: string;
  lookbookAngle: string;
}

const MICROCAR_COLLECTION: MicrocarItem[] = [
  {
    id: "bmw-isetta",
    name: "BMW ISETTA 300",
    yearSpan: "1955-1962",
    country: "GERMANY / ITALY",
    colorName: "Riviera Pistachio Green",
    colorHex: "#7FA882",
    bgTone: "#E8EFE9",
    textColor: "#171717",
    accentColor: "#41631E",
    tagline: "Couture Picnic on the Italian Riviera",
    description: "Önden açılan ikonik kapısı, hasır piknik sepeti ve retro pastel mint tonuyla vintage İtalyan kıyı zarafeti. Valentina Cruz'un kırmızı mini elbisesiyle büyüleyici bir sinematik tezat oluşturur.",
    specs: {
      engine: "298 cc Tek Silindir 4-Zamanlı",
      power: "13 HP @ 5800 rpm",
      speed: "85 km/s Maksimum Hız",
      weight: "350 kg Boş Ağırlık",
      length: "2285 mm / 1380 mm",
      productionCount: "161.728 Adet Üretim",
    },
    features: ["Ön Gövdeden Açılan Tek Kapı", "Arka Hasır Piknik Sepeti", "Kumaş Katlanır Güneşlik", "Taba Deri Koltuk Döşemesi"],
    modelPair: AI_MODELS.find((m) => m.id === "valentina-cruz") || AI_MODELS[0],
    modelRole: "Valentina Cruz • Riviera Glamour & Kırmızı Mini Elbise",
    lookbookAngle: "Monaco Limanı Günbatımı Çekimi",
  },
  {
    id: "fiat-500",
    name: "FIAT 500 NUOVA",
    yearSpan: "1957-1975",
    country: "ITALY (TURIN)",
    colorName: "Roma Pastel Sunburst",
    colorHex: "#E5B842",
    bgTone: "#FDF8E8",
    textColor: "#171717",
    accentColor: "#FB5D2E",
    tagline: "Dolce Vita Sunshine & Espresso Runs",
    description: "İtalyan sinemasının simgesi. Güneş sarısı gövde ve katlanır kanvas tavan ile Roma sokaklarında romantik ve canlı bir reklam enerjisi.",
    specs: {
      engine: "479 cc Çift Silindir Hava Soğutmalı",
      power: "15 HP @ 4400 rpm",
      speed: "90 km/s Maksimum Hız",
      weight: "470 kg Boş Ağırlık",
      length: "2970 mm / 1320 mm",
      productionCount: "3.893.294 Adet Üretim",
    },
    features: ["Katlanır Kanvas Tavan", "Beyaz Yanaklı Klasik Lastikler", "Krom İnce Tamponlar", "Krem Bakalit Direksiyon"],
    modelPair: AI_MODELS.find((m) => m.id === "valentina-cruz") || AI_MODELS[0],
    modelRole: "Valentina Cruz & İpek Fular Güneş Gözlüğü",
    lookbookAngle: "Roma İspanyol Merdivenleri Önü",
  },
  {
    id: "messerschmitt",
    name: "MESSERSCHMITT KR200",
    yearSpan: "1955-1964",
    country: "GERMANY (REGENSBURG)",
    colorName: "Aero Bubble Turquoise",
    colorHex: "#44BDBD", // GuzelAI Turquoise
    bgTone: "#E8F8F8",
    textColor: "#171717",
    accentColor: "#171717",
    tagline: "Aviation Inspired Bubble Canopy",
    description: "Uçak kokpiti şeklinde açılan şeffaf kubbesi ve 3 tekerlekli aerodinamik tasarımıyla retro-fütüristik reklamların yıldızı.",
    specs: {
      engine: "191 cc Fichtel & Sachs 2-Zamanlı",
      power: "9.9 HP @ 5250 rpm",
      speed: "105 km/s Maksimum Hız",
      weight: "230 kg Boş Ağırlık",
      length: "2820 mm / 1220 mm",
      productionCount: "40.000 Adet Üretim",
    },
    features: ["Uçak Tipi Pleksiglas Kubbe", "Tandem İki Kişilik Oturma", "Gidon Tipi Hassas Direksiyon", "Yarış Ruhu 3 Tekerlek"],
    modelPair: AI_MODELS.find((m) => m.id === "scarlett-vance") || AI_MODELS[0],
    modelRole: "Scarlett Vance • Deri Ceket & Havacı Gözlüğü",
    lookbookAngle: "Vintage Pist & Hangar Girişi",
  },
  {
    id: "ferrari-360",
    name: "FERRARI 360 SPIDER",
    yearSpan: "2000-2005",
    country: "ITALY (MARANELLO)",
    colorName: "Monaco Corsa Red",
    colorHex: "#DC2626",
    bgTone: "#FDF2F2",
    textColor: "#171717",
    accentColor: "#DC2626",
    tagline: "V8 Symphony & Millionaire Allure",
    description: "Valentina Cruz'un imza otomobili. Şampanya bej döşemeler, açık sürücü kapısı ve günbatımı sahilinde karşı konulamaz lüks marka cazibesi.",
    specs: {
      engine: "3586 cc 90° V8 Doğal Emişli",
      power: "400 HP @ 8500 rpm",
      speed: "295 km/s Maksimum Hız",
      weight: "1350 kg Boş Ağırlık",
      length: "4477 mm / 1922 mm",
      productionCount: "7.565 Adet Üretim",
    },
    features: ["Elektrikli Yumuşak Tavan", "Cam Kapaklı V8 Motor Bölmesi", "Alüminyum Uzay Kafes Şasi", "Taba Deri Spor Koltuklar"],
    modelPair: AI_MODELS.find((m) => m.id === "valentina-cruz") || AI_MODELS[0],
    modelRole: "Valentina Cruz • İmza Kırmızı Mini Elbise",
    lookbookAngle: "Cannes Croisette Marina Önü",
  },
];

// FORMAT 2: AeroFlame 3D Luxury Sneaker Drop (Video 2 Inspiration - SSENSE / Palm Angels)
interface SneakerColorway {
  id: string;
  name: string;
  price: string;
  primaryHex: string;
  flameHex: string;
  accentHex: string;
  modelPair: AIModel;
  tagline: string;
}

const SNEAKER_COLORWAYS: SneakerColorway[] = [
  {
    id: "flame-green-red",
    name: "AeroFlame Green & Riviera Red",
    price: "$395",
    primaryHex: "#FFFFFF",
    flameHex: "#DC2626",
    accentHex: "#41631E",
    modelPair: AI_MODELS.find((m) => m.id === "kenzo-takahashi") || AI_MODELS[0],
    tagline: "İtalyan Nappa Deri & Vulkanize Kauçuk Alevler",
  },
  {
    id: "obsidian-cyber",
    name: "Obsidian Cyber Black & White",
    price: "$395",
    primaryHex: "#171717",
    flameHex: "#FFFFFF",
    accentHex: "#E65A7F", // GuzelAI Pink
    modelPair: AI_MODELS.find((m) => m.id === "chloe-bennett") || AI_MODELS[0],
    tagline: "Monokrom Sokak Stili & Gece Reflektif Panelleri",
  },
  {
    id: "turquoise-gold",
    name: "Cyber Turquoise & 24K Gold Foil",
    price: "$420",
    primaryHex: "#44BDBD", // GuzelAI Turquoise
    flameHex: "#FBC056", // GuzelAI Gold
    accentHex: "#171717",
    modelPair: AI_MODELS.find((m) => m.id === "yuki-bloom") || AI_MODELS[0],
    tagline: "GuzelAI Kurumsal İmzası • Sınırlı Üretim Sanal Drop",
  },
  {
    id: "sunset-blaze",
    name: "Sunset Blaze Solar Orange",
    price: "$395",
    primaryHex: "#FAF8F5",
    flameHex: "#FB5D2E", // GuzelAI Orange
    accentHex: "#B8A1CF", // GuzelAI Lavender
    modelPair: AI_MODELS.find((m) => m.id === "valentina-cruz") || AI_MODELS[0],
    tagline: "Kaliforniya Günbatımı Alevi & Bal Peteği Taban",
  },
];

// FORMAT 3: Botanical Elixir & Kombucha Kinetic Bottle (Video 3 Inspiration)
interface KombuchaFlavor {
  id: string;
  name: string;
  tasteHook: string;
  bgHex: string;
  bgGradient: string;
  textColor: string;
  accentPill: string;
  bottleLabelColor: string;
  volume: string;
  specs: string[];
  modelPair: AIModel;
  wellnessQuote: string;
  stickerIcons: string[];
}

const KOMBUCHA_FLAVORS: KombuchaFlavor[] = [
  {
    id: "chokeberry",
    name: "Chokeberry & Wild Plum",
    tasteHook: "Unforgettable Deep Berry Sensation",
    bgHex: "#F4EFF8",
    bgGradient: "from-[#F3E8FF] via-[#E9D5FF] to-[#FAF8F5]",
    textColor: "#3B1B54",
    accentPill: "#B8A1CF", // GuzelAI Lavender
    bottleLabelColor: "#8E44AD",
    volume: "330 ml",
    specs: ["Fermente Karbonatlı Çay", "Soğuk Sıkım Aronya Özü", "Sıfır İlave Şeker • Prebiyotik", "Canlandırıcı Antioksidan"],
    modelPair: AI_MODELS.find((m) => m.id === "yuki-bloom") || AI_MODELS[0],
    wellnessQuote: "Cam gibi parlayan bir ten için sabahları fermente aronya eliksiri içiyorum.",
    stickerIcons: ["🌸", "🫐", "✨", "💜"],
  },
  {
    id: "strawberry-rose",
    name: "Wild Strawberry & Damask Rose",
    tasteHook: "Ocean of Sweet & Sour Carelessness",
    bgHex: "#FDF2F4",
    bgGradient: "from-[#FFE4E6] via-[#FECDD3] to-[#FAF8F5]",
    textColor: "#5A1E2D",
    accentPill: "#E65A7F", // GuzelAI Pink
    bottleLabelColor: "#E65A7F",
    volume: "330 ml",
    specs: ["Doğal Çilek Püresi", "Isparta Gülü Hidrosolü", "Canlı Probiyotik Kültürleri", "Hücresel Nem Desteği"],
    modelPair: AI_MODELS.find((m) => m.id === "aura-kaya") || AI_MODELS[0],
    wellnessQuote: "Gül ve dağ çileği ikilisi gün boyu enerjimi yüksek ve zihnimi berrak tutuyor.",
    stickerIcons: ["🍓", "🌹", "💧", "💖"],
  },
  {
    id: "yuzu-ginger",
    name: "Spicy Yuzu & Mountain Ginger",
    tasteHook: "Wanna Try the Fiery Taste of Asia?",
    bgHex: "#FEFCE8",
    bgGradient: "from-[#FEF9C3] via-[#FEF08A] to-[#FAF8F5]",
    textColor: "#573903",
    accentPill: "#FBC056", // GuzelAI Gold
    bottleLabelColor: "#D97706",
    volume: "330 ml",
    specs: ["Japon Yuzu Narenciyesi", "Acı Dağ Zencefili", "Metabolizma Hızlandırıcı", "Doğal Elektrolit Dengesi"],
    modelPair: AI_MODELS.find((m) => m.id === "mei-lin") || AI_MODELS[0],
    wellnessQuote: "Zencefilin canlandırıcı acısı sabah çekimlerinde anında uyanış sağlıyor.",
    stickerIcons: ["🍋", "⚡", "☀️", "🌿"],
  },
];

// FORMAT 4: 3D Refreshing Drinks Without A Hangover Can (Video 4 Inspiration)
interface DrinkCanItem {
  id: string;
  name: string;
  tagline: string;
  canColor: string;
  canPatternHex: string;
  badgeHex: string;
  modelPair: AIModel;
  keyBenefits: string[];
}

const DRINK_CANS: DrinkCanItem[] = [
  {
    id: "tropical-depression",
    name: "TROPICAL SUNSHINE",
    tagline: "Ananas, Çarkıfelek & Elektrolit Dalgası",
    canColor: "#FCD34D",
    canPatternHex: "#44BDBD",
    badgeHex: "#FBC056",
    modelPair: AI_MODELS.find((m) => m.id === "chloe-bennett") || AI_MODELS[0],
    keyBenefits: ["0% Alkol", "Sabah Baş Ağrısı Yok", "B-Kompleks Vitaminleri", "Biyolojik Hidrasyon"],
  },
  {
    id: "sweet-poison",
    name: "SWEET POISON PINK",
    tagline: "Ejder Meyvesi, Nane & Pembe Greyfurt",
    canColor: "#F472B6",
    canPatternHex: "#818CF8",
    badgeHex: "#E65A7F",
    modelPair: AI_MODELS.find((m) => m.id === "valentina-cruz") || AI_MODELS[0],
    keyBenefits: ["Doğal Meyve Şekeri", "Anti-Hangover Kaktüs Ekstresi", "L-Teanin Odaklanma", "Glütensiz Vegan"],
  },
  {
    id: "drunk-sailor",
    name: "SAILOR NO-ALC",
    tagline: "Karasakız Yaban Mersini & Deniz Tuzu",
    canColor: "#818CF8",
    canPatternHex: "#FCD34D",
    badgeHex: "#B8A1CF",
    modelPair: AI_MODELS.find((m) => m.id === "kenzo-takahashi") || AI_MODELS[0],
    keyBenefits: ["Magnezyum & Çinko", "Doğal Gazlı Karbonatlı", "Gece Boyu Sosyalleşme", "Ertesi Gün %100 Zindelik"],
  },
];

// FORMAT 5: Gourmet Culinary "Pick Your Cut" (Video 5 Inspiration)
interface GourmetCutItem {
  id: string;
  name: string;
  japaneseName: string;
  section: string;
  pricePerWeight: string;
  fatRatio: string;
  texture: string;
  description: string;
  chefPairing: string;
  cutSvgSliceIndex: number;
}

const GOURMET_CUTS: GourmetCutItem[] = [
  {
    id: "salmon-belly",
    name: "Salmon Belly (Toro Somon)",
    japaneseName: "サーモンハラス (Sake Harasu)",
    section: "Alt Göbek Yağlı Kısmı",
    pricePerWeight: "£6.90 / 50g",
    fatRatio: "%28 Zengin Omega-3 Mermerleşme",
    texture: "Ağızda eriyen ipeksi kremsi doku",
    description: "Somonun en lezzetli ve yağlı göbek filetosu. Kızgın ızgarada dışı çıtır, içi kremsi dokuyla damakta patlar.",
    chefPairing: "Taze rendelenmiş Şizuoka vasabisi ve soğuk sake",
    cutSvgSliceIndex: 0,
  },
  {
    id: "salmon-loin",
    name: "Salmon Top Loin (Sırt Fileto)",
    japaneseName: "サーモン背身 (Sake Loin)",
    section: "Orta Sırt Kas Bölgesi",
    pricePerWeight: "£5.50 / 50g",
    fatRatio: "%14 Dengeli Protein & Yağ Oranı",
    texture: "Sıkı, diri ve parlak sashimi kesimi",
    description: "Sashimi ve nigiri için ideal homojen kesim. Saf deniz minerali ve tatlı somon lezzeti.",
    chefPairing: "Ponzu sos, ince kıyılmış Frenk soğanı ve zencefil",
    cutSvgSliceIndex: 1,
  },
  {
    id: "otoro-tuna",
    name: "Bluefin Otoro (Mavi Yüzgeçli Orkinos)",
    japaneseName: "大トロ (Otoro Tuna)",
    section: "En Üst Kademe Karın Katmanı",
    pricePerWeight: "£14.50 / 50g",
    fatRatio: "%38 Kar Tanesi Mermer Yağ Doku",
    texture: "Vücut ısısında tamamen eriyen lüks",
    description: "Tokyo Tsukiji müzayedelerinin gözdesi. Dünyanın en prestijli suşi şeflerinin başyapıtı.",
    chefPairing: "Altın varak ve 20 yıllık fermente soya sosu",
    cutSvgSliceIndex: 2,
  },
  {
    id: "wagyu-a5",
    name: "Kagoshima A5 Wagyu Ribcap",
    japaneseName: "鹿児島県産 A5 和牛",
    section: "Kaburga Üstü Mermer Dokusu",
    pricePerWeight: "£22.00 / 50g",
    fatRatio: "BMS 12 (En Yüksek Dünya Skoru)",
    texture: "Kadife gibi lifsiz benzersiz et deneyimi",
    description: "GuzelAI lüks gastronomi çekimlerinin yıldızı. Elena Rostova'nın Michelin restorasyon kampanyası.",
    chefPairing: "Kızarmış sarımsak cipsi ve pembe Himalaya tuzu",
    cutSvgSliceIndex: 3,
  },
];

// FORMAT 6: AeroLux Private Jet & 10.000€ 3D Interactive (Video 6 Inspiration)
interface JetFeaturePoint {
  id: string;
  title: string;
  desc: string;
  x: number; // percentage
  y: number; // percentage
}

const JET_HOTSPOTS: JetFeaturePoint[] = [
  { id: "engines", title: "Rolls-Royce Pearl 700", desc: "Mach 0.925 ses altı en yüksek seyir hızı, ultra düşük emisyon", x: 28, y: 52 },
  { id: "cabin", title: "Whisper-Quiet VIP Suite", desc: "42 dB kütüphane sessizliğinde 14 kişilik özel toplantı ve yatak odası", x: 55, y: 48 },
  { id: "cockpit", title: "Symmetry Flight Deck", desc: "Yapay zeka destekli dokunmatik aviyonik ve 3D görüş sistemi", x: 80, y: 48 },
  { id: "wifi", title: "Ka-Band Ultra Hızlı Uydu", desc: "40.000 fitte kesintisiz 4K canlı yayın ve borsa bağlantısı", x: 42, y: 32 },
];

export const InteractiveAdFormatsSection: React.FC<InteractiveAdFormatsSectionProps> = ({
  t,
  onOpenFullStudio,
  onSendToVideoStudio,
}) => {
  // Global Active Format Tab (0 to 5 for the 6 reference videos)
  const [activeTab, setActiveTab] = useState<number>(0);

  // Stream / Video Motion View vs 3D Interactive Simulator View
  const [displayMode, setDisplayMode] = useState<"interactive" | "video_motion">("interactive");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isPlayingMotion, setIsPlayingMotion] = useState<boolean>(true);

  // FORMAT 1 STATES (Microcar)
  const [activeCarIdx, setActiveCarIdx] = useState<number>(0);
  const [isCarModalOpen, setIsCarModalOpen] = useState<boolean>(false);
  const currentCar = MICROCAR_COLLECTION[activeCarIdx];

  // FORMAT 2 STATES (Sneaker)
  const [activeSneakerIdx, setActiveSneakerIdx] = useState<number>(0);
  const [sneakerRotation, setSneakerRotation] = useState<number>(15);
  const [selectedShoeSize, setSelectedShoeSize] = useState<number>(42);
  const currentSneaker = SNEAKER_COLORWAYS[activeSneakerIdx];

  // FORMAT 3 STATES (Kombucha Tilt Bottle)
  const [activeKombuchaIdx, setActiveKombuchaIdx] = useState<number>(0);
  const [bottleTiltAngle, setBottleTiltAngle] = useState<number>(-12);
  const currentKombucha = KOMBUCHA_FLAVORS[activeKombuchaIdx];

  // FORMAT 4 STATES (Beverage Can)
  const [activeCanIdx, setActiveCanIdx] = useState<number>(0);
  const [canRotationAngle, setCanRotationAngle] = useState<number>(0);
  const currentCan = DRINK_CANS[activeCanIdx];

  // FORMAT 5 STATES (Gourmet Cuts)
  const [activeCutIdx, setActiveCutIdx] = useState<number>(0);
  const [slicedPieces, setSlicedPieces] = useState<boolean[]>([false, false, false, false, false]);
  const currentCut = GOURMET_CUTS[activeCutIdx];

  // FORMAT 6 STATES (Private Jet)
  const [activeJetPoint, setActiveJetPoint] = useState<JetFeaturePoint | null>(JET_HOTSPOTS[1]);
  const [cabinMoodLight, setCabinMoodLight] = useState<"champagne" | "midnight" | "monaco">("champagne");

  // Web Audio Synthesizer for tactile physical clicks
  const playSynthesizerSfx = (type: "car_rev" | "sneaker_squeak" | "bottle_fizz" | "can_pop" | "knife_slice" | "jet_chime") => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();

      if (type === "knife_slice") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "can_pop") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "bottle_fizz") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else if (type === "jet_chime") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch {
      // AudioContext safety
    }
  };

  // Auto-motion loop when in Video Motion mode
  useEffect(() => {
    if (displayMode !== "video_motion" || !isPlayingMotion) return;
    const interval = setInterval(() => {
      // Subtle continuous animation
      setSneakerRotation((prev) => (prev + 1.5) % 360);
      setCanRotationAngle((prev) => (prev + 2) % 360);
      setBottleTiltAngle((prev) => (Math.sin(Date.now() / 800) * 18));
    }, 40);
    return () => clearInterval(interval);
  }, [displayMode, isPlayingMotion]);

  // Tab definitions
  const FORMAT_TABS = [
    { id: 0, label: "01. Riviera Microcars", subtitle: "Vintage Otomotiv & Valentino", icon: Car, model: "Valentina Cruz", color: "#DC2626" },
    { id: 1, label: "02. AeroFlame 3D Sneaker", subtitle: "3D Dönen Sokak Stili", icon: Footprints, model: "Kenzo & Chloe", color: "#44BDBD" },
    { id: 2, label: "03. Botanical Elixir", subtitle: "Kinetik Eğik Cam Şişe", icon: Wine, model: "Yuki Bloom", color: "#B8A1CF" },
    { id: 3, label: "04. Seltz 3D Hangover-Free", subtitle: "3D Kutu & Kinetik Tipografi", icon: Zap, model: "Chloe Bennett", color: "#FBC056" },
    { id: 4, label: "05. Kaiseki Gourmet Cuts", subtitle: "İnteraktif Bıçak & Fileto", icon: Utensils, model: "Elena Rostova", color: "#FB5D2E" },
    { id: 5, label: "06. AeroLux Private Jet", subtitle: "10.000€ Lüks Havacılık 3D", icon: Plane, model: "Elena & Scarlett", color: "#171717" },
  ];

  return (
    <section
      id="interactive-formats-section"
      className="relative py-20 sm:py-28 bg-[#FAF8F5] text-[#171717] overflow-hidden border-b border-[#171717]/8"
    >
      {/* Atelier Background Lines & Crop Marks */}
      <AtelierCropMarks className="opacity-30" />
      <div className="absolute right-6 top-16 hidden xl:block opacity-25 pointer-events-none">
        <AtelierIllustratorStamp title="COMMERCIAL 3D" subtitle="VIRAL LAB 2026" year="2026" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ========================================================================= */}
        {/* SECTION HEADER & BRAND MANIFESTO                                          */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-[#E65A7F]/10 text-[#E65A7F] border border-[#E65A7F]/20">
                PREMİUM VİRAL &amp; 3D REKLAM FORMATLARI
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#171717]/5 text-[#171717]/70">
                6 CANLI AKIŞ MODELİ
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#41631E]/10 text-[#41631E]">
                %100 Telifsiz Ticari Lisans
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171717] tracking-tight leading-tight">
              Canlı, Yaratıcı &amp; Modellerimizle Güçlendirilmiş Reklam Deneyimleri
            </h2>

            <p className="text-base text-[#171717]/75 font-normal leading-relaxed">
              Statik afişler ve sıkıcı bannerlar geride kaldı. Premium markaların dikkatini çekmek için hazırladığımız
              bu 6 interaktif video ve 3D reklam akışı; <strong>Valentina Cruz, Yuki Bloom, Elena Rostova ve Kenzo</strong> gibi
              özgün AI modellerimizin aurasını kinetik web mühendisliğiyle harmanlar.
            </p>
          </div>

          {/* Controls: Audio Synthesizer & Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Audio Toggle */}
            <button
              id="btn-interactive-sound-toggle"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playSynthesizerSfx("can_pop");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition border ${
                soundEnabled
                  ? "bg-[#171717] text-white border-[#171717]"
                  : "bg-white text-[#171717]/70 border-[#171717]/10 hover:bg-[#FAF8F5]"
              }`}
              title="Kinetik Ses Efektlerini Aç/Kapat"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#44BDBD]" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? "Ses Efektleri: AÇIK" : "Ses: KAPALI"}</span>
            </button>

            {/* Display Mode: Live Video Motion vs 3D Simulator */}
            <div className="p-1 rounded-xl bg-white border border-[#171717]/10 flex items-center shadow-xs">
              <button
                id="btn-mode-interactive"
                onClick={() => setDisplayMode("interactive")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  displayMode === "interactive"
                    ? "bg-[#171717] text-white shadow-xs"
                    : "text-[#171717]/70 hover:text-[#171717]"
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-[#E65A7F]" />
                <span>3D İnteraktif</span>
              </button>
              <button
                id="btn-mode-video-motion"
                onClick={() => setDisplayMode("video_motion")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  displayMode === "video_motion"
                    ? "bg-[#171717] text-white shadow-xs"
                    : "text-[#171717]/70 hover:text-[#171717]"
                }`}
              >
                <Film className="w-3.5 h-3.5 text-[#44BDBD]" />
                <span>Video Akışı</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FORMAT SELECTION TABS                                                     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {FORMAT_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-format-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  playSynthesizerSfx("can_pop");
                }}
                className={`p-3.5 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between gap-3 ${
                  isActive
                    ? "bg-[#171717] text-white border-[#171717] shadow-lg shadow-black/10 scale-[1.02]"
                    : "bg-white text-[#171717] border-[#171717]/10 hover:border-[#171717]/30 hover:bg-[#FAF8F5]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: isActive ? tab.color : "rgba(23,23,23,0.06)" }}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#171717]"}`} />
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#44BDBD] animate-pulse" />}
                </div>

                <div>
                  <div className="text-xs font-black tracking-tight line-clamp-1">{tab.label}</div>
                  <div className={`text-[10px] font-medium line-clamp-1 ${isActive ? "text-white/70" : "text-[#171717]/50"}`}>
                    {tab.model}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* MAIN STAGE: THE 6 INTERACTIVE FORMAT SHOWCASES                             */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden border border-[#171717]/10 bg-white shadow-xl shadow-black/4 min-h-[580px] flex flex-col">

          {/* --------------------------------------------------------------------- */}
          {/* FORMAT 1: RIVIERA MICROCARS & VINTAGE ROADSTERS (Video 1 Inspiration) */}
          {/* --------------------------------------------------------------------- */}
          {activeTab === 0 && (
            <div className="flex-1 flex flex-col" style={{ backgroundColor: currentCar.bgTone }}>
              {/* Top Navigation & Timeline Bar */}
              <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#171717]/8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717]/60">
                      {currentCar.country} • {currentCar.yearSpan}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DC2626]/10 text-[#DC2626]">
                      {currentCar.modelRole}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
                    {currentCar.name}
                  </h3>
                </div>

                {/* Car Selector Buttons */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {MICROCAR_COLLECTION.map((car, idx) => (
                    <button
                      key={car.id}
                      onClick={() => {
                        setActiveCarIdx(idx);
                        playSynthesizerSfx("car_rev");
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                        activeCarIdx === idx
                          ? "bg-[#171717] text-white border-[#171717]"
                          : "bg-white/80 text-[#171717]/70 border-[#171717]/10 hover:bg-white"
                      }`}
                    >
                      {car.name.split(" ")[1] || car.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Visual Arena: Car Silhouette + Valentina Cruz Avatar + Horizontal Slide Track */}
              <div className="flex-1 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Left: Model & Automotive Storytelling */}
                <div className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <div className="text-xs uppercase font-extrabold tracking-widest text-[#E65A7F]">
                      {currentCar.tagline}
                    </div>
                    <p className="text-sm sm:text-base text-[#171717]/80 leading-relaxed font-normal">
                      {currentCar.description}
                    </p>
                  </div>

                  {/* Valentina Cruz Model Card Snapshot */}
                  <div className="p-4 rounded-2xl bg-white/90 border border-[#171717]/10 flex items-center gap-4 shadow-xs">
                    <img
                      src={currentCar.modelPair.avatar}
                      alt={currentCar.modelPair.name}
                      className="w-14 h-14 rounded-xl object-cover border border-[#171717]/10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-[#171717]">{currentCar.modelPair.name}</div>
                      <div className="text-[11px] text-[#171717]/60">{currentCar.lookbookAngle}</div>
                      <div className="text-[10px] font-bold text-[#E65A7F] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Kırmızı Elbise &amp; Süper Otomobil Çekimlerine Hazır</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      id="btn-discover-car-modal"
                      onClick={() => {
                        setIsCarModalOpen(true);
                        playSynthesizerSfx("car_rev");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#171717] text-white text-xs font-bold flex items-center gap-2 hover:bg-black transition shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#44BDBD]" />
                      <span>Teknik Detayları Keşfet</span>
                    </button>
                    {onOpenFullStudio && (
                      <button
                        onClick={() => onOpenFullStudio("photoshoot_wizard", currentCar.modelPair)}
                        className="px-5 py-2.5 rounded-xl bg-[#E65A7F] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#d8496e] transition shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Valentina ile Çekim Başlat</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right: Interactive 3D Car Vector Illustration with Multi-Angle Carousel */}
                <div className="flex-1 w-full max-w-xl flex flex-col items-center justify-center relative">
                  <div className="w-full relative aspect-16/10 rounded-3xl bg-white/60 p-6 flex items-center justify-center border border-[#171717]/8 shadow-sm">
                    {/* SVG Vector Microcar Art (Recreated purely in handcrafted vector lines) */}
                    <svg viewBox="0 0 400 240" className="w-full h-auto drop-shadow-md">
                      {/* Ground Shadow */}
                      <ellipse cx="200" cy="205" rx="140" ry="14" fill="rgba(23,23,23,0.12)" />

                      {/* Main Car Body Form */}
                      <path
                        d="M 90 190 C 70 190, 60 170, 70 140 C 80 100, 110 70, 160 60 C 220 50, 310 65, 330 110 C 340 140, 345 170, 335 190 Z"
                        fill={currentCar.colorHex}
                        stroke="#171717"
                        strokeWidth="3.5"
                      />

                      {/* Roof / Bubble Window */}
                      <path
                        d="M 120 130 C 130 90, 160 75, 210 72 C 260 70, 300 85, 315 125 Z"
                        fill="#FFFFFF"
                        fillOpacity="0.85"
                        stroke="#171717"
                        strokeWidth="2.5"
                      />

                      {/* Door Seam & Front Hinge Details */}
                      <line x1="170" y1="72" x2="165" y2="190" stroke="#171717" strokeWidth="2" strokeDasharray="3 3" />
                      <line x1="250" y1="72" x2="250" y2="190" stroke="#171717" strokeWidth="1.5" />

                      {/* Headlight (Chrome Rim) */}
                      <circle cx="85" cy="145" r="14" fill="#FFFFFF" stroke="#171717" strokeWidth="2.5" />
                      <circle cx="85" cy="145" r="8" fill="#FBC056" />

                      {/* Front Chrome Bumper */}
                      <path d="M 65 175 C 60 180, 85 188, 105 185" fill="none" stroke="#C0C0C0" strokeWidth="4" strokeLinecap="round" />

                      {/* Wheels & Tires */}
                      {/* Left Wheel */}
                      <circle cx="130" cy="195" r="24" fill="#262626" stroke="#171717" strokeWidth="2" />
                      <circle cx="130" cy="195" r="14" fill="#ECECEE" />
                      <circle cx="130" cy="195" r="6" fill="#171717" />
                      {/* Right Wheel */}
                      <circle cx="295" cy="195" r="24" fill="#262626" stroke="#171717" strokeWidth="2" />
                      <circle cx="295" cy="195" r="14" fill="#ECECEE" />
                      <circle cx="295" cy="195" r="6" fill="#171717" />

                      {/* Wicker Picnic Basket on Rear Rack (Reference to Video 1!) */}
                      <rect x="290" y="85" width="36" height="26" rx="4" fill="#C29B38" stroke="#171717" strokeWidth="2" />
                      <line x1="290" y1="98" x2="326" y2="98" stroke="#8A6715" strokeWidth="1.5" />
                      <line x1="308" y1="85" x2="308" y2="111" stroke="#8A6715" strokeWidth="1.5" />
                    </svg>

                    {/* Badge: Model Matching Indicator */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-[#171717] border border-[#171717]/10 flex items-center gap-1.5 shadow-xs">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentCar.colorHex }} />
                      <span>{currentCar.colorName}</span>
                    </div>

                    <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[#171717]/50">
                      GuzelAI 3D Automotive Studio Engine
                    </div>
                  </div>

                  {/* Horizontal Timeline Track (Direct Reference to Video 1 Slider) */}
                  <div className="w-full mt-4 px-2 flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold text-[#171717]/50">1955</span>
                    <div className="flex-1 h-1.5 bg-[#171717]/15 rounded-full relative flex items-center justify-between">
                      {MICROCAR_COLLECTION.map((car, idx) => (
                        <button
                          key={car.id}
                          onClick={() => {
                            setActiveCarIdx(idx);
                            playSynthesizerSfx("car_rev");
                          }}
                          className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                            activeCarIdx === idx
                              ? "bg-[#171717] border-white scale-125 shadow-xs"
                              : "bg-white border-[#171717]/40 hover:scale-110"
                          }`}
                          title={car.name}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#171717]/50">2005</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORMAT 2: AEROFLAME 3D LUXURY SNEAKER DROP (Video 2 Inspiration)      */}
          {/* --------------------------------------------------------------------- */}
          {activeTab === 1 && (
            <div className="flex-1 flex flex-col lg:flex-row bg-[#FAF8F5]">
              {/* Left: Interactive 3D Rotating Sneaker Canvas */}
              <div className="flex-1 p-8 sm:p-12 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-[#171717]/8">
                {/* Floating 3D Sneaker SVG with dynamic interactive angle rotation */}
                <div
                  className="w-full max-w-md aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform duration-300"
                  style={{
                    transform: `rotate(${sneakerRotation}deg)`,
                  }}
                  onMouseDown={() => playSynthesizerSfx("sneaker_squeak")}
                >
                  <svg viewBox="0 0 360 240" className="w-full h-auto drop-shadow-2xl">
                    {/* Shadow */}
                    <ellipse cx="180" cy="210" rx="130" ry="14" fill="rgba(23,23,23,0.15)" />

                    {/* Sole / Midsole with Air Cushion */}
                    <path
                      d="M 60 170 C 90 170, 140 175, 200 175 C 260 175, 300 165, 315 155 C 320 180, 300 195, 240 195 C 160 195, 80 192, 50 182 Z"
                      fill="#FFFFFF"
                      stroke="#171717"
                      strokeWidth="3"
                    />

                    {/* Honeycomb Air Cells inside Midsole */}
                    <rect x="220" y="177" width="16" height="8" rx="2" fill={currentSneaker.flameHex} />
                    <rect x="242" y="177" width="16" height="8" rx="2" fill={currentSneaker.flameHex} />
                    <rect x="264" y="177" width="16" height="8" rx="2" fill={currentSneaker.flameHex} />

                    {/* Main Upper (Leather / Suede) */}
                    <path
                      d="M 60 170 C 55 140, 75 110, 110 115 C 140 120, 165 95, 200 80 C 235 68, 260 85, 265 115 C 275 125, 305 135, 315 155 Z"
                      fill={currentSneaker.primaryHex}
                      stroke="#171717"
                      strokeWidth="3"
                    />

                    {/* Flame Decal (Palm Angels / Streetwear Signature!) */}
                    <path
                      d="M 120 160 C 135 145, 140 120, 165 125 C 175 110, 195 105, 220 95 C 215 115, 230 120, 245 115 C 235 135, 255 145, 280 155 Z"
                      fill={currentSneaker.flameHex}
                      stroke="#171717"
                      strokeWidth="2"
                    />

                    {/* Eyelets and Laces */}
                    <path d="M 180 95 L 210 115 M 190 88 L 220 108 M 205 82 L 230 102" stroke="#171717" strokeWidth="2.5" />

                    {/* Heel Tab with GuzelAI Luxury Badge */}
                    <rect x="68" y="125" width="28" height="14" rx="3" fill="#171717" />
                    <text x="71" y="135" fill="#FFFFFF" fontSize="6" fontWeight="bold">GUZELAI</text>
                  </svg>
                </div>

                {/* Interactive Angle Slider */}
                <div className="w-full max-w-xs mt-6 flex items-center gap-3 bg-white/80 p-3 rounded-2xl border border-[#171717]/10">
                  <span className="text-[11px] font-bold text-[#171717]/60">360° Açı</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={sneakerRotation}
                    onChange={(e) => {
                      setSneakerRotation(Number(e.target.value));
                      playSynthesizerSfx("sneaker_squeak");
                    }}
                    className="flex-1 accent-[#E65A7F] cursor-pointer"
                  />
                  <span className="text-[11px] font-mono font-bold text-[#171717]">{sneakerRotation}°</span>
                </div>
              </div>

              {/* Right: Streetwear Drop Product Details & Model Pair */}
              <div className="flex-1 p-8 sm:p-12 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#44BDBD]">
                      LIMITED DROP • SSENSE &amp; EDITORIAL VIBES
                    </span>
                    <h3 className="text-3xl font-black text-[#171717] tracking-tight mt-1">
                      {currentSneaker.name}
                    </h3>
                    <div className="text-2xl font-black text-[#E65A7F] mt-2">
                      {currentSneaker.price} <span className="text-xs font-normal text-[#171717]/50">(Özel Üretim)</span>
                    </div>
                  </div>

                  {/* Colorway Switcher Dots (Direct Reference to Video 2!) */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#171717]/70">Renk Varyantı Seçin:</span>
                    <div className="flex items-center gap-3">
                      {SNEAKER_COLORWAYS.map((c, idx) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setActiveSneakerIdx(idx);
                            playSynthesizerSfx("sneaker_squeak");
                          }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center p-1 border-2 transition-all ${
                            activeSneakerIdx === idx ? "border-[#171717] scale-110 shadow-md" : "border-transparent"
                          }`}
                          title={c.name}
                        >
                          <div
                            className="w-full h-full rounded-full shadow-inner border border-black/10"
                            style={{
                              background: `linear-gradient(135deg, ${c.primaryHex} 40%, ${c.flameHex} 60%)`,
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Shoe Size Selector */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#171717]/70">Beden Seçimi:</span>
                    <div className="flex items-center gap-2">
                      {[40, 41, 42, 43, 44, 45].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedShoeSize(size)}
                          className={`w-10 h-10 rounded-xl text-xs font-bold border transition ${
                            selectedShoeSize === size
                              ? "bg-[#171717] text-white border-[#171717]"
                              : "bg-white text-[#171717]/70 border-[#171717]/10 hover:bg-[#FAF8F5]"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Model Pairing Card */}
                  <div className="p-4 rounded-2xl bg-white border border-[#171717]/10 flex items-center gap-4">
                    <img
                      src={currentSneaker.modelPair.avatar}
                      alt={currentSneaker.modelPair.name}
                      className="w-12 h-12 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-[#171717]">{currentSneaker.modelPair.name}</div>
                      <div className="text-[11px] text-[#171717]/60">Sokak Modası &amp; Viral Sneaker Yüzü</div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#171717]/8">
                  <button
                    onClick={() => {
                      if (onOpenFullStudio) onOpenFullStudio("photoshoot_wizard", currentSneaker.modelPair);
                    }}
                    className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-[#171717] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-black transition shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#44BDBD]" />
                    <span>Sneaker Kampanyası Oluştur</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORMAT 3: BOTANICAL ELIXIR & KOMBUCHA TILT BOTTLE (Video 3 Inspiration)*/}
          {/* --------------------------------------------------------------------- */}
          {activeTab === 2 && (
            <div className={`flex-1 flex flex-col lg:flex-row transition-colors duration-500 bg-gradient-to-br ${currentKombucha.bgGradient}`}>
              {/* Left: Tilting Artisanal Bottle Visual with Hand-Drawn Fruit Doodles */}
              <div className="flex-1 p-8 sm:p-12 flex flex-col items-center justify-center relative">
                {/* Floating Fruit Sticker Icons */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <span className="absolute top-12 left-16 text-3xl animate-bounce">{currentKombucha.stickerIcons[0]}</span>
                  <span className="absolute top-20 right-20 text-3xl animate-pulse">{currentKombucha.stickerIcons[1]}</span>
                  <span className="absolute bottom-16 left-24 text-2xl">{currentKombucha.stickerIcons[2]}</span>
                  <span className="absolute bottom-24 right-16 text-3xl animate-bounce">{currentKombucha.stickerIcons[3]}</span>
                </div>

                {/* Tilting Bottle SVG */}
                <div
                  className="w-48 sm:w-60 relative transition-transform duration-300 cursor-pointer"
                  style={{ transform: `rotate(${bottleTiltAngle}deg)` }}
                  onClick={() => {
                    setBottleTiltAngle((prev) => (prev > 0 ? -16 : 16));
                    playSynthesizerSfx("bottle_fizz");
                  }}
                >
                  <svg viewBox="0 0 160 380" className="w-full h-auto drop-shadow-xl">
                    {/* Shadow */}
                    <ellipse cx="80" cy="365" rx="55" ry="10" fill="rgba(23,23,23,0.15)" />

                    {/* Bottle Cap (Crown or Swing top) */}
                    <rect x="68" y="20" width="24" height="14" rx="3" fill="#D4AF37" stroke="#171717" strokeWidth="2" />
                    <line x1="72" y1="27" x2="88" y2="27" stroke="#997C23" strokeWidth="1.5" />

                    {/* Bottle Neck */}
                    <path
                      d="M 72 34 L 72 90 C 72 130, 40 145, 38 180 L 38 340 C 38 355, 122 355, 122 340 L 122 180 C 120 145, 88 130, 88 90 L 88 34 Z"
                      fill="#7A4B2A"
                      fillOpacity="0.85"
                      stroke="#171717"
                      strokeWidth="3"
                    />

                    {/* Paper Label (Central) */}
                    <rect x="42" y="180" width="76" height="110" rx="6" fill="#FAF8F5" stroke="#171717" strokeWidth="2" />

                    {/* Typography on Label */}
                    <text x="80" y="210" textAnchor="middle" fill="#171717" fontSize="11" fontWeight="900" letterSpacing="1">
                      KØMBCH
                    </text>
                    <text x="80" y="222" textAnchor="middle" fill="#171717" opacity="0.6" fontSize="6" fontWeight="bold">
                      FERMENTED BOTANICAL TEA
                    </text>

                    {/* Illustrated Fruit Graphic on Label */}
                    <circle cx="80" cy="250" r="16" fill={currentKombucha.bottleLabelColor} />
                    <text x="80" y="255" textAnchor="middle" fill="#FFFFFF" fontSize="12">
                      {currentKombucha.stickerIcons[0]}
                    </text>

                    <text x="80" y="280" textAnchor="middle" fill="#171717" fontSize="7" fontWeight="bold">
                      {currentKombucha.name.split(" ")[0]}
                    </text>
                  </svg>
                </div>

                {/* Tilt Physics Controller */}
                <div className="mt-8 flex items-center gap-3 bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-[#171717]/10 shadow-xs">
                  <span className="text-xs font-bold text-[#171717]/70">Şişe Açısı:</span>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    value={bottleTiltAngle}
                    onChange={(e) => {
                      setBottleTiltAngle(Number(e.target.value));
                      playSynthesizerSfx("bottle_fizz");
                    }}
                    className="accent-[#B8A1CF] cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold">{bottleTiltAngle}°</span>
                </div>
              </div>

              {/* Right: Flavor Breakdown & Yuki Bloom Wellness Routine */}
              <div className="flex-1 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-white/80 backdrop-blur-xs border-t lg:border-t-0 lg:border-l border-[#171717]/8">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: currentKombucha.bottleLabelColor }}>
                        {currentKombucha.volume}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#171717]/50">Prebiyotik İksir</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-black text-[#171717] tracking-tight mt-2">
                      {currentKombucha.name}
                    </h3>
                    <p className="text-sm font-bold text-[#171717]/70 mt-1">
                      {currentKombucha.tasteHook}
                    </p>
                  </div>

                  {/* Flavor Switcher Pills */}
                  <div className="flex flex-wrap gap-2">
                    {KOMBUCHA_FLAVORS.map((f, idx) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          setActiveKombuchaIdx(idx);
                          playSynthesizerSfx("bottle_fizz");
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                          activeKombuchaIdx === idx
                            ? "bg-[#171717] text-white border-[#171717] shadow-sm"
                            : "bg-white text-[#171717]/70 border-[#171717]/10 hover:bg-[#FAF8F5]"
                        }`}
                      >
                        {f.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>

                  {/* Ingredients Checklist */}
                  <div className="space-y-2 border-t border-[#171717]/8 pt-4">
                    {currentKombucha.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#171717]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#41631E]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Yuki Bloom Model Card */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#171717]/10 flex items-center gap-4">
                    <img
                      src={currentKombucha.modelPair.avatar}
                      alt={currentKombucha.modelPair.name}
                      className="w-12 h-12 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-[#171717]">{currentKombucha.modelPair.name} (Glass Skin İkonu)</div>
                      <div className="text-[11px] text-[#171717]/60 italic">"{currentKombucha.wellnessQuote}"</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onOpenFullStudio) onOpenFullStudio("photoshoot_wizard", currentKombucha.modelPair);
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#171717] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-black transition shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-[#B8A1CF]" />
                  <span>Kombucha &amp; İçecek Reklam Filmini Çek</span>
                </button>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORMAT 4: 3D REFRESHING DRINKS WITHOUT A HANGOVER CAN (Video 4)       */}
          {/* --------------------------------------------------------------------- */}
          {activeTab === 3 && (
            <div className="flex-1 flex flex-col bg-[#1E1B4B] text-white p-8 sm:p-12 relative overflow-hidden">
              {/* Kinetic Typography Marquee Behind Can (Reference to Video 4!) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
                <div className="text-6xl sm:text-8xl md:text-9xl font-black text-center text-white tracking-tighter leading-none">
                  REFRESHING DRINKS WITHOUT A HANGOVER
                </div>
              </div>

              {/* Header Info */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#FBC056] text-[#171717]">
                    0% ALCOHOL • 100% BUZZ
                  </span>
                  <h3 className="text-3xl font-black tracking-tight mt-2 text-white">
                    {currentCan.name}
                  </h3>
                </div>

                {/* Flavor Switcher */}
                <div className="flex items-center gap-2">
                  {DRINK_CANS.map((can, idx) => (
                    <button
                      key={can.id}
                      onClick={() => {
                        setActiveCanIdx(idx);
                        playSynthesizerSfx("can_pop");
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                        activeCanIdx === idx
                          ? "bg-white text-[#171717] border-white shadow-md"
                          : "bg-white/10 text-white/70 border-white/10 hover:bg-white/20"
                      }`}
                    >
                      {can.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Central Kinetic 3D Rotating Can */}
              <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-10 my-8">
                <div
                  className="w-48 sm:w-56 aspect-2/3 cursor-grab active:cursor-grabbing transition-transform duration-300"
                  style={{ transform: `rotate(${canRotationAngle}deg)` }}
                  onClick={() => {
                    setCanRotationAngle((prev) => (prev + 45) % 360);
                    playSynthesizerSfx("can_pop");
                  }}
                >
                  <svg viewBox="0 0 160 260" className="w-full h-auto drop-shadow-2xl">
                    {/* Shadow */}
                    <ellipse cx="80" cy="245" rx="55" ry="10" fill="rgba(0,0,0,0.4)" />

                    {/* Can Top Rim (Metallic Aluminum) */}
                    <ellipse cx="80" cy="25" rx="50" ry="12" fill="#E2E8F0" stroke="#171717" strokeWidth="2.5" />
                    <ellipse cx="80" cy="24" rx="42" ry="8" fill="#CBD5E1" />
                    {/* Pop Tab */}
                    <ellipse cx="80" cy="23" rx="14" ry="4" fill="#94A3B8" />

                    {/* Can Body */}
                    <path
                      d="M 30 25 L 30 225 C 30 240, 130 240, 130 225 L 130 25 Z"
                      fill={currentCan.canColor}
                      stroke="#171717"
                      strokeWidth="3"
                    />

                    {/* Colorful Pattern Waves on Can */}
                    <path
                      d="M 30 100 Q 80 130, 130 90 L 130 170 Q 80 140, 30 180 Z"
                      fill={currentCan.canPatternHex}
                    />

                    {/* Mascot / Text */}
                    <text x="80" y="80" textAnchor="middle" fill="#171717" fontSize="13" fontWeight="900" letterSpacing="0.5">
                      SELTZ 0.0
                    </text>
                    <text x="80" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="14">
                      🌴 ☀️ 🍹
                    </text>
                    <text x="80" y="210" textAnchor="middle" fill="#171717" fontSize="8" fontWeight="bold">
                      NO HANGOVER
                    </text>
                  </svg>
                </div>

                {/* UGC Video Snapshot with Chloe Bennett */}
                <div className="max-w-sm space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentCan.modelPair.avatar}
                      alt={currentCan.modelPair.name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/30"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{currentCan.modelPair.name}</div>
                      <div className="text-xs text-white/60">TikTok &amp; Reels Viral UGC İçerik Üreticisi</div>
                    </div>
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed">
                    {currentCan.tagline}. Arkadaş partilerinde veya festival sahnelerinde ertesi gün baş ağrısı yaşamadan eğlenmek isteyen yeni nesil tüketicilere özel.
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px] text-white/90">
                    {currentCan.keyBenefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#44BDBD]" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenFullStudio) onOpenFullStudio("photoshoot_wizard", currentCan.modelPair);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#FBC056] text-[#171717] text-xs font-bold flex items-center justify-center gap-2 hover:bg-yellow-400 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Viral TikTok İçecek Reklamı Üret</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORMAT 5: GOURMET CULINARY "PICK YOUR CUT" (Video 5 Inspiration)      */}
          {/* --------------------------------------------------------------------- */}
          {activeTab === 4 && (
            <div className="flex-1 flex flex-col bg-[#FDF9F5] p-8 sm:p-12">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#171717]/8 pb-6">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-widest text-[#FB5D2E]">
                    JAPANESE &amp; NORDIC MINIMALIST CULINARY
                  </div>
                  <h3 className="text-3xl font-black text-[#171717] tracking-tight">
                    {currentCut.name} <span className="text-sm font-normal text-[#171717]/50 font-serif">({currentCut.japaneseName})</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {GOURMET_CUTS.map((cut, idx) => (
                    <button
                      key={cut.id}
                      onClick={() => {
                        setActiveCutIdx(idx);
                        setSlicedPieces([false, false, false, false, false]);
                        playSynthesizerSfx("knife_slice");
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                        activeCutIdx === idx
                          ? "bg-[#171717] text-white border-[#171717]"
                          : "bg-white text-[#171717]/70 border-[#171717]/10 hover:bg-[#FAF8F5]"
                      }`}
                    >
                      {cut.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Interactive Anatomy Slicing Arena */}
              <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 my-8">
                {/* Slicing Simulator SVG */}
                <div className="flex-1 w-full max-w-xl flex flex-col items-center">
                  <div className="text-xs font-mono font-bold text-[#171717]/50 mb-3 flex items-center gap-2">
                    <Scissors className="w-3.5 h-3.5 text-[#FB5D2E]" />
                    <span>Fileto Parçalarına Tıklayarak Dilimleyin (Pick Your Cut)</span>
                  </div>

                  <div className="w-full relative aspect-16/9 rounded-3xl bg-white p-8 flex items-center justify-center border border-[#171717]/8 shadow-sm">
                    {/* Interactive Salmon Slices */}
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3, 4].map((pieceIdx) => {
                        const isSliced = slicedPieces[pieceIdx];
                        return (
                          <button
                            key={pieceIdx}
                            onClick={() => {
                              const updated = [...slicedPieces];
                              updated[pieceIdx] = !updated[pieceIdx];
                              setSlicedPieces(updated);
                              playSynthesizerSfx("knife_slice");
                            }}
                            className={`w-14 sm:w-16 h-28 sm:h-36 rounded-2xl transition-all duration-300 relative group cursor-pointer border-2 ${
                              isSliced
                                ? "translate-y-[-16px] shadow-lg border-[#FB5D2E]"
                                : "hover:translate-y-[-6px] border-transparent"
                            }`}
                            style={{
                              backgroundColor: pieceIdx === 3 ? "#E06D53" : "#FA8072",
                              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 14px)",
                            }}
                            title={`Dilim #${pieceIdx + 1} - Kesmek için tıklayın`}
                          >
                            <span className="absolute top-2 left-2 text-[10px] font-mono font-bold text-white/90">
                              #{pieceIdx + 1}
                            </span>
                            {isSliced && (
                              <span className="absolute bottom-2 inset-x-0 text-center text-[10px] font-bold text-white bg-black/40 py-0.5 rounded">
                                {currentCut.pricePerWeight.split(" ")[0]}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right: Tasting & Pricing Box */}
                <div className="w-full lg:w-80 space-y-6 bg-white p-6 rounded-3xl border border-[#171717]/10 shadow-sm">
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#41631E]">
                      GURME KALİTE ONAYI
                    </span>
                    <div className="text-2xl font-black text-[#171717]">{currentCut.pricePerWeight}</div>
                    <div className="text-xs font-bold text-[#FB5D2E]">{currentCut.fatRatio}</div>
                  </div>

                  <p className="text-xs text-[#171717]/75 leading-relaxed">
                    {currentCut.description}
                  </p>

                  <div className="pt-3 border-t border-[#171717]/8 space-y-1">
                    <div className="text-[11px] font-bold text-[#171717]">Şef Eşleşmesi:</div>
                    <div className="text-xs text-[#171717]/70 italic">{currentCut.chefPairing}</div>
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenFullStudio) onOpenFullStudio("photoshoot_wizard", AI_MODELS.find((m) => m.id === "elena-rostova"));
                    }}
                    className="w-full py-3 rounded-xl bg-[#171717] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-black transition shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FB5D2E]" />
                    <span>Michelin Kampanyası Planla</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORMAT 6: AEROLUX PRIVATE JET & 10.000€ 3D EXPERIENCE (Video 6)       */}
          {/* --------------------------------------------------------------------- */}
          {activeTab === 5 && (
            <div className="flex-1 flex flex-col bg-[#171717] text-white p-8 sm:p-12 relative overflow-hidden">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-widest text-[#E65A7F]">
                    10.000€+ DEĞERİNDE KİNETİK 3D WEB DENEYİMİ
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white mt-1">
                    AeroLux G-700 Ultra-Long Range Private Jet
                  </h3>
                </div>

                {/* Mood Lighting Switcher */}
                <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/10">
                  <span className="text-[11px] text-white/60 px-2 font-bold">Kabin Işığı:</span>
                  {[
                    { id: "champagne", label: "Şampanya", color: "#FBC056" },
                    { id: "midnight", label: "Gece", color: "#818CF8" },
                    { id: "monaco", label: "Monaco", color: "#44BDBD" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setCabinMoodLight(m.id as "champagne" | "midnight" | "monaco");
                        playSynthesizerSfx("jet_chime");
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                        cabinMoodLight === m.id ? "bg-white text-[#171717] shadow-xs" : "text-white/70 hover:text-white"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Jet Fuselage Canvas with Interactive Hotspots */}
              <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 my-8">
                {/* 3D Private Jet Fuselage SVG */}
                <div className="flex-1 w-full relative aspect-16/9 rounded-3xl bg-neutral-900 border border-white/10 p-6 flex items-center justify-center">
                  <svg viewBox="0 0 500 240" className="w-full h-auto drop-shadow-2xl">
                    {/* Aerodynamic Jet Silhouette */}
                    {/* Wings */}
                    <polygon points="180,120 120,20 230,120" fill="#2E2E32" stroke="#4B4B52" strokeWidth="2" />
                    <polygon points="180,120 120,220 230,120" fill="#2E2E32" stroke="#4B4B52" strokeWidth="2" />

                    {/* Fuselage Body */}
                    <path
                      d="M 60 120 C 100 100, 360 100, 420 115 C 440 120, 440 120, 420 125 C 360 140, 100 140, 60 120 Z"
                      fill="#FFFFFF"
                      stroke="#8E8E93"
                      strokeWidth="2"
                    />

                    {/* Cabin Windows with Mood Light Glow */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <ellipse
                        key={i}
                        cx={140 + i * 18}
                        cy={120}
                        rx="4"
                        ry="6"
                        fill={
                          cabinMoodLight === "champagne"
                            ? "#FBC056"
                            : cabinMoodLight === "midnight"
                            ? "#818CF8"
                            : "#44BDBD"
                        }
                      />
                    ))}

                    {/* Tail Fin */}
                    <polygon points="60,120 40,60 80,120" fill="#E65A7F" />
                  </svg>

                  {/* Interactive Hotspot Buttons (Reference to Video 6 Private Jet Explorer!) */}
                  {JET_HOTSPOTS.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => {
                        setActiveJetPoint(spot);
                        playSynthesizerSfx("jet_chime");
                      }}
                      className={`absolute w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        activeJetPoint?.id === spot.id
                          ? "bg-[#E65A7F] text-white scale-125 ring-4 ring-[#E65A7F]/40 shadow-lg"
                          : "bg-white/80 text-[#171717] hover:scale-110"
                      }`}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      title={spot.title}
                    >
                      <span className="text-[10px] font-bold">+</span>
                    </button>
                  ))}
                </div>

                {/* Right: Hotspot Description & Elena Rostova Aviation Ambassador Card */}
                <div className="w-full lg:w-80 space-y-6 bg-neutral-900/90 p-6 rounded-3xl border border-white/10">
                  {activeJetPoint && (
                    <div className="space-y-2">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-[#44BDBD]">
                        ÖZEL JET TEKNİK DETAYI
                      </span>
                      <h4 className="text-xl font-black text-white">{activeJetPoint.title}</h4>
                      <p className="text-xs text-white/70 leading-relaxed">{activeJetPoint.desc}</p>
                    </div>
                  )}

                  {/* Elena Rostova Luxury Model Card */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <img
                      src={AI_MODELS.find((m) => m.id === "elena-rostova")?.avatar}
                      alt="Elena Rostova"
                      className="w-12 h-12 rounded-xl object-cover border border-white/20"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Elena Rostova</div>
                      <div className="text-[11px] text-white/60">Ultra-Lüks Havacılık &amp; VIP Marka Yüzü</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenFullStudio) onOpenFullStudio("photoshoot_wizard", AI_MODELS.find((m) => m.id === "elena-rostova"));
                    }}
                    className="w-full py-3 rounded-xl bg-[#E65A7F] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#d8496e] transition shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Özel Havacılık Kampanyası Başlat</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* CONVERSION BAR FOR PREMIUM BRANDS                                         */}
        {/* ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#171717] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-black/10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#44BDBD] animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#44BDBD]">
                PREMİUM MARKA İŞBİRLİĞİ PROGRAMI
              </span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Markanız İçin Benzer Canlı Bir Reklam Kurgusu Oluşturun
            </h4>
            <p className="text-xs sm:text-sm text-white/70 font-normal leading-relaxed">
              Bu 6 inovatif reklam formatını kendi ürünleriniz (otomotiv, spor giyim, gurme gıda, lüks saat veya içecek)
              ve istediğiniz GuzelAI yapay zeka modeliyle 24 saat içinde yayına hazır hale getirebiliriz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {onOpenFullStudio && (
              <button
                onClick={() => onOpenFullStudio("templates")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-[#171717] text-xs font-black flex items-center justify-center gap-2 hover:bg-neutral-100 transition shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#E65A7F]" />
                <span>AI Stüdyosunda Şablonları Dene</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: BMW ISETTA / CLASSIC CAR TECHNICAL & LOOKBOOK POPUP (Video 1 Ref) */}
      {/* ========================================================================= */}
      {isCarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-8 space-y-6 shadow-2xl border border-[#171717]/10 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCarModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#FAF8F5] transition text-[#171717]/60 hover:text-[#171717]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#DC2626]">
                KLASİK MİKRO-OTOMOBİL TEKNİK ŞARTNAMESİ
              </span>
              <h3 className="text-2xl font-black text-[#171717]">{currentCar.name}</h3>
              <p className="text-xs text-[#171717]/60">{currentCar.country} • {currentCar.yearSpan}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#171717]/8">
                <div className="text-[10px] font-bold text-[#171717]/50 uppercase">Motor Hacmi</div>
                <div className="text-xs font-black text-[#171717] mt-0.5">{currentCar.specs.engine}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#171717]/8">
                <div className="text-[10px] font-bold text-[#171717]/50 uppercase">Güç</div>
                <div className="text-xs font-black text-[#171717] mt-0.5">{currentCar.specs.power}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#171717]/8">
                <div className="text-[10px] font-bold text-[#171717]/50 uppercase">Maksimum Hız</div>
                <div className="text-xs font-black text-[#171717] mt-0.5">{currentCar.specs.speed}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#171717]/8">
                <div className="text-[10px] font-bold text-[#171717]/50 uppercase">Boş Ağırlık</div>
                <div className="text-xs font-black text-[#171717] mt-0.5">{currentCar.specs.weight}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#171717]/8">
                <div className="text-[10px] font-bold text-[#171717]/50 uppercase">Boyutlar</div>
                <div className="text-xs font-black text-[#171717] mt-0.5">{currentCar.specs.length}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#171717]/8">
                <div className="text-[10px] font-bold text-[#171717]/50 uppercase">Üretim Adedi</div>
                <div className="text-xs font-black text-[#171717] mt-0.5">{currentCar.specs.productionCount}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-[#171717]">Öne Çıkan Tasarım Detayları:</div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#171717]/80">
                {currentCar.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#41631E]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#171717]/8 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsCarModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-[#171717]/10 text-xs font-bold hover:bg-[#FAF8F5] transition"
              >
                Kapat
              </button>
              {onOpenFullStudio && (
                <button
                  onClick={() => {
                    setIsCarModalOpen(false);
                    onOpenFullStudio("photoshoot_wizard", currentCar.modelPair);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#DC2626] text-white text-xs font-bold hover:bg-red-700 transition"
                >
                  Valentina ile Vintage Çekim Planla
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
