import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";
import { CITIES } from "@/lib/locations";

export type ProvinceMapStat = {
  id: string;
  name: string;
  total: number;
  deaths: number;
};

export type DistrictMapStat = {
  id: string;
  name: string;
  total: number;
  deaths: number;
  khorooCount: number;
};

const CITY_NAMES = new Set(CITIES.map((c) => c.name));

function isUbCase(c: CoPoisoningCaseDto) {
  return c.provinceId === 20 || c.provinceName === "Улаанбаатар";
}

/** Normalize stored province names to canonical city names. */
export function normalizeProvinceName(name: string | null | undefined): string | null {
  if (!name?.trim()) return null;
  const trimmed = name.trim();
  if (CITY_NAMES.has(trimmed)) return trimmed;
  // Soft match: ignore case / spacing differences
  const found = CITIES.find(
    (c) => c.name.toLowerCase() === trimmed.toLowerCase()
  );
  return found?.name ?? trimmed;
}

export function provinceMapStats(
  cases: CoPoisoningCaseDto[],
  deathCodes: number[]
): ProvinceMapStat[] {
  const map = new Map<string, ProvinceMapStat>();

  for (const city of CITIES) {
    map.set(city.name, {
      id: city.name,
      name: city.name,
      total: 0,
      deaths: 0,
    });
  }

  for (const c of cases) {
    const name = isUbCase(c)
      ? "Улаанбаатар"
      : normalizeProvinceName(c.provinceName);
    if (!name) continue;
    const row =
      map.get(name) ??
      ({ id: name, name, total: 0, deaths: 0 } satisfies ProvinceMapStat);
    row.total += 1;
    if (c.outcome != null && deathCodes.includes(c.outcome)) row.deaths += 1;
    map.set(name, row);
  }

  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}

export function districtMapStats(
  cases: CoPoisoningCaseDto[],
  deathCodes: number[]
): DistrictMapStat[] {
  const map = new Map<
    string,
    { total: number; deaths: number; khoroos: Set<string> }
  >();

  for (const c of cases) {
    if (!isUbCase(c)) continue;
    const name = c.soumName?.trim();
    if (!name) continue;

    const row = map.get(name) ?? {
      total: 0,
      deaths: 0,
      khoroos: new Set<string>(),
    };
    row.total += 1;
    if (c.outcome != null && deathCodes.includes(c.outcome)) row.deaths += 1;

    const khorooKey =
      c.khorooSoum?.trim() ||
      (c.khoroo != null ? String(c.khoroo) : null) ||
      c.code?.trim() ||
      null;
    if (khorooKey) row.khoroos.add(khorooKey);

    map.set(name, row);
  }

  return Array.from(map.entries())
    .map(([name, row]) => ({
      id: name,
      name,
      total: row.total,
      deaths: row.deaths,
      khorooCount: row.khoroos.size,
    }))
    .sort((a, b) => b.total - a.total);
}

/** Choropleth blue → teal → amber → rose by relative intensity. */
export function mapFillColor(value: number, max: number) {
  if (value <= 0 || max <= 0) return "#E2E8F0";
  const t = Math.min(1, value / max);
  if (t < 0.2) return "#BAE6FD";
  if (t < 0.4) return "#7DD3FC";
  if (t < 0.55) return "#38BDF8";
  if (t < 0.7) return "#2DD4BF";
  if (t < 0.85) return "#FB923C";
  return "#F43F5E";
}
