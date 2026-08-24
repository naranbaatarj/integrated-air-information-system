import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";

export const MONTH_LABELS = [
  "1-р сар",
  "2-р сар",
  "3-р сар",
  "4-р сар",
  "5-р сар",
  "6-р сар",
  "7-р сар",
  "8-р сар",
  "9-р сар",
  "10-р сар",
  "11-р сар",
  "12-р сар",
] as const;

export const AGE_GROUPS = [
  { key: "0-5", label: "0–5 нас", min: 0, max: 5, color: "#F4C430" },
  { key: "6-12", label: "6–12 нас", min: 6, max: 12, color: "#4CAF50" },
  { key: "13-17", label: "13–17 нас", min: 13, max: 17, color: "#42A5F5" },
  { key: "18-40", label: "18–40 нас", min: 18, max: 40, color: "#7E57C2" },
  { key: "41-60", label: "41–60 нас", min: 41, max: 60, color: "#EF5350" },
  { key: "61+", label: "61+ нас", min: 61, max: 200, color: "#FF9800" },
  { key: "unknown", label: "Тодорхойгүй", min: null, max: null, color: "#90A4AE" },
] as const;

export const CONDITION_COLORS: Record<string, string> = {
  Хөнгөн: "#43A047",
  Хүндэвтэр: "#9CCC65",
  Дунд: "#FFCA28",
  Хүнд: "#FB8C00",
  "Маш хүнд": "#E53935",
  "Нас барсан": "#4A148C",
  Тодорхойгүй: "#90A4AE",
};

export const HEATMAP_SCALE = [
  { min: 1, max: 3, color: "#C8E6C9", label: "1–3" },
  { min: 4, max: 6, color: "#81C784", label: "4–6" },
  { min: 7, max: 12, color: "#FFEE58", label: "7–12" },
  { min: 13, max: 20, color: "#FFA726", label: "13–20" },
  { min: 21, max: 40, color: "#EF5350", label: "21–40" },
  { min: 41, max: Infinity, color: "#6D1B2A", label: "41+" },
] as const;

export function isDeath(
  outcome: number | null | undefined,
  deathCodes: number[]
) {
  return outcome != null && deathCodes.includes(outcome);
}

export function caseYear(c: CoPoisoningCaseDto) {
  return new Date(c.poisonedAt).getFullYear();
}

export function caseMonth(c: CoPoisoningCaseDto) {
  return new Date(c.poisonedAt).getMonth() + 1;
}

export function caseDay(c: CoPoisoningCaseDto) {
  return new Date(c.poisonedAt).getDate();
}

export function filterCases(
  cases: CoPoisoningCaseDto[],
  year: number | "all",
  month?: number | "all"
) {
  return cases.filter((c) => {
    if (year !== "all" && caseYear(c) !== year) return false;
    if (month && month !== "all" && caseMonth(c) !== month) return false;
    return true;
  });
}

export type DashboardFilter = {
  timeMode: "all" | "year" | "month" | "range";
  year: number | "all";
  month: number | "all";
  dateFrom: string;
  dateTo: string;
  cause: string | "all";
  /** How to bucket the main time chart */
  granularity: "year" | "month" | "day";
};

export function defaultDashboardFilter(
  years: number[] = []
): DashboardFilter {
  const latest = years[0] ?? new Date().getFullYear();
  return {
    timeMode: "all",
    year: "all",
    month: "all",
    dateFrom: `${latest}-01-01`,
    dateTo: `${latest}-12-31`,
    cause: "all",
    granularity: "year",
  };
}

export function applyDashboardFilter(
  cases: CoPoisoningCaseDto[],
  filter: DashboardFilter
) {
  return cases.filter((c) => {
    const d = new Date(c.poisonedAt);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const dayKey = c.poisonedAt.slice(0, 10);

    if (filter.timeMode === "year" && filter.year !== "all" && y !== filter.year) {
      return false;
    }
    if (filter.timeMode === "month") {
      if (filter.year !== "all" && y !== filter.year) return false;
      if (filter.month !== "all" && m !== filter.month) return false;
    }
    if (filter.timeMode === "range") {
      if (filter.dateFrom && dayKey < filter.dateFrom) return false;
      if (filter.dateTo && dayKey > filter.dateTo) return false;
    }

    if (filter.cause !== "all") {
      const cause = c.cause?.trim() || "Тодорхойгүй";
      if (cause !== filter.cause) return false;
    }

    return true;
  });
}

export const CAUSE_COLORS = [
  "#5B9BD5",
  "#F4A261",
  "#2A9D8F",
  "#E76F51",
  "#9B5DE5",
  "#00BBF9",
  "#F15BB5",
  "#FEE440",
  "#00F5D4",
  "#90A4AE",
];

export function causeSeries(cases: CoPoisoningCaseDto[], preferredLabels: string[] = []) {
  const map = new Map<string, number>();
  for (const label of preferredLabels) map.set(label, 0);

  for (const c of cases) {
    const key = c.cause?.trim() || "Тодорхойгүй";
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  const total = cases.length || 1;
  return Array.from(map.entries())
    .map(([name, value], index) => ({
      name,
      value,
      percent: Math.round((value / total) * 1000) / 10,
      color: CAUSE_COLORS[index % CAUSE_COLORS.length],
    }))
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value)
    .map((d, index) => ({ ...d, color: CAUSE_COLORS[index % CAUSE_COLORS.length] }));
}

export function timeSeriesByGranularity(
  cases: CoPoisoningCaseDto[],
  deathCodes: number[],
  granularity: "year" | "month" | "day"
) {
  const map = new Map<string, { label: string; sortKey: string; cases: number; deaths: number }>();

  for (const c of cases) {
    const d = new Date(c.poisonedAt);
    let label: string;
    let sortKey: string;

    if (granularity === "year") {
      const y = d.getFullYear();
      label = String(y);
      sortKey = String(y);
    } else if (granularity === "month") {
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      label = `${y}.${String(m).padStart(2, "0")}`;
      sortKey = `${y}-${String(m).padStart(2, "0")}`;
    } else {
      const dayKey = c.poisonedAt.slice(0, 10);
      label = dayKey;
      sortKey = dayKey;
    }

    const row = map.get(sortKey) ?? { label, sortKey, cases: 0, deaths: 0 };
    row.cases += 1;
    if (isDeath(c.outcome, deathCodes)) row.deaths += 1;
    map.set(sortKey, row);
  }

  return Array.from(map.values())
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
    .map(({ label, cases: caseCount, deaths }) => ({
      label,
      cases: caseCount,
      deaths,
    }));
}

export function causeOverTimeSeries(
  cases: CoPoisoningCaseDto[],
  granularity: "year" | "month" | "day",
  causeLabels: string[]
) {
  const causes =
    causeLabels.length > 0
      ? causeLabels
      : Array.from(
          new Set(cases.map((c) => c.cause?.trim() || "Тодорхойгүй"))
        ).sort();

  const map = new Map<string, { label: string; sortKey: string } & Record<string, number>>();

  for (const c of cases) {
    const d = new Date(c.poisonedAt);
    let label: string;
    let sortKey: string;
    if (granularity === "year") {
      label = String(d.getFullYear());
      sortKey = label;
    } else if (granularity === "month") {
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      label = `${y}.${String(m).padStart(2, "0")}`;
      sortKey = `${y}-${String(m).padStart(2, "0")}`;
    } else {
      label = c.poisonedAt.slice(0, 10);
      sortKey = label;
    }

    const row =
      map.get(sortKey) ??
      ({
        label,
        sortKey,
        ...Object.fromEntries(causes.map((name) => [name, 0])),
      } as { label: string; sortKey: string } & Record<string, number>);

    const cause = c.cause?.trim() || "Тодорхойгүй";
    const key = causes.includes(cause) ? cause : "Тодорхойгүй";
    if (!(key in row)) row[key] = 0;
    row[key] = Number(row[key] ?? 0) + 1;
    map.set(sortKey, row);
  }

  return {
    causes,
    rows: Array.from(map.values()).sort((a, b) => a.sortKey.localeCompare(b.sortKey)),
  };
}

export function yearlySeries(cases: CoPoisoningCaseDto[], deathCodes: number[]) {
  const map = new Map<number, { cases: number; deaths: number }>();
  for (const c of cases) {
    const y = caseYear(c);
    const row = map.get(y) ?? { cases: 0, deaths: 0 };
    row.cases += 1;
    if (isDeath(c.outcome, deathCodes)) row.deaths += 1;
    map.set(y, row);
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([year, v]) => ({
      label: String(year),
      year,
      cases: v.cases,
      deaths: v.deaths,
    }));
}

export function monthlySeries(cases: CoPoisoningCaseDto[], deathCodes: number[]) {
  const rows = MONTH_LABELS.map((label, i) => ({
    label,
    month: i + 1,
    cases: 0,
    deaths: 0,
  }));
  for (const c of cases) {
    const m = caseMonth(c) - 1;
    rows[m].cases += 1;
    if (isDeath(c.outcome, deathCodes)) rows[m].deaths += 1;
  }
  return rows;
}

export function genderSeries(cases: CoPoisoningCaseDto[]) {
  let male = 0;
  let female = 0;
  let other = 0;
  for (const c of cases) {
    if (c.gender === 1) male += 1;
    else if (c.gender === 2) female += 1;
    else other += 1;
  }
  const known = male + female;
  return [
    {
      name: "Эмэгтэй",
      value: female,
      percent: known ? Math.round((female / known) * 1000) / 10 : 0,
      color: "#F48FB1",
    },
    {
      name: "Эрэгтэй",
      value: male,
      percent: known ? Math.round((male / known) * 1000) / 10 : 0,
      color: "#5B9BD5",
    },
    ...(other
      ? [
          {
            name: "Тодорхойгүй",
            value: other,
            percent: 0,
            color: "#B0BEC5",
          },
        ]
      : []),
  ];
}

export function ageSeries(cases: CoPoisoningCaseDto[]) {
  return AGE_GROUPS.map((g) => {
    const value = cases.filter((c) => {
      if (g.min == null) return c.age == null;
      if (c.age == null) return false;
      return c.age >= g.min && c.age <= (g.max ?? 200);
    }).length;
    return { ...g, value };
  });
}

export type HeatCell = {
  month: number;
  day: number;
  cases: number;
  deaths: number;
};

export function calendarHeatmap(cases: CoPoisoningCaseDto[], deathCodes: number[]) {
  const map = new Map<string, HeatCell>();
  for (const c of cases) {
    const month = caseMonth(c);
    const day = caseDay(c);
    const key = `${month}-${day}`;
    const row = map.get(key) ?? { month, day, cases: 0, deaths: 0 };
    row.cases += 1;
    if (isDeath(c.outcome, deathCodes)) row.deaths += 1;
    map.set(key, row);
  }
  return map;
}

export function heatmapColor(count: number) {
  if (count <= 0) return "transparent";
  const match = HEATMAP_SCALE.find((s) => count >= s.min && count <= s.max);
  return match?.color ?? HEATMAP_SCALE[HEATMAP_SCALE.length - 1].color;
}

export function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export type LocationRow = {
  location: string;
  type: "УБ" | "Аймаг";
  total: number;
  deaths: number;
  byCondition: Record<string, number>;
};

export function locationByCondition(
  cases: CoPoisoningCaseDto[],
  deathCodes: number[],
  conditionLabels: string[]
): LocationRow[] {
  const map = new Map<string, LocationRow>();

  for (const c of cases) {
    const isUb = c.provinceId === 20 || c.provinceName === "Улаанбаатар";
    const location = isUb
      ? c.soumName
        ? `${c.soumName} дүүрэг`
        : "Улаанбаатар"
      : c.provinceName || "Тодорхойгүй";
    const type: "УБ" | "Аймаг" = isUb ? "УБ" : "Аймаг";
    const row =
      map.get(location) ??
      ({
        location,
        type,
        total: 0,
        deaths: 0,
        byCondition: Object.fromEntries(conditionLabels.map((l) => [l, 0])),
      } satisfies LocationRow);

    row.total += 1;
    if (isDeath(c.outcome, deathCodes)) row.deaths += 1;

    const condition = c.physicalCondition?.trim() || "Тодорхойгүй";
    const key = conditionLabels.includes(condition) ? condition : "Тодорхойгүй";
    if (!(key in row.byCondition)) row.byCondition[key] = 0;
    row.byCondition[key] += 1;

    map.set(location, row);
  }

  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}

export type DayLocationRow = {
  year: number;
  month: number;
  day: number;
  location: string;
  type: "УБ" | "Аймаг";
  total: number;
  deaths: number;
  byCondition: Record<string, number>;
};

export function dayLocationTable(
  cases: CoPoisoningCaseDto[],
  deathCodes: number[],
  conditionLabels: string[]
): DayLocationRow[] {
  const map = new Map<string, DayLocationRow>();

  for (const c of cases) {
    const year = caseYear(c);
    const month = caseMonth(c);
    const day = caseDay(c);
    const isUb = c.provinceId === 20 || c.provinceName === "Улаанбаатар";
    const location = isUb
      ? c.soumName
        ? `${c.soumName} дүүрэг`
        : "Улаанбаатар"
      : c.provinceName || "Тодорхойгүй";
    const type: "УБ" | "Аймаг" = isUb ? "УБ" : "Аймаг";
    const key = `${year}-${month}-${day}-${location}`;

    const row =
      map.get(key) ??
      ({
        year,
        month,
        day,
        location,
        type,
        total: 0,
        deaths: 0,
        byCondition: Object.fromEntries(conditionLabels.map((l) => [l, 0])),
      } satisfies DayLocationRow);

    row.total += 1;
    if (isDeath(c.outcome, deathCodes)) row.deaths += 1;
    const condition = c.physicalCondition?.trim() || "Тодорхойгүй";
    const ck = conditionLabels.includes(condition) ? condition : "Тодорхойгүй";
    if (!(ck in row.byCondition)) row.byCondition[ck] = 0;
    row.byCondition[ck] += 1;
    map.set(key, row);
  }

  return Array.from(map.values()).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (a.month !== b.month) return b.month - a.month;
    if (a.day !== b.day) return b.day - a.day;
    return b.total - a.total;
  });
}

export function downloadCsv(filename: string, rows: string[][]) {
  const bom = "\uFEFF";
  const content = rows
    .map((r) =>
      r
        .map((cell) => {
          const v = String(cell ?? "");
          if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
          return v;
        })
        .join(",")
    )
    .join("\n");
  const blob = new Blob([bom + content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
