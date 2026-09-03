import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";
import type { CoPoisoningOptionsByCategory } from "@/lib/co-poisoning-options";
import {
  getDistrictsByCityId,
  getKhoroosByDistrictId,
  parseKhorooNumber,
  formatKhorooLabel,
} from "@/lib/locations";

export const UB_CITY_ID = 20;

export const FILTER_QUERY_KEYS = [
  "period",
  "from",
  "to",
  "district",
  "khoroo",
  "age",
  "gender",
  "outcome",
  "cause",
  "severity",
] as const;

export type FilterQueryKey = (typeof FILTER_QUERY_KEYS)[number];

export type PeriodValue = "7d" | "30d" | "month" | "year" | "heating" | "custom";

export type CoPoisoningFilterState = {
  period: PeriodValue;
  from: string;
  to: string;
  district: string;
  khoroo: string;
  age: string;
  gender: string;
  outcome: string;
  cause: string;
  severity: string;
};

export type FilterOption = {
  value: string;
  label: string;
  parentValue?: string;
};

export type FilterChip = {
  key: keyof CoPoisoningFilterState;
  label: string;
};

export const DEFAULT_FILTER_STATE: CoPoisoningFilterState = {
  period: "year",
  from: "",
  to: "",
  district: "",
  khoroo: "",
  age: "",
  gender: "",
  outcome: "",
  cause: "",
  severity: "",
};

export const PERIOD_OPTIONS: { value: PeriodValue; label: string }[] = [
  { value: "7d", label: "7 хоног" },
  { value: "30d", label: "30 хоног" },
  { value: "month", label: "Энэ сар" },
  { value: "year", label: "Энэ жил" },
  { value: "heating", label: "Халаалтын улирал" },
  { value: "custom", label: "Огноо сонгох" },
];

export const AGE_OPTIONS: FilterOption[] = [
  { value: "0-17", label: "0–17 нас" },
  { value: "18-59", label: "18–59 нас" },
  { value: "60+", label: "60+ нас" },
];

export const GENDER_OPTIONS: FilterOption[] = [
  { value: "male", label: "Эрэгтэй" },
  { value: "female", label: "Эмэгтэй" },
];

const PERIOD_VALUES = new Set<PeriodValue>(PERIOD_OPTIONS.map((option) => option.value));

export function isPeriodValue(value: string): value is PeriodValue {
  return PERIOD_VALUES.has(value as PeriodValue);
}

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Heating season for calendar year Y: Sep 1 (Y-1) → May 31 Y.
 * Example: in 2026 → 2025-09-01 … 2026-05-31.
 * If still inside that window (Jan–May), end date is capped at today.
 */
export function resolveHeatingSeasonRange(now = new Date()) {
  const year = now.getFullYear();
  const from = `${year - 1}-09-01`;
  const seasonEnd = `${year}-05-31`;
  const today = toIsoDate(now);

  return {
    from,
    to: today < seasonEnd ? today : seasonEnd,
  };
}

export function formatIsoDot(iso: string) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${year}.${month}.${day}`;
}

export function resolveDateRange(
  state: Pick<CoPoisoningFilterState, "period" | "from" | "to">,
  now = new Date()
) {
  const today = toIsoDate(now);

  if (state.period === "custom") {
    return { from: state.from, to: state.to };
  }

  if (state.period === "7d") {
    const start = new Date(now);
    start.setDate(start.getDate() - 6);
    return { from: toIsoDate(start), to: today };
  }

  if (state.period === "30d") {
    const start = new Date(now);
    start.setDate(start.getDate() - 29);
    return { from: toIsoDate(start), to: today };
  }

  if (state.period === "month") {
    return { from: toIsoDate(new Date(now.getFullYear(), now.getMonth(), 1)), to: today };
  }

  if (state.period === "heating") {
    return resolveHeatingSeasonRange(now);
  }

  return { from: toIsoDate(new Date(now.getFullYear(), 0, 1)), to: today };
}

export function dateRangeLabel(state: CoPoisoningFilterState, now = new Date()) {
  const range = resolveDateRange(state, now);
  if (!range.from || !range.to) return "Огнооны интервал сонгоно уу";
  return `${formatIsoDot(range.from)} — ${formatIsoDot(range.to)}`;
}

export function isCustomRangeComplete(state: CoPoisoningFilterState) {
  if (state.period !== "custom") return true;
  return Boolean(state.from && state.to && state.from <= state.to);
}

export function parseFilterState(
  searchParams: Pick<URLSearchParams, "get">
): CoPoisoningFilterState {
  const periodRaw = searchParams.get("period") ?? "";
  const period = isPeriodValue(periodRaw) ? periodRaw : DEFAULT_FILTER_STATE.period;
  const district = searchParams.get("district") ?? "";

  return {
    period,
    from: period === "custom" ? (searchParams.get("from") ?? "") : "",
    to: period === "custom" ? (searchParams.get("to") ?? "") : "",
    district,
    khoroo: district ? (searchParams.get("khoroo") ?? "") : "",
    age: searchParams.get("age") ?? "",
    gender: searchParams.get("gender") ?? "",
    outcome: searchParams.get("outcome") ?? "",
    cause: searchParams.get("cause") ?? "",
    severity: searchParams.get("severity") ?? "",
  };
}

export function writeFilterParams(
  params: URLSearchParams,
  state: CoPoisoningFilterState
) {
  const next: CoPoisoningFilterState = {
    ...state,
    khoroo: state.district ? state.khoroo : "",
    from: state.period === "custom" ? state.from : "",
    to: state.period === "custom" ? state.to : "",
  };

  for (const key of FILTER_QUERY_KEYS) {
    const value = next[key];
    if (value) params.set(key, value);
    else params.delete(key);
  }

  params.delete("page");
  return params;
}

export function ageMatches(age: number | null, group: string) {
  if (!group) return true;
  if (age == null) return false;
  if (group === "0-17") return age >= 0 && age <= 17;
  if (group === "18-59") return age >= 18 && age <= 59;
  if (group === "60+") return age >= 60;
  return true;
}

export function ageGroupLabel(age: number | null) {
  if (age == null) return "Тодорхойгүй";
  if (age <= 17) return "0–17 нас";
  if (age <= 59) return "18–59 нас";
  return "60+ нас";
}

export function applyPublicFilter(
  cases: CoPoisoningCaseDto[],
  state: CoPoisoningFilterState
) {
  if (state.period === "custom" && !isCustomRangeComplete(state)) return [];

  const { from, to } = resolveDateRange(state);

  return cases.filter((item) => {
    const day = item.poisonedAt.slice(0, 10);
    if (from && day < from) return false;
    if (to && day > to) return false;
    if (state.district && (item.soumName?.trim() ?? "") !== state.district) return false;
    if (state.khoroo) {
      if (item.khoroo == null || String(item.khoroo) !== state.khoroo) return false;
    }
    if (!ageMatches(item.age, state.age)) return false;
    if (state.gender === "male" && item.gender !== 1) return false;
    if (state.gender === "female" && item.gender !== 2) return false;
    if (state.outcome && (item.outcome == null || String(item.outcome) !== state.outcome)) {
      return false;
    }
    if (state.cause && (item.cause?.trim() ?? "") !== state.cause) return false;
    if (
      state.severity &&
      (item.physicalCondition?.trim() ?? "") !== state.severity
    ) {
      return false;
    }
    return true;
  });
}

export function granularityFromFilter(
  state: CoPoisoningFilterState
): "year" | "month" | "day" {
  if (state.period === "year" || state.period === "heating") return "month";
  if (state.period === "7d" || state.period === "30d" || state.period === "month") {
    return "day";
  }

  const { from, to } = resolveDateRange(state);
  if (!from || !to) return "month";
  const days =
    (new Date(`${to}T00:00:00`).getTime() - new Date(`${from}T00:00:00`).getTime()) /
    86_400_000;
  if (days <= 45) return "day";
  if (days <= 400) return "month";
  return "year";
}

export function periodChipLabel(state: CoPoisoningFilterState, now = new Date()) {
  if (state.period === "year") return `${now.getFullYear()} он`;
  if (state.period === "heating") {
    const { from, to } = resolveHeatingSeasonRange(now);
    return `Халаалтын улирал (${formatIsoDot(from)} — ${formatIsoDot(to)})`;
  }
  if (state.period === "custom") {
    const { from, to } = resolveDateRange(state, now);
    if (from && to) return `${formatIsoDot(from)} — ${formatIsoDot(to)}`;
    return "Огноо сонгосон";
  }
  return PERIOD_OPTIONS.find((option) => option.value === state.period)?.label ?? state.period;
}

export function optionLabel(options: FilterOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function buildFilterChips(
  state: CoPoisoningFilterState,
  catalogs: {
    districts: FilterOption[];
    khoroos: FilterOption[];
    outcomes: FilterOption[];
    causes: FilterOption[];
    severities: FilterOption[];
  }
): FilterChip[] {
  const chips: FilterChip[] = [{ key: "period", label: periodChipLabel(state) }];
  if (state.district) {
    chips.push({ key: "district", label: optionLabel(catalogs.districts, state.district) });
  }
  if (state.khoroo) {
    chips.push({ key: "khoroo", label: optionLabel(catalogs.khoroos, state.khoroo) });
  }
  if (state.age) chips.push({ key: "age", label: optionLabel(AGE_OPTIONS, state.age) });
  if (state.gender) {
    chips.push({ key: "gender", label: optionLabel(GENDER_OPTIONS, state.gender) });
  }
  if (state.outcome) {
    chips.push({ key: "outcome", label: optionLabel(catalogs.outcomes, state.outcome) });
  }
  if (state.cause) {
    chips.push({ key: "cause", label: optionLabel(catalogs.causes, state.cause) });
  }
  if (state.severity) {
    chips.push({
      key: "severity",
      label: optionLabel(catalogs.severities, state.severity),
    });
  }
  return chips;
}

export function buildDistrictOptions(cases: CoPoisoningCaseDto[] = []): FilterOption[] {
  const ub = getDistrictsByCityId(UB_CITY_ID).map((district) => ({
    value: district.name,
    label: district.name,
  }));
  const known = new Set(ub.map((district) => district.value));
  const extra = new Set<string>();
  for (const item of cases) {
    const name = item.soumName?.trim();
    if (name && !known.has(name)) extra.add(name);
  }
  return [
    ...ub,
    ...Array.from(extra)
      .sort()
      .map((name) => ({ value: name, label: name })),
  ];
}

export function buildKhorooOptions(): FilterOption[] {
  const options: FilterOption[] = [];
  for (const district of getDistrictsByCityId(UB_CITY_ID)) {
    for (const khoroo of getKhoroosByDistrictId(district.id)) {
      const num = parseKhorooNumber(khoroo.name);
      options.push({
        value: num != null ? String(num) : khoroo.name,
        label: formatKhorooLabel(khoroo.name),
        parentValue: district.name,
      });
    }
  }
  return options;
}

export function buildCauseOptions(
  options: CoPoisoningOptionsByCategory,
  cases: CoPoisoningCaseDto[] = []
): FilterOption[] {
  const labels = [
    ...options.CAUSE.map((option) => option.label),
    ...cases.map((item) => item.cause?.trim() ?? ""),
  ].filter(Boolean);
  return Array.from(new Set(labels)).map((label) => ({ value: label, label }));
}

export function buildOutcomeOptions(
  options: CoPoisoningOptionsByCategory
): FilterOption[] {
  return options.OUTCOME.filter((option) => option.code != null).map((option) => ({
    value: String(option.code),
    label: option.label,
  }));
}

export function buildSeverityOptions(
  options: CoPoisoningOptionsByCategory
): FilterOption[] {
  return options.PHYSICAL_CONDITION.map((option) => ({
    value: option.label,
    label: option.label,
  }));
}
