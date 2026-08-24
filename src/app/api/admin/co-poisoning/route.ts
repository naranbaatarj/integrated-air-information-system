import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-log";
import {
  coPoisoningCaseSchema,
  serializeCase,
  toCaseData,
} from "@/lib/co-poisoning-schema";
import type { CoPoisoningStats } from "@/lib/co-poisoning";

function computeStats(
  cases: { age: number | null; gender: number | null; outcome: number | null }[]
): CoPoisoningStats {
  const total = cases.length;
  const deaths = cases.filter((c) => c.outcome === 99).length;
  const male = cases.filter((c) => c.gender === 1).length;
  const female = cases.filter((c) => c.gender === 2).length;
  const children = cases.filter((c) => c.age != null && c.age < 18).length;
  const deathRate = total > 0 ? Math.round((deaths / total) * 1000) / 10 : 0;

  return { total, deaths, male, female, children, deathRate };
}

export async function GET(request: Request) {
  const authResult = await requireAdmin("edit_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");
  const year = yearParam ? Number(yearParam) : null;

  const where =
    year && !Number.isNaN(year)
      ? {
          poisonedAt: {
            gte: new Date(`${year}-01-01T00:00:00.000Z`),
            lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
          },
        }
      : {};

  const cases = await prisma.coPoisoningCase.findMany({
    where,
    orderBy: [{ poisonedAt: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({
    cases: cases.map(serializeCase),
    stats: computeStats(cases),
  });
}

export async function POST(request: Request) {
  const authResult = await requireAdmin("edit_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  try {
    const body = coPoisoningCaseSchema.parse(await request.json());
    const record = await prisma.coPoisoningCase.create({
      data: toCaseData(body),
    });

    await logActivity({
      userId: authResult.session!.user.id,
      action: "CREATE",
      entity: "CoPoisoningCase",
      entityId: record.id,
      details: record.poisonedAt.toISOString().slice(0, 10),
    });

    return NextResponse.json(serializeCase(record));
  } catch {
    return NextResponse.json({ error: "Буруу мэдээлэл" }, { status: 400 });
  }
}
