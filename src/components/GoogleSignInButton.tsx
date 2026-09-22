import React, { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import type { UserProfile } from "./AuthOnboardingModal";

interface Props {
  onSuccess: (user: UserProfile) => void;
}

export const GoogleSignInButton: React.FC<Props> = ({ onSuccess }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

  useEffect(() => {
    if (!clientId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const init = () => {
      if (cancelled || !(window as any).google || !ref.current) return;
      (window as any).google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: any) => {
          setError("");
          try {
            const r = await fetch("/api/auth/google", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ credential: response.credential }),
            });
            const data = await r.json();
            if (!r.ok) throw new Error(data.error || "Google ile giriş başarısız.");
            onSuccess(data.user);
          } catch (e: any) {
            setError(e?.message || "Google ile giriş başarısız.");
          }
        },
      });
      ref.current.innerHTML = "";
      (window as any).google.accounts.id.renderButton(ref.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "continue_with",
        width: 320,
      });
      setLoading(false);
    };

    if ((window as any).google?.accounts?.id) {
      init();
      return () => {
        cancelled = true;
      };
    }

    const existing = document.querySelector('script[data-guzelai-google="true"]');
    if (existing) {
      existing.addEventListener("load", init, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.dataset.guzelaiGoogle = "true";
      script.onload = init;
      script.onerror = () => {
        setError("Google giriş bileşeni yüklenemedi.");
        setLoading(false);
      };
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
    };
  }, [clientId, onSuccess]);

  if (!clientId) return null;

  return (
    <div className="space-y-2">
      {loading && (
        <div className="flex items-center justify-center gap-2 text-xs text-[#171717]/50">
          <Loader2 className="w-4 h-4 animate-spin" />
          Google giriş hazırlanıyor...
        </div>
      )}
      <div ref={ref} className="flex justify-center min-h-10" />
      {error && <div className="text-[11px] text-rose-600 text-center">{error}</div>}
    </div>
  );
};
