import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  KeyRound,
  Loader2,
  ShieldCheck,
  Sparkles,
  Video,
  Image as ImageIcon,
  Brain,
  AlertCircle,
} from "lucide-react";

type Mode = "platform" | "byok";

interface Capability {
  ready: boolean;
  model: string;
  note?: string;
}

interface TestResult {
  ok?: boolean;
  mode?: Mode;
  source?: string;
  capabilities?: {
    text: Capability;
    image: Capability;
    video: Capability;
  };
  error?: string;
}

export const AIConnectionPanel: React.FC<{ credits?: number }> = ({ credits = 0 }) => {
  const [mode, setMode] = useState<Mode>("platform");
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState<any>(null);
  const [test, setTest] = useState<TestResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const loadStatus = async () => {
    try {
      const r = await fetch("/api/settings/ai-key");
      const data = await r.json();
      setStatus(data);
      setMode(data.mode === "byok" ? "byok" : "platform");
    } catch {}
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const saveMode = async () => {
    setBusy(true);
    setMessage("");
    setTest(null);
    try {
      const r = await fetch("/api/settings/ai-key", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode, apiKey: mode === "byok" ? apiKey : undefined }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Bağlantı kaydedilemedi.");
      setMessage(
        mode === "byok"
          ? "Kendi Gemini API bağlantınız güvenli oturum çerezine kaydedildi."
          : "GüzelAI platform kredisi modu etkinleştirildi."
      );
      setApiKey("");
      await loadStatus();
    } catch (e: any) {
      setMessage(e?.message || "Bağlantı kaydedilemedi.");
    } finally {
      setBusy(false);
    }
  };

  const testConnection = async () => {
    setBusy(true);
    setMessage("");
    try {
      const r = await fetch("/api/settings/test-ai", { method: "POST" });
      const data = await r.json();
      setTest(data);
      if (!r.ok) throw new Error(data.error || "Test başarısız.");
      setMessage("Google AI bağlantısı test edildi.");
    } catch (e: any) {
      setMessage(e?.message || "Test başarısız.");
    } finally {
      setBusy(false);
    }
  };

  const capabilityItems = test?.capabilities
    ? [
        { key: "text", label: "Kreatif Direktör", icon: Brain, data: test.capabilities.text },
        { key: "image", label: "Model / Görsel", icon: ImageIcon, data: test.capabilities.image },
        { key: "video", label: "Veo Clips", icon: Video, data: test.capabilities.video },
      ]
    : [];

  return (
    <div className="p-6 rounded-3xl bg-white border border-[#171717]/10 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E65A7F]" />
            <h3 className="text-lg font-black text-[#171717]">AI Bağlantısı & Üretim Modu</h3>
          </div>
          <p className="text-xs text-[#171717]/60 mt-1">
            GüzelAI kredilerini kullanın veya kendi Gemini API projenizi bağlayın.
          </p>
        </div>
        <div className="px-3 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-center">
          <div className="text-lg font-black text-amber-900">{credits}</div>
          <div className="text-[9px] font-bold text-amber-700 uppercase">GüzelAI Kredisi</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setMode("platform")}
          className={`p-4 rounded-2xl border text-left transition ${
            mode === "platform"
              ? "border-[#E65A7F] bg-[#E65A7F]/5 ring-2 ring-[#E65A7F]/10"
              : "border-[#171717]/10 bg-[#FAF8F5]"
          }`}
        >
          <div className="flex items-center gap-2 font-black text-sm">
            <Sparkles className="w-4 h-4 text-[#E65A7F]" />
            GüzelAI Kredileri
          </div>
          <p className="text-[11px] text-[#171717]/60 mt-1.5">
            API anahtarıyla uğraşmadan platform bakiyeniz kadar üretin.
          </p>
          <div className="text-[10px] mt-2 font-bold text-emerald-700">
            {status?.platformConfigured ? "Platform AI hazır" : "Platform anahtarı henüz yapılandırılmadı"}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMode("byok")}
          className={`p-4 rounded-2xl border text-left transition ${
            mode === "byok"
              ? "border-[#44BDBD] bg-[#44BDBD]/5 ring-2 ring-[#44BDBD]/10"
              : "border-[#171717]/10 bg-[#FAF8F5]"
          }`}
        >
          <div className="flex items-center gap-2 font-black text-sm">
            <KeyRound className="w-4 h-4 text-[#44BDBD]" />
            Kendi Gemini API'm
          </div>
          <p className="text-[11px] text-[#171717]/60 mt-1.5">
            Kullanım Google Cloud projenizin kendi kota ve faturalandırmasına gider.
          </p>
          <div className="text-[10px] mt-2 font-bold text-[#287c7c]">
            {status?.personalKeyConnected ? "Kişisel API bağlantısı mevcut" : "İsteğe bağlı"}
          </div>
        </button>
      </div>

      {mode === "byok" && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#171717]">Gemini API / Authorization Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={status?.personalKeyConnected ? "Yeni anahtarla değiştirmek için girin" : "AIza... veya auth key"}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#171717]/15 text-xs font-mono focus:outline-none focus:border-[#44BDBD]"
          />
          <p className="text-[10px] text-[#171717]/50 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Anahtar JavaScript localStorage'a yazılmaz; sunucuda şifrelenmiş HttpOnly çerez olarak tutulur.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy || (mode === "byok" && !apiKey && !status?.personalKeyConnected)}
          onClick={saveMode}
          className="px-4 py-2.5 rounded-xl bg-[#171717] text-white text-xs font-black disabled:opacity-40 flex items-center gap-2"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          Modu Kaydet
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={testConnection}
          className="px-4 py-2.5 rounded-xl bg-[#44BDBD]/10 border border-[#44BDBD]/30 text-[#206f6f] text-xs font-black disabled:opacity-40"
        >
          Text + Image + Veo Erişimini Test Et
        </button>
      </div>

      {message && (
        <div className="text-xs p-3 rounded-xl bg-[#FAF8F5] border border-[#171717]/10 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
          <span>{message}</span>
        </div>
      )}

      {capabilityItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {capabilityItems.map(({ key, label, icon: Icon, data }) => (
            <div key={key} className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#171717]/10">
              <div className="flex items-center justify-between">
                <Icon className="w-4 h-4 text-[#171717]/70" />
                <span className={`w-2.5 h-2.5 rounded-full ${data.ready ? "bg-emerald-500" : "bg-rose-400"}`} />
              </div>
              <div className="text-xs font-black mt-2">{label}</div>
              <div className="text-[9px] font-mono text-[#171717]/50 mt-0.5 truncate">{data.model}</div>
              <div className={`text-[10px] font-bold mt-1 ${data.ready ? "text-emerald-700" : "text-rose-600"}`}>
                {data.ready ? "Hazır" : "Erişim görünmüyor"}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-[10px] text-[#171717]/50 leading-relaxed">
        Google ile giriş, Google AI Pro aboneliğini üçüncü taraf API bakiyesine dönüştürmez. Kendi API modunda ücret/kota kullanıcının Google Cloud projesine aittir.
      </div>
    </div>
  );
};
