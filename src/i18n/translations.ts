import { tr } from "./locales/tr";
import { en } from "./locales/en";
import { zh } from "./locales/zh";
import { es } from "./locales/es";
import { ja } from "./locales/ja";
import { ko } from "./locales/ko";
import { fr } from "./locales/fr";
import { de } from "./locales/de";
import { it } from "./locales/it";
import { ar } from "./locales/ar";
import { ru } from "./locales/ru";
import { hi } from "./locales/hi";

export type Language =
  | "tr"
  | "en"
  | "zh"
  | "es"
  | "ja"
  | "ko"
  | "fr"
  | "de"
  | "it"
  | "ar"
  | "ru"
  | "hi";

export interface LanguageMeta {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  dir: "ltr" | "rtl";
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", dir: "ltr", region: "Türkiye" },
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", dir: "ltr", region: "Global / US / UK" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", dir: "ltr", region: "East Asia" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", dir: "ltr", region: "Spain & LatAm" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", dir: "ltr", region: "Japan" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", dir: "ltr", region: "Korea" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", dir: "ltr", region: "France & Europe" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", dir: "ltr", region: "DACH & Europe" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", dir: "ltr", region: "Italy & Riviera" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇦🇪", dir: "rtl", region: "MENA & Gulf" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", dir: "ltr", region: "Eurasia" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", dir: "ltr", region: "India & South Asia" },
];

export interface TranslationSchema {
  nav: {
    services: string;
    aiStudio: string;
    clips: string;
    interactiveFormats: string;
    projects: string;
    blog: string;
    contact: string;
    openStudio: string;
    startProject: string;
    switchLang: string;
  };
  hero: {
    tagline: string;
    headlinePart1: string;
    headlinePart2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    studioCta: string;
    brandStatement: string;
    metrics: {
      aiModels: string;
      commercialSafe: string;
      speed: string;
    };
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      ai: {
        title: string;
        tagline: string;
        description: string;
        features: string[];
      };
      content: {
        title: string;
        tagline: string;
        description: string;
        features: string[];
      };
      design: {
        title: string;
        tagline: string;
        description: string;
        features: string[];
      };
      digitalMedia: {
        title: string;
        tagline: string;
        description: string;
        features: string[];
      };
    };
  };
  aiSection: {
    badge: string;
    title: string;
    subtitle: string;
    rosterBadge: string;
    rosterTitle: string;
    useModelBtn: string;
    liveStudioPrompt: string;
    features: {
      zeroCopyright: { title: string; desc: string };
      multiAngle: { title: string; desc: string };
      roboticVideo: { title: string; desc: string };
      virtualTryOn: { title: string; desc: string };
    };
    ctaLaunchFullStudio: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    items: {
      title: string;
      category: string;
      description: string;
      metric: string;
      color: string;
      image: string;
    }[];
  };
  blog: {
    badge: string;
    title: string;
    subtitle: string;
    readTime: string;
    readMore: string;
    categories: string[];
    posts: {
      category: string;
      title: string;
      excerpt: string;
      date: string;
      readMinutes: string;
      image: string;
    }[];
  };
  contactModal: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    serviceLabel: string;
    budgetLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successMessage: string;
    closeBtn: string;
  };
  footer: {
    tagline: string;
    aboutText: string;
    sections: {
      links: string;
      services: string;
      legal: string;
    };
    copyright: string;
    location: string;
    safeNotice: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  tr,
  en,
  zh,
  es,
  ja,
  ko,
  fr,
  de,
  it,
  ar,
  ru,
  hi,
};
