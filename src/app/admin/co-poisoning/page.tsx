import { Suspense } from "react";
import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";
import { serializeCase } from "@/lib/co-poisoning-schema";
import type { CoPoisoningStats } from "@/lib/co-poisoning";
import {
  groupOptionsByCategory,
  type CoPoisoningOptionDto,
} from "@/lib/co-poisoning-options";
import { Skeleton } from "@/components/ui/skeleton";
import { CoPoisoningManager } from "./co-poisoning-manager";

export const metadata = { title: "Угаарын хийн хордлого" };

function computeStats(
  cases: { age: number | null; gender: number | null; outcome: number | null }[],
  deathCodes: number[]
): CoPoisoningStats {
  const total = cases.length;
  const deaths = cases.filter(
    (c) => c.outcome != null && deathCodes.includes(c.outcome)
  ).length;
  const male = cases.filter((c) => c.gender === 1).length;
  const female = cases.filter((c) => c.gender === 2).length;
  const children = cases.filter((c) => c.age != null && c.age < 18).length;
  const deathRate = total > 0 ? Math.round((deaths / total) * 1000) / 10 : 0;
  return { total, deaths, male, female, children, deathRate };
}

export default async function AdminCoPoisoningPage() {
  const [records, optionRows] = await Promise.all([
    prisma.coPoisoningCase.findMany({
      orderBy: [{ poisonedAt: "desc" }, { createdAt: "desc" }],
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

  return (
    <AdminPageLayout>
      <Suspense fallback={<AdminCoPoisoningFallback />}>
        <CoPoisoningManager
          initialCases={records.map(serializeCase)}
          initialStats={computeStats(records, deathCodes)}
          options={options}
          deathCodes={deathCodes}
        />
      </Suspense>
    </AdminPageLayout>
  );
}

function AdminCoPoisoningFallback() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <Skeleton className="h-28 w-full rounded-2xl" />
      <Skeleton className="h-40 w-full rounded-2xl" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-80 w-full rounded-2xl" />
    </div>
  );
}
