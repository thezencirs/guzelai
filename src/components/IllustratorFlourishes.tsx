import React from "react";

/**
 * GuzelAI Atelier Illustrator Suite
 * Handcrafted vector artwork, couture sketch lines, tailor marks, and editorial stamps
 * providing an authentic luxury fashion illustrator look throughout the platform.
 */

// 1. Haute Couture Tailor Measurements & Stitch Line
export const AtelierTailorLines: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative flex items-center gap-2 select-none pointer-events-none opacity-40 hover:opacity-80 transition ${className}`}>
    <span className="font-mono text-[9px] text-[#E65A7F] font-bold tracking-widest uppercase">
      ATELIER RULER ━━━ 90·60·90
    </span>
    <svg width="180" height="14" viewBox="0 0 180 14" fill="none" className="text-neutral-400">
      <line x1="0" y1="7" x2="180" y2="7" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
      {[10, 30, 50, 70, 90, 110, 130, 150, 170].map((x) => (
        <line key={x} x1={x} y1="3" x2={x} y2="11" stroke="currentColor" strokeWidth="1" />
      ))}
      {[20, 40, 60, 80, 100, 120, 140, 160].map((x) => (
        <line key={x} x1={x} y1="5" x2={x} y2="9" stroke="currentColor" strokeWidth="0.8" />
      ))}
    </svg>
    <span className="text-[10px] text-amber-500 font-serif italic">✂ cut</span>
  </div>
);

// 2. Authentic Editorial Atelier Stamp (Circular / Octagonal Seal)
export const AtelierIllustratorStamp: React.FC<{
  title?: string;
  subtitle?: string;
  year?: string;
  className?: string;
}> = ({
  title = "GUZELAI ATELIER",
  subtitle = "HAUTE CRÉATION AI",
  year = "2026",
  className = "",
}) => (
  <div className={`relative inline-flex items-center justify-center p-3 select-none pointer-events-none ${className}`}>
    <svg width="84" height="84" viewBox="0 0 100 100" className="animate-spin-slow text-[#E65A7F]/70">
      <defs>
        <path
          id="stampCirclePath"
          d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
        />
      </defs>
      <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <text fill="currentColor" fontSize="7" fontWeight="bold" letterSpacing="2">
        <textPath href="#stampCirclePath" startOffset="0%">
          {title} • {subtitle} •
        </textPath>
      </text>
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <span className="text-[8px] font-serif font-black tracking-widest text-amber-600 dark:text-amber-300 uppercase">
        Nº 01
      </span>
      <span className="text-[11px] font-mono font-extrabold text-neutral-800 dark:text-neutral-200">
        {year}
      </span>
    </div>
  </div>
);

// 3. Fashion Silhouette & Mannequin Line Art Sketch
export const CoutureSilhouetteSketch: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none stroke-current ${className}`}
  >
    {/* Head & Neck */}
    <ellipse cx="60" cy="30" rx="14" ry="18" strokeWidth="1.2" strokeDasharray="4 2" />
    <path d="M54 48 C 55 58, 65 58, 66 48" strokeWidth="1" />
    {/* Shoulders & Collarbones */}
    <path d="M30 68 C 45 60, 75 60, 90 68" strokeWidth="1.2" />
    <path d="M48 68 Q 60 74 72 68" strokeWidth="0.8" />
    {/* Corset & Torso contours */}
    <path d="M30 68 Q 42 105 46 125 Q 60 128 74 125 Q 78 105 90 68" strokeWidth="1.2" />
    {/* Bustline guide */}
    <path d="M38 90 Q 60 98 82 90" strokeWidth="0.8" strokeDasharray="2 2" />
    {/* Waist cinch & Golden Ratio crosshair */}
    <line x1="42" y1="125" x2="78" y2="125" strokeWidth="1" strokeDasharray="3 2" />
    {/* Flare Skirt / Haute couture draped train */}
    <path d="M46 125 C 35 170, 15 220, 10 265" strokeWidth="1.2" />
    <path d="M74 125 C 85 170, 105 220, 110 265" strokeWidth="1.2" />
    <path d="M10 265 C 40 255, 80 255, 110 265" strokeWidth="1.2" strokeDasharray="3 3" />
    {/* Internal drape folds */}
    <path d="M52 135 Q 50 195 40 255" strokeWidth="0.8" opacity="0.6" />
    <path d="M60 135 Q 60 200 60 255" strokeWidth="0.8" opacity="0.6" />
    <path d="M68 135 Q 70 195 80 255" strokeWidth="0.8" opacity="0.6" />
    {/* Designer Annotation Marks */}
    <circle cx="60" cy="125" r="2.5" fill="currentColor" opacity="0.8" />
    <text x="82" y="128" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.8">
      WAIST: 60cm
    </text>
    <text x="18" y="275" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.8">
      FIG. 04 — SILK CREPE DRAPE
    </text>
  </svg>
);

// 4. Optical Crop Marks & Registration Calipers
export const AtelierCropMarks: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`absolute inset-0 pointer-events-none select-none ${className}`}>
    {/* Top-Left */}
    <div className="absolute top-2 left-2 flex flex-col gap-0.5 text-neutral-400/60 font-mono text-[8px]">
      <span className="font-bold">⌜ 00.1A</span>
    </div>
    {/* Top-Right */}
    <div className="absolute top-2 right-2 flex flex-col items-end gap-0.5 text-neutral-400/60 font-mono text-[8px]">
      <span className="font-bold">00.1B ⌝</span>
    </div>
    {/* Bottom-Left */}
    <div className="absolute bottom-2 left-2 flex flex-col gap-0.5 text-neutral-400/60 font-mono text-[8px]">
      <span className="font-bold">⌞ REF-26</span>
    </div>
    {/* Bottom-Right */}
    <div className="absolute bottom-2 right-2 flex flex-col items-end gap-0.5 text-neutral-400/60 font-mono text-[8px]">
      <span className="font-bold">SYNTHETIC ⌟</span>
    </div>
  </div>
);

// 5. Botanical Laurel & Runway Compass Ink Flourish
export const BotanicalIllustratorFlourish: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 160 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none text-[#E65A7F] ${className}`}
  >
    {/* Center Star Diamond */}
    <path d="M80 10 L84 20 L80 30 L76 20 Z" fill="currentColor" opacity="0.8" />
    <circle cx="80" cy="20" r="1.5" fill="#FAF8F5" />
    {/* Left Leaf branch */}
    <path d="M80 20 C 65 20, 50 18, 10 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M68 18 C 65 14, 58 14, 56 18" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M52 21 C 49 25, 42 25, 40 21" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M36 18 C 33 14, 26 14, 24 18" stroke="currentColor" strokeWidth="0.8" fill="none" />
    {/* Right Leaf branch */}
    <path d="M80 20 C 95 20, 110 18, 150 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M92 18 C 95 14, 102 14, 104 18" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M108 21 C 111 25, 118 25, 120 21" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M124 18 C 127 14, 134 14, 136 18" stroke="currentColor" strokeWidth="0.8" fill="none" />
  </svg>
);
