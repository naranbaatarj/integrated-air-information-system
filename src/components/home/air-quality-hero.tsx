import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  FileText,
  Info,
  MessageSquare,
  Shield,
} from "lucide-react";
import { AqiSummaryCard } from "@/components/home/aqi-summary-card";
import { formatMeasuredAt } from "@/lib/aqi-format";
import type { AqiSnapshot } from "@/lib/aqi-types";

export function AirQualityHero({ snapshot }: { snapshot: AqiSnapshot }) {
  const updateLabel =
    snapshot.displayState === "live" || snapshot.freshness === "live"
      ? "Мэдээлэл саяхан шинэчлэгдсэн"
      : snapshot.measuredAt
        ? `Хэмжилт: ${formatMeasuredAt(snapshot.measuredAt)}`
        : "Мэдээлэл шинэчлэгдээгүй";

  return (
    <section
      className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#f7fcfd] to-[#edf7f9] px-4 py-10 sm:px-5 sm:py-14"
      aria-labelledby="hero-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #bfd4de 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            {updateLabel}
          </p>
          <h1
            id="hero-title"
            className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--ink-950)] sm:text-5xl lg:text-6xl"
          >
            Өнөөдөр амьсгалж буй{" "}
            <span className="text-cyan-700">агаараа мэдээрэй</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Улаанбаатар хотын агаарын чанар, PM2.5 болон эрүүл мэндийн зөвлөмжийг нэг
            дороос ойлгомжтой, хурдан аваарай.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/air-quality"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-800 sm:w-auto"
            >
              Агаарын чанар харах
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guidelines"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-300 sm:w-auto"
            >
              <Shield className="h-4 w-4 text-cyan-700" />
              Өөрийгөө хамгаалах
            </Link>
          </div>
          <div className="mt-5 flex flex-col gap-2 text-sm text-cyan-800 sm:flex-row sm:gap-5">
            <Link href="/air-quality" className="inline-flex items-center gap-1.5 hover:underline">
              <BarChart3 className="h-4 w-4" />
              Хэмжилтийн станцын мэдээлэл
            </Link>
            <Link href="/air-quality" className="inline-flex items-center gap-1.5 hover:underline">
              <Info className="h-4 w-4" />
              AQI 0–500 ангиллаар
            </Link>
          </div>
        </div>
        <AqiSummaryCard snapshot={snapshot} />
      </div>
    </section>
  );
}
