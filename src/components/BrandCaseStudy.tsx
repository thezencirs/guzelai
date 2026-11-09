import React from "react";
import { ArrowRight, BookOpen, Globe2, Mail, Megaphone, Palette, Sparkles } from "lucide-react";

const colors = [
  { name: "Mürekkep", hex: "#192625" },
  { name: "Sıcak kâğıt", hex: "#F7F3EB" },
  { name: "Yosun", hex: "#A7B8A5" },
  { name: "Kil", hex: "#D5967D" },
  { name: "Açık altın", hex: "#D8B878" },
];

const stages = [
  { no: "01", title: "Strateji", body: "Günlük bakımda sade dil, doğal yüzler ve kolay tanınan bir görsel düzen." },
  { no: "02", title: "Kimlik", body: "Dört harfli logotip, beş renk ve tüm yüzeylerde aynı tipografi kuralları." },
  { no: "03", title: "Hikâye", body: "Farklı yaşları ve şehirleri gerçek cilt dokusuyla gösteren kurgusal bir dünya." },
  { no: "04", title: "Uygulama", body: "Kutu, etiket, kart, mağaza posteri ve web ekranında aynı görsel işaret." },
  { no: "05", title: "Yayın", body: "4:5 portreden 9:16 videoya, e-postadan bloga aynı sanat yönetimi." },
  { no: "06", title: "Ölçüm", body: "Sayfa etkileşimi ve içerik kaydetme için bir plan; gerçekleşmiş sonuç iddiası yok." },
];

const BrandMark: React.FC<{ light?: boolean; compact?: boolean }> = ({ light = false, compact = false }) => (
  <span className={`inline-flex items-center gap-2.5 ${light ? "text-[#f7f3eb]" : "text-[#192625]"}`} aria-label="VÜLİ marka konsepti">
    <svg width={compact ? 30 : 39} height={compact ? 30 : 39} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M6 9 20 32 34 9" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 9 20 23 28 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".55" />
    </svg>
    <span className={`font-serif font-semibold tracking-[-0.055em] ${compact ? "text-2xl" : "text-4xl"}`}>VÜLİ</span>
  </span>
);

const BrandTube: React.FC<{ small?: boolean }> = ({ small = false }) => (
  <div className={`relative mx-auto flex flex-col items-center justify-between overflow-hidden border border-[#cdc9b9] bg-gradient-to-r from-[#edeadd] via-[#fffef7] to-[#e5e3d4] text-[#192625] shadow-[20px_28px_42px_rgba(25,38,37,.18)] ${small ? "h-48 w-28 rounded-[13px_13px_23px_23px] p-3" : "h-72 w-40 rounded-[18px_18px_31px_31px] p-5"}`}>
    <span className="text-[8px] font-bold uppercase tracking-[0.25em]">günlük bakım</span>
    <div className="text-center"><BrandMark compact /><p className="mt-3 text-[10px] uppercase tracking-[0.18em]">yumuşak dokunuş</p></div>
    <div className="w-full border-t border-[#192625]/20 pt-2 text-center text-[9px] uppercase tracking-[0.13em]">kurgusal ürün · konsept</div>
    <div className="absolute -bottom-1 left-3 right-3 h-4 rounded-b-md bg-[#bcc5b6] shadow-inner" />
  </div>
);

export const BrandCaseStudy: React.FC<{ onOpenContactModal: () => void }> = ({ onOpenContactModal }) => (
  <section id="vuli-marka-ornegi" className="overflow-hidden bg-[#f7f3eb] text-[#192625]">
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#192625]/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]"><Sparkles className="h-3.5 w-3.5" /> Kurgusal marka konsepti</span>
          <div className="mt-8"><BrandMark /></div>
          <h2 className="mt-7 max-w-2xl font-serif text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">Bir fikirden <em className="font-normal text-[#a76553]">tanınan</em> bir markaya.</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#52615b]">VÜLİ'nin renkleri, logosu, ambalajı, web sayfası ve kampanya görselleri tek bir yaratıcı sistemden çıkıyor. GuzelAI, bu örnekte markanın her temasını aynı çizgide tasarlıyor.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#vuli-sistem" className="inline-flex items-center gap-2 rounded-full bg-[#192625] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#30423d]">Marka sistemini keşfet <ArrowRight className="h-4 w-4" /></a>
            <button type="button" onClick={onOpenContactModal} className="rounded-full border border-[#192625]/35 px-6 py-3 text-sm font-bold transition hover:bg-white">Benim markamı planla</button>
          </div>
        </div>
        <div className="relative min-h-[520px] overflow-hidden rounded-[32px] bg-[#a7b8a5] p-6 shadow-[0_30px_80px_rgba(25,38,37,.16)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_15%,rgba(247,243,235,.8),transparent_35%),radial-gradient(circle_at_0%_100%,rgba(213,150,125,.45),transparent_45%)]" />
          <div className="relative flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.17em]"><span>GuzelAI vaka çalışması</span><span>01 / 06</span></div>
          <div className="relative mt-12 grid h-[390px] grid-cols-[.9fr_1.1fr] items-end gap-3">
            <div className="relative z-10 -mb-2 rotate-[-7deg] rounded-2xl border border-white/45 bg-[#d5967d] p-3 shadow-xl"><div className="flex h-60 flex-col justify-between border border-[#192625]/30 p-3"><BrandMark compact /><span className="font-serif text-xl leading-tight">Bakımın<br />gündelik hâli.</span><span className="text-[8px] uppercase tracking-[.16em]">Kurgusal ambalaj</span></div></div>
            <div className="relative z-20 flex h-full items-end justify-center"><BrandTube /></div>
          </div>
          <p className="relative mt-4 text-xs font-semibold uppercase tracking-[0.16em]">Aynı işaret. Her yüzeyde.</p>
        </div>
      </div>

      <div id="vuli-sistem" className="mt-24 scroll-mt-24 border-t border-[#192625]/15 pt-10">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a76553]">Marka haritası → gerçek uygulama</p><h3 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">Altı adım, tek kimlik.</h3></div><p className="max-w-sm text-sm leading-7 text-[#65736b]">Stratejide seçilen dil; kutuya, fotoğrafa ve ekrana aynı kurallarla taşınır.</p></div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{stages.map((stage) => <div key={stage.no} className="rounded-2xl border border-[#192625]/10 bg-white/70 p-5"><span className="text-xs font-bold text-[#ae715f]">{stage.no}</span><h4 className="mt-4 font-serif text-2xl font-semibold">{stage.title}</h4><p className="mt-2 text-sm leading-6 text-[#647169]">{stage.body}</p></div>)}</div>
      </div>

      <div className="mt-24 overflow-hidden rounded-[32px] bg-[#25342c] text-[#f7f3eb] lg:grid lg:grid-cols-[.8fr_1.2fr]">
        <div className="flex flex-col justify-between p-8 sm:p-12">
          <div><span className="text-xs font-bold uppercase tracking-[.22em] text-[#d8b878]">01 / Koleksiyon</span><div className="mt-9"><BrandMark light /></div><h3 className="mt-8 max-w-md font-serif text-4xl leading-tight sm:text-5xl">Bakımın sessiz lüksü.</h3><p className="mt-5 max-w-sm text-sm leading-7 text-[#d4ded4]">Üç ürün, tek ritüel. Taş, cam ve sıcak metalin sakin dili tüm ambalajlarda tekrar eder. Bu ürünler portfolyo için tasarlanmış kurgusal konseptlerdir.</p></div>
          <div className="mt-12 border-t border-white/20 pt-5 text-xs uppercase tracking-[.18em] text-[#d8b878]">Arın · Dengele · Tamamla</div>
        </div>
        <div className="relative min-h-[390px]"><img src="/assets/vuli/collection.png" alt="VÜLİ için üretilmiş üç parçalı kurgusal lüks cilt bakımı koleksiyonu görseli" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><span className="absolute bottom-5 right-5 rounded-full bg-[#f7f3eb]/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#192625]">Yapay zekâ ile üretilmiş konsept görsel</span></div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { step: "01", name: "SÂF", type: "Nazik temizleyici", color: "#d5967d", story: "Mat kil tüp; sabah ve akşam ritüelinin sade açılışı." },
          { step: "02", name: "ÖZ", type: "Yüz serumu", color: "#d8b878", story: "Buzlu cam şişe; ışık ve şeffaflık üzerine kurulu ürün dili." },
          { step: "03", name: "TEN", type: "Günlük krem", color: "#a7b8a5", story: "Alçak kavanoz; sakin, dokunsal bir kapanış." },
        ].map((product) => <article key={product.step} className="rounded-[26px] border border-[#192625]/10 bg-white/80 p-6 sm:p-8"><div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[.2em]">VÜLİ / {product.step}</span><span className="h-5 w-5 rounded-full" style={{ backgroundColor: product.color }} /></div><h4 className="mt-12 font-serif text-5xl">{product.name}</h4><p className="mt-2 text-xs font-bold uppercase tracking-[.17em] text-[#a76553]">{product.type}</p><p className="mt-5 border-t border-[#192625]/15 pt-5 text-sm leading-7 text-[#647169]">{product.story}</p></article>)}
      </div>

      <div className="mt-24 grid gap-8 lg:grid-cols-2">
        <div><span className="text-xs font-bold uppercase tracking-[.2em] text-[#a76553]">02 / Sanat yönetimi</span><h3 className="mt-4 font-serif text-4xl sm:text-5xl">Her karede aynı imza.</h3><p className="mt-5 max-w-lg text-sm leading-7 text-[#647169]">Kampanya görsellerinde yetişkin yüzler, gerçekçi cilt dokusu, sıcak yandan ışık ve sakin arka plan kullanılır. Ürün kadrajlarında taş, buzlu cam ve ölçülü metal yansımaları tekrar eder. Logo için güvenli boşluk ve sabit renkler, tüm mecraları birbirine bağlar.</p></div>
        <div className="grid grid-cols-2 gap-3 text-sm"><div className="rounded-2xl bg-[#e5d7c7] p-5"><span className="font-bold">Fotoğraf</span><p className="mt-3 text-[#52615b]">Doğal doku · yumuşak kontrast · yakın plan</p></div><div className="rounded-2xl bg-[#a7b8a5] p-5"><span className="font-bold">Hareket</span><p className="mt-3 text-[#30423d]">Yavaş kamera · dokusal geçiş · 9:16</p></div><div className="rounded-2xl bg-[#d8b878] p-5"><span className="font-bold">Ses</span><p className="mt-3 text-[#30423d]">Hafif ortam sesi · kısa, sakin anlatım</p></div><div className="rounded-2xl bg-[#192625] p-5 text-white"><span className="font-bold">Yazı</span><p className="mt-3 text-white/75">Editoryal serif · kısa başlık · net ürün adı</p></div></div>
      </div>

      <div className="mt-24 grid gap-8 lg:grid-cols-[.78fr_1.22fr]">
        <div className="rounded-[30px] bg-[#192625] p-6 text-[#f7f3eb] sm:p-8"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.17em] text-[#d8b878]"><Palette className="h-4 w-4" /> Kimlik sistemi</div><div className="mt-8"><BrandMark light /></div><p className="mt-5 max-w-sm text-sm leading-7 text-[#ccd5cb]">İki iç içe V yayı, sözcük işareti ve beş sabit renk. Ambalajın üstündeki boşluk, sosyal karttaki yazı ve web düğmesi aynı düzeni izler.</p><div className="mt-8 grid grid-cols-5 gap-2">{colors.map((color) => <div key={color.hex}><div className="h-16 rounded-xl border border-white/20" style={{ backgroundColor: color.hex }} /><p className="mt-2 text-[9px] leading-4 text-[#dce3d9]">{color.name}<br />{color.hex}</p></div>)}</div></div>
        <div className="overflow-hidden rounded-[30px] border border-[#192625]/10 bg-white shadow-xl"><div className="flex items-center justify-between border-b border-[#192625]/10 px-5 py-3"><BrandMark compact /><div className="hidden gap-5 text-[10px] font-bold uppercase tracking-[.1em] text-[#65736b] sm:flex"><span>Hikâye</span><span>Koleksiyon</span><span>Günlük</span></div><span className="rounded-full border border-[#192625]/20 px-3 py-1 text-[10px] font-bold">Web sitesi örneği</span></div><div className="grid min-h-[395px] sm:grid-cols-[.9fr_1.1fr]"><div className="flex flex-col justify-center bg-[#f3eee5] p-8"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#a76553]">VÜLİ / örnek ana sayfa</span><h4 className="mt-5 font-serif text-4xl font-semibold leading-tight">Gündelik bakım,<br />gerçek yüzler.</h4><p className="mt-4 text-sm leading-6 text-[#66736b]">Koleksiyonun hikâyesini doğal ışıkta, aynı renklerde ve tutarlı model diliyle keşfedin.</p><span className="mt-6 w-fit rounded-full bg-[#192625] px-4 py-2 text-xs font-bold text-white">Koleksiyonu keşfet</span></div><div className="relative min-h-[340px]"><img src="/assets/continental-models/africa.webp" alt="VÜLİ kurgu web sitesi örneğinde yetişkin model Ama Mensah" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><span className="absolute bottom-4 right-4 rounded-full bg-[#f7f3eb]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em]">Yetişkin model · aynı görsel dil</span></div></div></div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="overflow-hidden rounded-[26px] bg-[#e6dacd]"><div className="relative h-72"><img src="/assets/continental-models/north-america.webp" alt="VÜLİ örnek kampanya görselinde yetişkin model Lucía Serrano" loading="lazy" className="h-full w-full object-cover" /><span className="absolute left-4 top-4 rounded-full bg-[#f7f3eb]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[.1em]">4:5 kampanya</span></div><div className="p-5"><BrandMark compact /><p className="mt-3 text-sm leading-6">Aynı palet, aynı tipografi, doğal cilt dokusu.</p></div></div>
        <div className="overflow-hidden rounded-[26px] bg-[#a7b8a5]"><div className="relative h-72"><img src="/assets/vuli/collection.png" alt="VÜLİ konsept koleksiyonunun taş ve sıcak ışıkla hazırlanan ürün kampanyası" loading="lazy" className="h-full w-full object-cover" /><span className="absolute left-4 top-4 rounded-full bg-[#f7f3eb]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[.1em]">Ürün kampanyası</span></div><div className="p-5"><h4 className="font-serif text-2xl font-semibold">Dokuyu hissettiren kadraj</h4><p className="mt-3 text-sm leading-6">Üç ürün aynı taş yüzey, ışık açısı ve renk hikâyesinde birleşir.</p></div></div>
        <div className="flex flex-col justify-between rounded-[26px] bg-[#d5967d] p-6"><div><span className="text-[10px] font-bold uppercase tracking-[.17em]">9:16 sosyal kapak</span><div className="mt-8"><BrandMark /></div><h4 className="mt-8 max-w-[260px] font-serif text-4xl font-semibold leading-tight">Bir gün. Yedi şehir. Aynı görsel dil.</h4></div><p className="mt-9 border-t border-[#192625]/25 pt-4 text-sm">Görsel kural: sıcak doğal ışık, gerçek cilt dokusu ve aynı logo yerleşimi.</p></div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Globe2, title: "Web & SEO", body: "Açık sayfa yapısı, özgün başlıklar ve marka hikâyesi." },
          { icon: Mail, title: "E-posta", body: "Örnek konu: VÜLİ dünyasına hoş geldiniz." },
          { icon: BookOpen, title: "Blog & içerik", body: "Örnek yazı: Görsellerde doğal cilt dokusunu korumak." },
          { icon: Megaphone, title: "Basın kiti", body: "Marka özeti, logo, renk kodları ve onaylı görsel seti." },
        ].map((item) => <div key={item.title} className="rounded-2xl border border-[#192625]/10 bg-white/70 p-5"><item.icon className="h-5 w-5 text-[#a76553]" /><h4 className="mt-4 font-serif text-xl font-semibold">{item.title}</h4><p className="mt-2 text-xs leading-6 text-[#66736b]">{item.body}</p></div>)}
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[28px] bg-[#192625] p-7 text-[#f7f3eb] sm:flex-row sm:items-center sm:p-9"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#d8b878]">Sıradaki marka sizin olabilir</p><h3 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Markanızın bütün parçalarını birlikte tasarlayalım.</h3></div><button type="button" onClick={onOpenContactModal} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#d8b878] px-6 py-3 text-sm font-bold text-[#192625] transition hover:bg-[#e8c995]">Benim markamı planla <ArrowRight className="h-4 w-4" /></button></div>
      <p className="mt-5 text-xs leading-6 text-[#6e796f]">VÜLİ, GuzelAI'nin yaratıcı süreç örneğidir. Marka, ambalajlar ve ürünler kurgusaldır; gerçek satış, klinik etki veya kampanya performansı iddiası içermez.</p>
    </div>
  </section>
);
