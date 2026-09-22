import React, { useState, useEffect } from "react";
import {
  AIModel,
  VideoPresetItem,
} from "../types";
import { VIDEO_PRESETS } from "../data/photoshootPresets";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Download,
  ShieldCheck,
  Cpu,
  Video,
  Layers,
  Sliders,
  CheckCircle2,
  Volume2,
  VolumeX,
} from "lucide-react";

interface VideoStudioViewProps {
  initialStartImage?: string;
  initialEndImage?: string;
  initialPrompt?: string;
  selectedModel: AIModel;
  onViewLegalLicense: () => void;
}

export const VideoStudioView: React.FC<VideoStudioViewProps> = ({
  initialStartImage,
  initialEndImage,
  initialPrompt,
  selectedModel,
  onViewLegalLicense,
}) => {
  const [startImage, setStartImage] = useState<string>(
    initialStartImage ||
      selectedModel.avatar ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
  );
  const [endImage, setEndImage] = useState<string>(
    initialEndImage ||
      selectedModel.fullBodyImage ||
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
  );

  const [promptText, setPromptText] = useState<string>(
    initialPrompt ||
      "Commercial fashion video featuring AI model in black nappa leather corset dress, smooth robotic camera transition, hyper-realistic motion, 4k cinematic lighting."
  );

  const [selectedPresetId, setSelectedPresetId] = useState<string>("robotic_camera");
  const [resolution, setResolution] = useState<"1080p" | "4K">("1080p");
  const [duration, setDuration] = useState<"5s" | "10s">("5s");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [renderProgress, setRenderProgress] = useState<number>(100);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(0);

  const selectedPreset =
    VIDEO_PRESETS.find((p) => p.id === selectedPresetId) || VIDEO_PRESETS[0];

  // Update images if props change
  useEffect(() => {
    if (initialStartImage) setStartImage(initialStartImage);
    if (initialEndImage) setEndImage(initialEndImage);
    if (initialPrompt) setPromptText(initialPrompt);
  }, [initialStartImage, initialEndImage, initialPrompt]);

  // Video animation timeline simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && !isRendering) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => {
          const maxSec = duration === "5s" ? 5 : 10;
          if (prev >= maxSec) return 0;
          return Number((prev + 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isRendering, duration]);

  const handleCreateVideo = () => {
    setIsRendering(true);
    setRenderProgress(0);

    const step = 20;
    const timer = setInterval(() => {
      setRenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsRendering(false);
          setIsPlaying(true);
          return 100;
        }
        return prev + step;
      });
    }, 400);
  };

  const maxDurationSec = duration === "5s" ? 5 : 10;
  const progressRatio = playbackTime / maxDurationSec;

  return (
    <div id="video-studio-view" className="flex-1 bg-neutral-950 text-white min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-pink-600/20 text-pink-400 border border-pink-500/30 flex items-center justify-center">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">Create Your Video</h1>
            <p className="text-xs text-neutral-400">
              Kamera hareketleri, 100% telifsiz AI manken ve start/end enterpolasyonu ile ticari video reklamı
            </p>
          </div>
        </div>

        <button
          onClick={onViewLegalLicense}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 text-xs font-semibold hover:bg-emerald-900/40 transition"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Ticari Reklam Lisansı Aktif</span>
        </button>
      </header>

      {/* Main Grid: Left editor & Right options drawer (Directly matching video at 0:20-0:28!) */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Start/End images, Describe video & Presets (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Start and End Image Pickers */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Image */}
            <div className="bg-neutral-900 rounded-2xl p-3.5 border border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">Start image</span>
                <span className="text-[10px] text-neutral-400">Başlangıç karesi</span>
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-800 relative group border border-neutral-700">
                <img src={startImage} alt="Start" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur">
                    Görsel Seçili
                  </span>
                </div>
              </div>
            </div>

            {/* End Image */}
            <div className="bg-neutral-900 rounded-2xl p-3.5 border border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">End image</span>
                <span className="text-[10px] text-neutral-400">Bitiş karesi</span>
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-800 relative group border border-neutral-700">
                <img src={endImage} alt="End" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur">
                    Görsel Seçili
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Describe the Video Prompt Textarea */}
          <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 space-y-2">
            <label className="block text-xs font-bold text-white">Describe the video</label>
            <textarea
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Enter your video description or leave it to presets..."
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-purple-500 resize-none font-sans leading-relaxed"
            />
          </div>

          {/* Presets List (Buttons directly from video!) */}
          <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Presets</span>
              <span className="text-[11px] text-purple-400 font-medium">Kamera & Hareket Şablonları</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {VIDEO_PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    id={`video-preset-${preset.id}`}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-900/40 ring-1 ring-purple-400"
                        : "bg-neutral-800 hover:bg-neutral-700/80 border-neutral-700 text-neutral-300"
                    }`}
                  >
                    <span>{preset.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Simulated Video Player (Visualizing Camera Motion) */}
          <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-xl relative">
            <div className="aspect-[16/9] bg-black relative flex items-center justify-center overflow-hidden">
              {/* Dynamic Camera Animation based on selected preset & progress */}
              <div
                className="w-full h-full relative transition-transform duration-200 ease-out"
                style={{
                  transform:
                    selectedPresetId === "robotic_camera"
                      ? `scale(${1 + progressRatio * 0.15}) translate(${progressRatio * -2}%, ${progressRatio * -1}%)`
                      : selectedPresetId === "camera_orbit"
                      ? `perspective(800px) rotateY(${progressRatio * 20 - 10}deg)`
                      : selectedPresetId === "detail_focus"
                      ? `scale(${1 + progressRatio * 0.35})`
                      : `translateY(${progressRatio * -2}%)`,
                }}
              >
                <img
                  src={progressRatio < 0.5 ? startImage : endImage}
                  alt="Video Stage"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Rendering Overlay */}
              {isRendering && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 z-30">
                  <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center animate-spin">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Video Render Ediliyor...</h4>
                  <div className="w-48 bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all"
                      style={{ width: `${renderProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">%{renderProgress}</span>
                </div>
              )}

              {/* Player Top HUD */}
              <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] font-mono text-purple-300 font-bold border border-white/10">
                  {selectedPreset.cameraMotion}
                </span>
                <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] font-mono text-neutral-300 border border-white/10">
                  {resolution} &bull; {duration}
                </span>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                <button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className="p-1.5 rounded-lg bg-black/70 backdrop-blur text-neutral-300 hover:text-white"
                >
                  {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Player Bottom Controls */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-6 flex flex-col gap-2 z-10">
                {/* Timeline Bar */}
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all"
                    style={{ width: `${(playbackTime / maxDurationSec) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[11px] text-neutral-300">
                      00:0{playbackTime.toFixed(1)} / 00:0{maxDurationSec}.0
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={endImage}
                      download="ai_commercial_video.mp4"
                      className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px] font-medium flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>İndir (MP4)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Style / Options Drawer (4 Cols - Directly matching video at 0:22!) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Options Drawer Card */}
          <div className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 space-y-5 sticky top-24">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>{selectedPreset.title}</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Using a robotic camera, the video shows a smooth transition between two views of the model wearing the leather dress and boots.
              </p>
            </div>

            {/* Resolution Buttons */}
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <label className="block text-xs font-semibold text-neutral-300">Resolution:</label>
              <div className="grid grid-cols-2 gap-2">
                {(["1080p", "4K"] as const).map((res) => (
                  <button
                    key={res}
                    onClick={() => setResolution(res)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                      resolution === res
                        ? "bg-purple-600 border-purple-500 text-white shadow-sm"
                        : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Buttons */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-300">Duration:</label>
              <div className="grid grid-cols-2 gap-2">
                {(["5s", "10s"] as const).map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setDuration(dur)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                      duration === dur
                        ? "bg-purple-600 border-purple-500 text-white shadow-sm"
                        : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>

            {/* Credits Info (Directly matching video: "Credits required: 5") */}
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800/80 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">Credits required:</span>
                <span className="text-white font-bold font-mono">5</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">You have:</span>
                <span className="text-purple-400 font-bold font-mono">40 credits</span>
              </div>
            </div>

            {/* Main Action Button */}
            <button
              id="btn-create-video"
              onClick={handleCreateVideo}
              disabled={isRendering}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isRendering ? "Video Oluşturuluyor..." : "Create video (5 credits)"}</span>
            </button>

            {/* Commercial Protection guarantee note */}
            <div className="flex items-start gap-2 text-[11px] text-emerald-400/90 bg-emerald-950/40 border border-emerald-900/60 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                100% Yapay Zeka Video Motoru: Hiçbir gerçek insan görüntüsü veya model release gerektirmez, tüm ticari mecralarda serbesttir.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
