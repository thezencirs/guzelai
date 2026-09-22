import React, { useState } from "react";
import { TranslationSchema } from "../i18n/translations";
import { UserProfile } from "../components/AuthOnboardingModal";
import {
  ArrowLeft,
  User,
  Sparkles,
  Zap,
  Mail,
  Lock,
  CheckCircle2,
  Gift,
  Film,
  Globe,
  Camera,
  LogOut,
  CreditCard,
  Key,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

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

export const AuthPage: React.FC<AuthPageProps> = ({
  t,
  currentUser,
  onLoginSuccess,
  onLogout,
  onNavigateHome,
  onNavigateClips,
  onNavigateModelCreator,
  onNavigateWebsites,
  onOpenFullStudio,
}) => {
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [isSuccessNotification, setIsSuccessNotification] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: "user-" + Date.now(),
      name: name.trim() || (authMode === "register" ? "Yeni Marka Kurucusu" : "Demir Soylu"),
      email: email.trim() || "marka@guzelai.com",
      role: "brand",
      brandName: brandName.trim() || "Luxe Atelier",
      plan: "free",
      credits: authMode === "register" ? 90 : 40, // 40 base + 50 gift for new register
      createdModelsCount: 1,
      renderedClipsCount: 3,
      isLoggedIn: true,
      joinDate: "Eylül 2026",
    };

    onLoginSuccess(newUser);
    setIsSuccessNotification(true);
  };

  const handleQuickDemoLogin = () => {
    const demoUser: UserProfile = {
      id: "demo-creator",
      name: "Deniz Yılmaz",
      email: "deniz@studios.com",
      role: "creator",
      brandName: "Aura Creative",
      plan: "pro",
      credits: 90,
      createdModelsCount: 4,
      renderedClipsCount: 12,
      isLoggedIn: true,
      joinDate: "Eylül 2026",
    };
    onLoginSuccess(demoUser);
    setIsSuccessNotification(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#171717] transition-all">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#171717]/10 sticky top-20 z-30 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              id="auth-page-back-btn"
              className="px-3.5 py-1.5 rounded-full bg-[#171717]/5 hover:bg-[#171717]/10 text-xs font-bold text-[#171717] flex items-center gap-1.5 transition active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfa</span>
            </button>
            <div className="h-4 w-[1px] bg-[#171717]/20" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#171717]/50">Sayfa /</span>
              <h1 className="text-sm font-black text-[#171717] tracking-tight flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#E65A7F]" />
                <span>{currentUser?.isLoggedIn ? "Hesabım & Profil Portalı" : "Giriş Yap & Kayıt Ol"}</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!currentUser?.isLoggedIn ? (
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-400 text-black font-black animate-pulse">
                HEDİYE: +50 KREDİ
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full font-mono">
                  {currentUser.credits} Kredi Aktif
                </span>
                <button
                  onClick={onLogout}
                  className="px-3 py-1 rounded-full bg-[#171717]/10 hover:bg-rose-100 hover:text-rose-700 text-xs font-bold transition flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Çıkış</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 pb-24">
        {currentUser?.isLoggedIn ? (
          /* ================= LOGGED IN USER DASHBOARD ================= */
          <div className="space-y-8">
            {/* User Profile Header Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#171717]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#E65A7F] to-[#44BDBD] flex items-center justify-center text-2xl font-black text-white shadow-md">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-[#171717]">{currentUser.name}</h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#171717] text-white font-mono font-bold uppercase">
                      {currentUser.plan}
                    </span>
                  </div>
                  <div className="text-xs text-[#171717]/60 font-mono mt-0.5">
                    {currentUser.email} • {currentUser.brandName || "GuzelAI Marka"}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Üyelik Doğrulandı • Üyelik Tarihi: {currentUser.joinDate || "2026"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 px-5 text-center">
                  <div className="text-2xl font-black text-amber-900 font-mono">
                    {currentUser.credits}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-amber-700">Mevcut Kredi</div>
                </div>
                <button
                  onClick={() => onOpenFullStudio("templates")}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white text-xs font-black shadow-md hover:opacity-95 transition"
                >
                  Prodüksiyona Başla
                </button>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={onNavigateClips}
                className="p-5 rounded-2xl bg-white border border-[#171717]/10 hover:border-[#E65A7F] hover:shadow-md cursor-pointer transition group"
              >
                <div className="flex items-center justify-between">
                  <Film className="w-6 h-6 text-[#E65A7F]" />
                  <ChevronRight className="w-4 h-4 text-[#171717]/40 group-hover:translate-x-1 transition" />
                </div>
                <h3 className="font-bold text-[#171717] mt-3 group-hover:text-[#E65A7F] transition">
                  9:16 Klipler Sayfası
                </h3>
                <p className="text-xs text-[#171717]/60 mt-1">
                  Oluşturulan veya taslağa alınan Reels & TikTok video reklamlarınızı yönetin.
                </p>
              </div>

              <div
                onClick={onNavigateModelCreator}
                className="p-5 rounded-2xl bg-white border border-[#171717]/10 hover:border-[#44BDBD] hover:shadow-md cursor-pointer transition group"
              >
                <div className="flex items-center justify-between">
                  <Sparkles className="w-6 h-6 text-[#44BDBD]" />
                  <ChevronRight className="w-4 h-4 text-[#171717]/40 group-hover:translate-x-1 transition" />
                </div>
                <h3 className="font-bold text-[#171717] mt-3 group-hover:text-[#44BDBD] transition">
                  Model Üretim Yeri
                </h3>
                <p className="text-xs text-[#171717]/60 mt-1">
                  Yeni bir marka mankeni yaratın veya Unreal Engine 5 rig dosyasını indirin.
                </p>
              </div>

              <div
                onClick={onNavigateWebsites}
                className="p-5 rounded-2xl bg-white border border-[#171717]/10 hover:border-[#FB5D2E] hover:shadow-md cursor-pointer transition group"
              >
                <div className="flex items-center justify-between">
                  <Globe className="w-6 h-6 text-[#FB5D2E]" />
                  <ChevronRight className="w-4 h-4 text-[#171717]/40 group-hover:translate-x-1 transition" />
                </div>
                <h3 className="font-bold text-[#171717] mt-3 group-hover:text-[#FB5D2E] transition">
                  Sinematik Web Siteleri
                </h3>
                <p className="text-xs text-[#171717]/60 mt-1">
                  Markanıza özel 3D WebGL mimarisi ve interaktif deneyim siparişi verin.
                </p>
              </div>
            </div>

            {/* Account Stats & API Keys */}
            <div className="p-6 rounded-3xl bg-white border border-[#171717]/10 shadow-xs space-y-4">
              <h3 className="text-base font-black text-[#171717] flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-500" />
                <span>Geliştirici & Metaverse API Erişimi</span>
              </h3>
              <p className="text-xs text-[#171717]/70">
                Oyun motorları (Unreal Engine / Unity) ve özel e-ticaret altyapınız için REST API anahtarınız:
              </p>
              <div className="flex items-center gap-2 bg-[#FAF8F5] p-3 rounded-xl border border-[#171717]/10 font-mono text-xs">
                <span className="text-[#171717]/50 select-none">KEY:</span>
                <span className="font-bold text-[#171717] truncate flex-1">
                  gzl_live_99x82fa7b810d729e924c519283
                </span>
                <button
                  onClick={() => alert("API anahtarı panoya kopyalandı!")}
                  className="px-3 py-1 bg-white hover:bg-neutral-100 rounded-lg border border-[#171717]/10 text-[11px] font-bold"
                >
                  Kopyala
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================= GUEST / AUTH FORM ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Onboarding Perks */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E65A7F]/10 border border-[#E65A7F]/20 text-[#E65A7F] text-xs font-black">
                <Gift className="w-3.5 h-3.5 text-amber-500" />
                <span>Yeni Üyelere Özel +50 Kredi</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#171717] tracking-tight">
                AI Destekli Medya Çağına Giriş Yapın
              </h2>
              <p className="text-sm text-[#171717]/70 leading-relaxed font-medium">
                GuzelAI Medya'ya katılarak kendi sanal mankenlerinizi üretin,
                viral 9:16 video klipler çekin ve ödüllü 3D web siteleri tasarlayın.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Kayıt olduğunuz anda +50 Ücretsiz Fotoğraf & Video Kredisi",
                  "Yapay Zeka Manken Üreticisi ve Unreal Engine 5 Karakter İndirme",
                  "9:16 Dikey Klip Kurgulama ve Instant Ad Film Generator",
                  "Markanıza özel sınırsız moodboard ve prova odası",
                ].map((perk, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs font-semibold text-[#171717]/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Quick Demo Login Shortcut */}
              <div className="pt-4">
                <button
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 px-4 rounded-2xl bg-[#171717]/5 hover:bg-[#171717]/10 text-xs font-bold text-[#171717] flex items-center justify-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Tek Tıkla Demo Hesabı ile Giriş Yap (Hemen Dene)</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Login / Register Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#171717]/10 shadow-xl space-y-6">
                {/* Switch Tabs */}
                <div className="grid grid-cols-2 p-1 bg-[#FAF8F5] rounded-2xl border border-[#171717]/10">
                  <button
                    onClick={() => setAuthMode("register")}
                    className={`py-2 rounded-xl text-xs font-black transition ${
                      authMode === "register"
                        ? "bg-[#171717] text-white shadow-xs"
                        : "text-[#171717]/60 hover:text-[#171717]"
                    }`}
                  >
                    Ücretsiz Kayıt Ol (+50 Kredi)
                  </button>
                  <button
                    onClick={() => setAuthMode("login")}
                    className={`py-2 rounded-xl text-xs font-black transition ${
                      authMode === "login"
                        ? "bg-[#171717] text-white shadow-xs"
                        : "text-[#171717]/60 hover:text-[#171717]"
                    }`}
                  >
                    Giriş Yap
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {authMode === "register" && (
                    <div>
                      <label className="block text-xs font-bold text-[#171717]/80 mb-1">
                        Adınız Soyadınız
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Örn: Ela Demir"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#171717]/15 text-xs text-[#171717] focus:outline-hidden focus:border-[#E65A7F]"
                      />
                    </div>
                  )}

                  {authMode === "register" && (
                    <div>
                      <label className="block text-xs font-bold text-[#171717]/80 mb-1">
                        Marka veya Ajans Adı (Opsiyonel)
                      </label>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="Örn: Atelier Riviera"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#171717]/15 text-xs text-[#171717] focus:outline-hidden focus:border-[#E65A7F]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#171717]/80 mb-1">
                      E-posta Adresi
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#171717]/40 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marka@sirketiniz.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#171717]/15 text-xs text-[#171717] focus:outline-hidden focus:border-[#E65A7F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#171717]/80 mb-1">
                      Şifre
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#171717]/40 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#171717]/15 text-xs text-[#171717] focus:outline-hidden focus:border-[#E65A7F]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white text-xs font-black shadow-lg hover:opacity-95 transition"
                  >
                    {authMode === "register"
                      ? "Kaydı Tamamla & +50 Krediyi Al"
                      : "Giriş Yap"}
                  </button>
                </form>

                <div className="text-center text-[11px] text-[#171717]/50">
                  Giriş yaparak GuzelAI Kullanım Şartları ve Gizlilik Politikasını kabul etmiş olursunuz.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

