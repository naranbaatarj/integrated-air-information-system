"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  Baby,
  Flame,
  HeartPulse,
  Percent,
  Skull,
  Users,
} from "lucide-react";
import { CoHomePreviewCharts } from "@/components/co-poisoning/charts/overview-charts";
import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";
import type { CoPoisoningOptionsByCategory } from "@/lib/co-poisoning-options";
import { caseYear } from "@/lib/co-poisoning-analytics";
import { computePublicStats } from "@/lib/co-poisoning-public";
import { cn } from "@/lib/utils";

export function CoHomePreview({
  cases,
  deathCodes,
  options,
}: {
  cases: CoPoisoningCaseDto[];
  deathCodes: number[];
  options: CoPoisoningOptionsByCategory;
}) {
  const currentYear = new Date().getFullYear();
  const yearCases = useMemo(
    () => cases.filter((c) => caseYear(c) === currentYear),
    [cases, currentYear]
  );

  const stats = useMemo(
    () => computePublicStats(cases, deathCodes),
    [cases, deathCodes]
  );
  const yearStats = useMemo(
    () => computePublicStats(yearCases, deathCodes),
    [yearCases, deathCodes]
  );

  const highlight =
    yearStats.total > 0
      ? { label: `${currentYear} он`, ...yearStats }
      : { label: "Нийт", ...stats };

  const causeLabels = useMemo(() => {
    const fromOptions = options.CAUSE.map((o) => o.label);
    const fromData = Array.from(
      new Set(cases.map((c) => c.cause?.trim()).filter(Boolean) as string[])
    );
    return Array.from(new Set([...fromOptions, ...fromData]));
  }, [options.CAUSE, cases]);

  return (
    <section
      id="co-poisoning"
      className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-b from-slate-50 via-white to-orange-50/40 px-4 py-16 sm:px-5 sm:py-[74px]"
      aria-labelledby="co-poisoning-title"
    >
      <div
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-cyan-200/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-1.5 inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wider text-orange-600">
              <Flame className="h-4 w-4" aria-hidden="true" />
              Угаарын хийн хордлого
            </p>
            <h2
              id="co-poisoning-title"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              Товч статистик
            </h2>
            <p className="mt-2 text-slate-600">
              Гол үзүүлэлтүүд болон 4 график. Бүх шүүлтүүр, байршил, календарийн
              дэлгэрэнгүйг тусдаа хуудаснаас үзнэ үү.
            </p>
          </div>
          <Link
            href="/co-poisoning"
            className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
          >
            Дэлгэрэнгүй үзэх
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatPill
            icon={HeartPulse}
            label={`${highlight.label} · тохиолдол`}
            value={highlight.total}
            tone="border-sky-200 bg-sky-50 text-sky-800"
            iconTone="bg-sky-100 text-sky-600"
          />
          <StatPill
            icon={Skull}
            label="Нас баралт"
            value={highlight.deaths}
            tone="border-rose-200 bg-rose-50 text-rose-800"
            iconTone="bg-rose-100 text-rose-600"
          />
          <StatPill
            icon={Percent}
            label="Нас баралтын хувь"
            value={`${highlight.deathRate}%`}
            tone="border-amber-200 bg-amber-50 text-amber-900"
            iconTone="bg-amber-100 text-amber-700"
          />
          <StatPill
            icon={Users}
            label="Хүүхэд (<18)"
            value={stats.children}
            tone="border-emerald-200 bg-emerald-50 text-emerald-800"
            iconTone="bg-emerald-100 text-emerald-600"
            extra={
              <span className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                <Baby className="h-3 w-3" />
                Эмэгтэй {stats.female} · Эрэгтэй {stats.male}
              </span>
            }
          />
        </div>

        <CoHomePreviewCharts
          cases={cases}
          deathCodes={deathCodes}
          causeLabels={causeLabels}
        />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <p className="text-sm text-slate-600">
            Нийт{" "}
            <strong className="font-bold text-slate-900">{stats.total}</strong> тохиолдол
            бүртгэгдсэн. Байршил, насны бүлэг, календарийн дулааны зураг зэрэг бүх
            графикийг нэг дороос харна.
          </p>
          <Link
            href="/co-poisoning"
            className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-cyan-800 transition hover:border-cyan-200 hover:bg-cyan-50"
          >
            Бүх график харах
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatPill({
  icon: Icon,
  label,
  value,
  tone,
  iconTone,
  extra,
}: {
  icon: typeof HeartPulse;
  label: string;
  value: string | number;
  tone: string;
  iconTone: string;
  extra?: ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl border p-4 shadow-sm", tone)}>
      <span
        className={cn(
          "mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl",
          iconTone
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <p className="text-2xl font-extrabold tracking-tight">{value}</p>
      <p className="mt-0.5 text-xs font-semibold opacity-80">{label}</p>
      {extra}
    </div>
  );
}
