// Web Speech API and Web Audio API synthesizer for guzelai

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playCameraShutterSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // audio context might be blocked before user gesture
  }
}

export function playRunwayBeat() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Deep kick drum
    const kick = ctx.createOscillator();
    const kickGain = ctx.createGain();
    kick.type = "sine";
    kick.frequency.setValueAtTime(140, now);
    kick.frequency.exponentialRampToValueAtTime(35, now + 0.2);
    kickGain.gain.setValueAtTime(0.4, now);
    kickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    kick.connect(kickGain);
    kickGain.connect(ctx.destination);
    kick.start(now);
    kick.stop(now + 0.2);

    // Hi-hat shimmer
    const hat = ctx.createOscillator();
    const hatGain = ctx.createGain();
    hat.type = "triangle";
    hat.frequency.setValueAtTime(6000, now + 0.1);
    hatGain.gain.setValueAtTime(0.15, now + 0.1);
    hatGain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
    hat.connect(hatGain);
    hatGain.connect(ctx.destination);
    hat.start(now + 0.1);
    hat.stop(now + 0.16);
  } catch (e) {}
}

export function playSpraySound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.linearRampToValueAtTime(1800, now + 0.15);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {}
}

export interface SpeakOptions {
  pitch?: number;
  rate?: number;
  voiceLang?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

export function speakText(text: string, options: SpeakOptions = {}): boolean {
  if (!("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported in this browser.");
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const cleanText = text.replace(/[*_#`[\]]/g, "").trim();
  if (!cleanText) return false;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = options.rate ?? 1.0;
  utterance.pitch = options.pitch ?? 1.05;

  const voices = window.speechSynthesis.getVoices();
  const lang = options.voiceLang || "tr-TR";

  // Try finding best matching voice
  const preferredVoice = voices.find(
    (v) => v.lang.startsWith(lang.slice(0, 2)) && (v.name.includes("Female") || v.name.includes("Yelda") || v.name.includes("Natural") || v.name.includes("Google"))
  ) || voices.find((v) => v.lang.startsWith(lang.slice(0, 2))) || voices[0];

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onstart = () => {
    if (options.onStart) options.onStart();
  };

  utterance.onend = () => {
    if (options.onEnd) options.onEnd();
  };

  utterance.onerror = () => {
    if (options.onEnd) options.onEnd();
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
