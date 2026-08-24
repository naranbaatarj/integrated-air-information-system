export const GENDER_OPTIONS = [
  { value: 1, label: "Эрэгтэй" },
  { value: 2, label: "Эмэгтэй" },
] as const;

export {
  CITIES,
  DISTRICTS,
  KHOROOS,
  getCityById,
  getCityByName,
  getDistrictsByCityId,
  getDistrictByCityAndName,
  getKhoroosByDistrictId,
  parseKhorooNumber,
  formatKhorooLabel,
  buildLocationCode,
} from "@/lib/locations";

export function genderLabel(gender: number | null | undefined) {
  if (gender === 1) return "Эрэгтэй";
  if (gender === 2) return "Эмэгтэй";
  return "—";
}

export type CoPoisoningCaseDto = {
  id: string;
  poisonedAt: string;
  epi: number | null;
  reportingOrganization: string | null;
  address: string | null;
  locationType: string | null;
  provinceName: string | null;
  provinceId: number | null;
  soumName: string | null;
  soumId: number | null;
  khorooSoum: string | null;
  code: string | null;
  age: number | null;
  gender: number | null;
  hospitalArrival: number | null;
  physicalCondition: string | null;
  outcome: number | null;
  hbco: number | null;
  household: number | null;
  cause: string | null;
  khoroo: number | null;
  createdAt: string;
  updatedAt: string;
};

export type CoPoisoningStats = {
  total: number;
  deaths: number;
  male: number;
  female: number;
  children: number;
  deathRate: number;
};
