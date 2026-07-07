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
        "inline-flex rounded-full px-3 py-1 text-sm font-medium text-white",
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
    <div className={cn("overflow-hidden rounded-2xl border-2 bg-white shadow-lg", colors.border)}>
      <div className={cn("px-6 py-8 text-white", colors.bg)}>
        <p className="text-sm font-medium opacity-90">{location} · {date}</p>
        <div className="mt-4 flex items-end gap-4">
          <span className="text-6xl font-bold">{aqi}</span>
          <div>
            <p className="text-lg font-semibold">AQI</p>
            <p className="text-sm opacity-90">Агаарын чанарын индекс</p>
          </div>
        </div>
        <div className="mt-4">
          <AqiBadge level={level} className="bg-white/20 backdrop-blur" />
        </div>
      </div>
      <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="PM2.5" value={`${pm25} µg/m³`} />
        <Metric label="PM10" value={`${pm10} µg/m³`} />
        <Metric
          label="Температур"
          value={temperature != null ? `${temperature}°C` : "—"}
        />
        <Metric label="Чийгшил" value={humidity != null ? `${humidity}%` : "—"} />
      </div>
      <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
        <p className="text-sm font-medium text-slate-700">Зөвлөмж</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{recommendation}</p>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export function AqiLegend() {
  const levels = Object.entries(AQI_LABELS) as [AirQualityLevel, string][];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="mb-3 font-semibold text-slate-900">AQI ангилал</h3>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map(([level, label]) => (
          <div key={level} className="flex items-center gap-2 text-sm">
            <span className={cn("h-3 w-3 rounded-full", AQI_COLORS[level].bg)} />
            <span className="text-slate-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
