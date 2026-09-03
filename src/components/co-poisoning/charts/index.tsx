"use client";

import { useMemo } from "react";
import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";
import type { CoPoisoningOptionsByCategory } from "@/lib/co-poisoning-options";
import { type DashboardFilter } from "@/lib/co-poisoning-analytics";
import { OverviewCharts } from "./overview-charts";
import { CalendarHeatmap } from "./calendar-heatmap";
import { LocationMaps } from "./location-maps";
import { LocationCharts } from "./location-charts";
import { cn } from "@/lib/utils";

const GRANULARITY_OPTIONS: { value: DashboardFilter["granularity"]; label: string }[] = [
  { value: "year", label: "Жилээр" },
  { value: "month", label: "Сараар" },
  { value: "day", label: "Өдрөөр" },
];

export function CoPoisoningCharts({
  cases,
  filteredCases,
  filter,
  onFilterChange,
  deathCodes,
  options,
}: {
  cases: CoPoisoningCaseDto[];
  filteredCases: CoPoisoningCaseDto[];
  filter: DashboardFilter;
  onFilterChange: (next: DashboardFilter) => void;
  deathCodes: number[];
  options: CoPoisoningOptionsByCategory;
}) {
  const causeLabels = useMemo(() => {
    const fromOptions = options.CAUSE.map((o) => o.label);
    const fromData = Array.from(
      new Set(cases.map((c) => c.cause?.trim()).filter(Boolean) as string[])
    );
    return Array.from(new Set([...fromOptions, ...fromData]));
  }, [options.CAUSE, cases]);

  const conditionLabels = options.PHYSICAL_CONDITION.map((o) => o.label);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-600">Графикийн хугацааны нэгж</p>
        <div
          role="group"
          aria-label="Графикийн хугацааны нэгж"
          className="flex gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1"
        >
          {GRANULARITY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={filter.granularity === option.value}
              onClick={() => onFilterChange({ ...filter, granularity: option.value })}
              className={cn(
                "min-h-8 rounded-lg px-3 text-xs font-extrabold",
                filter.granularity === option.value
                  ? "bg-white text-teal-800 shadow-sm"
                  : "text-slate-500 hover:bg-white/70"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <OverviewCharts
        cases={filteredCases}
        deathCodes={deathCodes}
        filter={filter}
        causeLabels={causeLabels}
      />
      <CalendarHeatmap cases={filteredCases} deathCodes={deathCodes} />
      <LocationMaps cases={filteredCases} deathCodes={deathCodes} />
      <LocationCharts
        cases={filteredCases}
        deathCodes={deathCodes}
        conditionLabels={conditionLabels}
      />
    </div>
  );
}
