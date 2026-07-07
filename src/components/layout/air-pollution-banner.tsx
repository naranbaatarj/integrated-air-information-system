"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { HouseIsometric } from "@/components/layout/house-isometric";
import { cn } from "@/lib/utils";

type Mode = "auto" | "day" | "night";
type Theme = "day" | "night";

function getTimeBasedTheme(): Theme {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 19 ? "day" : "night";
}

export function AirPollutionBanner() {
  const [mode, setMode] = useState<Mode>("auto");
  const [theme, setTheme] = useState<Theme>("day");

  useEffect(() => {
    if (mode === "auto") {
      setTheme(getTimeBasedTheme());
      const interval = setInterval(() => setTheme(getTimeBasedTheme()), 60_000);
      return () => clearInterval(interval);
    }
    setTheme(mode);
  }, [mode]);

  return (
    <section
      data-air-theme={theme}
      className="air-pollution-banner relative overflow-hidden border-b border-slate-100 transition-colors duration-700"
    >
      <div className="air-pollution-banner-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7">
        <p className="air-pollution-banner-subtitle text-center text-xs font-medium tracking-widest uppercase sm:text-sm">
          Утаанаас сэргийлэх · Агаарын чанарын мэдээлэл
        </p>
        <h2 className="air-pollution-banner-title mt-1 text-center text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
          Агаарын мэдээллийн нэгдсэн систем
        </h2>

        <div className="relative mx-auto mt-4 max-w-5xl sm:mt-6">
          <svg
            viewBox="0 0 800 300"
            className="h-auto w-full"
            role="img"
            aria-label="Утаа, хот, агаарын хяналтын хөдөлгөөнт зураг"
          >
            <defs>
              <linearGradient id="sky-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" className="sky-fade-start" />
                <stop offset="100%" className="sky-fade-end" />
              </linearGradient>
              <linearGradient id="smoke-grad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" className="smoke-grad-start" />
                <stop offset="100%" className="smoke-grad-end" />
              </linearGradient>
              <linearGradient id="smoke-warm" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" className="smoke-warm-start" />
                <stop offset="100%" className="smoke-warm-end" />
              </linearGradient>
              <linearGradient id="wind-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className="wind-grad-start" />
                <stop offset="30%" className="wind-grad-mid" />
                <stop offset="65%" className="wind-grad-bright" />
                <stop offset="100%" className="wind-grad-end" />
              </linearGradient>
              <filter id="wind-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Night sky */}
            <g className="night-sky-elements">
              <circle cx="680" cy="45" r="22" className="moon" />
              <circle cx="120" cy="35" r="1.2" className="star star-1" />
              <circle cx="200" cy="55" r="1" className="star star-2" />
              <circle cx="280" cy="30" r="1.3" className="star star-3" />
              <circle cx="350" cy="50" r="0.9" className="star star-4" />
              <circle cx="500" cy="35" r="1.1" className="star star-5" />
              <circle cx="580" cy="60" r="1" className="star star-6" />
              <circle cx="720" cy="80" r="1.2" className="star star-7" />
            </g>

            {/* Day sun */}
            <circle cx="700" cy="50" r="18" className="day-sun" />

            <ellipse cx="400" cy="260" rx="360" ry="90" fill="url(#sky-fade)" />

            <path
              d="M120 200 Q280 140 400 160 T680 190"
              fill="none"
              className="flow-line flow-line-1"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
            <path
              d="M80 230 Q300 180 420 200 T720 220"
              fill="none"
              className="flow-line flow-line-2"
              strokeWidth="1"
              strokeDasharray="4 10"
            />

            <path d="M60 250 L400 170 L740 250 L400 330 Z" className="scene-ground-base" />
            <path d="M60 250 L400 170 L740 250" fill="none" className="scene-ground-edge" strokeWidth="1" />

            <g transform="translate(90, 175)">
              <path d="M0 40 L30 25 L60 40 L30 55 Z" className="factory-top" />
              <path d="M0 40 L0 70 L30 85 L30 55 Z" className="factory-left" />
              <path d="M30 55 L30 85 L60 70 L60 40 Z" className="factory-right" />
              <path d="M45 25 L50 25 L50 10 L55 10 L55 25 L60 25 L52 5 Z" className="factory-chimney" />
              <path d="M10 30 L15 30 L15 15 L20 15 L20 30 L25 30 L17 8 Z" className="factory-chimney" />

              <rect x="4" y="48" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-9" />
              <rect x="4" y="48" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="10" y="56" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-10" />
              <rect x="10" y="56" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="4" y="64" width="4" height="5" rx="0.3" className="building-window-glow" />
              <rect x="4" y="64" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="36" y="52" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-11" />
              <rect x="36" y="52" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="42" y="60" width="4" height="5" rx="0.3" className="building-window-glow" />
              <rect x="42" y="60" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="36" y="68" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-12" />
              <rect x="36" y="68" width="4" height="5" rx="0.3" className="building-window" />

              <g className="smoke-stack smoke-stack-1">
                <ellipse cx="52" cy="0" rx="14" ry="8" fill="url(#smoke-grad)" />
                <ellipse cx="48" cy="-12" rx="18" ry="10" fill="url(#smoke-grad)" opacity="0.7" />
                <ellipse cx="55" cy="-24" rx="22" ry="12" fill="url(#smoke-grad)" opacity="0.4" />
              </g>
              <g className="smoke-stack smoke-stack-2">
                <ellipse cx="17" cy="2" rx="12" ry="7" fill="url(#smoke-grad)" />
                <ellipse cx="14" cy="-10" rx="16" ry="9" fill="url(#smoke-grad)" opacity="0.65" />
                <ellipse cx="20" cy="-22" rx="20" ry="11" fill="url(#smoke-grad)" opacity="0.35" />
              </g>
            </g>

            <g transform="translate(280, 155)">
              <path d="M0 60 L25 45 L50 60 L25 75 Z" className="building-a-top" />
              <path d="M0 60 L0 110 L25 125 L25 75 Z" className="building-a-left" />
              <path d="M25 75 L25 125 L50 110 L50 60 Z" className="building-a-right" />
              <rect x="6" y="82" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-1" />
              <rect x="6" y="82" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="14" y="92" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-2" />
              <rect x="14" y="92" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="6" y="102" width="4" height="5" rx="0.3" className="building-window-glow" />
              <rect x="6" y="102" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="14" y="112" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-3" />
              <rect x="14" y="112" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="32" y="78" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-4" />
              <rect x="32" y="78" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="40" y="88" width="4" height="5" rx="0.3" className="building-window-glow" />
              <rect x="40" y="88" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="32" y="98" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-5" />
              <rect x="32" y="98" width="4" height="5" rx="0.3" className="building-window" />

              <path d="M55 50 L75 38 L95 50 L75 62 Z" className="building-b-top" />
              <path d="M55 50 L55 100 L75 112 L75 62 Z" className="building-b-left" />
              <path d="M75 62 L75 112 L95 100 L95 50 Z" className="building-b-right" />
              <rect x="60" y="68" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-6" />
              <rect x="60" y="68" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="68" y="78" width="4" height="5" rx="0.3" className="building-window-glow" />
              <rect x="68" y="78" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="60" y="88" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-7" />
              <rect x="60" y="88" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="82" y="72" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-8" />
              <rect x="82" y="72" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="88" y="82" width="4" height="5" rx="0.3" className="building-window-glow" />
              <rect x="88" y="82" width="4" height="5" rx="0.3" className="building-window" />
              <rect x="82" y="92" width="4" height="5" rx="0.3" className="building-window-glow window-flicker-1" />
              <rect x="82" y="92" width="4" height="5" rx="0.3" className="building-window" />

              <path d="M100 65 L115 56 L130 65 L115 74 Z" className="building-c-top" />
              <path d="M100 65 L100 95 L115 104 L115 74 Z" className="building-c-left" />
              <path d="M115 74 L115 104 L130 95 L130 65 Z" className="building-c-right" />
              <rect x="104" y="78" width="3.5" height="4.5" rx="0.3" className="building-window-glow window-flicker-2" />
              <rect x="104" y="78" width="3.5" height="4.5" rx="0.3" className="building-window" />
              <rect x="104" y="86" width="3.5" height="4.5" rx="0.3" className="building-window-glow" />
              <rect x="104" y="86" width="3.5" height="4.5" rx="0.3" className="building-window" />
              <rect x="120" y="76" width="3.5" height="4.5" rx="0.3" className="building-window-glow window-flicker-3" />
              <rect x="120" y="76" width="3.5" height="4.5" rx="0.3" className="building-window" />
              <rect x="120" y="84" width="3.5" height="4.5" rx="0.3" className="building-window-glow" />
              <rect x="120" y="84" width="3.5" height="4.5" rx="0.3" className="building-window" />
            </g>

            <g transform="translate(500, 185)">
              <path d="M0 35 L22 22 L44 35 L22 48 Z" className="house-a-top" />
              <path d="M0 35 L0 60 L22 73 L22 48 Z" className="house-a-left" />
              <path d="M22 48 L22 73 L44 60 L44 35 Z" className="house-a-right" />
              <rect x="4" y="42" width="3.5" height="4" rx="0.3" className="building-window-glow window-flicker-4" />
              <rect x="4" y="42" width="3.5" height="4" rx="0.3" className="building-window" />
              <rect x="10" y="50" width="3.5" height="4" rx="0.3" className="building-window-glow" />
              <rect x="10" y="50" width="3.5" height="4" rx="0.3" className="building-window" />
              <rect x="28" y="40" width="3.5" height="4" rx="0.3" className="building-window-glow window-flicker-5" />
              <rect x="28" y="40" width="3.5" height="4" rx="0.3" className="building-window" />
              <rect x="34" y="48" width="3.5" height="4" rx="0.3" className="building-window-glow window-flicker-6" />
              <rect x="34" y="48" width="3.5" height="4" rx="0.3" className="building-window" />

              <path d="M50 40 L65 31 L80 40 L65 49 Z" className="house-b-top" />
              <path d="M50 40 L50 58 L65 67 L65 49 Z" className="house-b-left" />
              <path d="M65 49 L65 67 L80 58 L80 40 Z" className="house-b-right" />
              <rect x="54" y="44" width="3" height="3.5" rx="0.3" className="building-window-glow window-flicker-7" />
              <rect x="54" y="44" width="3" height="3.5" rx="0.3" className="building-window" />
              <rect x="54" y="52" width="3" height="3.5" rx="0.3" className="building-window-glow" />
              <rect x="54" y="52" width="3" height="3.5" rx="0.3" className="building-window" />
              <rect x="70" y="44" width="3" height="3.5" rx="0.3" className="building-window-glow window-flicker-8" />
              <rect x="70" y="44" width="3" height="3.5" rx="0.3" className="building-window" />
              <rect x="70" y="52" width="3" height="3.5" rx="0.3" className="building-window-glow window-flicker-9" />
              <rect x="70" y="52" width="3" height="3.5" rx="0.3" className="building-window" />

              <g className="smoke-stack smoke-stack-3 heating-smoke">
                <ellipse cx="22" cy="18" rx="10" ry="6" fill="url(#smoke-warm)" />
                <ellipse cx="18" cy="8" rx="14" ry="8" fill="url(#smoke-warm)" opacity="0.7" />
                <ellipse cx="25" cy="-2" rx="17" ry="9" fill="url(#smoke-warm)" opacity="0.4" />
              </g>
            </g>

            <g transform="translate(200, 228)">
              <path d="M0 28 L280 8 L360 28 L80 48 Z" className="home-ground" opacity="0.7" />
              <HouseIsometric transform="translate(20, -2)" smokeClass="smoke-stack-home-1" />
              <HouseIsometric transform="translate(148, -8)" smokeClass="smoke-stack-home-2" scale={0.88} />
            </g>

            <g transform="translate(620, 210)">
              <ellipse cx="10" cy="30" rx="8" ry="5" className="tree-crown" />
              <rect x="8" y="30" width="4" height="10" className="tree-trunk" />
              <ellipse cx="35" cy="35" rx="7" ry="4" className="tree-crown" />
              <rect x="33" y="35" width="4" height="8" className="tree-trunk" />
            </g>

            <g transform="translate(370, 115)">
              <path d="M0 50 L18 38 L36 50 L18 62 Z" className="aqi-top" strokeWidth="1.5" />
              <path d="M0 50 L0 75 L18 87 L18 62 Z" className="aqi-left" strokeWidth="1" />
              <path d="M18 62 L18 87 L36 75 L36 50 Z" className="aqi-right" strokeWidth="1" />
              <rect x="4" y="58" width="3" height="4" rx="0.3" className="building-window-glow window-flicker-10" />
              <rect x="4" y="58" width="3" height="4" rx="0.3" className="building-window" />
              <rect x="26" y="56" width="3" height="4" rx="0.3" className="building-window-glow" />
              <rect x="26" y="56" width="3" height="4" rx="0.3" className="building-window" />
              <line x1="18" y1="38" x2="18" y2="18" className="aqi-mast" strokeWidth="2" />
              <circle cx="18" cy="14" r="4" className="aqi-pulse aqi-dot" />
              <circle cx="18" cy="14" r="8" fill="none" className="aqi-ring aqi-ring-stroke" strokeWidth="1" />
              <circle
                cx="18"
                cy="14"
                r="14"
                fill="none"
                className="aqi-ring aqi-ring-delayed aqi-ring-stroke"
                strokeWidth="0.8"
              />
            </g>

            {/* Wind gusts */}
            <g className="wind-gust wind-gust-1" transform="translate(548, 72)">
              <path
                d="M0 16 C14 9, 28 18, 42 11 S 70 14, 98 7"
                className="wind-glow wind-streak wind-streak-a"
              />
              <path
                d="M0 16 C14 9, 28 18, 42 11 S 70 14, 98 7"
                className="wind-streak wind-streak-a"
              />
              <path
                d="M6 26 C22 20, 38 28, 54 22 S 78 26, 102 20"
                className="wind-glow wind-streak wind-streak-b"
              />
              <path
                d="M6 26 C22 20, 38 28, 54 22 S 78 26, 102 20"
                className="wind-streak wind-streak-b"
              />
              <path
                d="M14 36 C28 32, 42 38, 56 34 S 80 38, 96 35"
                className="wind-glow wind-streak wind-streak-c"
              />
              <path
                d="M14 36 C28 32, 42 38, 56 34 S 80 38, 96 35"
                className="wind-streak wind-streak-c"
              />
            </g>
            <g className="wind-gust wind-gust-2" transform="translate(568, 96)">
              <path
                d="M0 14 C16 6, 32 16, 48 9 S 74 12, 104 5"
                className="wind-glow wind-streak wind-streak-a"
              />
              <path
                d="M0 14 C16 6, 32 16, 48 9 S 74 12, 104 5"
                className="wind-streak wind-streak-a"
              />
              <path
                d="M10 24 C26 18, 42 26, 58 20 S 84 24, 108 17"
                className="wind-glow wind-streak wind-streak-b"
              />
              <path
                d="M10 24 C26 18, 42 26, 58 20 S 84 24, 108 17"
                className="wind-streak wind-streak-b"
              />
              <path
                d="M18 34 C32 30, 46 36, 60 32 S 86 36, 100 33"
                className="wind-glow wind-streak wind-streak-c"
              />
              <path
                d="M18 34 C32 30, 46 36, 60 32 S 86 36, 100 33"
                className="wind-streak wind-streak-c"
              />
            </g>
            <g className="wind-gust wind-gust-3 wind-gust-delayed" transform="translate(88, 84)">
              <path
                d="M0 15 C18 7, 34 17, 50 10 S 76 13, 106 6"
                className="wind-glow wind-streak wind-streak-a"
              />
              <path
                d="M0 15 C18 7, 34 17, 50 10 S 76 13, 106 6"
                className="wind-streak wind-streak-a"
              />
              <path
                d="M8 25 C24 19, 40 27, 56 21 S 82 25, 110 18"
                className="wind-glow wind-streak wind-streak-b"
              />
              <path
                d="M8 25 C24 19, 40 27, 56 21 S 82 25, 110 18"
                className="wind-streak wind-streak-b"
              />
              <path
                d="M16 35 C30 31, 44 37, 58 33 S 84 37, 102 34"
                className="wind-glow wind-streak wind-streak-c"
              />
              <path
                d="M16 35 C30 31, 44 37, 58 33 S 84 37, 102 34"
                className="wind-streak wind-streak-c"
              />
            </g>

            <circle cx="320" cy="130" r="2" className="pm-particle pm-particle-1 pm-dot" />
            <circle cx="450" cy="120" r="1.5" className="pm-particle pm-particle-2 pm-dot" />
            <circle cx="520" cy="145" r="2" className="pm-particle pm-particle-3 pm-dot-warm" />
            <circle cx="250" cy="150" r="1.5" className="pm-particle pm-particle-4 pm-dot" />
            <circle cx="580" cy="135" r="2" className="pm-particle pm-particle-5 pm-dot" />
          </svg>

          <div className="absolute bottom-1 left-1 flex flex-wrap gap-1.5 sm:bottom-3 sm:left-3">
            <ThemeButton active={mode === "auto"} onClick={() => setMode("auto")}>
              Авто
            </ThemeButton>
            <ThemeButton active={mode === "day"} onClick={() => setMode("day")} icon={<Sun className="h-3.5 w-3.5" />}>
              Өдөр
            </ThemeButton>
            <ThemeButton
              active={mode === "night"}
              onClick={() => setMode("night")}
              icon={<Moon className="h-3.5 w-3.5" />}
            >
              Шөнө
            </ThemeButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThemeButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium shadow-sm transition sm:px-3 sm:text-sm",
        active
          ? "border-orange-500 bg-orange-500 text-white"
          : "air-pollution-theme-btn border-slate-200 bg-white/90 text-slate-700 hover:bg-white"
      )}
    >
      {icon}
      {children}
    </button>
  );
}
