import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  Sparkles,
  Clapperboard,
  Gamepad2,
  Globe,
  User,
  Camera,
  Video,
  Users,
  Shirt,
  Layers,
  ShieldCheck,
  BarChart3,
  Mail,
  RotateCcw,
  Command,
  CornerDownLeft,
  X,
  ArrowRight,
} from "lucide-react";
import type { AppPage } from "./GuzelAiHeader";
import type { NavTabId } from "./Sidebar";

export interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Sayfalar" | "Stüdyo Araçları" | "İşlemler";
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

interface CommandMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage: (page: AppPage) => void;
  onSelectStudioTab: (tab: NavTabId) => void;
  onOpenStudio: () => void;
  onOpenContactModal: () => void;
  onOpenAuthModal: () => void;
  onOpenLangModal: () => void;
  onOpenAnalyticsModal: () => void;
  onOpenCampaignModal: () => void;
  currentPage: AppPage;
}

export const CommandMenuModal: React.FC<CommandMenuModalProps> = ({
  isOpen,
  onClose,
  onNavigatePage,
  onSelectStudioTab,
  onOpenStudio,
  onOpenContactModal,
  onOpenAuthModal,
  onOpenLangModal,
  onOpenAnalyticsModal,
  onOpenCampaignModal,
  currentPage,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const allCommands = useMemo<CommandItem[]>(() => {
    return [
      // Pages
      {
        id: "page-home",
        title: "Ana Sayfa",
        subtitle: "GuzelAI Medya ana vitrini ve editoryal katalog",
        category: "Sayfalar",
        icon: <Sparkles className="w-4 h-4 text-[#E65A7F]" />,
        shortcut: "G H",
        action: () => {
          onNavigatePage("home");
          onClose();
        },
      },
      {
        id: "page-clips",
        title: "9:16 Dikey Klipler (Reels & TikTok)",
        subtitle: "Viral video reklam formatları ve prompt kütüphanesi",
        category: "Sayfalar",
        icon: <Clapperboard className="w-4 h-4 text-[#E65A7F]" />,
        shortcut: "G C",
        action: () => {
          onNavigatePage("clips");
          onClose();
        },
      },
      {
        id: "page-model-creator",
        title: "Model Üret (3D, Oyun & Influencer)",
        subtitle: "Unreal Engine kalitesinde özel manken üretimi",
        category: "Sayfalar",
        icon: <Gamepad2 className="w-4 h-4 text-[#44BDBD]" />,
        shortcut: "G M",
        action: () => {
          onNavigatePage("model_creator");
          onClose();
        },
      },
      {
        id: "page-websites",
        title: "Tasarım Web Siteleri (3D & Interactive)",
        subtitle: "Lüks interaktif marka portalleri ve e-ticaret",
        category: "Sayfalar",
        icon: <Globe className="w-4 h-4 text-emerald-400" />,
        shortcut: "G W",
        action: () => {
          onNavigatePage("websites");
          onClose();
        },
      },
      {
        id: "page-auth",
        title: "Giriş & Profil Portalı",
        subtitle: "Kullanıcı hesabı, kredi bakiyesi ve aktivite",
        category: "Sayfalar",
        icon: <User className="w-4 h-4 text-amber-400" />,
        shortcut: "G A",
        action: () => {
          onNavigatePage("auth");
          onClose();
        },
      },

      // Studio Modules
      {
        id: "studio-main",
        title: "Stüdyo Workspace'i Aç",
        subtitle: "Görsel üretim ve reklam hazırlama masası",
        category: "Stüdyo Araçları",
        icon: <Sparkles className="w-4 h-4 text-[#44BDBD]" />,
        shortcut: "S",
        action: () => {
          onOpenStudio();
          onClose();
        },
      },
      {
        id: "studio-templates",
        title: "Kolay Reklam Şablonları",
        subtitle: "Önceden optimize edilmiş hazır lüks reklam formatları",
        category: "Stüdyo Araçları",
        icon: <Layers className="w-4 h-4 text-amber-400" />,
        action: () => {
          onOpenStudio();
          onSelectStudioTab("templates");
          onClose();
        },
      },
      {
        id: "studio-photoshoot",
        title: "Photoshoot Wizard (Fotoğraf Stüdyosu)",
        subtitle: "Çok açılı e-ticaret ve editoryal stüdyo çekimleri",
        category: "Stüdyo Araçları",
        icon: <Camera className="w-4 h-4 text-[#E65A7F]" />,
        action: () => {
          onOpenStudio();
          onSelectStudioTab("photoshoot_wizard");
          onClose();
        },
      },
      {
        id: "studio-video",
        title: "Video Studio Director",
        subtitle: "Kamera hareketleri ve 9:16 sinematik video üretimi",
        category: "Stüdyo Araçları",
        icon: <Video className="w-4 h-4 text-purple-400" />,
        action: () => {
          onOpenStudio();
          onSelectStudioTab("your_videos");
          onClose();
        },
      },
      {
        id: "studio-models",
        title: "AI Model Roster",
        subtitle: "Valentina, Aylin, Defne ve marka mankenleri",
        category: "Stüdyo Araçları",
        icon: <Users className="w-4 h-4 text-sky-400" />,
        action: () => {
          onOpenStudio();
          onSelectStudioTab("models");
          onClose();
        },
      },
      {
        id: "studio-tryon",
        title: "Virtual Try-On (Kıyafet Giydirme)",
        subtitle: "Kumaş doku ve ürün giydirme stüdyosu",
        category: "Stüdyo Araçları",
        icon: <Shirt className="w-4 h-4 text-pink-400" />,
        action: () => {
          onOpenStudio();
          onSelectStudioTab("dress_up");
          onClose();
        },
      },
      {
        id: "studio-moodboard",
        title: "Moodboard & Reklam Akışı",
        subtitle: "İlham panosu ve görsel kompozisyon planlayıcı",
        category: "Stüdyo Araçları",
        icon: <Layers className="w-4 h-4 text-blue-400" />,
        action: () => {
          onOpenStudio();
          onSelectStudioTab("moodboard");
          onClose();
        },
      },
      {
        id: "studio-license",
        title: "Ticari Lisans & Telif Belgesi",
        subtitle: "%100 ticari kullanım ve telif güvencesi detayları",
        category: "Stüdyo Araçları",
        icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
        action: () => {
          onOpenStudio();
          onSelectStudioTab("legal_license");
          onClose();
        },
      },

      // Actions
      {
        id: "action-contact",
        title: "Proje Başlat / Teklif Al",
        subtitle: "Markanız için özel çekim veya 3D web sitesi talebi",
        category: "İşlemler",
        icon: <Mail className="w-4 h-4 text-[#E65A7F]" />,
        shortcut: "P",
        action: () => {
          onOpenContactModal();
          onClose();
        },
      },
      {
        id: "action-analytics",
        title: "Stüdyo Analitiği (Private Dashboard)",
        subtitle: "Modül kullanım süreleri, oturum kayıtları ve istatistikler",
        category: "İşlemler",
        icon: <BarChart3 className="w-4 h-4 text-[#44BDBD]" />,
        action: () => {
          onOpenAnalyticsModal();
          onClose();
        },
      },
      {
        id: "action-campaign",
        title: "AI Kampanya Paketi Üret",
        subtitle: "Çok kanallı reklam paketi oluşturucu",
        category: "İşlemler",
        icon: <Sparkles className="w-4 h-4 text-amber-400" />,
        action: () => {
          onOpenCampaignModal();
          onClose();
        },
      },
      {
        id: "action-lang",
        title: "Dil Seçimi (12 Global Dil)",
        subtitle: "Türkçe, İngilizce, Almanca, Fransızca, Japonca vb.",
        category: "İşlemler",
        icon: <Globe className="w-4 h-4 text-cyan-400" />,
        action: () => {
          onOpenLangModal();
          onClose();
        },
      },
      {
        id: "action-reload",
        title: "Uygulamayı Yeniden Yükle (Hard Reload)",
        subtitle: "Önbelleği tazeleyerek en güncel sürümü getirir",
        category: "İşlemler",
        icon: <RotateCcw className="w-4 h-4 text-neutral-400" />,
        shortcut: "R",
        action: () => {
          window.location.reload();
        },
      },
    ];
  }, [
    onNavigatePage,
    onOpenStudio,
    onSelectStudioTab,
    onOpenContactModal,
    onOpenAnalyticsModal,
    onOpenCampaignModal,
    onOpenLangModal,
    onClose,
  ]);

  // Filter commands based on user search query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return allCommands;
    const cleanQ = query.toLowerCase().trim();
    return allCommands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(cleanQ) ||
        (cmd.subtitle && cmd.subtitle.toLowerCase().includes(cleanQ)) ||
        cmd.category.toLowerCase().includes(cleanQ)
    );
  }, [allCommands, query]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside the palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(
      `[data-command-index="${selectedIndex}"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      id="command-menu-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-2xl bg-neutral-900 text-neutral-100 border border-neutral-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col font-['Plus_Jakarta_Sans',sans-serif] animate-in zoom-in-95 duration-150"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-5 py-4 border-b border-neutral-800 bg-neutral-950/80">
          <Command className="w-5 h-5 text-[#44BDBD] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sayfa, stüdyo modülü veya komut arayın... (Örn: photoshoot, try on, klipler)"
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-hidden font-medium"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[60vh] sm:max-h-96 overflow-y-auto p-2 sm:p-3 space-y-1"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-xs">
              <p className="font-semibold text-neutral-400">Sonuç bulunamadı</p>
              <p className="mt-1 text-neutral-500">
                "{query}" ile eşleşen bir sayfa veya komut mevcut değil.
              </p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  data-command-index={idx}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-neutral-800 text-white border border-[#44BDBD]/40 shadow-sm"
                      : "text-neutral-300 hover:bg-neutral-800/50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-neutral-700 text-white"
                          : "bg-neutral-800/80 text-neutral-400"
                      }`}
                    >
                      {cmd.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold truncate text-white">
                          {cmd.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-neutral-950/60 text-neutral-400 border border-neutral-800 shrink-0">
                          {cmd.category}
                        </span>
                      </div>
                      {cmd.subtitle && (
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {cmd.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {cmd.shortcut && (
                      <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                        {cmd.shortcut}
                      </span>
                    )}
                    {isSelected ? (
                      <CornerDownLeft className="w-3.5 h-3.5 text-[#44BDBD]" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-600 opacity-0 group-hover:opacity-100" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-5 py-3 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-between text-[11px] text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">
                ↓
              </kbd>
              <span className="ml-1">Gezin</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">
                ↵
              </kbd>
              <span className="ml-1">Seç</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">
                S
              </kbd>
              <span className="ml-1">Stüdyo</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-500">
            <span>GuzelAI Quick Palette</span>
          </div>
        </div>
      </div>
    </div>
  );
};
