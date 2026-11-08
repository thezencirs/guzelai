import React, { useState } from "react";
import { Check, Copy, Fingerprint, Globe2, MapPin } from "lucide-react";
import { CHILD_MODELS } from "../data/childModels";
import { copyText } from "../utils/clipboard";

export const ChildModelCollection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    <section id="cocuk-modeller" className="relative overflow-hidden bg-[#f3eee7] py-20 text-[#211d1a] sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[#d8a89a]/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#a46758]/25 bg-white/65 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#754d42]">
            <Globe2 className="h-4 w-4" /> Genç yüzler atlası
          </span>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Gerçek hayattaki gibi. <span className="text-[#ad705f]">Her yüz kendine özgü.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#554c46] sm:text-base">
            Yedi coğrafyadan esinlenen yedi kurgusal çocuk karakter. Çil, saç kıvrımı, ben veya yaşa uygun cilt dokusu gibi ayrıntılar portrelerin parçası. Her karakterin sahnesi ve üretim promptu açıkça gösterilir.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {CHILD_MODELS.map((model) => (
            <article key={model.id} id={`child-${model.id}`} className="overflow-hidden rounded-[28px] border border-[#dbcfc4] bg-white shadow-[0_24px_60px_rgba(72,45,35,0.08)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e5d8cc]">
                <img src={model.image} alt={model.imageAltTR} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/5" />
                <span className="absolute left-5 top-5 rounded-full border border-white/40 bg-[#281d18]/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                  {model.continent} · {model.age} yaş
                </span>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/85"><MapPin className="h-3.5 w-3.5" />{model.location}</p>
                  <h3 className="font-serif text-4xl font-semibold sm:text-5xl">{model.name}</h3>
                </div>
              </div>
              <div className="space-y-5 p-5 sm:p-6">
                <p className="text-sm leading-7 text-[#3c352f]">{model.story}</p>
                <p className="text-xs leading-6 text-[#71655c]">{model.characterNoteTR}</p>
                <div className="flex items-start gap-2 rounded-2xl bg-[#f6f1eb] px-4 py-3 text-xs leading-6 text-[#5d4c42]">
                  <Fingerprint className="mt-1 h-4 w-4 shrink-0 text-[#ad705f]" />
                  <span><strong>İnsani ayrıntılar:</strong> {model.visibleDetailsTR}</span>
                </div>
                <div className="flex flex-wrap gap-2">{model.tags.map((tag) => <span key={tag} className="rounded-full border border-[#dfd4c9] px-2.5 py-1 text-[11px] font-medium text-[#65564b]">{tag}</span>)}</div>
                <div className="rounded-2xl border border-[#e5d9cd] bg-[#fbf8f4] p-4 sm:p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#945c50]">Görsel üretim promptu</span>
                    <button type="button" onClick={() => copyPrompt(model.id, model.prompt)} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#bda89a] px-3 py-1.5 text-[11px] font-semibold transition hover:bg-[#efe5dc]" aria-label={`${model.name} promptunu kopyala`}>
                      {copiedId === model.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedId === model.id ? "Kopyalandı" : copiedId === `failed:${model.id}` ? "Seçerek kopyala" : "Kopyala"}
                    </button>
                  </div>
                  <p className="break-words font-mono text-[11px] leading-6 text-[#665e58] sm:text-xs">{model.prompt}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-4xl text-xs leading-6 text-[#766a60]">Karakterler yapay zekâ ile üretilmiş kurgusal çocuklardır. Antarktika karakteri uluslararası bir araştırma ailesinin çocuğudur; kıtaya özgü bir etnik kimlik atfedilmez. Çocukların görünümü yetişkin güzellik standartlarıyla değerlendirilmez.</p>
      </div>
    </section>
  );
};
