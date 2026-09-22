import { useState, useEffect, useRef, useCallback, useMemo } from "react";

export interface StudioViewEvent {
  id: string;
  moduleId: string;
  moduleName: string;
  startedAt: number; // epoch ms
  endedAt: number;   // epoch ms
  durationSeconds: number;
}

export interface StudioModuleStats {
  moduleId: string;
  moduleName: string;
  totalDurationSeconds: number;
  visitCount: number;
  averageDurationSeconds: number;
  lastVisitedAt: number;
}

export const MODULE_NAMES: Record<string, string> = {
  templates: "Kolay Reklam Şablonları",
  photoshoot_wizard: "Photoshoot Wizard (Fotoğraf)",
  your_images: "Görseller & Multi-Angle Katalog",
  your_videos: "Video Studio Director",
  models: "AI Model Roster",
  dress_up: "Virtual Try-On & Doku Düzenleyici",
  moodboard: "Moodboard & Reklam Akışı",
  legal_license: "Ticari Lisans & Telif",
  model_creator: "Model Üretim Yeri (3D & Influencer)",
};

const STORAGE_KEY = "guzelai_studio_analytics_events";
const MAX_EVENTS_STORED = 200;

interface UseStudioAnalyticsOptions {
  activeModule: string;
  isStudioActive?: boolean;
}

export function useStudioAnalytics({
  activeModule,
  isStudioActive = true,
}: UseStudioAnalyticsOptions) {
  const [events, setEvents] = useState<StudioViewEvent[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to load studio analytics events:", e);
      return [];
    }
  });

  const [currentLiveSeconds, setCurrentLiveSeconds] = useState<number>(0);

  // References to accurately calculate durations without stale closures
  const activeModuleRef = useRef<string>(activeModule);
  const isStudioActiveRef = useRef<boolean>(isStudioActive);
  const sessionStartRef = useRef<number>(Date.now());

  activeModuleRef.current = activeModule;
  isStudioActiveRef.current = isStudioActive;

  // Flush recorded session into localStorage and internal state
  const flushSession = useCallback((moduleId: string, startTime: number, endTime: number) => {
    const durationMs = endTime - startTime;
    const durationSeconds = Math.round(durationMs / 1000);

    // Only record visits longer than 1 second to ignore rapid tab clicks
    if (durationSeconds < 1) return;

    const moduleName = MODULE_NAMES[moduleId] || moduleId;
    const newEvent: StudioViewEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      moduleId,
      moduleName,
      startedAt: startTime,
      endedAt: endTime,
      durationSeconds,
    };

    setEvents((prev) => {
      const updated = [newEvent, ...prev].slice(0, MAX_EVENTS_STORED);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to persist analytics event:", err);
      }
      return updated;
    });
  }, []);

  // Monitor module changes and studio active toggle
  useEffect(() => {
    const startTime = Date.now();
    sessionStartRef.current = startTime;
    setCurrentLiveSeconds(0);

    // Live tick every second for current active module
    const liveTimer = setInterval(() => {
      if (isStudioActiveRef.current) {
        const elapsed = Math.floor((Date.now() - sessionStartRef.current) / 1000);
        setCurrentLiveSeconds(elapsed);
      }
    }, 1000);

    return () => {
      clearInterval(liveTimer);
      if (isStudioActiveRef.current) {
        flushSession(activeModule, startTime, Date.now());
      }
    };
  }, [activeModule, isStudioActive, flushSession]);

  // Handle tab visibility change & window beforeunload
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab hidden or user navigated away
        if (isStudioActiveRef.current) {
          flushSession(activeModuleRef.current, sessionStartRef.current, Date.now());
        }
      } else {
        // Returned to tab: restart counter
        sessionStartRef.current = Date.now();
        setCurrentLiveSeconds(0);
      }
    };

    const handleBeforeUnload = () => {
      if (isStudioActiveRef.current) {
        flushSession(activeModuleRef.current, sessionStartRef.current, Date.now());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [flushSession]);

  // Aggregate stats per module
  const stats = useMemo(() => {
    const map: Record<string, StudioModuleStats> = {};

    // Initialize all known modules with zero values
    Object.keys(MODULE_NAMES).forEach((modId) => {
      map[modId] = {
        moduleId: modId,
        moduleName: MODULE_NAMES[modId],
        totalDurationSeconds: 0,
        visitCount: 0,
        averageDurationSeconds: 0,
        lastVisitedAt: 0,
      };
    });

    events.forEach((evt) => {
      if (!map[evt.moduleId]) {
        map[evt.moduleId] = {
          moduleId: evt.moduleId,
          moduleName: evt.moduleName,
          totalDurationSeconds: 0,
          visitCount: 0,
          averageDurationSeconds: 0,
          lastVisitedAt: 0,
        };
      }
      const item = map[evt.moduleId];
      item.totalDurationSeconds += evt.durationSeconds;
      item.visitCount += 1;
      if (evt.endedAt > item.lastVisitedAt) {
        item.lastVisitedAt = evt.endedAt;
      }
    });

    // Compute averages
    Object.values(map).forEach((item) => {
      item.averageDurationSeconds =
        item.visitCount > 0 ? Math.round(item.totalDurationSeconds / item.visitCount) : 0;
    });

    return Object.values(map).sort(
      (a, b) => b.totalDurationSeconds - a.totalDurationSeconds
    );
  }, [events]);

  // Total time spent in studio across all events
  const totalStudioTimeSeconds = useMemo(() => {
    return events.reduce((acc, evt) => acc + evt.durationSeconds, 0);
  }, [events]);

  // Clear all stored analytics
  const clearAnalytics = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setEvents([]);
      setCurrentLiveSeconds(0);
      sessionStartRef.current = Date.now();
    } catch (e) {
      console.error("Error clearing analytics:", e);
    }
  }, []);

  // Export analytics data as JSON file
  const exportAnalyticsJson = useCallback(() => {
    const report = {
      exportedAt: new Date().toISOString(),
      totalStudioTimeSeconds,
      totalVisits: events.length,
      moduleStats: stats,
      rawEvents: events,
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `guzelai-studio-analytics-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [events, stats, totalStudioTimeSeconds]);

  return {
    events,
    stats,
    totalStudioTimeSeconds,
    currentLiveSeconds,
    activeModuleName: MODULE_NAMES[activeModule] || activeModule,
    clearAnalytics,
    exportAnalyticsJson,
  };
}
