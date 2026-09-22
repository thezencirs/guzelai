import React, { useState } from "react";
import {
  X,
  Clock,
  BarChart3,
  Activity,
  Download,
  Trash2,
  TrendingUp,
  Layers,
  Timer,
  CheckCircle2,
} from "lucide-react";
import {
  StudioModuleStats,
  StudioViewEvent,
} from "../hooks/useStudioAnalytics";

interface StudioAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: StudioModuleStats[];
  events: StudioViewEvent[];
  totalStudioTimeSeconds: number;
  currentLiveSeconds: number;
  activeModuleName: string;
  onClearAnalytics: () => void;
  onExportAnalytics: () => void;
}

export const StudioAnalyticsModal: React.FC<StudioAnalyticsModalProps> = ({
  isOpen,
  onClose,
  stats,
  events,
  totalStudioTimeSeconds,
  currentLiveSeconds,
  activeModuleName,
  onClearAnalytics,
  onExportAnalytics,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "logs">("overview");
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  // Format seconds to human readable (e.g. 1s 42d 15sn)
  const formatDuration = (totalSeconds: number): string => {
    if (totalSeconds < 60) return `${totalSeconds} sn`;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours} saat ${minutes} dk`;
    }
    return `${minutes} dk ${seconds} sn`;
  };

  const formatShortDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  const formatDate = (timestamp: number): string => {
    const d = new Date(timestamp);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  // Identify most popular module
  const topModule = stats.length > 0 && stats[0].totalDurationSeconds > 0 ? stats[0] : null;

  return (
    <div
      id="studio-analytics-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#44BDBD]/10 border border-[#44BDBD]/20 flex items-center justify-center text-[#44BDBD]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Stüdyo Kullanım & Süre Analitiği
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-semibold">
                  Private Dashboard
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Modül bazlı oturum süreleri ve yerel tarayıcı (localStorage) kullanım verileri
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Active Module Tracker Banner */}
        <div className="px-6 py-3 bg-neutral-950/40 border-b border-neutral-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-400">Şu Anki Modül:</span>
            <span className="text-white font-bold">{activeModuleName}</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-emerald-400">
            <Timer className="w-3.5 h-3.5" />
            <span>Aktif Sayaç: {formatShortDuration(currentLiveSeconds)}</span>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-900/50 border-b border-neutral-800">
          <div className="p-3.5 rounded-2xl bg-neutral-800/40 border border-neutral-700/50">
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
              <Clock className="w-3.5 h-3.5 text-[#E65A7F]" />
              <span>Toplam Stüdyo Süresi</span>
            </div>
            <div className="text-lg sm:text-xl font-black text-white font-mono">
              {formatDuration(totalStudioTimeSeconds)}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-800/40 border border-neutral-700/50">
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
              <Activity className="w-3.5 h-3.5 text-[#44BDBD]" />
              <span>Kayıtlı Oturumlar</span>
            </div>
            <div className="text-lg sm:text-xl font-black text-white font-mono">
              {events.length} <span className="text-xs text-neutral-500 font-normal">etkinlik</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-800/40 border border-neutral-700/50">
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>En Yoğun Modül</span>
            </div>
            <div className="text-sm font-bold text-white truncate" title={topModule?.moduleName || "Henüz veri yok"}>
              {topModule ? topModule.moduleName : "Henüz veri yok"}
            </div>
            <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
              {topModule ? formatDuration(topModule.totalDurationSeconds) : "0 sn"}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-800/40 border border-neutral-700/50">
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Aktif Modül Adedi</span>
            </div>
            <div className="text-lg sm:text-xl font-black text-white font-mono">
              {stats.filter((s) => s.visitCount > 0).length} / {stats.length}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 transition ${
                activeTab === "overview"
                  ? "border-[#44BDBD] text-white"
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Modül Süre Dağılımı
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
                activeTab === "logs"
                  ? "border-[#44BDBD] text-white"
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <span>Son Oturum Geçmişi</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-neutral-800 text-neutral-300">
                {events.length}
              </span>
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-2 pb-2">
            <button
              id="btn-analytics-export-json"
              onClick={onExportAnalytics}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
              title="JSON Olarak İndir"
            >
              <Download className="w-3.5 h-3.5 text-[#44BDBD]" />
              <span className="hidden sm:inline">JSON Dışa Aktar</span>
            </button>

            {confirmClear ? (
              <div className="flex items-center gap-1 bg-red-950/60 p-1 rounded-lg border border-red-800/60">
                <span className="text-[10px] text-red-300 px-1 font-bold">Silinsin mi?</span>
                <button
                  onClick={() => {
                    onClearAnalytics();
                    setConfirmClear(false);
                  }}
                  className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold"
                >
                  Evet
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px]"
                >
                  İptal
                </button>
              </div>
            ) : (
              <button
                id="btn-analytics-clear-all"
                onClick={() => setConfirmClear(true)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-950/50 text-neutral-400 hover:text-red-400 text-xs transition"
                title="Tüm Analitik Verilerini Sıfırla"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === "overview" && (
            <div className="space-y-3">
              {stats.map((item) => {
                const percentage =
                  totalStudioTimeSeconds > 0
                    ? Math.round((item.totalDurationSeconds / totalStudioTimeSeconds) * 100)
                    : 0;

                return (
                  <div
                    key={item.moduleId}
                    className="p-4 rounded-2xl bg-neutral-800/30 border border-neutral-800 hover:border-neutral-700/80 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span>{item.moduleName}</span>
                        {item.visitCount > 0 && (
                          <span className="text-[10px] font-mono text-neutral-400 font-normal">
                            ({item.visitCount} ziyaret)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 font-mono">
                        <span className="text-neutral-400 text-[11px]">
                          Ort: {formatShortDuration(item.averageDurationSeconds)}
                        </span>
                        <span className="font-bold text-white">
                          {formatDuration(item.totalDurationSeconds)}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-[#44BDBD] font-bold">
                          %{percentage}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#44BDBD] to-[#E65A7F] rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(percentage, item.visitCount > 0 ? 3 : 0)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-2">
              {events.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 text-xs">
                  Henüz kayıtlı bir modül oturumu bulunamadı. Stüdyo araçlarını kullandıkça oturum süreleri burada listelenecektir.
                </div>
              ) : (
                events.map((evt) => (
                  <div
                    key={evt.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-800/30 border border-neutral-800/60 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#44BDBD]" />
                      <div>
                        <span className="font-semibold text-white">{evt.moduleName}</span>
                        <div className="text-[10px] font-mono text-neutral-500">
                          {new Date(evt.startedAt).toLocaleDateString()} - {formatDate(evt.startedAt)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-emerald-400 font-bold text-[11px]">
                        +{formatShortDuration(evt.durationSeconds)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-between text-[11px] text-neutral-500">
          <span>Veriler yalnızca tarayıcınızın yerel depolama alanında (localStorage) saklanır.</span>
          <span className="font-mono">GuzelAI Telemetry v1.0</span>
        </div>
      </div>
    </div>
  );
};
