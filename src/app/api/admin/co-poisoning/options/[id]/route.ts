import { NextResponse } from "next/server";
import { z } from "zod";
import { RecordStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-log";
import { CODED_OPTION_CATEGORIES } from "@/lib/co-poisoning-options";

const updateSchema = z.object({
  label: z.string().trim().min(1),
  code: z.number().int().nullable().optional(),
  sortOrder: z.number().int().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin("manage_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  const { id } = await params;

  try {
    const body = updateSchema.parse(await request.json());
    const existing = await prisma.coPoisoningOption.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const isCoded = CODED_OPTION_CATEGORIES.includes(existing.category);
    const code = isCoded
      ? body.code !== undefined
        ? body.code
        : existing.code
      : null;

    if (isCoded && code == null) {
      return NextResponse.json(
        { error: "Энэ ангилалд код (тоо) шаардлагатай" },
        { status: 400 }
      );
    }

    const option = await prisma.coPoisoningOption.update({
      where: { id },
      data: {
        label: body.label,
        code,
        sortOrder: body.sortOrder ?? existing.sortOrder,
        status: (body.status as RecordStatus | undefined) ?? existing.status,
      },
    });

    await logActivity({
      userId: authResult.session!.user.id,
      action: "UPDATE",
      entity: "CoPoisoningOption",
      entityId: option.id,
      details: `${option.category}: ${option.label}`,
    });

    return NextResponse.json(option);
  } catch {
    return NextResponse.json({ error: "Буруу мэдээлэл" }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin("manage_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  const { id } = await params;
  const existing = await prisma.coPoisoningOption.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.coPoisoningOption.delete({ where: { id } });

  await logActivity({
    userId: authResult.session!.user.id,
    action: "DELETE",
    entity: "CoPoisoningOption",
    entityId: id,
    details: `${existing.category}: ${existing.label}`,
  });

  return NextResponse.json({ success: true });
}
