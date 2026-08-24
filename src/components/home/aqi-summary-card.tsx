import Link from "next/link";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Heart,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { AQI_COLORS, AQI_LABELS } from "@/lib/aqi";
import { formatMeasuredAt } from "@/lib/aqi-format";
import type { AqiSnapshot } from "@/lib/aqi-types";
import { cn } from "@/lib/utils";

const GRADIENTS: Record<string, string> = {
  GOOD: "from-emerald-600 to-emerald-700",
  MODERATE: "from-yellow-500 to-amber-500",
  UNHEALTHY_SENSITIVE: "from-orange-500 to-orange-600",
  UNHEALTHY: "from-orange-600 to-red-700",
  VERY_UNHEALTHY: "from-red-600 to-purple-700",
  HAZARDOUS: "from-purple-800 to-rose-950",
};

function FreshnessBadge({ snapshot }: { snapshot: AqiSnapshot }) {
  if (snapshot.displayState === "empty") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white">
        Мэдээлэл алга
      </span>
    );
  }
  if (snapshot.displayState === "error") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white">
        <AlertCircle className="h-3 w-3" />
        Алдаа
      </span>
    );
  }
  if (snapshot.displayState === "stale" || snapshot.freshness === "stale") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/90 px-2.5 py-1 text-[11px] font-bold text-amber-950">
        Хуучирсан
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white">
      <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.15)]" />
      Шууд
    </span>
  );
}

function AqiGauge({ aqi }: { aqi: number }) {
  const pct = Math.min(100, Math.max(0, (aqi / 500) * 100));
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px] font-semibold text-white/75">
        <span>Сайн</span>
        <span>Аюултай</span>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-white/20">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #48a868 0%, #d4a32c 25%, #c85d18 50%, #ae3f16 75%, #7b1a3a 100%)",
          }}
        />
        <span
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-white shadow-md"
          style={{ left: `${pct}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function AqiSummaryCard({ snapshot }: { snapshot: AqiSnapshot }) {
  if (snapshot.displayState === "empty") {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg">
        <p className="text-lg font-semibold text-slate-900">
          Өнөөдрийн агаарын чанарын мэдээлэл одоогоор байхгүй байна.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Сүүлд амжилттай шинэчлэгдсэн: {formatMeasuredAt(snapshot.fetchedAt)}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/air-quality"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-700 px-4 text-sm font-bold text-white"
          >
            Түүхэн мэдээлэл харах
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (snapshot.displayState === "error") {
    return (
      <div className="rounded-[28px] border border-red-200 bg-red-50 p-8">
        <p className="text-lg font-semibold text-red-900">
          Агаарын чанарын мэдээлэл ачаалахад алдаа гарлаа.
        </p>
        <p className="mt-2 text-sm text-red-700">
          Дахин оролдоно уу эсвэл холбоо барих хэсэгт хандаарай.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-red-800 px-4 text-sm font-bold text-white"
        >
          Холбоо барих
        </Link>
      </div>
    );
  }

  const level = snapshot.level!;
  const gradient = GRADIENTS[level] ?? GRADIENTS.UNHEALTHY;
  const label = AQI_LABELS[level];

  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-white p-1.5 shadow-[0_18px_60px_rgba(8,54,72,0.14)]">
      <article
        className={cn("overflow-hidden rounded-[22px] bg-gradient-to-br text-white", gradient)}
        aria-label="Өнөөдрийн агаарын чанарын хураангуй"
      >
        <div className="flex items-start justify-between gap-3 px-5 pb-2 pt-5 sm:px-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/75">
              {snapshot.isToday ? "Өнөөдрийн агаар" : "Хамгийн сүүлийн хэмжилт"}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-lg font-bold">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {snapshot.locationName}
            </p>
          </div>
          <FreshnessBadge snapshot={snapshot} />
        </div>

        <div className="grid gap-5 px-5 pb-5 sm:grid-cols-2 sm:px-6">
          <div>
            <div className="flex items-end gap-2">
              <span className="text-7xl font-extrabold leading-none tracking-tight sm:text-8xl">
                {snapshot.aqi}
              </span>
              <span className="pb-2 text-lg font-bold opacity-90">AQI</span>
            </div>
            <p className="mt-1 text-xl font-bold">{label}</p>
            <p className="mt-1 text-sm text-white/80">
              {!snapshot.isToday
                ? "Өнөөдрийн мэдээлэл байхгүй — хамгийн сүүлийн хэмжилт"
                : snapshot.freshness === "stale"
                  ? "Мэдээлэл хуучирсан байж болзошгүй"
                  : "Бүх иргэдэд нөлөөлж болзошгүй"}
            </p>
          </div>
          <div className="flex flex-col justify-end">
            <AqiGauge aqi={snapshot.aqi!} />
            <p className="mt-2 text-xs text-white/75">
              Мэдрэмтгий бүлэг гадаах идэвхээ хязгаарлана.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-white/15 sm:grid-cols-4">
          <Metric label="PM2.5" value={snapshot.pm25 != null ? `${snapshot.pm25} µg/m³` : "—"} />
          <Metric label="PM10" value={snapshot.pm10 != null ? `${snapshot.pm10} µg/m³` : "—"} />
          <Metric
            label="Температур"
            value={snapshot.temperature != null ? `${snapshot.temperature}°C` : "—"}
          />
          <Metric
            label="Чийгшил"
            value={snapshot.humidity != null ? `${snapshot.humidity}%` : "—"}
          />
        </div>
      </article>

      <div className="grid gap-3 px-4 py-3 text-xs text-slate-600 sm:grid-cols-3">
        <p>
          <span className="font-semibold text-slate-700">Хэмжсэн:</span>{" "}
          {formatMeasuredAt(snapshot.measuredAt)}
        </p>
        <p>
          <span className="font-semibold text-slate-700">Шинэчлэгдсэн:</span>{" "}
          {formatMeasuredAt(snapshot.fetchedAt)}
        </p>
        <p>
          <span className="font-semibold text-slate-700">Эх сурвалж:</span>{" "}
          {snapshot.sourceName}
        </p>
      </div>

      {snapshot.recommendation && (
        <div className="mx-1.5 mb-1.5 grid gap-3 rounded-2xl border border-amber-100 bg-amber-50/90 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <Heart className="h-5 w-5 text-amber-700" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-slate-900">Өнөөдрийн эрүүл мэндийн зөвлөмж</p>
            <p className="mt-0.5 text-sm text-slate-600">{snapshot.recommendation}</p>
          </div>
          <Link
            href="/guidelines"
            className="text-sm font-bold text-cyan-700 hover:text-cyan-800"
          >
            Дэлгэрэнгүй →
          </Link>
        </div>
      )}

      {snapshot.displayState === "stale" && (
        <div className="mx-1.5 mb-1.5 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertCircle className="h-4 w-4 text-amber-700" />
          <p className="flex-1 text-sm text-amber-900">
            Энэ мэдээлэл хуучирсан байж болзошгүй. Шинэчлэлт хүлээгдэж байна.
          </p>
          <Link
            href="/air-quality"
            className="inline-flex min-h-9 items-center gap-1 rounded-lg bg-amber-700 px-3 text-xs font-bold text-white"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Дахин шалгах
          </Link>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-white/15 px-4 py-3 [&:not(:first-child)]:border-l max-sm:[&:nth-child(odd)]:border-l-0 max-sm:[&:nth-child(n+3)]:border-t">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">{label}</p>
      <p className="mt-0.5 text-base font-bold">{value}</p>
    </div>
  );
}

export function AqiSummaryCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[28px] border border-slate-200 bg-white p-8" role="status" aria-live="polite">
      <p className="sr-only">Шинэ мэдээлэл авч байна</p>
      <div className="h-6 w-40 rounded-lg bg-slate-200" />
      <div className="mt-6 h-24 rounded-2xl bg-slate-200" />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}

export function AqiStatusPill({ snapshot }: { snapshot: AqiSnapshot }) {
  if (!snapshot.level || snapshot.aqi == null) return null;
  const colors = AQI_COLORS[snapshot.level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
        colors.bg,
        "text-white"
      )}
    >
      <Activity className="h-3 w-3" />
      AQI {snapshot.aqi}
    </span>
  );
}
