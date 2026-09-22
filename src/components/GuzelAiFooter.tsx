import React from "react";
import { Language, TranslationSchema, SUPPORTED_LANGUAGES } from "../i18n/translations";
import { GuzelAiLogo } from "./GuzelAiLogo";
import { Globe, ShieldCheck, Heart } from "lucide-react";

interface GuzelAiFooterProps {
  lang?: Language;
  t: TranslationSchema;
  onToggleLang?: () => void;
  onOpenLangModal?: () => void;
  onOpenContactModal: () => void;
  onOpenStudio: () => void;
}

export const GuzelAiFooter: React.FC<GuzelAiFooterProps> = ({
  lang = "tr",
  t,
  onToggleLang,
  onOpenLangModal,
  onOpenContactModal,
  onOpenStudio,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const activeLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  return (
    <footer id="contact-section" className="bg-[#171717] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Tier: Logo & Mission & Quick Contact CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          <div className="md:col-span-5 space-y-4">
            <div className="inline-block">
              <GuzelAiLogo size="md" variant="dark-bg" showSubtitle={true} />
            </div>
            <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed">
              {t.footer.aboutText}
            </p>
            <div className="text-xs text-white/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#41631E]" />
              <span>{t.footer.location} &bull; Global Creative Delivery</span>
            </div>
          </div>

          {/* Links Column 1: Services */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#44BDBD]">
              {t.footer.sections.services}
            </div>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={onOpenStudio} className="hover:text-white transition">
                  AI Sentetik Mankenler
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("services-section")} className="hover:text-white transition">
                  Özgün İçerik & Viral Video
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("services-section")} className="hover:text-white transition">
                  3D Organik Tasarım & Markalama
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("services-section")} className="hover:text-white transition">
                  Performans & Dijital Medya
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Legal & Safe Notice */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FBC056]">
              {t.footer.sections.legal}
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-[#41631E]" />
                <span>%100 Ticari Kullanım Güvencesi</span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed">
                {t.footer.safeNotice}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright, Language Switcher & Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </div>

          <div className="flex items-center gap-4">
            <button
              id="btn-footer-language-toggle"
              onClick={onOpenLangModal || onToggleLang}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition text-xs border border-white/10"
              title="Global Dil Seçimi (12 Dil Destekli)"
            >
              <span className="text-sm leading-none" role="img" aria-label={activeLangObj.name}>
                {activeLangObj.flag}
              </span>
              <span>{activeLangObj.nativeName} ({lang.toUpperCase()})</span>
            </button>
            <span className="text-[11px] text-white/40">
              GuzelAI Medya Şirketi &bull; Global AI Creative Studio
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
