"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, Plus, Settings2, Trash2, X } from "lucide-react";
import {
  buildLocationCode,
  CITIES,
  formatKhorooLabel,
  GENDER_OPTIONS,
  genderLabel,
  getCityByName,
  getDistrictByCityAndName,
  getDistrictsByCityId,
  getKhoroosByDistrictId,
  parseKhorooNumber,
  type CoPoisoningCaseDto,
  type CoPoisoningStats,
} from "@/lib/co-poisoning";
import {
  labelFromCode,
  type CoPoisoningOptionsByCategory,
} from "@/lib/co-poisoning-options";
import {
  defaultDashboardFilter,
  type DashboardFilter,
} from "@/lib/co-poisoning-analytics";
import { CoPoisoningCharts } from "@/components/co-poisoning/charts";
import { CoPoisoningFilters } from "@/components/co-poisoning/co-poisoning-filters";
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

type FormState = {
  poisonedAt: string;
  epi: string;
  reportingOrganization: string;
  address: string;
  locationType: string;
  provinceName: string;
  provinceId: string;
  soumName: string;
  soumId: string;
  khorooSoum: string;
  khorooName: string;
  code: string;
  age: string;
  gender: string;
  hospitalArrival: string;
  physicalCondition: string;
  outcome: string;
  hbco: string;
  household: string;
  cause: string;
  khoroo: string;
};

const emptyForm = (): FormState => ({
  poisonedAt: new Date().toISOString().slice(0, 10),
  epi: "",
  reportingOrganization: "",
  address: "",
  locationType: "Гэртээ",
  provinceName: "Улаанбаатар",
  provinceId: "20",
  soumName: "",
  soumId: "",
  khorooSoum: "",
  khorooName: "",
  code: "",
  age: "",
  gender: "",
  hospitalArrival: "",
  physicalCondition: "",
  outcome: "",
  hbco: "",
  household: "",
  cause: "галлагаа",
  khoroo: "",
});

function caseToForm(record: CoPoisoningCaseDto): FormState {
  let khorooName = "";
  if (record.khorooSoum?.includes("баг")) {
    khorooName = record.khorooSoum;
  } else if (record.khoroo != null) {
    const padded = String(record.khoroo).padStart(2, "0");
    khorooName = padded;
  }

  return {
    poisonedAt: record.poisonedAt.slice(0, 10),
    epi: record.epi?.toString() ?? "",
    reportingOrganization: record.reportingOrganization ?? "",
    address: record.address ?? "",
    locationType: record.locationType ?? "",
    provinceName: record.provinceName ?? "",
    provinceId: record.provinceId?.toString() ?? "",
    soumName: record.soumName ?? "",
    soumId: record.soumId?.toString() ?? "",
    khorooSoum: record.khorooSoum ?? "",
    khorooName,
    code: record.code ?? "",
    age: record.age?.toString() ?? "",
    gender: record.gender?.toString() ?? "",
    hospitalArrival: record.hospitalArrival?.toString() ?? "",
    physicalCondition: record.physicalCondition ?? "",
    outcome: record.outcome?.toString() ?? "",
    hbco: record.hbco?.toString() ?? "",
    household: record.household?.toString() ?? "",
    cause: record.cause ?? "",
    khoroo: record.khoroo?.toString() ?? "",
  };
}

function parseOptionalInt(value: string): number | null {
  if (!value.trim()) return null;
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

function parseOptionalFloat(value: string): number | null {
  if (!value.trim()) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function formToPayload(form: FormState) {
  return {
    poisonedAt: form.poisonedAt,
    epi: parseOptionalInt(form.epi),
    reportingOrganization: form.reportingOrganization || null,
    address: form.address || null,
    locationType: form.locationType || null,
    provinceName: form.provinceName || null,
    provinceId: parseOptionalInt(form.provinceId),
    soumName: form.soumName || null,
    soumId: parseOptionalInt(form.soumId),
    khorooSoum: form.khorooSoum || null,
    code: form.code || null,
    age: parseOptionalInt(form.age),
    gender: parseOptionalInt(form.gender) as 1 | 2 | null,
    hospitalArrival: parseOptionalInt(form.hospitalArrival),
    physicalCondition: form.physicalCondition || null,
    outcome: parseOptionalInt(form.outcome),
    hbco: parseOptionalFloat(form.hbco),
    household: parseOptionalInt(form.household),
    cause: form.cause || null,
    khoroo: parseOptionalInt(form.khoroo),
  };
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100";
const labelClass = "mb-1 block text-xs font-medium text-slate-600";

export function CoPoisoningManager({
  initialCases,
  initialStats,
  options,
  deathCodes,
}: {
  initialCases: CoPoisoningCaseDto[];
  initialStats: CoPoisoningStats;
  options: CoPoisoningOptionsByCategory;
  deathCodes: number[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cases, setCases] = useState(initialCases);
  const [, setStats] = useState(initialStats);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const publicFilter = useMemo(
    () => parseFilterState(searchParams),
    [searchParams]
  );
  const filterDistricts = useMemo(() => buildDistrictOptions(cases), [cases]);
  const filterKhoroos = useMemo(() => buildKhorooOptions(), []);
  const filterOutcomes = useMemo(() => buildOutcomeOptions(options), [options]);
  const filterCauses = useMemo(
    () => buildCauseOptions(options, cases),
    [cases, options]
  );
  const filterSeverities = useMemo(
    () => buildSeverityOptions(options),
    [options]
  );

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

  const filteredStats = useMemo((): CoPoisoningStats => {
    const total = filteredCases.length;
    const deaths = filteredCases.filter(
      (c) => c.outcome != null && deathCodes.includes(c.outcome)
    ).length;
    const male = filteredCases.filter((c) => c.gender === 1).length;
    const female = filteredCases.filter((c) => c.gender === 2).length;
    const children = filteredCases.filter((c) => c.age != null && c.age < 18).length;
    return {
      total,
      deaths,
      male,
      female,
      children,
      deathRate: total > 0 ? Math.round((deaths / total) * 1000) / 10 : 0,
    };
  }, [filteredCases, deathCodes]);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setError("");
    setFormOpen(true);
  }

  function openEdit(record: CoPoisoningCaseDto) {
    setEditingId(record.id);
    setForm(caseToForm(record));
    setError("");
    setFormOpen(true);
  }

  function updateForm(patch: Partial<FormState>) {
    setForm((prev) => {
      const next = { ...prev, ...patch };

      if (patch.provinceName !== undefined) {
        const city = getCityByName(patch.provinceName);
        next.provinceId = city?.id.toString() ?? "";
        next.soumName = "";
        next.soumId = "";
        next.khorooName = "";
        next.khoroo = "";
        next.khorooSoum = "";
        next.code = "";
      }

      if (patch.soumName !== undefined) {
        const cityId = Number(next.provinceId);
        const district = getDistrictByCityAndName(cityId, patch.soumName);
        next.soumId = district ? String(Number(district.code)) : "";
        next.khorooName = "";
        next.khoroo = "";
        next.khorooSoum = "";
        next.code = "";
      }

      if (patch.khorooName !== undefined) {
        const cityId = Number(next.provinceId);
        const district = getDistrictByCityAndName(cityId, next.soumName);
        const num = parseKhorooNumber(patch.khorooName);
        next.khoroo = num != null ? String(num) : "";
        next.khorooSoum = patch.khorooName ? formatKhorooLabel(patch.khorooName) : "";
        next.code = buildLocationCode(district?.code, patch.khorooName || null);
      }

      return next;
    });
  }

  async function refreshFromServer() {
    const res = await fetch("/api/admin/co-poisoning");
    if (!res.ok) return;
    const data = await res.json();
    setCases(data.cases);
    setStats(data.stats);
    router.refresh();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = formToPayload(form);
    if (!payload.poisonedAt) {
      setError("Хордсон огноо оруулна уу.");
      setLoading(false);
      return;
    }

    const url = editingId
      ? `/api/admin/co-poisoning/${editingId}`
      : "/api/admin/co-poisoning";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Хадгалахад алдаа гарлаа. Утгуудыг шалгана уу.");
      return;
    }

    setFormOpen(false);
    await refreshFromServer();
  }

  async function handleDelete(id: string) {
    if (!confirm("Энэ бүртгэлийг устгах уу?")) return;
    setLoading(true);
    setError("");

    const res = await fetch(`/api/admin/co-poisoning/${id}`, { method: "DELETE" });
    setLoading(false);

    if (!res.ok) {
      setError("Устгахад алдаа гарлаа.");
      return;
    }

    await refreshFromServer();
  }

  const selectedCity = getCityByName(form.provinceName);
  const districts = getDistrictsByCityId(selectedCity?.id);
  const selectedDistrict = getDistrictByCityAndName(selectedCity?.id, form.soumName);
  const khorooOptions = getKhoroosByDistrictId(selectedDistrict?.id);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">
              НЭМТ · Бүртгэл
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Угаарын хийн хордлогын мэдээлэл
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Нийгмийн эрүүл мэндийн үндэсний төвд бүртгэгдсэн угаарын хийн хордлогын мэдээлэл
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-700"
            >
              <Plus className="h-4 w-4" />
              Шинэ бүртгэл
            </button>
            <Link
              href="/admin/co-poisoning/options"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Settings2 className="h-4 w-4" />
              Тохиргоо
            </Link>
          </div>
        </div>
      </div>

      <CoPoisoningFilters
        resultCount={filteredCases.length}
        cases={cases}
        districts={filterDistricts}
        khoroos={filterKhoroos}
        outcomes={filterOutcomes}
        causes={filterCauses}
        severities={filterSeverities}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard title="Нийт тохиолдол" value={filteredStats.total} hint="Шүүлтийн дагуу" />
          <StatCard title="Нас баралт" value={filteredStats.deaths} hint="Нас барсан тохиолдол" />
          <StatCard title="Эрэгтэй" value={filteredStats.male} />
          <StatCard title="Эмэгтэй" value={filteredStats.female} />
          <StatCard
            title="Нас баралтын хувь"
            value={`${filteredStats.deathRate}%`}
            hint="Нийт тохиолдлоос"
          />
        </div>
      </div>

      <CoPoisoningCharts
        cases={cases}
        filteredCases={filteredCases}
        filter={chartFilter}
        onFilterChange={(next) => setGranularity(next.granularity)}
        deathCodes={deathCodes}
        options={options}
      />

      {error && !formOpen && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[1600px] w-full text-left text-xs">
            <thead>
              <tr className="bg-rose-100 text-slate-800">
                <Th>№</Th>
                <Th>Хордсон огноо</Th>
                <Th className="bg-rose-200">EPI</Th>
                <Th>Мэдээлсэн байгууллага</Th>
                <Th>Угаартсан газрын хаяг</Th>
                <Th>Угаартсан газар</Th>
                <Th>Аймаг / хот</Th>
                <Th>Сум / дүүрэг</Th>
                <Th>Хороо / сум</Th>
                <Th>Нас</Th>
                <Th className="bg-rose-200">Хүйс</Th>
                <Th>Эмнэлэгт хандсан байдал</Th>
                <Th>Биеийн ерөнхий байдал</Th>
                <Th className="bg-rose-200">Төлөв</Th>
                <Th>HbCO</Th>
                <Th>Өрх</Th>
                <Th>Шалтгаан</Th>
                <Th>Үйлдэл</Th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={18} className="px-4 py-10 text-center text-sm text-slate-500">
                    Бүртгэл байхгүй. Шинэ тохиолдол нэмнэ үү.
                  </td>
                </tr>
              ) : (
                filteredCases.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-t border-slate-100 hover:bg-slate-50/80"
                  >
                    <Td>{index + 1}</Td>
                    <Td>{row.poisonedAt.slice(0, 10)}</Td>
                    <Td className="bg-rose-50/70">{row.epi ?? "—"}</Td>
                    <Td>{row.reportingOrganization ?? "—"}</Td>
                    <Td className="max-w-[180px] truncate" title={row.address ?? undefined}>
                      {row.address ?? "—"}
                    </Td>
                    <Td>{row.locationType ?? "—"}</Td>
                    <Td>{row.provinceName ?? "—"}</Td>
                    <Td>{row.soumName ?? "—"}</Td>
                    <Td>{row.khorooSoum ?? "—"}</Td>
                    <Td>{row.age ?? "—"}</Td>
                    <Td className={row.gender === 2 ? "bg-rose-200 font-medium" : undefined}>
                      {genderLabel(row.gender)}
                    </Td>
                    <Td>{labelFromCode(options.HOSPITAL_ARRIVAL, row.hospitalArrival)}</Td>
                    <Td>{row.physicalCondition ?? "—"}</Td>
                    <Td
                      className={
                        row.outcome != null && deathCodes.includes(row.outcome)
                          ? "bg-slate-800 font-semibold text-white"
                          : "bg-rose-50/70"
                      }
                    >
                      {labelFromCode(options.OUTCOME, row.outcome)}
                    </Td>
                    <Td>{row.hbco ?? "—"}</Td>
                    <Td>{row.household ?? "—"}</Td>
                    <Td>{row.cause ?? "—"}</Td>
                    <Td>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(row)}
                          className="rounded p-1.5 text-sky-600 hover:bg-sky-50"
                          title="Засах"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="rounded p-1.5 text-rose-600 hover:bg-rose-50"
                          title="Устгах"
                          disabled={loading}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 sm:p-8">
          <div className="w-full max-w-4xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {editingId ? "Бүртгэл засах" : "Шинэ бүртгэл"}
                </h2>
                <p className="text-xs text-slate-500">
                  Угаарын хийн хордлогын тохиолдлын мэдээлэл
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
              {error && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Хордсон огноо">
                  <input
                    type="date"
                    required
                    className={inputClass}
                    value={form.poisonedAt}
                    onChange={(e) => updateForm({ poisonedAt: e.target.value })}
                  />
                </Field>
                <Field label="EPI">
                  <input
                    type="number"
                    className={inputClass}
                    value={form.epi}
                    onChange={(e) => updateForm({ epi: e.target.value })}
                  />
                </Field>
                <Field label="Мэдээлсэн байгууллага">
                  <select
                    className={inputClass}
                    value={form.reportingOrganization}
                    onChange={(e) => updateForm({ reportingOrganization: e.target.value })}
                  >
                    <option value="">Сонгох</option>
                    {options.REPORTING_ORGANIZATION.map((org) => (
                      <option key={org.id} value={org.label}>
                        {org.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Угаартсан газрын хаяг" className="sm:col-span-2 lg:col-span-3">
                  <input
                    type="text"
                    className={inputClass}
                    value={form.address}
                    onChange={(e) => updateForm({ address: e.target.value })}
                    placeholder="Гудамж, байр, тоот..."
                  />
                </Field>
                <Field label="Угаартсан газар">
                  <select
                    className={inputClass}
                    value={form.locationType}
                    onChange={(e) => updateForm({ locationType: e.target.value })}
                  >
                    <option value="">Сонгох</option>
                    {options.LOCATION_TYPE.map((t) => (
                      <option key={t.id} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Аймаг / хот (province_NAME)">
                  <select
                    className={inputClass}
                    value={form.provinceName}
                    onChange={(e) => updateForm({ provinceName: e.target.value })}
                  >
                    <option value="">Сонгох</option>
                    {CITIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Сум / дүүрэг (SOUM_NAME)">
                  <select
                    className={inputClass}
                    value={form.soumName}
                    onChange={(e) => updateForm({ soumName: e.target.value })}
                    disabled={!selectedCity}
                  >
                    <option value="">Сонгох</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Хороо / баг">
                  {khorooOptions.length > 0 ? (
                    <select
                      className={inputClass}
                      value={form.khorooName}
                      onChange={(e) => updateForm({ khorooName: e.target.value })}
                      disabled={!selectedDistrict}
                    >
                      <option value="">Сонгох</option>
                      {khorooOptions.map((k) => (
                        <option key={`${k.id}-${k.name}`} value={k.name}>
                          {formatKhorooLabel(k.name)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className={inputClass}
                      value={form.khorooName}
                      onChange={(e) => updateForm({ khorooName: e.target.value })}
                      disabled={!selectedDistrict}
                      placeholder="ж: 01 эсвэл 1-р баг"
                    />
                  )}
                </Field>
                <Field label="Нас /жил/">
                  <input
                    type="number"
                    min={0}
                    max={120}
                    className={inputClass}
                    value={form.age}
                    onChange={(e) => updateForm({ age: e.target.value })}
                  />
                </Field>
                <Field label="Хүйс">
                  <select
                    className={inputClass}
                    value={form.gender}
                    onChange={(e) => updateForm({ gender: e.target.value })}
                  >
                    <option value="">Сонгох</option>
                    {GENDER_OPTIONS.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Эмнэлэгт хандсан байдал">
                  <select
                    className={inputClass}
                    value={form.hospitalArrival}
                    onChange={(e) => updateForm({ hospitalArrival: e.target.value })}
                  >
                    <option value="">Сонгох</option>
                    {options.HOSPITAL_ARRIVAL.map((o) => (
                      <option key={o.id} value={o.code ?? ""}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Биеийн ерөнхий байдал">
                  <select
                    className={inputClass}
                    value={form.physicalCondition}
                    onChange={(e) => updateForm({ physicalCondition: e.target.value })}
                  >
                    <option value="">Сонгох</option>
                    {options.PHYSICAL_CONDITION.map((c) => (
                      <option key={c.id} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Төлөв">
                  <select
                    className={inputClass}
                    value={form.outcome}
                    onChange={(e) => updateForm({ outcome: e.target.value })}
                  >
                    <option value="">Сонгох</option>
                    {options.OUTCOME.map((o) => (
                      <option key={o.id} value={o.code ?? ""}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Карбоксигемоглобин /HbCO/">
                  <input
                    type="number"
                    step="0.1"
                    className={inputClass}
                    value={form.hbco}
                    onChange={(e) => updateForm({ hbco: e.target.value })}
                  />
                </Field>
                <Field label="Өрх">
                  <input
                    type="number"
                    className={inputClass}
                    value={form.household}
                    onChange={(e) => updateForm({ household: e.target.value })}
                  />
                </Field>
                <Field label="Шалтгаан">
                  <select
                    className={inputClass}
                    value={form.cause}
                    onChange={(e) => updateForm({ cause: e.target.value })}
                  >
                    <option value="">Сонгох</option>
                    {options.CAUSE.map((c) => (
                      <option key={c.id} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Хаах
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-60"
                >
                  {loading ? "Хадгалж байна..." : "Хадгалах"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      {hint && <p className="mt-0.5 text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={`whitespace-nowrap px-3 py-3 font-semibold ${className ?? ""}`}>
      {children}
    </th>
  );
}

function Td({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <td className={`whitespace-nowrap px-3 py-2.5 text-slate-700 ${className ?? ""}`} title={title}>
      {children}
    </td>
  );
}
