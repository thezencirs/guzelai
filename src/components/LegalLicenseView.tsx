import React from "react";
import { ArrowLeft, ExternalLink, FileCheck2, ShieldCheck } from "lucide-react";

interface LegalLicenseViewProps {
  onBackToStudio: () => void;
}

const checks = [
  { title: "Üretim aracının koşulları", detail: "Kullanılan görsel, video, ses ve model hizmetlerinin güncel ticari kullanım şartlarını her çıktı için kaydedin." },
  { title: "Girdi ve referansların hakları", detail: "Yüklenen fotoğraf, logo, müzik, stok görsel ve ürün çekimlerinin izin kapsamını doğrulayın." },
  { title: "Kişi ve marka benzerliği", detail: "Gerçek bir kişiye benzeyen yüz veya ses ve üçüncü taraf marka öğeleri için gerekli izinleri alın." },
  { title: "Yayın öncesi insan kontrolü", detail: "Her çıktıyı ürün doğruluğu, yanıltıcı iddialar, yaşa uygunluk ve kullanılacağı mecra açısından inceleyin." },
];

export const LegalLicenseView: React.FC<LegalLicenseViewProps> = ({ onBackToStudio }) => (
  <div id="legal-license-view" className="min-h-screen bg-neutral-950 text-white">
    <header className="border-b border-neutral-800 bg-neutral-900 px-6 py-5">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-emerald-400" />
          <div>
            <h1 className="text-lg font-bold">Ticari kullanım ve hak kontrolü</h1>
            <p className="text-sm text-neutral-400">Her proje için yayın öncesi kontrol listesi</p>
          </div>
        </div>
        <button onClick={onBackToStudio} className="flex items-center gap-2 rounded-xl bg-neutral-800 px-4 py-2 text-sm font-semibold hover:bg-neutral-700">
          <ArrowLeft className="h-4 w-4" /> Stüdyoya dön
        </button>
      </div>
    </header>
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-10">
      <div className="rounded-2xl border border-emerald-800 bg-emerald-950/30 p-6">
        <h2 className="text-xl font-bold">Kullanım hakkını proje bazında doğrulayın</h2>
        <p className="mt-3 leading-relaxed text-neutral-300">
          Yapay zekâ ile üretilmiş olması tek başına telifsiz veya sınırsız ticari kullanım hakkı vermez. Bu sayfa lisans belgesi değildir; hak sahipliği ve izinler kullanılan hizmete ve kaynaklara göre değerlendirilmelidir.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {checks.map((check) => (
          <section key={check.title} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
            <FileCheck2 className="mb-3 h-5 w-5 text-emerald-400" />
            <h3 className="font-semibold">{check.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">{check.detail}</p>
          </section>
        ))}
      </div>
      <a href="/gizlilik-politikasi/" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:underline">
        Gizlilik ve çerez politikası <ExternalLink className="h-4 w-4" />
      </a>
    </main>
  </div>
);
