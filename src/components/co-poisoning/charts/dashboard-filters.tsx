"use client";

import type { DashboardFilter } from "@/lib/co-poisoning-analytics";
import { MONTH_LABELS } from "@/lib/co-poisoning-analytics";

const TIME_MODES: { value: DashboardFilter["timeMode"]; label: string }[] = [
  { value: "all", label: "Бүгд хугацаа" },
  { value: "year", label: "Онөөр" },
  { value: "month", label: "Сараар" },
  { value: "range", label: "Хугацаагаар" },
];

const GRANULARITIES: { value: DashboardFilter["granularity"]; label: string }[] = [
  { value: "year", label: "Жилээр харах" },
  { value: "month", label: "Сараар харах" },
  { value: "day", label: "Өдрөөр харах" },
];

export function DashboardFilters({
  filter,
  onChange,
  years,
  causes,
  resultCount,
}: {
  filter: DashboardFilter;
  onChange: (next: DashboardFilter) => void;
  years: number[];
  causes: string[];
  resultCount: number;
}) {
  function patch(partial: Partial<DashboardFilter>) {
    onChange({ ...filter, ...partial });
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Шүүлтүүр</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Шалтгаан болон цаг хугацаагаар мэдээллийг ангилан харна
          </p>
        </div>
        <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {resultCount.toLocaleString("mn-MN")} тохиолдол
        </p>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-slate-500">Цаг хугацаа</p>
        <div className="flex flex-wrap gap-2">
          {TIME_MODES.map((m) => (
            <Chip
              key={m.value}
              active={filter.timeMode === m.value}
              onClick={() => {
                const next: Partial<DashboardFilter> = { timeMode: m.value };
                if (m.value === "year" || m.value === "month") {
                  next.year = filter.year === "all" ? years[0] ?? new Date().getFullYear() : filter.year;
                  next.granularity = m.value === "year" ? "month" : "day";
                }
                if (m.value === "all") next.granularity = "year";
                if (m.value === "range") next.granularity = "day";
                patch(next);
              }}
              label={m.label}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-end gap-3">
          {(filter.timeMode === "year" || filter.timeMode === "month") && (
            <label className="text-xs text-slate-600">
              Он
              <select
                className="mt-1 block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500"
                value={filter.year === "all" ? "" : filter.year}
                onChange={(e) =>
                  patch({ year: e.target.value ? Number(e.target.value) : "all" })
                }
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
          )}

          {filter.timeMode === "month" && (
            <label className="text-xs text-slate-600">
              Сар
              <select
                className="mt-1 block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500"
                value={filter.month === "all" ? "" : filter.month}
                onChange={(e) =>
                  patch({ month: e.target.value ? Number(e.target.value) : "all" })
                }
              >
                {MONTH_LABELS.map((label, i) => (
                  <option key={label} value={i + 1}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          )}

          {filter.timeMode === "range" && (
            <>
              <label className="text-xs text-slate-600">
                Эхлэх
                <input
                  type="date"
                  className="mt-1 block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500"
                  value={filter.dateFrom}
                  onChange={(e) => patch({ dateFrom: e.target.value })}
                />
              </label>
              <label className="text-xs text-slate-600">
                Дуусах
                <input
                  type="date"
                  className="mt-1 block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500"
                  value={filter.dateTo}
                  onChange={(e) => patch({ dateTo: e.target.value })}
                />
              </label>
            </>
          )}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-slate-500">Графикийн цагийн нэгж</p>
        <div className="flex flex-wrap gap-2">
          {GRANULARITIES.map((g) => (
            <Chip
              key={g.value}
              active={filter.granularity === g.value}
              onClick={() => patch({ granularity: g.value })}
              label={g.label}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-slate-500">Шалтгаан</p>
        <div className="flex flex-wrap gap-2">
          <Chip
            active={filter.cause === "all"}
            onClick={() => patch({ cause: "all" })}
            label="Бүгд шалтгаан"
          />
          {causes.map((cause) => (
            <Chip
              key={cause}
              active={filter.cause === cause}
              onClick={() => patch({ cause })}
              label={cause}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white"
          : "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
      }
    >
      {label}
    </button>
  );
}
