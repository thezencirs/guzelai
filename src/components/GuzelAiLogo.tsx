import React from "react";

interface GuzelAiLogoProps {
  className?: string;
  variant?: "light-bg" | "dark-bg" | "brand-badge";
  size?: "sm" | "md" | "lg" | "xl";
  showSubtitle?: boolean;
  compactOnMobile?: boolean;
}

export const GuzelAiLogo: React.FC<GuzelAiLogoProps> = ({
  className = "",
  variant = "light-bg",
  size = "md",
  showSubtitle = true,
  compactOnMobile = false,
}) => {
  // Height scale
  const sizeMap = {
    sm: "h-7",
    md: "h-9 sm:h-10",
    lg: "h-12 sm:h-14",
    xl: "h-16 sm:h-20",
  };

  const isDarkBg = variant === "dark-bg";

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none group transition-transform ${className}`}
    >
      {/* 3D Puffy Clay/Plush Logo Vector Graphic */}
      <svg
        viewBox="0 0 540 160"
        className={`${sizeMap[size]} w-auto overflow-visible drop-shadow-sm`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="GuzelAI Medya"
      >
        <defs>
          {/* Subtle soft lighting & 3D bevel filters */}
          <filter id="puffy-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#171717" floodOpacity="0.12" />
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#171717" floodOpacity="0.08" />
          </filter>

          {/* Letter Gradients for 3D Clay Depth */}
          {/* 'g' - Pink */}
          <linearGradient id="grad-g" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F47295" />
            <stop offset="60%" stopColor="#E65A7F" />
            <stop offset="100%" stopColor="#C43B61" />
          </linearGradient>

          {/* 'u' - Orange */}
          <linearGradient id="grad-u" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF7A52" />
            <stop offset="60%" stopColor="#FB5D2E" />
            <stop offset="100%" stopColor="#D94114" />
          </linearGradient>

          {/* 'z' - Yellow */}
          <linearGradient id="grad-z" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FED27A" />
            <stop offset="60%" stopColor="#FBC056" />
            <stop offset="100%" stopColor="#D89929" />
          </linearGradient>

          {/* 'e' - Turquoise */}
          <linearGradient id="grad-e" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64D5D5" />
            <stop offset="60%" stopColor="#44BDBD" />
            <stop offset="100%" stopColor="#2A9B9B" />
          </linearGradient>

          {/* 'l' - Lavender */}
          <linearGradient id="grad-l" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#CEBAE3" />
            <stop offset="60%" stopColor="#B8A1CF" />
            <stop offset="100%" stopColor="#9679B5" />
          </linearGradient>

          {/* 'a' - Green */}
          <linearGradient id="grad-a" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5E8C2F" />
            <stop offset="60%" stopColor="#41631E" />
            <stop offset="100%" stopColor="#2E4713" />
          </linearGradient>

          {/* 'i' stem - Pink */}
          <linearGradient id="grad-i" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F47295" />
            <stop offset="60%" stopColor="#E65A7F" />
            <stop offset="100%" stopColor="#C43B61" />
          </linearGradient>

          {/* Heart on 'i' - Orange */}
          <linearGradient id="grad-heart" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA180" />
            <stop offset="50%" stopColor="#FB5D2E" />
            <stop offset="100%" stopColor="#D94114" />
          </linearGradient>

          {/* Specular pillowy highlight overlay */}
          <linearGradient id="pillowy-specular" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* --- GUZELAI LETTERS GROUP --- */}
        <g filter="url(#puffy-shadow)">
          {/* Letter: g (Pink) */}
          <g transform="translate(10, 24)">
            {/* Base Puffy 'g' */}
            <path
              d="M 52 14 C 28 14 10 32 10 56 C 10 78 26 94 48 94 C 54 94 60 92 66 88 L 66 102 C 66 116 52 122 40 120 C 30 118 24 112 22 106 C 20 101 14 98 8 100 C 2 102 -1 108 1 114 C 5 127 18 138 36 141 C 58 145 84 136 84 104 L 84 40 C 84 25 70 14 52 14 Z M 48 76 C 36 76 28 67 28 55 C 28 42 37 32 50 32 C 61 32 68 40 68 53 C 68 66 60 76 48 76 Z"
              fill="url(#grad-g)"
            />
            {/* Top plush highlight */}
            <ellipse cx="44" cy="30" rx="22" ry="7" fill="url(#pillowy-specular)" />
          </g>

          {/* Letter: u (Orange) */}
          <g transform="translate(112, 42)">
            <path
              d="M 12 6 C 5.5 6 0 11.5 0 18 L 0 54 C 0 76 17 92 40 92 C 63 92 80 76 80 54 L 80 18 C 80 11.5 74.5 6 68 6 C 61.5 6 56 11.5 56 18 L 56 52 C 56 63 48 72 40 72 C 32 72 24 63 24 52 L 24 18 C 24 11.5 18.5 6 12 6 Z"
              fill="url(#grad-u)"
            />
            <ellipse cx="12" cy="18" rx="8" ry="4" fill="url(#pillowy-specular)" />
            <ellipse cx="68" cy="18" rx="8" ry="4" fill="url(#pillowy-specular)" />
            <ellipse cx="40" cy="82" rx="18" ry="5" fill="url(#pillowy-specular)" opacity="0.4" />
          </g>

          {/* Letter: z (Yellow) */}
          <g transform="translate(202, 42)">
            <path
              d="M 10 6 C 4 6 0 11 0 17 C 0 23 4 27 10 27 L 44 27 L 7 66 C 2 71 3 79 9 84 C 12 87 16 88 20 88 L 68 88 C 74 88 78 84 78 78 C 78 72 74 68 68 68 L 34 68 L 71 29 C 76 24 75 16 69 11 C 66 8 62 6 58 6 L 10 6 Z"
              fill="url(#grad-z)"
            />
            <ellipse cx="38" cy="16" rx="24" ry="4" fill="url(#pillowy-specular)" />
          </g>

          {/* Letter: e (Turquoise) */}
          <g transform="translate(288, 42)">
            <path
              d="M 42 6 C 18 6 0 24 0 49 C 0 74 19 92 44 92 C 64 92 76 81 81 72 C 84 66 81 60 75 58 C 69 56 63 59 60 64 C 57 69 49 74 42 74 C 30 74 22 66 20 54 L 78 54 C 82 54 86 50 86 45 C 86 21 66 6 42 6 Z M 20 40 C 22 28 30 22 42 22 C 54 22 62 28 64 40 L 20 40 Z"
              fill="url(#grad-e)"
            />
            <ellipse cx="42" cy="18" rx="20" ry="5" fill="url(#pillowy-specular)" />
          </g>

          {/* Letter: l (Lavender) */}
          <g transform="translate(382, 18)">
            <rect x="0" y="4" width="28" height="112" rx="14" fill="url(#grad-l)" />
            <ellipse cx="14" cy="14" rx="9" ry="5" fill="url(#pillowy-specular)" />
          </g>

          {/* Letter: a (Green) */}
          <g transform="translate(418, 42)">
            <path
              d="M 42 6 C 22 6 6 22 6 46 C 6 68 20 84 40 84 C 47 84 54 81 60 76 L 60 78 C 60 84 64 88 70 88 C 76 88 80 84 80 78 L 80 20 C 80 9 71 6 60 6 C 54 6 48 6 42 6 Z M 44 68 C 32 68 24 59 24 47 C 24 35 32 24 44 24 C 54 24 62 33 62 46 C 62 58 54 68 44 68 Z"
              fill="url(#grad-a)"
            />
            <ellipse cx="40" cy="17" rx="18" ry="5" fill="url(#pillowy-specular)" />
          </g>

          {/* Letter: i (Pink body + Orange 3D Heart dot) */}
          <g transform="translate(506, 22)">
            {/* 3D Heart Dot (Orange) */}
            <g transform="translate(2, 0)">
              <path
                d="M 12 6 C 9 0 0 1 0 8 C 0 14 8 20 12 25 C 16 20 24 14 24 8 C 24 1 15 0 12 6 Z"
                fill="url(#grad-heart)"
              />
              <circle cx="7" cy="6" r="3" fill="url(#pillowy-specular)" />
            </g>

            {/* Pillowy 'i' Stem */}
            <rect x="2" y="38" width="22" height="74" rx="11" fill="url(#grad-i)" />
            <ellipse cx="13" cy="46" rx="7" ry="4" fill="url(#pillowy-specular)" />
          </g>
        </g>
      </svg>

      {/* Spaced Subtitle: "M E D Y A" */}
      {showSubtitle && (
        <span
          className={`text-[9px] sm:text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.45em] sm:tracking-[0.55em] mt-1 transition-colors ${
            isDarkBg ? "text-white/90" : "text-[#171717]"
          }`}
        >
          MEDYA
        </span>
      )}
    </div>
  );
};
