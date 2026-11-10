import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import type { TranslationSchema } from "../i18n/translations";
import type { UserProfile } from "../components/AuthOnboardingModal";
import { authClient } from "../auth";

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

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigateHome, currentUser, onLoginSuccess, onLogout }) => {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!authClient) return;
    setBusy(true);
    setMessage("");
    try {
      const result = mode === "sign-up" ? await authClient.signUp.email({ name: name.trim(), email: email.trim(), password }) : await authClient.signIn.email({ email: email.trim(), password });
      if (result.error) throw new Error(result.error.message || "Giriş yapılamadı.");
      const session = await authClient.getSession();
      if (!session.data?.user) { setMessage("Hesabınız oluşturuldu. E-posta doğrulaması gerekiyorsa gelen kutunuzu kontrol edin."); return; }
      const user = session.data.user;
      onLoginSuccess({ id: user.id, name: user.name || user.email, email: user.email, role: "brand", plan: "free", credits: 0, isLoggedIn: true });
      setPassword("");
      setMessage("Giriş başarılı. Abonelik ve dosya paneli hazırlanıyor; ücretli kredi tanımlanmadı.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Giriş yapılamadı."); }
    finally { setBusy(false); }
  };
  const signOut = async () => { await authClient?.signOut(); onLogout(); setMessage("Çıkış yapıldı."); };
  return <main className="min-h-screen bg-[#f7f3eb] px-4 py-24 text-[#192625]"><div className="mx-auto max-w-3xl"><button type="button" onClick={onNavigateHome} className="inline-flex items-center gap-2 text-sm font-bold"><ArrowLeft className="h-4 w-4" /> Ana sayfaya dön</button><div className="mt-12 rounded-[32px] border border-[#192625]/10 bg-white p-8 shadow-xl sm:p-12"><ShieldCheck className="h-9 w-9 text-[#a76553]" /><p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-[#a76553]">GuzelAI müşteri alanı</p><h1 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">Markanız için birlikte üretelim.</h1>{currentUser ? <div className="mt-7 space-y-4"><p className="text-sm text-[#52615b]">Oturum: <strong>{currentUser.email}</strong>. Başvurularınız, dosyalarınız ve abonelik durumunuz bu alana eklenecek.</p><button type="button" onClick={signOut} className="rounded-full border border-[#192625]/25 px-5 py-3 text-sm font-bold">Çıkış yap</button></div> : authClient ? <div className="mt-8"><div className="flex gap-2"><button type="button" onClick={() => setMode("sign-in")} className={`rounded-full px-5 py-2 text-sm font-bold ${mode === "sign-in" ? "bg-[#192625] text-white" : "border border-[#192625]/20"}`}>Giriş yap</button><button type="button" onClick={() => setMode("sign-up")} className={`rounded-full px-5 py-2 text-sm font-bold ${mode === "sign-up" ? "bg-[#192625] text-white" : "border border-[#192625]/20"}`}>Hesap oluştur</button></div><form onSubmit={submit} className="mt-6 space-y-4">{mode === "sign-up" && <label className="block text-sm font-bold">Adınız<input required minLength={2} maxLength={100} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-[#192625]/20 p-3" /></label>}<label className="block text-sm font-bold">E-posta<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#192625]/20 p-3" /></label><label className="block text-sm font-bold">Şifre<input required minLength={8} type="password" autoComplete={mode === "sign-up" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#192625]/20 p-3" /></label><button disabled={busy} type="submit" className="rounded-full bg-[#192625] px-6 py-3 text-sm font-bold text-white disabled:opacity-50">{busy ? "İşleniyor..." : mode === "sign-up" ? "Hesap oluştur" : "Giriş yap"}</button></form></div> : <p className="mt-7 text-sm text-[#52615b]">Hesap servisi şu anda yapılandırılıyor. Paketler için teklif başvurusu gönderebilirsiniz.</p>}<p role="status" className="mt-5 text-sm text-[#a76553]">{message}</p><p className="mt-7 text-sm leading-7 text-[#52615b]">Hesap açmak ödeme veya abonelik başlatmaz. Üretim kredileri, proje dosyaları ve teslim paneli henüz etkin değil.</p><a href="/#hizmet-paketleri" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d8b878] px-6 py-3 text-sm font-bold">Paketleri ve teklif formunu gör <ArrowRight className="h-4 w-4" /></a></div></div></main>;
};

export default AuthPage;
