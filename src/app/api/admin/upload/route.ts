import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { saveUploadedImage } from "@/lib/upload";

export async function POST(request: Request) {
  const authResult = await requireAdmin("edit_content");
  if ("error" in authResult && authResult.error) return authResult.error;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Файл олдсонгүй" }, { status: 400 });
    }

    const url = await saveUploadedImage(file);
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload алдаа";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
