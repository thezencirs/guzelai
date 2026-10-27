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
  Download,
  UserCheck,
  Image as ImageIcon,
} from "lucide-react";

export interface VerifiedKombinItem {
  slot_number?: number;
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
  guzelai_url?: string;
  image_url: string;
  cutout_url?: string;
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
  archetype_id?: string;
  gender_group?: string;
  segment_label?: string;
  collection_badge?: string;
  title: string;
  viral_hook?: string;
  published_at: string;
  total_price_str: string;
  model_photo_url?: string;
  collage_url: string;
  pinterest_collage_url?: string;
  video_url?: string;
  telegram_bot_url?: string;
  telegram_copy_text?: string;
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
  id: "veor_uranis_bordo_kapsul_2k",
  archetype_id: "veor_uranis_bordo_kapsul_2k",
  gender_group: "kadin",
  segment_label: "👩 Kadın Kombini (%100 AI Manken)",
  title: "2027 Sonbahar/Kış Dark Glamour: Gece Yarısı Bordo Dik Yaka Triko, İçi Peluş Deri Mont & Antrasit Palazzo (%100 AI Model) 🎃🍷✨",
  viral_hook:
    "🛑 %100 AI Kadın Manken ile 1:1 birebir uyumlu 6 parçalık Dark Glamour kapsül kombin! İçi peluş kemerli deri mont, gece yarısı bordo dik yaka triko kazak, yüksek bel antrasit palazzo pantolon ve bordo Adidas Handball Spezial!",
  published_at: "27.10.2026 • 1:1 Doğrulanmış Vitrin",
  total_price_str: "9.896,35₺",
  model_photo_url: "/pinterest-models/hw27_women_step1.jpg",
  collage_url: "/data/latest_kombin_collage.jpg",
  pinterest_collage_url: "/data/latest_pinterest_collage.jpg",
  video_url: "/data/latest_kombin_video.mp4",
  telegram_bot_url: "https://t.me/guzelaibot",
  website_showcase_url: "https://guzelai.com/#kombinler",
  verification_summary: {
    total_items: 6,
    verified_items: 6,
    all_verified: true,
    checked_at: "27.10.2026",
    legal_notice:
      "⚖️ Yasal Uyarı: Reklam veya sponsorlu iş birliği içermez; tamamen kombin önerisi ve bilgilendirme amaçlıdır (zorunlu #reklam #işbirliğideğil).",
  },
  platforms: {
    instagram_reels: "https://www.instagram.com/guzelaicom/",
    tiktok: "https://www.tiktok.com/@guzelaicom",
    youtube_shorts: "https://www.youtube.com/@guzelaicom/shorts",
    x_twitter: "https://x.com/guzelaicom",
    pinterest: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    threads: "https://www.threads.net/@guzelaicom",
    whatsapp_channel: "https://whatsapp.com/channel/0029VbDetYc3mFYDwZSry016",
  },
  items: [],
};

const SEGMENT_FILTERS = [
  { id: "all", label: "🌟 Tümü (Tüm Kombinler)" },
  { id: "kadin", label: "👩 Kadın Kombinleri" },
  { id: "erkek", label: "👨 Erkek Kombinleri" },
  { id: "kiz_cocuk", label: "👧 Kız Çocuk" },
  { id: "erkek_cocuk", label: "👦 Erkek Çocuk" },
  { id: "cift", label: "👩‍❤️‍👨 Çift Kombinleri" },
];

export const VerifiedKombinShowcase: React.FC = () => {
  const [broadcasts, setBroadcasts] = useState<KombinBroadcastEntry[]>([FALLBACK_ENTRY]);
  const [selectedSegment, setSelectedSegment] = useState<string>("all");
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [mediaTab, setMediaTab] = useState<"video" | "model" | "collage">("model");
  const [copiedSku, setCopiedSku] = useState<string | null>(null);
  const [copiedTelegramBox, setCopiedTelegramBox] = useState<boolean>(false);

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

  const filteredBroadcasts = broadcasts.filter((b) => {
    if (selectedSegment === "all") return true;
    const g = (b.gender_group || "kadin").toLowerCase();
    if (selectedSegment === "kiz_cocuk") return g === "kiz_cocuk" || g === "cocuk";
    return g === selectedSegment;
  });

  const safeList = filteredBroadcasts.length > 0 ? filteredBroadcasts : broadcasts;
  const current = safeList[activeIdx] || safeList[0] || FALLBACK_ENTRY;

  const handleCopySku = (sku: string) => {
    try {
      navigator.clipboard.writeText(sku);
      setCopiedSku(sku);
      setTimeout(() => setCopiedSku(null), 2000);
    } catch {
      // ignore
    }
  };

  const buildTelegramText = (entry: KombinBroadcastEntry) => {
    if (entry.telegram_copy_text) return entry.telegram_copy_text;
    const lines = [
      `✨ ${entry.title}`,
      "",
      entry.viral_hook || "🛑 %100 AI Manken ile 1:1 birebir uyumlu 6 parçalık kombin ve mağaza linkleri:",
      "",
      ...entry.items.map(
        (it, idx) =>
          `${idx + 1}️⃣ ${it.emoji} ${it.category}: ${it.brand} – ${it.name} (${it.price} | Kod: ${it.sku}) 👉 ${
            it.guzelai_url || `https://guzelai.com/go/${it.sku}`
          }`
      ),
      "",
      `💰 Toplam 6 Parça Kombin Bütçesi: ${entry.total_price_str}`,
      `🌐 Görselli Kombin Vitrini: https://guzelai.com/#kombinler`,
      entry.verification_summary?.legal_notice || "",
    ];
    return lines.join("\n");
  };

  const handleCopyTelegramBlock = () => {
    try {
      navigator.clipboard.writeText(buildTelegramText(current));
      setCopiedTelegramBox(true);
      setTimeout(() => setCopiedTelegramBox(false), 2500);
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
        {/* Top Banner: GuzelAI Telegram-Style 1:1 Kombin & AI Manken Vitrin Merkezi */}
        <div className="bg-[#171717] text-white px-6 sm:px-10 py-8 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  1:1 AI Manken & Kombin Vitrini ({current.segment_label || "👩 Kadın Kombini"}) •{" "}
                  {current.verification_summary.verified_items}/
                  {current.verification_summary.total_items} Parça Birebir Eşleşti
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                {current.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                {current.viral_hook}
              </p>
            </div>

            {/* Direct Telegram Bot (@guzelaibot) & Copy Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={current.telegram_bot_url || "https://t.me/guzelaibot"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-2xl bg-[#24A1DE] hover:bg-[#1d8ec5] text-white font-black text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-[#24A1DE]/25"
              >
                <Send className="w-4 h-4" />
                <span>Telegram Botu (@guzelaibot)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={handleCopyTelegramBlock}
                className="px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-emerald-500/20"
              >
                {copiedTelegramBox ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Açıklama & Linkler Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Telegram Paketi Metnini Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Demographic Segment Filter Tabs: Kadın, Erkek, Kız Çocuk, Erkek Çocuk, Çift */}
          <div className="mt-6 pt-5 border-t border-white/10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/60 mr-1">
                Manken & Kombin Kategorisi:
              </span>
              {SEGMENT_FILTERS.map((seg) => (
                <button
                  key={seg.id}
                  onClick={() => {
                    setSelectedSegment(seg.id);
                    setActiveIdx(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition ${
                    selectedSegment === seg.id
                      ? "bg-[#E65A7F] text-white shadow-md shadow-[#E65A7F]/30"
                      : "bg-white/10 text-white/75 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {seg.label}
                </button>
              ))}
            </div>

            {/* Horizontal Outfit Selector Cards */}
            {safeList.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
                {safeList.map((b, i) => (
                  <button
                    key={b.id}
                    onClick={() => setActiveIdx(i)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl text-left shrink-0 border transition ${
                      i === activeIdx
                        ? "bg-white text-[#171717] border-[#E65A7F] shadow-md"
                        : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {b.model_photo_url && (
                      <img
                        src={b.model_photo_url}
                        alt={b.title}
                        className="w-9 h-12 rounded-lg object-cover bg-neutral-800 shrink-0"
                      />
                    )}
                    <div className="max-w-[180px]">
                      <div
                        className={`text-[10px] font-extrabold uppercase truncate ${
                          i === activeIdx ? "text-[#E65A7F]" : "text-emerald-300"
                        }`}
                      >
                        {b.segment_label || "1:1 Kombin"}
                      </div>
                      <div className="text-xs font-bold truncate">{b.title}</div>
                      <div
                        className={`text-[10px] font-mono ${
                          i === activeIdx ? "text-[#171717]/70" : "text-white/60"
                        }`}
                      >
                        {b.total_price_str}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid: Left 1:1 AI Manken / 2K Video / Telegram Stok Kutusu | Right 6 1:1 Dekupe Parça Kartları */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#FAF8F5]/60">
          {/* Left 5 Cols: 1:1 AI Manken + 2K Video + Telegram Copy-Paste Stock Box */}
          <div className="lg:col-span-5 space-y-5">
            {/* Media View Switcher */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#171717]/10">
              <button
                onClick={() => setMediaTab("model")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                  mediaTab === "model"
                    ? "bg-[#171717] text-white"
                    : "text-[#171717]/70 hover:bg-neutral-100"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>1:1 AI Manken</span>
              </button>
              <button
                onClick={() => setMediaTab("video")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                  mediaTab === "video"
                    ? "bg-[#E65A7F] text-white"
                    : "text-[#171717]/70 hover:bg-neutral-100"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>2K Reels Video</span>
              </button>
              <button
                onClick={() => setMediaTab("collage")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                  mediaTab === "collage"
                    ? "bg-[#171717] text-white"
                    : "text-[#171717]/70 hover:bg-neutral-100"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Pinterest Kolaj</span>
              </button>
            </div>

            <div className="rounded-3xl overflow-hidden border border-[#171717]/10 bg-black shadow-md relative group">
              {mediaTab === "video" ? (
                <video
                  src={current.video_url || "/data/latest_kombin_video.mp4"}
                  poster={current.model_photo_url || current.collage_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full aspect-[9/16] object-cover"
                />
              ) : mediaTab === "collage" ? (
                <img
                  src={current.pinterest_collage_url || current.collage_url}
                  alt={current.title}
                  className="w-full aspect-[9/16] object-cover bg-[#F7F4EF]"
                />
              ) : (
                <img
                  src={current.model_photo_url || current.collage_url}
                  alt={current.title}
                  className="w-full aspect-[9/16] object-cover bg-neutral-900"
                />
              )}

              <div className="p-5 bg-[#171717] text-white space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E65A7F] text-white text-[11px] font-black">
                    <Sparkles className="w-3 h-3" />
                    <span>TOPLAM 6 PARÇA: {current.total_price_str}</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-300 font-bold">
                    {current.segment_label || "1:1 Doğrulanmış Manken"}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black leading-tight">{current.title}</h3>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={current.video_url || "/data/latest_kombin_video.mp4"}
                    download
                    className="py-2.5 px-3 rounded-xl bg-white text-[#171717] font-black text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-100 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>2K Video İndir</span>
                  </a>
                  <a
                    href={current.telegram_bot_url || "https://t.me/guzelaibot"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#24A1DE] text-white font-black text-xs flex items-center justify-center gap-1.5 hover:bg-[#1d8ec5] transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram'da Aç</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Telegram-Identical 1-Tap Copy-Paste Caption & Links Box */}
            <div className="p-5 rounded-2xl bg-[#171717] text-white border border-white/10 shadow-md space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-[#24A1DE] flex items-center gap-1.5 uppercase tracking-wider">
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram (@guzelaibot) Hazır Paylaşım Metni</span>
                </span>
                <button
                  onClick={handleCopyTelegramBlock}
                  className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black flex items-center gap-1 transition"
                >
                  {copiedTelegramBox ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Tek Tıkla Kopyala</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-white/85 bg-black/50 p-3.5 rounded-xl overflow-x-auto whitespace-pre-wrap max-h-60 leading-relaxed border border-white/10">
                {buildTelegramText(current)}
              </pre>
            </div>
          </div>

          {/* Right 7 Cols: 6 Visual 1:1 Studio Cutout Product Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#171717]/10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E65A7F] font-black">
                  SARP (Ajan 18) 1:1 Görsel & Üst Giyim Eşleşme Kilidi Aktif
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#171717]">
                  Mankenin Üzerindeki 6 Parçanın 1:1 Dekupe Görselleri & Mağaza Linkleri
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full w-fit">
                ✓ %100 Birebir Manken-Kıyafet Uyumu
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {current.items.map((item, idx) => (
                <div
                  key={item.key}
                  className="rounded-2xl bg-white border border-[#171717]/10 hover:border-[#E65A7F] shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* 1:1 Studio Cutout Image Header */}
                    <div className="relative h-60 bg-white overflow-hidden border-b border-neutral-100">
                      <img
                        src={item.cutout_url || item.image_url}
                        alt={item.full_name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 bg-white"
                        loading="lazy"
                        onError={(e) => {
                          const fallback = item.image_url || `/data/item_card_${item.key}.jpg`;
                          if ((e.currentTarget as HTMLImageElement).src !== fallback) {
                            (e.currentTarget as HTMLImageElement).src = fallback;
                          }
                        }}
                      />
                      {/* Top Left Slot Number + Category Pill */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#171717] text-white text-xs font-extrabold flex items-center gap-1.5 shadow">
                        <span>#{item.slot_number || idx + 1}</span>
                        <span>{item.emoji}</span>
                        <span>{item.category}</span>
                      </div>
                      {/* Top Right Price Tag */}
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#E65A7F] text-white text-xs font-black shadow-md">
                        {item.price}
                      </div>
                      {/* Bottom Verified 1:1 Badge */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between px-3 py-1 rounded-lg bg-emerald-950/90 backdrop-blur-md text-emerald-300 text-[11px] font-bold">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>1:1 Manken Uyumlu • {item.store_name}</span>
                        </span>
                        <span className="font-mono text-[10px] text-emerald-200">
                          Kod: {item.sku}
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
                      href={item.guzelai_url || item.product_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#171717] group-hover:bg-[#E65A7F] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Mağazada Aç ({item.store_name})</span>
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
