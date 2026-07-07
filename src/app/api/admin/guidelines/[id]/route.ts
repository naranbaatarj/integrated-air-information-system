import { NextResponse } from "next/server";
import { z } from "zod";
import { ContentStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-log";

const guidelineSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(2),
  content: z.string().min(2),
  image: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "INACTIVE"]),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin("edit_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  const { id } = await params;

  try {
    const body = guidelineSchema.parse(await request.json());
    const existing = await prisma.guideline.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const guideline = await prisma.guideline.update({
      where: { id },
      data: {
        title: body.title,
        summary: body.summary,
        content: body.content,
        image: body.image || null,
        categoryId: body.categoryId || null,
        status: body.status as ContentStatus,
        publishedAt:
          body.status === "PUBLISHED"
            ? existing.publishedAt ?? new Date()
            : body.status === "DRAFT"
              ? null
              : existing.publishedAt,
      },
    });

    await logActivity({
      userId: authResult.session!.user.id,
      action: "UPDATE",
      entity: "Guideline",
      entityId: guideline.id,
      details: guideline.title,
    });

    return NextResponse.json(guideline);
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
  await prisma.guideline.delete({ where: { id } });

  await logActivity({
    userId: authResult.session!.user.id,
    action: "DELETE",
    entity: "Guideline",
    entityId: id,
  });

  return NextResponse.json({ success: true });
}
