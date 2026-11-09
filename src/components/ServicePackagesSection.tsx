import React, { useState } from "react";

const plans = [
  { name: "Başlangıç", tag: "Düzenli görünürlük", audience: "Tek marka, tek ana kanal", items: ["Aylık içerik planı ve marka tonu", "8 statik sosyal medya görseli", "4 kısa video taslağı / kurgu", "1 ürün veya hizmet kampanyası", "1 revizyon turu / teslim"], note: "Yayınlama ve reklam bütçesi ayrı planlanır." },
  { name: "Büyüme", tag: "Çok kanallı üretim", audience: "Sosyal medya + ürün vitrini", items: ["Aylık strateji ve performans görüşmesi", "12 statik görsel + 8 kısa video", "2 ürün çekimi konsepti / ay", "Web açılış sayfası içerik güncellemesi", "2 revizyon turu / teslim"], note: "Ürün gönderimi, çekim ve entegrasyon kapsamı teklifte netleşir." },
  { name: "Marka Stüdyosu", tag: "Uçtan uca marka ekibi", audience: "Kampanya, web ve içerik birlikte", items: ["Marka kılavuzu ve tutarlı model dosyası", "16 statik görsel + 12 kısa video", "Aylık kampanya ve ürün vitrini seti", "Web sitesi içerik ve tasarım desteği", "Öncelikli planlama + 2 revizyon turu"], note: "Yeni site geliştirme ve reklam harcaması ayrıca fiyatlanır." },
] as const;
const extras = ["E-ticaret ürün görselleri", "Web sitesi tasarımı / yenileme", "Reklam kreatifleri", "Influencer / AI marka yüzü", "SEO içerikleri", "E-posta kampanyası", "Basın ve sunum kiti", "Çok dilli içerik"];

export const ServicePackagesSection: React.FC = () => {
  const [plan, setPlan] = useState<string>(plans[1].name);
  const [selected, setSelected] = useState<string[]>([]);
  const [brand, setBrand] = useState("");
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [goal, setGoal] = useState("");
  const [companyFax, setCompanyFax] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState("");
  const toggle = (value: string) => setSelected((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  const subject = encodeURIComponent(`GuzelAI aylık iş ortaklığı: ${plan}`);
  const body = encodeURIComponent(`Merhaba GuzelAI,\n\nAylık paket: ${plan}\nMarka: ${brand || "(doldurulmadı)"}\nE-posta: ${email || "(doldurulmadı)"}\nWeb / sosyal hesap: ${site || "(doldurulmadı)"}\nHedef: ${goal || "(doldurulmadı)"}\nEk işler: ${selected.join(", ") || "Yok"}\n\nLütfen kapsam, teslim takvimi ve aylık fiyat teklifini paylaşın.`);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    setResult("");
    try {
      const response = await fetch("/api/inquiries/create", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ brand, email, website: site, goal, plan, extras: selected, companyFax }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Başvuru kaydedilemedi.");
      setResult(`Başvurunuz kaydedildi. Takip numarası: ${data.id}`);
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Başvuru kaydedilemedi.");
    } finally { setSending(false); }
  };
  return <section id="hizmet-paketleri" className="bg-[#f3f0ea] py-20 text-[#171717]">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a72c55]">GuzelAI abonelik modeli</p>
      <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold sm:text-5xl">Markanızın yaratıcı ekibi, her ay yanınızda.</h2>
      <p className="mt-5 max-w-3xl text-sm leading-7 text-[#171717]/70">Sosyal medya, video, ürün görselleri ve web içeriğini tek bir marka çizgisinde üretelim. Paketi ve ek işleri seçin; kapsamı ve aylık fiyatı yazılı teklif ile kesinleştirelim.</p>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">{plans.map((item) => <article key={item.name} className={`flex flex-col rounded-[28px] border p-6 sm:p-7 ${plan === item.name ? "border-[#a72c55] bg-white shadow-xl" : "border-[#171717]/10 bg-white/70"}`}><span className="text-xs font-bold uppercase tracking-[.18em] text-[#a72c55]">{item.tag}</span><h3 className="mt-4 font-serif text-3xl font-semibold">{item.name}</h3><p className="mt-2 text-sm text-[#171717]/60">{item.audience}</p><ul className="mt-7 flex-1 space-y-3 text-sm leading-6">{item.items.map((detail) => <li key={detail} className="flex gap-2"><span aria-hidden="true" className="text-[#a72c55]">✓</span><span>{detail}</span></li>)}</ul><p className="mt-6 border-t border-[#171717]/10 pt-4 text-xs leading-5 text-[#171717]/60">{item.note}</p><button type="button" onClick={() => { setPlan(item.name); document.getElementById("abonelik-brief")?.scrollIntoView({ behavior: "smooth", block: "center" }); }} className="mt-6 rounded-full bg-[#171717] px-5 py-3 text-sm font-bold text-white hover:bg-[#a72c55]">{plan === item.name ? "Seçili paket" : "Bu paketi seç"}</button></article>)}</div>
      <div id="abonelik-brief" className="mt-12 scroll-mt-24 rounded-[30px] bg-[#192625] p-6 text-white sm:p-9"><div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#d8b878]">İşinizi bize anlatın</p><h3 className="mt-4 font-serif text-3xl sm:text-4xl">Sizin için doğru kapsamı kuralım.</h3><p className="mt-5 text-sm leading-7 text-white/70">Seçili paket: <strong className="text-white">{plan}</strong>. Başvurunuz güvenli biçimde kaydedilir; ödeme veya abonelik başlatmaz. Dosya yükleme ve proje paneli hesap altyapısı tamamlandığında açılacaktır.</p></div><form onSubmit={submit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold">Marka adı<input required maxLength={100} value={brand} onChange={(event) => setBrand(event.target.value)} placeholder="Markanız" className="mt-2 w-full rounded-xl border border-white/20 bg-white p-3 text-sm text-[#192625]" /></label><label className="text-xs font-bold">E-posta<input required type="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ad@marka.com" className="mt-2 w-full rounded-xl border border-white/20 bg-white p-3 text-sm text-[#192625]" /></label></div><label className="block text-xs font-bold">Web veya sosyal hesap<input value={site} maxLength={300} onChange={(event) => setSite(event.target.value)} placeholder="https://..." className="mt-2 w-full rounded-xl border border-white/20 bg-white p-3 text-sm text-[#192625]" /></label><label className="block text-xs font-bold">Öncelikli hedef<textarea required minLength={12} maxLength={3000} value={goal} onChange={(event) => setGoal(event.target.value)} rows={3} placeholder="Satış, lansman, marka görünürlüğü..." className="mt-2 w-full rounded-xl border border-white/20 bg-white p-3 text-sm text-[#192625]" /></label><input tabIndex={-1} autoComplete="off" aria-hidden="true" value={companyFax} onChange={(event) => setCompanyFax(event.target.value)} className="absolute -left-[9999px] h-px w-px opacity-0" /><div><p className="mb-3 text-xs font-bold">Ek işler</p><div className="flex flex-wrap gap-2">{extras.map((extra) => <button type="button" key={extra} onClick={() => toggle(extra)} aria-pressed={selected.includes(extra)} className={`rounded-full border px-3 py-2 text-xs transition ${selected.includes(extra) ? "border-[#d8b878] bg-[#d8b878] text-[#192625]" : "border-white/25 text-white hover:border-white"}`}>{extra}</button>)}</div></div><button type="submit" disabled={sending} className="inline-flex rounded-full bg-[#d8b878] px-6 py-3 text-sm font-bold text-[#192625] hover:bg-[#e8c995] disabled:opacity-50">{sending ? "Kaydediliyor..." : "Teklif başvurusunu gönder"}</button><p role="status" className="text-xs text-white/80">{result}</p><p className="text-xs text-white/60">Form çalışmazsa <a className="underline" href={`mailto:info@guzelai.com?subject=${subject}&body=${body}`}>e-posta ile gönderin</a>.</p></form></div></div>
    </div>
  </section>;
};
