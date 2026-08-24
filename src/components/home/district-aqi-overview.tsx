import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { AQI_COLORS, AQI_LABELS } from "@/lib/aqi";
import type { StationSnapshot } from "@/lib/aqi-types";
import { cn } from "@/lib/utils";

const VALUE_COLORS: Record<string, string> = {
  GOOD: "text-emerald-700 bg-emerald-50",
  MODERATE: "text-yellow-800 bg-yellow-50",
  UNHEALTHY_SENSITIVE: "text-orange-700 bg-orange-50",
  UNHEALTHY: "text-orange-700 bg-orange-50",
  VERY_UNHEALTHY: "text-red-800 bg-red-50",
  HAZARDOUS: "text-rose-900 bg-rose-50",
};

const STATION_POSITIONS = [
  { left: "18%", top: "28%", scale: 1 },
  { left: "42%", top: "46%", scale: 1.18 },
  { right: "19%", top: "30%", scale: 1 },
  { right: "31%", bottom: "18%", scale: 1 },
  { left: "27%", bottom: "14%", scale: 1 },
];

export function DistrictAqiOverview({ stations }: { stations: StationSnapshot[] }) {
  if (stations.length === 0) return null;

  return (
    <section className="px-4 py-16 sm:px-5 sm:py-[74px]" aria-labelledby="district-title">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1.5 text-[13px] font-extrabold uppercase tracking-wider text-cyan-700">
              Байршлаар харах
            </p>
            <h2 id="district-title" className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Дүүргүүдийн агаарын чанар
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Ойр орчмын хэмжилтийн станцыг сонгож, AQI болон нарийн ширхэгт тоосонцрын
              мэдээллийг харьцуулна.
            </p>
          </div>
          <Link
            href="/air-quality"
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-cyan-700 hover:text-cyan-800"
          >
            Бүх станц харах
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-cyan-50 to-slate-50 shadow-sm lg:min-h-[430px]"
            role="img"
            aria-label="Улаанбаатар хотын хэмжилтийн станцын зураглал"
          >
            <div className="absolute left-4 right-4 top-4 z-10 flex flex-wrap gap-2 sm:left-[18px] sm:right-[18px]">
              <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 text-[13px] font-bold shadow-sm">
                <MapPin className="h-4 w-4 text-cyan-700" />
                Улаанбаатар
              </span>
              <span className="inline-flex min-h-10 items-center rounded-xl border border-slate-200 bg-white/90 px-3 text-[13px] font-bold shadow-sm">
                AQI ▾
              </span>
            </div>

            <div className="absolute inset-x-8 bottom-6 top-16">
              {stations.slice(0, 5).map((station, i) => {
                const pos = STATION_POSITIONS[i];
                const colors = AQI_COLORS[station.level];
                return (
                  <span
                    key={station.id}
                    className={cn(
                      "absolute flex h-11 w-11 items-center justify-center rounded-full border-[5px] border-white text-[11px] font-extrabold text-white shadow-md",
                      colors.bg
                    )}
                    style={{
                      left: "left" in pos ? pos.left : undefined,
                      right: "right" in pos ? pos.right : undefined,
                      top: "top" in pos ? pos.top : undefined,
                      bottom: "bottom" in pos ? pos.bottom : undefined,
                      transform: `scale(${pos.scale})`,
                    }}
                  >
                    {station.aqi}
                  </span>
                );
              })}
            </div>

            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-[11px] font-bold">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Сайн
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-yellow-500" /> Дунд
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-orange-600" /> Бохирдолтой
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {stations.map((station) => (
              <article
                key={station.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-[17px] text-xl font-extrabold",
                    VALUE_COLORS[station.level]
                  )}
                >
                  {station.aqi}
                </div>
                <div>
                  <strong className="block text-sm text-slate-900">{station.name}</strong>
                  <p className="mt-0.5 text-xs text-slate-500">PM2.5 · {station.pm25} µg/m³</p>
                </div>
                <div className="text-right">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-1 text-[11px] font-extrabold",
                      VALUE_COLORS[station.level]
                    )}
                  >
                    {AQI_LABELS[station.level]}
                  </span>
                  <small className="mt-1 block text-[11px] text-slate-400">
                    {station.updatedLabel}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
