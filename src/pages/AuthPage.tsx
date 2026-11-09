import React from "react";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import type { TranslationSchema } from "../i18n/translations";
import type { UserProfile } from "../components/AuthOnboardingModal";

interface AuthPageProps {
  t: TranslationSchema;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  onNavigateClips: () => void;
  onNavigateModelCreator: () => void;
  onNavigateWebsites: () => void;
  onOpenFullStudio: (tab?: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigateHome, currentUser, onLogout }) => (
  <main className="min-h-screen bg-[#f7f3eb] px-4 py-24 text-[#192625]">
    <div className="mx-auto max-w-3xl">
      <button type="button" onClick={onNavigateHome} className="inline-flex items-center gap-2 text-sm font-bold"><ArrowLeft className="h-4 w-4" /> Ana sayfaya dön</button>
      <div className="mt-12 rounded-[32px] border border-[#192625]/10 bg-white p-8 shadow-xl sm:p-12">
        <ShieldCheck className="h-9 w-9 text-[#a76553]" />
        <p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-[#a76553]">GuzelAI müşteri alanı</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">Markanız için birlikte üretelim.</h1>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-[#52615b]">Müşteri hesabı, güvenli dosya yükleme, abonelik ve teslim paneli hazırlanıyor. Şu anda gerçek bir hesap veya kredi bakiyesi oluşturulmuyor. Aylık paketleri inceleyip markanız için yazılı teklif isteyebilirsiniz.</p>
        {currentUser && <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">Bu tarayıcıda daha önce oluşturulmuş bir demo oturumu var. Gerçek müşteri hesabı veya ücretli kredi değildir. <button type="button" onClick={onLogout} className="font-bold underline">Demo oturumunu temizle</button></div>}
        <a href="/#hizmet-paketleri" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#192625] px-6 py-3 text-sm font-bold text-white">Paketleri ve teklif formunu gör <ArrowRight className="h-4 w-4" /></a>
        <p className="mt-5 text-xs text-[#647169]">Doğrudan iletişim: <a className="underline" href="mailto:info@guzelai.com">info@guzelai.com</a></p>
      </div>
    </div>
  </main>
);

export default AuthPage;
