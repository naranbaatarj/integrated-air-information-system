"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download } from "lucide-react";
import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";
import {
  CONDITION_COLORS,
  dayLocationTable,
  downloadCsv,
  filterCases,
  locationByCondition,
  MONTH_LABELS,
} from "@/lib/co-poisoning-analytics";
import { DownloadImageButton, useChartDownload } from "./chart-card";

const PAGE_SIZE = 50;

const DEFAULT_CONDITIONS = [
  "Хөнгөн",
  "Хүндэвтэр",
  "Дунд",
  "Хүнд",
  "Маш хүнд",
  "Нас барсан",
  "Тодорхойгүй",
];

function conditionColor(label: string) {
  return CONDITION_COLORS[label] ?? "#90A4AE";
}

export function LocationCharts({
  cases,
  deathCodes,
  conditionLabels,
}: {
  cases: CoPoisoningCaseDto[];
  deathCodes: number[];
  conditionLabels: string[];
}) {
  const conditions =
    conditionLabels.length > 0 ? conditionLabels : DEFAULT_CONDITIONS;

  const years = useMemo(() => {
    const set = new Set(cases.map((c) => new Date(c.poisonedAt).getFullYear()));
    return Array.from(set).sort((a, b) => b - a);
  }, [cases]);

  const [year, setYear] = useState<number | "all">("all");
  const [month, setMonth] = useState<number | "all">("all");
  const [view, setView] = useState<"graph" | "table">("graph");
  const [locationFilter, setLocationFilter] = useState("all");
  const [page, setPage] = useState(1);

  const scoped = useMemo(
    () => filterCases(cases, year, month),
    [cases, year, month]
  );

  const locations = useMemo(
    () => locationByCondition(scoped, deathCodes, conditions),
    [scoped, deathCodes, conditions]
  );

  const locationNames = useMemo(
    () => locations.map((l) => l.location),
    [locations]
  );

  const chartData = useMemo(
    () =>
      locations.map((row) => ({
        location: row.location,
        total: row.total,
        ...row.byCondition,
      })),
    [locations]
  );

  const tableRows = useMemo(() => {
    let rows = dayLocationTable(scoped, deathCodes, conditions);
    if (locationFilter !== "all") {
      rows = rows.filter((r) => r.location === locationFilter);
    }
    return rows;
  }, [scoped, deathCodes, conditions, locationFilter]);

  const totalPages = Math.max(1, Math.ceil(tableRows.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const pageRows = tableRows.slice(
    (pageSafe - 1) * PAGE_SIZE,
    pageSafe * PAGE_SIZE
  );

  function exportCsv() {
    const header = [
      "Он",
      "Сар",
      "Өдөр",
      "Байршил",
      "Төрөл",
      "Нийт",
      "Нас",
      ...conditions,
    ];
    const rows = tableRows.map((r) => [
      String(r.year),
      MONTH_LABELS[r.month - 1],
      String(r.day),
      r.location,
      r.type,
      String(r.total),
      r.deaths ? String(r.deaths) : "",
      ...conditions.map((c) => (r.byCondition[c] ? String(r.byCondition[c]) : "")),
    ]);
    downloadCsv("bairshil-uzvvulelt.csv", [header, ...rows]);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Байршлын үзүүлэлт</h3>
          <p className="text-xs text-slate-500">Биеийн байдлаар өнгөлөн харуулав</p>
        </div>
        {view === "table" && (
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            <Download className="h-3.5 w-3.5" />
            CSV татах
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <FilterSelect
          label="Он"
          value={String(year)}
          onChange={(v) => {
            setYear(v === "all" ? "all" : Number(v));
            setPage(1);
          }}
          options={[
            { value: "all", label: "Бүгд он" },
            ...years.map((y) => ({ value: String(y), label: String(y) })),
          ]}
        />
        <FilterSelect
          label="Сар"
          value={String(month)}
          onChange={(v) => {
            setMonth(v === "all" ? "all" : Number(v));
            setPage(1);
          }}
          options={[
            { value: "all", label: "Бүгд" },
            ...MONTH_LABELS.map((label, i) => ({
              value: String(i + 1),
              label,
            })),
          ]}
        />
        <FilterSelect
          label="Харагдах байдал"
          value={view}
          onChange={(v) => {
            setView(v as "graph" | "table");
            setPage(1);
          }}
          options={[
            { value: "graph", label: "График" },
            { value: "table", label: "Хүснэгт (өдрөөр)" },
          ]}
        />
        {view === "table" && (
          <FilterSelect
            label="Дүүрэг/Аймаг"
            value={locationFilter}
            onChange={(v) => {
              setLocationFilter(v);
              setPage(1);
            }}
            options={[
              { value: "all", label: "Бүгд дүүрэг/аймаг" },
              ...locationNames.map((n) => ({ value: n, label: n })),
            ]}
          />
        )}
      </div>

      <div className="flex flex-wrap gap-3 text-[11px] text-slate-600">
        {conditions.map((c) => (
          <span key={c} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: conditionColor(c) }}
            />
            {c}
          </span>
        ))}
      </div>

      {view === "graph" ? (
        <LocationGraph
          chartData={chartData}
          conditions={conditions}
          locationsCount={locations.length}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-3 py-3 font-semibold">Он</th>
                  <th className="px-3 py-3 font-semibold">Сар</th>
                  <th className="px-3 py-3 font-semibold">Өдөр</th>
                  <th className="px-3 py-3 font-semibold">Байршил</th>
                  <th className="px-3 py-3 font-semibold">Төрөл</th>
                  <th className="px-3 py-3 font-semibold">Нийт</th>
                  <th className="px-3 py-3 font-semibold">Нас</th>
                  {conditions.map((c) => (
                    <th key={c} className="px-3 py-3 font-semibold">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7 + conditions.length}
                      className="px-4 py-10 text-center text-slate-500"
                    >
                      Мэдээлэл байхгүй
                    </td>
                  </tr>
                ) : (
                  pageRows.map((row, idx) => (
                    <tr
                      key={`${row.year}-${row.month}-${row.day}-${row.location}-${idx}`}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="px-3 py-2.5">{row.year}</td>
                      <td className="px-3 py-2.5">{MONTH_LABELS[row.month - 1]}</td>
                      <td className="px-3 py-2.5">{row.day}</td>
                      <td className="px-3 py-2.5 font-medium">{row.location}</td>
                      <td className="px-3 py-2.5">
                        <span
                          className={
                            row.type === "УБ"
                              ? "rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-medium text-sky-700"
                              : "rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800"
                          }
                        >
                          {row.type}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{
                              backgroundColor:
                                row.total >= 10
                                  ? "#43A047"
                                  : row.total >= 4
                                    ? "#42A5F5"
                                    : "#FFCA28",
                            }}
                          />
                          {row.total}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">{row.deaths || "—"}</td>
                      {conditions.map((c) => (
                        <td
                          key={c}
                          className="px-3 py-2.5"
                          style={{ color: conditionColor(c) }}
                        >
                          {row.byCondition[c] || "—"}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
            <p>
              Нийт {tableRows.length.toLocaleString("mn-MN")} бичлэг —{" "}
              {tableRows.length === 0
                ? "0"
                : `${(pageSafe - 1) * PAGE_SIZE + 1}–${Math.min(
                    pageSafe * PAGE_SIZE,
                    tableRows.length
                  )}`}{" "}
              харуулж байна
            </p>
            <div className="flex items-center gap-1">
              <PagerButton
                disabled={pageSafe <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ‹
              </PagerButton>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let n = i + 1;
                if (totalPages > 5) {
                  const start = Math.min(
                    Math.max(1, pageSafe - 2),
                    totalPages - 4
                  );
                  n = start + i;
                }
                return (
                  <PagerButton
                    key={n}
                    active={n === pageSafe}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </PagerButton>
                );
              })}
              <PagerButton
                disabled={pageSafe >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                ›
              </PagerButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LocationGraph({
  chartData,
  conditions,
  locationsCount,
}: {
  chartData: Record<string, string | number>[];
  conditions: string[];
  locationsCount: number;
}) {
  const { ref, download, loading } = useChartDownload("bairshil-grafik");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex justify-end">
        <DownloadImageButton onClick={download} loading={loading} />
      </div>
      <div ref={ref} className="bg-white">
        <div
          className="w-full min-h-[320px]"
          style={{ height: Math.max(320, locationsCount * 28) }}
        >
          {chartData.length === 0 ? (
            <div className="flex h-80 items-center justify-center text-sm text-slate-400">
              Мэдээлэл байхгүй
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 8, right: 56, left: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="location"
                  width={140}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip />
                <Legend />
                {conditions.map((c, index) => (
                  <Bar
                    key={c}
                    dataKey={c}
                    stackId="a"
                    fill={conditionColor(c)}
                    name={c}
                  >
                    {index === conditions.length - 1 ? (
                      <LabelList
                        dataKey="total"
                        position="right"
                        fontSize={11}
                        fill="#64748B"
                      />
                    ) : null}
                  </Bar>
                ))}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex items-center gap-2 text-xs text-slate-600">
      {label}:
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs outline-none focus:border-sky-500"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function PagerButton({
  children,
  onClick,
  disabled,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        active
          ? "min-w-7 rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-white"
          : "min-w-7 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40"
      }
    >
      {children}
    </button>
  );
}
