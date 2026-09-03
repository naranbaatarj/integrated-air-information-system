"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Baby,
  Flame,
  HeartPulse,
  Percent,
  ShieldAlert,
  Skull,
  Users,
} from "lucide-react";
import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";
import type { CoPoisoningOptionsByCategory } from "@/lib/co-poisoning-options";
import {
  defaultDashboardFilter,
  type DashboardFilter,
} from "@/lib/co-poisoning-analytics";
import { CoPoisoningCharts } from "@/components/co-poisoning/charts";
import { CoPoisoningFilters } from "@/components/co-poisoning/co-poisoning-filters";
import { CoPoisoningRecordsTable } from "@/components/co-poisoning/co-poisoning-records-table";
import {
  CO_SAFETY_TIPS,
  computePublicStats,
} from "@/lib/co-poisoning-public";
import {
  applyPublicFilter,
  buildCauseOptions,
  buildDistrictOptions,
  buildKhorooOptions,
  buildOutcomeOptions,
  buildSeverityOptions,
  granularityFromFilter,
  parseFilterState,
  resolveDateRange,
} from "@/lib/co-poisoning-filters";
import { cn } from "@/lib/utils";

export function CoPublicDashboard({
  cases,
  deathCodes,
  options,
}: {
  cases: CoPoisoningCaseDto[];
  deathCodes: number[];
  options: CoPoisoningOptionsByCategory;
}) {
  const searchParams = useSearchParams();
  const publicFilter = useMemo(
    () => parseFilterState(searchParams),
    [searchParams]
  );
  const districts = useMemo(() => buildDistrictOptions(cases), [cases]);
  const khoroos = useMemo(() => buildKhorooOptions(), []);
  const outcomes = useMemo(() => buildOutcomeOptions(options), [options]);
  const causes = useMemo(() => buildCauseOptions(options, cases), [cases, options]);
  const severities = useMemo(() => buildSeverityOptions(options), [options]);

  const filteredCases = useMemo(
    () => applyPublicFilter(cases, publicFilter),
    [cases, publicFilter]
  );

  const derivedGranularity = granularityFromFilter(publicFilter);
  const [granularity, setGranularity] = useState(derivedGranularity);

  useEffect(() => {
    setGranularity(derivedGranularity);
  }, [derivedGranularity]);

  const range = resolveDateRange(publicFilter);
  const chartFilter: DashboardFilter = {
    ...defaultDashboardFilter(),
    timeMode: "range",
    dateFrom: range.from,
    dateTo: range.to,
    cause: "all",
    granularity,
  };

  const stats = useMemo(
    () => computePublicStats(filteredCases, deathCodes),
    [filteredCases, deathCodes]
  );

  return (
    <div className="space-y-8">
      <CoPoisoningFilters
        resultCount={filteredCases.length}
        cases={cases}
        districts={districts}
        khoroos={khoroos}
        outcomes={outcomes}
        causes={causes}
        severities={severities}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatTile
          icon={HeartPulse}
          label="Нийт тохиолдол"
          value={stats.total}
          tone="bg-sky-50 text-sky-700 ring-sky-100"
          iconBg="bg-sky-100 text-sky-600"
        />
        <StatTile
          icon={Skull}
          label="Нийт нас баралт (Шүүх шинжилгээний ерөнхий газраар баталгаажсан тоон мэдээлэл)"
          value={stats.deaths}
          tone="bg-rose-50 text-rose-700 ring-rose-100"
          iconBg="bg-rose-100 text-rose-600"
        />
        <StatTile
          icon={Percent}
          label="Нас баралтын хувь"
          value={`${stats.deathRate}%`}
          tone="bg-amber-50 text-amber-800 ring-amber-100"
          iconBg="bg-amber-100 text-amber-700"
        />
        <StatTile
          icon={Users}
          label="Эрэгтэй"
          value={stats.male}
          tone="bg-cyan-50 text-cyan-800 ring-cyan-100"
          iconBg="bg-cyan-100 text-cyan-700"
        />
        <StatTile
          icon={Users}
          label="Эмэгтэй"
          value={stats.female}
          tone="bg-pink-50 text-pink-800 ring-pink-100"
          iconBg="bg-pink-100 text-pink-600"
        />
        <StatTile
          icon={Baby}
          label="Хүүхэд (<18)"
          value={stats.children}
          tone="bg-emerald-50 text-emerald-800 ring-emerald-100"
          iconBg="bg-emerald-100 text-emerald-700"
        />
      </div>

      <CoPoisoningCharts
        cases={cases}
        filteredCases={filteredCases}
        filter={chartFilter}
        onFilterChange={(next) => setGranularity(next.granularity)}
        deathCodes={deathCodes}
        options={options}
      />

      <CoPoisoningRecordsTable
        cases={filteredCases}
        outcomes={outcomes}
        options={options}
      />

      <SafetySection />
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  tone,
  iconBg,
}: {
  icon: typeof HeartPulse;
  label: string;
  value: string | number;
  tone: string;
  iconBg: string;
}) {
  return (
    <div className={cn("rounded-2xl p-4 ring-1", tone)}>
      <span
        className={cn(
          "mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl",
          iconBg
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-xs font-medium opacity-80">{label}</p>
    </div>
  );
}

function SafetySection() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr] lg:p-10">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-sm font-medium text-amber-200 ring-1 ring-amber-400/30">
            <ShieldAlert className="h-4 w-4" />
            Урьдчилан сэргийлэх
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Угаарын хийнээс өөрийгөө хамгаалаарай
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
            Угаарын хий (CO) өнгө, үнэргүй тул аюулыг мэдрэхэд хэцүү. Зөв
            галлагаа, агааржуулалт, мэдрэгч нь амь насыг хамгаална.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-amber-200">
            <Flame className="h-5 w-5" />
            Яаралтай үед 103 руу залгана
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {CO_SAFETY_TIPS.map((tip) => (
            <div
              key={tip.title}
              className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur"
            >
              <h3 className="font-semibold text-sky-100">{tip.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
