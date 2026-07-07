"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

type Category = { id: string; name: string };

export function GuidelineForm({
  categories,
  initial,
}: {
  categories: Category[];
  initial?: {
    id: string;
    title: string;
    summary: string;
    content: string;
    image: string | null;
    categoryId: string | null;
    status: string;
  };
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initial?.image ?? "");
  const [content, setContent] = useState(initial?.content ?? "");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Зураг оруулахад алдаа гарлаа.");
        return;
      }

      setImageUrl(data.url);
    } catch {
      setError("Зураг оруулахад алдаа гарлаа.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const plainContent = content.replace(/<[^>]*>/g, "").trim();
    if (!plainContent) {
      setError("Дэлгэрэнгүй агуулга оруулна уу.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get("title"),
      summary: formData.get("summary"),
      content,
      categoryId: formData.get("categoryId") || null,
      status: formData.get("status"),
      image: imageUrl || null,
    };

    const url = initial ? `/api/admin/guidelines/${initial.id}` : "/api/admin/guidelines";
    const method = initial ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Хадгалахад алдаа гарлаа.");
      return;
    }

    router.push("/admin/guidelines");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-4 rounded-xl border bg-white p-6">
      <Field label="Гарчиг" name="title" defaultValue={initial?.title} required />
      <Field label="Товч тайлбар" name="summary" defaultValue={initial?.summary} required />

      <div>
        <label className="mb-2 block text-sm font-medium">Зураг</label>
        {imageUrl ? (
          <div className="relative mb-3 overflow-hidden rounded-lg border border-slate-200">
            <div className="relative aspect-video w-full max-w-md">
              <Image
                src={imageUrl}
                alt="Зураг"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
              aria-label="Зураг устгах"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 transition hover:border-sky-400 hover:bg-sky-50/50">
            <ImagePlus className="mb-2 h-8 w-8 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">
              {uploading ? "Оруулж байна..." : "Зураг сонгох"}
            </span>
            <span className="mt-1 text-xs text-slate-500">JPG, PNG, WEBP · 10MB хүртэл</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              disabled={uploading}
              onChange={handleImageUpload}
            />
          </label>
        )}
        {imageUrl && (
          <label className="mt-2 inline-block cursor-pointer text-sm text-sky-600 hover:underline">
            {uploading ? "Оруулж байна..." : "Зураг солих"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              disabled={uploading}
              onChange={handleImageUpload}
            />
          </label>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Дэлгэрэнгүй агуулга</label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Заавар, зөвлөгөөний дэлгэрэнгүй агуулга бичнэ үү..."
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Ангилал</label>
        <select
          name="categoryId"
          defaultValue={initial?.categoryId ?? ""}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        >
          <option value="">— Сонгоогүй —</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Төлөв</label>
        <select
          name="status"
          defaultValue={initial?.status ?? "DRAFT"}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        >
          <option value="DRAFT">Ноорог</option>
          <option value="PUBLISHED">Нийтэлсэн</option>
          <option value="INACTIVE">Идэвхгүй</option>
        </select>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading || uploading}
        className="rounded-lg bg-sky-600 px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {loading ? "Хадгалж байна..." : "Хадгалах"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />
    </div>
  );
}
