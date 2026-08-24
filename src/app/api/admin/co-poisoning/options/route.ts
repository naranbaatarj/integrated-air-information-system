import { NextResponse } from "next/server";
import { z } from "zod";
import { CoPoisoningOptionCategory, RecordStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-log";
import {
  CODED_OPTION_CATEGORIES,
  OPTION_CATEGORIES,
} from "@/lib/co-poisoning-options";

const categorySchema = z.enum(
  OPTION_CATEGORIES as [CoPoisoningOptionCategory, ...CoPoisoningOptionCategory[]]
);

const optionSchema = z.object({
  category: categorySchema,
  label: z.string().trim().min(1),
  code: z.number().int().nullable().optional(),
  sortOrder: z.number().int().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export async function GET(request: Request) {
  const authResult = await requireAdmin("edit_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const activeOnly = searchParams.get("activeOnly") === "1";

  const where: {
    category?: CoPoisoningOptionCategory;
    status?: RecordStatus;
  } = {};

  if (category) {
    const parsed = categorySchema.safeParse(category);
    if (!parsed.success) {
      return NextResponse.json({ error: "Буруу ангилал" }, { status: 400 });
    }
    where.category = parsed.data;
  }
  if (activeOnly) where.status = "ACTIVE";

  const options = await prisma.coPoisoningOption.findMany({
    where,
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { label: "asc" }],
  });

  return NextResponse.json(options);
}

export async function POST(request: Request) {
  const authResult = await requireAdmin("manage_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  try {
    const body = optionSchema.parse(await request.json());
    const isCoded = CODED_OPTION_CATEGORIES.includes(body.category);

    if (isCoded && (body.code == null || Number.isNaN(body.code))) {
      return NextResponse.json(
        { error: "Энэ ангилалд код (тоо) шаардлагатай" },
        { status: 400 }
      );
    }

    const maxSort = await prisma.coPoisoningOption.aggregate({
      where: { category: body.category },
      _max: { sortOrder: true },
    });

    const option = await prisma.coPoisoningOption.create({
      data: {
        category: body.category,
        label: body.label,
        code: isCoded ? body.code! : null,
        sortOrder: body.sortOrder ?? (maxSort._max.sortOrder ?? 0) + 1,
        status: (body.status as RecordStatus) ?? "ACTIVE",
      },
    });

    await logActivity({
      userId: authResult.session!.user.id,
      action: "CREATE",
      entity: "CoPoisoningOption",
      entityId: option.id,
      details: `${option.category}: ${option.label}`,
    });

    return NextResponse.json(option);
  } catch {
    return NextResponse.json({ error: "Буруу мэдээлэл" }, { status: 400 });
  }
}
