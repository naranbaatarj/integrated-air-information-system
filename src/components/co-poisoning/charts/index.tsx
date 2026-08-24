"use client";

import { useMemo } from "react";
import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";
import type { CoPoisoningOptionsByCategory } from "@/lib/co-poisoning-options";
import {
  caseYear,
  type DashboardFilter,
} from "@/lib/co-poisoning-analytics";
import { DashboardFilters } from "./dashboard-filters";
import { OverviewCharts } from "./overview-charts";
import { CalendarHeatmap } from "./calendar-heatmap";
import { LocationCharts } from "./location-charts";

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
  const years = useMemo(() => {
    const set = new Set(cases.map(caseYear));
    return Array.from(set).sort((a, b) => b - a);
  }, [cases]);

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
      <DashboardFilters
        filter={filter}
        onChange={onFilterChange}
        years={years}
        causes={causeLabels}
        resultCount={filteredCases.length}
      />
      <OverviewCharts
        cases={filteredCases}
        deathCodes={deathCodes}
        filter={filter}
        causeLabels={causeLabels}
      />
      <CalendarHeatmap cases={filteredCases} deathCodes={deathCodes} />
      <LocationCharts
        cases={filteredCases}
        deathCodes={deathCodes}
        conditionLabels={conditionLabels}
      />
    </div>
  );
}
