import React, { useState } from "react";
import { Globe, Check, Search, X, Sparkles } from "lucide-react";
import { Language, SUPPORTED_LANGUAGES } from "../i18n/translations";

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectLang,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filteredLanguages = SUPPORTED_LANGUAGES.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.nativeName.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term) ||
      item.region.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div
        id="modal-global-languages"
        className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Background Aesthetic Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#44BDBD]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Header */}
        <div className="relative flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E65A7F] to-[#FB5D2E] flex items-center justify-center shadow-lg shadow-[#E65A7F]/20">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  Global Dil ve Bölge Seçimi
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-extrabold text-neutral-300">
                  12 DİL
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                GuzelAI Medya uluslararası iş akışı için optimize edilmiş arayüz dili.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-5">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Dil ara (Örn: Çince, English, Español, 日本語, العربية...)"
            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[55vh] overflow-y-auto pr-1">
          {filteredLanguages.map((item) => {
            const isSelected = item.code === currentLang;
            return (
              <button
                key={item.code}
                id={`btn-lang-${item.code}`}
                onClick={() => {
                  onSelectLang(item.code);
                  onClose();
                }}
                className={`relative flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${
                  isSelected
                    ? "bg-gradient-to-r from-rose-500/20 to-amber-500/15 border-rose-500/50 shadow-md ring-1 ring-rose-500/40"
                    : "bg-neutral-800/60 hover:bg-neutral-800 border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none" role="img" aria-label={item.name}>
                    {item.flag}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white tracking-tight">
                        {item.nativeName}
                      </span>
                      {item.dir === "rtl" && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                          RTL
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                      <span>{item.name}</span>
                      <span>•</span>
                      <span className="text-[10px] text-neutral-500">{item.region}</span>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center shrink-0 shadow-sm shadow-rose-900/40">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Global Workflow Guarantee Notice */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Tüm AI manken katalogları, telif güvenceleri ve dikey reklam şablonları seçilen dilde anında senkronize olur.
            </span>
          </div>
          <span className="text-[11px] text-neutral-500 shrink-0 font-mono">
            {currentLang.toUpperCase()} Aktif
          </span>
        </div>
      </div>
    </div>
  );
};
