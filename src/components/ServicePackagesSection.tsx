import React from "react";

const packages = [
  {
    name: "Kampanya görseli",
    audience: "Tek ürün veya kısa bir lansman için",
    items: ["Ürün ve hedef kitleye uygun görsel yön", "Seçilen yetişkin AI modelle kampanya taslağı", "Yayın öncesi görsel ve kullanım hakkı kontrolü"],
  },
  {
    name: "Sosyal içerik serisi",
    audience: "Düzenli Instagram ve TikTok yayını için",
    items: ["Tekrarlanabilir renk ve tipografi kuralları", "Aynı modelle uyumlu görsel konseptleri", "Reels kapağı, açıklama ve yayın planı taslağı"],
  },
  {
    name: "Marka yüzü ve kimlik",
    audience: "Uzun soluklu bir marka dili kurmak için",
    items: ["Kurgusal karakter ve referans görselleri", "Logo, renk, web ve sosyal görsel yönü", "Yeni çekimler için karakter tutarlılığı dosyası"],
  },
] as const;

export const ServicePackagesSection: React.FC = () => (
  <section id="hizmet-paketleri" className="bg-[#f3f0ea] py-20 text-[#171717]">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a72c55]">Birlikte çalışalım</p>
      <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">Markanız için doğru üretim yolunu seçin.</h2>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#171717]/70">Ürününüzü ve hedefinizi anlatın. Kapsamı, teslimleri ve fiyatı size özel teklifimizde netleştirelim.</p>
      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {packages.map((item) => {
          const subject = encodeURIComponent(`GuzelAI teklif talebi: ${item.name}`);
          const body = encodeURIComponent(`Merhaba GuzelAI,\n\n${item.name} paketi için görüşmek istiyorum.\n\nMarkam/ürünüm: \nHedef kitlem: \nİstediğim teslimler: \nZamanlamam: `);
          return <article key={item.name} className="flex flex-col rounded-[28px] border border-[#171717]/10 bg-white p-6 shadow-sm sm:p-7">
            <h3 className="font-serif text-2xl font-semibold">{item.name}</h3>
            <p className="mt-2 text-sm text-[#171717]/60">{item.audience}</p>
            <ul className="mt-7 flex-1 space-y-3 text-sm leading-6">
              {item.items.map((detail) => <li key={detail} className="flex gap-2"><span aria-hidden="true" className="text-[#a72c55]">✓</span><span>{detail}</span></li>)}
            </ul>
            <a href={`mailto:info@guzelai.com?subject=${subject}&body=${body}`} className="mt-8 inline-flex justify-center rounded-full bg-[#171717] px-5 py-3 text-sm font-bold text-white hover:bg-[#a72c55]">Bu paket için teklif iste</a>
          </article>;
        })}
      </div>
      <p className="mt-5 text-xs leading-5 text-[#171717]/60">Bağlantı e-posta uygulamanızda taslak açar. Talep, Gönder düğmesine bastığınızda iletilir.</p>
    </div>
  </section>
);
