"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";
import {
  calendarHeatmap,
  caseYear,
  daysInMonth,
  downloadCsv,
  filterCases,
  HEATMAP_SCALE,
  heatmapColor,
  MONTH_LABELS,
} from "@/lib/co-poisoning-analytics";

export function CalendarHeatmap({
  cases,
  deathCodes,
}: {
  cases: CoPoisoningCaseDto[];
  deathCodes: number[];
}) {
  const years = useMemo(() => {
    const set = new Set(cases.map(caseYear));
    return Array.from(set).sort((a, b) => b - a);
  }, [cases]);

  const [year, setYear] = useState<number>(() => years[0] ?? new Date().getFullYear());

  const activeYear = years.includes(year) ? year : years[0] ?? year;
  const yearCases = useMemo(
    () => filterCases(cases, activeYear),
    [cases, activeYear]
  );
  const cells = useMemo(
    () => calendarHeatmap(yearCases, deathCodes),
    [yearCases, deathCodes]
  );

  function handleCsv() {
    const rows: string[][] = [["Он", "Сар", "Өдөр", "Тохиолдол", "Нас баралт"]];
    for (let m = 1; m <= 12; m++) {
      const dim = daysInMonth(activeYear, m);
      for (let d = 1; d <= dim; d++) {
        const cell = cells.get(`${m}-${d}`);
        if (!cell || cell.cases === 0) continue;
        rows.push([
          String(activeYear),
          String(m),
          String(d),
          String(cell.cases),
          String(cell.deaths),
        ]);
      }
    }
    downloadCsv(`huuanli-${activeYear}.csv`, rows);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {activeYear} оны тохиолдлын хуанли
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">Сар · өдрөөр нэгтгэсэн тохиолдол</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-slate-600">
            Он:
            <select
              value={activeYear}
              onChange={(e) => setYear(Number(e.target.value))}
              className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs outline-none focus:border-sky-500"
            >
              {years.length === 0 ? (
                <option value={activeYear}>{activeYear} он</option>
              ) : (
                years.map((y) => (
                  <option key={y} value={y}>
                    {y} он
                  </option>
                ))
              )}
            </select>
          </label>
          <button
            type="button"
            onClick={handleCsv}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            <Download className="h-3.5 w-3.5" />
            CSV татах
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
        {HEATMAP_SCALE.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-3.5 w-3.5 rounded-sm border border-black/5"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-slate-200 bg-slate-100">
            <span className="h-1.5 w-1.5 rounded-full bg-white shadow ring-1 ring-slate-400" />
          </span>
          Нас барсан тохиолдол байна
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[720px]">
          <div
            className="mb-1 grid gap-1"
            style={{ gridTemplateColumns: `72px repeat(31, minmax(0, 1fr))` }}
          >
            <div />
            {Array.from({ length: 31 }, (_, i) => (
              <div
                key={i}
                className="text-center text-[10px] font-medium text-slate-500"
              >
                {i + 1}
              </div>
            ))}
          </div>

          {MONTH_LABELS.map((label, mi) => {
            const month = mi + 1;
            const dim = daysInMonth(activeYear, month);
            return (
              <div
                key={label}
                className="mb-1 grid gap-1"
                style={{ gridTemplateColumns: `72px repeat(31, minmax(0, 1fr))` }}
              >
                <div className="flex items-center text-[11px] font-medium text-slate-600">
                  {label}
                </div>
                {Array.from({ length: 31 }, (_, di) => {
                  const day = di + 1;
                  if (day > dim) {
                    return <div key={day} className="aspect-square" />;
                  }
                  const cell = cells.get(`${month}-${day}`);
                  const count = cell?.cases ?? 0;
                  const hasDeath = (cell?.deaths ?? 0) > 0;
                  const bg = heatmapColor(count);
                  return (
                    <div
                      key={day}
                      title={
                        count
                          ? `${activeYear}-${month}-${day}: ${count} тохиолдол${
                              hasDeath ? `, нас баралт: ${cell?.deaths}` : ""
                            }`
                          : `${activeYear}-${month}-${day}`
                      }
                      className="relative aspect-square rounded-sm border border-slate-100"
                      style={{
                        backgroundColor: count ? bg : "#F8FAFC",
                      }}
                    >
                      {hasDeath && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-white shadow ring-1 ring-black/20" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
