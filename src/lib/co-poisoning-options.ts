import type { CoPoisoningOptionCategory } from "@/generated/prisma/client";

export const OPTION_CATEGORY_LABELS: Record<CoPoisoningOptionCategory, string> = {
  REPORTING_ORGANIZATION: "Мэдээлсэн байгууллага",
  LOCATION_TYPE: "Угаартсан газар",
  HOSPITAL_ARRIVAL: "Эмнэлэгт хандсан байдал",
  PHYSICAL_CONDITION: "Биеийн ерөнхий байдал",
  OUTCOME: "Төлөв",
  CAUSE: "Шалтгаан",
};

export const OPTION_CATEGORIES = Object.keys(
  OPTION_CATEGORY_LABELS
) as CoPoisoningOptionCategory[];

/** Categories that use numeric code in CoPoisoningCase */
export const CODED_OPTION_CATEGORIES: CoPoisoningOptionCategory[] = [
  "HOSPITAL_ARRIVAL",
  "OUTCOME",
];

export type CoPoisoningOptionDto = {
  id: string;
  category: CoPoisoningOptionCategory;
  label: string;
  code: number | null;
  sortOrder: number;
  status: "ACTIVE" | "INACTIVE";
};

export type CoPoisoningOptionsByCategory = Record<
  CoPoisoningOptionCategory,
  CoPoisoningOptionDto[]
>;

export const DEFAULT_CO_POISONING_OPTIONS: {
  category: CoPoisoningOptionCategory;
  label: string;
  code?: number;
  sortOrder: number;
}[] = [
  { category: "REPORTING_ORGANIZATION", label: "ХЯТҮТ", sortOrder: 1 },
  { category: "REPORTING_ORGANIZATION", label: "НЭМГ", sortOrder: 2 },
  { category: "REPORTING_ORGANIZATION", label: "ЭХЭМҮТ", sortOrder: 3 },

  { category: "LOCATION_TYPE", label: "гэртээ", sortOrder: 1 },
  { category: "LOCATION_TYPE", label: "айлд", sortOrder: 2 },
  { category: "LOCATION_TYPE", label: "ажил дээрээ", sortOrder: 3 },
  { category: "LOCATION_TYPE", label: "машинд", sortOrder: 4 },

  { category: "HOSPITAL_ARRIVAL", label: "Түргэнээр", code: 1, sortOrder: 1 },
  { category: "HOSPITAL_ARRIVAL", label: "Өөрсдөө", code: 2, sortOrder: 2 },

  { category: "PHYSICAL_CONDITION", label: "Хөнгөн", sortOrder: 1 },
  { category: "PHYSICAL_CONDITION", label: "Хүндэвтэр", sortOrder: 2 },
  { category: "PHYSICAL_CONDITION", label: "Дунд", sortOrder: 3 },
  { category: "PHYSICAL_CONDITION", label: "Хүнд", sortOrder: 4 },
  { category: "PHYSICAL_CONDITION", label: "Маш хүнд", sortOrder: 5 },
  { category: "PHYSICAL_CONDITION", label: "Нас барсан", sortOrder: 6 },
  { category: "PHYSICAL_CONDITION", label: "Тодорхойгүй", sortOrder: 7 },

  { category: "OUTCOME", label: "Хэвтсэн", code: 1, sortOrder: 1 },
  {
    category: "OUTCOME",
    label: "Зөвлөгөө, эмчилгээ аваад буцсан",
    code: 2,
    sortOrder: 2,
  },
  { category: "OUTCOME", label: "Одоо хянагдаж байгаа", code: 3, sortOrder: 3 },
  { category: "OUTCOME", label: "Нас барсан", code: 99, sortOrder: 4 },

  { category: "CAUSE", label: "галлагаа", sortOrder: 1 },
  { category: "CAUSE", label: "угаалгын өрөө", sortOrder: 2 },
  { category: "CAUSE", label: "машины яндан", sortOrder: 3 },
  { category: "CAUSE", label: "бусад", sortOrder: 4 },
];

export function emptyOptionsByCategory(): CoPoisoningOptionsByCategory {
  return {
    REPORTING_ORGANIZATION: [],
    LOCATION_TYPE: [],
    HOSPITAL_ARRIVAL: [],
    PHYSICAL_CONDITION: [],
    OUTCOME: [],
    CAUSE: [],
  };
}

export function groupOptionsByCategory(
  options: CoPoisoningOptionDto[]
): CoPoisoningOptionsByCategory {
  const grouped = emptyOptionsByCategory();
  for (const option of options) {
    grouped[option.category].push(option);
  }
  return grouped;
}

export function labelFromCode(
  options: CoPoisoningOptionDto[],
  code: number | null | undefined
) {
  if (code == null) return "—";
  return options.find((o) => o.code === code)?.label ?? String(code);
}
