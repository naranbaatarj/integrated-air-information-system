import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-log";
import { createSlug } from "@/lib/utils";

const categorySchema = z.object({
  name: z.string().min(2).max(100),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin("manage_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  const { id } = await params;

  try {
    const body = categorySchema.parse(await request.json());
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing || existing.type !== "NEWS") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const baseSlug = createSlug(body.name);
    let slug = baseSlug;
    if (slug !== existing.slug) {
      let counter = 1;
      while (await prisma.category.findFirst({ where: { slug, NOT: { id } } })) {
        slug = `${baseSlug}-${counter++}`;
      }
    } else {
      slug = existing.slug;
    }

    const category = await prisma.category.update({
      where: { id },
      data: { name: body.name, slug, status: body.status },
    });

    await logActivity({
      userId: authResult.session!.user.id,
      action: "UPDATE",
      entity: "Category",
      entityId: category.id,
      details: category.name,
    });

    return NextResponse.json(category);
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
  const existing = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { news: true } } },
  });

  if (!existing || existing.type !== "NEWS") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (existing._count.news > 0) {
    return NextResponse.json(
      { error: "Энэ ангилалд мэдээ холбогдсон тул устгах боломжгүй." },
      { status: 400 }
    );
  }

  await prisma.category.delete({ where: { id } });

  await logActivity({
    userId: authResult.session!.user.id,
    action: "DELETE",
    entity: "Category",
    entityId: id,
    details: existing.name,
  });

  return NextResponse.json({ success: true });
}
