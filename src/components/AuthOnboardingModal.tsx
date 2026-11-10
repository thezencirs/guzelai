import React from "react";
import { ArrowRight, X } from "lucide-react";
import type { TranslationSchema } from "../i18n/translations";

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  role?: "brand" | "creator" | "developer";
  brandName?: string;
  credits: number;
  plan: string;
  isLoggedIn: boolean;
  joinDate?: string;
  createdModelsCount?: number;
  renderedClipsCount?: number;
}

interface AuthOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationSchema;
  currentUser?: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
  initialTab?: "guide" | "login" | "register";
  onOpenModelCreator?: () => void;
  onExploreClips?: () => void;
}

export const AuthOnboardingModal: React.FC<AuthOnboardingModalProps> = ({ isOpen, onClose, currentUser, onLogout, onOpenModelCreator }) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#192625]/75 p-4" onClick={onClose} role="presentation"><div role="dialog" aria-modal="true" aria-labelledby="customer-area-title" className="relative w-full max-w-lg rounded-[30px] bg-[#f7f3eb] p-8 text-[#192625] shadow-2xl sm:p-10" onClick={(event) => event.stopPropagation()}><button type="button" aria-label="Kapat" onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 hover:bg-[#192625]/10"><X className="h-5 w-5" /></button><p className="text-xs font-bold uppercase tracking-[.18em] text-[#a76553]">GuzelAI müşteri alanı</p><h2 id="customer-area-title" className="mt-4 font-serif text-4xl">Markanız için üretime başlayalım.</h2><p className="mt-5 text-sm leading-7 text-[#52615b]">E-posta ile gerçek hesap oluşturabilirsiniz. Dosya, abonelik ve teslim paneli hazırlanıyor; hesap açmak ücretli kredi veya abonelik başlatmaz. Aylık paketleri inceleyip kapsam teklifi isteyebilirsiniz.</p>{currentUser && <div className="mt-5 rounded-xl bg-amber-50 p-4 text-xs text-amber-900">Önceden kalan demo oturumu gerçek hesap değildir. <button type="button" onClick={onLogout} className="font-bold underline">Temizle</button></div>}<div className="mt-8 flex flex-wrap gap-3"><a href="/#auth" onClick={onClose} className="inline-flex items-center gap-2 rounded-full bg-[#192625] px-5 py-3 text-sm font-bold text-white">Hesap oluştur <ArrowRight className="h-4 w-4" /></a><a href="/#hizmet-paketleri" onClick={onClose} className="inline-flex items-center gap-2 rounded-full bg-[#192625] px-5 py-3 text-sm font-bold text-white">Paketleri incele <ArrowRight className="h-4 w-4" /></a>{onOpenModelCreator && <button type="button" onClick={() => { onClose(); onOpenModelCreator(); }} className="rounded-full border border-[#192625]/25 px-5 py-3 text-sm font-bold">Model demosunu gör</button>}</div></div></div>;
};
