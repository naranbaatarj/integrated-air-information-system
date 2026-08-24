import Link from "next/link";
import {
  ArrowRight,
  Flame,
  HeartPulse,
  Percent,
  Skull,
  TrendingUp,
} from "lucide-react";
import type { CoHomeSnapshot } from "@/lib/co-poisoning-home";
import { cn } from "@/lib/utils";

export function CoHomeSnapshotSection({ data }: { data: CoHomeSnapshot }) {
  const highlight =
    data.yearStats.total > 0
      ? {
          label: `${data.currentYear} он`,
          total: data.yearStats.total,
          deaths: data.yearStats.deaths,
          rate: data.yearStats.deathRate,
        }
      : {
          label: "Нийт",
          total: data.stats.total,
          deaths: data.stats.deaths,
          rate: data.stats.deathRate,
        };

  const maxYearCases = Math.max(...data.yearly.map((y) => y.cases), 1);

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_20%,rgba(14,165,233,0.12),transparent),radial-gradient(ellipse_70%_50%_at_90%_80%,rgba(249,115,22,0.10),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold tracking-wide text-orange-600">
              Угаарын хийн хордлого
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Товч статистик
            </h2>
            <p className="mt-2 text-slate-600">
              Бүртгэгдсэн тохиолдлын тойм. Дэлгэрэнгүй график, байршил, шалтгааныг
              тусгай хуудаснаас үзнэ үү.
            </p>
          </div>
          <Link
            href="/co-poisoning"
            className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Дэлгэрэнгүй үзэх
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-5">
            <StatTile
              icon={HeartPulse}
              label={`${highlight.label} · тохиолдол`}
              value={highlight.total}
              className="bg-sky-500 text-white sm:col-span-1"
              iconClass="bg-white/20"
            />
            <StatTile
              icon={Skull}
              label="Нас баралт"
              value={highlight.deaths}
              className="bg-rose-500 text-white"
              iconClass="bg-white/20"
            />
            <StatTile
              icon={Percent}
              label="Нас баралтын хувь"
              value={`${highlight.rate}%`}
              className="bg-orange-500 text-white"
              iconClass="bg-white/20"
            />
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur sm:col-span-3">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                <TrendingUp className="h-4 w-4 text-teal-600" />
                Сүүлийн жилүүд
              </div>
              <div className="flex h-28 items-end gap-2">
                {data.yearly.map((row) => (
                  <div key={row.label} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-slate-500">
                      {row.cases}
                    </span>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-sky-600 to-teal-400 transition"
                      style={{
                        height: `${Math.max(12, (row.cases / maxYearCases) * 100)}%`,
                      }}
                      title={`${row.label}: ${row.cases} тохиолдол, ${row.deaths} нас баралт`}
                    />
                    <span className="text-[10px] text-slate-500">{row.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)] backdrop-blur lg:col-span-7">
            <div className="mb-5 flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Түгээмэл шалтгаан
              </h3>
            </div>

            {data.topCauses.length === 0 ? (
              <p className="text-sm text-slate-500">Шалтгааны мэдээлэл байхгүй.</p>
            ) : (
              <ul className="space-y-4">
                {data.topCauses.map((cause) => (
                  <li key={cause.name}>
                    <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-slate-800">{cause.name}</span>
                      <span className="tabular-nums text-slate-500">
                        {cause.value} · {cause.percent}%
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.max(4, cause.percent)}%`,
                          background: cause.color,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
              <p className="text-sm text-slate-500">
                Нийт{" "}
                <span className="font-semibold text-slate-800">{data.stats.total}</span>{" "}
                тохиолдол бүртгэгдсэн
              </p>
              <Link
                href="/co-poisoning"
                className="text-sm font-semibold text-sky-700 hover:text-sky-800"
              >
                Бүх график харах →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  className,
  iconClass,
}: {
  icon: typeof HeartPulse;
  label: string;
  value: string | number;
  className?: string;
  iconClass?: string;
}) {
  return (
    <div className={cn("rounded-2xl p-4 shadow-sm", className)}>
      <span
        className={cn(
          "mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl",
          iconClass
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-xs font-medium opacity-90">{label}</p>
    </div>
  );
}
