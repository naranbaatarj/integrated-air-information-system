import { CITIES, DISTRICTS, KHOROOS } from "./data";
import type { LocationCity, LocationDistrict, LocationKhoroo } from "./data";

export type { LocationCity, LocationDistrict, LocationKhoroo };
export { CITIES, DISTRICTS, KHOROOS };

export function getCityById(id: number | null | undefined) {
  if (id == null) return undefined;
  return CITIES.find((c) => c.id === id);
}

export function getCityByName(name: string | null | undefined) {
  if (!name) return undefined;
  return CITIES.find((c) => c.name === name);
}

export function getDistrictsByCityId(cityId: number | null | undefined) {
  if (cityId == null) return [];
  return DISTRICTS.filter((d) => d.cityId === cityId);
}

export function getDistrictById(id: number | null | undefined) {
  if (id == null) return undefined;
  return DISTRICTS.find((d) => d.id === id);
}

export function getDistrictByCityAndName(
  cityId: number | null | undefined,
  name: string | null | undefined
) {
  if (cityId == null || !name) return undefined;
  return DISTRICTS.find((d) => d.cityId === cityId && d.name === name);
}

export function getKhoroosByDistrictId(districtId: number | null | undefined) {
  if (districtId == null) return [];
  const list = KHOROOS.filter((k) => k.districtId === districtId);
  // unique by name (dump has duplicate names in some UB districts)
  const seen = new Set<string>();
  return list.filter((k) => {
    if (seen.has(k.name)) return false;
    seen.add(k.name);
    return true;
  });
}

export function parseKhorooNumber(name: string | null | undefined): number | null {
  if (!name) return null;
  const trimmed = name.trim();
  const numeric = Number(trimmed);
  if (Number.isFinite(numeric)) return Math.trunc(numeric);
  const match = trimmed.match(/^(\d+)/);
  return match ? Number(match[1]) : null;
}

export function formatKhorooLabel(name: string): string {
  const num = parseKhorooNumber(name);
  if (num != null && /^\d+$/.test(name.trim())) {
    return `${num}-р хороо`;
  }
  return name;
}

export function buildLocationCode(
  districtCode: string | null | undefined,
  khorooName: string | null | undefined
) {
  if (!districtCode || !khorooName) return "";
  const num = parseKhorooNumber(khorooName);
  const suffix = num != null ? String(num) : khorooName;
  return `${districtCode}_${suffix}`;
}
