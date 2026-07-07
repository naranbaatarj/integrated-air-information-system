import { NextResponse } from "next/server";
import { z } from "zod";
import { ContentStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-log";

const homeGuideSchema = z
  .object({
    question: z.string().min(2),
    content: z.string().optional(),
    videoUrl: z.string().nullable().optional(),
    linkUrl: z.string().nullable().optional(),
    linkLabel: z.string().nullable().optional(),
    sortOrder: z.number().int().optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "INACTIVE"]),
  })
  .refine(
    (data) => {
      const hasContent = (data.content ?? "").replace(/<[^>]*>/g, "").trim().length > 0;
      const hasVideo = !!data.videoUrl?.trim();
      return hasContent || hasVideo;
    },
    { message: "Агуулга эсвэл видео холбоос заавал оруулна" }
  );

export async function POST(request: Request) {
  const authResult = await requireAdmin("edit_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  try {
    const body = homeGuideSchema.parse(await request.json());

    const guide = await prisma.homeGuide.create({
      data: {
        question: body.question,
        content: body.content ?? "",
        videoUrl: body.videoUrl?.trim() || null,
        linkUrl: body.linkUrl?.trim() || null,
        linkLabel: body.linkLabel?.trim() || null,
        sortOrder: body.sortOrder ?? 0,
        status: body.status as ContentStatus,
      },
    });

    await logActivity({
      userId: authResult.session!.user.id,
      action: "CREATE",
      entity: "HomeGuide",
      entityId: guide.id,
      details: guide.question,
    });

    return NextResponse.json(guide);
  } catch {
    return NextResponse.json({ error: "Буруу мэдээлэл" }, { status: 400 });
  }
}
