import React, { useState } from "react";
import { TranslationSchema } from "../i18n/translations";
import { X, CheckCircle2, Send, Sparkles } from "lucide-react";

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationSchema;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  t,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(["Yapay Zeka"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("$5,000 - $15,000");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copyError, setCopyError] = useState(false);

  if (!isOpen) return null;

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== svc));
      }
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const brief = `GuzelAI proje özeti\nAd: ${name}\nE-posta: ${email}\nHizmetler: ${selectedServices.join(", ")}\nBütçe: ${budget}\nMesaj: ${message}`;
    const subject = `GuzelAI proje talebi: ${selectedServices.join(", ")}`;
    const mailto = `mailto:info@guzelai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;
    setCopyError(false);
    setSubmitted(true);
    window.location.href = mailto;
  };

  const copyBrief = async () => {
    const brief = `GuzelAI proje özeti\nAd: ${name}\nE-posta: ${email}\nHizmetler: ${selectedServices.join(", ")}\nBütçe: ${budget}\nMesaj: ${message}`;
    try {
      await navigator.clipboard.writeText(brief);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  const servicesList = [
    { id: "ai", label: "Yapay Zeka / AI Modeller", color: "#44BDBD" },
    { id: "content", label: "İçerik & Viral Video", color: "#E65A7F" },
    { id: "design", label: "Tasarım & 3D Kimlik", color: "#B8A1CF" },
    { id: "media", label: "Dijital Medya & Büyüme", color: "#FB5D2E" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#171717]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={resetAndClose}
    >
      <div
        className="bg-[#FAF8F5] rounded-3xl max-w-xl w-full p-6 sm:p-10 shadow-2xl border border-[#171717]/10 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white border border-[#171717]/10 text-[#171717] flex items-center justify-center hover:bg-[#171717] hover:text-white transition"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#41631E]/15 text-[#41631E] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#171717]">
              E-posta taslağınız hazır
            </h3>
            <p className="text-sm text-[#171717]/75 max-w-md mx-auto leading-relaxed">
              E-posta uygulamanızda gönder düğmesine basın. Uygulama açılmadıysa özeti kopyalayıp info@guzelai.com adresine kendiniz gönderebilirsiniz.
            </p>
            <div className="pt-4">
              <button onClick={copyBrief} className="mr-3 px-6 py-3 rounded-full border border-[#171717]/20 text-xs font-bold hover:bg-white">
                Özeti kopyala
              </button>
              <button
                onClick={resetAndClose}
                className="px-6 py-3 rounded-full bg-[#171717] text-white text-xs font-bold hover:bg-[#262626] transition"
              >
                {t.contactModal.closeBtn}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#E65A7F]">
                GUZELAI MEDYA &bull; BRIEF
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                Proje özeti hazırlayın
              </h3>
              <p className="text-xs sm:text-sm text-[#171717]/70 leading-relaxed">
                Projenizi kısaca anlatın. Gönder düğmesi e-posta uygulamanızda info@guzelai.com adresine hazır bir taslak açar.
              </p>
            </div>

            {/* Service Tags */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#171717]">
                {t.contactModal.serviceLabel}
              </label>
              <div className="flex flex-wrap gap-2">
                {servicesList.map((svc) => {
                  const isSelected = selectedServices.includes(svc.label);
                  return (
                    <button
                      type="button"
                      key={svc.id}
                      onClick={() => toggleService(svc.label)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
                        isSelected
                          ? "bg-[#171717] text-white border-[#171717] shadow-xs"
                          : "bg-white text-[#171717]/70 border-[#171717]/10 hover:border-[#171717]/30"
                      }`}
                    >
                      {svc.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name & Email inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#171717]">
                  {t.contactModal.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.contactModal.namePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#171717]/10 text-xs sm:text-sm text-[#171717] focus:outline-hidden focus:border-[#E65A7F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#171717]">
                  {t.contactModal.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.contactModal.emailPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#171717]/10 text-xs sm:text-sm text-[#171717] focus:outline-hidden focus:border-[#E65A7F]"
                />
              </div>
            </div>

            {/* Budget options */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#171717]">
                {t.contactModal.budgetLabel}
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {["$2.5k - $5k", "$5k - $15k", "$15k+"].map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`py-2 px-3 rounded-xl font-bold transition border ${
                      budget === b
                        ? "bg-[#E65A7F] border-[#E65A7F] text-white shadow-xs"
                        : "bg-white border-[#171717]/10 text-[#171717]/70 hover:bg-black/5"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#171717]">
                {t.contactModal.messageLabel}
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.contactModal.messagePlaceholder}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#171717]/10 text-xs sm:text-sm text-[#171717] focus:outline-hidden focus:border-[#E65A7F]"
              />
            </div>

            {copyError && <p role="alert" className="text-sm text-red-700">Kopyalama başarısız oldu. Tarayıcınızın pano iznini kontrol edip yeniden deneyin.</p>}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white text-xs sm:text-sm font-bold tracking-tight transition shadow-md shadow-[#E65A7F]/30 flex items-center justify-center gap-2"
            >
              <span>E-posta taslağı oluştur</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
