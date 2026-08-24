import { AQI_COLORS, AQI_LABELS } from "@/lib/aqi";
import type { AirQualityLevel } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

export function AqiBadge({
  level,
  className,
}: {
  level: AirQualityLevel;
  className?: string;
}) {
  const colors = AQI_COLORS[level];
  return (
    <span
      className={cn(
        "inline-flex rounded-lg px-3 py-1 text-sm font-semibold text-white",
        colors.bg,
        className
      )}
    >
      {AQI_LABELS[level]}
    </span>
  );
}

export function AqiCard({
  aqi,
  level,
  location,
  date,
  pm25,
  pm10,
  temperature,
  humidity,
  recommendation,
}: {
  aqi: number;
  level: AirQualityLevel;
  location: string;
  date: string;
  pm25: number;
  pm10: number;
  temperature?: number | null;
  humidity?: number | null;
  recommendation: string;
}) {
  const colors = AQI_COLORS[level];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-white/40 bg-white shadow-[0_30px_60px_-28px_rgba(15,23,42,0.45)] ring-1 ring-black/5",
        colors.border
      )}
    >
      <div className={cn("relative px-6 py-8 text-white", colors.bg)}>
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-10 right-10 h-24 w-24 rounded-full bg-white/10" />
        <p className="relative text-sm font-medium opacity-90">
          {location} · {date}
        </p>
        <div className="relative mt-4 flex items-end gap-4">
          <span className="text-6xl font-bold tracking-tight">{aqi}</span>
          <div className="pb-1">
            <p className="text-lg font-semibold">AQI</p>
            <p className="text-sm opacity-90">Агаарын чанарын индекс</p>
          </div>
        </div>
        <div className="relative mt-4">
          <AqiBadge level={level} className="bg-white/20 backdrop-blur" />
        </div>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="PM2.5" value={`${pm25} µg/m³`} />
        <Metric label="PM10" value={`${pm10} µg/m³`} />
        <Metric
          label="Температур"
          value={temperature != null ? `${temperature}°C` : "—"}
        />
        <Metric label="Чийгшил" value={humidity != null ? `${humidity}%` : "—"} />
      </div>
      <div className="border-t border-slate-100 bg-gradient-to-r from-slate-50 to-sky-50/50 px-6 py-4">
        <p className="text-sm font-semibold text-slate-700">Зөвлөмж</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{recommendation}</p>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50/90 p-3.5 ring-1 ring-slate-100">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}

export function AqiLegend() {
  const levels = Object.entries(AQI_LABELS) as [AirQualityLevel, string][];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <h3 className="mb-3 font-semibold text-slate-900">AQI ангилал</h3>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map(([level, label]) => (
          <div key={level} className="flex items-center gap-2 text-sm">
            <span className={cn("h-3 w-3 rounded-md", AQI_COLORS[level].bg)} />
            <span className="text-slate-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
