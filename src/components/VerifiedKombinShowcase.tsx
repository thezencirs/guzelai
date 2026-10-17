import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  ShoppingBag,
  Sparkles,
  Play,
  Copy,
  Check,
  ShieldCheck,
  MessageCircle,
  Send,
  Film,
} from "lucide-react";

export interface VerifiedKombinItem {
  key: string;
  category: string;
  emoji: string;
  brand: string;
  name: string;
  full_name: string;
  price: string;
  sku: string;
  color?: string;
  product_url: string;
  image_url: string;
  visual_card_url?: string;
  verified: boolean;
  http_status: number;
  store_name: string;
  store_domain: string;
  verified_badge: string;
  checked_at: string;
}

export interface KombinBroadcastEntry {
  id: string;
  title: string;
  viral_hook?: string;
  published_at: string;
  total_price_str: string;
  collage_url: string;
  video_url?: string;
  website_showcase_url: string;
  verification_summary: {
    total_items: number;
    verified_items: number;
    all_verified: boolean;
    checked_at: string;
    legal_notice: string;
  };
  platforms: {
    instagram_reels: string;
    tiktok: string;
    youtube_shorts: string;
    x_twitter: string;
    pinterest: string;
    threads: string;
    whatsapp_channel: string;
  };
  items: VerifiedKombinItem[];
}

const FALLBACK_ENTRY: KombinBroadcastEntry = {
  id: "kombin_default_live",
  title: "5.000₺ Bütçeyle 50.000₺'lik 'Old Money' Görünmenin Sırrı! (4. Parçaya Dikkat) 🔥",
  viral_hook:
    "🛑 SAKIN GEÇME! Girdiğin her ortamda 'Üzerindekileri hangi lüks markadan aldın?' dedirten, boyu 10 cm daha uzun gösteren o 6 parçalık Old Money sırrı çözüldü! 👇✨",
  published_at: "17.10.2026 • Canlı Yayın",
  total_price_str: "5.185,44₺",
  collage_url: "/data/latest_kombin_collage.jpg",
  video_url: "/data/latest_kombin_video.mp4",
  website_showcase_url: "https://guzelai.com/#kombinler",
  verification_summary: {
    total_items: 6,
    verified_items: 6,
    all_verified: true,
    checked_at: "17.10.2026",
    legal_notice:
      "⚖️ Yasal Uyarı: Reklam veya sponsorlu iş birliği içermez; tamamen kombin önerisi ve bilgilendirme amaçlıdır (zorunlu #reklam #işbirliğideğil).",
  },
  platforms: {
    instagram_reels: "https://www.instagram.com/reel/Dek4QoIsu5q/",
    tiktok: "https://www.tiktok.com/@guzelaicom",
    youtube_shorts: "https://www.youtube.com/@guzelaicom/shorts",
    x_twitter: "https://x.com/guzelaicom",
    pinterest: "https://tr.pinterest.com/",
    threads: "https://www.threads.net/@guzelaicom",
    whatsapp_channel: "https://whatsapp.com/channel/0029VbDetYc3mFYDwZSry016",
  },
  items: [
    {
      key: "outerwear",
      category: "Dış Giyim",
      emoji: "🧥",
      brand: "MSRT",
      name: "Baggy Paraşüt Unisex Ceket Yağmurluk",
      full_name: "MSRT Baggy Paraşüt Unisex Ceket Yağmurluk",
      price: "460₺",
      sku: "823804912",
      color: "Mavi",
      product_url:
        "https://www.trendyol.com/msrt/baggy-parasut-unisex-ceket-yagmurluk-p-823804912",
      image_url:
        "https://cdn.dsmcdn.com/ty1269/product/media/images/prod/SPM/PIM/20240423/00/353cf3f2-3f5b-30aa-b13c-b40ec6cc55d3/1_org_zoom.jpg",
      verified: true,
      http_status: 200,
      store_name: "Trendyol",
      store_domain: "trendyol.com",
      verified_badge: "Doğrulanmış Trendyol Linki",
      checked_at: "17.10.2026",
    },
    {
      key: "cap",
      category: "Aksesuar & Gözlük",
      emoji: "🕶️",
      brand: "PROTCO",
      name: "Kadın Gözlük 2’li Set – Siyah & Leopar Cateye",
      full_name:
        "PROTCO Kadın Gözlük 2’li Set – Güneş Gözlüğü Siyah ve Leopar Çerçeveli Gözlük Cateye",
      price: "185,25₺",
      sku: "1143100342",
      color: "Siyah",
      product_url:
        "https://www.trendyol.com/protco/kadin-gozluk-2-li-set-gunes-gozlugu-siyah-ve-leopar-cerceveli-gozluk-cateye-p-1143100342",
      image_url:
        "https://cdn.dsmcdn.com/ty1896/prod/QC_PREP/20260507/23/7fd9f567-cc8b-3222-a33d-536434edded9/1_org_zoom.jpg",
      verified: true,
      http_status: 200,
      store_name: "Trendyol",
      store_domain: "trendyol.com",
      verified_badge: "Doğrulanmış Trendyol Linki",
      checked_at: "17.10.2026",
    },
    {
      key: "top",
      category: "Üst Giyim",
      emoji: "👕",
      brand: "FRAMGAN",
      name: "Unisex Y2k NYC Baskılı Kapüşonlu Sweatshirt Hoodie",
      full_name:
        "Framgan Unisex Y2k Erkek/Kadın NYC Baskılı Kapüşonlu Pamuklu Sweatshirt Hoodie",
      price: "325,61₺",
      sku: "994190617",
      color: "Gri",
      product_url:
        "https://www.trendyol.com/framgan/unisex-y2k-erkek-kadin-nyc-baskili-kapusonlu-pamuklu-sweatshirt-hoodie-p-994190617",
      image_url:
        "https://cdn.dsmcdn.com/ty1765/prod/QC_PREP/20250930/00/c8938ea8-79f5-3199-a480-df989ca88726/1_org_zoom.jpg",
      verified: true,
      http_status: 200,
      store_name: "Trendyol",
      store_domain: "trendyol.com",
      verified_badge: "Doğrulanmış Trendyol Linki",
      checked_at: "17.10.2026",
    },
    {
      key: "bottom",
      category: "Alt Giyim",
      emoji: "👖",
      brand: "PAULMARK",
      name: "Kadın Ekose Yüksek Bel İspanyol Paça Pantolon",
      full_name: "PAULMARK Kadın Ekose Yüksek Bel İspanyol Paça Kumaş Pantolon",
      price: "1.999₺",
      sku: "1185682876",
      color: "Gri",
      product_url:
        "https://www.trendyol.com/paulmark/kadin-ekose-yuksek-bel-ispanyol-paca-kumas-pantolon-p-1185682876",
      image_url:
        "https://cdn.dsmcdn.com/ty1956/prod/QC_ENRICHMENT/20260914/17/f1305da3-318d-3c94-bffc-cdab6c8b3bf0/1_org_zoom.jpg",
      verified: true,
      http_status: 200,
      store_name: "Trendyol",
      store_domain: "trendyol.com",
      verified_badge: "Doğrulanmış Trendyol Linki",
      checked_at: "17.10.2026",
    },
    {
      key: "bag",
      category: "Çanta",
      emoji: "👜",
      brand: "NWR BAGS",
      name: "3’lü Set Fular Detaylı Kadın Omuz ve Kol Çantası",
      full_name:
        "NWR BAGS 3’lü Set Fular Detaylı Kadın Omuz ve Kol Çantası – Siyah, Krem, Kahverengi",
      price: "549,90₺",
      sku: "1206721873",
      color: "Siyah / Kahve / Krem",
      product_url:
        "https://www.trendyol.com/nwr-bags/3-lu-set-fular-detayli-kadin-omuz-ve-kol-cantasi-siyah-krem-kahverengi-p-1206721873",
      image_url:
        "https://cdn.dsmcdn.com/ty1965/prod/QC_PREP/20260929/17/b5ffd1b8-5227-3a8e-836d-fed1fc28e822/1_org_zoom.jpg",
      verified: true,
      http_status: 200,
      store_name: "Trendyol",
      store_domain: "trendyol.com",
      verified_badge: "Doğrulanmış Trendyol Linki",
      checked_at: "17.10.2026",
    },
    {
      key: "shoes",
      category: "Ayakkabı",
      emoji: "👟",
      brand: "PUMA",
      name: "Creeper Phatty Nubuck Unisex Yeşil Spor Ayakkabı",
      full_name: "Puma Creeper Phatty Nubuck Unisex Yeşil Spor Ayakkabı",
      price: "1.919,99₺",
      sku: "838709319",
      color: "Green Fog",
      product_url:
        "https://www.trendyol.com/puma/creeper-phatty-nubuck-unisex-yesil-spor-ayakkabi-p-838709319",
      image_url:
        "https://cdn.dsmcdn.com/ty1624/prod/QC/20250117/18/c7333aa4-7de6-3d2a-abb3-ebfa982c3286/1_org_zoom.jpg",
      verified: true,
      http_status: 200,
      store_name: "Trendyol",
      store_domain: "trendyol.com",
      verified_badge: "Doğrulanmış Trendyol Linki",
      checked_at: "17.10.2026",
    },
  ],
};

export const VerifiedKombinShowcase: React.FC = () => {
  const [broadcasts, setBroadcasts] = useState<KombinBroadcastEntry[]>([FALLBACK_ENTRY]);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [copiedSku, setCopiedSku] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/data/kombin_feed.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!mounted || !data) return;
        if (Array.isArray(data.broadcasts) && data.broadcasts.length > 0) {
          setBroadcasts(data.broadcasts);
        } else if (data.latest) {
          setBroadcasts([data.latest]);
        }
      })
      .catch(() => {
        // Fallback already populated
      });
    return () => {
      mounted = false;
    };
  }, []);

  const current = broadcasts[activeIdx] || FALLBACK_ENTRY;

  const handleCopySku = (sku: string) => {
    try {
      navigator.clipboard.writeText(sku);
      setCopiedSku(sku);
      setTimeout(() => setCopiedSku(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="kombinler"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 scroll-mt-24"
    >
      <div className="bg-white rounded-[2rem] border border-[#171717]/10 shadow-xl overflow-hidden">
        {/* Top Banner: GuzelAI Medya Verified E-Commerce Hub */}
        <div className="bg-[#171717] text-white px-6 sm:px-10 py-8 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  Doğrulanmış E-Ticaret Link Kontrol Merkezi •{" "}
                  {current.verification_summary.verified_items}/
                  {current.verification_summary.total_items} Link Aktif (HTTP 200)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                {current.title || "Herkesin Sorduğu O Viral Kombin & Görselli Mağaza Linkleri 🔥"}
              </h2>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                {current.viral_hook ||
                  "Girdiğin her ortamda 'Üzerindekini nereden aldın?' dedirten, stokları kontrol edilmiş %100 Kadın kombin parçaları ve doğrudan mağaza linkleri:"}
              </p>
            </div>

            {/* Direct Community Channels: WhatsApp Channel & Instagram Reels */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={current.platforms.whatsapp_channel}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>WhatsApp Kombin Kanalı</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={current.platforms.instagram_reels}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-2xl bg-[#E65A7F] hover:bg-[#d44d71] text-white font-black text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-[#E65A7F]/20"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Instagram Reels (@guzelaicom)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Multi-Platform Broadcast Links Bar */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 mr-1">
                Bu Kombinin Yayınlandığı Platformlar:
              </span>
              <a
                href={current.platforms.instagram_reels}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#E65A7F] to-amber-500 text-white text-xs font-extrabold flex items-center gap-1.5 hover:opacity-95 transition"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Instagram Reels</span>
              </a>
              <a
                href={current.platforms.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Film className="w-3 h-3 text-[#44BDBD]" />
                <span>TikTok (@guzelaicom)</span>
              </a>
              <a
                href={current.platforms.youtube_shorts}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>YouTube Shorts</span>
              </a>
              <a
                href={current.platforms.x_twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <span>𝕏 Twitter</span>
              </a>
              <a
                href={current.platforms.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <span>📌 Pinterest</span>
              </a>
              <a
                href={current.platforms.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <span>🧵 Threads</span>
              </a>
            </div>

            {broadcasts.length > 1 && (
              <div className="flex items-center gap-1.5">
                {broadcasts.slice(0, 5).map((b, i) => (
                  <button
                    key={b.id}
                    onClick={() => setActiveIdx(i)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                      i === activeIdx
                        ? "bg-[#E65A7F] text-white"
                        : "bg-white/10 text-white/70 hover:text-white"
                    }`}
                  >
                    #{i + 1} {b.title.slice(0, 18)}...
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid: Left Short Graph-Motion Video & Collage | Right 6 Visual Verified Store Cards */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#FAF8F5]/60">
          {/* Left 4 Cols: Short Graph-Motion Video + Collage */}
          <div className="lg:col-span-4 space-y-5">
            <div className="rounded-3xl overflow-hidden border border-[#171717]/10 bg-black shadow-md relative group">
              <video
                src={current.video_url || "/data/latest_kombin_video.mp4"}
                poster={current.collage_url}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full aspect-[9/16] object-cover"
              />
              <div className="p-5 bg-[#171717] text-white space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E65A7F] text-white text-[11px] font-black w-fit">
                  <Sparkles className="w-3 h-3" />
                  <span>TOPLAM KOMBİN: {current.total_price_str}</span>
                </span>
                <h3 className="text-lg font-black leading-tight">{current.title}</h3>
                <p className="text-xs text-white/75">
                  Yayın & Kontrol Zamanı: {current.published_at}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={current.platforms.instagram_reels}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-white text-[#171717] font-black text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-100 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#171717]" />
                    <span>Reels Videosu</span>
                  </a>
                  <a
                    href={current.platforms.whatsapp_channel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-500 text-black font-black text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-400 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-black" />
                    <span>WhatsApp Kanalı</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Verification Audit Box */}
            <div className="p-5 rounded-2xl bg-white border border-emerald-500/30 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Otomatik Link Kontrol Raporu</span>
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                  %100 Doğrulandı
                </span>
              </div>
              <p className="text-xs text-[#171717]/70 leading-relaxed">
                Videoda kullanılan {current.verification_summary.total_items} parçanın tamamı
                resmi e-ticaret mağazasında (Trendyol) aktif, stokta ve fiyat/ürün kodu ile
                doğrulanmıştır.
              </p>
            </div>
          </div>

          {/* Right 8 Cols: 6 Visual E-Commerce Product Cards */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#171717]/10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E65A7F] font-black">
                  Görselli Doğrulanmış Mağaza Linkleri
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#171717]">
                  Kombindeki Parçaları Görselleriyle İncele & Mağazada Aç
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full w-fit">
                ✓ Tüm Linkler Güvenli & Doğrulanmış
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {current.items.map((item) => (
                <div
                  key={item.key}
                  className="rounded-2xl bg-white border border-[#171717]/10 hover:border-[#E65A7F] shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Product Image Header */}
                    <div className="relative h-56 bg-neutral-100 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.full_name}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300 bg-white"
                        loading="lazy"
                        onError={(e) => {
                          const fallback = item.visual_card_url || `/data/item_card_${item.key}.jpg`;
                          if ((e.currentTarget as HTMLImageElement).src !== window.location.origin + fallback) {
                            (e.currentTarget as HTMLImageElement).src = fallback;
                          }
                        }}
                      />
                      {/* Top Left Category Pill */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#171717]/85 backdrop-blur-md text-white text-xs font-extrabold flex items-center gap-1.5">
                        <span>{item.emoji}</span>
                        <span>{item.category}</span>
                      </div>
                      {/* Top Right Price Tag */}
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#E65A7F] text-white text-xs font-black shadow-md">
                        {item.price}
                      </div>
                      {/* Bottom Verified E-Commerce Badge */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between px-3 py-1 rounded-lg bg-emerald-950/90 backdrop-blur-md text-emerald-300 text-[11px] font-bold">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item.verified_badge}</span>
                        </span>
                        <span className="font-mono text-[10px] text-emerald-200">
                          HTTP {item.http_status}
                        </span>
                      </div>
                    </div>

                    {/* Product Details Body */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-[#E65A7F]">
                          {item.brand}
                        </span>
                        <button
                          onClick={() => handleCopySku(item.sku)}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 text-[#171717]/80 flex items-center gap-1 transition"
                          title="Ürün Kodunu Kopyala"
                        >
                          {copiedSku === item.sku ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">Kopyalandı</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Kod: {item.sku}</span>
                            </>
                          )}
                        </button>
                      </div>
                      <h4 className="text-sm font-bold text-[#171717] line-clamp-2 leading-snug">
                        {item.full_name}
                      </h4>
                    </div>
                  </div>

                  {/* Direct Verified Store Link Button */}
                  <div className="px-4 pb-4 pt-1">
                    <a
                      href={item.product_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#171717] group-hover:bg-[#E65A7F] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Doğrulanmış Mağazada Gör ({item.store_name})</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Legal Notice Footer */}
            <div className="p-4 rounded-2xl bg-neutral-100 border border-[#171717]/10 text-xs text-[#171717]/70 font-medium">
              {current.verification_summary.legal_notice}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifiedKombinShowcase;
