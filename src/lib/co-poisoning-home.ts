import { prisma } from "@/lib/prisma";
import {
  groupOptionsByCategory,
  type CoPoisoningOptionDto,
} from "@/lib/co-poisoning-options";
import { causeSeries, caseYear, yearlySeries } from "@/lib/co-poisoning-analytics";
import {
  computePublicStats,
  toPublicCase,
} from "@/lib/co-poisoning-public";
import type { CoPoisoningStats } from "@/lib/co-poisoning";

export type CoHomeSnapshot = {
  stats: CoPoisoningStats;
  currentYear: number;
  yearStats: CoPoisoningStats;
  topCauses: { name: string; value: number; percent: number; color: string }[];
  yearly: { label: string; cases: number; deaths: number }[];
};

export async function getCoPoisoningHomeSnapshot(): Promise<CoHomeSnapshot | null> {
  const [records, optionRows] = await Promise.all([
    prisma.coPoisoningCase.findMany({
      select: {
        id: true,
        poisonedAt: true,
        age: true,
        gender: true,
        provinceName: true,
        provinceId: true,
        soumName: true,
        locationType: true,
        physicalCondition: true,
        outcome: true,
        cause: true,
      },
      orderBy: [{ poisonedAt: "desc" }],
    }),
    prisma.coPoisoningOption.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { label: "asc" }],
    }),
  ]);

  if (records.length === 0) return null;

  const options = groupOptionsByCategory(optionRows as CoPoisoningOptionDto[]);
  const deathCodes = options.OUTCOME.filter(
    (o) => o.code != null && /нас барсан/i.test(o.label)
  ).map((o) => o.code!);
  if (deathCodes.length === 0) deathCodes.push(99);

  const cases = records.map(toPublicCase);
  const currentYear = new Date().getFullYear();
  const yearCases = cases.filter((c) => caseYear(c) === currentYear);
  const causeLabels = options.CAUSE.map((o) => o.label);

  return {
    stats: computePublicStats(cases, deathCodes),
    currentYear,
    yearStats: computePublicStats(yearCases, deathCodes),
    topCauses: causeSeries(cases, causeLabels).slice(0, 4),
    yearly: yearlySeries(cases, deathCodes).slice(-5),
  };
}
