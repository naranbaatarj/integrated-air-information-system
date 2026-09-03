"use client";

import { useMemo, useState } from "react";
import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";
import { MONGOLIA_MAP } from "@/lib/maps/mongolia-aimags";
import { ULAANBAATAR_MAP } from "@/lib/maps/ulaanbaatar-districts";
import {
  districtMapStats,
  mapFillColor,
  provinceMapStats,
} from "@/lib/co-poisoning-maps";
import { ChartCard } from "./chart-card";
import { cn } from "@/lib/utils";

const DISTRICT_COLORS: Record<string, string> = {
  Сонгинохайрхан: "#86EFAC",
  Баянзүрх: "#93C5FD",
  Чингэлтэй: "#FDBA74",
  "Хан-Уул": "#67E8F9",
  Сүхбаатар: "#FDE047",
  Баянгол: "#C4B5FD",
  Налайх: "#FDA4AF",
  Багануур: "#A5B4FC",
  Багахангай: "#F9A8D4",
};

export function LocationMaps({
  cases,
  deathCodes,
}: {
  cases: CoPoisoningCaseDto[];
  deathCodes: number[];
}) {
  const provinces = useMemo(
    () => provinceMapStats(cases, deathCodes),
    [cases, deathCodes]
  );
  const districts = useMemo(
    () => districtMapStats(cases, deathCodes),
    [cases, deathCodes]
  );

  const provinceById = useMemo(() => {
    const m = new Map(provinces.map((p) => [p.id, p]));
    return m;
  }, [provinces]);

  const districtById = useMemo(() => {
    const m = new Map(districts.map((d) => [d.id, d]));
    return m;
  }, [districts]);

  const maxProvince = Math.max(...provinces.map((p) => p.total), 1);
  const maxDistrict = Math.max(...districts.map((d) => d.total), 1);

  const [hoverProvince, setHoverProvince] = useState<string | null>(null);
  const [hoverDistrict, setHoverDistrict] = useState<string | null>(null);

  const activeProvince = hoverProvince
    ? provinceById.get(hoverProvince)
    : null;
  const activeDistrict = hoverDistrict
    ? districtById.get(hoverDistrict)
    : null;

  function scrollToUb() {
    document.getElementById("ub-district-map")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="space-y-6">
      <ChartCard
        title="Аймаг, нийслэлийн газрын зураг"
        subtitle="Бүртгэгдсэн тохиолдлын тоо — аймаг / Улаанбаатар"
        filename="aimag-gazryn-zurag"
      >
        <div className="relative">
          <svg
            viewBox={MONGOLIA_MAP.viewBox}
            className="h-auto w-full"
            role="img"
            aria-label="Монгол улсын аймаг, нийслэлийн газрын зураг"
          >
            <rect width="100%" height="100%" fill="#F8FAFC" rx="12" />
            {MONGOLIA_MAP.regions.map((region) => {
              const stat = provinceById.get(region.id);
              const total = stat?.total ?? 0;
              const isUb = region.id === "Улаанбаатар";
              const fill = isUb
                ? total > 0
                  ? "#FACC15"
                  : "#FEF08A"
                : mapFillColor(total, maxProvince);
              const active = hoverProvince === region.id;

              return (
                <g key={region.id}>
                  <path
                    d={region.d}
                    fill={fill}
                    stroke={active ? "#0F172A" : "#FFFFFF"}
                    strokeWidth={active ? 2.5 : 1}
                    className="cursor-pointer transition-opacity duration-150"
                    opacity={hoverProvince && !active ? 0.55 : 1}
                    onMouseEnter={() => setHoverProvince(region.id)}
                    onMouseLeave={() => setHoverProvince(null)}
                    onClick={() => {
                      if (isUb) scrollToUb();
                    }}
                  />
                  {total > 0 && (
                    <text
                      x={region.cx}
                      y={region.cy}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pointer-events-none select-none"
                      fontSize={isUb ? 13 : 11}
                      fontWeight={700}
                      fill={isUb || total / maxProvince > 0.7 ? "#0F172A" : "#0C4A6E"}
                    >
                      {total}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {activeProvince && (
            <MapTooltip
              title={activeProvince.name}
              rows={[
                { label: "Тохиолдол", value: String(activeProvince.total) },
                { label: "Нас баралт", value: String(activeProvince.deaths) },
              ]}
            />
          )}

          <LegendRow
            items={[
              { color: "#E2E8F0", label: "0" },
              { color: "#BAE6FD", label: "Бага" },
              { color: "#38BDF8", label: "Дунд" },
              { color: "#FB923C", label: "Их" },
              { color: "#F43F5E", label: "Маш их" },
              { color: "#FACC15", label: "Улаанбаатар" },
            ]}
          />

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {provinces
              .filter((p) => p.total > 0)
              .slice(0, 12)
              .map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onMouseEnter={() => setHoverProvince(p.id)}
                  onMouseLeave={() => setHoverProvince(null)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition",
                    hoverProvince === p.id
                      ? "border-sky-300 bg-sky-50"
                      : "border-slate-200 bg-white hover:border-sky-200"
                  )}
                >
                  <span className="font-medium text-slate-800">{p.name}</span>
                  <span className="tabular-nums font-bold text-sky-700">
                    {p.total}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </ChartCard>

      <div id="ub-district-map">
      <ChartCard
        title="Улаанбаатар хотын дүүргүүд"
        subtitle="Дүүргээр бүртгэгдсэн тохиолдол ба хорооны тоо"
        filename="ub-duureg-gazryn-zurag"
      >
        <div className="relative">
          <svg
            viewBox={ULAANBAATAR_MAP.viewBox}
            className="h-auto w-full"
            role="img"
            aria-label="Улаанбаатар хотын дүүргийн газрын зураг"
          >
            <rect width="100%" height="100%" fill="#F8FAFC" rx="12" />
            {ULAANBAATAR_MAP.regions.map((region) => {
              const stat = districtById.get(region.id);
              const total = stat?.total ?? 0;
              const base =
                DISTRICT_COLORS[region.id] ?? mapFillColor(total, maxDistrict);
              const active = hoverDistrict === region.id;

              return (
                <g key={region.id}>
                  <path
                    d={region.d}
                    fill={base}
                    stroke={active ? "#0F172A" : "#FFFFFF"}
                    strokeWidth={active ? 2.5 : 1.5}
                    className="cursor-pointer transition-opacity duration-150"
                    opacity={hoverDistrict && !active ? 0.5 : 1}
                    onMouseEnter={() => setHoverDistrict(region.id)}
                    onMouseLeave={() => setHoverDistrict(null)}
                  />
                  <text
                    x={region.cx}
                    y={region.cy - (total > 0 ? 8 : 0)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="pointer-events-none select-none"
                    fontSize={11}
                    fontWeight={700}
                    fill="#0F172A"
                  >
                    {region.name}
                  </text>
                  {total > 0 && (
                    <text
                      x={region.cx}
                      y={region.cy + 10}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pointer-events-none select-none"
                      fontSize={14}
                      fontWeight={800}
                      fill="#BE123C"
                    >
                      {total}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {activeDistrict && (
            <MapTooltip
              title={activeDistrict.name}
              rows={[
                { label: "Тохиолдол", value: String(activeDistrict.total) },
                { label: "Нас баралт", value: String(activeDistrict.deaths) },
                {
                  label: "Хороо",
                  value: String(activeDistrict.khorooCount),
                },
              ]}
            />
          )}

          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-600">
                  <th className="px-4 py-3 font-medium">Дүүрэг</th>
                  <th className="px-4 py-3 text-right font-medium">Тохиолдол</th>
                  <th className="px-4 py-3 text-right font-medium">Хороо</th>
                  <th className="px-4 py-3 text-right font-medium">Нас баралт</th>
                </tr>
              </thead>
              <tbody>
                {ULAANBAATAR_MAP.regions
                  .map((r) => districtById.get(r.id) ?? {
                    id: r.id,
                    name: r.name,
                    total: 0,
                    deaths: 0,
                    khorooCount: 0,
                  })
                  .sort((a, b) => b.total - a.total)
                  .map((row) => (
                    <tr
                      key={row.id}
                      className={cn(
                        "border-t border-slate-100 transition",
                        hoverDistrict === row.id && "bg-sky-50"
                      )}
                      onMouseEnter={() => setHoverDistrict(row.id)}
                      onMouseLeave={() => setHoverDistrict(null)}
                    >
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-2 font-medium text-slate-800">
                          <span
                            className="h-2.5 w-2.5 rounded-sm"
                            style={{
                              background:
                                DISTRICT_COLORS[row.id] ?? "#94A3B8",
                            }}
                          />
                          {row.name}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-bold text-rose-600">
                        {row.total}
                      </td>
                      <td className="px-4 py-2.5 text-right text-slate-700">
                        {row.khorooCount}
                      </td>
                      <td className="px-4 py-2.5 text-right text-slate-700">
                        {row.deaths}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </ChartCard>
      </div>
    </div>
  );
}

function MapTooltip({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="pointer-events-none absolute left-3 top-3 z-10 min-w-[160px] rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
      <p className="text-sm font-bold text-slate-900">{title}</p>
      <ul className="mt-1 space-y-0.5 text-xs text-slate-600">
        {rows.map((r) => (
          <li key={r.label} className="flex justify-between gap-4">
            <span>{r.label}</span>
            <span className="font-semibold tabular-nums text-slate-900">
              {r.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LegendRow({
  items,
}: {
  items: { color: string; label: string }[];
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <span
            className="h-3 w-3 rounded-sm ring-1 ring-black/5"
            style={{ background: item.color }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}
