import React, { useState } from "react";
import { TranslationSchema } from "../i18n/translations";
import {
  Sparkles,
  Globe,
  Monitor,
  Tablet,
  Smartphone,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Eye,
  Sliders,
  Maximize2,
  Layers,
  Flame,
  CheckCircle2,
  Send,
  Zap,
  RotateCw,
  Compass,
  Film,
  Award,
  Loader2,
  ClipboardCopy,
  Braces,
} from "lucide-react";

interface CinematicWebSitesSectionProps {
  t: TranslationSchema;
  onOpenContactModal: () => void;
  onOpenStudio?: (tab?: string) => void;
  onOpenFullStudio?: (tab?: string) => void;
}

interface WebExperience {
  id: string;
  brandName: string;
  projectTitle: string;
  archetype: "dark_luxury" | "haute_runway" | "organic_bio" | "high_jewelry" | "cyber_kinetic";
  archetypeLabel: string;
  tagline: string;
  liveUrl: string;
  themeColor: string;
  accentColor: string;
  coverImage: string;
  deviceMockupDesktop: string;
  deviceMockupMobile: string;
  storyNarrative: {
    scene1_intro: string;
    scene2_curiosity: string;
    scene3_transformation: string;
    scene4_reveal: string;
    scene5_craft: string;
    scene6_cta: string;
  };
  cinematicDirecting: {
    cameraMove: string;
    lighting: string;
    soundScape: string;
    microInteractions: string[];
    fps: string;
    roasLift: string;
  };
  clientReview: {
    quote: string;
    author: string;
    role: string;
  };
}

export const CINEMATIC_EXPERIENCES: WebExperience[] = [
  {
    id: "veloce-monaco",
    brandName: "VELOCE MONACO",
    projectTitle: "Lüks Süperspor Otomobil & Riviera Sinematik Deneyimi",
    archetype: "dark_luxury",
    archetypeLabel: "Dark Luxury & Supercar",
    tagline: "Monaco gecesinde Ferrari 360 Spider motorunun kükreyişiyle açılan interaktif hiper-web deneyimi.",
    liveUrl: "https://veloce-monaco.guzelai.art",
    themeColor: "#0D0F14",
    accentColor: "#E65A7F",
    coverImage: "/assets/valentina_supercar.jpg",
    deviceMockupDesktop: "/assets/valentina_supercar.jpg",
    deviceMockupMobile: "/assets/valentina_avatar.jpg",
    storyNarrative: {
      scene1_intro: "Karanlık bir ekran, uzaktan yankılanan V8 motor homurtusu. Ekranın ortasında tek bir kırmızı kıvılcım.",
      scene2_curiosity: "Kullanıcı mouse'u kaydırdıkça Monte Carlo sahil yolunun virajları 3D derinlikle aydınlanır.",
      scene3_transformation: "Sıradan bir showroom değil; gece rüzgarının Valentina Cruz'un saçlarını savurduğu bir film sahnesi.",
      scene4_reveal: "Ferrari 360 Spider'ın şampanya beji hatları üzerinde sıvı ışık yansımaları belirir.",
      scene5_craft: "İtalyan el dikişi kırmızı deri koltuklar ve karbon fiber aerodinamik detaylar 4K makro zoom ile incelenir.",
      scene6_cta: "Gaza basma hissi uyandıran interaktif pedal butonu ile VIP Monaco Test Sürüşü rezervasyonu alınır.",
    },
    cinematicDirecting: {
      cameraMove: "Push-in Kokpit Girişi + 3D Tekerlek Eksen Dönüşü",
      lighting: "Gece Sokak Lambaları Işık Hüzmesi & Sıvı Metal Yansıması",
      soundScape: "Derin Bass V8 Motor Sesi, Sahil Dalgaları ve Sinematik Çello",
      microInteractions: ["3D Araba Rengi Değiştirici", "Gerçekçi Gaz Pedalı Basınç Efekti", "Valentina Cruz Sesli Turu"],
      fps: "60 FPS WebGL / Three.js",
      roasLift: "%380 Artırılmış VIP Rezervasyon",
    },
    clientReview: {
      quote: "GuzelAI web sitemizi sıradan bir araba galerisinden çıkarıp Cannes Film Festivali düzeyinde bir sinematik deneyime dönüştürdü. Ziyaretçiler sitede ortalama 6.5 dakika vakit geçiriyor.",
      author: "Matteo Casiraghi",
      role: "Pazarlama Direktörü, Veloce Atelier Monaco",
    },
  },
  {
    id: "aura-couture",
    brandName: "MAISON AURA PARIS",
    projectTitle: "Paris Dijital Podyumu & İpek Gece Elbisesi Deneyimi",
    archetype: "haute_runway",
    archetypeLabel: "Haute Couture & Runway",
    tagline: "Ziyaretçinin adımlarıyla podyum ışıklarının yandığı, ipek kumaşın rüzgarda canlı dalgalandığı dijital moda evi.",
    liveUrl: "https://maison-aura.guzelai.art",
    themeColor: "#FAF8F5",
    accentColor: "#44BDBD",
    coverImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&auto=format&fit=crop&q=85",
    deviceMockupDesktop: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&auto=format&fit=crop&q=85",
    deviceMockupMobile: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=85",
    storyNarrative: {
      scene1_intro: "Sessiz bir Paris sarayı avlusu. Güneş doğarken taş kolonların arasına düşen altın ışık huzmeleri.",
      scene2_curiosity: "Fare tekerleği döndükçe manken Aura Kaya podyumda ağır çekimde ilerlemeye başlar.",
      scene3_transformation: "Elbisenin her kıvrımı kullanıcının kaydırma hızına göre dinamik rüzgar fiziğiyle hareket eder.",
      scene4_reveal: "Derin yırtmaçlı altın ipek elbisenin dökümü 360 derece dönebilen interaktif manken üzerinde sergilenir.",
      scene5_craft: "İpek liflerinin mikroskobik dokusu ve Fransız danteli el dikişleri aydınlatılır.",
      scene6_cta: "Kişiye özel ölçü simülatörüyle anında sipariş oluşturulur.",
    },
    cinematicDirecting: {
      cameraMove: "Ağır Çekim (Slow-mo 120 FPS) Podyum Takibi + Dikey Dekolte Kaydırması",
      lighting: "Paris Altın Saat Doğal Gün Işığı & Mermer Yansımaları",
      soundScape: "Podyum Topuk Sesleri, İpek Hışırtısı ve Fransız Ambient House",
      microInteractions: ["Kumaş Fizik Simülasyonu", "360° Podyum Scrubber", "Canlı Beden ve Ten Uyumu"],
      fps: "120 FPS Smooth Fluid Motion",
      roasLift: "%420 Artırılmış Ön Sipariş",
    },
    clientReview: {
      quote: "Fiziksel podyuma harcadığımız yüz binlerce avroluk bütçenin onda birine dünya çapında milyonlarca kadına ulaşan interaktif bir sanat eseri elde ettik.",
      author: "Camille Delacroix",
      role: "Kreatif Direktör, Maison Aura Paris",
    },
  },
  {
    id: "selene-noir-jewels",
    brandName: "SELENE NOIR JOAILLERIE",
    projectTitle: "Zifiri Gece & 3D Işık Kırılımlı Pırlanta / Mücevher Evi",
    archetype: "high_jewelry",
    archetypeLabel: "Yüksek Mücevher & Zümrüt",
    tagline: "Zifiri karanlıkta fenerinizle elmasın 58 fasetini tek tek parlattığınız gizemli yüksek mücevher odası.",
    liveUrl: "https://selene-noir.guzelai.art",
    themeColor: "#08090C",
    accentColor: "#FBC056",
    coverImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&auto=format&fit=crop&q=85",
    deviceMockupDesktop: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&auto=format&fit=crop&q=85",
    deviceMockupMobile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=85",
    storyNarrative: {
      scene1_intro: "Sıfır ışık. Sadece nefes alan bir karanlık ve uzaktan gelen pırlanta kesim sesinin kristal çınlaması.",
      scene2_curiosity: "İmleç ekran boyunca gezdikçe zümrüt kolyenin üzerine yönlendirilen bir ışık huzmesi prizmatik parıltılar saçar.",
      scene3_transformation: "Manken Selene Noir sırt dekolteli saten elbisesiyle arkasını döner ve gerdanlık aydınlanır.",
      scene4_reveal: "12 karat Kolombiya zümrüdü ve 240 elmasın faset geometrisi 3D kristal kırılımlarıyla açığa çıkar.",
      scene5_craft: "Karat, berraklık (VVS1) ve platin yuvaların mikron düzeyindeki montür sanatı ekrana gelir.",
      scene6_cta: "Milano ve Cenevre kasa dairelerine özel şifreli randevu alma daveti.",
    },
    cinematicDirecting: {
      cameraMove: "Raymarching Işık Kırılımı + 360° Gerdanlık Yavaş Dönüşü",
      lighting: "Tek Nokta Lüks Spot Işığı & Spektral Prizma Renk Dağılımı",
      soundScape: "Kristal Yankıları, İpek Nefesi ve Ağır Neoklasik Piyano",
      microInteractions: ["İmleçle Işık Tutma Feneri", "Karat Büyütme Karşılaştırıcısı", "Sertifika Hologramı"],
      fps: "60 FPS Raymarched Shaders",
      roasLift: "%290 Yüksek Sepet Ortalaması",
    },
    clientReview: {
      quote: "Mücevher satışı dokunma ve güven işidir. GuzelAI'nin 3D ışık kırılımı teknolojisi, müşterilerimize kolyeyi sanki ellerinde tutuyormuş hissini kusursuz yaşatıyor.",
      author: "Lorenzo Moretti",
      role: "Baş Mücevher Uzmanı & Ortak",
    },
  },
  {
    id: "botanikal-elixir",
    brandName: "LUMINA BIO-FERMENT",
    projectTitle: "Canlı 3D Sıvı & Mikroorganizma Simülasyonlu Kombucha",
    archetype: "organic_bio",
    archetypeLabel: "Organik Sıvı & Biyo-Estetik",
    tagline: "Şişeyi tıkladığınızda köpüren canlı probiyotiklerin ve yükselen narenciye kabarcıklarının organik dansı.",
    liveUrl: "https://lumina-bio.guzelai.art",
    themeColor: "#0E1A14",
    accentColor: "#41631E",
    coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=85",
    deviceMockupDesktop: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=85",
    deviceMockupMobile: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=85",
    storyNarrative: {
      scene1_intro: "Sisli bir orman sabahı. Cam şişenin yüzeyinde yoğunlaşan taze su damlacıkları yer çekimine meydan okur.",
      scene2_curiosity: "Kaydırdıkça şişenin içi açılır; canlı maya ve zencefil özütlerinin altın sarısı sıvıda süzülüşü görünür.",
      scene3_transformation: "Kimyasal içeceklerin monotonluğu yerine doğanın yaşayan gücü ekrana fışkırır.",
      scene4_reveal: "Cam şişe 3D olarak döner, etiketteki botanik illüstrasyonlar canlanır ve kokusu hissedilen bir görsellik sunar.",
      scene5_craft: "60 günlük fermente döngüsü ve sıfır rafine şeker formülü infografiklerle aktarılır.",
      scene6_cta: "6'lı Kutu ve Aylık Taze Şişeleme Aboneliği ile sepete ekleme.",
    },
    cinematicDirecting: {
      cameraMove: "Makro Sıvı İçi Zoom + Dinamik Kabarcık Takibi",
      lighting: "Doğal Sabah Orman Süzülmesi & Şeffaf Cam Kırılmaları",
      soundScape: "Şişe Kapağı Açılış Sesi, Köpürme Pıtırtısı ve Doğal Yağmur Sesi",
      microInteractions: ["Şişeyi Sallama & Köpürtme", "Tat Dengesi Kaydırıcısı", "Probiyotik Canlılık Sayacı"],
      fps: "60 FPS Fluid Particle Dynamics",
      roasLift: "%510 Abonelik Başlangıç Oranı",
    },
    clientReview: {
      quote: "İçeceğimizin şişelenmiş canlılığını geleneksel e-ticaret siteleriyle anlatamıyorduk. Bu web sitesi sayesinde kombucha değil, bir yaşam enerjisi satıyoruz.",
      author: "Ece Yılmaz",
      role: "Kurucu, Lumina Elixir",
    },
  },
  {
    id: "neo-runner-lab",
    brandName: "AEROSPRINT NEO-X",
    projectTitle: "Cyberpunk Tokyo & Yerçekimsiz Taban Sneaker Lansmanı",
    archetype: "cyber_kinetic",
    archetypeLabel: "Cyberpunk & Kinetik Sokak",
    tagline: "Gökdelen çatısında neon yağmur altında koşan manken ve havada asılı kalan süspansiyonlu sneaker.",
    liveUrl: "https://aerosprint-neo.guzelai.art",
    themeColor: "#05060A",
    accentColor: "#FB5D2E",
    coverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=85",
    deviceMockupDesktop: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=85",
    deviceMockupMobile: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&q=85",
    storyNarrative: {
      scene1_intro: "Tokyo Shinjuku çatısında mor ve turkuaz neon ışıkları. Asfalttaki su birikintisinde sneaker silüeti.",
      scene2_curiosity: "Kaydırma tuşu basılı tutulduğunda zaman donar, havaya sıçrayan yağmur damlacıkları yerinde kalır.",
      scene3_transformation: "Sneaker havada dururken taban süspansiyonu patlayarak katman katman açılır (exploded view).",
      scene4_reveal: "Karbon fiber plaka, nitrojen enjeksiyonlu köpük ve nefes alan örgülü saya 3D olarak ayrışır.",
      scene5_craft: "Her parçanın darbe emilim grafiği ve 100 metrelik ivmelenme telemetrisi ekranda akar.",
      scene6_cta: "Sadece 500 çift üretilen Neo-X için sınırlı sayaçlı anında sipariş.",
    },
    cinematicDirecting: {
      cameraMove: "Matrix Tarzı Bullet-Time 360° Dondurma + Düşük Açı Dinamik Zıplama",
      lighting: "Neon Siberpunk Pembe/Mavi Işıklar & Islak Zemin Yansımaları",
      soundScape: "Agresif Synthwave Beat (130 BPM), Ayak Darbe Bası ve Yağmur",
      microInteractions: ["Sneaker Patlatılmış Montajı (Exploded View)", "Hız ve Zemin Simülasyonu", "Neon Renk Özelleştirici"],
      fps: "60 FPS 3D Exploded Physics",
      roasLift: "%640 Lansman Satış Hızı",
    },
    clientReview: {
      quote: "İlk 500 çift 12 dakikada tükendi. Sitedeki Matrix tarzı 360 derece dondurma efekti sosyal medyada viral oldu.",
      author: "Kenji Sato",
      role: "Ürün Direktörü, AeroSprint Global",
    },
  },
];

export const CinematicWebSitesSection: React.FC<CinematicWebSitesSectionProps> = ({
  t,
  onOpenContactModal,
  onOpenStudio,
}) => {
  const [activeExperienceIndex, setActiveExperienceIndex] = useState<number>(0);
  const [currentDevice, setCurrentDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeSceneStep, setActiveSceneStep] = useState<number>(1);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState<boolean>(false);

  // Custom Brief generator state
  const [briefBrandName, setBriefBrandName] = useState<string>("");
  const [briefIndustry, setBriefIndustry] = useState<string>("Mimarlık & İç Mimarlık");
  const [briefCustomIndustry, setBriefCustomIndustry] = useState<string>("");
  const [briefArchetype, setBriefArchetype] = useState<string>("AI sektör ve marka karakterine göre karar versin");
  const [briefGoal, setBriefGoal] = useState<string>("Global Lansman & Yüksek Dönüşüm");
  const [briefReference, setBriefReference] = useState<string>("");
  const [briefRequirements, setBriefRequirements] = useState<string>("");
  const [briefGenerated, setBriefGenerated] = useState<boolean>(false);
  const [briefLoading, setBriefLoading] = useState<boolean>(false);
  const [briefError, setBriefError] = useState<string>("");
  const [websitePlan, setWebsitePlan] = useState<any | null>(null);
  const [copiedMasterPrompt, setCopiedMasterPrompt] = useState<boolean>(false);

  const handleGenerateWebsitePlan = async () => {
    if (!briefBrandName.trim()) {
      setBriefError("Lütfen marka veya proje ismini giriniz.");
      return;
    }

    const resolvedIndustry =
      briefIndustry === "__custom__" ? briefCustomIndustry.trim() : briefIndustry;

    if (!resolvedIndustry) {
      setBriefError("Lütfen sektörünüzü seçin veya kendi sektörünüzü yazın.");
      return;
    }

    setBriefLoading(true);
    setBriefError("");
    setBriefGenerated(false);
    setWebsitePlan(null);

    try {
      const response = await fetch("/api/gemini/generate-prompt", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          task: "website_builder",
          brandName: briefBrandName.trim(),
          industry: resolvedIndustry,
          archetype: briefArchetype,
          goal: briefGoal.trim(),
          reference: briefReference.trim(),
          additionalRequirements: briefRequirements.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Website Builder Engine çalıştırılamadı.");
      }

      setWebsitePlan(data);
      setBriefGenerated(true);
    } catch (error: any) {
      setBriefError(error?.message || "Website Builder Engine çalıştırılamadı.");
    } finally {
      setBriefLoading(false);
    }
  };

  const exp = CINEMATIC_EXPERIENCES[activeExperienceIndex];

  const handleNextExp = () => {
    setActiveExperienceIndex((prev) => (prev + 1) % CINEMATIC_EXPERIENCES.length);
    setActiveSceneStep(1);
  };

  const handlePrevExp = () => {
    setActiveExperienceIndex((prev) => (prev - 1 + CINEMATIC_EXPERIENCES.length) % CINEMATIC_EXPERIENCES.length);
    setActiveSceneStep(1);
  };

  const getSceneText = (step: number) => {
    switch (step) {
      case 1:
        return { num: "01", title: "GİRİŞ & ATMOSFER (ESTABLISH SHOT)", desc: exp.storyNarrative.scene1_intro };
      case 2:
        return { num: "02", title: "MERAK & KEŞİF (CURIOSITY HOOK)", desc: exp.storyNarrative.scene2_curiosity };
      case 3:
        return { num: "03", title: "DÖNÜŞÜM & HİKAYE (THE SHIFT)", desc: exp.storyNarrative.scene3_transformation };
      case 4:
        return { num: "04", title: "ÜRÜN ORTAYA ÇIKIŞI (HERO REVEAL)", desc: exp.storyNarrative.scene4_reveal };
      case 5:
        return { num: "05", title: "ZANAAT & TEKNOLOJİ (CRAFT DETAILS)", desc: exp.storyNarrative.scene5_craft };
      case 6:
        return { num: "06", title: "SİNEMATİK EYLEM & DÖNÜŞÜM (CLIMAX CTA)", desc: exp.storyNarrative.scene6_cta };
      default:
        return { num: "01", title: "GİRİŞ", desc: exp.storyNarrative.scene1_intro };
    }
  };

  const currentScene = getSceneText(activeSceneStep);

  return (
    <section
      id="cinematic-websites-section"
      className="py-24 sm:py-32 bg-[#090B10] text-white border-b border-white/10 relative overflow-hidden selection:bg-[#E65A7F] selection:text-white"
    >
      {/* Dynamic ambient color glow spots according to active experience */}
      <div
        className="absolute top-10 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: exp.accentColor }}
      />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-[#44BDBD]/10 blur-[140px] pointer-events-none" />

      {/* Atelier Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER: CINEMATIC AI WEBSITE DIRECTOR MANIFESTO               */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-black tracking-widest uppercase text-[#44BDBD] shadow-xl backdrop-blur-md">
              <Film className="w-4 h-4 text-[#E65A7F]" />
              <span>GUZELAI CINEMATIC AI WEBSITE DIRECTOR</span>
              <span className="text-white/40">&bull;</span>
              <span className="text-white/90">HAUTE DIGITALE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.06] font-['Plus_Jakarta_Sans',sans-serif]">
              Web Siteleri Artık Sayfa Değil;{" "}
              <span className="bg-gradient-to-r from-white via-white/90 to-[#E65A7F] bg-clip-text text-transparent">
                Yaşayan Sinematik Dünyalardır.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed">
              Müşteri malzemeyi verir. <strong className="text-white font-bold">GuzelAI hikayeyi anlar</strong>, dijital deneyimi yönetir, 3D dünyaları tasarlar ve sinematik kamera hareketleriyle dönüştürür.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-[10px] font-black tracking-wider uppercase">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Website Builder Constitution v2 • Build → Inspect → Fix → Final
            </div>

            {/* 14 Creative Roles Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 text-[10px] font-mono text-white/60">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">Creative Director</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#E65A7F]">Film Director</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#44BDBD]">3D Experience</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">Art Director</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300">UX Architecture</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">Sound Design</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">WebGL & Shaders</span>
            </div>
          </div>

          {/* Right Action & Brief Launcher */}
          <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-3 shrink-0">
            <button
              id="btn-open-brief-generator"
              onClick={() => setIsBriefModalOpen(true)}
              className="px-6 py-3.5 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white text-xs sm:text-sm font-extrabold tracking-tight transition shadow-xl shadow-[#E65A7F]/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Markana / İşletmene Web Sitesi Tasarla</span>
            </button>

            <button
              onClick={onOpenContactModal}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/15 flex items-center gap-2"
            >
              <span>Director Ekibiyle Görüş</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. EXPERIENCE SELECTOR TABS & DEVICE VIEWPORT SWITCHER                    */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-white/10">
          {/* Experience Archetype Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
            {CINEMATIC_EXPERIENCES.map((item, idx) => {
              const isSelected = idx === activeExperienceIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveExperienceIndex(idx);
                    setActiveSceneStep(1);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-white text-[#090B10] shadow-lg shadow-white/10 scale-105"
                      : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.accentColor }}
                  />
                  <span>{item.brandName}</span>
                  <span className="text-[10px] opacity-60 font-mono hidden sm:inline">
                    ({item.archetypeLabel})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Device Switcher (Desktop, Tablet, Mobile) */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/10 backdrop-blur border border-white/15 self-start md:self-auto">
            <button
              onClick={() => setCurrentDevice("desktop")}
              className={`p-2 rounded-full transition flex items-center gap-1 text-xs font-bold ${
                currentDevice === "desktop"
                  ? "bg-white text-[#090B10] shadow"
                  : "text-white/60 hover:text-white"
              }`}
              title="Masaüstü Widescreen Görünüm"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Desktop</span>
            </button>

            <button
              onClick={() => setCurrentDevice("tablet")}
              className={`p-2 rounded-full transition flex items-center gap-1 text-xs font-bold ${
                currentDevice === "tablet"
                  ? "bg-white text-[#090B10] shadow"
                  : "text-white/60 hover:text-white"
              }`}
              title="Tablet / iPad Dokunmatik Görünüm"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Tablet</span>
            </button>

            <button
              onClick={() => setCurrentDevice("mobile")}
              className={`p-2 rounded-full transition flex items-center gap-1 text-xs font-bold ${
                currentDevice === "mobile"
                  ? "bg-white text-[#090B10] shadow"
                  : "text-white/60 hover:text-white"
              }`}
              title="Mobil Dikey (9:16) Görünüm"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Mobile 9:16</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MAIN LIVE CINEMATIC SHOWCASE: INTERACTIVE VIEWPORT & HUD               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Simulated Viewport (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Viewport Frame Container */}
            <div
              className={`w-full transition-all duration-500 rounded-3xl bg-[#121620] border border-white/20 shadow-2xl overflow-hidden relative flex flex-col ${
                currentDevice === "desktop"
                  ? "max-w-full aspect-[16/10]"
                  : currentDevice === "tablet"
                  ? "max-w-md aspect-[4/3]"
                  : "max-w-xs aspect-[9/16]"
              }`}
            >
              {/* Simulated Browser Chrome */}
              <div className="bg-[#1A1F2C] border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-xs select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[10px] font-mono text-white/70 max-w-[240px] truncate">
                  <Globe className="w-3 h-3 text-[#44BDBD]" />
                  <span>{exp.liveUrl}</span>
                </div>

                <div className="flex items-center gap-2 text-white/50 text-[11px]">
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-bold text-white">SSL 256</span>
                </div>
              </div>

              {/* Viewport Screen Content */}
              <div className="relative flex-1 bg-black overflow-hidden group">
                <img
                  src={currentDevice === "mobile" ? exp.deviceMockupMobile : exp.deviceMockupDesktop}
                  alt={exp.projectTitle}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Film Director Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 flex flex-col justify-between p-6 pointer-events-none">
                  {/* Top HUD inside Viewport */}
                  <div className="flex items-center justify-between">
                    <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur border border-white/20 text-[11px] font-mono font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      <span>REC &bull; {exp.cinematicDirecting.fps}</span>
                    </div>

                    <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/20 text-[10px] font-mono text-amber-300 font-bold">
                      {exp.cinematicDirecting.roasLift}
                    </div>
                  </div>

                  {/* Bottom Captions inside Viewport */}
                  <div className="space-y-2 pointer-events-auto">
                    <div className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white/20 text-white backdrop-blur">
                      {currentScene.num} // {currentScene.title}
                    </div>
                    <p className="text-xs sm:text-sm text-white font-medium drop-shadow-lg max-w-lg leading-relaxed bg-black/50 backdrop-blur-md p-3 rounded-xl border border-white/10">
                      "{currentScene.desc}"
                    </p>
                  </div>
                </div>

                {/* Sound FX Toggle inside Viewport */}
                <button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur border border-white/20 transition text-xs flex items-center gap-1.5 shadow-xl pointer-events-auto"
                  title="Ambiyans Sesini Aç/Kapat"
                >
                  {isAudioMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-white/60" />
                      <span className="text-[10px] hidden sm:inline">Ses Kapalı</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#E65A7F] animate-pulse" />
                      <span className="text-[10px] hidden sm:inline text-white font-bold">Sinematik Ses</span>
                    </>
                  )}
                </button>
              </div>

              {/* Viewport Bottom Controls Bar */}
              <div className="bg-[#121620] border-t border-white/10 p-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevExp}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                    title="Önceki Deneyim"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextExp}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                    title="Sonraki Deneyim"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-white/50 ml-1">
                    0{activeExperienceIndex + 1} / 0{CINEMATIC_EXPERIENCES.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      alert(`"${exp.brandName}" interaktif sinematik web sitesi tam ekran önizleme moduna alınıyor.`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition flex items-center gap-1.5"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#44BDBD]" />
                    <span>Canlı İncele</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Director Narrative Scrubber & Architecture Blueprint (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Experience Overview Card */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                  style={{
                    color: exp.accentColor,
                    borderColor: `${exp.accentColor}40`,
                    backgroundColor: `${exp.accentColor}15`,
                  }}
                >
                  {exp.archetypeLabel}
                </span>

                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Canlı & Yayında
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {exp.brandName}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed mt-1">
                  {exp.tagline}
                </p>
              </div>

              {/* Director Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-white/50 uppercase block">Kamera Hareketi</span>
                  <span className="font-bold text-white block truncate">{exp.cinematicDirecting.cameraMove}</span>
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-white/50 uppercase block">Işıklandırma</span>
                  <span className="font-bold text-white block truncate">{exp.cinematicDirecting.lighting}</span>
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-white/50 uppercase block">Ses Tasarımı</span>
                  <span className="font-bold text-[#E65A7F] block truncate">{exp.cinematicDirecting.soundScape}</span>
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-white/50 uppercase block">ROAS Artışı</span>
                  <span className="font-bold text-amber-300 block">{exp.cinematicDirecting.roasLift}</span>
                </div>
              </div>

              {/* Micro Interactions Tag List */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono text-white/60 uppercase tracking-wider block">
                  3D Mikroyapılar & Etkileşimler:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {exp.cinematicDirecting.microInteractions.map((feat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] text-white/90 font-medium"
                    >
                      &bull; {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Narrative Scrubber: Sahne 01 -> Sahne 06 */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#44BDBD] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>SİNEMATİK SENARYO KONTROLÜ</span>
                </span>
                <span className="text-[11px] font-mono text-white/50">Sahne {activeSceneStep} / 06</span>
              </div>

              {/* Scrubber Buttons */}
              <div className="grid grid-cols-6 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const isCurrent = activeSceneStep === num;
                  return (
                    <button
                      key={num}
                      onClick={() => setActiveSceneStep(num)}
                      className={`py-2 rounded-xl text-xs font-mono font-black transition-all ${
                        isCurrent
                          ? "bg-[#E65A7F] text-white shadow-lg shadow-[#E65A7F]/40 scale-105"
                          : "bg-black/40 hover:bg-white/10 text-white/60 hover:text-white border border-white/10"
                      }`}
                    >
                      0{num}
                    </button>
                  );
                })}
              </div>

              {/* Active Scene Detail */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1.5">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
                  {currentScene.num} // {currentScene.title}
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  {currentScene.desc}
                </p>
              </div>

              {/* Quote / Client Review */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs italic text-white/70">
                "{exp.clientReview.quote}"
                <div className="text-[11px] font-bold text-white not-italic mt-1.5 flex items-center gap-2">
                  <span>{exp.clientReview.author}</span>
                  <span className="text-white/40">&bull;</span>
                  <span className="text-[#44BDBD]">{exp.clientReview.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. CINEMATIC DIRECTING RULES & ARCHITECTURE MATRIX (Master Prompt Spec)   */}
        {/* ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 backdrop-blur-2xl space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#E65A7F]">
              YARATICI VE TEKNİK DİREKTÖRLÜK PRENSİPLERİ
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sinematik Bir Web Sitesini Sıradan Şablonlardan Ne Ayırır?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              GuzelAI Cinematic Website Director, film diliyle web arayüzünü birleştirir. Her kaydırma bir sahne geçişi, her etkileşim bir dramatik andır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Principle 1 */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E65A7F]/20 border border-[#E65A7F]/40 flex items-center justify-center text-[#E65A7F] font-black">
                01
              </div>
              <h4 className="text-sm font-black text-white">Işık ve Gölge Hiyerarşisi</h4>
              <p className="text-white/70 leading-relaxed">
                Tüm ekranı düz ışıkla doldurmak yerine, gözü ürünün en baştan çıkarıcı fasetine çeken dramatik tek nokta spotlar ve derin gölgeler kullanılır.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#44BDBD]/20 border border-[#44BDBD]/40 flex items-center justify-center text-[#44BDBD] font-black">
                02
              </div>
              <h4 className="text-sm font-black text-white">Fiziksel Kumaş & Sıvı Simülasyonu</h4>
              <p className="text-white/70 leading-relaxed">
                Statik ürün fotoğrafları yerine; kumaşın rüzgardaki dökümü, pırlantanın ışık kırılımı ve sıvının kabarcıklanması WebGL ile canlı hesaplanır.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-black">
                03
              </div>
              <h4 className="text-sm font-black text-white">Duyusal Ses Tasarımı (Soundscape)</h4>
              <p className="text-white/70 leading-relaxed">
                Her deneyim, ürünün materyaline uygun özel bestelenmiş ambient ses katmanları, mikro klikler ve bas frekanslarıyla zenginleştirilir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE BRIEF GENERATOR MODAL                                       */}
      {/* ========================================================================= */}
      {isBriefModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#121620] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 text-white shadow-2xl relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-[#E65A7F]" />
                <h3 className="text-lg sm:text-xl font-black text-white">
                  AI Web Sitesi Tasarım & Briefing Motoru
                </h3>
              </div>
              <button
                onClick={() => setIsBriefModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition text-xs"
              >
                ✕
              </button>
            </div>

            {!briefGenerated ? (
              <div className="space-y-4 text-xs">
                <p className="text-white/75 leading-relaxed">
                  İşletmenizi, mesleğinizi veya markanızı seçin; referanslarınızı ve hedefinizi girin. GüzelAI Website Builder Engine v2, sektör ne olursa olsun bunu Design DNA → Site Architecture → Component System → Responsive → Build → QA → Fix → Final pipeline'ından geçirir.
                </p>

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold">Marka İsminiz:</label>
                  <input
                    type="text"
                    value={briefBrandName}
                    onChange={(e) => setBriefBrandName(e.target.value)}
                    placeholder="Örn: Atelier Riviera, Lumina Fragrance..."
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#E65A7F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-white/70 font-semibold">Sektör / İş Alanı:</label>
                    <select
                      value={briefIndustry}
                      onChange={(e) => setBriefIndustry(e.target.value)}
                      className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#E65A7F]"
                    >
                      <optgroup label="Mimarlık, Tasarım & Yapı">
                        <option value="Mimarlık & İç Mimarlık">Mimarlık & İç Mimarlık</option>
                        <option value="İnşaat & Müteahhitlik">İnşaat & Müteahhitlik</option>
                        <option value="Gayrimenkul & Emlak">Gayrimenkul & Emlak</option>
                        <option value="Peyzaj Mimarlığı">Peyzaj Mimarlığı</option>
                        <option value="Mobilya & Dekorasyon">Mobilya & Dekorasyon</option>
                        <option value="Endüstriyel Tasarım">Endüstriyel Tasarım</option>
                      </optgroup>

                      <optgroup label="Hukuk, Finans & Profesyonel Hizmetler">
                        <option value="Avukatlık & Hukuk Bürosu">Avukatlık & Hukuk Bürosu</option>
                        <option value="Mali Müşavirlik & Muhasebe">Mali Müşavirlik & Muhasebe</option>
                        <option value="Finans & Yatırım Danışmanlığı">Finans & Yatırım Danışmanlığı</option>
                        <option value="Sigorta & Aracılık">Sigorta & Aracılık</option>
                        <option value="Yönetim Danışmanlığı">Yönetim Danışmanlığı</option>
                        <option value="İnsan Kaynakları & İşe Alım">İnsan Kaynakları & İşe Alım</option>
                      </optgroup>

                      <optgroup label="Sağlık, Eczacılık & Wellness">
                        <option value="Eczane & Eczacılık">Eczane & Eczacılık</option>
                        <option value="Doktor & Özel Klinik">Doktor & Özel Klinik</option>
                        <option value="Diş Hekimliği & Ağız Sağlığı">Diş Hekimliği & Ağız Sağlığı</option>
                        <option value="Psikoloji & Terapi">Psikoloji & Terapi</option>
                        <option value="Fizyoterapi & Rehabilitasyon">Fizyoterapi & Rehabilitasyon</option>
                        <option value="Diyetisyen & Beslenme">Diyetisyen & Beslenme</option>
                        <option value="Güzellik Merkezi & Medikal Estetik">Güzellik Merkezi & Medikal Estetik</option>
                        <option value="Veteriner Kliniği">Veteriner Kliniği</option>
                      </optgroup>

                      <optgroup label="Güzellik, Moda & Kişisel Hizmetler">
                        <option value="Kuaför & Berber">Kuaför & Berber</option>
                        <option value="Terzi & Özel Dikim">Terzi & Özel Dikim</option>
                        <option value="Moda & Hazır Giyim">Moda & Hazır Giyim</option>
                        <option value="Lüks Moda & Haute Couture">Lüks Moda & Haute Couture</option>
                        <option value="Kozmetik, Serum & Parfüm">Kozmetik, Serum & Parfüm</option>
                        <option value="Takı, Pırlanta & Mücevher">Takı, Pırlanta & Mücevher</option>
                        <option value="Ayakkabı & Sneaker">Ayakkabı & Sneaker</option>
                      </optgroup>

                      <optgroup label="Yeme, İçme & Konaklama">
                        <option value="Restoran & Lokanta">Restoran & Lokanta</option>
                        <option value="Kafe & Pastane">Kafe & Pastane</option>
                        <option value="Otel & Konaklama">Otel & Konaklama</option>
                        <option value="Turizm & Seyahat Acentesi">Turizm & Seyahat Acentesi</option>
                        <option value="Catering & Organizasyon">Catering & Organizasyon</option>
                        <option value="Gıda Üretimi & Gastronomi">Gıda Üretimi & Gastronomi</option>
                      </optgroup>

                      <optgroup label="Eğitim & Kültür">
                        <option value="Okul & Eğitim Kurumu">Okul & Eğitim Kurumu</option>
                        <option value="Kurs, Akademi & Özel Ders">Kurs, Akademi & Özel Ders</option>
                        <option value="Anaokulu & Kreş">Anaokulu & Kreş</option>
                        <option value="Sanat, Galeri & Kültür">Sanat, Galeri & Kültür</option>
                        <option value="Yayınevi & Kitap">Yayınevi & Kitap</option>
                      </optgroup>

                      <optgroup label="Teknoloji, Medya & Yaratıcı Sektörler">
                        <option value="Yazılım & SaaS">Yazılım & SaaS</option>
                        <option value="Yapay Zeka & Teknoloji Girişimi">Yapay Zeka & Teknoloji Girişimi</option>
                        <option value="Dijital Ajans & Reklam">Dijital Ajans & Reklam</option>
                        <option value="Fotoğraf & Video Prodüksiyon">Fotoğraf & Video Prodüksiyon</option>
                        <option value="Medya & Haber">Medya & Haber</option>
                        <option value="Müzik & Eğlence">Müzik & Eğlence</option>
                        <option value="Oyun & E-Spor">Oyun & E-Spor</option>
                      </optgroup>

                      <optgroup label="Perakende, E-Ticaret & Tüketici">
                        <option value="E-Ticaret & Online Mağaza">E-Ticaret & Online Mağaza</option>
                        <option value="Perakende Mağaza">Perakende Mağaza</option>
                        <option value="Elektronik & Teknoloji Ürünleri">Elektronik & Teknoloji Ürünleri</option>
                        <option value="Otomotiv & Oto Galeri">Otomotiv & Oto Galeri</option>
                        <option value="Süperspor Otomobil & Yachting">Süperspor Otomobil & Yachting</option>
                        <option value="Çiçekçilik & Hediyelik">Çiçekçilik & Hediyelik</option>
                      </optgroup>

                      <optgroup label="Sanayi, Üretim & B2B">
                        <option value="Sanayi & Üretim">Sanayi & Üretim</option>
                        <option value="Makine & Endüstri">Makine & Endüstri</option>
                        <option value="Enerji & Yenilenebilir Enerji">Enerji & Yenilenebilir Enerji</option>
                        <option value="Lojistik & Nakliye">Lojistik & Nakliye</option>
                        <option value="Tarım & Hayvancılık">Tarım & Hayvancılık</option>
                        <option value="İhracat & Dış Ticaret">İhracat & Dış Ticaret</option>
                        <option value="KOBİ & Esnaf">KOBİ & Esnaf</option>
                      </optgroup>

                      <optgroup label="Yerel Hizmetler & Diğer">
                        <option value="Temizlik Hizmetleri">Temizlik Hizmetleri</option>
                        <option value="Oto Servis & Bakım">Oto Servis & Bakım</option>
                        <option value="Elektrik, Tesisat & Teknik Servis">Elektrik, Tesisat & Teknik Servis</option>
                        <option value="Etkinlik & Organizasyon">Etkinlik & Organizasyon</option>
                        <option value="Dernek, Vakıf & STK">Dernek, Vakıf & STK</option>
                        <option value="Kişisel Marka & Portfolyo">Kişisel Marka & Portfolyo</option>
                        <option value="__custom__">Diğer / Kendi Sektörümü Yazacağım…</option>
                      </optgroup>
                    </select>

                    {briefIndustry === "__custom__" && (
                      <input
                        type="text"
                        value={briefCustomIndustry}
                        onChange={(e) => setBriefCustomIndustry(e.target.value)}
                        placeholder="Sektörünüzü yazın…"
                        className="w-full p-3 rounded-xl bg-black/50 border border-[#44BDBD]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#44BDBD]"
                      />
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-white/70 font-semibold">Tasarım Yönü:</label>
                    <select
                      value={briefArchetype}
                      onChange={(e) => setBriefArchetype(e.target.value)}
                      className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#E65A7F]"
                    >
                      <option value="AI sektör ve marka karakterine göre karar versin">✨ AI sektör ve markaya göre karar versin</option>
                      <option value="Kurumsal Güven & Profesyonel">Kurumsal Güven & Profesyonel</option>
                      <option value="Modern Minimal & Temiz">Modern Minimal & Temiz</option>
                      <option value="Mimari Minimal & Editorial">Mimari Minimal & Editorial</option>
                      <option value="Klinik Temiz & Güven Veren">Klinik Temiz & Güven Veren</option>
                      <option value="Yerel İşletme & Samimi">Yerel İşletme & Samimi</option>
                      <option value="Premium & Luxury">Premium & Luxury</option>
                      <option value="Editorial & Moda">Editorial & Moda</option>
                      <option value="Teknoloji & Futuristik">Teknoloji & Futuristik</option>
                      <option value="Doğal & Organik">Doğal & Organik</option>
                      <option value="Dark Luxury (Gece & Zarafet)">Dark Luxury (Gece & Zarafet)</option>
                      <option value="Haute Runway (Paris Altın Işık)">Haute Runway (Paris Altın Işık)</option>
                      <option value="Cyberpunk Kinetic (Neon Tokyo)">Cyberpunk Kinetic (Neon Tokyo)</option>
                    </select>
                    <p className="text-[10px] text-white/40 leading-relaxed">
                      “AI karar versin” seçilirse GüzelAI sektör, hedef kitle ve ticari hedefe göre Design DNA'yı kendisi belirler.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold">Temel Ticari Hedef:</label>
                  <input
                    type="text"
                    value={briefGoal}
                    onChange={(e) => setBriefGoal(e.target.value)}
                    placeholder="Örn: Global VIP lansman ve 5x daha yüksek sepet ortalaması"
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#E65A7F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold">
                    Referans Site / Görsel / Asset Notu <span className="text-white/40">(opsiyonel)</span>
                  </label>
                  <textarea
                    value={briefReference}
                    onChange={(e) => setBriefReference(e.target.value)}
                    rows={3}
                    placeholder="Örn: Referans site URL'si, yüklediğiniz görselin açıklaması, mevcut marka asset'leri, korunması gereken layout..."
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#44BDBD] resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold">
                    Ek Gereksinimler <span className="text-white/40">(opsiyonel)</span>
                  </label>
                  <textarea
                    value={briefRequirements}
                    onChange={(e) => setBriefRequirements(e.target.value)}
                    rows={3}
                    placeholder="Örn: Türkçe/İngilizce, ürün galerisi, rezervasyon formu, CMS, üyelik, sadece minimal motion, mevcut hero korunacak..."
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#44BDBD] resize-y"
                  />
                </div>

                {briefError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-400/25 text-rose-300 text-[11px]">
                    {briefError}
                  </div>
                )}

                <button
                  onClick={handleGenerateWebsitePlan}
                  disabled={briefLoading}
                  className="w-full py-3.5 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] disabled:opacity-50 text-white font-bold transition shadow-lg shadow-[#E65A7F]/30 flex items-center justify-center gap-2"
                >
                  {briefLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Website Builder Engine Tasarlıyor...
                    </>
                  ) : (
                    <>
                      <Braces className="w-4 h-4" />
                      Design DNA + Site Mimarisi + Master Build Prompt Oluştur
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Website Builder Engine v2 Planı Hazır</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/90">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-white/45 block text-[9px] uppercase">Proje</span>
                      <strong>{websitePlan?.projectSummary?.name || briefBrandName}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-white/45 block text-[9px] uppercase">Design DNA</span>
                      <strong>{websitePlan?.designDNA?.character || briefArchetype}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-white/45 block text-[9px] uppercase">Ana Hedef</span>
                      <strong>{websitePlan?.projectSummary?.conversionGoal || briefGoal}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-white/45 block text-[9px] uppercase">Sayfa Sayısı</span>
                      <strong>{Array.isArray(websitePlan?.siteMap) ? websitePlan.siteMap.length : 1} planlandı</strong>
                    </div>
                  </div>
                </div>

                {Array.isArray(websitePlan?.siteMap) && websitePlan.siteMap.length > 0 && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="text-[#44BDBD] font-black uppercase tracking-wider text-[10px]">
                      Site Architecture
                    </div>
                    {websitePlan.siteMap.slice(0, 4).map((page: any, index: number) => (
                      <div key={index} className="flex items-start justify-between gap-3 border-b border-white/5 last:border-0 py-1.5">
                        <strong className="text-white">{page.page}</strong>
                        <span className="text-white/55 text-right">{page.purpose}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-[#090B10] border border-[#44BDBD]/25 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#44BDBD] font-black uppercase tracking-wider text-[10px]">
                      Master Build Prompt
                    </span>
                    <button
                      type="button"
                      onClick={async () => {
                        const prompt = websitePlan?.masterBuildPrompt || "";
                        if (!prompt) return;
                        await navigator.clipboard.writeText(prompt);
                        setCopiedMasterPrompt(true);
                        setTimeout(() => setCopiedMasterPrompt(false), 1600);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold flex items-center gap-1"
                    >
                      <ClipboardCopy className="w-3 h-3" />
                      {copiedMasterPrompt ? "Kopyalandı" : "Kopyala"}
                    </button>
                  </div>
                  <p className="text-white/65 leading-relaxed max-h-32 overflow-y-auto pr-2">
                    {websitePlan?.masterBuildPrompt || "Master build prompt üretilemedi."}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  {["Design DNA", "Responsive", "QA + Fix", "Preservation"].map((item) => (
                    <div key={item} className="p-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white/75">
                      ✓ {item}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsBriefModalOpen(false);
                      onOpenContactModal();
                    }}
                    className="flex-1 py-3 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white font-bold transition"
                  >
                    Bu Planla Projeyi Başlat
                  </button>
                  <button
                    onClick={() => {
                      setBriefGenerated(false);
                      setWebsitePlan(null);
                    }}
                    className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition"
                  >
                    Düzenle
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
