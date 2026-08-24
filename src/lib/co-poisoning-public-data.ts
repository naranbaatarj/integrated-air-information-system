import { prisma } from "@/lib/prisma";
import {
  groupOptionsByCategory,
  type CoPoisoningOptionDto,
} from "@/lib/co-poisoning-options";
import { toPublicCase } from "@/lib/co-poisoning-public";

export async function getCoPoisoningPublicData() {
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

  const options = groupOptionsByCategory(optionRows as CoPoisoningOptionDto[]);
  const deathCodes = options.OUTCOME.filter(
    (o) => o.code != null && /нас барсан/i.test(o.label)
  ).map((o) => o.code!);

  if (deathCodes.length === 0) deathCodes.push(99);

  return {
    cases: records.map(toPublicCase),
    deathCodes,
    options,
  };
}
