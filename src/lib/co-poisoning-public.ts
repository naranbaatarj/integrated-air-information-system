import type { CoPoisoningCaseDto, CoPoisoningStats } from "@/lib/co-poisoning";
import { isDeath } from "@/lib/co-poisoning-analytics";

/**
 * Builds a case DTO safe for the public site: sensitive fields are nulled
 * so they never reach the browser, while analytics helpers keep working.
 */
export function toPublicCase(record: {
  id: string;
  poisonedAt: Date;
  age: number | null;
  gender: number | null;
  provinceName: string | null;
  provinceId: number | null;
  soumName: string | null;
  locationType: string | null;
  physicalCondition: string | null;
  outcome: number | null;
  cause: string | null;
  khoroo?: number | null;
}): CoPoisoningCaseDto {
  return {
    id: record.id,
    poisonedAt: record.poisonedAt.toISOString(),
    age: record.age,
    gender: record.gender,
    provinceName: record.provinceName,
    provinceId: record.provinceId,
    soumName: record.soumName,
    locationType: record.locationType,
    physicalCondition: record.physicalCondition,
    outcome: record.outcome,
    cause: record.cause,
    epi: null,
    reportingOrganization: null,
    address: null,
    soumId: null,
    khorooSoum: null,
    code: null,
    hospitalArrival: null,
    hbco: null,
    household: null,
    khoroo: record.khoroo ?? null,
    createdAt: "",
    updatedAt: "",
  };
}

export function computePublicStats(
  cases: Pick<CoPoisoningCaseDto, "age" | "gender" | "outcome">[],
  deathCodes: number[]
): CoPoisoningStats {
  const total = cases.length;
  const deaths = cases.filter((c) => isDeath(c.outcome, deathCodes)).length;
  const male = cases.filter((c) => c.gender === 1).length;
  const female = cases.filter((c) => c.gender === 2).length;
  const children = cases.filter((c) => c.age != null && c.age < 18).length;
  const deathRate = total > 0 ? Math.round((deaths / total) * 1000) / 10 : 0;
  return { total, deaths, male, female, children, deathRate };
}

export const CO_SAFETY_TIPS = [
  {
    title: "Галлагааг хянах",
    text: "Зуух, пийшин, хийн зуухыг зөв агааржуулалттай ашиглаж, утаа гарах хоолойг тогтмол цэвэрлэ.",
  },
  {
    title: "Мэдрэгч суурилуулах",
    text: "Гэртээ угаарын хийн мэдрэгч (CO detector) байрлуулж, батарейг тогтмол шалгаарай.",
  },
  {
    title: "Шинж тэмдэгт анхаарах",
    text: "Толгой өвдөх, дотор муухайрах, толгой эргэх, сулрах зэрэг шинж илэрвэл шууд цэвэр агаарт гарга.",
  },
  {
    title: "Яаралтай тусламж",
    text: "Хүндэрч байвал 103 руу залгаж, эмнэлгийн тусламж нэн даруй авна.",
  },
] as const;
