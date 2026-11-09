import React from "react";
import { SOCIAL_LINKS } from "../data/socialLinks";

const reels = [
  { title: "Nişantaşı galeri ve akşamüstü kahve stili", date: "18 Ekim 2026", url: "https://www.instagram.com/reel/DeoIDlQo3Yj/" },
  { title: "Old Money sonbahar renk kurgusu", date: "17 Ekim 2026", url: "https://www.instagram.com/reel/DemC8aEssyO/" },
  { title: "Bordo ve koyu kahve sonbahar kombini", date: "17 Ekim 2026", url: "https://www.instagram.com/reel/Del9WNNM7yb/" },
  { title: "Gündüzden akşam davetine kombin", date: "17 Ekim 2026", url: "https://www.instagram.com/reel/Dek4QoIsu5q/" },
  { title: "Haki süet bomber ve antrasit palazzo", date: "17 Ekim 2026", url: "https://www.instagram.com/reel/Dek0-8uMHlc/" },
  { title: "Denim ceket ve gri athleisure", date: "16 Ekim 2026", url: "https://www.instagram.com/reel/Dekp_nkMlFl/" },
];

export const SocialArchiveSection: React.FC = () => (
  <section id="sosyal-paylasimlar" className="bg-white py-20 border-y border-[#171717]/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[.25em] text-[#E65A7F] font-bold">Instagram arşivi</p>
      <h2 className="text-3xl sm:text-4xl font-bold mt-3">Reels bağlantı arşivi</h2>
      <p className="mt-4 max-w-3xl text-[#171717]/70 leading-relaxed">Bu doğrudan bağlantılar Ekim 2026 içerik kayıtlarında yer alıyor. Gönderilerin şu an erişilebilirliği ve hesap sahipliği yeniden doğrulanmalıdır. Yeni kombin vitrinindeki ürünlerle eşleşme veya güncel görüntülenme sayısı iddia etmiyoruz.</p>
      <nav aria-label="GuzelAI sosyal medya hesapları" className="mt-6 flex flex-wrap gap-2">
        {SOCIAL_LINKS.map((social) => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#171717]/15 px-4 py-2 text-xs font-bold hover:border-[#E65A7F] hover:text-[#a72c55]">{social.name} ↗</a>)}
      </nav>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-9">
        {reels.map((reel) => (
          <a key={reel.url} href={reel.url} target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-[#FAF8F5] p-6 border border-[#171717]/10 hover:border-[#E65A7F] hover:shadow-lg transition">
            <span className="text-xs text-[#E65A7F] font-bold">REELS · {reel.date}</span>
            <h3 className="text-lg font-bold mt-4">{reel.title}</h3>
            <span className="inline-block mt-6 text-sm font-semibold underline">Instagram’da gönderiyi aç ↗</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);
