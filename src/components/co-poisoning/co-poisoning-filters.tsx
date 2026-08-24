"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  ChevronDown,
  Filter,
  House,
  MapPin,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  UserRound,
  X,
} from "lucide-react";
import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";
import {
  AGE_OPTIONS,
  DEFAULT_FILTER_STATE,
  GENDER_OPTIONS,
  PERIOD_OPTIONS,
  applyPublicFilter,
  dateRangeLabel,
  isCustomRangeComplete,
  parseFilterState,
  periodChipLabel,
  resolveDateRange,
  writeFilterParams,
  type CoPoisoningFilterState,
  type FilterOption,
} from "@/lib/co-poisoning-filters";

export type Option = FilterOption;
export type FilterState = CoPoisoningFilterState;

export type CoPoisoningFiltersProps = {
  resultCount: number;
  cases: CoPoisoningCaseDto[];
  districts: FilterOption[];
  khoroos?: FilterOption[];
  outcomes?: FilterOption[];
  causes?: FilterOption[];
  severities?: FilterOption[];
};

const AGES: FilterOption[] = [{ value: "", label: "Бүх нас" }, ...AGE_OPTIONS];
const GENDERS: FilterOption[] = [{ value: "", label: "Бүх хүйс" }, ...GENDER_OPTIONS];

function withEmpty(options: FilterOption[], emptyLabel: string): FilterOption[] {
  return [{ value: "", label: emptyLabel }, ...options];
}

function labelFor(options: FilterOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function buildFilterItems(
  state: FilterState,
  districtOptions: FilterOption[],
  khorooOptions: FilterOption[],
  outcomeOptions: FilterOption[],
  causeOptions: FilterOption[],
  severityOptions: FilterOption[],
) {
  const items: Array<{ key: keyof FilterState; label: string }> = [];

  if (state.period) {
    items.push({ key: "period", label: periodChipLabel(state) });
  }

  if (state.district) {
    items.push({
      key: "district",
      label: labelFor(districtOptions, state.district),
    });
  }

  if (state.khoroo) {
    items.push({ key: "khoroo", label: labelFor(khorooOptions, state.khoroo) });
  }

  if (state.age) items.push({ key: "age", label: labelFor(AGES, state.age) });
  if (state.gender) {
    items.push({ key: "gender", label: labelFor(GENDERS, state.gender) });
  }
  if (state.outcome) {
    items.push({ key: "outcome", label: labelFor(outcomeOptions, state.outcome) });
  }
  if (state.cause) {
    items.push({ key: "cause", label: labelFor(causeOptions, state.cause) });
  }
  if (state.severity) {
    items.push({
      key: "severity",
      label: labelFor(severityOptions, state.severity),
    });
  }

  return items;
}

function FieldShell({
  id,
  label,
  icon,
  children,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-1.5 ml-0.5 block text-[11px] font-extrabold text-slate-600"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </span>
        {children}
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
        />
      </div>
    </div>
  );
}

function SelectControl({
  id,
  value,
  onChange,
  options,
  disabled,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  disabled?: boolean;
}) {
  return (
    <select
      id={id}
      value={value}
      disabled={disabled}
      onChange={(event: ChangeEvent<HTMLSelectElement>) =>
        onChange(event.target.value)
      }
      className="min-h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white py-0 pl-10 pr-10 text-sm font-semibold text-slate-700 shadow-sm outline-none transition hover:border-teal-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-600/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
    >
      {options.map((option) => (
        <option key={option.value || "all"} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function DateRangeFields({
  idPrefix,
  from,
  to,
  onChange,
}: {
  idPrefix: string;
  from: string;
  to: string;
  onChange: (key: "from" | "to", value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label
          htmlFor={`${idPrefix}-from`}
          className="mb-1.5 ml-0.5 block text-[11px] font-extrabold text-slate-600"
        >
          Эхлэх огноо
        </label>
        <input
          id={`${idPrefix}-from`}
          type="date"
          value={from}
          max={to || undefined}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange("from", event.target.value)
          }
          className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none transition hover:border-teal-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-600/10"
        />
      </div>
      <div>
        <label
          htmlFor={`${idPrefix}-to`}
          className="mb-1.5 ml-0.5 block text-[11px] font-extrabold text-slate-600"
        >
          Дуусах огноо
        </label>
        <input
          id={`${idPrefix}-to`}
          type="date"
          value={to}
          min={from || undefined}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange("to", event.target.value)
          }
          className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none transition hover:border-teal-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-600/10"
        />
      </div>
    </div>
  );
}

export function CoPoisoningFilters({
  resultCount,
  cases,
  districts,
  khoroos = [],
  outcomes = [],
  causes = [],
  severities = [],
}: CoPoisoningFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const applied = useMemo(() => parseFilterState(searchParams), [searchParams]);
  const [draft, setDraft] = useState<FilterState>(applied);

  const outcomeOptions = useMemo(
    () => withEmpty(outcomes, "Бүх үр дагавар"),
    [outcomes],
  );
  const causeOptions = useMemo(() => withEmpty(causes, "Бүх шалтгаан"), [causes]);
  const severityOptions = useMemo(
    () => withEmpty(severities, "Бүх зэрэг"),
    [severities],
  );

  // Keep the controls in sync with browser Back/Forward and shared URLs.
  useEffect(() => {
    setDraft(applied);
  }, [applied]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDraft(applied);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [applied, mobileOpen]);

  const districtOptions = useMemo(
    () => [{ value: "", label: "Бүх дүүрэг" }, ...districts],
    [districts],
  );

  const appliedKhorooOptions = useMemo(
    () => [
      { value: "", label: "Бүх хороо" },
      ...khoroos.filter(
        (option) =>
          !option.parentValue || option.parentValue === applied.district,
      ),
    ],
    [applied.district, khoroos],
  );

  const draftKhorooOptions = useMemo(
    () => [
      { value: "", label: "Бүх хороо" },
      ...khoroos.filter(
        (option) => !option.parentValue || option.parentValue === draft.district,
      ),
    ],
    [draft.district, khoroos],
  );

  const activeFilters = useMemo(
    () =>
      buildFilterItems(
        applied,
        districtOptions,
        appliedKhorooOptions,
        outcomeOptions,
        causeOptions,
        severityOptions,
      ),
    [
      applied,
      appliedKhorooOptions,
      causeOptions,
      districtOptions,
      outcomeOptions,
      severityOptions,
    ],
  );

  const draftFilters = useMemo(
    () =>
      buildFilterItems(
        draft,
        districtOptions,
        draftKhorooOptions,
        outcomeOptions,
        causeOptions,
        severityOptions,
      ),
    [
      causeOptions,
      districtOptions,
      draft,
      draftKhorooOptions,
      outcomeOptions,
      severityOptions,
    ],
  );

  const draftCount = useMemo(
    () => applyPublicFilter(cases, draft).length,
    [cases, draft],
  );

  const advancedDraftCount = [
    draft.gender,
    draft.outcome,
    draft.cause,
    draft.severity,
  ].filter(Boolean).length;

  function update<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setDraft((current) => {
      const next = { ...current, [key]: value };
      if (key === "district") next.khoroo = "";
      if (key === "period" && value !== "custom") {
        next.from = "";
        next.to = "";
      }
      if (key === "period" && value === "custom" && !current.from && !current.to) {
        const range = resolveDateRange(current);
        next.from = range.from;
        next.to = range.to;
      }
      return next;
    });
  }

  function commit(next: FilterState) {
    const params = writeFilterParams(
      new URLSearchParams(searchParams.toString()),
      next,
    );
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function applyFilters() {
    commit(draft);
    setMobileOpen(false);
  }

  function cancelMobileFilters() {
    setDraft(applied);
    setMobileOpen(false);
  }

  function resetFilters() {
    const next = { ...DEFAULT_FILTER_STATE };
    setDraft(next);
    commit(next);
  }

  function clearDraft() {
    setDraft({ ...DEFAULT_FILTER_STATE });
  }

  function removeFilter(key: keyof FilterState) {
    const next: FilterState = {
      ...applied,
      [key]: key === "period" ? "year" : "",
    };

    if (key === "district") next.khoroo = "";

    setDraft(next);
    commit(next);
  }

  const dateLabel = dateRangeLabel(draft);
  const customDateIncomplete = !isCustomRangeComplete(draft);

  return (
    <section aria-labelledby="co-filter-title" className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2
            id="co-filter-title"
            className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl"
          >
            Мэдээлэл шүүх
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Сонголтуудаа тохируулаад “Шүүх” товчоор үр дүнг шинэчилнэ.
          </p>
        </div>
        <span className="hidden rounded-full border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-extrabold text-teal-800 sm:inline-flex">
          {resultCount.toLocaleString("mn-MN")} бүртгэл
        </span>
      </div>

      <div className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,51,48,0.08)]">
        <div className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50/70 px-4 py-3.5 sm:px-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 lg:flex lg:items-center lg:gap-3">
              <span className="mb-2 flex items-center gap-2 text-xs font-extrabold text-slate-600 lg:mb-0">
                <CalendarDays className="size-4" /> Хугацаа
              </span>
              <div
                role="group"
                aria-label="Хугацааны хурдан сонголт"
                className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-slate-100 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {PERIOD_OPTIONS.map((period) => (
                  <button
                    key={period.value}
                    type="button"
                    aria-pressed={draft.period === period.value}
                    onClick={() => update("period", period.value)}
                    className={`min-h-8 shrink-0 rounded-lg px-3 text-xs font-extrabold transition ${
                      draft.period === period.value
                        ? "bg-white text-teal-800 shadow-sm"
                        : "text-slate-500 hover:bg-white/70 hover:text-slate-700"
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-extrabold text-teal-800 hover:bg-teal-50"
              >
                <RotateCcw className="size-4" /> Цэвэрлэх
              </button>
              <button
                type="button"
                aria-expanded={advancedOpen}
                aria-controls="co-advanced-filters"
                onClick={() => setAdvancedOpen((open) => !open)}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-700 hover:border-teal-300 hover:bg-teal-50"
              >
                <SlidersHorizontal className="size-4" /> Нэмэлт шүүлт
                {advancedDraftCount > 0 && (
                  <span className="grid size-5 place-items-center rounded-full bg-teal-700 text-[10px] text-white">
                    {advancedDraftCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="hidden grid-cols-[1.25fr_1fr_1fr_1fr_auto] items-end gap-3 lg:grid">
            <FieldShell
              id="co-date-range"
              label="Огнооны интервал"
              icon={<CalendarDays className="size-4" />}
            >
              <button
                id="co-date-range"
                type="button"
                onClick={() => update("period", "custom")}
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white py-0 pl-10 pr-10 text-left text-sm font-semibold text-slate-700 shadow-sm outline-none transition hover:border-teal-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-600/10"
              >
                {dateLabel}
              </button>
            </FieldShell>

            <FieldShell
              id="co-district"
              label="Дүүрэг"
              icon={<MapPin className="size-4" />}
            >
              <SelectControl
                id="co-district"
                value={draft.district}
                options={districtOptions}
                onChange={(value) => update("district", value)}
              />
            </FieldShell>

            <FieldShell
              id="co-khoroo"
              label="Хороо"
              icon={<House className="size-4" />}
            >
              <SelectControl
                id="co-khoroo"
                value={draft.khoroo}
                options={draftKhorooOptions}
                disabled={!draft.district}
                onChange={(value) => update("khoroo", value)}
              />
            </FieldShell>

            <FieldShell
              id="co-age"
              label="Насны бүлэг"
              icon={<UserRound className="size-4" />}
            >
              <SelectControl
                id="co-age"
                value={draft.age}
                options={AGES}
                onChange={(value) => update("age", value)}
              />
            </FieldShell>

            <button
              type="button"
              disabled={customDateIncomplete}
              onClick={applyFilters}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-extrabold text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-4 focus-visible:outline-teal-600/20 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <Filter className="size-4" /> Шүүх
            </button>
          </div>

          {draft.period === "custom" && (
            <div className="mt-4 hidden rounded-2xl border border-teal-100 bg-teal-50/50 p-3 lg:block">
              <DateRangeFields
                idPrefix="co-desktop-date"
                from={draft.from}
                to={draft.to}
                onChange={update}
              />
              {customDateIncomplete && (
                <p className="mt-2 text-xs font-semibold text-amber-700">
                  Шүүхийн өмнө эхлэх болон дуусах огноог сонгоно уу.
                </p>
              )}
            </div>
          )}

          {advancedOpen && (
            <div
              id="co-advanced-filters"
              className="mt-4 hidden grid-cols-4 gap-3 border-t border-dashed border-slate-200 pt-4 lg:grid"
            >
              <FieldShell
                id="co-gender"
                label="Хүйс"
                icon={<UserRound className="size-4" />}
              >
                <SelectControl
                  id="co-gender"
                  value={draft.gender}
                  options={GENDERS}
                  onChange={(value) => update("gender", value)}
                />
              </FieldShell>
              <FieldShell
                id="co-outcome"
                label="Үр дагавар"
                icon={<Plus className="size-4" />}
              >
                <SelectControl
                  id="co-outcome"
                  value={draft.outcome}
                  options={outcomeOptions}
                  onChange={(value) => update("outcome", value)}
                />
              </FieldShell>
              <FieldShell
                id="co-cause"
                label="Хордлогын шалтгаан"
                icon={<Activity className="size-4" />}
              >
                <SelectControl
                  id="co-cause"
                  value={draft.cause}
                  options={causeOptions}
                  onChange={(value) => update("cause", value)}
                />
              </FieldShell>
              <FieldShell
                id="co-severity"
                label="Хүндрэлийн зэрэг"
                icon={<AlertTriangle className="size-4" />}
              >
                <SelectControl
                  id="co-severity"
                  value={draft.severity}
                  options={severityOptions}
                  onChange={(value) => update("severity", value)}
                />
              </FieldShell>
            </div>
          )}

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 text-sm font-extrabold text-teal-800"
            >
              <SlidersHorizontal className="size-4" /> Шүүлтүүр
              <span className="grid size-5 place-items-center rounded-full bg-teal-700 text-[10px] text-white">
                {activeFilters.length}
              </span>
            </button>
            <button
              type="button"
              disabled={customDateIncomplete}
              onClick={applyFilters}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-700 px-5 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Шүүх
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="hidden shrink-0 text-[11px] font-bold text-slate-500 lg:inline">
                Идэвхтэй:
              </span>
              {activeFilters.map((item) => (
                <span
                  key={item.key}
                  className="inline-flex min-h-7 shrink-0 items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 text-[11px] font-extrabold text-teal-800"
                >
                  {item.label}
                  <button
                    type="button"
                    aria-label={`${item.label} шүүлтийг хасах`}
                    onClick={() => removeFilter(item.key)}
                    className="grid size-5 place-items-center rounded-full text-teal-700 hover:bg-teal-100"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
            <span aria-live="polite" className="inline-flex shrink-0 items-center gap-2 text-[11px] font-medium text-slate-500">
              <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.10)]" />
              {resultCount.toLocaleString("mn-MN")} бүртгэлд шүүлт хэрэглэсэн
            </span>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/55 backdrop-blur-[2px] lg:hidden"
          onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
            if (event.target === event.currentTarget) cancelMobileFilters();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="co-mobile-filter-title"
            className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-3xl bg-white shadow-2xl"
          >
            <div className="mx-auto mt-2 h-1.5 w-11 rounded-full bg-slate-200" />
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
              <div>
                <h3
                  id="co-mobile-filter-title"
                  className="text-lg font-black text-slate-900"
                >
                  Шүүлтүүр
                </h3>
                <p className="text-xs text-slate-500">
                  {draftFilters.length} сонголт сонгосон
                </p>
              </div>
              <button
                type="button"
                autoFocus
                aria-label="Шүүлтүүр хаах"
                onClick={cancelMobileFilters}
                className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto px-5 pb-28 pt-4">
              <FieldShell
                id="co-mobile-date"
                label="Огнооны интервал"
                icon={<CalendarDays className="size-4" />}
              >
                <button
                  id="co-mobile-date"
                  type="button"
                  onClick={() => update("period", "custom")}
                  className="min-h-11 w-full rounded-xl border border-slate-200 bg-white py-0 pl-10 pr-10 text-left text-sm font-semibold text-slate-700"
                >
                  {dateLabel}
                </button>
              </FieldShell>

              {draft.period === "custom" && (
                <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-3">
                  <DateRangeFields
                    idPrefix="co-mobile-date-range"
                    from={draft.from}
                    to={draft.to}
                    onChange={update}
                  />
                  {customDateIncomplete && (
                    <p className="mt-2 text-xs font-semibold text-amber-700">
                      Хоёр огноог бүрэн сонгоно уу.
                    </p>
                  )}
                </div>
              )}

              <FieldShell
                id="co-mobile-district"
                label="Дүүрэг"
                icon={<MapPin className="size-4" />}
              >
                <SelectControl
                  id="co-mobile-district"
                  value={draft.district}
                  options={districtOptions}
                  onChange={(value) => update("district", value)}
                />
              </FieldShell>

              <FieldShell
                id="co-mobile-khoroo"
                label="Хороо"
              icon={<House className="size-4" />}
            >
              <SelectControl
                id="co-mobile-khoroo"
                  value={draft.khoroo}
                  options={draftKhorooOptions}
                  disabled={!draft.district}
                  onChange={(value) => update("khoroo", value)}
                />
              </FieldShell>

              <FieldShell
                id="co-mobile-age"
                label="Насны бүлэг"
                icon={<UserRound className="size-4" />}
              >
                <SelectControl
                  id="co-mobile-age"
                  value={draft.age}
                  options={AGES}
                  onChange={(value) => update("age", value)}
                />
              </FieldShell>

              <FieldShell
                id="co-mobile-gender"
                label="Хүйс"
                icon={<UserRound className="size-4" />}
              >
                <SelectControl
                  id="co-mobile-gender"
                  value={draft.gender}
                  options={GENDERS}
                  onChange={(value) => update("gender", value)}
                />
              </FieldShell>

              <FieldShell
                id="co-mobile-outcome"
                label="Үр дагавар"
                icon={<Plus className="size-4" />}
              >
                <SelectControl
                  id="co-mobile-outcome"
                  value={draft.outcome}
                  options={outcomeOptions}
                  onChange={(value) => update("outcome", value)}
                />
              </FieldShell>

              <FieldShell
                id="co-mobile-cause"
                label="Хордлогын шалтгаан"
                icon={<Activity className="size-4" />}
              >
                <SelectControl
                  id="co-mobile-cause"
                  value={draft.cause}
                  options={causeOptions}
                  onChange={(value) => update("cause", value)}
                />
              </FieldShell>

              <FieldShell
                id="co-mobile-severity"
                label="Хүндрэлийн зэрэг"
                icon={<AlertTriangle className="size-4" />}
              >
                <SelectControl
                  id="co-mobile-severity"
                  value={draft.severity}
                  options={severityOptions}
                  onChange={(value) => update("severity", value)}
                />
              </FieldShell>
            </div>

            <div className="absolute inset-x-0 bottom-0 grid grid-cols-[1fr_2fr] gap-2 border-t border-slate-200 bg-white/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
              <button
                type="button"
                onClick={clearDraft}
                className="min-h-11 rounded-xl border border-slate-200 text-sm font-extrabold text-slate-600"
              >
                Цэвэрлэх
              </button>
              <button
                type="button"
                disabled={customDateIncomplete}
                onClick={applyFilters}
                className="min-h-11 rounded-xl bg-teal-700 px-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {draftCount.toLocaleString("mn-MN")} үр дүн харах
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
