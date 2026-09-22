import React, { useState } from "react";
import {
  Sparkles,
  User,
  Building2,
  Gamepad2,
  Lock,
  Mail,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Film,
  Instagram,
  X,
  CreditCard,
  Gift,
  Check,
} from "lucide-react";
import { TranslationSchema } from "../i18n/translations";

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

export const AuthOnboardingModal: React.FC<AuthOnboardingModalProps> = ({
  isOpen,
  onClose,
  t,
  currentUser,
  onLoginSuccess,
  onLogout,
  initialTab = "guide",
  onOpenModelCreator,
  onExploreClips,
}) => {
  const [activeTab, setActiveTab] = useState<"guide" | "login" | "register">(initialTab);
  const [selectedRole, setSelectedRole] = useState<"brand" | "creator" | "developer">("brand");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccessMsg, setLoginSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleSimulatedSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const fakeUser: UserProfile = {
        name: provider === "Instagram" ? "@guzelai_creator" : "GuzelAI Partner",
        email: `partner@${provider.toLowerCase()}.com`,
        role: selectedRole,
        credits: 50,
        plan: "Pro Creator",
        isLoggedIn: true,
      };
      onLoginSuccess(fakeUser);
      setLoginSuccessMsg(`${provider} ile başarıyla bağlandınız! 50 hediye kredi tanımlandı.`);
      setTimeout(() => {
        setLoginSuccessMsg("");
        onClose();
      }, 1500);
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Lütfen geçerli bir e-posta adresi giriniz.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = {
        name: name || (selectedRole === "brand" ? companyName || "Lüks Marka" : "GuzelAI Yaratıcısı"),
        email: email,
        role: selectedRole,
        credits: 50,
        plan: selectedRole === "brand" ? "Enterprise Partner" : "Creator VIP",
        isLoggedIn: true,
      };
      onLoginSuccess(user);
      setLoginSuccessMsg("Giriş yapıldı! 50 Hediye Kredi hesabınıza yüklendi.");
      setTimeout(() => {
        setLoginSuccessMsg("");
        onClose();
      }, 1400);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#121620] border border-white/20 rounded-3xl p-5 sm:p-8 space-y-6 text-white shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition text-xs flex items-center justify-center"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Branding */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E65A7F]/15 border border-[#E65A7F]/30 text-xs font-mono font-bold text-[#E65A7F]">
            <Sparkles className="w-3.5 h-3.5 text-[#E65A7F]" />
            <span>GUZELAI AI MEDYA & INFLUENCER AĞI</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {currentUser?.isLoggedIn ? "Kullanıcı Hesabınız & Krediler" : "Nasıl Katılınır? Giriş & Kayıt"}
          </h2>
          <p className="text-xs sm:text-sm text-white/70">
            {currentUser?.isLoggedIn
              ? `Hoş geldiniz, ${currentUser.name}! Reklam projelerinizi ve 3D modellerinizi yönetin.`
              : "Markanız için AI manken kiralayın, 9:16 dikey klip siparişi verin veya kendi influencer'ınızı üretip oyunlara aktarın."}
          </p>
        </div>

        {/* If user is ALREADY LOGGED IN: Show Account Dashboard */}
        {currentUser?.isLoggedIn ? (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/15 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#E65A7F] to-[#44BDBD] flex items-center justify-center font-bold text-lg text-white">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{currentUser.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#44BDBD]/20 text-[#44BDBD] font-mono border border-[#44BDBD]/30">
                        {currentUser.plan}
                      </span>
                    </h3>
                    <p className="text-xs text-white/60 font-mono">{currentUser.email}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-white/50 block">Mevcut Kredi</span>
                  <span className="text-xl font-black text-amber-300 flex items-center gap-1 justify-end">
                    <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                    {currentUser.credits} Kredi
                  </span>
                </div>
              </div>

              {/* Roles Badge */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 block">Rol</span>
                  <span className="font-bold text-white capitalize">
                    {currentUser.role === "brand" ? "🏢 Marka / Ajans" : currentUser.role === "developer" ? "🎮 Oyun Geliştirici" : "✨ Influencer Üretici"}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 block">Ticari Lisans</span>
                  <span className="font-bold text-emerald-400">Aktif & Sınırsız</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 block">3D Metaverse API</span>
                  <span className="font-bold text-[#44BDBD]">Bağlı (v1)</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-[#E65A7F]/30"
              >
                Stüdyoda Çalışmaya Devam Et
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setActiveTab("login");
                }}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-rose-500/20 text-white hover:text-rose-400 font-bold text-xs transition border border-white/15"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        ) : (
          /* NOT LOGGED IN: TABS (REHBER / GİRİŞ YAP / KAYIT OL) */
          <div className="space-y-5">
            {/* Top Navigation Switcher */}
            <div className="grid grid-cols-3 p-1 rounded-2xl bg-black/50 border border-white/15 text-xs font-bold">
              <button
                onClick={() => setActiveTab("guide")}
                className={`py-2 sm:py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  activeTab === "guide"
                    ? "bg-white text-[#121620] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nasıl Çalışır?</span>
              </button>
              <button
                onClick={() => setActiveTab("login")}
                className={`py-2 sm:py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  activeTab === "login"
                    ? "bg-white text-[#121620] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Giriş Yap</span>
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`py-2 sm:py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  activeTab === "register"
                    ? "bg-[#E65A7F] text-white shadow-md shadow-[#E65A7F]/30"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Gift className="w-3.5 h-3.5 text-amber-300" />
                <span>Kayıt Ol (+50 Kredi)</span>
              </button>
            </div>

            {/* TAB 1: HOW IT WORKS / ONBOARDING GUIDE */}
            {activeTab === "guide" && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Step 1 */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 relative overflow-hidden">
                    <div className="w-7 h-7 rounded-xl bg-[#E65A7F]/20 text-[#E65A7F] font-black flex items-center justify-center border border-[#E65A7F]/30">
                      01
                    </div>
                    <h4 className="font-extrabold text-sm text-white">10 Saniyede Kaydol</h4>
                    <p className="text-white/70 leading-relaxed">
                      Google, Apple veya e-postanızla ücretsiz başlayın. Anında <strong>50 deneme kredisi</strong> kazanın.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 relative overflow-hidden">
                    <div className="w-7 h-7 rounded-xl bg-[#44BDBD]/20 text-[#44BDBD] font-black flex items-center justify-center border border-[#44BDBD]/30">
                      02
                    </div>
                    <h4 className="font-extrabold text-sm text-white">Model Seç veya Yarat</h4>
                    <p className="text-white/70 leading-relaxed">
                      Hazır AI modellerimizle 9:16 Reels klip çekin veya <strong>Model Üretim Yeri</strong>'nden sıfırdan influencer yaratın.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 relative overflow-hidden">
                    <div className="w-7 h-7 rounded-xl bg-amber-400/20 text-amber-300 font-black flex items-center justify-center border border-amber-400/30">
                      03
                    </div>
                    <h4 className="font-extrabold text-sm text-white">Metaverse & Reklama Aktar</h4>
                    <p className="text-white/70 leading-relaxed">
                      4K video reklamınızı anında indirin veya <strong>Unreal Engine / Unity / Roblox 3D GLB</strong> olarak oyununuza çekin!
                    </p>
                  </div>
                </div>

                {/* Who is it for? Role Selection preview */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="font-mono uppercase tracking-wider text-[#44BDBD] font-bold text-[11px]">
                    Siz Hangi Hedefle Katılıyorsunuz?
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/80">
                    <div
                      onClick={() => {
                        setSelectedRole("brand");
                        setActiveTab("register");
                      }}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition flex items-center gap-3"
                    >
                      <Building2 className="w-5 h-5 text-[#E65A7F] shrink-0" />
                      <div>
                        <div className="font-bold text-white text-xs">Marka & Ajanslar İçin</div>
                        <div className="text-[11px] text-white/60">Hazır mankenlerle 9:16 dikey reklam ve e-ticaret</div>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setSelectedRole("creator");
                        setActiveTab("register");
                      }}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition flex items-center gap-3"
                    >
                      <Gamepad2 className="w-5 h-5 text-[#44BDBD] shrink-0" />
                      <div>
                        <div className="font-bold text-white text-xs">Oyun & Metaverse Yapımcıları</div>
                        <div className="text-[11px] text-white/60">Sıfırdan influencer yaratıp 3D Rigged karakter çekme</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setActiveTab("register")}
                    className="flex-1 py-3.5 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white font-extrabold text-xs sm:text-sm transition shadow-lg shadow-[#E65A7F]/30 flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4 text-amber-300" />
                    <span>Ücretsiz Başla (+50 Hediye Kredi)</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("login")}
                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/15"
                  >
                    Giriş Yap
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2 & 3: FORM LOGIN OR REGISTER */}
            {(activeTab === "login" || activeTab === "register") && (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                {/* Role Switcher if registering */}
                {activeTab === "register" && (
                  <div className="space-y-1.5">
                    <label className="text-white/70 font-semibold block text-[11px]">
                      Hesap Türünüzü Seçin:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRole("brand")}
                        className={`p-2.5 rounded-xl border text-left transition flex flex-col gap-1 ${
                          selectedRole === "brand"
                            ? "bg-[#E65A7F]/20 border-[#E65A7F] text-white"
                            : "bg-black/30 border-white/10 text-white/60 hover:text-white"
                        }`}
                      >
                        <Building2 className="w-4 h-4 text-[#E65A7F]" />
                        <span className="font-bold text-xs">Marka & Ajans</span>
                        <span className="text-[10px] opacity-70">Model & Reklam</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedRole("creator")}
                        className={`p-2.5 rounded-xl border text-left transition flex flex-col gap-1 ${
                          selectedRole === "creator"
                            ? "bg-[#44BDBD]/20 border-[#44BDBD] text-white"
                            : "bg-black/30 border-white/10 text-white/60 hover:text-white"
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-[#44BDBD]" />
                        <span className="font-bold text-xs">Yaratıcı</span>
                        <span className="text-[10px] opacity-70">Influencer Üretici</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedRole("developer")}
                        className={`p-2.5 rounded-xl border text-left transition flex flex-col gap-1 ${
                          selectedRole === "developer"
                            ? "bg-amber-400/20 border-amber-400 text-white"
                            : "bg-black/30 border-white/10 text-white/60 hover:text-white"
                        }`}
                      >
                        <Gamepad2 className="w-4 h-4 text-amber-300" />
                        <span className="font-bold text-xs">Metaverse / Oyun</span>
                        <span className="text-[10px] opacity-70">3D Rigged Karakter</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Social Auth Quick Connect */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => handleSimulatedSocialLogin("Google")}
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition flex items-center justify-center gap-1.5 border border-white/10 text-[11px]"
                    >
                      <Globe className="w-3.5 h-3.5 text-rose-400" />
                      <span>Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSimulatedSocialLogin("Apple")}
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition flex items-center justify-center gap-1.5 border border-white/10 text-[11px]"
                    >
                      <span className="text-sm leading-none">&bull;</span>
                      <span>Apple ID</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSimulatedSocialLogin("Instagram")}
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition flex items-center justify-center gap-1.5 border border-white/10 text-[11px]"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#E65A7F]" />
                      <span>Instagram</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSimulatedSocialLogin("Metaverse")}
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition flex items-center justify-center gap-1.5 border border-white/10 text-[11px]"
                    >
                      <Gamepad2 className="w-3.5 h-3.5 text-[#44BDBD]" />
                      <span>Web3 / Oyun</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 my-3">
                    <div className="h-px bg-white/10 flex-1" />
                    <span className="text-[10px] font-mono text-white/40 uppercase">VEYA E-POSTA İLE</span>
                    <div className="h-px bg-white/10 flex-1" />
                  </div>
                </div>

                {/* Form Inputs */}
                {activeTab === "register" && (
                  <div className="space-y-1.5">
                    <label className="text-white/70 font-semibold block text-[11px]">
                      {selectedRole === "brand" ? "Yetkili Adı & Şirket Unvanı:" : "Adınız / Yaratıcı Takma Adı:"}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={selectedRole === "brand" ? "Örn: Burak Kaya (Atelier Monaco)" : "Örn: @alya_metaverse"}
                      className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#E65A7F]"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold block text-[11px]">E-Posta Adresi:</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3.5 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="adiniz@sirketiniz.com"
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#E65A7F]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/70 font-semibold block text-[11px]">Şifre:</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-white/40 absolute left-3 top-3.5 pointer-events-none" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#E65A7F]"
                    />
                  </div>
                </div>

                {loginSuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{loginSuccessMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white font-extrabold text-xs sm:text-sm transition shadow-lg shadow-[#E65A7F]/30 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Giriş Yapılıyor...</span>
                  ) : activeTab === "register" ? (
                    <>
                      <Gift className="w-4 h-4 text-amber-300" />
                      <span>Kaydol ve 50 Krediyi Al</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Giriş Yap</span>
                    </>
                  )}
                </button>

                <div className="text-center pt-1 text-[11px] text-white/50">
                  {activeTab === "login" ? (
                    <span>
                      Hesabınız yok mu?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("register")}
                        className="text-[#44BDBD] font-bold hover:underline"
                      >
                        Hemen Ücretsiz Kaydolun (+50 Kredi)
                      </button>
                    </span>
                  ) : (
                    <span>
                      Zaten hesabınız var mı?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("login")}
                        className="text-[#E65A7F] font-bold hover:underline"
                      >
                        Giriş Yapın
                      </button>
                    </span>
                  )}
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
