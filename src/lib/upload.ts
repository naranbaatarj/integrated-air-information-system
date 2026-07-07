import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createSlug } from "@/lib/utils";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

const MAX_SIZE_MB = 10;

export function validateImageFile(file: File) {
  if (!ALLOWED_TYPES.has(file.type)) {
    return "Зөвхөн JPG, PNG, WEBP зураг оруулна уу.";
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `Зураг ${MAX_SIZE_MB}MB-аас их байж болохгүй.`;
  }
  return null;
}

export async function saveUploadedImage(file: File, folder = "news") {
  const error = validateImageFile(file);
  if (error) throw new Error(error);

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = `${createSlug(file.name.replace(/\.[^.]+$/, "")) || "image"}-${Date.now()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, safeName), buffer);

  return `/uploads/${folder}/${safeName}`;
}
