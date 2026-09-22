import React, { useState } from "react";
import {
  ShieldCheck,
  FileCheck2,
  Download,
  Copy,
  Check,
  AlertCircle,
  Globe2,
  Sparkles,
  Building,
  Scale,
  Award,
} from "lucide-react";

interface LegalLicenseViewProps {
  onBackToStudio: () => void;
}

export const LegalLicenseView: React.FC<LegalLicenseViewProps> = ({
  onBackToStudio,
}) => {
  const [brandName, setBrandName] = useState<string>("GuzelAI Media Partner");
  const [licenseId] = useState<string>("GAI-CERT-2026-COMMERCIAL-99824");
  const [copied, setCopied] = useState<boolean>(false);

  const declarationText = `GÜZEL AI TİCARİ VE TELİFSİZ KULLANIM SERTİFİKASI
Belge No: ${licenseId}
Yetkili Marka: ${brandName}
Tarih: ${new Date().toLocaleDateString("tr-TR")}

1. SENTETİK MODEL GÜVENCESİ:
Bu platformda sunulan ve üretilen tüm mankenler, portreler ve vücut silüetleri %100 yapay zeka tarafından sentetik olarak üretilmiştir. Hiçbir gerçek yaşayan veya vefat etmiş şahsın biyometrik verisi veya portresi kullanılmamıştır.

2. MODEL RELEASE VE TELİF MUAFİYETİ:
Sentetik yapay zeka modelleri için model release sözleşmesi, şahsi hak talebi, ajans komisyonu veya telif hakkı ödemesi gerektirmez.

3. KÜRESEL TİCARİ KULLANIM HAKKI:
Üretilen tüm görseller, açılar ve video kurguları; e-ticaret (Amazon, Trendyol, Shopify), dijital reklamlar (Google Ads, Meta Ads, TikTok), basılı kataloglar ve billboard mecralarında sınırsız, süresiz ve küresel olarak kullanılabilir.

4. AMBİYANS VE ÇOKLU SEKTÖR GÜVENCESİ:
Moda, spor ayakkabı, kozmetik, lüks iç giyim ve mobilya sektörlerinde oluşturulan tüm arka plan ambiyansları jenerik sanatsal kurgulardır; hiçbir üçüncü taraf tescilli marka veya özel mülk hakkı ihlali içermez.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(declarationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([declarationText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${licenseId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="legal-license-view" className="flex-1 bg-neutral-950 text-white min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur sticky top-0 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">
              Telif ve Yasal Güvence Merkezi (Commercial Safe & Copyright-Free)
            </h1>
            <p className="text-xs text-neutral-400">
              100% Yapay Zeka Mankenler &mdash; Sıfır Model Release, Sıfır Telif Riski
            </p>
          </div>
        </div>

        <button
          onClick={onBackToStudio}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-md shadow-purple-900/30"
        >
          Photoshoot Studio'ya Dön
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* Core Guarantee Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-neutral-900 to-emerald-950/30 border border-emerald-800/80 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>%100 Hukuki Güvence Altında</span>
              </div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                Reklamlarınızda Telif ve Yasal Sorun Yaşamadan Özgürce Kullanın
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                guzelai platformundaki tüm mankenler sentetik yapay zeka algoritmasıyla sıfırdan üretilmiştir. Gerçek insan yüzü, tescilli şahıs kopyası veya mankenlik ajansı telif talebi söz konusu değildir.
              </p>
            </div>

            <div className="bg-neutral-900/90 border border-emerald-700/60 rounded-xl p-4 shrink-0 text-center space-y-1 shadow-xl">
              <div className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">Sertifika Kodu</div>
              <div className="font-mono text-sm font-bold text-white">{licenseId}</div>
              <div className="text-[11px] text-neutral-400">Global Ticari Lisans</div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Legal Protection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Scale className="w-4 h-4" />
              <span>1. Zero Model Release (Model Sözleşmesi Muafiyeti)</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Geleneksel manken çekimlerinde gereken "Model Release" sözleşmeleri yapay zeka modelleri için gerekmez. Yıllar sonra ortaya çıkabilecek tazminat veya kullanım hakkı iptali riski %0'dır.
            </p>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Globe2 className="w-4 h-4" />
              <span>2. Sınırsız & Küresel Ticari Yayın Hakkı</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Üretilen görsel ve videoları Meta (Instagram / Facebook), TikTok, Google Ads, Amazon, Trendyol, televizyon reklamları ve dev billboard panolarında süresiz yayınlayabilirsiniz.
            </p>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Building className="w-4 h-4" />
              <span>3. Çoklu Ambiyans & Sektör Serbestliği</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Paris balkonundan New York caddelerine, İskandinav minimalist mobilya loftundan ıslak atletizm pistlerine kadar tüm mekan kurguları telif korumalı mimari telif ihlali yapmayacak şekilde jenerik dizayn edilmiştir.
            </p>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>4. E-Ticaret & Pazar Yeri Onayı</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Amazon Brand Registry, Trendyol Katalog, Shopify ve Zara standartlarındaki beyaz stüdyo fonu ve 8K çözünürlük kurallarına tam uyumludur.
            </p>
          </div>
        </div>

        {/* Interactive Printable License Certificate Box */}
        <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Resmi Ticari Lisans Belgesi Özeti</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Markanız adına düzenlenmiş yasal sertifika metnini indirin veya kopyalayın.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Marka / Şirket Adınız"
                className="px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
                title="Metni Kopyala"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={handleDownload}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950 transition"
              >
                <Download className="w-4 h-4" />
                <span>Lisansı İndir</span>
              </button>
            </div>
          </div>

          <pre className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/80 text-xs text-neutral-300 font-mono whitespace-pre-wrap leading-relaxed">
            {declarationText}
          </pre>
        </div>
      </main>
    </div>
  );
};
