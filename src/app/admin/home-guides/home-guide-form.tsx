"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

export function HomeGuideForm({
  initial,
}: {
  initial?: {
    id: string;
    question: string;
    content: string;
    videoUrl: string | null;
    linkUrl: string | null;
    linkLabel: string | null;
    sortOrder: number;
    status: string;
  };
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(initial?.content ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const videoUrl = (formData.get("videoUrl") as string)?.trim() || null;
    const plainContent = content.replace(/<[^>]*>/g, "").trim();

    if (!plainContent && !videoUrl) {
      setError("Агуулга эсвэл видео холбоос заавал оруулна.");
      setLoading(false);
      return;
    }

    const payload = {
      question: formData.get("question"),
      content,
      videoUrl,
      linkUrl: (formData.get("linkUrl") as string)?.trim() || null,
      linkLabel: (formData.get("linkLabel") as string)?.trim() || null,
      sortOrder: Number(formData.get("sortOrder") ?? 0),
      status: formData.get("status"),
    };

    const url = initial ? `/api/admin/home-guides/${initial.id}` : "/api/admin/home-guides";
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

    router.push("/admin/home-guides");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-4 rounded-xl border bg-white p-6">
      <Field
        label="Асуулт (гарчиг)"
        name="question"
        defaultValue={initial?.question}
        required
        hint="Нүүр хуудсан дахь accordion-ийн гарчиг"
      />

      <div>
        <label className="mb-2 block text-sm font-medium">Видео холбоос</label>
        <input
          name="videoUrl"
          type="url"
          defaultValue={initial?.videoUrl ?? ""}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-slate-500">
          YouTube, Vimeo эсвэл MP4 файлын холбоос оруулна уу.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Тайлбар агуулга</label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Заавар, зөвлөгөөний тайлбар бичнэ үү..."
        />
      </div>

      <Field
        label="Нэмэлт холбоос"
        name="linkUrl"
        defaultValue={initial?.linkUrl ?? ""}
        hint="Жишээ нь: Дэлгэрэнгүй заавар харах"
      />
      <Field
        label="Холбоосын текст"
        name="linkLabel"
        defaultValue={initial?.linkLabel ?? ""}
        placeholder="Дэлгэрэнгүй заавар харах"
      />

      <div>
        <label className="mb-1 block text-sm font-medium">Эрэмбэ</label>
        <input
          name="sortOrder"
          type="number"
          defaultValue={initial?.sortOrder ?? 0}
          min={0}
          className="w-32 rounded-lg border px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-slate-500">Бага тоо эхэнд харагдана.</p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Төлөв</label>
        <select
          name="status"
          defaultValue={initial?.status ?? "PUBLISHED"}
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
        disabled={loading}
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
  hint,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
