import React, { ErrorInfo, ReactNode } from "react";
import { RefreshCw, RotateCcw, Home, Sparkles, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("GuzelAI Uncaught Application / Chunk Loading Error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  /**
   * Performs a hard application reload to recover from chunk loading failures,
   * stale cached asset bundles, or network interruptions.
   */
  private handleHardReload = () => {
    try {
      // Clear hash if it was pointing to a broken chunk route to ensure clean recovery
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch {
      window.location.href = window.location.origin + window.location.pathname;
    }
  };

  /**
   * Resets local component error state and redirects to clean home view
   */
  private handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (typeof window !== "undefined") {
      window.location.hash = "#home";
      window.location.reload();
    }
  };

  /**
   * Quick in-memory retry without full page refresh
   */
  private handleRetryState = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  public override render() {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.message || "";
      const errorName = this.state.error?.name || "";

      // Detect if the failure was triggered by lazy-loaded dynamic chunks
      const isChunkLoadError =
        errorName === "ChunkLoadError" ||
        errorMsg.toLowerCase().includes("dynamically imported module") ||
        errorMsg.toLowerCase().includes("loading chunk") ||
        errorMsg.toLowerCase().includes("failed to fetch") ||
        errorMsg.toLowerCase().includes("import call failed");

      return (
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4 sm:p-6 text-[#171717] font-['Plus_Jakarta_Sans',sans-serif]">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#171717]/10 text-center space-y-6">
            {/* Header Icon */}
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#E65A7F]/10 text-[#E65A7F] flex items-center justify-center relative">
              <Sparkles className="w-8 h-8" />
              {isChunkLoadError && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            {/* Error Diagnosis & Description */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#171717]/5 text-[10px] font-mono uppercase tracking-widest text-[#171717]/70 font-bold">
                <span>{isChunkLoadError ? "Modül Yenileme &bull; Chunk Recovery" : "GuzelAI &bull; Kurtarma Modu"}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#171717] tracking-tight">
                {isChunkLoadError ? "Uygulama Modülü Güncelleniyor" : (this.props.fallbackTitle || "Bir Sorun Oluştu")}
              </h2>
              <p className="text-xs text-[#171717]/65 leading-relaxed">
                {isChunkLoadError
                  ? "Yeni bir sürüm yayınlanmış veya dinamik kod paketi bağlantısı kesilmiş olabilir. 'Reload App' butonuna basarak güncel dosyaları alabilirsiniz."
                  : "Sayfa bileşenlerinden birinde beklenmedik bir durum algılandı. Uygulamayı yeniden başlatarak kaldığınız yerden devam edebilirsiniz."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2.5">
              {/* Primary: Reload App (Hard reload via window.location.reload()) */}
              <button
                id="btn-error-boundary-reload"
                onClick={this.handleHardReload}
                className="w-full py-3.5 px-4 rounded-full bg-[#171717] hover:bg-[#262626] text-white text-xs sm:text-sm font-extrabold transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-lg shadow-black/10 active:scale-[0.98]"
              >
                <RefreshCw className="w-4 h-4 text-[#44BDBD]" />
                <span>Reload App (Yeniden Yükle)</span>
              </button>

              {/* Secondary: Retry Component State */}
              <button
                id="btn-error-boundary-retry"
                onClick={this.handleRetryState}
                className="w-full py-2.5 px-4 rounded-full bg-[#E65A7F]/10 hover:bg-[#E65A7F]/20 text-[#E65A7F] text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tekrar Dene</span>
              </button>

              {/* Tertiary: Go to Clean Home Page */}
              <button
                id="btn-error-boundary-home"
                onClick={this.handleGoHome}
                className="w-full py-2.5 px-4 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#171717]/80 text-xs font-semibold transition flex items-center justify-center gap-2"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Ana Sayfaya Dön</span>
              </button>
            </div>

            {/* Collapsible Error Debug Details */}
            {this.state.error && (
              <div className="pt-2 border-t border-neutral-100 text-left">
                <button
                  onClick={this.toggleDetails}
                  className="w-full flex items-center justify-between text-[11px] font-mono text-neutral-500 hover:text-neutral-800 transition py-1"
                >
                  <span>Teknik Hata Detayları</span>
                  {this.state.showDetails ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>

                {this.state.showDetails && (
                  <div className="mt-2 p-3 rounded-xl bg-neutral-900 text-neutral-200 text-[10px] font-mono overflow-x-auto max-h-36 leading-normal space-y-1">
                    <p className="text-red-400 font-bold">{errorName}: {errorMsg}</p>
                    {this.state.error.stack && (
                      <pre className="text-neutral-400 whitespace-pre-wrap text-[9px]">
                        {this.state.error.stack.split("\n").slice(0, 4).join("\n")}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
