import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-log";
import {
  coPoisoningCaseSchema,
  serializeCase,
  toCaseData,
} from "@/lib/co-poisoning-schema";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin("edit_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  const { id } = await params;
  const record = await prisma.coPoisoningCase.findUnique({ where: { id } });
  if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(serializeCase(record));
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin("edit_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  const { id } = await params;

  try {
    const body = coPoisoningCaseSchema.parse(await request.json());
    const existing = await prisma.coPoisoningCase.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const record = await prisma.coPoisoningCase.update({
      where: { id },
      data: toCaseData(body),
    });

    await logActivity({
      userId: authResult.session!.user.id,
      action: "UPDATE",
      entity: "CoPoisoningCase",
      entityId: record.id,
      details: record.poisonedAt.toISOString().slice(0, 10),
    });

    return NextResponse.json(serializeCase(record));
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
  const existing = await prisma.coPoisoningCase.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.coPoisoningCase.delete({ where: { id } });

  await logActivity({
    userId: authResult.session!.user.id,
    action: "DELETE",
    entity: "CoPoisoningCase",
    entityId: id,
  });

  return NextResponse.json({ success: true });
}
