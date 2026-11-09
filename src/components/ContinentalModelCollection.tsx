import React, { useEffect, useState } from "react";
import { Check, Copy, Globe2, MapPin, Sparkles } from "lucide-react";
import { ATLAS_MODELS, anglePromptFor, consistencyNegativePromptFor, identityRuleFor, videoPromptFor } from "../data/modelAtlas";
import { CONTINENTAL_MODELS } from "../data/continentalModels";
import { copyText } from "../utils/clipboard";

export const ContinentalModelCollection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("Öne çıkanlar");
  const continents = [...new Set(ATLAS_MODELS.map((model) => model.continent))];
  const featuredIds = new Set(CONTINENTAL_MODELS.map((model) => model.id));
  const visibleModels = filter === "Öne çıkanlar" ? ATLAS_MODELS.filter((model) => featuredIds.has(model.id)) : filter === "Tümü" ? ATLAS_MODELS : ATLAS_MODELS.filter((model) => model.continent === filter);

  useEffect(() => {
    const showFromGlobe = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      setFilter("Tümü");
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById(`model-${id}`)?.scrollIntoView({ behavior: "smooth" })));
    };
    window.addEventListener("guzelai:show-model", showFromGlobe);
    return () => window.removeEventListener("guzelai:show-model", showFromGlobe);
  }, []);

  const copyPrompt = async (id: string, prompt: string) => {
    try {
      if (!await copyText(prompt)) throw new Error("Copy failed");
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((current) => current === id ? null : current), 2200);
    } catch {
      setCopiedId(`failed:${id}`);
      window.setTimeout(() => setCopiedId((current) => current === `failed:${id}` ? null : current), 2200);
    }
  };

  return (
    <section id="dunya-modelleri" className="relative overflow-hidden bg-[#080d16] py-20 sm:py-28 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_5%,rgba(68,189,189,0.13),transparent_32%),radial-gradient(circle_at_85%_55%,rgba(230,90,127,0.1),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-100/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200">
              <Globe2 className="h-3.5 w-3.5" /> Dünya model atlası
            </div>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Yedi kıta. <span className="text-[#e9aabe]">21 özgün yüz.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Her karakterin sabit yüz özellikleri, ana referans portresi ve reklam ile video için üretim promptları var. Yeni çekimlerde aynı kişiyi korumak için açı ve hareket kurallarını kullanın.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-xs text-slate-300">
            <Sparkles className="h-4 w-4 text-[#e9aabe]" />
            <span>21 karakter · 21 şehir/sahne · açık promptlar</span>
          </div>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-2" aria-label="Model kıtası filtresi">
          {["Öne çıkanlar", "Tümü", ...continents].map((item) => <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${filter === item ? "border-[#e9aabe] bg-[#e9aabe] text-[#17202a]" : "border-white/20 text-white/75 hover:border-white/50 hover:text-white"}`}>{item}</button>)}
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {visibleModels.map((model, index) => (
            <article key={model.id} id={`model-${model.id}`} className="group scroll-mt-24 overflow-hidden rounded-[28px] border border-white/10 bg-[#101824] shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
                <img src={model.image} alt={model.imageAltTR} loading={index < 2 ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07101b] via-transparent to-black/10" />
                <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-md">
                  Model {String(ATLAS_MODELS.indexOf(model) + 1).padStart(2, "0")} / 21 · {model.continent}
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80"><MapPin className="h-3.5 w-3.5" />{model.location}</p>
                  <h3 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">{model.name}</h3>
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <p className="text-sm leading-7 text-slate-200">{model.story}</p>
                <p className="border-l-2 border-cyan-300/45 pl-3 text-xs leading-6 text-slate-400">{model.culturalNoteTR}</p>
                <div className="flex flex-wrap gap-2">
                  {model.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">{tag}</span>)}
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#080e17] p-4 sm:p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9ed3dc]">Görsel üretim promptu</span>
                    <button type="button" onClick={() => copyPrompt(model.id, model.prompt)} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-white/10" aria-label={`${model.name} promptunu kopyala`}>
                      {copiedId === model.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedId === model.id ? "Kopyalandı" : copiedId === `failed:${model.id}` ? "Seçerek kopyala" : "Kopyala"}
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap break-words font-mono text-[11px] leading-6 text-slate-300 sm:text-xs">{model.prompt}</p>
                </div>
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-100/[0.04] p-4 sm:p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-cyan-200">Karakter tutarlılığı dosyası</p>
                  <p className="mt-3 text-xs leading-6 text-slate-200">{identityRuleFor(model)}</p>
                  {model.wardrobeRuleTR && <p className="mt-2 text-xs leading-6 text-slate-400">{model.wardrobeRuleTR}</p>}
                  <details className="mt-4 border-t border-white/10 pt-3">
                    <summary className="cursor-pointer text-xs font-bold text-[#e9aabe]">Ön, ¾, profil, tam boy ve video promptları</summary>
                    <div className="mt-4 space-y-4">
                      {(["front", "three-quarter", "profile", "full-body"] as const).map((angle) => <div key={angle} className="rounded-xl bg-[#080e17] p-3"><div className="mb-2 flex items-center justify-between"><strong className="text-xs text-white">{({front:"Ön", "three-quarter":"¾ açı", profile:"Profil", "full-body":"Tam boy"})[angle]}</strong><button type="button" className="text-[11px] font-semibold text-cyan-200" onClick={() => copyPrompt(`${model.id}-${angle}`, anglePromptFor(model, angle))}>{copiedId === `${model.id}-${angle}` ? "Kopyalandı" : "Kopyala"}</button></div><p className="break-words font-mono text-[11px] leading-5 text-slate-400">{anglePromptFor(model, angle)}</p></div>)}
                      <div className="rounded-xl bg-[#080e17] p-3"><div className="mb-2 flex items-center justify-between"><strong className="text-xs text-white">6 saniyelik video</strong><button type="button" className="text-[11px] font-semibold text-cyan-200" onClick={() => copyPrompt(`${model.id}-video`, videoPromptFor(model))}>{copiedId === `${model.id}-video` ? "Kopyalandı" : "Kopyala"}</button></div><p className="break-words font-mono text-[11px] leading-5 text-slate-400">{videoPromptFor(model)}</p></div>
                      <p className="text-[11px] leading-5 text-slate-500">Kaçınılacaklar: {consistencyNegativePromptFor(model)}</p>
                    </div>
                  </details>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-xs leading-6 text-slate-400">Antarktika kartları uluslararası araştırma ekipleri için hazırlanmış kurgudur; kıtaya özgü yerli bir etnik kimlik iddiası taşımaz. Tüm karakterler kurgusaldır. Referans ve promptlar tutarlılığı destekler; yayın öncesi her kare insan gözüyle kontrol edilir. Marka logosu ve yazılar görsel üretiminden sonra tasarım katmanında eklenir.</p>
      </div>
    </section>
  );
};
