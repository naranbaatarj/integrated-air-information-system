import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-log";
import { createSlug } from "@/lib/utils";

const categorySchema = z.object({
  name: z.string().min(2).max(100),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export async function GET() {
  const authResult = await requireAdmin("manage_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  const categories = await prisma.category.findMany({
    where: { type: "NEWS" },
    include: { _count: { select: { news: true } } },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const authResult = await requireAdmin("manage_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  try {
    const body = categorySchema.parse(await request.json());
    const baseSlug = createSlug(body.name);
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.category.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug,
        type: "NEWS",
        status: body.status,
      },
    });

    await logActivity({
      userId: authResult.session!.user.id,
      action: "CREATE",
      entity: "Category",
      entityId: category.id,
      details: category.name,
    });

    return NextResponse.json(category);
  } catch {
    return NextResponse.json({ error: "Буруу мэдээлэл" }, { status: 400 });
  }
}
