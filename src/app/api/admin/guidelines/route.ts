import { NextResponse } from "next/server";
import { z } from "zod";
import { ContentStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-log";
import { createSlug } from "@/lib/utils";

const guidelineSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(2),
  content: z.string().min(2),
  image: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "INACTIVE"]),
});

export async function POST(request: Request) {
  const authResult = await requireAdmin("edit_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  try {
    const body = guidelineSchema.parse(await request.json());
    const slug = createSlug(body.title);

    const guideline = await prisma.guideline.create({
      data: {
        title: body.title,
        slug: `${slug}-${Date.now()}`,
        summary: body.summary,
        content: body.content,
        image: body.image || null,
        categoryId: body.categoryId || null,
        status: body.status as ContentStatus,
        publishedAt: body.status === "PUBLISHED" ? new Date() : null,
        createdById: authResult.session!.user.id,
      },
    });

    await logActivity({
      userId: authResult.session!.user.id,
      action: "CREATE",
      entity: "Guideline",
      entityId: guideline.id,
      details: guideline.title,
    });

    return NextResponse.json(guideline);
  } catch {
    return NextResponse.json({ error: "Буруу мэдээлэл" }, { status: 400 });
  }
}
